export interface CustomerInterface {
  id?: string;
  type?: string;
  name?: string;
  middleName?: string;
  lastName?: string;
  motherLastName?: string;
  sex?: string;
  civilStatus?: string;
  email?: string;
  birthdate?: number;
  countryCode?: string;
  mobile?: string;
  identityDocument?: {
    number: string;
    type: string;
  };
  status?: string;
  acceptedTermsAndConditions?: boolean;
  termsAndConditionsDate?: number;
  politicallyExposedPerson?: boolean;
  address?: {
    number: string;
    location: {
      level1: string;
      level2: string;
      level3: string;
    };
    type?: string;
    line?: string;
    apartment?: string;
    urbanization?: string;
  };
  employment?: {
    income: {
      range: string;
      currency: string;
    };
    employer?: {
      name: string;
    };
    type?: string;
    sector?: string;
  };
  creationDate?: number;
  lastUpdateDate?: number;
  documentKeyValidated?: boolean;
  password?: string;
}

export class PersonBuilder {
  private readonly user: CustomerInterface;

  constructor() {
    this.user = {} as CustomerInterface;
  }

  withId(id: string): this {
    this.user.id = id;
    return this;
  }

  withType(type: string): this {
    this.user.type = type;
    return this;
  }

  withName(name: string): this {
    this.user.name = name;
    return this;
  }

  withMiddleName(middleName: string): this {
    this.user.middleName = middleName;
    return this;
  }

  withLastName(lastName: string): this {
    this.user.lastName = lastName;
    return this;
  }

  withMotherLastName(motherLastName: string): this {
    this.user.motherLastName = motherLastName;
    return this;
  }

  withSex(sex: string): this {
    this.user.sex = sex;
    return this;
  }

  withCivilStatus(civilStatus: string): this {
    this.user.civilStatus = civilStatus;
    return this;
  }

  withEmail(email: string): this {
    this.user.email = email;
    return this;
  }

  withBirthdate(birthdate: number): this {
    this.user.birthdate = birthdate;
    return this;
  }

  withMobile(mobile: string): this {
    this.user.mobile = mobile;
    return this;
  }

  withIdentityDocument(identityDocument: { number: string; type: string }): this {
    this.user.identityDocument = identityDocument;
    return this;
  }

  withStatus(status: string): this {
    this.user.status = status;
    return this;
  }

  withAcceptedTermsAndConditions(acceptedTermsAndConditions: boolean): this {
    this.user.acceptedTermsAndConditions = acceptedTermsAndConditions;
    return this;
  }

  withTermsAndConditionsDate(termsAndConditionsDate: number): this {
    this.user.termsAndConditionsDate = termsAndConditionsDate;
    return this;
  }

  withPoliticallyExposedPerson(politicallyExposedPerson: boolean): this {
    this.user.politicallyExposedPerson = politicallyExposedPerson;
    return this;
  }

  withAddress(address: {
    number: string;
    location: any;
    type: string;
    urbanization: string;
    line: string;
    apartment: string;
  }): this {
    this.user.address = address;
    return this;
  }

  withEmployment(employment: { income: any; employer: any; type: string; sector: string }): this {
    this.user.employment = employment;
    return this;
  }

  withCreationDate(creationDate: number): this {
    this.user.creationDate = creationDate;
    return this;
  }

  withLastUpdateDate(lastUpdateDate: number): this {
    this.user.lastUpdateDate = lastUpdateDate;
    return this;
  }

  withDocumentKeyValidated(documentKeyValidated: boolean): this {
    this.user.documentKeyValidated = documentKeyValidated;
    return this;
  }

  build(): CustomerInterface {
    return this.user;
  }
}
