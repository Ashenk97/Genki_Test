# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: pdp.spec.ts >> Individual product >> should select a specific size from the size matrix
- Location: tests/pdp.spec.ts:27:7

# Error details

```
TimeoutError: locator.getAttribute: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('input[type="radio"][value="M" i], input[type="radio"]#M').first()

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - alert [ref=e2]
  - region "Notifications alt+T"
  - banner [ref=e3]:
    - generic [ref=e6]:
      - generic [ref=e7]:
        - generic [ref=e8]:
          - text: Need Help? Call Us
          - link "(070) 100 29 22" [ref=e10] [cursor=pointer]:
            - /url: tel:0701002922
        - generic [ref=e11]: "|"
        - link "WhatsApp" [ref=e14] [cursor=pointer]:
          - /url: https://wa.me/94701002922
      - generic [ref=e15]:
        - link "Login" [ref=e17] [cursor=pointer]:
          - /url: /login
        - generic [ref=e18]: "|"
        - list [ref=e20]:
          - listitem [ref=e21]:
            - link "Genki Wardrobe on Facebook" [ref=e22] [cursor=pointer]:
              - /url: https://facebook.com/genkiwardrobelk
          - listitem [ref=e25]:
            - link "Genki Wardrobe on Instagram" [ref=e26] [cursor=pointer]:
              - /url: https://instagram.com/genkiwardrobelk
    - generic [ref=e32]:
      - link [ref=e34] [cursor=pointer]:
        - /url: /
        - img "Genki Wardrobe" [ref=e35]
      - navigation [ref=e36]:
        - list [ref=e37]:
          - listitem [ref=e38]:
            - link "Men" [ref=e39] [cursor=pointer]:
              - /url: /collection/men
            - text: →
          - listitem [ref=e40]:
            - link "Women" [ref=e41] [cursor=pointer]:
              - /url: /collection/women
            - text: →
          - listitem [ref=e42]:
            - link "Collections" [ref=e43] [cursor=pointer]:
              - /url: /collection
      - list [ref=e45]:
        - listitem [ref=e46]:
          - button "Open wishlist" [ref=e47] [cursor=pointer]
        - listitem [ref=e50]:
          - button "Open cart" [ref=e51] [cursor=pointer]
  - generic [ref=e59]:
    - heading "Page Not Found" [level=1] [ref=e60]
    - list [ref=e61]:
      - listitem [ref=e62]:
        - link "Home" [ref=e63] [cursor=pointer]:
          - /url: /
        - text: /
      - listitem [ref=e64]: Page Not Found
  - generic [ref=e68]:
    - heading "We couldn't find that page" [level=2] [ref=e69]
    - paragraph [ref=e70]: The link may be broken, or the product may have sold out and been retired. Everything currently in stock is one click away.
    - link "Shop the collection" [ref=e71] [cursor=pointer]:
      - /url: /collection
  - contentinfo [ref=e72]:
    - generic [ref=e74]:
      - generic [ref=e75]:
        - img "Genki Wardrobe" [ref=e77]
        - generic [ref=e78]:
          - text: © 2026
          - link "| Genki" [ref=e79] [cursor=pointer]:
            - /url: https://genkiwardrobe.com
          - generic [ref=e80]: All Rights Reserved
      - generic [ref=e81]:
        - heading "INFO" [level=5] [ref=e82]
        - navigation [ref=e83]:
          - list [ref=e84]:
            - listitem [ref=e85]:
              - link "About us" [ref=e86] [cursor=pointer]:
                - /url: /about-us
            - listitem [ref=e87]:
              - link "Contact" [ref=e88] [cursor=pointer]:
                - /url: /about-us#contact
            - listitem [ref=e89]:
              - link "Privacy Policy" [ref=e90] [cursor=pointer]:
                - /url: /privacy-policy
            - listitem [ref=e91]:
              - link "Terms and Conditions" [ref=e92] [cursor=pointer]:
                - /url: /terms-and-conditions
      - generic [ref=e93]:
        - heading "USEFUL LINKS" [level=5] [ref=e94]
        - navigation [ref=e95]:
          - list [ref=e96]:
            - listitem [ref=e97]:
              - link "Returns" [ref=e98] [cursor=pointer]:
                - /url: /return-policy
            - listitem [ref=e99]:
              - link "Shipping & Delivery" [ref=e100] [cursor=pointer]:
                - /url: /shipping-policy
            - listitem [ref=e101]:
              - link "Size guide" [ref=e102] [cursor=pointer]:
                - /url: /size-guide
            - listitem [ref=e103]:
              - link "FAQs" [ref=e104] [cursor=pointer]:
                - /url: /faq
      - generic [ref=e105]:
        - heading "FOLLOW US ON" [level=5] [ref=e106]
        - navigation [ref=e107]:
          - list [ref=e108]:
            - listitem [ref=e109]:
              - link "Facebook" [ref=e110] [cursor=pointer]:
                - /url: https://facebook.com/genkiwardrobelk
            - listitem [ref=e113]:
              - link "Instagram" [ref=e114] [cursor=pointer]:
                - /url: https://instagram.com/genkiwardrobelk
            - listitem [ref=e117]:
              - link "TikTok" [ref=e118] [cursor=pointer]:
                - /url: https://www.tiktok.com/@genkiwardrobelk
            - listitem [ref=e121]:
              - link "WhatsApp" [ref=e122] [cursor=pointer]:
                - /url: https://wa.me/94701002922
      - generic [ref=e126]:
        - heading "Subscribe." [level=2] [ref=e127]
        - paragraph [ref=e128]: Get the latest drops, exclusive offers, and style updates.
        - generic [ref=e131]:
          - textbox "Email address" [ref=e132]:
            - /placeholder: Your email address
          - button "Subscribe to newsletter" [disabled] [ref=e133]
```

# Test source

```ts
  1   | import { Locator, Page, expect } from '@playwright/test';
  2   | import { AUTH_MESSAGES } from '@constants/messages';
  3   | import { ToastType } from '@constants/payment';
  4   | import { BasePage } from '@pages/BasePage';
  5   | 
  6   | export class ProductDetailsPage extends BasePage {
  7   |   private readonly productTitle: Locator;
  8   |   private readonly price: Locator;
  9   |   private readonly addToCartButton: Locator;
  10  |   private readonly selectSizePrompt: Locator;
  11  |   private readonly selectColorPrompt: Locator;
  12  |   private readonly addToWishlistButton: Locator;
  13  |   private readonly increaseQtyButton: Locator;
  14  |   private readonly decreaseQtyButton: Locator;
  15  | 
  16  |   constructor(page: Page) {
  17  |     super(page);
  18  | 
  19  |     this.productTitle = page.getByRole('heading', { level: 1 }).first();
  20  |     this.price = page.getByText(/LKR\s*[\d,.]+/).first();
  21  |     this.addToCartButton = page.getByRole('button', { name: /add to cart/i });
  22  |     this.selectSizePrompt = page.getByRole('button', { name: /select a size/i });
  23  |     this.selectColorPrompt = page.getByRole('button', { name: /select a color/i });
  24  |     this.addToWishlistButton = page.getByRole('button', { name: /add to wishlist/i });
  25  |     this.increaseQtyButton = page
  26  |       .locator('button.inc.qtybutton')
  27  |       .or(page.getByRole('button', { name: /^\+$/ }))
  28  |       .or(page.locator('button.qtybutton').filter({ hasText: /^\+$/ }))
  29  |       .first();
  30  |     this.decreaseQtyButton = page
  31  |       .locator('button.dec.qtybutton')
  32  |       .or(page.getByRole('button', { name: /^−$|^-$/ }))
  33  |       .or(page.locator('button.qtybutton').filter({ hasText: /^-$/ }))
  34  |       .first();
  35  |   }
  36  | 
  37  |   async selectFirstAvailableSize(): Promise<this> {
  38  |     const sizeRadio = this.page.getByRole('radio', {
  39  |       name: /^(XS|S|M|L|XL|XXL|2XL|3XL)$/i,
  40  |     }).first();
  41  | 
  42  |     if (await sizeRadio.isVisible().catch(() => false)) {
  43  |       await sizeRadio.click();
  44  |       return this;
  45  |     }
  46  | 
  47  |     const sizeInput = this.page
  48  |       .locator('input[type="radio"]:not([name="product-color"])')
  49  |       .first();
  50  |     const sizeId = await sizeInput.getAttribute('id');
  51  |     if (sizeId) {
  52  |       const label = this.page.locator(`label[for="${sizeId}"]`);
  53  |       if (await label.isVisible().catch(() => false)) {
  54  |         await label.click();
  55  |         return this;
  56  |       }
  57  |     }
  58  | 
  59  |     await sizeInput.click({ force: true });
  60  |     return this;
  61  |   }
  62  | 
  63  |   async selectSize(size: string): Promise<this> {
  64  |     const byRole = this.page.getByRole('radio', {
  65  |       name: new RegExp(`^${size}$`, 'i'),
  66  |     });
  67  |     if (await byRole.isVisible().catch(() => false)) {
  68  |       await byRole.click();
  69  |       return this;
  70  |     }
  71  | 
  72  |     const sizeInput = this.page
  73  |       .locator(`input[type="radio"][value="${size}" i], input[type="radio"]#${size}`)
  74  |       .first();
> 75  |     const sizeId = await sizeInput.getAttribute('id');
      |                                    ^ TimeoutError: locator.getAttribute: Timeout 15000ms exceeded.
  76  |     if (sizeId) {
  77  |       const label = this.page.locator(`label[for="${sizeId}"]`);
  78  |       if (await label.isVisible().catch(() => false)) {
  79  |         await label.click();
  80  |         return this;
  81  |       }
  82  |     }
  83  | 
  84  |     await sizeInput.click({ force: true });
  85  |     return this;
  86  |   }
  87  | 
  88  |   async addToCart(): Promise<this> {
  89  |     await this.addToCartButton.click();
  90  |     return this;
  91  |   }
  92  | 
  93  |   async expectAddToCartVisible(): Promise<void> {
  94  |     await expect(this.addToCartButton).toBeVisible();
  95  |     await expect(this.addToCartButton).toBeEnabled();
  96  |   }
  97  | 
  98  |   async expectSizeRequired(): Promise<void> {
  99  |     await expect(this.selectSizePrompt).toBeVisible();
  100 |     await expect(this.addToCartButton).toHaveCount(0);
  101 |   }
  102 | 
  103 |   async expectColorRequired(): Promise<void> {
  104 |     await expect(this.selectColorPrompt).toBeVisible();
  105 |     await expect(this.addToCartButton).toHaveCount(0);
  106 |   }
  107 | 
  108 |   async selectColor(color: string): Promise<this> {
  109 |     const input = this.page.locator(`input[name="product-color"][value="${color}" i], input[name="product-color"]#${color}`);
  110 |     const colorId = await input.first().getAttribute('id');
  111 |     if (colorId) {
  112 |       await this.page.locator(`label[for="${colorId}"]`).click({ force: true });
  113 |     } else {
  114 |       await input.first().check({ force: true });
  115 |     }
  116 |     return this;
  117 |   }
  118 | 
  119 |   async expectAvailableSizeCount(minCount: number): Promise<void> {
  120 |     const sizes = this.page.locator('input[type="radio"]:not([name="product-color"])');
  121 |     await expect.poll(async () => sizes.count()).toBeGreaterThanOrEqual(minCount);
  122 |   }
  123 | 
  124 |   async expectBrokenProductShell(): Promise<void> {
  125 |     await expect(this.addToCartButton).toHaveCount(0);
  126 |     await expect(this.selectSizePrompt).toHaveCount(0);
  127 |     await expect(this.selectColorPrompt).toHaveCount(0);
  128 |   }
  129 | 
  130 |   async expectAddedToCart(): Promise<void> {
  131 |     await this.expectToast(AUTH_MESSAGES.addedToCartToast, ToastType.Success);
  132 |   }
  133 | 
  134 |   async expectProductDetailsVisible(): Promise<void> {
  135 |     await expect(this.productTitle).toBeVisible();
  136 |     await expect(this.price).toBeVisible();
  137 |     await expect(
  138 |       this.addToCartButton.or(this.selectSizePrompt).or(this.selectColorPrompt),
  139 |     ).toBeVisible();
  140 |   }
  141 | 
  142 |   async expectOnProductPage(): Promise<void> {
  143 |     await expect(this.page).toHaveURL(/\/products\//);
  144 |     await expect(this.productTitle).toBeVisible();
  145 |   }
  146 | 
  147 |   async addToWishlist(): Promise<this> {
  148 |     await this.addToWishlistButton.click();
  149 |     return this;
  150 |   }
  151 | 
  152 |   async expectAddedToWishlist(): Promise<void> {
  153 |     await expect(
  154 |       this.page.locator('[data-sonner-toast]').filter({ hasText: AUTH_MESSAGES.wishlistToast }),
  155 |     ).toBeVisible();
  156 |   }
  157 | 
  158 |   async increaseQuantity(): Promise<this> {
  159 |     await this.increaseQtyButton.click();
  160 |     return this;
  161 |   }
  162 | 
  163 |   async decreaseQuantity(): Promise<this> {
  164 |     await this.decreaseQtyButton.click();
  165 |     return this;
  166 |   }
  167 | 
  168 |   async expectQuantity(quantity: number): Promise<void> {
  169 |     await expect(
  170 |       this.page
  171 |         .locator(`input[value="${quantity}"]`)
  172 |         .or(this.page.getByText(new RegExp(`^${quantity}$`)))
  173 |         .first(),
  174 |     ).toBeVisible();
  175 |   }
```