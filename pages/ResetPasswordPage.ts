import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export const RESET_PASSWORD_PAGE = {
  path: '/reset-password',
  heading: /reset password/i,
} as const;

export class ResetPasswordPage extends BasePage {
  readonly heading: Locator;
  readonly form: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly submitButton: Locator;
  readonly loginLink: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: RESET_PASSWORD_PAGE.heading }).first();
    this.form = page.locator('.genki-form');
    this.passwordInput = this.form.locator('input[name="password"]');
    this.confirmPasswordInput = this.form.locator('input[name="confirmPassword"]');
    this.submitButton = this.form.getByRole('button', { name: /^submit$/i });
    this.loginLink = this.form.getByRole('link', { name: /login here/i });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/reset-password/);
    await expect(this.heading).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.confirmPasswordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async resetPassword(password: string, confirmPassword = password): Promise<void> {
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
    await this.submitButton.click();
  }

  async expectRedirectedToLogin(): Promise<void> {
    await expect(this.page).toHaveURL(/\/login/, { timeout: 20_000 });
  }
}
