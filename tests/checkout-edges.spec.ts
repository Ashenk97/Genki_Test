import { PaymentMethod } from '@constants/payment';
import { guestCheckoutEmail } from '@data/checkout.data';
import { test } from '@fixtures/test-fixtures';
import { addSampleProductToCart } from '@helpers/cart.helper';

test.describe('Checkout edges', () => {
  test('should keep place order disabled for an invalid phone number', async ({
    productDetailsPage,
    checkoutPage,
  }) => {
    test.fail(true, 'GENKI: checkout accepts a non-numeric phone number');
    await test.step('Fill billing with a non-phone value', async () => {
      await addSampleProductToCart(productDetailsPage);
      await checkoutPage.open();
      await checkoutPage.fillGuestBilling(guestCheckoutEmail('guest-phone'), {
        phone: 'abcdefghij',
      });
      await checkoutPage.selectPayment(PaymentMethod.COD);
      await checkoutPage.acceptTerms();
      await checkoutPage.expectPlaceOrderDisabled();
      await checkoutPage.expectStillOnCheckout();
    });
  });

  test('should reject an invalid coupon or hide coupon controls', async ({
    productDetailsPage,
    checkoutPage,
  }) => {
    await test.step('Open checkout and probe coupon UI', async () => {
      await addSampleProductToCart(productDetailsPage);
      await checkoutPage.open();
      await checkoutPage.expectLoaded();
      await checkoutPage.expectCouponControlAbsentOrApplyRejected();
    });
  });
});
