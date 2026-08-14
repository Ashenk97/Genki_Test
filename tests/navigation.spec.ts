import { test, expect } from '../fixtures/test-fixtures';

test.describe('Homepage navigation', () => {
  test('should navigate from homepage to a product and display Add to Cart', async ({
    homePage,
  }) => {
    await homePage.open();
    await homePage.expectLoaded();

    const productPage = await homePage.openFirstProduct();

    await expect(productPage.productTitle).toBeVisible();
    await expect(productPage.page).toHaveURL(/\/products\//);
    await productPage.selectFirstAvailableSize();
    await productPage.expectAddToCartVisible();
  });

  test('should add a product to the cart and show a success toast', async ({
    homePage,
    header,
  }) => {
    await homePage.open();
    await homePage.expectLoaded();

    const productPage = await homePage.openFirstProduct();
    await productPage.selectFirstAvailableSize();
    await productPage.expectAddToCartVisible();
    await productPage.addToCart();
    await productPage.expectAddedToCart();
    await expect(header.cartButton).toHaveAttribute('aria-label', /open cart,\s*\d+\s*item/i);
  });
});
