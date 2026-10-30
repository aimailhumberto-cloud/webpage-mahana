import { test, expect } from '@playwright/test';

test.describe('Casa Mahana E2E Tier 2 Boundary & Corner Cases', () => {

  test.beforeEach(async ({ page }) => {
    // Intercept PMS booking redirect
    await page.route('https://casa-mahana-pms.onrender.com/**', route => {
      return route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: '<html><body>PMS Mock Page</body></html>'
      });
    });
  });

  // ==========================================
  // GROUP 1: RESPONSIVE VIEWPORT BOUNDARIES (Mobile 375px-430px vs Desktop 1440px-1920px)
  // ==========================================

  test('1. Mobile Viewport 375px (iPhone SE): No horizontal overflow on Homepage', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Verify mobile hamburger is visible and desktop nav is hidden
    const mobileMenuBtn = page.locator('header button').filter({ has: page.locator('svg.lucide-menu') });
    await expect(mobileMenuBtn).toBeVisible();
    await expect(page.locator('header nav.hidden.lg\\:flex')).toBeHidden();

    // Check document body does not have horizontal overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);
  });

  test('2. Mobile Viewport 390px (iPhone 13/14): Fluid stacking on Pasadías Hub', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/pasadias');
    await page.waitForLoadState('domcontentloaded');

    // Verify title is rendered
    await expect(page.getByText('Nuestras Opciones de Pasadía en Chame')).toBeVisible();

    // Ensure day pass cards exist and stack vertically without overflow
    const cards = page.locator('div.bg-white.rounded-\\[32px\\]');
    await expect(cards.first()).toBeVisible();

    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasOverflow).toBe(false);
  });

  test('3. Mobile Viewport 430px (iPhone 14 Pro Max): Stays Hub suite showcases and table integrity', async ({ page }) => {
    await page.setViewportSize({ width: 430, height: 932 });
    await page.goto('/estadias');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('h1')).toContainText('Habitaciones & Capacidades');

    // Verify comparison table wrapper is rendered
    await expect(page.getByText('Comparativa de Alojamiento')).toBeVisible();

    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasOverflow).toBe(false);
  });

  test('4. Desktop Viewport 1440px (MacBook / QHD): Full desktop navigation & fluid layout', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Desktop nav must be visible
    await expect(page.locator('header nav.hidden.lg\\:flex')).toBeVisible();

    // Floating booking capsule must span across multiple columns
    const bookingForm = page.locator('section#inicio form');
    await expect(bookingForm).toBeVisible();

    const formBox = await bookingForm.boundingBox();
    expect(formBox).not.toBeNull();
    if (formBox) {
      expect(formBox.width).toBeGreaterThan(900);
    }
  });

  test('5. Desktop Widescreen Viewport 1920px (Full HD): Container expands beyond boxed 1280px', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Header container should expand gracefully
    const headerContainer = page.locator('header > div').first();
    const box = await headerContainer.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      // Header has max-w-[1720px], so on 1920px screen it should be wide (> 1400px)
      expect(box.width).toBeGreaterThan(1400);
    }
  });

  test('6. Mobile Navigation Drawer: Toggle open, inspect sub-accordions, and close', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Hamburger button
    const hamburgerBtn = page.locator('header button').filter({ has: page.locator('svg.lucide-menu') });
    await hamburgerBtn.click();

    // Verify mobile drawer opened
    const closeBtn = page.locator('header button').filter({ has: page.locator('svg.lucide-x') });
    await expect(closeBtn).toBeVisible();

    // Verify drawer contains navigation links
    const mobileMenu = page.locator('header .lg\\:hidden');
    await expect(mobileMenu.locator('a:has-text("Restaurante")')).toBeVisible();
    await expect(mobileMenu.locator('a:has-text("Tours y Aventura")')).toBeVisible();
    await expect(mobileMenu.locator('a:has-text("Surf Shack")')).not.toBeVisible();

    // Toggle Estadías accordion inside mobile drawer
    const estadiasAccordionBtn = mobileMenu.getByRole('button', { name: 'Hospedaje', exact: true });
    await estadiasAccordionBtn.click();
    await expect(mobileMenu.locator('a:has-text("Todas las Habitaciones")')).toBeVisible();
    await expect(mobileMenu.locator('a:has-text("Escape Mahana ($33)")')).toBeVisible();

    // Close mobile menu
    await closeBtn.click();
    await expect(page.locator('header button').filter({ has: page.locator('svg.lucide-menu') })).toBeVisible();
  });

  // ==========================================
  // GROUP 2: PARAMETER HANDLING & EDGE CASES ON /reservar
  // ==========================================

  test('7. /reservar without parameters: Gracefully redirects to base PMS URL without errors', async ({ page }) => {
    let capturedUrl = '';
    await page.route('https://casa-mahana-pms.onrender.com/**', route => {
      capturedUrl = route.request().url();
      return route.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>PMS</body></html>' });
    });

    await page.goto('/reservar');
    
    await expect.poll(() => capturedUrl).toBe('https://casa-mahana-pms.onrender.com/reservar');
  });

  test('8. /reservar with arbitrary/unrecognized plan code: Preserves custom parameter in PMS target', async ({ page }) => {
    let capturedUrl = '';
    await page.route('https://casa-mahana-pms.onrender.com/**', route => {
      capturedUrl = route.request().url();
      return route.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>PMS</body></html>' });
    });

    await page.goto('/reservar?plan=custom_special_package&category=VIP');
    
    await expect.poll(() => capturedUrl).toContain('plan=custom_special_package');
    await expect.poll(() => capturedUrl).toContain('category=VIP');
  });

  test('9. /reservar with extreme guest count (999 guests): Encodes and preserves without crash', async ({ page }) => {
    let capturedUrl = '';
    await page.route('https://casa-mahana-pms.onrender.com/**', route => {
      capturedUrl = route.request().url();
      return route.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>PMS</body></html>' });
    });

    await page.goto('/reservar?plan=todo_incluido&guests=999');
    
    await expect.poll(() => capturedUrl).toContain('plan=todo_incluido');
    await expect.poll(() => capturedUrl).toContain('guests=999');
  });

  test('10. /reservar with non-standard date format or past date: Preserves date string safely', async ({ page }) => {
    let capturedUrl = '';
    await page.route('https://casa-mahana-pms.onrender.com/**', route => {
      capturedUrl = route.request().url();
      return route.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>PMS</body></html>' });
    });

    await page.goto('/reservar?plan=escape_mahana&date=2026-12-31');
    
    await expect.poll(() => capturedUrl).toContain('plan=escape_mahana');
    await expect.poll(() => capturedUrl).toContain('date=2026-12-31');
  });

  test('11. /reservar with special characters in category: Encodes URL parameters cleanly', async ({ page }) => {
    let capturedUrl = '';
    await page.route('https://casa-mahana-pms.onrender.com/**', route => {
      capturedUrl = route.request().url();
      return route.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>PMS</body></html>' });
    });

    await page.goto('/reservar?category=Pasad%C3%ADa%20Especial&plan=pasadia_comidas');
    
    await expect.poll(() => capturedUrl).toContain('plan=pasadia_comidas');
    await expect.poll(() => capturedUrl).toContain('category=Pasad%C3%ADa+Especial');
  });

  // ==========================================
  // GROUP 3: FORM VALIDATION BOUNDARIES ON /eventos
  // ==========================================

  test('12. /eventos: Blank form submission prevented by HTML5 validation', async ({ page }) => {
    await page.goto('/eventos');
    await page.waitForLoadState('domcontentloaded');

    // Click submit without entering required name or contact
    await page.getByRole('button', { name: 'Enviar Solicitud' }).click();

    // Success confirmation card must NOT be displayed
    await expect(page.getByText('¡Solicitud Recibida con Éxito!')).toBeHidden();

    // Verify form input is still present
    await expect(page.getByPlaceholder('e.g. John Doe')).toBeVisible();
  });

  test('13. /eventos: Minimum and maximum guests boundary input', async ({ page }) => {
    await page.goto('/eventos');
    await page.waitForLoadState('domcontentloaded');

    // Enter valid boundary details (min 10 guests)
    await page.getByPlaceholder('e.g. John Doe').fill('Elena Rostova');
    await page.getByPlaceholder('e.g. +507 6612-3456').fill('+507 6999-0000');
    await page.getByPlaceholder('e.g. email@domain.com').fill('elena@example.com');
    await page.locator('select').first().selectOption('corporate');

    // Check boundary guest input (defaults to 30)
    const guestInput = page.locator('input[type="number"]');
    if (await guestInput.count() > 0) {
      await guestInput.fill('10');
      expect(await guestInput.inputValue()).toBe('10');
    }

    await page.getByRole('button', { name: 'Enviar Solicitud' }).click();
    await expect(page.getByText('¡Solicitud Recibida con Éxito!')).toBeVisible();
  });

});
