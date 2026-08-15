import { Locator, Page, expect } from '@playwright/test';
import { AppRoutes } from '@constants/routes';
import { Timeouts } from '@constants/timeouts';
import { RESET_PASSWORD_PAGE } from '@data/navigation.data';
import { BasePage } from '@pages/BasePage';

export class ResetPasswordPage extends BasePage {
  private readonly heading: Locator;
  private readonly form: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmPasswordInput: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: RESET_PASSWORD_PAGE.heading }).first();
    this.form = page.locator('.genki-form');
    this.passwordInput = this.form.locator('input[name="password"]');
    this.confirmPasswordInput = this.form.locator('input[name="confirmPassword"]');
    this.submitButton = this.form.getByRole('button', { name: /^submit$/i });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(AppRoutes.ResetPassword));
    await expect(this.heading).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.confirmPasswordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async resetPassword(password: string, confirmPassword = password): Promise<this> {
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
    await this.submitButton.click();
    return this;
  }

  async expectRedirectedToLogin(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(AppRoutes.Login), {
      timeout: Timeouts.MediumUi,
    });
  }
}
