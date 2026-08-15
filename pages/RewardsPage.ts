import { Locator, Page, expect } from '@playwright/test';
import { ACCOUNT_PAGES } from '../fixtures/test-data';
import { BasePage } from './BasePage';

export class RewardsPage extends BasePage {
  readonly heading: Locator;
  readonly usablePoints: Locator;
  readonly catalogHeading: Locator;
  readonly addButtons: Locator;
  readonly includedSection: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: ACCOUNT_PAGES.rewards.heading });
    this.usablePoints = page.getByText(/usable points/i);
    this.catalogHeading = page.getByText(/rewards catalog/i);
    this.addButtons = page.getByRole('button', { name: /^add$/i });
    this.includedSection = page.getByText(/included with your next order/i);
  }

  async open(): Promise<void> {
    await this.goto(ACCOUNT_PAGES.rewards.path);
    await this.waitForNetworkIdle();
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(
      (url) => url.pathname.replace(/\/$/, '') === ACCOUNT_PAGES.rewards.path,
    );
    await expect(this.heading).toBeVisible();
    await expect(this.usablePoints).toBeVisible();
    await expect(this.catalogHeading).toBeVisible();
    await expect(this.addButtons.first()).toBeVisible();
  }

  async addFirstAffordableReward(): Promise<void> {
    await this.addButtons.first().click();
    await this.page.waitForTimeout(1000);
  }

  async expectRewardQueued(): Promise<void> {
    await expect(this.includedSection).toBeVisible();
    await expect(this.page.getByText(/sticker|keytag|reward/i).first()).toBeVisible();
  }
}
