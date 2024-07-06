import { getLocatorByLabel, getLocatorByText } from '@ihf-rivendell/qa';

export enum DashboardShortcuts {
  CREDIT = 'CREDIT',
  PAYMENTS = 'PAYMENTS',
  DEFAULT = 'DEFAULT',
}

export enum PaymentsShortcuts {
  PAYMENTS = 'PAYMENTS',
  SCHEDULED = 'SCHEDULED',
  CONTRACTS = 'CONTRACTS',
  HELP = 'HELP',
  DEFAULT = 'DEFAULT',
}

export enum Installments {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
  SEVEN = 7,
  EIGHT = 8,
  NINE = 9,
  TEN = 10,
  ELEVEN = 11,
  TWELVE = 12,
}

export const PaymentComponents = {
  Buttons: {},
  Texts: {
    showMore: () => getLocatorByText('Ver más'),
  },
  Checkboxes: {
    installment: (position: number) =>
      getLocatorByLabel(`installment-${position}`, { exact: true }).getByRole('checkbox'),
  },
};
