import { CustomerBuilder } from '@builders/CustomerBuilder';
import { ProductBuilder } from '@builders/ProductBuilder';
import { test } from '@fixturesetup';
import { customerTestData } from '@testdata/micro-services/customers/customer-test-data';
import { leadTestData } from '@testdata/micro-services/leads/lead-test-data';
import { wait } from '@ihf-rivendell/qa';
import { LoginPageClass } from '@pages/login/login-page-class';
import { UtilsClass } from '@pages/utils/utils-class';
import { HomePageClass } from '@pages/onboarding/components/home/home-page-class';
import { DashboardShortcuts } from '@pages/onboarding/locators/payments-locators';
import { Fees } from '@pages/onboarding/locators/simulations-locators';
import { LoanStatus, loansHelper } from '../../../../../../test-setup/micro-services/loans/loans-helper';
import { CustomerStatus } from '../../../../../../test-setup/micro-services/customers/customers-helper';

const setupCustomerAndLead = async () => {
  await new CustomerBuilder(customerTestData)
    .withPassword()
    .withAddress()
    .withBasicInfo()
    .withEmployment()
    .withDocumentKeyValidated()
    .withTermsAndConditions()
    .build();

  await new ProductBuilder(leadTestData).withSale().build();
};

const loginAndCheckStatus = async (
  login: LoginPageClass,
  utils: UtilsClass,
  mobile: string,
  password: string,
  documentType: string,
  documentNumber: string,
) => {
  await login.with().credentials(mobile, password);
  await utils.checkStatusPage(documentType, documentNumber, CustomerStatus.ONBOARDING, LoanStatus.REQUESTED);
};

const navigateAndCheckProduct = async (home: HomePageClass) => {
  await home.viewBuyNowPayLaterDashboard().navigateTo(DashboardShortcuts.CREDIT);
};

const navigateAndCheckStatus = async (
  utilsPage: any,
  documentType: string,
  documentNumber: string,
  customerStatus: CustomerStatus = CustomerStatus.ONBOARDING,
  loanStatus: LoanStatus = LoanStatus.REQUESTED,
) => {
  await utilsPage.checkStatusPage(documentType, documentNumber, customerStatus, loanStatus);
};

const interactWithNiubiz = async (niubizPage: any, utilsPage: any) => {
  await niubizPage.acceptTermsAndConditions();
  await niubizPage.clickOnOmit();
  await utilsPage.clickOnContinue();
};

test.describe('Credit confirmation @HappyPath', () => {
  test.beforeEach(async () => {
    await setupCustomerAndLead();
  });

  test('should display credit confirmation', async ({ login, home, simulation, niubiz, identity, utils, contract }) => {
    const { mobile, password, identityDocument } = customerTestData;
    const { type: documentType, number: documentNumber } = identityDocument!;

    await loginAndCheckStatus(login, utils, mobile as string, password as string, documentType!, documentNumber!);
    await navigateAndCheckProduct(home);
    await simulation.selectPaymentDayAndFee(25, Fees.Quotes_06);
    await utils.clickOnContinue();
    await navigateAndCheckStatus(utils, documentType!, documentNumber!);
    await interactWithNiubiz(niubiz, utils);
    await identity.takePhoto(true, true);
    await utils.clickOnContinue();
    await navigateAndCheckStatus(utils, documentType!, documentNumber!);
    await contract.creditConfirmation();
    await contract.clickOnContract();
    await wait(5000);
    await navigateAndCheckStatus(utils, documentType!, documentNumber!, CustomerStatus.ENABLED, LoanStatus.APPROVED);
    await loansHelper.disbursement(documentType!, documentNumber!);
    await wait(5000);
    await navigateAndCheckStatus(utils, documentType!, documentNumber!, CustomerStatus.ENABLED, LoanStatus.ACTIVE);
    await contract.clickOnHomeButton();
  });
});
