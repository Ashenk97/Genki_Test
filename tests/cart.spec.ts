import { test } from '@fixtures/test-fixtures';
import { addSampleProductToCart } from '@helpers/cart.helper';

test.describe('Cart', () => {
  test('should show the cart page with the added line item', async ({
    productDetailsPage,
    cartPage,
  }) => {
    await test.step('Add sample product to cart', async () => {
      await addSampleProductToCart(productDetailsPage);
    });
    await test.step('Open cart and verify line item', async () => {
      await cartPage.open();
      await cartPage.expectLoaded();
      await cartPage.expectHasItems();
    });
  });

  test('should increase quantity on the cart page', async ({ productDetailsPage, cartPage }) => {
    await test.step('Add sample product to cart', async () => {
      await addSampleProductToCart(productDetailsPage);
    });
    await test.step('Increase quantity to 2', async () => {
      await cartPage.open();
      await cartPage.expectHasItems();
      await cartPage.increaseQuantity();
      await cartPage.expectQuantity(2);
    });
  });

  test('should remove items and show an empty cart', async ({ productDetailsPage, cartPage }) => {
    await test.step('Add sample product to cart', async () => {
      await addSampleProductToCart(productDetailsPage);
    });
    await test.step('Clear cart', async () => {
      await cartPage.open();
      await cartPage.clearCart();
      await cartPage.expectEmpty();
    });
  });

  test('should proceed to checkout from the cart page', async ({
    productDetailsPage,
    cartPage,
    checkoutPage,
  }) => {
    await test.step('Add sample product to cart', async () => {
      await addSampleProductToCart(productDetailsPage);
    });
    await test.step('Proceed to checkout', async () => {
      await cartPage.open();
      await cartPage.proceedToCheckoutPage();
      await checkoutPage.expectLoaded();
    });
  });
});
