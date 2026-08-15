import { Locator, Page, expect } from '@playwright/test';
import { WISHLIST_PAGE } from '../fixtures/test-data';
import { BasePage } from './BasePage';

export class WishlistPage extends BasePage {
  readonly heading: Locator;
  readonly drawer: Locator;
  readonly drawerEmptyMessage: Locator;
  readonly pageEmptyMessage: Locator;
  readonly productLinks: Locator;
  readonly removeButtons: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: WISHLIST_PAGE.heading });
    this.drawer = page.locator('.wishlist-overlay');
    this.drawerEmptyMessage = this.drawer.getByText(/your wishlist is empty/i);
    this.pageEmptyMessage = page.getByText(/wishlist is empty|no items|no products/i);
    this.productLinks = page.locator(
      'a[href*="/products/"]:not([href*="undefined"]), a[href*="product-basic"]:not([href*="undefined"])',
    );
    this.removeButtons = page
      .locator('.wishlist-overlay button, table tbody tr td:last-child button, [class*="wishlist"] button')
      .filter({ hasNotText: /open wishlist/i });
  }

  async open(): Promise<void> {
    await this.goto(WISHLIST_PAGE.path);
    await this.waitForNetworkIdle();
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(
      (url) => url.pathname.replace(/\/$/, '') === WISHLIST_PAGE.path,
    );
  }

  async expectHasItems(): Promise<void> {
    await expect(this.page.getByRole('link', { name: /view product|berserk/i }).first()).toBeVisible();
  }

  async expectDrawerHasItems(): Promise<void> {
    await expect(this.drawer).toHaveClass(/active/);
    await expect(this.drawerEmptyMessage).toHaveCount(0);
    await expect(
      this.drawer.locator('.single-wishlist-product, a[href*="product"]').first(),
    ).toBeVisible();
  }

  async removeFirstItem(): Promise<void> {
    const closeIcon = this.drawer.locator('.wishlist-close-icon button').first();
    await expect(closeIcon).toBeVisible({ timeout: 10_000 });
    await closeIcon.click();
    await this.page.waitForTimeout(500);
  }
}
