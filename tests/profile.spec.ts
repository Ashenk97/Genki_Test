import { AppRoutes } from '@constants/routes';
import { TEST_DATA } from '@data/index';
import { expect, test } from '@fixtures/test-fixtures';

test.describe('Profile', () => {
  // Avoid overlapping logins (rate limit).
  test.describe.configure({ mode: 'serial' });

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

  test('should open order detail from the Orders list', async ({ accountDashboardPage }) => {
    await test.step('Open first order detail panel', async () => {
      await accountDashboardPage.open();
      await accountDashboardPage.openSection('orders');
      await accountDashboardPage.expectOrdersLoaded();
      await accountDashboardPage.openFirstOrderDetail();
      await expect(
        accountDashboardPage.page.getByText(/ordered products|payment type|total cost/i).first(),
      ).toBeVisible();
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

  test('should save shipping address changes', async ({ accountDashboardPage }) => {
    await test.step('Toggle address line 2 and save', async () => {
      await accountDashboardPage.open();
      await accountDashboardPage.openSection('address');
      await accountDashboardPage.expectAddressLoaded();
      const current = await accountDashboardPage.getAddressFields();
      const nextLine2 = current.addressTwo.trim().endsWith('QA')
        ? current.addressTwo.replace(/\s*QA$/, '').trim() || 'Colombo 07'
        : `${current.addressTwo.trim() || 'Colombo 07'} QA`.trim();
      await accountDashboardPage.updateShippingAddress({
        addressOne: current.addressOne || '123 Test Street',
        addressTwo: nextLine2,
        city: current.city || 'Colombo',
      });
      await accountDashboardPage.expectAddressSaved();
    });
  });

  test('should open Account Details', async ({ accountDashboardPage }) => {
    await test.step('Open Account Details section', async () => {
      await accountDashboardPage.open();
      await accountDashboardPage.openSection('accountDetails');
      await accountDashboardPage.expectAccountDetailsLoaded();
    });
  });

  test('should save account details changes', async ({ accountDashboardPage }) => {
    await test.step('Update phone and save profile', async () => {
      await accountDashboardPage.open();
      await accountDashboardPage.openSection('accountDetails');
      await accountDashboardPage.expectAccountDetailsLoaded();
      const current = await accountDashboardPage.getAccountDetails();
      const toggled = current.phone.endsWith('0')
        ? `${current.phone.slice(0, -1)}1`
        : `${current.phone.slice(0, -1)}0`;
      await accountDashboardPage.updateAccountDetails({
        firstName: current.firstName,
        lastName: current.lastName,
        phone: toggled,
      });
      await accountDashboardPage.expectAccountDetailsSaved();
    });

    await test.step('Restore original phone number', async () => {
      await accountDashboardPage.open();
      await accountDashboardPage.openSection('accountDetails');
      await accountDashboardPage.expectAccountDetailsLoaded();
      const current = await accountDashboardPage.getAccountDetails();
      // Toggle once more to return to the prior value without depending on stale form state.
      const restored = current.phone.endsWith('0')
        ? `${current.phone.slice(0, -1)}1`
        : `${current.phone.slice(0, -1)}0`;
      await accountDashboardPage.updateAccountDetails({
        firstName: current.firstName,
        lastName: current.lastName,
        phone: restored,
      });
      await accountDashboardPage.expectAccountDetailsSaved();
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

test.describe('Account deep links as guest', () => {
  test('should redirect guests from account dashboard to login', async ({
    accountDashboardPage,
  }) => {
    await test.step('Open dashboard while logged out', async () => {
      await accountDashboardPage.goto(AppRoutes.AccountDashboard);
      await accountDashboardPage.expectRedirectedToLogin();
    });
  });

  test('should redirect guests from orders to login', async ({ accountDashboardPage }) => {
    await test.step('Open orders while logged out', async () => {
      await accountDashboardPage.goto(AppRoutes.AccountOrders);
      await accountDashboardPage.expectRedirectedToLogin();
    });
  });
});
