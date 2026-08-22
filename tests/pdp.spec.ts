import { PRODUCT_DATA } from '@data/products.data';
import {
  PRODUCT_PRICE,
  PRODUCT_SIZES,
  WHITE_ONLY_PRODUCT,
} from '@data/pdp-variants.data';
import { test } from '@fixtures/test-fixtures';

test.describe('Individual product', () => {
  test('should show title, price, and add to cart controls', async ({ productDetailsPage }) => {
    await test.step('Open in-stock white-only PDP', async () => {
      await productDetailsPage.open(PRODUCT_DATA.samplePath);
      await productDetailsPage.expectProductDetailsVisible();
      await productDetailsPage.expectProductTitle(WHITE_ONLY_PRODUCT.name);
      await productDetailsPage.expectFreeDeliveryNote();
    });
  });

  test('should require a size before add to cart is available', async ({ productDetailsPage }) => {
    await test.step('Open PDP without selecting a size', async () => {
      await productDetailsPage.open(PRODUCT_DATA.samplePath);
      await productDetailsPage.expectSizeRequired();
      await productDetailsPage.expectQuantityStepperDisabled();
    });
  });

  test('should enable add to cart after selecting a size', async ({ productDetailsPage }) => {
    await test.step('Select size on PDP', async () => {
      await productDetailsPage.open(PRODUCT_DATA.samplePath);
      await productDetailsPage.selectFirstAvailableSize();
      await productDetailsPage.expectAddToCartVisible();
      await productDetailsPage.expectQuantityStepperEnabled();
    });
  });

  test('should select a specific size from the size matrix', async ({ productDetailsPage }) => {
    await test.step('Select size M on black-only PDP', async () => {
      await productDetailsPage.open(PRODUCT_DATA.secondaryPath);
      await productDetailsPage.selectSize(PRODUCT_DATA.defaultSize);
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

  test('should not decrease quantity below one', async ({ productDetailsPage }) => {
    await test.step('Select size and try to go below qty 1', async () => {
      await productDetailsPage.open(PRODUCT_DATA.samplePath);
      await productDetailsPage.selectSize(PRODUCT_DATA.defaultSize);
      await productDetailsPage.expectQuantity(1);
      await productDetailsPage.expectQuantityDoesNotGoBelowOne();
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

  test('should add quantity 3 to the cart', async ({ productDetailsPage, cartPage }) => {
    await test.step('Set qty 3 then add to cart', async () => {
      await productDetailsPage.open(PRODUCT_DATA.samplePath);
      await productDetailsPage.selectSize(PRODUCT_DATA.defaultSize);
      await productDetailsPage.setQuantity(3);
      await productDetailsPage.addToCart();
      await productDetailsPage.expectAddedToCart();
    });
    await test.step('Cart reflects quantity 3', async () => {
      await cartPage.open();
      await cartPage.expectHasItems();
      await cartPage.expectQuantity(3);
      await cartPage.expectSubtotal(PRODUCT_PRICE.unit * 3);
    });
  });

  test('should keep increasing quantity when the UI has no max cap', async ({
    productDetailsPage,
  }) => {
    await test.step('Increase PDP qty to 10', async () => {
      await productDetailsPage.open(PRODUCT_DATA.samplePath);
      await productDetailsPage.selectSize(PRODUCT_DATA.defaultSize);
      await productDetailsPage.expectNoQuantityCap(10);
    });
  });

  test('should list every size from XXS to XXXL', async ({ productDetailsPage }) => {
    await test.step('White-only PDP exposes the full size matrix', async () => {
      await productDetailsPage.open(PRODUCT_DATA.samplePath);
      await productDetailsPage.expectListedSizes(PRODUCT_SIZES);
      await productDetailsPage.expectAvailableSizeCount(PRODUCT_SIZES.length);
    });
  });

  test('should show gallery, size chart, and additional information', async ({
    productDetailsPage,
  }) => {
    await test.step('PDP merchandising chrome', async () => {
      await productDetailsPage.open(PRODUCT_DATA.samplePath);
      await productDetailsPage.expectGalleryVisible();
      await productDetailsPage.expectSizeChartVisible();
      await productDetailsPage.expectAdditionalInformation();
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
