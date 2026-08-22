import type { ProductDetailsPage } from '@pages/ProductDetailsPage';
import { PRODUCT_DATA } from '@data/products.data';
import { DUAL_COLOR_PRODUCT } from '@data/pdp-variants.data';

export type AddToCartOptions = {
  color?: string;
  size?: string;
  quantity?: number;
};

/**
 * Stateless cart setup helper — keeps specs free of product-selection details.
 */
export async function addProductToCart(
  productDetailsPage: ProductDetailsPage,
  path: string,
  options: AddToCartOptions = {},
): Promise<void> {
  await productDetailsPage.open(path);
  if (options.color) {
    await productDetailsPage.selectColor(options.color);
  }
  await productDetailsPage.selectSize(options.size ?? PRODUCT_DATA.defaultSize);
  if (options.quantity && options.quantity > 1) {
    await productDetailsPage.setQuantity(options.quantity);
  }
  await productDetailsPage.addToCart();
  await productDetailsPage.expectAddedToCart();
}

export async function addSampleProductToCart(
  productDetailsPage: ProductDetailsPage,
  options: AddToCartOptions = {},
): Promise<void> {
  await addProductToCart(productDetailsPage, PRODUCT_DATA.samplePath, options);
}

export async function addSecondaryProductToCart(
  productDetailsPage: ProductDetailsPage,
  options: AddToCartOptions = {},
): Promise<void> {
  await addProductToCart(productDetailsPage, PRODUCT_DATA.secondaryPath, {
    size: PRODUCT_DATA.secondarySize,
    ...options,
  });
}

export async function addColorVariantToCart(
  productDetailsPage: ProductDetailsPage,
  options: AddToCartOptions = {},
): Promise<void> {
  await addProductToCart(productDetailsPage, DUAL_COLOR_PRODUCT.path, {
    color: options.color ?? PRODUCT_DATA.colorVariantColor,
    size: options.size ?? PRODUCT_DATA.colorVariantSize,
    quantity: options.quantity,
  });
}
