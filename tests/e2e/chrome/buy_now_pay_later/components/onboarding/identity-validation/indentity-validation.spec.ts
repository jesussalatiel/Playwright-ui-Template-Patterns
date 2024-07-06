import { CustomerBuilder } from '@builders/CustomerBuilder';
import { ProductBuilder } from '@builders/ProductBuilder';
import { test } from '@fixturesetup';
import { DashboardShortcuts } from '@pages/onboarding/locators/payments-locators';
import { customerTestData } from '@testdata/micro-services/customers/customer-test-data';
import { leadTestData } from '@testdata/micro-services/leads/lead-test-data';
import { Fees } from '@pages/onboarding/locators/simulations-locators';
import { ProductType, TypeOfProduct } from '../../../../../../../test-setup/micro-services/leads/builder/leads-builder';
import { LoanStatus } from '../../../../../../../test-setup/micro-services/loans/loans-helper';

const setupCustomer = async () => {
  await new CustomerBuilder(customerTestData)
    .withPassword()
    .withAddress()
    .withBasicInfo()
    .withEmployment()
    .withDocumentKeyValidated()
    .withTermsAndConditions()
    .build();

  await new ProductBuilder(leadTestData)
    .withSale()
    .withTypeOfProduct(ProductType.BNPL)
    .withType(TypeOfProduct.NEW)
    .withStatus(LoanStatus.REQUESTED)
    .build();
};

test.describe('Identity Validation @HappyPath', () => {
  test.beforeEach(async () => {
    await setupCustomer();
  });

  test('should display identity validation @HappyPath', async ({
    login,
    home,
    simulation,
    niubiz,
    identity,
    utils,
  }) => {
    const { mobile, password } = customerTestData;
    await login.with().credentials(mobile as string, password as string);
    await home.viewBuyNowPayLaterDashboard().navigateTo(DashboardShortcuts.CREDIT);
    await simulation.selectPaymentDayAndFee(25, Fees.Quotes_12);
    await utils.clickOnContinue();
    await niubiz.acceptTermsAndConditions();
    await niubiz.clickOnOmit();
    await utils.clickOnContinue();
    await identity.takePhoto(true, true);
    await utils.clickOnContinue();
  });
});
