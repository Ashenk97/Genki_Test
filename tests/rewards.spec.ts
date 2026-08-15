import { TEST_DATA } from '../fixtures/test-data';
import { test, expect } from '../fixtures/test-fixtures';

test.describe('Rewards', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(TEST_DATA.auth.email, TEST_DATA.auth.password);
    await loginPage.expectLoginSuccess();
  });

  test('should show usable points and rewards catalog', async ({ rewardsPage }) => {
    await rewardsPage.open();
    await rewardsPage.expectLoaded();
  });

  test('should add a reward to the next order queue', async ({ rewardsPage }) => {
    await rewardsPage.open();
    await rewardsPage.expectLoaded();
    await rewardsPage.addFirstAffordableReward();
    await rewardsPage.expectRewardQueued();
  });
});
