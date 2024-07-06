import { test } from '@fixturesetup';
import { gotoURL, waitForPageLoadState } from '@ihf-rivendell/qa';
import { Page } from '@pages/utils/pages';

test.describe('Check Browser Compatible Message', () => {
  test.beforeEach('Go to login page', async () => {
    await gotoURL(Page.HOME);
    await waitForPageLoadState();
  });

  test('Display Browser Recommended - Firefox @HappyPath', async ({ browser, login }) => {
    if (browser.browserType().name().includes('firefox')) {
      await login
        .assert()
        .verifyIncompatibleBrowser(
          `Te recomendamos utilizar el navegador de Chrome o Safari para garantizar una experiencia de navegación adecuada en nuestra plataforma.`,
        );
    }
  });
});
