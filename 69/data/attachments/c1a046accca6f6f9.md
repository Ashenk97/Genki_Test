# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mobile-nav.spec.ts >> Mobile navigation >> should navigate to Men from the mobile menu
- Location: tests/mobile-nav.spec.ts:16:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('a[href^="/products/"]:not([href*="undefined"])').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('a[href^="/products/"]:not([href*="undefined"])').first()

```

```yaml
- alert: Men's Wear Collection | Genki Wardrobe
- region "Notifications alt+T"
- banner:
  - link "Genki Wardrobe":
    - /url: /
    - img "Genki Wardrobe"
  - list:
    - listitem:
      - link:
        - /url: /wishlist
        - img
    - listitem:
      - link:
        - /url: /cart
        - img
    - listitem:
      - button "Open menu":
        - img
- heading "Men's Wear" [level=1]
- list:
  - listitem:
    - link "Home":
      - /url: /
    - text: /
  - listitem:
    - link "Collections":
      - /url: /collection
    - text: /
  - listitem: men
- text: Showing 0 of 0 result
- img "No products found"
- paragraph: No products found.
- contentinfo:
  - img "Genki Wardrobe"
  - text: © 2026
  - link "| Genki":
    - /url: https://genkiwardrobe.com
  - text: All Rights Reserved
  - heading "INFO" [level=5]
  - navigation:
    - list:
      - listitem:
        - link "About us":
          - /url: /about-us
      - listitem:
        - link "Contact":
          - /url: /about-us#contact
      - listitem:
        - link "Privacy Policy":
          - /url: /privacy-policy
      - listitem:
        - link "Terms and Conditions":
          - /url: /terms-and-conditions
  - heading "USEFUL LINKS" [level=5]
  - navigation:
    - list:
      - listitem:
        - link "Returns":
          - /url: /return-policy
      - listitem:
        - link "Shipping & Delivery":
          - /url: /shipping-policy
      - listitem:
        - link "Size guide":
          - /url: /size-guide
      - listitem:
        - link "FAQs":
          - /url: /faq
  - heading "FOLLOW US ON" [level=5]
  - navigation:
    - list:
      - listitem:
        - link "Facebook":
          - /url: https://facebook.com/genkiwardrobelk
          - img
          - text: Facebook
      - listitem:
        - link "Instagram":
          - /url: https://instagram.com/genkiwardrobelk
          - img
          - text: Instagram
      - listitem:
        - link "TikTok":
          - /url: https://www.tiktok.com/@genkiwardrobelk
          - img
          - text: TikTok
      - listitem:
        - link "WhatsApp":
          - /url: https://wa.me/94701002922
          - img
          - text: WhatsApp
  - heading "Subscribe." [level=2]
  - paragraph: Get the latest drops, exclusive offers, and style updates.
  - textbox "Email address":
    - /placeholder: Your email address
  - button "Subscribe to newsletter" [disabled]:
    - img
```

# Test source

```ts
  1  | import { Locator, Page, expect } from '@playwright/test';
  2  | import { BasePage } from '@pages/BasePage';
  3  | import { ProductDetailsPage } from '@pages/ProductDetailsPage';
  4  | import { normalizePathname } from '@helpers/string';
  5  | 
  6  | export class CollectionPage extends BasePage {
  7  |   private readonly heading: Locator;
  8  |   private readonly productLinks: Locator;
  9  | 
  10 |   constructor(page: Page) {
  11 |     super(page);
  12 |     this.heading = page.getByRole('heading', { level: 1 }).first();
  13 |     this.productLinks = page.locator('a[href^="/products/"]:not([href*="undefined"])');
  14 |   }
  15 | 
  16 |   async open(path: string): Promise<this> {
  17 |     await this.goto(path);
  18 |     return this;
  19 |   }
  20 | 
  21 |   async expectLoaded(path: string, heading: string | RegExp): Promise<void> {
  22 |     const normalized = normalizePathname(path);
  23 |     await expect(this.page).toHaveURL(
  24 |       (url) => normalizePathname(url.pathname) === normalized,
  25 |     );
  26 |     await expect(this.heading).toBeVisible();
  27 |     await expect(this.heading).toHaveText(heading);
  28 |   }
  29 | 
  30 |   async expectHasProducts(): Promise<void> {
> 31 |     await expect(this.productLinks.first()).toBeVisible();
     |                                             ^ Error: expect(locator).toBeVisible() failed
  32 |     await expect(this.productLinks).not.toHaveCount(0);
  33 |   }
  34 | 
  35 |   sortAndFilterControls(): Locator {
  36 |     return this.page
  37 |       .locator('select')
  38 |       .filter({ visible: true })
  39 |       .or(this.page.getByRole('combobox'))
  40 |       .or(this.page.getByRole('button', { name: /^(filter|sort|sort by)/i }))
  41 |       .or(this.page.getByLabel(/sort by|filter/i));
  42 |   }
  43 | 
  44 |   async expectSortOrFilterIfPresent(): Promise<void> {
  45 |     const controls = this.sortAndFilterControls();
  46 |     if ((await controls.count()) === 0) {
  47 |       await this.expectHasProducts();
  48 |       return;
  49 |     }
  50 |     const first = controls.first();
  51 |     await expect(first).toBeVisible();
  52 |     const tag = await first.evaluate((el) => el.tagName.toLowerCase());
  53 |     if (tag === 'select') {
  54 |       const options = first.locator('option');
  55 |       if ((await options.count()) > 1) {
  56 |         await first.selectOption({ index: 1 });
  57 |       }
  58 |     } else {
  59 |       await first.click();
  60 |     }
  61 |     await this.waitForPageLoad();
  62 |     await this.expectHasProducts();
  63 |   }
  64 | 
  65 |   async expectEmptyCollection(): Promise<void> {
  66 |     await expect(this.page.getByText(/no products found/i)).toBeVisible();
  67 |   }
  68 | 
  69 |   async openFirstProduct(): Promise<ProductDetailsPage> {
  70 |     await this.productLinks.first().click();
  71 |     await this.waitForPageLoad();
  72 |     await this.acceptCookiesIfVisible();
  73 |     return new ProductDetailsPage(this.page);
  74 |   }
  75 | }
  76 | 
```