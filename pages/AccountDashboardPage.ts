import { Locator, Page, expect } from '@playwright/test';
import { AUTH_MESSAGES } from '@constants/messages';
import { ToastType } from '@constants/payment';
import { Timeouts } from '@constants/timeouts';
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

  async expectOrderVisible(orderId: string): Promise<void> {
    await this.expectPathname(ACCOUNT_PAGES.orders.path);
    await expect(this.page.getByText(orderId).first()).toBeVisible();
  }

  async openFirstOrderDetail(): Promise<this> {
    await this.page.getByRole('button', { name: /^view$/i }).first().click();
    await expect(this.page.getByText(/order details/i).first()).toBeVisible();
    return this;
  }

  async openOrderDetail(orderId: string): Promise<this> {
    const row = this.page.locator('tr').filter({ hasText: orderId });
    await row.getByRole('button', { name: /^view$/i }).click();
    await expect(this.page.getByText(/order details/i).first()).toBeVisible();
    await expect(this.page.getByText(orderId).first()).toBeVisible();
    return this;
  }

  async expectOrderDetailLoaded(orderId: string): Promise<void> {
    await expect(this.page.getByText(/order details/i).first()).toBeVisible();
    await expect(this.page.getByText(new RegExp(`Order ID:\\s*${orderId}`, 'i'))).toBeVisible();
    await expect(this.page.getByText(/ordered products|payment type|total cost/i).first()).toBeVisible();
  }

  async updateShippingAddress(details: {
    addressOne: string;
    addressTwo?: string;
    city: string;
  }): Promise<this> {
    const line1 = this.page.locator('#address-line1, input[name="streetAddress1"]');
    const line2 = this.page.locator('#address-line2, input[name="streetAddress2"]');
    const city = this.page.locator('#city, input[name="city"]');
    await line1.fill(details.addressOne);
    if (await line2.isVisible().catch(() => false)) {
      await line2.fill(details.addressTwo ?? '');
    }
    await city.fill(details.city);
    await this.page.getByRole('button', { name: /save changes/i }).click();
    return this;
  }

  async expectAddressSaved(): Promise<void> {
    await this.expectToast(/address updated successfully/i, ToastType.Success);
  }

  async updateAccountDetails(details: {
    firstName: string;
    lastName: string;
    phone: string;
  }): Promise<this> {
    const firstName = this.page.locator('#first-name');
    const lastName = this.page.locator('#last-name');
    const phone = this.page.locator('#contact-number');
    await expect(firstName).toBeVisible();
    await firstName.fill(details.firstName);
    await lastName.fill(details.lastName);
    await phone.click();
    await phone.fill('');
    await phone.type(details.phone, { delay: 25 });
    const save = this.page.getByRole('button', { name: /save changes/i });
    await expect(save).toBeEnabled({ timeout: Timeouts.ShortUi });
    await save.click();
    return this;
  }

  async expectAccountDetailsSaved(): Promise<void> {
    await this.expectToast(/profile updated successfully/i, ToastType.Success);
  }

  async getAccountDetails(): Promise<{ firstName: string; lastName: string; phone: string }> {
    return {
      firstName: await this.page.locator('#first-name, input[name="firstName"]').inputValue(),
      lastName: await this.page.locator('#last-name, input[name="lastName"]').inputValue(),
      phone: await this.page.locator('#contact-number, input[name="phoneNumber"]').inputValue(),
    };
  }

  async getAccountPhone(): Promise<string> {
    return this.page.locator('#contact-number, input[name="phoneNumber"]').inputValue();
  }

  async getAddressFields(): Promise<{ addressOne: string; addressTwo: string; city: string }> {
    return {
      addressOne: await this.page.locator('#address-line1, input[name="streetAddress1"]').inputValue(),
      addressTwo: await this.page.locator('#address-line2, input[name="streetAddress2"]').inputValue(),
      city: await this.page.locator('#city, input[name="city"]').inputValue(),
    };
  }

  async getAddressLine2(): Promise<string> {
    return this.page.locator('#address-line2, input[name="streetAddress2"]').inputValue();
  }

  async expectRedirectedToLogin(): Promise<void> {
    await expect(this.page).toHaveURL(/\/login/);
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
