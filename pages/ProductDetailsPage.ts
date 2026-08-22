import { Locator, Page, expect } from '@playwright/test';
import { AUTH_MESSAGES } from '@constants/messages';
import { ToastType } from '@constants/payment';
import { SIZE_RADIO_PATTERN } from '@data/pdp-variants.data';
import { BasePage } from '@pages/BasePage';

export class ProductDetailsPage extends BasePage {
  private readonly productTitle: Locator;
  private readonly price: Locator;
  private readonly addToCartButton: Locator;
  private readonly outOfStockButton: Locator;
  private readonly selectSizePrompt: Locator;
  private readonly selectColorPrompt: Locator;
  private readonly addToWishlistButton: Locator;
  private readonly increaseQtyButton: Locator;
  private readonly decreaseQtyButton: Locator;
  private readonly qtyInput: Locator;
  private readonly sizeRadios: Locator;
  private readonly sizeLabels: Locator;
  private readonly colorRadios: Locator;
  private readonly cartDrawerClose: Locator;
  private readonly freeDeliveryNote: Locator;
  private readonly galleryImage: Locator;
  private readonly galleryThumbs: Locator;

  constructor(page: Page) {
    super(page);

    this.productTitle = page.getByRole('heading', { level: 1 }).first();
    this.price = page.getByText(/LKR\s*[\d,.]+/).first();
    this.addToCartButton = page.getByRole('button', { name: /add to cart/i });
    this.outOfStockButton = page.getByRole('button', { name: /out of stock/i });
    this.selectSizePrompt = page.getByRole('button', { name: /select a size/i });
    this.selectColorPrompt = page.getByRole('button', { name: /select a color/i });
    this.addToWishlistButton = page
      .getByRole('button', { name: /add to wishlist/i })
      .or(page.locator('button.wishlist-icon'))
      .first();
    this.qtyInput = page.locator('.product-content .cart-plus-minus-box').first();
    this.increaseQtyButton = page
      .locator('.product-content button.qtybutton')
      .filter({ hasText: /^\+$/ })
      .first();
    this.decreaseQtyButton = page
      .locator('.product-content button.qtybutton')
      .filter({ hasText: /^−$|^-$/ })
      .first();
    this.sizeRadios = page.locator('.product-content__size__content input[type="radio"]');
    this.sizeLabels = page.locator('.product-content__size__content label');
    this.colorRadios = page.locator('input[name="product-color"]');
    this.cartDrawerClose = page.locator('.cart-overlay__close-icon');
    this.freeDeliveryNote = page.locator('.product-content__delivery-note');
    this.galleryImage = page.locator('.product-large-image-wrapper .single-image img').first();
    this.galleryThumbs = page.locator(
      '.product-small-image-wrapper img, .product-large-image-wrapper .swiper-slide img',
    );
  }

  async selectFirstAvailableSize(): Promise<this> {
    const sizeRadio = this.page.getByRole('radio', { name: SIZE_RADIO_PATTERN }).first();

    if (await sizeRadio.isVisible().catch(() => false)) {
      await sizeRadio.click();
      return this;
    }

    const sizeInput = this.sizeRadios.first();
    const sizeId = await sizeInput.getAttribute('id');
    if (sizeId) {
      const label = this.page.locator(`label[for="${sizeId}"]`);
      if (await label.isVisible().catch(() => false)) {
        await label.click();
        return this;
      }
    }

    await sizeInput.click({ force: true });
    return this;
  }

  async selectSize(size: string): Promise<this> {
    const byRole = this.page.getByRole('radio', {
      name: new RegExp(`^${size}$`, 'i'),
    });
    if (await byRole.isVisible().catch(() => false)) {
      await byRole.click();
      return this;
    }

    const sizeInput = this.page
      .locator(`.product-content__size__content input[type="radio"][value="${size}" i], input[type="radio"]#${size}`)
      .first();
    const sizeId = await sizeInput.getAttribute('id');
    if (sizeId) {
      const label = this.page.locator(`label[for="${sizeId}"]`);
      if (await label.isVisible().catch(() => false)) {
        await label.click();
        return this;
      }
    }

    await sizeInput.click({ force: true });
    return this;
  }

  async addToCart(): Promise<this> {
    await this.addToCartButton.click();
    return this;
  }

  async expectAddToCartVisible(): Promise<void> {
    await expect(this.addToCartButton).toBeVisible();
    await expect(this.addToCartButton).toBeEnabled();
  }

  async expectSizeRequired(): Promise<void> {
    await expect(this.selectSizePrompt).toBeVisible();
    await expect(this.addToCartButton).toHaveCount(0);
  }

  async expectColorRequired(): Promise<void> {
    await expect(this.selectColorPrompt).toBeVisible();
    await expect(this.addToCartButton).toHaveCount(0);
  }

  async expectSizesHidden(): Promise<void> {
    await expect(this.sizeLabels).toHaveCount(0);
  }

  async expectSizesVisible(): Promise<void> {
    await expect(this.sizeLabels.first()).toBeVisible();
  }

  async selectColor(color: string): Promise<this> {
    const input = this.page.locator(
      `input[name="product-color"][value="${color}" i], input[name="product-color"]#${color}`,
    );
    const colorId = await input.first().getAttribute('id');
    if (colorId) {
      await this.page.locator(`label[for="${colorId}"]`).click({ force: true });
    } else {
      await input.first().check({ force: true });
    }
    await expect(this.sizeLabels.first()).toBeVisible();
    return this;
  }

  async expectSelectedColor(color: string): Promise<void> {
    await expect(
      this.page.locator(`input[name="product-color"][value="${color}" i]`),
    ).toBeChecked();
  }

  async expectSingleColorLocked(color: string): Promise<void> {
    const input = this.page.locator(`input[name="product-color"][value="${color}" i]`);
    await expect(input).toBeChecked();
    await expect(input).toBeDisabled();
    await expect(this.colorRadios).toHaveCount(1);
    await expect(this.page.locator(`label[for="${color}"]`)).toBeVisible();
  }

  async expectColorOptions(colors: readonly string[]): Promise<void> {
    await expect(this.colorRadios).toHaveCount(colors.length);
    for (const color of colors) {
      await expect(this.page.locator(`label[for="${color}"]`)).toBeVisible();
    }
  }

  async expectListedSizes(sizes: readonly string[]): Promise<void> {
    await expect(this.sizeLabels).toHaveText([...sizes]);
  }

  async getListedSizes(): Promise<string[]> {
    return this.sizeLabels.allTextContents();
  }

  async expectAvailableSizeCount(minCount: number): Promise<void> {
    await expect.poll(async () => this.sizeRadios.count()).toBeGreaterThanOrEqual(minCount);
  }

  async expectOutOfStock(): Promise<void> {
    await expect(this.outOfStockButton).toBeVisible();
    await expect(this.outOfStockButton).toBeDisabled();
    await expect(this.addToCartButton).toHaveCount(0);
  }

  async expectPageNotFound(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: /page not found/i })).toBeVisible();
  }

  async expectAddedToCart(): Promise<void> {
    await this.expectToast(AUTH_MESSAGES.addedToCartToast, ToastType.Success);
  }

  async dismissCartDrawer(): Promise<this> {
    if (await this.cartDrawerClose.isVisible().catch(() => false)) {
      await this.cartDrawerClose.click();
    }
    return this;
  }

  async expectProductDetailsVisible(): Promise<void> {
    await expect(this.productTitle).toBeVisible();
    await expect(this.price).toBeVisible();
    await expect(
      this.addToCartButton.or(this.selectSizePrompt).or(this.selectColorPrompt).or(this.outOfStockButton),
    ).toBeVisible();
  }

  async expectOnProductPage(): Promise<void> {
    await expect(this.page).toHaveURL(/\/products\//);
    await expect(this.productTitle).toBeVisible();
  }

  async expectProductTitle(name: string | RegExp): Promise<void> {
    await expect(this.productTitle).toHaveText(name);
  }

  async addToWishlist(): Promise<this> {
    await this.addToWishlistButton.click();
    return this;
  }

  async expectAddedToWishlist(): Promise<void> {
    await expect(
      this.page.locator('[data-sonner-toast]').filter({ hasText: AUTH_MESSAGES.wishlistToast }),
    ).toBeVisible();
  }

  async increaseQuantity(): Promise<this> {
    await this.increaseQtyButton.click();
    return this;
  }

  async decreaseQuantity(): Promise<this> {
    await this.decreaseQtyButton.click();
    return this;
  }

  async setQuantity(quantity: number): Promise<this> {
    const current = Number(await this.qtyInput.inputValue());
    if (current === quantity) {
      return this;
    }
    const clicks = quantity - current;
    const button = clicks > 0 ? this.increaseQtyButton : this.decreaseQtyButton;
    for (let i = 0; i < Math.abs(clicks); i += 1) {
      await button.click();
    }
    await this.expectQuantity(quantity);
    return this;
  }

  async expectQuantity(quantity: number): Promise<void> {
    await expect(this.qtyInput).toHaveValue(String(quantity));
  }

  async expectQuantityStepperDisabled(): Promise<void> {
    await expect(this.increaseQtyButton).toBeDisabled();
    await expect(this.decreaseQtyButton).toBeDisabled();
  }

  async expectQuantityStepperEnabled(): Promise<void> {
    await expect(this.increaseQtyButton).toBeEnabled();
    await expect(this.decreaseQtyButton).toBeEnabled();
  }

  async expectQuantityDoesNotGoBelowOne(): Promise<void> {
    const minusEnabled = await this.decreaseQtyButton.isEnabled();
    if (minusEnabled) {
      await this.decreaseQtyButton.click();
    }
    await this.expectQuantity(1);
  }

  async expectNoQuantityCap(target = 10): Promise<void> {
    await this.setQuantity(target);
    await this.expectQuantity(target);
    await expect(this.increaseQtyButton).toBeEnabled();
  }

  async expectFreeDeliveryNote(): Promise<void> {
    await expect(this.freeDeliveryNote).toBeVisible();
    await expect(this.freeDeliveryNote).toHaveText(/free delivery on orders over lkr\s*5,?000/i);
  }

  async expectGalleryVisible(): Promise<void> {
    await expect(this.galleryImage).toBeVisible();
    await expect.poll(async () => this.galleryThumbs.count()).toBeGreaterThan(1);
  }

  async expectSizeChartVisible(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: /size chart/i })).toBeVisible();
    await expect(this.page.getByRole('img', { name: /size chart/i })).toBeVisible();
  }

  async expectAdditionalInformation(): Promise<void> {
    await expect(this.page.getByText(/additional information/i).first()).toBeVisible();
  }

  async open(path: string): Promise<this> {
    await this.goto(path);
    return this;
  }
}
