import { AgentMailClient } from 'agentmail';
import { Timeouts } from '@constants/timeouts';
import { randomString } from '@helpers/random';
import type { MailMessage, TempMailbox, WaitForMessageOptions } from '@models/mail.types';

let client: AgentMailClient | undefined;

function getClient(): AgentMailClient {
  const apiKey = process.env.AGENTMAIL_API_KEY?.trim();
  if (!apiKey) {
    throw new Error(
      'Missing AGENTMAIL_API_KEY. Copy it from the AgentMail dashboard into .env / .env.staging.',
    );
  }
  if (!client) {
    client = new AgentMailClient({ apiKey });
  }
  return client;
}

export function hasAgentMailApiKey(): boolean {
  return Boolean(process.env.AGENTMAIL_API_KEY?.trim());
}

const DEFAULT_INBOX_EMAIL = 'genkiqa@agentmail.to';

function sharedInboxEmail(): string {
  return process.env.AGENTMAIL_INBOX_EMAIL?.trim() || DEFAULT_INBOX_EMAIL;
}

export async function createTempMailbox(): Promise<TempMailbox> {
  const inboxEmail = sharedInboxEmail();
  const inbox = await getClient().inboxes.get(inboxEmail);
  const at = inboxEmail.lastIndexOf('@');
  const local = at > 0 ? inboxEmail.slice(0, at) : inboxEmail;
  const domain = at > 0 ? inboxEmail.slice(at + 1) : 'agentmail.to';
  const tag = `${Date.now().toString(36)}${randomString(4)}`;
  return {
    address: `${local}+${tag}@${domain}`,
    inboxId: inbox.inboxId,
    createdAt: new Date().toISOString(),
    shared: true,
  };
}

export async function deleteTempMailbox(mailbox: TempMailbox | undefined): Promise<void> {
  if (!mailbox?.inboxId || mailbox.shared) {
    return;
  }
  await getClient()
    .inboxes.delete(mailbox.inboxId)
    .catch(() => undefined);
}

export async function waitForMessage(
  mailbox: TempMailbox,
  options: WaitForMessageOptions = {},
): Promise<MailMessage> {
  const timeoutMs = options.timeoutMs ?? Timeouts.MailPollDefault;
  const pollMs = options.pollMs ?? Timeouts.MailPollInterval;
  const deadline = Date.now() + timeoutMs;
  const mail = getClient();

  while (Date.now() < deadline) {
    const listed = await mail.inboxes.messages.list(mailbox.inboxId, {
      limit: 20,
      includeSpam: true,
      after: new Date(mailbox.createdAt),
      to: [mailbox.address],
    });

    let candidates = listed.messages ?? [];
    if (options.subjectIncludes) {
      const needle = options.subjectIncludes.toLowerCase();
      candidates = candidates.filter((message) =>
        (message.subject ?? '').toLowerCase().includes(needle),
      );
    }

    for (const summary of candidates) {
      const full = await mail.inboxes.messages.get(mailbox.inboxId, summary.messageId);
      const mapped = toMailMessage(full);
      if (options.bodyIncludes) {
        if (!getMessageBody(mapped).toLowerCase().includes(options.bodyIncludes.toLowerCase())) {
          continue;
        }
      }
      return mapped;
    }

    if (!options.subjectIncludes && !options.bodyIncludes && candidates[0]?.messageId) {
      const full = await mail.inboxes.messages.get(mailbox.inboxId, candidates[0].messageId);
      return toMailMessage(full);
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
  return `${message.subject ?? ''}\n${message.text ?? ''}\n${message.html ?? ''}`;
}

export function expectOrderConfirmationEmail(message: MailMessage, orderId: string): void {
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

function toMailMessage(message: {
  messageId: string;
  subject?: string;
  extractedText?: string;
  text?: string;
  extractedHtml?: string;
  html?: string;
}): MailMessage {
  return {
    id: message.messageId,
    subject: message.subject,
    text: message.extractedText ?? message.text,
    html: message.extractedHtml ?? message.html,
  };
}

function extractGenkiLink(
  message: MailMessage,
  preferredPattern: RegExp,
  purpose: string,
): string {
  const blob = `${message.html ?? ''}\n${message.text ?? ''}`;
  const urls = [...blob.matchAll(/https?:\/\/[^\s"'<>\\]+/gi)].map((match) =>
    match[0].replace(/[.,);]+$/, ''),
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
