import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  retries: process.env['CI'] ? 2 : 1,
  reporter: 'html',
  use: {
    baseURL: 'https://example.com',
    headless: true,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'], screenshot: 'only-on-failure', video: 'retain-on-failure' },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'], screenshot: 'only-on-failure', video: 'retain-on-failure'    },
    },
    {
      name: 'WebKit',
      use: { ...devices['Desktop Safari'], screenshot: 'only-on-failure', video: 'retain-on-failure' },
    },
  ],
});
