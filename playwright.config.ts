import { defineConfig, devices } from '@playwright/test';
import { loadProjectEnv } from '@fixtures/env';
import { getEnvConfig } from '@constants/environments';
import { Timeouts } from '@constants/timeouts';

loadProjectEnv();

const { baseURL } = getEnvConfig();

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  // Guest/read-only specs run in parallel. Specs tagged @shared-account take a
  // cross-worker lock (and stay serial within the file) so they do not fight
  // over the one staging customer cart / rewards / profile.
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
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
      name: 'mobile-chrome',
      use: {
        ...devices['Pixel 7'],
        channel: 'chrome',
      },
      testMatch: /mobile-.*\.spec\.ts/,
    },
  ],
});
