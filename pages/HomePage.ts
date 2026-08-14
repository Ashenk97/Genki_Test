import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { ProductDetailsPage } from './ProductDetailsPage';

/**
 * Page object for the Genki Wardrobe landing / homepage.
 */
export class HomePage extends BasePage {
  // ── Hero & prominent content ──────────────────────────────────────────────
  readonly heroBanner: Locator;
  readonly heroHeading: Locator;
  readonly featuredSectionHeading: Locator;

  // ── Primary navigation (Home, Shop, Collections) ────────────────────────
  readonly navHome: Locator;
  readonly navShop: Locator;
  readonly navCollections: Locator;

  // ── Search ────────────────────────────────────────────────────────────────
  readonly searchInput: Locator;

  // ── Product grid shortcuts ────────────────────────────────────────────────
  readonly firstProductLink: Locator;

  constructor(page: Page) {
    super(page);

    this.heroBanner = page.locator('[class*="hero"], [class*="banner"], .swiper, .slider').first();
    this.heroHeading = page.getByRole('heading', { level: 1 }).first();
    this.featuredSectionHeading = page.getByRole('heading', {
      name: /cultural threads for every mood/i,
    });

    // Logo link = Home; Men = Shop equivalent; Collections as listed in primary nav.
    this.navHome = page.getByRole('link').filter({ has: page.getByAltText('Genki Wardrobe') });
    this.navShop = page.getByRole('navigation').getByRole('link', { name: /^men$/i });
    this.navCollections = page.getByRole('navigation').getByRole('link', { name: /^collections$/i });

    this.searchInput = page.getByRole('searchbox', { name: /search products/i });

    this.firstProductLink = page.locator('a[href^="/products/"]').first();
  }

  /** Open the homepage and dismiss any cookie banner. */
  async open(): Promise<void> {
    await this.goto('/');
    await this.waitForNetworkIdle();
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
