# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mobile-checkout.spec.ts >> Mobile checkout >> should place a COD order on a phone viewport
- Location: tests/mobile-checkout.spec.ts:20:7

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
    - heading "Akaza Acid Wash Oversized Tee" [level=1] [ref=e30]
    - list [ref=e31]:
      - listitem [ref=e32]:
        - link "Home" [ref=e33] [cursor=pointer]:
          - /url: /
        - text: /
      - listitem [ref=e34]: Akaza Acid Wash Oversized Tee
  - generic [ref=e36]:
    - generic [ref=e37]:
      - generic [ref=e39]:
        - generic [ref=e40]:
          - generic [ref=e41]:
            - button "Add to wishlist" [ref=e42] [cursor=pointer]
            - button "View full screen" [ref=e45] [cursor=pointer]
          - generic [ref=e49]:
            - group "Image 1 of 9" [ref=e50]:
              - button "Akaza Acid Wash Oversized Tee in Black, back view, worn by a male model. Open full screen" [ref=e51] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Black, back view, worn by a male model" [ref=e52]
            - group "Image 2 of 9" [ref=e53]:
              - button "Akaza Acid Wash Oversized Tee in Black, back view, worn by a female model. Open full screen" [ref=e54] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Black, back view, worn by a female model" [ref=e55]
            - group "Image 3 of 9" [ref=e56]:
              - button "Akaza Acid Wash Oversized Tee in Ash, back view, worn by a male model. Open full screen" [ref=e57] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Ash, back view, worn by a male model" [ref=e58]
            - group "Image 4 of 9" [ref=e59]:
              - button "Akaza Acid Wash Oversized Tee in Ash, back view, worn by a female model. Open full screen" [ref=e60] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Ash, back view, worn by a female model" [ref=e61]
            - group "Image 5 of 9" [ref=e62]:
              - button "Akaza Acid Wash Oversized Tee in Brown, back view, worn by a male model. Open full screen" [ref=e63] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Brown, back view, worn by a male model" [ref=e64]
            - group "Image 6 of 9" [ref=e65]:
              - button "Akaza Acid Wash Oversized Tee in Brown. Open full screen" [ref=e66] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Brown" [ref=e67]
            - group "Image 7 of 9" [ref=e68]:
              - button "Akaza Acid Wash Oversized Tee in Pink, back view, worn by a female model. Open full screen" [ref=e69] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Pink, back view, worn by a female model" [ref=e70]
            - group "Image 8 of 9" [ref=e71]:
              - button "Akaza Acid Wash Oversized Tee in Purple, back view, worn by a male model. Open full screen" [ref=e72] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Purple, back view, worn by a male model" [ref=e73]
            - group "Image 9 of 9" [ref=e74]:
              - button "Akaza Acid Wash Oversized Tee in Purple, back view, worn by a female model. Open full screen" [ref=e75] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Purple, back view, worn by a female model" [ref=e76]
          - button "Previous image" [ref=e77] [cursor=pointer]
          - button "Next image" [ref=e80] [cursor=pointer]
          - paragraph: 1 / 9
        - generic [ref=e83]:
          - button [ref=e84] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Black, back view, worn by a male model" [ref=e85]
          - button [ref=e86] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Black, back view, worn by a female model" [ref=e87]
          - button [ref=e88] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Ash, back view, worn by a male model" [ref=e89]
          - button [ref=e90] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Ash, back view, worn by a female model" [ref=e91]
          - button [ref=e92] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Brown, back view, worn by a male model" [ref=e93]
          - button [ref=e94] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Brown" [ref=e95]
          - button [ref=e96] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Pink, back view, worn by a female model" [ref=e97]
          - button [ref=e98] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Purple, back view, worn by a male model" [ref=e99]
          - button [ref=e100] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Purple, back view, worn by a female model" [ref=e101]
      - generic [ref=e103]:
        - heading "Akaza Acid Wash Oversized Tee" [level=2] [ref=e104]
        - generic [ref=e105]: LKR 4490.00
        - paragraph [ref=e107]:
          - generic [ref=e108]: or 3 × LKR 1,587 with
          - img "Koko" [ref=e109]
          - link "How paying in 3 with Koko works (opens paykoko.com in a new tab)" [ref=e110] [cursor=pointer]:
            - /url: https://paykoko.com/customer-education
        - paragraph [ref=e114]: Akaza acid wash oversized tee with a bold Upper Rank Three back print from Demon Slayer. Heavyweight cotton, unisex fit. Island-wide delivery in Sri Lanka.
        - generic [ref=e115]:
          - generic [ref=e116]:
            - generic [ref=e117]: Color
            - generic [ref=e118]:
              - radio "Black" [checked]
              - generic "Black" [ref=e119] [cursor=pointer]
              - radio "Ash"
              - generic "Ash" [ref=e120] [cursor=pointer]
              - radio "Brown"
              - generic "Brown" [ref=e121] [cursor=pointer]
              - radio "Pink"
              - generic "Pink" [ref=e122] [cursor=pointer]
              - radio "Purple"
              - generic "Purple" [ref=e123] [cursor=pointer]
          - generic [ref=e124]:
            - generic [ref=e125]: Size
            - generic [ref=e126]:
              - radio "S"
              - generic [ref=e127] [cursor=pointer]: S
              - radio "M"
              - generic [ref=e128] [cursor=pointer]: M
              - radio "L"
              - generic [ref=e129] [cursor=pointer]: L
              - radio "XL"
              - generic [ref=e130] [cursor=pointer]: XL
              - radio "XXL"
              - generic [ref=e131] [cursor=pointer]: XXL
        - generic [ref=e132]:
          - generic [ref=e133]: Quantity
          - generic [ref=e134]:
            - button "-" [disabled] [ref=e135]
            - textbox [ref=e136]: "1"
            - button "+" [disabled] [ref=e137]
        - generic [ref=e138]:
          - button "Select a size" [disabled] [ref=e139]
          - button "Add to wishlist" [ref=e140] [cursor=pointer]
        - paragraph [ref=e143]: Free delivery on orders of LKR 5,000 or more
        - table [ref=e145]:
          - rowgroup [ref=e146]:
            - row [ref=e147]:
              - cell "SKU:" [ref=e148]
              - cell "akaza-acid-wash-oversized-tee" [ref=e149]
            - row [ref=e150]:
              - cell "Categories:" [ref=e151]
              - cell "Acid Washed Oversized, Unisex" [ref=e152]
            - row [ref=e153]:
              - cell "Tags:" [ref=e154]
              - cell "Anime, Street Wear" [ref=e155]
            - row [ref=e156]:
              - cell "Share on:" [ref=e157]
              - cell [ref=e158]:
                - list [ref=e159]:
                  - listitem [ref=e160]:
                    - button "Share on Facebook" [ref=e161] [cursor=pointer]
                  - listitem [ref=e164]:
                    - button "Share on Twitter" [ref=e165] [cursor=pointer]
                  - listitem [ref=e168]:
                    - button "Share on WhatsApp" [ref=e169] [cursor=pointer]
                  - listitem [ref=e172]:
                    - button "Copy URL" [ref=e173] [cursor=pointer]
    - generic [ref=e178]:
      - tablist [ref=e179]:
        - tab "Description" [selected] [ref=e181] [cursor=pointer]
        - tab "Additional Information" [ref=e183] [cursor=pointer]
      - tabpanel "Description" [ref=e185]:
        - generic [ref=e186]: "The \"NO.3\" in the corner isn't decoration. Upper Rank Three: the demon who faced Rengoku on the Mugen Train, then took on Tanjiro and Water Hashira Giyu at once in the Infinity Castle. Akaza in a raw, distressed manga style: his face with its navy markings, his name in bold red, and 猗窩座 (Akaza) running down the side. A large back print on an acid-washed oversized tee. Every acid-washed tee fades a little differently, so no two are exactly alike. Unisex, with a relaxed oversized fit and dropped shoulders. Check the size chart below to find your size. If it doesn't fit, you can exchange it for another size within 7 days of delivery. Available in Black, Ash, Brown, Pink and Purple."
      - generic [ref=e189]:
        - heading "Acid-Washed T-Shirt Size Chart" [level=2] [ref=e190]
        - 'img "Where to measure: A length from shoulder to hem, B chest across, C shoulder seam to shoulder seam, D sleeve from shoulder seam to cuff" [ref=e191]':
          - generic [ref=e194]: A
          - generic [ref=e196]: B
          - generic [ref=e198]: C
          - generic [ref=e200]: D
        - table [ref=e203]:
          - caption [ref=e204]: Acid-Washed T-shirt measurements in inches, taken flat
          - rowgroup [ref=e205]:
            - row [ref=e206]:
              - columnheader "Size" [ref=e207]
              - columnheader "A Length" [ref=e208]:
                - generic [ref=e209]: A
                - text: Length
              - columnheader "B Chest" [ref=e210]:
                - generic [ref=e211]: B
                - text: Chest
              - columnheader "C Shoulder" [ref=e212]:
                - generic [ref=e213]: C
                - text: Shoulder
              - columnheader "D Sleeve" [ref=e214]:
                - generic [ref=e215]: D
                - text: Sleeve
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