/**
 * Shared test data constants.
 * Extend this file as new scenarios require structured input.
 */
export const TEST_DATA = {
  baseUrl: 'https://staging.genkiwardrobe.com/',
  searchQueries: {
    valid: 'Berserk',
    invalid: 'xyznonexistentproduct123',
  },
  product: {
    defaultSize: 'M',
  },
} as const;
