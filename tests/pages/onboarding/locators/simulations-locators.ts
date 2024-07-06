import { getLocator, getLocatorByRole, getLocatorByText } from '@ihf-rivendell/qa';

export enum Fees {
  Quotes_24 = '24',
  Quotes_12 = '12',
  Quotes_06 = '6',
  Quotes_03 = '3',
  Quotes_02 = '2',
}

export const padZero = (number: number) => {
  return number.toString().padStart(2, '0');
};

export const Simulations = {
  Text: {
    priceRegexLocator: () => getLocatorByText(/S\/\s*\d+(\.\d{1,2})?/).nth(0),
    otherDate: () => getLocatorByText('Otra Fecha'),
  },
  Button: {
    paymentDay: (paymentDay: number) => getLocator(`[aria-label="button-date-${padZero(paymentDay)}"]`),
    due: (fee: Fees) => getLocatorByRole('button', { name: `fee-option-${fee}` }),
  },
  Class: {
    activeButton: () => 'AboutTheProduct_button_date_active__GPTmm AboutTheProduct_button_date__4SXe3',
    activeCard: () => 'FeeOption_container_card__U3LbI FeeOption_container_card_selected__1Gv_3',
  },
};
