# Genki Wardrobe — E2E Test Automation

Production-ready UI test suite for [Genki Wardrobe staging](https://staging.genkiwardrobe.com/), built with **Playwright**, **TypeScript**, and the **Page Object Model (POM)** pattern.

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [@playwright/test](https://playwright.dev/) | ^1.62.1 | Browser automation, assertions, reporting |
| [TypeScript](https://www.typescriptlang.org/) | ^7.0.2 | Type-safe test and page object code |
| [@types/node](https://www.npmjs.com/package/@types/node) | ^22.15.29 | Node.js type definitions |

**Design pattern:** Page Object Model (POM) — UI locators and actions live in `/pages`; specs in `/tests` stay thin and readable.

**Target environment:** [https://staging.genkiwardrobe.com/](https://staging.genkiwardrobe.com/)

---

## Project Structure

```
Genki_Test/
├── auth/                      # Authentication state storage (future use)
│   └── .gitkeep
├── fixtures/
│   ├── test-data.ts           # Shared constants and test input
│   └── test-fixtures.ts       # Custom fixtures injecting POM instances
├── pages/
│   ├── BasePage.ts            # Shared navigation & cookie handling
│   ├── HomePage.ts            # Landing page POM
│   └── ProductDetailsPage.ts  # Product detail page (PDP) POM
├── tests/
│   └── navigation.spec.ts     # First E2E test
├── utils/
│   └── random.ts              # Random string / email helpers
├── playwright.config.ts       # Playwright runner configuration
├── tsconfig.json              # TypeScript compiler options
└── package.json
```

### Folder Purposes

| Folder | Purpose |
|--------|---------|
| **`/tests`** | Executable `.spec.ts` files. Each file groups related scenarios (e.g. navigation, checkout). Specs should stay thin — delegate all UI interaction to page objects. |
| **`/pages`** | Page Object Model classes. Each class encapsulates locators and actions for a single page or component. All pages inherit from `BasePage` for shared behaviour (cookie handling, navigation helpers). |
| **`/fixtures`** | Custom Playwright fixtures (`test-fixtures.ts`) that inject page objects into tests, plus structured test data (`test-data.ts`) and future state-management helpers. |
| **`/utils`** | Framework-agnostic helper functions (e.g. generating random emails or strings) that are not tied to a specific page. |
| **`/auth`** | Reserved for Playwright `storageState` JSON files when login flows are added. Keeps authenticated sessions out of individual tests. |

---

## Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

---

## Getting Started

```bash
# Install dependencies
npm install

# Install Playwright browsers (first time only)
npx playwright install

# Run the full suite (Chromium, Firefox, WebKit in parallel)
npm test

# Run a single browser
npm run test:chromium

# Open the interactive UI mode
npm run test:ui

# View the HTML report after a run
npm run report
```

---

## Configuration

Defined in `playwright.config.ts`:

| Setting | Value |
|---------|-------|
| Base URL | `https://staging.genkiwardrobe.com/` |
| Browsers | Chromium, Firefox, WebKit |
| Parallelism | Enabled (`fullyParallel: true`) |
| Trace | `retain-on-failure` |
| Video | `retain-on-failure` |
| Screenshot | `only-on-failure` |
| Reporter | HTML + list |

### CI Behaviour

When the `CI` environment variable is set, the config automatically:

- Sets `retries: 2`
- Enables `forbidOnly: true` to block accidental `test.only` commits
- Limits `workers: 2` to balance speed and resource usage

---

## Page Object Model

```
BasePage
  ├── HomePage             — landing page (hero, nav, search, product grid)
  └── ProductDetailsPage   — PDP (size, color, add to cart)
```

### Class Responsibilities

| Class | Responsibility |
|-------|----------------|
| `BasePage` | `goto()`, cookie consent dismissal, network/page load waits, title assertions |
| `HomePage` | Hero banner, primary navigation (Home / Shop / Collections), search bar, product grid navigation |
| `ProductDetailsPage` | Product title, size and color selectors, Add to Cart actions and assertions |

### Staging Site Locator Notes

Locators are mapped to the **actual staging DOM**, not generic placeholders:

| Element | Locator strategy |
|---------|------------------|
| Product cards | `a[href^="/products/"]` — staging uses direct product links, not a "View Product" CTA |
| Home nav | Logo link filtered by `getByAltText('Genki Wardrobe')` |
| Shop nav | `Men` link in the primary navigation (shop equivalent on staging) |
| Collections nav | `Collections` link in the primary navigation |
| Search bar | `getByRole('searchbox', { name: /search products/i })` |
| Size selection | Hidden radio inputs (`input[type="radio"]:not([name="product-color"])`) — label click or force-click |
| Add to Cart | `getByRole('button', { name: /add to cart/i })` — appears only **after** a size is selected |

### Writing a New Test

1. Add or extend a page object in `/pages`.
2. Register it in `/fixtures/test-fixtures.ts` if it should be injected as a fixture.
3. Create a spec in `/tests` using the custom `test` fixture:

```typescript
import { test, expect } from '../fixtures/test-fixtures';

test('my scenario', async ({ homePage }) => {
  await homePage.open();
  // ...
});
```

---

## Test Coverage

### `tests/navigation.spec.ts` — Homepage Navigation

Validates the core browse flow from landing page to product detail:

1. Opens the homepage
2. Asserts the page title contains `"Genki"`
3. Asserts the heading **"Cultural Threads for Every Mood"** is visible
4. Clicks the first product card via `HomePage.openFirstProduct()`
5. Selects an available size via `ProductDetailsPage.selectFirstAvailableSize()`
6. Verifies the **Add to Cart** button is visible and enabled

---

## NPM Scripts

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests headlessly across all browsers |
| `npm run test:headed` | Run with a visible browser window |
| `npm run test:ui` | Playwright interactive UI mode |
| `npm run test:debug` | Debug mode with Playwright Inspector |
| `npm run test:chromium` | Chromium only |
| `npm run test:firefox` | Firefox only |
| `npm run test:webkit` | WebKit only |
| `npm run report` | Open the HTML report from the last run |
| `npm run codegen` | Record actions against the staging site |

---

## Debugging Failed Tests

Playwright captures artifacts automatically on failure:

```bash
# Open the HTML report (traces, screenshots, videos linked per test)
npm run report

# Open a specific trace file directly
npx playwright show-trace test-results/<test-folder>/trace.zip
```

---

## License

Private — Genki Wardrobe QA Automation Project.
