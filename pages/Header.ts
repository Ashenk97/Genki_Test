import { Locator, Page, expect } from '@playwright/test';
import { AUTH_MESSAGES } from '@constants/messages';
import { ToastType } from '@constants/payment';
import { escapeRegExp } from '@helpers/string';
import { AppRoutes } from '@constants/routes';
import { BasePage } from '@pages/BasePage';

export class Header extends BasePage {
  private readonly root: Locator;
  private readonly desktopNav: Locator;
  private readonly logoLink: Locator;
  private readonly navMen: Locator;
  private readonly navWomen: Locator;
  private readonly navCollections: Locator;
  private readonly phoneLink: Locator;
  private readonly whatsappLink: Locator;
  private readonly loginLink: Locator;
  private readonly accountLink: Locator;
  private readonly logoutLink: Locator;
  private readonly facebookLink: Locator;
  private readonly instagramLink: Locator;
  private readonly cartButton: Locator;
  private readonly wishlistButton: Locator;
  private readonly mobileMenuButton: Locator;
  private readonly mobileMenu: Locator;

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
    this.mobileMenuButton = this.root.getByRole('button', { name: /open menu/i });
    this.mobileMenu = page.locator('.offcanvas-mobile-menu');
  }

  get navMenLink(): Locator {
    return this.navMen;
  }

  get navCollectionsLink(): Locator {
    return this.navCollections;
  }

  get logo(): Locator {
    return this.logoLink;
  }

  async openHome(): Promise<this> {
    await this.goto(AppRoutes.Home);
    return this;
  }

  async expectTopBarVisible(): Promise<void> {
    await expect(this.phoneLink).toBeVisible();
    await expect(this.whatsappLink).toBeVisible();
    await expect(this.facebookLink).toBeVisible();
    await expect(this.instagramLink).toBeVisible();
  }

  async expectPrimaryNavVisible(): Promise<void> {
    await expect(this.logoLink).toBeVisible();
    await expect(this.navMen).toBeVisible();
    await expect(this.navWomen).toBeVisible();
    await expect(this.navCollections).toBeVisible();
    await expect(this.cartButton).toBeVisible();
    await expect(this.wishlistButton).toBeVisible();
  }

  async expectUtilityHref(name: string, href: string, target?: string): Promise<void> {
    const link = this.utilityLink(name);
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', href);
    if (target) {
      await expect(link).toHaveAttribute('target', target);
    }
  }

  async clickLogin(): Promise<void> {
    await this.loginLink.click();
    await this.waitForPageLoad();
    await this.acceptCookiesIfVisible();
  }

  async revealHeader(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, 0));
    await this.root.scrollIntoViewIfNeeded();
  }

  async expectLoggedOut(): Promise<void> {
    await this.revealHeader();
    await expect(this.loginLink).toBeVisible();
    await expect(this.logoutLink).toHaveCount(0);
    await expect(this.accountLink).toHaveCount(0);
  }

  async expectLoggedIn(displayName?: string): Promise<void> {
    await this.revealHeader();
    await expect(this.logoutLink).toBeVisible();
    await expect(this.accountLink).toBeVisible();
    await expect(this.loginLink).toHaveCount(0);
    if (displayName) {
      await expect(this.accountLink).toContainText(displayName);
    }
  }

  async openAccountDashboard(): Promise<void> {
    await this.revealHeader();
    await this.accountLink.click();
    await this.waitForPageLoad();
    await this.acceptCookiesIfVisible();
  }

  async clickLogout(): Promise<void> {
    await this.logoutLink.click();
    await this.expectToast(AUTH_MESSAGES.logoutToast, ToastType.Success);
    await expect(this.loginLink).toBeVisible({ timeout: 15_000 });
    await this.acceptCookiesIfVisible();
  }

  async reloadPage(): Promise<void> {
    await this.page.reload();
    await this.waitForPageLoad();
  }

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

  async clickLogo(): Promise<void> {
    await this.logoLink.click();
    await this.waitForPageLoad();
    await this.acceptCookiesIfVisible();
  }

  async clickTopLevel(name: string): Promise<void> {
    await this.topLevelLink(name).click();
    await this.waitForPageLoad();
    await this.acceptCookiesIfVisible();
  }

  async clickDropdownItem(category: string, itemName: string): Promise<void> {
    const menuItem = this.categoryItem(category);
    await this.topLevelLink(category).hover();

    const dropdownLink = menuItem.getByRole('link', { name: itemName });

    await expect(dropdownLink).toBeVisible();
    await dropdownLink.click();
    await this.waitForPageLoad();
    await this.acceptCookiesIfVisible();
  }

  async openCart(): Promise<void> {
    await this.cartButton.click();
  }

  async openWishlist(): Promise<void> {
    await this.wishlistButton.click();
  }

  async expectEmptyCartDrawer(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: /^cart$/i })).toBeVisible();
    await expect(this.page.getByText(AUTH_MESSAGES.drawerCartEmpty)).toBeVisible();
  }

  async expectEmptyWishlistDrawer(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: /^wishlist$/i })).toBeVisible();
    await expect(this.page.getByText(AUTH_MESSAGES.wishlistEmpty)).toBeVisible();
  }

  async expectCartBadgeHasItems(): Promise<void> {
    await expect(this.cartButton).toHaveAttribute('aria-label', /open cart,\s*\d+\s*item/i);
  }

  async expectCartBadgeEmpty(): Promise<void> {
    await expect(this.cartButton).toHaveAttribute('aria-label', /^open cart$/i);
  }

  async openMobileMenu(): Promise<void> {
    await this.mobileMenuButton.click();
    await expect(this.mobileMenu).toHaveClass(/active/);
  }

  async expectMobileMenuVisible(): Promise<void> {
    await expect(this.mobileMenu).toHaveClass(/active/);
    await expect(
      this.mobileMenu.getByRole('link', { name: /^men$/i }).or(
        this.mobileMenu.getByText(/^men$/i),
      ).first(),
    ).toBeVisible();
  }

  async clickMobileNav(name: string): Promise<void> {
    const link = this.mobileMenu.getByRole('link', {
      name: new RegExp(`^${escapeRegExp(name)}$`, 'i'),
    }).first();
    await link.click();
    await this.waitForPageLoad();
    await this.acceptCookiesIfVisible();
  }

  private topLevelLink(name: string): Locator {
    return this.desktopNav.getByRole('link', {
      name: new RegExp(`^${escapeRegExp(name)}$`, 'i'),
    });
  }

  private categoryItem(name: string): Locator {
    return this.desktopNav.getByRole('listitem').filter({
      has: this.page.getByRole('link', {
        name: new RegExp(`^${escapeRegExp(name)}$`, 'i'),
      }),
    });
  }
}
