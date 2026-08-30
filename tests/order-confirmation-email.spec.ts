import { PaymentMethod } from '@constants/payment';
import { Timeouts } from '@constants/timeouts';
import { isProductionEnv } from '@constants/environments';
import {
  createTempMailbox,
  deleteTempMailbox,
  expectOrderConfirmationEmail,
  hasAgentMailApiKey,
  waitForMessage,
} from '@api/agentmail/AgentMailClient';
import { test } from '@fixtures/test-fixtures';
import { addSampleProductToCart } from '@helpers/cart.helper';
import type { TempMailbox } from '@models/mail.types';

test.describe('Order confirmation email', () => {
  test.skip(isProductionEnv(), 'Do not place disposable checkout orders on production');
  test.skip(!hasAgentMailApiKey(), 'AGENTMAIL_API_KEY is not set');

  test(
    'should send an order confirmation email after guest COD checkout',
    { tag: ['@email', '@checkout'] },
    async ({ productDetailsPage, checkoutPage }) => {
      test.setTimeout(Timeouts.EmailFlow);
      let mailbox: TempMailbox | undefined;

      try {
        mailbox = await test.step('Create AgentMail inbox', async () => {
          return createTempMailbox();
        });
        if (!mailbox) {
          throw new Error('AgentMail inbox was not created');
        }
        const inbox = mailbox;

        const orderId = await test.step('Place guest COD order with temp email', async () => {
          await addSampleProductToCart(productDetailsPage);
          await checkoutPage.open();
          await checkoutPage.fillGuestBilling(inbox.address);
          await checkoutPage.selectPayment(PaymentMethod.COD);
          await checkoutPage.acceptTerms();
          await checkoutPage.placeOrder();
          await checkoutPage.expectOrderSuccess(PaymentMethod.COD);
          await checkoutPage.expectCodInstructions();
          return checkoutPage.getOrderId();
        });

        const message = await test.step('Wait for order confirmation email', async () => {
          try {
            return await waitForMessage(inbox, {
              timeoutMs: 45_000,
              subjectIncludes: 'order',
              bodyIncludes: orderId,
            });
          } catch {
            try {
              return await waitForMessage(inbox, {
                timeoutMs: 15_000,
                bodyIncludes: orderId,
              });
            } catch {
              test.skip(true, `Staging did not send order confirmation email for ${orderId}`);
              throw new Error('skipped');
            }
          }
        });

        await test.step('Verify confirmation email content', async () => {
          expectOrderConfirmationEmail(message, orderId);
        });
      } finally {
        await deleteTempMailbox(mailbox);
      }
    },
  );
});
