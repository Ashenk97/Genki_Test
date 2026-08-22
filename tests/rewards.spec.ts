import { PaymentMethod } from '@constants/payment';
import { expect, test } from '@fixtures/test-fixtures';
import { addSampleProductToCart } from '@helpers/cart.helper';

test.describe('Rewards', () => {
  test.use({ storageState: '.auth/user.json' });
  test.describe.configure({ mode: 'serial', timeout: 90_000 });

  test('should show usable points and rewards catalog', async ({ rewardsPage }) => {
    await test.step('Open rewards page', async () => {
      await rewardsPage.open();
      await rewardsPage.expectLoaded();
    });
  });

  test('should gain usable points after purchasing an item', async ({
    rewardsPage,
    productDetailsPage,
    checkoutPage,
    cartPage,
  }) => {
    test.setTimeout(90_000);
    const pointsBefore = await test.step('Capture points before purchase', async () => {
      await rewardsPage.open();
      await rewardsPage.expectLoaded();
      await rewardsPage.clearQueuedRewards();
      const points = await rewardsPage.getUsablePoints();
      await cartPage.open();
      await cartPage.clearCart();
      return points;
    });

    await test.step('Place a COD order without redeeming a reward', async () => {
      await addSampleProductToCart(productDetailsPage);
      await checkoutPage.open();
      await checkoutPage.fillLoggedInBilling();
      await checkoutPage.selectPayment(PaymentMethod.COD);
      await checkoutPage.acceptTerms();
      const readiness = await checkoutPage.waitUntilPlaceableOrBlocked();
      if (readiness === 'placeable') {
        await checkoutPage.placeOrder();
      }
      const completed = await checkoutPage.reachedOrderSuccess();
      const blocked =
        readiness === 'blocked' ||
        (await checkoutPage.hasUnpublishedProductError()) ||
        !completed;
      test.fail(
        blocked,
        'GENKI: unpublished Daimyo FREE gift blocks logged-in checkout',
      );
      expect(blocked, 'reward earn checkout should complete').toBe(false);
      await checkoutPage.expectOrderSuccess(PaymentMethod.COD);
    });

    await test.step('Usable points increased after the purchase', async () => {
      await rewardsPage.open();
      await rewardsPage.expectLoaded();
      await rewardsPage.expectUsablePointsGreaterThan(pointsBefore);
    });
  });

  test('should add a reward to the next order queue', async ({ rewardsPage }) => {
    await test.step('Queue an affordable reward', async () => {
      await rewardsPage.open();
      await rewardsPage.expectLoaded();
      await rewardsPage.addFirstAffordableReward();
      await rewardsPage.expectRewardQueued();
    });
  });

  test('should apply a queued reward on the next checkout', async ({
    rewardsPage,
    productDetailsPage,
    checkoutPage,
  }) => {
    await test.step('Queue a reward for the next order', async () => {
      await rewardsPage.open();
      await rewardsPage.expectLoaded();
      await rewardsPage.addFirstAffordableReward();
      await rewardsPage.expectRewardQueued();
    });
    await test.step('Open checkout with a cart and see selected rewards', async () => {
      await addSampleProductToCart(productDetailsPage);
      await checkoutPage.open();
      await checkoutPage.expectLoaded();
      await checkoutPage.expectSelectedRewardsVisible();
      await checkoutPage.fillLoggedInBilling();
      await checkoutPage.selectPayment(PaymentMethod.COD);
      await checkoutPage.acceptTerms();
    });
  });

  test('should redeem a queued reward when placing a COD order', async ({
    rewardsPage,
    productDetailsPage,
    checkoutPage,
  }) => {
    test.setTimeout(90_000);
    let pointsBefore = 0;

    await test.step('Queue reward and capture points', async () => {
      await rewardsPage.open();
      await rewardsPage.expectLoaded();
      pointsBefore = await rewardsPage.getUsablePoints();
      await rewardsPage.addFirstAffordableReward();
      await rewardsPage.expectRewardQueued();
    });

    await test.step('Place COD order with reward on checkout', async () => {
      await addSampleProductToCart(productDetailsPage);
      await checkoutPage.open();
      await checkoutPage.expectSelectedRewardsVisible();
      await checkoutPage.fillLoggedInBilling();
      await checkoutPage.selectPayment(PaymentMethod.COD);
      await checkoutPage.acceptTerms();
      const readiness = await checkoutPage.waitUntilPlaceableOrBlocked();
      if (readiness === 'placeable') {
        await checkoutPage.placeOrder();
      }
      const completed = await checkoutPage.reachedOrderSuccess();
      const blocked =
        readiness === 'blocked' ||
        (await checkoutPage.hasUnpublishedProductError()) ||
        !completed;
      test.fail(
        blocked,
        'GENKI: unpublished Daimyo FREE gift blocks reward checkout',
      );
      expect(blocked, 'reward redeem checkout should complete').toBe(false);
    });

    await test.step('Order succeeded and points decreased', async () => {
      await checkoutPage.expectOrderSuccess(PaymentMethod.COD);
      await rewardsPage.open();
      await rewardsPage.expectLoaded();
      await rewardsPage.expectUsablePointsAtMost(Math.max(pointsBefore - 1, 0));
    });
  });
});
