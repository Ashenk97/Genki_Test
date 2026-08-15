import { test } from '@fixtures/test-fixtures';

test.describe('Homepage navigation', () => {
  test('should navigate from homepage to a product and display Add to Cart', async ({
    homePage,
  }) => {
    await test.step('Open homepage', async () => {
      await homePage.open();
      await homePage.expectLoaded();
    });
    await test.step('Open first product and select size', async () => {
      const productPage = await homePage.openFirstProduct();
      await productPage.expectOnProductPage();
      await productPage.selectFirstAvailableSize();
      await productPage.expectAddToCartVisible();
    });
  });

  test('should add a product to the cart and show a success toast', async ({
    homePage,
    header,
  }) => {
    await test.step('Open homepage', async () => {
      await homePage.open();
      await homePage.expectLoaded();
    });
    await test.step('Add first product to cart', async () => {
      const productPage = await homePage.openFirstProduct();
      await productPage.selectFirstAvailableSize();
      await productPage.expectAddToCartVisible();
      await productPage.addToCart();
      await productPage.expectAddedToCart();
      await header.expectCartBadgeHasItems();
    });
  });
});
