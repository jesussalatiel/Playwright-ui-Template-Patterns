import { CustomerBuilder } from '@builders/CustomerBuilder';
import { ProductBuilder } from '@builders/ProductBuilder';
import { test } from '@fixturesetup';
import { DashboardShortcuts } from '@pages/onboarding/locators/payments-locators';
import { Fees } from '@pages/onboarding/locators/simulations-locators';
import { customerTestData } from '@testdata/micro-services/customers/customer-test-data';
import { leadTestData } from '@testdata/micro-services/leads/lead-test-data';
import { ProductType, TypeOfProduct } from '../../../../../../../test-setup/micro-services/leads/builder/leads-builder';
import { LoanStatus } from '../../../../../../../test-setup/micro-services/loans/loans-helper';

const setupCustomer = async () => {
  await new CustomerBuilder(customerTestData).withPassword().withTermsAndConditions().build();
  await new ProductBuilder(leadTestData)
    .withSale()
    .withTypeOfProduct(ProductType.BNPL)
    .withType(TypeOfProduct.NEW)
    .withStatus(LoanStatus.REQUESTED)
    .build();
};

test.describe('Simulation Validations @HappyPath', () => {
  test.beforeEach(async () => {
    await setupCustomer();
  });

  test('Validates changing payment day and due date options @HappyPath', async ({ login, home, simulation }) => {
    const { mobile, password } = customerTestData;
    await login.with().credentials(mobile as string, password as string);
    await home.viewBuyNowPayLaterDashboard().navigateTo(DashboardShortcuts.CREDIT);
    await simulation.selectPaymentDayAndFee(25, Fees.Quotes_12);
    await simulation.selectOtherDate(8);
  });

  test('Validates changing payment day @component', async ({ login, home, simulation }) => {
    const { mobile, password } = customerTestData;
    await login.with().credentials(mobile as string, password as string);
    await home.viewBuyNowPayLaterDashboard().navigateTo(DashboardShortcuts.CREDIT);
    await simulation.selectPaymentDayAndFee(15, Fees.Quotes_24);
  });

  test('Validates changing due date options day @component', async ({ login, home, simulation }) => {
    const { mobile, password } = customerTestData;
    await login.with().credentials(mobile as string, password as string);
    await home.viewBuyNowPayLaterDashboard().navigateTo(DashboardShortcuts.CREDIT);
    await simulation.selectOtherDate(24);
  });
});
