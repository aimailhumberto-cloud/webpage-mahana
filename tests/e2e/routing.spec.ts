import { test, expect } from '@playwright/test';

test.describe('Casa Mahana - Multi-Page & Weddings E2E Verification Suite', () => {

  test('R1. Render /estadias with detailed rooms, capacities, and comparison table', async ({ page }) => {
    // Navigate directly to Stays Hub
    await page.goto('/estadias');
    await page.waitForLoadState('networkidle');

    // Verify Title & Subtitle
    await expect(page.locator('h1')).toContainText('Habitaciones & Capacidades');
    await expect(page.locator('p').first()).toContainText('Elige la distribución perfecta');

    // Verify Room Cards presence and text
    await expect(page.locator('h2:has-text("Habitación Doble")')).toBeVisible();
    await expect(page.locator('h2:has-text("Habitación Estándar")')).toBeVisible();
    await expect(page.locator('h2:has-text("Habitación Familiar")')).toBeVisible();
    await expect(page.locator('h2:has-text("Camping Comfort")')).toBeVisible();

    // Verify Specific Bedding and Capacity info
    await expect(page.locator('text=2 Camas Dobles').first()).toBeVisible();
    await expect(page.locator('text=1 Cama Doble + 4 Camas Sencillas').first()).toBeVisible();
    await expect(page.locator('text=1 Colchón Doble Confort').first()).toBeVisible();

    // Verify Room Comparison Table
    await expect(page.getByText('Comparativa de Alojamiento')).toBeVisible();
    await expect(page.getByText('Max Capacity')).toBeHidden(); // Because we are in Spanish
    await expect(page.getByText('Capacidad Máx.')).toBeVisible();

    // Test English Switch
    await page.getByLabel('Switch Language').first().click();
    await page.waitForTimeout(200);

    // Verify English Translations
    await expect(page.locator('h1')).toContainText('Rooms & Capacities');
    await expect(page.locator('h2:has-text("Double Room")')).toBeVisible();
    await expect(page.locator('text=2 Double Beds').first()).toBeVisible();
    await expect(page.locator('text=1 Double Bed + 4 Single Beds').first()).toBeVisible();
    await expect(page.getByText('Max Capacity')).toBeVisible();
  });

  test('R2. Render /pasadias hub with day pass plans & direct booking triggers', async ({ page }) => {
    // Intercept PMS booking redirect
    let redirectedUrl = '';
    await page.route('https://casa-mahana-pms.onrender.com/**', route => {
      redirectedUrl = route.request().url();
      return route.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>PMS</body></html>' });
    });

    await page.goto('/pasadias');
    await page.waitForLoadState('networkidle');

    // Verify Title
    await expect(page.getByText('Nuestras Opciones de Pasadía en Chame')).toBeVisible();
    
    // Verify specific plan rates
    await expect(page.getByText('$38.50')).toBeVisible();
    await expect(page.getByText('$5.50')).toBeVisible();

    // Clicking exact 'Reservar' button on the day pass card redirects to /reservar with correct pre-filled plan
    await page.getByRole('button', { name: 'Reservar', exact: true }).first().click();
    
    // Verify PMS redirect URL captures the planCode and category
    await expect.poll(() => redirectedUrl).toContain('plan=pasadia_comidas');
    await expect.poll(() => redirectedUrl).toContain('category=Pasad%C3%ADa');
  });

  test('R3. Render /restaurante and check digital menu pricing', async ({ page }) => {
    await page.goto('/restaurante');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('h1')).toContainText('Restaurante');
    await expect(page.getByRole('heading', { name: 'Pizza Pepperoni' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Ceviche de la Casa' })).toBeVisible();
    await expect(page.getByText('$14.50')).toBeVisible(); // Pizza price badge
    await expect(page.getByText('$9.50')).toBeVisible();  // Ceviche price badge
  });

  test('R4. Render /surf-shack and verify permanent redirect to home page', async ({ page }) => {
    await page.goto('/surf-shack');
    await page.waitForLoadState('networkidle');

    // Closed venue should gracefully redirect to home
    await expect(page).toHaveURL('/');
  });

  test('R5. Render /eventos, submit Weddings Inquiry Form, and verify confirmation card', async ({ page }) => {
    await page.goto('/eventos');
    await page.waitForLoadState('networkidle');

    // Verify Title
    await expect(page.getByRole('heading', { name: 'Eventos & Bodas' })).toBeVisible();
    await expect(page.getByText('Bodas de Ensueño')).toBeVisible();
    await expect(page.getByText('Retiros & Team Building')).toBeVisible();

    // Fill form
    await page.getByPlaceholder('e.g. John Doe').fill('Alex Rivera');
    await page.getByPlaceholder('e.g. +507 6612-3456').fill('66882211');
    await page.getByPlaceholder('e.g. email@domain.com').fill('alex.rivera@example.com');
    await page.locator('select').first().selectOption('wedding');
    await page.getByPlaceholder('...').fill('We are planning a beachfront wedding for November 2026.');

    // Submit form
    await page.getByRole('button', { name: 'Enviar Solicitud' }).click();

    // Verify success confirmation card displays
    await expect(page.getByText('¡Solicitud Recibida con Éxito!')).toBeVisible();
    await expect(page.getByText('Tu consulta ha sido enviada al equipo de eventos')).toBeVisible();

    // Can reset form
    await page.getByRole('button', { name: 'Volver a Cotizar' }).click();
    await expect(page.getByPlaceholder('e.g. John Doe')).toHaveValue('');
  });

});
