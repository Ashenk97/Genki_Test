import { AppRoutes } from '@constants/routes';
import {
  FOOTER_CMS_LINKS,
  FOOTER_SOCIAL_LINKS,
} from '@data/navigation.data';
import { test } from '@fixtures/test-fixtures';

test.describe('Footer info useful links and social', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  for (const link of FOOTER_CMS_LINKS) {
    test(`should open ${link.name} from the footer`, async ({ footer }) => {
      await test.step(`Open footer link ${link.name}`, async () => {
        await footer.openFooterLink(link.name);
        await footer.expectCmsPage(link.path, link.heading);
      });
    });
  }

  test('should open Contact from the footer', async ({ footer }) => {
    await test.step('Open Contact hash link', async () => {
      await footer.openFooterLink('Contact');
      await footer.expectContactHash();
    });
  });

  test('should open Exchange promo to return policy', async ({ footer }) => {
    await test.step('Open Exchange promo', async () => {
      await footer.openExchangePromo();
      await footer.expectCmsPage(AppRoutes.ReturnPolicy, /return/i);
    });
  });

  for (const social of FOOTER_SOCIAL_LINKS) {
    test(`should expose footer ${social.name} link`, async ({ footer }) => {
      await test.step(`Verify ${social.name} social href`, async () => {
        await footer.expectSocialHref(social.name, social.href, social.target);
      });
    });
  }
});
