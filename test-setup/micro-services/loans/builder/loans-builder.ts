export interface LoanInterface {
  customer?: {
    id: string;
  };
  installments?: object;
  amount?: number;
  currency?: string;
  prepaymentMethod?: string;
  collectionChannel?: string;
}
export class LoansBuilder {
  private readonly loan: LoanInterface;

  constructor() {
    this.loan = {} as LoanInterface;
  }

  withCustomerId(customerId: string) {
    this.loan.customer = {
      id: customerId,
    };
    return this;
  }

  withInstallments(installment: object) {
    this.loan.installments = installment;
    return this;
  }

  withCurrency(currency: string) {
    this.loan.currency = currency;
    return this;
  }

  withAmount(amount: number) {
    this.loan.amount = amount;
    return this;
  }

  withPrepaymentMethod(prepaymentMethod: string) {
    this.loan.prepaymentMethod = prepaymentMethod;
    return this;
  }

  withCollectionChannel(collectionChannel: string) {
    this.loan.collectionChannel = collectionChannel;
    return this;
  }

  build() {
    return this.loan;
  }
}
