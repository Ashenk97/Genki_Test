import { test as base } from '@playwright/test';
import {
  SHARED_ACCOUNT_TAG,
  acquireLoggedInAccountLock,
  releaseLoggedInAccountLock,
} from '@helpers/account-lock';
import { AccountDashboardPage } from '@pages/AccountDashboardPage';
import { CartPage } from '@pages/CartPage';
import { CheckoutPage } from '@pages/CheckoutPage';
import { CollectionPage } from '@pages/CollectionPage';
import { Footer } from '@pages/Footer';
import { ForgotPasswordPage } from '@pages/ForgotPasswordPage';
import { Header } from '@pages/Header';
import { HomePage } from '@pages/HomePage';
import { LoginPage } from '@pages/LoginPage';
import { PayHereCheckout } from '@pages/PayHereCheckout';
import { ProductDetailsPage } from '@pages/ProductDetailsPage';
import { RegisterPage } from '@pages/RegisterPage';
import { ResetPasswordPage } from '@pages/ResetPasswordPage';
import { RewardsPage } from '@pages/RewardsPage';
import { WishlistPage } from '@pages/WishlistPage';

export type SharedAccount = {
  resetShop: () => Promise<void>;
  emptyCart: () => Promise<void>;
};

const ACCOUNT_LOCK_TIMEOUT = 25 * 60 * 1000;

export type GenkiFixtures = {
  _sharedAccountLock: void;
  sharedAccount: SharedAccount;
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
  _sharedAccountLock: [
    async ({}, use, testInfo): Promise<void> => {
      const needsLock = testInfo.tags.includes(SHARED_ACCOUNT_TAG);
      if (needsLock) {
        await acquireLoggedInAccountLock();
      }
      try {
        await use();
      } finally {
        if (needsLock) {
          releaseLoggedInAccountLock();
        }
      }
    },
    { auto: true, timeout: ACCOUNT_LOCK_TIMEOUT },
  ],

  sharedAccount: [
    async ({ cartPage, rewardsPage }, use): Promise<void> => {
      await acquireLoggedInAccountLock();
      try {
        await use({
          resetShop: async () => {
            await rewardsPage.open();
            await rewardsPage.expectLoaded();
            await rewardsPage.clearQueuedRewards();
            await cartPage.open();
            await cartPage.clearCart();
          },
          emptyCart: async () => {
            await cartPage.open();
            await cartPage.clearCart();
          },
        });
      } finally {
        releaseLoggedInAccountLock();
      }
    },
    { timeout: ACCOUNT_LOCK_TIMEOUT },
  ],

  homePage: async ({ page }, use): Promise<void> => {
    await use(new HomePage(page));
  },

  productDetailsPage: async ({ page }, use): Promise<void> => {
    await use(new ProductDetailsPage(page));
  },

  header: async ({ page }, use): Promise<void> => {
    await use(new Header(page));
  },

  collectionPage: async ({ page }, use): Promise<void> => {
    await use(new CollectionPage(page));
  },

  loginPage: async ({ page }, use): Promise<void> => {
    await use(new LoginPage(page));
  },

  registerPage: async ({ page }, use): Promise<void> => {
    await use(new RegisterPage(page));
  },

  forgotPasswordPage: async ({ page }, use): Promise<void> => {
    await use(new ForgotPasswordPage(page));
  },

  resetPasswordPage: async ({ page }, use): Promise<void> => {
    await use(new ResetPasswordPage(page));
  },

  accountDashboardPage: async ({ page }, use): Promise<void> => {
    await use(new AccountDashboardPage(page));
  },

  footer: async ({ page }, use): Promise<void> => {
    await use(new Footer(page));
  },

  cartPage: async ({ page }, use): Promise<void> => {
    await use(new CartPage(page));
  },

  wishlistPage: async ({ page }, use): Promise<void> => {
    await use(new WishlistPage(page));
  },

  checkoutPage: async ({ page }, use): Promise<void> => {
    await use(new CheckoutPage(page));
  },

  rewardsPage: async ({ page }, use): Promise<void> => {
    await use(new RewardsPage(page));
  },

  payHereCheckout: async ({ page }, use): Promise<void> => {
    await use(new PayHereCheckout(page));
  },
});

export { expect } from '@playwright/test';
