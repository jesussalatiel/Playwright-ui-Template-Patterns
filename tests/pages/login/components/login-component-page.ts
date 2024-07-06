import {
  click,
  clickAndNavigate,
  expectElementToBeEditable,
  expectElementToBeEnabled,
  fill,
  waitForPageLoadState,
} from '@ihf-rivendell/qa';
import {
  changePasswordInputByText,
  confirmPasswordInputById,
  newPasswordInputById,
  passwordInputById,
  submitButtonByText,
  userNameInputById,
} from '@pages/login/locators/login-page-locators';
import { notificationsHelper } from '@micro-services';
import { navigation } from '@pages/utils/navigations';
import { Page } from '@pages/utils/pages';

export class LoginComponentPage {
  public async mobile(mobile: string) {
    await waitForPageLoadState();
    await expectElementToBeEditable(userNameInputById);
    await fill(userNameInputById, mobile);
  }

  public async password(password: string) {
    await waitForPageLoadState();
    await expectElementToBeEditable(passwordInputById);
    await fill(passwordInputById, password);
  }

  async credentials(mobile: string, password: string, submit: boolean = true): Promise<void> {
    await this.mobile(mobile);
    await this.password(password);

    if (submit) {
      await this.clickOnSubmit();
    }

    await navigation.To().Page(Page.PRODUCTS);
  }

  public async receivedPasswordCode(mobile: string): Promise<void> {
    const verificationCode = await notificationsHelper.getCodeNotification(`+51${mobile}`);
    await expectElementToBeEditable(passwordInputById);
    await fill(passwordInputById, verificationCode as string);
  }

  public async changePassword(password: string, newPassword: string, changePassword: boolean = true): Promise<void> {
    await waitForPageLoadState();
    await this.fillPasswordFields(password, newPassword);

    if (changePassword) {
      await this.clickOnChangePassword();
      await expectElementToBeEditable(userNameInputById);
    }
  }

  private async fillPasswordFields(password: string, newPassword: string): Promise<void> {
    await expectElementToBeEditable(newPasswordInputById);
    await fill(newPasswordInputById, password);
    await fill(confirmPasswordInputById, newPassword);
  }

  private async clickOnSubmit(): Promise<void> {
    await expectElementToBeEnabled(submitButtonByText());
    await clickAndNavigate(submitButtonByText());
  }

  private async clickOnChangePassword(): Promise<void> {
    await click(changePasswordInputByText());
  }
}
