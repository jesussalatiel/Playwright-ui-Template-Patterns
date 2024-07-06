import { ICustomer } from '@ihf-rivendell/qa';
import { expect } from '@playwright/test';
import { customersRepository } from '@repositories/repositories';
import { logger } from '../../reporters/custom-logger';
import { CustomerInterface, PersonBuilder } from './builder/customer-builder';

export enum CustomerStatus {
  INVITED = 'INVITED',
  ONBOARDING = 'ONBOARDING',
  ACTIVE = 'ACTIVE',
  ENABLED = 'ENABLED',
}

class CustomerHelper {
  async create(customer: CustomerInterface): Promise<void> {
    const { type: documentType, number: documentNumber } = customer.identityDocument!;
    await this.removeCustomerData(documentType, documentNumber);
    await this.createCustomerData(customer);
    logger.info(`Customer was created with: ${documentType} ${documentNumber}.`);
  }

  private async removeCustomerData(documentType: string, documentNumber: string): Promise<void> {
    await Promise.all([
      this.removeFromReniec(documentType, documentNumber, false),
      this.removeFromDynamo(documentType, documentNumber, false),
    ]);
  }

  private async createCustomerData(customer: CustomerInterface): Promise<void> {
    await this.createInReniec(customer);
    await this.createInDynamo(customer);
    await this.createInCognito(customer);
  }

  async removeFromReniec(documentType: string, documentNumber: string, showLog: boolean = true): Promise<void> {
    const reniecSearchResult = await this.searchCustomerFromReniec(documentType, documentNumber);

    if (reniecSearchResult.Items.length > 0) {
      await Promise.all(
        reniecSearchResult.Items.map((customer: Record<string, string>) => {
          return customersRepository.removeReniecCustomer(customer.id);
        }),
      );
      if (showLog) {
        logger.info(`Customer was removed with ${documentType} ${documentNumber} from Reniec.`);
      }
    }
  }

  private async createInReniec(customer: CustomerInterface): Promise<void> {
    const { identityDocument, name, lastName, middleName, motherLastName } = customer;
    const request: Partial<ICustomer> = { identityDocument, name, lastName, middleName, motherLastName };

    await customersRepository.createMasiveCustomersReniec([request]);
    const searchInReniec = await this.searchCustomerFromReniec(identityDocument!.type, identityDocument!.number);

    expect(searchInReniec.Count).toBe(1);
  }

  async removeFromDynamo(documentType: string, documentNumber: string, showLog: boolean = true): Promise<void> {
    const { body: customer, statusCode } = await customersRepository.findByIdentityDocument(
      documentType,
      documentNumber,
    );

    if (statusCode === 200) {
      await customersRepository.deleteById(customer.id);

      const response = await customersRepository.findByIdentityDocument(documentType, documentNumber);

      expect(response.statusCode, JSON.stringify(customer)).toBe(404);

      if (showLog) {
        logger.info(`Customer was removed with: ${documentType} ${documentNumber} from Dynamo.`);
      }
    }
  }

  private async createInDynamo(customer: CustomerInterface): Promise<void> {
    const response = await customersRepository.createCustomer({
      ...customer,
      identityDocument: customer.identityDocument,
    });
    expect(response.statusCode).toBe(200);
  }

  private async createInCognito(customers: CustomerInterface, code: string = '+51'): Promise<void> {
    const { identityDocument, email, mobile } = customers;
    const { type: documentType, number: documentNumber } = identityDocument!;

    const { body: customer, statusCode } = await customersRepository.findByIdentityDocument(
      documentType,
      documentNumber,
    );

    if (statusCode !== 200) {
      await Promise.all([this.removeCustomerData(documentType, documentNumber), this.create(customer)]);
    }

    const request = {
      id: customer.id,
      email,
      mobile: code.concat(mobile as string),
      status: CustomerStatus.INVITED,
    };

    const response = await customersRepository.update(customer.id, request, false);
    expect(response.statusCode, JSON.stringify(response, null, 2)).toBe(200);
  }

  async updateDocumentKeyValidated(documentType: string, documentNumber: string, withDocumentKeyValidated: boolean) {
    const { body: customer } = await customersRepository.findByIdentityDocument(documentType, documentNumber);
    const action = withDocumentKeyValidated ? 'validate' : 'invalidate';
    await customersRepository.updateDocumentKeyValidated(customer.id, action);
  }

  async changePassword(mobile: string, password: string, code: string = '+51'): Promise<void> {
    await customersRepository.changePassword(code.concat(mobile), password);
  }

  async searchCustomerFromReniec(documentType: string, documentNumber: string): Promise<any> {
    return customersRepository.searchReniecCustomer(documentType, documentNumber);
  }

  async searchByIdentityDocument(documentType: string, documentNumber: string) {
    const customerResult = await customersRepository.findByIdentityDocument(documentType, documentNumber);
    return customersRepository.findById(customerResult.body.id, { extended: true });
  }

  async update(
    user: CustomerInterface,
    withTermsAndConditions: boolean,
    withBasicData: boolean,
    withAddress: boolean,
    withEmployment: boolean,
    withDocumentKeyValidated: boolean,
  ): Promise<void> {
    const { type: documentType, number: documentNumber } = user.identityDocument!;
    const { body: customer, statusCode } = await customersRepository.findByIdentityDocument(
      documentType,
      documentNumber,
    );
    expect(statusCode, JSON.stringify(customer, null, 2)).toBe(200);
    const request = this.buildCustomerInfo(user, withTermsAndConditions, withBasicData, withAddress, withEmployment);
    await this.updateDocumentKeyValidated(documentType, documentNumber, withDocumentKeyValidated);
    return customersRepository.update(customer.id as string, request);
  }

  private buildCustomerInfo(
    customer: CustomerInterface,
    withTermsAndConditions: boolean,
    withBasicData: boolean,
    withAddress: boolean,
    withEmployment: boolean,
  ) {
    return {
      ...this.buildBasicInfo(customer, withBasicData),
      acceptedTermsAndConditions: withTermsAndConditions,
      address: withAddress ? this.buildAddress(customer) : undefined,
      employment: withEmployment ? this.buildEmployment(customer) : undefined,
    };
  }

  private buildBasicInfo(customers: CustomerInterface, withBasicData: boolean) {
    if (withBasicData) {
      return new PersonBuilder()
        .withName(customers.name as string)
        .withMiddleName(customers.middleName as string)
        .withSex(customers.sex as string)
        .withCivilStatus(customers.civilStatus as string)
        .withBirthdate(customers.birthdate as number)
        .withPoliticallyExposedPerson(customers.politicallyExposedPerson as boolean)
        .build();
    }
    return {};
  }

  private buildEmployment(customers: CustomerInterface) {
    const customer = new PersonBuilder()
      .withEmployment({
        income: {
          range: customers.employment?.income.range,
          currency: customers.employment?.income.currency,
        },
        employer: {
          name: customers.employment!.employer?.name,
        },
        type: customers.employment?.type as string,
        sector: customers.employment?.sector as string,
      })
      .build();
    return customer.employment;
  }

  private buildAddress(customers: CustomerInterface) {
    const customer = new PersonBuilder()
      .withAddress({
        line: customers.address?.line as string,
        type: customers.address?.type as string,
        number: customers.address?.number as string,
        apartment: customers.address?.apartment as string,
        urbanization: customers.address?.urbanization as string,
        location: {
          level1: customers.address?.location.level1,
          level2: customers.address?.location.level2,
          level3: customers.address?.location.level3,
        },
      })
      .build();
    return customer.address;
  }
}

export const customerHelper = new CustomerHelper();
