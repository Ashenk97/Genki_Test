import type { RegisterPage } from '@pages/RegisterPage';
import { createTempMailboxes } from '@api/mail-tm/MailTmClient';
import type { TempMailbox } from '@models/mail.types';

export class StagingMailerDownError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'StagingMailerDownError';
  }
}

export async function registerWithFreshMailbox(
  registerPage: RegisterPage,
  password: string,
): Promise<TempMailbox> {
  const mailboxes = await createTempMailboxes();
  const attempted: string[] = [];

  for (const mailbox of mailboxes) {
    attempted.push(mailbox.address);
    await registerPage.open();
    await registerPage.register(mailbox.address, password);
    let outcome = await registerPage.waitForConfirmationOrMailFailure();
    if (outcome !== 'confirmed') {
      await registerPage.register(mailbox.address, password);
      outcome = await registerPage.waitForConfirmationOrMailFailure();
    }
    if (outcome === 'confirmed') {
      await registerPage.expectEmailConfirmation(mailbox.address);
      return mailbox;
    }
  }

  throw new StagingMailerDownError(
    `Staging could not send a confirmation email (tried ${attempted.join(', ')})`,
  );
}
