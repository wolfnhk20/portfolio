import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
const browser = await chromium.launch();
const base = process.env.PORTFOLIO_URL || 'http://127.0.0.1:4173';
const output = new URL('../tmp/screenshots/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
await mkdir(output, { recursive: true });
for (const width of [1440, 390, 320, 768]) {
  const page = await browser.newPage({ viewport: { width, height: width > 760 ? 1000 : 844 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1300);
  await page.screenshot({ path: `${output}/portfolio-${width}-hero.png` });
  const overflow = await page.evaluate(() => ({ body: document.body.scrollWidth, viewport: innerWidth, font: getComputedStyle(document.querySelector('h1')).fontFamily }));
  console.log(JSON.stringify({ width, overflow, errors }));
  if (width === 1440 || width === 390) {
    for (const section of ['projects', 'opportunities', 'about', 'experience', 'music', 'contact']) {
      await page.locator(`#${section}`).scrollIntoViewIfNeeded();
      await page.evaluate(id => document.getElementById(id).scrollIntoView({ behavior: 'instant', block: 'start' }), section);
      await page.waitForTimeout(1000);
      await page.screenshot({ path: `${output}/portfolio-${width}-${section}.png` });
    }
  }
  await page.close();
}
const social = await browser.newPage({ viewport: { width: 1200, height: 630 }, reducedMotion: 'reduce' });
await social.goto(base, { waitUntil: 'networkidle' });
await social.evaluate(() => document.fonts.ready);
await social.screenshot({ path: 'public/social-preview.png' });
await browser.close();
