import { PRODUCT_DATA } from '@data/products.data';
import { test } from '@fixtures/test-fixtures';

test.describe('Individual product', () => {
  test('should show title, price, and add to cart controls', async ({ productDetailsPage }) => {
    await test.step('Open sample PDP', async () => {
      await productDetailsPage.open(PRODUCT_DATA.samplePath);
      await productDetailsPage.expectProductDetailsVisible();
    });
  });

  test('should require a size before add to cart is available', async ({ productDetailsPage }) => {
    await test.step('Open PDP without selecting a size', async () => {
      await productDetailsPage.open(PRODUCT_DATA.samplePath);
      await productDetailsPage.expectSizeRequired();
    });
  });

  test('should enable add to cart after selecting a size', async ({ productDetailsPage }) => {
    await test.step('Select size on PDP', async () => {
      await productDetailsPage.open(PRODUCT_DATA.samplePath);
      await productDetailsPage.selectFirstAvailableSize();
      await productDetailsPage.expectAddToCartVisible();
    });
  });

  test('should select a specific size from the size matrix', async ({ productDetailsPage }) => {
    await test.step('Select size M on secondary PDP', async () => {
      await productDetailsPage.open(PRODUCT_DATA.secondaryPath);
      await productDetailsPage.selectSize(PRODUCT_DATA.secondarySize);
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

  test('should decrease quantity with the stepper', async ({ productDetailsPage }) => {
    await test.step('Increase then decrease PDP quantity', async () => {
      await productDetailsPage.open(PRODUCT_DATA.samplePath);
      await productDetailsPage.selectFirstAvailableSize();
      await productDetailsPage.increaseQuantity();
      await productDetailsPage.expectQuantity(2);
      await productDetailsPage.decreaseQuantity();
      await productDetailsPage.expectQuantity(1);
    });
  });

  test('should add quantity greater than one to the cart', async ({
    productDetailsPage,
    cartPage,
  }) => {
    await test.step('Add qty 2 to cart from PDP', async () => {
      await productDetailsPage.open(PRODUCT_DATA.samplePath);
      await productDetailsPage.selectFirstAvailableSize();
      await productDetailsPage.increaseQuantity();
      await productDetailsPage.expectQuantity(2);
      await productDetailsPage.addToCart();
      await productDetailsPage.expectAddedToCart();
    });
    await test.step('Cart reflects quantity 2', async () => {
      await cartPage.open();
      await cartPage.expectHasItems();
      await cartPage.expectQuantity(2);
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
