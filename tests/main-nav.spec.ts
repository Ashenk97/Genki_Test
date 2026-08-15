import { MAIN_NAV_DROPDOWNS, MAIN_NAV_TOP_LEVEL } from '@data/navigation.data';
import { AppRoutes } from '@constants/routes';
import { test } from '@fixtures/test-fixtures';

test.describe('Desktop main navigation', () => {
  test.beforeEach(async ({ header }) => {
    await header.openHome();
  });

  test('should display the logo, primary nav, cart, and wishlist', async ({ header }) => {
    await test.step('Verify primary navigation chrome', async () => {
      await header.expectPrimaryNavVisible();
    });
  });

  test('should return to the homepage when the logo is clicked', async ({ header, homePage }) => {
    await test.step('Navigate away and return via logo', async () => {
      await header.clickTopLevel('Men');
      await header.clickLogo();
      await homePage.expectLoaded();
    });
  });

  for (const item of MAIN_NAV_TOP_LEVEL) {
    test(`should navigate to ${item.name} from the top-level nav`, async ({
      header,
      collectionPage,
    }) => {
      await test.step(`Open ${item.name} collection`, async () => {
        await header.clickTopLevel(item.name);
        await collectionPage.expectLoaded(item.path, item.heading);
        if (item.path !== AppRoutes.Collection) {
          await collectionPage.expectHasProducts();
        }
        await header.expectLoggedOut();
      });
    });
  }

  for (const { category, items } of MAIN_NAV_DROPDOWNS) {
    for (const item of items) {
      test(`should open ${category} → ${item.name}`, async ({ header, collectionPage }) => {
        await test.step(`Open ${category} → ${item.name}`, async () => {
          await header.clickDropdownItem(category, item.name);
          await collectionPage.expectLoaded(item.path, item.heading);
        });
      });
    }
  }

  test('should open the cart drawer from the header icon', async ({ header }) => {
    await test.step('Open empty cart drawer', async () => {
      await header.openCart();
      await header.expectEmptyCartDrawer();
    });
  });

  test('should open the wishlist drawer from the header icon', async ({ header }) => {
    await test.step('Open empty wishlist drawer', async () => {
      await header.openWishlist();
      await header.expectEmptyWishlistDrawer();
    });
  });
});
