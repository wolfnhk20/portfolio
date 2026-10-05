// Delivery-format conversion only: preserves the existing photo edits and crops.
import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';

const base = process.env.PORTFOLIO_URL || 'http://127.0.0.1:4175';
const images = [
  ['ayush-portrait.jpg', 'ayush-portrait.webp', 800, .86],
  ['ayush-cb350rs.jpg', 'ayush-cb350rs.webp', 900, .86],
  ['ayush-cb350rs.jpg', 'ayush-cb350rs-540.webp', 540, .86],
  ['qaforge.png', 'qaforge.webp', 1919, .92],
  ['qaforge.png', 'qaforge-960.webp', 960, .92],
  ['bloom.png', 'bloom.webp', 1918, .92],
  ['bloom.png', 'bloom-960.webp', 960, .92],
];
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto(base);
  for (const [source, output, width, quality] of images) {
    const data = await page.evaluate(async ({ source, width, quality }) => {
      const image = new Image();
      image.src = `/${source}`;
      await image.decode();
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = Math.round(image.naturalHeight * width / image.naturalWidth);
      const context = canvas.getContext('2d');
      context.imageSmoothingQuality = 'high';
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL('image/webp', quality).split(',')[1];
    }, { source, width, quality });
    const bytes = Buffer.from(data, 'base64');
    await writeFile(`public/${output}`, bytes);
    console.log(`${output}: ${bytes.length} bytes`);
  }
} finally { await browser.close(); }
