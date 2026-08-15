import { Locator, Page, expect } from '@playwright/test';
import { PaymentMethod } from '@constants/payment';
import { Timeouts } from '@constants/timeouts';
import { CHECKOUT_PAGE } from '@data/navigation.data';
import { getGuestBillingDetails } from '@data/checkout.data';
import { BasePage } from '@pages/BasePage';
import { AppRoutes } from '@constants/routes';

export class CheckoutPage extends BasePage {
  private readonly heading: Locator;
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly email: Locator;
  private readonly phone: Locator;
  private readonly addressOne: Locator;
  private readonly addressTwo: Locator;
  private readonly city: Locator;
  private readonly createAccount: Locator;
  private readonly termsLabel: Locator;
  private readonly placeOrderButton: Locator;
  private readonly cardPaymentLabel: Locator;
  private readonly bankPaymentLabel: Locator;
  private readonly codPaymentLabel: Locator;
  private readonly orderSuccessHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: CHECKOUT_PAGE.heading });
    this.firstName = page.locator('#firstName');
    this.lastName = page.locator('#lastName');
    this.email = page.locator('#emailAddress');
    this.phone = page.locator('#phoneNumber');
    this.addressOne = page.locator('#streetAddress1');
    this.addressTwo = page.locator('#streetAddress2');
    this.city = page.locator('#city');
    this.createAccount = page.locator('#createAccount');
    this.termsLabel = page.locator('label').filter({ hasText: /terms & conditions/i });
    this.placeOrderButton = page.getByRole('button', { name: /place order/i });
    this.cardPaymentLabel = page.getByText(/card payments/i);
    this.bankPaymentLabel = page.getByText(/direct bank transfer/i);
    this.codPaymentLabel = page.getByText(/cash on delivery/i);
    this.orderSuccessHeading = page.getByRole('heading', {
      name: /your order has been placed/i,
    });
  }

  async open(): Promise<this> {
    await this.goto(CHECKOUT_PAGE.path);
    return this;
  }

  async expectLoaded(): Promise<void> {
    await this.expectPathname(CHECKOUT_PAGE.path);
    await expect(this.heading).toBeVisible();
    await expect(this.firstName).toBeVisible();
    await expect(this.cardPaymentLabel).toBeVisible();
    await expect(this.bankPaymentLabel).toBeVisible();
    await expect(this.codPaymentLabel).toBeVisible();
    await expect(this.placeOrderButton).toBeVisible();
  }

  async fillGuestBilling(email: string): Promise<this> {
    const checkout = getGuestBillingDetails();
    await this.firstName.fill(checkout.firstName);
    await this.lastName.fill(checkout.lastName);
    await this.email.fill(email);
    await this.phone.fill(checkout.phone);
    await this.addressOne.fill(checkout.addressOne);
    if (await this.addressTwo.isVisible().catch(() => false)) {
      await this.addressTwo.fill(checkout.addressTwo);
    }
    await this.city.fill(checkout.city);
    if (await this.createAccount.isVisible().catch(() => false)) {
      if (await this.createAccount.isChecked()) {
        await this.createAccount.uncheck();
      }
    }
    return this;
  }

  async selectPayment(method: PaymentMethod): Promise<this> {
    if (method === PaymentMethod.Card) {
      await this.cardPaymentLabel.click();
      return this;
    }
    if (method === PaymentMethod.BankTransfer) {
      await this.bankPaymentLabel.click();
      return this;
    }
    await this.codPaymentLabel.click();
    return this;
  }

  async acceptTerms(): Promise<this> {
    await this.termsLabel.click();
    return this;
  }

  async placeOrder(): Promise<this> {
    await this.placeOrderButton.click();
    return this;
  }

  async expectPlaceOrderDisabled(): Promise<void> {
    await expect(this.placeOrderButton).toBeDisabled();
  }

  async expectStillOnCheckout(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(AppRoutes.Checkout));
  }

  async expectNotOnOrderSuccess(): Promise<void> {
    await expect(this.page).not.toHaveURL(new RegExp(AppRoutes.OrderSuccess));
  }

  async expectOrderSuccess(paymentType: PaymentMethod): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(CHECKOUT_PAGE.successPath), {
      timeout: Timeouts.OrderSuccess,
    });
    await expect(this.page).toHaveURL(new RegExp(`paymentType=${paymentType}`));
    await expect(this.orderSuccessHeading).toBeVisible();
    await expect(this.page.getByText('Order ID', { exact: true })).toBeVisible();
  }

  async expectCardPaymentReceived(): Promise<void> {
    await this.expectOrderSuccess(PaymentMethod.Card);
    await expect(
      this.page.getByText(/payment received|payment was successful/i).first(),
    ).toBeVisible();
  }

  async expectBankTransferInstructions(): Promise<void> {
    await expect(this.page.getByText(/awaiting bank transfer/i)).toBeVisible();
    await expect(this.page.getByText(/commercial bank/i)).toBeVisible();
  }

  async expectCodInstructions(): Promise<void> {
    await expect(this.page.getByText(/cash on delivery/i)).toBeVisible();
  }
}
