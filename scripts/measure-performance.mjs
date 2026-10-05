import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

const label = process.argv[2] || 'current';
const base = process.env.PORTFOLIO_URL || 'http://127.0.0.1:4175';
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await cdp.send('Network.enable');
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
  await cdp.send('Performance.enable');
  await page.addInitScript(() => {
    window.__loadMetrics = { lcp: 0, cls: 0, longTasks: [] };
    new PerformanceObserver(list => { for (const entry of list.getEntries()) window.__loadMetrics.lcp = entry.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver(list => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__loadMetrics.cls += entry.value; }).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver(list => { for (const entry of list.getEntries()) window.__loadMetrics.longTasks.push(entry.duration); }).observe({ type: 'longtask', buffered: true });
  });
  await page.goto(base, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(3000);
  const result = await page.evaluate(() => ({ ...window.__loadMetrics,
    paints: performance.getEntriesByType('paint').map(p => ({ name: p.name, ms: p.startTime })),
    resources: performance.getEntriesByType('resource').map(r => ({ name: new URL(r.name).pathname, bytes: r.encodedBodySize, ms: Math.round(r.duration) })),
  }));
  const first = Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(m => [m.name, m.value]));
  await page.waitForTimeout(3000);
  const second = Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(m => [m.name, m.value]));
  result.heroCpuMsOver3s = Math.round((second.TaskDuration - first.TaskDuration) * 1000);
  result.conditions = 'Local production preview, Chromium, 390px, cold cache, 4x CPU slowdown; no network throttle. Synthetic, not field Web Vitals.';
  await mkdir('tmp/performance', { recursive: true });
  await writeFile(`tmp/performance/${label}.json`, JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result));
} finally { await browser.close(); }
