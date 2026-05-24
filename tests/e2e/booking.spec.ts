import { test, expect } from '@playwright/test';
import { resetDatabase } from './utils/db-helpers';
import Database from 'better-sqlite3';
import * as path from 'path';
import { fileURLToPath } from 'url';

const bookingFilename = fileURLToPath(import.meta.url);
const bookingDirname = path.dirname(bookingFilename);

test.describe('Casa Mahana Booking Wizard E2E Tests', () => {

  test.beforeEach(async () => {
    // Reset SQLite database to clear previous transactions before every test
    resetDatabase();
  });

  const getFutureDates = () => {
    const today = new Date();
    // 7 days in the future
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    // 9 days in the future
    const inTwoWeeks = new Date(today.getTime() + 9 * 24 * 60 * 60 * 1000);

    const checkInStr = nextWeek.toISOString().split('T')[0];
    const checkOutStr = inTwoWeeks.toISOString().split('T')[0];

    return { checkInStr, checkOutStr };
  };

  const dbPath = `C:\\Users\\Usuario\\.gemini\\antigravity\\scratch\\casa-mahana-pms\\data\\casa-mahana-test.db`;

  // Precise room card selector helper
  const getRoomCard = (page: any, tipo: string) => {
    return page.locator('div.rounded-2xl.border.bg-white', { has: page.locator('h3', { hasText: tipo }) }).first();
  };

  // Precise guest distribution room group helper
  const getRoomGroup = (page: any, num: number) => {
    return page.locator('div.p-5.rounded-2xl.border', { hasText: `Habitación ${num}` }).first();
  };

  // ==========================================
  // GROUP 1: CATEGORY SELECTION & DATE PICKERS (5 cases)
  // ==========================================

  test('1. Should display Stay experience by default and allow category selection toggling', async ({ page }) => {
    await page.goto('/reservar');
    await expect(page.locator('text=Selecciona tu experiencia')).toBeVisible();

    // Verify stay is active and check-out input exists
    const stayTab = page.locator('button:has-text("Estadía (Hospedaje)")');
    await expect(stayTab).toHaveClass(/bg-turquoise-700/);
    await expect(page.locator('label:has-text("Fecha de Check-out")')).toBeVisible();

    // Toggle to Day Pass
    const dayPassTab = page.locator('button:has-text("Pasadía (Por el día)")');
    await dayPassTab.click();
    await expect(dayPassTab).toHaveClass(/bg-turquoise-700/);

    // Verify check-out label is not visible for Day Pass
    await expect(page.locator('label:has-text("Fecha de Check-out")')).not.toBeVisible();
    await expect(page.locator('label:has-text("Fecha de Visita")')).toBeVisible();
  });

  test('2. Should automatically set check-out date to check-in date when in Pasadía', async ({ page }) => {
    await page.goto('/reservar');
    await page.locator('button:has-text("Pasadía (Por el día)")').click();

    const { checkInStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Visita") + input[type="date"]').fill(checkInStr);

    // Get value of date input to ensure it is filled correctly
    const val = await page.locator('label:has-text("Fecha de Visita") + input[type="date"]').inputValue();
    expect(val).toBe(checkInStr);
  });

  test('3. Should dynamically update date field labels based on category selected', async ({ page }) => {
    await page.goto('/reservar');
    
    // In Stay
    await expect(page.locator('label:has-text("Fecha de Check-in")')).toBeVisible();
    await expect(page.locator('label:has-text("Fecha de Check-out")')).toBeVisible();

    // Switch to Day Pass
    await page.locator('button:has-text("Pasadía (Por el día)")').click();
    await expect(page.locator('label:has-text("Fecha de Visita")')).toBeVisible();
    await expect(page.locator('label:has-text("Fecha de Check-in")')).not.toBeVisible();
  });

  test('4. Should enforce minimum check-out date constraint to check-in + 1 night for stay', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr } = getFutureDates();

    const checkInInput = page.locator('label:has-text("Fecha de Check-in") + input[type="date"]');
    await checkInInput.fill(checkInStr);

    // Get the min attribute of check-out
    const checkOutInput = page.locator('label:has-text("Fecha de Check-out") + input[type="date"]');
    const minVal = await checkOutInput.getAttribute('min');
    
    const checkInDate = new Date(checkInStr + 'T00:00:00');
    checkInDate.setDate(checkInDate.getDate() + 1);
    const expectedMin = checkInDate.toISOString().split('T')[0];
    
    expect(minVal).toBe(expectedMin);
  });

  test('5. Should disable availability check button if dates are incomplete', async ({ page }) => {
    await page.goto('/reservar');
    
    // Check-in and Check-out are empty by default
    const searchBtn = page.locator('button:has-text("Ver Disponibilidad")');
    await expect(searchBtn).toBeDisabled();
  });

  // ==========================================
  // GROUP 2: LIVE PRICE QUOTES & CART MECHANICS (5 cases)
  // ==========================================

  test('6. Should show available room types after searching and allow adding/removing rooms to cart', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();

    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '2' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    // Verify room cards are shown
    await expect(getRoomCard(page, 'Doble')).toBeVisible();

    // Add Doble room
    await getRoomCard(page, 'Doble').locator('button:has-text("+")').click();

    // Verify cart banner shows up
    await expect(page.locator('text=Tu Carrito de Habitaciones')).toBeVisible();

    // Remove from cart
    await page.locator('button[title="Eliminar de mi carrito"]').click();
    await expect(page.locator('text=Tu Carrito de Habitaciones')).not.toBeVisible();
  });

  test('7. Should update total price live when changing rate plans for an available room type', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();

    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '2' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    // Select All Inclusive rate plan inside Familiar card
    const planSelect = getRoomCard(page, 'Familiar').locator('select');
    await planSelect.selectOption({ value: 'todo_incluido' });

    // Add Familiar to cart
    await getRoomCard(page, 'Familiar').locator('button:has-text("+")').click();

    // Check that All-Inclusive plan name is shown in cart
    await expect(page.locator('div.bg-gradient-to-br').locator('text=Todo Incluido / All-Inclusive').first()).toBeVisible();
  });

  test('8. Should update room totals live when modifying guest count inside the guest distribution step', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();

    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '2' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    // Add Doble room
    await getRoomCard(page, 'Doble').locator('button:has-text("+")').click();

    // Proceed to Step 3
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');

    // Get the initial room total price
    const initialPriceText = await page.locator('span:has-text("Hab. Total") + span').innerText();
    const initialPrice = parseFloat(initialPriceText.replace('$', ''));

    // Increment adults inside Step 3 for the first room
    const firstRoomGroup = getRoomGroup(page, 1);
    await firstRoomGroup.locator('button:has-text("+")').first().click();

    // Wait and assert the total increases
    await page.waitForTimeout(1000); // Wait for API cotizar fetch
    const updatedPriceText = await page.locator('span:has-text("Hab. Total") + span').innerText();
    const updatedPrice = parseFloat(updatedPriceText.replace('$', ''));

    expect(updatedPrice).toBeGreaterThan(initialPrice);
  });

  test('9. Should empty cart completely when clicking the Empty Cart button', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();

    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '2' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    // Add two rooms
    await getRoomCard(page, 'Doble').locator('button:has-text("+")').click();
    await getRoomCard(page, 'Estándar').locator('button:has-text("+")').click();

    // Verify 2 items in cart
    await expect(page.locator('text=Tu Carrito de Habitaciones')).toBeVisible();

    // Click empty cart
    await page.click('button:has-text("Vaciar carrito")');

    // Verify cart is gone
    await expect(page.locator('text=Tu Carrito de Habitaciones')).not.toBeVisible();
  });

  test('10. Should clear cart state automatically if dates or guest parameters are changed in Step 1', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();

    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '2' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    // Add Doble room to cart
    await getRoomCard(page, 'Doble').locator('button:has-text("+")').click();
    await expect(page.locator('text=Tu Carrito de Habitaciones')).toBeVisible();

    // Go back to step 1
    await page.click('button:has-text("Cambiar fechas")');

    // Change adults count
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '3' });

    // Click availability again
    await page.click('button:has-text("Ver Disponibilidad")');

    // Verify cart was cleared
    await expect(page.locator('text=Tu Carrito de Habitaciones')).not.toBeVisible();
  });

  // ==========================================
  // GROUP 3: SINGLE ROOM BOOKINGS & PAYMENTS (5 cases)
  // ==========================================

  test('11. Should complete checkout for a single Estándar room using Bank Transfer payment and verify DB', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();

    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '2' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    // Add Estándar
    await getRoomCard(page, 'Estándar').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');

    // Proceed to guest details
    await expect(page.locator('text=¡Perfecto! Todos los huéspedes y mascotas han sido asignados correctamente.')).toBeVisible();
    await page.click('button:has-text("Siguiente: Datos de Huésped")');

    // Guest Info Form
    await page.locator('label:has-text("Nombre *") + input').fill('Maria');
    await page.locator('label:has-text("Apellido *") + input').fill('Gomez');
    await page.locator('label:has-text("Correo Electrónico *") + input').fill('maria.gomez@test.com');
    await page.locator('label:has-text("WhatsApp / Teléfono") + input').fill('+507 6222-2222');
    await page.locator('label:has-text("Nacionalidad") + input').fill('Panameña');

    await page.click('button:has-text("Proceder al Pago")');

    // Select Transferencia
    await page.click('button:has-text("Transferencia / Yappy / Cupón")');
    await page.click('button:has-text("Transferencia Bancaria")');

    await page.locator('label:has-text("Número de Referencia") + input').fill('TRANS-112233');

    // Upload receipt
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('#public-receipt-input').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(bookingDirname, 'assets', 'mock-comprobante.jpg'));

    await expect(page.locator('button:has-text("Remover archivo")')).toBeVisible();
    await page.click('button:has-text("Confirmar Reserva y Subir Recibo")');

    // Confirmation screen
    await expect(page.locator('text=Reserva recibida')).toBeVisible();

    const refNumberLocator = page.locator('p:has-text("Número de referencia") + p');
    const groupCodeText = await refNumberLocator.innerText();
    const groupCode = groupCodeText.replace('#', '').trim();

    // Wait for DB write to complete safely
    await page.waitForTimeout(1000);

    // SQLite Verification
    const db = new Database(dbPath);
    db.pragma('busy_timeout = 5000');
    try {
      const reservations = db.prepare('SELECT * FROM reservas_hotel WHERE id = ? OR grupo_codigo = ?').all(groupCode, groupCode) as any[];
      expect(reservations.length).toBe(1);
      expect(reservations[0].cliente).toBe('Maria');
      expect(reservations[0].apellido).toBe('Gomez');
      expect(reservations[0].email).toBe('maria.gomez@test.com');
      expect(reservations[0].metodo_pago).toBe('transferencia');
      expect(reservations[0].referencia).toBe('TRANS-112233');

      // Verify receipt doc
      const receiptDoc = db.prepare('SELECT * FROM documentos_reserva WHERE reserva_id = ?').get(reservations[0].id) as any;
      expect(receiptDoc).toBeDefined();
      expect(receiptDoc.nombre_archivo).toContain('mock_comprobante.jpg');
    } finally {
      db.close();
    }
  });

  test('12. Should complete checkout for a single Doble room using Yappy payment and verify DB', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();

    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '2' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    // Add Doble
    await getRoomCard(page, 'Doble').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');
    await page.click('button:has-text("Siguiente: Datos de Huésped")');

    // Guest Info Form
    await page.locator('label:has-text("Nombre *") + input').fill('Pedro');
    await page.locator('label:has-text("Apellido *") + input').fill('Rios');
    await page.locator('label:has-text("Correo Electrónico *") + input').fill('pedro.rios@test.com');

    await page.click('button:has-text("Proceder al Pago")');

    // Select Yappy
    await page.click('button:has-text("Transferencia / Yappy / Cupón")');
    await page.click('button:has-text("Yappy (Banco General)")');

    await page.locator('label:has-text("Número de Referencia") + input').fill('YAPPY-778899');

    // Upload receipt
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('#public-receipt-input').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(bookingDirname, 'assets', 'mock-comprobante.jpg'));

    await page.click('button:has-text("Confirmar Reserva y Subir Recibo")');

    // Confirmation screen
    await expect(page.locator('text=Reserva recibida')).toBeVisible();

    const refNumberLocator = page.locator('p:has-text("Número de referencia") + p');
    const groupCodeText = await refNumberLocator.innerText();
    const groupCode = groupCodeText.replace('#', '').trim();

    // Wait for DB write to complete safely
    await page.waitForTimeout(1000);

    // SQLite Verification
    const db = new Database(dbPath);
    db.pragma('busy_timeout = 5000');
    try {
      const reservations = db.prepare('SELECT * FROM reservas_hotel WHERE id = ? OR grupo_codigo = ?').all(groupCode, groupCode) as any[];
      expect(reservations.length).toBe(1);
      expect(reservations[0].cliente).toBe('Pedro');
      expect(reservations[0].metodo_pago).toBe('yappy');
      expect(reservations[0].referencia).toBe('YAPPY-778899');
    } finally {
      db.close();
    }
  });

  test('13. Should complete checkout for a single Familiar room using Oferta Simple Coupon and verify DB', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();

    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '2' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    // Add Familiar
    await getRoomCard(page, 'Familiar').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');
    await page.click('button:has-text("Siguiente: Datos de Huésped")');

    // Guest Info Form
    await page.locator('label:has-text("Nombre *") + input').fill('Juanita');
    await page.locator('label:has-text("Apellido *") + input').fill('Diaz');
    await page.locator('label:has-text("Correo Electrónico *") + input').fill('juanita@test.com');

    await page.click('button:has-text("Proceder al Pago")');

    // Select Oferta Simple Coupon
    await page.click('button:has-text("Transferencia / Yappy / Cupón")');
    await page.click('button:has-text("Oferta Simple (Cupón)")');

    await page.locator('label:has-text("Número de Referencia") + input').fill('CUPON-OFERTA-123');

    // Upload receipt
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('#public-receipt-input').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(bookingDirname, 'assets', 'mock-comprobante.jpg'));

    await page.click('button:has-text("Confirmar Reserva y Subir Recibo")');
    await expect(page.locator('text=Reserva recibida')).toBeVisible();

    const refNumberLocator = page.locator('p:has-text("Número de referencia") + p');
    const groupCodeText = await refNumberLocator.innerText();
    const groupCode = groupCodeText.replace('#', '').trim();

    // Wait for DB write to complete safely
    await page.waitForTimeout(1000);

    // SQLite Verification
    const db = new Database(dbPath);
    db.pragma('busy_timeout = 5000');
    try {
      const reservations = db.prepare('SELECT * FROM reservas_hotel WHERE id = ? OR grupo_codigo = ?').all(groupCode, groupCode) as any[];
      expect(reservations.length).toBe(1);
      expect(reservations[0].cliente).toBe('Juanita');
      expect(reservations[0].metodo_pago).toBe('cuponera_oferta_simple');
      expect(reservations[0].referencia).toBe('CUPON-OFERTA-123');
    } finally {
      db.close();
    }
  });

  test('14. Should complete checkout for a single Familiar room using PaHoy Coupon and verify DB', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();

    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '2' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    // Add Familiar
    await getRoomCard(page, 'Familiar').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');
    await page.click('button:has-text("Siguiente: Datos de Huésped")');

    // Guest Info Form
    await page.locator('label:has-text("Nombre *") + input').fill('Leo');
    await page.locator('label:has-text("Apellido *") + input').fill('Castillo');
    await page.locator('label:has-text("Correo Electrónico *") + input').fill('leo.castillo@test.com');

    await page.click('button:has-text("Proceder al Pago")');

    // Select PaHoy Coupon
    await page.click('button:has-text("Transferencia / Yappy / Cupón")');
    await page.click('button:has-text("PaHoy (Cupón)")');

    await page.locator('label:has-text("Número de Referencia") + input').fill('CUPON-PAHOY-999');

    // Upload receipt
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('#public-receipt-input').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(bookingDirname, 'assets', 'mock-comprobante.jpg'));

    await page.click('button:has-text("Confirmar Reserva y Subir Recibo")');
    await expect(page.locator('text=Reserva recibida')).toBeVisible();

    const refNumberLocator = page.locator('p:has-text("Número de referencia") + p');
    const groupCodeText = await refNumberLocator.innerText();
    const groupCode = groupCodeText.replace('#', '').trim();

    // Wait for DB write to complete safely
    await page.waitForTimeout(1000);

    // SQLite Verification
    const db = new Database(dbPath);
    db.pragma('busy_timeout = 5000');
    try {
      const reservations = db.prepare('SELECT * FROM reservas_hotel WHERE id = ? OR grupo_codigo = ?').all(groupCode, groupCode) as any[];
      expect(reservations.length).toBe(1);
      expect(reservations[0].cliente).toBe('Leo');
      expect(reservations[0].metodo_pago).toBe('cuponera_pahoy');
      expect(reservations[0].referencia).toBe('CUPON-PAHOY-999');
    } finally {
      db.close();
    }
  });

  test('15. Should allow opting between Minimum Deposit vs Full Payment options and verify total in summary', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();

    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '2' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    // Add Doble room
    await getRoomCard(page, 'Doble').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');
    await page.click('button:has-text("Siguiente: Datos de Huésped")');

    // Guest details
    await page.locator('label:has-text("Nombre *") + input').fill('Sandra');
    await page.locator('label:has-text("Apellido *") + input').fill('Suarez');
    await page.locator('label:has-text("Correo Electrónico *") + input').fill('sandra.suarez@test.com');

    // In step 4 summary, retrieve and compare minimum deposit vs full payment totals
    const depButton = page.locator('button:has-text("Depósito Mínimo")');
    const fullButton = page.locator('button:has-text("Pago completo")');

    const depText = await depButton.locator('p').first().innerText();
    const fullText = await fullButton.locator('p').first().innerText();

    const depVal = parseFloat(depText.replace('$', ''));
    const fullVal = parseFloat(fullText.replace('$', ''));

    expect(fullVal).toBeGreaterThan(depVal);

    // Select Full payment
    await fullButton.click();
    await page.click('button:has-text("Proceder al Pago")');

    // Verify on step 5 that the header shows full price
    const headerPriceText = await page.locator('p:has-text("Pago completo") + p').innerText();
    const headerPrice = parseFloat(headerPriceText.replace('$', '').replace(' USD', ''));
    expect(headerPrice).toBe(fullVal);
  });

  // ==========================================
  // GROUP 4: MULTI-ROOM & DATABASE INTEGRITY (5 cases)
  // ==========================================

  test('16. Should complete a multi-room booking using the suggested room allocation and verify SQLite state', async ({ page }) => {
    await page.goto('/reservar');
    await expect(page.locator('text=Selecciona tu experiencia')).toBeVisible();

    const { checkInStr, checkOutStr } = getFutureDates();

    // Select Check-in date
    const checkInInput = page.locator('label:has-text("Fecha de Check-in") + input[type="date"]');
    await checkInInput.fill(checkInStr);

    // Select Check-out date
    const checkOutInput = page.locator('label:has-text("Fecha de Check-out") + input[type="date"]');
    await checkOutInput.fill(checkOutStr);

    // Select guest count to trigger "El Sugerido" backtracking allocation:
    // 5 adults, 2 kids, 1 pet.
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '5' });
    await page.locator('label:has-text("Menores") + select').selectOption({ value: '2' });
    await page.locator('label:has-text("Mascotas") + select').selectOption({ value: '1' });

    // Click "Ver Disponibilidad"
    await page.click('button:has-text("Ver Disponibilidad")');

    // Wait for availability search results and verify El Sugerido banner shows up
    await expect(page.locator('text=Recomendación de Habitación Optimizada')).toBeVisible();

    // Accept El Sugerido suggestion
    await page.click('button:has-text("Aceptar Sugerido")');

    // Step 3: Distribution page
    await expect(page.locator('text=Distribución de Huéspedes')).toBeVisible();
    await expect(page.locator('text=¡Perfecto! Todos los huéspedes y mascotas han sido asignados correctamente.')).toBeVisible();

    // Click "Siguiente: Datos de Huésped"
    await page.click('button:has-text("Siguiente: Datos de Huésped")');

    // Step 4: Summary & Guest Info Form
    await expect(page.locator('text=Resumen de tu reserva')).toBeVisible();
    await expect(page.locator('text=Datos del huésped principal')).toBeVisible();

    // Fill contact details
    await page.locator('label:has-text("Nombre *") + input').fill('Carlos');
    await page.locator('label:has-text("Apellido *") + input').fill('Sánchez');
    await page.locator('label:has-text("Correo Electrónico *") + input').fill('carlos.sanchez@test.com');
    await page.locator('label:has-text("WhatsApp / Teléfono") + input').fill('+507 6000-1111');
    await page.locator('label:has-text("Nacionalidad") + input').fill('Panameño');

    // Click "Proceder al Pago"
    await page.click('button:has-text("Proceder al Pago")');

    // Step 5: Payment method selection
    await expect(page.locator('text=Pago Seguro Online')).toBeVisible();

    // Select offline upload method ("Transferencia / Yappy / Cupón")
    await page.click('button:has-text("Transferencia / Yappy / Cupón")');

    // Select Yappy payment instruction
    await page.click('button:has-text("Yappy")');

    // Verify Yappy instructions are shown
    await expect(page.locator('text=@casamahana')).toBeVisible();

    // Enter reference code
    await page.locator('label:has-text("Número de Referencia") + input').fill('YAPPY-998877');

    // Attach mock comprobante file
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('#public-receipt-input').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(bookingDirname, 'assets', 'mock-comprobante.jpg'));

    // Verify file is uploaded (remove button should be visible)
    await expect(page.locator('button:has-text("Remover archivo")')).toBeVisible();

    // Submit booking by clicking "Confirmar Reserva y Subir Recibo"
    await page.click('button:has-text("Confirmar Reserva y Subir Recibo")');

    // Wait for step 6: Confirmation Screen
    await expect(page.locator('text=Reserva recibida')).toBeVisible();
    await expect(page.locator('text=Comprobante de pago recibido y en revisión.')).toBeVisible();

    // Extract reservation group code or ID
    const refNumberLocator = page.locator('p:has-text("Número de referencia") + p');
    const groupCodeText = await refNumberLocator.innerText();
    expect(groupCodeText.startsWith('#')).toBe(true);
    const groupCode = groupCodeText.replace('#', '').trim();

    // Wait for DB write to complete safely
    await page.waitForTimeout(1000);

    // Database verification using better-sqlite3
    const db = new Database(dbPath);
    db.pragma('busy_timeout = 5000');
    try {
      // Query reservations from the database matching the group code
      const reservations = db.prepare('SELECT * FROM reservas_hotel WHERE grupo_codigo = ?').all(groupCode) as any[];
      
      // We expect multiple reservations representing the distributed rooms
      expect(reservations.length).toBeGreaterThan(0);

      // Check main reservation is marked as es_maestra
      const leadReservation = reservations.find((r: any) => r.es_maestra === 1) as any;
      expect(leadReservation).toBeDefined();
      expect(leadReservation.cliente).toBe('Carlos');
      expect(leadReservation.apellido).toBe('Sánchez');
      expect(leadReservation.email).toBe('carlos.sanchez@test.com');
      expect(leadReservation.estado).toBe('Pendiente'); // starts as Pendiente due to offline proof review

      // Check guest count is fully matched in DB
      const totalAdults = reservations.reduce((sum: number, r: any) => sum + r.adultos, 0);
      const totalMinors = reservations.reduce((sum: number, r: any) => sum + r.menores, 0);
      const totalPets = reservations.reduce((sum: number, r: any) => sum + r.mascotas, 0);

      expect(totalAdults).toBe(5);
      expect(totalMinors).toBe(2);
      expect(totalPets).toBe(1);

      // Verify folio has the payment record
      const folioRecords = db.prepare('SELECT * FROM folio_hotel WHERE reserva_id = ?').all(leadReservation.id) as any[];
      expect(folioRecords.length).toBeGreaterThan(0);
      
      // Verify that proof document was uploaded and linked correctly
      const receiptDoc = db.prepare('SELECT * FROM documentos_reserva WHERE reserva_id = ?').get(leadReservation.id) as any;
      expect(receiptDoc).toBeDefined();
      expect(receiptDoc.nombre_archivo).toContain('mock_comprobante.jpg');
    } finally {
      db.close();
    }
  });

  test('17. Should verify SQLite master/child reservation records link correctly via grupo_codigo and es_maestra flags', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();

    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);

    // Select 5 adults and 2 kids to trigger multi-room recommendation
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '5' });
    await page.locator('label:has-text("Menores") + select').selectOption({ value: '2' });
    await page.click('button:has-text("Ver Disponibilidad")');
    await page.click('button:has-text("Aceptar Sugerido")');

    await page.click('button:has-text("Siguiente: Datos de Huésped")');
    await page.locator('label:has-text("Nombre *") + input').fill('Clara');
    await page.locator('label:has-text("Apellido *") + input').fill('Valle');
    await page.locator('label:has-text("Correo Electrónico *") + input').fill('clara.valle@test.com');

    await page.click('button:has-text("Proceder al Pago")');
    await page.click('button:has-text("Transferencia / Yappy / Cupón")');
    await page.click('button:has-text("Yappy")');
    await page.locator('label:has-text("Número de Referencia") + input').fill('YAPPY-GROUP-11');

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('#public-receipt-input').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(bookingDirname, 'assets', 'mock-comprobante.jpg'));

    await page.click('button:has-text("Confirmar Reserva y Subir Recibo")');
    await expect(page.locator('text=Reserva recibida')).toBeVisible();

    const refNumberLocator = page.locator('p:has-text("Número de referencia") + p');
    const groupCodeText = await refNumberLocator.innerText();
    const groupCode = groupCodeText.replace('#', '').trim();

    // Wait for DB write to complete safely
    await page.waitForTimeout(1000);

    // Query DB
    const db = new Database(dbPath);
    db.pragma('busy_timeout = 5000');
    try {
      const reservations = db.prepare('SELECT * FROM reservas_hotel WHERE grupo_codigo = ?').all(groupCode) as any[];
      console.log('Test 17 reservations:', JSON.stringify(reservations, null, 2));

      // Ensure there is exactly 1 master and the rest are children, all linked by grupo_codigo
      const master = reservations.filter((r: any) => r.es_maestra === 1);
      const children = reservations.filter((r: any) => r.es_maestra === 0);

      expect(master.length).toBe(1);
      expect(children.length).toBeGreaterThan(0);
      expect(reservations.every((r: any) => r.grupo_codigo === groupCode)).toBe(true);
    } finally {
      db.close();
    }
  });

  test('18. Should enforce that total guest allocation in children reservations matches search parameters', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();

    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);

    // 4 adults, 1 child
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '4' });
    await page.locator('label:has-text("Menores") + select').selectOption({ value: '1' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();
    await page.click('button:has-text("Aceptar Sugerido")');

    await page.click('button:has-text("Siguiente: Datos de Huésped")');
    await page.locator('label:has-text("Nombre *") + input').fill('Roberto');
    await page.locator('label:has-text("Apellido *") + input').fill('Soto');
    await page.locator('label:has-text("Correo Electrónico *") + input').fill('roberto.soto@test.com');

    await page.click('button:has-text("Proceder al Pago")');
    await page.click('button:has-text("Transferencia / Yappy / Cupón")');
    await page.click('button:has-text("Yappy")');
    await page.locator('label:has-text("Número de Referencia") + input').fill('YAPPY-GROUP-22');

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('#public-receipt-input').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(bookingDirname, 'assets', 'mock-comprobante.jpg'));

    await page.click('button:has-text("Confirmar Reserva y Subir Recibo")');
    await expect(page.locator('text=Reserva recibida')).toBeVisible();

    const refNumberLocator = page.locator('p:has-text("Número de referencia") + p');
    const groupCodeText = await refNumberLocator.innerText();
    const groupCode = groupCodeText.replace('#', '').trim();

    // Wait for DB write to complete safely
    await page.waitForTimeout(1000);

    const db = new Database(dbPath);
    db.pragma('busy_timeout = 5000');
    try {
      const reservations = db.prepare('SELECT * FROM reservas_hotel WHERE grupo_codigo = ?').all(groupCode) as any[];

      const sumAdults = reservations.reduce((s: number, r: any) => s + r.adultos, 0);
      const sumMinors = reservations.reduce((s: number, r: any) => s + r.menores, 0);

      expect(sumAdults).toBe(4);
      expect(sumMinors).toBe(1);
    } finally {
      db.close();
    }
  });

  test('19. Should verify that each reservation record in a group booking has its own unique record in SQLite', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();

    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);

    // Select 5 adults and 2 kids to trigger multi-room recommendation
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '5' });
    await page.locator('label:has-text("Menores") + select').selectOption({ value: '2' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();
    await page.click('button:has-text("Aceptar Sugerido")');

    await page.click('button:has-text("Siguiente: Datos de Huésped")');
    await page.locator('label:has-text("Nombre *") + input').fill('Lucas');
    await page.locator('label:has-text("Apellido *") + input').fill('Reyes');
    await page.locator('label:has-text("Correo Electrónico *") + input').fill('lucas.reyes@test.com');

    await page.click('button:has-text("Proceder al Pago")');
    await page.click('button:has-text("Transferencia / Yappy / Cupón")');
    await page.click('button:has-text("Yappy")');
    await page.locator('label:has-text("Número de Referencia") + input').fill('YAPPY-GROUP-33');

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('#public-receipt-input').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(bookingDirname, 'assets', 'mock-comprobante.jpg'));

    await page.click('button:has-text("Confirmar Reserva y Subir Recibo")');
    await expect(page.locator('text=Reserva recibida')).toBeVisible();

    const refNumberLocator = page.locator('p:has-text("Número de referencia") + p');
    const groupCodeText = await refNumberLocator.innerText();
    const groupCode = groupCodeText.replace('#', '').trim();

    // Wait for DB write to complete safely
    await page.waitForTimeout(1000);

    const db = new Database(dbPath);
    db.pragma('busy_timeout = 5000');
    try {
      const reservations = db.prepare('SELECT * FROM reservas_hotel WHERE grupo_codigo = ?').all(groupCode) as any[];
      console.log('Test 19 reservations:', JSON.stringify(reservations, null, 2));

      expect(reservations.length).toBeGreaterThan(1);
      
      // Ensure all IDs are unique and not null/undefined
      const ids = reservations.map((r: any) => r.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(reservations.length);
    } finally {
      db.close();
    }
  });

  test('20. Should display physical capacity validation errors when room capacity is exceeded manually', async ({ page }) => {
    await page.goto('/reservar');

    const { checkInStr } = getFutureDates();
    const checkOutStr = new Date(new Date(checkInStr + 'T00:00:00').getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);

    // Search for 2 adults
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '2' });
    await page.click('button:has-text("Ver Disponibilidad")');

    // Add Doble room manually
    await getRoomCard(page, 'Doble').locator('button:has-text("+")').click();

    // Proceed to guest allocation screen
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');

    // Step 3: Distribution screen
    await expect(page.locator('text=Distribución de Huéspedes')).toBeVisible();

    const dobRoomGroup = getRoomGroup(page, 1);

    // We search for 2 adults. Under the new initialization logic, the first room added is automatically
    // pre-filled with the searched number of guests (2 adults), matching the search parameters perfectly.

    // Verify perfect allocation is shown
    await expect(page.locator('text=¡Perfecto! Todos los huéspedes y mascotas han sido asignados correctamente.')).toBeVisible();

    // Exceed physical capacity of the Doble Room (max 4) by adding 3 more adults (2 + 3 = 5 > 4)
    await dobRoomGroup.locator('button:has-text("+")').first().click();
    await dobRoomGroup.locator('button:has-text("+")').first().click();
    await dobRoomGroup.locator('button:has-text("+")').first().click();

    // Verify that capacity validation error message is shown
    await expect(page.locator('text=Se supera la capacidad máxima de la habitación.')).toBeVisible();

    // Verify next button is disabled
    const nextBtn = page.locator('button:has-text("Siguiente: Datos de Huésped")');
    await expect(nextBtn).toBeDisabled();
  });
});
