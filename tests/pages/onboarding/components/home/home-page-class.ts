import { DashboardComponent } from '@pages/onboarding/components/home/components/products/DashboardComponent';
import { ModalTermsAndConditions } from '@pages/onboarding/components/home/components/terms-and-conditions/modal-terms-and-conditions';

export class HomePageClass {
  viewBuyNowPayLaterDashboard() {
    return new DashboardComponent();
  }

  modal() {
    return new ModalTermsAndConditions();
  }
}
