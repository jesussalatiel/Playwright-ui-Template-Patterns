// eslint-disable-next-line max-classes-per-file
import { click, expectElementToBeEnabled, waitForElementToBeVisible } from '@ihf-rivendell/qa';
import { NiubizLocators } from '@pages/onboarding/locators/niubiz-locators';

export enum CardsActionType {
  ADD_NEW_CARD = 'ADD_NEW_CARD',
}

export class AddCardComponent {
  async addNewCardPayment(action: CardsActionType, pay: boolean): Promise<void> {
    switch (action) {
      case CardsActionType.ADD_NEW_CARD:
        await waitForElementToBeVisible(NiubizLocators.Buttons.paymentTermsAccepted());
        await click(NiubizLocators.Buttons.paymentTermsAccepted());
        await waitForElementToBeVisible(NiubizLocators.Buttons.addCreditCard());
        await click(NiubizLocators.Buttons.addCreditCard());
        break;
      default:
        throw new Error('Unsupported action');
    }

    await click(pay ? NiubizLocators.Buttons.checkOnTrue() : NiubizLocators.Buttons.checkOnFalse());

    await expectElementToBeEnabled(NiubizLocators.Buttons.clickOnPay(), { timeout: 60000 });
    await click(NiubizLocators.Buttons.clickOnPay());
  }
}

export class AddPaymentCardComponent {
  paymentActions() {
    return new AddCardComponent();
  }
}
