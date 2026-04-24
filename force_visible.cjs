const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  await page.goto('http://localhost:4321/privacy', { waitUntil: 'networkidle' });

  // Force reveal elements to be visible
  await page.addStyleTag({ content: '.reveal { opacity: 1 !important; visibility: visible !important; transform: none !important; }' });

  await page.screenshot({ path: 'privacy_visible.png', fullPage: true });

  await page.goto('http://localhost:4321/terms', { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: '.reveal { opacity: 1 !important; visibility: visible !important; transform: none !important; }' });
  await page.screenshot({ path: 'terms_visible.png', fullPage: true });

  await browser.close();
})();
