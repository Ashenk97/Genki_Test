import { PaymentMethod } from '@constants/payment';
import { Timeouts } from '@constants/timeouts';
import { TEST_DATA } from '@data/index';
import { guestCheckoutEmail } from '@data/checkout.data';
import { test } from '@fixtures/test-fixtures';
import { addSampleProductToCart } from '@helpers/cart.helper';
import { startGuestCardCheckout } from '@helpers/checkout.helper';

test.describe('Checkout', () => {
  test.describe.configure({ mode: 'parallel' });

  test('should load checkout with billing and payment methods', async ({
    productDetailsPage,
    checkoutPage,
  }) => {
    await test.step('Add product and open checkout', async () => {
      await addSampleProductToCart(productDetailsPage);
      await checkoutPage.open();
      await checkoutPage.expectLoaded();
    });
  });

  test('should keep place order disabled when billing is incomplete', async ({
    productDetailsPage,
    checkoutPage,
  }) => {
    await test.step('Open checkout without completing billing', async () => {
      await addSampleProductToCart(productDetailsPage);
      await checkoutPage.open();
      await checkoutPage.selectPayment(PaymentMethod.COD);
      await checkoutPage.expectPlaceOrderDisabled();
      await checkoutPage.expectStillOnCheckout();
    });
  });

  test('should place a COD order as a guest', { tag: '@checkout' }, async ({
    productDetailsPage,
    checkoutPage,
  }) => {
    await test.step('Fill COD guest checkout', async () => {
      await addSampleProductToCart(productDetailsPage);
      await checkoutPage.open();
      await checkoutPage.fillGuestBilling(guestCheckoutEmail('guest-cod'));
      await checkoutPage.selectPayment(PaymentMethod.COD);
      await checkoutPage.acceptTerms();
      await checkoutPage.placeOrder();
    });
    await test.step('Verify COD order success', async () => {
      await checkoutPage.expectOrderSuccess(PaymentMethod.COD);
      await checkoutPage.expectCodInstructions();
    });
  });

  test('should place a bank transfer order as a guest', { tag: '@checkout' }, async ({
    productDetailsPage,
    checkoutPage,
  }) => {
    await test.step('Fill bank transfer guest checkout', async () => {
      await addSampleProductToCart(productDetailsPage);
      await checkoutPage.open();
      await checkoutPage.fillGuestBilling(guestCheckoutEmail('guest-bank'));
      await checkoutPage.selectPayment(PaymentMethod.BankTransfer);
      await checkoutPage.acceptTerms();
      await checkoutPage.placeOrder();
    });
    await test.step('Verify bank transfer order success', async () => {
      await checkoutPage.expectOrderSuccess(PaymentMethod.BankTransfer);
      await checkoutPage.expectBankTransferInstructions();
    });
  });

  test.describe('PayHere card payments', () => {
    test.describe.configure({ mode: 'serial', timeout: Timeouts.PayHereCheckout });

    test(
      'should place a successful Visa card order via PayHere sandbox',
      { tag: ['@checkout', '@payment'] },
      async ({ productDetailsPage, checkoutPage, payHereCheckout }) => {
        await test.step('Start card checkout', async () => {
          await startGuestCardCheckout(productDetailsPage, checkoutPage);
        });
        await test.step('Pay with sandbox Visa and confirm success', async () => {
          await payHereCheckout.payWithCard(TEST_DATA.payhere.cards.success.visa);
          await payHereCheckout.expectPaymentApproved();
          await checkoutPage.expectCardPaymentReceived();
        });
      },
    );

    test(
      'should place a successful MasterCard order via PayHere sandbox',
      { tag: ['@checkout', '@payment'] },
      async ({ productDetailsPage, checkoutPage, payHereCheckout }) => {
        await test.step('Start card checkout', async () => {
          await startGuestCardCheckout(productDetailsPage, checkoutPage);
        });
        await test.step('Pay with sandbox MasterCard and confirm success', async () => {
          await payHereCheckout.payWithCard(TEST_DATA.payhere.cards.success.master);
          await payHereCheckout.expectPaymentApproved();
          await checkoutPage.expectCardPaymentReceived();
        });
      },
    );

    test(
      'should decline a Visa card with insufficient funds',
      { tag: ['@checkout', '@payment'] },
      async ({ productDetailsPage, checkoutPage, payHereCheckout }) => {
        await test.step('Start card checkout', async () => {
          await startGuestCardCheckout(productDetailsPage, checkoutPage);
        });
        await test.step('Expect insufficient funds decline', async () => {
          await payHereCheckout.payWithCard(TEST_DATA.payhere.cards.insufficientFunds.visa);
          await payHereCheckout.expectPaymentDeclined();
          await checkoutPage.expectNotOnOrderSuccess();
        });
      },
    );

    test(
      'should decline a MasterCard when limit is exceeded',
      { tag: ['@checkout', '@payment'] },
      async ({ productDetailsPage, checkoutPage, payHereCheckout }) => {
        await test.step('Start card checkout', async () => {
          await startGuestCardCheckout(productDetailsPage, checkoutPage);
        });
        await test.step('Expect limit exceeded decline', async () => {
          await payHereCheckout.payWithCard(TEST_DATA.payhere.cards.limitExceeded.master);
          await payHereCheckout.expectPaymentDeclined();
          await checkoutPage.expectNotOnOrderSuccess();
        });
      },
    );

    test(
      'should decline a Visa card with do not honor',
      { tag: ['@checkout', '@payment'] },
      async ({ productDetailsPage, checkoutPage, payHereCheckout }) => {
        await test.step('Start card checkout', async () => {
          await startGuestCardCheckout(productDetailsPage, checkoutPage);
        });
        await test.step('Expect do-not-honor decline', async () => {
          await payHereCheckout.payWithCard(TEST_DATA.payhere.cards.doNotHonor.visa);
          await payHereCheckout.expectPaymentDeclined();
          await checkoutPage.expectNotOnOrderSuccess();
        });
      },
    );

    test(
      'should decline a Visa card on network error',
      { tag: ['@checkout', '@payment'] },
      async ({ productDetailsPage, checkoutPage, payHereCheckout }) => {
        await test.step('Start card checkout', async () => {
          await startGuestCardCheckout(productDetailsPage, checkoutPage);
        });
        await test.step('Expect network error decline', async () => {
          await payHereCheckout.payWithCard(TEST_DATA.payhere.cards.networkError.visa);
          await payHereCheckout.expectPaymentDeclined();
          await checkoutPage.expectNotOnOrderSuccess();
        });
      },
    );
  });
});
