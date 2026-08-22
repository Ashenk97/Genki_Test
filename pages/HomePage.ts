import { Locator, Page, expect } from '@playwright/test';
import { PAGE_HEADINGS } from '@constants/messages';
import { AppRoutes } from '@constants/routes';
import { BasePage } from '@pages/BasePage';
import { Header } from '@pages/Header';
import { ProductDetailsPage } from '@pages/ProductDetailsPage';

export class HomePage extends BasePage {
  readonly header: Header;

  private readonly featuredSectionHeading: Locator;
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
   * Search is intentionally disabled (product requirement).
   */
  async expectSearchDisabled(): Promise<void> {
    await expect(this.page.locator('.search-overlay')).toHaveCount(0);
    await expect(this.page.locator('input[type="search"]')).toHaveCount(0);
    await expect(this.page.getByRole('button', { name: /search/i })).toHaveCount(0);
    await expect(this.page.getByRole('search')).toHaveCount(0);
    await expect(this.page.getByPlaceholder(/search/i)).toHaveCount(0);
  }

  async openFirstProduct(): Promise<ProductDetailsPage> {
    await this.firstProductLink.scrollIntoViewIfNeeded();
    await this.firstProductLink.click();
    await this.waitForPageLoad();
    await this.acceptCookiesIfVisible();
    return new ProductDetailsPage(this.page);
  }

  async openPurchasableProduct(): Promise<ProductDetailsPage> {
    const hrefs = await this.page
      .locator('a[href^="/products/"]:not([href*="undefined"])')
      .evaluateAll((els) => [
        ...new Set(
          els
            .map((el) => el.getAttribute('href'))
            .filter((href): href is string => Boolean(href)),
        ),
      ]);

    for (const href of hrefs) {
      await this.goto(href);
      const productPage = new ProductDetailsPage(this.page);
      await productPage.expectOnProductPage();
      if (await productPage.tryEnableAddToCart()) {
        return productPage;
      }
    }

    throw new Error('No in-stock product found from homepage links');
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
