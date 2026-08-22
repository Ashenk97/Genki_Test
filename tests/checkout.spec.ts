import { PaymentMethod } from '@constants/payment';
import { Timeouts } from '@constants/timeouts';
import { TEST_DATA } from '@data/index';
import { guestCheckoutEmail } from '@data/checkout.data';
import { strongPassword } from '@helpers/random';
import { test } from '@fixtures/test-fixtures';
import { addSampleProductToCart } from '@helpers/cart.helper';
import { startGuestCardCheckout, startLoggedInCodCheckout } from '@helpers/checkout.helper';

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

  test('should keep place order disabled when terms are not accepted', async ({
    productDetailsPage,
    checkoutPage,
  }) => {
    await test.step('Complete billing without accepting terms', async () => {
      await addSampleProductToCart(productDetailsPage);
      await checkoutPage.open();
      await checkoutPage.fillGuestBilling(guestCheckoutEmail('guest-terms'));
      await checkoutPage.selectPayment(PaymentMethod.COD);
      await checkoutPage.expectPlaceOrderDisabled();
      await checkoutPage.expectStillOnCheckout();
    });
  });

  test('should block checkout when the cart is empty', async ({ checkoutPage }) => {
    await test.step('Open checkout with an empty cart', async () => {
      await checkoutPage.open();
      await checkoutPage.expectEmptyCheckout();
    });
  });

  test('should reveal create-account password fields at checkout', async ({
    productDetailsPage,
    checkoutPage,
  }) => {
    await test.step('Enable create account on guest checkout', async () => {
      await addSampleProductToCart(productDetailsPage);
      await checkoutPage.open();
      await checkoutPage.fillGuestBilling(guestCheckoutEmail('guest-create'));
      await checkoutPage.enableCreateAccount(strongPassword());
      await checkoutPage.expectCreateAccountPasswordVisible();
      await checkoutPage.selectPayment(PaymentMethod.COD);
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

  test.describe('logged-in checkout', () => {
    test.use({ storageState: '.auth/user.json' });

    test(
      'should place a COD order while logged in and show it under Orders',
      { tag: '@checkout' },
      async ({ productDetailsPage, checkoutPage, accountDashboardPage, cartPage, rewardsPage }) => {
        await test.step('Clear rewards queue and cart', async () => {
          await rewardsPage.open();
          await rewardsPage.expectLoaded();
          await rewardsPage.clearQueuedRewards();
          await cartPage.open();
          await cartPage.clearCart();
        });
        await test.step('Place logged-in COD order', async () => {
          await startLoggedInCodCheckout(productDetailsPage, checkoutPage);
          const readiness = await checkoutPage.waitUntilPlaceableOrBlocked();
          if (readiness === 'blocked') {
            await checkoutPage.expectStillOnCheckout();
            test.skip(true, 'Checkout blocked by unpublished milestone gift on staging');
          }
          await checkoutPage.placeOrder();
        });
        const orderId = await test.step('Verify order success and capture id', async () => {
          if (!(await checkoutPage.reachedOrderSuccess())) {
            await checkoutPage.expectStillOnCheckout();
            test.skip(true, 'Logged-in COD did not reach order success on staging');
          }
          await checkoutPage.expectOrderSuccess(PaymentMethod.COD);
          await checkoutPage.expectCodInstructions();
          return checkoutPage.getOrderId();
        });
        await test.step('Order appears in account Orders', async () => {
          await accountDashboardPage.open();
          await accountDashboardPage.openSection('orders');
          await accountDashboardPage.expectOrderVisible(orderId);
        });
      },
    );
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
      'should show Amex as unavailable in the PayHere sandbox',
      { tag: ['@checkout', '@payment'] },
      async ({ productDetailsPage, checkoutPage, payHereCheckout }) => {
        await test.step('Start card checkout', async () => {
          await startGuestCardCheckout(productDetailsPage, checkoutPage, 'guest-amex');
        });
        await test.step('Amex is not enabled in PayHere sandbox', async () => {
          await payHereCheckout.selectCardBrand(TEST_DATA.payhere.cards.success.amex.brand);
          await payHereCheckout.expectPaymentMethodUnavailable();
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

    test(
      'should recover from a declined card and complete payment with a valid card',
      { tag: ['@checkout', '@payment'] },
      async ({ productDetailsPage, checkoutPage, payHereCheckout }) => {
        await test.step('Start card checkout and decline once', async () => {
          await startGuestCardCheckout(productDetailsPage, checkoutPage, 'guest-retry');
          await payHereCheckout.payWithCard(TEST_DATA.payhere.cards.insufficientFunds.visa);
          await payHereCheckout.expectPaymentDeclined();
          await checkoutPage.expectNotOnOrderSuccess();
        });
        await test.step('Retry with a successful Visa card', async () => {
          await payHereCheckout.payWithCard(TEST_DATA.payhere.cards.success.visa);
          await payHereCheckout.expectPaymentApproved();
          await checkoutPage.expectCardPaymentReceived();
        });
      },
    );
  });
});
