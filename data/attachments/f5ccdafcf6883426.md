# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: rewards.spec.ts >> Rewards >> should add a reward to the next order queue
- Location: tests/rewards.spec.ts:51:7

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /^add\b/i }).first()
    - locator resolved to <button disabled type="button" class="genki-button genki-button--medium reward-dialog__add">Add · 50 pts</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not stable
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is not stable
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is not enabled
  28 × retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is not enabled
  - retrying click action
    - waiting 500ms

```

# Page snapshot

```yaml
- generic:
  - alert
  - region "Notifications alt+T"
  - banner:
    - generic:
      - generic:
        - generic:
          - generic:
            - link:
              - /url: /
          - navigation:
            - list:
              - listitem:
                - link:
                  - /url: /collection/men
                  - text: Men
                - text: →
              - listitem:
                - link:
                  - /url: /collection/women
                  - text: Women
                - text: →
              - listitem:
                - link:
                  - /url: /collection
                  - text: Collections
          - generic:
            - list:
              - listitem:
                - link:
                  - /url: /my-account/dashboard
              - listitem:
                - button
              - listitem:
                - button
  - generic:
    - generic:
      - generic:
        - generic:
          - heading [level=1]: Rewards
          - list:
            - listitem:
              - link:
                - /url: /
                - text: Home
              - text: /
            - listitem: Rewards
  - generic:
    - generic:
      - generic:
        - generic:
          - generic:
            - generic:
              - generic: "44"
              - generic: Usable Points
      - generic:
        - heading [level=2]: Rewards Catalog
        - paragraph: Select rewards to include with your next order. Rewards are packed with your order — never shipped separately.
        - generic:
          - article:
            - generic:
              - heading [level=3]: Anime Sticker Pack (50pcs)
              - paragraph: 50 premium anime character stickers to customize your gear
              - generic:
                - generic: 50 pts
                - button: View
              - paragraph: 6 more pts needed
          - article:
            - generic:
              - heading [level=3]: Anime Character Keytag
              - paragraph: Premium silicone keytag featuring your favorite anime characters
              - generic:
                - generic: 100 pts
                - button: View
              - paragraph: 56 more pts needed
          - article:
            - generic: 2 designs
            - generic:
              - heading [level=3]: Akatsuki Coaster
              - paragraph: "The slashed headbands of the Akatsuki's rogue ninja: Amegakure, the Hidden Rain, worn by Pain and Konan, and Kirigakure, the Hidden Mist, worn by Kisame. 3D-printed in matte black with the symbol set in red."
              - list:
                - listitem
                - listitem
              - generic:
                - generic: 44 pts
                - button: Choose
          - article:
            - generic: 4 designs
            - generic:
              - heading [level=3]: Anime Coaster
              - paragraph: Luffy, Nami and Sanji of the Straw Hat crew, and Vegeta, the proud Saiyan prince. Each one drawn like a manga panel in black ink on cream, framed in a black ring and 3D-printed. Pick your favourite for your desk.
              - list:
                - listitem
                - listitem
                - listitem
                - listitem
              - generic:
                - generic: 42 pts
                - button: Choose
          - article:
            - generic:
              - heading [level=3]: Zen Stones Phone Holder
              - paragraph: Four stones, balanced one on another, like the still rocks of a Japanese zen garden. Cut into a phone stand in bright torii-gate red, with GENKI through the front. It comes as two flat pieces that slot together in seconds. Prop up your phone, and keep a little calm on your desk.
              - generic:
                - generic: 65 pts
                - button: View
              - paragraph: 21 more pts needed
  - contentinfo:
    - generic:
      - generic:
        - generic:
          - generic:
            - text: © 2026
            - link:
              - /url: https://genkiwardrobe.com
              - text: "| Genki"
            - generic: All Rights Reserved
        - generic:
          - heading [level=5]: INFO
          - navigation:
            - list:
              - listitem:
                - link:
                  - /url: /about-us
                  - text: About us
              - listitem:
                - link:
                  - /url: /about-us#contact
                  - text: Contact
              - listitem:
                - link:
                  - /url: /privacy-policy
                  - text: Privacy Policy
              - listitem:
                - link:
                  - /url: /terms-and-conditions
                  - text: Terms and Conditions
        - generic:
          - heading [level=5]: USEFUL LINKS
          - navigation:
            - list:
              - listitem:
                - link:
                  - /url: /rewards
                  - text: Rewards
              - listitem:
                - link:
                  - /url: /return-policy
                  - text: Returns
              - listitem:
                - link:
                  - /url: /shipping-policy
                  - text: Shipping & Delivery
              - listitem:
                - link:
                  - /url: /size-guide
                  - text: Size guide
              - listitem:
                - link:
                  - /url: /faq
                  - text: FAQs
        - generic:
          - heading [level=5]: FOLLOW US ON
          - navigation:
            - list:
              - listitem:
                - link:
                  - /url: https://facebook.com/genkiwardrobelk
                  - text: Facebook
              - listitem:
                - link:
                  - /url: https://instagram.com/genkiwardrobelk
                  - text: Instagram
              - listitem:
                - link:
                  - /url: https://www.tiktok.com/@genkiwardrobelk
                  - text: TikTok
              - listitem:
                - link:
                  - /url: https://wa.me/94701002922
                  - text: WhatsApp
        - generic:
          - generic:
            - heading [level=2]: Subscribe.
            - paragraph: Get the latest drops, exclusive offers, and style updates.
            - generic:
              - generic:
                - generic:
                  - textbox:
                    - /placeholder: Your email address
                  - button [disabled]
  - dialog [ref=e2]:
    - generic [ref=e3]:
      - img "Anime stickers" [ref=e6]
      - generic [ref=e7]:
        - heading "Anime Sticker Pack (50pcs)" [level=2] [ref=e8]
        - paragraph [ref=e9]: 50 pts each
        - paragraph [ref=e12]: 50 premium anime character stickers to customize your gear
        - generic [ref=e13]:
          - button "Add · 50 pts" [disabled] [ref=e14]
          - status [ref=e15]: You need 6 more points.
        - button "Done" [active] [ref=e16] [cursor=pointer]
    - button "Close" [ref=e17] [cursor=pointer]
  - button "Scroll to top"
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
  17 |     this.addButtons = page.getByRole('button', { name: /^(view|choose|add)$|choose a design|view /i });
  18 |     this.includedSection = page.getByText(/included with your next order|queued|selected rewards/i);
  19 |   }
  20 | 
  21 |   async open(): Promise<this> {
  22 |     await this.goto(ACCOUNT_PAGES.rewards.path);
  23 |     return this;
  24 |   }
  25 | 
  26 |   async expectGuestSignInPrompt(): Promise<void> {
  27 |     await this.expectPathname(ACCOUNT_PAGES.rewards.path);
  28 |     await expect(this.page.getByText(/sign in to redeem|have an account\?/i).first()).toBeVisible();
  29 |     await expect(this.catalogHeading).toBeVisible();
  30 |   }
  31 | 
  32 |   async expectLoaded(): Promise<void> {
  33 |     await this.expectPathname(ACCOUNT_PAGES.rewards.path);
  34 |     await expect(this.heading).toBeVisible();
  35 |     await expect(this.usablePoints).toBeVisible({ timeout: 20_000 });
  36 |     await expect(this.catalogHeading).toBeVisible();
  37 |     await expect(this.addButtons.first()).toBeVisible();
  38 |   }
  39 | 
  40 |   async addFirstAffordableReward(): Promise<this> {
  41 |     const directAdd = this.page.getByRole('button', { name: /^add$/i });
  42 |     if (await directAdd.first().isVisible().catch(() => false)) {
  43 |       await directAdd.first().click();
  44 |     } else {
  45 |       await this.page.getByRole('button', { name: /choose a design|^choose$|view /i }).first().click();
> 46 |       await this.page.getByRole('button', { name: /^add\b/i }).first().click();
     |                                                                        ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
  47 |     }
  48 |     await expect(this.includedSection).toBeVisible({ timeout: 10_000 });
  49 |     return this;
  50 |   }
  51 | 
  52 |   async expectRewardQueued(): Promise<void> {
  53 |     await expect(this.includedSection).toBeVisible();
  54 |     await expect(this.page.getByText(/sticker|keytag|reward/i).first()).toBeVisible();
  55 |   }
  56 | 
  57 |   async clearQueuedRewards(): Promise<void> {
  58 |     for (let i = 0; i < 6; i += 1) {
  59 |       if (!(await this.includedSection.isVisible().catch(() => false))) {
  60 |         return;
  61 |       }
  62 |       const remove = this.page.getByRole('button', { name: /remove/i }).first();
  63 |       if (!(await remove.isVisible().catch(() => false))) {
  64 |         return;
  65 |       }
  66 |       await remove.click();
  67 |       await this.page.waitForTimeout(500);
  68 |     }
  69 |   }
  70 | 
  71 |   async getUsablePoints(): Promise<number> {
  72 |     const body = await this.page.locator('body').innerText();
  73 |     const normalized = body.replace(/,/g, '');
  74 |     const match =
  75 |       normalized.match(/(\d+)\s*usable points/i) ||
  76 |       normalized.match(/usable points[^\d]*(\d+)/i) ||
  77 |       normalized.match(/(\d+)\s*points available/i);
  78 |     return match ? Number(match[1]) : 0;
  79 |   }
  80 | 
  81 |   async expectUsablePointsAtMost(maxPoints: number): Promise<void> {
  82 |     await expect
  83 |       .poll(async () => this.getUsablePoints(), { timeout: 15_000 })
  84 |       .toBeLessThanOrEqual(maxPoints);
  85 |   }
  86 | 
  87 |   async expectUsablePointsGreaterThan(minPoints: number): Promise<void> {
  88 |     await expect
  89 |       .poll(async () => this.getUsablePoints(), { timeout: 20_000 })
  90 |       .toBeGreaterThan(minPoints);
  91 |   }
  92 | 
  93 |   async proceedToCheckoutFromQueue(): Promise<void> {
  94 |     await this.page.getByRole('link', { name: /proceed to checkout/i }).click();
  95 |     await this.waitForPageLoad();
  96 |     await this.acceptCookiesIfVisible();
  97 |   }
  98 | }
  99 | 
```