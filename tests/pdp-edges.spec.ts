import { AppRoutes } from '@constants/routes';
import { SIZE_CHART_EXCESS_SIZE, WHITE_ONLY_PRODUCT } from '@data/pdp-variants.data';
import { expect, test } from '@fixtures/test-fixtures';

test.describe('PDP merchandising edges', () => {
  test('should list sizes XXS to XXXL and not offer XXXXL', async ({
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
