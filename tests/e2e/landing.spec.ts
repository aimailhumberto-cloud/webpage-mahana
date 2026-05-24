import { test, expect } from '@playwright/test';

test.describe('Casa Mahana Landing & Showcase E2E Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage before each test
    await page.goto('/');
  });

  // Helper function to switch language to English
  const switchToEnglish = async (page: any) => {
    const switcher = page.locator('button[aria-label="Switch Language"]').first();
    await expect(switcher).toBeVisible();
    
    const text = await switcher.innerText();
    if (text.includes('EN')) {
      await switcher.click();
    }
  };

  // Helper function to switch language to Spanish
  const switchToSpanish = async (page: any) => {
    const switcher = page.locator('button[aria-label="Switch Language"]').first();
    await expect(switcher).toBeVisible();
    
    const text = await switcher.innerText();
    if (text.includes('ES')) {
      await switcher.click();
    }
  };

  // ==========================================
  // GROUP 1: ENGLISH LANDING PAGE ELEMENTS (5 cases)
  // ==========================================

  test('1. Should display header elements correctly in English when toggled to EN', async ({ page }) => {
    await switchToEnglish(page);
    
    // Check navigation buttons in English
    await expect(page.locator('nav a:has-text("Home")')).toBeVisible();
    await expect(page.locator('nav button:has-text("Lodging")')).toBeVisible();
    await expect(page.locator('nav button:has-text("Day Passes")')).toBeVisible();
    await expect(page.locator('nav a:has-text("Restaurant")')).toBeVisible();
    await expect(page.locator('nav a:has-text("Surf Shack")')).toBeVisible();
    await expect(page.locator('nav a:has-text("Events & Weddings")')).toBeVisible();
    
    // Check CTA button in English
    await expect(page.locator('button:has-text("Book Lodging")').first()).toBeVisible();
  });

  test('2. Should display hero headline and subheadline correctly in English', async ({ page }) => {
    await switchToEnglish(page);
    
    await expect(page.locator('text=Your Oceanfront Tropical Sanctuary')).toBeVisible();
    await expect(page.locator('text=Casa Mahana Lodge & Restaurant — Relax, enjoy the pool, and taste our exquisite gastronomy in Chame, Panama.')).toBeVisible();
    
    // Hero CTAs
    await expect(page.locator('section#inicio button:has-text("Book Lodging")')).toBeVisible();
    await expect(page.locator('section#inicio button:has-text("Pool Day Pass")')).toBeVisible();
  });

  test('3. Should display facilities section title, subtitle, and card details in English', async ({ page }) => {
    await switchToEnglish(page);
    
    await expect(page.locator('section#instalaciones h2:has-text("Our Facilities")')).toBeVisible();
    await expect(page.locator('text=Amenities designed for your absolute relaxation')).toBeVisible();
    
    // Facilities cards
    await expect(page.locator('text=🌊 Tropical Pool')).toBeVisible();
    await expect(page.locator('text=A crystal-clear pool surrounded by lush vegetation, lounge chairs, and great ambient music.')).toBeVisible();
    await expect(page.locator('text=🌴 Easy Beach Access')).toBeVisible();
    await expect(page.locator('text=⛱️ Lounge & Rest Areas')).toBeVisible();
  });

  test('4. Should display restaurant section details and dish descriptions in English', async ({ page }) => {
    await switchToEnglish(page);
    
    await expect(page.locator('section#restaurante span:has-text("Lodge & Restaurant")')).toBeVisible();
    await expect(page.locator('text=A tropical journey of flavors with sea breeze')).toBeVisible();
    
    // Dishes details
    await expect(page.locator('text=🍕 Wood-fired Pizzas')).toBeVisible();
    await expect(page.locator('text=Delicious artisanal pizzas baked fresh in our oven with top-quality ingredients.')).toBeVisible();
    await expect(page.locator('text=🐟 Fresh Seafood')).toBeVisible();
    await expect(page.locator('text=🍔 Gourmet Burgers')).toBeVisible();
  });

  test('5. Should display reviews section title and aggregate ratings in English', async ({ page }) => {
    await switchToEnglish(page);
    
    await expect(page.locator('text=Excellent 4.1 out of 5 stars')).toBeVisible();
    await expect(page.locator('text=Based on over 590 verified guest reviews on our Google Business profile.')).toBeVisible();
  });

  // ==========================================
  // GROUP 2: SPANISH LANDING PAGE ELEMENTS (5 cases)
  // ==========================================

  test('6. Should display header elements correctly in Spanish (default)', async ({ page }) => {
    await switchToSpanish(page);
    
    // Check navigation buttons in Spanish
    await expect(page.locator('nav a:has-text("Inicio")')).toBeVisible();
    await expect(page.locator('nav button:has-text("Hospedaje")')).toBeVisible();
    await expect(page.locator('nav button:has-text("Pasadías")')).toBeVisible();
    await expect(page.locator('nav a:has-text("Restaurante")')).toBeVisible();
    await expect(page.locator('nav a:has-text("Surf Shack")')).toBeVisible();
    await expect(page.locator('nav a:has-text("Eventos & Bodas")')).toBeVisible();
    
    // Check CTA button in Spanish
    await expect(page.locator('button:has-text("Reservar Hospedaje")').first()).toBeVisible();
  });

  test('7. Should display hero headline and subheadline correctly in Spanish', async ({ page }) => {
    await switchToSpanish(page);
    
    await expect(page.locator('text=Tu Refugio Tropical frente al Mar')).toBeVisible();
    await expect(page.locator('text=Casa Mahana Lodge & Restaurante — Relájate, disfruta de la piscina y degusta nuestra exquisita gastronomía en Chame, Panamá.')).toBeVisible();
    
    // Hero CTAs
    await expect(page.locator('section#inicio button:has-text("Reservar Hospedaje")')).toBeVisible();
    await expect(page.locator('section#inicio button:has-text("Pasadía de Piscina")')).toBeVisible();
  });

  test('8. Should display facilities section title, subtitle, and card details in Spanish', async ({ page }) => {
    await switchToSpanish(page);
    
    await expect(page.locator('section#instalaciones h2:has-text("Nuestras Instalaciones")')).toBeVisible();
    await expect(page.locator('text=Amenidades diseñadas para tu descanso absoluto')).toBeVisible();
    
    // Facilities cards
    await expect(page.locator('text=🌊 Piscina Tropical')).toBeVisible();
    await expect(page.locator('text=Una piscina cristalina rodeada de vegetación, camastros y excelente música ambiental.')).toBeVisible();
    await expect(page.locator('text=🌴 Acceso Cercano a Playa')).toBeVisible();
    await expect(page.locator('text=⛱️ Áreas de Descanso')).toBeVisible();
  });

  test('9. Should display restaurant section details and dish descriptions in Spanish', async ({ page }) => {
    await switchToSpanish(page);
    
    await expect(page.locator('section#restaurante span:has-text("Lodge & Restaurante")')).toBeVisible();
    await expect(page.locator('text=Un viaje de sabores tropicales frente a la brisa marina')).toBeVisible();
    
    // Dishes details
    await expect(page.locator('text=🍕 Pizzas a la Leña')).toBeVisible();
    await expect(page.locator('text=Deliciosas pizzas artesanales horneadas al momento con ingredientes frescos.')).toBeVisible();
    await expect(page.locator('text=🐟 Mariscos Frescos')).toBeVisible();
    await expect(page.locator('text=🍔 Hamburguesas Gourmet')).toBeVisible();
  });

  test('10. Should display reviews section title and aggregate ratings in Spanish', async ({ page }) => {
    await switchToSpanish(page);
    
    await expect(page.locator('text=Excelente 4.1 de 5 estrellas')).toBeVisible();
    await expect(page.locator('text=Basado en más de 590 opiniones verificadas de huéspedes en nuestro perfil de Google.')).toBeVisible();
  });

  // ==========================================
  // GROUP 3: LANGUAGE SWITCHER DYNAMIC TOGGLING (5 cases)
  // ==========================================

  test('11. Should dynamically toggle header navigation text on language switch', async ({ page }) => {
    // Starts in ES or toggle it to ES
    await switchToSpanish(page);
    await expect(page.locator('nav a:has-text("Inicio")')).toBeVisible();
    
    // Switch to EN
    await page.locator('button[aria-label="Switch Language"]').first().click();
    await expect(page.locator('nav a:has-text("Home")')).toBeVisible();
    
    // Switch back to ES
    await page.locator('button[aria-label="Switch Language"]').first().click();
    await expect(page.locator('nav a:has-text("Inicio")')).toBeVisible();
  });

  test('12. Should dynamically toggle Hero section content on language switch', async ({ page }) => {
    await switchToSpanish(page);
    await expect(page.locator('text=Tu Refugio Tropical frente al Mar')).toBeVisible();
    
    // Switch to EN
    await page.locator('button[aria-label="Switch Language"]').first().click();
    await expect(page.locator('text=Your Oceanfront Tropical Sanctuary')).toBeVisible();
    
    // Switch back
    await page.locator('button[aria-label="Switch Language"]').first().click();
    await expect(page.locator('text=Tu Refugio Tropical frente al Mar')).toBeVisible();
  });

  test('13. Should dynamically toggle Facilities cards text on language switch', async ({ page }) => {
    await switchToSpanish(page);
    await expect(page.locator('text=🌊 Piscina Tropical')).toBeVisible();
    
    // Switch to EN
    await page.locator('button[aria-label="Switch Language"]').first().click();
    await expect(page.locator('text=🌊 Tropical Pool')).toBeVisible();
    
    // Switch back
    await page.locator('button[aria-label="Switch Language"]').first().click();
    await expect(page.locator('text=🌊 Piscina Tropical')).toBeVisible();
  });

  test('14. Should dynamically toggle Restaurant dishes details on language switch', async ({ page }) => {
    await switchToSpanish(page);
    await expect(page.locator('text=🍕 Pizzas a la Leña')).toBeVisible();
    
    // Switch to EN
    await page.locator('button[aria-label="Switch Language"]').first().click();
    await expect(page.locator('text=🍕 Wood-fired Pizzas')).toBeVisible();
    
    // Switch back
    await page.locator('button[aria-label="Switch Language"]').first().click();
    await expect(page.locator('text=🍕 Pizzas a la Leña')).toBeVisible();
  });

  test('15. Should dynamically toggle Reviews list and details on language switch', async ({ page }) => {
    await switchToSpanish(page);
    await expect(page.locator('text=Excelente 4.1 de 5 estrellas')).toBeVisible();
    
    // Switch to EN
    await page.locator('button[aria-label="Switch Language"]').first().click();
    await expect(page.locator('text=Excellent 4.1 out of 5 stars')).toBeVisible();
    
    // Switch back
    await page.locator('button[aria-label="Switch Language"]').first().click();
    await expect(page.locator('text=Excelente 4.1 de 5 estrellas')).toBeVisible();
  });

  // ==========================================
  // GROUP 4: PRODUCT SHOWCASE PAGE (5 cases)
  // ==========================================

  test('16. Should navigate to Experiences page and display basic structure', async ({ page }) => {
    await page.goto('/experiencias');
    await expect(page.locator('h1:has-text("Elige tu Experiencia")')).toBeVisible();
    await expect(page.locator('text=Planes a tu medida para alojamiento o días de sol')).toBeVisible();
  });

  test('17. Should display Mahana Experience card details, inclusions, schedule, and CTA', async ({ page }) => {
    await page.goto('/experiencias');
    
    await expect(page.locator('h2:has-text("Mahana Experience")')).toBeVisible();
    await expect(page.locator('text=Alojamiento confortable con desayuno buffet incluido, acceso completo a piscina tropical, WiFi y estacionamiento privado.')).toBeVisible();
    
    // Check inclusions
    await expect(page.locator('text=Desayuno Buffet completo')).toBeVisible();
    await expect(page.locator('text=Acceso a Piscina & Áreas sociales')).toBeVisible();
    
    // Check schedule
    await expect(page.locator('text=Check-in: 3:00 PM / Check-out: 11:00 AM').first()).toBeVisible();
    
    // Check CTA button
    await expect(page.locator('button:has-text("Reservar Estadía")')).toBeVisible();
  });

  test('18. Should display Pool Day Pass card details, inclusions, schedule, and CTA', async ({ page }) => {
    await page.goto('/experiencias');
    
    await expect(page.locator('h2:has-text("Pasadía / Pool Day")')).toBeVisible();
    await expect(page.locator('text=Disfruta un día completo de relajación con acceso a piscina, playa y exquisita comida caribeña con cócteles refrescantes.')).toBeVisible();
    
    // Check inclusions
    await expect(page.locator('text=Acceso completo de 9 AM a 5 PM')).toBeVisible();
    await expect(page.locator('text=Almuerzo completo incluido')).toBeVisible();
    
    // Check schedule
    await expect(page.locator('text=Horario: 9:00 AM - 5:00 PM')).toBeVisible();
    
    // Check CTA button
    await expect(page.locator('button:has-text("Reservar Pasadía")')).toBeVisible();
  });

  test('19. Should display All-Inclusive card details, inclusions, schedule, and CTA', async ({ page }) => {
    await page.goto('/experiencias');
    
    await expect(page.locator('h2:has-text("Todo Incluido / All Inclusive")')).toBeVisible();
    await expect(page.locator('text=Olvídate de todo. Lodging de primer nivel con desayuno, almuerzo, cena, snacks ilimitados y barra de bebidas refrescantes.')).toBeVisible();
    
    // Check inclusions
    await expect(page.locator('text=Desayuno, almuerzo y cena completos')).toBeVisible();
    await expect(page.locator('text=Snacks y piqueos en piscina')).toBeVisible();
    
    // Check schedule
    await expect(page.locator('text=Check-in: 3:00 PM / Check-out: 11:00 AM').nth(1)).toBeVisible();
    
    // Check CTA button
    await expect(page.locator('button:has-text("Reservar Todo Incluido")')).toBeVisible();
  });

  test('20. Should navigate to Booking Wizard with correct state pre-filled when clicking a Product card CTA', async ({ page }) => {
    await page.goto('/experiencias');
    
    // Click CTA for Mahana Experience (Stay)
    await page.locator('button:has-text("Reservar Estadía")').click();
    
    // Verify navigating to booking and stay is active
    await expect(page).toHaveURL(/\/reservar/);
    
    const stayTab = page.locator('button:has-text("Estadía (Hospedaje)")');
    await expect(stayTab).toHaveClass(/bg-turquoise-700/); // selected tab style
    
    // Go back and try Day Pass
    await page.goto('/experiencias');
    await page.locator('button:has-text("Reservar Pasadía")').click();
    await expect(page).toHaveURL(/\/reservar/);
    
    const dayPassTab = page.locator('button:has-text("Pasadía (Por el día)")');
    await expect(dayPassTab).toHaveClass(/bg-turquoise-700/);
  });
});
