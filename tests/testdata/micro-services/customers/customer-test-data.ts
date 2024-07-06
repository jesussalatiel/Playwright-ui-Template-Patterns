import { faker } from '@faker-js/faker/locale/es_MX';
import { CustomerInterface } from '../../../../test-setup/micro-services/customers/builder/customer-builder';

const getRandomNumber = (length: number): string => {
  const min = 10 ** (length - 1);
  const max = 10 ** length - 1;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return `9${randomNumber.toString().substring(1)}`;
};

const getEmail = () => {
  return `${Date.now()}.${getRandomNumber(4)}@globant.com`;
};

export const customerTestData: CustomerInterface = {
  name: faker.person.firstName().split(' ')[0],
  middleName: faker.person.middleName(),
  lastName: faker.person.lastName().split(' ')[0],
  motherLastName: 'Automatión',
  sex: 'M',
  civilStatus: 'SINGLE',
  email: getEmail(),
  birthdate: 1146459600000,
  mobile: getRandomNumber(9),
  identityDocument: {
    number: getRandomNumber(8),
    type: 'DNI',
  },
  politicallyExposedPerson: false,
  address: {
    number: '12',
    urbanization: 'TESTING',
    location: {
      level1: 'LIMA',
      level3: 'LIMA',
      level2: 'LIMA',
    },
    type: 'Calle',
    line: 'LONG LONG LONG',
    apartment: 'TESTING',
  },
  employment: {
    income: {
      range: 'RANGE_1',
      currency: 'PEN',
    },
    employer: {
      name: 'IHFINTECH',
    },
    type: 'DEPENDENT',
    sector: 'ADMINISTRACION_PUBLICA',
  },
  acceptedTermsAndConditions: true,
  documentKeyValidated: true,
  password: 'Automation@123',
};
