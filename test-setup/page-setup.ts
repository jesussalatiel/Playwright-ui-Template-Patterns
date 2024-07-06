import { test as baseTest, expect } from '@playwright/test';
import { customerTestData } from '@testdata/micro-services/customers/customer-test-data';
import { testSetup } from '@testsetup';
import { setPage } from '@ihf-rivendell/qa';

export const test = baseTest.extend<{ testHook: void }>({
  testHook: [
    async ({ page }, use) => {
      setPage(page);
      await testSetup.setup();
      await use();
      await testSetup.tearDown(customerTestData);
    },
    { auto: true },
  ],
});

export { expect };
