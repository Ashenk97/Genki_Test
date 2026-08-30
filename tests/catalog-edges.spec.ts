import { EMPTY_THEME_COLLECTIONS, PRODUCT_DATA } from '@data/products.data';
import {
  DUAL_COLOR_PRODUCT,
  OUT_OF_STOCK_PRODUCT,
} from '@data/pdp-variants.data';
import { TEST_DATA } from '@data/index';
import { test } from '@fixtures/test-fixtures';

test.describe('Color and stock PDP', () => {
  test('should require a color before sizes are available', async ({ productDetailsPage }) => {
    await test.step('Open dual-color PDP', async () => {
      await productDetailsPage.open(DUAL_COLOR_PRODUCT.path);
      await productDetailsPage.expectColorRequired();
      await productDetailsPage.expectSizesHidden();
      await productDetailsPage.expectQuantityStepperDisabled();
      await productDetailsPage.expectColorOptions(DUAL_COLOR_PRODUCT.colors);
    });
  });

  test('should reveal sizes after a color is selected', async ({ productDetailsPage }) => {
    await test.step('Select black then expect the size matrix', async () => {
      await productDetailsPage.open(DUAL_COLOR_PRODUCT.path);
      await productDetailsPage.selectColor('black');
      await productDetailsPage.expectSelectedColor('black');
      await productDetailsPage.expectSizesVisible();
      await productDetailsPage.expectSizeRequired();
    });
  });

  test('should add a color-variant product to cart with color and size', async ({
    productDetailsPage,
    cartPage,
  }) => {
    await test.step('Select color and size then add to cart', async () => {
      await productDetailsPage.open(PRODUCT_DATA.colorVariantPath);
      await productDetailsPage.selectColor(PRODUCT_DATA.colorVariantColor);
      await productDetailsPage.selectSize(PRODUCT_DATA.colorVariantSize);
      await productDetailsPage.expectAddToCartVisible();
      await productDetailsPage.addToCart();
      await productDetailsPage.expectAddedToCart();
    });
    await test.step('Cart shows color and size', async () => {
      await cartPage.open();
      await cartPage.expectHasItems();
      await cartPage.expectLineContains(/color:\s*black/i);
      await cartPage.expectLineContains(/size:\s*m/i);
    });
  });

  test('should add the white variant of the dual-color product to cart', async ({
    productDetailsPage,
    cartPage,
  }) => {
    await test.step('Select white and XXXL then add to cart', async () => {
      await productDetailsPage.open(DUAL_COLOR_PRODUCT.path);
      await productDetailsPage.selectColor('white');
      await productDetailsPage.selectSize('XXXL');
      await productDetailsPage.addToCart();
      await productDetailsPage.expectAddedToCart();
    });
    await test.step('Cart shows white and XXXL', async () => {
      await cartPage.open();
      await cartPage.expectLineWithAttributes({ color: 'white', size: 'XXXL' });
    });
  });

  test('should expose every purchasable size on the white-only tee', async ({
    productDetailsPage,
  }) => {
    await test.step('White-only PDP has selectable sizes', async () => {
      await productDetailsPage.open(PRODUCT_DATA.samplePath);
      await productDetailsPage.expectAvailableSizeCount(PRODUCT_DATA.sizes.length);
      await productDetailsPage.selectFirstAvailableSize();
      await productDetailsPage.expectAddToCartVisible();
    });
  });

  test('should block add to cart on an out-of-stock product', async ({ productDetailsPage }) => {
    await test.step('Select the only Berserk size and expect out of stock', async () => {
      await productDetailsPage.open(OUT_OF_STOCK_PRODUCT.path);
      await productDetailsPage.expectProductDetailsVisible();
      await productDetailsPage.selectSize(OUT_OF_STOCK_PRODUCT.size);
      await productDetailsPage.expectOutOfStock();
    });
  });

  test('should load the Gojo PDP for the lowercase product slug', async ({
    productDetailsPage,
  }) => {
    await test.step('Open lowercase /products/jjk', async () => {
      await productDetailsPage.open(PRODUCT_DATA.canonicalSlugPath);
      await productDetailsPage.expectProductDetailsVisible();
      await productDetailsPage.expectProductTitle(/gojo/i);
    });
  });

  test('should 404 for a non-canonical uppercase product slug', async ({
    productDetailsPage,
  }) => {
    await test.step('Open uppercase /products/JJK', async () => {
      await productDetailsPage.open(PRODUCT_DATA.nonCanonicalSlugPath);
      await productDetailsPage.expectPageNotFound();
    });
  });
});

test.describe('Theme collection empty states', () => {
  for (const theme of EMPTY_THEME_COLLECTIONS) {
    test(`should show empty state for ${theme.name} theme collection`, async ({
      collectionPage,
    }) => {
      await test.step(`Open ${theme.name}`, async () => {
        await collectionPage.open(theme.path);
        await collectionPage.expectLoaded(theme.path, theme.heading);
        await collectionPage.expectEmptyCollection();
      });
    });
  }
});

test.describe('Wishlist persistence', { tag: '@shared-account' }, () => {
  test('should keep wishlist items after login', async ({
    productDetailsPage,
    wishlistPage,
    loginPage,
    header,
  }) => {
    await test.step('Add to wishlist as guest', async () => {
      await productDetailsPage.open(PRODUCT_DATA.samplePath);
      await productDetailsPage.addToWishlist();
      await productDetailsPage.expectAddedToWishlist();
      await wishlistPage.open();
      await wishlistPage.expectHasItems();
    });
    await test.step('Log in and confirm wishlist still has items', async () => {
      await loginPage.open();
      await loginPage.login(TEST_DATA.auth.email, TEST_DATA.auth.password);
      await loginPage.expectLoginSuccess();
      await header.expectLoggedIn(TEST_DATA.auth.displayName);
      await wishlistPage.open();
      await wishlistPage.expectHasItems();
    });
  });
});
