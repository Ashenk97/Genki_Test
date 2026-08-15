import { Locator, Page, expect } from '@playwright/test';
import { AUTH_MESSAGES, LOGIN_PAGE } from '../fixtures/test-data';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly heading: Locator;
  readonly form: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly rememberMeLabel: Locator;
  readonly forgotPasswordLink: Locator;
  readonly registerLink: Locator;
  readonly formErrorMessage: Locator;
  readonly showPasswordButton: Locator;

  constructor(page: Page) {
    super(page);

    this.heading = page.getByRole('heading', { name: LOGIN_PAGE.heading });
    this.form = page.locator('.login-form');
    this.emailInput = this.form.locator('input[name="email"]');
    this.passwordInput = this.form.locator('input[name="password"]');
    this.submitButton = this.form.getByRole('button', { name: /^submit$/i });
    this.rememberMeCheckbox = this.form.locator('input[type="checkbox"]');
    this.rememberMeLabel = this.form.getByText(/remember me/i);
    this.forgotPasswordLink = this.form.getByRole('link', { name: /lost your password/i });
    this.registerLink = this.form.getByRole('link', { name: /register here/i });
    this.formErrorMessage = this.form.getByText(AUTH_MESSAGES.invalidCredentials);
    this.showPasswordButton = this.form.getByRole('button', { name: /show password|hide password/i });
  }

  async open(): Promise<void> {
    await this.goto(LOGIN_PAGE.path);
    await this.waitForNetworkIdle();
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(
      (url) => url.pathname.replace(/\/$/, '') === LOGIN_PAGE.path,
    );
    await expect(this.heading).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async fillCredentials(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async setRememberMe(checked: boolean): Promise<void> {
    if (checked) {
      await this.rememberMeCheckbox.check();
      return;
    }
    await this.rememberMeCheckbox.uncheck();
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  async login(email: string, password: string, rememberMe = false): Promise<void> {
    await this.fillCredentials(email, password);
    await this.setRememberMe(rememberMe);
    await this.submit();
  }

  async expectValidationMessage(message: string | RegExp): Promise<void> {
    await expect(this.form.getByText(message)).toBeVisible();
  }

  async expectInvalidCredentials(): Promise<void> {
    await this.expectToast(AUTH_MESSAGES.invalidCredentials, 'error');
    await expect(this.formErrorMessage).toBeVisible({ timeout: 15_000 });
    await expect(this.page).toHaveURL((url) => url.pathname.replace(/\/$/, '') === LOGIN_PAGE.path);
    await expect(this.emailInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async expectLoginSuccess(): Promise<void> {
    await this.expectToast(AUTH_MESSAGES.loginSuccessToast, 'success');
    await expect(this.page).toHaveURL((url) => {
      const path = url.pathname.replace(/\/$/, '');
      return path === '' || path === '/';
    }, { timeout: 15_000 });
    await expect(this.page).toHaveTitle(/genki/i);
    await this.acceptCookiesIfVisible();
  }

  async toggleShowPassword(): Promise<void> {
    await expect(this.passwordInput).toHaveAttribute('type', 'password');
    await this.showPasswordButton.click();
    await expect(this.passwordInput).toHaveAttribute('type', 'text');
    await this.form.getByRole('button', { name: /hide password/i }).click();
    await expect(this.passwordInput).toHaveAttribute('type', 'password');
  }
}
