import { MAIL_API_BASES } from '@constants/urls';
import { Timeouts } from '@constants/timeouts';
import { randomString } from '@helpers/random';
import type {
  MailMessage,
  MailMessageSummary,
  MailTmDomain,
  MailTmHydraCollection,
  TempMailbox,
  WaitForMessageOptions,
} from '@models/mail.types';

async function mailFetch(
  apiBase: string,
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  const response = await fetch(`${apiBase}${path}`, init);
  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(
      `mail api ${init.method ?? 'GET'} ${apiBase}${path} failed (${response.status}): ${body}`,
    );
  }
  return response;
}

function hydraMembers<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) {
    return payload as T[];
  }
  if (payload && typeof payload === 'object' && 'hydra:member' in payload) {
    return ((payload as MailTmHydraCollection<T>)['hydra:member'] ?? []) as T[];
  }
  return [];
}

async function createTempMailboxOn(apiBase: string): Promise<TempMailbox> {
  const domains = hydraMembers<MailTmDomain>(
    await (await mailFetch(apiBase, '/domains')).json(),
  ).filter((d) => d.isActive !== false);
  if (!domains.length) {
    throw new Error(`${apiBase} returned no domains`);
  }

  const password = `Genki!${randomString(12)}`;
  let lastError: Error | undefined;

  for (const domain of domains) {
    const requested = `genkiqa${Date.now()}${randomString(4)}@${domain.domain}`;
    try {
      const account = (await (
        await mailFetch(apiBase, '/accounts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ address: requested, password }),
        })
      ).json()) as { address: string };

      if (!account.address) {
        throw new Error(`${apiBase} account create returned unexpected payload`);
      }

      const tokenBody = (await (
        await mailFetch(apiBase, '/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ address: account.address, password }),
        })
      ).json()) as { token: string };

      if (!tokenBody.token) {
        throw new Error(`${apiBase} token endpoint returned no token`);
      }

      return {
        address: account.address,
        password,
        token: tokenBody.token,
        apiBase,
      };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
    }
  }

  throw lastError ?? new Error(`Could not create mailbox on ${apiBase}`);
}

export async function createTempMailbox(): Promise<TempMailbox> {
  const errors: string[] = [];
  for (const apiBase of MAIL_API_BASES) {
    try {
      return await createTempMailboxOn(apiBase);
    } catch (error) {
      errors.push(`${apiBase}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  throw new Error(`Could not create temp mailbox. ${errors.join(' | ')}`);
}

export async function createTempMailboxes(): Promise<TempMailbox[]> {
  const boxes: TempMailbox[] = [];
  for (const apiBase of MAIL_API_BASES) {
    try {
      boxes.push(await createTempMailboxOn(apiBase));
    } catch {
      // Provider may be down; try the next one.
    }
  }
  if (!boxes.length) {
    throw new Error('Could not create a temp mailbox on mail.gw or mail.tm');
  }
  return boxes;
}

export async function waitForMessage(
  mailbox: TempMailbox,
  options: WaitForMessageOptions = {},
): Promise<MailMessage> {
  const timeoutMs = options.timeoutMs ?? Timeouts.MailPollDefault;
  const pollMs = options.pollMs ?? Timeouts.MailPollInterval;
  const deadline = Date.now() + timeoutMs;
  const apiBase = mailbox.apiBase;

  while (Date.now() < deadline) {
    const listPayload = await (
      await mailFetch(apiBase, '/messages', {
        headers: { Authorization: `Bearer ${mailbox.token}` },
      })
    ).json();
    const messages = hydraMembers<MailMessageSummary>(listPayload);
    let candidates = messages;
    if (options.subjectIncludes) {
      const needle = options.subjectIncludes.toLowerCase();
      candidates = messages.filter((m) =>
        (m.subject ?? '').toLowerCase().includes(needle),
      );
    }

    for (const summary of candidates) {
      if (!summary?.id) {
        continue;
      }
      const full = (await (
        await mailFetch(apiBase, `/messages/${summary.id}`, {
          headers: { Authorization: `Bearer ${mailbox.token}` },
        })
      ).json()) as MailMessage;

      if (options.bodyIncludes) {
        const body = getMessageBody(full).toLowerCase();
        if (!body.includes(options.bodyIncludes.toLowerCase())) {
          continue;
        }
      }

      return full;
    }

    if (!options.subjectIncludes && !options.bodyIncludes && messages[0]?.id) {
      return (await (
        await mailFetch(apiBase, `/messages/${messages[0].id}`, {
          headers: { Authorization: `Bearer ${mailbox.token}` },
        })
      ).json()) as MailMessage;
    }

    await new Promise((resolve) => setTimeout(resolve, pollMs));
  }

  throw new Error(
    `No email received at ${mailbox.address} within ${timeoutMs}ms` +
      (options.subjectIncludes ? ` (subject includes "${options.subjectIncludes}")` : '') +
      (options.bodyIncludes ? ` (body includes "${options.bodyIncludes}")` : ''),
  );
}

export function getMessageBody(message: MailMessage): string {
  const html = Array.isArray(message.html) ? message.html.join('\n') : (message.html ?? '');
  return `${message.subject ?? ''}\n${message.intro ?? ''}\n${message.text ?? ''}\n${html}`;
}

export function expectOrderConfirmationEmail(
  message: MailMessage,
  orderId: string,
): void {
  const subject = message.subject ?? '';
  if (!/order confirmation/i.test(subject) && !/order/i.test(subject)) {
    throw new Error(`Expected order confirmation subject, got: "${subject}"`);
  }
  if (!subject.includes(orderId) && !getMessageBody(message).includes(orderId)) {
    throw new Error(`Expected email to include ${orderId}, got subject: "${subject}"`);
  }

  const body = getMessageBody(message);
  if (!/order confirmation|thank you|order/i.test(body)) {
    throw new Error('Order confirmation email body missing expected confirmation copy');
  }
}

export function extractConfirmLink(message: MailMessage): string {
  return extractGenkiLink(message, /(confirm|verify|token|activat|email)/i, 'confirmation');
}

export function extractResetLink(message: MailMessage): string {
  return extractGenkiLink(message, /(reset-password|reset|password|token)/i, 'password reset');
}

function extractGenkiLink(
  message: MailMessage,
  preferredPattern: RegExp,
  purpose: string,
): string {
  const html = Array.isArray(message.html) ? message.html.join('\n') : (message.html ?? '');
  const blob = `${html}\n${message.text ?? ''}\n${message.intro ?? ''}`;
  const urls = [...blob.matchAll(/https?:\/\/[^\s"'<>\\]+/gi)].map((m) =>
    m[0].replace(/[.,);]+$/, ''),
  );

  const preferred =
    urls.find((url) => /genkiwardrobe\.com/i.test(url) && preferredPattern.test(url)) ??
    urls.find((url) => /genkiwardrobe\.com/i.test(url)) ??
    urls.find((url) => preferredPattern.test(url));

  if (!preferred) {
    throw new Error(
      `No Genki ${purpose} link found in email "${message.subject ?? ''}". URLs: ${urls.join(', ') || '(none)'}`,
    );
  }
  return preferred;
}
