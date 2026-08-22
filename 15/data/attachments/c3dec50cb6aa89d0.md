# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: wishlist.spec.ts >> Wishlist >> should convert a wishlist item into a cart line via PDP
- Location: tests/wishlist.spec.ts:53:7

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /add to cart/i })

```

# Page snapshot

```yaml
- generic [ref=f1e1]:
  - alert [ref=f1e2]: Berserk Oversize T-shirt | Genki Wardrobe
  - region "Notifications alt+T"
  - banner [ref=f1e3]:
    - generic [ref=f1e6]:
      - link [ref=f1e8] [cursor=pointer]:
        - /url: /
        - img "Genki Wardrobe" [ref=f1e9]
      - navigation [ref=f1e10]:
        - list [ref=f1e11]:
          - listitem [ref=f1e12]:
            - link "Men" [ref=f1e13] [cursor=pointer]:
              - /url: /collection/men
            - text: →
          - listitem [ref=f1e14]:
            - link "Women" [ref=f1e15] [cursor=pointer]:
              - /url: /collection/women
            - text: →
          - listitem [ref=f1e16]:
            - link "Collections" [ref=f1e17] [cursor=pointer]:
              - /url: /collection
      - list [ref=f1e19]:
        - listitem [ref=f1e20]:
          - button "Open wishlist" [ref=f1e21] [cursor=pointer]:
            - generic [ref=f1e24]: "1"
        - listitem [ref=f1e25]:
          - button "Open cart" [ref=f1e26] [cursor=pointer]
  - generic [ref=f1e34]:
    - heading "Berserk Oversize T-shirt" [level=1] [ref=f1e35]
    - list [ref=f1e36]:
      - listitem [ref=f1e37]:
        - link "Home" [ref=f1e38] [cursor=pointer]:
          - /url: /
        - text: /
      - listitem [ref=f1e39]: Berserk Oversize T-shirt
  - generic [ref=f1e41]:
    - generic [ref=f1e42]:
      - generic [ref=f1e43]:
        - generic [ref=f1e44]:
          - generic [ref=f1e45]: "-10%"
          - button [ref=f1e49] [cursor=pointer]
          - generic [ref=f1e53]:
            - generic [ref=f1e54]:
              - group "4 / 4":
                - button
                - generic:
                  - img "Berserk Oversize T-shirt"
              - group "1 / 4" [ref=f1e55]:
                - button [ref=f1e56] [cursor=pointer]
                - img "Berserk Oversize T-shirt" [ref=f1e61]
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
            - generic [ref=f1e62]:
              - button "Go to slide 1" [ref=f1e63] [cursor=pointer]
              - button "Go to slide 2" [ref=f1e64] [cursor=pointer]
              - button "Go to slide 3" [ref=f1e65] [cursor=pointer]
              - button "Go to slide 4" [ref=f1e66] [cursor=pointer]
        - generic [ref=f1e68]:
          - generic [ref=f1e70]:
            - group "1 / 4" [ref=f1e71]:
              - img "Berserk Oversize T-shirt" [ref=f1e73]
            - group "2 / 4" [ref=f1e74]:
              - img "Berserk Oversize T-shirt" [ref=f1e76]
            - group "3 / 4" [ref=f1e77]:
              - img "Berserk Oversize T-shirt" [ref=f1e79]
            - group "4 / 4" [ref=f1e80]:
              - img "Berserk Oversize T-shirt" [ref=f1e82]
          - button "Previous slide" [disabled]
          - button "Next slide" [ref=f1e83] [cursor=pointer]
      - generic [ref=f1e87]:
        - heading "Berserk Oversize T-shirt" [level=2] [ref=f1e88]
        - generic [ref=f1e89]: LKR 3490.00
        - paragraph [ref=f1e92]: Crafted from a premium cotton blend, this black oversize tee features bold back artwork inspired by the iconic Berserk manga. Designed for comfort and impact, it’s the perfect fit for anime fans who live and breathe dark fantasy.
        - generic [ref=f1e93]:
          - generic [ref=f1e94]:
            - generic [ref=f1e95]: Color (white)
            - generic [ref=f1e96]:
              - 'radio "Selected: white" [checked] [disabled]'
              - 'generic "Selected: white" [ref=f1e97]'
          - generic [ref=f1e98]:
            - generic [ref=f1e99]: Size
            - generic [ref=f1e100]:
              - radio "XS" [checked] [active]
              - generic [ref=f1e101] [cursor=pointer]: XS
        - generic [ref=f1e102]:
          - generic [ref=f1e103]: Quantity
          - generic [ref=f1e104]:
            - button "-" [ref=f1e105] [cursor=pointer]
            - textbox [ref=f1e106]: "1"
            - button "+" [ref=f1e107] [cursor=pointer]
        - generic [ref=f1e108]:
          - button "Out of Stock" [disabled] [ref=f1e109]
          - button "Added to wishlist" [ref=f1e110] [cursor=pointer]
        - paragraph [ref=f1e113]: Free delivery on orders over LKR 5,000
        - table [ref=f1e115]:
          - rowgroup [ref=f1e116]:
            - row [ref=f1e117]:
              - cell "SKU:" [ref=f1e118]
              - cell "berserk-oversized-tee" [ref=f1e119]
            - row [ref=f1e120]:
              - cell "Categories:" [ref=f1e121]
              - cell "Oversized T-Shirts, Unisex" [ref=f1e122]
            - row [ref=f1e123]:
              - cell "Tags:" [ref=f1e124]
              - cell "Anime, Street Wear" [ref=f1e125]
            - row [ref=f1e126]:
              - cell "Share on:" [ref=f1e127]
              - cell [ref=f1e128]:
                - list [ref=f1e129]:
                  - listitem [ref=f1e130]:
                    - button "Share on Facebook" [ref=f1e131] [cursor=pointer]
                  - listitem [ref=f1e134]:
                    - button "Share on Twitter" [ref=f1e135] [cursor=pointer]
                  - listitem [ref=f1e138]:
                    - button "Share on WhatsApp" [ref=f1e139] [cursor=pointer]
                  - listitem [ref=f1e142]:
                    - button "Copy URL" [ref=f1e143] [cursor=pointer]
    - generic [ref=f1e148]:
      - tablist [ref=f1e149]:
        - tab "Description" [selected] [ref=f1e151] [cursor=pointer]
        - tab "Additional Information" [ref=f1e153] [cursor=pointer]
      - tabpanel "Description" [ref=f1e155]:
        - generic [ref=f1e156]: Step into the world of dark fantasy with our Berserk Oversize Tee. Inspired by the legendary Berserk manga, this tee features bold back artwork that captures the raw intensity and power of the series. Made from a soft, breathable premium cotton blend, it offers a relaxed oversized fit for all-day comfort and effortless streetwear style. Whether you’re a longtime fan of Guts and his relentless journey or just love edgy anime aesthetics, this tee is a statement piece built for those who embrace their inner warrior. Pair it with cargos or denim and let the design speak for itself.
      - generic [ref=f1e160]:
        - heading "Oversized T-Shirt Size chart" [level=2] [ref=f1e161]
        - img "oversized T-shirt size chart, sizes XXS through XXXL" [ref=f1e162]
  - contentinfo [ref=f1e163]:
    - generic [ref=f1e165]:
      - generic [ref=f1e166]:
        - img "Genki Wardrobe" [ref=f1e168]
        - generic [ref=f1e169]:
          - text: © 2026
          - link "| Genki" [ref=f1e170] [cursor=pointer]:
            - /url: https://genkiwardrobe.com
          - generic [ref=f1e171]: All Rights Reserved
      - generic [ref=f1e172]:
        - heading "INFO" [level=5] [ref=f1e173]
        - navigation [ref=f1e174]:
          - list [ref=f1e175]:
            - listitem [ref=f1e176]:
              - link "About us" [ref=f1e177] [cursor=pointer]:
                - /url: /about-us
            - listitem [ref=f1e178]:
              - link "Contact" [ref=f1e179] [cursor=pointer]:
                - /url: /about-us#contact
            - listitem [ref=f1e180]:
              - link "Privacy Policy" [ref=f1e181] [cursor=pointer]:
                - /url: /privacy-policy
            - listitem [ref=f1e182]:
              - link "Terms and Conditions" [ref=f1e183] [cursor=pointer]:
                - /url: /terms-and-conditions
      - generic [ref=f1e184]:
        - heading "USEFUL LINKS" [level=5] [ref=f1e185]
        - navigation [ref=f1e186]:
          - list [ref=f1e187]:
            - listitem [ref=f1e188]:
              - link "Returns" [ref=f1e189] [cursor=pointer]:
                - /url: /return-policy
            - listitem [ref=f1e190]:
              - link "Shipping & Delivery" [ref=f1e191] [cursor=pointer]:
                - /url: /shipping-policy
            - listitem [ref=f1e192]:
              - link "Size guide" [ref=f1e193] [cursor=pointer]:
                - /url: /size-guide
            - listitem [ref=f1e194]:
              - link "FAQs" [ref=f1e195] [cursor=pointer]:
                - /url: /faq
      - generic [ref=f1e196]:
        - heading "FOLLOW US ON" [level=5] [ref=f1e197]
        - navigation [ref=f1e198]:
          - list [ref=f1e199]:
            - listitem [ref=f1e200]:
              - link "Facebook" [ref=f1e201] [cursor=pointer]:
                - /url: https://facebook.com/genkiwardrobelk
            - listitem [ref=f1e204]:
              - link "Instagram" [ref=f1e205] [cursor=pointer]:
                - /url: https://instagram.com/genkiwardrobelk
            - listitem [ref=f1e208]:
              - link "TikTok" [ref=f1e209] [cursor=pointer]:
                - /url: https://www.tiktok.com/@genkiwardrobelk
            - listitem [ref=f1e212]:
              - link "WhatsApp" [ref=f1e213] [cursor=pointer]:
                - /url: https://wa.me/94701002922
      - generic [ref=f1e217]:
        - heading "Subscribe." [level=2] [ref=f1e218]
        - paragraph [ref=f1e219]: Get the latest drops, exclusive offers, and style updates.
        - generic [ref=f1e222]:
          - textbox "Email address" [ref=f1e223]:
            - /placeholder: Your email address
          - button "Subscribe to newsletter" [disabled] [ref=f1e224]
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