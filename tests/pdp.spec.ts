import { PRODUCT_DATA } from '@data/products.data';
import {
  ACID_WASH_PRICE,
  ACID_WASH_SIZES,
  ProductTypeTag,
} from '@data/pdp-variants.data';
import { test } from '@fixtures/test-fixtures';

test.describe('Individual product', { tag: ProductTypeTag.AcidWash }, () => {
  test('should show title, price, and add to cart controls', async ({ productDetailsPage }) => {
    await test.step('Open in-stock acid-wash PDP', async () => {
      await productDetailsPage.open(PRODUCT_DATA.samplePath);
      await productDetailsPage.expectProductDetailsVisible();
      await productDetailsPage.expectProductTitle(PRODUCT_DATA.sampleNamePattern);
      await productDetailsPage.expectFreeDeliveryNote();
    });
  });

  test('should require a color and then a size before add to cart is available', async ({
    productDetailsPage,
  }) => {
    await test.step('Open PDP without selecting a color', async () => {
      await productDetailsPage.open(PRODUCT_DATA.samplePath);
      await productDetailsPage.expectColorRequired();
      await productDetailsPage.expectSizesHidden();
      await productDetailsPage.expectQuantityStepperDisabled();
    });
    await test.step('Select a color and expect a size', async () => {
      await productDetailsPage.selectColor(PRODUCT_DATA.sampleColor);
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
    await test.step('Select size M on the acid-wash PDP', async () => {
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
      await cartPage.expectSubtotal(ACID_WASH_PRICE.unit * 3);
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

  test('should list every acid-wash size from S to XXL', async ({ productDetailsPage }) => {
    await test.step('Acid-wash PDP exposes S through XXL after a color is chosen', async () => {
      await productDetailsPage.open(PRODUCT_DATA.samplePath);
      await productDetailsPage.selectColor(PRODUCT_DATA.sampleColor);
      await productDetailsPage.expectListedSizes(ACID_WASH_SIZES);
      await productDetailsPage.expectAvailableSizeCount(ACID_WASH_SIZES.length);
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
