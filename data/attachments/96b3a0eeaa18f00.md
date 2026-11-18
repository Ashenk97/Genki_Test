# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: wishlist.spec.ts >> Wishlist >> should convert a wishlist item into a cart line via PDP
- Location: tests/wishlist.spec.ts:54:7

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /add to cart/i })

```

# Page snapshot

```yaml
- generic [ref=f1e1]:
  - alert [ref=f1e2]: Akaza Acid Wash Oversized Tee | Genki Wardrobe
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
    - heading "Akaza Acid Wash Oversized Tee" [level=1] [ref=f1e35]
    - list [ref=f1e36]:
      - listitem [ref=f1e37]:
        - link "Home" [ref=f1e38] [cursor=pointer]:
          - /url: /
        - text: /
      - listitem [ref=f1e39]: Akaza Acid Wash Oversized Tee
  - generic [ref=f1e41]:
    - generic [ref=f1e42]:
      - generic [ref=f1e44]:
        - generic [ref=f1e45]:
          - generic [ref=f1e46]:
            - button "Remove from wishlist" [pressed] [ref=f1e47] [cursor=pointer]
            - button "View full screen" [ref=f1e50] [cursor=pointer]
          - generic [ref=f1e54]:
            - group "Image 1 of 9" [ref=f1e55]:
              - button "Akaza Acid Wash Oversized Tee in Black, back view, worn by a male model. Open full screen" [ref=f1e56] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Black, back view, worn by a male model" [ref=f1e57]
            - group "Image 2 of 9" [ref=f1e58]:
              - button "Akaza Acid Wash Oversized Tee in Black, back view, worn by a female model. Open full screen" [ref=f1e59] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Black, back view, worn by a female model" [ref=f1e60]
            - group "Image 3 of 9" [ref=f1e61]:
              - button "Akaza Acid Wash Oversized Tee in Ash, back view, worn by a male model. Open full screen" [ref=f1e62] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Ash, back view, worn by a male model" [ref=f1e63]
            - group "Image 4 of 9" [ref=f1e64]:
              - button "Akaza Acid Wash Oversized Tee in Ash, back view, worn by a female model. Open full screen" [ref=f1e65] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Ash, back view, worn by a female model" [ref=f1e66]
            - group "Image 5 of 9" [ref=f1e67]:
              - button "Akaza Acid Wash Oversized Tee in Brown, back view, worn by a male model. Open full screen" [ref=f1e68] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Brown, back view, worn by a male model" [ref=f1e69]
            - group "Image 6 of 9" [ref=f1e70]:
              - button "Akaza Acid Wash Oversized Tee in Brown. Open full screen" [ref=f1e71] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Brown" [ref=f1e72]
            - group "Image 7 of 9" [ref=f1e73]:
              - button "Akaza Acid Wash Oversized Tee in Pink, back view, worn by a female model. Open full screen" [ref=f1e74] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Pink, back view, worn by a female model" [ref=f1e75]
            - group "Image 8 of 9" [ref=f1e76]:
              - button "Akaza Acid Wash Oversized Tee in Purple, back view, worn by a male model. Open full screen" [ref=f1e77] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Purple, back view, worn by a male model" [ref=f1e78]
            - group "Image 9 of 9" [ref=f1e79]:
              - button "Akaza Acid Wash Oversized Tee in Purple, back view, worn by a female model. Open full screen" [ref=f1e80] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Purple, back view, worn by a female model" [ref=f1e81]
          - button "Previous image" [ref=f1e82] [cursor=pointer]
          - button "Next image" [ref=f1e85] [cursor=pointer]
          - paragraph: 1 / 9
        - generic [ref=f1e88]:
          - button [ref=f1e89] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Black, back view, worn by a male model" [ref=f1e90]
          - button [ref=f1e91] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Black, back view, worn by a female model" [ref=f1e92]
          - button [ref=f1e93] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Ash, back view, worn by a male model" [ref=f1e94]
          - button [ref=f1e95] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Ash, back view, worn by a female model" [ref=f1e96]
          - button [ref=f1e97] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Brown, back view, worn by a male model" [ref=f1e98]
          - button [ref=f1e99] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Brown" [ref=f1e100]
          - button [ref=f1e101] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Pink, back view, worn by a female model" [ref=f1e102]
          - button [ref=f1e103] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Purple, back view, worn by a male model" [ref=f1e104]
          - button [ref=f1e105] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Purple, back view, worn by a female model" [ref=f1e106]
      - generic [ref=f1e108]:
        - heading "Akaza Acid Wash Oversized Tee" [level=2] [ref=f1e109]
        - generic [ref=f1e110]: LKR 4490.00
        - paragraph [ref=f1e112]:
          - generic [ref=f1e113]: or 3 × LKR 1,587 with
          - img "Koko" [ref=f1e114]
          - link "How paying in 3 with Koko works (opens paykoko.com in a new tab)" [ref=f1e115] [cursor=pointer]:
            - /url: https://paykoko.com/customer-education
        - paragraph [ref=f1e119]: Akaza acid wash oversized tee with a bold Upper Rank Three back print from Demon Slayer. Heavyweight cotton, unisex fit. Island-wide delivery in Sri Lanka.
        - generic [ref=f1e120]:
          - generic [ref=f1e121]:
            - generic [ref=f1e122]: Color
            - generic [ref=f1e123]:
              - radio "Black" [checked]
              - generic "Black" [ref=f1e124] [cursor=pointer]
              - radio "Ash"
              - generic "Ash" [ref=f1e125] [cursor=pointer]
              - radio "Brown"
              - generic "Brown" [ref=f1e126] [cursor=pointer]
              - radio "Pink"
              - generic "Pink" [ref=f1e127] [cursor=pointer]
              - radio "Purple"
              - generic "Purple" [ref=f1e128] [cursor=pointer]
          - generic [ref=f1e129]:
            - generic [ref=f1e130]: Size
            - generic [ref=f1e131]:
              - radio "S"
              - generic [ref=f1e132] [cursor=pointer]: S
              - radio "M"
              - generic [ref=f1e133] [cursor=pointer]: M
              - radio "L"
              - generic [ref=f1e134] [cursor=pointer]: L
              - radio "XL"
              - generic [ref=f1e135] [cursor=pointer]: XL
              - radio "XXL" [checked] [active]
              - generic [ref=f1e136] [cursor=pointer]: XXL
        - generic [ref=f1e137]:
          - generic [ref=f1e138]: Quantity
          - generic [ref=f1e139]:
            - button "-" [ref=f1e140] [cursor=pointer]
            - textbox [ref=f1e141]: "1"
            - button "+" [ref=f1e142] [cursor=pointer]
        - generic [ref=f1e143]:
          - button "Out of Stock" [disabled] [ref=f1e144]
          - button "Added to wishlist" [ref=f1e145] [cursor=pointer]
        - paragraph [ref=f1e148]: Free delivery on orders of LKR 5,000 or more
        - table [ref=f1e150]:
          - rowgroup [ref=f1e151]:
            - row [ref=f1e152]:
              - cell "SKU:" [ref=f1e153]
              - cell "akaza-acid-wash-oversized-tee" [ref=f1e154]
            - row [ref=f1e155]:
              - cell "Categories:" [ref=f1e156]
              - cell "Acid Washed Oversized, Unisex" [ref=f1e157]
            - row [ref=f1e158]:
              - cell "Tags:" [ref=f1e159]
              - cell "Anime, Street Wear" [ref=f1e160]
            - row [ref=f1e161]:
              - cell "Share on:" [ref=f1e162]
              - cell [ref=f1e163]:
                - list [ref=f1e164]:
                  - listitem [ref=f1e165]:
                    - button "Share on Facebook" [ref=f1e166] [cursor=pointer]
                  - listitem [ref=f1e169]:
                    - button "Share on Twitter" [ref=f1e170] [cursor=pointer]
                  - listitem [ref=f1e173]:
                    - button "Share on WhatsApp" [ref=f1e174] [cursor=pointer]
                  - listitem [ref=f1e177]:
                    - button "Copy URL" [ref=f1e178] [cursor=pointer]
    - generic [ref=f1e183]:
      - tablist [ref=f1e184]:
        - tab "Description" [selected] [ref=f1e186] [cursor=pointer]
        - tab "Additional Information" [ref=f1e188] [cursor=pointer]
      - tabpanel "Description" [ref=f1e190]:
        - generic [ref=f1e191]: "The \"NO.3\" in the corner isn't decoration. Upper Rank Three: the demon who faced Rengoku on the Mugen Train, then took on Tanjiro and Water Hashira Giyu at once in the Infinity Castle. Akaza in a raw, distressed manga style: his face with its navy markings, his name in bold red, and 猗窩座 (Akaza) running down the side. A large back print on an acid-washed oversized tee. Every acid-washed tee fades a little differently, so no two are exactly alike. Unisex, with a relaxed oversized fit and dropped shoulders. Check the size chart below to find your size. If it doesn't fit, you can exchange it for another size within 7 days of delivery. Available in Black, Ash, Brown, Pink and Purple."
      - generic [ref=f1e194]:
        - heading "Acid-Washed T-Shirt Size Chart" [level=2] [ref=f1e195]
        - 'img "Where to measure: A length from shoulder to hem, B chest across, C shoulder seam to shoulder seam, D sleeve from shoulder seam to cuff" [ref=f1e196]':
          - generic [ref=f1e199]: A
          - generic [ref=f1e201]: B
          - generic [ref=f1e203]: C
          - generic [ref=f1e205]: D
        - table [ref=f1e208]:
          - caption [ref=f1e209]: Acid-Washed T-shirt measurements in inches, taken flat
          - rowgroup [ref=f1e210]:
            - row [ref=f1e211]:
              - columnheader "Size" [ref=f1e212]
              - columnheader "A Length" [ref=f1e213]
              - columnheader "B Chest" [ref=f1e214]
              - columnheader "C Shoulder" [ref=f1e215]
              - columnheader "D Sleeve" [ref=f1e216]
          - rowgroup [ref=f1e217]:
            - row [ref=f1e218]:
              - rowheader "S" [ref=f1e219]
              - cell "27" [ref=f1e220]
              - cell "21" [ref=f1e221]
              - cell "21" [ref=f1e222]
              - cell "8" [ref=f1e223]
            - row [ref=f1e224]:
              - rowheader "M" [ref=f1e225]
              - cell "28" [ref=f1e226]
              - cell "22.5" [ref=f1e227]
              - cell "22" [ref=f1e228]
              - cell "9" [ref=f1e229]
            - row [ref=f1e230]:
              - rowheader "L" [ref=f1e231]
              - cell "30" [ref=f1e232]
              - cell "23" [ref=f1e233]
              - cell "22" [ref=f1e234]
              - cell "9" [ref=f1e235]
            - row [ref=f1e236]:
              - rowheader "XL" [ref=f1e237]
              - cell "31" [ref=f1e238]
              - cell "25" [ref=f1e239]
              - cell "25" [ref=f1e240]
              - cell "10" [ref=f1e241]
            - row [ref=f1e242]:
              - rowheader "XXL" [ref=f1e243]
              - cell "32" [ref=f1e244]
              - cell "27" [ref=f1e245]
              - cell "27" [ref=f1e246]
              - cell "10" [ref=f1e247]
        - paragraph [ref=f1e248]: "*All measurements are in inches, taken flat"
  - contentinfo [ref=f1e249]:
    - generic [ref=f1e251]:
      - generic [ref=f1e252]:
        - img "Genki Wardrobe" [ref=f1e254]
        - generic [ref=f1e255]:
          - text: © 2026
          - link "| Genki" [ref=f1e256] [cursor=pointer]:
            - /url: https://genkiwardrobe.com
          - generic [ref=f1e257]: All Rights Reserved
      - generic [ref=f1e258]:
        - heading "INFO" [level=5] [ref=f1e259]
        - navigation [ref=f1e260]:
          - list [ref=f1e261]:
            - listitem [ref=f1e262]:
              - link "About us" [ref=f1e263] [cursor=pointer]:
                - /url: /about-us
            - listitem [ref=f1e264]:
              - link "Contact" [ref=f1e265] [cursor=pointer]:
                - /url: /about-us#contact
            - listitem [ref=f1e266]:
              - link "Privacy Policy" [ref=f1e267] [cursor=pointer]:
                - /url: /privacy-policy
            - listitem [ref=f1e268]:
              - link "Terms and Conditions" [ref=f1e269] [cursor=pointer]:
                - /url: /terms-and-conditions
      - generic [ref=f1e270]:
        - heading "USEFUL LINKS" [level=5] [ref=f1e271]
        - navigation [ref=f1e272]:
          - list [ref=f1e273]:
            - listitem [ref=f1e274]:
              - link "Rewards" [ref=f1e275] [cursor=pointer]:
                - /url: /rewards
            - listitem [ref=f1e276]:
              - link "Returns" [ref=f1e277] [cursor=pointer]:
                - /url: /return-policy
            - listitem [ref=f1e278]:
              - link "Shipping & Delivery" [ref=f1e279] [cursor=pointer]:
                - /url: /shipping-policy
            - listitem [ref=f1e280]:
              - link "Size guide" [ref=f1e281] [cursor=pointer]:
                - /url: /size-guide
            - listitem [ref=f1e282]:
              - link "FAQs" [ref=f1e283] [cursor=pointer]:
                - /url: /faq
      - generic [ref=f1e284]:
        - heading "FOLLOW US ON" [level=5] [ref=f1e285]
        - navigation [ref=f1e286]:
          - list [ref=f1e287]:
            - listitem [ref=f1e288]:
              - link "Facebook" [ref=f1e289] [cursor=pointer]:
                - /url: https://facebook.com/genkiwardrobelk
            - listitem [ref=f1e292]:
              - link "Instagram" [ref=f1e293] [cursor=pointer]:
                - /url: https://instagram.com/genkiwardrobelk
            - listitem [ref=f1e296]:
              - link "TikTok" [ref=f1e297] [cursor=pointer]:
                - /url: https://www.tiktok.com/@genkiwardrobelk
            - listitem [ref=f1e300]:
              - link "WhatsApp" [ref=f1e301] [cursor=pointer]:
                - /url: https://wa.me/94701002922
      - generic [ref=f1e305]:
        - heading "Subscribe." [level=2] [ref=f1e306]
        - paragraph [ref=f1e307]: Get the latest drops, exclusive offers, and style updates.
        - generic [ref=f1e310]:
          - textbox "Email address" [ref=f1e311]:
            - /placeholder: Your email address
          - button "Subscribe to newsletter" [disabled] [ref=f1e312]
  - button "Scroll to top" [ref=f1e315] [cursor=pointer]
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