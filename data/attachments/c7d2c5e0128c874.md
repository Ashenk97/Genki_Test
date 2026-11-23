# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout.spec.ts >> Checkout >> logged-in checkout >> should place a COD order while logged in and show it under Orders
- Location: tests/checkout.spec.ts:93:9

# Error details

```
Error: No size with at least 1 in stock for Black on https://staging.genkiwardrobe.com/products/akaza-acid-wash-oversized-tee
```

# Page snapshot

```yaml
- generic [active] [ref=f3e1]:
  - alert [ref=f3e2]
  - region "Notifications alt+T"
  - banner [ref=f3e3]:
    - generic [ref=f3e6]:
      - generic [ref=f3e7]:
        - generic [ref=f3e8]:
          - text: Need Help? Call Us
          - link "(070) 100 29 22" [ref=f3e10] [cursor=pointer]:
            - /url: tel:0701002922
        - generic [ref=f3e11]: "|"
        - link "WhatsApp" [ref=f3e14] [cursor=pointer]:
          - /url: https://wa.me/94701002922
      - generic [ref=f3e15]:
        - link "Rewards" [ref=f3e17] [cursor=pointer]:
          - /url: /rewards
        - generic [ref=f3e18]: "|"
        - link "Account dashboard, signed in as Ashen" [ref=f3e20] [cursor=pointer]:
          - /url: /my-account/dashboard
          - generic [ref=f3e21]: Hi,
          - generic [ref=f3e22]: Ashen
        - generic [ref=f3e23]: "|"
        - button "Logout" [ref=f3e25] [cursor=pointer]
        - generic [ref=f3e26]: "|"
        - list [ref=f3e28]:
          - listitem [ref=f3e29]:
            - link "Genki Wardrobe on Facebook" [ref=f3e30] [cursor=pointer]:
              - /url: https://facebook.com/genkiwardrobelk
          - listitem [ref=f3e33]:
            - link "Genki Wardrobe on Instagram" [ref=f3e34] [cursor=pointer]:
              - /url: https://instagram.com/genkiwardrobelk
    - generic [ref=f3e40]:
      - link [ref=f3e42] [cursor=pointer]:
        - /url: /
        - img "Genki Wardrobe" [ref=f3e43]
      - navigation [ref=f3e44]:
        - list [ref=f3e45]:
          - listitem [ref=f3e46]:
            - link "Men" [ref=f3e47] [cursor=pointer]:
              - /url: /collection/men
            - text: →
          - listitem [ref=f3e48]:
            - link "Women" [ref=f3e49] [cursor=pointer]:
              - /url: /collection/women
            - text: →
          - listitem [ref=f3e50]:
            - link "Collections" [ref=f3e51] [cursor=pointer]:
              - /url: /collection
      - list [ref=f3e53]:
        - listitem [ref=f3e54]:
          - link "My account dashboard" [ref=f3e55] [cursor=pointer]:
            - /url: /my-account/dashboard
        - listitem [ref=f3e58]:
          - button "Open wishlist" [ref=f3e59] [cursor=pointer]
        - listitem [ref=f3e62]:
          - button "Open cart" [ref=f3e63] [cursor=pointer]
  - generic [ref=f3e71]:
    - heading "Akaza Acid Wash Oversized Tee" [level=1] [ref=f3e72]
    - list [ref=f3e73]:
      - listitem [ref=f3e74]:
        - link "Home" [ref=f3e75] [cursor=pointer]:
          - /url: /
        - text: /
      - listitem [ref=f3e76]: Akaza Acid Wash Oversized Tee
  - generic [ref=f3e78]:
    - generic [ref=f3e79]:
      - generic [ref=f3e81]:
        - generic [ref=f3e82]:
          - generic [ref=f3e83]:
            - button "Add to wishlist" [ref=f3e84] [cursor=pointer]
            - button "View full screen" [ref=f3e87] [cursor=pointer]
          - generic [ref=f3e91]:
            - group "Image 1 of 9" [ref=f3e92]:
              - button "Akaza Acid Wash Oversized Tee in Black, back view, worn by a male model. Open full screen" [ref=f3e93] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Black, back view, worn by a male model" [ref=f3e94]
            - group "Image 2 of 9" [ref=f3e95]:
              - button "Akaza Acid Wash Oversized Tee in Black, back view, worn by a female model. Open full screen" [ref=f3e96] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Black, back view, worn by a female model" [ref=f3e97]
            - group "Image 3 of 9" [ref=f3e98]:
              - button "Akaza Acid Wash Oversized Tee in Ash, back view, worn by a male model. Open full screen" [ref=f3e99] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Ash, back view, worn by a male model" [ref=f3e100]
            - group "Image 4 of 9" [ref=f3e101]:
              - button "Akaza Acid Wash Oversized Tee in Ash, back view, worn by a female model. Open full screen" [ref=f3e102] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Ash, back view, worn by a female model" [ref=f3e103]
            - group "Image 5 of 9" [ref=f3e104]:
              - button "Akaza Acid Wash Oversized Tee in Brown, back view, worn by a male model. Open full screen" [ref=f3e105] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Brown, back view, worn by a male model" [ref=f3e106]
            - group "Image 6 of 9" [ref=f3e107]:
              - button "Akaza Acid Wash Oversized Tee in Brown. Open full screen" [ref=f3e108] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Brown" [ref=f3e109]
            - group "Image 7 of 9" [ref=f3e110]:
              - button "Akaza Acid Wash Oversized Tee in Pink, back view, worn by a female model. Open full screen" [ref=f3e111] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Pink, back view, worn by a female model" [ref=f3e112]
            - group "Image 8 of 9" [ref=f3e113]:
              - button "Akaza Acid Wash Oversized Tee in Purple, back view, worn by a male model. Open full screen" [ref=f3e114] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Purple, back view, worn by a male model" [ref=f3e115]
            - group "Image 9 of 9" [ref=f3e116]:
              - button "Akaza Acid Wash Oversized Tee in Purple, back view, worn by a female model. Open full screen" [ref=f3e117] [cursor=pointer]:
                - img "Akaza Acid Wash Oversized Tee in Purple, back view, worn by a female model" [ref=f3e118]
          - button "Previous image" [ref=f3e119] [cursor=pointer]
          - button "Next image" [ref=f3e122] [cursor=pointer]
          - paragraph: 1 / 9
        - generic [ref=f3e125]:
          - button [ref=f3e126] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Black, back view, worn by a male model" [ref=f3e127]
          - button [ref=f3e128] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Black, back view, worn by a female model" [ref=f3e129]
          - button [ref=f3e130] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Ash, back view, worn by a male model" [ref=f3e131]
          - button [ref=f3e132] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Ash, back view, worn by a female model" [ref=f3e133]
          - button [ref=f3e134] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Brown, back view, worn by a male model" [ref=f3e135]
          - button [ref=f3e136] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Brown" [ref=f3e137]
          - button [ref=f3e138] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Pink, back view, worn by a female model" [ref=f3e139]
          - button [ref=f3e140] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Purple, back view, worn by a male model" [ref=f3e141]
          - button [ref=f3e142] [cursor=pointer]:
            - img "Akaza Acid Wash Oversized Tee in Purple, back view, worn by a female model" [ref=f3e143]
      - generic [ref=f3e145]:
        - heading "Akaza Acid Wash Oversized Tee" [level=2] [ref=f3e146]
        - generic [ref=f3e147]: LKR 4490.00
        - paragraph [ref=f3e149]:
          - generic [ref=f3e150]: or 3 × LKR 1,587 with
          - img "Koko" [ref=f3e151]
          - link "How paying in 3 with Koko works (opens paykoko.com in a new tab)" [ref=f3e152] [cursor=pointer]:
            - /url: https://paykoko.com/customer-education
        - paragraph [ref=f3e156]: Akaza acid wash oversized tee with a bold Upper Rank Three back print from Demon Slayer. Heavyweight cotton, unisex fit. Island-wide delivery in Sri Lanka.
        - generic [ref=f3e157]:
          - generic [ref=f3e158]:
            - generic [ref=f3e159]: Color
            - generic [ref=f3e160]:
              - radio "Black" [checked]
              - generic "Black" [ref=f3e161] [cursor=pointer]
              - radio "Ash"
              - generic "Ash" [ref=f3e162] [cursor=pointer]
              - radio "Brown"
              - generic "Brown" [ref=f3e163] [cursor=pointer]
              - radio "Pink"
              - generic "Pink" [ref=f3e164] [cursor=pointer]
              - radio "Purple"
              - generic "Purple" [ref=f3e165] [cursor=pointer]
          - generic [ref=f3e166]:
            - generic [ref=f3e167]: Size
            - generic [ref=f3e168]:
              - radio "S"
              - generic [ref=f3e169] [cursor=pointer]: S
              - radio "M"
              - generic [ref=f3e170] [cursor=pointer]: M
              - radio "L"
              - generic [ref=f3e171] [cursor=pointer]: L
              - radio "XL"
              - generic [ref=f3e172] [cursor=pointer]: XL
              - radio "XXL"
              - generic [ref=f3e173] [cursor=pointer]: XXL
        - generic [ref=f3e174]:
          - generic [ref=f3e175]: Quantity
          - generic [ref=f3e176]:
            - button "-" [disabled] [ref=f3e177]
            - textbox [ref=f3e178]: "1"
            - button "+" [disabled] [ref=f3e179]
        - generic [ref=f3e180]:
          - button "Select a size" [disabled] [ref=f3e181]
          - button "Add to wishlist" [ref=f3e182] [cursor=pointer]
        - paragraph [ref=f3e185]: Free delivery on orders of LKR 5,000 or more
        - table [ref=f3e187]:
          - rowgroup [ref=f3e188]:
            - row [ref=f3e189]:
              - cell "SKU:" [ref=f3e190]
              - cell "akaza-acid-wash-oversized-tee" [ref=f3e191]
            - row [ref=f3e192]:
              - cell "Categories:" [ref=f3e193]
              - cell "Acid Washed Oversized, Unisex" [ref=f3e194]
            - row [ref=f3e195]:
              - cell "Tags:" [ref=f3e196]
              - cell "Anime, Street Wear" [ref=f3e197]
            - row [ref=f3e198]:
              - cell "Share on:" [ref=f3e199]
              - cell [ref=f3e200]:
                - list [ref=f3e201]:
                  - listitem [ref=f3e202]:
                    - button "Share on Facebook" [ref=f3e203] [cursor=pointer]
                  - listitem [ref=f3e206]:
                    - button "Share on Twitter" [ref=f3e207] [cursor=pointer]
                  - listitem [ref=f3e210]:
                    - button "Share on WhatsApp" [ref=f3e211] [cursor=pointer]
                  - listitem [ref=f3e214]:
                    - button "Copy URL" [ref=f3e215] [cursor=pointer]
    - generic [ref=f3e220]:
      - tablist [ref=f3e221]:
        - tab "Description" [selected] [ref=f3e223] [cursor=pointer]
        - tab "Additional Information" [ref=f3e225] [cursor=pointer]
      - tabpanel "Description" [ref=f3e227]:
        - generic [ref=f3e228]: "The \"NO.3\" in the corner isn't decoration. Upper Rank Three: the demon who faced Rengoku on the Mugen Train, then took on Tanjiro and Water Hashira Giyu at once in the Infinity Castle. Akaza in a raw, distressed manga style: his face with its navy markings, his name in bold red, and 猗窩座 (Akaza) running down the side. A large back print on an acid-washed oversized tee. Every acid-washed tee fades a little differently, so no two are exactly alike. Unisex, with a relaxed oversized fit and dropped shoulders. Check the size chart below to find your size. If it doesn't fit, you can exchange it for another size within 7 days of delivery. Available in Black, Ash, Brown, Pink and Purple."
      - generic [ref=f3e231]:
        - heading "Acid-Washed T-Shirt Size Chart" [level=2] [ref=f3e232]
        - 'img "Where to measure: A length from shoulder to hem, B chest across, C shoulder seam to shoulder seam, D sleeve from shoulder seam to cuff" [ref=f3e233]':
          - generic [ref=f3e236]: A
          - generic [ref=f3e238]: B
          - generic [ref=f3e240]: C
          - generic [ref=f3e242]: D
        - table [ref=f3e245]:
          - caption [ref=f3e246]: Acid-Washed T-shirt measurements in inches, taken flat
          - rowgroup [ref=f3e247]:
            - row [ref=f3e248]:
              - columnheader "Size" [ref=f3e249]
              - columnheader "A Length" [ref=f3e250]
              - columnheader "B Chest" [ref=f3e251]
              - columnheader "C Shoulder" [ref=f3e252]
              - columnheader "D Sleeve" [ref=f3e253]
          - rowgroup [ref=f3e254]:
            - row [ref=f3e255]:
              - rowheader "S" [ref=f3e256]
              - cell "27" [ref=f3e257]
              - cell "21" [ref=f3e258]
              - cell "21" [ref=f3e259]
              - cell "8" [ref=f3e260]
            - row [ref=f3e261]:
              - rowheader "M" [ref=f3e262]
              - cell "28" [ref=f3e263]
              - cell "22.5" [ref=f3e264]
              - cell "22" [ref=f3e265]
              - cell "9" [ref=f3e266]
            - row [ref=f3e267]:
              - rowheader "L" [ref=f3e268]
              - cell "30" [ref=f3e269]
              - cell "23" [ref=f3e270]
              - cell "22" [ref=f3e271]
              - cell "9" [ref=f3e272]
            - row [ref=f3e273]:
              - rowheader "XL" [ref=f3e274]
              - cell "31" [ref=f3e275]
              - cell "25" [ref=f3e276]
              - cell "25" [ref=f3e277]
              - cell "10" [ref=f3e278]
            - row [ref=f3e279]:
              - rowheader "XXL" [ref=f3e280]
              - cell "32" [ref=f3e281]
              - cell "27" [ref=f3e282]
              - cell "27" [ref=f3e283]
              - cell "10" [ref=f3e284]
        - paragraph [ref=f3e285]: "*All measurements are in inches, taken flat"
  - contentinfo [ref=f3e286]:
    - generic [ref=f3e288]:
      - generic [ref=f3e289]:
        - img "Genki Wardrobe" [ref=f3e291]
        - generic [ref=f3e292]:
          - text: © 2026
          - link "| Genki" [ref=f3e293] [cursor=pointer]:
            - /url: https://genkiwardrobe.com
          - generic [ref=f3e294]: All Rights Reserved
      - generic [ref=f3e295]:
        - heading "INFO" [level=5] [ref=f3e296]
        - navigation [ref=f3e297]:
          - list [ref=f3e298]:
            - listitem [ref=f3e299]:
              - link "About us" [ref=f3e300] [cursor=pointer]:
                - /url: /about-us
            - listitem [ref=f3e301]:
              - link "Contact" [ref=f3e302] [cursor=pointer]:
                - /url: /about-us#contact
            - listitem [ref=f3e303]:
              - link "Privacy Policy" [ref=f3e304] [cursor=pointer]:
                - /url: /privacy-policy
            - listitem [ref=f3e305]:
              - link "Terms and Conditions" [ref=f3e306] [cursor=pointer]:
                - /url: /terms-and-conditions
      - generic [ref=f3e307]:
        - heading "USEFUL LINKS" [level=5] [ref=f3e308]
        - navigation [ref=f3e309]:
          - list [ref=f3e310]:
            - listitem [ref=f3e311]:
              - link "Rewards" [ref=f3e312] [cursor=pointer]:
                - /url: /rewards
            - listitem [ref=f3e313]:
              - link "Returns" [ref=f3e314] [cursor=pointer]:
                - /url: /return-policy
            - listitem [ref=f3e315]:
              - link "Shipping & Delivery" [ref=f3e316] [cursor=pointer]:
                - /url: /shipping-policy
            - listitem [ref=f3e317]:
              - link "Size guide" [ref=f3e318] [cursor=pointer]:
                - /url: /size-guide
            - listitem [ref=f3e319]:
              - link "FAQs" [ref=f3e320] [cursor=pointer]:
                - /url: /faq
      - generic [ref=f3e321]:
        - heading "FOLLOW US ON" [level=5] [ref=f3e322]
        - navigation [ref=f3e323]:
          - list [ref=f3e324]:
            - listitem [ref=f3e325]:
              - link "Facebook" [ref=f3e326] [cursor=pointer]:
                - /url: https://facebook.com/genkiwardrobelk
            - listitem [ref=f3e329]:
              - link "Instagram" [ref=f3e330] [cursor=pointer]:
                - /url: https://instagram.com/genkiwardrobelk
            - listitem [ref=f3e333]:
              - link "TikTok" [ref=f3e334] [cursor=pointer]:
                - /url: https://www.tiktok.com/@genkiwardrobelk
            - listitem [ref=f3e337]:
              - link "WhatsApp" [ref=f3e338] [cursor=pointer]:
                - /url: https://wa.me/94701002922
      - generic [ref=f3e342]:
        - heading "Subscribe." [level=2] [ref=f3e343]
        - paragraph [ref=f3e344]: Get the latest drops, exclusive offers, and style updates.
        - generic [ref=f3e347]:
          - textbox "Email address" [ref=f3e348]:
            - /placeholder: Your email address
          - button "Subscribe to newsletter" [disabled] [ref=f3e349]
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