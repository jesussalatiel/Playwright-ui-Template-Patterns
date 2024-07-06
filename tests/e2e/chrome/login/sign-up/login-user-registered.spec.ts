import { CustomerBuilder } from '@builders/CustomerBuilder';
import { ProductBuilder } from '@builders/ProductBuilder';
import { test } from '@fixturesetup';
import { customerTestData } from '@testdata/micro-services/customers/customer-test-data';
import { leadTestData } from '@testdata/micro-services/leads/lead-test-data';
import { LoanStatus } from '../../../../../test-setup/micro-services/loans/loans-helper';

test.describe('Oka tests for successful logins @HappyPath', () => {
  test.beforeEach(async () => {
    await new CustomerBuilder(customerTestData).withPassword().build();
    await new ProductBuilder(leadTestData).withSale().withStatus(LoanStatus.REQUESTED).build();
  });

  test('Oka tests - Successful login will display Home Page', async ({ login, home }) => {
    const { mobile, name, password } = customerTestData;
    await login.with().credentials(mobile as string, password as string);
    await home.modal().welcome({
      name: name!,
      acceptTermsAndConditions: false,
      showTermsAndConditions: false,
      clickOnExit: true,
    });
  });
});
