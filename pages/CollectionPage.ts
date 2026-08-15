import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CollectionPage extends BasePage {
  readonly heading: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { level: 1 }).first();
  }

  async expectLoaded(path: string, heading: string | RegExp): Promise<void> {
    const normalized = path.replace(/\/$/, '');
    await expect(this.page).toHaveURL((url) => url.pathname.replace(/\/$/, '') === normalized);
    await expect(this.heading).toBeVisible();
    await expect(this.heading).toHaveText(heading);
  }

  async expectHasProducts(): Promise<void> {
    const products = this.page.locator('a[href^="/products/"]:not([href*="undefined"])');
    await expect(products.first()).toBeVisible();
    await expect(products).not.toHaveCount(0);
  }
}
