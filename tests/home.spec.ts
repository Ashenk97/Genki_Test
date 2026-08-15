import { NEWSLETTER_DATA } from '@data/products.data';
import { test } from '@fixtures/test-fixtures';

test.describe('Home page', () => {
  test('should load the homepage with title and featured heading', async ({ homePage }) => {
    await test.step('Open homepage', async () => {
      await homePage.open();
      await homePage.expectLoaded();
    });
  });
});

test.describe('Carousel', () => {
  test('should show the hero carousel with multiple slides', async ({ homePage }) => {
    await test.step('Open homepage and verify carousel', async () => {
      await homePage.open();
      await homePage.expectCarouselVisible();
    });
  });

  test('should change the active slide when next is clicked', async ({ homePage }) => {
    await test.step('Advance hero carousel', async () => {
      await homePage.open();
      await homePage.expectCarouselVisible();
      const before = await homePage.activeSlideIndex();
      await homePage.clickCarouselNext();
      await homePage.expectCarouselAdvancedFrom(before);
    });
  });
});

test.describe('Newsletter', () => {
  test('should keep subscribe disabled when email is empty', async ({ homePage, footer }) => {
    await test.step('Open homepage and inspect newsletter', async () => {
      await homePage.open();
      await footer.expectNewsletterEmptyAndDisabled();
    });
  });

  test('should accept a valid newsletter email', async ({ homePage, footer }) => {
    await test.step('Submit valid newsletter email', async () => {
      await homePage.open();
      await footer.fillNewsletter(NEWSLETTER_DATA.uniqueValidEmail());
      await footer.expectNewsletterSubmitEnabled();
      await footer.submitNewsletter();
      await footer.expectNewsletterInteractionCompleted();
    });
  });

  test('should reject an invalid newsletter email', async ({ homePage, footer }) => {
    await test.step('Attempt invalid newsletter email', async () => {
      await homePage.open();
      await footer.fillNewsletter(NEWSLETTER_DATA.invalidEmail);
      if (await footer.isNewsletterSubmitDisabled()) {
        await footer.expectNewsletterSubmitDisabled();
        return;
      }
      await footer.submitNewsletter();
      await footer.expectNewsletterFieldVisible();
    });
  });
});
