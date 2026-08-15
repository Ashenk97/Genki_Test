import { AppRoutes } from '@constants/routes';
import { SOCIAL_URLS } from '@constants/urls';
import type {
  FooterLink,
  FooterSocialLink,
  HeaderUtilityLink,
  NavCategory,
  NavDestination,
  PageMeta,
} from '@models/navigation.types';

export const LOGIN_PAGE: PageMeta = {
  path: AppRoutes.Login,
  heading: /customer login/i,
};

export const REGISTER_PAGE: PageMeta = {
  path: AppRoutes.Register,
  heading: /customer register/i,
};

export const FORGOT_PASSWORD_PAGE: PageMeta = {
  path: AppRoutes.ForgotPassword,
  heading: /forgot password/i,
};

export const RESET_PASSWORD_PAGE: PageMeta = {
  path: AppRoutes.ResetPassword,
  heading: /reset password/i,
};

export const CART_PAGE = {
  path: AppRoutes.Cart,
  heading: /^cart$/i,
  emptyMessage: /no items found in cart/i,
} as const;

export const WISHLIST_PAGE: PageMeta = {
  path: AppRoutes.Wishlist,
  heading: /wishlist/i,
};

export const CHECKOUT_PAGE = {
  path: AppRoutes.Checkout,
  heading: /^checkout$/i,
  successPath: AppRoutes.OrderSuccess,
} as const;

export const ACCOUNT_PAGES = {
  dashboard: { path: AppRoutes.AccountDashboard, heading: /^dashboard$/i },
  orders: { path: AppRoutes.AccountOrders, heading: /^orders$/i },
  loyalty: { path: AppRoutes.AccountLoyalty, heading: /^loyalty$/i },
  address: { path: AppRoutes.AccountAddress, heading: /^address$/i },
  accountDetails: { path: AppRoutes.AccountDetails, heading: /^account details$/i },
  rewards: { path: AppRoutes.Rewards, heading: /^rewards$/i },
} as const;

export const MAIN_NAV_TOP_LEVEL: readonly NavDestination[] = [
  { name: 'Men', path: AppRoutes.CollectionMen, heading: /^Men's Wear$/i },
  { name: 'Women', path: AppRoutes.CollectionWomen, heading: /^Women's Wear$/i },
  { name: 'Collections', path: AppRoutes.Collection, heading: /^Collections$/i },
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
  { name: 'phone', href: SOCIAL_URLS.phoneTel },
  { name: 'whatsapp', href: SOCIAL_URLS.whatsapp, target: '_blank' },
  { name: 'facebook', href: SOCIAL_URLS.facebook, target: '_blank' },
  { name: 'instagram', href: SOCIAL_URLS.instagram, target: '_blank' },
];

export const FOOTER_INFO_LINKS: readonly FooterLink[] = [
  { name: 'About us', path: AppRoutes.AboutUs, heading: /about|ゲンキ|genki/i },
  { name: 'Contact', path: `${AppRoutes.AboutUs}#contact`, heading: /about|connect|contact/i },
  { name: 'Privacy Policy', path: AppRoutes.PrivacyPolicy, heading: /privacy/i },
  { name: 'Terms and Conditions', path: AppRoutes.TermsAndConditions, heading: /terms/i },
];

export const FOOTER_USEFUL_LINKS: readonly FooterLink[] = [
  { name: 'Returns', path: AppRoutes.ReturnPolicy, heading: /return/i },
  { name: 'Shipping & Delivery', path: AppRoutes.ShippingPolicy, heading: /shipping|delivery/i },
  { name: 'Size guide', path: AppRoutes.SizeGuide, heading: /size/i },
  { name: 'FAQs', path: AppRoutes.Faq, heading: /f\.?a\.?q/i },
];

export const FOOTER_CMS_LINKS: readonly FooterLink[] = [
  ...FOOTER_INFO_LINKS.filter((link) => link.name !== 'Contact'),
  ...FOOTER_USEFUL_LINKS,
];

export const FOOTER_SOCIAL_LINKS: readonly FooterSocialLink[] = [
  { name: 'Facebook', href: SOCIAL_URLS.facebook, target: '_blank' },
  { name: 'Instagram', href: SOCIAL_URLS.instagram },
  { name: 'TikTok', href: SOCIAL_URLS.tiktok, target: '_blank' },
  { name: 'WhatsApp', href: SOCIAL_URLS.whatsapp },
];
