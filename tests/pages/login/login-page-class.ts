import { LoginComponentPage } from '@pages/login/components/login-component-page';
import { AssertClass } from '@pages/utils/assert-class';
import { UtilsClass } from '@pages/utils/utils-class';

export class LoginPageClass {
  with() {
    return new LoginComponentPage();
  }

  action() {
    return new UtilsClass();
  }

  assert() {
    return new AssertClass();
  }
}
