import { click } from '@ihf-rivendell/qa';
import { closeButtonByLocator } from '@pages/utils/locators/utils-page-locators';

export class ModalComponentClass {
  async howToPayModal(options: {
    clickOnExit: boolean;
    clickOnOmit: boolean;
    clickOnShow: boolean;
    template: boolean;
  }) {
    if (options.clickOnExit) {
      await click(closeButtonByLocator());
    }
  }
}
