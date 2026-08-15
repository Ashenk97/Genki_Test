import { PaymentMethod } from '@constants/payment';
import { Timeouts } from '@constants/timeouts';
import { isProductionEnv } from '@constants/environments';
import {
  createTempMailbox,
  expectOrderConfirmationEmail,
  waitForMessage,
} from '@api/mail-tm/MailTmClient';
import { test } from '@fixtures/test-fixtures';
import { addSampleProductToCart } from '@helpers/cart.helper';

test.describe('Order confirmation email', () => {
  test.skip(isProductionEnv(), 'Do not place disposable checkout orders on production');

  test(
    'should send an order confirmation email after guest COD checkout',
    { tag: ['@email', '@checkout'] },
    async ({ productDetailsPage, checkoutPage }) => {
      test.setTimeout(Timeouts.EmailFlow);

      const mailbox = await test.step('Create temporary mailbox', async () => {
        return createTempMailbox();
      });

      const orderId = await test.step('Place guest COD order with temp email', async () => {
        await addSampleProductToCart(productDetailsPage);
        await checkoutPage.open();
        await checkoutPage.fillGuestBilling(mailbox.address);
        await checkoutPage.selectPayment(PaymentMethod.COD);
        await checkoutPage.acceptTerms();
        await checkoutPage.placeOrder();
        await checkoutPage.expectOrderSuccess(PaymentMethod.COD);
        await checkoutPage.expectCodInstructions();
        return checkoutPage.getOrderId();
      });

      const message = await test.step('Wait for order confirmation email', async () => {
        try {
          return await waitForMessage(mailbox, {
            timeoutMs: Timeouts.MailPollDefault,
            subjectIncludes: 'Order Confirmation',
            bodyIncludes: orderId,
          });
        } catch {
          return waitForMessage(mailbox, {
            timeoutMs: Timeouts.MailPollFallback,
            subjectIncludes: orderId,
          });
        }
      });

      await test.step('Verify confirmation email content', async () => {
        expectOrderConfirmationEmail(message, orderId);
      });
    },
  );
});
