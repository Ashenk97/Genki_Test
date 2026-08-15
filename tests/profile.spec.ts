import { TEST_DATA } from '@data/index';
import { test } from '@fixtures/test-fixtures';

test.describe('Profile', () => {
  test.beforeEach(async ({ loginPage, header }) => {
    await loginPage.open();
    await loginPage.login(TEST_DATA.auth.email, TEST_DATA.auth.password);
    await loginPage.expectLoginSuccess();
    await header.expectLoggedIn(TEST_DATA.auth.displayName);
  });

  test('should show dashboard greeting and email', async ({ accountDashboardPage }) => {
    await test.step('Open account dashboard', async () => {
      await accountDashboardPage.open();
      await accountDashboardPage.expectLoaded(TEST_DATA.auth.displayName, TEST_DATA.auth.email);
    });
  });

  test('should open Orders from the account menu', async ({ accountDashboardPage }) => {
    await test.step('Open Orders section', async () => {
      await accountDashboardPage.open();
      await accountDashboardPage.openSection('orders');
      await accountDashboardPage.expectOrdersLoaded();
    });
  });

  test('should open Loyalty and show points', async ({ accountDashboardPage }) => {
    await test.step('Open Loyalty section', async () => {
      await accountDashboardPage.open();
      await accountDashboardPage.openSection('loyalty');
      await accountDashboardPage.expectLoyaltyLoaded();
    });
  });

  test('should open Address details', async ({ accountDashboardPage }) => {
    await test.step('Open Address section', async () => {
      await accountDashboardPage.open();
      await accountDashboardPage.openSection('address');
      await accountDashboardPage.expectAddressLoaded();
    });
  });

  test('should open Account Details', async ({ accountDashboardPage }) => {
    await test.step('Open Account Details section', async () => {
      await accountDashboardPage.open();
      await accountDashboardPage.openSection('accountDetails');
      await accountDashboardPage.expectAccountDetailsLoaded();
    });
  });

  test('should open Rewards from Redeem Points', async ({ accountDashboardPage, rewardsPage }) => {
    await test.step('Open Rewards via Redeem Points', async () => {
      await accountDashboardPage.open();
      await accountDashboardPage.openSection('rewards');
      await rewardsPage.expectLoaded();
    });
  });

  test('should logout from the account sidebar', async ({ accountDashboardPage, header }) => {
    await test.step('Logout from sidebar', async () => {
      await accountDashboardPage.open();
      await accountDashboardPage.logoutFromSidebar();
      await header.expectLoggedOut();
    });
  });
});
