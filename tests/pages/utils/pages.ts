import { getPage, gotoURL, waitForPageLoadState } from '@ihf-rivendell/qa';
import { expect } from '@playwright/test';

export enum Page {
  HOME = '/',
  PRODUCTS = 'ib/products.html',
}

export class Pages {
  async Page(page: Page): Promise<void> {
    await waitForPageLoadState();
    switch (page) {
      case Page.HOME:
        await this.validateHomeHasElements(page);
        break;
      case Page.PRODUCTS:
        await this.validateBodyHasElements(page);
        break;
      default:
        await gotoURL('/');
    }
  }

  private async validateHomeHasElements(page: Page) {
    const response = await gotoURL(page, { waitUntil: 'networkidle' });

    if (!response) {
      throw new Error('Failed to load the page');
    }
    expect(response.status()).toBe(200);
  }

  private async validateBodyHasElements(page: Page): Promise<void> {
    await expect(getPage()).toHaveURL(`https://personas.${'dev' || 'test' || 'stag'}.oka.com.pe/ib/products/bnpl`);
    const response = await gotoURL(`/${page}`);

    if (!response) {
      throw new Error('Failed to load the page');
    }

    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body.length > 1).toBeTruthy();
  }
}
