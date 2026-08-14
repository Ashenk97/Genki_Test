import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';

/**
 * Extended test fixture that injects pre-instantiated page objects.
 * Import `test` and `expect` from this module instead of `@playwright/test`
 * to access POM instances directly in specs.
 */
type GenkiFixtures = {
  homePage: HomePage;
  productDetailsPage: ProductDetailsPage;
};

export const test = base.extend<GenkiFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  productDetailsPage: async ({ page }, use) => {
    await use(new ProductDetailsPage(page));
  },
});

export { expect } from '@playwright/test';
