import { randomString } from './random';

const API = 'https://api.mail.tm';

export type TempMailbox = {
  address: string;
  password: string;
  token: string;
};

type MailMessageSummary = {
  id: string;
  subject?: string;
  intro?: string;
};

type MailMessage = MailMessageSummary & {
  text?: string;
  html?: string[] | string;
};

async function mailFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const response = await fetch(`${API}${path}`, init);
  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`mail.tm ${init.method ?? 'GET'} ${path} failed (${response.status}): ${body}`);
  }
  return response;
}

export async function createTempMailbox(): Promise<TempMailbox> {
  const domains = (await (await mailFetch('/domains')).json())['hydra:member'] as Array<{
    domain: string;
  }>;
  if (!domains?.length) {
    throw new Error('mail.tm returned no domains');
  }

  const password = `Genki!${randomString(12)}`;
  const requested = `genkiqa${Date.now()}${randomString(4)}@${domains[0].domain}`;

  const account = await (
    await mailFetch('/accounts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: requested, password }),
    })
  ).json();

  const address = String(account.address);
  const tokenBody = await (
    await mailFetch('/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address, password }),
    })
  ).json();

  return { address, password, token: String(tokenBody.token) };
}

export async function waitForMessage(
  mailbox: TempMailbox,
  options: { timeoutMs?: number; pollMs?: number; subjectIncludes?: string } = {},
): Promise<MailMessage> {
  const timeoutMs = options.timeoutMs ?? 90_000;
  const pollMs = options.pollMs ?? 3_000;
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const list = await (
      await mailFetch('/messages', {
        headers: { Authorization: `Bearer ${mailbox.token}` },
      })
    ).json();

    const messages = (list['hydra:member'] ?? []) as MailMessageSummary[];
    const match = options.subjectIncludes
      ? messages.find((m) =>
          (m.subject ?? '').toLowerCase().includes(options.subjectIncludes!.toLowerCase()),
        )
      : messages[0];

    if (match?.id) {
      return (await (
        await mailFetch(`/messages/${match.id}`, {
          headers: { Authorization: `Bearer ${mailbox.token}` },
        })
      ).json()) as MailMessage;
    }

    await new Promise((resolve) => setTimeout(resolve, pollMs));
  }

  throw new Error(
    `No email received at ${mailbox.address} within ${timeoutMs}ms` +
      (options.subjectIncludes ? ` (subject includes "${options.subjectIncludes}")` : ''),
  );
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
    urls.find((url) => /genkiwardrobe\.com/i.test(url));

  if (!preferred) {
    throw new Error(
      `No Genki ${purpose} link found in email "${message.subject ?? ''}". URLs: ${urls.join(', ') || '(none)'}`,
    );
  }
  return preferred;
}
