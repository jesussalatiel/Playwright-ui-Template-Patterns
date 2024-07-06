import { CustomerBuilder } from '@builders/CustomerBuilder';
import { ProductBuilder } from '@builders/ProductBuilder';
import { test } from '@fixturesetup';
import {
  ActivityRole,
  AvenueType,
  CivilStatusOptions,
  DepartmentType,
  DistrictType,
  IncomeRange,
  SectorRole,
} from '@pages/onboarding/locators/about-you-locators';

import { customerTestData } from '@testdata/micro-services/customers/customer-test-data';
import { leadTestData } from '@testdata/micro-services/leads/lead-test-data';
import { EmployeeTestDataBuilder } from '@testdata/e2e/bnpl/personal-data/employee-test-data';
import { PersonaTestDataBuilder } from '@testdata/e2e/bnpl/personal-data/personal-test-data';
import { AddressTestDataBuilder } from '@testdata/e2e/bnpl/personal-data/address-test-data';
import {
  creditActivation,
  fillAddressData,
  fillEmployedDataTest,
  fillPersonalData,
  loginAndNavigateToNewHome,
  performPostPersonalDataActions,
} from '../../components/common/commons-steps';
import { LoanStatus } from '../../../../../../test-setup/micro-services/loans/loans-helper';

test.describe('Complete flow test BNPL - OKA', () => {
  test.beforeEach(async () => {
    await new CustomerBuilder(customerTestData).withPassword().build();
    await new ProductBuilder(leadTestData).withSale().withStatus(LoanStatus.REQUESTED).build();
  });

  test('should successfully fill user personal data', async ({
    login,
    home,
    simulation,
    about,
    utils,
    contract,
    identity,
  }) => {
    await loginAndNavigateToNewHome(login, home, simulation, utils);

    const personal = new PersonaTestDataBuilder()
      .withCivilStatus(CivilStatusOptions.Single)
      .withEmail()
      .withBirthdate()
      .withSex()
      .build();

    await fillPersonalData(about, personal);

    const address = new AddressTestDataBuilder()
      .withDepartment(DepartmentType.LIMA)
      .withProvince(DepartmentType.LIMA)
      .withDistrict(DistrictType.LIMA)
      .withAvenue(AvenueType.Avenue)
      .withAddressName()
      .withAdressNumber()
      .withApartment('200')
      .build();

    await fillAddressData(about, address);

    const employee = new EmployeeTestDataBuilder()
      .withActivityRole(ActivityRole.STUDENT)
      .withIncome(IncomeRange.NoIncome)
      .build();

    await fillEmployedDataTest(about, employee);

    await performPostPersonalDataActions(about, utils, identity, contract);
  });

  test('Should complete user married independent data and credit activation successfully', async ({
    login,
    home,
    simulation,
    about,
    utils,
    contract,
    identity,
  }) => {
    await loginAndNavigateToNewHome(login, home, simulation, utils);

    const personal = new PersonaTestDataBuilder()
      .withCivilStatus(CivilStatusOptions.Married)
      .withEmail()
      .withBirthdate()
      .withSex()
      .withCohabitantName()
      .withCohabitantMiddleName()
      .withCohabitantLastName()
      .withCohabitantMotherLastName()
      .build();

    await fillPersonalData(about, personal);

    const address = new AddressTestDataBuilder()
      .withDepartment(DepartmentType.LIMA)
      .withProvince(DepartmentType.LIMA)
      .withDistrict(DistrictType.LIMA)
      .withAvenue(AvenueType.Avenue)
      .withAddressName()
      .withAdressNumber()
      .withApartment()
      .withUrbanization()
      .build();

    await fillAddressData(about, address);

    const employee = new EmployeeTestDataBuilder()
      .withActivityRole(ActivityRole.DEPENDENT)
      .withIncome(IncomeRange.Range_1)
      .withSector(SectorRole.PublicAdministration)
      .withCompanyName()
      .build();

    await fillEmployedDataTest(about, employee);
    await performPostPersonalDataActions(about, utils, identity, contract);
    await creditActivation(utils, contract);
  });
});
