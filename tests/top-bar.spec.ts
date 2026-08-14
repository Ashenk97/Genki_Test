import { HEADER_UTILITY_LINKS } from '../fixtures/test-data';
import { test } from '../fixtures/test-fixtures';

test.describe('Desktop top bar', () => {
  test.beforeEach(async ({ header }) => {
    await header.openHome();
  });

  test('should display phone, WhatsApp, and social links', async ({ header }) => {
    await header.expectTopBarVisible();
  });

  for (const link of HEADER_UTILITY_LINKS) {
    test(`should expose the ${link.name} header link`, async ({ header }) => {
      await header.expectUtilityHref(header.utilityLink(link.name), link.href, link.target);
    });
  }
});
