import { getLocatorByRole, getLocatorByText } from '@ihf-rivendell/qa';

export const takePhotoOneByText = () => getLocatorByText('1');
export const takePhotoActionByRole = () => getLocatorByRole('button', { name: 'Capturar foto' });
export const savePhotoActionByRole = () => getLocatorByRole('button', { name: 'Guardar foto' });
export const takePhotoTwoByText = () => getLocatorByText('2');
