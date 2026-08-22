import {
  BLACK_ONLY_PRODUCT,
  DUAL_COLOR_PRODUCT,
  PRODUCT_SIZES,
  WHITE_ONLY_PRODUCT,
} from './pdp-variants.data';

export const PRODUCT_DATA = {
  defaultSize: 'M',
  samplePath: WHITE_ONLY_PRODUCT.path,
  sampleNamePattern: WHITE_ONLY_PRODUCT.name,
  sampleColor: WHITE_ONLY_PRODUCT.lockedColor,
  /** Second in-stock sized product for multi-line cart scenarios */
  secondaryPath: BLACK_ONLY_PRODUCT.path,
  secondaryNamePattern: BLACK_ONLY_PRODUCT.name,
  secondaryColor: BLACK_ONLY_PRODUCT.lockedColor,
  secondarySize: 'L',
  /** Color-variant PDP (requires color before sizes) */
  colorVariantPath: DUAL_COLOR_PRODUCT.path,
  colorVariantNamePattern: DUAL_COLOR_PRODUCT.name,
  colorVariantColor: 'black',
  colorVariantSize: 'M',
  colorVariantColors: DUAL_COLOR_PRODUCT.colors,
  sizes: PRODUCT_SIZES,
  /** Canonical lowercase product slug */
  canonicalSlugPath: '/products/jjk',
  /** Non-canonical casing 404s; slugs are lowercase-only */
  nonCanonicalSlugPath: '/products/JJK',
} as const;

export const EMPTY_THEME_COLLECTIONS = [
  { name: 'Originals', path: '/collection/originals', heading: /^Originals Collection$/i },
  { name: 'Culture', path: '/collection/culture', heading: /^Culture Collection$/i },
  { name: 'JDM', path: '/collection/jdm', heading: /^JDM Collection$/i },
  { name: 'Kawaii', path: '/collection/kawaii', heading: /^Kawaii Collection$/i },
] as const;

export const SEARCH_QUERIES = {
  valid: 'Berserk',
  invalid: 'xyznonexistentproduct123',
} as const;

export const NEWSLETTER_DATA = {
  invalidEmail: 'not-an-email',
  uniqueValidEmail: (): string => `newsletter-${Date.now()}@example.com`,
} as const;
