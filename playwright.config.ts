import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import { ACTION_TIMEOUT, EXPECT_TIMEOUT, NAVIGATION_TIMEOUT, TEST_TIMEOUT } from '@ihf-rivendell/qa';

dotenv.config({ path: '.env' });

const BASE_URL = process.env.URL || 'https://personas.dev.oka.com.pe/';
const customLoggerPath = './test-setup/reporters/custom-logger.ts';

export default defineConfig({
  testDir: './tests',
  snapshotPathTemplate: '{testDir}/__visual_testing__/{testFilePath}/{arg}{ext}',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 3 : 6,
  reporter: [[customLoggerPath], ['html', { open: 'never' }], ['dot']],
  timeout: TEST_TIMEOUT,
  expect: {
    timeout: EXPECT_TIMEOUT,
  },
  use: {
    headless: true,
    extraHTTPHeaders: {
      'CF-Access-Client-Id': process.env.CF_CLIENT_ID || '',
      'CF-Access-Client-Secret': process.env.CF_CLIENT_SECRET || '',
    },
    ignoreHTTPSErrors: true,
    acceptDownloads: true,
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    actionTimeout: ACTION_TIMEOUT,
    navigationTimeout: NAVIGATION_TIMEOUT,
  },
  projects: [
    {
      name: 'chrome_desktop',
      testDir: 'tests/e2e/chrome',
      use: {
        viewport: null,
        launchOptions: {
          args: [
            '--start-maximized',
            '--disable-web-security',
            '--use-fake-ui-for-media-stream',
            '--use-fake-device-for-media-stream',
          ],
          slowMo: 0,
          headless: true,
        },
      },
    },
    {
      name: 'chrome_tablet',
      testDir: 'tests/e2e/chrome',
      use: {
        ...devices['Galaxy Tab S4'],
        launchOptions: {
          args: ['--disable-web-security', '--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
          headless: true,
        },
      },
    },
    {
      name: 'chrome_mobile',
      testDir: 'tests/e2e/chrome',
      use: {
        ...devices['Pixel 5'],
        launchOptions: {
          args: ['--disable-web-security', '--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
          headless: true,
        },
      },
    },
    {
      name: 'firefox',
      testDir: 'tests/e2e/firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1600, height: 1000 },
        launchOptions: {
          firefoxUserPrefs: {
            'browser.cache.disk.enable': false,
            'browser.cache.memory.enable': false,
          },
          headless: true,
        },
      },
    },
  ],
});
