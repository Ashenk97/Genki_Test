import { test, expect } from '../fixtures/test-fixtures';

test.describe('Homepage navigation', () => {
  test('should navigate from homepage to a product and display Add to Cart', async ({
    homePage,
  }) => {
    await homePage.open();

    await expect(homePage.page).toHaveTitle(/genki/i);

    const prominentHeading = homePage.featuredSectionHeading.or(homePage.heroHeading);
    await expect(prominentHeading.first()).toBeVisible();

    const productPage = await homePage.openFirstProduct();

    await expect(productPage.productTitle).toBeVisible();
    await productPage.selectFirstAvailableSize();
    await productPage.expectAddToCartVisible();
  });
});
