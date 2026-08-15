import { PRODUCT_DATA } from '@data/products.data';
import { test } from '@fixtures/test-fixtures';

test.describe('Individual product', () => {
  test('should show title, price, and add to cart controls', async ({ productDetailsPage }) => {
    await test.step('Open sample PDP', async () => {
      await productDetailsPage.open(PRODUCT_DATA.samplePath);
      await productDetailsPage.expectProductDetailsVisible();
    });
  });

  test('should enable add to cart after selecting a size', async ({ productDetailsPage }) => {
    await test.step('Select size on PDP', async () => {
      await productDetailsPage.open(PRODUCT_DATA.samplePath);
      await productDetailsPage.selectFirstAvailableSize();
      await productDetailsPage.expectAddToCartVisible();
    });
  });

  test('should increase quantity with the stepper', async ({ productDetailsPage }) => {
    await test.step('Increase PDP quantity', async () => {
      await productDetailsPage.open(PRODUCT_DATA.samplePath);
      await productDetailsPage.selectFirstAvailableSize();
      await productDetailsPage.increaseQuantity();
      await productDetailsPage.expectQuantity(2);
    });
  });

  test('should add the product to the wishlist from PDP', async ({
    productDetailsPage,
    header,
    wishlistPage,
  }) => {
    await test.step('Add to wishlist from PDP', async () => {
      await productDetailsPage.open(PRODUCT_DATA.samplePath);
      await productDetailsPage.addToWishlist();
      await productDetailsPage.expectAddedToWishlist();
    });
    await test.step('Verify wishlist drawer', async () => {
      await header.openWishlist();
      await wishlistPage.expectDrawerHasItems();
    });
  });
});
