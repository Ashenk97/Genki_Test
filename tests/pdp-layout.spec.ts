import { ACID_WASH_FULL_PRODUCT, ProductTypeTag } from '@data/pdp-variants.data';
import { test } from '@fixtures/test-fixtures';

test.describe('PDP layout', { tag: ProductTypeTag.AcidWash }, () => {
  test('should not overflow the acid-wash PDP horizontally', async ({ productDetailsPage }) => {
    await productDetailsPage.open(ACID_WASH_FULL_PRODUCT.path);
    await productDetailsPage.expectProductTitle(ACID_WASH_FULL_PRODUCT.name);
    await productDetailsPage.selectColor(ACID_WASH_FULL_PRODUCT.defaultColor);
    await productDetailsPage.expectListedSizes(ACID_WASH_FULL_PRODUCT.sizes);
    await productDetailsPage.expectNoHorizontalOverflow();
  });

  test('should list every size at laptop width without page overflow', async ({
    page,
    productDetailsPage,
  }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await productDetailsPage.open(ACID_WASH_FULL_PRODUCT.path);
    await productDetailsPage.selectColor(ACID_WASH_FULL_PRODUCT.defaultColor);
    await productDetailsPage.expectListedSizes(ACID_WASH_FULL_PRODUCT.sizes);
    await productDetailsPage.expectNoHorizontalOverflow();
  });

  test('should list every size on a mobile viewport without page overflow', async ({
    page,
    productDetailsPage,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await productDetailsPage.open(ACID_WASH_FULL_PRODUCT.path);
    await productDetailsPage.selectColor(ACID_WASH_FULL_PRODUCT.defaultColor);
    await productDetailsPage.expectListedSizes(ACID_WASH_FULL_PRODUCT.sizes);
    await productDetailsPage.expectNoHorizontalOverflow();
  });
});
