import { PaymentMethod } from '@constants/payment';
import { guestCheckoutEmail } from '@data/checkout.data';
import { test } from '@fixtures/test-fixtures';
import { addSampleProductToCart } from '@helpers/cart.helper';

test.describe('Mobile checkout', () => {
  test('should open checkout on a phone viewport without horizontal overflow', async ({
    productDetailsPage,
    checkoutPage,
  }) => {
    await test.step('Add a product and open checkout', async () => {
      await addSampleProductToCart(productDetailsPage);
      await checkoutPage.open();
      await checkoutPage.expectLoaded();
      await checkoutPage.expectNoHorizontalOverflow();
    });
  });

  test('should place a COD order on a phone viewport', { tag: '@checkout' }, async ({
    productDetailsPage,
    checkoutPage,
  }) => {
    await test.step('Fill COD guest checkout on mobile', async () => {
      await addSampleProductToCart(productDetailsPage);
      await checkoutPage.open();
      await checkoutPage.fillGuestBilling(guestCheckoutEmail('mobile-cod'));
      await checkoutPage.selectPayment(PaymentMethod.COD);
      await checkoutPage.acceptTerms();
      await checkoutPage.placeOrder();
    });
    await test.step('Verify COD order success', async () => {
      await checkoutPage.expectOrderSuccess(PaymentMethod.COD);
    });
  });
});
