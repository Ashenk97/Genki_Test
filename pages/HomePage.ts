import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Header } from './Header';
import { ProductDetailsPage } from './ProductDetailsPage';

/**
 * Page object for the Genki Wardrobe landing / homepage.
 */
export class HomePage extends BasePage {
  readonly header: Header;

  // ── Hero & prominent content ──────────────────────────────────────────────
  readonly heroBanner: Locator;
  readonly heroHeading: Locator;
  readonly featuredSectionHeading: Locator;

  // ── Primary navigation (delegated to Header) ─────────────────────────────
  readonly navHome: Locator;
  readonly navShop: Locator;
  readonly navCollections: Locator;

  // ── Search ────────────────────────────────────────────────────────────────
  readonly searchInput: Locator;

  // ── Product grid shortcuts ────────────────────────────────────────────────
  readonly firstProductLink: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);

    this.heroBanner = page.locator('[class*="hero"], [class*="banner"], .swiper, .slider').first();
    this.heroHeading = page.getByRole('heading', { level: 1 }).first();
    this.featuredSectionHeading = page.getByRole('heading', {
      name: /cultural threads for every mood/i,
    });

    // Logo = Home; Men is the shop-equivalent top-level item on staging.
    this.navHome = this.header.logoLink;
    this.navShop = this.header.navMen;
    this.navCollections = this.header.navCollections;

    this.searchInput = page.getByRole('searchbox', { name: /search products/i });

    this.firstProductLink = page.locator('a[href^="/products/"]:not([href*="undefined"])').first();
  }

  /** Open the homepage and dismiss any cookie banner. */
  async open(): Promise<void> {
    await this.goto('/');
    await this.waitForNetworkIdle();
  }

  /** Assert the landing page URL and featured heading are showing. */
  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL((url) => {
      const path = url.pathname.replace(/\/$/, '');
      return path === '' || path === '/';
    });
    await expect(this.page).toHaveTitle(/genki/i);
    await expect(this.featuredSectionHeading).toBeVisible();
  }

  /** Navigate via the primary "Home" nav item (brand logo). */
  async clickNavHome(): Promise<void> {
    await this.navHome.click();
    await this.waitForPageLoad();
  }

  /** Navigate via the "Shop" nav item. */
  async clickNavShop(): Promise<void> {
    await this.navShop.click();
    await this.waitForPageLoad();
  }

  /** Open the Collections dropdown / section. */
  async clickNavCollections(): Promise<void> {
    await this.navCollections.click();
  }

  /** Type a query into the search bar (does not submit). */
  async fillSearch(query: string): Promise<void> {
    await this.searchInput.fill(query);
  }

  /**
   * Open the first product card on the homepage and land on the PDP.
   * Returns the ProductDetailsPage instance for fluent chaining in tests.
   */
  async openFirstProduct(): Promise<ProductDetailsPage> {
    await this.firstProductLink.scrollIntoViewIfNeeded();
    await this.firstProductLink.click();
    await this.waitForPageLoad();
    await this.acceptCookiesIfVisible();
    return new ProductDetailsPage(this.page);
  }
}
