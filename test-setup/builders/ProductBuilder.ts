import { contractsHelper, leadsHelper, loansHelper } from '@micro-services';
import { ProductType, TypeOfProduct } from '../micro-services/leads/builder/leads-builder';
import { LoanStatus } from '../micro-services/loans/loans-helper';

export class ProductBuilder {
  private readonly lead: any;

  private hasSale: boolean;

  private loanStatus: LoanStatus;

  private withPayoff: boolean;

  private typeOfProduct: TypeOfProduct;

  private productType: ProductType;

  constructor(lead: any) {
    this.lead = lead;
    this.hasSale = true;
    this.loanStatus = LoanStatus.REQUESTED;
    this.withPayoff = false;
    this.typeOfProduct = TypeOfProduct.NEW;
    this.productType = ProductType.BNPL;
  }

  withSale(hasSale: boolean = true) {
    this.hasSale = hasSale;
    return this;
  }

  withType(typeOfProduct: TypeOfProduct) {
    this.typeOfProduct = typeOfProduct;
    return this;
  }

  withStatus(status: LoanStatus) {
    this.loanStatus = status;
    return this;
  }

  withTypeOfProduct(productType: ProductType) {
    this.productType = productType;
    return this;
  }

  withPayOff() {
    if (this.loanStatus === LoanStatus.REQUESTED) {
      throw new Error('We cannot make a payoff with Requested status');
    }
    this.withPayoff = true;
    return this;
  }

  async build() {
    await this.createLead();
    await this.processLoan();
  }

  private async createLead() {
    if (!this.lead) {
      throw new Error('Lead data is required');
    }

    const request = {
      ...this.lead,
      product: {
        subType: this.productType,
      },
      type: this.typeOfProduct,
    };

    await leadsHelper.create(request);

    if (this.hasSale) {
      await leadsHelper.createSale(this.lead);
    }
  }

  private async processLoan() {
    const { type: documentType, number: documentNumber } = this.lead.customer.identityDocument;

    await this.applyLoanStatus(documentType, documentNumber);

    if (this.withPayoff) {
      await loansHelper.payOffWithMoney(documentType, documentNumber);
    }
  }

  private async applyLoanStatus(documentType: string, documentNumber: string) {
    switch (this.loanStatus) {
      case LoanStatus.REQUESTED:
        break;
      case LoanStatus.APPROVED:
        await contractsHelper.create(documentType, documentNumber);
        break;
      case LoanStatus.ACTIVE:
        await contractsHelper.create(documentType, documentNumber);
        await loansHelper.disbursement(documentType, documentNumber);
        break;
      default:
        throw new Error(`Unsupported LoanStatus: ${this.loanStatus}`);
    }
  }
}
