import { Locator, Page, expect } from '@playwright/test';
import { AppRoutes } from '@constants/routes';
import { Timeouts } from '@constants/timeouts';
import { ToastType } from '@constants/payment';
import { normalizePathname } from '@helpers/string';

export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
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

  async goto(path: string = AppRoutes.Home): Promise<this> {
    await this.page.goto(path);
    await this.waitForPageLoad();
    await this.acceptCookiesIfVisible();
    return this;
  }

  async expectTitle(title: string | RegExp): Promise<void> {
    await expect(this.page).toHaveTitle(title);
  }

  async expectToast(
    message: string | RegExp,
    type?: ToastType,
  ): Promise<void> {
    const toastRoot = type
      ? this.page.locator(`[data-sonner-toast].toast-${type}`)
      : this.page.locator('[data-sonner-toast]');
    await expect(toastRoot.filter({ hasText: message }).first()).toBeVisible({
      timeout: Timeouts.Toast,
    });
  }

  async expectNoHorizontalOverflow(): Promise<void> {
    const extra = await this.page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(extra, 'page should not scroll horizontally').toBeLessThanOrEqual(2);
  }

  async expectPathname(path: string): Promise<void> {
    const normalized = normalizePathname(path);
    await expect(this.page).toHaveURL((url) => normalizePathname(url.pathname) === normalized);
  }

  async openExternalUrl(url: string): Promise<this> {
    await this.page.goto(url);
    await this.waitForPageLoad();
    await this.acceptCookiesIfVisible();
    return this;
  }

  protected get mainContent(): Locator {
    return this.page.getByRole('main');
  }
}
