import { AppRoutes } from '@constants/routes';
import {
  OUT_OF_STOCK_PRODUCT,
  SIZE_CHART_EXCESS_SIZE,
  WHITE_ONLY_PRODUCT,
} from '@data/pdp-variants.data';
import { expect, test } from '@fixtures/test-fixtures';

test.describe('PDP merchandising edges', () => {
  test('should keep the first featured homepage product in stock', async ({
    homePage,
    productDetailsPage,
  }) => {
    test.fail(true, 'GENKI: homepage first tile is the OOS Berserk tee');
    await test.step('Open the first homepage product', async () => {
      await homePage.open();
      await homePage.expectLoaded();
      await homePage.openFirstProduct();
      await productDetailsPage.expectOnProductPage();
    });
    await test.step('First featured product can be added to cart', async () => {
      expect(await productDetailsPage.tryEnableAddToCart()).toBe(true);
      await productDetailsPage.expectAddToCartVisible();
    });
  });

  test('should keep Berserk product copy consistent with the selected color', async ({
    productDetailsPage,
  }) => {
    test.fail(true, 'GENKI: Berserk copy says black while the locked color is white');
    await test.step('Open Berserk PDP', async () => {
      await productDetailsPage.open(OUT_OF_STOCK_PRODUCT.path);
      await productDetailsPage.expectProductDetailsVisible();
      await productDetailsPage.expectProductTitle(OUT_OF_STOCK_PRODUCT.name);
    });
    await test.step('Copy matches the checked color', async () => {
      await productDetailsPage.expectProductCopyColorConsistent();
    });
  });

  test('should not list XXXXL on the PDP when the size chart stops at XXXL', async ({
    productDetailsPage,
    footer,
    homePage,
  }) => {
    await test.step('White-only PDP sizes stop at XXXL', async () => {
      await productDetailsPage.open(WHITE_ONLY_PRODUCT.path);
      await productDetailsPage.expectListedSizes(WHITE_ONLY_PRODUCT.sizes);
      await productDetailsPage.expectSizeNotListed(SIZE_CHART_EXCESS_SIZE);
      await productDetailsPage.expectSizeChartDoesNotList(SIZE_CHART_EXCESS_SIZE);
    });
    await test.step('Size guide CMS page does not advertise XXXXL', async () => {
      await homePage.open();
      await footer.openFooterLink('Size guide');
      await footer.expectCmsPage(AppRoutes.SizeGuide, /size guide/i);
      await expect(
        footer.page.getByText(new RegExp(`\\b${SIZE_CHART_EXCESS_SIZE}\\b`, 'i')),
      ).toHaveCount(0);
    });
  });
});
