import { AUTH_MESSAGES, TEST_DATA } from '../fixtures/test-data';
import { test, expect } from '../fixtures/test-fixtures';
import { randomEmail } from '../utils/random';

// Avoid overlapping invalid + valid logins (rate limit).
test.describe.configure({ mode: 'serial' });

test.describe('Remember me', () => {
  test('should show Remember me unchecked by default', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.expectLoaded();
    await expect(loginPage.rememberMeLabel).toBeVisible();
    await expect(loginPage.rememberMeCheckbox).not.toBeChecked();
  });

  test('should allow Remember me to be checked and unchecked', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.expectLoaded();
    await loginPage.setRememberMe(true);
    await expect(loginPage.rememberMeCheckbox).toBeChecked();

    await loginPage.setRememberMe(false);
    await expect(loginPage.rememberMeCheckbox).not.toBeChecked();
  });

  test('should stay signed in after reload when Remember me is checked', async ({
    loginPage,
    header,
    homePage,
  }) => {
    await loginPage.open();
    await loginPage.expectLoaded();
    await loginPage.login(TEST_DATA.auth.email, TEST_DATA.auth.password, true);
    await loginPage.expectLoginSuccess();
    await homePage.expectLoaded();
    await header.expectLoggedIn(TEST_DATA.auth.displayName);

    await header.page.reload();
    await header.waitForPageLoad();
    await homePage.expectLoaded();
    await header.expectLoggedIn(TEST_DATA.auth.displayName);
    await header.clickLogout();
    await header.expectLoggedOut();
  });
});

test.describe('Customer login', () => {
  test('should open the login page from the header', async ({ header, loginPage }) => {
    await header.openHome();
    await header.expectLoggedOut();
    await header.clickLogin();
    await loginPage.expectLoaded();
  });

  test('should sign in and land on the homepage with Logout in the header', async ({
    loginPage,
    header,
    homePage,
  }) => {
    await loginPage.open();
    await loginPage.expectLoaded();
    await header.expectLoggedOut();

    await loginPage.login(TEST_DATA.auth.email, TEST_DATA.auth.password);
    await loginPage.expectLoginSuccess();
    await homePage.expectLoaded();
    await header.expectLoggedIn(TEST_DATA.auth.displayName);
  });

  test('should restore the Login link after Logout', async ({ loginPage, header, homePage }) => {
    await loginPage.open();
    await loginPage.expectLoaded();
    await loginPage.login(TEST_DATA.auth.email, TEST_DATA.auth.password);
    await loginPage.expectLoginSuccess();
    await header.expectLoggedIn(TEST_DATA.auth.displayName);

    await header.clickLogout();
    await homePage.expectLoaded();
    await header.expectLoggedOut();
  });

  test('should open the account dashboard from the header greeting', async ({
    loginPage,
    header,
    accountDashboardPage,
  }) => {
    await loginPage.open();
    await loginPage.expectLoaded();
    await loginPage.login(TEST_DATA.auth.email, TEST_DATA.auth.password);
    await loginPage.expectLoginSuccess();
    await header.expectLoggedIn(TEST_DATA.auth.displayName);

    await header.openAccountDashboard();
    await accountDashboardPage.expectLoaded(TEST_DATA.auth.displayName, TEST_DATA.auth.email);
    await header.expectLoggedIn(TEST_DATA.auth.displayName);
  });

  test('should toggle show/hide password on the login form', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.expectLoaded();
    await loginPage.passwordInput.fill(TEST_DATA.auth.password);
    await loginPage.toggleShowPassword();
  });

  test('should open forgot password from the login form', async ({
    loginPage,
    forgotPasswordPage,
  }) => {
    await loginPage.open();
    await loginPage.forgotPasswordLink.click();
    await forgotPasswordPage.expectLoaded();
  });

  test('should require an email on forgot password', async ({ forgotPasswordPage }) => {
    await forgotPasswordPage.open();
    await forgotPasswordPage.expectLoaded();
    await forgotPasswordPage.expectEmailRequired();
  });

  test('should send a password reset email message', async ({ forgotPasswordPage, header }) => {
    await forgotPasswordPage.open();
    await forgotPasswordPage.expectLoaded();
    await forgotPasswordPage.submitEmail(TEST_DATA.auth.email);
    await forgotPasswordPage.expectResetEmailSent();
    await header.expectLoggedOut();
  });

  test('should link back to login from forgot password', async ({
    forgotPasswordPage,
    loginPage,
  }) => {
    await forgotPasswordPage.open();
    await forgotPasswordPage.loginLink.click();
    await loginPage.expectLoaded();
  });

  test('should reject an empty submit', async ({ loginPage, header }) => {
    await loginPage.open();
    await loginPage.expectLoaded();
    await loginPage.submit();
    await loginPage.expectValidationMessage(AUTH_MESSAGES.emailRequired);
    await loginPage.expectValidationMessage(AUTH_MESSAGES.passwordRequired);
    await loginPage.expectLoaded();
    await header.expectLoggedOut();
  });

  test('should require a password when only email is entered', async ({ loginPage, header }) => {
    await loginPage.open();
    await loginPage.expectLoaded();
    await loginPage.emailInput.fill(TEST_DATA.auth.email);
    await loginPage.submit();
    await loginPage.expectValidationMessage(AUTH_MESSAGES.passwordRequired);
    await loginPage.expectLoaded();
    await header.expectLoggedOut();
  });

  test('should require an email when only password is entered', async ({ loginPage, header }) => {
    await loginPage.open();
    await loginPage.expectLoaded();
    await loginPage.passwordInput.fill(TEST_DATA.auth.password);
    await loginPage.submit();
    await loginPage.expectValidationMessage(AUTH_MESSAGES.emailRequired);
    await loginPage.expectLoaded();
    await header.expectLoggedOut();
  });

  test('should reject an invalid email format with an error toast', async ({
    loginPage,
    header,
  }) => {
    await loginPage.open();
    await loginPage.expectLoaded();
    await loginPage.login(TEST_DATA.auth.invalidEmail, TEST_DATA.auth.password);
    await loginPage.expectInvalidCredentials();
    await header.expectLoggedOut();
  });

  test('should reject an unknown email with an error toast', async ({ loginPage, header }) => {
    await loginPage.open();
    await loginPage.expectLoaded();
    await loginPage.login(TEST_DATA.auth.unknownEmail, TEST_DATA.auth.password);
    await loginPage.expectInvalidCredentials();
    await header.expectLoggedOut();
  });

  test('should reject a wrong password with an error toast', async ({ loginPage, header }) => {
    await loginPage.open();
    await loginPage.expectLoaded();
    await loginPage.login(TEST_DATA.auth.email, TEST_DATA.auth.wrongPassword);
    await loginPage.expectInvalidCredentials();
    await header.expectLoggedOut();
  });
});

test.describe('Customer register', () => {
  test('should open the register page from the login form', async ({
    loginPage,
    registerPage,
    header,
  }) => {
    await loginPage.open();
    await loginPage.registerLink.click();
    await registerPage.expectLoaded();
    await header.expectLoggedOut();
  });

  test('should link back to login from the register form', async ({
    registerPage,
    loginPage,
    header,
  }) => {
    await registerPage.open();
    await registerPage.loginLink.click();
    await loginPage.expectLoaded();
    await header.expectLoggedOut();
  });

  test('should reject an invalid email on register', async ({ registerPage, header }) => {
    await registerPage.open();
    await registerPage.register(TEST_DATA.auth.invalidEmail, TEST_DATA.auth.password);
    await registerPage.expectValidationMessage(AUTH_MESSAGES.validEmail);
    await registerPage.expectLoaded();
    await header.expectLoggedOut();
  });

  test('should require an email on empty register submit', async ({ registerPage, header }) => {
    await registerPage.open();
    await registerPage.expectEmailRequired();
    await registerPage.expectLoaded();
    await header.expectLoggedOut();
  });

  test('should show password rules when password is missing', async ({ registerPage, header }) => {
    await registerPage.open();
    await registerPage.emailInput.fill(randomEmail());
    await registerPage.submitButton.click();
    await registerPage.expectValidationMessage(AUTH_MESSAGES.passwordLength);
    await registerPage.expectValidationMessage(AUTH_MESSAGES.passwordUppercase);
    await registerPage.expectValidationMessage(AUTH_MESSAGES.passwordNumber);
    await registerPage.expectValidationMessage(AUTH_MESSAGES.passwordSpecial);
    await registerPage.expectLoaded();
    await header.expectLoggedOut();
  });

  test('should show password rules for a weak password', async ({ registerPage, header }) => {
    await registerPage.open();
    await registerPage.register(randomEmail(), TEST_DATA.auth.weakPassword);
    await registerPage.expectValidationMessage(AUTH_MESSAGES.passwordLength);
    await registerPage.expectLoaded();
    await header.expectLoggedOut();
  });

  test('should reject an email that is already registered', async ({ registerPage, header }) => {
    await registerPage.open();
    await registerPage.register(TEST_DATA.auth.email, TEST_DATA.auth.password);
    await registerPage.expectValidationMessage(AUTH_MESSAGES.accountTaken);
    await registerPage.expectLoaded();
    await header.expectLoggedOut();
  });

  test('should register a new account and prompt for email confirmation', async ({
    registerPage,
    header,
  }) => {
    await registerPage.open();
    const email = randomEmail();
    await registerPage.register(email, TEST_DATA.auth.password);
    await registerPage.expectEmailConfirmation(email);
    await header.expectLoggedOut();
  });
});
