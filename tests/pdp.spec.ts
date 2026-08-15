import { TEST_DATA } from '../fixtures/test-data';
import { test, expect } from '../fixtures/test-fixtures';

test.describe('Individual product', () => {
  test('should show title, price, and add to cart controls', async ({ productDetailsPage }) => {
    await productDetailsPage.open(TEST_DATA.product.samplePath);
    await productDetailsPage.expectProductDetailsVisible();
  });

  test('should enable add to cart after selecting a size', async ({ productDetailsPage }) => {
    await productDetailsPage.open(TEST_DATA.product.samplePath);
    await productDetailsPage.selectFirstAvailableSize();
    await productDetailsPage.expectAddToCartVisible();
  });

  test('should increase quantity with the stepper', async ({ productDetailsPage }) => {
    await productDetailsPage.open(TEST_DATA.product.samplePath);
    await productDetailsPage.selectFirstAvailableSize();
    await productDetailsPage.increaseQuantity();
    await expect(
      productDetailsPage.page.locator('input[value="2"]').or(productDetailsPage.page.getByText(/^2$/)).first(),
    ).toBeVisible();
  });

  test('should add the product to the wishlist from PDP', async ({
    productDetailsPage,
    header,
    wishlistPage,
  }) => {
    await productDetailsPage.open(TEST_DATA.product.samplePath);
    await productDetailsPage.addToWishlist();
    await expect(productDetailsPage.page.locator('[data-sonner-toast]').filter({
      hasText: /wishlist/i,
    })).toBeVisible();
    await header.openWishlist();
    await wishlistPage.expectDrawerHasItems();
  });
});
