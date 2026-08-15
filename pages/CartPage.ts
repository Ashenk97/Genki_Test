import { Locator, Page, expect } from '@playwright/test';
import { CART_PAGE } from '../fixtures/test-data';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly heading: Locator;
  readonly emptyMessage: Locator;
  readonly shopNowLink: Locator;
  readonly proceedToCheckout: Locator;
  readonly productRows: Locator;
  readonly increaseQtyButton: Locator;
  readonly decreaseQtyButton: Locator;
  readonly removeButtons: Locator;
  readonly drawer: Locator;
  readonly drawerCheckout: Locator;
  readonly drawerViewCart: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: CART_PAGE.heading });
    this.emptyMessage = page.getByText(CART_PAGE.emptyMessage);
    this.shopNowLink = page.getByRole('link', { name: /shop now/i });
    this.proceedToCheckout = page.getByRole('link', { name: /proceed to checkout/i });
    this.productRows = page.locator('table tbody tr').filter({
      has: page.locator('a[href^="/products/"]:not([href*="undefined"])'),
    });
    this.increaseQtyButton = this.productRows.first().locator('button.inc.qtybutton');
    this.decreaseQtyButton = this.productRows.first().locator('button.dec.qtybutton');
    this.removeButtons = page.locator('table tbody tr td:last-child button');
    this.drawer = page.locator('.cart-overlay');
    this.drawerCheckout = this.drawer.getByRole('link', { name: /^checkout$/i });
    this.drawerViewCart = this.drawer.getByRole('link', { name: /view cart/i });
  }

  async open(): Promise<void> {
    await this.goto(CART_PAGE.path);
    await this.waitForNetworkIdle();
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(
      (url) => url.pathname.replace(/\/$/, '') === CART_PAGE.path,
    );
    await expect(this.heading).toBeVisible();
  }

  async expectHasItems(): Promise<void> {
    await expect(this.productRows.first()).toBeVisible();
  }

  async expectEmpty(): Promise<void> {
    await expect(this.emptyMessage).toBeVisible();
    await expect(this.shopNowLink).toBeVisible();
  }

  async increaseQuantity(): Promise<void> {
    await this.increaseQtyButton.click();
    await this.waitForNetworkIdle();
  }

  async clearCart(): Promise<void> {
    for (let i = 0; i < 10; i += 1) {
      if ((await this.removeButtons.count()) === 0) {
        break;
      }
      await this.removeButtons.first().click();
      await this.page.waitForTimeout(500);
    }
  }

  async proceedToCheckoutPage(): Promise<void> {
    await this.proceedToCheckout.click();
    await this.waitForPageLoad();
    await this.acceptCookiesIfVisible();
  }

  async expectDrawerNotEmpty(): Promise<void> {
    await expect(this.drawer.getByText(/your cart is empty/i)).toHaveCount(0);
    await expect(this.drawerCheckout).toBeVisible();
  }
}
