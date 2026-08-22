import { Locator, Page, expect } from '@playwright/test';
import { AUTH_MESSAGES } from '@constants/messages';
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
  private readonly createAccountLabel: Locator;
  private readonly accountPassword: Locator;
  private readonly termsLabel: Locator;
  private readonly placeOrderButton: Locator;
  private readonly cardPaymentInput: Locator;
  private readonly bankPaymentInput: Locator;
  private readonly codPaymentInput: Locator;
  private readonly cardPaymentLabel: Locator;
  private readonly bankPaymentLabel: Locator;
  private readonly codPaymentLabel: Locator;
  private readonly orderSuccessHeading: Locator;
  private readonly emptyCheckoutMessage: Locator;
  private readonly shopNowLink: Locator;
  private readonly selectedRewards: Locator;
  private readonly sameAddressLabel: Locator;
  private readonly giftCheckbox: Locator;
  private readonly giftLabel: Locator;
  private readonly orderNotes: Locator;
  private readonly giftMessage: Locator;

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
    this.createAccountLabel = page.locator('label[for="createAccount"]');
    this.accountPassword = page.locator('input[name="userPassword"]').or(
      page.locator('input[name="password"]'),
    );
    this.termsLabel = page.locator('label').filter({ hasText: /terms & conditions/i });
    this.placeOrderButton = page.getByRole('button', { name: /place order/i });
    this.cardPaymentInput = page.locator('#payment_check');
    this.bankPaymentInput = page.locator('#payment_bank');
    this.codPaymentInput = page.locator('#payment_cash');
    this.cardPaymentLabel = page.locator('label[for="payment_check"]');
    this.bankPaymentLabel = page.locator('label[for="payment_bank"]');
    this.codPaymentLabel = page.locator('label[for="payment_cash"]');
    this.orderSuccessHeading = page.getByRole('heading', {
      name: /your order has been placed/i,
    });
    this.emptyCheckoutMessage = page.getByText(AUTH_MESSAGES.emptyCheckout);
    this.shopNowLink = page.getByRole('link', { name: /shop now/i });
    this.selectedRewards = page.getByText(AUTH_MESSAGES.selectedRewards);
    this.sameAddressLabel = page.locator('label[for="sameAddress"]').or(
      page.locator('label').filter({ hasText: /shipping address is the same/i }),
    );
    this.giftCheckbox = page.locator('#isGift');
    this.giftLabel = page.locator('label[for="isGift"]').or(
      page.locator('label').filter({ hasText: /this order is a gift/i }),
    );
    this.orderNotes = page.locator('#orderNotes');
    this.giftMessage = page.locator('#giftMessage');
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

  async expectEmptyCheckout(): Promise<void> {
    await this.expectPathname(CHECKOUT_PAGE.path);
    await expect(this.emptyCheckoutMessage).toBeVisible();
    await expect(this.shopNowLink).toBeVisible();
    await expect(this.placeOrderButton).toHaveCount(0);
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
    if (await this.createAccountLabel.isVisible().catch(() => false)) {
      if (await this.createAccount.isChecked()) {
        await this.createAccountLabel.click();
      }
    }
    return this;
  }

  async fillLoggedInBilling(): Promise<this> {
    const checkout = getGuestBillingDetails();
    if (!(await this.firstName.inputValue()).trim()) {
      await this.firstName.fill(checkout.firstName);
    }
    if (!(await this.lastName.inputValue()).trim()) {
      await this.lastName.fill(checkout.lastName);
    }
    if (!(await this.phone.inputValue()).trim()) {
      await this.phone.fill(checkout.phone);
    }
    if (!(await this.addressOne.inputValue()).trim()) {
      await this.addressOne.fill(checkout.addressOne);
    }
    if (
      (await this.addressTwo.isVisible().catch(() => false)) &&
      !(await this.addressTwo.inputValue()).trim()
    ) {
      await this.addressTwo.fill(checkout.addressTwo);
    }
    if (!(await this.city.inputValue()).trim()) {
      await this.city.fill(checkout.city);
    }
    return this;
  }

  async enableCreateAccount(password: string): Promise<this> {
    await expect(this.createAccountLabel).toBeVisible();
    if (!(await this.createAccount.isChecked())) {
      await this.createAccountLabel.click();
    }
    await expect(this.accountPassword).toBeVisible();
    await this.accountPassword.fill(password);
    return this;
  }

  async expectCreateAccountPasswordVisible(): Promise<void> {
    await expect(this.accountPassword).toBeVisible();
    await expect(this.page.getByText(AUTH_MESSAGES.passwordLength)).toBeVisible();
  }

  async selectPayment(method: PaymentMethod): Promise<this> {
    if (method === PaymentMethod.Card) {
      await expect(this.cardPaymentInput).toBeEnabled();
      await this.cardPaymentLabel.click();
      await expect(this.cardPaymentInput).toBeChecked();
      return this;
    }
    if (method === PaymentMethod.BankTransfer) {
      await expect(this.bankPaymentInput).toBeEnabled();
      await this.bankPaymentLabel.click();
      await expect(this.bankPaymentInput).toBeChecked();
      return this;
    }
    await expect(this.codPaymentInput).toBeEnabled();
    await this.codPaymentLabel.click();
    await expect(this.codPaymentInput).toBeChecked();
    return this;
  }

  async expectPaymentSelected(method: PaymentMethod): Promise<void> {
    if (method === PaymentMethod.Card) {
      await expect(this.cardPaymentInput).toBeChecked();
      return;
    }
    if (method === PaymentMethod.BankTransfer) {
      await expect(this.bankPaymentInput).toBeChecked();
      return;
    }
    await expect(this.codPaymentInput).toBeChecked();
  }

  async expectNoPaymentSelected(): Promise<void> {
    await expect(this.cardPaymentInput).not.toBeChecked();
    await expect(this.bankPaymentInput).not.toBeChecked();
    await expect(this.codPaymentInput).not.toBeChecked();
  }

  async expectCodPaymentDisabledForGift(): Promise<void> {
    await expect(this.codPaymentInput).toBeDisabled();
    await expect(this.codPaymentLabel).toHaveClass(/disabled/);
    await expect(this.codPaymentLabel).toContainText(/not available for gift orders/i);
  }

  async expectCodPaymentEnabled(): Promise<void> {
    await expect(this.codPaymentInput).toBeEnabled();
    await expect(this.codPaymentLabel).not.toHaveClass(/disabled/);
    await expect(this.codPaymentLabel).toHaveText(/^cash on delivery$/i);
  }

  async expectCardAndBankPaymentsAvailable(): Promise<void> {
    await expect(this.cardPaymentInput).toBeEnabled();
    await expect(this.bankPaymentInput).toBeEnabled();
    await expect(this.cardPaymentLabel).toBeVisible();
    await expect(this.bankPaymentLabel).toBeVisible();
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

  async getOrderId(): Promise<string> {
    const orderIdText = this.page.getByText(/GK-\d+/).first();
    await expect(orderIdText).toBeVisible({ timeout: Timeouts.OrderSuccess });
    const text = (await orderIdText.innerText()).trim();
    const match = text.match(/GK-\d+/);
    if (!match) {
      throw new Error(`Could not parse order id from: ${text}`);
    }
    return match[0];
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

  async expectSelectedRewardsVisible(): Promise<void> {
    await expect(this.selectedRewards).toBeVisible();
    await expect(
      this.page.getByText(/anime sticker|sticker pack|keytag|total points to redeem/i).first(),
    ).toBeVisible();
  }

  async hasUnpublishedProductError(): Promise<boolean> {
    return this.page.getByText(/not available or not published/i).isVisible().catch(() => false);
  }

  async canPlaceOrder(): Promise<boolean> {
    return this.placeOrderButton.isEnabled();
  }

  async waitUntilPlaceableOrBlocked(): Promise<'placeable' | 'blocked'> {
    const unpublished = this.page.getByText(/not available or not published/i);
    const blocked = await unpublished
      .waitFor({ state: 'visible', timeout: 5_000 })
      .then(() => true)
      .catch(() => false);
    if (blocked) {
      return 'blocked';
    }
    return (await this.canPlaceOrder()) ? 'placeable' : 'blocked';
  }

  async reachedOrderSuccess(timeout = Timeouts.MediumUi): Promise<boolean> {
    return this.page
      .waitForURL(new RegExp(CHECKOUT_PAGE.successPath), { timeout })
      .then(() => true)
      .catch(() => false);
  }

  async useSeparateShippingAddress(): Promise<this> {
    const checkbox = this.page.locator('#sameAddress');
    if (await checkbox.isChecked()) {
      await this.sameAddressLabel.click();
    }
    await expect(this.page.locator('#shippingFirstName')).toBeVisible();
    return this;
  }

  async fillShippingAddress(details?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    addressOne?: string;
    addressTwo?: string;
    city?: string;
  }): Promise<this> {
    const checkout = getGuestBillingDetails();
    await this.page.locator('#shippingFirstName').fill(details?.firstName ?? 'Ship');
    await this.page.locator('#shippingLastName').fill(details?.lastName ?? 'To');
    await this.page
      .locator('#shippingEmailAddress')
      .fill(details?.email ?? `ship-${Date.now()}@mailinator.com`);
    await this.page.locator('#shippingPhoneNumber').fill(details?.phone ?? checkout.phone);
    await this.page
      .locator('#shippingStreetAddress1')
      .fill(details?.addressOne ?? '456 Shipping Lane');
    await this.page
      .locator('#shippingStreetAddress2')
      .fill(details?.addressTwo ?? checkout.addressTwo);
    await this.page.locator('#shippingCity').fill(details?.city ?? checkout.city);
    return this;
  }

  async fillOrderNotes(notes: string): Promise<this> {
    await this.orderNotes.fill(notes);
    return this;
  }

  async enableGift(message?: string): Promise<this> {
    if (!(await this.giftCheckbox.isChecked())) {
      await this.giftLabel.click();
    }
    await expect(this.giftCheckbox).toBeChecked();
    await expect(this.giftMessage).toBeVisible();
    if (message !== undefined) {
      await this.giftMessage.fill(message);
    }
    return this;
  }

  async disableGift(): Promise<this> {
    if (await this.giftCheckbox.isChecked()) {
      await this.giftLabel.click();
    }
    await expect(this.giftCheckbox).not.toBeChecked();
    await expect(this.giftMessage).toBeHidden();
    return this;
  }

  async expectGiftMessageVisible(): Promise<void> {
    await expect(this.giftMessage).toBeVisible();
    await expect(this.page.getByText(/gift message \(optional\)/i)).toBeVisible();
  }

  async expectGiftMessageMaxLength(maxLength = 300): Promise<void> {
    await expect(this.giftMessage).toHaveAttribute('maxlength', String(maxLength));
  }

  async fillGiftMessage(message: string): Promise<this> {
    await expect(this.giftMessage).toBeVisible();
    await this.giftMessage.fill(message);
    return this;
  }

  async expectGiftMessageValue(expected: string): Promise<void> {
    await expect(this.giftMessage).toHaveValue(expected);
  }

  async expectFreeDeliveryRemaining(): Promise<void> {
    await expect(this.page.locator('.free-shipping-progress__message').first()).toHaveText(
      /you're\s+lkr\s*1,?510\s+away from free delivery/i,
    );
  }

  async expectFreeDeliveryUnlocked(): Promise<void> {
    await expect(this.page.locator('.free-shipping-progress__message').first()).toHaveText(
      /free delivery unlocked on this order/i,
    );
  }

  async expectOrderSubtotal(amount: number): Promise<void> {
    await expect(
      this.page.getByText(new RegExp(`lkr\\s*${amount}(?:\\.00)?`, 'i')).filter({ visible: true }).first(),
    ).toBeVisible();
  }

  async expectPlaceOrderEnabled(): Promise<void> {
    await expect(this.placeOrderButton).toBeEnabled();
  }

  async expectInvalidEmailValidation(): Promise<void> {
    await expect(
      this.page.getByText(/valid email|email address/i).first(),
    ).toBeVisible();
  }
}
