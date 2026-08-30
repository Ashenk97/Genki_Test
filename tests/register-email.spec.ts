import { Timeouts } from '@constants/timeouts';
import { isProductionEnv } from '@constants/environments';
import { TEST_DATA } from '@data/index';
import {
  deleteTempMailbox,
  extractConfirmLink,
  hasAgentMailApiKey,
  waitForMessage,
} from '@api/agentmail/AgentMailClient';
import { test } from '@fixtures/test-fixtures';
import { registerWithFreshMailbox, StagingMailerDownError } from '@helpers/email-account.helper';
import type { TempMailbox } from '@models/mail.types';

test.describe('Register email confirmation', () => {
  test.skip(isProductionEnv(), 'Do not create disposable accounts on production');
  test.skip(!hasAgentMailApiKey(), 'AGENTMAIL_API_KEY is not set');

  test('should receive and accept the account confirmation email', { tag: '@email' }, async ({
    registerPage,
    loginPage,
    header,
  }) => {
    test.setTimeout(Timeouts.EmailFlow);
    let mailbox: TempMailbox | undefined;

    try {
      mailbox = await test.step('Register with AgentMail inbox', async () => {
        try {
          return await registerWithFreshMailbox(registerPage, TEST_DATA.auth.password);
        } catch (error) {
          if (error instanceof StagingMailerDownError) {
            test.skip(true, error.message);
          }
          throw error;
        }
      });
      if (!mailbox) {
        throw new Error('AgentMail inbox was not created');
      }
      const inbox = mailbox;

      const confirmUrl = await test.step('Wait for confirmation email', async () => {
        let message;
        try {
          message = await waitForMessage(inbox, {
            timeoutMs: Timeouts.MailPollDefault,
            subjectIncludes: 'confirm',
          });
        } catch {
          message = await waitForMessage(inbox, { timeoutMs: Timeouts.MailPollFallback });
        }
        return extractConfirmLink(message);
      });

      await test.step('Open confirmation link', async () => {
        await registerPage.openExternalUrl(confirmUrl);
        await registerPage.expectAccountConfirmed();
      });

      await test.step('Login with confirmed account', async () => {
        await loginPage.open();
        await loginPage.login(inbox.address, TEST_DATA.auth.password);
        await loginPage.expectLoginSuccess();
        await header.expectLoggedIn();
      });
    } finally {
      await deleteTempMailbox(mailbox);
    }
  });
});
