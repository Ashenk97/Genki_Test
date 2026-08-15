import { TEST_DATA } from '@data/index';
import { test } from '@fixtures/test-fixtures';

test.describe('Rewards', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(TEST_DATA.auth.email, TEST_DATA.auth.password);
    await loginPage.expectLoginSuccess();
  });

  test('should show usable points and rewards catalog', async ({ rewardsPage }) => {
    await test.step('Open rewards page', async () => {
      await rewardsPage.open();
      await rewardsPage.expectLoaded();
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
});
