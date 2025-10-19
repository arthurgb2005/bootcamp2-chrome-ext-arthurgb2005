import { test, expect, chromium } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('deve carregar popup.html e permitir salvar API Key', async () => {
  // Caminho absoluto do popup.html
  const popupPath = path.resolve(__dirname, '../src/popup.html');

  // Lança Chromium sem headless para visualização
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Abre o popup.html via file://
  await page.goto(`file://${popupPath}`);

  // Seletores
  const input = page.locator('#apiKey');
  const button = page.locator('#saveBtn');
  const status = page.locator('#status');

  // Verifica que o input e botão estão visíveis
  await expect(input).toBeVisible();
  await expect(button).toBeVisible();

  // Preenche o input e clica no botão
  await input.fill('CHAVE_FAKE_123');
  await button.click();

  // Espera até que o texto do status seja atualizado
  await page.waitForFunction(() => {
    const el = document.getElementById('status');
    return el && el.textContent && el.textContent.includes('API Key salva com sucesso!');
  }, { timeout: 10000 });

  // Captura e loga o texto
  const textoStatus = await status.textContent();
  console.log('🧪 Texto capturado:', textoStatus);

  // Valida o texto
  expect(textoStatus).toContain('API Key salva com sucesso!');

  await browser.close();
});
