import { IContract, isValidUUID, sleep } from '@ihf-rivendell/qa';
import { expect } from '@playwright/test';
import { contractsRepository } from '@repositories/repositories';
import { customerHelper } from '../customers/customers-helper';
import { loansHelper, LoanStatus } from '../loans/loans-helper';

class ContractsHelper {
  async create(documentType: string, documentNumber: string): Promise<void> {
    const loans = await this.getRequestedLoan(documentType, documentNumber);

    if (!loans) {
      throw new Error('No requested loan found');
    }

    const contractRequest: IContract = {
      customer: { id: loans.customer.id },
      product: { type: 'LOAN', id: loans.id },
      version: 'v1',
    };

    const contracts = await this.createContractWithRetry(contractRequest, 3000);
    expect(contracts.body.documents.length).toEqual(6);

    await this.signature(documentType, documentNumber);
  }

  async signature(documentType: string, documentNumber: string): Promise<void> {
    const customer = await this.getCustomerByIdentityDocument(documentType, documentNumber);

    if (!customer) {
      throw new Error('No customer found');
    }

    const contract = await this.findCreatedContractByCustomerId(customer.id);

    if (!contract) {
      throw new Error('No created contracts found');
    }

    const signatureRequest = {
      id: contract.id,
      customer: { id: contract.customerId },
      product: { type: contract.productType, id: contract.productId },
      version: contract.version,
    };

    const signed = await this.updateContractStatusToSigned(signatureRequest);
    expect(isValidUUID(signed.id), JSON.stringify(signed, null, 2)).toBeTruthy();

    const loan = await this.getApprovedLoan(documentType, documentNumber);
    expect(isValidUUID(loan.id), JSON.stringify(loan, null, 2)).toBeTruthy();
  }

  private async createContractWithRetry(contractRequest: IContract, timeout: number): Promise<any> {
    const startTime = Date.now();
    const interval = 500;

    let contracts;

    do {
      // eslint-disable-next-line no-await-in-loop
      contracts = await contractsRepository.createContract(contractRequest);

      if (contracts.body.documents) {
        break;
      }

      // eslint-disable-next-line no-await-in-loop
      await sleep(interval);
    } while (Date.now() - startTime < timeout);

    if (!contracts.body.documents) {
      throw new Error('Failed to create contracts within the timeout period');
    }

    return contracts;
  }

  private async findCreatedContractByCustomerId(customerId: string): Promise<any> {
    const startTime = Date.now();
    const timeout = 15000;
    const interval = 500;

    let contract;

    do {
      // eslint-disable-next-line no-await-in-loop
      const contracts = await contractsRepository.findByCustomerId(customerId);
      contract = contracts.find((item: any) => item.status === 'CREATED');

      if (contract) {
        return contract;
      }

      // eslint-disable-next-line no-await-in-loop
      await sleep(interval);
    } while (Date.now() - startTime < timeout);

    return contract;
  }

  private async getRequestedLoan(documentType: string, documentNumber: string): Promise<any> {
    const { body: loans } = await loansHelper.search(documentType, documentNumber);
    return loans.find((item: any) => item.status === LoanStatus.REQUESTED);
  }

  private async getCustomerByIdentityDocument(documentType: string, documentNumber: string): Promise<any> {
    const { body: customer } = await customerHelper.searchByIdentityDocument(documentType, documentNumber);
    return customer;
  }

  private async updateContractStatusToSigned(signatureRequest: any): Promise<any> {
    const { body: signed } = await contractsRepository.updateStatusSigned(signatureRequest);
    return signed;
  }

  private async getApprovedLoan(documentType: string, documentNumber: string): Promise<any> {
    let response;
    for (let tries = 0; tries < 3; tries += 1) {
      // eslint-disable-next-line no-await-in-loop
      response = await loansHelper.search(documentType, documentNumber);
      // eslint-disable-next-line no-await-in-loop
      await sleep(100);
    }
    return loansHelper.findApprovedLoan(response.body);
  }
}

export const contractsHelper = new ContractsHelper();
