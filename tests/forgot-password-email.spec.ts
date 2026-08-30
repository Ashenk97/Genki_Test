import { Timeouts } from '@constants/timeouts';
import { isProductionEnv } from '@constants/environments';
import {
  deleteTempMailbox,
  extractConfirmLink,
  extractResetLink,
  hasAgentMailApiKey,
  waitForMessage,
} from '@api/agentmail/AgentMailClient';
import { test } from '@fixtures/test-fixtures';
import { registerWithFreshMailbox, StagingMailerDownError } from '@helpers/email-account.helper';
import { strongPassword } from '@helpers/random';
import type { TempMailbox } from '@models/mail.types';

test.describe('Forgot password email reset', () => {
  test.skip(isProductionEnv(), 'Do not create disposable accounts on production');
  test.skip(!hasAgentMailApiKey(), 'AGENTMAIL_API_KEY is not set');

  test(
    'should register via temp mail, reset password from email, and login with the new password',
    { tag: '@email' },
    async ({ registerPage, forgotPasswordPage, resetPasswordPage, loginPage, header }) => {
      test.setTimeout(Timeouts.PasswordResetFlow);
      let mailbox: TempMailbox | undefined;
      const initialPassword = strongPassword('1');
      const newPassword = strongPassword('2');

      try {
        mailbox = await test.step('Register and confirm account', async () => {
          let created;
          try {
            created = await registerWithFreshMailbox(registerPage, initialPassword);
          } catch (error) {
            if (error instanceof StagingMailerDownError) {
              test.skip(true, error.message);
            }
            throw error;
          }

          let confirmMessage;
          try {
            confirmMessage = await waitForMessage(created, {
              timeoutMs: Timeouts.MailPollDefault,
              subjectIncludes: 'confirm',
            });
          } catch {
            confirmMessage = await waitForMessage(created, {
              timeoutMs: Timeouts.MailPollFallback,
            });
          }

          const confirmUrl = extractConfirmLink(confirmMessage);
          await registerPage.openExternalUrl(confirmUrl);
          await registerPage.expectAccountConfirmed();
          return created;
        });
        if (!mailbox) {
          throw new Error('AgentMail inbox was not created');
        }
        const inbox = mailbox;

        await test.step('Request password reset', async () => {
          await forgotPasswordPage.open();
          await forgotPasswordPage.expectLoaded();
          await forgotPasswordPage.submitEmail(inbox.address);
          if (await forgotPasswordPage.hasSendFailure()) {
            test.skip(true, 'Staging could not send the password reset email');
          }
          await forgotPasswordPage.expectResetEmailSent();
        });

        await test.step('Reset password from email link', async () => {
          const resetMessage = await waitForMessage(inbox, {
            timeoutMs: Timeouts.MailPollDefault,
            subjectIncludes: 'reset',
          });
          const resetUrl = extractResetLink(resetMessage);
          await resetPasswordPage.openExternalUrl(resetUrl);
          await resetPasswordPage.expectLoaded();
          await resetPasswordPage.resetPassword(newPassword);
          await resetPasswordPage.expectRedirectedToLogin();
        });

        await test.step('Login with new password', async () => {
          await loginPage.expectLoaded();
          await loginPage.login(inbox.address, newPassword);
          await loginPage.expectLoginSuccess();
          await header.expectLoggedIn();
          await header.clickLogout();
          await header.expectLoggedOut();
        });

        await test.step('Reject old password', async () => {
          await loginPage.open();
          await loginPage.submitLogin(inbox.address, initialPassword);
          await loginPage.expectInvalidCredentials();
        });
      } finally {
        await deleteTempMailbox(mailbox);
      }
    },
  );
});
