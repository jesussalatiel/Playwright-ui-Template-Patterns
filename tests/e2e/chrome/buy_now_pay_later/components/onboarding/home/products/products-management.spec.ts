import { CustomerBuilder } from '@builders/CustomerBuilder';
import { ProductBuilder } from '@builders/ProductBuilder';
import { test } from '@fixturesetup';
import { DashboardShortcuts } from '@pages/onboarding/locators/payments-locators';
import { customerTestData } from '@testdata/micro-services/customers/customer-test-data';
import { leadTestData } from '@testdata/micro-services/leads/lead-test-data';
import {
  ProductType,
  TypeOfProduct,
} from '../../../../../../../../test-setup/micro-services/leads/builder/leads-builder';

test.describe('Products Management Without Products @HappyPath', () => {
  test.beforeEach(async () => {
    await new CustomerBuilder(customerTestData).withPassword().withTermsAndConditions().build();

    await new ProductBuilder(leadTestData)
      .withSale()
      .withTypeOfProduct(ProductType.BNPL)
      .withType(TypeOfProduct.NEW)
      .build();
  });

  test('should display dashboard without dashboards @create', async ({ login }) => {
    const { mobile, password } = customerTestData;
    await login.with().credentials(mobile as string, password as string);
    // Todo: Missing add validations aboy the amount and text
    // await home.checkProductSectionWithoutProducts(true, { amount: 'S/ 10,000', template: true });
  });
});

test.describe('Products Management With Products @HappyPath @create', () => {
  test.beforeEach(async () => {
    await new CustomerBuilder(customerTestData).withPassword().withTermsAndConditions().build();

    await new ProductBuilder(leadTestData)
      .withSale()
      .withTypeOfProduct(ProductType.BNPL)
      .withType(TypeOfProduct.NEW)
      .build();
  });

  test('should display dashboard', async ({ login, home }) => {
    const { mobile, password } = customerTestData;
    await login.with().credentials(mobile as string, password as string);
    await home.viewBuyNowPayLaterDashboard().navigateTo(DashboardShortcuts.CREDIT);
  });
});
