import {
  OUT_OF_STOCK_PRODUCT,
  PRODUCT_PRICE,
  WHITE_ONLY_PRODUCT,
} from '@data/pdp-variants.data';
import { test } from '@fixtures/test-fixtures';
import { addProductToCart, addSampleProductToCart } from '@helpers/cart.helper';

test.describe('Cart edges', () => {
  test('should merge quantity when the same variant is added twice', async ({
    productDetailsPage,
    cartPage,
  }) => {
    await test.step('Add the same white-only M line twice', async () => {
      await productDetailsPage.open(WHITE_ONLY_PRODUCT.path);
      await productDetailsPage.selectSize('M');
      await productDetailsPage.addToCart();
      await productDetailsPage.expectAddedToCart();
      await productDetailsPage.dismissCartDrawer();
      await productDetailsPage.addToCart();
      await productDetailsPage.dismissCartDrawer();
    });
    await test.step('Cart has one line with quantity 2', async () => {
      await cartPage.open();
      await cartPage.expectLoaded();
      await cartPage.expectItemCount(1);
      await cartPage.expectQuantity(2);
      await cartPage.expectSubtotal(PRODUCT_PRICE.unit * 2);
    });
  });

  test('should price XXS lower and XXXL higher than the default size', async ({
    productDetailsPage,
    cartPage,
  }) => {
    await test.step('XXS shows LKR 3390 on the PDP and in cart', async () => {
      await productDetailsPage.open(WHITE_ONLY_PRODUCT.path);
      await productDetailsPage.selectSize('XXS');
      await productDetailsPage.expectDisplayedPrice(PRODUCT_PRICE.xxs);
      await productDetailsPage.addToCart();
      await productDetailsPage.expectAddedToCart();
      await productDetailsPage.dismissCartDrawer();
    });
    await test.step('XXXL shows LKR 3590 on the PDP and in cart', async () => {
      await productDetailsPage.selectSize('XXXL');
      await productDetailsPage.expectDisplayedPrice(PRODUCT_PRICE.xxxl);
      await productDetailsPage.addToCart();
      await productDetailsPage.expectAddedToCart();
    });
    await test.step('Cart subtotal is XXS + XXXL', async () => {
      await cartPage.open();
      await cartPage.expectItemCount(2);
      await cartPage.expectLineWithAttributes({ color: 'white', size: 'XXS' });
      await cartPage.expectLineWithAttributes({ color: 'white', size: 'XXXL' });
      await cartPage.expectSubtotal(PRODUCT_PRICE.xxs + PRODUCT_PRICE.xxxl);
    });
  });

  test('should keep cart line size and color read-only', async ({
    productDetailsPage,
    cartPage,
  }) => {
    await test.step('Add a sized line and open cart', async () => {
      await addSampleProductToCart(productDetailsPage, { size: 'L' });
      await cartPage.open();
      await cartPage.expectHasItems();
      await cartPage.expectLineWithAttributes({ color: 'white', size: 'L' });
    });
    await test.step('No size or color editor on the cart line', async () => {
      await cartPage.expectLineAttributesReadOnly();
    });
  });

  test('should not add an out-of-stock product and still checkout the in-stock line', async ({
    productDetailsPage,
    cartPage,
    checkoutPage,
  }) => {
    await test.step('Add an in-stock product', async () => {
      await addProductToCart(productDetailsPage, WHITE_ONLY_PRODUCT.path, { size: 'M' });
    });
    await test.step('OOS Berserk cannot be added', async () => {
      await productDetailsPage.open(OUT_OF_STOCK_PRODUCT.path);
      await productDetailsPage.selectSize(OUT_OF_STOCK_PRODUCT.size);
      await productDetailsPage.expectOutOfStock();
    });
    await test.step('Cart still has only the in-stock line and checkout loads', async () => {
      await cartPage.open();
      await cartPage.expectItemCount(1);
      await cartPage.expectLineWithAttributes({ size: 'M' });
      await cartPage.proceedToCheckoutPage();
      await checkoutPage.expectLoaded();
    });
  });
});
