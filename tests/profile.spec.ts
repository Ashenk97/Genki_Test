import { AppRoutes } from '@constants/routes';
import { TEST_DATA } from '@data/index';
import { expect, test } from '@fixtures/test-fixtures';

test.describe('Profile', () => {
  test.use({ storageState: '.auth/user.json' });
  test.describe.configure({ mode: 'serial', timeout: 90_000 });

  test.beforeEach(async ({ homePage, header }) => {
    await homePage.open();
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
      const nextLine1 = current.addressOne.trim().endsWith('QA')
        ? current.addressOne.replace(/\s*QA$/, '').trim() || '123 Test Street'
        : `${current.addressOne.trim() || '123 Test Street'} QA`.trim();
      await accountDashboardPage.updateShippingAddress({
        addressOne: nextLine1,
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
    await test.step('Update last name and save profile', async () => {
      await accountDashboardPage.open();
      await accountDashboardPage.openSection('accountDetails');
      await accountDashboardPage.expectAccountDetailsLoaded();
      const current = await accountDashboardPage.getAccountDetails();
      const digits = current.phone.replace(/\D/g, '');
      const phone = digits.length === 10 ? digits : '0710948241';
      const lastName = current.lastName.trim() || 'Kavinda';
      const toggledLast = lastName.endsWith('x') ? lastName.slice(0, -1) : `${lastName}x`;
      await accountDashboardPage.updateAccountDetails({
        firstName: current.firstName.trim() || 'Ashen',
        lastName: toggledLast,
        phone,
      });
      await accountDashboardPage.expectAccountDetailsSaved();
    });

    await test.step('Restore original last name', async () => {
      await accountDashboardPage.open();
      await accountDashboardPage.openSection('accountDetails');
      await accountDashboardPage.expectAccountDetailsLoaded();
      const current = await accountDashboardPage.getAccountDetails();
      const digits = current.phone.replace(/\D/g, '');
      const phone = digits.length === 10 ? digits : '0710948241';
      const lastName = current.lastName.trim() || 'Kavinda';
      const restoredLast = lastName.endsWith('x') ? lastName.slice(0, -1) : `${lastName}x`;
      await accountDashboardPage.updateAccountDetails({
        firstName: current.firstName.trim() || 'Ashen',
        lastName: restoredLast,
        phone,
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

  test('should redirect guests from loyalty to login', async ({ accountDashboardPage }) => {
    await test.step('Open loyalty while logged out', async () => {
      await accountDashboardPage.goto(AppRoutes.AccountLoyalty);
      await accountDashboardPage.expectRedirectedToLogin();
    });
  });

  test('should redirect guests from address to login', async ({ accountDashboardPage }) => {
    await test.step('Open address while logged out', async () => {
      await accountDashboardPage.goto(AppRoutes.AccountAddress);
      await accountDashboardPage.expectRedirectedToLogin();
    });
  });

  test('should redirect guests from account details to login', async ({
    accountDashboardPage,
  }) => {
    await test.step('Open account details while logged out', async () => {
      await accountDashboardPage.goto(AppRoutes.AccountDetails);
      await accountDashboardPage.expectRedirectedToLogin();
    });
  });

  test('should prompt guests to sign in on the public rewards page', async ({
    rewardsPage,
    header,
  }) => {
    await test.step('Open rewards while logged out', async () => {
      await rewardsPage.open();
      await rewardsPage.expectGuestSignInPrompt();
      await header.expectLoggedOut();
    });
  });
});
