import { Timeouts } from '@constants/timeouts';
import { isProductionEnv } from '@constants/environments';
import { TEST_DATA } from '@data/index';
import {
  extractConfirmLink,
  waitForMessage,
} from '@api/mail-tm/MailTmClient';
import { test } from '@fixtures/test-fixtures';
import { registerWithFreshMailbox, StagingMailerDownError } from '@helpers/email-account.helper';

test.describe('Register email confirmation', () => {
  test.skip(isProductionEnv(), 'Do not create disposable accounts on production');

  test('should receive and accept the account confirmation email', { tag: '@email' }, async ({
    registerPage,
    loginPage,
    header,
  }) => {
    test.setTimeout(Timeouts.EmailFlow);

    const mailbox = await test.step('Register with temp mailbox', async () => {
      try {
        return await registerWithFreshMailbox(registerPage, TEST_DATA.auth.password);
      } catch (error) {
        if (error instanceof StagingMailerDownError) {
          test.skip(true, error.message);
        }
        throw error;
      }
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
      await loginPage.expectLoginSuccess();
      await header.expectLoggedIn();
    });
  });
});
