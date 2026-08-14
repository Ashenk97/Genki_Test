import { Locator, Page, expect } from '@playwright/test';
import { FORGOT_PASSWORD_PAGE, AUTH_MESSAGES } from '../fixtures/test-data';
import { BasePage } from './BasePage';

/**
 * Forgot-password page opened from "Lost your password?" on login.
 */
export class ForgotPasswordPage extends BasePage {
  readonly heading: Locator;
  readonly form: Locator;
  readonly emailInput: Locator;
  readonly submitButton: Locator;
  readonly loginLink: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.heading = page.getByRole('heading', { name: FORGOT_PASSWORD_PAGE.heading });
    this.form = page.locator('.genki-form');
    this.emailInput = this.form.locator('input[name="email"]');
    this.submitButton = this.form.getByRole('button', { name: /^submit$/i });
    this.loginLink = this.form.getByRole('link', { name: /login here/i });
    this.successMessage = this.form.getByText(AUTH_MESSAGES.passwordResetSent);
  }

  async open(): Promise<void> {
    await this.goto(FORGOT_PASSWORD_PAGE.path);
    await this.waitForNetworkIdle();
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(
      (url) => url.pathname.replace(/\/$/, '') === FORGOT_PASSWORD_PAGE.path,
    );
    await expect(this.heading).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async submitEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.submitButton.click();
  }

  async expectResetEmailSent(): Promise<void> {
    await expect(this.successMessage).toBeVisible({ timeout: 15_000 });
  }

  async expectEmailRequired(): Promise<void> {
    await this.submitButton.click();
    await expect
      .poll(async () => this.emailInput.evaluate((el: HTMLInputElement) => el.validity.valueMissing))
      .toBe(true);
  }
}
