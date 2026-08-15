import { Locator, Page, expect } from '@playwright/test';
import { ACCOUNT_DASHBOARD_PAGE } from '../fixtures/test-data';
import { BasePage } from './BasePage';

export class AccountDashboardPage extends BasePage {
  readonly heading: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: ACCOUNT_DASHBOARD_PAGE.heading });
  }

  async expectLoaded(displayName: string, email: string): Promise<void> {
    await expect(this.page).toHaveURL(
      (url) => url.pathname.replace(/\/$/, '') === ACCOUNT_DASHBOARD_PAGE.path,
    );
    await expect(this.heading).toBeVisible();
    await expect(this.page.getByText(new RegExp(`hello,?\\s*${displayName}`, 'i'))).toBeVisible();
    await expect(this.page.getByText(email)).toBeVisible();
  }
}
