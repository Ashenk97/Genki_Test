import type { RegisterPage } from '@pages/RegisterPage';
import { createTempMailbox, deleteTempMailbox } from '@api/agentmail/AgentMailClient';
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
  const mailbox = await createTempMailbox();
  try {
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
    throw new StagingMailerDownError(
      `Staging could not send a confirmation email (tried ${mailbox.address})`,
    );
  } catch (error) {
    await deleteTempMailbox(mailbox);
    throw error;
  }
}
