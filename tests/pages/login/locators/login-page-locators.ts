import { getLocatorByRole } from '@ihf-rivendell/qa';

export const userNameInputById = `#phoneNumber`;
export const passwordInputById = `#password`;
export const submitButtonByText = () => getLocatorByRole('button', { name: 'Ingresar' });
export const changePasswordInputByText = () => getLocatorByRole('button', { name: 'Guardar y continuar' });
export const newPasswordInputById = `#newPassword`;
export const confirmPasswordInputById = `#confirmPassword`;
