export interface TempMailbox {
  readonly address: string;
  readonly password: string;
  readonly token: string;
  readonly apiBase: string;
}

export interface MailMessageSummary {
  readonly id: string;
  readonly subject?: string;
  readonly intro?: string;
}

export interface MailMessage extends MailMessageSummary {
  readonly text?: string;
  readonly html?: string[] | string;
}

export interface WaitForMessageOptions {
  readonly timeoutMs?: number;
  readonly pollMs?: number;
  readonly subjectIncludes?: string;
  readonly bodyIncludes?: string;
}

export interface MailTmDomain {
  readonly domain: string;
  readonly isActive?: boolean;
}

export interface MailTmHydraCollection<T> {
  readonly 'hydra:member': T[];
}
