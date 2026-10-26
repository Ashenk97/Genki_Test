# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mobile-checkout.spec.ts >> Mobile checkout >> should place a COD order on a phone viewport
- Location: tests/mobile-checkout.spec.ts:19:7

# Error details

```
TimeoutError: locator.getAttribute: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('.product-content__size__content input[type="radio"][value="M" i], input[type="radio"]#M').first()

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - alert [ref=e2]
  - region "Notifications alt+T"
  - banner [ref=e3]:
    - generic [ref=e6]:
      - link [ref=e8] [cursor=pointer]:
        - /url: /
        - img "Genki Wardrobe" [ref=e9]
      - text: → →
      - list [ref=e11]:
        - listitem [ref=e12]:
          - link [ref=e13] [cursor=pointer]:
            - /url: /wishlist
        - listitem [ref=e16]:
          - link [ref=e17] [cursor=pointer]:
            - /url: /cart
        - listitem [ref=e22]:
          - button "Open menu" [ref=e23] [cursor=pointer]
  - generic [ref=e29]:
    - heading "Page Not Found" [level=1] [ref=e30]
    - list [ref=e31]:
      - listitem [ref=e32]:
        - link "Home" [ref=e33] [cursor=pointer]:
          - /url: /
        - text: /
      - listitem [ref=e34]: Page Not Found
  - generic [ref=e38]:
    - heading "We couldn't find that page" [level=2] [ref=e39]
    - paragraph [ref=e40]: The link may be broken, or the product may have sold out and been retired. Everything currently in stock is one click away.
    - link "Shop the collection" [ref=e41] [cursor=pointer]:
      - /url: /collection
  - contentinfo [ref=e42]:
    - generic [ref=e44]:
      - generic [ref=e45]:
        - img "Genki Wardrobe" [ref=e47]
        - generic [ref=e48]:
          - text: © 2026
          - link "| Genki" [ref=e49] [cursor=pointer]:
            - /url: https://genkiwardrobe.com
          - generic [ref=e50]: All Rights Reserved
      - generic [ref=e51]:
        - heading "INFO" [level=5] [ref=e52]
        - navigation [ref=e53]:
          - list [ref=e54]:
            - listitem [ref=e55]:
              - link "About us" [ref=e56] [cursor=pointer]:
                - /url: /about-us
            - listitem [ref=e57]:
              - link "Contact" [ref=e58] [cursor=pointer]:
                - /url: /about-us#contact
            - listitem [ref=e59]:
              - link "Privacy Policy" [ref=e60] [cursor=pointer]:
                - /url: /privacy-policy
            - listitem [ref=e61]:
              - link "Terms and Conditions" [ref=e62] [cursor=pointer]:
                - /url: /terms-and-conditions
      - generic [ref=e63]:
        - heading "USEFUL LINKS" [level=5] [ref=e64]
        - navigation [ref=e65]:
          - list [ref=e66]:
            - listitem [ref=e67]:
              - link "Rewards" [ref=e68] [cursor=pointer]:
                - /url: /rewards
            - listitem [ref=e69]:
              - link "Returns" [ref=e70] [cursor=pointer]:
                - /url: /return-policy
            - listitem [ref=e71]:
              - link "Shipping & Delivery" [ref=e72] [cursor=pointer]:
                - /url: /shipping-policy
            - listitem [ref=e73]:
              - link "Size guide" [ref=e74] [cursor=pointer]:
                - /url: /size-guide
            - listitem [ref=e75]:
              - link "FAQs" [ref=e76] [cursor=pointer]:
                - /url: /faq
      - generic [ref=e77]:
        - heading "FOLLOW US ON" [level=5] [ref=e78]
        - navigation [ref=e79]:
          - list [ref=e80]:
            - listitem [ref=e81]:
              - link "Facebook" [ref=e82] [cursor=pointer]:
                - /url: https://facebook.com/genkiwardrobelk
            - listitem [ref=e85]:
              - link "Instagram" [ref=e86] [cursor=pointer]:
                - /url: https://instagram.com/genkiwardrobelk
            - listitem [ref=e89]:
              - link "TikTok" [ref=e90] [cursor=pointer]:
                - /url: https://www.tiktok.com/@genkiwardrobelk
            - listitem [ref=e93]:
              - link "WhatsApp" [ref=e94] [cursor=pointer]:
                - /url: https://wa.me/94701002922
      - generic [ref=e98]:
        - heading "Subscribe." [level=2] [ref=e99]
        - paragraph [ref=e100]: Get the latest drops, exclusive offers, and style updates.
        - generic [ref=e103]:
          - textbox "Email address" [ref=e104]:
            - /placeholder: Your email address
          - button "Subscribe to newsletter" [disabled] [ref=e105]
```

# Test source

```ts
  1   | import { Locator, Page, expect } from '@playwright/test';
  2   | import { AUTH_MESSAGES } from '@constants/messages';
  3   | import { ToastType } from '@constants/payment';
  4   | import { SIZE_RADIO_PATTERN } from '@data/pdp-variants.data';
  5   | import { lkrAmountPattern } from '@helpers/string';
  6   | import { BasePage } from '@pages/BasePage';
  7   | 
  8   | export class ProductDetailsPage extends BasePage {
  9   |   private readonly productTitle: Locator;
  10  |   private readonly price: Locator;
  11  |   private readonly addToCartButton: Locator;
  12  |   private readonly outOfStockButton: Locator;
  13  |   private readonly selectSizePrompt: Locator;
  14  |   private readonly selectColorPrompt: Locator;
  15  |   private readonly addToWishlistButton: Locator;
  16  |   private readonly increaseQtyButton: Locator;
  17  |   private readonly decreaseQtyButton: Locator;
  18  |   private readonly qtyInput: Locator;
  19  |   private readonly sizeRadios: Locator;
  20  |   private readonly sizeLabels: Locator;
  21  |   private readonly colorRadios: Locator;
  22  |   private readonly cartDrawerClose: Locator;
  23  |   private readonly freeDeliveryNote: Locator;
  24  |   private readonly galleryImage: Locator;
  25  |   private readonly galleryThumbs: Locator;
  26  | 
  27  |   constructor(page: Page) {
  28  |     super(page);
  29  | 
  30  |     this.productTitle = page.getByRole('heading', { level: 1 }).first();
  31  |     this.price = page.locator('span.discounted-price').or(page.getByText(/LKR\s*[\d,.]+/)).first();
  32  |     this.addToCartButton = page.getByRole('button', { name: /add to cart/i });
  33  |     this.outOfStockButton = page.getByRole('button', { name: /out of stock/i });
  34  |     this.selectSizePrompt = page.getByRole('button', { name: /select a size/i });
  35  |     this.selectColorPrompt = page.getByRole('button', { name: /select a color/i });
  36  |     this.addToWishlistButton = page
  37  |       .getByRole('button', { name: /add to wishlist/i })
  38  |       .or(page.locator('button.wishlist-icon'))
  39  |       .first();
  40  |     this.qtyInput = page.locator('.product-content .cart-plus-minus-box').first();
  41  |     this.increaseQtyButton = page
  42  |       .locator('.product-content button.qtybutton')
  43  |       .filter({ hasText: /^\+$/ })
  44  |       .first();
  45  |     this.decreaseQtyButton = page
  46  |       .locator('.product-content button.qtybutton')
  47  |       .filter({ hasText: /^−$|^-$/ })
  48  |       .first();
  49  |     this.sizeRadios = page.locator('.product-content__size__content input[type="radio"]');
  50  |     this.sizeLabels = page.locator('.product-content__size__content label');
  51  |     this.colorRadios = page.locator('input[name="product-color"]');
  52  |     this.cartDrawerClose = page.locator('.cart-overlay__close-icon');
  53  |     this.freeDeliveryNote = page.locator('.product-content__delivery-note');
  54  |     this.galleryImage = page.locator('.product-large-image-wrapper .single-image img').first();
  55  |     this.galleryThumbs = page.locator(
  56  |       '.product-small-image-wrapper img, .product-large-image-wrapper .swiper-slide img',
  57  |     );
  58  |   }
  59  | 
  60  |   async selectFirstAvailableSize(): Promise<this> {
  61  |     const sizeRadio = this.page.getByRole('radio', { name: SIZE_RADIO_PATTERN }).first();
  62  | 
  63  |     if (await sizeRadio.isVisible().catch(() => false)) {
  64  |       await sizeRadio.click();
  65  |       return this;
  66  |     }
  67  | 
  68  |     const sizeInput = this.sizeRadios.first();
  69  |     const sizeId = await sizeInput.getAttribute('id');
  70  |     if (sizeId) {
  71  |       const label = this.page.locator(`label[for="${sizeId}"]`);
  72  |       if (await label.isVisible().catch(() => false)) {
  73  |         await label.click();
  74  |         return this;
  75  |       }
  76  |     }
  77  | 
  78  |     await sizeInput.click({ force: true });
  79  |     return this;
  80  |   }
  81  | 
  82  |   async selectSize(size: string): Promise<this> {
  83  |     const byRole = this.page.getByRole('radio', {
  84  |       name: new RegExp(`^${size}$`, 'i'),
  85  |     });
  86  |     if (await byRole.isVisible().catch(() => false)) {
  87  |       await byRole.click();
  88  |       return this;
  89  |     }
  90  | 
  91  |     const sizeInput = this.page
  92  |       .locator(`.product-content__size__content input[type="radio"][value="${size}" i], input[type="radio"]#${size}`)
  93  |       .first();
> 94  |     const sizeId = await sizeInput.getAttribute('id');
      |                                    ^ TimeoutError: locator.getAttribute: Timeout 15000ms exceeded.
  95  |     if (sizeId) {
  96  |       const label = this.page.locator(`label[for="${sizeId}"]`);
  97  |       if (await label.isVisible().catch(() => false)) {
  98  |         await label.click();
  99  |         return this;
  100 |       }
  101 |     }
  102 | 
  103 |     await sizeInput.click({ force: true });
  104 |     return this;
  105 |   }
  106 | 
  107 |   async addToCart(): Promise<this> {
  108 |     await this.addToCartButton.click();
  109 |     return this;
  110 |   }
  111 | 
  112 |   async expectAddToCartVisible(): Promise<void> {
  113 |     await expect(this.addToCartButton).toBeVisible();
  114 |     await expect(this.addToCartButton).toBeEnabled();
  115 |   }
  116 | 
  117 |   async expectSizeRequired(): Promise<void> {
  118 |     await expect(this.selectSizePrompt).toBeVisible();
  119 |     await expect(this.addToCartButton).toHaveCount(0);
  120 |   }
  121 | 
  122 |   async expectColorRequired(): Promise<void> {
  123 |     await expect(this.selectColorPrompt).toBeVisible();
  124 |     await expect(this.addToCartButton).toHaveCount(0);
  125 |   }
  126 | 
  127 |   async expectSizesHidden(): Promise<void> {
  128 |     await expect(this.sizeLabels).toHaveCount(0);
  129 |   }
  130 | 
  131 |   async expectSizesVisible(): Promise<void> {
  132 |     await expect(this.sizeLabels.first()).toBeVisible();
  133 |   }
  134 | 
  135 |   async selectFirstColor(): Promise<this> {
  136 |     const input = this.colorRadios.first();
  137 |     const colorId = await input.getAttribute('id');
  138 |     if (colorId) {
  139 |       await this.page.locator(`label[for="${colorId}"]`).click({ force: true });
  140 |     } else {
  141 |       await input.check({ force: true });
  142 |     }
  143 |     await expect(
  144 |       this.sizeLabels.first().or(this.addToCartButton).or(this.outOfStockButton),
  145 |     ).toBeVisible();
  146 |     return this;
  147 |   }
  148 | 
  149 |   /**
  150 |    * Select color/size if the PDP requires them. Returns false when the variant is out of stock.
  151 |    */
  152 |   async tryEnableAddToCart(): Promise<boolean> {
  153 |     await this.expectProductDetailsVisible();
  154 | 
  155 |     if (await this.selectColorPrompt.isVisible().catch(() => false)) {
  156 |       await this.selectFirstColor();
  157 |     }
  158 | 
  159 |     const sizeByRole = this.page.getByRole('radio', { name: SIZE_RADIO_PATTERN }).first();
  160 |     await expect
  161 |       .poll(async () => {
  162 |         if (await this.outOfStockButton.isVisible().catch(() => false)) {
  163 |           return 'oos';
  164 |         }
  165 |         if (await this.addToCartButton.isVisible().catch(() => false)) {
  166 |           return 'atc';
  167 |         }
  168 |         if (
  169 |           (await sizeByRole.isVisible().catch(() => false)) ||
  170 |           (await this.sizeRadios.count()) > 0
  171 |         ) {
  172 |           return 'size';
  173 |         }
  174 |         return '';
  175 |       })
  176 |       .not.toBe('');
  177 | 
  178 |     if (await this.outOfStockButton.isVisible().catch(() => false)) {
  179 |       return false;
  180 |     }
  181 |     if (await this.addToCartButton.isVisible().catch(() => false)) {
  182 |       return true;
  183 |     }
  184 | 
  185 |     await this.selectFirstAvailableSize();
  186 |     await expect(this.addToCartButton.or(this.outOfStockButton)).toBeVisible();
  187 |     return this.addToCartButton.isVisible().catch(() => false);
  188 |   }
  189 | 
  190 |   async selectColor(color: string): Promise<this> {
  191 |     const input = this.page.locator(
  192 |       `input[name="product-color"][value="${color}" i], input[name="product-color"]#${color}`,
  193 |     );
  194 |     const colorId = await input.first().getAttribute('id');
```