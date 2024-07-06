import { Pages } from '@pages/utils/pages';

class Navigation {
  To() {
    return new Pages();
  }
}

export const navigation = new Navigation();
