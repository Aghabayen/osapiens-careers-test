import { Page, Locator } from '@playwright/test';

export class Header {
  readonly page: Page;
  readonly acceptCookiesBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptCookiesBtn = page.getByRole('button', { name: /accept/i });
  }

  // Accept cookies if the dialog appears
  async acceptCookies() {
    // Wait up to 2 seconds for the button to appear
    if (await this.acceptCookiesBtn.isVisible({ timeout: 2000 })) {
      await this.acceptCookiesBtn.click();
    }
  }
}