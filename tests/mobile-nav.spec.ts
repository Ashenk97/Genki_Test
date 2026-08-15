import { MAIN_NAV_TOP_LEVEL } from '@data/navigation.data';
import { SEARCH_QUERIES } from '@data/products.data';
import { test } from '@fixtures/test-fixtures';

test.describe('Mobile navigation', () => {
  test('should open the hamburger menu with primary destinations', async ({
    header,
    homePage,
  }) => {
    await test.step('Open mobile menu', async () => {
      await homePage.open();
      await header.openMobileMenu();
      await header.expectMobileMenuVisible();
    });
  });

  test('should navigate to Men from the mobile menu', async ({
    header,
    homePage,
    collectionPage,
  }) => {
    const men = MAIN_NAV_TOP_LEVEL[0];
    await test.step('Open Men via hamburger menu', async () => {
      await homePage.open();
      await header.openMobileMenu();
      await header.clickMobileNav('Men');
      await collectionPage.expectLoaded(men.path, men.heading);
      await collectionPage.expectHasProducts();
    });
  });

  test('should expose search in the mobile menu', async ({ header, homePage }) => {
    await test.step('Open menu and type a search query', async () => {
      await homePage.open();
      await header.openMobileMenu();
      await homePage.expectMobileSearchVisible();
      await homePage.fillMobileSearch(SEARCH_QUERIES.valid);
      await homePage.expectMobileSearchQuery(SEARCH_QUERIES.valid);
    });
  });
});
