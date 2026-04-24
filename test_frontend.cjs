const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function testFrontend() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const dir = '/home/jules/verification';

  // Start server locally in playwright script if needed, but it's already running. Wait, I killed it!
  // Let me just start it.

  try {
    console.log('Testing /privacy route...');
    await page.goto('http://localhost:4321/privacy', { waitUntil: 'networkidle' });

    // Scroll down to trigger reveal animations
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    // Wait for animations
    await page.waitForTimeout(2000);

    await page.screenshot({ path: path.join(dir, 'privacy_styled.png'), fullPage: true });

    console.log('Testing /terms route...');
    await page.goto('http://localhost:4321/terms', { waitUntil: 'networkidle' });

    // Scroll down to trigger reveal animations
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    // Wait for animations
    await page.waitForTimeout(2000);

    await page.screenshot({ path: path.join(dir, 'terms_styled.png'), fullPage: true });

    console.log('Screenshots generated successfully.');
  } catch (err) {
    console.error('Error testing frontend:', err);
  } finally {
    await browser.close();
  }
}

testFrontend();
