import { resolveTestEnv } from '../fixtures/environments';
import { test, expect } from '../fixtures/test-fixtures';
import { randomString } from '../utils/random';
import {
  createTempMailbox,
  extractConfirmLink,
  extractResetLink,
  waitForMessage,
} from '../utils/mail-tm';

test.describe('Forgot password email reset', () => {
  test.skip(resolveTestEnv() === 'production', 'Do not create disposable accounts on production');

  test(
    'should register via temp mail, reset password from email, and login with the new password',
    { tag: '@email' },
    async ({ registerPage, forgotPasswordPage, resetPasswordPage, loginPage, header }) => {
      test.setTimeout(180_000);

      const mailbox = await createTempMailbox();
      const initialPassword = `Genki!${randomString(10)}1`;
      const newPassword = `Genki!${randomString(10)}2`;

      await registerPage.open();
      await registerPage.register(mailbox.address, initialPassword);
      await registerPage.expectEmailConfirmation(mailbox.address);

      let confirmMessage;
      try {
        confirmMessage = await waitForMessage(mailbox, {
          timeoutMs: 90_000,
          subjectIncludes: 'confirm',
        });
      } catch {
        confirmMessage = await waitForMessage(mailbox, { timeoutMs: 30_000 });
      }

      const confirmUrl = extractConfirmLink(confirmMessage);
      await registerPage.page.goto(confirmUrl);
      await registerPage.waitForPageLoad();
      await registerPage.acceptCookiesIfVisible();
      await expect(
        registerPage.page.getByText(/confirm|verif|success|activated|thank you/i).first(),
      ).toBeVisible({ timeout: 20_000 });

      await forgotPasswordPage.open();
      await forgotPasswordPage.expectLoaded();
      await forgotPasswordPage.submitEmail(mailbox.address);
      await forgotPasswordPage.expectResetEmailSent();

      const resetMessage = await waitForMessage(mailbox, {
        timeoutMs: 90_000,
        subjectIncludes: 'reset',
      });
      const resetUrl = extractResetLink(resetMessage);

      await resetPasswordPage.page.goto(resetUrl);
      await resetPasswordPage.waitForPageLoad();
      await resetPasswordPage.acceptCookiesIfVisible();
      await resetPasswordPage.expectLoaded();
      await resetPasswordPage.resetPassword(newPassword);
      await resetPasswordPage.expectRedirectedToLogin();

      await loginPage.expectLoaded();
      await loginPage.login(mailbox.address, newPassword);
      await loginPage.expectLoginSuccess();
      await header.expectLoggedIn();

      await header.clickLogout();
      await header.expectLoggedOut();

      await loginPage.open();
      await loginPage.login(mailbox.address, initialPassword);
      await loginPage.expectInvalidCredentials();
    },
  );
});
