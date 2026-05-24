import { test, expect } from '@playwright/test';
import { resetDatabase } from './utils/db-helpers';
import Database from 'better-sqlite3';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const boundaryFilename = fileURLToPath(import.meta.url);
const boundaryDirname = path.dirname(boundaryFilename);

test.describe('Casa Mahana E2E Tier 2 Boundary & Corner Cases', () => {
  let tempTxtPath: string;
  let tempExePath: string;
  let tempJpgPath: string;
  let tempPdfPath: string;
  let tempPngPath: string;
  let tempWebpPath: string;

  test.beforeAll(() => {
    // Dynamically create temporary test files for uploads
    const assetsDir = path.join(boundaryDirname, 'assets');
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }
    
    tempTxtPath = path.join(assetsDir, 'test-boundary.txt');
    tempExePath = path.join(assetsDir, 'test-boundary.exe');
    tempJpgPath = path.join(assetsDir, 'test-boundary.jpg');
    tempPdfPath = path.join(assetsDir, 'test-boundary.pdf');
    tempPngPath = path.join(assetsDir, 'test-boundary.png');
    tempWebpPath = path.join(assetsDir, 'test-boundary.webp');

    fs.writeFileSync(tempTxtPath, 'Dummy content for txt file');
    fs.writeFileSync(tempExePath, 'MZ\x90\x00\x03\x00\x00\x00Dummy executable content');
    fs.writeFileSync(tempJpgPath, 'Dummy JPG content');
    fs.writeFileSync(tempPdfPath, '%PDF-1.4 Dummy PDF content');
    fs.writeFileSync(tempPngPath, '\x89PNG\r\n\x1a\nDummy PNG content');
    fs.writeFileSync(tempWebpPath, 'RIFF\x00\x00\x00\x00WEBPVP8 Dummy WebP content');
  });

  test.afterAll(() => {
    // Clean up temporary files
    [tempTxtPath, tempExePath, tempJpgPath, tempPdfPath, tempPngPath, tempWebpPath].forEach(p => {
      if (fs.existsSync(p)) {
        fs.unlinkSync(p);
      }
    });
  });

  test.beforeEach(async () => {
    // Reset database to ensure clean state
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

  // ==========================================
  // GROUP 1: DATE PICKER & VALIDATIONS (8 cases)
  // ==========================================

  test('1. Check-in date: Min attribute should be today', async ({ page }) => {
    await page.goto('/reservar');
    const checkInInput = page.locator('label:has-text("Fecha de Check-in") + input[type="date"]');
    const minVal = await checkInInput.getAttribute('min');
    const todayStr = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Panama' });
    expect(minVal).toBe(todayStr);
  });

  test('2. Check-in date: Setting yesterday should not be allowed (value remains empty or invalid)', async ({ page }) => {
    await page.goto('/reservar');
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const checkInInput = page.locator('label:has-text("Fecha de Check-in") + input[type="date"]');
    await checkInInput.fill(yesterday);
    
    // Check search button remains disabled
    const searchBtn = page.locator('button:has-text("Ver Disponibilidad")');
    await expect(searchBtn).toBeDisabled();
  });

  test('3. Check-in date: Setting a valid future date is allowed', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr } = getFutureDates();
    const checkInInput = page.locator('label:has-text("Fecha de Check-in") + input[type="date"]');
    await checkInInput.fill(checkInStr);
    const val = await checkInInput.inputValue();
    expect(val).toBe(checkInStr);
  });

  test('4. Check-out date (Stay): Min check-out date attribute is check-in + 1 day', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);

    const checkOutInput = page.locator('label:has-text("Fecha de Check-out") + input[type="date"]');
    const minVal = await checkOutInput.getAttribute('min');

    const checkInDate = new Date(checkInStr + 'T00:00:00');
    checkInDate.setDate(checkInDate.getDate() + 1);
    const expectedMin = checkInDate.toISOString().split('T')[0];

    expect(minVal).toBe(expectedMin);
  });

  test('5. Check-out date (Stay): Setting check-out equal to check-in is blocked by native min validation', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    
    const checkOutInput = page.locator('label:has-text("Fecha de Check-out") + input[type="date"]');
    await checkOutInput.fill(checkInStr);
    
    const searchBtn = page.locator('button:has-text("Ver Disponibilidad")');
    await expect(searchBtn).toBeDisabled();
  });

  test('6. Check-out date (Stay): Setting check-out in the past is blocked by native validation', async ({ page }) => {
    await page.goto('/reservar');
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const { checkInStr } = getFutureDates();
    
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    const checkOutInput = page.locator('label:has-text("Fecha de Check-out") + input[type="date"]');
    await checkOutInput.fill(yesterday);
    
    const searchBtn = page.locator('button:has-text("Ver Disponibilidad")');
    await expect(searchBtn).toBeDisabled();
  });

  test('7. Visit date (Pasadía): Setting a future visit date is allowed', async ({ page }) => {
    await page.goto('/reservar');
    await page.locator('button:has-text("Pasadía (Por el día)")').click();
    
    const { checkInStr } = getFutureDates();
    const visitInput = page.locator('label:has-text("Fecha de Visita") + input[type="date"]');
    await visitInput.fill(checkInStr);
    
    const val = await visitInput.inputValue();
    expect(val).toBe(checkInStr);
  });

  test('8. Visit date (Pasadía): Search is allowed with just visit date', async ({ page }) => {
    await page.goto('/reservar');
    await page.locator('button:has-text("Pasadía (Por el día)")').click();
    
    const { checkInStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Visita") + input[type="date"]').fill(checkInStr);
    
    const searchBtn = page.locator('button:has-text("Ver Disponibilidad")');
    await expect(searchBtn).toBeEnabled();
  });


  // ==========================================
  // GROUP 2: GUEST CAPACITY BOUNDARIES (8 cases)
  // ==========================================

  test('9. Estándar room capacity warning: Try to set to 4 guests (max physical capacity is 3) and verify warning is shown', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    // Add Estándar room to cart
    await getRoomCard(page, 'Estándar').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');

    // Estándar is Room 1. Increment adults to 4
    const room1 = getRoomGroup(page, 1);
    // Initial adults is 1. Click "+" three times
    await room1.locator('button:has-text("+")').first().click();
    await room1.locator('button:has-text("+")').first().click();
    await room1.locator('button:has-text("+")').first().click();

    // Verify warning is visible
    await expect(room1.locator('span:has-text("Supera Capacidad")')).toBeVisible();
    // Verify guest info button is disabled due to capacity issue
    const nextBtn = page.locator('button:has-text("Siguiente: Datos de Huésped")');
    await expect(nextBtn).toBeDisabled();
  });

  test('10. Estándar room capacity warning: Try to set to 1 guest (min capacity is 2) and verify warning is shown', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    // Add Estándar room to cart
    await getRoomCard(page, 'Estándar').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');

    // Room 1 (Estándar) default is 1 adult, 0 minors. Total is 1, which is below min cap 2.
    const room1 = getRoomGroup(page, 1);
    await expect(room1.locator('span:has-text("Supera Capacidad")')).toBeVisible();
  });

  test('11. Doble room capacity warning: Try to set to 5 guests (max physical capacity is 4) and verify warning', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    await getRoomCard(page, 'Doble').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');

    // Doble is Room 1. Increment guests to 5
    const room1 = getRoomGroup(page, 1);
    // Click "+" for adults 4 times (making it 5)
    await room1.locator('button:has-text("+")').first().click();
    await room1.locator('button:has-text("+")').first().click();
    await room1.locator('button:has-text("+")').first().click();
    await room1.locator('button:has-text("+")').first().click();

    await expect(room1.locator('span:has-text("Supera Capacidad")')).toBeVisible();
  });

  test('12. Doble room capacity warning: Try to set to 1 guest (min capacity is 2) and verify warning', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    await getRoomCard(page, 'Doble').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');

    const room1 = getRoomGroup(page, 1);
    await expect(room1.locator('span:has-text("Supera Capacidad")')).toBeVisible();
  });

  test('13. Familiar room capacity warning: Try to set to 7 guests (max physical capacity is 6) and verify warning', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    await getRoomCard(page, 'Familiar').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');

    const room1 = getRoomGroup(page, 1);
    // Familiar has 1 adult by default. Click "+" 6 times to reach 7 adults
    for (let i = 0; i < 6; i++) {
      await room1.locator('button:has-text("+")').first().click();
    }

    await expect(room1.locator('span:has-text("Supera Capacidad")')).toBeVisible();
  });

  test('14. Familiar room capacity warning: Try to set to 1 guest (min capacity is 2) and verify warning', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    await getRoomCard(page, 'Familiar').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');

    const room1 = getRoomGroup(page, 1);
    await expect(room1.locator('span:has-text("Supera Capacidad")')).toBeVisible();
  });

  test('15. Camping room capacity warning: Try to set to 3 guests (max physical capacity is 2) and verify warning', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    await getRoomCard(page, 'Camping').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');

    const room1 = getRoomGroup(page, 1);
    // Camping has 1 adult default. Click "+" twice to reach 3 adults
    await room1.locator('button:has-text("+")').first().click();
    await room1.locator('button:has-text("+")').first().click();

    await expect(room1.locator('span:has-text("Supera Capacidad")')).toBeVisible();
  });

  test('16. Zero adults selected warning: Try to set adults to 0 and verify warning message', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    await getRoomCard(page, 'Estándar').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');

    const room1 = getRoomGroup(page, 1);
    // Decrement adults to 0
    await room1.locator('button:has-text("-")').first().click();

    await expect(room1.locator('p:has-text("Debe haber al menos 1 adulto en cada habitación.")')).toBeVisible();
  });


  // ==========================================
  // GROUP 3: PET SELECTION RULES (4 cases)
  // ==========================================

  test('17. Pet selection: Adding 0 pets is valid and proceedable', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '2' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    await getRoomCard(page, 'Estándar').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');

    const nextBtn = page.locator('button:has-text("Siguiente: Datos de Huésped")');
    await expect(nextBtn).toBeEnabled();
  });

  test('18. Pet limit check: Try to select 10 pets in Step 3 and verify UI limits', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '2' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    await getRoomCard(page, 'Estándar').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');

    const room1 = getRoomGroup(page, 1);
    // Increment pets (click "+" 11 times to test cap)
    const petPlus = room1.locator('button:has-text("+")').nth(2);
    for (let i = 0; i < 11; i++) {
      await petPlus.click();
    }
    // Verify it doesn't allow setting 11 pets (quantity caps at 10)
    await expect(room1.locator('span:has-text("10")').first()).toBeVisible();
  });

  test('19. Stays category plan with pets: Adding a pet correctly updates pricing subtotal', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '2' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    await getRoomCard(page, 'Estándar').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');

    const initialTotalText = await page.locator('span:has-text("Hab. Total") + span').first().innerText();
    const initialTotal = parseFloat(initialTotalText.replace('$', ''));

    const room1 = getRoomGroup(page, 1);
    // Increment pet to 1
    await room1.locator('button:has-text("+")').nth(2).click();
    await page.waitForTimeout(1000); // Wait for API cotizar fetch

    const newTotalText = await page.locator('span:has-text("Hab. Total") + span').first().innerText();
    const newTotal = parseFloat(newTotalText.replace('$', ''));

    expect(newTotal).toBeGreaterThan(initialTotal);
  });

  test('20. Pasadía category plan with pets: Surcharge is 0 and does not change subtotal', async ({ page }) => {
    await page.goto('/reservar');
    await page.locator('button:has-text("Pasadía (Por el día)")').click();
    
    const { checkInStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Visita") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '2' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    // Rate plan: pasadia_comidas
    await getRoomCard(page, 'Bohío').locator('select').selectOption({ value: 'pasadia_comidas' });
    await getRoomCard(page, 'Bohío').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');

    const initialTotalText = await page.locator('span:has-text("Hab. Total") + span').first().innerText();
    const initialTotal = parseFloat(initialTotalText.replace('$', ''));

    const room1 = getRoomGroup(page, 1);
    // Increment pet to 1
    await room1.locator('button:has-text("+")').nth(2).click();
    await page.waitForTimeout(1000); // Wait for API cotizar fetch

    const newTotalText = await page.locator('span:has-text("Hab. Total") + span').first().innerText();
    const newTotal = parseFloat(newTotalText.replace('$', ''));

    expect(newTotal).toBe(initialTotal);
  });


  // ==========================================
  // GROUP 4: GUEST INFORMATION FIELDS (6 cases)
  // ==========================================

  test('21. Guest details: Empty name prevents proceeding to next step (button disabled)', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '2' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    await getRoomCard(page, 'Estándar').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');
    await page.click('button:has-text("Siguiente: Datos de Huésped")');

    // Fill form without Name
    await page.locator('label:has-text("Apellido") + input').fill('Doe');
    await page.locator('label:has-text("Correo Electrónico") + input').fill('john.doe@test.com');

    const payBtn = page.locator('button:has-text("Siguiente: Proceder al Pago")');
    await expect(payBtn).toBeDisabled();
  });

  test('22. Guest details: Empty last name prevents proceeding to next step', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '2' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    await getRoomCard(page, 'Estándar').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');
    await page.click('button:has-text("Siguiente: Datos de Huésped")');

    // Fill form without Lastname
    await page.locator('label:has-text("Nombre") + input').fill('John');
    await page.locator('label:has-text("Correo Electrónico") + input').fill('john.doe@test.com');

    const payBtn = page.locator('button:has-text("Siguiente: Proceder al Pago")');
    await expect(payBtn).toBeDisabled();
  });

  test('23. Guest details: Empty email prevents proceeding to next step', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '2' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    await getRoomCard(page, 'Estándar').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');
    await page.click('button:has-text("Siguiente: Datos de Huésped")');

    // Fill form without Email
    await page.locator('label:has-text("Nombre") + input').fill('John');
    await page.locator('label:has-text("Apellido") + input').fill('Doe');

    const payBtn = page.locator('button:has-text("Siguiente: Proceder al Pago")');
    await expect(payBtn).toBeDisabled();
  });

  test('24. Guest details: Malformed email (no @) is not allowed', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '2' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    await getRoomCard(page, 'Estándar').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');
    await page.click('button:has-text("Siguiente: Datos de Huésped")');

    // Fill form with malformed email
    await page.locator('label:has-text("Nombre") + input').fill('John');
    await page.locator('label:has-text("Apellido") + input').fill('Doe');
    await page.locator('label:has-text("Correo Electrónico") + input').fill('invalidemail.com');

    const payBtn = page.locator('button:has-text("Siguiente: Proceder al Pago")');
    await expect(payBtn).toBeDisabled();
  });

  test('25. Guest details: Special characters in name are allowed and handled', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '2' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    await getRoomCard(page, 'Estándar').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');
    await page.click('button:has-text("Siguiente: Datos de Huésped")');

    await page.locator('label:has-text("Nombre") + input').fill('Jean-François');
    await page.locator('label:has-text("Apellido") + input').fill('O\'Connor');
    await page.locator('label:has-text("Correo Electrónico") + input').fill('jean.francois@test.com');

    const payBtn = page.locator('button:has-text("Siguiente: Proceder al Pago")');
    await expect(payBtn).toBeEnabled();
  });

  test('26. Guest details: Long names are accepted and fit the field constraints', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '2' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    await getRoomCard(page, 'Estándar').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');
    await page.click('button:has-text("Siguiente: Datos de Huésped")');

    const longName = 'A'.repeat(80);
    const longLastname = 'B'.repeat(80);

    await page.locator('label:has-text("Nombre") + input').fill(longName);
    await page.locator('label:has-text("Apellido") + input').fill(longLastname);
    await page.locator('label:has-text("Correo Electrónico") + input').fill('test@longname.com');

    const payBtn = page.locator('button:has-text("Siguiente: Proceder al Pago")');
    await expect(payBtn).toBeEnabled();
  });


  // ==========================================
  // GROUP 5: DOUBLE-SUBMISSION & BUTTON STATE (3 cases)
  // ==========================================

  test('27. Submission boundaries: Confirm offline button becomes disabled after being clicked', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '2' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    await getRoomCard(page, 'Estándar').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');
    await page.click('button:has-text("Siguiente: Datos de Huésped")');

    await page.locator('label:has-text("Nombre") + input').fill('Maria');
    await page.locator('label:has-text("Apellido") + input').fill('Gomez');
    await page.locator('label:has-text("Correo Electrónico") + input').fill('maria.gomez@test.com');
    await page.click('button:has-text("Siguiente: Proceder al Pago")');

    await page.locator('button:has-text("Transferencia / Yappy / Cupón")').click();
    await page.locator('label:has-text("Referencia de Transacción") + input').fill('REF-DOUBLE-SUBMIT');

    // Upload receipt file chooser
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('#public-receipt-input').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(tempJpgPath);

    const submitBtn = page.locator('button:has-text("Confirmar Reserva y Subir Recibo")');
    await expect(submitBtn).toBeEnabled();

    // Click it and check it is disabled immediately
    await submitBtn.click();
    await expect(submitBtn).toBeDisabled();
  });

  test('28. Submission boundaries: Confirm offline button disabled until reference is inputted', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '2' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    await getRoomCard(page, 'Estándar').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');
    await page.click('button:has-text("Siguiente: Datos de Huésped")');

    await page.locator('label:has-text("Nombre") + input').fill('Maria');
    await page.locator('label:has-text("Apellido") + input').fill('Gomez');
    await page.locator('label:has-text("Correo Electrónico") + input').fill('maria.gomez@test.com');
    await page.click('button:has-text("Siguiente: Proceder al Pago")');

    await page.locator('button:has-text("Transferencia / Yappy / Cupón")').click();

    // Upload file
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('#public-receipt-input').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(tempJpgPath);

    const submitBtn = page.locator('button:has-text("Confirmar Reserva y Subir Recibo")');
    await expect(submitBtn).toBeDisabled(); // Disabled due to missing reference
  });

  test('29. Submission boundaries: Disabling occurs if uploaded receipt is subsequently removed', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '2' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    await getRoomCard(page, 'Estándar').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');
    await page.click('button:has-text("Siguiente: Datos de Huésped")');

    await page.locator('label:has-text("Nombre") + input').fill('Maria');
    await page.locator('label:has-text("Apellido") + input').fill('Gomez');
    await page.locator('label:has-text("Correo Electrónico") + input').fill('maria.gomez@test.com');
    await page.click('button:has-text("Siguiente: Proceder al Pago")');

    await page.locator('button:has-text("Transferencia / Yappy / Cupón")').click();
    await page.locator('label:has-text("Referencia de Transacción") + input').fill('REF-REMOVE-FILE');

    // Upload file
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('#public-receipt-input').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(tempJpgPath);

    const submitBtn = page.locator('button:has-text("Confirmar Reserva y Subir Recibo")');
    await expect(submitBtn).toBeEnabled();

    // Click remove file
    await page.click('button:has-text("Remover archivo")');
    await expect(submitBtn).toBeDisabled();
  });


  // ==========================================
  // GROUP 6: FILE UPLOAD BOUNDARIES & REJECTIONS (6 cases)
  // ==========================================

  test('30. File upload: Rejecting .exe files with alerts', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '2' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    await getRoomCard(page, 'Estándar').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');
    await page.click('button:has-text("Siguiente: Datos de Huésped")');

    await page.locator('label:has-text("Nombre") + input').fill('Maria');
    await page.locator('label:has-text("Apellido") + input').fill('Gomez');
    await page.locator('label:has-text("Correo Electrónico") + input').fill('maria.gomez@test.com');
    await page.click('button:has-text("Siguiente: Proceder al Pago")');

    await page.locator('button:has-text("Transferencia / Yappy / Cupón")').click();
    await page.locator('label:has-text("Referencia de Transacción") + input').fill('REF-EXE');

    // Catch the dialog alert
    let dialogMessage = '';
    page.once('dialog', dialog => {
      dialogMessage = dialog.message();
      dialog.accept();
    });

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('#public-receipt-input').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(tempExePath);

    expect(dialogMessage).toContain('Solo se permiten imágenes JPG, PNG, WebP o archivos PDF');
  });

  test('31. File upload: Rejecting .txt files with alerts', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '2' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    await getRoomCard(page, 'Estándar').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');
    await page.click('button:has-text("Siguiente: Datos de Huésped")');

    await page.locator('label:has-text("Nombre") + input').fill('Maria');
    await page.locator('label:has-text("Apellido") + input').fill('Gomez');
    await page.locator('label:has-text("Correo Electrónico") + input').fill('maria.gomez@test.com');
    await page.click('button:has-text("Siguiente: Proceder al Pago")');

    await page.locator('button:has-text("Transferencia / Yappy / Cupón")').click();
    await page.locator('label:has-text("Referencia de Transacción") + input').fill('REF-TXT');

    let dialogMessage = '';
    page.once('dialog', dialog => {
      dialogMessage = dialog.message();
      dialog.accept();
    });

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('#public-receipt-input').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(tempTxtPath);

    expect(dialogMessage).toContain('Solo se permiten imágenes JPG, PNG, WebP o archivos PDF');
  });

  test('32. File upload: Accepting valid .jpg file', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '2' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    await getRoomCard(page, 'Estándar').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');
    await page.click('button:has-text("Siguiente: Datos de Huésped")');

    await page.locator('label:has-text("Nombre") + input').fill('Maria');
    await page.locator('label:has-text("Apellido") + input').fill('Gomez');
    await page.locator('label:has-text("Correo Electrónico") + input').fill('maria.gomez@test.com');
    await page.click('button:has-text("Siguiente: Proceder al Pago")');

    await page.locator('button:has-text("Transferencia / Yappy / Cupón")').click();
    await page.locator('label:has-text("Referencia de Transacción") + input').fill('REF-JPG');

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('#public-receipt-input').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(tempJpgPath);

    await expect(page.locator('p:has-text("test-boundary.jpg")')).toBeVisible();
  });

  test('33. File upload: Accepting valid .pdf file', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '2' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    await getRoomCard(page, 'Estándar').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');
    await page.click('button:has-text("Siguiente: Datos de Huésped")');

    await page.locator('label:has-text("Nombre") + input').fill('Maria');
    await page.locator('label:has-text("Apellido") + input').fill('Gomez');
    await page.locator('label:has-text("Correo Electrónico") + input').fill('maria.gomez@test.com');
    await page.click('button:has-text("Siguiente: Proceder al Pago")');

    await page.locator('button:has-text("Transferencia / Yappy / Cupón")').click();
    await page.locator('label:has-text("Referencia de Transacción") + input').fill('REF-PDF');

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('#public-receipt-input').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(tempPdfPath);

    await expect(page.locator('p:has-text("test-boundary.pdf")')).toBeVisible();
  });

  test('34. File upload: Accepting valid .png file', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '2' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    await getRoomCard(page, 'Estándar').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');
    await page.click('button:has-text("Siguiente: Datos de Huésped")');

    await page.locator('label:has-text("Nombre") + input').fill('Maria');
    await page.locator('label:has-text("Apellido") + input').fill('Gomez');
    await page.locator('label:has-text("Correo Electrónico") + input').fill('maria.gomez@test.com');
    await page.click('button:has-text("Siguiente: Proceder al Pago")');

    await page.locator('button:has-text("Transferencia / Yappy / Cupón")').click();
    await page.locator('label:has-text("Referencia de Transacción") + input').fill('REF-PNG');

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('#public-receipt-input').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(tempPngPath);

    await expect(page.locator('p:has-text("test-boundary.png")')).toBeVisible();
  });

  test('35. File upload: Accepting valid .webp file', async ({ page }) => {
    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '2' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    await getRoomCard(page, 'Estándar').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');
    await page.click('button:has-text("Siguiente: Datos de Huésped")');

    await page.locator('label:has-text("Nombre") + input').fill('Maria');
    await page.locator('label:has-text("Apellido") + input').fill('Gomez');
    await page.locator('label:has-text("Correo Electrónico") + input').fill('maria.gomez@test.com');
    await page.click('button:has-text("Siguiente: Proceder al Pago")');

    await page.locator('button:has-text("Transferencia / Yappy / Cupón")').click();
    await page.locator('label:has-text("Referencia de Transacción") + input').fill('REF-WEBP');

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('#public-receipt-input').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(tempWebpPath);

    await expect(page.locator('p:has-text("test-boundary.webp")')).toBeVisible();
  });


  // ==========================================
  // GROUP 7: FULLY BOOKED & HOLIDAYS (2 cases)
  // ==========================================

  test('36. Fully booked rooms: Verify error message when availability count is 0', async ({ page }) => {
    // We can simulate zero availability by querying a past/invalid state or we see if the DB-helpers has zeroed out.
    // Or we can manually query a date that we populate in DB before checking.
    // Let's manually populate reservations for all 3 Estándar rooms in the DB to block them!
    const db = new Database(`C:\\Users\\Usuario\\.gemini\\antigravity\\scratch\\casa-mahana-pms\\data\\casa-mahana-test.db`);
    try {
      // Habitaciones: EST(1)=10, EST(2)=11, EST(3)=12 are active rooms of Estándar type. Let's find room IDs for Estándar type
      const estRooms = db.prepare("SELECT id FROM habitaciones WHERE tipo = 'Estándar'").all() as any[];
      const { checkInStr, checkOutStr } = getFutureDates();
      
      const insertRes = db.prepare(`
        INSERT INTO reservas_hotel (cliente, apellido, email, check_in, check_out, noches, adultos, habitacion_id, tipo_habitacion, plan_codigo, estado)
        VALUES (?, ?, ?, ?, ?, 2, 2, ?, 'Estándar', 'mahana_exp', 'Pendiente')
      `);
      
      for (const room of estRooms) {
        insertRes.run('TestUser', 'Exhaust', 'exhaust@test.com', checkInStr, checkOutStr, room.id);
      }
    } finally {
      db.close();
    }

    await page.goto('/reservar');
    const { checkInStr, checkOutStr } = getFutureDates();
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill(checkInStr);
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill(checkOutStr);
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    // Verify Estándar is NOT visible as available!
    await expect(getRoomCard(page, 'Estándar')).not.toBeVisible();
  });

  test('37. Holiday pricing rate check: Verify holiday markup is correctly calculated', async ({ page }) => {
    // 2026-12-25 is Christmas (Holiday). Let's see if Christmas rates are applied.
    await page.goto('/reservar');
    await page.locator('label:has-text("Fecha de Check-in") + input[type="date"]').fill('2026-12-25');
    await page.locator('label:has-text("Fecha de Check-out") + input[type="date"]').fill('2026-12-27'); // 2 nights
    await page.locator('label:has-text("Adultos") + select').selectOption({ value: '2' });
    await page.locator('button:has-text("Ver Disponibilidad")').click();

    // Add Familiar room to cart (price should have holiday markup)
    await getRoomCard(page, 'Familiar').locator('button:has-text("+")').click();
    await page.click('button:has-text("Siguiente: Distribuir Huéspedes")');

    // Go to step 4
    // Assing guest configuration: Familiar requires min 2 adults, which is already configured since we searched for 2
    await page.click('button:has-text("Siguiente: Datos de Huésped")');

    // Verify subtotal or price is higher than standard rate
    // Mahana Experience plan base rate is $70 per adult night.
    // Christmas (festivo) markup is +50%, so $105 per adult night.
    // 2 adults * $105 * 2 nights = $420 subtotal.
    const subtotalText = await page.locator('span:has-text("Subtotal") + span').innerText();
    const subtotal = parseFloat(subtotalText.replace('$', ''));
    expect(subtotal).toBe(420);
  });
});
