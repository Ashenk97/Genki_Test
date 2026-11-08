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
): Promise<string> {
  await productDetailsPage.open(path);
  if (options.color) {
    await productDetailsPage.selectColor(options.color);
  }
  const size =
    options.size ??
    (await productDetailsPage.bestInStockSize(options.color, options.quantity ?? 1));
  await productDetailsPage.selectSize(size);
  if (options.quantity && options.quantity > 1) {
    await productDetailsPage.setQuantity(options.quantity);
  }
  await productDetailsPage.addToCart();
  await productDetailsPage.expectAddedToCart();
  return size;
}

export async function addSampleProductToCart(
  productDetailsPage: ProductDetailsPage,
  options: AddToCartOptions = {},
): Promise<string> {
  return addProductToCart(productDetailsPage, PRODUCT_DATA.samplePath, {
    color: PRODUCT_DATA.sampleColor,
    ...options,
  });
}

export async function addSecondaryProductToCart(
  productDetailsPage: ProductDetailsPage,
  options: AddToCartOptions = {},
): Promise<string> {
  return addProductToCart(productDetailsPage, PRODUCT_DATA.secondaryPath, {
    color: PRODUCT_DATA.secondaryColor,
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
