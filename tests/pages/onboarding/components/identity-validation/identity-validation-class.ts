import { click } from '@ihf-rivendell/qa';
import {
  savePhotoActionByRole,
  takePhotoActionByRole,
  takePhotoOneByText,
  takePhotoTwoByText,
} from '@pages/onboarding/locators/identity-validations-locators';

export class IdentityValidationClass {
  async takePhoto(takeOne: boolean, takeTwo: boolean, check?: { template: boolean }) {
    if (takeOne) {
      await click(takePhotoOneByText());
      await click(takePhotoActionByRole());
      await click(savePhotoActionByRole());
    }

    if (takeTwo) {
      await click(takePhotoTwoByText());
      await click(takePhotoActionByRole());
      await click(savePhotoActionByRole());
    }

    if (check?.template) {
      await this.checkTemplate();
    }
  }

  private async checkTemplate() {
    return null;
  }
}
