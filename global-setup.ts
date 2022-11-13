import { chromium } from '@playwright/test';

async function globalSetup() {
  const browser = await chromium.launch({ headless: false, slowMo: 1000 });
  const page = await browser.newPage();
  await page.goto('https://account.proton.me/u/0/mail/folders-labels');
  await page.pause();
  // Proceed with manual account creation flow
  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
}

export default globalSetup;
