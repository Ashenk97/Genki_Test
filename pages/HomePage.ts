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
  readonly heroSlider: Locator;
  readonly heroSlides: Locator;
  readonly heroNextButton: Locator;
  readonly heroPrevButton: Locator;
  readonly moodCategoryLinks: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);

    this.heroBanner = page.locator('.hero-slider-two, [class*="hero"], [class*="banner"], .swiper, .slider').first();
    this.heroHeading = page.getByRole('heading', { level: 1 }).first();
    this.featuredSectionHeading = page.getByRole('heading', {
      name: /cultural threads for every mood/i,
    });

    this.navHome = this.header.logoLink;
    this.navShop = this.header.navMen;
    this.navCollections = this.header.navCollections;

    this.searchInput = page.getByRole('searchbox', { name: /search products/i });

    this.firstProductLink = page.locator('a[href^="/products/"]:not([href*="undefined"])').first();
    this.heroSlider = page.locator('.hero-slider-two .swiper').first();
    this.heroSlides = page.locator(
      '.hero-slider-two .swiper-slide:not(.swiper-slide-duplicate)',
    );
    this.heroNextButton = page.locator('.swiper-button-next.next-hero-swiper-two');
    this.heroPrevButton = page.locator('.swiper-button-prev.prev-hero-swiper-two');
    this.moodCategoryLinks = page.getByRole('link', {
      name: /^(anime|culture|originals|jdm|kawaii)$/i,
    });
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
}
