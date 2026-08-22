import { Locator, Page, expect } from '@playwright/test';
import { ACCOUNT_PAGES } from '@data/navigation.data';
import { BasePage } from '@pages/BasePage';

export class RewardsPage extends BasePage {
  private readonly heading: Locator;
  private readonly usablePoints: Locator;
  private readonly catalogHeading: Locator;
  private readonly addButtons: Locator;
  private readonly includedSection: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: ACCOUNT_PAGES.rewards.heading });
    this.usablePoints = page.getByText(/usable points/i);
    this.catalogHeading = page.getByText(/rewards catalog/i);
    this.addButtons = page.getByRole('button', { name: /^add$/i });
    this.includedSection = page.getByText(/included with your next order/i);
  }

  async open(): Promise<this> {
    await this.goto(ACCOUNT_PAGES.rewards.path);
    return this;
  }

  async expectLoaded(): Promise<void> {
    await this.expectPathname(ACCOUNT_PAGES.rewards.path);
    await expect(this.heading).toBeVisible();
    await expect(this.usablePoints).toBeVisible();
    await expect(this.catalogHeading).toBeVisible();
    await expect(this.addButtons.first()).toBeVisible();
  }

  async addFirstAffordableReward(): Promise<this> {
    await this.addButtons.first().click();
    await expect(this.includedSection).toBeVisible({ timeout: 10_000 });
    return this;
  }

  async expectRewardQueued(): Promise<void> {
    await expect(this.includedSection).toBeVisible();
    await expect(this.page.getByText(/sticker|keytag|reward/i).first()).toBeVisible();
  }

  async getUsablePoints(): Promise<number> {
    const body = await this.page.locator('body').innerText();
    const normalized = body.replace(/,/g, '');
    const match =
      normalized.match(/usable points[^\d]*(\d+)/i) ||
      normalized.match(/(\d+)\s*points available/i);
    return match ? Number(match[1]) : 0;
  }

  async expectUsablePointsAtMost(maxPoints: number): Promise<void> {
    await expect
      .poll(async () => this.getUsablePoints(), { timeout: 15_000 })
      .toBeLessThanOrEqual(maxPoints);
  }

  async expectUsablePointsGreaterThan(minPoints: number): Promise<void> {
    await expect
      .poll(async () => this.getUsablePoints(), { timeout: 20_000 })
      .toBeGreaterThan(minPoints);
  }

  async proceedToCheckoutFromQueue(): Promise<void> {
    await this.page.getByRole('link', { name: /proceed to checkout/i }).click();
    await this.waitForPageLoad();
    await this.acceptCookiesIfVisible();
  }
}
