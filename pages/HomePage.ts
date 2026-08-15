import { Locator, Page, expect } from '@playwright/test';
import { PAGE_HEADINGS } from '@constants/messages';
import { AppRoutes } from '@constants/routes';
import { BasePage } from '@pages/BasePage';
import { Header } from '@pages/Header';
import { ProductDetailsPage } from '@pages/ProductDetailsPage';

export class HomePage extends BasePage {
  readonly header: Header;

  private readonly featuredSectionHeading: Locator;
  private readonly searchOverlay: Locator;
  private readonly searchInput: Locator;
  private readonly mobileSearchInput: Locator;
  private readonly firstProductLink: Locator;
  private readonly heroSlider: Locator;
  private readonly heroSlides: Locator;
  private readonly heroNextButton: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);

    this.featuredSectionHeading = page.getByRole('heading', {
      name: PAGE_HEADINGS.featuredMood,
    });
    this.searchOverlay = page.locator('.search-overlay');
    this.searchInput = this.searchOverlay.getByPlaceholder(/search products/i);
    this.mobileSearchInput = page.locator('.offcanvas-mobile-menu__search input[type="search"]');
    this.firstProductLink = page
      .locator('a[href^="/products/"]:not([href*="undefined"])')
      .first();
    this.heroSlider = page.locator('.hero-slider-two .swiper').first();
    this.heroSlides = page.locator(
      '.hero-slider-two .swiper-slide:not(.swiper-slide-duplicate)',
    );
    this.heroNextButton = page.locator('.swiper-button-next.next-hero-swiper-two');
  }

  async open(): Promise<this> {
    await this.goto(AppRoutes.Home);
    return this;
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL((url) => {
      const path = url.pathname.replace(/\/$/, '');
      return path === '' || path === '/';
    });
    await expect(this.page).toHaveTitle(PAGE_HEADINGS.siteTitle);
    await expect(this.featuredSectionHeading).toBeVisible();
  }

  /**
   * Staging currently has no header control that opens search; activate the overlay
   * the same way the app does (active class + body scroll lock) so the input is usable.
   */
  async openSearch(): Promise<this> {
    await this.searchOverlay.evaluate((el) => {
      el.classList.add('active');
      document.querySelector('body')?.classList.add('overflow-hidden');
    });
    await expect(this.searchOverlay).toHaveClass(/active/);
    await expect(this.searchInput).toBeVisible();
    return this;
  }

  async closeSearch(): Promise<this> {
    await this.searchOverlay.evaluate((el) => {
      el.classList.remove('active');
      document.querySelector('body')?.classList.remove('overflow-hidden');
    });
    await expect(this.searchOverlay).not.toHaveClass(/active/);
    return this;
  }

  async fillSearch(query: string): Promise<this> {
    await this.searchInput.fill(query);
    return this;
  }

  async submitSearch(): Promise<this> {
    await this.searchInput.press('Enter');
    await this.waitForPageLoad();
    return this;
  }

  async expectSearchQuery(query: string): Promise<void> {
    await expect(this.searchInput).toHaveValue(query);
  }

  async expectFeaturedProductMatching(pattern: RegExp): Promise<void> {
    await expect(
      this.page.getByRole('heading', { name: pattern }).or(this.page.getByText(pattern)).first(),
    ).toBeVisible();
  }

  async expectMobileSearchVisible(): Promise<void> {
    await expect(this.mobileSearchInput).toBeVisible();
  }

  async fillMobileSearch(query: string): Promise<this> {
    await this.mobileSearchInput.fill(query);
    return this;
  }

  async expectMobileSearchQuery(query: string): Promise<void> {
    await expect(this.mobileSearchInput).toHaveValue(query);
  }

  async openFirstProduct(): Promise<ProductDetailsPage> {
    await this.firstProductLink.scrollIntoViewIfNeeded();
    await this.firstProductLink.click();
    await this.waitForPageLoad();
    await this.acceptCookiesIfVisible();
    return new ProductDetailsPage(this.page);
  }

  async expectCarouselVisible(): Promise<void> {
    await expect(this.heroSlider).toBeVisible();
    await expect(this.heroSlides.first()).toBeVisible();
    expect(await this.heroSlides.count()).toBeGreaterThan(1);
  }

  async clickCarouselNext(): Promise<void> {
    await this.heroSlider.hover();
    await this.heroNextButton.click({ force: true });
  }

  async activeSlideIndex(): Promise<string | null> {
    return this.page
      .locator('.hero-slider-two .swiper-slide-active')
      .first()
      .getAttribute('data-swiper-slide-index');
  }

  async expectCarouselAdvancedFrom(previousIndex: string | null): Promise<void> {
    await expect.poll(async () => this.activeSlideIndex()).not.toBe(previousIndex);
  }
}
