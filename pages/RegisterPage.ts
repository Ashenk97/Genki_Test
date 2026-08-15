import { Locator, Page, expect } from '@playwright/test';
import { PAGE_HEADINGS } from '@constants/messages';
import { AppRoutes } from '@constants/routes';
import { Timeouts } from '@constants/timeouts';
import { REGISTER_PAGE } from '@data/navigation.data';
import { BasePage } from '@pages/BasePage';

export class RegisterPage extends BasePage {
  private readonly heading: Locator;
  private readonly form: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;
  private readonly loginLink: Locator;
  private readonly confirmationHeading: Locator;

  constructor(page: Page) {
    super(page);

    this.heading = page.getByRole('heading', { name: REGISTER_PAGE.heading });
    this.form = page.locator('.genki-form');
    this.emailInput = this.form.locator('#regEmail, input[name="email"]');
    this.passwordInput = this.form.locator('input[name="password"]');
    this.submitButton = this.form.getByRole('button', { name: /^submit$/i });
    this.loginLink = this.form.getByRole('link', { name: /login here/i });
    this.confirmationHeading = page.getByRole('heading', {
      name: PAGE_HEADINGS.emailConfirmation,
    });
  }

  async open(): Promise<this> {
    await this.goto(REGISTER_PAGE.path);
    return this;
  }

  async expectLoaded(): Promise<void> {
    await this.expectPathname(REGISTER_PAGE.path);
    await expect(this.heading).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async register(email: string, password: string): Promise<this> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    return this;
  }

  async fillEmailOnly(email: string): Promise<this> {
    await this.emailInput.fill(email);
    return this;
  }

  async submitEmpty(): Promise<this> {
    await this.submitButton.click();
    return this;
  }

  async openLogin(): Promise<void> {
    await this.loginLink.click();
  }

  async expectValidationMessage(message: string | RegExp): Promise<void> {
    await expect(this.form.getByText(message).first()).toBeVisible({
      timeout: Timeouts.Assertion,
    });
  }

  async expectEmailConfirmation(email: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(AppRoutes.EmailConfirmation), {
      timeout: Timeouts.MediumUi,
    });
    await expect(this.confirmationHeading).toBeVisible();
    await expect(this.page.getByText(email)).toBeVisible();
    await expect(this.page.getByText(/we have sent an email/i)).toBeVisible();
  }

  async expectEmailRequired(): Promise<void> {
    await this.submitButton.click();
    await expect
      .poll(async () =>
        this.emailInput.evaluate((el: HTMLInputElement) => el.validity.valueMissing),
      )
      .toBe(true);
  }

  async expectAccountConfirmed(): Promise<void> {
    await expect(
      this.page.getByText(/confirm|verif|success|activated|thank you/i).first(),
    ).toBeVisible({ timeout: Timeouts.MediumUi });
  }
}
