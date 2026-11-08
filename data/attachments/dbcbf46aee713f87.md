# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout-advanced.spec.ts >> PayHere abandon >> should keep the cart after abandoning PayHere checkout
- Location: tests/checkout-advanced.spec.ts:279:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('#ph-iframe')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for locator('#ph-iframe')

```

```yaml
- alert
- region "Notifications alt+T"
- banner:
  - link "Genki Wardrobe":
    - /url: /
    - img "Genki Wardrobe"
  - navigation:
    - list:
      - listitem:
        - link "Men":
          - /url: /collection/men
      - listitem:
        - link "Women":
          - /url: /collection/women
      - listitem:
        - link "Collections":
          - /url: /collection
  - list:
    - listitem:
      - button "Open wishlist":
        - img
    - listitem:
      - button "Open cart, 1 item":
        - img
        - text: "1"
- heading "Checkout" [level=1]
- list:
  - listitem:
    - link "Home":
      - /url: /
    - text: /
  - listitem: Checkout
- heading "Billing Address" [level=4]
- text: First Name*
- textbox "First Name*": Auto
- text: Last Name*
- textbox "Last Name*": Tester
- text: Email Address*
- textbox "Email Address*": guest-abandon-1794166219334@mailinator.com
- text: Phone no*
- textbox "Phone no*": "0771234567"
- text: Address*
- textbox "Address*": 123 Test Street
- textbox: Colombo 07
- text: Town/City*
- textbox "Town/City*": Colombo
- checkbox "Create an account?"
- text: Create an account?
- checkbox "Shipping address is the same as billing address" [checked]
- text: Shipping address is the same as billing address
- heading "Additional Information (Optional)" [level=4]
- text: Order Notes
- textbox "Order Notes":
  - /placeholder: Special delivery instructions or notes about your order...
- text: e.g., "Please call before delivery" or "Leave package at back door"
- checkbox "This order is a gift"
- text: This order is a gift
- heading "Cart Total" [level=4]
- heading "Product Total" [level=4]
- list:
  - listitem: Akaza Acid Wash Oversized Tee X 1 LKR 4490.00
- paragraph: Sub Total LKR 4490.00
- paragraph: Shipping Fee LKR 350.00
- heading "Grand Total LKR 4840.00" [level=4]
- heading "Loyalty Rewards" [level=4]
- paragraph:
  - img
  - text: Guest orders don't earn loyalty points. With an account, this one would earn you ~
  - strong: "44"
  - text: points.
- button "First time here? Create an account"
- link "Already have one? Sign in":
  - /url: /login?callbackUrl=%2Fcheckout
- heading "Payment Method" [level=4]
- radio "Credit / Debit Card" [checked]
- text: Credit / Debit Card
- 'radio "Koko: Buy Now Pay Later Koko Pay in 3 interest free instalments with Koko."'
- text: "Koko: Buy Now Pay Later"
- img "Koko"
- text: Pay in 3 interest free instalments with Koko.
- radio "Direct Bank Transfer"
- text: Direct Bank Transfer
- radio "Cash on Delivery"
- text: Cash on Delivery
- checkbox "I've read and accept the terms & conditions" [checked]
- text: I've read and accept the
- link "terms & conditions":
  - /url: /terms-and-conditions
- status:
  - text: Some items in your cart are no longer available in the quantity you selected.
  - link "Review your cart":
    - /url: /cart
  - text: to update or remove them.
- img
- paragraph: Some items in your cart are no longer available in the quantity you selected.
- paragraph: "Affected items:"
- paragraph: Akaza Acid Wash Oversized Tee
- paragraph: "SKU: AN001-OACID-U-BLK-L"
- text: "Requested: 1 | Available: 0"
- paragraph:
  - link "Review your cart":
    - /url: /cart
  - text: to update or remove these items, then try again.
- button "Place Order" [disabled]
- contentinfo:
  - img "Genki Wardrobe"
  - text: © 2026
  - link "| Genki":
    - /url: https://genkiwardrobe.com
  - text: All Rights Reserved
  - heading "INFO" [level=5]
  - navigation:
    - list:
      - listitem:
        - link "About us":
          - /url: /about-us
      - listitem:
        - link "Contact":
          - /url: /about-us#contact
      - listitem:
        - link "Privacy Policy":
          - /url: /privacy-policy
      - listitem:
        - link "Terms and Conditions":
          - /url: /terms-and-conditions
  - heading "USEFUL LINKS" [level=5]
  - navigation:
    - list:
      - listitem:
        - link "Rewards":
          - /url: /rewards
      - listitem:
        - link "Returns":
          - /url: /return-policy
      - listitem:
        - link "Shipping & Delivery":
          - /url: /shipping-policy
      - listitem:
        - link "Size guide":
          - /url: /size-guide
      - listitem:
        - link "FAQs":
          - /url: /faq
  - heading "FOLLOW US ON" [level=5]
  - navigation:
    - list:
      - listitem:
        - link "Facebook":
          - /url: https://facebook.com/genkiwardrobelk
          - img
          - text: Facebook
      - listitem:
        - link "Instagram":
          - /url: https://instagram.com/genkiwardrobelk
          - img
          - text: Instagram
      - listitem:
        - link "TikTok":
          - /url: https://www.tiktok.com/@genkiwardrobelk
          - img
          - text: TikTok
      - listitem:
        - link "WhatsApp":
          - /url: https://wa.me/94701002922
          - img
          - text: WhatsApp
  - heading "Subscribe." [level=2]
  - paragraph: Get the latest drops, exclusive offers, and style updates.
  - textbox "Email address":
    - /placeholder: Your email address
  - button "Subscribe to newsletter" [disabled]:
    - img
- button "Scroll to top":
  - img
```

# Test source

```ts
  88  |         await tryAgain.first().click();
  89  |         return;
  90  |       }
  91  |     }
  92  |   }
  93  | 
  94  |   async fillCard(card: PayHereCardDetails): Promise<this> {
  95  |     await this.clickTryAgainIfDeclined();
  96  |     const existingIpg = this.page.frames().find((f) => /test_ipg/i.test(f.url()));
  97  |     const cardFormReady = existingIpg
  98  |       ? await existingIpg.locator('#cardNo').isVisible().catch(() => false)
  99  |       : false;
  100 |     if (!cardFormReady) {
  101 |       await this.selectCardBrand(card.brand);
  102 |     }
  103 |     const ipg = await this.waitForIpgFrame();
  104 |     const defaults = getPayHereCardDefaults();
  105 |     const cvv =
  106 |       card.cvv ?? (card.brand === PayHereCardBrand.Amex ? '1234' : defaults.cardCvv);
  107 |     await ipg.locator('#cardHolderName').fill(card.holder ?? defaults.cardHolder);
  108 |     await ipg.locator('#cardNo').click();
  109 |     await ipg.locator('#cardNo').fill('');
  110 |     await ipg.locator('#cardNo').pressSequentially(card.number, { delay: 15 });
  111 |     await ipg.locator('#cardSecureId').fill(cvv);
  112 |     await ipg.locator('#cardExpiry').fill('');
  113 |     await ipg.locator('#cardExpiry').pressSequentially(card.expiry ?? defaults.cardExpiry, {
  114 |       delay: 15,
  115 |     });
  116 |     await ipg.locator('#cardHolderName').click();
  117 |     return this;
  118 |   }
  119 | 
  120 |   async submitCard(): Promise<this> {
  121 |     const ipg = this.page.frames().find((f) => /test_ipg/i.test(f.url()));
  122 |     if (!ipg) {
  123 |       throw new Error('PayHere test_ipg frame missing at submit');
  124 |     }
  125 |     const submit = ipg.getByRole('button', { name: /^submit$/i });
  126 |     await expect(submit).toBeEnabled({ timeout: Timeouts.Assertion });
  127 |     await submit.click();
  128 |     return this;
  129 |   }
  130 | 
  131 |   async payWithCard(card: PayHereCardDetails): Promise<this> {
  132 |     await this.fillCard(card);
  133 |     await this.submitCard();
  134 |     return this;
  135 |   }
  136 | 
  137 |   async expectPaymentApproved(): Promise<void> {
  138 |     const outer = this.page.frameLocator('#ph-iframe');
  139 |     await expect(outer.getByText(/thank you!/i)).toBeVisible({
  140 |       timeout: Timeouts.PayHereResult,
  141 |     });
  142 |     await expect(outer.getByText(/payment approved/i)).toBeVisible();
  143 |   }
  144 | 
  145 |   async expectPaymentMethodUnavailable(): Promise<void> {
  146 |     await expect
  147 |       .poll(
  148 |         async () => {
  149 |           for (const frame of this.page.frames()) {
  150 |             const hit = await frame
  151 |               .getByText(/payment method unavailable|not enabled in sandbox/i)
  152 |               .first()
  153 |               .isVisible()
  154 |               .catch(() => false);
  155 |             if (hit) {
  156 |               return true;
  157 |             }
  158 |           }
  159 |           return false;
  160 |         },
  161 |         { timeout: Timeouts.PayHereIpg },
  162 |       )
  163 |       .toBe(true);
  164 |   }
  165 | 
  166 |   async expectPaymentDeclined(): Promise<void> {
  167 |     const outer = this.page.frameLocator('#ph-iframe');
  168 |     await expect(outer.getByText(/payment declined/i)).toBeVisible({
  169 |       timeout: Timeouts.PayHereResult,
  170 |     });
  171 |   }
  172 | 
  173 |   async cancelCheckout(): Promise<this> {
  174 |     const outer = this.page.frameLocator('#ph-iframe');
  175 |     const cancel = outer.getByRole('button', { name: /cancel|close|back/i }).first();
  176 |     if (await cancel.isVisible({ timeout: Timeouts.ShortUi }).catch(() => false)) {
  177 |       await cancel.click();
  178 |       return this;
  179 |     }
  180 |     // Fallback: leave checkout without completing payment.
  181 |     await this.page.goto('/cart');
  182 |     await this.waitForPageLoad();
  183 |     await this.acceptCookiesIfVisible();
  184 |     return this;
  185 |   }
  186 | 
  187 |   async expectCheckoutFrameVisible(): Promise<void> {
> 188 |     await expect(this.page.locator('#ph-iframe')).toBeVisible({ timeout: Timeouts.PayHereFrame });
      |                                                   ^ Error: expect(locator).toBeVisible() failed
  189 |   }
  190 | }
  191 | 
```