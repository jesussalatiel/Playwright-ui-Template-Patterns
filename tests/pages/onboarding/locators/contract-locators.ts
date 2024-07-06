import { getLocator, getLocatorByRole, getLocatorByText } from '@ihf-rivendell/qa';

export const titleConfirmationLocatorByText = () => getLocatorByText('Confirmación de Crédito');

export const checkNotPepAcceptedByLocator = () => getLocator('#notPepAccepted');

export const checkResponsibleForThePaymentByLocator = () => getLocator('#responsibleForThePayment');

export const checkContractConditionsByLocator = () => getLocator('#insuranceEndorsementAccepted');

export const popupInsuranceEndorsementByText = () => getLocatorByText('endoso de seguro');

export const understoodButtonByRole = () => getLocatorByRole('button', { name: 'Entendido' });

export const popupPoliticallyExposedPersonByText = () => getLocatorByText('Persona Expuesta Políticamente');

export const contractButtonByRole = () => getLocatorByRole('button', { name: 'Contratar' });
