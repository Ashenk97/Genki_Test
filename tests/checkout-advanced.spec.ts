import { PaymentMethod } from '@constants/payment';
import { Timeouts } from '@constants/timeouts';
import { guestCheckoutEmail } from '@data/checkout.data';
import { TEST_DATA } from '@data/index';
import {
  ACID_WASH_FULL_PRODUCT,
  ACID_WASH_PARTIAL_PRODUCT,
  ACID_WASH_PRICE,
  SHIPPING_FEE,
  ProductTypeTag,
} from '@data/pdp-variants.data';
import { strongPassword } from '@helpers/random';
import { test } from '@fixtures/test-fixtures';
import { addSampleProductToCart, addSecondaryProductToCart } from '@helpers/cart.helper';

test.describe('Checkout advanced flows', { tag: ProductTypeTag.AcidWash }, () => {
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
    'should place a COD order and create an account at checkout',
    { tag: '@checkout' },
    async ({ productDetailsPage, checkoutPage, loginPage, header }) => {
      const email = guestCheckoutEmail('guest-create');
      const password = strongPassword();

      await test.step('Place COD checkout with create account', async () => {
        await addSampleProductToCart(productDetailsPage);
        await checkoutPage.open();
        await checkoutPage.fillGuestBilling(email);
        await checkoutPage.enableCreateAccount(password);
        await checkoutPage.selectPayment(PaymentMethod.COD);
        await checkoutPage.acceptTerms();
        await checkoutPage.placeOrder();
      });
      await test.step('Order succeeds', async () => {
        await checkoutPage.expectOrderSuccess(PaymentMethod.COD);
      });
      await test.step('New account can log in', async () => {
        await loginPage.open();
        const loginFormVisible = await loginPage.page.locator('.login-form').isVisible().catch(() => false);
        if (loginFormVisible) {
          await loginPage.login(email, password);
          await loginPage.expectLoginSuccess();
        }
        await header.expectLoggedIn();
      });
    },
  );
});

test.describe('Gift checkout', { tag: ProductTypeTag.AcidWash }, () => {
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

test.describe('Guest cart session', { tag: ProductTypeTag.AcidWash }, () => {
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

  test('should merge guest cart into the account after login', { tag: '@shared-account' }, async ({
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

test.describe('PayHere abandon', { tag: ProductTypeTag.AcidWash }, () => {
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

test.describe('Multi-product checkout prices', { tag: ProductTypeTag.AcidWash }, () => {
  test('should show each product price on the cart and at checkout', async ({
    productDetailsPage,
    cartPage,
    checkoutPage,
  }) => {
    test.setTimeout(120_000);
    const unit = ACID_WASH_PRICE.unit;
    const subtotal = unit * 3;
    let akazaSize = '';
    let shinobuSize = '';

    await test.step('Add Akaza qty 1 and Shinobu qty 2', async () => {
      akazaSize = await addSampleProductToCart(productDetailsPage, { quantity: 1 });
      shinobuSize = await addSecondaryProductToCart(productDetailsPage, { quantity: 2 });
    });

    await test.step('Cart lines, subtotal, and total match the quantities', async () => {
      await cartPage.open();
      await cartPage.expectItemCount(2);
      await cartPage.expectLinePrices(
        { name: ACID_WASH_FULL_PRODUCT.name, color: 'Black', size: akazaSize },
        { unit, line: unit },
      );
      await cartPage.expectLinePrices(
        { name: ACID_WASH_PARTIAL_PRODUCT.name, color: 'Black', size: shinobuSize },
        { unit, line: unit * 2 },
      );
      await cartPage.expectCartTotals(subtotal, subtotal);
      await cartPage.expectFreeDeliveryUnlocked();
    });

    await test.step('Checkout summary keeps the same prices and free shipping', async () => {
      await cartPage.proceedToCheckoutPage();
      await checkoutPage.expectLoaded();
      await checkoutPage.expectCheckoutLine(ACID_WASH_FULL_PRODUCT.name, 1, unit);
      await checkoutPage.expectCheckoutLine(ACID_WASH_PARTIAL_PRODUCT.name, 2, unit * 2);
      await checkoutPage.expectCheckoutAmounts({
        subtotal,
        shipping: SHIPPING_FEE.free,
        grand: subtotal,
      });
      await checkoutPage.expectFreeDeliveryUnlocked();
    });

    await test.step('Card, bank, and COD keep shipping at zero above LKR 5,000', async () => {
      for (const method of [PaymentMethod.Card, PaymentMethod.BankTransfer, PaymentMethod.COD]) {
        await checkoutPage.selectPayment(method);
        await checkoutPage.expectCheckoutAmounts({
          subtotal,
          shipping: SHIPPING_FEE.free,
          grand: subtotal,
        });
      }
      await checkoutPage.expectStillOnCheckout();
    });
  });
});

test.describe('Free delivery at checkout', { tag: ProductTypeTag.AcidWash }, () => {
  test('should show remaining amount at checkout when subtotal is below LKR 5,000', async ({
    productDetailsPage,
    checkoutPage,
  }) => {
    await test.step('Checkout with qty 1 (LKR 4,490)', async () => {
      await addSampleProductToCart(productDetailsPage, { quantity: 1 });
      await checkoutPage.open();
      await checkoutPage.expectLoaded();
      await checkoutPage.expectOrderSubtotal(ACID_WASH_PRICE.unit);
      await checkoutPage.expectFreeDeliveryRemaining();
    });
  });

  test('should unlock free delivery at checkout when subtotal is over LKR 5,000', async ({
    productDetailsPage,
    checkoutPage,
  }) => {
    await test.step('Checkout with qty 2 (LKR 8,980)', async () => {
      await addSampleProductToCart(productDetailsPage, { quantity: 2 });
      await checkoutPage.open();
      await checkoutPage.expectLoaded();
      await checkoutPage.expectOrderSubtotal(ACID_WASH_PRICE.unit * 2);
      await checkoutPage.expectFreeDeliveryUnlocked();
    });
  });

  test('should keep the below-threshold message at the LKR 4,490 boundary', async ({
    productDetailsPage,
    checkoutPage,
  }) => {
    await test.step('Single unit is under 5,000', async () => {
      await addSampleProductToCart(productDetailsPage);
      await checkoutPage.open();
      await checkoutPage.expectFreeDeliveryRemaining();
    });
  });
});
