# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout.spec.ts >> Checkout >> should load checkout with billing and payment methods
- Location: tests/checkout.spec.ts:12:7

# Error details

```
Error: No size with at least 1 in stock for Black on https://staging.genkiwardrobe.com/products/akaza-acid-wash-oversized-tee
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
        - link "Rewards" [ref=e17] [cursor=pointer]:
          - /url: /rewards
        - generic [ref=e18]: "|"
        - link "Login" [ref=e20] [cursor=pointer]:
          - /url: /login
        - generic [ref=e21]: "|"
        - list [ref=e23]:
          - listitem [ref=e24]:
            - link "Genki Wardrobe on Facebook" [ref=e25] [cursor=pointer]:
              - /url: https://facebook.com/genkiwardrobelk
          - listitem [ref=e28]:
            - link "Genki Wardrobe on Instagram" [ref=e29] [cursor=pointer]:
              - /url: https://instagram.com/genkiwardrobelk
    - generic [ref=e35]:
      - link [ref=e37] [cursor=pointer]:
        - /url: /
        - img "Genki Wardrobe" [ref=e38]
      - navigation [ref=e39]:
        - list [ref=e40]:
          - listitem [ref=e41]:
            - link "Men" [ref=e42] [cursor=pointer]:
              - /url: /collection/men
            - text: →
          - listitem [ref=e43]:
            - link "Women" [ref=e44] [cursor=pointer]:
              - /url: /collection/women
            - text: →
          - listitem [ref=e45]:
            - link "Collections" [ref=e46] [cursor=pointer]:
              - /url: /collection
      - list [ref=e48]:
        - listitem [ref=e49]:
          - button "Open wishlist" [ref=e50] [cursor=pointer]
        - listitem [ref=e53]:
          - button "Open cart" [ref=e54] [cursor=pointer]
  - generic [ref=e62]:
    - heading "Akaza Acid Wash Oversized Tee" [level=1] [ref=e63]
    - list [ref=e64]:
      - listitem [ref=e65]:
        - link "Home" [ref=e66] [cursor=pointer]:
          - /url: /
        - text: /
      - listitem [ref=e67]: Akaza Acid Wash Oversized Tee
  - generic [ref=e69]:
    - generic [ref=e70]:
      - generic [ref=e72]:
        - generic [ref=e73]:
          - generic [ref=e74]:
            - button "Add to wishlist" [ref=e75] [cursor=pointer]
            - button "View full screen" [ref=e78] [cursor=pointer]
          - generic [ref=e82]:
            - group "Image 1 of 9" [ref=e83]:
              - button "Akaza Acid Wash Oversized Tee in Black, back view, worn by a male model. Open full screen" [ref=e84] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Black, back view, worn by a male model" [ref=e85]
            - group "Image 2 of 9" [ref=e86]:
              - button "Akaza Acid Wash Oversized Tee in Black, back view, worn by a female model. Open full screen" [ref=e87] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Black, back view, worn by a female model" [ref=e88]
            - group "Image 3 of 9" [ref=e89]:
              - button "Akaza Acid Wash Oversized Tee in Ash, back view, worn by a male model. Open full screen" [ref=e90] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Ash, back view, worn by a male model" [ref=e91]
            - group "Image 4 of 9" [ref=e92]:
              - button "Akaza Acid Wash Oversized Tee in Ash, back view, worn by a female model. Open full screen" [ref=e93] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Ash, back view, worn by a female model" [ref=e94]
            - group "Image 5 of 9" [ref=e95]:
              - button "Akaza Acid Wash Oversized Tee in Brown, back view, worn by a male model. Open full screen" [ref=e96] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Brown, back view, worn by a male model" [ref=e97]
            - group "Image 6 of 9" [ref=e98]:
              - button "Akaza Acid Wash Oversized Tee in Brown. Open full screen" [ref=e99] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Brown" [ref=e100]
            - group "Image 7 of 9" [ref=e101]:
              - button "Akaza Acid Wash Oversized Tee in Pink, back view, worn by a female model. Open full screen" [ref=e102] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Pink, back view, worn by a female model" [ref=e103]
            - group "Image 8 of 9" [ref=e104]:
              - button "Akaza Acid Wash Oversized Tee in Purple, back view, worn by a male model. Open full screen" [ref=e105] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Purple, back view, worn by a male model" [ref=e106]
            - group "Image 9 of 9" [ref=e107]:
              - button "Akaza Acid Wash Oversized Tee in Purple, back view, worn by a female model. Open full screen" [ref=e108] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Purple, back view, worn by a female model" [ref=e109]
          - button "Previous image" [ref=e110] [cursor=pointer]
          - button "Next image" [ref=e113] [cursor=pointer]
          - paragraph: 1 / 9
        - generic [ref=e116]:
          - button [ref=e117] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Black, back view, worn by a male model" [ref=e118]
          - button [ref=e119] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Black, back view, worn by a female model" [ref=e120]
          - button [ref=e121] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Ash, back view, worn by a male model" [ref=e122]
          - button [ref=e123] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Ash, back view, worn by a female model" [ref=e124]
          - button [ref=e125] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Brown, back view, worn by a male model" [ref=e126]
          - button [ref=e127] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Brown" [ref=e128]
          - button [ref=e129] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Pink, back view, worn by a female model" [ref=e130]
          - button [ref=e131] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Purple, back view, worn by a male model" [ref=e132]
          - button [ref=e133] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Purple, back view, worn by a female model" [ref=e134]
      - generic [ref=e136]:
        - heading "Akaza Acid Wash Oversized Tee" [level=2] [ref=e137]
        - generic [ref=e138]: LKR 4490.00
        - paragraph [ref=e140]:
          - generic [ref=e141]: or 3 × LKR 1,587 with
          - img "Koko" [ref=e142]
          - link "How paying in 3 with Koko works (opens paykoko.com in a new tab)" [ref=e143] [cursor=pointer]:
            - /url: https://paykoko.com/customer-education
        - paragraph [ref=e147]: Akaza acid wash oversized tee with a bold Upper Rank Three back print from Demon Slayer. Heavyweight cotton, unisex fit. Island-wide delivery in Sri Lanka.
        - generic [ref=e148]:
          - generic [ref=e149]:
            - generic [ref=e150]: Color
            - generic [ref=e151]:
              - radio "Black" [checked]
              - generic "Black" [ref=e152] [cursor=pointer]
              - radio "Ash"
              - generic "Ash" [ref=e153] [cursor=pointer]
              - radio "Brown"
              - generic "Brown" [ref=e154] [cursor=pointer]
              - radio "Pink"
              - generic "Pink" [ref=e155] [cursor=pointer]
              - radio "Purple"
              - generic "Purple" [ref=e156] [cursor=pointer]
          - generic [ref=e157]:
            - generic [ref=e158]: Size
            - generic [ref=e159]:
              - radio "S"
              - generic [ref=e160] [cursor=pointer]: S
              - radio "M"
              - generic [ref=e161] [cursor=pointer]: M
              - radio "L"
              - generic [ref=e162] [cursor=pointer]: L
              - radio "XL"
              - generic [ref=e163] [cursor=pointer]: XL
              - radio "XXL"
              - generic [ref=e164] [cursor=pointer]: XXL
        - generic [ref=e165]:
          - generic [ref=e166]: Quantity
          - generic [ref=e167]:
            - button "-" [disabled] [ref=e168]
            - textbox [ref=e169]: "1"
            - button "+" [disabled] [ref=e170]
        - generic [ref=e171]:
          - button "Select a size" [disabled] [ref=e172]
          - button "Add to wishlist" [ref=e173] [cursor=pointer]
        - paragraph [ref=e176]: Free delivery on orders of LKR 5,000 or more
        - table [ref=e178]:
          - rowgroup [ref=e179]:
            - row [ref=e180]:
              - cell "SKU:" [ref=e181]
              - cell "akaza-acid-wash-oversized-tee" [ref=e182]
            - row [ref=e183]:
              - cell "Categories:" [ref=e184]
              - cell "Acid Washed Oversized, Unisex" [ref=e185]
            - row [ref=e186]:
              - cell "Tags:" [ref=e187]
              - cell "Anime, Street Wear" [ref=e188]
            - row [ref=e189]:
              - cell "Share on:" [ref=e190]
              - cell [ref=e191]:
                - list [ref=e192]:
                  - listitem [ref=e193]:
                    - button "Share on Facebook" [ref=e194] [cursor=pointer]
                  - listitem [ref=e197]:
                    - button "Share on Twitter" [ref=e198] [cursor=pointer]
                  - listitem [ref=e201]:
                    - button "Share on WhatsApp" [ref=e202] [cursor=pointer]
                  - listitem [ref=e205]:
                    - button "Copy URL" [ref=e206] [cursor=pointer]
    - generic [ref=e211]:
      - tablist [ref=e212]:
        - tab "Description" [selected] [ref=e214] [cursor=pointer]
        - tab "Additional Information" [ref=e216] [cursor=pointer]
      - tabpanel "Description" [ref=e218]:
        - generic [ref=e219]: "The \"NO.3\" in the corner isn't decoration. Upper Rank Three: the demon who faced Rengoku on the Mugen Train, then took on Tanjiro and Water Hashira Giyu at once in the Infinity Castle. Akaza in a raw, distressed manga style: his face with its navy markings, his name in bold red, and 猗窩座 (Akaza) running down the side. A large back print on an acid-washed oversized tee. Every acid-washed tee fades a little differently, so no two are exactly alike. Unisex, with a relaxed oversized fit and dropped shoulders. Check the size chart below to find your size. If it doesn't fit, you can exchange it for another size within 7 days of delivery. Available in Black, Ash, Brown, Pink and Purple."
      - generic [ref=e222]:
        - heading "Acid-Washed T-Shirt Size Chart" [level=2] [ref=e223]
        - 'img "Where to measure: A length from shoulder to hem, B chest across, C shoulder seam to shoulder seam, D sleeve from shoulder seam to cuff" [ref=e224]':
          - generic [ref=e227]: A
          - generic [ref=e229]: B
          - generic [ref=e231]: C
          - generic [ref=e233]: D
        - table [ref=e236]:
          - caption [ref=e237]: Acid-Washed T-shirt measurements in inches, taken flat
          - rowgroup [ref=e238]:
            - row [ref=e239]:
              - columnheader "Size" [ref=e240]
              - columnheader "A Length" [ref=e241]
              - columnheader "B Chest" [ref=e242]
              - columnheader "C Shoulder" [ref=e243]
              - columnheader "D Sleeve" [ref=e244]
          - rowgroup [ref=e245]:
            - row [ref=e246]:
              - rowheader "S" [ref=e247]
              - cell "27" [ref=e248]
              - cell "21" [ref=e249]
              - cell "21" [ref=e250]
              - cell "8" [ref=e251]
            - row [ref=e252]:
              - rowheader "M" [ref=e253]
              - cell "28" [ref=e254]
              - cell "22.5" [ref=e255]
              - cell "22" [ref=e256]
              - cell "9" [ref=e257]
            - row [ref=e258]:
              - rowheader "L" [ref=e259]
              - cell "30" [ref=e260]
              - cell "23" [ref=e261]
              - cell "22" [ref=e262]
              - cell "9" [ref=e263]
            - row [ref=e264]:
              - rowheader "XL" [ref=e265]
              - cell "31" [ref=e266]
              - cell "25" [ref=e267]
              - cell "25" [ref=e268]
              - cell "10" [ref=e269]
            - row [ref=e270]:
              - rowheader "XXL" [ref=e271]
              - cell "32" [ref=e272]
              - cell "27" [ref=e273]
              - cell "27" [ref=e274]
              - cell "10" [ref=e275]
        - paragraph [ref=e276]: "*All measurements are in inches, taken flat"
  - contentinfo [ref=e277]:
    - generic [ref=e279]:
      - generic [ref=e280]:
        - img "Genki Wardrobe" [ref=e282]
        - generic [ref=e283]:
          - text: © 2026
          - link "| Genki" [ref=e284] [cursor=pointer]:
            - /url: https://genkiwardrobe.com
          - generic [ref=e285]: All Rights Reserved
      - generic [ref=e286]:
        - heading "INFO" [level=5] [ref=e287]
        - navigation [ref=e288]:
          - list [ref=e289]:
            - listitem [ref=e290]:
              - link "About us" [ref=e291] [cursor=pointer]:
                - /url: /about-us
            - listitem [ref=e292]:
              - link "Contact" [ref=e293] [cursor=pointer]:
                - /url: /about-us#contact
            - listitem [ref=e294]:
              - link "Privacy Policy" [ref=e295] [cursor=pointer]:
                - /url: /privacy-policy
            - listitem [ref=e296]:
              - link "Terms and Conditions" [ref=e297] [cursor=pointer]:
                - /url: /terms-and-conditions
      - generic [ref=e298]:
        - heading "USEFUL LINKS" [level=5] [ref=e299]
        - navigation [ref=e300]:
          - list [ref=e301]:
            - listitem [ref=e302]:
              - link "Rewards" [ref=e303] [cursor=pointer]:
                - /url: /rewards
            - listitem [ref=e304]:
              - link "Returns" [ref=e305] [cursor=pointer]:
                - /url: /return-policy
            - listitem [ref=e306]:
              - link "Shipping & Delivery" [ref=e307] [cursor=pointer]:
                - /url: /shipping-policy
            - listitem [ref=e308]:
              - link "Size guide" [ref=e309] [cursor=pointer]:
                - /url: /size-guide
            - listitem [ref=e310]:
              - link "FAQs" [ref=e311] [cursor=pointer]:
                - /url: /faq
      - generic [ref=e312]:
        - heading "FOLLOW US ON" [level=5] [ref=e313]
        - navigation [ref=e314]:
          - list [ref=e315]:
            - listitem [ref=e316]:
              - link "Facebook" [ref=e317] [cursor=pointer]:
                - /url: https://facebook.com/genkiwardrobelk
            - listitem [ref=e320]:
              - link "Instagram" [ref=e321] [cursor=pointer]:
                - /url: https://instagram.com/genkiwardrobelk
            - listitem [ref=e324]:
              - link "TikTok" [ref=e325] [cursor=pointer]:
                - /url: https://www.tiktok.com/@genkiwardrobelk
            - listitem [ref=e328]:
              - link "WhatsApp" [ref=e329] [cursor=pointer]:
                - /url: https://wa.me/94701002922
      - generic [ref=e333]:
        - heading "Subscribe." [level=2] [ref=e334]
        - paragraph [ref=e335]: Get the latest drops, exclusive offers, and style updates.
        - generic [ref=e338]:
          - textbox "Email address" [ref=e339]:
            - /placeholder: Your email address
          - button "Subscribe to newsletter" [disabled] [ref=e340]
```

# Test source

```ts
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
  224 |       if (color && match[1].toLowerCase() !== color.toLowerCase()) {
  225 |         continue;
  226 |       }
  227 |       const size = match[2];
  228 |       const quantity = Number(match[3]);
  229 |       quantities.set(size, Math.max(quantities.get(size) ?? 0, quantity));
  230 |     }
  231 |     const blocked = rejectedSizes();
  232 |     const preferred = ['XL', 'XXL', 'L', 'M', 'S'];
  233 |     const start = Number(process.env.TEST_WORKER_INDEX || 0) % preferred.length;
  234 |     const ordered = [...preferred.slice(start), ...preferred.slice(0, start)];
  235 |     const chosen = ordered.find((size) => !blocked.has(size) && (quantities.get(size) ?? 0) >= minimum);
  236 |     if (chosen) {
  237 |       return chosen;
  238 |     }
  239 |     const fallback = [...quantities.entries()].find(
  240 |       ([size, quantity]) => !blocked.has(size) && quantity >= minimum,
  241 |     );
  242 |     if (!fallback) {
> 243 |       throw new Error(
      |             ^ Error: No size with at least 1 in stock for Black on https://staging.genkiwardrobe.com/products/akaza-acid-wash-oversized-tee
  244 |         `No size with at least ${minimum} in stock${color ? ` for ${color}` : ''} on ${this.page.url()}`,
  245 |       );
  246 |     }
  247 |     return fallback[0];
  248 |   }
  249 | 
  250 |   async expectSelectedColor(color: string): Promise<void> {
  251 |     await expect(
  252 |       this.page.locator(`input[name="product-color"][value="${color}" i]`),
  253 |     ).toBeChecked();
  254 |   }
  255 | 
  256 |   async expectSingleColorLocked(color: string): Promise<void> {
  257 |     const input = this.page.locator(`input[name="product-color"][value="${color}" i]`);
  258 |     await expect(input).toBeChecked();
  259 |     await expect(input).toBeDisabled();
  260 |     await expect(this.colorRadios).toHaveCount(1);
  261 |     await expect(this.page.locator(`label[for="${color}"]`)).toBeVisible();
  262 |   }
  263 | 
  264 |   async expectColorOptions(colors: readonly string[]): Promise<void> {
  265 |     await expect(this.colorRadios).toHaveCount(colors.length);
  266 |     for (const color of colors) {
  267 |       await expect(this.page.locator(`label[for="${color}"]`)).toBeVisible();
  268 |     }
  269 |   }
  270 | 
  271 |   async expectColorAbsent(color: string): Promise<void> {
  272 |     await expect(this.page.locator(`input[name="product-color"][value="${color}" i]`)).toHaveCount(0);
  273 |   }
  274 | 
  275 |   async expectListedSizes(sizes: readonly string[]): Promise<void> {
  276 |     await expect(this.sizeLabels).toHaveText([...sizes]);
  277 |   }
  278 | 
  279 |   async expectSizeNotListed(size: string): Promise<void> {
  280 |     const listed = await this.getListedSizes();
  281 |     expect(listed.map((s) => s.trim().toUpperCase())).not.toContain(size.toUpperCase());
  282 |   }
  283 | 
  284 |   async expectDisplayedPrice(amount: number): Promise<void> {
  285 |     await expect(this.page.getByText(lkrAmountPattern(amount)).first()).toBeVisible();
  286 |   }
  287 | 
  288 |   async expectSizeChartDoesNotList(size: string): Promise<void> {
  289 |     await this.expectSizeChartVisible();
  290 |     const listed = await this.getListedSizes();
  291 |     expect(listed.map((s) => s.trim().toUpperCase())).not.toContain(size.toUpperCase());
  292 |     await expect(this.page.getByRole('img', { name: new RegExp(size, 'i') })).toHaveCount(0);
  293 |   }
  294 | 
  295 |   async wrappedSizeLabelRowGap(): Promise<number | null> {
  296 |     const boxes = await this.sizeLabels.evaluateAll((els) =>
  297 |       els.map((el) => {
  298 |         const rect = el.getBoundingClientRect();
  299 |         return { top: rect.top, bottom: rect.bottom };
  300 |       }),
  301 |     );
  302 |     if (boxes.length < 2) {
  303 |       return null;
  304 |     }
  305 |     const rowTolerance = 8;
  306 |     const firstTop = boxes[0].top;
  307 |     const firstRow = boxes.filter((box) => Math.abs(box.top - firstTop) <= rowTolerance);
  308 |     const nextRow = boxes.filter((box) => box.top > firstTop + rowTolerance);
  309 |     if (nextRow.length === 0) {
  310 |       return null;
  311 |     }
  312 |     const firstRowBottom = Math.max(...firstRow.map((box) => box.bottom));
  313 |     const nextRowTop = Math.min(...nextRow.map((box) => box.top));
  314 |     return nextRowTop - firstRowBottom;
  315 |   }
  316 | 
  317 |   async expectWrappedSizeLabelsHaveRowGap(minGap = 8): Promise<void> {
  318 |     const gap = await this.wrappedSizeLabelRowGap();
  319 |     expect(gap, 'size chips should wrap onto a second row at this viewport').not.toBeNull();
  320 |     expect(gap as number, 'wrapped size chips should have a visible row gap').toBeGreaterThanOrEqual(
  321 |       minGap,
  322 |     );
  323 |   }
  324 | 
  325 |   async getListedSizes(): Promise<string[]> {
  326 |     return this.sizeLabels.allTextContents();
  327 |   }
  328 | 
  329 |   async expectAvailableSizeCount(minCount: number): Promise<void> {
  330 |     await expect.poll(async () => this.sizeRadios.count()).toBeGreaterThanOrEqual(minCount);
  331 |   }
  332 | 
  333 |   async expectOutOfStock(): Promise<void> {
  334 |     await expect(this.outOfStockButton).toBeVisible();
  335 |     await expect(this.outOfStockButton).toBeDisabled();
  336 |     await expect(this.addToCartButton).toHaveCount(0);
  337 |   }
  338 | 
  339 |   async expectPageNotFound(): Promise<void> {
  340 |     await expect(this.page.getByRole('heading', { name: /page not found/i })).toBeVisible();
  341 |   }
  342 | 
  343 |   async expectAddedToCart(): Promise<void> {
```