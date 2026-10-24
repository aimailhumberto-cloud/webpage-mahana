import { test, expect } from '@playwright/test';

test.describe('Casa Mahana E2E Tier 3 Cross-Feature Combination Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Intercept PMS booking redirect cleanly
    await page.route('https://casa-mahana-pms.onrender.com/**', route => {
      return route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: '<html><body>PMS Mock Page</body></html>'
      });
    });
  });

  test('1. i18n Language Persistence across Client-Side Route Navigation', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Switch to English
    const switcher = page.locator('button[aria-label="Switch Language"]').first();
    await switcher.click();
    await page.waitForTimeout(100);

    // Verify Homepage is in English
    await expect(page.locator('text=Your Tropical Sanctuary in the Heart of Chame')).toBeVisible();

    // Navigate to Stays Hub via header link
    await page.locator('header nav a:has-text("Home")').first().waitFor();
    await page.goto('/estadias');
    await page.waitForLoadState('domcontentloaded');

    // Verify Stays Hub rendered in English without resetting
    await expect(page.locator('h1')).toContainText('Rooms & Capacities');
    await expect(page.getByText('Max Capacity')).toBeVisible();

    // Navigate to Pasadías Hub
    await page.goto('/pasadias');
    await page.waitForLoadState('domcontentloaded');

    // Verify Pasadías Hub is in English
    await expect(page.getByText('Our Day Pass Packages in Chame')).toBeVisible();

    // Check localStorage persistence
    const savedLanguage = await page.evaluate(() => localStorage.getItem('language'));
    expect(savedLanguage).toBe('en');
  });

  test('2. i18n Language Persistence across Page Reload', async ({ page }) => {
    await page.goto('/surf-shack');
    await page.waitForLoadState('domcontentloaded');

    // Switch to English
    const switcher = page.locator('button[aria-label="Switch Language"]').first();
    await switcher.click();
    await page.waitForTimeout(100);

    // Verify English text
    await expect(page.getByRole('heading', { name: 'National Surf Academy' })).toBeVisible();

    // Reload page
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    // Must remain in English
    await expect(page.getByRole('heading', { name: 'National Surf Academy' })).toBeVisible();
    const savedLanguage = await page.evaluate(() => localStorage.getItem('language'));
    expect(savedLanguage).toBe('en');
  });

  test('3. Reactive SEO Metadata Updates across Route Transitions & Language Toggling', async ({ page }) => {
    await page.goto('/estadias');
    await page.waitForLoadState('domcontentloaded');

    // Verify Spanish SEO Title
    await expect(page).toHaveTitle(/Habitaciones y Tarifas|Casa Mahana/);

    // Toggle language to English
    const switcher = page.locator('button[aria-label="Switch Language"]').first();
    await switcher.click();
    await page.waitForTimeout(150);

    // Title should dynamically update to English
    await expect(page).toHaveTitle(/Rooms & Suites|Casa Mahana/);

    // Navigate to Restaurante
    await page.goto('/restaurante');
    await page.waitForLoadState('domcontentloaded');

    // Title should update for restaurant in English
    await expect(page).toHaveTitle(/Wood-Fired Gourmet Restaurant|Casa Mahana/);
  });

  test('4. Marketing Attribution Continuity: UTM & Click ID Forwarding to PMS Booking URL', async ({ page }) => {
    let capturedPmsUrl = '';
    await page.route('https://casa-mahana-pms.onrender.com/**', route => {
      capturedPmsUrl = route.request().url();
      return route.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>PMS</body></html>' });
    });

    // Guest lands with marketing campaign parameters
    await page.goto('/?utm_source=meta_ads&utm_medium=social_cpc&utm_campaign=summer_escape&gclid=gclid_mock_999');
    await page.waitForLoadState('domcontentloaded');

    // Check attribution was captured in sessionStorage
    const attributionData = await page.evaluate(() => {
      return sessionStorage.getItem('mahana_attribution_v1');
    });
    expect(attributionData).not.toBeNull();
    expect(attributionData).toContain('meta_ads');
    expect(attributionData).toContain('summer_escape');

    // Guest browses to Pasadías Hub
    await page.goto('/pasadias');
    await page.waitForLoadState('domcontentloaded');

    // Guest clicks booking button on the All-Inclusive Day Pass
    await page.getByRole('button', { name: 'Reservar', exact: true }).first().click();

    // Verify PMS target URL preserved both functional and marketing parameters
    await expect.poll(() => capturedPmsUrl).toContain('plan=pasadia_comidas');
    await expect.poll(() => capturedPmsUrl).toContain('utm_source=meta_ads');
    await expect.poll(() => capturedPmsUrl).toContain('utm_medium=social_cpc');
    await expect.poll(() => capturedPmsUrl).toContain('utm_campaign=summer_escape');
    await expect.poll(() => capturedPmsUrl).toContain('gclid=gclid_mock_999');
  });

  test('5. Homepage Floating Booking Capsule: Interacts with dates/plans/guests and redirects to PMS', async ({ page }) => {
    let capturedPmsUrl = '';
    await page.route('https://casa-mahana-pms.onrender.com/**', route => {
      capturedPmsUrl = route.request().url();
      return route.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>PMS</body></html>' });
    });

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Select plan: Escape Mahana
    const planSelect = page.locator('section#inicio select').first();
    await planSelect.selectOption({ value: 'escape_mahana' });

    // Select guests: 4 Personas
    const guestsSelect = page.locator('section#inicio select').nth(1);
    await guestsSelect.selectOption({ value: '4' });

    // Set check-in date
    const dateInput = page.locator('section#inicio input[type="date"]');
    await dateInput.fill('2026-11-20');

    // Click submit
    await page.locator('section#inicio button[type="submit"]').click();

    // Verify PMS URL received parameters
    await expect.poll(() => capturedPmsUrl).toContain('plan=escape_mahana');
    await expect.poll(() => capturedPmsUrl).toContain('guests=4');
    await expect.poll(() => capturedPmsUrl).toContain('date=2026-11-20');
  });

  test('6. Header Desktop CTA: Direct PMS booking redirect', async ({ page }) => {
    let capturedPmsUrl = '';
    await page.route('https://casa-mahana-pms.onrender.com/**', route => {
      capturedPmsUrl = route.request().url();
      return route.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>PMS</body></html>' });
    });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Click desktop header CTA button
    const headerCta = page.locator('header button:has-text("Reservar Hospedaje")').first();
    await headerCta.click();

    await expect.poll(() => capturedPmsUrl).toContain('https://casa-mahana-pms.onrender.com/reservar');
  });

  test('7. Mobile Menu CTA: Booking redirection from mobile drawer', async ({ page }) => {
    let capturedPmsUrl = '';
    await page.route('https://casa-mahana-pms.onrender.com/**', route => {
      capturedPmsUrl = route.request().url();
      return route.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>PMS</body></html>' });
    });

    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Open mobile menu
    await page.locator('header button').filter({ has: page.locator('svg.lucide-menu') }).click();

    // Click mobile booking CTA
    const mobileCta = page.locator('header .lg\\:hidden button:has-text("Reservar Hospedaje")');
    await mobileCta.click();

    await expect.poll(() => capturedPmsUrl).toContain('https://casa-mahana-pms.onrender.com/reservar');
  });

  test('8. Estadías Hub Booking Action: Correctly passes mahana_exp and category to PMS', async ({ page }) => {
    let capturedPmsUrl = '';
    await page.route('https://casa-mahana-pms.onrender.com/**', route => {
      capturedPmsUrl = route.request().url();
      return route.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>PMS</body></html>' });
    });

    await page.goto('/estadias');
    await page.waitForLoadState('domcontentloaded');

    // Click "Reservar Habitación" on the first room card
    await page.locator('button:has-text("Reservar Habitación")').first().click();

    await expect.poll(() => capturedPmsUrl).toContain('plan=mahana_exp');
    await expect.poll(() => capturedPmsUrl).toContain('category=Estad%C3%ADa');
  });

});
