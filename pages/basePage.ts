import type { Locator, Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  successAlert: any;
  createModal: any;
  deleteModal: any;

  constructor(page: Page) {
    this.page = page;
    
    this.successAlert = this.page.locator('xpath=//div[@role="alert"][contains(@class,"success")]');
    this.createModal = this.page.locator('role=dialog[name*="Create"]');
    this.deleteModal = this.page.locator('role=dialog[name*="Delete"]');
  }

  locatorExists = async (locator: Locator) => !((await locator.waitFor({ timeout: 1000 }).catch((e: Error) => e)) instanceof Error);

}  