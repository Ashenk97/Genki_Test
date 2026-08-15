import { MAIN_NAV_DROPDOWNS, MAIN_NAV_TOP_LEVEL } from '../fixtures/test-data';
import { test, expect } from '../fixtures/test-fixtures';

test.describe('Desktop main navigation', () => {
  test.beforeEach(async ({ header }) => {
    await header.openHome();
  });

  test('should display the logo, primary nav, cart, and wishlist', async ({ header }) => {
    await header.expectPrimaryNavVisible();
  });

  test('should return to the homepage when the logo is clicked', async ({ header, homePage }) => {
    await header.clickTopLevel('Men');
    await header.clickLogo();
    await homePage.expectLoaded();
  });

  for (const item of MAIN_NAV_TOP_LEVEL) {
    test(`should navigate to ${item.name} from the top-level nav`, async ({
      header,
      collectionPage,
    }) => {
      await header.clickTopLevel(item.name);
      await collectionPage.expectLoaded(item.path, item.heading);
      if (item.path !== '/collection') {
        await collectionPage.expectHasProducts();
      }
      await header.expectLoggedOut();
    });
  }

  for (const { category, items } of MAIN_NAV_DROPDOWNS) {
    for (const item of items) {
      test(`should open ${category} → ${item.name}`, async ({ header, collectionPage }) => {
        await header.clickDropdownItem(category, item.name);
        await collectionPage.expectLoaded(item.path, item.heading);
      });
    }
  }

  test('should open the cart drawer from the header icon', async ({ header }) => {
    await header.openCart();
    await expect(header.page.getByRole('heading', { name: /^cart$/i })).toBeVisible();
    await expect(header.page.getByText(/your cart is empty/i)).toBeVisible();
  });

  test('should open the wishlist drawer from the header icon', async ({ header }) => {
    await header.openWishlist();
    await expect(header.page.getByRole('heading', { name: /^wishlist$/i })).toBeVisible();
    await expect(header.page.getByText(/your wishlist is empty/i)).toBeVisible();
  });
});
