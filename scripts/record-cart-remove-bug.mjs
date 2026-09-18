import fs from 'fs';
import path from 'path';
import { chromium } from '@playwright/test';

function loadEnvFile(fileName) {
  const envPath = path.resolve(fileName);
  if (!fs.existsSync(envPath)) {
    return;
  }
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }
    const eq = trimmed.indexOf('=');
    if (eq === -1) {
      continue;
    }
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadEnvFile('.env');
loadEnvFile('.env.staging');

const BASE_URL = 'https://staging.genkiwardrobe.com';
const OUT_DIR = path.resolve('tmp/bug-demos');
const AUTH_FILE = path.resolve('.auth/user.json');

async function setBanner(page, text) {
  await page.evaluate((message) => {
    let el = document.getElementById('qa-demo-banner');
    if (!el) {
      el = document.createElement('div');
      el.id = 'qa-demo-banner';
      el.setAttribute('style', [
        'position:fixed',
        'top:0',
        'left:0',
        'right:0',
        'z-index:2147483647',
        'background:#b91c1c',
        'color:#fff',
        'font:600 18px/1.4 Segoe UI,sans-serif',
        'padding:14px 18px',
        'text-align:center',
        'box-shadow:0 2px 8px rgba(0,0,0,.25)',
      ].join(';'));
      document.body.appendChild(el);
    }
    el.textContent = message;
  }, text);
}

async function hold(page, ms) {
  await page.waitForTimeout(ms);
}

async function acceptCookies(page) {
  const accept = page.getByRole('button', { name: /^accept$/i });
  if (await accept.isVisible().catch(() => false)) {
    await accept.click();
  }
}

async function loginIfNeeded(page) {
  await page.goto(`${BASE_URL}/cart`, { waitUntil: 'domcontentloaded' });
  await acceptCookies(page);
  const loggedIn = await page.getByRole('button', { name: /^logout$/i }).isVisible().catch(() => false);
  if (loggedIn) {
    return;
  }

  const email = process.env.GENKI_TEST_EMAIL?.trim();
  const password = process.env.GENKI_TEST_PASSWORD?.trim();
  if (!email || !password) {
    throw new Error('Not signed in and GENKI_TEST_EMAIL / GENKI_TEST_PASSWORD are missing');
  }

  await page.goto(`${BASE_URL}/login`, { waitUntil: 'domcontentloaded' });
  await page.locator('.login-form input[name="email"]').fill(email);
  await page.locator('.login-form input[name="password"]').fill(password);
  await page.locator('.login-form').getByRole('button', { name: /^submit$/i }).click();
  await page.getByRole('button', { name: /^logout$/i }).waitFor({ timeout: 20_000 });
}

async function addSizeMIfCartEmpty(page) {
  await page.goto(`${BASE_URL}/cart`, { waitUntil: 'domcontentloaded' });
  await acceptCookies(page);
  const empty = await page.getByText(/no items found in cart/i).isVisible().catch(() => false);
  if (!empty) {
    return;
  }

  await page.goto(`${BASE_URL}/products/test-white-only`, { waitUntil: 'domcontentloaded' });
  await page.locator('.product-content__size__content label').filter({ hasText: /^M$/ }).click();
  await page.getByRole('button', { name: /add to cart/i }).click();
  const closeDrawer = page.locator('.cart-overlay__close-icon');
  if (await closeDrawer.isVisible().catch(() => false)) {
    await closeDrawer.click();
  }
  await page.goto(`${BASE_URL}/cart`, { waitUntil: 'domcontentloaded' });
  await page.getByRole('link', { name: /test product w only/i }).first().waitFor();
}

async function saveVideo(page, context, browser) {
  const dest = path.join(OUT_DIR, 'signed-in-cart-remove-does-not-persist.webm');
  const video = page.video();
  await context.close();
  await browser.close();
  if (video) {
    const videoPath = await video.path();
    if (fs.existsSync(videoPath) && videoPath !== dest) {
      fs.renameSync(videoPath, dest);
    }
  }
  return dest;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const contextOptions = {
    viewport: { width: 1280, height: 720 },
    recordVideo: { dir: OUT_DIR, size: { width: 1280, height: 720 } },
  };
  if (fs.existsSync(AUTH_FILE)) {
    contextOptions.storageState = AUTH_FILE;
  }

  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
  });
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();

  try {
    await loginIfNeeded(page);
    await addSizeMIfCartEmpty(page);
    await hold(page, 2000);

    await setBanner(page, '1/4 Signed in. Cart has a line (Test Product W only, size M).');
    await hold(page, 2500);

    const removeButton = page.locator('table tbody tr td:last-child button').first();
    await setBanner(page, '2/4 Clicking remove. Watch the line disappear.');
    await hold(page, 1200);
    await removeButton.click();
    await page.getByText(/no items found in cart/i).waitFor({ timeout: 10_000 });

    await setBanner(page, '3/4 UI is empty. Reloading immediately — same as the failing test.');
    await hold(page, 700);

    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.getByRole('heading', { name: /^cart$/i }).waitFor();
    await page.getByRole('button', { name: /^logout$/i }).waitFor({ timeout: 15_000 });

    const restored = page.locator('table tbody tr').filter({
      has: page.locator('a[href^="/products/"]'),
    }).first();
    await restored.waitFor({ timeout: 15_000 });
    const lineText = (await restored.innerText()).replace(/\s+/g, ' ').trim();
    await setBanner(page, `BUG: reload restored the removed line (${lineText.slice(0, 80)}).`);
    await hold(page, 4500);
  } catch (error) {
    await setBanner(page, `Recording failed: ${error.message}`).catch(() => undefined);
    await hold(page, 2000);
    throw error;
  } finally {
    const dest = await saveVideo(page, context, browser);
    console.log(dest);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
