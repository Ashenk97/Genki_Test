import { requiredEnv } from './env';
import { getEnvConfig } from './environments';

export type NavDestination = {
  name: string;
  path: string;
  heading: RegExp;
};

export type NavCategory = {
  category: string;
  items: readonly NavDestination[];
};

export type HeaderUtilityLink = {
  name: string;
  href: string;
  target?: string;
};

export const TEST_DATA = {
  get baseUrl() {
    return getEnvConfig().baseURL;
  },
  searchQueries: {
    valid: 'Berserk',
    invalid: 'xyznonexistentproduct123',
  },
  product: {
    defaultSize: 'M',
    samplePath: '/products/berserk-oversized-tee',
  },
  auth: {
    get email() {
      return requiredEnv('GENKI_TEST_EMAIL');
    },
    get password() {
      return requiredEnv('GENKI_TEST_PASSWORD');
    },
    get displayName() {
      return process.env.GENKI_TEST_DISPLAY_NAME?.trim() || 'Ashen';
    },
    invalidEmail: 'not-an-email',
    unknownEmail: 'nobody-exists-xyz@example.com',
    wrongPassword: 'WrongPassword123!',
    weakPassword: 'short',
  },
  checkout: {
    get firstName() {
      return process.env.GENKI_CHECKOUT_FIRST_NAME?.trim() || 'Auto';
    },
    get lastName() {
      return process.env.GENKI_CHECKOUT_LAST_NAME?.trim() || 'Tester';
    },
    get phone() {
      return process.env.GENKI_CHECKOUT_PHONE?.trim() || '0771234567';
    },
    get addressOne() {
      return process.env.GENKI_CHECKOUT_ADDRESS?.trim() || '123 Test Street';
    },
    get addressTwo() {
      return process.env.GENKI_CHECKOUT_ADDRESS_2?.trim() || 'Colombo 07';
    },
    get city() {
      return process.env.GENKI_CHECKOUT_CITY?.trim() || 'Colombo';
    },
  },
  payhere: {
    get cardExpiry() {
      return process.env.GENKI_PAYHERE_CARD_EXPIRY?.trim() || '12/28';
    },
    get cardCvv() {
      return process.env.GENKI_PAYHERE_CARD_CVV?.trim() || '123';
    },
    get cardHolder() {
      return process.env.GENKI_PAYHERE_CARD_HOLDER?.trim() || 'Auto Tester';
    },
    /** Official PayHere sandbox cards — https://support.payhere.lk/api-&-mobile-sdk/payhere-checkout */
    cards: {
      success: {
        visa: { brand: 'VISA' as const, number: '4916217501611292' },
        master: { brand: 'MASTER' as const, number: '5307732125531191' },
        amex: { brand: 'AMEX' as const, number: '346781005510225' },
      },
      insufficientFunds: {
        visa: { brand: 'VISA' as const, number: '4024007194349121' },
        master: { brand: 'MASTER' as const, number: '5459051433777487' },
        amex: { brand: 'AMEX' as const, number: '370787711978928' },
      },
      limitExceeded: {
        visa: { brand: 'VISA' as const, number: '4929119799365646' },
        master: { brand: 'MASTER' as const, number: '5491182243178283' },
        amex: { brand: 'AMEX' as const, number: '340701811823469' },
      },
      doNotHonor: {
        visa: { brand: 'VISA' as const, number: '4929768900837248' },
        master: { brand: 'MASTER' as const, number: '5388172137367973' },
        amex: { brand: 'AMEX' as const, number: '374664175202812' },
      },
      networkError: {
        visa: { brand: 'VISA' as const, number: '4024007120869333' },
        master: { brand: 'MASTER' as const, number: '5237980565185003' },
        amex: { brand: 'AMEX' as const, number: '373433500205887' },
      },
    },
  },
  newsletter: {
    validEmail: `newsletter-${Date.now()}@example.com`,
    invalidEmail: 'not-an-email',
  },
} as const;

export type FooterLink = {
  name: string;
  path: string;
  heading: RegExp;
};

export type FooterSocialLink = {
  name: string;
  href: string;
  target?: string;
};

export const FOOTER_INFO_LINKS: readonly FooterLink[] = [
  { name: 'About us', path: '/about-us', heading: /about/i },
  { name: 'Contact', path: '/about-us#contact', heading: /about|connect|contact/i },
  { name: 'Privacy Policy', path: '/privacy-policy', heading: /privacy/i },
  { name: 'Terms and Conditions', path: '/terms-and-conditions', heading: /terms/i },
];

export const FOOTER_USEFUL_LINKS: readonly FooterLink[] = [
  { name: 'Returns', path: '/return-policy', heading: /return/i },
  { name: 'Shipping & Delivery', path: '/shipping-policy', heading: /shipping|delivery/i },
  { name: 'Size guide', path: '/size-guide', heading: /size/i },
  { name: 'FAQs', path: '/faq', heading: /f\.?a\.?q/i },
];

export const FOOTER_SOCIAL_LINKS: readonly FooterSocialLink[] = [
  { name: 'Facebook', href: 'https://facebook.com/genkiwardrobelk', target: '_blank' },
  { name: 'Instagram', href: 'https://instagram.com/genkiwardrobelk' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@genkiwardrobelk', target: '_blank' },
  { name: 'WhatsApp', href: 'https://wa.me/94701002922' },
];

export const ACCOUNT_PAGES = {
  dashboard: { path: '/my-account/dashboard', heading: /^dashboard$/i },
  orders: { path: '/my-account/orders', heading: /^orders$/i },
  loyalty: { path: '/my-account/loyalty', heading: /^loyalty$/i },
  address: { path: '/my-account/address', heading: /^address$/i },
  accountDetails: { path: '/my-account/account-details', heading: /^account details$/i },
  rewards: { path: '/rewards', heading: /^rewards$/i },
} as const;

export const CART_PAGE = {
  path: '/cart',
  heading: /^cart$/i,
  emptyMessage: /no items found in cart/i,
} as const;

export const WISHLIST_PAGE = {
  path: '/wishlist',
  heading: /wishlist/i,
} as const;

export const CHECKOUT_PAGE = {
  path: '/checkout',
  heading: /^checkout$/i,
  successPath: '/order-success',
} as const;

export const MAIN_NAV_TOP_LEVEL: readonly NavDestination[] = [
  { name: 'Men', path: '/collection/men', heading: /^Men's Wear$/i },
  { name: 'Women', path: '/collection/women', heading: /^Women's Wear$/i },
  { name: 'Collections', path: '/collection', heading: /^Collections$/i },
];

export const MAIN_NAV_DROPDOWNS: readonly NavCategory[] = [
  {
    category: 'Men',
    items: [
      { name: "View All Men's", path: '/collection/men', heading: /^Men's Wear$/i },
      { name: 'Hoodies', path: '/collection/men/hoodies', heading: /^Men's Hoodies$/i },
      {
        name: 'Oversized T-Shirts',
        path: '/collection/men/oversized-tees',
        heading: /^Men's Oversized T-Shirts$/i,
      },
      {
        name: 'Regular T-Shirts',
        path: '/collection/men/regular-tees',
        heading: /^Men's Regular T-Shirts$/i,
      },
    ],
  },
  {
    category: 'Women',
    items: [
      { name: "View All Women's", path: '/collection/women', heading: /^Women's Wear$/i },
      { name: 'Hoodies', path: '/collection/women/hoodies', heading: /^Women's Hoodies$/i },
      {
        name: 'Oversized T-Shirts',
        path: '/collection/women/oversized-tees',
        heading: /^Women's Oversized T-Shirts$/i,
      },
      {
        name: 'Regular T-Shirts',
        path: '/collection/women/regular-tees',
        heading: /^Women's Regular T-Shirts$/i,
      },
    ],
  },
  {
    category: 'Collections',
    items: [
      { name: 'Anime', path: '/collection/anime', heading: /^Anime Collection$/i },
      { name: 'Originals', path: '/collection/originals', heading: /^Originals Collection$/i },
      { name: 'Culture', path: '/collection/culture', heading: /^Culture Collection$/i },
      { name: 'JDM', path: '/collection/jdm', heading: /^JDM Collection$/i },
      { name: 'Kawaii', path: '/collection/kawaii', heading: /^Kawaii Collection$/i },
    ],
  },
];

export const HEADER_UTILITY_LINKS: readonly HeaderUtilityLink[] = [
  { name: 'phone', href: 'tel:0701002922' },
  { name: 'whatsapp', href: 'https://wa.me/94701002922', target: '_blank' },
  {
    name: 'facebook',
    href: 'https://facebook.com/genkiwardrobelk',
    target: '_blank',
  },
  {
    name: 'instagram',
    href: 'https://instagram.com/genkiwardrobelk',
    target: '_blank',
  },
];

export const LOGIN_PAGE = {
  path: '/login',
  heading: /customer login/i,
} as const;

export const REGISTER_PAGE = {
  path: '/register',
  heading: /customer register/i,
} as const;

export const FORGOT_PASSWORD_PAGE = {
  path: '/forgot-password',
  heading: /forgot password/i,
} as const;

export const ACCOUNT_DASHBOARD_PAGE = {
  path: '/my-account/dashboard',
  heading: /^dashboard$/i,
} as const;

export const AUTH_MESSAGES = {
  emailRequired: /email is required/i,
  passwordRequired: /password is required/i,
  invalidCredentials: /invalid email or password\. please try again/i,
  validEmail: /please enter a valid email address/i,
  accountTaken: /already taken/i,
  passwordLength: /use 8 or more characters/i,
  passwordUppercase: /include an uppercase letter/i,
  passwordNumber: /include a number/i,
  passwordSpecial: /include a special character/i,
  loginSuccessToast: /login successful! welcome back/i,
  logoutToast: /you have been logged out/i,
  passwordResetSent: /password reset email has been sent/i,
  addedToCartToast: /added to cart/i,
} as const;
