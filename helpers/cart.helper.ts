import type { ProductDetailsPage } from '@pages/ProductDetailsPage';
import { PRODUCT_DATA } from '@data/products.data';

/**
 * Stateless cart setup helper — keeps specs free of product-selection details.
 */
export async function addProductToCart(
  productDetailsPage: ProductDetailsPage,
  path: string,
): Promise<void> {
  await productDetailsPage.open(path);
  await productDetailsPage.selectFirstAvailableSize();
  await productDetailsPage.addToCart();
  await productDetailsPage.expectAddedToCart();
}

export async function addSampleProductToCart(
  productDetailsPage: ProductDetailsPage,
): Promise<void> {
  await addProductToCart(productDetailsPage, PRODUCT_DATA.samplePath);
}

export async function addSecondaryProductToCart(
  productDetailsPage: ProductDetailsPage,
): Promise<void> {
  await addProductToCart(productDetailsPage, PRODUCT_DATA.secondaryPath);
}
