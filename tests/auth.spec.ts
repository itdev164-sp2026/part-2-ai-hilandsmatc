import { test, expect } from '@playwright/test';
import { config as loadEnv } from 'dotenv';

// Load .env.local so credential variables are available to the test worker
loadEnv({ path: '.env.local' });

// Read credentials at runtime inside tests to avoid import-time env timing issues

test.describe('Authentication E2E', () => {
  test('LOGIN PAGE VISIBLE — shows email, password and submit button', async ({ page }) => {
    const base = process.env.BASE_URL ?? process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';
    await page.goto(`${base}/login`);

    const email = page.getByLabel(/email/i);
    const password = page.getByLabel(/password/i);
    const submit = page.getByRole('button', { name: /sign in|log in|submit|continue/i });

    await expect(email).toBeVisible();
    await expect(password).toBeVisible();
    await expect(submit).toBeVisible();
  });

  test('REDIRECT AFTER LOGIN — successful login redirects to dashboard or projects', async ({ page }) => {
    const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL;
    const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD;
    test.skip(!TEST_USER_EMAIL || !TEST_USER_PASSWORD, 'TEST_USER_EMAIL and TEST_USER_PASSWORD not set; skipping credentialed test');

    const base = process.env.BASE_URL ?? process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';
    await page.goto(`${base}/login`);
    await page.getByLabel(/email/i).fill(TEST_USER_EMAIL as string);
    await page.getByLabel(/password/i).fill(TEST_USER_PASSWORD as string);

    await Promise.all([
      page.waitForURL(
        (url) =>
          url.pathname === '/' || url.pathname.startsWith('/projects') || url.pathname.startsWith('/dashboard'),
        { timeout: 10000 }
      ),
      page.getByRole('button', { name: /sign in|log in|submit|continue/i }).click(),
    ]);

    const current = new URL(page.url()).pathname;
    expect([
      '/',
      '/projects',
    ].some((p) => current === p || current.startsWith(p))).toBeTruthy();
  });

  test('SIDEBAR NAVIGATION — shows Overview, Projects, Settings after login', async ({ page }) => {
    const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL;
    const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD;
    test.skip(!TEST_USER_EMAIL || !TEST_USER_PASSWORD, 'TEST_USER_EMAIL and TEST_USER_PASSWORD not set; skipping credentialed test');

    const base = process.env.BASE_URL ?? process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';
    await page.goto(`${base}/login`);
    await page.getByLabel(/email/i).fill(TEST_USER_EMAIL as string);
    await page.getByLabel(/password/i).fill(TEST_USER_PASSWORD as string);

    await Promise.all([
      page.waitForURL(
        (url) =>
          url.pathname === '/' || url.pathname.startsWith('/projects') || url.pathname.startsWith('/dashboard'),
        { timeout: 10000 }
      ),
      page.getByRole('button', { name: /sign in|log in|submit|continue/i }).click(),
    ]);

    // Use .first() to pick the primary sidebar link when multiple elements
    // (breadcrumb + sidebar) resolve to the same accessible name.
    const overview = page.getByRole('link', { name: /Overview/i }).first();
    const projects = page.getByRole('link', { name: /Projects/i }).first();
    const settings = page.getByRole('link', { name: /Settings/i }).first();

    await expect(overview).toBeVisible({ timeout: 5000 });
    await expect(projects).toBeVisible({ timeout: 5000 });
    await expect(settings).toBeVisible({ timeout: 5000 });
  });
});
