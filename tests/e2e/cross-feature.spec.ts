import { test, expect } from '@playwright/test';
import { resetDatabase } from './utils/db-helpers';
import Database from 'better-sqlite3';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const crossFilename = fileURLToPath(import.meta.url);
const crossDirname = path.dirname(crossFilename);

test.describe('Casa Mahana E2E Tier 3 Cross-Feature Combination Tests', () => {
  let tempJpgPath: string;

  test.beforeAll(() => {
    const assetsDir = path.join(crossDirname, 'assets');
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }
    tempJpgPath = path.join(assetsDir, 'test-cross.jpg');
    fs.writeFileSync(tempJpgPath, 'Dummy JPG content for cross feature tests');
  });

  test.afterAll(() => {
    if (fs.existsSync(tempJpgPath)) {
      fs.unlinkSync(tempJpgPath);
    }
  });

  test.beforeEach(async () => {
    resetDatabase();
  });

  const getFutureDates = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const inTwoWeeks = new Date(today.getTime() + 9 * 24 * 60 * 60 * 1000);
    const checkInStr = nextWeek.toISOString().split('T')[0];
    const checkOutStr = inTwoWeeks.toISOString().split('T')[0];
    return { checkInStr, checkOutStr };
  };

  const getRoomCard = (page: any, tipo: string) => {
    return page.locator('div.rounded-2xl.border.bg-white', { has: page.locator('h3', { hasText: tipo }) }).first();
  };

  const getRoomGroup = (page: any, num: number) => {
    return page.locator('div.p-5.rounded-2xl.border', { hasText: `Habitación ${num}` }).first();
  };

  test('1. i18n Translation Persistence & Toggle throughout Checkout', async ({ page }) => {
    await page.goto('/reservar');
    
    // Switch to English in Step 1
    await page.locator('button[aria-label="Switch Language"]').click();
    await expect(page.locator('text=Select Experience')).toBeVisible();

    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Check-in Date") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Check-out Date") + input[type="date"]').fill(checkOutStr);
    await page.locator('button:has-text("Check Availability")').click();

    // Verify Step 2 is in English
    await expect(page.locator('text=Choose a room to add')).toBeVisible();

    // Switch back to Spanish
    await page.locator('button[aria-label="Switch Language"]').click();
    await expect(page.locator('text=Elige una habitación para agregar')).toBeVisible();
  });

  test('2. Experience Category Toggle: Cart is cleared and state reset upon switching Stay/Pasadía', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    // Add Estándar to cart
    await getRoomCard(page, 'Estándar').locator('button:has-text("+")').click();
    await expect(page.locator('text=Tu Carrito de Habitaciones')).toBeVisible();

    // Switch to Pasadía
    await page.locator('button:has-text("Pasadía (Por el día)")').click();

    // Verify cart is emptied automatically (cart banner not visible)
    await expect(page.locator('text=Tu Carrito de Habitaciones')).not.toBeVisible();
  });

  test('3. Cart Recalculation: Dates modification correctly updates live quote in Cart', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    // Add Doble to cart
    await getRoomCard(page, 'Doble').locator('button:has-text("+")').click();
    
    const firstTotalText = await page.locator('span:has-text("Total de tu estadía") + p').innerText();
    const firstTotal = parseFloat(firstTotalText.replace('$', ''));

    // Go back to step 1
    await page.click('button:has-text("Cambiar fechas")');

    // Change checkout date to 3 nights instead of 2 (checkInStr is nextWeek, so make checkOutStr inThreeWeeks)
    const inThreeWeeks = new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(inThreeWeeks);
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    const secondTotalText = await page.locator('span:has-text("Total de tu estadía") + p').innerText();
    const secondTotal = parseFloat(secondTotalText.replace('$', ''));

    expect(secondTotal).toBeGreaterThan(firstTotal);
  });

  test('4. Guest Reallocation: Surcharge live updates when varying adults/minors/pets mix', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    await getRoomCard(page, 'Familiar').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');

    const firstTotalText = await page.locator('span:has-text("Hab. Total") + span').innerText();
    const firstTotal = parseFloat(firstTotalText.replace('$', ''));

    // Increment adults (from 1 to 2)
    const room1 = getRoomGroup(page, 1);
    await room1.locator('button:has-text("+")').first().click();
    await page.waitForTimeout(1000);

    const secondTotalText = await page.locator('span:has-text("Hab. Total") + span').innerText();
    const secondTotal = parseFloat(secondTotalText.replace('$', ''));

    expect(secondTotal).toBeGreaterThan(firstTotal);
  });

  test('5. Multi-room transaction: Verify room isolation & checkout matching group code', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '3' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    // Add Doble and Estándar
    await getRoomCard(page, 'Doble').locator('button:has-text("+")').click();
    await getRoomCard(page, 'Estándar').locator('button:has-text("+")').click();

    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');

    // Room 1 (Doble) has 1 adult by default. Set to 2 adults (1 + 1 = 2)
    const room1 = getRoomGroup(page, 1);
    await room1.locator('button:has-text("+")').first().click();

    // Room 2 (Estándar) has 1 adult by default. Set to 1 adult (so we have exactly 3 adults in total search, satisfying perfect match)
    // Wait, Estándar min cap is 2! So let's check. Ah, perfect. 
    // Total assigned: Doble = 2, Estándar = 2 (Total 4). So we can toggle search adults to 4!
    // But since search was 3, let's satisfy perfect allocation:
    // Assigned: Room 1 (Doble) = 2, Room 2 (Estándar) = 1 (Total 3)
    // But Estándar will show "Supera Capacidad" warning because its min capacity is 2.
    // Let's go back and search for 4 adults!
    await page.click('button:has-text("Volver a habitaciones")');
    await page.click('button:has-text("Cambiar fechas")');
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '4' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    // Add Doble and Estándar
    await getRoomCard(page, 'Doble').locator('button:has-text("+")').click();
    await getRoomCard(page, 'Estándar').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');

    // Room 1 (Doble) default 1. Increment to 2 adults.
    await getRoomGroup(page, 1).locator('button:has-text("+")').first().click();
    // Room 2 (Estándar) default 1. Increment to 2 adults.
    await getRoomGroup(page, 2).locator('button:has-text("+")').first().click();

    // Verify perfect allocation
    await expect(page.locator('text=¡Perfecto! Todos los huéspedes y mascotas han sido asignados correctamente.')).toBeVisible();

    await page.click('button:has-text("Siguiente: Datos de Huésped")');
    await page.locator('label:has-text("Nombre") + input').fill('Pedro');
    await page.locator('label:has-text("Apellido") + input').fill('Castillo');
    await page.locator('label:has-text("Correo Electrónico") + input').fill('pedro.castillo@test.com');
    await page.click('button:has-text("Siguiente: Proceder al Pago")');

    await page.locator('button:has-text("Transferencia / Yappy / Cupón")').click();
    await page.locator('label:has-text("Referencia de Transacción") + input').fill('REF-MULTI-CROSS');

    // Upload file
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('#public-receipt-input').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(tempJpgPath);

    await page.click('button:has-text("Confirmar Reserva y Subir Recibo")');

    // Verify step 6 confirmation
    await expect(page.locator('text=¡Tu solicitud de reserva ha sido enviada!')).toBeVisible();

    // Extract group code
    const groupCodeText = await page.locator('p:has-text("REF-") + p').innerText();
    expect(groupCodeText.startsWith('#')).toBe(true);

    // Query database to verify both rooms have the same grupo_codigo
    const code = groupCodeText.replace('#', '');
    const db = new Database(`C:\\Users\\Usuario\\.gemini\\antigravity\\scratch\\casa-mahana-pms\\data\\casa-mahana-test.db`);
    try {
      const dbReservations = db.prepare("SELECT * FROM reservas_hotel WHERE grupo_codigo = ?").all(code) as any[];
      expect(dbReservations.length).toBe(2);
      expect(dbReservations[0].tipo_habitacion).not.toBe(dbReservations[1].tipo_habitacion);
    } finally {
      db.close();
    }
  });

  test('6. PayPal API Integration: Toggle online payment dynamically matches backend settings', async ({ page }) => {
    // Manually disable PayPal in backend
    const db = new Database(`C:\\Users\\Usuario\\.gemini\\antigravity\\scratch\\casa-mahana-pms\\data\\casa-mahana-test.db`);
    try {
      db.prepare("UPDATE config_hotel SET valor = '' WHERE clave = 'paypal_client_id'").run();
    } finally {
      db.close();
    }

    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    await getRoomCard(page, 'Estándar').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');
    await page.click('button:has-text("Siguiente: Datos de Huésped")');

    await page.locator('label:has-text("Nombre") + input').fill('Maria');
    await page.locator('label:has-text("Apellido") + input').fill('Gomez');
    await page.locator('label:has-text("Correo Electrónico") + input').fill('maria.gomez@test.com');
    await page.click('button:has-text("Siguiente: Proceder al Pago")');

    // Click PayPal tab
    await page.locator('button:has-text("Pago Seguro Online")').click();
    // Verify system shows unavailable banner since enabled = 0
    await expect(page.locator('text=Sistema de pago online no disponible temporalmente')).toBeVisible();
  });

  test('7. Offline Payment Method Switching: UI state and uploaded file persist between sub-tabs', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    await getRoomCard(page, 'Estándar').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');
    await page.click('button:has-text("Siguiente: Datos de Huésped")');

    await page.locator('label:has-text("Nombre") + input').fill('Maria');
    await page.locator('label:has-text("Apellido") + input').fill('Gomez');
    await page.locator('label:has-text("Correo Electrónico") + input').fill('maria.gomez@test.com');
    await page.click('button:has-text("Siguiente: Proceder al Pago")');

    await page.locator('button:has-text("Transferencia / Yappy / Cupón")').click();
    
    // Fill reference
    await page.locator('label:has-text("Referencia de Transacción") + input').fill('REF-CROSS-PERSIST');

    // Upload file
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('#public-receipt-input').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(tempJpgPath);

    // Switch from Transferencia to Yappy sub-tab
    await page.locator('button:has-text("Yappy")').click();

    // Verify instructions change but reference and file persist
    await expect(page.locator('text=Envía tu yappy al')).toBeVisible();
    
    const referenceVal = await page.locator('label:has-text("Referencia de Transacción") + input').inputValue();
    expect(referenceVal).toBe('REF-CROSS-PERSIST');
    await expect(page.locator('p:has-text("test-cross.jpg")')).toBeVisible();
  });
});
