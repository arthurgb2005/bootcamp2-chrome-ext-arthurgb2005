import { chromium } from '@playwright/test';
import path from 'path';

(async () => {
  const dist = path.resolve('dist');

  const context = await chromium.launchPersistentContext('', {
    headless: false,
    args: [
      `--disable-extensions-except=${dist}`,
      `--load-extension=${dist}`
    ]
  });

  const [page] = context.pages();

  // Abre qualquer site para inspecionar a extensão
  await page.goto('https://example.com');

  console.log('🟢 Chromium com extensão aberto. Interaja com a extensão manualmente.');

})();
