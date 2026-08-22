import {
  BLACK_ONLY_PRODUCT,
  DUAL_COLOR_PRODUCT,
  DUAL_COLOR_SIZE_MATRIX,
  OUT_OF_STOCK_PRODUCT,
  PRODUCT_PRICE,
  PRODUCT_SIZES,
  WHITE_ONLY_PRODUCT,
} from '@data/pdp-variants.data';
import { test } from '@fixtures/test-fixtures';
import type { ProductDetailsPage } from '@pages/ProductDetailsPage';
import type { CartPage } from '@pages/CartPage';

async function addEverySizeToCart(
  productDetailsPage: ProductDetailsPage,
  sizes: readonly string[],
  color?: string,
): Promise<void> {
  if (color) {
    await productDetailsPage.selectColor(color);
  }
  for (const size of sizes) {
    await test.step(`Add size ${size}${color ? ` / ${color}` : ''}`, async () => {
      await productDetailsPage.selectSize(size);
      await productDetailsPage.expectAddToCartVisible();
      await productDetailsPage.addToCart();
      await productDetailsPage.expectAddedToCart();
      await productDetailsPage.dismissCartDrawer();
    });
  }
}

async function expectCartHasEverySize(
  cartPage: CartPage,
  sizes: readonly string[],
  color: string,
): Promise<void> {
  await cartPage.open();
  await cartPage.expectItemCount(sizes.length);
  for (const size of sizes) {
    await cartPage.expectLineWithAttributes({ color, size });
  }
}

test.describe('PDP variant matrix', () => {
  test.describe.configure({ mode: 'parallel' });

  test.describe('White-only product', () => {
    test('should lock the single white color and show all sizes', async ({
      productDetailsPage,
    }) => {
      await productDetailsPage.open(WHITE_ONLY_PRODUCT.path);
      await productDetailsPage.expectProductTitle(WHITE_ONLY_PRODUCT.name);
      await productDetailsPage.expectSingleColorLocked(WHITE_ONLY_PRODUCT.lockedColor);
      await productDetailsPage.expectListedSizes(WHITE_ONLY_PRODUCT.sizes);
      await productDetailsPage.expectSizeRequired();
    });

    for (const size of PRODUCT_SIZES) {
      test(`should enable add to cart for white-only size ${size}`, async ({
        productDetailsPage,
      }) => {
        await productDetailsPage.open(WHITE_ONLY_PRODUCT.path);
        await productDetailsPage.selectSize(size);
        await productDetailsPage.expectSelectedColor('white');
        await productDetailsPage.expectAddToCartVisible();
      });
    }

    test('should add every white-only size to the cart', async ({
      productDetailsPage,
      cartPage,
    }) => {
      await productDetailsPage.open(WHITE_ONLY_PRODUCT.path);
      await addEverySizeToCart(productDetailsPage, WHITE_ONLY_PRODUCT.sizes);
      await expectCartHasEverySize(cartPage, WHITE_ONLY_PRODUCT.sizes, 'white');
    });
  });

  test.describe('Black-only product', () => {
    test('should lock the single black color and show all sizes', async ({
      productDetailsPage,
    }) => {
      await productDetailsPage.open(BLACK_ONLY_PRODUCT.path);
      await productDetailsPage.expectProductTitle(BLACK_ONLY_PRODUCT.name);
      await productDetailsPage.expectSingleColorLocked(BLACK_ONLY_PRODUCT.lockedColor);
      await productDetailsPage.expectListedSizes(BLACK_ONLY_PRODUCT.sizes);
      await productDetailsPage.expectSizeRequired();
    });

    for (const size of PRODUCT_SIZES) {
      test(`should enable add to cart for black-only size ${size}`, async ({
        productDetailsPage,
      }) => {
        await productDetailsPage.open(BLACK_ONLY_PRODUCT.path);
        await productDetailsPage.selectSize(size);
        await productDetailsPage.expectSelectedColor('black');
        await productDetailsPage.expectAddToCartVisible();
      });
    }

    test('should add every black-only size to the cart', async ({
      productDetailsPage,
      cartPage,
    }) => {
      await productDetailsPage.open(BLACK_ONLY_PRODUCT.path);
      await addEverySizeToCart(productDetailsPage, BLACK_ONLY_PRODUCT.sizes);
      await expectCartHasEverySize(cartPage, BLACK_ONLY_PRODUCT.sizes, 'black');
    });
  });

  test.describe('Black and white product', () => {
    test('should hide sizes until a color is chosen', async ({ productDetailsPage }) => {
      await productDetailsPage.open(DUAL_COLOR_PRODUCT.path);
      await productDetailsPage.expectProductTitle(DUAL_COLOR_PRODUCT.name);
      await productDetailsPage.expectColorRequired();
      await productDetailsPage.expectSizesHidden();
      await productDetailsPage.expectColorOptions(DUAL_COLOR_PRODUCT.colors);
    });

    test('should reset the size selection when switching color', async ({
      productDetailsPage,
    }) => {
      await productDetailsPage.open(DUAL_COLOR_PRODUCT.path);
      await productDetailsPage.selectColor('black');
      await productDetailsPage.selectSize('M');
      await productDetailsPage.expectAddToCartVisible();

      await productDetailsPage.selectColor('white');
      await productDetailsPage.expectSelectedColor('white');
      await productDetailsPage.expectSizeRequired();
      await productDetailsPage.expectListedSizes(DUAL_COLOR_PRODUCT.sizes);

      await productDetailsPage.selectSize('XXS');
      await productDetailsPage.expectAddToCartVisible();
    });

    for (const { color, size } of DUAL_COLOR_SIZE_MATRIX) {
      test(`should enable add to cart for ${color} / ${size}`, async ({
        productDetailsPage,
      }) => {
        await productDetailsPage.open(DUAL_COLOR_PRODUCT.path);
        await productDetailsPage.selectColor(color);
        await productDetailsPage.selectSize(size);
        await productDetailsPage.expectSelectedColor(color);
        await productDetailsPage.expectAddToCartVisible();
      });
    }

    test('should add every black size of the dual-color product to the cart', async ({
      productDetailsPage,
      cartPage,
    }) => {
      await productDetailsPage.open(DUAL_COLOR_PRODUCT.path);
      await addEverySizeToCart(productDetailsPage, DUAL_COLOR_PRODUCT.sizes, 'black');
      await expectCartHasEverySize(cartPage, DUAL_COLOR_PRODUCT.sizes, 'black');
    });

    test('should add every white size of the dual-color product to the cart', async ({
      productDetailsPage,
      cartPage,
    }) => {
      await productDetailsPage.open(DUAL_COLOR_PRODUCT.path);
      await addEverySizeToCart(productDetailsPage, DUAL_COLOR_PRODUCT.sizes, 'white');
      await expectCartHasEverySize(cartPage, DUAL_COLOR_PRODUCT.sizes, 'white');
    });

    test('should keep color, size, and qty 3 on the cart line', async ({
      productDetailsPage,
      cartPage,
    }) => {
      await test.step('Select white, XL, qty 3 and add to cart', async () => {
        await productDetailsPage.open(DUAL_COLOR_PRODUCT.path);
        await productDetailsPage.selectColor('white');
        await productDetailsPage.selectSize('XL');
        await productDetailsPage.setQuantity(3);
        await productDetailsPage.addToCart();
        await productDetailsPage.expectAddedToCart();
      });
      await test.step('Cart reflects attributes and quantity', async () => {
        await cartPage.open();
        await cartPage.expectLineWithAttributes({ color: 'white', size: 'XL' });
        await cartPage.expectQuantity(3);
        await cartPage.expectSubtotal(PRODUCT_PRICE.unit * 3);
      });
    });
  });

  test.describe('Out of stock', () => {
    test('should show out of stock after selecting the Berserk size', async ({
      productDetailsPage,
    }) => {
      await productDetailsPage.open(OUT_OF_STOCK_PRODUCT.path);
      await productDetailsPage.expectProductTitle(OUT_OF_STOCK_PRODUCT.name);
      await productDetailsPage.selectSize(OUT_OF_STOCK_PRODUCT.size);
      await productDetailsPage.expectOutOfStock();
    });
  });
});
