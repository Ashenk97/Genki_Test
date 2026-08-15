import { PRODUCT_DATA } from '@data/products.data';
import { test } from '@fixtures/test-fixtures';

test.describe('Wishlist', () => {
  test('should add a product and show it in the wishlist drawer', async ({
    productDetailsPage,
    header,
    wishlistPage,
  }) => {
    await test.step('Add product to wishlist', async () => {
      await productDetailsPage.open(PRODUCT_DATA.samplePath);
      await productDetailsPage.addToWishlist();
      await productDetailsPage.expectAddedToWishlist();
    });
    await test.step('Verify drawer contents', async () => {
      await header.openWishlist();
      await wishlistPage.expectDrawerHasItems();
    });
  });

  test('should show wishlist items on the wishlist page', async ({
    productDetailsPage,
    wishlistPage,
  }) => {
    await test.step('Add product and open wishlist page', async () => {
      await productDetailsPage.open(PRODUCT_DATA.samplePath);
      await productDetailsPage.addToWishlist();
      await productDetailsPage.expectAddedToWishlist();
      await wishlistPage.open();
      await wishlistPage.expectLoaded();
      await wishlistPage.expectHasItems();
    });
  });

  test('should remove an item from the wishlist', async ({
    productDetailsPage,
    header,
    wishlistPage,
  }) => {
    await test.step('Add product to wishlist drawer', async () => {
      await productDetailsPage.open(PRODUCT_DATA.samplePath);
      await productDetailsPage.addToWishlist();
      await productDetailsPage.expectAddedToWishlist();
      await header.openWishlist();
      await wishlistPage.expectDrawerHasItems();
    });
    await test.step('Remove item from drawer', async () => {
      await wishlistPage.removeFirstItem();
      await wishlistPage.expectDrawerEmpty();
    });
  });
});
