import {
  ACID_WASH_FULL_PRODUCT,
  ACID_WASH_PARTIAL_PRODUCT,
  ACID_WASH_SIZES,
  ProductTypeTag,
} from '@data/pdp-variants.data';
import { test } from '@fixtures/test-fixtures';

test.describe('Acid wash variants', { tag: ProductTypeTag.AcidWash }, () => {
  test('should hide sizes until a color is chosen on a full palette', async ({
    productDetailsPage,
  }) => {
    await test.step('Open a five-color acid-wash PDP', async () => {
      await productDetailsPage.open(ACID_WASH_FULL_PRODUCT.path);
      await productDetailsPage.expectProductTitle(ACID_WASH_FULL_PRODUCT.name);
      await productDetailsPage.expectColorRequired();
      await productDetailsPage.expectSizesHidden();
      await productDetailsPage.expectColorOptions(ACID_WASH_FULL_PRODUCT.colors);
    });
  });

  test('should list S through XXL after a color is selected', async ({ productDetailsPage }) => {
    await test.step('Select Black and expect the acid-wash size run', async () => {
      await productDetailsPage.open(ACID_WASH_FULL_PRODUCT.path);
      await productDetailsPage.selectColor(ACID_WASH_FULL_PRODUCT.defaultColor);
      await productDetailsPage.expectSelectedColor(ACID_WASH_FULL_PRODUCT.defaultColor);
      await productDetailsPage.expectListedSizes(ACID_WASH_SIZES);
      await productDetailsPage.expectSizeRequired();
    });
  });

  for (const size of ACID_WASH_SIZES) {
    test(`should enable add to cart or show out of stock for Black / ${size}`, async ({
      productDetailsPage,
    }) => {
      await test.step(`Select Black and ${size}`, async () => {
        await productDetailsPage.open(ACID_WASH_FULL_PRODUCT.path);
        await productDetailsPage.selectColor('Black');
        await productDetailsPage.selectSize(size);
        await productDetailsPage.expectAddToCartOrOutOfStock();
      });
    });
  }

  test('should reset the size when the color changes', async ({ productDetailsPage }) => {
    await test.step('Select Black and M, then switch to Ash', async () => {
      await productDetailsPage.open(ACID_WASH_FULL_PRODUCT.path);
      await productDetailsPage.selectColor('Black');
      await productDetailsPage.selectSize('M');
      await productDetailsPage.expectAddToCartVisible();
      await productDetailsPage.selectColor('Ash');
      await productDetailsPage.expectSelectedColor('Ash');
      await productDetailsPage.expectSizeRequired();
    });
  });

  test('should offer fewer colors when the design does not use the full palette', async ({
    productDetailsPage,
  }) => {
    await test.step('Shinobu omits Brown and Purple', async () => {
      await productDetailsPage.open(ACID_WASH_PARTIAL_PRODUCT.path);
      await productDetailsPage.expectProductTitle(ACID_WASH_PARTIAL_PRODUCT.name);
      await productDetailsPage.expectColorOptions(ACID_WASH_PARTIAL_PRODUCT.colors);
      for (const color of ACID_WASH_PARTIAL_PRODUCT.absentColors) {
        await productDetailsPage.expectColorAbsent(color);
      }
    });
  });

  test('should add Black / M to the cart with color and size', async ({
    productDetailsPage,
    cartPage,
  }) => {
    await test.step('Select Black and M then add to cart', async () => {
      await productDetailsPage.open(ACID_WASH_FULL_PRODUCT.path);
      await productDetailsPage.selectColor('Black');
      await productDetailsPage.selectSize('M');
      await productDetailsPage.addToCart();
      await productDetailsPage.expectAddedToCart();
    });
    await test.step('Cart shows Black and M', async () => {
      await cartPage.open();
      await cartPage.expectLineWithAttributes({ color: 'Black', size: 'M' });
    });
  });
});
