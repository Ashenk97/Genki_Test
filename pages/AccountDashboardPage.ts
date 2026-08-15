import { Locator, Page, expect } from '@playwright/test';
import { AUTH_MESSAGES } from '@constants/messages';
import { ToastType } from '@constants/payment';
import { ACCOUNT_PAGES } from '@data/navigation.data';
import type { AccountSection } from '@models/auth.types';
import { BasePage } from '@pages/BasePage';

export class AccountDashboardPage extends BasePage {
  private readonly heading: Locator;
  private readonly ordersLink: Locator;
  private readonly loyaltyLink: Locator;
  private readonly addressLink: Locator;
  private readonly accountDetailsLink: Locator;
  private readonly redeemPointsLink: Locator;
  private readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: ACCOUNT_PAGES.dashboard.heading });
    this.ordersLink = page.getByRole('link', { name: /^orders$/i }).first();
    this.loyaltyLink = page.getByRole('link', { name: /^loyalty$/i }).first();
    this.addressLink = page.getByRole('link', { name: /^address$/i }).first();
    this.accountDetailsLink = page.getByRole('link', { name: /^account details$/i }).first();
    this.redeemPointsLink = page.getByRole('link', { name: /redeem points/i }).first();
    this.logoutButton = page.getByRole('button', { name: /^logout$/i }).first();
  }

  async open(): Promise<this> {
    await this.goto(ACCOUNT_PAGES.dashboard.path);
    return this;
  }

  async expectLoaded(displayName: string, email: string): Promise<void> {
    await this.expectPathname(ACCOUNT_PAGES.dashboard.path);
    await expect(this.heading).toBeVisible();
    await expect(
      this.page.getByText(new RegExp(`hello,?\\s*${displayName}`, 'i')),
    ).toBeVisible();
    await expect(this.page.getByText(email)).toBeVisible();
  }

  async openSection(section: AccountSection): Promise<this> {
    const map: Record<AccountSection, Locator> = {
      orders: this.ordersLink,
      loyalty: this.loyaltyLink,
      address: this.addressLink,
      accountDetails: this.accountDetailsLink,
      rewards: this.redeemPointsLink,
    };
    await map[section].click();
    await this.waitForPageLoad();
    await this.acceptCookiesIfVisible();
    return this;
  }

  async expectOrdersLoaded(): Promise<void> {
    await this.expectPathname(ACCOUNT_PAGES.orders.path);
    await expect(
      this.page.getByRole('heading', { name: ACCOUNT_PAGES.orders.heading }).first(),
    ).toBeVisible();
    await expect(
      this.page.getByText(/GK-\d+/).or(this.page.getByText(/no orders/i)).first(),
    ).toBeVisible();
  }

  async expectLoyaltyLoaded(): Promise<void> {
    await this.expectPathname(ACCOUNT_PAGES.loyalty.path);
    await expect(
      this.page.getByRole('heading', { name: ACCOUNT_PAGES.loyalty.heading }).first(),
    ).toBeVisible();
    await expect(this.page.getByText(/usable points|loyalty points/i).first()).toBeVisible();
  }

  async expectAddressLoaded(): Promise<void> {
    await this.expectPathname(ACCOUNT_PAGES.address.path);
    await expect(
      this.page.getByRole('heading', { name: ACCOUNT_PAGES.address.heading }).first(),
    ).toBeVisible();
    await expect(
      this.page.getByText(/address line 1|shipping address/i).first(),
    ).toBeVisible();
  }

  async expectAccountDetailsLoaded(): Promise<void> {
    await this.expectPathname(ACCOUNT_PAGES.accountDetails.path);
    await expect(
      this.page.getByRole('heading', { name: ACCOUNT_PAGES.accountDetails.heading }).first(),
    ).toBeVisible();
    await expect(
      this.page.getByText(/personal information|first name/i).first(),
    ).toBeVisible();
  }

  async logoutFromSidebar(): Promise<void> {
    await this.logoutButton.click();
    await this.expectToast(AUTH_MESSAGES.logoutToast, ToastType.Success);
  }
}
