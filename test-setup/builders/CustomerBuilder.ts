import { customerHelper } from '@micro-services';

export class CustomerBuilder {
  private password: string;

  private termsAndConditionsAccepted: boolean;

  private basicDataUpdated: boolean;

  private addressUpdated: boolean;

  private employmentInfoUpdated: boolean;

  private documentKeyValidated: boolean;

  private readonly customer: any;

  constructor(customer: any) {
    this.customer = customer;
    this.password = '';
    this.termsAndConditionsAccepted = false;
    this.basicDataUpdated = false;
    this.addressUpdated = false;
    this.employmentInfoUpdated = false;
    this.documentKeyValidated = false;
  }

  withPassword(password?: string) {
    this.password = password ?? this.customer.password;
    return this;
  }

  withBasicInfo() {
    this.basicDataUpdated = true;
    return this;
  }

  withTermsAndConditions() {
    this.termsAndConditionsAccepted = true;
    return this;
  }

  withAddress() {
    this.addressUpdated = true;
    return this;
  }

  withEmployment() {
    this.employmentInfoUpdated = true;
    return this;
  }

  withDocumentKeyValidated() {
    this.documentKeyValidated = true;
    return this;
  }

  async build() {
    await customerHelper.create(this.customer);

    if (this.password !== undefined && this.password !== '') {
      await customerHelper.changePassword(this.customer.mobile!, this.password);
    }

    await customerHelper.update(
      this.customer,
      this.termsAndConditionsAccepted,
      this.basicDataUpdated,
      this.addressUpdated,
      this.employmentInfoUpdated,
      this.documentKeyValidated,
    );
  }
}
