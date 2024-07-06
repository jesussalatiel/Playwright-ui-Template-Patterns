import { wait } from '@ihf-rivendell/qa';
import { loansHelper } from '@micro-services';
import { LoginPageClass } from '@pages/login/login-page-class';
import { AboutYouPageClass } from '@pages/onboarding/components/about-you/about-you-page-class';
import { ContractComponentPage } from '@pages/onboarding/components/contracts/components/contract-tems-components';
import { HomePageClass } from '@pages/onboarding/components/home/home-page-class';
import { IdentityValidationClass } from '@pages/onboarding/components/identity-validation/identity-validation-class';
import { SimulationPageClass } from '@pages/onboarding/components/simulations/components/simulations-page-class';
import { DashboardShortcuts } from '@pages/onboarding/locators/payments-locators';
import { Fees } from '@pages/onboarding/locators/simulations-locators';
import { UtilsClass } from '@pages/utils/utils-class';
import { IAddressTestData } from '@testdata/e2e/bnpl/personal-data/address-test-data';
import { IEmployeeTestData } from '@testdata/e2e/bnpl/personal-data/employee-test-data';
import { IPersonalTestData } from '@testdata/e2e/bnpl/personal-data/personal-test-data';
import { customerTestData } from '@testdata/micro-services/customers/customer-test-data';
import { CustomerStatus } from 'test-setup/micro-services/customers/customers-helper';
import { LoanStatus } from 'test-setup/micro-services/loans/loans-helper';

export const loginAndNavigateToNewHome = async (
  login: LoginPageClass,
  home: HomePageClass,
  simulation: SimulationPageClass,
  utils: UtilsClass,
) => {
  const { name, mobile, password } = customerTestData;
  await login.with().credentials(mobile as string, password as string);
  await home.modal().welcome({
    name: name as string,
    acceptTermsAndConditions: true,
    showTermsAndConditions: false,
    clickOnExit: false,
  });
  await home.viewBuyNowPayLaterDashboard().navigateTo(DashboardShortcuts.CREDIT);
  await simulation.selectPaymentDayAndFee(25, Fees.Quotes_12);
  await simulation.selectOtherDate(17);
  await utils.clickOnContinue();
};

export const fillEmployedDataTest = async (page: AboutYouPageClass, customer: IEmployeeTestData) => {
  await page.form().employment({
    ActivityEmploy: customer.activity,
    Sector: customer.sector,
    EmployeeName: customer.company,
    IncomeRange: customer.income,
    clickOnSave: true,
  });
};

export const fillPersonalData = async (about: AboutYouPageClass, personal: IPersonalTestData, save: boolean = true) => {
  await about.form().personal({
    name: personal.name,
    lastName: personal.lastName,
    motherLastName: personal.motherLastName,
    middleName: personal.middleName,
    birthdate: personal.birthdate,
    email: personal.email,
    sex: personal.sex,
    civilStatus: personal.civil,
    additionalInfo: personal.additionalInfo,
    clickOnSave: save,
  });
};

export const fillAddressData = async (about: AboutYouPageClass, address: IAddressTestData, save: boolean = true) => {
  await about.form().address({
    Department: address.departement,
    Province: address.province,
    District: address.district,
    Avenue: address.addressName,
    TypeAvenue: address.avenue,
    AvenueNumber: address.addressNumber,
    Apartment: address.apartment,
    Urbanization: address.urbanization,
    clickOnSave: save,
  });
};

const { type: documentType, number: documentNumber } = customerTestData.identityDocument!;

export const performPostPersonalDataActions = async (
  aboutPage: AboutYouPageClass,
  utilsPage: UtilsClass,
  identityPage: IdentityValidationClass,
  contractPage: ContractComponentPage,
) => {
  await aboutPage.form().niubiz();
  await utilsPage.clickOnContinue();
  await utilsPage.checkStatusPage(documentType, documentNumber, CustomerStatus.ONBOARDING, LoanStatus.REQUESTED);
  await identityPage.takePhoto(true, true);
  await utilsPage.clickOnContinue();
  await utilsPage.checkStatusPage(documentType, documentNumber, CustomerStatus.ONBOARDING, LoanStatus.REQUESTED);
  await contractPage.creditConfirmation();
  await contractPage.clickOnContract();
  await wait(5000);
};

export const creditActivation = async (utilsPage: UtilsClass, contractPage: ContractComponentPage) => {
  await utilsPage.checkStatusPage(documentType, documentNumber, CustomerStatus.ENABLED, LoanStatus.APPROVED);
  await loansHelper.disbursement(documentType, documentNumber);
  await utilsPage.checkStatusPage(documentType, documentNumber, CustomerStatus.ENABLED, LoanStatus.ACTIVE);
  await contractPage.clickOnHomeButton();
};
