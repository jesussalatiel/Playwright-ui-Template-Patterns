import { CustomerBuilder } from '@builders/CustomerBuilder';
import { ProductBuilder } from '@builders/ProductBuilder';
import { test } from '@fixturesetup';
import { getLocatorByText } from '@ihf-rivendell/qa';
import {
  AvenueType,
  CivilStatusOptions,
  DepartmentType,
  DistrictType,
  Validations,
} from '@pages/onboarding/locators/about-you-locators';
import { customerTestData } from '@testdata/micro-services/customers/customer-test-data';
import { leadTestData } from '@testdata/micro-services/leads/lead-test-data';
import { AddressTestDataBuilder } from '@testdata/e2e/bnpl/personal-data/address-test-data';
import { PersonaTestDataBuilder } from '@testdata/e2e/bnpl/personal-data/personal-test-data';
import { fillAddressData, fillPersonalData, loginAndNavigateToNewHome } from '../../../common/commons-steps';

test.describe('Oka tests home data @HappyPath @refactor @performance @create', () => {
  test.beforeEach(async () => {
    await new CustomerBuilder(customerTestData).withPassword().build();
    await new ProductBuilder(leadTestData).withSale().build();
  });

  test('should successfully fill Home information', async ({ login, home, simulation, about, utils }) => {
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
      .build();

    await fillAddressData(about, address);
  });

  test('should successfully fill Home information and complete the optional data @component', async ({
    login,
    home,
    simulation,
    about,
    utils,
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
      .withApartment('123')
      .withUrbanization('Los cipreses')
      .build();

    await fillAddressData(about, address);
  });

  test('Should validate the Avenue field @unhappy', async ({ login, home, simulation, about, utils }) => {
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
      .withAddressName('')
      .withAdressNumber('')
      .build();

    await fillAddressData(about, address, false);
    await about.assert().validationsForm(Validations.AvenueValidation);
  });

  test('Should validate the Avenue Number field @unhappy', async ({ login, home, simulation, about, utils }) => {
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
      .withAdressNumber('')
      .build();

    await fillAddressData(about, address, false);
    await about.assert().validationsForm(Validations.AvenueNumberValidation);
  });

  test('Should validate Invalid Characters in Avenue field @unhappy', async ({
    login,
    home,
    simulation,
    about,
    utils,
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
      .withAddressName('# SAN FRANCISCO.')
      .withAdressNumber('123')
      .build();

    await fillAddressData(about, address);
    await getLocatorByText('Error al guardar los datos domiciliarios', { exact: true });
  });

  test('Should validate Invalid Characters in Avenue Number field @unhappy', async ({
    login,
    home,
    simulation,
    about,
    utils,
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
      .withAddressName('Daniel Hipolito')
      .withAdressNumber('#..$%&/')
      .build();

    await fillAddressData(about, address);
    await about.assert().validationsForm(Validations.InvalidCharacters);
  });
});
