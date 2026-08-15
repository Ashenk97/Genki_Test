import { TEST_DATA } from '../fixtures/test-data';
import { test, expect } from '../fixtures/test-fixtures';

async function addGuestCartItem(productDetailsPage: {
  open: (path: string) => Promise<void>;
  selectFirstAvailableSize: () => Promise<void>;
  addToCart: () => Promise<void>;
  expectAddedToCart: () => Promise<void>;
}) {
  await productDetailsPage.open(TEST_DATA.product.samplePath);
  await productDetailsPage.selectFirstAvailableSize();
  await productDetailsPage.addToCart();
  await productDetailsPage.expectAddedToCart();
}

function guestEmail(prefix: string) {
  return `${prefix}-${Date.now()}@mailinator.com`;
}

async function startCardCheckout(
  productDetailsPage: Parameters<typeof addGuestCartItem>[0],
  checkoutPage: {
    open: () => Promise<void>;
    fillGuestBilling: (email: string) => Promise<void>;
    selectPayment: (method: 'Card') => Promise<void>;
    acceptTerms: () => Promise<void>;
    placeOrder: () => Promise<void>;
  },
) {
  await addGuestCartItem(productDetailsPage);
  await checkoutPage.open();
  await checkoutPage.fillGuestBilling(guestEmail('guest-card'));
  await checkoutPage.selectPayment('Card');
  await checkoutPage.acceptTerms();
  await checkoutPage.placeOrder();
}

test.describe('Checkout', () => {
  test.describe.configure({ mode: 'parallel' });

  test('should load checkout with billing and payment methods', async ({
    productDetailsPage,
    checkoutPage,
  }) => {
    await addGuestCartItem(productDetailsPage);
    await checkoutPage.open();
    await checkoutPage.expectLoaded();
  });

  test('should keep place order disabled when billing is incomplete', async ({
    productDetailsPage,
    checkoutPage,
  }) => {
    await addGuestCartItem(productDetailsPage);
    await checkoutPage.open();
    await checkoutPage.selectPayment('COD');
    await expect(checkoutPage.placeOrderButton).toBeDisabled();
    await expect(checkoutPage.page).toHaveURL(/\/checkout/);
  });

  test('should place a COD order as a guest', { tag: '@checkout' }, async ({
    productDetailsPage,
    checkoutPage,
  }) => {
    await addGuestCartItem(productDetailsPage);
    await checkoutPage.open();
    await checkoutPage.fillGuestBilling(guestEmail('guest-cod'));
    await checkoutPage.selectPayment('COD');
    await checkoutPage.acceptTerms();
    await checkoutPage.placeOrder();
    await checkoutPage.expectOrderSuccess('COD');
    await checkoutPage.expectCodInstructions();
  });

  test('should place a bank transfer order as a guest', { tag: '@checkout' }, async ({
    productDetailsPage,
    checkoutPage,
  }) => {
    await addGuestCartItem(productDetailsPage);
    await checkoutPage.open();
    await checkoutPage.fillGuestBilling(guestEmail('guest-bank'));
    await checkoutPage.selectPayment('BankTransfer');
    await checkoutPage.acceptTerms();
    await checkoutPage.placeOrder();
    await checkoutPage.expectOrderSuccess('BankTransfer');
    await checkoutPage.expectBankTransferInstructions();
  });

  test.describe('PayHere card payments', () => {
    test.describe.configure({ mode: 'serial', timeout: 90_000 });

    test(
      'should place a successful Visa card order via PayHere sandbox',
      { tag: ['@checkout', '@payment'] },
      async ({ productDetailsPage, checkoutPage, payHereCheckout }) => {
        await startCardCheckout(productDetailsPage, checkoutPage);
        await payHereCheckout.payWithCard(TEST_DATA.payhere.cards.success.visa);
        await payHereCheckout.expectPaymentApproved();
        await checkoutPage.expectCardPaymentReceived();
      },
    );

    test(
      'should place a successful MasterCard order via PayHere sandbox',
      { tag: ['@checkout', '@payment'] },
      async ({ productDetailsPage, checkoutPage, payHereCheckout }) => {
        await startCardCheckout(productDetailsPage, checkoutPage);
        await payHereCheckout.payWithCard(TEST_DATA.payhere.cards.success.master);
        await payHereCheckout.expectPaymentApproved();
        await checkoutPage.expectCardPaymentReceived();
      },
    );

    test(
      'should decline a Visa card with insufficient funds',
      { tag: ['@checkout', '@payment'] },
      async ({ productDetailsPage, checkoutPage, payHereCheckout }) => {
        await startCardCheckout(productDetailsPage, checkoutPage);
        await payHereCheckout.payWithCard(TEST_DATA.payhere.cards.insufficientFunds.visa);
        await payHereCheckout.expectPaymentDeclined();
        await expect(checkoutPage.page).not.toHaveURL(/order-success/);
      },
    );

    test(
      'should decline a MasterCard when limit is exceeded',
      { tag: ['@checkout', '@payment'] },
      async ({ productDetailsPage, checkoutPage, payHereCheckout }) => {
        await startCardCheckout(productDetailsPage, checkoutPage);
        await payHereCheckout.payWithCard(TEST_DATA.payhere.cards.limitExceeded.master);
        await payHereCheckout.expectPaymentDeclined();
        await expect(checkoutPage.page).not.toHaveURL(/order-success/);
      },
    );

    test(
      'should decline a Visa card with do not honor',
      { tag: ['@checkout', '@payment'] },
      async ({ productDetailsPage, checkoutPage, payHereCheckout }) => {
        await startCardCheckout(productDetailsPage, checkoutPage);
        await payHereCheckout.payWithCard(TEST_DATA.payhere.cards.doNotHonor.visa);
        await payHereCheckout.expectPaymentDeclined();
        await expect(checkoutPage.page).not.toHaveURL(/order-success/);
      },
    );

    test(
      'should decline a Visa card on network error',
      { tag: ['@checkout', '@payment'] },
      async ({ productDetailsPage, checkoutPage, payHereCheckout }) => {
        await startCardCheckout(productDetailsPage, checkoutPage);
        await payHereCheckout.payWithCard(TEST_DATA.payhere.cards.networkError.visa);
        await payHereCheckout.expectPaymentDeclined();
        await expect(checkoutPage.page).not.toHaveURL(/order-success/);
      },
    );
  });
});
