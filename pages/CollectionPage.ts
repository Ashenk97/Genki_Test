import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ProductDetailsPage } from './ProductDetailsPage';

export class CollectionPage extends BasePage {
  readonly heading: Locator;
  readonly productLinks: Locator;
  readonly filterControls: Locator;
  readonly sortControls: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { level: 1 }).first();
    this.productLinks = page.locator('a[href^="/products/"]:not([href*="undefined"])');
    this.filterControls = page.getByRole('button', { name: /filter|sort/i })
      .or(page.getByLabel(/filter|sort/i))
      .or(page.locator('select').filter({ hasText: /sort|filter/i }));
    this.sortControls = page.getByRole('combobox', { name: /sort/i });
  }

  async open(path: string): Promise<void> {
    await this.goto(path);
    await this.waitForNetworkIdle();
  }

  async expectLoaded(path: string, heading: string | RegExp): Promise<void> {
    const normalized = path.replace(/\/$/, '');
    await expect(this.page).toHaveURL((url) => url.pathname.replace(/\/$/, '') === normalized);
    await expect(this.heading).toBeVisible();
    await expect(this.heading).toHaveText(heading);
  }

  async expectHasProducts(): Promise<void> {
    await expect(this.productLinks.first()).toBeVisible();
    await expect(this.productLinks).not.toHaveCount(0);
  }

  async openFirstProduct(): Promise<ProductDetailsPage> {
    await this.productLinks.first().click();
    await this.waitForPageLoad();
    await this.acceptCookiesIfVisible();
    return new ProductDetailsPage(this.page);
  }
}
