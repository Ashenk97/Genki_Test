export const PRODUCT_SIZES = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] as const;
export type ProductSize = (typeof PRODUCT_SIZES)[number];
export type ProductColor = 'black' | 'white';

export const SIZE_RADIO_PATTERN = /^(XXS|XS|S|M|L|XL|XXL|XXXL)$/i;

export const PRODUCT_PRICE = {
  unit: 3490,
} as const;

export const FREE_DELIVERY = {
  threshold: 5000,
  qtyBelow: 1,
  qtyAbove: 2,
  remainingBelow: PRODUCT_PRICE.unit * 1 < 5000 ? 5000 - PRODUCT_PRICE.unit : 0,
  remainingMessage: /you're\s+lkr\s*1,?510\s+away from free delivery/i,
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
