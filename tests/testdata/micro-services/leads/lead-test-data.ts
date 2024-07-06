import { customerTestData } from '@testdata/micro-services/customers/customer-test-data';
import { LeadInterface, ProductType } from '../../../../test-setup/micro-services/leads/builder/leads-builder';

export const leadTestData: Partial<LeadInterface> = {
  campaignId: 1,
  product: {
    type: 'LOAN',
    subType: ProductType.BNPL,
  },
  customer: {
    identityDocument: {
      type: 'DNI',
      number: customerTestData.identityDocument?.number as string,
    },
  },
  amount: 10000,
  term: 12,
  paymentDay: 23,
  interestRate: 23,
  annualNominalRate: '20.88101012661791600067',
  currency: 'PEN',
  expirationDate: 86400000 + Date.now(),
  creationDate: Date.now(),
  status: 'ACTIVE',
  type: 'NEW',
  metadata: {
    'external.id': 'TESTING',
    'external.branch': 'TESTING',
    'external.seller': 'TESTING',
  },
};
