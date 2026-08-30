import { AUTH_MESSAGES } from '@constants/messages';
import { TEST_DATA } from '@data/index';
import { test } from '@fixtures/test-fixtures';
import { randomEmail } from '@helpers/random';

test.describe('Remember me', () => {
  test('should show Remember me unchecked by default', async ({ loginPage }) => {
    await test.step('Open login page', async () => {
      await loginPage.open();
      await loginPage.expectLoaded();
    });
    await test.step('Verify Remember me defaults to unchecked', async () => {
      await loginPage.expectRememberMeVisibleAndUnchecked();
    });
  });

  test('should allow Remember me to be checked and unchecked', async ({ loginPage }) => {
    await test.step('Open login page', async () => {
      await loginPage.open();
      await loginPage.expectLoaded();
    });
    await test.step('Toggle Remember me on and off', async () => {
      await loginPage.setRememberMe(true);
      await loginPage.expectRememberMeChecked();
      await loginPage.setRememberMe(false);
      await loginPage.expectRememberMeUnchecked();
    });
  });

  test.describe('session persistence', { tag: '@shared-account' }, () => {
    test.use({ storageState: '.auth/user.json' });

    test('should stay signed in after reload', async ({ header, homePage }) => {
      await test.step('Open home while signed in', async () => {
        await homePage.open();
        await homePage.expectLoaded();
        await header.expectLoggedIn(TEST_DATA.auth.displayName);
      });
      await test.step('Reload and confirm session persists', async () => {
        await header.reloadPage();
        await homePage.expectLoaded();
        await header.expectLoggedIn(TEST_DATA.auth.displayName);
      });
      await test.step('Log out', async () => {
        await header.clickLogout();
        await header.expectLoggedOut();
      });
    });
  });
});

test.describe('Customer login', () => {
  test('should open the login page from the header', async ({ header, loginPage }) => {
    await test.step('Open home as guest', async () => {
      await header.openHome();
      await header.expectLoggedOut();
    });
    await test.step('Navigate to login via header', async () => {
      await header.clickLogin();
      await loginPage.expectLoaded();
    });
  });

  test(
    'should sign in and land on the homepage with Logout in the header',
    { tag: '@shared-account' },
    async ({ loginPage, header, homePage }) => {
      await test.step('Open login while logged out', async () => {
        await loginPage.open();
        await loginPage.expectLoaded();
        await header.expectLoggedOut();
      });
      await test.step('Sign in with valid credentials', async () => {
        await loginPage.login(TEST_DATA.auth.email, TEST_DATA.auth.password);
        await loginPage.expectLoginSuccess();
        await homePage.expectLoaded();
        await header.expectLoggedIn(TEST_DATA.auth.displayName);
      });
    },
  );

  test.describe('signed-in header', { tag: '@shared-account' }, () => {
    test.use({ storageState: '.auth/user.json' });
    test.describe.configure({ mode: 'serial' });

    test('should restore the Login link after Logout', async ({ header, homePage }) => {
      await test.step('Open home while signed in', async () => {
        await homePage.open();
        await header.expectLoggedIn(TEST_DATA.auth.displayName);
      });
      await test.step('Log out and verify guest header', async () => {
        await header.clickLogout();
        await header.expectLoggedOut();
      });
    });

    test('should open the account dashboard from the header greeting', async ({
      header,
      homePage,
      accountDashboardPage,
    }) => {
      await test.step('Open home while signed in', async () => {
        await homePage.open();
        await header.expectLoggedIn(TEST_DATA.auth.displayName);
      });
      await test.step('Open account dashboard from greeting', async () => {
        await header.openAccountDashboard();
        await accountDashboardPage.expectLoaded(TEST_DATA.auth.displayName, TEST_DATA.auth.email);
        await header.expectLoggedIn(TEST_DATA.auth.displayName);
      });
    });
  });

  test('should toggle show/hide password on the login form', async ({ loginPage }) => {
    await test.step('Open login and fill password', async () => {
      await loginPage.open();
      await loginPage.expectLoaded();
      await loginPage.fillPasswordOnly(TEST_DATA.auth.password);
    });
    await test.step('Toggle password visibility', async () => {
      await loginPage.toggleShowPassword();
    });
  });

  test('should reject an empty submit', async ({ loginPage, header }) => {
    await test.step('Submit empty login form', async () => {
      await loginPage.open();
      await loginPage.expectLoaded();
      await loginPage.submit();
      await loginPage.expectValidationMessage(AUTH_MESSAGES.emailRequired);
      await loginPage.expectValidationMessage(AUTH_MESSAGES.passwordRequired);
      await loginPage.expectLoaded();
      await header.expectLoggedOut();
    });
  });

  test('should require a password when only email is entered', async ({ loginPage, header }) => {
    await test.step('Submit email without password', async () => {
      await loginPage.open();
      await loginPage.expectLoaded();
      await loginPage.fillEmailOnly(TEST_DATA.auth.email);
      await loginPage.submit();
      await loginPage.expectValidationMessage(AUTH_MESSAGES.passwordRequired);
      await loginPage.expectLoaded();
      await header.expectLoggedOut();
    });
  });

  test('should require an email when only password is entered', async ({ loginPage, header }) => {
    await test.step('Submit password without email', async () => {
      await loginPage.open();
      await loginPage.expectLoaded();
      await loginPage.fillPasswordOnly(TEST_DATA.auth.password);
      await loginPage.submit();
      await loginPage.expectValidationMessage(AUTH_MESSAGES.emailRequired);
      await loginPage.expectLoaded();
      await header.expectLoggedOut();
    });
  });

  test('should reject an invalid email format with an error toast', async ({
    loginPage,
    header,
  }) => {
    await test.step('Attempt login with invalid email', async () => {
      await loginPage.open();
      await loginPage.expectLoaded();
      await loginPage.fillCredentials(TEST_DATA.auth.invalidEmail, TEST_DATA.auth.password);
      await loginPage.submit();
      await loginPage.expectInvalidCredentials();
      await header.expectLoggedOut();
    });
  });

  test('should reject an unknown email with an error toast', async ({ loginPage, header }) => {
    await test.step('Attempt login with unknown email', async () => {
      await loginPage.open();
      await loginPage.expectLoaded();
      await loginPage.fillCredentials(TEST_DATA.auth.unknownEmail, TEST_DATA.auth.password);
      await loginPage.submit();
      await loginPage.expectInvalidCredentials();
      await header.expectLoggedOut();
    });
  });

  test('should reject a wrong password with an error toast', { tag: '@shared-account' }, async ({ loginPage, header }) => {
    await test.step('Attempt login with wrong password', async () => {
      await loginPage.open();
      await loginPage.expectLoaded();
      await loginPage.fillCredentials(TEST_DATA.auth.email, TEST_DATA.auth.wrongPassword);
      await loginPage.submit();
      await loginPage.expectInvalidCredentials();
      await header.expectLoggedOut();
    });
  });
});

test.describe('Forgot password', () => {
  test('should open forgot password from the login form', async ({
    loginPage,
    forgotPasswordPage,
  }) => {
    await test.step('Open forgot password from login', async () => {
      await loginPage.open();
      await loginPage.openForgotPassword();
      await forgotPasswordPage.expectLoaded();
    });
  });

  test('should require an email on forgot password', async ({ forgotPasswordPage }) => {
    await test.step('Submit forgot password with empty email', async () => {
      await forgotPasswordPage.open();
      await forgotPasswordPage.expectLoaded();
      await forgotPasswordPage.expectEmailRequired();
    });
  });

  test('should send a password reset email message', { tag: '@shared-account' }, async ({ forgotPasswordPage, header }) => {
    await test.step('Request password reset', async () => {
      await forgotPasswordPage.open();
      await forgotPasswordPage.expectLoaded();
      await forgotPasswordPage.submitEmail(TEST_DATA.auth.email);
      if (await forgotPasswordPage.hasSendFailure()) {
        test.skip(true, 'Staging failed to send the password reset email');
      }
      await forgotPasswordPage.expectResetEmailSent();
      await header.expectLoggedOut();
    });
  });

  test('should link back to login from forgot password', async ({
    forgotPasswordPage,
    loginPage,
  }) => {
    await test.step('Return to login from forgot password', async () => {
      await forgotPasswordPage.open();
      await forgotPasswordPage.openLogin();
      await loginPage.expectLoaded();
    });
  });
});

test.describe('Customer register', () => {
  test('should open the register page from the login form', async ({
    loginPage,
    registerPage,
    header,
  }) => {
    await test.step('Open register from login', async () => {
      await loginPage.open();
      await loginPage.openRegister();
      await registerPage.expectLoaded();
      await header.expectLoggedOut();
    });
  });

  test('should link back to login from the register form', async ({
    registerPage,
    loginPage,
    header,
  }) => {
    await test.step('Return to login from register', async () => {
      await registerPage.open();
      await registerPage.openLogin();
      await loginPage.expectLoaded();
      await header.expectLoggedOut();
    });
  });

  test('should reject an invalid email on register', async ({ registerPage, header }) => {
    await test.step('Submit invalid email on register', async () => {
      await registerPage.open();
      await registerPage.register(TEST_DATA.auth.invalidEmail, TEST_DATA.auth.password);
      await registerPage.expectValidationMessage(AUTH_MESSAGES.validEmail);
      await registerPage.expectLoaded();
      await header.expectLoggedOut();
    });
  });

  test('should require an email on empty register submit', async ({ registerPage, header }) => {
    await test.step('Submit empty register form', async () => {
      await registerPage.open();
      await registerPage.expectEmailRequired();
      await registerPage.expectLoaded();
      await header.expectLoggedOut();
    });
  });

  test('should show password rules when password is missing', async ({ registerPage, header }) => {
    await test.step('Submit register with email only', async () => {
      await registerPage.open();
      await registerPage.fillEmailOnly(randomEmail());
      await registerPage.submitEmpty();
      await registerPage.expectValidationMessage(AUTH_MESSAGES.passwordLength);
      await registerPage.expectValidationMessage(AUTH_MESSAGES.passwordUppercase);
      await registerPage.expectValidationMessage(AUTH_MESSAGES.passwordNumber);
      await registerPage.expectValidationMessage(AUTH_MESSAGES.passwordSpecial);
      await registerPage.expectLoaded();
      await header.expectLoggedOut();
    });
  });

  test('should show password rules for a weak password', async ({ registerPage, header }) => {
    await test.step('Submit weak password on register', async () => {
      await registerPage.open();
      await registerPage.register(randomEmail(), TEST_DATA.auth.weakPassword);
      await registerPage.expectValidationMessage(AUTH_MESSAGES.passwordLength);
      await registerPage.expectLoaded();
      await header.expectLoggedOut();
    });
  });

  test('should reject an email that is already registered', async ({ registerPage, header }) => {
    await test.step('Register with an existing email', async () => {
      await registerPage.open();
      await registerPage.register(TEST_DATA.auth.email, TEST_DATA.auth.password);
      await registerPage.expectValidationMessage(AUTH_MESSAGES.accountTaken);
      await registerPage.expectLoaded();
      await header.expectLoggedOut();
    });
  });

  test('should register a new account and prompt for email confirmation', async ({
    registerPage,
    header,
  }) => {
    await test.step('Register a unique account', async () => {
      await registerPage.open();
      const email = randomEmail();
      await registerPage.register(email, TEST_DATA.auth.password);
      const outcome = await registerPage.waitForConfirmationOrMailFailure();
      if (outcome !== 'confirmed') {
        test.skip(true, 'Staging did not complete registration');
      }
      await registerPage.expectEmailConfirmation(email);
      await header.expectLoggedOut();
    });
  });
});
