import { test } from '@fixtures/test-fixtures';

test.describe('Product search', () => {
  test('should not expose a search control on desktop', async ({ homePage }) => {
    await test.step('Open homepage', async () => {
      await homePage.open();
      await homePage.expectLoaded();
    });
    await test.step('Search is disabled by product requirement', async () => {
      await homePage.expectSearchDisabled();
    });
  });
});
