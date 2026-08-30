import { AppRoutes } from '@constants/routes';
import { test } from '@fixtures/test-fixtures';
import { randomEmail, strongPassword } from '@helpers/random';

test.describe('Account edges', () => {
  test('should reject a reset-password link with an invalid token', async ({
    resetPasswordPage,
  }) => {
    await test.step('Open reset password with a bogus token', async () => {
      await resetPasswordPage.open(`${AppRoutes.ResetPassword}?token=invalid-qa-token`);
      await resetPasswordPage.expectInvalidOrExpiredToken();
    });
  });

  test('should reject mismatched reset-password fields when the form is shown', async ({
    resetPasswordPage,
  }) => {
    await test.step('Open reset password without a token', async () => {
      await resetPasswordPage.open(AppRoutes.ResetPassword);
    });
    await test.step('Mismatched passwords stay on the reset page', async () => {
      const formVisible = await resetPasswordPage.page
        .locator('input[name="password"]')
        .isVisible()
        .catch(() => false);
      if (!formVisible) {
        await resetPasswordPage.expectInvalidOrExpiredToken();
        return;
      }
      await resetPasswordPage.resetPassword(strongPassword(), `${strongPassword()}x`);
      await resetPasswordPage.expectPasswordMismatch();
    });
  });

  test('should not allow login before the confirmation email is used', async ({
    registerPage,
    loginPage,
  }) => {
    const email = randomEmail();
    const password = strongPassword();

    await test.step('Register a new account', async () => {
      await registerPage.open();
      await registerPage.expectLoaded();
      await registerPage.register(email, password);
      await registerPage.waitForConfirmationOrMailFailure();
    });
    await test.step('Login is rejected until the account is confirmed', async () => {
      await loginPage.open();
      await loginPage.submitLogin(email, password);
      await loginPage.expectLoginRejected();
    });
  });

  test('should keep email confirmation without a token from signing the guest in', async ({
    registerPage,
    header,
  }) => {
    await test.step('Open confirmation with no token', async () => {
      await registerPage.goto(AppRoutes.EmailConfirmation);
      await header.expectLoggedOut();
    });
  });
});
