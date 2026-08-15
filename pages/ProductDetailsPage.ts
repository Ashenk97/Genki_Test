import { Locator, Page, expect } from '@playwright/test';
import { AUTH_MESSAGES } from '@constants/messages';
import { ToastType } from '@constants/payment';
import { BasePage } from '@pages/BasePage';

export class ProductDetailsPage extends BasePage {
  private readonly productTitle: Locator;
  private readonly price: Locator;
  private readonly addToCartButton: Locator;
  private readonly selectSizePrompt: Locator;
  private readonly addToWishlistButton: Locator;
  private readonly increaseQtyButton: Locator;

  constructor(page: Page) {
    super(page);

    this.productTitle = page.getByRole('heading', { level: 1 }).first();
    this.price = page.getByText(/LKR\s*[\d,.]+/).first();
    this.addToCartButton = page.getByRole('button', { name: /add to cart/i });
    this.selectSizePrompt = page.getByRole('button', { name: /select a size/i });
    this.addToWishlistButton = page.getByRole('button', { name: /add to wishlist/i });
    this.increaseQtyButton = page
      .locator('button.inc.qtybutton')
      .or(page.getByRole('button', { name: /^\+$/ }))
      .first();
  }

  async selectFirstAvailableSize(): Promise<this> {
    const sizeRadio = this.page.getByRole('radio', {
      name: /^(XS|S|M|L|XL|XXL|2XL|3XL)$/i,
    }).first();

    if (await sizeRadio.isVisible().catch(() => false)) {
      await sizeRadio.click();
      return this;
    }

    const sizeInput = this.page
      .locator('input[type="radio"]:not([name="product-color"])')
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

  async selectSize(size: string): Promise<this> {
    const byRole = this.page.getByRole('radio', {
      name: new RegExp(`^${size}$`, 'i'),
    });
    if (await byRole.isVisible().catch(() => false)) {
      await byRole.click();
      return this;
    }

    const sizeInput = this.page
      .locator(`input[type="radio"][value="${size}" i], input[type="radio"]#${size}`)
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

  async expectAddedToCart(): Promise<void> {
    await this.expectToast(AUTH_MESSAGES.addedToCartToast, ToastType.Success);
  }

  async expectProductDetailsVisible(): Promise<void> {
    await expect(this.productTitle).toBeVisible();
    await expect(this.price).toBeVisible();
    await expect(this.addToCartButton.or(this.selectSizePrompt)).toBeVisible();
  }

  async expectOnProductPage(): Promise<void> {
    await expect(this.page).toHaveURL(/\/products\//);
    await expect(this.productTitle).toBeVisible();
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

  async expectQuantity(quantity: number): Promise<void> {
    await expect(
      this.page
        .locator(`input[value="${quantity}"]`)
        .or(this.page.getByText(new RegExp(`^${quantity}$`)))
        .first(),
    ).toBeVisible();
  }

  async open(path: string): Promise<this> {
    await this.goto(path);
    return this;
  }
}
