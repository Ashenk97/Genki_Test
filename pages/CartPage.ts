import { Locator, Page, expect } from '@playwright/test';
import { CART_PAGE } from '@data/navigation.data';
import { AppRoutes } from '@constants/routes';
import { Timeouts } from '@constants/timeouts';
import { lkrAmountPattern } from '@helpers/string';
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
    this.productRows = page.getByRole('table').first().locator('tbody tr').filter({
      has: page.locator('a[href^="/products/"]:not([href*="undefined"])'),
    });
    this.increaseQtyButton = this.productRows.first().getByRole('button', { name: /^\+$/ })
      .or(this.productRows.first().locator('button.inc.qtybutton'))
      .or(this.productRows.first().locator('button.qtybutton').filter({ hasText: /^\+$/ }));
    this.decreaseQtyButton = this.productRows.first().getByRole('button', { name: /^−$|^-$/ })
      .or(this.productRows.first().locator('button.dec.qtybutton'))
      .or(this.productRows.first().locator('button.qtybutton').filter({ hasText: /^-$/ }));
    this.removeButtons = this.productRows.locator('td:last-child button');
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

  async getItemCount(): Promise<number> {
    return this.productRows.count();
  }

  async expectLineContains(text: string | RegExp): Promise<void> {
    await expect(this.productRows.first().getByText(text)).toBeVisible();
  }

  async expectLineWithAttributes(attrs: {
    name?: string | RegExp;
    color?: string;
    size?: string;
  }): Promise<void> {
    let row = this.productRows;
    if (attrs.name) {
      row = row.filter({ hasText: attrs.name });
    }
    if (attrs.color) {
      row = row.filter({ hasText: `Color: ${attrs.color}` });
    }
    if (attrs.size) {
      row = row.filter({ hasText: `Size: ${attrs.size}` });
    }
    await expect(row.first()).toBeVisible();
  }

  async expectFreeDeliveryRemaining(): Promise<void> {
    await expect(this.page.locator('.free-shipping-progress__message').first()).toHaveText(
      /you're\s+lkr\s*1,?510\s+away from free delivery/i,
    );
  }

  async expectFreeDeliveryUnlocked(): Promise<void> {
    await expect(this.page.locator('.free-shipping-progress__message').first()).toHaveText(
      /free delivery unlocked on this order/i,
    );
  }

  async expectSubtotal(amount: number): Promise<void> {
    await expect(
      this.page.getByText(lkrAmountPattern(amount)).filter({ visible: true }).first(),
    ).toBeVisible();
  }

  async expectLineAttributesReadOnly(): Promise<void> {
    await expect(this.productRows.locator('select, [role="combobox"]')).toHaveCount(0);
    await expect(
      this.productRows.getByRole('button', { name: /edit (size|color)|change (size|color)/i }),
    ).toHaveCount(0);
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
      this.productRows.first().locator('input.cart-plus-minus-box'),
    ).toHaveValue(String(quantity));
  }

  async removeFirstLine(): Promise<void> {
    const backendCleared = (await this.isSignedIn())
      ? this.waitForEmptyCartSync()
      : Promise.resolve();
    await this.productRows.first().locator('td:last-child button').click();
    await this.expectEmpty();
    await this.waitUntilPersistedCartEmpty();
    await backendCleared;
  }

  async persistedCartItemCount(): Promise<number> {
    return this.page.evaluate(() => {
      const raw = localStorage.getItem('persist:genki');
      if (!raw) {
        return 0;
      }
      try {
        const root = JSON.parse(raw) as { cart?: string | { cartItems?: unknown[] } };
        const cart = typeof root.cart === 'string' ? JSON.parse(root.cart) : root.cart;
        return Array.isArray(cart?.cartItems) ? cart.cartItems.length : 0;
      } catch {
        return -1;
      }
    });
  }

  async waitUntilPersistedCartEmpty(): Promise<void> {
    await expect
      .poll(async () => this.persistedCartItemCount(), { timeout: Timeouts.MediumUi })
      .toBe(0);
  }

  private async isSignedIn(): Promise<boolean> {
    return this.page.getByRole('button', { name: /^logout$/i }).isVisible().catch(() => false);
  }

  private waitForEmptyCartSync() {
    return this.page.waitForResponse(
      (res) => {
        if (!res.url().includes('/api/cart/create-cart-with-items')) {
          return false;
        }
        if (res.request().method() !== 'POST' || !res.ok()) {
          return false;
        }
        return /"items"\s*:\s*\[\s*\]/.test(res.request().postData() ?? '');
      },
      { timeout: Timeouts.MediumUi },
    );
  }

  async waitUntilReady(): Promise<void> {
    await this.expectLoaded();
    await this.page.waitForLoadState('networkidle').catch(() => undefined);
    await expect
      .poll(async () => {
        const empty = await this.emptyMessage.isVisible().catch(() => false);
        const rows = await this.productRows.count();
        return empty || rows > 0;
      }, { timeout: Timeouts.MediumUi })
      .toBe(true);
  }

  private async isEmpty(): Promise<boolean> {
    return (
      (await this.emptyMessage.isVisible().catch(() => false)) &&
      (await this.productRows.count()) === 0
    );
  }

  async clearCart(): Promise<void> {
    for (let attempt = 0; attempt < 4; attempt += 1) {
      await this.waitUntilReady();
      const alreadyEmpty = await this.isEmpty();
      const backendCleared =
        alreadyEmpty || !(await this.isSignedIn())
          ? Promise.resolve()
          : this.waitForEmptyCartSync();
      for (let i = 0; i < 15; i += 1) {
        if (await this.isEmpty()) {
          break;
        }
        const count = await this.productRows.count();
        if (count === 0) {
          break;
        }
        await this.productRows.first().locator('td:last-child button').click();
        await expect
          .poll(async () => this.productRows.count(), { timeout: 8_000 })
          .toBeLessThan(count);
      }
      if (await this.isEmpty()) {
        await this.waitUntilPersistedCartEmpty();
        await backendCleared;
      }
      await this.page.reload();
      await this.waitForPageLoad();
      await this.acceptCookiesIfVisible();
      await this.waitUntilReady();
      if (await this.isEmpty()) {
        return;
      }
    }
    await this.expectEmpty();
    await expect(this.productRows).toHaveCount(0);
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
