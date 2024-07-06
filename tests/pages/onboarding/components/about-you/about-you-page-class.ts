import { PersonalDataComponent } from '@pages/onboarding/components/about-you/components/personal-data/personal-data-page-class';
import { AssertClass } from '@pages/utils/assert-class';

export class AboutYouPageClass {
  form() {
    return new PersonalDataComponent();
  }

  assert() {
    return new AssertClass();
  }
}
