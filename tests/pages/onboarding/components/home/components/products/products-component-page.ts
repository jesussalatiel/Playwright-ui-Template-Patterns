import { click, expectElementToBeVisible, getLocator, waitForPageLoadState } from '@ihf-rivendell/qa';
import {
  ELEMENTS_TO_CHECK_AFTER_WITHOUT_PRODUCT,
  ELEMENTS_TO_CHECK_BEFORE_WITHOUT_PRODUCT,
  Locators,
} from '@pages/onboarding/locators/products-component-locators';

export class ProductsComponentPage {
  /**
   * Checks visibility of the dashboards heading and optionally clicks OKA credit button and checks template.
   * @param {boolean} clickOnOkaCredit - Whether to click on OKA credit button.
   * @param {Object} [check] - Optional parameter to check template.
   * @param {boolean} [check.template] - Whether to check template.
   * @returns {Promise<void>}
   */
  async checkProductSectionWithProducts(clickOnOkaCredit: boolean, check?: { template: boolean }): Promise<void> {
    await expectElementToBeVisible(Locators.Texts.products());

    if (clickOnOkaCredit) {
      await click(Locators.Texts.okaCreditByText());
    }

    if (check?.template) {
      await this.checkTemplateWithProduct();
    }
  }

  /**
   * Checks visibility of the product section without dashboards and optionally clicks credit OKA and checks template.
   * @param {boolean} clickOnCreditOka - Whether to click on credit OKA.
   * @param {Object} check - Parameter to check template and amount.
   * @param {string} check.amount - Amount to be checked.
   * @param {boolean} check.template - Whether to check template.
   * @returns {Promise<void>}
   */
  async checkProductSectionWithoutProducts(
    clickOnCreditOka: boolean,
    check: { amount: string; template: boolean },
  ): Promise<void> {
    await this.checkAmount(check.amount);

    if (clickOnCreditOka) {
      await click(Locators.Texts.haveOkaCredit());
    }

    if (check.template) {
      await this.checkTemplateWithoutProduct(check.amount);
    }
  }

  /**
   * Performs help shortcut actions based on the provided options.
   * @param {Object} options - Configuration options for performing help shortcut actions.
   * @param {boolean} [options.clickOnHelp] - Whether to click on help button.
   * @param {boolean} [options.assertText] - Whether to assert text.
   * @param {boolean} [options.clickOnGetIt] - Whether to click on get it button.
   * @param {boolean} [options.clickOnClose] - Whether to click on close button.
   * @param {boolean} [options.clickOutside] - Whether to click outside.
   * @returns {Promise<void>}
   */
  async performHelpShortcut(options: {
    clickOnHelp?: boolean;
    assertText?: boolean;
    clickOnGetIt?: boolean;
    clickOnClose?: boolean;
    clickOutside?: boolean;
  }): Promise<void> {
    await this.waitForHelpShortcutElements();

    if (options.clickOnHelp) {
      await click(Locators.Buttons.help());
    }

    if (options.assertText) {
      await this.assertHelpText();
    }

    if (options.clickOnClose) {
      await this.clickCloseButton();
    }
  }

  /**
   * Checks the template with product.
   * Verifies the visibility of elements in the template when a product is present.
   * @returns {Promise<void>}
   */
  private async checkTemplateWithProduct(): Promise<void> {
    const elementsToCheck = ['Mis productos', 'Continúa tu solicitud de Crédito Oka'];
    await this.checkElementsVisibility(elementsToCheck);
  }

  /**
   * Checks the template without product.
   * @param {string} amount - The amount to check in the template.
   * @returns {Promise<void>}
   */
  private async checkTemplateWithoutProduct(amount: string): Promise<void> {
    const elementsToCheck = [
      ...ELEMENTS_TO_CHECK_BEFORE_WITHOUT_PRODUCT,
      amount,
      ...ELEMENTS_TO_CHECK_AFTER_WITHOUT_PRODUCT,
    ];
    await this.checkElementsVisibility(elementsToCheck);
  }

  /**
   * Checks the visibility of elements.
   * @param {string[]} elementsToCheck - List of elements to check.
   * @returns {Promise<void>}
   */
  private async checkElementsVisibility(elementsToCheck: string[]): Promise<void> {
    const visibilityPromises = elementsToCheck.map(text => expectElementToBeVisible(Locators.Texts.templateText(text)));
    await Promise.all(visibilityPromises);
  }

  /**
   * Checks the amount in the template.
   * @param {string} amount - The amount to check in the template.
   * @returns {Promise<void>}
   */
  private async checkAmount(amount: string): Promise<void> {
    if (amount) {
      await expectElementToBeVisible(Locators.Texts.templateText(amount));
    }
  }

  /**
   * Navigates to Buy Now Pay Later payments section.
   * @returns {Promise<void>}
   */

  /**
   * Waits for help shortcut elements to be visible.
   * @returns {Promise<void>}
   */
  private async waitForHelpShortcutElements(): Promise<void> {
    await Promise.all([
      waitForPageLoadState(),
      expectElementToBeVisible(Locators.Headings.shortcuts()),
      expectElementToBeVisible(Locators.Buttons.help()),
    ]);
  }

  /**
   * Asserts help text elements are visible.
   * @returns {Promise<void>}
   */
  private async assertHelpText(): Promise<void> {
    await Promise.all([
      expectElementToBeVisible(Locators.Texts.contactUs()),
      expectElementToBeVisible(Locators.Texts.contactInstructions()),
    ]);
  }

  /**
   * Clicks the close button.
   * @returns {Promise<void>}
   */
  private async clickCloseButton(): Promise<void> {
    await Promise.all([getLocator('button.absolute').click(), expectElementToBeVisible(Locators.Headings.shortcuts())]);
  }
}
