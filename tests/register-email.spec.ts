import { Timeouts } from '@constants/timeouts';
import { isProductionEnv } from '@constants/environments';
import { TEST_DATA } from '@data/index';
import {
  createTempMailbox,
  extractConfirmLink,
  waitForMessage,
} from '@api/mail-tm/MailTmClient';
import { test } from '@fixtures/test-fixtures';

test.describe('Register email confirmation', () => {
  test.skip(isProductionEnv(), 'Do not create disposable accounts on production');

  test('should receive and accept the account confirmation email', { tag: '@email' }, async ({
    registerPage,
    loginPage,
    header,
  }) => {
    test.setTimeout(Timeouts.EmailFlow);

    const mailbox = await test.step('Create temporary mailbox', async () => {
      return createTempMailbox();
    });

    await test.step('Register with temp mailbox', async () => {
      await registerPage.open();
      await registerPage.register(mailbox.address, TEST_DATA.auth.password);
      await registerPage.expectEmailConfirmation(mailbox.address);
    });

    const confirmUrl = await test.step('Wait for confirmation email', async () => {
      let message;
      try {
        message = await waitForMessage(mailbox, {
          timeoutMs: Timeouts.MailPollDefault,
          subjectIncludes: 'confirm',
        });
      } catch {
        message = await waitForMessage(mailbox, { timeoutMs: Timeouts.MailPollFallback });
      }
      return extractConfirmLink(message);
    });

    await test.step('Open confirmation link', async () => {
      await registerPage.openExternalUrl(confirmUrl);
      await registerPage.expectAccountConfirmed();
    });

    await test.step('Login with confirmed account', async () => {
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
});
