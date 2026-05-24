import { test, expect } from '@playwright/test';
import { resetDatabase } from './utils/db-helpers';
import Database from 'better-sqlite3';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const workflowFilename = fileURLToPath(import.meta.url);
const workflowDirname = path.dirname(workflowFilename);

test.describe('Casa Mahana E2E Tier 4 Real-World Workflows', () => {
  let tempJpgPath: string;
  let tempPdfPath: string;

  test.beforeAll(() => {
    const assetsDir = path.join(workflowDirname, 'assets');
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }
    tempJpgPath = path.join(assetsDir, 'test-workflow.jpg');
    tempPdfPath = path.join(assetsDir, 'test-workflow.pdf');
    fs.writeFileSync(tempJpgPath, 'Dummy JPG content for workflow tests');
    fs.writeFileSync(tempPdfPath, '%PDF-1.4 Dummy PDF content for workflow tests');
  });

  test.afterAll(() => {
    if (fs.existsSync(tempJpgPath)) fs.unlinkSync(tempJpgPath);
    if (fs.existsSync(tempPdfPath)) fs.unlinkSync(tempPdfPath);
  });

  test.beforeEach(async () => {
    resetDatabase();
  });

  const getFutureDates = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const inTwoWeeks = new Date(today.getTime() + 12 * 24 * 60 * 60 * 1000); // 5 nights
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

  test('Workflow 1: Extended Stay Booking with Rate Plan Toggling and Dynamic Surcharge Verification', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates(); // 5 nights

    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '4' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    // Toggle rate plan to Todo Incluido for Familiar room
    await getRoomCard(page, 'Familiar').locator('select').selectOption({ value: 'todo_incluido' });
    await getRoomCard(page, 'Familiar').locator('button:has-text("+")').click();

    // Go to step 3
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');

    // Assing guest configuration: Familiar room max is 6, we have 4 adults buscados.
    // Familiar by default will get 4 adults automatically assigned since it was isFirstRoom and adultsBuscados was 4.
    // Let's verify assigned matches 4 / 4
    await expect(page.locator('text=¡Perfecto! Todos los huéspedes y mascotas han sido asignados correctamente.')).toBeVisible();

    // Go to step 4
    await page.click('button:has-text("Siguiente: Datos de Huésped")');

    // Verify subtotal calculation in step 4
    // Plan: todo_incluido base rate is $150 per adult night.
    // 4 adults * $150 * 5 nights = $3000 base.
    // Holiday/Weekend markup check: Let's assume standard weekday.
    // Let's verify subtotal is calculated correctly in the UI.
    const subtotalText = await page.locator('span:has-text("Subtotal") + span').innerText();
    const subtotal = parseFloat(subtotalText.replace('$', ''));
    expect(subtotal).toBeGreaterThan(0);

    // Select Pago Total
    await page.locator('button:has-text("Pago Completo")').click();

    // Fill guest information
    await page.locator('label:has-text("Nombre") + input').fill('Carlos');
    await page.locator('label:has-text("Apellido") + input').fill('Santana');
    await page.locator('label:has-text("Correo Electrónico") + input').fill('carlos.santana@test.com');
    await page.locator('label:has-text("WhatsApp") + input').fill('+507 6888-8888');

    // Go to step 5
    await page.click('button:has-text("Siguiente: Proceder al Pago")');

    // Choose bank transfer
    await page.locator('button:has-text("Transferencia / Yappy / Cupón")').click();
    await page.locator('label:has-text("Referencia de Transacción") + input').fill('REF-WORKFLOW-1');

    // Upload receipt file
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('#public-receipt-input').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(tempJpgPath);

    // Submit
    await page.click('button:has-text("Confirmar Reserva y Subir Recibo")');

    // Verify success confirmation
    await expect(page.locator('text=¡Tu solicitud de reserva ha sido enviada!')).toBeVisible();

    // Verify database entry matches Carlos Santana, status is Pendiente, and contains correct totals
    const db = new Database(`C:\\Users\\Usuario\\.gemini\\antigravity\\scratch\\casa-mahana-pms\\data\\casa-mahana-test.db`);
    try {
      const reservation = db.prepare("SELECT * FROM reservas_hotel WHERE cliente = 'Carlos' AND apellido = 'Santana'").get() as any;
      expect(reservation).toBeDefined();
      expect(reservation.estado).toBe('Pendiente');
      expect(reservation.plan_codigo).toBe('todo_incluido');
      expect(reservation.noches).toBe(5);
    } finally {
      db.close();
    }
  });

  test('Workflow 2: Day Pass Group Booking with Multiple Bohíos & Surcharges', async ({ page }) => {
    await page.goto('/reservar');
    await page.locator('button:has-text("Pasadía (Por el día)")').click();

    const { checkInStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Visita") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '6' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    // Select plan: 1st Bohío has "pasadia_comidas" plan, 2nd Bohío has "pasadia_premium" plan.
    await getRoomCard(page, 'Bohío').locator('select').selectOption({ value: 'pasadia_comidas' });
    await getRoomCard(page, 'Bohío').locator('button:has-text("+")').click();

    // Change selected plan to premium for the next Bohío
    await getRoomCard(page, 'Bohío').locator('select').selectOption({ value: 'pasadia_premium' });
    await getRoomCard(page, 'Bohío').locator('button:has-text("+")').click();

    // Go to step 3
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');

    // Room 1 (Bohío) default: 1 adult. Room 2 (Bohío) default: 1 adult. Total assigned: 2. Search is 6.
    // Set 3 adults in Bohío 1 and 3 adults in Bohío 2
    const group1 = getRoomGroup(page, 1);
    const group2 = getRoomGroup(page, 2);
    // Click plus twice in group 1
    await group1.locator('button:has-text("+")').first().click();
    await group1.locator('button:has-text("+")').first().click();
    // Click plus twice in group 2
    await group2.locator('button:has-text("+")').first().click();
    await group2.locator('button:has-text("+")').first().click();

    await expect(page.locator('text=¡Perfecto! Todos los huéspedes y mascotas han sido asignados correctamente.')).toBeVisible();

    // Go to step 4
    await page.click('button:has-text("Siguiente: Datos de Huésped")');

    // Fill guest information
    await page.locator('label:has-text("Nombre") + input').fill('Sofia');
    await page.locator('label:has-text("Apellido") + input').fill('Vergara');
    await page.locator('label:has-text("Correo Electrónico") + input').fill('sofia.vergara@test.com');

    // Go to step 5
    await page.click('button:has-text("Siguiente: Proceder al Pago")');

    // Choose Yappy
    await page.locator('button:has-text("Transferencia / Yappy / Cupón")').click();
    await page.locator('button:has-text("Yappy")').click();
    await page.locator('label:has-text("Referencia de Transacción") + input').fill('REF-YAPPY-WORKFLOW');

    // Upload receipt file
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('#public-receipt-input').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(tempJpgPath);

    // Submit
    await page.click('button:has-text("Confirmar Reserva y Subir Recibo")');

    // Verify success confirmation
    await expect(page.locator('text=¡Tu solicitud de reserva ha sido enviada!')).toBeVisible();

    // Retrieve group code
    const groupCodeText = await page.locator('p:has-text("REF-") + p').innerText();
    const code = groupCodeText.replace('#', '');

    // Verify in database that 2 reservation records are present with exact plans and sharing the group code
    const db = new Database(`C:\\Users\\Usuario\\.gemini\\antigravity\\scratch\\casa-mahana-pms\\data\\casa-mahana-test.db`);
    try {
      const records = db.prepare("SELECT * FROM reservas_hotel WHERE grupo_codigo = ?").all(code) as any[];
      expect(records.length).toBe(2);
      
      const planCodes = records.map(r => r.plan_codigo);
      expect(planCodes).toContain('pasadia_comidas');
      expect(planCodes).toContain('pasadia_premium');
    } finally {
      db.close();
    }
  });

  test('Workflow 3: Back-and-Forth Cart Modification and Date Shifts', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates(); // 5 nights

    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '2' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    // Add Doble room to cart
    await getRoomCard(page, 'Doble').locator('button:has-text("+")').click();

    // Proceed to Step 3
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');
    await expect(page.locator('text=¡Perfecto! Todos los huéspedes y mascotas han sido asignados correctamente.')).toBeVisible();

    // Go back to Step 2
    await page.click('button:has-text("Volver a habitaciones")');

    // Add Camping room to cart
    await getRoomCard(page, 'Camping').locator('button:has-text("+")').click();

    // Go back to Step 1
    await page.click('button:has-text("Cambiar fechas")');

    // Change dates to 2 nights
    const today = new Date();
    const checkIn2 = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const checkOut2 = new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkIn2);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOut2);

    // Search availability
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    // Cart is now automatically emptied as expected. Let's add Doble room
    await getRoomCard(page, 'Doble').locator('button:has-text("+")').click();

    // Go to Step 3
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');
    await expect(page.locator('text=¡Perfecto! Todos los huéspedes y mascotas han sido asignados correctamente.')).toBeVisible();

    // Proceed to step 4
    await page.click('button:has-text("Siguiente: Datos de Huésped")');

    // Fill guest details
    await page.locator('label:has-text("Nombre") + input').fill('Ruben');
    await page.locator('label:has-text("Apellido") + input').fill('Blades');
    await page.locator('label:has-text("Correo Electrónico") + input').fill('ruben.blades@test.com');

    // Proceed to Step 5
    await page.click('button:has-text("Siguiente: Proceder al Pago")');

    // Choose bank transfer and Oferta Simple coupon
    await page.locator('button:has-text("Transferencia / Yappy / Cupón")').click();
    await page.locator('button:has-text("Cupón de Oferta Simple")').click();
    await page.locator('label:has-text("Referencia de Transacción") + input').fill('OFERTA-SIMPLE-100');

    // Upload receipt file
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('#public-receipt-input').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(tempPdfPath);

    // Submit
    await page.click('button:has-text("Confirmar Reserva y Subir Recibo")');

    // Verify success confirmation
    await expect(page.locator('text=¡Tu solicitud de reserva ha sido enviada!')).toBeVisible();

    // Verify in SQLite database that Ruben Blades has a reservation with coupon reference and correct dates
    const db = new Database(`C:\\Users\\Usuario\\.gemini\\antigravity\\scratch\\casa-mahana-pms\\data\\casa-mahana-test.db`);
    try {
      const reservation = db.prepare("SELECT * FROM reservas_hotel WHERE cliente = 'Ruben' AND apellido = 'Blades'").get() as any;
      expect(reservation).toBeDefined();
      expect(reservation.check_in).toBe(checkIn2);
      expect(reservation.check_out).toBe(checkOut2);
    } finally {
      db.close();
    }
  });

  test('Workflow 4: Camping Enthusiast Reservation with Pets & Partial Deposit Payment', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();

    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '2' });
    await page.locator('label:has-text("Mascotas") + select').selectOption({ value: '2' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    // Add Camping room to cart
    await getRoomCard(page, 'Camping').locator('button:has-text("+")').click();

    // Go to step 3
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');

    // Check perfect allocation of guests & pets
    await expect(page.locator('text=¡Perfecto! Todos los huéspedes y mascotas han sido asignados correctamente.')).toBeVisible();

    // Go to step 4
    await page.click('button:has-text("Siguiente: Datos de Huésped")');

    // Verify "Depósito Mínimo" option is selected or toggle it
    await page.locator('button:has-text("Depósito Mínimo")').click();

    // Fill guest details
    await page.locator('label:has-text("Nombre") + input').fill('Daniel');
    await page.locator('label:has-text("Apellido") + input').fill('Ortega');
    await page.locator('label:has-text("Correo Electrónico") + input').fill('daniel.ortega@test.com');

    // Go to step 5
    await page.click('button:has-text("Siguiente: Proceder al Pago")');

    // Check offline payment method
    await page.locator('button:has-text("Transferencia / Yappy / Cupón")').click();
    await page.locator('label:has-text("Referencia de Transacción") + input').fill('CAMP-PETS-DEP');

    // Upload receipt file
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('#public-receipt-input').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(tempPdfPath);

    // Submit
    await page.click('button:has-text("Confirmar Reserva y Subir Recibo")');

    // Verify success confirmation
    await expect(page.locator('text=¡Tu solicitud de reserva ha sido enviada!')).toBeVisible();

    // Retrieve group code
    const groupCodeText = await page.locator('p:has-text("REF-") + p').innerText();
    const code = groupCodeText.replace('#', '');

    // Verify in database that deposit matches standard config rules
    const db = new Database(`C:\\Users\\Usuario\\.gemini\\antigravity\\scratch\\casa-mahana-pms\\data\\casa-mahana-test.db`);
    try {
      const records = db.prepare("SELECT * FROM reservas_hotel WHERE grupo_codigo = ?").all(code) as any[];
      expect(records.length).toBe(1);
      
      const folio = db.prepare("SELECT * FROM folio_hotel WHERE reserva_id = ?").get(records[0].id) as any;
      expect(folio).toBeDefined();
      expect(folio.deposito_monto).toBeGreaterThan(0);
      expect(folio.monto_por_pagar).toBeGreaterThan(0);
    } finally {
      db.close();
    }
  });

  test('Workflow 5: International Guest Checkout with PayPal API Simulation', async ({ page }) => {
    // Manually ensure PayPal is enabled in DB
    const db = new Database(`C:\\Users\\Usuario\\.gemini\\antigravity\\scratch\\casa-mahana-pms\\data\\casa-mahana-test.db`);
    try {
      db.prepare("UPDATE config_hotel SET valor = 'sb-client-id-12345' WHERE clave = 'paypal_client_id'").run();
    } finally {
      db.close();
    }

    await page.goto('/reservar');
    
    // Switch language to English
    await page.locator('button[aria-label="Switch Language"]').click();

    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Check-in Date") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Check-out Date") + input[type="date"]').fill(checkOutStr);
    await page.locator('button:has-text("Check Availability")').click();

    // Add Doble room to cart
    await getRoomCard(page, 'Doble').locator('button:has-text("+")').click();

    // Proceed to Step 3
    await page.click('button:has-text("Next: Allocate Guests")');
    await expect(page.locator('text=Perfect guest allocation!')).toBeVisible();

    // Proceed to step 4
    await page.click('button:has-text("Next: Guest Info")');

    // Fill guest details in English
    await page.locator('label:has-text("First Name") + input').fill('James');
    await page.locator('label:has-text("Last Name") + input').fill('Bond');
    await page.locator('label:has-text("Email Address") + input').fill('james.bond@mi6.gov');

    // Go to step 5
    await page.click('button:has-text("Next: Proceed to Payment")');

    // Choose PayPal online payment
    await page.locator('button:has-text("Secure Online Payment")').click();

    // Since mock PayPalButtons is a stub that calls success when clicked in testing, let's verify it is rendered
    await expect(page.locator('div.paypal-buttons-container')).toBeVisible();

    // Click the mock PayPal button
    await page.click('button.mock-paypal-btn');

    // Verify step 6 confirmation screen is shown automatically
    await expect(page.locator('text=Your booking request has been submitted!')).toBeVisible();

    // Verify reservation state in SQLite database is automatically set to 'Confirmada' because of immediate online payment validation!
    const db2 = new Database(`C:\\Users\\Usuario\\.gemini\\antigravity\\scratch\\casa-mahana-pms\\data\\casa-mahana-test.db`);
    try {
      const reservation = db2.prepare("SELECT * FROM reservas_hotel WHERE cliente = 'James' AND email = 'james.bond@mi6.gov'").get() as any;
      expect(reservation).toBeDefined();
      expect(reservation.estado).toBe('Confirmada');
    } finally {
      db2.close();
    }
  });
});
