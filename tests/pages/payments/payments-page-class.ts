import { DashboardComponentClass } from '@pages/payments/home/components/dashboards/products-page-class';
import { ModalComponentClass } from '@pages/payments/home/components/modals/products-page-class';

export class PaymentsPageClass {
  modal() {
    return new ModalComponentClass();
  }

  dashboard() {
    return new DashboardComponentClass();
  }
}
