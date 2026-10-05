import { chromium } from '@playwright/test';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);
await page.screenshot({ path: 'F:/Temp/opencode/r-hero.png' });
for (const id of ['about', 'skills', 'projects', 'experience', 'music', 'contact']) {
  await page.evaluate((i) => document.getElementById(i)?.scrollIntoView(), id);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `F:/Temp/opencode/r-${id}.png` });
}
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(800);
await page.screenshot({ path: 'F:/Temp/opencode/r-footer.png' });

const mp = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mp.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await mp.waitForTimeout(2000);
await mp.screenshot({ path: 'F:/Temp/opencode/r-mobile.png' });
await mp.evaluate(() => document.getElementById('skills')?.scrollIntoView());
await mp.waitForTimeout(900);
await mp.screenshot({ path: 'F:/Temp/opencode/r-mobile-skills.png' });
console.log('done, console errors:', errors.length, errors.slice(0, 5));
await browser.close();
