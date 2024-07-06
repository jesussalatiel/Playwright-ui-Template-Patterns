import { click, waitForElementToBeVisible } from '@ihf-rivendell/qa';
import { DashboardShortcuts, PaymentsShortcuts } from '@pages/onboarding/locators/payments-locators';
import { Locators } from '@pages/onboarding/locators/products-component-locators';

export class DashboardComponent {
  async navigateTo(section: DashboardShortcuts, option?: PaymentsShortcuts): Promise<void> {
    switch (section) {
      case DashboardShortcuts.PAYMENTS:
        await this.navigateToOkaCredit();
        await this.subPaymentsSection(option ?? PaymentsShortcuts.DEFAULT);
        break;
      case DashboardShortcuts.CREDIT:
        await waitForElementToBeVisible(Locators.Texts.okaCreditByText());
        await click(Locators.Texts.okaCreditByText());
        break;
      case DashboardShortcuts.DEFAULT:
        await this.subCreditSection(option ?? PaymentsShortcuts.DEFAULT);
        break;
      default:
    }
  }

  private async subCreditSection(option: PaymentsShortcuts) {
    switch (option) {
      case PaymentsShortcuts.HELP:
        await waitForElementToBeVisible(Locators.Buttons.help());
        await click(Locators.Buttons.help());
        break;
      default:
    }
  }

  private async subPaymentsSection(option: PaymentsShortcuts): Promise<void> {
    switch (option) {
      case PaymentsShortcuts.PAYMENTS:
        await waitForElementToBeVisible(Locators.Texts.payments());
        await click(Locators.Texts.payments());
        break;
      case PaymentsShortcuts.SCHEDULED:
        await waitForElementToBeVisible(Locators.Texts.schedule());
        await click(Locators.Texts.schedule());
        break;
      case PaymentsShortcuts.CONTRACTS:
        await waitForElementToBeVisible(Locators.Texts.contracts());
        await click(Locators.Texts.contracts());
        break;
      default:
    }
  }

  private async navigateToOkaCredit(): Promise<void> {
    await waitForElementToBeVisible(Locators.Buttons.okaCredit());
    await click(Locators.Buttons.okaCredit());
  }
}
