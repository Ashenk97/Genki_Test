import { AppRoutes } from '@constants/routes';
import {
  ACID_WASH_FULL_PRODUCT,
  ProductTypeTag,
  SIZE_CHART_EXCESS_SIZE,
} from '@data/pdp-variants.data';
import { expect, test } from '@fixtures/test-fixtures';

test.describe('PDP merchandising edges', { tag: ProductTypeTag.AcidWash }, () => {
  test('should list sizes S to XXL and not offer XXXXL', async ({
    productDetailsPage,
    footer,
    homePage,
  }) => {
    await test.step('Acid-wash PDP sizes stop at XXL', async () => {
      await productDetailsPage.open(ACID_WASH_FULL_PRODUCT.path);
      await productDetailsPage.selectColor(ACID_WASH_FULL_PRODUCT.defaultColor);
      await productDetailsPage.expectListedSizes(ACID_WASH_FULL_PRODUCT.sizes);
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
