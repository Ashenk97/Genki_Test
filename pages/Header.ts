import { Locator, Page, expect } from '@playwright/test';
import { AUTH_MESSAGES } from '../fixtures/test-data';
import { BasePage } from './BasePage';

/**
 * Site-wide header: logo, desktop primary nav, and utility icons.
 * Dropdowns are CSS hover menus (`.sub-menu`) inside `nav.header-content__navigation`.
 */
export class Header extends BasePage {
  readonly root: Locator;
  readonly desktopNav: Locator;
  readonly logoLink: Locator;
  readonly navMen: Locator;
  readonly navWomen: Locator;
  readonly navCollections: Locator;

  // ── Top bar (phone, WhatsApp, login, socials) ─────────────────────────────
  readonly phoneLink: Locator;
  readonly whatsappLink: Locator;
  readonly loginLink: Locator;
  readonly accountLink: Locator;
  readonly logoutLink: Locator;
  readonly facebookLink: Locator;
  readonly instagramLink: Locator;

  // ── Header icons ──────────────────────────────────────────────────────────
  readonly cartButton: Locator;
  readonly wishlistButton: Locator;

  constructor(page: Page) {
    super(page);

    this.root = page.locator('header.topbar-shadow');
    this.desktopNav = page.locator('nav.header-content__navigation');
    this.logoLink = this.root.locator('.header-content__logo').getByRole('link');

    this.navMen = this.desktopNav.getByRole('link', { name: /^men$/i });
    this.navWomen = this.desktopNav.getByRole('link', { name: /^women$/i });
    this.navCollections = this.desktopNav.getByRole('link', { name: /^collections$/i });

    this.phoneLink = this.root.getByRole('link', { name: /\(070\)\s*100\s*29\s*22/ });
    this.whatsappLink = this.root.getByRole('link', { name: /^whatsapp$/i });
    this.loginLink = this.root.getByRole('link', { name: /^login$/i });
    this.accountLink = this.root.getByRole('link', { name: /signed in as/i });
    this.logoutLink = this.root.getByRole('button', { name: /^logout$/i });
    this.facebookLink = this.root.getByRole('link', { name: /facebook/i });
    this.instagramLink = this.root.getByRole('link', { name: /instagram/i });

    this.cartButton = this.root.getByRole('button', { name: /open cart/i });
    this.wishlistButton = this.root.getByRole('button', { name: /open wishlist/i });
  }

  /** Open the homepage so the header is in its default desktop state. */
  async openHome(): Promise<void> {
    await this.goto('/');
    await this.waitForNetworkIdle();
  }

  /** Assert the top-bar utility links are present (phone, WhatsApp, socials). */
  async expectTopBarVisible(): Promise<void> {
    await expect(this.phoneLink).toBeVisible();
    await expect(this.whatsappLink).toBeVisible();
    await expect(this.facebookLink).toBeVisible();
    await expect(this.instagramLink).toBeVisible();
  }

  /** Assert the logo, primary nav items, and header icons are present. */
  async expectPrimaryNavVisible(): Promise<void> {
    await expect(this.logoLink).toBeVisible();
    await expect(this.navMen).toBeVisible();
    await expect(this.navWomen).toBeVisible();
    await expect(this.navCollections).toBeVisible();
    await expect(this.cartButton).toBeVisible();
    await expect(this.wishlistButton).toBeVisible();
  }

  /**
   * Assert an external / protocol header link without navigating away.
   * WhatsApp and socials open in a new tab (`target=_blank`); the phone uses `tel:`.
   */
  async expectUtilityHref(link: Locator, href: string, target?: string): Promise<void> {
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', href);
    if (target) {
      await expect(link).toHaveAttribute('target', target);
    }
  }

  /** Open the login page from the top-bar Login link. */
  async clickLogin(): Promise<void> {
    await this.loginLink.click();
    await this.waitForPageLoad();
    await this.acceptCookiesIfVisible();
  }

  /** Scroll the header back into view so top-bar links are in the viewport. */
  async revealHeader(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, 0));
    await this.root.scrollIntoViewIfNeeded();
  }

  /** Assert the guest header shows Login and hides account controls. */
  async expectLoggedOut(): Promise<void> {
    await this.revealHeader();
    await expect(this.loginLink).toBeVisible();
    await expect(this.logoutLink).toHaveCount(0);
    await expect(this.accountLink).toHaveCount(0);
  }

  /** Assert the signed-in header replaced Login with Logout and the account greeting. */
  async expectLoggedIn(displayName?: string): Promise<void> {
    await this.revealHeader();
    await expect(this.logoutLink).toBeVisible();
    await expect(this.accountLink).toBeVisible();
    await expect(this.loginLink).toHaveCount(0);
    if (displayName) {
      await expect(this.accountLink).toContainText(displayName);
    }
  }

  /** Open the signed-in account dashboard from the header greeting. */
  async openAccountDashboard(): Promise<void> {
    await this.revealHeader();
    await this.accountLink.click();
    await this.waitForPageLoad();
    await this.acceptCookiesIfVisible();
  }

  /** Sign out from the header, assert the logout toast, then wait for Login. */
  async clickLogout(): Promise<void> {
    await this.logoutLink.click();
    await this.expectToast(AUTH_MESSAGES.logoutToast, 'success');
    await expect(this.loginLink).toBeVisible({ timeout: 15_000 });
    await this.acceptCookiesIfVisible();
  }

  /** Map a utility-link key from test data to its header locator. */
  utilityLink(name: string): Locator {
    const links: Record<string, Locator> = {
      phone: this.phoneLink,
      whatsapp: this.whatsappLink,
      facebook: this.facebookLink,
      instagram: this.instagramLink,
      login: this.loginLink,
    };

    const link = links[name];
    if (!link) {
      throw new Error(`Unknown header utility link: ${name}`);
    }
    return link;
  }

  /** Click the brand logo and wait for navigation. */
  async clickLogo(): Promise<void> {
    await this.logoLink.click();
    await this.waitForPageLoad();
    await this.acceptCookiesIfVisible();
  }

  /** Click a top-level desktop nav item (Men, Women, or Collections). */
  async clickTopLevel(name: string): Promise<void> {
    await this.topLevelLink(name).click();
    await this.waitForPageLoad();
    await this.acceptCookiesIfVisible();
  }

  /**
   * Hover a top-level item to reveal its dropdown, then click a child link.
   * Child names like "Hoodies" exist under both Men and Women, so the click
   * is scoped to that category's submenu.
   */
  async clickDropdownItem(category: string, itemName: string): Promise<void> {
    const menuItem = this.categoryItem(category);
    await this.topLevelLink(category).hover();

    // Dropdown labels include a trailing arrow (e.g. "View All Women's →").
    const dropdownLink = menuItem.getByRole('link', { name: itemName });

    await expect(dropdownLink).toBeVisible();
    await dropdownLink.click();
    await this.waitForPageLoad();
    await this.acceptCookiesIfVisible();
  }

  /** Open the cart drawer from the header icon. */
  async openCart(): Promise<void> {
    await this.cartButton.click();
  }

  /** Open the wishlist drawer from the header icon. */
  async openWishlist(): Promise<void> {
    await this.wishlistButton.click();
  }

  private topLevelLink(name: string): Locator {
    return this.desktopNav.getByRole('link', { name: new RegExp(`^${escapeRegExp(name)}$`, 'i') });
  }

  /** The listitem that wraps a top-level link and its submenu. */
  private categoryItem(name: string): Locator {
    return this.desktopNav.getByRole('listitem').filter({
      has: this.page.getByRole('link', { name: new RegExp(`^${escapeRegExp(name)}$`, 'i') }),
    });
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
