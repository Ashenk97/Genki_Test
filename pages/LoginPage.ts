import { Locator, Page, expect } from '@playwright/test';
import { AUTH_MESSAGES, PAGE_HEADINGS } from '@constants/messages';
import { ToastType } from '@constants/payment';
import { Timeouts } from '@constants/timeouts';
import { LOGIN_PAGE } from '@data/navigation.data';
import { BasePage } from '@pages/BasePage';

export class LoginPage extends BasePage {
  private readonly heading: Locator;
  private readonly form: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;
  private readonly rememberMeCheckbox: Locator;
  private readonly rememberMeLabel: Locator;
  private readonly forgotPasswordLink: Locator;
  private readonly registerLink: Locator;
  private readonly formErrorMessage: Locator;
  private readonly showPasswordButton: Locator;

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
    this.showPasswordButton = this.form.getByRole('button', {
      name: /show password|hide password/i,
    });
  }

  async open(): Promise<this> {
    await this.goto(LOGIN_PAGE.path);
    return this;
  }

  async expectLoaded(): Promise<void> {
    await this.expectPathname(LOGIN_PAGE.path);
    await expect(this.heading).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async fillCredentials(email: string, password: string): Promise<this> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    return this;
  }

  async fillEmailOnly(email: string): Promise<this> {
    await this.emailInput.fill(email);
    return this;
  }

  async fillPasswordOnly(password: string): Promise<this> {
    await this.passwordInput.fill(password);
    return this;
  }

  async setRememberMe(checked: boolean): Promise<this> {
    if (checked) {
      await this.rememberMeCheckbox.check();
    } else {
      await this.rememberMeCheckbox.uncheck();
    }
    return this;
  }

  async expectRememberMeVisibleAndUnchecked(): Promise<void> {
    await expect(this.rememberMeLabel).toBeVisible();
    await expect(this.rememberMeCheckbox).not.toBeChecked();
  }

  async expectRememberMeChecked(): Promise<void> {
    await expect(this.rememberMeCheckbox).toBeChecked();
  }

  async expectRememberMeUnchecked(): Promise<void> {
    await expect(this.rememberMeCheckbox).not.toBeChecked();
  }

  async submit(): Promise<this> {
    await this.submitButton.click();
    return this;
  }

  async login(email: string, password: string, rememberMe = false): Promise<this> {
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      if (!/\/login/.test(this.page.url())) {
        await this.open();
      }
      await this.fillCredentials(email, password);
      await this.setRememberMe(rememberMe);
      await this.submit();

      const loggedIn = await this.loggedInLocator()
        .first()
        .waitFor({ state: 'visible', timeout: 8_000 })
        .then(() => true)
        .catch(() => false);
      if (loggedIn) {
        return this;
      }
      if (attempt < 3) {
        await this.page.waitForTimeout(4000 * attempt);
      }
    }
    throw new Error('Login did not succeed after retries');
  }

  private loggedInLocator(): Locator {
    return this.page
      .getByRole('button', { name: /^logout$/i })
      .or(this.page.getByRole('link', { name: /signed in as/i }));
  }

  async expectLoginSuccess(): Promise<void> {
    await expect(this.loggedInLocator().first()).toBeVisible({ timeout: Timeouts.Toast });
    await expect(this.page).toHaveURL((url) => {
      const path = url.pathname.replace(/\/$/, '');
      return path === '' || path === '/';
    }, { timeout: Timeouts.Assertion });
    await expect(this.page).toHaveTitle(PAGE_HEADINGS.siteTitle);
    await this.acceptCookiesIfVisible();
  }

  async openForgotPassword(): Promise<void> {
    await this.forgotPasswordLink.click();
  }

  async openRegister(): Promise<void> {
    await this.registerLink.click();
  }

  async expectValidationMessage(message: string | RegExp): Promise<void> {
    await expect(this.form.getByText(message)).toBeVisible();
  }

  async expectInvalidCredentials(): Promise<void> {
    await this.expectToast(AUTH_MESSAGES.invalidCredentials, ToastType.Error);
    await expect(this.formErrorMessage).toBeVisible({ timeout: Timeouts.Assertion });
    await this.expectPathname(LOGIN_PAGE.path);
    await expect(this.emailInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async toggleShowPassword(): Promise<void> {
    await expect(this.passwordInput).toHaveAttribute('type', 'password');
    await this.showPasswordButton.click();
    await expect(this.passwordInput).toHaveAttribute('type', 'text');
    await this.form.getByRole('button', { name: /hide password/i }).click();
    await expect(this.passwordInput).toHaveAttribute('type', 'password');
  }
}
