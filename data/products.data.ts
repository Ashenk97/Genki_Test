import { AppRoutes } from '@constants/routes';

export const PRODUCT_DATA = {
  /** Currently the only in-stock size on the sample Berserk tee */
  defaultSize: 'XS',
  samplePath: AppRoutes.SampleProduct,
  sampleNamePattern: /berserk/i,
  /** Second in-stock sized product for multi-line cart scenarios */
  secondaryPath: '/products/JJK',
  secondaryNamePattern: /gojo/i,
  secondarySize: 'M',
  /** Color-variant PDP (requires color before sizes) */
  colorVariantPath: '/products/nishikigoi-oversized-tee',
  colorVariantNamePattern: /nishikigoi/i,
  colorVariantColor: 'black',
  colorVariantSize: 'M',
  /** Case-sensitive slug pair used for routing regression */
  caseSensitivePath: '/products/JJK',
  caseSensitiveLowerPath: '/products/jjk',
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
