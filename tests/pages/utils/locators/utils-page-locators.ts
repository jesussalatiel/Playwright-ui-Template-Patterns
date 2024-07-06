import { getLocator, getLocatorByText } from '@ihf-rivendell/qa';

export const submitButtonByText = () => getLocatorByText('Aceptar y continuar', { exact: true });
export const exitButtonByText = () => getLocatorByText('Salir');
export const continueButtonByText = () => getLocatorByText('Continuar');
export const closeButtonByLocator = () => getLocator('button[aria-label="close-icon"]');
export const acceptButtonByText = () => getLocatorByText('Aceptar');
