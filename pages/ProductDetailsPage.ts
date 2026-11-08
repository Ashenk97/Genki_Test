import { Locator, Page, expect } from '@playwright/test';
import { AUTH_MESSAGES } from '@constants/messages';
import { ToastType } from '@constants/payment';
import { FREE_DELIVERY, SIZE_RADIO_PATTERN } from '@data/pdp-variants.data';
import { lkrAmountPattern } from '@helpers/string';
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
    this.price = page
      .locator('span.main-price, span.discounted-price')
      .or(page.getByText(/LKR\s*[\d,.]+/))
      .first();
    this.addToCartButton = page.getByRole('button', { name: /add to cart/i });
    this.outOfStockButton = page.getByRole('button', { name: /out of stock/i });
    this.selectSizePrompt = page.getByRole('button', { name: /select a size/i });
    this.selectColorPrompt = page.getByRole('button', { name: /select a color/i });
    this.addToWishlistButton = page
      .locator('.product-content__wishlist')
      .or(page.getByRole('button', { name: /add to wishlist/i }))
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
    this.galleryImage = page
      .locator('.product-gallery__image img, .product-large-image-wrapper .single-image img')
      .first();
    this.galleryThumbs = page.locator(
      '.product-gallery__image img, .product-small-image-wrapper img, .product-large-image-wrapper .swiper-slide img',
    );
  }

  /** Acid-wash PDPs hide sizes until a color is chosen. */
  private async ensureColorSelected(): Promise<void> {
    if (await this.selectColorPrompt.isVisible().catch(() => false)) {
      await this.selectFirstColor();
    }
  }

  private async variantAction(): Promise<'atc' | 'oos' | ''> {
    if (await this.addToCartButton.isVisible().catch(() => false)) {
      return 'atc';
    }
    if (await this.outOfStockButton.isVisible().catch(() => false)) {
      return 'oos';
    }
    return '';
  }

  /** Picks the first size that can be added. Some sizes, such as Black / S, are out of stock. */
  async selectFirstAvailableSize(): Promise<this> {
    await this.ensureColorSelected();
    const count = await this.sizeLabels.count();
    for (let i = 0; i < count; i += 1) {
      await this.sizeLabels.nth(i).click();
      if ((await this.variantAction()) === 'atc') {
        return this;
      }
    }
    return this;
  }

  async selectSize(size: string): Promise<this> {
    await this.ensureColorSelected();
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

  async expectAddToCartOrOutOfStock(): Promise<void> {
    await expect(this.addToCartButton.or(this.outOfStockButton)).toBeVisible();
    if (await this.addToCartButton.isVisible().catch(() => false)) {
      await expect(this.addToCartButton).toBeEnabled();
      return;
    }
    await expect(this.outOfStockButton).toBeDisabled();
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

  async selectFirstColor(): Promise<this> {
    await this.colorRadios.first().evaluate((el: HTMLInputElement) => el.click());
    await expect(
      this.sizeLabels.first().or(this.addToCartButton).or(this.outOfStockButton),
    ).toBeVisible();
    return this;
  }

  /**
   * Select color/size if the PDP requires them. Returns false when the variant is out of stock.
   */
  async tryEnableAddToCart(): Promise<boolean> {
    await this.expectProductDetailsVisible();

    if (await this.selectColorPrompt.isVisible().catch(() => false)) {
      await this.selectFirstColor();
    }

    const sizeByRole = this.page.getByRole('radio', { name: SIZE_RADIO_PATTERN }).first();
    await expect
      .poll(async () => {
        if (await this.outOfStockButton.isVisible().catch(() => false)) {
          return 'oos';
        }
        if (await this.addToCartButton.isVisible().catch(() => false)) {
          return 'atc';
        }
        if (
          (await sizeByRole.isVisible().catch(() => false)) ||
          (await this.sizeRadios.count()) > 0
        ) {
          return 'size';
        }
        return '';
      })
      .not.toBe('');

    if (await this.outOfStockButton.isVisible().catch(() => false)) {
      return false;
    }
    if (await this.addToCartButton.isVisible().catch(() => false)) {
      return true;
    }

    await this.selectFirstAvailableSize();
    await expect(this.addToCartButton.or(this.outOfStockButton)).toBeVisible();
    return this.addToCartButton.isVisible().catch(() => false);
  }

  async selectColor(color: string): Promise<this> {
    const input = this.page.locator(`input[name="product-color"][value="${color}" i]`).first();
    await input.evaluate((el: HTMLInputElement) => el.click());
    await expect(input).toBeChecked();
    await expect(this.sizeLabels.first()).toBeVisible();
    return this;
  }

  /** Highest `availableQuantity` for the color. Checkout rejects sizes the PDP still lets you add. */
  async bestInStockSize(color?: string, minimum = 1): Promise<string> {
    const html = (await this.page.content()).replace(/\\"/g, '"');
    const pattern =
      /"color":"([^"]+)"[\s\S]{0,180}?"size":"([^"]+)"[\s\S]{0,500}?"availableQuantity":(\d+)/g;
    const quantities = new Map<string, number>();
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(html))) {
      if (color && match[1].toLowerCase() !== color.toLowerCase()) {
        continue;
      }
      const size = match[2];
      const quantity = Number(match[3]);
      quantities.set(size, Math.max(quantities.get(size) ?? 0, quantity));
    }
    // The PDP still advertises Black/L and Black/M after checkout has zeroed them.
    // Prefer XL, which staging checkout currently accepts, then the next listed sizes.
    const preferred = ['XL', 'XXL', 'L', 'M', 'S'];
    const chosen = preferred.find((size) => (quantities.get(size) ?? 0) >= minimum);
    if (chosen) {
      return chosen;
    }
    const fallback = [...quantities.entries()].find(([, quantity]) => quantity >= minimum);
    if (!fallback) {
      throw new Error(
        `No size with at least ${minimum} in stock${color ? ` for ${color}` : ''} on ${this.page.url()}`,
      );
    }
    return fallback[0];
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

  async expectColorAbsent(color: string): Promise<void> {
    await expect(this.page.locator(`input[name="product-color"][value="${color}" i]`)).toHaveCount(0);
  }

  async expectListedSizes(sizes: readonly string[]): Promise<void> {
    await expect(this.sizeLabels).toHaveText([...sizes]);
  }

  async expectSizeNotListed(size: string): Promise<void> {
    const listed = await this.getListedSizes();
    expect(listed.map((s) => s.trim().toUpperCase())).not.toContain(size.toUpperCase());
  }

  async expectDisplayedPrice(amount: number): Promise<void> {
    await expect(this.page.getByText(lkrAmountPattern(amount)).first()).toBeVisible();
  }

  async expectSizeChartDoesNotList(size: string): Promise<void> {
    await this.expectSizeChartVisible();
    const listed = await this.getListedSizes();
    expect(listed.map((s) => s.trim().toUpperCase())).not.toContain(size.toUpperCase());
    await expect(this.page.getByRole('img', { name: new RegExp(size, 'i') })).toHaveCount(0);
  }

  async wrappedSizeLabelRowGap(): Promise<number | null> {
    const boxes = await this.sizeLabels.evaluateAll((els) =>
      els.map((el) => {
        const rect = el.getBoundingClientRect();
        return { top: rect.top, bottom: rect.bottom };
      }),
    );
    if (boxes.length < 2) {
      return null;
    }
    const rowTolerance = 8;
    const firstTop = boxes[0].top;
    const firstRow = boxes.filter((box) => Math.abs(box.top - firstTop) <= rowTolerance);
    const nextRow = boxes.filter((box) => box.top > firstTop + rowTolerance);
    if (nextRow.length === 0) {
      return null;
    }
    const firstRowBottom = Math.max(...firstRow.map((box) => box.bottom));
    const nextRowTop = Math.min(...nextRow.map((box) => box.top));
    return nextRowTop - firstRowBottom;
  }

  async expectWrappedSizeLabelsHaveRowGap(minGap = 8): Promise<void> {
    const gap = await this.wrappedSizeLabelRowGap();
    expect(gap, 'size chips should wrap onto a second row at this viewport').not.toBeNull();
    expect(gap as number, 'wrapped size chips should have a visible row gap').toBeGreaterThanOrEqual(
      minGap,
    );
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

  /** The stepper stops at the variant's available stock and ignores further clicks. */
  async expectQuantityStopsAtAvailableStock(): Promise<void> {
    let quantity = Number(await this.qtyInput.inputValue());
    expect(quantity).toBeGreaterThan(0);

    for (let attempt = 0; attempt < 30; attempt += 1) {
      await this.increaseQtyButton.click();
      const increased = await expect
        .poll(async () => Number(await this.qtyInput.inputValue()) > quantity, { timeout: 800 })
        .toBe(true)
        .then(() => true)
        .catch(() => false);
      if (!increased) {
        await this.increaseQtyButton.click();
        await this.expectQuantity(quantity);
        return;
      }
      const next = Number(await this.qtyInput.inputValue());
      expect(next).toBe(quantity + 1);
      quantity = next;
    }

    throw new Error(`Quantity kept increasing past ${quantity}`);
  }

  async expectFreeDeliveryNote(): Promise<void> {
    await expect(this.freeDeliveryNote).toBeVisible();
    await expect(this.freeDeliveryNote).toHaveText(FREE_DELIVERY.pdpNote);
  }

  async expectGalleryVisible(): Promise<void> {
    await expect(this.galleryImage).toBeVisible();
    await expect.poll(async () => this.galleryThumbs.count()).toBeGreaterThan(1);
  }

  async expectSizeChartVisible(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: /size chart/i })).toBeVisible();
    await expect(
      this.page
        .getByRole('img', { name: /size chart/i })
        .or(this.page.getByText(/all measurements are in inches/i)),
    ).toBeVisible();
  }

  async expectAdditionalInformation(): Promise<void> {
    await expect(this.page.getByText(/additional information/i).first()).toBeVisible();
  }

  async open(path: string): Promise<this> {
    await this.goto(path);
    return this;
  }
}
