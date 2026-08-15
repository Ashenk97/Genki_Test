import { test as base } from '@playwright/test';
import { AccountDashboardPage } from '../pages/AccountDashboardPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CollectionPage } from '../pages/CollectionPage';
import { Footer } from '../pages/Footer';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { Header } from '../pages/Header';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { PayHereCheckout } from '../pages/PayHereCheckout';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { RegisterPage } from '../pages/RegisterPage';
import { ResetPasswordPage } from '../pages/ResetPasswordPage';
import { RewardsPage } from '../pages/RewardsPage';
import { WishlistPage } from '../pages/WishlistPage';

type GenkiFixtures = {
  homePage: HomePage;
  productDetailsPage: ProductDetailsPage;
  header: Header;
  collectionPage: CollectionPage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  forgotPasswordPage: ForgotPasswordPage;
  resetPasswordPage: ResetPasswordPage;
  accountDashboardPage: AccountDashboardPage;
  footer: Footer;
  cartPage: CartPage;
  wishlistPage: WishlistPage;
  checkoutPage: CheckoutPage;
  rewardsPage: RewardsPage;
  payHereCheckout: PayHereCheckout;
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

  resetPasswordPage: async ({ page }, use) => {
    await use(new ResetPasswordPage(page));
  },

  accountDashboardPage: async ({ page }, use) => {
    await use(new AccountDashboardPage(page));
  },

  footer: async ({ page }, use) => {
    await use(new Footer(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  wishlistPage: async ({ page }, use) => {
    await use(new WishlistPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  rewardsPage: async ({ page }, use) => {
    await use(new RewardsPage(page));
  },

  payHereCheckout: async ({ page }, use) => {
    await use(new PayHereCheckout(page));
  },
});

export { expect } from '@playwright/test';
