import type { ProductDetailsPage } from '@pages/ProductDetailsPage';
import { PRODUCT_DATA } from '@data/products.data';

/**
 * Stateless cart setup helper — keeps specs free of product-selection details.
 */
export async function addSampleProductToCart(
  productDetailsPage: ProductDetailsPage,
): Promise<void> {
  await productDetailsPage.open(PRODUCT_DATA.samplePath);
  await productDetailsPage.selectFirstAvailableSize();
  await productDetailsPage.addToCart();
  await productDetailsPage.expectAddedToCart();
}
