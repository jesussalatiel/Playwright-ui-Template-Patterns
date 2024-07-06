import { click, getLocatorByText, waitForPageLoadState } from '@ihf-rivendell/qa';
import { AddPaymentCardComponent } from '@pages/onboarding/components/niubiz/components/add-paymentCard-component';
import { Mixin } from 'ts-mixer';

export class NiubizPageClass extends Mixin(AddPaymentCardComponent) {
  async acceptTermsAndConditions() {
    await waitForPageLoadState();
    await click('#term');
  }

  async clickOnOmit() {
    await waitForPageLoadState();
    await click(getLocatorByText('Omitir'));
  }
}
