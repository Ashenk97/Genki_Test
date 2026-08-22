import { TEST_DATA } from '@data/index';
import { PRODUCT_PRICE } from '@data/pdp-variants.data';
import { test } from '@fixtures/test-fixtures';
import {
  addSampleProductToCart,
  addSecondaryProductToCart,
} from '@helpers/cart.helper';

test.describe('Cart', () => {
  test('should show the cart page with the added line item', async ({
    productDetailsPage,
    cartPage,
  }) => {
    await test.step('Add sample product to cart', async () => {
      await addSampleProductToCart(productDetailsPage);
    });
    await test.step('Open cart and verify line item', async () => {
      await cartPage.open();
      await cartPage.expectLoaded();
      await cartPage.expectHasItems();
    });
  });

  test('should increase quantity on the cart page', async ({ productDetailsPage, cartPage }) => {
    await test.step('Add sample product to cart', async () => {
      await addSampleProductToCart(productDetailsPage);
    });
    await test.step('Increase quantity to 2', async () => {
      await cartPage.open();
      await cartPage.expectHasItems();
      await cartPage.increaseQuantity();
      await cartPage.expectQuantity(2);
    });
  });

  test('should decrease quantity on the cart page', async ({ productDetailsPage, cartPage }) => {
    await test.step('Add product and increase quantity', async () => {
      await addSampleProductToCart(productDetailsPage);
      await cartPage.open();
      await cartPage.increaseQuantity();
      await cartPage.expectQuantity(2);
    });
    await test.step('Decrease quantity back to 1', async () => {
      await cartPage.decreaseQuantity();
      await cartPage.expectQuantity(1);
    });
  });

  test('should show multiple line items when two products are added', async ({
    productDetailsPage,
    cartPage,
  }) => {
    await test.step('Add two different products', async () => {
      await addSampleProductToCart(productDetailsPage);
      await addSecondaryProductToCart(productDetailsPage);
    });
    await test.step('Verify cart has two lines', async () => {
      await cartPage.open();
      await cartPage.expectLoaded();
      await cartPage.expectItemCount(2);
    });
  });

  test('should remove items and show an empty cart', async ({ productDetailsPage, cartPage }) => {
    await test.step('Add sample product to cart', async () => {
      await addSampleProductToCart(productDetailsPage);
    });
    await test.step('Clear cart', async () => {
      await cartPage.open();
      await cartPage.clearCart();
      await cartPage.expectEmpty();
      await cartPage.expectProceedToCheckoutHidden();
    });
  });

  test('should navigate from empty cart Shop now', async ({ productDetailsPage, cartPage }) => {
    await test.step('Empty the cart', async () => {
      await addSampleProductToCart(productDetailsPage);
      await cartPage.open();
      await cartPage.clearCart();
      await cartPage.expectEmpty();
    });
    await test.step('Click Shop now', async () => {
      await cartPage.clickShopNow();
      await cartPage.expectShopNowNavigated();
    });
  });

  test('should proceed to checkout from the cart page', async ({
    productDetailsPage,
    cartPage,
    checkoutPage,
  }) => {
    await test.step('Add sample product to cart', async () => {
      await addSampleProductToCart(productDetailsPage);
    });
    await test.step('Proceed to checkout', async () => {
      await cartPage.open();
      await cartPage.proceedToCheckoutPage();
      await checkoutPage.expectLoaded();
    });
  });

  test('should proceed to checkout from the cart drawer', async ({
    productDetailsPage,
    header,
    cartPage,
    checkoutPage,
  }) => {
    await test.step('Add product and open cart drawer', async () => {
      await addSampleProductToCart(productDetailsPage);
      await header.openCart();
      await cartPage.expectDrawerNotEmpty();
    });
    await test.step('Checkout from drawer', async () => {
      await cartPage.checkoutFromDrawer();
      await checkoutPage.expectLoaded();
    });
  });

  test('should persist cart items for a logged-in customer after reload', async ({
    loginPage,
    productDetailsPage,
    cartPage,
    header,
  }) => {
    await test.step('Sign in and add a product', async () => {
      await loginPage.open();
      await loginPage.login(TEST_DATA.auth.email, TEST_DATA.auth.password);
      await loginPage.expectLoginSuccess();
      await addSampleProductToCart(productDetailsPage);
    });
    await test.step('Reload and confirm cart still has items', async () => {
      await cartPage.open();
      await cartPage.expectHasItems();
      await header.reloadPage();
      await cartPage.open();
      await cartPage.expectHasItems();
      await header.expectCartBadgeHasItems();
    });
  });
});

test.describe('Free delivery threshold', () => {
  test('should show remaining amount when the cart is below LKR 5,000', async ({
    productDetailsPage,
    cartPage,
  }) => {
    await test.step('Add qty 1 (LKR 3,490)', async () => {
      await addSampleProductToCart(productDetailsPage, { quantity: 1 });
      await cartPage.open();
      await cartPage.expectHasItems();
      await cartPage.expectSubtotal(PRODUCT_PRICE.unit);
      await cartPage.expectFreeDeliveryRemaining();
    });
  });

  test('should unlock free delivery when the cart is over LKR 5,000', async ({
    productDetailsPage,
    cartPage,
  }) => {
    await test.step('Add qty 2 (LKR 6,980)', async () => {
      await addSampleProductToCart(productDetailsPage, { quantity: 2 });
      await cartPage.open();
      await cartPage.expectHasItems();
      await cartPage.expectQuantity(2);
      await cartPage.expectSubtotal(PRODUCT_PRICE.unit * 2);
      await cartPage.expectFreeDeliveryUnlocked();
    });
  });

  test('should cross the free-delivery boundary when cart qty goes from 1 to 2', async ({
    productDetailsPage,
    cartPage,
  }) => {
    await test.step('Start below the threshold', async () => {
      await addSampleProductToCart(productDetailsPage);
      await cartPage.open();
      await cartPage.expectFreeDeliveryRemaining();
    });
    await test.step('Increase qty to cross LKR 5,000', async () => {
      await cartPage.increaseQuantity();
      await cartPage.expectQuantity(2);
      await cartPage.expectFreeDeliveryUnlocked();
    });
    await test.step('Decrease qty back below the threshold', async () => {
      await cartPage.decreaseQuantity();
      await cartPage.expectQuantity(1);
      await cartPage.expectFreeDeliveryRemaining();
    });
  });
});
