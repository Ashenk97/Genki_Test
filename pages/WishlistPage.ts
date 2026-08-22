import { Locator, Page, expect } from '@playwright/test';
import { AUTH_MESSAGES } from '@constants/messages';
import { Timeouts } from '@constants/timeouts';
import { WISHLIST_PAGE } from '@data/navigation.data';
import { BasePage } from '@pages/BasePage';

export class WishlistPage extends BasePage {
  private readonly drawer: Locator;
  private readonly drawerEmptyMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.drawer = page.locator('.wishlist-overlay');
    this.drawerEmptyMessage = this.drawer.getByText(AUTH_MESSAGES.wishlistEmpty);
  }

  async open(): Promise<this> {
    await this.goto(WISHLIST_PAGE.path);
    return this;
  }

  async expectLoaded(): Promise<void> {
    await this.expectPathname(WISHLIST_PAGE.path);
  }

  async expectHasItems(): Promise<void> {
    await expect(
      this.page
        .getByRole('link', { name: /view product|test product|berserk/i })
        .or(this.page.locator('a[href^="/products/"]'))
        .first(),
    ).toBeVisible();
  }

  async expectDrawerHasItems(): Promise<void> {
    await expect(this.drawer).toHaveClass(/active/);
    await expect(this.drawerEmptyMessage).toHaveCount(0);
    await expect(
      this.drawer
        .getByRole('link')
        .or(this.drawer.locator('.single-wishlist-product'))
        .first(),
    ).toBeVisible();
  }

  async removeFirstItem(): Promise<void> {
    const closeIcon = this.drawer.locator('.wishlist-close-icon button').first();
    await expect(closeIcon).toBeVisible({ timeout: Timeouts.ShortUi });
    await closeIcon.click();
  }

  async expectDrawerEmpty(): Promise<void> {
    await expect(this.drawerEmptyMessage).toBeVisible({ timeout: Timeouts.ShortUi });
  }

  async openFirstProduct(): Promise<void> {
    await this.page.getByRole('link', { name: /view product/i }).first().click();
    await this.waitForPageLoad();
    await this.acceptCookiesIfVisible();
  }

  async clearWishlist(): Promise<void> {
    const clear = this.page.getByRole('button', { name: /clear wishlist/i });
    if (await clear.isVisible().catch(() => false)) {
      await clear.click();
    }
  }

  async removeFirstItemFromPage(): Promise<void> {
    const rowRemove = this.page.locator('table tbody tr td:last-child button').first();
    if (await rowRemove.isVisible().catch(() => false)) {
      await rowRemove.click();
      return;
    }
    await this.clearWishlist();
  }

  async expectEmpty(): Promise<void> {
    await expect(this.page.getByText(AUTH_MESSAGES.wishlistEmpty)).toBeVisible({
      timeout: Timeouts.ShortUi,
    });
  }
}
