# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cart-edges.spec.ts >> Cart edges >> should merge quantity when the same variant is added twice
- Location: tests/cart-edges.spec.ts:14:7

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
  - generic [ref=e33]:
    - heading "Akaza Acid Wash Oversized Tee" [level=1] [ref=e34]
    - list [ref=e35]:
      - listitem [ref=e36]:
        - link "Home" [ref=e37] [cursor=pointer]:
          - /url: /
        - text: /
      - listitem [ref=e38]: Akaza Acid Wash Oversized Tee
  - generic [ref=e40]:
    - generic [ref=e41]:
      - generic [ref=e43]:
        - generic [ref=e44]:
          - generic [ref=e45]:
            - button "Add to wishlist" [ref=e46] [cursor=pointer]
            - button "View full screen" [ref=e49] [cursor=pointer]
          - generic [ref=e53]:
            - group "Image 1 of 9" [ref=e54]:
              - button "Akaza Acid Wash Oversized Tee in Black, back view, worn by a male model. Open full screen" [ref=e55] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Black, back view, worn by a male model" [ref=e56]
            - group "Image 2 of 9" [ref=e57]:
              - button "Akaza Acid Wash Oversized Tee in Black, back view, worn by a female model. Open full screen" [ref=e58] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Black, back view, worn by a female model" [ref=e59]
            - group "Image 3 of 9" [ref=e60]:
              - button "Akaza Acid Wash Oversized Tee in Ash, back view, worn by a male model. Open full screen" [ref=e61] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Ash, back view, worn by a male model" [ref=e62]
            - group "Image 4 of 9" [ref=e63]:
              - button "Akaza Acid Wash Oversized Tee in Ash, back view, worn by a female model. Open full screen" [ref=e64] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Ash, back view, worn by a female model" [ref=e65]
            - group "Image 5 of 9" [ref=e66]:
              - button "Akaza Acid Wash Oversized Tee in Brown, back view, worn by a male model. Open full screen" [ref=e67] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Brown, back view, worn by a male model" [ref=e68]
            - group "Image 6 of 9" [ref=e69]:
              - button "Akaza Acid Wash Oversized Tee in Brown. Open full screen" [ref=e70] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Brown" [ref=e71]
            - group "Image 7 of 9" [ref=e72]:
              - button "Akaza Acid Wash Oversized Tee in Pink, back view, worn by a female model. Open full screen" [ref=e73] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Pink, back view, worn by a female model" [ref=e74]
            - group "Image 8 of 9" [ref=e75]:
              - button "Akaza Acid Wash Oversized Tee in Purple, back view, worn by a male model. Open full screen" [ref=e76] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Purple, back view, worn by a male model" [ref=e77]
            - group "Image 9 of 9" [ref=e78]:
              - button "Akaza Acid Wash Oversized Tee in Purple, back view, worn by a female model. Open full screen" [ref=e79] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Purple, back view, worn by a female model" [ref=e80]
          - button "Previous image" [ref=e81] [cursor=pointer]
          - button "Next image" [ref=e84] [cursor=pointer]
          - paragraph: 1 / 9
        - generic [ref=e87]:
          - button [ref=e88] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Black, back view, worn by a male model" [ref=e89]
          - button [ref=e90] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Black, back view, worn by a female model" [ref=e91]
          - button [ref=e92] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Ash, back view, worn by a male model" [ref=e93]
          - button [ref=e94] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Ash, back view, worn by a female model" [ref=e95]
          - button [ref=e96] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Brown, back view, worn by a male model" [ref=e97]
          - button [ref=e98] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Brown" [ref=e99]
          - button [ref=e100] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Pink, back view, worn by a female model" [ref=e101]
          - button [ref=e102] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Purple, back view, worn by a male model" [ref=e103]
          - button [ref=e104] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Purple, back view, worn by a female model" [ref=e105]
      - generic [ref=e107]:
        - heading "Akaza Acid Wash Oversized Tee" [level=2] [ref=e108]
        - generic [ref=e109]: LKR 4490.00
        - paragraph [ref=e111]:
          - generic [ref=e112]: or 3 × LKR 1,587 with
          - img "Koko" [ref=e113]
          - link "How paying in 3 with Koko works (opens paykoko.com in a new tab)" [ref=e114] [cursor=pointer]:
            - /url: https://paykoko.com/customer-education
        - paragraph [ref=e118]: Akaza acid wash oversized tee with a bold Upper Rank Three back print from Demon Slayer. Heavyweight cotton, unisex fit. Island-wide delivery in Sri Lanka.
        - generic [ref=e119]:
          - generic [ref=e120]:
            - generic [ref=e121]: Color
            - generic [ref=e122]:
              - radio "Black" [checked]
              - generic "Black" [ref=e123] [cursor=pointer]
              - radio "Ash"
              - generic "Ash" [ref=e124] [cursor=pointer]
              - radio "Brown"
              - generic "Brown" [ref=e125] [cursor=pointer]
              - radio "Pink"
              - generic "Pink" [ref=e126] [cursor=pointer]
              - radio "Purple"
              - generic "Purple" [ref=e127] [cursor=pointer]
          - generic [ref=e128]:
            - generic [ref=e129]: Size
            - generic [ref=e130]:
              - radio "S"
              - generic [ref=e131] [cursor=pointer]: S
              - radio "M" [checked] [active]
              - generic [ref=e132] [cursor=pointer]: M
              - radio "L"
              - generic [ref=e133] [cursor=pointer]: L
              - radio "XL"
              - generic [ref=e134] [cursor=pointer]: XL
              - radio "XXL"
              - generic [ref=e135] [cursor=pointer]: XXL
        - generic [ref=e136]:
          - generic [ref=e137]: Quantity
          - generic [ref=e138]:
            - button "-" [ref=e139] [cursor=pointer]
            - textbox [ref=e140]: "1"
            - button "+" [ref=e141] [cursor=pointer]
        - generic [ref=e142]:
          - button "Out of Stock" [disabled] [ref=e143]
          - button "Add to wishlist" [ref=e144] [cursor=pointer]
        - paragraph [ref=e147]: Free delivery on orders of LKR 5,000 or more
        - table [ref=e149]:
          - rowgroup [ref=e150]:
            - row [ref=e151]:
              - cell "SKU:" [ref=e152]
              - cell "akaza-acid-wash-oversized-tee" [ref=e153]
            - row [ref=e154]:
              - cell "Categories:" [ref=e155]
              - cell "Acid Washed Oversized, Unisex" [ref=e156]
            - row [ref=e157]:
              - cell "Tags:" [ref=e158]
              - cell "Anime, Street Wear" [ref=e159]
            - row [ref=e160]:
              - cell "Share on:" [ref=e161]
              - cell [ref=e162]:
                - list [ref=e163]:
                  - listitem [ref=e164]:
                    - button "Share on Facebook" [ref=e165] [cursor=pointer]
                  - listitem [ref=e168]:
                    - button "Share on Twitter" [ref=e169] [cursor=pointer]
                  - listitem [ref=e172]:
                    - button "Share on WhatsApp" [ref=e173] [cursor=pointer]
                  - listitem [ref=e176]:
                    - button "Copy URL" [ref=e177] [cursor=pointer]
    - generic [ref=e182]:
      - tablist [ref=e183]:
        - tab "Description" [selected] [ref=e185] [cursor=pointer]
        - tab "Additional Information" [ref=e187] [cursor=pointer]
      - tabpanel "Description" [ref=e189]:
        - generic [ref=e190]: "The \"NO.3\" in the corner isn't decoration. Upper Rank Three: the demon who faced Rengoku on the Mugen Train, then took on Tanjiro and Water Hashira Giyu at once in the Infinity Castle. Akaza in a raw, distressed manga style: his face with its navy markings, his name in bold red, and 猗窩座 (Akaza) running down the side. A large back print on an acid-washed oversized tee. Every acid-washed tee fades a little differently, so no two are exactly alike. Unisex, with a relaxed oversized fit and dropped shoulders. Check the size chart below to find your size. If it doesn't fit, you can exchange it for another size within 7 days of delivery. Available in Black, Ash, Brown, Pink and Purple."
      - generic [ref=e193]:
        - heading "Acid-Washed T-Shirt Size Chart" [level=2] [ref=e194]
        - 'img "Where to measure: A length from shoulder to hem, B chest across, C shoulder seam to shoulder seam, D sleeve from shoulder seam to cuff" [ref=e195]':
          - generic [ref=e198]: A
          - generic [ref=e200]: B
          - generic [ref=e202]: C
          - generic [ref=e204]: D
        - table [ref=e207]:
          - caption [ref=e208]: Acid-Washed T-shirt measurements in inches, taken flat
          - rowgroup [ref=e209]:
            - row [ref=e210]:
              - columnheader "Size" [ref=e211]
              - columnheader "A Length" [ref=e212]
              - columnheader "B Chest" [ref=e213]
              - columnheader "C Shoulder" [ref=e214]
              - columnheader "D Sleeve" [ref=e215]
          - rowgroup [ref=e216]:
            - row [ref=e217]:
              - rowheader "S" [ref=e218]
              - cell "27" [ref=e219]
              - cell "21" [ref=e220]
              - cell "21" [ref=e221]
              - cell "8" [ref=e222]
            - row [ref=e223]:
              - rowheader "M" [ref=e224]
              - cell "28" [ref=e225]
              - cell "22.5" [ref=e226]
              - cell "22" [ref=e227]
              - cell "9" [ref=e228]
            - row [ref=e229]:
              - rowheader "L" [ref=e230]
              - cell "30" [ref=e231]
              - cell "23" [ref=e232]
              - cell "22" [ref=e233]
              - cell "9" [ref=e234]
            - row [ref=e235]:
              - rowheader "XL" [ref=e236]
              - cell "31" [ref=e237]
              - cell "25" [ref=e238]
              - cell "25" [ref=e239]
              - cell "10" [ref=e240]
            - row [ref=e241]:
              - rowheader "XXL" [ref=e242]
              - cell "32" [ref=e243]
              - cell "27" [ref=e244]
              - cell "27" [ref=e245]
              - cell "10" [ref=e246]
        - paragraph [ref=e247]: "*All measurements are in inches, taken flat"
  - contentinfo [ref=e248]:
    - generic [ref=e250]:
      - generic [ref=e251]:
        - img "Genki Wardrobe" [ref=e253]
        - generic [ref=e254]:
          - text: © 2026
          - link "| Genki" [ref=e255] [cursor=pointer]:
            - /url: https://genkiwardrobe.com
          - generic [ref=e256]: All Rights Reserved
      - generic [ref=e257]:
        - heading "INFO" [level=5] [ref=e258]
        - navigation [ref=e259]:
          - list [ref=e260]:
            - listitem [ref=e261]:
              - link "About us" [ref=e262] [cursor=pointer]:
                - /url: /about-us
            - listitem [ref=e263]:
              - link "Contact" [ref=e264] [cursor=pointer]:
                - /url: /about-us#contact
            - listitem [ref=e265]:
              - link "Privacy Policy" [ref=e266] [cursor=pointer]:
                - /url: /privacy-policy
            - listitem [ref=e267]:
              - link "Terms and Conditions" [ref=e268] [cursor=pointer]:
                - /url: /terms-and-conditions
      - generic [ref=e269]:
        - heading "USEFUL LINKS" [level=5] [ref=e270]
        - navigation [ref=e271]:
          - list [ref=e272]:
            - listitem [ref=e273]:
              - link "Rewards" [ref=e274] [cursor=pointer]:
                - /url: /rewards
            - listitem [ref=e275]:
              - link "Returns" [ref=e276] [cursor=pointer]:
                - /url: /return-policy
            - listitem [ref=e277]:
              - link "Shipping & Delivery" [ref=e278] [cursor=pointer]:
                - /url: /shipping-policy
            - listitem [ref=e279]:
              - link "Size guide" [ref=e280] [cursor=pointer]:
                - /url: /size-guide
            - listitem [ref=e281]:
              - link "FAQs" [ref=e282] [cursor=pointer]:
                - /url: /faq
      - generic [ref=e283]:
        - heading "FOLLOW US ON" [level=5] [ref=e284]
        - navigation [ref=e285]:
          - list [ref=e286]:
            - listitem [ref=e287]:
              - link "Facebook" [ref=e288] [cursor=pointer]:
                - /url: https://facebook.com/genkiwardrobelk
            - listitem [ref=e291]:
              - link "Instagram" [ref=e292] [cursor=pointer]:
                - /url: https://instagram.com/genkiwardrobelk
            - listitem [ref=e295]:
              - link "TikTok" [ref=e296] [cursor=pointer]:
                - /url: https://www.tiktok.com/@genkiwardrobelk
            - listitem [ref=e299]:
              - link "WhatsApp" [ref=e300] [cursor=pointer]:
                - /url: https://wa.me/94701002922
      - generic [ref=e304]:
        - heading "Subscribe." [level=2] [ref=e305]
        - paragraph [ref=e306]: Get the latest drops, exclusive offers, and style updates.
        - generic [ref=e309]:
          - textbox "Email address" [ref=e310]:
            - /placeholder: Your email address
          - button "Subscribe to newsletter" [disabled] [ref=e311]
  - button "Scroll to top" [ref=e314] [cursor=pointer]
```

# Test source

```ts
  23  |   private readonly cartDrawerClose: Locator;
  24  |   private readonly freeDeliveryNote: Locator;
  25  |   private readonly galleryImage: Locator;
  26  |   private readonly galleryThumbs: Locator;
  27  | 
  28  |   constructor(page: Page) {
  29  |     super(page);
  30  | 
  31  |     this.productTitle = page.getByRole('heading', { level: 1 }).first();
  32  |     this.price = page
  33  |       .locator('span.main-price, span.discounted-price')
  34  |       .or(page.getByText(/LKR\s*[\d,.]+/))
  35  |       .first();
  36  |     this.addToCartButton = page.getByRole('button', { name: /add to cart/i });
  37  |     this.outOfStockButton = page.getByRole('button', { name: /out of stock/i });
  38  |     this.selectSizePrompt = page.getByRole('button', { name: /select a size/i });
  39  |     this.selectColorPrompt = page.getByRole('button', { name: /select a color/i });
  40  |     this.addToWishlistButton = page
  41  |       .locator('.product-content__wishlist')
  42  |       .or(page.getByRole('button', { name: /add to wishlist/i }))
  43  |       .first();
  44  |     this.qtyInput = page.locator('.product-content .cart-plus-minus-box').first();
  45  |     this.increaseQtyButton = page
  46  |       .locator('.product-content button.qtybutton')
  47  |       .filter({ hasText: /^\+$/ })
  48  |       .first();
  49  |     this.decreaseQtyButton = page
  50  |       .locator('.product-content button.qtybutton')
  51  |       .filter({ hasText: /^−$|^-$/ })
  52  |       .first();
  53  |     this.sizeRadios = page.locator('.product-content__size__content input[type="radio"]');
  54  |     this.sizeLabels = page.locator('.product-content__size__content label');
  55  |     this.colorRadios = page.locator('input[name="product-color"]');
  56  |     this.cartDrawerClose = page.locator('.cart-overlay__close-icon');
  57  |     this.freeDeliveryNote = page.locator('.product-content__delivery-note');
  58  |     this.galleryImage = page
  59  |       .locator('.product-gallery__image img, .product-large-image-wrapper .single-image img')
  60  |       .first();
  61  |     this.galleryThumbs = page.locator(
  62  |       '.product-gallery__image img, .product-small-image-wrapper img, .product-large-image-wrapper .swiper-slide img',
  63  |     );
  64  |   }
  65  | 
  66  |   /** Acid-wash PDPs hide sizes until a color is chosen. */
  67  |   private async ensureColorSelected(): Promise<void> {
  68  |     if (await this.selectColorPrompt.isVisible().catch(() => false)) {
  69  |       await this.selectFirstColor();
  70  |     }
  71  |   }
  72  | 
  73  |   private async variantAction(): Promise<'atc' | 'oos' | ''> {
  74  |     if (await this.addToCartButton.isVisible().catch(() => false)) {
  75  |       return 'atc';
  76  |     }
  77  |     if (await this.outOfStockButton.isVisible().catch(() => false)) {
  78  |       return 'oos';
  79  |     }
  80  |     return '';
  81  |   }
  82  | 
  83  |   /** Picks the first size that can be added. Some sizes, such as Black / S, are out of stock. */
  84  |   async selectFirstAvailableSize(): Promise<this> {
  85  |     await this.ensureColorSelected();
  86  |     const count = await this.sizeLabels.count();
  87  |     for (let i = 0; i < count; i += 1) {
  88  |       await this.sizeLabels.nth(i).click();
  89  |       if ((await this.variantAction()) === 'atc') {
  90  |         return this;
  91  |       }
  92  |     }
  93  |     return this;
  94  |   }
  95  | 
  96  |   async selectSize(size: string): Promise<this> {
  97  |     await this.ensureColorSelected();
  98  |     const byRole = this.page.getByRole('radio', {
  99  |       name: new RegExp(`^${size}$`, 'i'),
  100 |     });
  101 |     if (await byRole.isVisible().catch(() => false)) {
  102 |       await byRole.click();
  103 |       return this;
  104 |     }
  105 | 
  106 |     const sizeInput = this.page
  107 |       .locator(`.product-content__size__content input[type="radio"][value="${size}" i], input[type="radio"]#${size}`)
  108 |       .first();
  109 |     const sizeId = await sizeInput.getAttribute('id');
  110 |     if (sizeId) {
  111 |       const label = this.page.locator(`label[for="${sizeId}"]`);
  112 |       if (await label.isVisible().catch(() => false)) {
  113 |         await label.click();
  114 |         return this;
  115 |       }
  116 |     }
  117 | 
  118 |     await sizeInput.click({ force: true });
  119 |     return this;
  120 |   }
  121 | 
  122 |   async addToCart(): Promise<this> {
> 123 |     await this.addToCartButton.click();
      |                                ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
  124 |     return this;
  125 |   }
  126 | 
  127 |   async expectAddToCartVisible(): Promise<void> {
  128 |     await expect(this.addToCartButton).toBeVisible();
  129 |     await expect(this.addToCartButton).toBeEnabled();
  130 |   }
  131 | 
  132 |   async expectAddToCartOrOutOfStock(): Promise<void> {
  133 |     await expect(this.addToCartButton.or(this.outOfStockButton)).toBeVisible();
  134 |     if (await this.addToCartButton.isVisible().catch(() => false)) {
  135 |       await expect(this.addToCartButton).toBeEnabled();
  136 |       return;
  137 |     }
  138 |     await expect(this.outOfStockButton).toBeDisabled();
  139 |   }
  140 | 
  141 |   async expectSizeRequired(): Promise<void> {
  142 |     await expect(this.selectSizePrompt).toBeVisible();
  143 |     await expect(this.addToCartButton).toHaveCount(0);
  144 |   }
  145 | 
  146 |   async expectColorRequired(): Promise<void> {
  147 |     await expect(this.selectColorPrompt).toBeVisible();
  148 |     await expect(this.addToCartButton).toHaveCount(0);
  149 |   }
  150 | 
  151 |   async expectSizesHidden(): Promise<void> {
  152 |     await expect(this.sizeLabels).toHaveCount(0);
  153 |   }
  154 | 
  155 |   async expectSizesVisible(): Promise<void> {
  156 |     await expect(this.sizeLabels.first()).toBeVisible();
  157 |   }
  158 | 
  159 |   async selectFirstColor(): Promise<this> {
  160 |     await this.colorRadios.first().evaluate((el: HTMLInputElement) => el.click());
  161 |     await expect(
  162 |       this.sizeLabels.first().or(this.addToCartButton).or(this.outOfStockButton),
  163 |     ).toBeVisible();
  164 |     return this;
  165 |   }
  166 | 
  167 |   /**
  168 |    * Select color/size if the PDP requires them. Returns false when the variant is out of stock.
  169 |    */
  170 |   async tryEnableAddToCart(): Promise<boolean> {
  171 |     await this.expectProductDetailsVisible();
  172 | 
  173 |     if (await this.selectColorPrompt.isVisible().catch(() => false)) {
  174 |       await this.selectFirstColor();
  175 |     }
  176 | 
  177 |     const sizeByRole = this.page.getByRole('radio', { name: SIZE_RADIO_PATTERN }).first();
  178 |     await expect
  179 |       .poll(async () => {
  180 |         if (await this.outOfStockButton.isVisible().catch(() => false)) {
  181 |           return 'oos';
  182 |         }
  183 |         if (await this.addToCartButton.isVisible().catch(() => false)) {
  184 |           return 'atc';
  185 |         }
  186 |         if (
  187 |           (await sizeByRole.isVisible().catch(() => false)) ||
  188 |           (await this.sizeRadios.count()) > 0
  189 |         ) {
  190 |           return 'size';
  191 |         }
  192 |         return '';
  193 |       })
  194 |       .not.toBe('');
  195 | 
  196 |     if (await this.outOfStockButton.isVisible().catch(() => false)) {
  197 |       return false;
  198 |     }
  199 |     if (await this.addToCartButton.isVisible().catch(() => false)) {
  200 |       return true;
  201 |     }
  202 | 
  203 |     await this.selectFirstAvailableSize();
  204 |     await expect(this.addToCartButton.or(this.outOfStockButton)).toBeVisible();
  205 |     return this.addToCartButton.isVisible().catch(() => false);
  206 |   }
  207 | 
  208 |   async selectColor(color: string): Promise<this> {
  209 |     const input = this.page.locator(`input[name="product-color"][value="${color}" i]`).first();
  210 |     await input.evaluate((el: HTMLInputElement) => el.click());
  211 |     await expect(input).toBeChecked();
  212 |     await expect(this.sizeLabels.first()).toBeVisible();
  213 |     return this;
  214 |   }
  215 | 
  216 |   /** Highest `availableQuantity` for the color. Checkout rejects sizes the PDP still lets you add. */
  217 |   async bestInStockSize(color?: string, minimum = 1): Promise<string> {
  218 |     const html = (await this.page.content()).replace(/\\"/g, '"');
  219 |     const pattern =
  220 |       /"color":"([^"]+)"[\s\S]{0,180}?"size":"([^"]+)"[\s\S]{0,500}?"availableQuantity":(\d+)/g;
  221 |     const quantities = new Map<string, number>();
  222 |     let match: RegExpExecArray | null;
  223 |     while ((match = pattern.exec(html))) {
```