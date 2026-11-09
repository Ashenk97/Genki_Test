# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cart.spec.ts >> Cart >> should decrease quantity on the cart page
- Location: tests/cart.spec.ts:35:7

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('table').first().locator('tbody tr').filter({ has: locator('a[href^="/products/"]:not([href*="undefined"])') }).first().getByRole('button', { name: /^\+$/ }).or(getByRole('table').first().locator('tbody tr').filter({ has: locator('a[href^="/products/"]:not([href*="undefined"])') }).first().locator('button.inc.qtybutton')).or(getByRole('table').first().locator('tbody tr').filter({ has: locator('a[href^="/products/"]:not([href*="undefined"])') }).first().locator('button.qtybutton').filter({ hasText: /^\+$/ }))
    - locator resolved to <button disabled class="inc qtybutton">+</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
      - waiting 100ms
    29 × waiting for element to be visible, enabled and stable
       - element is not enabled
     - retrying click action
       - waiting 500ms

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
    - heading "Cart" [level=1] [ref=f1e64]
    - list [ref=f1e65]:
      - listitem [ref=f1e66]:
        - link "Home" [ref=f1e67] [cursor=pointer]:
          - /url: /
        - text: /
      - listitem [ref=f1e68]: Cart
  - generic [ref=f1e71]:
    - table [ref=f1e73]:
      - rowgroup [ref=f1e74]:
        - row [ref=f1e75]:
          - columnheader "Product" [ref=f1e76]
          - columnheader "Price" [ref=f1e77]
          - columnheader "Quantity" [ref=f1e78]
          - columnheader "Total" [ref=f1e79]
          - columnheader [ref=f1e80]
      - rowgroup [ref=f1e81]:
        - row [ref=f1e82]:
          - cell [ref=f1e83]:
            - link [ref=f1e84] [cursor=pointer]:
              - /url: /products/akaza-acid-wash-oversized-tee
              - img "Akaza Acid Wash Oversized Tee" [ref=f1e85]
          - 'cell "Akaza Acid Wash Oversized Tee Color: Black Size: M" [ref=f1e86]':
            - link "Akaza Acid Wash Oversized Tee" [ref=f1e87] [cursor=pointer]:
              - /url: /products/akaza-acid-wash-oversized-tee
            - generic [ref=f1e88]:
              - generic [ref=f1e89]: "Color: Black"
              - generic [ref=f1e90]: "Size: M"
          - cell "LKR 4490.00" [ref=f1e91]
          - cell [ref=f1e93]:
            - generic [ref=f1e94]:
              - button "-" [ref=f1e95] [cursor=pointer]
              - textbox [ref=f1e96]: "1"
              - button "+" [disabled] [ref=f1e97]
          - cell "LKR 4490.00" [ref=f1e98]
          - cell [ref=f1e100]:
            - button [ref=f1e101] [cursor=pointer]
    - generic [ref=f1e105]:
      - heading "Cart totals" [level=2] [ref=f1e106]
      - table [ref=f1e107]:
        - rowgroup [ref=f1e108]:
          - row [ref=f1e109]:
            - rowheader "SUBTOTAL" [ref=f1e110]
            - cell "LKR 4490.00" [ref=f1e111]
          - row [ref=f1e112]:
            - rowheader "TOTAL" [ref=f1e113]
            - cell "LKR 4490.00" [ref=f1e114]
      - status [ref=f1e115]:
        - paragraph [ref=f1e116]:
          - text: You're
          - strong [ref=f1e117]: LKR 510
          - text: away from free delivery
      - link "proceed to checkout" [ref=f1e121] [cursor=pointer]:
        - /url: /checkout
  - contentinfo [ref=f1e122]:
    - generic [ref=f1e124]:
      - generic [ref=f1e125]:
        - img "Genki Wardrobe" [ref=f1e127]
        - generic [ref=f1e128]:
          - text: © 2026
          - link "| Genki" [ref=f1e129] [cursor=pointer]:
            - /url: https://genkiwardrobe.com
          - generic [ref=f1e130]: All Rights Reserved
      - generic [ref=f1e131]:
        - heading "INFO" [level=5] [ref=f1e132]
        - navigation [ref=f1e133]:
          - list [ref=f1e134]:
            - listitem [ref=f1e135]:
              - link "About us" [ref=f1e136] [cursor=pointer]:
                - /url: /about-us
            - listitem [ref=f1e137]:
              - link "Contact" [ref=f1e138] [cursor=pointer]:
                - /url: /about-us#contact
            - listitem [ref=f1e139]:
              - link "Privacy Policy" [ref=f1e140] [cursor=pointer]:
                - /url: /privacy-policy
            - listitem [ref=f1e141]:
              - link "Terms and Conditions" [ref=f1e142] [cursor=pointer]:
                - /url: /terms-and-conditions
      - generic [ref=f1e143]:
        - heading "USEFUL LINKS" [level=5] [ref=f1e144]
        - navigation [ref=f1e145]:
          - list [ref=f1e146]:
            - listitem [ref=f1e147]:
              - link "Rewards" [ref=f1e148] [cursor=pointer]:
                - /url: /rewards
            - listitem [ref=f1e149]:
              - link "Returns" [ref=f1e150] [cursor=pointer]:
                - /url: /return-policy
            - listitem [ref=f1e151]:
              - link "Shipping & Delivery" [ref=f1e152] [cursor=pointer]:
                - /url: /shipping-policy
            - listitem [ref=f1e153]:
              - link "Size guide" [ref=f1e154] [cursor=pointer]:
                - /url: /size-guide
            - listitem [ref=f1e155]:
              - link "FAQs" [ref=f1e156] [cursor=pointer]:
                - /url: /faq
      - generic [ref=f1e157]:
        - heading "FOLLOW US ON" [level=5] [ref=f1e158]
        - navigation [ref=f1e159]:
          - list [ref=f1e160]:
            - listitem [ref=f1e161]:
              - link "Facebook" [ref=f1e162] [cursor=pointer]:
                - /url: https://facebook.com/genkiwardrobelk
            - listitem [ref=f1e165]:
              - link "Instagram" [ref=f1e166] [cursor=pointer]:
                - /url: https://instagram.com/genkiwardrobelk
            - listitem [ref=f1e169]:
              - link "TikTok" [ref=f1e170] [cursor=pointer]:
                - /url: https://www.tiktok.com/@genkiwardrobelk
            - listitem [ref=f1e173]:
              - link "WhatsApp" [ref=f1e174] [cursor=pointer]:
                - /url: https://wa.me/94701002922
      - generic [ref=f1e178]:
        - heading "Subscribe." [level=2] [ref=f1e179]
        - paragraph [ref=f1e180]: Get the latest drops, exclusive offers, and style updates.
        - generic [ref=f1e183]:
          - textbox "Email address" [ref=f1e184]:
            - /placeholder: Your email address
          - button "Subscribe to newsletter" [disabled] [ref=f1e185]
```

# Test source

```ts
  56  |     await expect(this.productRows).toHaveCount(count);
  57  |   }
  58  | 
  59  |   async getItemCount(): Promise<number> {
  60  |     return this.productRows.count();
  61  |   }
  62  | 
  63  |   async expectLineContains(text: string | RegExp): Promise<void> {
  64  |     await expect(this.productRows.first().getByText(text)).toBeVisible();
  65  |   }
  66  | 
  67  |   lineWithAttributes(attrs: {
  68  |     name?: string | RegExp;
  69  |     color?: string;
  70  |     size?: string;
  71  |   }): Locator {
  72  |     let row = this.productRows;
  73  |     if (attrs.name) {
  74  |       row = row.filter({ hasText: attrs.name });
  75  |     }
  76  |     if (attrs.color) {
  77  |       row = row.filter({ hasText: new RegExp(`Color:\\s*${attrs.color}`, 'i') });
  78  |     }
  79  |     if (attrs.size) {
  80  |       row = row.filter({ hasText: new RegExp(`Size:\\s*${attrs.size}`, 'i') });
  81  |     }
  82  |     return row.first();
  83  |   }
  84  | 
  85  |   async expectLineWithAttributes(attrs: {
  86  |     name?: string | RegExp;
  87  |     color?: string;
  88  |     size?: string;
  89  |   }): Promise<void> {
  90  |     await expect(this.lineWithAttributes(attrs)).toBeVisible();
  91  |   }
  92  | 
  93  |   async expectLinePrices(
  94  |     attrs: { name?: string | RegExp; color?: string; size?: string },
  95  |     prices: { unit: number; line: number },
  96  |   ): Promise<void> {
  97  |     const row = this.lineWithAttributes(attrs);
  98  |     await expect(row).toBeVisible();
  99  |     await expect(row).toContainText(lkrAmountPattern(prices.unit));
  100 |     await expect(row).toContainText(lkrAmountPattern(prices.line));
  101 |   }
  102 | 
  103 |   async expectCartTotals(subtotal: number, total: number): Promise<void> {
  104 |     await expect(this.page.getByRole('row', { name: /^subtotal/i })).toContainText(
  105 |       lkrAmountPattern(subtotal),
  106 |     );
  107 |     await expect(this.page.getByRole('row', { name: /^total/i })).toContainText(
  108 |       lkrAmountPattern(total),
  109 |     );
  110 |   }
  111 | 
  112 |   async expectFreeDeliveryRemaining(): Promise<void> {
  113 |     await expect(this.page.locator('.free-shipping-progress__message').first()).toHaveText(
  114 |       FREE_DELIVERY.remainingMessage,
  115 |     );
  116 |   }
  117 | 
  118 |   async expectFreeDeliveryUnlocked(): Promise<void> {
  119 |     await expect(this.page.locator('.free-shipping-progress__message').first()).toHaveText(
  120 |       /free delivery unlocked on this order/i,
  121 |     );
  122 |   }
  123 | 
  124 |   async expectSubtotal(amount: number): Promise<void> {
  125 |     await expect(
  126 |       this.page.getByText(lkrAmountPattern(amount)).filter({ visible: true }).first(),
  127 |     ).toBeVisible();
  128 |   }
  129 | 
  130 |   async expectLineAttributesReadOnly(): Promise<void> {
  131 |     await expect(this.productRows.locator('select, [role="combobox"]')).toHaveCount(0);
  132 |     await expect(
  133 |       this.productRows.getByRole('button', { name: /edit (size|color)|change (size|color)/i }),
  134 |     ).toHaveCount(0);
  135 |   }
  136 | 
  137 |   async expectEmpty(): Promise<void> {
  138 |     await expect(this.emptyMessage).toBeVisible();
  139 |     await expect(this.shopNowLink).toBeVisible();
  140 |   }
  141 | 
  142 |   async clickShopNow(): Promise<void> {
  143 |     await this.shopNowLink.click();
  144 |     await this.waitForPageLoad();
  145 |     await this.acceptCookiesIfVisible();
  146 |   }
  147 | 
  148 |   async expectShopNowNavigated(): Promise<void> {
  149 |     await expect(this.page).toHaveURL((url) => {
  150 |       const path = url.pathname.replace(/\/$/, '');
  151 |       return path === '' || path === '/' || path.startsWith('/collection');
  152 |     });
  153 |   }
  154 | 
  155 |   async increaseQuantity(): Promise<this> {
> 156 |     await this.increaseQtyButton.click();
      |                                  ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
  157 |     return this;
  158 |   }
  159 | 
  160 |   async decreaseQuantity(): Promise<this> {
  161 |     await this.decreaseQtyButton.click();
  162 |     return this;
  163 |   }
  164 | 
  165 |   async expectQuantity(quantity: number): Promise<void> {
  166 |     await expect(
  167 |       this.productRows.first().locator('input.cart-plus-minus-box'),
  168 |     ).toHaveValue(String(quantity));
  169 |   }
  170 | 
  171 |   async removeFirstLine(): Promise<void> {
  172 |     const backendCleared = (await this.isSignedIn())
  173 |       ? this.waitForEmptyCartSync()
  174 |       : Promise.resolve();
  175 |     await this.productRows.first().locator('td:last-child button').click();
  176 |     await this.expectEmpty();
  177 |     await this.waitUntilPersistedCartEmpty();
  178 |     await backendCleared;
  179 |   }
  180 | 
  181 |   async persistedCartItemCount(): Promise<number> {
  182 |     return this.page.evaluate(() => {
  183 |       const raw = localStorage.getItem('persist:genki');
  184 |       if (!raw) {
  185 |         return 0;
  186 |       }
  187 |       try {
  188 |         const root = JSON.parse(raw) as { cart?: string | { cartItems?: unknown[] } };
  189 |         const cart = typeof root.cart === 'string' ? JSON.parse(root.cart) : root.cart;
  190 |         return Array.isArray(cart?.cartItems) ? cart.cartItems.length : 0;
  191 |       } catch {
  192 |         return -1;
  193 |       }
  194 |     });
  195 |   }
  196 | 
  197 |   async waitUntilPersistedCartEmpty(): Promise<void> {
  198 |     await expect
  199 |       .poll(async () => this.persistedCartItemCount(), { timeout: Timeouts.MediumUi })
  200 |       .toBe(0);
  201 |   }
  202 | 
  203 |   private async isSignedIn(): Promise<boolean> {
  204 |     return this.page.getByRole('button', { name: /^logout$/i }).isVisible().catch(() => false);
  205 |   }
  206 | 
  207 |   private waitForEmptyCartSync() {
  208 |     return this.page.waitForResponse(
  209 |       (res) => {
  210 |         if (!res.url().includes('/api/cart/create-cart-with-items')) {
  211 |           return false;
  212 |         }
  213 |         if (res.request().method() !== 'POST' || !res.ok()) {
  214 |           return false;
  215 |         }
  216 |         return /"items"\s*:\s*\[\s*\]/.test(res.request().postData() ?? '');
  217 |       },
  218 |       { timeout: Timeouts.MediumUi },
  219 |     );
  220 |   }
  221 | 
  222 |   async waitUntilReady(): Promise<void> {
  223 |     await this.expectLoaded();
  224 |     await this.page.waitForLoadState('networkidle').catch(() => undefined);
  225 |     await expect
  226 |       .poll(async () => {
  227 |         const empty = await this.emptyMessage.isVisible().catch(() => false);
  228 |         const rows = await this.productRows.count();
  229 |         return empty || rows > 0;
  230 |       }, { timeout: Timeouts.MediumUi })
  231 |       .toBe(true);
  232 |   }
  233 | 
  234 |   private async isEmpty(): Promise<boolean> {
  235 |     return (
  236 |       (await this.emptyMessage.isVisible().catch(() => false)) &&
  237 |       (await this.productRows.count()) === 0
  238 |     );
  239 |   }
  240 | 
  241 |   async clearCart(): Promise<void> {
  242 |     for (let attempt = 0; attempt < 4; attempt += 1) {
  243 |       await this.waitUntilReady();
  244 |       const alreadyEmpty = await this.isEmpty();
  245 |       const backendCleared =
  246 |         alreadyEmpty || !(await this.isSignedIn())
  247 |           ? Promise.resolve()
  248 |           : this.waitForEmptyCartSync();
  249 |       for (let i = 0; i < 15; i += 1) {
  250 |         if (await this.isEmpty()) {
  251 |           break;
  252 |         }
  253 |         const count = await this.productRows.count();
  254 |         if (count === 0) {
  255 |           break;
  256 |         }
```