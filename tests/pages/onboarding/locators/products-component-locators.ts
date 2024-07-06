import { getLocator, getLocatorByRole, getLocatorByText } from '@ihf-rivendell/qa';
import { GetByRoleTypes } from '@ihf-rivendell/qa/dist/automation/playwright/types/optional-parameter-types';

const locatorByRole = (role: GetByRoleTypes, name: string) => getLocatorByRole(role, { name });
const locatorByText = (text: string) => getLocatorByText(text);

export const Locators = {
  Buttons: {
    product: () => locatorByRole('button', 'Productos'),
    home: () => locatorByRole('button', 'Ir al home'),
    help: () => getLocator('button').filter({ hasText: 'Ayuda' }).first(),
    okaCredit: () => locatorByRole('button', 'Crédito Oka'),
    payments: () => getLocator('section').getByRole('button', { name: 'Pagos' }),
  },
  Texts: {
    products: () => locatorByText('Mis productos'),
    contactUs: () => locatorByText('¡Contáctanos!'),
    contactInstructions: () => locatorByText('Si tienes alguna consulta, por favor contáctanos al'),
    okaCreditByText: () => locatorByText('Continúa tu solicitud de Crédito Oka'),
    haveOkaCredit: () => locatorByText('¡Tienes una oferta de Crédito Oka!'),
    templateText: (text: string) => locatorByText(text),
    payments: () => getLocatorByText('Pagar'),
    schedule: () => getLocatorByText('Cronograma'),
    contracts: () => getLocatorByText('Documentos contractuales'),
  },
  Headings: {
    shortcuts: () => locatorByRole('heading', 'Atajos'),
  },
};

export const ELEMENTS_TO_CHECK_BEFORE_WITHOUT_PRODUCT: string[] = [
  'Atrás',
  'OFERTA DE CRÉDITO',
  '¡Felicidades! Tienes un crédito disponible de',
];

export const ELEMENTS_TO_CHECK_AFTER_WITHOUT_PRODUCT: string[] = [
  'S/ 200.00',
  'Monto mínimo de compra',
  '23.00%',
  'TEA',
  'Vigencia',
  'SIGUE ESTOS PASOS',
  'Si te encuentras en tienda:',
  'Selecciona los productos que quieres comprar con tu Crédito OKA y busca a uno de los vendedores.',
  'Vuelve a la tablet para confirmar la adquisición de tu Crédito OKA.',
  'Si no te encuentras en tienda:',
  'Acércate a una de nuestras tiendas y pregunta por uno de nuestros asesores.',
];
