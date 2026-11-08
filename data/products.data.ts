import {
  ACID_WASH_FULL_PRODUCT,
  ACID_WASH_PARTIAL_PRODUCT,
  ACID_WASH_SIZES,
} from './pdp-variants.data';

export const PRODUCT_DATA = {
  defaultSize: ACID_WASH_FULL_PRODUCT.defaultSize,
  samplePath: ACID_WASH_FULL_PRODUCT.path,
  sampleNamePattern: ACID_WASH_FULL_PRODUCT.name,
  sampleColor: ACID_WASH_FULL_PRODUCT.defaultColor,
  /** Second in-stock product for multi-line cart scenarios (fewer colors) */
  secondaryPath: ACID_WASH_PARTIAL_PRODUCT.path,
  secondaryNamePattern: ACID_WASH_PARTIAL_PRODUCT.name,
  secondaryColor: ACID_WASH_PARTIAL_PRODUCT.defaultColor,
  secondarySize: ACID_WASH_PARTIAL_PRODUCT.defaultSize,
  /** Color-variant PDP (requires color before sizes) */
  colorVariantPath: ACID_WASH_FULL_PRODUCT.path,
  colorVariantNamePattern: ACID_WASH_FULL_PRODUCT.name,
  colorVariantColor: ACID_WASH_FULL_PRODUCT.defaultColor,
  colorVariantSize: ACID_WASH_FULL_PRODUCT.defaultSize,
  colorVariantColors: ACID_WASH_FULL_PRODUCT.colors,
  sizes: ACID_WASH_SIZES,
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
