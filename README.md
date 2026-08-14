<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=32&duration=2800&pause=1200&color=E11D48&center=true&vCenter=true&multiline=true&width=780&height=100&lines=GENKI+WARDROBE;%F0%9F%9A%80+E2E+Test+Automation" alt="Typing SVG" />

<br/>

<img src="https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif" width="140" alt="rocket launch" />

### Production-ready UI tests for [Genki Wardrobe Staging](https://staging.genkiwardrobe.com/)

**Playwright** · **TypeScript** · **Page Object Model** · **Cross-Browser**

<br/>

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![POM](https://img.shields.io/badge/Pattern-Page%20Object%20Model-E11D48?style=for-the-badge)
![Browsers](https://img.shields.io/badge/Browsers-Chromium%20%7C%20Firefox%20%7C%20WebKit-0EA5E9?style=for-the-badge)

<br/>

[![Staging](https://img.shields.io/badge/🎯_Target-staging.genkiwardrobe.com-black?style=flat-square)](https://staging.genkiwardrobe.com/)
[![Status](https://img.shields.io/badge/Status-Active_Development-brightgreen?style=flat-square&logo=github)](https://github.com)
[![License](https://img.shields.io/badge/License-Private-red?style=flat-square)](#license)

</div>

---

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,14,6&height=120&section=header&text=&fontSize=40&animation=fadeIn&fontAlignY=35" width="100%" alt="wave header"/>
</p>

## ✨ Why This Suite Hits Different

> Ship confidence with every click. This framework doesn't just click buttons — it **owns the UI** with clean POM architecture, typed fixtures, and failure artifacts that tell the full story.

| 🔥 Feature | 💥 What You Get |
|:-----------|:----------------|
| **Cross-browser power** | Chromium · Firefox · WebKit — all in parallel |
| **POM architecture** | Locators live in pages, specs stay razor-thin |
| **Smart fixtures** | Page objects injected automatically into every test |
| **Failure forensics** | Trace · Video · Screenshot retained on fail |
| **CI-ready** | Retries, `forbidOnly`, capped workers when `CI=1` |

<p align="center">
  <img src="https://media.giphy.com/media/qgQUggACQPF6vfYTmJ/giphy.gif" width="220" alt="test automation energy"/>
</p>

---

## 🧰 Tech Stack

<div align="center">

| Tool | Version | Purpose |
|:----:|:-------:|:--------|
| [@playwright/test](https://playwright.dev/) | `^1.62.1` | Browser automation, assertions, reporting |
| [TypeScript](https://www.typescriptlang.org/) | `^7.0.2` | Type-safe tests & page objects |
| [@types/node](https://www.npmjs.com/package/@types/node) | `^22.15.29` | Node.js type definitions |

</div>

**Design pattern:** Page Object Model (POM) — UI locators and actions live in `/pages`; specs in `/tests` stay thin and readable.

**Target environment:** [https://staging.genkiwardrobe.com/](https://staging.genkiwardrobe.com/)

---

## 🗂️ Project Structure

```text
Genki_Test/
├── 🔐 auth/                      # Authentication state storage (future use)
│   └── .gitkeep
├── 📦 fixtures/
│   ├── test-data.ts              # Shared constants and test input
│   └── test-fixtures.ts          # Custom fixtures injecting POM instances
├── 🧩 pages/
│   ├── BasePage.ts               # Shared navigation & cookie handling
│   ├── HomePage.ts               # Landing page POM
│   └── ProductDetailsPage.ts     # Product detail page (PDP) POM
├── 🧪 tests/
│   └── navigation.spec.ts        # First E2E test
├── 🛠️ utils/
│   └── random.ts                 # Random string / email helpers
├── ⚙️ playwright.config.ts        # Playwright runner configuration
├── 📝 tsconfig.json               # TypeScript compiler options
└── 📄 package.json
```

### 📁 Folder Purposes

| Folder | Purpose |
|:-------|:--------|
| **`/tests`** | Executable `.spec.ts` files. Each file groups related scenarios (e.g. navigation, checkout). Specs stay thin — delegate all UI interaction to page objects. |
| **`/pages`** | Page Object Model classes. Each class encapsulates locators and actions for a single page or component. All pages inherit from `BasePage`. |
| **`/fixtures`** | Custom Playwright fixtures that inject page objects into tests, plus structured test data and future state helpers. |
| **`/utils`** | Framework-agnostic helpers (random emails/strings) not tied to a specific page. |
| **`/auth`** | Reserved for Playwright `storageState` JSON when login flows land. |

---

## ✅ Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

---

## 🚀 Getting Started — Launch Sequence

```bash
# 1️⃣  Install dependencies
npm install

# 2️⃣  Install Playwright browsers (first time only)
npx playwright install

# 3️⃣  Run the full suite (Chromium, Firefox, WebKit in parallel)
npm test

# 🎯 Run a single browser
npm run test:chromium

# 🎮 Open the interactive UI mode
npm run test:ui

# 📊 View the HTML report after a run
npm run report
```

<p align="center">
  <img src="https://media.giphy.com/media/l0MYC0LajbaPoEADu/giphy.gif" width="260" alt="systems go"/>
</p>

---

## ⚙️ Configuration

Defined in `playwright.config.ts`:

| Setting | Value |
|:--------|:------|
| 🌐 Base URL | `https://staging.genkiwardrobe.com/` |
| 🌍 Browsers | Chromium, Firefox, WebKit |
| ⚡ Parallelism | Enabled (`fullyParallel: true`) |
| 🔍 Trace | `retain-on-failure` |
| 🎥 Video | `retain-on-failure` |
| 📸 Screenshot | `only-on-failure` |
| 📋 Reporter | HTML + list |

### 🤖 CI Behaviour

When the `CI` environment variable is set, the config automatically:

- Sets `retries: 2`
- Enables `forbidOnly: true` to block accidental `test.only` commits
- Limits `workers: 2` to balance speed and resource usage

---

## 🧩 Page Object Model

```text
BasePage
  ├── HomePage             — landing page (hero, nav, search, product grid)
  └── ProductDetailsPage   — PDP (size, color, add to cart)
```

### Class Responsibilities

| Class | Responsibility |
|:------|:---------------|
| `BasePage` | `goto()`, cookie consent dismissal, network/page load waits, title assertions |
| `HomePage` | Hero banner, primary navigation (Home / Shop / Collections), search bar, product grid navigation |
| `ProductDetailsPage` | Product title, size and color selectors, Add to Cart actions and assertions |

### 🎯 Staging Site Locator Notes

Locators are mapped to the **actual staging DOM**, not generic placeholders:

| Element | Locator strategy |
|:--------|:-----------------|
| Product cards | `a[href^="/products/"]` — staging uses direct product links, not a "View Product" CTA |
| Home nav | Logo link filtered by `getByAltText('Genki Wardrobe')` |
| Shop nav | `Men` link in the primary navigation (shop equivalent on staging) |
| Collections nav | `Collections` link in the primary navigation |
| Search bar | `getByRole('searchbox', { name: /search products/i })` |
| Size selection | Hidden radio inputs (`input[type="radio"]:not([name="product-color"])`) — label click or force-click |
| Add to Cart | `getByRole('button', { name: /add to cart/i })` — appears only **after** a size is selected |

### ✍️ Writing a New Test

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

## 🧪 Test Coverage

### `tests/navigation.spec.ts` — Homepage Navigation

Validates the core browse flow from landing page to product detail:

1. Opens the homepage
2. Asserts the page title contains `"Genki"`
3. Asserts the heading **"Cultural Threads for Every Mood"** is visible
4. Clicks the first product card via `HomePage.openFirstProduct()`
5. Selects an available size via `ProductDetailsPage.selectFirstAvailableSize()`
6. Verifies the **Add to Cart** button is visible and enabled

---

## 📜 NPM Scripts

| Command | Description |
|:--------|:------------|
| `npm test` | 🏁 Run all tests headlessly across all browsers |
| `npm run test:headed` | 👀 Run with a visible browser window |
| `npm run test:ui` | 🎮 Playwright interactive UI mode |
| `npm run test:debug` | 🐛 Debug mode with Playwright Inspector |
| `npm run test:chromium` | 🟦 Chromium only |
| `npm run test:firefox` | 🟧 Firefox only |
| `npm run test:webkit` | 🟪 WebKit only |
| `npm run report` | 📊 Open the HTML report from the last run |
| `npm run codegen` | 🎥 Record actions against the staging site |

---

## 🔎 Debugging Failed Tests

Playwright captures artifacts automatically on failure:

```bash
# Open the HTML report (traces, screenshots, videos linked per test)
npm run report

# Open a specific trace file directly
npx playwright show-trace test-results/<test-folder>/trace.zip
```

<p align="center">
  <img src="https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif" width="240" alt="debug mode"/>
</p>

---

## 🗺️ Roadmap Vibes

```text
  NOW ✅                    NEXT 🔜                   LATER 🚀
 ┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
 │ Navigation flow │ ───► │ Auth & sessions │ ───► │ CI pipeline     │
 │ Home → PDP →    │      │ storageState    │      │ GitHub Actions  │
 │ Add to Cart     │      │ Cart & Checkout │      │ Visual regress. │
 └─────────────────┘      └─────────────────┘      └─────────────────┘
```

| Phase | Status | Focus |
|:------|:------:|:------|
| **Now** | ✅ | Homepage → PDP → Add to Cart |
| **Next** | 🔜 | Auth / `storageState` · Cart & Checkout |
| **Later** | 🚀 | GitHub Actions CI · Visual regression |

---

## 📄 License

**Private** — Genki Wardrobe QA Automation Project.

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,14,6&height=100&section=footer" width="100%" alt="wave footer"/>
</p>

<div align="center">

### Built with ❤️ · Powered by Playwright · Styled with Genki energy

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=18&duration=3000&pause=1000&color=94A3B8&center=true&vCenter=true&width=500&lines=Automate+boldly.+Assert+loudly.+Ship+confidently." alt="footer typing" />

</div>
