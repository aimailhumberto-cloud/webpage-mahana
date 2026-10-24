import { test, expect } from '@playwright/test';

test.describe('Casa Mahana E2E Tier 4 Real-World Workflows', () => {

  test.beforeEach(async ({ page }) => {
    // Intercept external PMS booking redirects
    await page.route('https://casa-mahana-pms.onrender.com/**', route => {
      return route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: '<html><body>PMS Mock Page</body></html>'
      });
    });
  });

  test('Workflow 1: Complete Guest Journey — Pasadías Hub to PMS Booking Redirection', async ({ page }) => {
    let capturedPmsUrl = '';
    await page.route('https://casa-mahana-pms.onrender.com/**', route => {
      capturedPmsUrl = route.request().url();
      return route.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>PMS</body></html>' });
    });

    // 1. Guest visits Pasadías Hub
    await page.goto('/pasadias');
    await page.waitForLoadState('domcontentloaded');

    // 2. Guest inspects Day Pass offerings
    await expect(page.getByText('Nuestras Opciones de Pasadía en Chame')).toBeVisible();
    await expect(page.getByText('$38.50')).toBeVisible();
    await expect(page.getByText('$5.50')).toBeVisible();

    // 3. Guest clicks "Ver Detalles" on Pool Day card
    await page.getByRole('button', { name: 'Ver Detalles' }).nth(1).click();
    await page.waitForURL('**/pasadias/pool-day');

    // 4. On dedicated Pool Day landing page, inspects highlights and clicks booking CTA
    await expect(page.locator('h1')).toContainText('Pool Day');
    const bookCta = page.getByRole('button', { name: 'Reservar Pool Day' });
    await bookCta.click();

    // 5. Verify redirection to PMS preserves planCode and category
    await expect.poll(() => capturedPmsUrl).toContain('plan=pasadia_entrada');
    await expect.poll(() => capturedPmsUrl).toContain('category=Pasad%C3%ADa');
  });

  test('Workflow 2: Complete Guest Journey — Culinary Exploration on /restaurante', async ({ page }) => {
    await page.goto('/restaurante');
    await page.waitForLoadState('domcontentloaded');

    // 1. Inspect restaurant header and schedule card
    await expect(page.locator('h1')).toContainText('Restaurante');
    await expect(page.getByText('Abierto al Público General', { exact: true })).toBeVisible();

    // 2. Open Digital Menu Sheet Modal
    const viewMenuBtn = page.getByRole('button', { name: 'Ver el Menú' });
    await viewMenuBtn.click();

    // Verify modal is opened displaying the restaurant menu sheet
    const modalImage = page.locator('img[alt="Casa Mahana printed menu"]');
    await expect(modalImage).toBeVisible();

    // 3. Close Menu Modal
    const closeModalBtn = page.getByRole('button', { name: 'Close menu' });
    await closeModalBtn.click();
    await expect(modalImage).toBeHidden();

    // 4. Explore culinary specialties
    await expect(page.getByRole('heading', { name: 'Pizza Pepperoni' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Ceviche de la Casa' })).toBeVisible();

    // 5. Click Day Pass Cross-Sell CTA
    const crossSellBtn = page.locator('button:has-text("Ver Detalles del Pasadía")');
    await crossSellBtn.click();
    await page.waitForURL('**/pasadias/todo-incluido');
    await expect(page.locator('h1')).toContainText('Pasadía Todo Incluido');
  });

  test('Workflow 3: Complete Guest Journey — Destination Wedding Inquiry on /eventos', async ({ page }) => {
    await page.goto('/eventos');
    await page.waitForLoadState('domcontentloaded');

    // 1. Inspect Weddings & Events page title
    await expect(page.getByRole('heading', { name: 'Eventos & Bodas' })).toBeVisible();
    await expect(page.getByText('Bodas de Ensueño')).toBeVisible();

    // 2. Open photo gallery lightbox
    const galleryCard = page.locator('div.grid.grid-cols-1.md\\:grid-cols-3.gap-8 div.cursor-pointer').first();
    await galleryCard.click();

    // Lightbox modal must be visible
    const lightboxModal = page.locator('div.fixed.inset-0.z-\\[60\\]');
    await expect(lightboxModal).toBeVisible();

    // Close lightbox modal
    const closeLightboxBtn = page.getByLabel('Close image');
    await closeLightboxBtn.click();
    await expect(lightboxModal).toBeHidden();

    // 3. Fill and submit custom event inquiry
    await page.getByPlaceholder('e.g. John Doe').fill('Carolina Herrera');
    await page.getByPlaceholder('e.g. +507 6612-3456').fill('+507 6555-4321');
    await page.getByPlaceholder('e.g. email@domain.com').fill('carolina@events.com');
    await page.locator('select').first().selectOption('wedding');
    await page.getByPlaceholder('...').fill('Boda íntima frente al atardecer para 80 personas.');

    // Toggle full lodge buyout
    const buyoutCheckbox = page.locator('input[type="checkbox"]');
    if (await buyoutCheckbox.count() > 0) {
      await buyoutCheckbox.first().check();
    }

    // Submit form
    await page.getByRole('button', { name: 'Enviar Solicitud' }).click();

    // 4. Verify confirmation card
    await expect(page.getByText('¡Solicitud Recibida con Éxito!')).toBeVisible();
    await expect(page.getByText('Tu consulta ha sido enviada al equipo de eventos')).toBeVisible();

    // 5. Reset form for new submission
    await page.getByRole('button', { name: 'Volver a Cotizar' }).click();
    await expect(page.getByPlaceholder('e.g. John Doe')).toHaveValue('');
  });

  test('Workflow 4: Complete Guest Journey — Adventure & Tours Exploration on /mahana-tours', async ({ page }) => {
    await page.goto('/mahana-tours');
    await page.waitForLoadState('domcontentloaded');

    // 1. Verify Tours hero
    await expect(page.locator('h1')).toContainText('Mahana Tours');

    // 2. Test interactive category filters
    const filterIslands = page.getByRole('button', { name: /Islas/i });
    await filterIslands.click();
    await expect(page.getByRole('heading', { name: 'Isla Otoque y Isla Boná' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Avistamiento de Ballenas Jorobadas' })).toBeVisible();

    // Filter by extreme adventure
    const filterAdventure = page.getByRole('button', { name: /Aventura/i });
    await filterAdventure.click();
    await expect(page.getByRole('heading', { name: 'Tour de Jet Ski' })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Mulitas/i })).toBeVisible();

    // Filter by boat charters
    const filterBoats = page.getByRole('button', { name: /Charters/i });
    await filterBoats.click();
    await expect(page.getByRole('heading', { name: /Chárter Privado: Yate Sthamas/i })).toBeVisible();

    // 3. Inspect WhatsApp booking button
    const whatsappButton = page.locator('button:has-text("Cotizar por WhatsApp")').first();
    await expect(whatsappButton).toBeVisible();
  });

  test('Workflow 5: Complete Guest Journey — Surf Shack Beach Club Experience on /surf-shack', async ({ page }) => {
    let capturedPmsUrl = '';
    await page.route('https://casa-mahana-pms.onrender.com/**', route => {
      capturedPmsUrl = route.request().url();
      return route.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>PMS</body></html>' });
    });

    await page.goto('/surf-shack');
    await page.waitForLoadState('domcontentloaded');

    // 1. Inspect Beach Club hero & credentials
    await expect(page.getByRole('heading', { name: 'Surf Shack Beach Club' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Academia Nacional de Surf' })).toBeVisible();

    // 2. Inspect Lessons and Gear Rentals
    await expect(page.getByText('Alquiler de Tablas')).toBeVisible();
    await expect(page.getByText('$20')).toBeVisible();
    await expect(page.getByText('Clase de Surf (Principiantes)')).toBeVisible();
    await expect(page.getByText('$35')).toBeVisible();

    // 3. Click booking CTA
    const bookLessonBtn = page.getByRole('button', { name: 'Reservar Clase de Surf' }).first();
    await bookLessonBtn.click();
    await expect.poll(() => capturedPmsUrl).toContain('https://casa-mahana-pms.onrender.com/reservar');
  });

});
