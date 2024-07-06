import { AboutYouPageClass } from '@pages/onboarding/components/about-you/about-you-page-class';
import { HomePageClass } from '@pages/onboarding/components/home/home-page-class';
import { IdentityValidationClass } from '@pages/onboarding/components/identity-validation/identity-validation-class';
import { NiubizPageClass } from '@pages/onboarding/components/niubiz/niubiz-page-class';
import { SimulationPageClass } from '@pages/onboarding/components/simulations/components/simulations-page-class';
import { PaymentsPageClass } from '@pages/payments/payments-page-class';
import { AssertClass } from '@pages/utils/assert-class';
import { UtilsClass } from '@pages/utils/utils-class';
import { test as baseTest } from '@pagesetup';
import { LoginPageClass } from '@pages/login/login-page-class';
import { ContractComponentPage } from '@pages/onboarding/components/contracts/components/contract-tems-components';

interface PagesClass {
  login: LoginPageClass;
  home: HomePageClass;
  about: AboutYouPageClass;
  simulation: SimulationPageClass;
  niubiz: NiubizPageClass;
  identity: IdentityValidationClass;
  utils: UtilsClass;
  contract: ContractComponentPage;
  payments: PaymentsPageClass;
  asserts: AssertClass;
}

/**
 * Extend the built-in test fixtures with custom page objects.
 * @param {PagesClass} pageClasses - Object containing all page classes.
 * @returns {void}
 */
export const test = baseTest.extend<PagesClass>({
  login: async ({}, use) => {
    await use(new LoginPageClass());
  },
  home: async ({}, use) => {
    await use(new HomePageClass());
  },
  about: async ({}, use) => {
    await use(new AboutYouPageClass());
  },
  simulation: async ({}, use) => {
    await use(new SimulationPageClass());
  },
  niubiz: async ({}, use) => {
    await use(new NiubizPageClass());
  },
  identity: async ({}, use) => {
    await use(new IdentityValidationClass());
  },
  utils: async ({}, use) => {
    await use(new UtilsClass());
  },
  contract: async ({}, use) => {
    await use(new ContractComponentPage());
  },
  payments: async ({}, use) => {
    await use(new PaymentsPageClass());
  },
  asserts: async ({}, use) => {
    await use(new AssertClass());
  },
});
