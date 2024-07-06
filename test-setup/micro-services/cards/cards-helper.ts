import { ICards, ICustomer } from '@ihf-rivendell/qa';
import { customerHelper } from '@micro-services';
import { cardsRepository } from '@repositories/repositories';
import * as console from 'node:console';
import { CardsBuilder } from './builder/cards-builder';

class CardsHelper {
  async create(documentType: string, documentNumber: string) {
    const { body: customer } = await customerHelper.searchByIdentityDocument(documentType, documentNumber);
    const { body: sessionKey } = await this.generateSessionKey(customer.id);
    const request = new CardsBuilder()
      .withId(sessionKey.id)
      .withCustomerId(customer.id)
      .withRecurringPayment(false)
      .build();
    console.log(request);

    await cardsRepository.update(request as ICards);

    const response = await cardsRepository.findByCustomerId(customer.id);
    console.log(response);
  }

  private generateSessionKey(customerId: string) {
    return cardsRepository.create({
      id: customerId,
    } as ICustomer);
  }
}

export const cardsHelper = new CardsHelper();
