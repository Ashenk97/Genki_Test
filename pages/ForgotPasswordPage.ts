import { Locator, Page, expect } from '@playwright/test';
import { AUTH_MESSAGES } from '@constants/messages';
import { Timeouts } from '@constants/timeouts';
import { FORGOT_PASSWORD_PAGE } from '@data/navigation.data';
import { BasePage } from '@pages/BasePage';

export class ForgotPasswordPage extends BasePage {
  private readonly heading: Locator;
  private readonly form: Locator;
  private readonly emailInput: Locator;
  private readonly submitButton: Locator;
  private readonly loginLink: Locator;
  private readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.heading = page.getByRole('heading', { name: FORGOT_PASSWORD_PAGE.heading });
    this.form = page.locator('.genki-form');
    this.emailInput = this.form.locator('input[name="email"]');
    this.submitButton = this.form.getByRole('button', { name: /^submit$/i });
    this.loginLink = this.form.getByRole('link', { name: /login here/i });
    this.successMessage = this.form.getByText(AUTH_MESSAGES.passwordResetSent);
  }

  async open(): Promise<this> {
    await this.goto(FORGOT_PASSWORD_PAGE.path);
    return this;
  }

  async expectLoaded(): Promise<void> {
    await this.expectPathname(FORGOT_PASSWORD_PAGE.path);
    await expect(this.heading).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async submitEmail(email: string): Promise<this> {
    await this.emailInput.fill(email);
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      await this.submitButton.click();
      const sent = await this.successMessage
        .waitFor({ state: 'visible', timeout: 8_000 })
        .then(() => true)
        .catch(() => false);
      if (sent) {
        return this;
      }
      const serverError = await this.page
        .getByText(/failed to send reset password email|internal server error/i)
        .first()
        .isVisible()
        .catch(() => false);
      if (!serverError || attempt === 3) {
        break;
      }
      await this.page.waitForTimeout(2000 * attempt);
    }
    return this;
  }

  async openLogin(): Promise<void> {
    await this.loginLink.click();
  }

  async hasSendFailure(): Promise<boolean> {
    return this.page
      .getByText(/failed to send reset password email|internal server error/i)
      .first()
      .isVisible()
      .catch(() => false);
  }

  async expectResetEmailSent(): Promise<void> {
    await expect(this.successMessage).toBeVisible({ timeout: Timeouts.Assertion });
  }

  async expectEmailRequired(): Promise<void> {
    await this.submitButton.click();
    await expect
      .poll(async () =>
        this.emailInput.evaluate((el: HTMLInputElement) => el.validity.valueMissing),
      )
      .toBe(true);
  }
}
