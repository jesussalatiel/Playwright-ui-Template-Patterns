export interface CardsInterface {
  id?: string;
  customerId?: string;
  request: {
    metadata: {
      niubizTransactionToken: string;
    };
    affiliatedRecurringPayment?: boolean;
  };
}

export class CardsBuilder {
  private readonly card: CardsInterface;

  constructor() {
    this.card = {} as CardsInterface;
  }

  withId(cardId: string) {
    this.card.id = cardId;
    return this;
  }

  withCustomerId(customerId: string) {
    this.card.customerId = customerId;
    return this;
  }

  withRecurringPayment(affiliate: boolean) {
    this.card.request = {
      metadata: {
        niubizTransactionToken: 'ABCDE123456',
      },
      affiliatedRecurringPayment: affiliate,
    };
    return this;
  }

  build() {
    return this.card;
  }
}
