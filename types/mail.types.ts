export interface TempMailbox {
  readonly address: string;
  readonly inboxId: string;
  readonly createdAt: string;
  readonly shared: boolean;
}

export interface MailMessage {
  readonly id: string;
  readonly subject?: string;
  readonly text?: string;
  readonly html?: string;
}

export interface WaitForMessageOptions {
  readonly timeoutMs?: number;
  readonly pollMs?: number;
  readonly subjectIncludes?: string;
  readonly bodyIncludes?: string;
}
