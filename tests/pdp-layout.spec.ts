import { DUAL_COLOR_PRODUCT, WHITE_ONLY_PRODUCT } from '@data/pdp-variants.data';
import { test } from '@fixtures/test-fixtures';

test.describe('PDP layout', () => {
  test.describe.configure({ mode: 'parallel' });

  test('should not overflow the white-only PDP horizontally', async ({ productDetailsPage }) => {
    await productDetailsPage.open(WHITE_ONLY_PRODUCT.path);
    await productDetailsPage.expectProductTitle(WHITE_ONLY_PRODUCT.name);
    await productDetailsPage.expectListedSizes(WHITE_ONLY_PRODUCT.sizes);
    await productDetailsPage.expectNoHorizontalOverflow();
  });

  test('should list every size at laptop width without page overflow', async ({
    page,
    productDetailsPage,
  }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await productDetailsPage.open(WHITE_ONLY_PRODUCT.path);
    await productDetailsPage.expectListedSizes(WHITE_ONLY_PRODUCT.sizes);
    await productDetailsPage.expectNoHorizontalOverflow();
  });

  test('should list every size on a mobile viewport without page overflow', async ({
    page,
    productDetailsPage,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await productDetailsPage.open(WHITE_ONLY_PRODUCT.path);
    await productDetailsPage.expectListedSizes(WHITE_ONLY_PRODUCT.sizes);
    await productDetailsPage.expectNoHorizontalOverflow();
  });

  test('should keep a visible row gap when size chips wrap at laptop width', async ({
    page,
    productDetailsPage,
  }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await productDetailsPage.open(WHITE_ONLY_PRODUCT.path);
    await productDetailsPage.expectListedSizes(WHITE_ONLY_PRODUCT.sizes);
    await productDetailsPage.expectWrappedSizeLabelsHaveRowGap(8);
  });

  test('should keep a visible row gap when size chips wrap on a mobile viewport', async ({
    page,
    productDetailsPage,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await productDetailsPage.open(WHITE_ONLY_PRODUCT.path);
    await productDetailsPage.expectListedSizes(WHITE_ONLY_PRODUCT.sizes);
    await productDetailsPage.expectWrappedSizeLabelsHaveRowGap(8);
  });

  test('should list dual-color sizes after a color is chosen without page overflow', async ({
    productDetailsPage,
  }) => {
    await productDetailsPage.open(DUAL_COLOR_PRODUCT.path);
    await productDetailsPage.selectColor('black');
    await productDetailsPage.expectListedSizes(DUAL_COLOR_PRODUCT.sizes);
    await productDetailsPage.expectNoHorizontalOverflow();
  });
});
