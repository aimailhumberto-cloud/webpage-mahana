import { test, expect } from '@playwright/test';

test.describe('Casa Mahana Website Booking Engine & Parameter Passing Suite', () => {

  test('B1. Hero Floating Booking Bar — Default plan and guest selection triggers correct PMS URL redirect', async ({ page }) => {
    let capturedPmsUrl = '';
    await page.route('https://casa-mahana-pms.onrender.com/**', route => {
      capturedPmsUrl = route.request().url();
      return route.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>Mock PMS</body></html>' });
    });

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Default plan is 'todo_incluido' and default guests is '2'
    const planSelect = page.locator('form select').first();
    await expect(planSelect).toHaveValue('todo_incluido');

    const guestsSelect = page.locator('form select').nth(1);
    await expect(guestsSelect).toHaveValue('2');

    // Submit booking form
    const submitBtn = page.locator('form button[type="submit"]');
    await submitBtn.click();

    await expect.poll(() => capturedPmsUrl).toContain('https://casa-mahana-pms.onrender.com/reservar');
    const parsed = new URL(capturedPmsUrl);
    expect(parsed.searchParams.get('plan')).toBe('todo_incluido');
    expect(parsed.searchParams.get('guests')).toBe('2');
  });

  test('B2. Hero Floating Booking Bar — Restaurant plan selection routes internally to /restaurante', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Select restaurant option
    const planSelect = page.locator('form select').first();
    await planSelect.selectOption('restaurante');

    // Submit booking form
    const submitBtn = page.locator('form button[type="submit"]');
    await submitBtn.click();

    // Verify it stays within SPA and navigates to /restaurante
    await page.waitForURL('**/restaurante');
    expect(page.url()).toContain('/restaurante');
    await expect(page.locator('h1')).toContainText('Restaurante');
  });

  test('B3. Hero Floating Booking Bar — Plan and Guest variants forward exact parameters', async ({ page }) => {
    let capturedPmsUrl = '';
    await page.route('https://casa-mahana-pms.onrender.com/**', route => {
      capturedPmsUrl = route.request().url();
      return route.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>Mock PMS</body></html>' });
    });

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Select Escape Mahana with 4 guests
    const planSelect = page.locator('form select').first();
    await planSelect.selectOption('escape_mahana');

    const guestsSelect = page.locator('form select').nth(1);
    await guestsSelect.selectOption('4');

    // Select future date
    const dateInput = page.locator('form input[type="date"]');
    await dateInput.fill('2026-12-25');

    // Submit
    const submitBtn = page.locator('form button[type="submit"]');
    await submitBtn.click();

    await expect.poll(() => capturedPmsUrl).toContain('https://casa-mahana-pms.onrender.com/reservar');
    const parsed = new URL(capturedPmsUrl);
    expect(parsed.searchParams.get('plan')).toBe('escape_mahana');
    expect(parsed.searchParams.get('guests')).toBe('4');
    expect(parsed.searchParams.get('date')).toBe('2026-12-25');
  });

  test('B4. Hero Floating Booking Bar — Day Pass plan selection forwards pasadia parameters', async ({ page }) => {
    let capturedPmsUrl = '';
    await page.route('https://casa-mahana-pms.onrender.com/**', route => {
      capturedPmsUrl = route.request().url();
      return route.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>Mock PMS</body></html>' });
    });

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Select Pool Day Access ($5.50)
    const planSelect = page.locator('form select').first();
    await planSelect.selectOption('pasadia_entrada');

    // Select 5+ guests
    const guestsSelect = page.locator('form select').nth(1);
    await guestsSelect.selectOption('5');

    // Submit
    await page.locator('form button[type="submit"]').click();

    await expect.poll(() => capturedPmsUrl).toContain('https://casa-mahana-pms.onrender.com/reservar');
    const parsed = new URL(capturedPmsUrl);
    expect(parsed.searchParams.get('plan')).toBe('pasadia_entrada');
    expect(parsed.searchParams.get('guests')).toBe('5');
  });

  test('B5. Direct URL parameter handling on /reservar forwards all query params', async ({ page }) => {
    let capturedPmsUrl = '';
    await page.route('https://casa-mahana-pms.onrender.com/**', route => {
      capturedPmsUrl = route.request().url();
      return route.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>Mock PMS</body></html>' });
    });

    await page.goto('/reservar?plan=pasadia_comidas&guests=3&category=pasadias&date=2026-11-15');

    await expect.poll(() => capturedPmsUrl).toContain('https://casa-mahana-pms.onrender.com/reservar');
    const parsed = new URL(capturedPmsUrl);
    expect(parsed.searchParams.get('plan')).toBe('pasadia_comidas');
    expect(parsed.searchParams.get('guests')).toBe('3');
    expect(parsed.searchParams.get('category')).toBe('pasadias');
    expect(parsed.searchParams.get('date')).toBe('2026-11-15');
  });

  test('B6. Navigation state parameter handling on /reservar', async ({ page }) => {
    let capturedPmsUrl = '';
    await page.route('https://casa-mahana-pms.onrender.com/**', route => {
      capturedPmsUrl = route.request().url();
      return route.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>Mock PMS</body></html>' });
    });

    await page.goto('/estadias');
    await page.waitForLoadState('domcontentloaded');

    // Navigate to /reservar via client router pushing state
    await page.evaluate(() => {
      window.history.pushState({ planCode: 'todo_incluido', guests: 4, category: 'estadias' }, '', '/reservar');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });

    // Alternatively, click a direct booking button in estadias
    const bookBtn = page.getByRole('button', { name: 'Reservar Todo Incluido' });
    if (await bookBtn.isVisible()) {
      await bookBtn.click();
    }

    await expect.poll(() => capturedPmsUrl).toContain('https://casa-mahana-pms.onrender.com/reservar');
  });

  test('B7. UTM Attribution forwarding through the booking funnel', async ({ page }) => {
    let capturedPmsUrl = '';
    await page.route('https://casa-mahana-pms.onrender.com/**', route => {
      capturedPmsUrl = route.request().url();
      return route.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>Mock PMS</body></html>' });
    });

    // Land with marketing campaign attribution
    await page.goto('/?utm_source=instagram&utm_medium=stories&utm_campaign=black_friday&gclid=gl_abc123');
    await page.waitForLoadState('domcontentloaded');

    // Submit booking from floating bar
    await page.locator('form button[type="submit"]').click();

    await expect.poll(() => capturedPmsUrl).toContain('https://casa-mahana-pms.onrender.com/reservar');
    const parsed = new URL(capturedPmsUrl);
    expect(parsed.searchParams.get('utm_source')).toBe('instagram');
    expect(parsed.searchParams.get('utm_medium')).toBe('stories');
    expect(parsed.searchParams.get('utm_campaign')).toBe('black_friday');
    expect(parsed.searchParams.get('gclid')).toBe('gl_abc123');
  });

  test('B8. Bilingual Language Toggle updates Booking Bar UI strings in real-time', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Check Spanish initial labels
    await expect(page.locator('form label').getByText('Experiencia / Plan')).toBeVisible();
    await expect(page.locator('form label').getByText('Huéspedes', { exact: true })).toBeVisible();
    await expect(page.locator('form label').getByText('Llegada')).toBeVisible();
    await expect(page.locator('form button[type="submit"]')).toContainText('Consultar Disponibilidad');

    // Toggle to English
    const langBtn = page.getByRole('button', { name: 'Switch Language' });
    await langBtn.click();

    // Verify English updated labels
    await expect(page.locator('form label').getByText('Experience / Plan')).toBeVisible();
    await expect(page.locator('form label').getByText('Guests', { exact: true })).toBeVisible();
    await expect(page.locator('form label').getByText('Check-In')).toBeVisible();
    await expect(page.locator('form button[type="submit"]')).toContainText('Check Availability');
  });

  test('B9. Header CTA "Reservar Hospedaje" triggers PMS booking redirect', async ({ page }) => {
    let capturedPmsUrl = '';
    await page.route('https://casa-mahana-pms.onrender.com/**', route => {
      capturedPmsUrl = route.request().url();
      return route.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>Mock PMS</body></html>' });
    });

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const headerBookBtn = page.getByRole('button', { name: 'Reservar Hospedaje' });
    await headerBookBtn.click();

    await expect.poll(() => capturedPmsUrl).toContain('https://casa-mahana-pms.onrender.com/reservar');
  });

});
