import { Locator, Page, expect } from '@playwright/test';
import { AppRoutes } from '@constants/routes';
import { Timeouts } from '@constants/timeouts';
import { escapeRegExp, normalizePathname } from '@helpers/string';
import { BasePage } from '@pages/BasePage';

export class Footer extends BasePage {
  private readonly subscribeHeading: Locator;
  private readonly newsletterEmail: Locator;
  private readonly newsletterSubmit: Locator;
  private readonly exchangePromoLink: Locator;

  constructor(page: Page) {
    super(page);
    this.subscribeHeading = page.getByRole('heading', { name: /^subscribe\.?$/i });
    this.newsletterEmail = page.locator('#mc-form-email');
    this.newsletterSubmit = page.getByRole('button', { name: /subscribe to newsletter/i });
    this.exchangePromoLink = page.getByRole('link', { name: /exchange/i });
  }

  async scrollToFooter(): Promise<this> {
    await this.subscribeHeading.scrollIntoViewIfNeeded();
    return this;
  }

  private linkByName(name: string): Locator {
    return this.page
      .getByRole('link', { name: new RegExp(`^${escapeRegExp(name)}$`, 'i') })
      .last();
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
      const pathOk = normalizePathname(url.pathname) === normalizePathname(pathname);
      if (!hash) {
        return pathOk;
      }
      return pathOk && url.hash.replace(/^#/, '') === hash;
    });
    await expect(
      this.page.getByRole('heading').filter({ hasText: heading }).first(),
    ).toBeVisible();
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

  async fillNewsletter(email: string): Promise<this> {
    await this.scrollToFooter();
    await this.newsletterEmail.fill(email);
    return this;
  }

  async submitNewsletter(): Promise<this> {
    await this.newsletterSubmit.click();
    return this;
  }

  async expectNewsletterEmptyAndDisabled(): Promise<void> {
    await this.scrollToFooter();
    await expect(this.newsletterEmail).toHaveValue('');
    await expect(this.newsletterSubmit).toBeDisabled();
  }

  async expectNewsletterSubmitEnabled(): Promise<void> {
    await expect(this.newsletterSubmit).toBeEnabled();
  }

  async expectNewsletterSubmitDisabled(): Promise<void> {
    await expect(this.newsletterSubmit).toBeDisabled();
  }

  async expectNewsletterInteractionCompleted(): Promise<void> {
    await expect
      .poll(
        async () => {
          const toast = this.page.locator('[data-sonner-toast]');
          if (await toast.count()) {
            return true;
          }
          return !(await this.newsletterSubmit.isDisabled().catch(() => true));
        },
        { timeout: Timeouts.ShortUi },
      )
      .toBeTruthy();
  }

  async openExchangePromo(): Promise<void> {
    await this.exchangePromoLink.click();
    await this.waitForPageLoad();
  }

  async expectContactHash(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${AppRoutes.AboutUs}#contact`));
  }

  async expectNewsletterFieldVisible(): Promise<void> {
    await expect(this.newsletterEmail).toBeVisible();
  }

  async isNewsletterSubmitDisabled(): Promise<boolean> {
    return this.newsletterSubmit.isDisabled();
  }
}
