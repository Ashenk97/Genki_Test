import { PaymentMethod } from '@constants/payment';
import { PRODUCT_DATA } from '@data/products.data';
import { guestCheckoutEmail } from '@data/checkout.data';
import { TEST_DATA } from '@data/index';
import { strongPassword } from '@helpers/random';
import { test } from '@fixtures/test-fixtures';
import { addSampleProductToCart } from '@helpers/cart.helper';

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

  test('should place a bank transfer order with gift message and order notes', { tag: '@checkout' }, async ({
    productDetailsPage,
    checkoutPage,
  }) => {
    await test.step('Checkout with gift + notes (COD disabled for gifts)', async () => {
      await addSampleProductToCart(productDetailsPage);
      await checkoutPage.open();
      await checkoutPage.fillGuestBilling(guestCheckoutEmail('guest-gift'));
      await checkoutPage.fillOrderNotes('Please call before delivery — QA automation');
      await checkoutPage.enableGift('Happy birthday from Genki QA!');
      await checkoutPage.selectPayment(PaymentMethod.BankTransfer);
      await checkoutPage.acceptTerms();
      await checkoutPage.placeOrder();
    });
    await test.step('Verify bank transfer success', async () => {
      await checkoutPage.expectOrderSuccess(PaymentMethod.BankTransfer);
      await checkoutPage.expectBankTransferInstructions();
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
