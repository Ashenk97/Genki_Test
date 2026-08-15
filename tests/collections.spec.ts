import { MAIN_NAV_DROPDOWNS, MAIN_NAV_TOP_LEVEL } from '../fixtures/test-data';
import { test, expect } from '../fixtures/test-fixtures';

test.describe('Categories and products PLP', () => {
  test('should open Men collection with products', async ({ collectionPage }) => {
    const men = MAIN_NAV_TOP_LEVEL[0];
    await collectionPage.open(men.path);
    await collectionPage.expectLoaded(men.path, men.heading);
    await collectionPage.expectHasProducts();
  });

  test('should open Women collection with products', async ({ collectionPage }) => {
    const women = MAIN_NAV_TOP_LEVEL[1];
    await collectionPage.open(women.path);
    await collectionPage.expectLoaded(women.path, women.heading);
    await collectionPage.expectHasProducts();
  });

  for (const item of MAIN_NAV_DROPDOWNS.find((c) => c.category === 'Collections')!.items) {
    test(`should open ${item.name} theme collection`, async ({ collectionPage }) => {
      await collectionPage.open(item.path);
      await collectionPage.expectLoaded(item.path, item.heading);
    });
  }

  test('should open the first valid product from Men PLP', async ({ collectionPage }) => {
    const men = MAIN_NAV_TOP_LEVEL[0];
    await collectionPage.open(men.path);
    await collectionPage.expectHasProducts();
    const pdp = await collectionPage.openFirstProduct();
    await expect(pdp.page).toHaveURL(/\/products\//);
    await expect(pdp.productTitle).toBeVisible();
  });
});
