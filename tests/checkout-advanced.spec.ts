import { PaymentMethod } from '@constants/payment';
import { Timeouts } from '@constants/timeouts';
import { guestCheckoutEmail } from '@data/checkout.data';
import { TEST_DATA } from '@data/index';
import { strongPassword } from '@helpers/random';
import { test } from '@fixtures/test-fixtures';
import { addSampleProductToCart, addSecondaryProductToCart } from '@helpers/cart.helper';

test.describe('Checkout advanced flows', () => {
  test.describe.configure({ mode: 'parallel' });

  test('should place a COD order with a separate shipping address', { tag: '@checkout' }, async ({
    productDetailsPage,
    checkoutPage,
  }) => {
    await test.step('Checkout with distinct shipping address', async () => {
      await addSampleProductToCart(productDetailsPage);
      await checkoutPage.open();
      await checkoutPage.fillGuestBilling(guestCheckoutEmail('guest-ship'));
      await checkoutPage.useSeparateShippingAddress();
      await checkoutPage.fillShippingAddress();
      await checkoutPage.selectPayment(PaymentMethod.COD);
      await checkoutPage.acceptTerms();
      await checkoutPage.placeOrder();
    });
    await test.step('Verify COD success', async () => {
      await checkoutPage.expectOrderSuccess(PaymentMethod.COD);
    });
  });

  test('should keep place order disabled for an invalid billing email', async ({
    productDetailsPage,
    checkoutPage,
  }) => {
    await test.step('Submit incomplete/invalid email billing', async () => {
      await addSampleProductToCart(productDetailsPage);
      await checkoutPage.open();
      await checkoutPage.fillGuestBilling(TEST_DATA.auth.invalidEmail);
      await checkoutPage.selectPayment(PaymentMethod.COD);
      await checkoutPage.expectPlaceOrderDisabled();
      await checkoutPage.expectStillOnCheckout();
    });
  });

  test(
    'should surface create-account checkout schema error until GENKI-BUG-002 is fixed',
    { tag: '@checkout' },
    async ({ productDetailsPage, checkoutPage }) => {
      await test.step('Attempt create-account COD checkout', async () => {
        await addSampleProductToCart(productDetailsPage);
        await checkoutPage.open();
        await checkoutPage.fillGuestBilling(guestCheckoutEmail('guest-create-bug'));
        await checkoutPage.enableCreateAccount(strongPassword());
        await checkoutPage.selectPayment(PaymentMethod.COD);
        await checkoutPage.acceptTerms();
        await checkoutPage.placeOrder();
      });
      await test.step('Expect known schema failure (remove when bug is fixed)', async () => {
        await checkoutPage.expectCreateAccountSchemaError();
      });
    },
  );
});

test.describe('Gift checkout', () => {
  test.describe.configure({ mode: 'parallel' });

  test(
    'should disable COD for gift orders while keeping card and bank available',
    { tag: '@checkout' },
    async ({ productDetailsPage, checkoutPage }) => {
      await test.step('Open checkout and enable gift', async () => {
        await addSampleProductToCart(productDetailsPage);
        await checkoutPage.open();
        await checkoutPage.fillGuestBilling(guestCheckoutEmail('guest-gift-cod'));
        await checkoutPage.expectCodPaymentEnabled();
        await checkoutPage.enableGift('Happy birthday from Genki QA!');
      });
      await test.step('COD disabled; card and bank still available', async () => {
        await checkoutPage.expectGiftMessageVisible();
        await checkoutPage.expectCodPaymentDisabledForGift();
        await checkoutPage.expectCardAndBankPaymentsAvailable();
      });
    },
  );

  test(
    'should clear a selected COD payment when the order is marked as a gift',
    { tag: '@checkout' },
    async ({ productDetailsPage, checkoutPage }) => {
      await test.step('Select COD then mark as gift', async () => {
        await addSampleProductToCart(productDetailsPage);
        await checkoutPage.open();
        await checkoutPage.fillGuestBilling(guestCheckoutEmail('guest-gift-clear-cod'));
        await checkoutPage.selectPayment(PaymentMethod.COD);
        await checkoutPage.expectPaymentSelected(PaymentMethod.COD);
        await checkoutPage.enableGift();
      });
      await test.step('COD is deselected and disabled', async () => {
        await checkoutPage.expectCodPaymentDisabledForGift();
        await checkoutPage.expectNoPaymentSelected();
        await checkoutPage.expectCardAndBankPaymentsAvailable();
      });
    },
  );

  test(
    'should restore COD after unchecking the gift option',
    { tag: '@checkout' },
    async ({ productDetailsPage, checkoutPage }) => {
      await test.step('Toggle gift on then off', async () => {
        await addSampleProductToCart(productDetailsPage);
        await checkoutPage.open();
        await checkoutPage.fillGuestBilling(guestCheckoutEmail('guest-gift-toggle'));
        await checkoutPage.enableGift('Temporary gift note');
        await checkoutPage.expectCodPaymentDisabledForGift();
        await checkoutPage.disableGift();
      });
      await test.step('COD available again and gift message hidden', async () => {
        await checkoutPage.expectCodPaymentEnabled();
        await checkoutPage.selectPayment(PaymentMethod.COD);
        await checkoutPage.expectPaymentSelected(PaymentMethod.COD);
      });
    },
  );

  test(
    'should treat gift message as optional and cap length at 300 characters',
    { tag: '@checkout' },
    async ({ productDetailsPage, checkoutPage }) => {
      await test.step('Enable gift and assert message rules', async () => {
        await addSampleProductToCart(productDetailsPage);
        await checkoutPage.open();
        await checkoutPage.fillGuestBilling(guestCheckoutEmail('guest-gift-message'));
        await checkoutPage.enableGift();
        await checkoutPage.expectGiftMessageVisible();
        await checkoutPage.expectGiftMessageMaxLength(300);
        await checkoutPage.fillGiftMessage('A'.repeat(350));
        await checkoutPage.expectGiftMessageValue('A'.repeat(300));
        await checkoutPage.fillGiftMessage('');
        await checkoutPage.expectGiftMessageValue('');
        await checkoutPage.selectPayment(PaymentMethod.BankTransfer);
        await checkoutPage.expectPaymentSelected(PaymentMethod.BankTransfer);
      });
    },
  );

  test.describe('Gift order placement', () => {
    test.describe.configure({ mode: 'serial', timeout: Timeouts.PayHereCheckout });

    test(
      'should place a bank transfer gift order with an empty gift message',
      { tag: '@checkout' },
      async ({ productDetailsPage, checkoutPage }) => {
        await test.step('Place gift bank transfer with empty message', async () => {
          await addSecondaryProductToCart(productDetailsPage);
          await checkoutPage.open();
          await checkoutPage.fillGuestBilling(guestCheckoutEmail('guest-gift-empty-msg'));
          await checkoutPage.enableGift();
          await checkoutPage.expectGiftMessageValue('');
          await checkoutPage.expectCodPaymentDisabledForGift();
          await checkoutPage.selectPayment(PaymentMethod.BankTransfer);
          await checkoutPage.acceptTerms();
          await checkoutPage.placeOrder();
        });
        await test.step('Verify bank transfer success', async () => {
          await checkoutPage.expectOrderSuccess(PaymentMethod.BankTransfer);
          await checkoutPage.expectBankTransferInstructions();
        });
      },
    );

    test(
      'should place a bank transfer gift order with message, notes, and separate shipping',
      { tag: '@checkout' },
      async ({ productDetailsPage, checkoutPage }) => {
        await test.step('Checkout gift order with bank transfer', async () => {
          await addSecondaryProductToCart(productDetailsPage);
          await checkoutPage.open();
          await checkoutPage.fillGuestBilling(guestCheckoutEmail('guest-gift'));
          await checkoutPage.useSeparateShippingAddress();
          await checkoutPage.fillShippingAddress({
            firstName: 'Gift',
            lastName: 'Recipient',
          });
          await checkoutPage.fillOrderNotes('Please call before delivery — QA automation');
          await checkoutPage.enableGift('Happy birthday from Genki QA!');
          await checkoutPage.expectCodPaymentDisabledForGift();
          await checkoutPage.selectPayment(PaymentMethod.BankTransfer);
          await checkoutPage.acceptTerms();
          await checkoutPage.placeOrder();
        });
        await test.step('Verify bank transfer success', async () => {
          await checkoutPage.expectOrderSuccess(PaymentMethod.BankTransfer);
          await checkoutPage.expectBankTransferInstructions();
        });
      },
    );

    test(
      'should start PayHere for a gift order paid by card',
      { tag: ['@checkout', '@payment'] },
      async ({ productDetailsPage, checkoutPage, payHereCheckout }) => {
        await test.step('Place gift order with card payment', async () => {
          await addSecondaryProductToCart(productDetailsPage);
          await checkoutPage.open();
          await checkoutPage.fillGuestBilling(guestCheckoutEmail('guest-gift-card'));
          await checkoutPage.enableGift('Congrats — enjoy your Genki drop!');
          await checkoutPage.expectCodPaymentDisabledForGift();
          await checkoutPage.selectPayment(PaymentMethod.Card);
          await checkoutPage.acceptTerms();
          await checkoutPage.placeOrder();
        });
        await test.step('PayHere checkout frame opens', async () => {
          await payHereCheckout.expectCheckoutFrameVisible();
        });
      },
    );
  });
});

test.describe('Guest cart session', () => {
  test('should persist guest cart items after reload', async ({
    productDetailsPage,
    cartPage,
    header,
  }) => {
    await test.step('Add product as guest', async () => {
      await addSampleProductToCart(productDetailsPage);
      await cartPage.open();
      await cartPage.expectHasItems();
    });
    await test.step('Reload and confirm cart persists', async () => {
      await header.reloadPage();
      await cartPage.open();
      await cartPage.expectHasItems();
    });
  });

  test('should merge guest cart into the account after login', async ({
    productDetailsPage,
    cartPage,
    loginPage,
    header,
  }) => {
    await test.step('Add product while logged out', async () => {
      await addSampleProductToCart(productDetailsPage);
      await cartPage.open();
      await cartPage.expectHasItems();
    });
    await test.step('Log in and confirm cart still has items', async () => {
      await loginPage.open();
      await loginPage.login(TEST_DATA.auth.email, TEST_DATA.auth.password);
      await loginPage.expectLoginSuccess();
      await header.expectLoggedIn(TEST_DATA.auth.displayName);
      await cartPage.open();
      await cartPage.expectHasItems();
      await header.expectCartBadgeHasItems();
    });
  });
});

test.describe('PayHere abandon', () => {
  test(
    'should keep the cart after abandoning PayHere checkout',
    { tag: ['@checkout', '@payment'] },
    async ({ productDetailsPage, checkoutPage, payHereCheckout, cartPage }) => {
      await test.step('Start card checkout until PayHere frame', async () => {
        await addSampleProductToCart(productDetailsPage);
        await checkoutPage.open();
        await checkoutPage.fillGuestBilling(guestCheckoutEmail('guest-abandon'));
        await checkoutPage.selectPayment(PaymentMethod.Card);
        await checkoutPage.acceptTerms();
        await checkoutPage.placeOrder();
        await payHereCheckout.expectCheckoutFrameVisible();
      });
      await test.step('Abandon payment and verify cart remains', async () => {
        await payHereCheckout.cancelCheckout();
        await cartPage.open();
        await cartPage.expectHasItems();
        await checkoutPage.expectNotOnOrderSuccess();
      });
    },
  );
});
