import { HEADER_UTILITY_LINKS } from '@data/navigation.data';
import { test } from '@fixtures/test-fixtures';

test.describe('Desktop top bar', () => {
  test.beforeEach(async ({ header }) => {
    await header.openHome();
  });

  test('should display phone, WhatsApp, and social links', async ({ header }) => {
    await test.step('Verify top bar visibility', async () => {
      await header.expectTopBarVisible();
    });
  });

  for (const link of HEADER_UTILITY_LINKS) {
    test(`should expose the ${link.name} header link`, async ({ header }) => {
      await test.step(`Verify ${link.name} href`, async () => {
        await header.expectUtilityHref(link.name, link.href, link.target);
      });
    });
  }
});
