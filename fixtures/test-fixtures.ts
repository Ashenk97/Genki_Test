import { test as base } from '@playwright/test';
import { AccountDashboardPage } from '../pages/AccountDashboardPage';
import { CollectionPage } from '../pages/CollectionPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { Header } from '../pages/Header';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { RegisterPage } from '../pages/RegisterPage';

/**
 * Extended test fixture that injects pre-instantiated page objects.
 * Import `test` and `expect` from this module instead of `@playwright/test`
 * to access POM instances directly in specs.
 */
type GenkiFixtures = {
  homePage: HomePage;
  productDetailsPage: ProductDetailsPage;
  header: Header;
  collectionPage: CollectionPage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  forgotPasswordPage: ForgotPasswordPage;
  accountDashboardPage: AccountDashboardPage;
};

export const test = base.extend<GenkiFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  productDetailsPage: async ({ page }, use) => {
    await use(new ProductDetailsPage(page));
  },

  header: async ({ page }, use) => {
    await use(new Header(page));
  },

  collectionPage: async ({ page }, use) => {
    await use(new CollectionPage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },

  forgotPasswordPage: async ({ page }, use) => {
    await use(new ForgotPasswordPage(page));
  },

  accountDashboardPage: async ({ page }, use) => {
    await use(new AccountDashboardPage(page));
  },
});

export { expect } from '@playwright/test';
