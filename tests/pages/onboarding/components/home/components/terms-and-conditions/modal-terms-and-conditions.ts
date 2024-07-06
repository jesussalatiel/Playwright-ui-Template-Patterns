import { click, expectElementToBeVisible, getLocatorByText, waitForElementToBeVisible } from '@ihf-rivendell/qa';
import { termsAndConditionsButtonByText } from '@pages/onboarding/locators/modal-terms-and-conditions-locators';
import { exitButtonByText, submitButtonByText } from '@pages/utils/locators/utils-page-locators';

export class ModalTermsAndConditions {
  public async welcome(props: {
    name: string;
    acceptTermsAndConditions: boolean;
    clickOnExit: boolean;
    showTermsAndConditions: boolean;
  }): Promise<void> {
    await this.checkName(props.name);

    if (props.acceptTermsAndConditions) {
      await this.clickOnSubmit();
    }

    if (props.clickOnExit) {
      await this.clickOnExit();
    }

    if (props.showTermsAndConditions) {
      await this.clickOnTermsAndConditions();
    }
  }

  private async checkName(name: string): Promise<void> {
    await expectElementToBeVisible(getLocatorByText(`¡Bienvenido ${name}!`, { exact: true }));
  }

  private async clickOnSubmit(): Promise<void> {
    await waitForElementToBeVisible(submitButtonByText());
    await click(submitButtonByText());
  }

  private async clickOnExit(): Promise<void> {
    await waitForElementToBeVisible(exitButtonByText());
    await click(exitButtonByText());
  }

  private async clickOnTermsAndConditions(): Promise<void> {
    await waitForElementToBeVisible(termsAndConditionsButtonByText());
    await click(termsAndConditionsButtonByText());
  }
}
