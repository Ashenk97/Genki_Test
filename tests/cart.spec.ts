import { TEST_DATA } from '../fixtures/test-data';
import { test, expect } from '../fixtures/test-fixtures';

async function addSampleProductToCart(
  productDetailsPage: {
    open: (path: string) => Promise<void>;
    selectFirstAvailableSize: () => Promise<void>;
    addToCart: () => Promise<void>;
    expectAddedToCart: () => Promise<void>;
  },
) {
  await productDetailsPage.open(TEST_DATA.product.samplePath);
  await productDetailsPage.selectFirstAvailableSize();
  await productDetailsPage.addToCart();
  await productDetailsPage.expectAddedToCart();
}

test.describe('Cart', () => {
  test('should show the cart page with the added line item', async ({
    productDetailsPage,
    cartPage,
  }) => {
    await addSampleProductToCart(productDetailsPage);
    await cartPage.open();
    await cartPage.expectLoaded();
    await cartPage.expectHasItems();
  });

  test('should increase quantity on the cart page', async ({ productDetailsPage, cartPage }) => {
    await addSampleProductToCart(productDetailsPage);
    await cartPage.open();
    await cartPage.expectHasItems();
    await cartPage.increaseQuantity();
    await expect(
      cartPage.page.locator('table tbody tr input[value="2"], table tbody tr').filter({
        hasText: /berserk/i,
      }).first(),
    ).toBeVisible();
  });

  test('should remove items and show an empty cart', async ({ productDetailsPage, cartPage }) => {
    await addSampleProductToCart(productDetailsPage);
    await cartPage.open();
    await cartPage.clearCart();
    await cartPage.expectEmpty();
  });

  test('should proceed to checkout from the cart page', async ({
    productDetailsPage,
    cartPage,
    checkoutPage,
  }) => {
    await addSampleProductToCart(productDetailsPage);
    await cartPage.open();
    await cartPage.proceedToCheckoutPage();
    await checkoutPage.expectLoaded();
  });
});
