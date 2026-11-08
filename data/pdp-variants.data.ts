export const PRODUCT_SIZES = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] as const;
export type ProductSize = (typeof PRODUCT_SIZES)[number];
export type ProductColor = 'black' | 'white';

export const SIZE_RADIO_PATTERN = /^(XXS|XS|S|M|L|XL|XXL|XXXL)$/i;

export const PRODUCT_PRICE = {
  unit: 3490,
  xxs: 3390,
  xxxl: 3590,
} as const;

/** Active catalog: acid-washed oversized tees. Some designs omit colors. */
export const ACID_WASH_SIZES = ['S', 'M', 'L', 'XL', 'XXL'] as const;
export type AcidWashSize = (typeof ACID_WASH_SIZES)[number];

export const ACID_WASH_COLORS = ['Black', 'Ash', 'Brown', 'Pink', 'Purple'] as const;
export type AcidWashColor = (typeof ACID_WASH_COLORS)[number];

export const ACID_WASH_PRICE = {
  unit: 4490,
} as const;

export const ProductTypeTag = {
  AcidWash: '@acid-wash',
  BlackWhite: '@black-white',
  Anime: '@anime',
} as const;

export const BLACK_WHITE_OFFLINE =
  'Black and white tees are offline until they are relaunched';

export const ACID_WASH_FULL_PRODUCT = {
  path: '/products/akaza-acid-wash-oversized-tee',
  name: /akaza acid wash oversized tee/i,
  colors: ACID_WASH_COLORS,
  sizes: ACID_WASH_SIZES,
  defaultColor: 'Black' as const,
  defaultSize: 'M' as const,
  unitPrice: ACID_WASH_PRICE.unit,
};

/** Shinobu does not offer Brown or Purple. */
export const ACID_WASH_PARTIAL_PRODUCT = {
  path: '/products/shinobu-acid-wash-oversized-tee',
  name: /shinobu acid wash oversized tee/i,
  colors: ['Black', 'Ash', 'Pink'] as const,
  absentColors: ['Brown', 'Purple'] as const,
  sizes: ACID_WASH_SIZES,
  defaultColor: 'Black' as const,
  defaultSize: 'M' as const,
  unitPrice: ACID_WASH_PRICE.unit,
};

export const SIZE_CHART_EXCESS_SIZE = 'XXXXL';

export const FREE_DELIVERY = {
  threshold: 5000,
  qtyBelow: 1,
  qtyAbove: 2,
  remainingBelow: 5000 - ACID_WASH_PRICE.unit,
  remainingMessage: /you're\s+lkr\s*510\s+away from free delivery/i,
  unlockedMessage: /free delivery unlocked on this order/i,
  pdpNote: /free delivery on orders over lkr\s*5,?000/i,
} as const;

export const WHITE_ONLY_PRODUCT = {
  path: '/products/test-white-only',
  name: /test product w only/i,
  lockedColor: 'white' as const,
  colors: ['white'] as const,
  sizes: PRODUCT_SIZES,
  unitPrice: PRODUCT_PRICE.unit,
};

export const BLACK_ONLY_PRODUCT = {
  path: '/products/test-black-only',
  name: /test product b only/i,
  lockedColor: 'black' as const,
  colors: ['black'] as const,
  sizes: PRODUCT_SIZES,
  unitPrice: PRODUCT_PRICE.unit,
};

export const DUAL_COLOR_PRODUCT = {
  path: '/products/test-black-white-both',
  name: /test product b and w/i,
  colors: ['black', 'white'] as const,
  sizes: PRODUCT_SIZES,
  requiresColor: true,
  unitPrice: PRODUCT_PRICE.unit,
};

export const OUT_OF_STOCK_PRODUCT = {
  path: '/products/berserk-oversized-tee',
  name: /berserk/i,
  size: 'XS',
};

export const DUAL_COLOR_SIZE_MATRIX: Array<{ color: ProductColor; size: ProductSize }> =
  DUAL_COLOR_PRODUCT.colors.flatMap((color) =>
    PRODUCT_SIZES.map((size) => ({ color, size })),
  );
