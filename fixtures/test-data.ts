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
