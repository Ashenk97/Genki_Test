import { AppRoutes } from '@constants/routes';

export const PRODUCT_DATA = {
  defaultSize: 'M',
  samplePath: AppRoutes.SampleProduct,
  sampleNamePattern: /berserk/i,
} as const;

export const SEARCH_QUERIES = {
  valid: 'Berserk',
  invalid: 'xyznonexistentproduct123',
} as const;

export const NEWSLETTER_DATA = {
  invalidEmail: 'not-an-email',
  uniqueValidEmail: (): string => `newsletter-${Date.now()}@example.com`,
} as const;
