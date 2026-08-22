import { defineConfig, devices } from '@playwright/test';
import { loadProjectEnv } from '@fixtures/env';
import { getEnvConfig } from '@constants/environments';
import { Timeouts } from '@constants/timeouts';

loadProjectEnv();

const { baseURL } = getEnvConfig();

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['html'],
    ['allure-playwright'],
  ],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    actionTimeout: Timeouts.Action,
    navigationTimeout: Timeouts.Navigation,
  },
  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
      retries: 2,
    },
    {
      name: 'chrome',
      dependencies: ['setup'],
      testIgnore: /mobile-.*\.spec\.ts|auth\.setup\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
    {
      name: 'chromium',
      dependencies: ['setup'],
      testIgnore: /mobile-.*\.spec\.ts|auth\.setup\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      dependencies: ['setup'],
      testIgnore: /mobile-.*\.spec\.ts|auth\.setup\.ts/,
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      dependencies: ['setup'],
      testIgnore: /mobile-.*\.spec\.ts|auth\.setup\.ts/,
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: {
        ...devices['Pixel 7'],
        channel: 'chrome',
      },
      testMatch: /mobile-.*\.spec\.ts/,
    },
  ],
});
