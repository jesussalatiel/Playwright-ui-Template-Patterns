import { CustomerBuilder } from '@builders/CustomerBuilder';
import { ProductBuilder } from '@builders/ProductBuilder';
import { test } from '@fixturesetup';
import { ActivityRole, IncomeRange, SectorRole } from '@pages/onboarding/locators/about-you-locators';
import { DashboardShortcuts } from '@pages/onboarding/locators/payments-locators';
import { customerTestData } from '@testdata/micro-services/customers/customer-test-data';
import { leadTestData } from '@testdata/micro-services/leads/lead-test-data';
import { EmployeeTestDataBuilder } from '@testdata/e2e/bnpl/personal-data/employee-test-data';
import { fillEmployedDataTest } from '../../../common/commons-steps';

test.describe('Employee Data @HappyPath @create', () => {
  test.beforeEach(async () => {
    await new CustomerBuilder(customerTestData)
      .withPassword()
      .withAddress()
      .withBasicInfo()
      .withTermsAndConditions()
      .build();

    await new ProductBuilder(leadTestData).withSale().build();
  });

  test('should display employee data Student', async ({ login, home, utils, about }) => {
    const { mobile, password } = customerTestData;
    await login.with().credentials(mobile as string, password as string);
    await home.viewBuyNowPayLaterDashboard().navigateTo(DashboardShortcuts.CREDIT);
    await utils.clickOnContinue();

    const employee = new EmployeeTestDataBuilder()
      .withActivityRole(ActivityRole.STUDENT)
      .withIncome(IncomeRange.NoIncome)
      .build();

    await fillEmployedDataTest(about, employee);
  });

  test('Should display employee data Dependent', async ({ login, home, utils, about }) => {
    const { mobile, password } = customerTestData;
    await login.with().credentials(mobile as string, password as string);
    await home.viewBuyNowPayLaterDashboard().navigateTo(DashboardShortcuts.CREDIT);
    await utils.clickOnContinue();

    const employee = new EmployeeTestDataBuilder()
      .withActivityRole(ActivityRole.DEPENDENT)
      .withIncome(IncomeRange.Range_4)
      .withSector(SectorRole.Health)
      .withCompanyName()
      .build();

    await fillEmployedDataTest(about, employee);
  });

  test('Should display employee data natural person business', async ({ login, home, utils, about }) => {
    const { mobile, password } = customerTestData;
    await login.with().credentials(mobile as string, password as string);
    await home.viewBuyNowPayLaterDashboard().navigateTo(DashboardShortcuts.CREDIT);
    await utils.clickOnContinue();

    const employee = new EmployeeTestDataBuilder()
      .withActivityRole(ActivityRole.NATURAL_PERSON_BUSINESS)
      .withIncome(IncomeRange.Range_2)
      .withSector(SectorRole.Mining)
      .withCompanyName()
      .build();

    await fillEmployedDataTest(about, employee);
  });

  test('Should display employee data Independent @component', async ({ login, home, utils, about }) => {
    const { mobile, password } = customerTestData;
    await login.with().credentials(mobile as string, password as string);
    await home.viewBuyNowPayLaterDashboard().navigateTo(DashboardShortcuts.CREDIT);
    await utils.clickOnContinue();

    const employee = new EmployeeTestDataBuilder()
      .withActivityRole(ActivityRole.INDEPENDENT)
      .withIncome(IncomeRange.Range_6)
      .withSector(SectorRole.Manufacture)
      .withCompanyName()
      .build();

    await fillEmployedDataTest(about, employee);
  });

  test('should display employee data Unemployed @component', async ({ login, home, utils, about }) => {
    const { mobile, password } = customerTestData;
    await login.with().credentials(mobile as string, password as string);
    await home.viewBuyNowPayLaterDashboard().navigateTo(DashboardShortcuts.CREDIT);
    await utils.clickOnContinue();

    const employee = new EmployeeTestDataBuilder()
      .withActivityRole(ActivityRole.UNEMPLOYED)
      .withIncome(IncomeRange.Range_1)
      .build();

    await fillEmployedDataTest(about, employee);
  });

  test('should display employee data Household @component', async ({ login, home, utils, about }) => {
    const { mobile, password } = customerTestData;
    await login.with().credentials(mobile as string, password as string);
    await home.viewBuyNowPayLaterDashboard().navigateTo(DashboardShortcuts.CREDIT);
    await utils.clickOnContinue();

    const employee = new EmployeeTestDataBuilder()
      .withActivityRole(ActivityRole.HOUSEHOLD)
      .withIncome(IncomeRange.Range_1)
      .build();

    await fillEmployedDataTest(about, employee);
  });
});
