interface MobileInvalidData {
  mobile: string;
  message: string;
  password: string;
}

export const mobileInvalidFormat: MobileInvalidData = {
  mobile: '876127212',
  message: 'El número de celular debe comenzar en 9.',
  password: 'Fake@123',
};

export const mobileInvalidLength: MobileInvalidData = {
  mobile: '9876',
  message: 'El número de celular ingresado debe tener al menos 9 dígitos.',
  password: 'Fake@123',
};

export const invalidMobile: MobileInvalidData[] = [mobileInvalidFormat, mobileInvalidLength];
