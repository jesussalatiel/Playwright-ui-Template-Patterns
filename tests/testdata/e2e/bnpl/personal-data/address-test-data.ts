import { faker } from '@faker-js/faker';
import { AvenueType, DepartmentType, DistrictType } from '@pages/onboarding/locators/about-you-locators';

export interface IAddressTestData {
  departement: DepartmentType;
  province: DepartmentType;
  district: DistrictType;
  avenue: AvenueType;
  addressName: string;
  addressNumber: string;
  apartment: string;
  urbanization: string;
}

export class AddressTestDataBuilder {
  private address: Partial<IAddressTestData> = {};

  withApartment(apartment?: string): this {
    this.address.apartment = apartment ?? '404';
    return this;
  }

  withUrbanization(urbanization?: string): this {
    this.address.urbanization = urbanization ?? 'LIMA BONITA';
    return this;
  }

  withDepartment(departement: DepartmentType): this {
    this.address.departement = departement ?? DepartmentType.LIMA;
    return this;
  }

  withProvince(province: DepartmentType): this {
    this.address.province = province ?? DepartmentType.LIMA;
    return this;
  }

  withDistrict(district: DistrictType): this {
    this.address.district = district ?? DepartmentType.LIMA;
    return this;
  }

  withAvenue(avenue: AvenueType): this {
    this.address.avenue = avenue;
    return this;
  }

  withAddressName(addressName?: string): this {
    this.address.addressName = addressName ?? faker.location.direction();
    return this;
  }

  withAdressNumber(addressNumber?: string): this {
    this.address.addressNumber = addressNumber ?? faker.location.secondaryAddress();
    return this;
  }

  build() {
    return this.address as IAddressTestData;
  }
}
