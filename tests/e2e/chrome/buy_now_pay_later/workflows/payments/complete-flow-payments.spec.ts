import { ProductBuilder } from '@builders/ProductBuilder';
import { test } from '@fixturesetup';
import { CardsActionType } from '@pages/onboarding/components/niubiz/components/add-paymentCard-component';
import { DashboardShortcuts, Installments, PaymentsShortcuts } from '@pages/onboarding/locators/payments-locators';
import { customerTestData } from '@testdata/micro-services/customers/customer-test-data';
import { leadTestData } from '@testdata/micro-services/leads/lead-test-data';
import { CustomerBuilder } from '@builders/CustomerBuilder';
import { LoanStatus } from '../../../../../../test-setup/micro-services/loans/loans-helper';

const { mobile, password } = customerTestData;

test.describe('Buy Now Pay Later Dashboard Tests', () => {
  const setupPreConditions = async () => {
    await new CustomerBuilder(customerTestData)
      .withPassword()
      .withAddress()
      .withBasicInfo()
      .withEmployment()
      .withDocumentKeyValidated()
      .withTermsAndConditions()
      .build();

    await new ProductBuilder(leadTestData).withSale().withStatus(LoanStatus.ACTIVE).build();
  };

  test.beforeEach('Setup Pre-Conditions', setupPreConditions);

  test('User Should Can Make a Payment', async ({ login, home, payments, niubiz }) => {
    await login.with().credentials(mobile as string, password as string);
    await home.viewBuyNowPayLaterDashboard().navigateTo(DashboardShortcuts.PAYMENTS, PaymentsShortcuts.PAYMENTS);

    await payments.modal().howToPayModal({
      clickOnExit: true,
      clickOnOmit: false,
      clickOnShow: false,
      template: false,
    });

    await payments.dashboard().payByInstallment({
      installmentsForPay: Installments.ONE,
      template: false,
      selectAll: false,
    });

    await niubiz.paymentActions().addNewCardPayment(CardsActionType.ADD_NEW_CARD, false);
  });
});
