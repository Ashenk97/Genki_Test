import { getEnvConfig } from '@constants/environments';
import { AUTH_VALIDATION, getAuthCredentials } from './auth.data';
import { getGuestBillingDetails } from './checkout.data';
import { getPayHereCardDefaults, PAYHERE_SANDBOX_CARDS } from './payhere.data';
import { NEWSLETTER_DATA, PRODUCT_DATA, SEARCH_QUERIES } from './products.data';

/**
 * Facade for commonly accessed runtime test data.
 * Prefer importing domain-specific modules (@data/auth.data, etc.) in new code.
 */
export const TEST_DATA = {
  get baseUrl(): string {
    return getEnvConfig().baseURL;
  },
  searchQueries: SEARCH_QUERIES,
  product: PRODUCT_DATA,
  get auth() {
    return {
      ...getAuthCredentials(),
      ...AUTH_VALIDATION,
    };
  },
  get checkout() {
    return getGuestBillingDetails();
  },
  get payhere() {
    return {
      ...getPayHereCardDefaults(),
      cards: PAYHERE_SANDBOX_CARDS,
    };
  },
  newsletter: NEWSLETTER_DATA,
} as const;

export {
  ACCOUNT_PAGES,
  CART_PAGE,
  CHECKOUT_PAGE,
  FOOTER_CMS_LINKS,
  FOOTER_INFO_LINKS,
  FOOTER_SOCIAL_LINKS,
  FOOTER_USEFUL_LINKS,
  FORGOT_PASSWORD_PAGE,
  HEADER_UTILITY_LINKS,
  LOGIN_PAGE,
  MAIN_NAV_DROPDOWNS,
  MAIN_NAV_TOP_LEVEL,
  REGISTER_PAGE,
  RESET_PASSWORD_PAGE,
  WISHLIST_PAGE,
} from './navigation.data';

export { AUTH_VALIDATION, getAuthCredentials } from './auth.data';
export { getGuestBillingDetails, guestCheckoutEmail } from './checkout.data';
export { getPayHereCardDefaults, PAYHERE_SANDBOX_CARDS } from './payhere.data';
export { NEWSLETTER_DATA, PRODUCT_DATA, SEARCH_QUERIES, EMPTY_THEME_COLLECTIONS } from './products.data';
