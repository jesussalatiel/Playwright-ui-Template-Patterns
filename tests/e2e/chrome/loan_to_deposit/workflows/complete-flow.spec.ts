import { CustomerBuilder } from '@builders/CustomerBuilder';
import { ProductBuilder } from '@builders/ProductBuilder';
import { test } from '@fixturesetup';
import { customerTestData } from '@testdata/micro-services/customers/customer-test-data';
import { leadTestData } from '@testdata/micro-services/leads/lead-test-data';
import { ProductType, TypeOfProduct } from '../../../../../test-setup/micro-services/leads/builder/leads-builder';
import { LoanStatus } from '../../../../../test-setup/micro-services/loans/loans-helper';

test.describe('LD complete TEST', () => {
  test.beforeEach(async () => {
    await new CustomerBuilder(customerTestData)
      .withPassword()
      .withAddress()
      .withBasicInfo()
      .withEmployment()
      .withDocumentKeyValidated()
      .withTermsAndConditions()
      .build();

    await new ProductBuilder(leadTestData)
      .withSale()
      .withTypeOfProduct(ProductType.BNPL)
      .withType(TypeOfProduct.NEW)
      .withStatus(LoanStatus.ACTIVE)
      .withPayOff()
      .build();

    await new ProductBuilder(leadTestData)
      .withSale()
      .withTypeOfProduct(ProductType.LD)
      .withType(TypeOfProduct.NEW)
      .withStatus(LoanStatus.REQUESTED)
      .build();
  });

  test('should successfully payments dashboard', async ({ login }) => {
    const { mobile, password } = customerTestData;
    await login.with().credentials(mobile as string, password as string);
  });
});
