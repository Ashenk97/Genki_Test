import { Locator, Page, expect } from '@playwright/test';
import { CHECKOUT_PAGE, TEST_DATA } from '../fixtures/test-data';
import { BasePage } from './BasePage';

export type PaymentMethod = 'Card' | 'BankTransfer' | 'COD';

export class CheckoutPage extends BasePage {
  readonly heading: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly phone: Locator;
  readonly addressOne: Locator;
  readonly addressTwo: Locator;
  readonly city: Locator;
  readonly createAccount: Locator;
  readonly sameAddress: Locator;
  readonly termsLabel: Locator;
  readonly placeOrderButton: Locator;
  readonly cardPaymentLabel: Locator;
  readonly bankPaymentLabel: Locator;
  readonly codPaymentLabel: Locator;
  readonly orderSuccessHeading: Locator;

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
    this.sameAddress = page.locator('#sameAddress');
    this.termsLabel = page.locator('label').filter({ hasText: /terms & conditions/i });
    this.placeOrderButton = page.getByRole('button', { name: /place order/i });
    this.cardPaymentLabel = page.getByText(/card payments/i);
    this.bankPaymentLabel = page.getByText(/direct bank transfer/i);
    this.codPaymentLabel = page.getByText(/cash on delivery/i);
    this.orderSuccessHeading = page.getByRole('heading', {
      name: /your order has been placed/i,
    });
  }

  async open(): Promise<void> {
    await this.goto(CHECKOUT_PAGE.path);
    await this.waitForNetworkIdle();
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(
      (url) => url.pathname.replace(/\/$/, '') === CHECKOUT_PAGE.path,
    );
    await expect(this.heading).toBeVisible();
    await expect(this.firstName).toBeVisible();
    await expect(this.cardPaymentLabel).toBeVisible();
    await expect(this.bankPaymentLabel).toBeVisible();
    await expect(this.codPaymentLabel).toBeVisible();
    await expect(this.placeOrderButton).toBeVisible();
  }

  async fillGuestBilling(email: string): Promise<void> {
    const { checkout } = TEST_DATA;
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
  }

  async selectPayment(method: PaymentMethod): Promise<void> {
    if (method === 'Card') {
      await this.cardPaymentLabel.click();
      return;
    }
    if (method === 'BankTransfer') {
      await this.bankPaymentLabel.click();
      return;
    }
    await this.codPaymentLabel.click();
  }

  async acceptTerms(): Promise<void> {
    await this.termsLabel.click();
  }

  async placeOrder(): Promise<void> {
    await this.placeOrderButton.click();
  }

  async expectOrderSuccess(paymentType: PaymentMethod): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${CHECKOUT_PAGE.successPath}`), {
      timeout: 45_000,
    });
    await expect(this.page).toHaveURL(new RegExp(`paymentType=${paymentType}`));
    await expect(this.orderSuccessHeading).toBeVisible();
    await expect(this.page.getByText('Order ID', { exact: true })).toBeVisible();
  }

  async expectCardPaymentReceived(): Promise<void> {
    await this.expectOrderSuccess('Card');
    await expect(this.page.getByText(/payment received|payment was successful/i).first()).toBeVisible();
  }

  async expectBankTransferInstructions(): Promise<void> {
    await expect(this.page.getByText(/awaiting bank transfer/i)).toBeVisible();
    await expect(this.page.getByText(/commercial bank/i)).toBeVisible();
  }

  async expectCodInstructions(): Promise<void> {
    await expect(this.page.getByText(/cash on delivery/i)).toBeVisible();
  }
}
