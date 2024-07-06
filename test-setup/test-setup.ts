import { leadsHelper, customerHelper } from '@micro-services';
import { Page, Pages } from '@pages/utils/pages';
import { CustomerInterface } from './micro-services/customers/builder/customer-builder';

class TestSetup {
  async setup(): Promise<void> {
    await new Pages().Page(Page.HOME);
  }

  async tearDown(customer: CustomerInterface): Promise<void> {
    const { type: documentType, number: documentNumber } = customer.identityDocument!;

    await Promise.all([
      customerHelper.removeFromDynamo(documentType, documentNumber),
      customerHelper.removeFromReniec(documentType, documentNumber),
      leadsHelper.removeLead(documentType, documentNumber),
    ]);
  }
}

export const testSetup: TestSetup = new TestSetup();
