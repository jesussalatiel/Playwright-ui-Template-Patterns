import { click, waitForElementToBeVisible } from '@ihf-rivendell/qa';
import { Installments, PaymentComponents } from '@pages/onboarding/locators/payments-locators';
import { expect } from '@playwright/test';

export class DashboardComponentClass {
  async payByInstallment(options: { installmentsForPay: number; selectAll: boolean; template: boolean }) {
    if (options.installmentsForPay) {
      await this.selectInstallment(options.installmentsForPay);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async payByAmount(): Promise<void> {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async payByPayOff(): Promise<void> {}

  private async selectInstallment(installmentsForPay: Installments): Promise<void> {
    await waitForElementToBeVisible(PaymentComponents.Texts.showMore());
    await click(PaymentComponents.Texts.showMore());

    for (let i = 0; i <= installmentsForPay; i += 1) {
      const checkbox = PaymentComponents.Checkboxes.installment(i);
      // eslint-disable-next-line no-await-in-loop
      const checkboxIsVisible = await checkbox.isVisible();

      if (checkboxIsVisible) {
        // eslint-disable-next-line no-await-in-loop
        const isChecked = await checkbox.isChecked();

        if (!isChecked) {
          // eslint-disable-next-line no-await-in-loop
          await checkbox.click();
          expect(checkbox.isChecked()).toBeTruthy();
        }
      }
    }
  }
}
