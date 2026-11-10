# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout-advanced.spec.ts >> Multi-product checkout prices >> should show each product price on the cart and at checkout
- Location: tests/checkout-advanced.spec.ts:303:7

# Error details

```
Error: No size with at least 2 in stock for Black on https://staging.genkiwardrobe.com/products/shinobu-acid-wash-oversized-tee
```

# Page snapshot

```yaml
- generic [active] [ref=f1e1]:
  - alert [ref=f1e2]
  - region "Notifications alt+T"
  - banner [ref=f1e3]:
    - generic [ref=f1e6]:
      - generic [ref=f1e7]:
        - generic [ref=f1e8]:
          - text: Need Help? Call Us
          - link "(070) 100 29 22" [ref=f1e10] [cursor=pointer]:
            - /url: tel:0701002922
        - generic [ref=f1e11]: "|"
        - link "WhatsApp" [ref=f1e14] [cursor=pointer]:
          - /url: https://wa.me/94701002922
      - generic [ref=f1e15]:
        - link "Rewards" [ref=f1e17] [cursor=pointer]:
          - /url: /rewards
        - generic [ref=f1e18]: "|"
        - link "Login" [ref=f1e20] [cursor=pointer]:
          - /url: /login
        - generic [ref=f1e21]: "|"
        - list [ref=f1e23]:
          - listitem [ref=f1e24]:
            - link "Genki Wardrobe on Facebook" [ref=f1e25] [cursor=pointer]:
              - /url: https://facebook.com/genkiwardrobelk
          - listitem [ref=f1e28]:
            - link "Genki Wardrobe on Instagram" [ref=f1e29] [cursor=pointer]:
              - /url: https://instagram.com/genkiwardrobelk
    - generic [ref=f1e35]:
      - link [ref=f1e37] [cursor=pointer]:
        - /url: /
        - img "Genki Wardrobe" [ref=f1e38]
      - navigation [ref=f1e39]:
        - list [ref=f1e40]:
          - listitem [ref=f1e41]:
            - link "Men" [ref=f1e42] [cursor=pointer]:
              - /url: /collection/men
            - text: →
          - listitem [ref=f1e43]:
            - link "Women" [ref=f1e44] [cursor=pointer]:
              - /url: /collection/women
            - text: →
          - listitem [ref=f1e45]:
            - link "Collections" [ref=f1e46] [cursor=pointer]:
              - /url: /collection
      - list [ref=f1e48]:
        - listitem [ref=f1e49]:
          - button "Open wishlist" [ref=f1e50] [cursor=pointer]
        - listitem [ref=f1e53]:
          - button "Open cart, 1 item" [ref=f1e54] [cursor=pointer]:
            - generic [ref=f1e59]: "1"
  - generic [ref=f1e63]:
    - heading "Shinobu Acid Wash Oversized Tee" [level=1] [ref=f1e64]
    - list [ref=f1e65]:
      - listitem [ref=f1e66]:
        - link "Home" [ref=f1e67] [cursor=pointer]:
          - /url: /
        - text: /
      - listitem [ref=f1e68]: Shinobu Acid Wash Oversized Tee
  - generic [ref=f1e70]:
    - generic [ref=f1e71]:
      - generic [ref=f1e73]:
        - generic [ref=f1e74]:
          - generic [ref=f1e75]:
            - button "Add to wishlist" [ref=f1e76] [cursor=pointer]
            - button "View full screen" [ref=f1e79] [cursor=pointer]
          - generic [ref=f1e83]:
            - group "Image 1 of 3" [ref=f1e84]:
              - button "Shinobu Acid Wash Oversized Tee in Black, back view, worn by a female model. Open full screen" [ref=f1e85] [cursor=pointer]:
                - img "Shinobu Acid Wash Oversized Tee in Black, back view, worn by a female model" [ref=f1e86]
            - group "Image 2 of 3" [ref=f1e87]:
              - button "Shinobu Acid Wash Oversized Tee in Ash, back view, worn by a female model. Open full screen" [ref=f1e88] [cursor=pointer]:
                - img "Shinobu Acid Wash Oversized Tee in Ash, back view, worn by a female model" [ref=f1e89]
            - group "Image 3 of 3" [ref=f1e90]:
              - button "Shinobu Acid Wash Oversized Tee in Pink, back view, worn by a female model. Open full screen" [ref=f1e91] [cursor=pointer]:
                - img "Shinobu Acid Wash Oversized Tee in Pink, back view, worn by a female model" [ref=f1e92]
          - button "Previous image" [ref=f1e93] [cursor=pointer]
          - button "Next image" [ref=f1e96] [cursor=pointer]
          - paragraph: 1 / 3
        - generic [ref=f1e99]:
          - button [ref=f1e100] [cursor=pointer]:
            - img "Shinobu Acid Wash Oversized Tee in Black, back view, worn by a female model" [ref=f1e101]
          - button [ref=f1e102] [cursor=pointer]:
            - img "Shinobu Acid Wash Oversized Tee in Ash, back view, worn by a female model" [ref=f1e103]
          - button [ref=f1e104] [cursor=pointer]:
            - img "Shinobu Acid Wash Oversized Tee in Pink, back view, worn by a female model" [ref=f1e105]
      - generic [ref=f1e107]:
        - heading "Shinobu Acid Wash Oversized Tee" [level=2] [ref=f1e108]
        - generic [ref=f1e109]: LKR 4490.00
        - paragraph [ref=f1e111]:
          - generic [ref=f1e112]: or 3 × LKR 1,587 with
          - img "Koko" [ref=f1e113]
          - link "How paying in 3 with Koko works (opens paykoko.com in a new tab)" [ref=f1e114] [cursor=pointer]:
            - /url: https://paykoko.com/customer-education
        - paragraph [ref=f1e118]: "Shinobu acid wash oversized tee: the Insect Hashira on a bold Demon Slayer back print. Heavyweight cotton, unisex fit. Island-wide delivery in Sri Lanka."
        - generic [ref=f1e119]:
          - generic [ref=f1e120]:
            - generic [ref=f1e121]: Color
            - generic [ref=f1e122]:
              - radio "Black" [checked]
              - generic "Black" [ref=f1e123] [cursor=pointer]
              - radio "Ash"
              - generic "Ash" [ref=f1e124] [cursor=pointer]
              - radio "Pink"
              - generic "Pink" [ref=f1e125] [cursor=pointer]
          - generic [ref=f1e126]:
            - generic [ref=f1e127]: Size
            - generic [ref=f1e128]:
              - radio "S"
              - generic [ref=f1e129] [cursor=pointer]: S
              - radio "M"
              - generic [ref=f1e130] [cursor=pointer]: M
              - radio "L"
              - generic [ref=f1e131] [cursor=pointer]: L
              - radio "XL"
              - generic [ref=f1e132] [cursor=pointer]: XL
              - radio "XXL"
              - generic [ref=f1e133] [cursor=pointer]: XXL
        - generic [ref=f1e134]:
          - generic [ref=f1e135]: Quantity
          - generic [ref=f1e136]:
            - button "-" [disabled] [ref=f1e137]
            - textbox [ref=f1e138]: "1"
            - button "+" [disabled] [ref=f1e139]
        - generic [ref=f1e140]:
          - button "Select a size" [disabled] [ref=f1e141]
          - button "Add to wishlist" [ref=f1e142] [cursor=pointer]
        - paragraph [ref=f1e145]: Free delivery on orders of LKR 5,000 or more
        - table [ref=f1e147]:
          - rowgroup [ref=f1e148]:
            - row [ref=f1e149]:
              - cell "SKU:" [ref=f1e150]
              - cell "shinobu-acid-wash-oversized-tee" [ref=f1e151]
            - row [ref=f1e152]:
              - cell "Categories:" [ref=f1e153]
              - cell "Acid Washed Oversized, Unisex" [ref=f1e154]
            - row [ref=f1e155]:
              - cell "Tags:" [ref=f1e156]
              - cell "Anime, Street Wear" [ref=f1e157]
            - row [ref=f1e158]:
              - cell "Share on:" [ref=f1e159]
              - cell [ref=f1e160]:
                - list [ref=f1e161]:
                  - listitem [ref=f1e162]:
                    - button "Share on Facebook" [ref=f1e163] [cursor=pointer]
                  - listitem [ref=f1e166]:
                    - button "Share on Twitter" [ref=f1e167] [cursor=pointer]
                  - listitem [ref=f1e170]:
                    - button "Share on WhatsApp" [ref=f1e171] [cursor=pointer]
                  - listitem [ref=f1e174]:
                    - button "Copy URL" [ref=f1e175] [cursor=pointer]
    - generic [ref=f1e180]:
      - tablist [ref=f1e181]:
        - tab "Description" [selected] [ref=f1e183] [cursor=pointer]
        - tab "Additional Information" [ref=f1e185] [cursor=pointer]
      - tabpanel "Description" [ref=f1e187]:
        - generic [ref=f1e188]: "Not strong enough to cut off a demon's head, so she made a poison that kills them instead. Shinobu Kocho, the Insect Hashira, in a raw, distressed manga style: her butterfly hair ornament and butterfly-wing haori, her name in soft purple, and a butterfly drifting past. A large back print on an acid-washed oversized tee. Every acid-washed tee fades a little differently, so no two are exactly alike. Unisex, with a relaxed oversized fit and dropped shoulders. Check the size chart below to find your size. If it doesn't fit, you can exchange it for another size within 7 days of delivery. Available in Black, Ash and Pink."
      - generic [ref=f1e191]:
        - heading "Acid-Washed T-Shirt Size Chart" [level=2] [ref=f1e192]
        - 'img "Where to measure: A length from shoulder to hem, B chest across, C shoulder seam to shoulder seam, D sleeve from shoulder seam to cuff" [ref=f1e193]':
          - generic [ref=f1e196]: A
          - generic [ref=f1e198]: B
          - generic [ref=f1e200]: C
          - generic [ref=f1e202]: D
        - table [ref=f1e205]:
          - caption [ref=f1e206]: Acid-Washed T-shirt measurements in inches, taken flat
          - rowgroup [ref=f1e207]:
            - row [ref=f1e208]:
              - columnheader "Size" [ref=f1e209]
              - columnheader "A Length" [ref=f1e210]
              - columnheader "B Chest" [ref=f1e211]
              - columnheader "C Shoulder" [ref=f1e212]
              - columnheader "D Sleeve" [ref=f1e213]
          - rowgroup [ref=f1e214]:
            - row [ref=f1e215]:
              - rowheader "S" [ref=f1e216]
              - cell "27" [ref=f1e217]
              - cell "21" [ref=f1e218]
              - cell "21" [ref=f1e219]
              - cell "8" [ref=f1e220]
            - row [ref=f1e221]:
              - rowheader "M" [ref=f1e222]
              - cell "28" [ref=f1e223]
              - cell "22.5" [ref=f1e224]
              - cell "22" [ref=f1e225]
              - cell "9" [ref=f1e226]
            - row [ref=f1e227]:
              - rowheader "L" [ref=f1e228]
              - cell "30" [ref=f1e229]
              - cell "23" [ref=f1e230]
              - cell "22" [ref=f1e231]
              - cell "9" [ref=f1e232]
            - row [ref=f1e233]:
              - rowheader "XL" [ref=f1e234]
              - cell "31" [ref=f1e235]
              - cell "25" [ref=f1e236]
              - cell "25" [ref=f1e237]
              - cell "10" [ref=f1e238]
            - row [ref=f1e239]:
              - rowheader "XXL" [ref=f1e240]
              - cell "32" [ref=f1e241]
              - cell "27" [ref=f1e242]
              - cell "27" [ref=f1e243]
              - cell "10" [ref=f1e244]
        - paragraph [ref=f1e245]: "*All measurements are in inches, taken flat"
  - contentinfo [ref=f1e246]:
    - generic [ref=f1e248]:
      - generic [ref=f1e249]:
        - img "Genki Wardrobe" [ref=f1e251]
        - generic [ref=f1e252]:
          - text: © 2026
          - link "| Genki" [ref=f1e253] [cursor=pointer]:
            - /url: https://genkiwardrobe.com
          - generic [ref=f1e254]: All Rights Reserved
      - generic [ref=f1e255]:
        - heading "INFO" [level=5] [ref=f1e256]
        - navigation [ref=f1e257]:
          - list [ref=f1e258]:
            - listitem [ref=f1e259]:
              - link "About us" [ref=f1e260] [cursor=pointer]:
                - /url: /about-us
            - listitem [ref=f1e261]:
              - link "Contact" [ref=f1e262] [cursor=pointer]:
                - /url: /about-us#contact
            - listitem [ref=f1e263]:
              - link "Privacy Policy" [ref=f1e264] [cursor=pointer]:
                - /url: /privacy-policy
            - listitem [ref=f1e265]:
              - link "Terms and Conditions" [ref=f1e266] [cursor=pointer]:
                - /url: /terms-and-conditions
      - generic [ref=f1e267]:
        - heading "USEFUL LINKS" [level=5] [ref=f1e268]
        - navigation [ref=f1e269]:
          - list [ref=f1e270]:
            - listitem [ref=f1e271]:
              - link "Rewards" [ref=f1e272] [cursor=pointer]:
                - /url: /rewards
            - listitem [ref=f1e273]:
              - link "Returns" [ref=f1e274] [cursor=pointer]:
                - /url: /return-policy
            - listitem [ref=f1e275]:
              - link "Shipping & Delivery" [ref=f1e276] [cursor=pointer]:
                - /url: /shipping-policy
            - listitem [ref=f1e277]:
              - link "Size guide" [ref=f1e278] [cursor=pointer]:
                - /url: /size-guide
            - listitem [ref=f1e279]:
              - link "FAQs" [ref=f1e280] [cursor=pointer]:
                - /url: /faq
      - generic [ref=f1e281]:
        - heading "FOLLOW US ON" [level=5] [ref=f1e282]
        - navigation [ref=f1e283]:
          - list [ref=f1e284]:
            - listitem [ref=f1e285]:
              - link "Facebook" [ref=f1e286] [cursor=pointer]:
                - /url: https://facebook.com/genkiwardrobelk
            - listitem [ref=f1e289]:
              - link "Instagram" [ref=f1e290] [cursor=pointer]:
                - /url: https://instagram.com/genkiwardrobelk
            - listitem [ref=f1e293]:
              - link "TikTok" [ref=f1e294] [cursor=pointer]:
                - /url: https://www.tiktok.com/@genkiwardrobelk
            - listitem [ref=f1e297]:
              - link "WhatsApp" [ref=f1e298] [cursor=pointer]:
                - /url: https://wa.me/94701002922
      - generic [ref=f1e302]:
        - heading "Subscribe." [level=2] [ref=f1e303]
        - paragraph [ref=f1e304]: Get the latest drops, exclusive offers, and style updates.
        - generic [ref=f1e307]:
          - textbox "Email address" [ref=f1e308]:
            - /placeholder: Your email address
          - button "Subscribe to newsletter" [disabled] [ref=f1e309]
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
      |             ^ Error: No size with at least 2 in stock for Black on https://staging.genkiwardrobe.com/products/shinobu-acid-wash-oversized-tee
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