import {
  click,
  expectElementToBeEnabled,
  waitForPageLoadState,
  waitForElementToBeVisible,
  expectElementToBeVisible,
} from '@ihf-rivendell/qa';
import { Locators } from '@pages/onboarding/locators/products-component-locators';
import {
  titleConfirmationLocatorByText,
  checkNotPepAcceptedByLocator,
  popupInsuranceEndorsementByText,
  understoodButtonByRole,
  checkResponsibleForThePaymentByLocator,
  contractButtonByRole,
  checkContractConditionsByLocator,
  popupPoliticallyExposedPersonByText,
} from '../../../locators/contract-locators';

export class ContractComponentPage {
  async creditConfirmation() {
    await waitForPageLoadState();
    await waitForElementToBeVisible(titleConfirmationLocatorByText(), { timeout: 20000 });

    await expectElementToBeVisible(checkNotPepAcceptedByLocator());
    await click(checkNotPepAcceptedByLocator());

    await click(popupPoliticallyExposedPersonByText());
    await this.clickOnUnderstTo();

    await expectElementToBeVisible(checkNotPepAcceptedByLocator());
    await click(checkResponsibleForThePaymentByLocator());

    await expectElementToBeVisible(checkContractConditionsByLocator());
    await click(checkContractConditionsByLocator());

    await click(popupInsuranceEndorsementByText());
    await this.clickOnUnderstTo();
  }

  async clickOnUnderstTo() {
    await expectElementToBeVisible(understoodButtonByRole());
    await click(understoodButtonByRole());
  }

  async clickOnContract() {
    await expectElementToBeEnabled(contractButtonByRole());
    await click(contractButtonByRole());
  }

  async clickOnHomeButton() {
    await click(Locators.Buttons.home());
  }
}
