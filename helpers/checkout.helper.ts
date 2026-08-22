import type { CheckoutPage } from '@pages/CheckoutPage';
import type { ProductDetailsPage } from '@pages/ProductDetailsPage';
import { PaymentMethod } from '@constants/payment';
import { guestCheckoutEmail } from '@data/checkout.data';
import { addSampleProductToCart } from './cart.helper';

export async function startGuestCardCheckout(
  productDetailsPage: ProductDetailsPage,
  checkoutPage: CheckoutPage,
  emailPrefix = 'guest-card',
): Promise<void> {
  await addSampleProductToCart(productDetailsPage);
  await checkoutPage.open();
  await checkoutPage.fillGuestBilling(guestCheckoutEmail(emailPrefix));
  await checkoutPage.selectPayment(PaymentMethod.Card);
  await checkoutPage.acceptTerms();
  await checkoutPage.placeOrder();
}

export async function startLoggedInCodCheckout(
  productDetailsPage: ProductDetailsPage,
  checkoutPage: CheckoutPage,
): Promise<void> {
  await addSampleProductToCart(productDetailsPage);
  await checkoutPage.open();
  await checkoutPage.fillLoggedInBilling();
  await checkoutPage.selectPayment(PaymentMethod.COD);
  await checkoutPage.acceptTerms();
}

export async function startLoggedInCardCheckout(
  productDetailsPage: ProductDetailsPage,
  checkoutPage: CheckoutPage,
): Promise<void> {
  await addSampleProductToCart(productDetailsPage);
  await checkoutPage.open();
  await checkoutPage.fillLoggedInBilling();
  await checkoutPage.selectPayment(PaymentMethod.Card);
  await checkoutPage.acceptTerms();
}
