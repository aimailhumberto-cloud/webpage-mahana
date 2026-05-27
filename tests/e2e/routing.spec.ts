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
    await expect(page.locator('h2:has-text("Camping Confort")')).toBeVisible();

    // Verify Specific Bedding and Capacity info
    await expect(page.getByText('Camas: 2 Camas Queen de Lujo')).toBeVisible();
    await expect(page.getByText('Camas: 2 Camas King + 1 Litera (Bunk bed)')).toBeVisible();
    await expect(page.getByText('Camas: 1 Colchón Inflable Queen Premium')).toBeVisible();

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
    await expect(page.getByText('Beds: 2 Luxury Queen Beds')).toBeVisible();
    await expect(page.getByText('Beds: 2 Luxury King Beds + 1 Bunk Bed')).toBeVisible();
    await expect(page.getByText('Max Capacity')).toBeVisible();
  });

  test('R2. Render /pasadias hub with day pass plans & direct booking triggers', async ({ page }) => {
    await page.goto('/pasadias');
    await page.waitForLoadState('networkidle');

    // Verify Title
    await expect(page.getByText('Nuestras Opciones de Pasadía en Chame')).toBeVisible();
    
    // Verify specific plan rates
    await expect(page.getByText('$38.50')).toBeVisible();
    await expect(page.getByText('$15')).toBeVisible();

    // Clicking 'Reservar Pasadía' redirects to wizard with correct pre-filled plan
    await page.getByRole('button', { name: 'Reservar Pasadía' }).first().click();
    await page.waitForURL('**/reservar');
    
    // Verify that we are on the /reservar page
    const checkedDateInput = page.locator('input[type="date"]');
    await expect(checkedDateInput).toBeVisible();
  });

  test('R3. Render /restaurante and check digital menu pricing', async ({ page }) => {
    await page.goto('/restaurante');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('h1')).toContainText('Restaurante');
    await expect(page.getByText('Pizza Pepperoni')).toBeVisible();
    await expect(page.getByText('Ceviche de la Casa')).toBeVisible();
    await expect(page.getByText('$12.50')).toBeVisible(); // Combination pizza price
    await expect(page.getByText('$6.00')).toBeVisible();  // Ceviche price
  });

  test('R4. Render /surf-shack and check Surf Academy options', async ({ page }) => {
    await page.goto('/surf-shack');
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('heading', { name: 'Surf Shack & Academia' })).toBeVisible();
    await expect(page.getByText('Clases de Surf Individuales')).toBeVisible();
    await expect(page.getByText('$35 por clase')).toBeVisible();
    await expect(page.getByText('Alquiler de Tablas de Surf')).toBeVisible();
    await expect(page.getByText('$20 por día')).toBeVisible();
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

