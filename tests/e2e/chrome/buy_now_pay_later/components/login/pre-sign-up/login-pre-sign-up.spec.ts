import { CustomerBuilder } from '@builders/CustomerBuilder';
import { test } from '@fixturesetup';
import { getLocator, isElementVisible } from '@ihf-rivendell/qa';
import { customerTestData } from '@testdata/micro-services/customers/customer-test-data';

test.describe('Login pre sign up @HappyPath @Onboarding @PreSignUp', () => {
  test.beforeEach(async () => {
    await new CustomerBuilder(customerTestData).build();
  });

  const { mobile, password, name } = customerTestData;

  test('Should be able to change default password', async ({ login, home }) => {
    await login.with().mobile(mobile as string);
    await login.with().receivedPasswordCode(mobile as string);
    await login.action().submit();
    await login.with().changePassword(password as string, password as string, true);
    await login.with().credentials(mobile as string, password as string, true);

    await home.modal().welcome({
      name: name!,
      acceptTermsAndConditions: true,
      showTermsAndConditions: false,
      clickOnExit: false,
    });
  });

  test('Should not be able to change default password', async ({ login, asserts }) => {
    const testCases = [
      {
        password: 'error',
        newPassword: 'error',
        messages: ['Al menos una letra minúscula', 'Las contraseñas coinciden'],
      },
      {
        password: 'error',
        newPassword: 'mistake',
        messages: ['Al menos una letra minúscula', 'Las contraseñas no coinciden'],
      },
      {
        password: 'TESTS',
        newPassword: 'TESTS',
        messages: ['Al menos una letra mayúscula', 'Las contraseñas coinciden'],
      },
      {
        password: 'TESTSIIII',
        newPassword: 'TESTSIIII',
        messages: ['8 o más caracteres', 'Al menos una letra mayúscula', 'Las contraseñas coinciden'],
      },
      {
        password: 'TESTS1234',
        newPassword: 'TESTS1234',
        messages: [
          '8 o más caracteres',
          'Al menos una letra mayúscula',
          'Al menos un número',
          'Las contraseñas coinciden',
        ],
      },
      {
        password: 'Automation@1234',
        newPassword: 'Automation@1234',
        messages: [
          '8 o más caracteres',
          'Al menos una letra minúscula',
          'Al menos una letra mayúscula',
          'Al menos un número',
          'Las contraseñas coinciden',
        ],
      },
    ];

    await login.with().mobile(mobile as string);
    await login.with().receivedPasswordCode(mobile as string);
    await login.action().submit();
    // eslint-disable-next-line no-restricted-syntax
    for (const testCase of testCases) {
      // eslint-disable-next-line no-await-in-loop
      await test.step(`Should be show "${testCase.messages.join(', ')}"`, async () => {
        await login.with().changePassword(testCase.password, testCase.newPassword, false);
        // eslint-disable-next-line no-restricted-syntax
        for (const message of testCase.messages) {
          const locator = getLocator('li').filter({ hasText: message }).getByRole('img');
          // eslint-disable-next-line no-await-in-loop
          await isElementVisible(locator);
          // eslint-disable-next-line no-await-in-loop
          const text = await getLocator('li').filter({ hasText: message }).textContent();
          asserts.toBeText(text, message);
          // eslint-disable-next-line no-await-in-loop
        }
      });
    }
  });
});
