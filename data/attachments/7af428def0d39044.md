# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: profile.spec.ts >> Account deep links as guest >> should prompt guests to sign in on the public rewards page
- Location: tests/profile.spec.ts:179:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/sign in to view your points balance/i)
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText(/sign in to view your points balance/i)

```

```yaml
- alert
- region "Notifications alt+T"
- banner:
  - text: Need Help? Call Us
  - link "(070) 100 29 22":
    - /url: tel:0701002922
  - text: "|"
  - link "WhatsApp":
    - /url: https://wa.me/94701002922
  - link "Rewards":
    - /url: /rewards
  - text: "|"
  - link "Login":
    - /url: /login
  - text: "|"
  - list:
    - listitem:
      - link "Genki Wardrobe on Facebook":
        - /url: https://facebook.com/genkiwardrobelk
        - img
    - listitem:
      - link "Genki Wardrobe on Instagram":
        - /url: https://instagram.com/genkiwardrobelk
        - img
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
      - button "Open cart":
        - img
- heading "Rewards" [level=1]
- list:
  - listitem:
    - link "Home":
      - /url: /
    - text: /
  - listitem: Rewards
- paragraph: Shop, earn points, get free rewards
- paragraph: Create a free account to earn points on your orders and swap them for the anime rewards below, packed with your next order.
- link "Create free account":
  - /url: /register
- text: Have an account?
- link "Sign in":
  - /url: /login?callbackUrl=%2Frewards
- heading "Rewards Catalog" [level=2]:
  - img
  - text: Rewards Catalog
- paragraph: Select rewards to include with your next order. Rewards are packed with your order — never shipped separately.
- article:
  - img "Anime Sticker Pack (50pcs)"
  - heading "Anime Sticker Pack (50pcs)" [level=3]
  - paragraph: 50 premium anime character stickers to customize your gear
  - text: 50 pts
  - button "View Anime Sticker Pack (50pcs)": View
  - paragraph: Sign in to redeem
- article:
  - img "Anime Character Keytag"
  - heading "Anime Character Keytag" [level=3]
  - paragraph: Premium silicone keytag featuring your favorite anime characters
  - text: 100 pts
  - button "View Anime Character Keytag": View
  - paragraph: Sign in to redeem
- article:
  - img "Akatsuki Coaster"
  - text: 2 designs
  - heading "Akatsuki Coaster" [level=3]
  - paragraph: "The slashed headbands of the Akatsuki's rogue ninja: Amegakure, the Hidden Rain, worn by Pain and Konan, and Kirigakure, the Hidden Mist, worn by Kisame. 3D-printed in matte black with the symbol set in red."
  - text: 44 pts
  - button "Choose a design of Akatsuki Coaster": Choose
  - paragraph: Sign in to redeem
- article:
  - img "Anime Coaster"
  - text: 4 designs
  - heading "Anime Coaster" [level=3]
  - paragraph: Luffy, Nami and Sanji of the Straw Hat crew, and Vegeta, the proud Saiyan prince. Each one drawn like a manga panel in black ink on cream, framed in a black ring and 3D-printed. Pick your favourite for your desk.
  - text: 42 pts
  - button "Choose a design of Anime Coaster": Choose
  - paragraph: Sign in to redeem
- article:
  - img "Zen Stones Phone Holder"
  - heading "Zen Stones Phone Holder" [level=3]
  - paragraph: Four stones, balanced one on another, like the still rocks of a Japanese zen garden. Cut into a phone stand in bright torii-gate red, with GENKI through the front. It comes as two flat pieces that slot together in seconds. Prop up your phone, and keep a little calm on your desk.
  - text: 65 pts
  - button "View Zen Stones Phone Holder": View
  - paragraph: Sign in to redeem
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
```

# Test source

```ts
  1  | import { Locator, Page, expect } from '@playwright/test';
  2  | import { ACCOUNT_PAGES } from '@data/navigation.data';
  3  | import { BasePage } from '@pages/BasePage';
  4  | 
  5  | export class RewardsPage extends BasePage {
  6  |   private readonly heading: Locator;
  7  |   private readonly usablePoints: Locator;
  8  |   private readonly catalogHeading: Locator;
  9  |   private readonly addButtons: Locator;
  10 |   private readonly includedSection: Locator;
  11 | 
  12 |   constructor(page: Page) {
  13 |     super(page);
  14 |     this.heading = page.getByRole('heading', { name: ACCOUNT_PAGES.rewards.heading });
  15 |     this.usablePoints = page.getByText(/usable points/i);
  16 |     this.catalogHeading = page.getByText(/rewards catalog/i);
  17 |     this.addButtons = page.getByRole('button', { name: /^add$/i });
  18 |     this.includedSection = page.getByText(/included with your next order/i);
  19 |   }
  20 | 
  21 |   async open(): Promise<this> {
  22 |     await this.goto(ACCOUNT_PAGES.rewards.path);
  23 |     return this;
  24 |   }
  25 | 
  26 |   async expectGuestSignInPrompt(): Promise<void> {
  27 |     await this.expectPathname(ACCOUNT_PAGES.rewards.path);
> 28 |     await expect(this.page.getByText(/sign in to view your points balance/i)).toBeVisible();
     |                                                                               ^ Error: expect(locator).toBeVisible() failed
  29 |     await expect(this.catalogHeading).toBeVisible();
  30 |   }
  31 | 
  32 |   async expectLoaded(): Promise<void> {
  33 |     await this.expectPathname(ACCOUNT_PAGES.rewards.path);
  34 |     await expect(this.heading).toBeVisible();
  35 |     await expect(this.usablePoints).toBeVisible();
  36 |     await expect(this.catalogHeading).toBeVisible();
  37 |     await expect(this.addButtons.first()).toBeVisible();
  38 |   }
  39 | 
  40 |   async addFirstAffordableReward(): Promise<this> {
  41 |     await this.addButtons.first().click();
  42 |     await expect(this.includedSection).toBeVisible({ timeout: 10_000 });
  43 |     return this;
  44 |   }
  45 | 
  46 |   async expectRewardQueued(): Promise<void> {
  47 |     await expect(this.includedSection).toBeVisible();
  48 |     await expect(this.page.getByText(/sticker|keytag|reward/i).first()).toBeVisible();
  49 |   }
  50 | 
  51 |   async clearQueuedRewards(): Promise<void> {
  52 |     for (let i = 0; i < 6; i += 1) {
  53 |       if (!(await this.includedSection.isVisible().catch(() => false))) {
  54 |         return;
  55 |       }
  56 |       const remove = this.page.getByRole('button', { name: /remove/i }).first();
  57 |       if (!(await remove.isVisible().catch(() => false))) {
  58 |         return;
  59 |       }
  60 |       await remove.click();
  61 |       await this.page.waitForTimeout(500);
  62 |     }
  63 |   }
  64 | 
  65 |   async getUsablePoints(): Promise<number> {
  66 |     const body = await this.page.locator('body').innerText();
  67 |     const normalized = body.replace(/,/g, '');
  68 |     const match =
  69 |       normalized.match(/usable points[^\d]*(\d+)/i) ||
  70 |       normalized.match(/(\d+)\s*points available/i);
  71 |     return match ? Number(match[1]) : 0;
  72 |   }
  73 | 
  74 |   async expectUsablePointsAtMost(maxPoints: number): Promise<void> {
  75 |     await expect
  76 |       .poll(async () => this.getUsablePoints(), { timeout: 15_000 })
  77 |       .toBeLessThanOrEqual(maxPoints);
  78 |   }
  79 | 
  80 |   async expectUsablePointsGreaterThan(minPoints: number): Promise<void> {
  81 |     await expect
  82 |       .poll(async () => this.getUsablePoints(), { timeout: 20_000 })
  83 |       .toBeGreaterThan(minPoints);
  84 |   }
  85 | 
  86 |   async proceedToCheckoutFromQueue(): Promise<void> {
  87 |     await this.page.getByRole('link', { name: /proceed to checkout/i }).click();
  88 |     await this.waitForPageLoad();
  89 |     await this.acceptCookiesIfVisible();
  90 |   }
  91 | }
  92 | 
```