import { EMPTY_THEME_COLLECTIONS, PRODUCT_DATA } from '@data/products.data';
import { TEST_DATA } from '@data/index';
import { test } from '@fixtures/test-fixtures';

test.describe('Color and stock PDP', () => {
  test('should require a color before sizes are available', async ({ productDetailsPage }) => {
    await test.step('Open color-variant PDP', async () => {
      await productDetailsPage.open(PRODUCT_DATA.colorVariantPath);
      await productDetailsPage.expectColorRequired();
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

  test('should expose at least one purchasable size on the sample tee', async ({
    productDetailsPage,
  }) => {
    await test.step('Sample PDP has selectable sizes', async () => {
      await productDetailsPage.open(PRODUCT_DATA.samplePath);
      await productDetailsPage.expectAvailableSizeCount(1);
      await productDetailsPage.selectFirstAvailableSize();
      await productDetailsPage.expectAddToCartVisible();
    });
  });

  test('should fail to render PDP controls for lowercase product slug', async ({
    productDetailsPage,
  }) => {
    await test.step('Open lowercase slug (GENKI-BUG-006)', async () => {
      await productDetailsPage.open(PRODUCT_DATA.caseSensitiveLowerPath);
      await productDetailsPage.expectBrokenProductShell();
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

test.describe('Wishlist persistence', () => {
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
