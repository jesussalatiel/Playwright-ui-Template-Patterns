import {
  click,
  expectElementToBeEnabled,
  expectElementToHaveClass,
  getLocator,
  isElementVisible,
  pressPageKeyboard,
  waitForElementToBeVisible,
} from '@ihf-rivendell/qa';
import { Fees, Simulations } from '@pages/onboarding/locators/simulations-locators';
import { UtilsClass } from '@pages/utils/utils-class';

export class SimulatorComponentPage {
  async selectPaymentDayAndFee(paymentDay: number, fee: Fees) {
    await this.selectPaymentDay(paymentDay);
    await this.selectDue(fee);
  }

  async selectOtherDate(paymentDay: number) {
    await isElementVisible(Simulations.Text.priceRegexLocator(), { timeout: 15000 });
    await waitForElementToBeVisible(Simulations.Text.otherDate());
    await click(Simulations.Text.otherDate());

    await this.selectDropdown(paymentDay);
    await new UtilsClass().accept();

    await isElementVisible(Simulations.Button.paymentDay(paymentDay));
    await isElementVisible(Simulations.Text.priceRegexLocator());
    await expectElementToHaveClass(Simulations.Button.paymentDay(paymentDay), Simulations.Class.activeButton());
  }

  private async selectPaymentDay(paymentDay: number) {
    const buttonDate = Simulations.Button.paymentDay(paymentDay);
    await isElementVisible(Simulations.Text.priceRegexLocator(), { timeout: 15000 });
    await expectElementToBeEnabled(buttonDate);
    await click(buttonDate);
    await isElementVisible(Simulations.Text.priceRegexLocator());
    await expectElementToHaveClass(buttonDate, Simulations.Class.activeButton());
  }

  private async selectDue(fee: Fees) {
    const dueButton = Simulations.Button.due(fee);
    await dueButton.waitFor({ timeout: 15000, state: 'visible' });
    await click(dueButton);
    await expectElementToHaveClass(dueButton, Simulations.Class.activeCard());
  }

  private async selectDropdown(paymentDay: number) {
    const expandedButton = getLocator('button[role="combobox"]');
    await expandedButton.waitFor({ state: 'visible' });
    await expandedButton.click();

    const selectElement = getLocator('select');
    await selectElement.waitFor({ state: 'visible' });
    await selectElement.selectOption(String(paymentDay));
    await pressPageKeyboard('Enter');
  }
}
