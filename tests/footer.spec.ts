import { test, expect } from '../fixtures/test-fixtures';

test.describe('Footer info useful links and social', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  for (const link of [
    { name: 'About us', path: '/about-us', heading: /about|ゲンキ|genki/i },
    { name: 'Privacy Policy', path: '/privacy-policy', heading: /privacy/i },
    { name: 'Terms and Conditions', path: '/terms-and-conditions', heading: /terms/i },
    { name: 'Returns', path: '/return-policy', heading: /return/i },
    { name: 'Shipping & Delivery', path: '/shipping-policy', heading: /shipping|delivery/i },
    { name: 'Size guide', path: '/size-guide', heading: /size/i },
    { name: 'FAQs', path: '/faq', heading: /f\.?a\.?q/i },
  ]) {
    test(`should open ${link.name} from the footer`, async ({ footer }) => {
      await footer.openFooterLink(link.name);
      await footer.expectCmsPage(link.path, link.heading);
    });
  }

  test('should open Contact from the footer', async ({ footer }) => {
    await footer.openFooterLink('Contact');
    await expect(footer.page).toHaveURL(/\/about-us#contact/);
  });

  test('should open Exchange promo to return policy', async ({ footer }) => {
    await footer.exchangePromoLink.click();
    await footer.waitForPageLoad();
    await footer.expectCmsPage('/return-policy', /return/i);
  });

  for (const social of [
    { name: 'Facebook', href: 'https://facebook.com/genkiwardrobelk', target: '_blank' as string | undefined },
    { name: 'Instagram', href: 'https://instagram.com/genkiwardrobelk' },
    { name: 'TikTok', href: 'https://www.tiktok.com/@genkiwardrobelk', target: '_blank' as string | undefined },
    { name: 'WhatsApp', href: 'https://wa.me/94701002922' },
  ]) {
    test(`should expose footer ${social.name} link`, async ({ footer }) => {
      await footer.expectSocialHref(social.name, social.href, social.target);
    });
  }
});
