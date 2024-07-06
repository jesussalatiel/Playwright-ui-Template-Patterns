import {
  ComparisonBy,
  expectedToMatchSnapshot,
  getLocatorByText,
  isElementVisible,
  waitForElementToBeVisible,
} from '@ihf-rivendell/qa';
import { expect } from '@playwright/test';

export class AssertClass {
  async verifyIncompatibleBrowser(message: string): Promise<void> {
    await isElementVisible(getLocatorByText(message, { exact: true }));
  }

  async validationsForm(validationMessage: any): Promise<void> {
    await waitForElementToBeVisible(getLocatorByText(validationMessage));
  }

  async toMatchSnapshot(comparison: ComparisonBy, locator?: string): Promise<void> {
    await expectedToMatchSnapshot(comparison, locator);
  }

  toBeText(text: any, expected: string): void {
    expect(text ?? undefined, `Error message not found: ${expected}`).toBe(expected);
  }
}
