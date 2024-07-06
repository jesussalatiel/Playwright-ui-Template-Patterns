import { HeaderType, isValidUUID, ITransaction, sleep } from '@ihf-rivendell/qa';
import { expect } from '@playwright/test';
import { loansRepository } from '@repositories/repositories';
import { customerHelper } from '../customers/customers-helper';
import { LoansBuilder } from './builder/loans-builder';

export enum LoanStatus {
  REQUESTED = 'REQUESTED',
  APPROVED = 'APPROVED',
  ACTIVE = 'ACTIVE',
}

export class LoansHelper {
  async search(documentType: string, documentNumber: string, force: boolean = true): Promise<any> {
    const { body: customer } = await customerHelper.searchByIdentityDocument(documentType, documentNumber);
    return this.waitForLoan(customer.id, force);
  }

  async disbursement(documentType: string, documentNumber: string) {
    const { body: loans } = await this.search(documentType, documentNumber);
    const loan = loans.find((item: any) => item.status === LoanStatus.APPROVED);
    if (!loan) throw new Error('No approved loan found');

    const request = this.createActivationRequest(loan);

    await Promise.all([this.activateLoan(request), this.waitForLoan(loan.customer.id, true)]);
  }

  async findByCustomerId(customerId: string): Promise<any> {
    return loansRepository.findByCustomerId(customerId);
  }

  async payOffWithMoney(documentType: string, documentNumber: string) {
    const { body: loans } = await this.search(documentType, documentNumber);
    const transaction = loans.find((items: any) => items.status === LoanStatus.ACTIVE);

    const request = new LoansBuilder()
      .withCustomerId(transaction.customer.id)
      .withAmount(transaction.payoff.totalAmount)
      .withCurrency(transaction.currency)
      .withPrepaymentMethod('CASH')
      .withCollectionChannel('HIRAOKA_LIMA')
      .build();

    const { body: payoff } = await loansRepository.createTransaction(request as ITransaction, transaction.id);
    expect(isValidUUID(payoff.id), JSON.stringify(payoff, null, 2)).toBeTruthy();
  }

  private async waitForLoan(
    customerId: string,
    force?: boolean,
    timeout: number = 8000,
    interval: number = 500,
  ): Promise<void> {
    const startTime = Date.now();

    do {
      // eslint-disable-next-line no-await-in-loop
      const response = await this.findByCustomerId(customerId);

      // eslint-disable-next-line no-await-in-loop
      const isReady = await this.isLoanReady(response.body);

      if (isReady) {
        return response;
      }

      // eslint-disable-next-line no-await-in-loop
      await sleep(interval);
    } while (Date.now() - startTime < timeout && force);

    return this.findByCustomerId(customerId);
  }

  private async activateLoan(request: any): Promise<void> {
    const { statusCode } = await loansRepository.activateLoan({
      loan: request,
      activateLoan: true,
      headerType: HeaderType.External,
    });
    expect(statusCode).toBe(200);
  }

  private createActivationRequest(loan: any): any {
    return {
      id: loan.id,
      customer: {
        id: loan.customer.id,
      },
      status: 'ACTIVE',
    };
  }

  private async isLoanReady(loans: any[]) {
    const [loanRequested, loanActive] = await Promise.all([this.findRequestedLoan(loans), this.findActiveLoan(loans)]);
    return loanActive !== undefined || loanRequested !== undefined;
  }

  async findRequestedLoan(loan: any[]) {
    return loan.find(item => item.status === LoanStatus.REQUESTED && item.gracePeriod !== undefined);
  }

  async findActiveLoan(loan: any[]) {
    return loan.find(item => item.status === LoanStatus.ACTIVE && item.payoff !== undefined);
  }

  async findApprovedLoan(loan: any[]) {
    return loan.find(item => item.status === LoanStatus.APPROVED && item.lastMambuUpdateDate !== undefined);
  }
}

export const loansHelper = new LoansHelper();
