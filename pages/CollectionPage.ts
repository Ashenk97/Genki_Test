import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '@pages/BasePage';
import { ProductDetailsPage } from '@pages/ProductDetailsPage';
import { normalizePathname } from '@helpers/string';

export class CollectionPage extends BasePage {
  private readonly heading: Locator;
  private readonly productLinks: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { level: 1 }).first();
    this.productLinks = page.locator('a[href^="/products/"]:not([href*="undefined"])');
  }

  async open(path: string): Promise<this> {
    await this.goto(path);
    return this;
  }

  async expectLoaded(path: string, heading: string | RegExp): Promise<void> {
    const normalized = normalizePathname(path);
    await expect(this.page).toHaveURL(
      (url) => normalizePathname(url.pathname) === normalized,
    );
    await expect(this.heading).toBeVisible();
    await expect(this.heading).toHaveText(heading);
  }

  async expectHasProducts(): Promise<void> {
    await expect(this.productLinks.first()).toBeVisible();
    await expect(this.productLinks).not.toHaveCount(0);
  }

  sortAndFilterControls(): Locator {
    return this.page
      .locator('select')
      .filter({ visible: true })
      .or(this.page.getByRole('combobox'))
      .or(this.page.getByRole('button', { name: /^(filter|sort|sort by)/i }))
      .or(this.page.getByLabel(/sort by|filter/i));
  }

  async expectSortOrFilterIfPresent(): Promise<void> {
    const controls = this.sortAndFilterControls();
    if ((await controls.count()) === 0) {
      await this.expectHasProducts();
      return;
    }
    const first = controls.first();
    await expect(first).toBeVisible();
    const tag = await first.evaluate((el) => el.tagName.toLowerCase());
    if (tag === 'select') {
      const options = first.locator('option');
      if ((await options.count()) > 1) {
        await first.selectOption({ index: 1 });
      }
    } else {
      await first.click();
    }
    await this.waitForPageLoad();
    await this.expectHasProducts();
  }

  async expectEmptyCollection(): Promise<void> {
    await expect(this.page.getByText(/no products found/i)).toBeVisible();
  }

  async openFirstProduct(): Promise<ProductDetailsPage> {
    await this.productLinks.first().click();
    await this.waitForPageLoad();
    await this.acceptCookiesIfVisible();
    return new ProductDetailsPage(this.page);
  }
}
