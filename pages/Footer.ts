import { Locator, Page, expect } from '@playwright/test';
import {
  FOOTER_INFO_LINKS,
  FOOTER_SOCIAL_LINKS,
  FOOTER_USEFUL_LINKS,
} from '../fixtures/test-data';
import { BasePage } from './BasePage';

export class Footer extends BasePage {
  readonly root: Locator;
  readonly infoHeading: Locator;
  readonly usefulLinksHeading: Locator;
  readonly followUsHeading: Locator;
  readonly subscribeHeading: Locator;
  readonly newsletterEmail: Locator;
  readonly newsletterSubmit: Locator;
  readonly exchangePromoLink: Locator;

  constructor(page: Page) {
    super(page);
    this.root = page.locator('footer').or(page.locator('.footer-area, [class*="footer"]')).first();
    this.infoHeading = page.getByRole('heading', { name: /^info$/i });
    this.usefulLinksHeading = page.getByRole('heading', { name: /^useful links$/i });
    this.followUsHeading = page.getByRole('heading', { name: /^follow us/i });
    this.subscribeHeading = page.getByRole('heading', { name: /^subscribe\.?$/i });
    this.newsletterEmail = page.locator('#mc-form-email');
    this.newsletterSubmit = page.getByRole('button', { name: /subscribe to newsletter/i });
    this.exchangePromoLink = page.getByRole('link', { name: /exchange/i });
  }

  async scrollToFooter(): Promise<void> {
    await this.subscribeHeading.scrollIntoViewIfNeeded();
  }

  linkByName(name: string): Locator {
    return this.page.getByRole('link', { name: new RegExp(`^${escapeRegExp(name)}$`, 'i') }).last();
  }

  async openFooterLink(name: string): Promise<void> {
    await this.scrollToFooter();
    await this.linkByName(name).click();
    await this.waitForPageLoad();
    await this.acceptCookiesIfVisible();
  }

  async expectCmsPage(path: string, heading: RegExp): Promise<void> {
    const [pathname, hash] = path.split('#');
    await expect(this.page).toHaveURL((url) => {
      const normalized = url.pathname.replace(/\/$/, '');
      const pathOk = normalized === pathname.replace(/\/$/, '');
      if (!hash) {
        return pathOk;
      }
      return pathOk && url.hash.replace(/^#/, '') === hash;
    });
    await expect(this.page.getByRole('heading').filter({ hasText: heading }).first()).toBeVisible();
  }

  async expectSocialHref(name: string, href: string, target?: string): Promise<void> {
    await this.scrollToFooter();
    const link = this.page
      .getByRole('heading', { name: /^follow us/i })
      .locator('xpath=ancestor::*[self::div or self::section][1]')
      .getByRole('link', { name: new RegExp(`^${escapeRegExp(name)}$`, 'i') })
      .or(this.linkByName(name));
    await expect(link.first()).toBeVisible();
    await expect(link.first()).toHaveAttribute('href', href);
    if (target) {
      await expect(link.first()).toHaveAttribute('target', target);
    }
  }

  async fillNewsletter(email: string): Promise<void> {
    await this.scrollToFooter();
    await this.newsletterEmail.fill(email);
  }

  async submitNewsletter(): Promise<void> {
    await this.newsletterSubmit.click();
  }

  get infoLinks() {
    return FOOTER_INFO_LINKS;
  }

  get usefulLinks() {
    return FOOTER_USEFUL_LINKS;
  }

  get socialLinks() {
    return FOOTER_SOCIAL_LINKS;
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
