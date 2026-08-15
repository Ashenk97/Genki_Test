<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=32&duration=2800&pause=1200&color=E11D48&center=true&vCenter=true&multiline=true&width=780&height=100&lines=GENKI+WARDROBE;%F0%9F%9A%80+E2E+Test+Automation" alt="Typing SVG" />

### Production-ready UI tests for [Genki Wardrobe Staging](https://staging.genkiwardrobe.com/)

**Playwright** · **TypeScript** · **Page Object Model** · **Chrome + mobile + cross-browser**

<br/>

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![POM](https://img.shields.io/badge/Pattern-Page%20Object%20Model-E11D48?style=for-the-badge)
![Allure](https://img.shields.io/badge/Reporting-Allure-FF6A00?style=for-the-badge)

<br/>

[![Staging](https://img.shields.io/badge/Target-staging.genkiwardrobe.com-black?style=flat-square)](https://staging.genkiwardrobe.com/)
[![Status](https://img.shields.io/badge/Status-Active_Development-brightgreen?style=flat-square&logo=github)](https://github.com)
[![License](https://img.shields.io/badge/License-Private-red?style=flat-square)](#license)

</div>

---

## Why this suite

| Feature | What you get |
|:--------|:-------------|
| **POM + fixtures** | Locators/actions in `/pages`; specs stay thin via injected fixtures |
| **Layered helpers** | Cart/checkout setup in `/helpers`; domain data in `/data` |
| **Email flows** | mail.tm client for register confirm, password reset, order confirmation (`@email`) |
| **Payments** | COD, bank transfer, PayHere sandbox card success/decline paths |
| **Failure forensics** | Trace · video · screenshot retained on fail |
| **CI** | Daily GitHub Actions run with Allure report publish |

**Default target:** [https://staging.genkiwardrobe.com/](https://staging.genkiwardrobe.com/) (`TEST_ENV=staging`)

---

## Tech stack

| Tool | Version | Purpose |
|:-----|:-------:|:--------|
| [@playwright/test](https://playwright.dev/) | `^1.62.1` | Browser automation, assertions, reporting |
| [TypeScript](https://www.typescriptlang.org/) | `^7.0.2` | Type-safe tests & page objects |
| [allure-playwright](https://www.npmjs.com/package/allure-playwright) | `^3.10.2` | Allure results for CI reporting |
| [dotenv](https://www.npmjs.com/package/dotenv) | `^17.4.2` | Env loading for credentials / billing |

Path aliases (see `tsconfig.json`): `@pages/*`, `@fixtures/*`, `@helpers/*`, `@constants/*`, `@data/*`, `@api/*`, `@models/*`.

---

## Project structure

```text
Genki_Test/
├── api/mail-tm/              # Disposable inbox client (email specs)
├── auth/                     # Reserved for Playwright storageState
├── constants/                # Routes, timeouts, payment enums, env config
├── data/                     # Auth, checkout, products, PayHere cards, nav copy
├── docs/                     # Test-case CSV, bug report, TODOs
├── fixtures/                 # Custom test fixtures + env loader
├── helpers/                  # Cart / checkout / random helpers
├── pages/                    # Page Object Model classes
├── scripts/                  # generate-test-cases.mjs
├── tests/                    # Playwright specs
├── types/                    # Shared TypeScript models
├── playwright.config.ts
├── package.json
└── .env.example
```

| Folder | Purpose |
|:-------|:--------|
| **`/tests`** | `.spec.ts` scenarios by area (auth, cart, checkout, gift, nav, …) |
| **`/pages`** | POM classes (inherit `BasePage`) |
| **`/fixtures`** | Inject page objects; load `.env` / `.env.{TEST_ENV}` |
| **`/helpers`** | Reusable flows (add sample product, start guest card checkout) |
| **`/data`** | Test inputs and product paths |
| **`/api`** | External APIs used by tests (mail.tm) |
| **`/docs`** | Living test inventory, staging bug report, follow-ups |
| **`/constants`** | Routes, messages, timeouts, payment methods |

---

## Prerequisites

- **Node.js** ≥ 18 (CI uses 20)
- **npm** ≥ 9
- Staging account credentials for logged-in flows (see `.env.example`)

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers (first time only)
npx playwright install

# 3. Configure env (staging credentials + optional checkout overrides)
cp .env.example .env.staging
# Edit GENKI_TEST_EMAIL / GENKI_TEST_PASSWORD / GENKI_TEST_DISPLAY_NAME

# 4. Default suite — Chrome desktop + mobile-chrome, excludes @email
npm test

# Interactive / debug
npm run test:ui
npm run test:debug

# HTML report from last run
npm run report
```

---

## NPM scripts

| Command | Description |
|:--------|:------------|
| `npm test` | Chrome + mobile-chrome, headless, **excludes** `@email` |
| `npm run test:headed` | Same as `test`, headed |
| `npm run test:chrome` | Desktop Chrome only (no `@email`) |
| `npm run test:mobile` | `mobile-chrome` project (mobile nav specs) |
| `npm run test:chromium` / `test:firefox` / `test:webkit` | Single engine, no `@email` |
| `npm run test:all` | All configured projects, no `@email` |
| `npm run test:staging` | Force `TEST_ENV=staging` |
| `npm run test:production` | Force `TEST_ENV=production` |
| `npm run test:email` | Staging only — specs tagged `@email` |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run report` | Open Playwright HTML report |
| `npm run allure:generate` / `allure:open` / `allure:serve` | Allure report helpers |
| `npm run codegen` | Record against staging |
| `npm run docs:cases` | Regenerate `docs/test-cases.csv` |

Email specs (`@email`) are **opt-in** via `npm run test:email` so disposable-inbox runs stay separate from the daily UI suite.

---

## Configuration

From `playwright.config.ts`:

| Setting | Value |
|:--------|:------|
| Base URL | From `TEST_ENV` → staging or production (`constants/environments.ts`) |
| Default projects | `chrome` (Desktop Chrome channel) + `mobile-chrome` (Pixel 7) |
| Also available | `chromium`, `firefox`, `webkit` |
| Parallelism | `fullyParallel: true` |
| Trace / video / screenshot | Retain / only on failure |
| Reporters | HTML + Allure |

**CI (`CI=1`):** `retries: 2`, `forbidOnly: true`, `workers: 2`. Daily workflow: `.github/workflows/daily-tests.yml`.

---

## Page objects & fixtures

Fixtures inject POMs into specs (see `fixtures/test-fixtures.ts`):

`homePage`, `header`, `footer`, `productDetailsPage`, `collectionPage`, `loginPage`, `registerPage`, `forgotPasswordPage`, `resetPasswordPage`, `accountDashboardPage`, `cartPage`, `wishlistPage`, `checkoutPage`, `rewardsPage`, `payHereCheckout`

```typescript
import { test } from '@fixtures/test-fixtures';
import { PaymentMethod } from '@constants/payment';
import { guestCheckoutEmail } from '@data/checkout.data';
import { addSampleProductToCart } from '@helpers/cart.helper';

test('guest COD checkout', async ({ productDetailsPage, checkoutPage }) => {
  await addSampleProductToCart(productDetailsPage);
  await checkoutPage.open();
  await checkoutPage.fillGuestBilling(guestCheckoutEmail('guest-cod'));
  await checkoutPage.selectPayment(PaymentMethod.COD);
  await checkoutPage.acceptTerms();
  await checkoutPage.placeOrder();
  await checkoutPage.expectOrderSuccess(PaymentMethod.COD);
});
```

---

## Test coverage

Inventory: [`docs/test-cases.csv`](./docs/test-cases.csv) (~95 cases; regenerate with `npm run docs:cases`). Details: [`docs/README.md`](./docs/README.md).

| Area | Specs (examples) |
|:-----|:-----------------|
| **Nav / chrome** | `home`, `main-nav`, `navigation`, `mobile-nav`, `top-bar`, `footer` |
| **Auth** | `auth`, `register-email`, `forgot-password-email` |
| **Catalog / PDP** | `collections`, `pdp`, `catalog-edges`, `search` |
| **Cart / wishlist** | `cart`, `wishlist` |
| **Checkout** | `checkout` (COD, bank, PayHere), `checkout-advanced` (shipping, gift, create-account bug guard) |
| **Account / loyalty** | `profile`, `rewards` |
| **Email** | `order-confirmation-email`, register / reset (`@email`) |

### Gift checkout (intentional product rule)

Marking **This order is a gift** disables **Cash on Delivery**; card and bank transfer stay available. Covered under `Gift checkout` in `tests/checkout-advanced.spec.ts`.

---

## Docs

| Doc | Purpose |
|:----|:--------|
| [`docs/TODO.md`](./docs/TODO.md) | Follow-ups (PDP variants and process) |
| [`docs/PDP_VARIANT_TODO.md`](./docs/PDP_VARIANT_TODO.md) | Color/size matrix automation backlog |
| [`docs/test-cases.csv`](./docs/test-cases.csv) | Living case inventory |
| [`docs/README.md`](./docs/README.md) | How to read / regenerate the CSV |

---

## Debugging failures

```bash
npm run report
npx playwright show-trace test-results/<test-folder>/trace.zip
```

---

## Roadmap

| Phase | Status | Focus |
|:------|:------:|:------|
| **Core browse + PDP** | Done | Home, nav, collections, PDP, cart/wishlist |
| **Auth + checkout + payments** | Done | Login/register/reset, COD/bank/PayHere, gift rules, email confirms |
| **Hardening** | In progress | Search coverage once fixed, fuller PDP variant matrix |
| **Later** | Planned | `storageState` reuse, broader visual checks |

---

## License

**Private** — Genki Wardrobe QA Automation Project.

<div align="center">

### Built with Playwright · Styled with Genki energy

</div>
