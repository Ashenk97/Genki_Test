import { Locator, Page, expect } from '@playwright/test';
import { AUTH_MESSAGES } from '@constants/messages';
import { CART_PAGE } from '@data/navigation.data';
import { AppRoutes } from '@constants/routes';
import { BasePage } from '@pages/BasePage';

export class CartPage extends BasePage {
  private readonly heading: Locator;
  private readonly emptyMessage: Locator;
  private readonly shopNowLink: Locator;
  private readonly proceedToCheckout: Locator;
  private readonly productRows: Locator;
  private readonly increaseQtyButton: Locator;
  private readonly decreaseQtyButton: Locator;
  private readonly removeButtons: Locator;
  private readonly drawer: Locator;
  private readonly drawerCheckout: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: CART_PAGE.heading });
    this.emptyMessage = page.getByText(CART_PAGE.emptyMessage);
    this.shopNowLink = page.getByRole('link', { name: /shop now/i });
    this.proceedToCheckout = page.getByRole('link', { name: /proceed to checkout/i });
    this.productRows = page.locator('table tbody tr').filter({
      has: page.locator('a[href^="/products/"]:not([href*="undefined"])'),
    });
    this.increaseQtyButton = this.productRows.first().getByRole('button', { name: /^\+$/ })
      .or(this.productRows.first().locator('button.inc.qtybutton'))
      .or(this.productRows.first().locator('button.qtybutton').filter({ hasText: /^\+$/ }));
    this.decreaseQtyButton = this.productRows.first().getByRole('button', { name: /^−$|^-$/ })
      .or(this.productRows.first().locator('button.dec.qtybutton'))
      .or(this.productRows.first().locator('button.qtybutton').filter({ hasText: /^-$/ }));
    this.removeButtons = page.locator('table tbody tr td:last-child button');
    this.drawer = page.locator('.cart-overlay');
    this.drawerCheckout = this.drawer.getByRole('link', { name: /^checkout$/i });
  }

  async open(): Promise<this> {
    await this.goto(CART_PAGE.path);
    return this;
  }

  async expectLoaded(): Promise<void> {
    await this.expectPathname(CART_PAGE.path);
    await expect(this.heading).toBeVisible();
  }

  async expectHasItems(): Promise<void> {
    await expect(this.productRows.first()).toBeVisible();
  }

  async expectItemCount(count: number): Promise<void> {
    await expect(this.productRows).toHaveCount(count);
  }

  async expectLineContains(text: string | RegExp): Promise<void> {
    await expect(this.productRows.first().getByText(text)).toBeVisible();
  }

  async expectEmpty(): Promise<void> {
    await expect(this.emptyMessage).toBeVisible();
    await expect(this.shopNowLink).toBeVisible();
  }

  async clickShopNow(): Promise<void> {
    await this.shopNowLink.click();
    await this.waitForPageLoad();
    await this.acceptCookiesIfVisible();
  }

  async expectShopNowNavigated(): Promise<void> {
    await expect(this.page).toHaveURL((url) => {
      const path = url.pathname.replace(/\/$/, '');
      return path === '' || path === '/' || path.startsWith('/collection');
    });
  }

  async increaseQuantity(): Promise<this> {
    await this.increaseQtyButton.click();
    return this;
  }

  async decreaseQuantity(): Promise<this> {
    await this.decreaseQtyButton.click();
    return this;
  }

  async expectQuantity(quantity: number): Promise<void> {
    await expect(
      this.productRows.first().locator(`input[value="${quantity}"]`),
    ).toBeVisible();
  }

  async clearCart(): Promise<void> {
    for (let i = 0; i < 10; i += 1) {
      const count = await this.removeButtons.count();
      if (count === 0) {
        break;
      }
      await this.removeButtons.first().click();
      await expect
        .poll(async () => this.removeButtons.count(), { timeout: 5_000 })
        .toBeLessThan(count);
    }
  }

  async proceedToCheckoutPage(): Promise<void> {
    await this.proceedToCheckout.click();
    await this.waitForPageLoad();
    await this.acceptCookiesIfVisible();
  }

  async expectProceedToCheckoutHidden(): Promise<void> {
    await expect(this.proceedToCheckout).toHaveCount(0);
  }

  async expectDrawerNotEmpty(): Promise<void> {
    await expect(this.drawer.getByText(/your cart is empty/i)).toHaveCount(0);
    await expect(this.drawerCheckout).toBeVisible();
  }

  async checkoutFromDrawer(): Promise<void> {
    await this.drawerCheckout.click();
    await this.waitForPageLoad();
    await this.acceptCookiesIfVisible();
    await this.expectPathname(AppRoutes.Checkout);
  }
}
