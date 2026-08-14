import { Locator, Page, expect } from '@playwright/test';

/**
 * Base page object shared by all page classes.
 * Encapsulates common navigation helpers and cross-cutting UI concerns.
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Wait until the network has been idle for a short period. */
  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /** Wait for the primary document to finish loading. */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Dismiss the cookie consent banner when present.
   * Safe to call on every navigation — no-op if the banner is absent.
   */
  async acceptCookiesIfVisible(): Promise<void> {
    const acceptButton = this.page.getByRole('button', { name: /^accept$/i });
    if (await acceptButton.isVisible().catch(() => false)) {
      await acceptButton.click();
    }
  }

  /** Navigate to a relative path using the configured baseURL. */
  async goto(path = '/'): Promise<void> {
    await this.page.goto(path);
    await this.waitForPageLoad();
    await this.acceptCookiesIfVisible();
  }

  /** Assert the browser tab title matches the expected value (string or pattern). */
  async expectTitle(title: string | RegExp): Promise<void> {
    await expect(this.page).toHaveTitle(title);
  }

  /** Return a locator scoped to the main landmark region. */
  protected get mainContent(): Locator {
    return this.page.getByRole('main');
  }
}
