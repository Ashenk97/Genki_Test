import { Locator, Page, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async acceptCookiesIfVisible(): Promise<void> {
    const acceptButton = this.page.getByRole('button', { name: /^accept$/i });
    if (await acceptButton.isVisible().catch(() => false)) {
      await acceptButton.click();
    }
  }

  async goto(path = '/'): Promise<void> {
    await this.page.goto(path);
    await this.waitForPageLoad();
    await this.acceptCookiesIfVisible();
  }

  async expectTitle(title: string | RegExp): Promise<void> {
    await expect(this.page).toHaveTitle(title);
  }

  async expectToast(
    message: string | RegExp,
    type?: 'success' | 'error',
  ): Promise<void> {
    const toastRoot = type
      ? this.page.locator(`[data-sonner-toast].toast-${type}`)
      : this.page.locator('[data-sonner-toast]');
    await expect(toastRoot.filter({ hasText: message }).first()).toBeVisible({
      timeout: 15_000,
    });
  }

  protected get mainContent(): Locator {
    return this.page.getByRole('main');
  }
}
