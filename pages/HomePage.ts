import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Header } from './Header';
import { ProductDetailsPage } from './ProductDetailsPage';

export class HomePage extends BasePage {
  readonly header: Header;

  readonly heroBanner: Locator;
  readonly heroHeading: Locator;
  readonly featuredSectionHeading: Locator;

  readonly navHome: Locator;
  readonly navShop: Locator;
  readonly navCollections: Locator;

  readonly searchInput: Locator;

  readonly firstProductLink: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);

    this.heroBanner = page.locator('[class*="hero"], [class*="banner"], .swiper, .slider').first();
    this.heroHeading = page.getByRole('heading', { level: 1 }).first();
    this.featuredSectionHeading = page.getByRole('heading', {
      name: /cultural threads for every mood/i,
    });

    this.navHome = this.header.logoLink;
    this.navShop = this.header.navMen;
    this.navCollections = this.header.navCollections;

    this.searchInput = page.getByRole('searchbox', { name: /search products/i });

    this.firstProductLink = page.locator('a[href^="/products/"]:not([href*="undefined"])').first();
  }

  async open(): Promise<void> {
    await this.goto('/');
    await this.waitForNetworkIdle();
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL((url) => {
      const path = url.pathname.replace(/\/$/, '');
      return path === '' || path === '/';
    });
    await expect(this.page).toHaveTitle(/genki/i);
    await expect(this.featuredSectionHeading).toBeVisible();
  }

  async clickNavHome(): Promise<void> {
    await this.navHome.click();
    await this.waitForPageLoad();
  }

  async clickNavShop(): Promise<void> {
    await this.navShop.click();
    await this.waitForPageLoad();
  }

  async clickNavCollections(): Promise<void> {
    await this.navCollections.click();
  }

  async fillSearch(query: string): Promise<void> {
    await this.searchInput.fill(query);
  }

  async openFirstProduct(): Promise<ProductDetailsPage> {
    await this.firstProductLink.scrollIntoViewIfNeeded();
    await this.firstProductLink.click();
    await this.waitForPageLoad();
    await this.acceptCookiesIfVisible();
    return new ProductDetailsPage(this.page);
  }
}
