import { Locator, Page, expect } from '@playwright/test';
import { PAGE_HEADINGS } from '@constants/messages';
import { AppRoutes } from '@constants/routes';
import { BasePage } from '@pages/BasePage';
import { Header } from '@pages/Header';
import { ProductDetailsPage } from '@pages/ProductDetailsPage';

export class HomePage extends BasePage {
  readonly header: Header;

  private readonly featuredSectionHeading: Locator;
  private readonly searchInput: Locator;
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
    this.searchInput = page.getByRole('searchbox', { name: /search products/i });
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

  async fillSearch(query: string): Promise<this> {
    await this.searchInput.fill(query);
    return this;
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
