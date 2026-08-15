import { TEST_DATA } from '../fixtures/test-data';
import { test, expect } from '../fixtures/test-fixtures';
import { resolveTestEnv } from '../fixtures/environments';
import { createTempMailbox, extractConfirmLink, waitForMessage } from '../utils/mail-tm';

test.describe('Register email confirmation', () => {
  test.skip(resolveTestEnv() === 'production', 'Do not create disposable accounts on production');

  test('should receive and accept the account confirmation email', { tag: '@email' }, async ({
    registerPage,
    loginPage,
    header,
  }) => {
    test.setTimeout(120_000);

    const mailbox = await createTempMailbox();

    await registerPage.open();
    await registerPage.register(mailbox.address, TEST_DATA.auth.password);
    await registerPage.expectEmailConfirmation(mailbox.address);

    let message;
    try {
      message = await waitForMessage(mailbox, {
        timeoutMs: 90_000,
        subjectIncludes: 'confirm',
      });
    } catch {
      message = await waitForMessage(mailbox, { timeoutMs: 30_000 });
    }

    const confirmUrl = extractConfirmLink(message);
    await registerPage.page.goto(confirmUrl);
    await registerPage.waitForPageLoad();
    await registerPage.acceptCookiesIfVisible();

    await expect(registerPage.page.getByText(/confirm|verif|success|activated|thank you/i).first()).toBeVisible({
      timeout: 20_000,
    });

    await loginPage.open();
    await loginPage.login(mailbox.address, TEST_DATA.auth.password);

    await Promise.race([
      loginPage.expectLoginSuccess(),
      loginPage.expectInvalidCredentials().then(() => {
        throw new Error('Login rejected after confirmation — account may still be unverified');
      }),
    ]);

    await header.expectLoggedIn();
  });
});
