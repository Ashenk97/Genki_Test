import { Locator, Page, expect } from '@playwright/test';
import { ACCOUNT_PAGES, AUTH_MESSAGES } from '../fixtures/test-data';
import { BasePage } from './BasePage';

export class AccountDashboardPage extends BasePage {
  readonly heading: Locator;
  readonly sidebar: Locator;
  readonly dashboardLink: Locator;
  readonly ordersLink: Locator;
  readonly loyaltyLink: Locator;
  readonly addressLink: Locator;
  readonly accountDetailsLink: Locator;
  readonly redeemPointsLink: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: ACCOUNT_PAGES.dashboard.heading });
    this.sidebar = page.locator('aside, [class*="account"]').first();
    this.dashboardLink = page.getByRole('link', { name: /^dashboard$/i }).first();
    this.ordersLink = page.getByRole('link', { name: /^orders$/i }).first();
    this.loyaltyLink = page.getByRole('link', { name: /^loyalty$/i }).first();
    this.addressLink = page.getByRole('link', { name: /^address$/i }).first();
    this.accountDetailsLink = page.getByRole('link', { name: /^account details$/i }).first();
    this.redeemPointsLink = page.getByRole('link', { name: /redeem points/i }).first();
    this.logoutButton = page.getByRole('button', { name: /^logout$/i }).first();
  }

  async open(): Promise<void> {
    await this.goto(ACCOUNT_PAGES.dashboard.path);
    await this.waitForNetworkIdle();
  }

  async expectLoaded(displayName: string, email: string): Promise<void> {
    await expect(this.page).toHaveURL(
      (url) => url.pathname.replace(/\/$/, '') === ACCOUNT_PAGES.dashboard.path,
    );
    await expect(this.heading).toBeVisible();
    await expect(this.page.getByText(new RegExp(`hello,?\\s*${displayName}`, 'i'))).toBeVisible();
    await expect(this.page.getByText(email)).toBeVisible();
  }

  async openSection(
    section: 'orders' | 'loyalty' | 'address' | 'accountDetails' | 'rewards',
  ): Promise<void> {
    const map = {
      orders: this.ordersLink,
      loyalty: this.loyaltyLink,
      address: this.addressLink,
      accountDetails: this.accountDetailsLink,
      rewards: this.redeemPointsLink,
    } as const;
    await map[section].click();
    await this.waitForPageLoad();
    await this.waitForNetworkIdle();
    await this.acceptCookiesIfVisible();
  }

  async expectOrdersLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(
      (url) => url.pathname.replace(/\/$/, '') === ACCOUNT_PAGES.orders.path,
    );
    await expect(
      this.page.getByRole('heading', { name: ACCOUNT_PAGES.orders.heading }).first(),
    ).toBeVisible();
    await expect(this.page.getByText(/GK-\d+/).or(this.page.getByText(/no orders/i)).first()).toBeVisible();
  }

  async expectLoyaltyLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(
      (url) => url.pathname.replace(/\/$/, '') === ACCOUNT_PAGES.loyalty.path,
    );
    await expect(
      this.page.getByRole('heading', { name: ACCOUNT_PAGES.loyalty.heading }).first(),
    ).toBeVisible();
    await expect(this.page.getByText(/usable points|loyalty points/i).first()).toBeVisible();
  }

  async expectAddressLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(
      (url) => url.pathname.replace(/\/$/, '') === ACCOUNT_PAGES.address.path,
    );
    await expect(
      this.page.getByRole('heading', { name: ACCOUNT_PAGES.address.heading }).first(),
    ).toBeVisible();
    await expect(this.page.getByText(/address line 1|shipping address/i).first()).toBeVisible();
  }

  async expectAccountDetailsLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(
      (url) => url.pathname.replace(/\/$/, '') === ACCOUNT_PAGES.accountDetails.path,
    );
    await expect(
      this.page.getByRole('heading', { name: ACCOUNT_PAGES.accountDetails.heading }).first(),
    ).toBeVisible();
    await expect(this.page.getByText(/personal information|first name/i).first()).toBeVisible();
  }

  async logoutFromSidebar(): Promise<void> {
    await this.logoutButton.click();
    await this.expectToast(AUTH_MESSAGES.logoutToast, 'success');
  }
}
