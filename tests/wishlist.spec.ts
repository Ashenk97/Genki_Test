import { TEST_DATA } from '../fixtures/test-data';
import { test, expect } from '../fixtures/test-fixtures';

test.describe('Wishlist', () => {
  test('should add a product and show it in the wishlist drawer', async ({
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

  test('should show wishlist items on the wishlist page', async ({
    productDetailsPage,
    wishlistPage,
  }) => {
    await productDetailsPage.open(TEST_DATA.product.samplePath);
    await productDetailsPage.addToWishlist();
    await expect(productDetailsPage.page.locator('[data-sonner-toast]').filter({
      hasText: /wishlist/i,
    })).toBeVisible();
    await wishlistPage.open();
    await wishlistPage.expectLoaded();
    await wishlistPage.expectHasItems();
  });

  test('should remove an item from the wishlist', async ({
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
    await wishlistPage.removeFirstItem();
    await expect(wishlistPage.drawerEmptyMessage).toBeVisible({ timeout: 10_000 });
  });
});
