import path from 'path';
import fs from 'fs';
import { test as setup } from '@playwright/test';
import { TEST_DATA } from '@data/index';
import { LoginPage } from '@pages/LoginPage';

const authDir = path.join(__dirname, '../.auth');
const authFile = path.join(authDir, 'user.json');

setup('authenticate', async ({ page }) => {
  fs.mkdirSync(authDir, { recursive: true });
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(TEST_DATA.auth.email, TEST_DATA.auth.password);
  await loginPage.expectLoginSuccess();
  await page.context().storageState({ path: authFile });
});
