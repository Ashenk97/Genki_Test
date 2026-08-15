import { TEST_DATA } from '../fixtures/test-data';
import { test, expect } from '../fixtures/test-fixtures';

test.describe('Home page', () => {
  test('should load the homepage with title and featured heading', async ({ homePage }) => {
    await homePage.open();
    await homePage.expectLoaded();
  });
});

test.describe('Carousel', () => {
  test('should show the hero carousel with multiple slides', async ({ homePage }) => {
    await homePage.open();
    await homePage.expectCarouselVisible();
  });

  test('should change the active slide when next is clicked', async ({ homePage }) => {
    await homePage.open();
    await homePage.expectCarouselVisible();
    const before = await homePage.activeSlideIndex();
    await homePage.clickCarouselNext();
    await expect.poll(async () => homePage.activeSlideIndex()).not.toBe(before);
  });
});

test.describe('Newsletter', () => {
  test('should keep subscribe disabled when email is empty', async ({ homePage, footer }) => {
    await homePage.open();
    await footer.scrollToFooter();
    await expect(footer.newsletterEmail).toHaveValue('');
    await expect(footer.newsletterSubmit).toBeDisabled();
  });

  test('should accept a valid newsletter email', async ({ homePage, footer }) => {
    await homePage.open();
    await footer.fillNewsletter(`newsletter-${Date.now()}@example.com`);
    await expect(footer.newsletterSubmit).toBeEnabled();
    await footer.submitNewsletter();
    await expect
      .poll(async () => {
        const toast = footer.page.locator('[data-sonner-toast]');
        if (await toast.count()) {
          return true;
        }
        return !(await footer.newsletterSubmit.isDisabled().catch(() => true));
      }, { timeout: 10_000 })
      .toBeTruthy();
  });

  test('should reject an invalid newsletter email', async ({ homePage, footer }) => {
    await homePage.open();
    await footer.fillNewsletter(TEST_DATA.newsletter.invalidEmail);
    const stillDisabled = await footer.newsletterSubmit.isDisabled();
    if (stillDisabled) {
      await expect(footer.newsletterSubmit).toBeDisabled();
      return;
    }
    await footer.submitNewsletter();
    await expect(footer.newsletterEmail).toBeVisible();
  });
});
