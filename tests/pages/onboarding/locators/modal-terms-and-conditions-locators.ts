import { getLocatorByRole } from '@ihf-rivendell/qa';

export const termsAndConditionsButtonByText = () => getLocatorByRole('button', { name: 'términos y condiciones.' });
