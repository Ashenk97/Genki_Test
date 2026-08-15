import { Locator, Page, expect } from '@playwright/test';
import { REGISTER_PAGE } from '../fixtures/test-data';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {
  readonly heading: Locator;
  readonly form: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly loginLink: Locator;
  readonly confirmationHeading: Locator;

  constructor(page: Page) {
    super(page);

    this.heading = page.getByRole('heading', { name: REGISTER_PAGE.heading });
    this.form = page.locator('.genki-form');
    this.emailInput = this.form.locator('#regEmail, input[name="email"]');
    this.passwordInput = this.form.locator('input[name="password"]');
    this.submitButton = this.form.getByRole('button', { name: /^submit$/i });
    this.loginLink = this.form.getByRole('link', { name: /login here/i });
    this.confirmationHeading = page.getByRole('heading', { name: /email confirmation/i });
  }

  async open(): Promise<void> {
    await this.goto(REGISTER_PAGE.path);
    await this.waitForNetworkIdle();
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(
      (url) => url.pathname.replace(/\/$/, '') === REGISTER_PAGE.path,
    );
    await expect(this.heading).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async register(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async expectValidationMessage(message: string | RegExp): Promise<void> {
    await expect(this.form.getByText(message).first()).toBeVisible({ timeout: 15_000 });
  }

  async expectEmailConfirmation(email: string): Promise<void> {
    await expect(this.page).toHaveURL(/\/email-confirmation/, { timeout: 20_000 });
    await expect(this.confirmationHeading).toBeVisible();
    await expect(this.page.getByText(email)).toBeVisible();
    await expect(this.page.getByText(/we have sent an email/i)).toBeVisible();
  }

  async expectEmailRequired(): Promise<void> {
    await this.submitButton.click();
    await expect
      .poll(async () => this.emailInput.evaluate((el: HTMLInputElement) => el.validity.valueMissing))
      .toBe(true);
  }
}
