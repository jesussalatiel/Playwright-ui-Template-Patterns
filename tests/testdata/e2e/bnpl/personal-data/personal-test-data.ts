import { CivilStatusOptions, GenderOptions } from '@pages/onboarding/locators/about-you-locators';
import { customerTestData } from '@testdata/micro-services/customers/customer-test-data';
import { faker } from '@faker-js/faker/locale/es_MX';

export interface IPersonalTestData {
  name: string;
  middleName: string;
  lastName: string;
  motherLastName: string;
  birthdate: `${string}/${string}/${string}`;
  email: string;
  sex: GenderOptions;
  civil: CivilStatusOptions;
  additionalInfo: boolean;
}
export class PersonaTestDataBuilder {
  private personal: Partial<IPersonalTestData> = {};

  constructor() {
    this.personal.additionalInfo = false;
  }

  withCohabitantName(): this {
    // eslint-disable-next-line prefer-destructuring
    this.personal.name = faker.person.firstName().split(' ')[0];
    return this;
  }

  withCohabitantMiddleName(): this {
    this.personal.middleName = faker.person.middleName();
    return this;
  }

  withCohabitantLastName(): this {
    // eslint-disable-next-line prefer-destructuring
    this.personal.lastName = faker.person.lastName().split(' ')[0];
    return this;
  }

  withCohabitantMotherLastName(): this {
    this.personal.motherLastName = 'Bunny';
    return this;
  }

  withBirthdate(birthdate?: `${string}/${string}/${string}`): this {
    this.personal.birthdate = birthdate ?? '17/02/1996';
    return this;
  }

  withEmail(email?: string): this {
    this.personal.email = email ?? customerTestData.email;
    return this;
  }

  withSex(sex?: GenderOptions): this {
    this.personal.sex = sex ?? GenderOptions.Male;
    return this;
  }

  withCivilStatus(civil: CivilStatusOptions): this {
    this.personal.civil = civil ?? CivilStatusOptions.Single;
    return this;
  }

  withAditionalInfo(): this {
    this.personal.additionalInfo = true;
    return this;
  }

  build(): IPersonalTestData {
    return this.personal as IPersonalTestData;
  }
}
