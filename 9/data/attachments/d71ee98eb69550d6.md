# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout-advanced.spec.ts >> Gift checkout >> should restore COD after unchecking the gift option
- Location: tests/checkout-advanced.spec.ts:107:7

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /add to cart/i })

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - alert [ref=e2]
  - region "Notifications alt+T"
  - banner [ref=e3]:
    - generic [ref=e6]:
      - link [ref=e8] [cursor=pointer]:
        - /url: /
        - img "Genki Wardrobe" [ref=e9]
      - navigation [ref=e10]:
        - list [ref=e11]:
          - listitem [ref=e12]:
            - link "Men" [ref=e13] [cursor=pointer]:
              - /url: /collection/men
            - text: →
          - listitem [ref=e14]:
            - link "Women" [ref=e15] [cursor=pointer]:
              - /url: /collection/women
            - text: →
          - listitem [ref=e16]:
            - link "Collections" [ref=e17] [cursor=pointer]:
              - /url: /collection
      - list [ref=e19]:
        - listitem [ref=e20]:
          - button "Open wishlist" [ref=e21] [cursor=pointer]
        - listitem [ref=e24]:
          - button "Open cart" [ref=e25] [cursor=pointer]
  - generic [ref=e30]:
    - button "Close search" [ref=e31] [cursor=pointer]
    - generic [ref=e35]:
      - searchbox "Search Products..." [ref=e37]
      - generic [ref=e38]: "# Hit enter to search"
  - generic [ref=e42]:
    - heading "Berserk Oversize T-shirt" [level=1] [ref=e43]
    - list [ref=e44]:
      - listitem [ref=e45]:
        - link "Home" [ref=e46] [cursor=pointer]:
          - /url: /
        - text: /
      - listitem [ref=e47]: Berserk Oversize T-shirt
  - generic [ref=e49]:
    - generic [ref=e50]:
      - generic [ref=e51]:
        - generic [ref=e52]:
          - generic [ref=e53]: "-10%"
          - button [ref=e57] [cursor=pointer]
          - generic [ref=e61]:
            - generic [ref=e62]:
              - group "4 / 4":
                - button
                - generic:
                  - img "Berserk Oversize T-shirt"
              - group "1 / 4" [ref=e63]:
                - button [ref=e64] [cursor=pointer]
                - img "Berserk Oversize T-shirt" [ref=e69]
              - group "2 / 4":
                - button
                - generic:
                  - img "Berserk Oversize T-shirt"
              - group "3 / 4":
                - button
                - generic:
                  - img "Berserk Oversize T-shirt"
              - group "4 / 4":
                - button
                - generic:
                  - img "Berserk Oversize T-shirt"
              - group "1 / 4":
                - button
                - generic:
                  - img "Berserk Oversize T-shirt"
            - generic [ref=e70]:
              - button "Go to slide 1" [ref=e71] [cursor=pointer]
              - button "Go to slide 2" [ref=e72] [cursor=pointer]
              - button "Go to slide 3" [ref=e73] [cursor=pointer]
              - button "Go to slide 4" [ref=e74] [cursor=pointer]
        - generic [ref=e76]:
          - generic [ref=e78]:
            - group "1 / 4" [ref=e79]:
              - img "Berserk Oversize T-shirt" [ref=e81]
            - group "2 / 4" [ref=e82]:
              - img "Berserk Oversize T-shirt" [ref=e84]
            - group "3 / 4" [ref=e85]:
              - img "Berserk Oversize T-shirt" [ref=e87]
            - group "4 / 4" [ref=e88]:
              - img "Berserk Oversize T-shirt" [ref=e90]
          - button "Previous slide" [disabled]
          - button "Next slide" [ref=e91] [cursor=pointer]
      - generic [ref=e95]:
        - heading "Berserk Oversize T-shirt" [level=2] [ref=e96]
        - generic [ref=e97]: LKR 3490.00
        - paragraph [ref=e100]: Crafted from a premium cotton blend, this black oversize tee features bold back artwork inspired by the iconic Berserk manga. Designed for comfort and impact, it’s the perfect fit for anime fans who live and breathe dark fantasy.
        - generic [ref=e101]:
          - generic [ref=e102]:
            - generic [ref=e103]: Color (white)
            - generic [ref=e104]:
              - 'radio "Selected: white" [checked] [disabled]'
              - 'generic "Selected: white" [ref=e105]'
          - generic [ref=e106]:
            - generic [ref=e107]: Size
            - generic [ref=e108]:
              - radio "XS" [checked] [active]
              - generic [ref=e109] [cursor=pointer]: XS
        - generic [ref=e110]:
          - generic [ref=e111]: Quantity
          - generic [ref=e112]:
            - button "-" [ref=e113] [cursor=pointer]
            - textbox [ref=e114]: "1"
            - button "+" [ref=e115] [cursor=pointer]
        - generic [ref=e116]:
          - button "Out of Stock" [disabled] [ref=e117]
          - button "Add to wishlist" [ref=e118] [cursor=pointer]
        - table [ref=e122]:
          - rowgroup [ref=e123]:
            - row [ref=e124]:
              - cell "SKU:" [ref=e125]
              - cell "berserk-oversized-tee" [ref=e126]
            - row [ref=e127]:
              - cell "Categories:" [ref=e128]
              - cell "Oversized T-Shirts, Unisex" [ref=e129]
            - row [ref=e130]:
              - cell "Tags:" [ref=e131]
              - cell "Anime, Street Wear" [ref=e132]
            - row [ref=e133]:
              - cell "Share on:" [ref=e134]
              - cell [ref=e135]:
                - list [ref=e136]:
                  - listitem [ref=e137]:
                    - button "Share on Facebook" [ref=e138] [cursor=pointer]
                  - listitem [ref=e141]:
                    - button "Share on Twitter" [ref=e142] [cursor=pointer]
                  - listitem [ref=e145]:
                    - button "Share on WhatsApp" [ref=e146] [cursor=pointer]
                  - listitem [ref=e149]:
                    - button "Copy URL" [ref=e150] [cursor=pointer]
    - generic [ref=e155]:
      - tablist [ref=e156]:
        - tab "Description" [selected] [ref=e158] [cursor=pointer]
        - tab "Additional Information" [ref=e160] [cursor=pointer]
      - tabpanel "Description" [ref=e162]:
        - generic [ref=e163]: Step into the world of dark fantasy with our Berserk Oversize Tee. Inspired by the legendary Berserk manga, this tee features bold back artwork that captures the raw intensity and power of the series. Made from a soft, breathable premium cotton blend, it offers a relaxed oversized fit for all-day comfort and effortless streetwear style. Whether you’re a longtime fan of Guts and his relentless journey or just love edgy anime aesthetics, this tee is a statement piece built for those who embrace their inner warrior. Pair it with cargos or denim and let the design speak for itself.
      - generic [ref=e167]:
        - heading "Oversized T-Shirt Size chart" [level=2] [ref=e168]
        - img "oversized T-shirt size chart, sizes XXS through XXXL" [ref=e169]
  - contentinfo [ref=e170]:
    - generic [ref=e172]:
      - generic [ref=e173]:
        - img "Genki Wardrobe" [ref=e175]
        - generic [ref=e176]:
          - text: © 2026
          - link "| Genki" [ref=e177] [cursor=pointer]:
            - /url: https://genkiwardrobe.com
          - generic [ref=e178]: All Rights Reserved
      - generic [ref=e179]:
        - heading "INFO" [level=5] [ref=e180]
        - navigation [ref=e181]:
          - list [ref=e182]:
            - listitem [ref=e183]:
              - link "About us" [ref=e184] [cursor=pointer]:
                - /url: /about-us
            - listitem [ref=e185]:
              - link "Contact" [ref=e186] [cursor=pointer]:
                - /url: /about-us#contact
            - listitem [ref=e187]:
              - link "Privacy Policy" [ref=e188] [cursor=pointer]:
                - /url: /privacy-policy
            - listitem [ref=e189]:
              - link "Terms and Conditions" [ref=e190] [cursor=pointer]:
                - /url: /terms-and-conditions
      - generic [ref=e191]:
        - heading "USEFUL LINKS" [level=5] [ref=e192]
        - navigation [ref=e193]:
          - list [ref=e194]:
            - listitem [ref=e195]:
              - link "Returns" [ref=e196] [cursor=pointer]:
                - /url: /return-policy
            - listitem [ref=e197]:
              - link "Shipping & Delivery" [ref=e198] [cursor=pointer]:
                - /url: /shipping-policy
            - listitem [ref=e199]:
              - link "Size guide" [ref=e200] [cursor=pointer]:
                - /url: /size-guide
            - listitem [ref=e201]:
              - link "FAQs" [ref=e202] [cursor=pointer]:
                - /url: /faq
      - generic [ref=e203]:
        - heading "FOLLOW US ON" [level=5] [ref=e204]
        - navigation [ref=e205]:
          - list [ref=e206]:
            - listitem [ref=e207]:
              - link "Facebook" [ref=e208] [cursor=pointer]:
                - /url: https://facebook.com/genkiwardrobelk
            - listitem [ref=e211]:
              - link "Instagram" [ref=e212] [cursor=pointer]:
                - /url: https://instagram.com/genkiwardrobelk
            - listitem [ref=e215]:
              - link "TikTok" [ref=e216] [cursor=pointer]:
                - /url: https://www.tiktok.com/@genkiwardrobelk
            - listitem [ref=e219]:
              - link "WhatsApp" [ref=e220] [cursor=pointer]:
                - /url: https://wa.me/94701002922
      - generic [ref=e224]:
        - heading "Subscribe." [level=2] [ref=e225]
        - paragraph [ref=e226]: Get the latest drops, exclusive offers, and style updates.
        - generic [ref=e229]:
          - textbox "Email address" [ref=e230]:
            - /placeholder: Your email address
          - button "Subscribe to newsletter" [disabled] [ref=e231]
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
  75  |     const sizeId = await sizeInput.getAttribute('id');
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
> 89  |     await this.addToCartButton.click();
      |                                ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
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
  176 | 
  177 |   async open(path: string): Promise<this> {
  178 |     await this.goto(path);
  179 |     return this;
  180 |   }
  181 | }
  182 | 
```