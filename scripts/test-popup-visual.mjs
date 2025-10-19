import { chromium } from '@playwright/test';
import path from 'path';

(async () => {
  const dist = path.resolve('src'); // aqui usamos src, não dist ainda

  const context = await chromium.launchPersistentContext('', {
    headless: false,
  });

  const page = await context.newPage();

  const popupPath = path.join(dist, 'popup.html');
  console.log('Abrindo popup:', popupPath);
  await page.goto(`file://${popupPath}`);

  const input = page.locator('#apiKey');
  const button = page.locator('#saveBtn');
  const status = page.locator('#status');

  await input.fill('CHAVE_FAKE_123');
  await button.click();

  await status.waitFor({ state: 'visible', timeout: 10000 });
  const texto = await status.textContent();
  console.log('Texto capturado:', texto);

  await context.close();
})();
