import { Timeouts } from '@constants/timeouts';
import { isProductionEnv } from '@constants/environments';
import {
  createTempMailbox,
  extractConfirmLink,
  extractResetLink,
  waitForMessage,
} from '@api/mail-tm/MailTmClient';
import { test } from '@fixtures/test-fixtures';
import { strongPassword } from '@helpers/random';

test.describe('Forgot password email reset', () => {
  test.skip(isProductionEnv(), 'Do not create disposable accounts on production');

  test(
    'should register via temp mail, reset password from email, and login with the new password',
    { tag: '@email' },
    async ({ registerPage, forgotPasswordPage, resetPasswordPage, loginPage, header }) => {
      test.setTimeout(Timeouts.PasswordResetFlow);

      const mailbox = await test.step('Create temporary mailbox', async () => {
        return createTempMailbox();
      });
      const initialPassword = strongPassword('1');
      const newPassword = strongPassword('2');

      await test.step('Register and confirm account', async () => {
        await registerPage.open();
        await registerPage.register(mailbox.address, initialPassword);
        await registerPage.expectEmailConfirmation(mailbox.address);

        let confirmMessage;
        try {
          confirmMessage = await waitForMessage(mailbox, {
            timeoutMs: Timeouts.MailPollDefault,
            subjectIncludes: 'confirm',
          });
        } catch {
          confirmMessage = await waitForMessage(mailbox, {
            timeoutMs: Timeouts.MailPollFallback,
          });
        }

        const confirmUrl = extractConfirmLink(confirmMessage);
        await registerPage.openExternalUrl(confirmUrl);
        await registerPage.expectAccountConfirmed();
      });

      await test.step('Request password reset', async () => {
        await forgotPasswordPage.open();
        await forgotPasswordPage.expectLoaded();
        await forgotPasswordPage.submitEmail(mailbox.address);
        await forgotPasswordPage.expectResetEmailSent();
      });

      await test.step('Reset password from email link', async () => {
        const resetMessage = await waitForMessage(mailbox, {
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
        await loginPage.login(mailbox.address, newPassword);
        await loginPage.expectLoginSuccess();
        await header.expectLoggedIn();
        await header.clickLogout();
        await header.expectLoggedOut();
      });

      await test.step('Reject old password', async () => {
        await loginPage.open();
        await loginPage.login(mailbox.address, initialPassword);
        await loginPage.expectInvalidCredentials();
      });
    },
  );
});
