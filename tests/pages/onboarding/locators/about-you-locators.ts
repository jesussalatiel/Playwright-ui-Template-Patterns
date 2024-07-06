import { getLocator, getLocatorByLabel, getLocatorByText } from '@ihf-rivendell/qa';

export enum CivilStatusOptions {
  Single = 'Soltero(a)',
  Married = 'Casado(a)',
  Cohabitant = 'Conviviente',
  Widowed = 'Viudo(a)',
  Divorced = 'Divorciado(a)',
}

export enum GenderOptions {
  Male = 'Masculino',
  Female = 'Femenino',
}

export enum DepartmentType {
  LIMA = 'LIMA',
  CALLAO = 'CALLAO',
}

export enum DistrictType {
  BELLAVISTA = 'BELLAVISTA',
  LIMA = 'LIMA',
}

export enum AvenueType {
  Passage = "//span[contains(.,'Pasaje')]",
  Shred = "//span[contains(.,'Jirón')]",
  Avenue = "//span[contains(.,'Avenida')]",
  Street = "//span[contains(.,'Calle')]",
}

export enum PersonalDataSelectors {
  NameById = '#name',
  MiddleNameById = '#middleName',
  LastNameById = '#lastName',
  MotherLastNameById = '#motherLastName',
  DocumentTypeById = "button[aria-label='Tipo de documento']",
  DocumentNumberById = '#documentNumber',
  MobileById = '#mobile',
  BirthdateInputById = '#birthdate',
  ConfirmEmailById = '#confirmEmail',
  DropDownPartner = "button[aria-label='Estado civil']",
  DropDownSex = "button[aria-label='Sexo']",
}

export enum SpouseSelectors {
  NameById = '#nameSpouse',
  MiddleNameByCss = "input[placeholder='Escribe el segundo nombre']",
  LastNameByCss = "input[placeholder='Escribe el apellido paterno']",
  MotherLastNameById = '#motherLastNameSpouse',
}

export enum CohabitantSelectors {
  NameById = '#nameCohabitant',
  MiddleNameByCss = "input[placeholder='Escribe el segundo nombre']",
  LastNameByCss = "input[placeholder='Escribe el apellido paterno']",
  MotherLastNameById = '#motherLastNameCohabitant',
}

export enum AddressSelectors {
  DepartmentByCss = "button[aria-label='Departamento']",
  ProvinceByCss = "button[aria-label='Provincia']",
  DistrictByCss = "button[aria-label='Distrito']",
  TypeAvenueByCss = "button[aria-label='Tipo de vía (Avenida/Calle/Jirón, etc)']",
  AddressLineByCss = "input[placeholder='Escribe el nombre de vía']",
  AddressNumberById = '#addressNumber',
  AddressApartment = '#addressApartment',
  AddreesUrnabization = '#addressUrbanization',
}

export enum EmploymentDataSelectors {
  ActivityEmployByCss = "button[aria-label='Actividad Laboral']",
  IncomeByCss = "button[aria-label='Ingreso mensual bruto']",
  SectorByCss = "button[aria-label='Sector']",
  EmployeName_Ocupation = '#employmentOcupation',
  EmployeName_Name = '#employerName',
}

export enum SectorRole {
  PublicAdministration = 'Administración Pública y FF.AA.',
  Agriculture = 'Agricultura',
  Sewerage = 'Agua, alcantarillado y residuos',
  Accommodation = 'Alojamiento y restaurantes',
  Art = 'Artes y entretenimiento',
  Banking = 'Banca, Seguros y AFPs',
  Construction = 'Construcción e Inmobiliaria',
  Edutation = 'Educación',
  Manufacture = 'Manufactura',
  Mining = 'Minería, Electricidad e Hidrocarburos',
  Trades = 'Oficios y servicios generales',
  Health = 'Salud',
  ProfesionalServices = 'Servicios profesionales y/o técnicos',
  Telecom = 'TelecTelecom., Tecnología, Medios De Com.omunicaciones',
  Transport = 'Transporte y almacenamiento',
  Sale = 'Venta al por mayor y por menor',
  Other = 'Otro',
}

export enum IncomeRange {
  NoIncome = 'No genero ingresos',
  Range_1 = 'Menor a S/ 1,500',
  Range_2 = 'Entre S/ 1,500 - S/2,000',
  Range_3 = 'Entre S/ 2,001 - S/ 2,500',
  Range_4 = 'Entre S/ 2,501 - S/ 3,000',
  Range_5 = 'Entre S/ 3,001 - S/ 5,000',
  Range_6 = 'Entre S/ 5,001 - S/ 7,500',
  Range_7 = 'Entre S/ 7,501 - S/ 10,000',
  Range_8 = 'Mayor a S/ 10,000',
}

export enum ActivityRole {
  DEPENDENT = 'Dependiente',
  INDEPENDENT = 'Independiente',
  NATURAL_PERSON_BUSINESS = 'Persona natural con negocio',
  HOUSEHOLD = 'Responsable del hogar',
  STUDENT = 'Estudiante',
  UNEMPLOYED = 'Desempleado(a)',
  RETIRED = 'Jubilado(a)',
}

export enum Validations {
  EmailConfirmation = 'Los correos electrónicos no coinciden',
  AvenueValidation = 'Debes seleccionar una opción',
  AvenueNumberValidation = 'Debes completar el campo',
  InvalidCharacters = 'El campo contiene caracteres no permitidos.',
}

export const CivilStatusSelector = (civil: string) => getLocatorByText(civil);
export const SexSelector = (sex: string) => getLocatorByText(sex);
export const AdditionalDataById = '#additionalPurposesCheckbox';
export const SaveButtonByText = () => getLocatorByText('Guardar');
export const LocationSelector = (location: string) => getLocatorByLabel(location).getByText(location);
export const AvenueSelector = (avenue: string) => getLocator(avenue);
export const ActivityStudent = () => getLocatorByLabel('Estudiante');
export const NoIncome = () => getLocatorByLabel('No genero ingresos');
export const OmitSelector = () => getLocatorByText('Omitir');
