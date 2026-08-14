import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page object for an individual product detail page (PDP).
 */
export class ProductDetailsPage extends BasePage {
  readonly productTitle: Locator;
  readonly sizeSelector: Locator;
  readonly colorSelector: Locator;
  readonly addToCartButton: Locator;
  readonly selectSizePrompt: Locator;

  constructor(page: Page) {
    super(page);

    this.productTitle = page.getByRole('heading', { level: 1 }).first();

    this.sizeSelector = page.getByRole('radio', { name: /^(XS|S|M|L|XL|XXL|2XL|3XL)$/i }).first();

    this.colorSelector = page.locator('input[name="product-color"]')
      .or(page.getByRole('combobox', { name: /color|colour/i }))
      .or(page.getByLabel(/color|colour/i))
      .first();

    this.addToCartButton = page.getByRole('button', { name: /add to cart/i });
    this.selectSizePrompt = page.getByRole('button', { name: /select a size/i });
  }

  /** Select the first available size option on the PDP. */
  async selectFirstAvailableSize(): Promise<void> {
    const sizeInput = this.page.locator('input[type="radio"]:not([name="product-color"])').first();
    const sizeId = await sizeInput.getAttribute('id');
    if (sizeId) {
      const label = this.page.locator(`label[for="${sizeId}"]`);
      if (await label.isVisible().catch(() => false)) {
        await label.click();
        return;
      }
    }

    await sizeInput.click({ force: true });
  }

  /** Select a size by visible label (e.g. "M", "L", "XL"). */
  async selectSize(size: string): Promise<void> {
    const sizeInput = this.page
      .locator(`input[type="radio"][value="${size}" i], input[type="radio"]#${size}`)
      .first();

    // label[for] must match the input's id, not its value attribute.
    const sizeId = await sizeInput.getAttribute('id');
    if (sizeId) {
      const label = this.page.locator(`label[for="${sizeId}"]`);
      if (await label.isVisible().catch(() => false)) {
        await label.click();
        return;
      }
    }

    await sizeInput.click({ force: true });
  }

  /** Select a color swatch or dropdown option by name. */
  async selectColor(color: string): Promise<void> {
    const colorOption = this.page.getByRole('button', { name: new RegExp(color, 'i') })
      .or(this.page.getByRole('radio', { name: new RegExp(color, 'i') }));

    if (await colorOption.first().isVisible().catch(() => false)) {
      await colorOption.first().click();
      return;
    }

    const input = this.page
      .locator(
        `input[name="product-color"][value="${color}" i], input[name="product-color"]#${color}`,
      )
      .first();

    if (await input.count()) {
      // label[for] must match the input's id, not its value attribute.
      const inputId = await input.getAttribute('id');
      if (inputId) {
        const idLabel = this.page.locator(`label[for="${inputId}"]`);
        if (await idLabel.isVisible().catch(() => false)) {
          await idLabel.click();
          return;
        }
      }
      await input.click({ force: true });
      return;
    }

    const labeledControl = this.page.getByLabel(/color|colour/i);
    if (await labeledControl.evaluate((el) => el.tagName === 'SELECT').catch(() => false)) {
      await labeledControl.selectOption({ label: color });
      return;
    }

    const combobox = this.page.getByRole('combobox', { name: /color|colour/i });
    if (await combobox.isVisible().catch(() => false)) {
      await combobox.click();
      await this.page.getByRole('option', { name: new RegExp(color, 'i') }).click();
    }
  }

  /** Click the primary "Add to Cart" CTA. */
  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  /** Assert the Add to Cart button is present and actionable. */
  async expectAddToCartVisible(): Promise<void> {
    await expect(this.addToCartButton).toBeVisible();
    await expect(this.addToCartButton).toBeEnabled();
  }
}
