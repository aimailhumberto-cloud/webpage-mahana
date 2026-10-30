import { test, expect } from '@playwright/test';

test.describe('Casa Mahana Landing & Showcase E2E Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Intercept PMS booking redirects cleanly
    await page.route('https://casa-mahana-pms.onrender.com/**', route => {
      return route.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>PMS</body></html>' });
    });
    // Navigate to homepage before each test
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  // Helper function to switch language to English
  const switchToEnglish = async (page: any) => {
    const switcher = page.locator('button[aria-label="Switch Language"]').first();
    await expect(switcher).toBeVisible();
    
    const text = await switcher.innerText();
    if (text.includes('EN')) {
      await switcher.click();
      await page.waitForTimeout(100);
    }
  };

  // Helper function to switch language to Spanish
  const switchToSpanish = async (page: any) => {
    const switcher = page.locator('button[aria-label="Switch Language"]').first();
    await expect(switcher).toBeVisible();
    
    const text = await switcher.innerText();
    if (text.includes('ES')) {
      await switcher.click();
      await page.waitForTimeout(100);
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
    await expect(page.locator('nav a:has-text("Tours")')).toBeVisible();
    await expect(page.locator('nav a:has-text("Surf Shack")')).not.toBeVisible();
    await expect(page.locator('nav a:has-text("Events")')).toBeVisible();
    
    // Check CTA button in English
    await expect(page.locator('header button:has-text("Book Lodging")').first()).toBeVisible();
  });

  test('2. Should display hero headline and subheadline correctly in English', async ({ page }) => {
    await switchToEnglish(page);
    
    await expect(page.locator('text=Your Tropical Sanctuary in the Heart of Chame')).toBeVisible();
    await expect(page.locator('text=Casa Mahana Lodge & Restaurant — Relax by 3 crystal pools, lush tropical nature, and wood-fired artisanal cuisine in Chame.')).toBeVisible();
    
    // Hero booking bar submit button
    await expect(page.locator('section#inicio button[type="submit"]')).toBeVisible();
  });

  test('3. Should display facilities section title, subtitle, and card details in English', async ({ page }) => {
    await switchToEnglish(page);
    
    await expect(page.locator('section#instalaciones h2:has-text("Our Facilities")')).toBeVisible();
    await expect(page.locator('text=Amenities designed for your absolute relaxation')).toBeVisible();
    
    // Facilities cards
    await expect(page.locator('section#instalaciones h3:has-text("Tropical Pool")')).toBeVisible();
    await expect(page.locator('text=A crystal-clear pool surrounded by lush vegetation, lounge chairs, and great ambient music.')).toBeVisible();
    await expect(page.locator('section#instalaciones h3:has-text("Gourmet Restaurant & Bar")')).toBeVisible();
    await expect(page.locator('section#instalaciones h3:has-text("Lounge & Rest Areas")')).toBeVisible();
  });

  test('4. Should display restaurant section details and dish descriptions in English', async ({ page }) => {
    await switchToEnglish(page);
    
    await expect(page.locator('section#restaurante h2 span:has-text("Lodge & Restaurant")')).toBeVisible();
    await expect(page.locator('text=A tropical journey of flavors in the heart of Chame')).toBeVisible();
    
    // Dishes details scoped to restaurant section
    await expect(page.locator('section#restaurante h3:has-text("Wood-fired Pizzas")')).toBeVisible();
    await expect(page.locator('text=Delicious artisanal pizzas baked fresh in our oven with top-quality ingredients.')).toBeVisible();
    await expect(page.locator('section#restaurante h3:has-text("Fresh Seafood")')).toBeVisible();
    await expect(page.locator('section#restaurante h3:has-text("Gourmet Burgers")')).toBeVisible();
  });

  test('5. Should display reviews section title and aggregate ratings in English', async ({ page }) => {
    await switchToEnglish(page);
    
    await expect(page.locator('text=Excellent 4.2 out of 5 stars')).toBeVisible();
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
    await expect(page.locator('nav a:has-text("Tours")')).toBeVisible();
    await expect(page.locator('nav a:has-text("Surf Shack")')).not.toBeVisible();
    await expect(page.locator('nav a:has-text("Eventos")')).toBeVisible();
    
    // Check CTA button in Spanish
    await expect(page.locator('header button:has-text("Reservar Hospedaje")').first()).toBeVisible();
  });

  test('7. Should display hero headline and subheadline correctly in Spanish', async ({ page }) => {
    await switchToSpanish(page);
    
    await expect(page.locator('text=Tu Refugio Tropical en el Corazón de Chame')).toBeVisible();
    await expect(page.locator('text=Casa Mahana Lodge & Restaurante — Relájate entre 3 piscinas cristalinas, naturaleza tropical y nuestra gastronomía artesanal al horno de leña en Chame.')).toBeVisible();
    
    // Hero booking bar submit button
    await expect(page.locator('section#inicio button[type="submit"]')).toBeVisible();
  });

  test('8. Should display facilities section title, subtitle, and card details in Spanish', async ({ page }) => {
    await switchToSpanish(page);
    
    await expect(page.locator('section#instalaciones h2:has-text("Nuestras Instalaciones")')).toBeVisible();
    await expect(page.locator('text=Amenidades diseñadas para tu descanso absoluto')).toBeVisible();
    
    // Facilities cards
    await expect(page.locator('section#instalaciones h3:has-text("Piscina Tropical")')).toBeVisible();
    await expect(page.locator('text=Una piscina cristalina rodeada de vegetación, camastros y excelente música ambiental.')).toBeVisible();
    await expect(page.locator('section#instalaciones h3:has-text("Restaurante Gourmet & Bar")')).toBeVisible();
    await expect(page.locator('section#instalaciones h3:has-text("Áreas de Descanso")')).toBeVisible();
  });

  test('9. Should display restaurant section details and dish descriptions in Spanish', async ({ page }) => {
    await switchToSpanish(page);
    
    await expect(page.locator('section#restaurante h2 span:has-text("Lodge & Restaurante")')).toBeVisible();
    await expect(page.locator('text=Un viaje de sabores tropicales en el corazón de Chame')).toBeVisible();
    
    // Dishes details scoped to restaurant section
    await expect(page.locator('section#restaurante h3:has-text("Pizzas a la Leña")')).toBeVisible();
    await expect(page.locator('text=Deliciosas pizzas artesanales horneadas al momento con ingredientes frescos.')).toBeVisible();
    await expect(page.locator('section#restaurante h3:has-text("Mariscos Frescos")')).toBeVisible();
    await expect(page.locator('section#restaurante h3:has-text("Hamburguesas Gourmet")')).toBeVisible();
  });

  test('10. Should display reviews section title and aggregate ratings in Spanish', async ({ page }) => {
    await switchToSpanish(page);
    
    await expect(page.locator('text=Excelente 4.2 de 5 estrellas')).toBeVisible();
    await expect(page.locator('text=Basado en más de 590 opiniones verificadas de huéspedes en nuestro perfil de Google.')).toBeVisible();
  });

  // ==========================================
  // GROUP 3: LANGUAGE SWITCHER DYNAMIC TOGGLING (5 cases)
  // ==========================================

  test('11. Should dynamically toggle header navigation text on language switch', async ({ page }) => {
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
    await expect(page.locator('text=Tu Refugio Tropical en el Corazón de Chame')).toBeVisible();
    
    // Switch to EN
    await page.locator('button[aria-label="Switch Language"]').first().click();
    await expect(page.locator('text=Your Tropical Sanctuary in the Heart of Chame')).toBeVisible();
    
    // Switch back
    await page.locator('button[aria-label="Switch Language"]').first().click();
    await expect(page.locator('text=Tu Refugio Tropical en el Corazón de Chame')).toBeVisible();
  });

  test('13. Should dynamically toggle Facilities cards text on language switch', async ({ page }) => {
    await switchToSpanish(page);
    await expect(page.locator('section#instalaciones h3:has-text("Piscina Tropical")')).toBeVisible();
    
    // Switch to EN
    await page.locator('button[aria-label="Switch Language"]').first().click();
    await expect(page.locator('section#instalaciones h3:has-text("Tropical Pool")')).toBeVisible();
    
    // Switch back
    await page.locator('button[aria-label="Switch Language"]').first().click();
    await expect(page.locator('section#instalaciones h3:has-text("Piscina Tropical")')).toBeVisible();
  });

  test('14. Should dynamically toggle Restaurant dishes details on language switch', async ({ page }) => {
    await switchToSpanish(page);
    await expect(page.locator('section#restaurante h3:has-text("Pizzas a la Leña")')).toBeVisible();
    
    // Switch to EN
    await page.locator('button[aria-label="Switch Language"]').first().click();
    await expect(page.locator('section#restaurante h3:has-text("Wood-fired Pizzas")')).toBeVisible();
    
    // Switch back
    await page.locator('button[aria-label="Switch Language"]').first().click();
    await expect(page.locator('section#restaurante h3:has-text("Pizzas a la Leña")')).toBeVisible();
  });

  test('15. Should dynamically toggle Reviews list and details on language switch', async ({ page }) => {
    await switchToSpanish(page);
    await expect(page.locator('text=Excelente 4.2 de 5 estrellas')).toBeVisible();
    
    // Switch to EN
    await page.locator('button[aria-label="Switch Language"]').first().click();
    await expect(page.locator('text=Excellent 4.2 out of 5 stars')).toBeVisible();
    
    // Switch back
    await page.locator('button[aria-label="Switch Language"]').first().click();
    await expect(page.locator('text=Excelente 4.2 de 5 estrellas')).toBeVisible();
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
    await expect(page.locator('text=Alojamiento confortable con desayuno completo de cortesía').first()).toBeVisible();
    
    // Check inclusions
    await expect(page.getByText('Desayuno completo de cortesía', { exact: true })).toBeVisible();
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
    let redirectedUrl = '';
    await page.route('https://casa-mahana-pms.onrender.com/**', route => {
      redirectedUrl = route.request().url();
      return route.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>PMS</body></html>' });
    });

    await page.goto('/experiencias');
    await page.waitForLoadState('domcontentloaded');
    
    // Click CTA for Mahana Experience (Stay)
    await page.locator('button:has-text("Reservar Estadía")').click();
    
    // Verify PMS redirected URL captures plan and category
    await expect.poll(() => redirectedUrl).toContain('plan=mahana_exp');
    await expect.poll(() => redirectedUrl).toContain('category=Estad%C3%ADa');
  });
});
