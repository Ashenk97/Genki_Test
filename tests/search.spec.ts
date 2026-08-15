import { SEARCH_QUERIES } from '@data/products.data';
import { test } from '@fixtures/test-fixtures';

test.describe('Product search', () => {
  test('should open the search overlay and accept a product query', async ({ homePage }) => {
    await test.step('Open homepage search overlay', async () => {
      await homePage.open();
      await homePage.openSearch();
    });
    await test.step('Fill a known product query', async () => {
      await homePage.fillSearch(SEARCH_QUERIES.valid);
      await homePage.expectSearchQuery(SEARCH_QUERIES.valid);
      await homePage.expectFeaturedProductMatching(/berserk/i);
    });
    await test.step('Close search overlay', async () => {
      await homePage.closeSearch();
    });
  });

  test('should accept an unmatched search query without leaving the homepage', async ({
    homePage,
  }) => {
    await test.step('Open search and submit invalid query', async () => {
      await homePage.open();
      await homePage.openSearch();
      await homePage.fillSearch(SEARCH_QUERIES.invalid);
      await homePage.expectSearchQuery(SEARCH_QUERIES.invalid);
      await homePage.submitSearch();
    });
    await test.step('Remain on homepage with featured catalog', async () => {
      await homePage.expectLoaded();
      await homePage.expectFeaturedProductMatching(/berserk|kaidou|gojo/i);
    });
  });
});
