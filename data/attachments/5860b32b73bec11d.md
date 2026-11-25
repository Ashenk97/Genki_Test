# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.ts >> Customer register >> should reject an email that is already registered
- Location: tests/auth.spec.ts:313:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.genki-form').getByText(/already taken/i).first()
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for locator('.genki-form').getByText(/already taken/i).first()

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
      - button "Open cart":
        - img
- heading "Something went wrong on our end" [level=2]
- paragraph: We couldn't load this page just now. This is our problem, not yours — please try again in a moment.
- button "Try again"
- link "Back to home":
  - /url: /
- contentinfo:
  - img "Genki Wardrobe"
  - text: © 2026
  - link "| Genki":
    - /url: /
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
  1   | import { Locator, Page, expect } from '@playwright/test';
  2   | import { AUTH_MESSAGES, PAGE_HEADINGS } from '@constants/messages';
  3   | import { AppRoutes } from '@constants/routes';
  4   | import { Timeouts } from '@constants/timeouts';
  5   | import { REGISTER_PAGE } from '@data/navigation.data';
  6   | import { BasePage } from '@pages/BasePage';
  7   | 
  8   | export class RegisterPage extends BasePage {
  9   |   private readonly heading: Locator;
  10  |   private readonly form: Locator;
  11  |   private readonly emailInput: Locator;
  12  |   private readonly passwordInput: Locator;
  13  |   private readonly submitButton: Locator;
  14  |   private readonly loginLink: Locator;
  15  |   private readonly confirmationHeading: Locator;
  16  | 
  17  |   constructor(page: Page) {
  18  |     super(page);
  19  | 
  20  |     this.heading = page.getByRole('heading', { name: REGISTER_PAGE.heading });
  21  |     this.form = page.locator('.genki-form');
  22  |     this.emailInput = this.form.locator('#regEmail, input[name="email"]');
  23  |     this.passwordInput = this.form.locator('input[name="password"]');
  24  |     this.submitButton = this.form.getByRole('button', { name: /^submit$/i });
  25  |     this.loginLink = this.form.getByRole('link', { name: /login here/i });
  26  |     this.confirmationHeading = page.getByRole('heading', {
  27  |       name: PAGE_HEADINGS.emailConfirmation,
  28  |     });
  29  |   }
  30  | 
  31  |   async open(): Promise<this> {
  32  |     await this.goto(REGISTER_PAGE.path);
  33  |     return this;
  34  |   }
  35  | 
  36  |   async expectLoaded(): Promise<void> {
  37  |     await this.expectPathname(REGISTER_PAGE.path);
  38  |     await expect(this.heading).toBeVisible();
  39  |     await expect(this.emailInput).toBeVisible();
  40  |     await expect(this.passwordInput).toBeVisible();
  41  |     await expect(this.submitButton).toBeVisible();
  42  |   }
  43  | 
  44  |   async register(email: string, password: string): Promise<this> {
  45  |     await this.emailInput.fill(email);
  46  |     await this.passwordInput.fill(password);
  47  |     await this.submitButton.click();
  48  |     return this;
  49  |   }
  50  | 
  51  |   async waitForConfirmationOrMailFailure(): Promise<'confirmed' | 'mail-failure' | 'stuck'> {
  52  |     return Promise.race([
  53  |       this.page
  54  |         .waitForURL(new RegExp(AppRoutes.EmailConfirmation), { timeout: Timeouts.OrderSuccess })
  55  |         .then(() => 'confirmed' as const)
  56  |         .catch(() => 'stuck' as const),
  57  |       this.page
  58  |         .getByText(AUTH_MESSAGES.mailSendFailure)
  59  |         .first()
  60  |         .waitFor({ state: 'visible', timeout: Timeouts.OrderSuccess })
  61  |         .then(() => 'mail-failure' as const)
  62  |         .catch(() => 'stuck' as const),
  63  |     ]);
  64  |   }
  65  | 
  66  |   async fillEmailOnly(email: string): Promise<this> {
  67  |     await this.emailInput.fill(email);
  68  |     return this;
  69  |   }
  70  | 
  71  |   async submitEmpty(): Promise<this> {
  72  |     await this.submitButton.click();
  73  |     return this;
  74  |   }
  75  | 
  76  |   async openLogin(): Promise<void> {
  77  |     await this.loginLink.click();
  78  |   }
  79  | 
  80  |   async expectValidationMessage(message: string | RegExp): Promise<void> {
> 81  |     await expect(this.form.getByText(message).first()).toBeVisible({
      |                                                        ^ Error: expect(locator).toBeVisible() failed
  82  |       timeout: Timeouts.Assertion,
  83  |     });
  84  |   }
  85  | 
  86  |   async expectEmailConfirmation(email: string): Promise<void> {
  87  |     await expect(this.page).toHaveURL(new RegExp(AppRoutes.EmailConfirmation), {
  88  |       timeout: Timeouts.OrderSuccess,
  89  |     });
  90  |     await expect(this.confirmationHeading).toBeVisible();
  91  |     await expect(this.page.getByText(email)).toBeVisible();
  92  |     await expect(this.page.getByText(/we have sent an email/i)).toBeVisible();
  93  |   }
  94  | 
  95  |   async expectEmailRequired(): Promise<void> {
  96  |     await this.submitButton.click();
  97  |     await expect
  98  |       .poll(async () =>
  99  |         this.emailInput.evaluate((el: HTMLInputElement) => el.validity.valueMissing),
  100 |       )
  101 |       .toBe(true);
  102 |   }
  103 | 
  104 |   async expectAccountConfirmed(): Promise<void> {
  105 |     await expect(
  106 |       this.page.getByText(/confirm|verif|success|activated|thank you/i).first(),
  107 |     ).toBeVisible({ timeout: Timeouts.MediumUi });
  108 |   }
  109 | }
  110 | 
```