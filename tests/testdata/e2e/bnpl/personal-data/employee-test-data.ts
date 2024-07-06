import { faker } from '@faker-js/faker/locale/es_MX';
import { ActivityRole, IncomeRange, SectorRole } from '@pages/onboarding/locators/about-you-locators';

export interface IEmployeeTestData {
  name: string;
  lastName: string;
  middleName: string;
  motherLastName: string;
  company: string;
  activity: ActivityRole;
  sector: SectorRole;
  income: IncomeRange;
}

export class EmployeeTestDataBuilder {
  private employeer: Partial<IEmployeeTestData> = {};

  withCompanyName(): this {
    this.employeer.company = faker.company.name() ?? 'HIRAOKA S.A.C';
    return this;
  }

  withActivityRole(activity: ActivityRole): this {
    this.employeer.activity = activity ?? ActivityRole.DEPENDENT;
    return this;
  }

  withSector(sector: SectorRole): this {
    this.employeer.sector = sector ?? SectorRole.PublicAdministration;
    return this;
  }

  withIncome(income: IncomeRange): this {
    this.employeer.income = income ?? IncomeRange.NoIncome;
    return this;
  }

  build(): IEmployeeTestData {
    return this.employeer as IEmployeeTestData;
  }
}
