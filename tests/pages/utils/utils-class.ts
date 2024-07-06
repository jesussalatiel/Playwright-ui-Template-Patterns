import { click, clickAndNavigate, expectElementToBeEnabled } from '@ihf-rivendell/qa';
import { customerHelper, loansHelper } from '@micro-services';
import { submitButtonByText } from '@pages/login/locators/login-page-locators';
import { acceptButtonByText, continueButtonByText } from '@pages/utils/locators/utils-page-locators';
import { expect } from '@playwright/test';

export class UtilsClass {
  async clickOnContinue() {
    await expectElementToBeEnabled(continueButtonByText(), { timeout: 15000 });
    await click(continueButtonByText());
  }

  async submit() {
    await clickAndNavigate(submitButtonByText());
  }

  async checkStatusPage(documentType: string, documentNumber: string, customerStatus: string, loanStatus: string) {
    const { body: customers } = await customerHelper.searchByIdentityDocument(documentType, documentNumber);
    expect(customers.status, JSON.stringify(customers, null, 2)).toBe(customerStatus);
    const { body: loans } = await loansHelper.search(documentType, documentNumber);
    const item = loans.find((items: any) => items.status === loanStatus);
    expect(item.status, JSON.stringify(loans, null, 2)).toBe(loanStatus);
  }

  async accept() {
    await expectElementToBeEnabled(acceptButtonByText());
    await click(acceptButtonByText());
  }
}
