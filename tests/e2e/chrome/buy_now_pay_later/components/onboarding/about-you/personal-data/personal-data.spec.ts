import { CustomerBuilder } from '@builders/CustomerBuilder';
import { ProductBuilder } from '@builders/ProductBuilder';
import { test } from '@fixturesetup';
import { CivilStatusOptions, Validations } from '@pages/onboarding/locators/about-you-locators';
import { customerTestData } from '@testdata/micro-services/customers/customer-test-data';
import { leadTestData } from '@testdata/micro-services/leads/lead-test-data';
import { PersonaTestDataBuilder } from '@testdata/e2e/bnpl/personal-data/personal-test-data';
import { fillPersonalData, loginAndNavigateToNewHome } from '../../../common/commons-steps';

test.describe('Oka tests for successful logins @HappyPath @create', () => {
  test.beforeEach(async () => {
    await new CustomerBuilder(customerTestData).withPassword().build();
    await new ProductBuilder(leadTestData).withSale().build();
  });

  test('should successfully fill user personal data single', async ({ login, home, simulation, about, utils }) => {
    await loginAndNavigateToNewHome(login, home, simulation, utils);

    const personal = new PersonaTestDataBuilder()
      .withCivilStatus(CivilStatusOptions.Single)
      .withEmail()
      .withBirthdate()
      .withSex()
      .build();

    await fillPersonalData(about, personal);
  });

  test('should validation email confirmation @unhappy', async ({ login, home, simulation, about, utils }) => {
    await loginAndNavigateToNewHome(login, home, simulation, utils);
    const personal = new PersonaTestDataBuilder()
      .withCivilStatus(CivilStatusOptions.Single)
      .withEmail('fake@globant.com')
      .withBirthdate()
      .withSex()
      .build();

    await fillPersonalData(about, personal, false);
    await about.assert().validationsForm(Validations.EmailConfirmation);
  });

  test('should successfully fill user personal data Widowed', async ({ login, home, simulation, about, utils }) => {
    await loginAndNavigateToNewHome(login, home, simulation, utils);

    const personal = new PersonaTestDataBuilder()
      .withCivilStatus(CivilStatusOptions.Widowed)
      .withEmail()
      .withBirthdate()
      .withSex()
      .build();

    await fillPersonalData(about, personal);
  });

  test('should successfully fill user personal data Divorced', async ({ login, home, simulation, about, utils }) => {
    await loginAndNavigateToNewHome(login, home, simulation, utils);

    const personal = new PersonaTestDataBuilder()
      .withCivilStatus(CivilStatusOptions.Divorced)
      .withEmail()
      .withBirthdate()
      .withSex()
      .build();

    await fillPersonalData(about, personal);
  });

  test('should successfully fill spouse personal data @create', async ({ login, home, simulation, about, utils }) => {
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
  });

  test('should successfully fill cohabitant personal data @create', async ({
    login,
    home,
    simulation,
    about,
    utils,
  }) => {
    await loginAndNavigateToNewHome(login, home, simulation, utils);

    const personal = new PersonaTestDataBuilder()
      .withCivilStatus(CivilStatusOptions.Married)
      .withEmail()
      .withBirthdate()
      .withSex()
      .withCohabitantName()
      .withCohabitantLastName()
      .withCohabitantMotherLastName()
      .build();

    await fillPersonalData(about, personal);
  });
});
