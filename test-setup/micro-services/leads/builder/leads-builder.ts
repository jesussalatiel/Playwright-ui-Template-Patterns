import { HeaderType } from '@ihf-rivendell/qa';

export enum ProductType {
  BNPL = 'BNPL',
  LD = 'LD',
}

export enum TypeOfProduct {
  NEW = 'NEW',
  REPURCHASE = 'REPURCHASE',
  REFINANCE = 'REFINANCE',
}

export interface LeadInterface {
  id: string;
  campaignId: number;
  product: {
    type: 'LOAN';
    subType: ProductType;
  };
  customer: {
    id?: string;
    identityDocument: {
      type: string;
      number: string;
    };
  };
  lead?: {
    customer?: {
      identityDocument?: {
        type?: string;
        number?: string;
      };
    };
  };
  amount: number;
  interestRate: number;
  annualNominalRate: string;
  currency: string;
  term: number;
  paymentDay: number;
  expirationDate: number;
  creationDate: number;
  status: string;
  type: string;
  headerType: HeaderType;
  isActive: boolean;
  metadata?: {
    'external.id'?: string | undefined;
    'external.branch'?: string | undefined;
    'external.seller'?: string | undefined;
  };
}

export class LeadsBuilder {
  private readonly leads: LeadInterface;

  constructor() {
    this.leads = {} as LeadInterface;
  }

  withCampaignId(campaignId: number): this {
    this.leads.campaignId = campaignId;
    return this;
  }

  withProductSubType(subType: ProductType): this {
    this.leads.product = {
      type: 'LOAN',
      subType,
    };
    return this;
  }

  withCustomerIdentityDocument(type?: string, number?: string): this {
    this.leads.lead = {
      customer: {
        identityDocument: {
          type,
          number,
        },
      },
    };

    return this;
  }

  withAmount(amount: number): this {
    this.leads.amount = amount;
    return this;
  }

  withInterestRate(interestRate: number): this {
    this.leads.interestRate = interestRate;
    return this;
  }

  withAnnualNominalRate(annualNominalRate: string): this {
    this.leads.annualNominalRate = annualNominalRate;
    return this;
  }

  withCurrency(currency: string): this {
    this.leads.currency = currency;
    return this;
  }

  withExpirationDate(expirationDate: number): this {
    this.leads.expirationDate = expirationDate;
    return this;
  }

  withCreationDate(creationDate: number): this {
    this.leads.creationDate = creationDate;
    return this;
  }

  withStatus(status: string): this {
    this.leads.status = status;
    return this;
  }

  withType(type: string): this {
    this.leads.type = type;
    return this;
  }

  withHeaderType(headerType: HeaderType): this {
    this.leads.headerType = headerType;
    return this;
  }

  withIsActive(isActive: boolean): this {
    this.leads.isActive = isActive;
    return this;
  }

  build(): any {
    return this.leads;
  }
}
