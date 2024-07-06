import { getLocator, getLocatorByRole } from '@ihf-rivendell/qa';

export const NiubizLocators = {
  Buttons: {
    paymentTermsAccepted: () => getLocator('#paymentTermsAccepted'),
    addCreditCard: () => getLocatorByRole('button', { name: 'Agregar tarjeta' }),
    checkOnTrue: () => getLocator('button[value="ABCDE123456"]'),
    checkOnFalse: () => getLocator('button[value="ABCDE12345A"]'),
    clickOnPay: () => getLocatorByRole('button', { name: 'Pagar S/' }),
  },
  Text: {},
};
