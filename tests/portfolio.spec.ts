import { expect, test, type Page } from '@playwright/test';
import { readFile } from 'node:fs/promises';

const emailApi = '**/api.emailjs.com/**';
const message = 'I would like to discuss an engineering opportunity.';

async function fillContact(page: Page) {
  await page.getByLabel('Your name', { exact: true }).fill('Portfolio visitor');
  await page.getByLabel('Email address', { exact: true }).fill('visitor@example.com');
  await page.getByLabel('Your message').fill(message);
}

test.beforeEach(async ({ page }) => {
  // No test may deliver an actual email, including validation regressions.
  await page.route(emailApi, route => route.abort());
});

test('first load uses local fonts and responsive images; offscreen canvas stops', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const requests: string[] = [];
  page.on('request', request => requests.push(request.url()));
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const fonts = await page.evaluate(() => [...document.fonts].filter(font => font.status === 'loaded').map(font => font.family));
  expect(fonts).toContain('Bricolage Grotesque');
  expect(fonts).toContain('Manrope');
  expect(requests.some(url => /fonts\.(googleapis|gstatic)\.com/.test(url))).toBe(false);
  const project = page.locator('.sp-qa-screen');
  await project.scrollIntoViewIfNeeded();
  await project.evaluate((image: HTMLImageElement) => image.decode());
  expect(await project.evaluate((image: HTMLImageElement) => image.currentSrc)).toContain('/qaforge-960.webp');
  const bike = page.locator('.story-ride img');
  await bike.scrollIntoViewIfNeeded();
  await bike.evaluate((image: HTMLImageElement) => image.decode());
  expect(await bike.evaluate((image: HTMLImageElement) => image.currentSrc)).toContain('/ayush-cb350rs-540.webp');
  const canvas = page.locator('canvas.signal-sculpture');
  await page.waitForTimeout(150);
  const still = await canvas.evaluate((node: HTMLCanvasElement) => node.toDataURL());
  await page.waitForTimeout(150);
  expect(await canvas.evaluate((node: HTMLCanvasElement) => node.toDataURL())).toBe(still);
});

for (const width of [320, 390, 1440]) {
  test(`readable page and no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Ayush Kulal', exact: true })).toBeVisible();
    await expect(page.getByRole('form', { name: 'Send Ayush a message' })).toBeAttached();
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
    for (const id of ['projects', 'opportunities', 'about', 'experience', 'contact']) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
    expect(errors).toEqual([]);
  });
}

test('mobile navigation closes with Escape, restores focus, and follows links', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Résumé' })).toHaveAttribute('href', '/resume_ayush.pdf');
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Work', exact: true }).focus();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Open navigation' })).toBeFocused();
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toHaveCount(0);
});

test('motion preference persists and pauses the canvas', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Pause motion' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
  await page.reload();
  await expect(page.getByRole('button', { name: 'Enable motion' })).toHaveAttribute('aria-pressed', 'true');
  const canvas = page.locator('canvas.signal-sculpture');
  await expect.poll(() => canvas.evaluate((node: HTMLCanvasElement) => node.width)).toBeGreaterThan(0);
  const still = await canvas.evaluate((node: HTMLCanvasElement) => node.toDataURL());
  await page.waitForTimeout(150);
  expect(await canvas.evaluate((node: HTMLCanvasElement) => node.toDataURL())).toBe(still);
  await page.getByRole('button', { name: 'Enable motion' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'on');
});

test('device reduced motion keeps content visible and canvas still', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
  await expect(page.getByRole('button', { name: 'Motion off: device preference' })).toBeDisabled();
  await expect(page.getByRole('heading', { name: 'Ayush Kulal', exact: true })).toBeVisible();
  const canvas = page.locator('canvas.signal-sculpture');
  await expect.poll(() => canvas.evaluate((node: HTMLCanvasElement) => node.width)).toBeGreaterThan(0);
  const still = await canvas.evaluate((node: HTMLCanvasElement) => node.toDataURL());
  await page.waitForTimeout(150);
  expect(await canvas.evaluate((node: HTMLCanvasElement) => node.toDataURL())).toBe(still);
});

test('contact validation identifies each field and focuses the first error', async ({ page }) => {
  let requests = 0;
  await page.route(emailApi, route => { requests++; return route.abort(); });
  await page.goto('/');
  await page.getByRole('button', { name: 'Send message', exact: true }).click();
  await expect(page.getByLabel('Your name', { exact: true })).toBeFocused();
  await expect(page.getByText('Please enter your name.', { exact: true })).toBeVisible();
  await expect(page.getByText('Please enter a valid email address.', { exact: true })).toBeVisible();
  await expect(page.getByText('Write a message before sending.', { exact: true })).toBeVisible();
  await page.getByLabel('Your name', { exact: true }).fill('Visitor');
  await page.getByLabel('Email address', { exact: true }).fill('not-an-email');
  await page.getByLabel('Your message').fill(message);
  await page.getByRole('button', { name: 'Send message', exact: true }).click();
  await expect(page.getByLabel('Email address', { exact: true })).toBeFocused();
  await expect(page.getByLabel('Email address', { exact: true })).toHaveAttribute('aria-invalid', 'true');
  expect(requests).toBe(0);
});

test('contact has a pending state, sends once, and clears after success', async ({ page }) => {
  let release: () => void = () => {};
  const pending = new Promise<void>(resolve => { release = resolve; });
  let requests = 0;
  let sendsVisitorFields = false;
  await page.route(emailApi, async route => {
    requests++;
    const payload = route.request().postData() ?? '';
    sendsVisitorFields = ['Portfolio visitor', 'visitor@example.com', message].every(value => payload.includes(value));
    await pending;
    await route.fulfill({ status: 200, contentType: 'text/plain', body: 'OK' });
  });
  await page.goto('/');
  await fillContact(page);
  await page.getByRole('button', { name: 'Send message', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Sending message…' })).toBeDisabled();
  await expect.poll(() => requests).toBe(1);
  expect(sendsVisitorFields).toBe(true);
  await expect(page.getByRole('form', { name: 'Send Ayush a message' })).toHaveAttribute('aria-busy', 'true');
  for (const label of ['Your name', 'Email address', 'Your message']) {
    await expect(page.getByLabel(label, { exact: true })).toBeEnabled();
    await expect(page.getByLabel(label, { exact: true })).not.toBeEditable();
  }
  await expect(page.getByLabel('Your message')).toHaveValue(message);
  await page.getByRole('form', { name: 'Send Ayush a message' }).evaluate((form: HTMLFormElement) => form.requestSubmit());
  expect(requests).toBe(1);
  release();
  await expect(page.getByText('Message sent. Thanks for reaching out!', { exact: true })).toBeVisible();
  await expect(page.getByLabel('Your message')).toHaveValue('');
  await expect(page.getByRole('button', { name: 'Send message', exact: true })).toBeEnabled();
  await expect(page.getByRole('form', { name: 'Send Ayush a message' })).toHaveAttribute('aria-busy', 'false');
  await expect(page.getByLabel('Your message')).toBeEditable();
  expect(requests).toBe(1);
});

test('contact failure preserves the message and provides direct email', async ({ page }) => {
  await page.route(emailApi, route => route.fulfill({ status: 500, contentType: 'text/plain', body: 'Unavailable' }));
  await page.goto('/');
  await fillContact(page);
  await page.getByRole('button', { name: 'Send message', exact: true }).click();
  await expect(page.getByText('Your message couldn’t be sent.', { exact: false })).toBeVisible();
  await expect(page.getByLabel('Your message')).toHaveValue(message);
  await expect(page.getByRole('link', { name: 'email me directly' })).toHaveAttribute('href', 'mailto:ayushkulal20@gmail.com');
  await expect(page.getByRole('button', { name: 'Send message', exact: true })).toBeEnabled();
});

test('résumé links serve the exact latest PDF', async ({ page, request }) => {
  await page.goto('/');
  const links = page.locator('a[href$=".pdf"]');
  await expect(links).toHaveCount(3);
  for (const link of await links.all()) await expect(link).toHaveAttribute('href', '/resume_ayush.pdf');
  const href = await page.getByRole('link', { name: 'Résumé', exact: true }).first().getAttribute('href');
  expect(href).toBe('/resume_ayush.pdf');
  const response = await request.get(href!);
  expect(response.ok()).toBe(true);
  const body = await response.body();
  expect(body.subarray(0, 5).toString()).toBe('%PDF-');
  expect(body).toEqual(await readFile('public/resume_ayush.pdf'));
});

test('unknown routes show the 404 page and return home', async ({ page }) => {
  await page.goto('/this-page-does-not-exist');
  await expect(page.getByRole('heading', { name: '404', exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Return to Home' }).click();
  await expect(page.getByRole('heading', { name: 'Ayush Kulal', exact: true })).toBeVisible();
});

test('hiring and project options work with a keyboard and keep their next steps clear', async ({ page }) => {
  await page.goto('/');
  const hiring = page.getByRole('button', { name: 'I’m hiring an engineer' });
  const project = page.getByRole('button', { name: 'I have a project in mind' });
  await expect(hiring).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('link', { name: 'View my résumé' })).toHaveAttribute('href', '/resume_ayush.pdf');
  await project.focus();
  await page.keyboard.press('Enter');
  await expect(project).toHaveAttribute('aria-pressed', 'true');
  await expect(hiring).toHaveAttribute('aria-pressed', 'false');
  await expect(page.getByText('Websites & landing pages', { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Discuss your project' })).toHaveAttribute('href', '#contact');
  await expect(page.getByRole('link', { name: 'View my résumé' })).toHaveCount(0);
  await hiring.focus();
  await page.keyboard.press('Space');
  await expect(hiring).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('link', { name: 'Explore my experience' })).toHaveAttribute('href', '#experience');
  await page.getByRole('link', { name: 'Let’s build your website' }).click();
  await expect(project).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('link', { name: 'Discuss your project' })).toBeVisible();
});
