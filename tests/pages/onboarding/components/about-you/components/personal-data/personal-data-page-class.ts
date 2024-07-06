import {
  ActivityRole,
  AdditionalDataById,
  AddressSelectors,
  AvenueSelector,
  CivilStatusOptions,
  CivilStatusSelector,
  CohabitantSelectors,
  EmploymentDataSelectors,
  GenderOptions,
  IncomeRange,
  LocationSelector,
  OmitSelector,
  PersonalDataSelectors,
  SaveButtonByText,
  SectorRole,
  SexSelector,
  SpouseSelectors,
} from '@pages/onboarding/locators/about-you-locators';

import {
  click,
  expectElementToBeEnabled,
  fill,
  getLocatorByLabel,
  waitForElementToBeVisible,
  waitForPageLoadState,
} from '@ihf-rivendell/qa';

export class PersonalDataComponent {
  async personal(form: {
    name?: string;
    lastName?: string;
    motherLastName?: string;
    middleName?: string;
    birthdate: `${string}/${string}/${string}`;
    email: string;
    sex: GenderOptions;
    civilStatus: CivilStatusOptions;
    additionalInfo: boolean;
    clickOnSave: boolean;
  }): Promise<void> {
    const elementsToBeDisabled = [
      PersonalDataSelectors.NameById,
      PersonalDataSelectors.LastNameById,
      PersonalDataSelectors.MiddleNameById,
      PersonalDataSelectors.MotherLastNameById,
      PersonalDataSelectors.DocumentTypeById,
      PersonalDataSelectors.DocumentNumberById,
      PersonalDataSelectors.MobileById,
    ];

    await Promise.all(elementsToBeDisabled);

    await fill(PersonalDataSelectors.ConfirmEmailById, form.email);
    await fill(PersonalDataSelectors.BirthdateInputById, form.birthdate);
    await this.selectDropDownByText(PersonalDataSelectors.DropDownPartner, CivilStatusSelector(form.civilStatus));
    await this.selectDropDownByText(PersonalDataSelectors.DropDownSex, SexSelector(form.sex));

    if ([CivilStatusOptions.Married, CivilStatusOptions.Cohabitant].includes(form.civilStatus)) {
      const selector = form.civilStatus === CivilStatusOptions.Married ? SpouseSelectors : CohabitantSelectors;
      await fill(selector.NameById, form.name || '');
      await fill(selector.MiddleNameByCss, form.middleName || '');
      await fill(selector.LastNameByCss, form.lastName || '');
      await fill(selector.MotherLastNameById, form.motherLastName || '');
    }

    if (form.additionalInfo) {
      await click(AdditionalDataById);
    }

    if (form.clickOnSave) {
      await this.saveButtonClick();
    }
  }

  async saveButtonClick() {
    await click(SaveButtonByText());
  }

  async address(form: {
    Department: string;
    Province: string;
    District: string;
    Avenue: string;
    TypeAvenue: string;
    AvenueNumber: string;
    clickOnSave: boolean;
    Apartment?: string;
    Urbanization?: string;
  }): Promise<void> {
    await waitForPageLoadState();
    await this.selectLocation(AddressSelectors.DepartmentByCss, form.Department);
    await this.selectLocation(AddressSelectors.ProvinceByCss, form.Province);
    await this.selectLocation(AddressSelectors.DistrictByCss, form.District);
    await this.selectDropDownByText(AddressSelectors.TypeAvenueByCss, AvenueSelector(form.TypeAvenue));

    await fill(AddressSelectors.AddressLineByCss, form.Avenue);
    await fill(AddressSelectors.AddressNumberById, form.AvenueNumber);

    await fill(AddressSelectors.AddressApartment, form.Apartment ?? '');
    await fill(AddressSelectors.AddreesUrnabization, form.Urbanization ?? '');

    if (form.clickOnSave) {
      await this.saveButtonClick();
    }
  }

  async employment(form: {
    ActivityEmploy: ActivityRole;
    Sector: SectorRole;
    EmployeeName: string;
    IncomeRange: IncomeRange;
    clickOnSave: boolean;
  }): Promise<void> {
    await this.selectProfessionalActivitiesDropdown(form.ActivityEmploy);

    switch (form.ActivityEmploy) {
      case ActivityRole.DEPENDENT:
        await this.selectSectorDropdown(form.Sector);
        await fill(EmploymentDataSelectors.EmployeName_Name, form.EmployeeName);
        break;
      case ActivityRole.INDEPENDENT:
      case ActivityRole.NATURAL_PERSON_BUSINESS:
        await this.selectSectorDropdown(form.Sector);
        await fill(EmploymentDataSelectors.EmployeName_Ocupation, form.EmployeeName);
        break;
      case ActivityRole.HOUSEHOLD:
      case ActivityRole.STUDENT:
      case ActivityRole.UNEMPLOYED:
      case ActivityRole.RETIRED:
        break;
      default:
        break;
    }

    await this.selectIncomeDropdown(form.IncomeRange);

    if (form.clickOnSave) {
      await this.saveButtonClick();
    }
  }

  async niubiz(): Promise<void> {
    await click(OmitSelector());
  }

  private async selectIncomeDropdown(role: IncomeRange): Promise<void> {
    await waitForElementToBeVisible(EmploymentDataSelectors.IncomeByCss);
    await this.selectDropDownByText(
      EmploymentDataSelectors.IncomeByCss,
      getLocatorByLabel(role, { exact: true }).getByText(role),
    );
  }

  private async selectProfessionalActivitiesDropdown(role: ActivityRole): Promise<void> {
    await waitForElementToBeVisible(EmploymentDataSelectors.ActivityEmployByCss);
    await this.selectDropDownByText(
      EmploymentDataSelectors.ActivityEmployByCss,
      getLocatorByLabel(role, { exact: true }).getByText(role),
    );
  }

  private async selectSectorDropdown(role: SectorRole): Promise<void> {
    await waitForElementToBeVisible(EmploymentDataSelectors.SectorByCss);
    await this.selectDropDownByText(
      EmploymentDataSelectors.SectorByCss,
      getLocatorByLabel(role, { exact: true }).getByText(role),
    );
  }

  private async selectDropDownByText(dropDownSelector: any, value: any): Promise<void> {
    await click(dropDownSelector);
    await click(value);
  }

  private async selectLocation(selector: any, location: string): Promise<void> {
    await this.selectDropDownByText(selector, LocationSelector(location));
    await expectElementToBeEnabled(selector);
  }
}
