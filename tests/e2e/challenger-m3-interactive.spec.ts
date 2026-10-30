import { test, expect } from '@playwright/test';

test.describe('Challenger M3 Interactive Workflows & Verification Suite', () => {

  test.beforeEach(async ({ page }) => {
    // Intercept PMS booking redirects so external network calls are avoided
    await page.route('https://casa-mahana-pms.onrender.com/**', route => {
      return route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: '<html><body>PMS Mock Page</body></html>'
      });
    });
  });

  // =========================================================================
  // SECTION 1: LIGHTBOX INTERACTIVITY & HEADER CLEARANCE (/pasadias & /estadias)
  // =========================================================================

  test('L1. Pasadías Hub: Empirical Verification of Poolside Gallery Lightbox Positioning & Header Clearance', async ({ page }) => {
    await page.goto('/pasadias');
    await page.waitForLoadState('domcontentloaded');

    // 1. Scroll to the poolside atmosphere gallery section
    const gallerySection = page.locator('section:has-text("Ambiente Tropical de Piscina")');
    await expect(gallerySection).toBeVisible();
    await gallerySection.scrollIntoViewIfNeeded();

    const scrollYAfterScroll = await page.evaluate(() => window.scrollY);
    console.log(`[Pasadias Hub] Scroll position when viewing poolside gallery: scrollY=${scrollYAfterScroll}px`);

    // 2. Click on the first gallery image
    const firstGalleryItem = gallerySection.locator('.grid > div').first();
    await expect(firstGalleryItem).toBeVisible();
    await firstGalleryItem.click();

    // 3. Inspect the modal overlay and close button
    const modalOverlay = page.locator('div.fixed.inset-0.z-50');
    await expect(modalOverlay).toBeAttached();

    const closeBtn = page.getByRole('button', { name: 'Close image' });
    await expect(closeBtn).toBeAttached();

    // 4. Measure close button and modal overlay viewport coordinates
    const btnBox = await closeBtn.boundingBox();
    const overlayBox = await modalOverlay.boundingBox();
    const contentBox = modalOverlay.locator('div.relative.max-w-5xl');
    const contentBoxRect = await contentBox.boundingBox();

    console.log(`[Pasadias Hub] Overlay bounding box relative to viewport: Y=${overlayBox?.y}, H=${overlayBox?.height}`);
    console.log(`[Pasadias Hub] Close button bounding box relative to viewport: Y=${btnBox?.y}, X=${btnBox?.x}, W=${btnBox?.width}, H=${btnBox?.height}`);
    console.log(`[Pasadias Hub] Modal content box bounding box: Y=${contentBoxRect?.y}, H=${contentBoxRect?.height}`);

    // Check if containing block bug is present:
    // When parent has transform from animate-fade-in-up, overlayBox.y is negative (~ -scrollY)
    const hasContainingBlockBug = (overlayBox?.y ?? 0) < -100;
    console.log(`[Pasadias Hub] Containing block bug detected (overlay placed offscreen): ${hasContainingBlockBug}`);

    // Check requirement: "Ensure close buttons have Y >= 96px or are placed within the modal content box."
    // If the modal was at scrollY=0 (top of viewport):
    // button has 'absolute top-6 right-6' -> top-6 is 24px.
    const isInsideContentBox = contentBoxRect && btnBox && (
      btnBox.x >= contentBoxRect.x &&
      btnBox.x + btnBox.width <= contentBoxRect.x + contentBoxRect.width &&
      btnBox.y >= contentBoxRect.y &&
      btnBox.y + btnBox.height <= contentBoxRect.y + contentBoxRect.height
    );
    const hasYClearance = (btnBox?.y ?? 0) >= 96;

    console.log(`[Pasadias Hub] Close button Y >= 96px? ${hasYClearance} (current Y=${btnBox?.y})`);
    console.log(`[Pasadias Hub] Close button placed within modal content box? ${isInsideContentBox}`);

    // Invalidation conditions & Contract Assertions:
    // 1. Lightbox modal must not be trapped inside an ancestor containing block with CSS transform
    expect(hasContainingBlockBug, 'CRITICAL DEFECT: Lightbox modal overlay is trapped in an ancestor transform containing block and placed offscreen').toBe(false);

    // 2. Close button must satisfy clearance contract (Y >= 96px or inside content box)
    expect(hasYClearance || isInsideContentBox, 'CLEARANCE DEFECT: Close button must have Y >= 96px clearance or be placed within modal content box').toBe(true);
  });

  test('L2. Estadías Hub: Empirical Verification of Suite Gallery Lightbox Positioning & Header Clearance', async ({ page }) => {
    await page.goto('/estadias');
    await page.waitForLoadState('domcontentloaded');

    // 1. Scroll down to interior gallery
    const gallerySection = page.locator('section:has-text("Galería de Detalles & Interiores")');
    await expect(gallerySection).toBeVisible();
    await gallerySection.scrollIntoViewIfNeeded();

    const scrollY = await page.evaluate(() => window.scrollY);
    console.log(`[Estadias Hub] Scroll position: scrollY=${scrollY}px`);

    // 2. Click interior gallery photo
    const galleryItem = gallerySection.locator('.grid > div').first();
    await galleryItem.click();

    const modalOverlay = page.locator('div.fixed.inset-0.z-50');
    await expect(modalOverlay).toBeAttached();

    const closeBtn = page.getByRole('button', { name: 'Close image' });
    const btnBox = await closeBtn.boundingBox();
    const overlayBox = await modalOverlay.boundingBox();
    const contentBox = modalOverlay.locator('div.relative.max-w-5xl');
    const contentBoxRect = await contentBox.boundingBox();

    console.log(`[Estadias Hub] Overlay bounding box relative to viewport: Y=${overlayBox?.y}, H=${overlayBox?.height}`);
    console.log(`[Estadias Hub] Close button bounding box relative to viewport: Y=${btnBox?.y}, X=${btnBox?.x}`);
    console.log(`[Estadias Hub] Modal content box bounding box: Y=${contentBoxRect?.y}, H=${contentBoxRect?.height}`);

    const hasContainingBlockBug = (overlayBox?.y ?? 0) < -100;
    console.log(`[Estadias Hub] Containing block bug detected: ${hasContainingBlockBug}`);

    const isInsideContentBox = contentBoxRect && btnBox && (
      btnBox.x >= contentBoxRect.x &&
      btnBox.x + btnBox.width <= contentBoxRect.x + contentBoxRect.width &&
      btnBox.y >= contentBoxRect.y &&
      btnBox.y + btnBox.height <= contentBoxRect.y + contentBoxRect.height
    );
    const hasYClearance = (btnBox?.y ?? 0) >= 96;

    console.log(`[Estadias Hub] Close button Y >= 96px? ${hasYClearance} (current Y=${btnBox?.y})`);
    console.log(`[Estadias Hub] Close button placed within modal content box? ${isInsideContentBox}`);

    // Invalidation conditions & Contract Assertions:
    // 1. Lightbox modal must not be trapped inside an ancestor containing block with CSS transform
    expect(hasContainingBlockBug, 'CRITICAL DEFECT: Lightbox modal overlay is trapped in an ancestor transform containing block and placed offscreen').toBe(false);

    // 2. Close button must satisfy clearance contract (Y >= 96px or inside content box)
    expect(hasYClearance || isInsideContentBox, 'CLEARANCE DEFECT: Close button must have Y >= 96px clearance or be placed within modal content box').toBe(true);
  });

  // =========================================================================
  // SECTION 2: BOOKING FUNNEL INTEGRITY ACROSS ALL THREE HUBS
  // =========================================================================

  test('F1. Pasadías Hub: Every Booking CTA routes to /reservar with correct planCode & category', async ({ page }) => {
    let capturedPmsUrl = '';
    await page.route('https://casa-mahana-pms.onrender.com/**', route => {
      capturedPmsUrl = route.request().url();
      return route.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>PMS</body></html>' });
    });

    // --- Subtest A: All-Inclusive Day Pass Card CTA ---
    await page.goto('/pasadias');
    await page.waitForLoadState('domcontentloaded');

    capturedPmsUrl = '';
    const todoIncluidoCard = page.locator('div.grid.grid-cols-1.lg\\:grid-cols-12').filter({ hasText: 'Pasadía con Todo Incluido' });
    const bookTodoIncluido = todoIncluidoCard.getByRole('button', { name: 'Reservar' });
    await bookTodoIncluido.click();

    await expect.poll(() => capturedPmsUrl).toContain('plan=pasadia_comidas');
    await expect.poll(() => capturedPmsUrl).toContain('category=Pasad%C3%ADa');

    // --- Subtest B: Pool Day Card CTA ---
    await page.goto('/pasadias');
    await page.waitForLoadState('domcontentloaded');

    capturedPmsUrl = '';
    const poolDayCard = page.locator('div.grid.grid-cols-1.lg\\:grid-cols-12').filter({ hasText: 'Pool Day' });
    const bookPoolDay = poolDayCard.getByRole('button', { name: 'Reservar' });
    await bookPoolDay.click();

    await expect.poll(() => capturedPmsUrl).toContain('plan=pasadia_entrada');
    await expect.poll(() => capturedPmsUrl).toContain('category=Pasad%C3%ADa');

    // --- Subtest C: Matrix Action Strip: Reservar Pool Day ---
    await page.goto('/pasadias');
    await page.waitForLoadState('domcontentloaded');

    capturedPmsUrl = '';
    const matrixStripPoolDay = page.getByRole('button', { name: 'Reservar Pool Day' });
    await matrixStripPoolDay.scrollIntoViewIfNeeded();
    await matrixStripPoolDay.click();

    await expect.poll(() => capturedPmsUrl).toContain('plan=pasadia_entrada');
    await expect.poll(() => capturedPmsUrl).toContain('category=Pasad%C3%ADa');

    // --- Subtest D: Matrix Action Strip: Reservar Todo Incluido ---
    await page.goto('/pasadias');
    await page.waitForLoadState('domcontentloaded');

    capturedPmsUrl = '';
    const matrixStripTodoIncluido = page.getByRole('button', { name: 'Reservar Todo Incluido' });
    await matrixStripTodoIncluido.scrollIntoViewIfNeeded();
    await matrixStripTodoIncluido.click();

    await expect.poll(() => capturedPmsUrl).toContain('plan=pasadia_comidas');
    await expect.poll(() => capturedPmsUrl).toContain('category=Pasad%C3%ADa');
  });

  test('F2. Estadías Hub: Every Room Suite Booking CTA routes to /reservar with correct planCode & category', async ({ page }) => {
    let capturedPmsUrl = '';
    await page.route('https://casa-mahana-pms.onrender.com/**', route => {
      capturedPmsUrl = route.request().url();
      return route.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>PMS</body></html>' });
    });

    const roomIndices = [0, 1, 2, 3]; // Standard, Double, Family, Glamping
    for (const index of roomIndices) {
      await page.goto('/estadias');
      await page.waitForLoadState('domcontentloaded');

      capturedPmsUrl = '';
      const bookRoomBtn = page.getByRole('button', { name: 'Reservar Habitación' }).nth(index);
      await bookRoomBtn.scrollIntoViewIfNeeded();
      await bookRoomBtn.click();

      await expect.poll(() => capturedPmsUrl).toContain('plan=mahana_exp');
      await expect.poll(() => capturedPmsUrl).toContain('category=Estad%C3%ADa');
    }
  });

  test('F3. Experiencias Hub: All Experience packages trigger booking with URL query params preserved', async ({ page }) => {
    let capturedPmsUrl = '';
    await page.route('https://casa-mahana-pms.onrender.com/**', route => {
      capturedPmsUrl = route.request().url();
      return route.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>PMS</body></html>' });
    });

    // 1. Mahana Experience Stay
    await page.goto('/experiencias');
    await page.waitForLoadState('domcontentloaded');
    capturedPmsUrl = '';
    const bookMahanaBtn = page.getByRole('button', { name: 'Reservar Estadía' });
    await bookMahanaBtn.scrollIntoViewIfNeeded();
    await bookMahanaBtn.click();
    await expect.poll(() => capturedPmsUrl).toContain('plan=mahana_exp');
    await expect.poll(() => capturedPmsUrl).toContain('category=Estad%C3%ADa');

    // 2. Todo Incluido Stay
    await page.goto('/experiencias');
    await page.waitForLoadState('domcontentloaded');
    capturedPmsUrl = '';
    const bookTodoIncluidoBtn = page.getByRole('button', { name: /Reservar Todo Incluido/i }).first();
    await bookTodoIncluidoBtn.scrollIntoViewIfNeeded();
    await bookTodoIncluidoBtn.click();
    await expect.poll(() => capturedPmsUrl).toContain('plan=todo_incluido');
    await expect.poll(() => capturedPmsUrl).toContain('category=Estad%C3%ADa');

    // 3. Escape Mahana Stay
    await page.goto('/experiencias');
    await page.waitForLoadState('domcontentloaded');
    capturedPmsUrl = '';
    const bookEscapeBtn = page.getByRole('button', { name: /Reservar Escape Mahana/i });
    await bookEscapeBtn.scrollIntoViewIfNeeded();
    await bookEscapeBtn.click();
    await expect.poll(() => capturedPmsUrl).toContain('plan=escape_mahana');
    await expect.poll(() => capturedPmsUrl).toContain('category=Estad%C3%ADa');

    // 4. Pool Day VIP Pass
    await page.goto('/experiencias');
    await page.waitForLoadState('domcontentloaded');
    capturedPmsUrl = '';
    const bookPoolDayVip = page.getByRole('button', { name: /Reservar Pasadía/i });
    await bookPoolDayVip.scrollIntoViewIfNeeded();
    await bookPoolDayVip.click();
    await expect.poll(() => capturedPmsUrl).toContain('plan=pasadia_comidas');
    await expect.poll(() => capturedPmsUrl).toContain('category=Pasad%C3%ADa');

    // 5. Pool Day Basic Pass
    await page.goto('/experiencias');
    await page.waitForLoadState('domcontentloaded');
    capturedPmsUrl = '';
    const bookPoolDayBasic = page.getByRole('button', { name: /Reservar Pool Day/i });
    await bookPoolDayBasic.scrollIntoViewIfNeeded();
    await bookPoolDayBasic.click();
    await expect.poll(() => capturedPmsUrl).toContain('plan=pasadia_entrada');
    await expect.poll(() => capturedPmsUrl).toContain('category=Pasad%C3%ADa');
  });

  // =========================================================================
  // SECTION 3: CATEGORY FILTERING ON /experiencias
  // =========================================================================

  test('C1. Experiencias Hub: Filter navigation pills correctly filter cards without layout breakage', async ({ page }) => {
    await page.goto('/experiencias');
    await page.waitForLoadState('domcontentloaded');

    const staysSectionHeading = page.getByRole('heading', { name: 'Hospedaje & Estadías en el Lodge' });
    const dayPassSectionHeading = page.getByRole('heading', { name: 'Pasadías & Días de Sol' });
    const diningSectionHeading = page.getByRole('heading', { name: 'Gastronomía & Experiencias' });

    // Initial state: "all" filter active -> all 3 sections visible
    await expect(staysSectionHeading).toBeVisible();
    await expect(dayPassSectionHeading).toBeVisible();
    await expect(diningSectionHeading).toBeVisible();

    // Helper: check horizontal overflow
    const checkOverflow = async () => {
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth - document.documentElement.clientWidth;
      });
      expect(overflow).toBeLessThanOrEqual(1); // At most 1px rounding margin
    };

    await checkOverflow();

    // 1. Filter: "Hospedaje & Estadías"
    await page.getByRole('button', { name: 'Hospedaje & Estadías' }).click();
    await expect(staysSectionHeading).toBeVisible();
    await expect(dayPassSectionHeading).toBeHidden();
    await expect(diningSectionHeading).toBeHidden();
    await checkOverflow();

    // 2. Filter: "Pasadías & Sol"
    await page.getByRole('button', { name: 'Pasadías & Sol' }).click();
    await expect(staysSectionHeading).toBeHidden();
    await expect(dayPassSectionHeading).toBeVisible();
    await expect(diningSectionHeading).toBeHidden();
    await checkOverflow();

    // 3. Filter: "Gastronomía & Beach Club"
    await page.getByRole('button', { name: 'Gastronomía & Experiencias' }).click();
    await expect(staysSectionHeading).toBeHidden();
    await expect(dayPassSectionHeading).toBeHidden();
    await expect(diningSectionHeading).toBeVisible();
    await checkOverflow();

    // 4. Return to "Todas las Experiencias"
    await page.getByRole('button', { name: 'Todas las Experiencias' }).click();
    await expect(staysSectionHeading).toBeVisible();
    await expect(dayPassSectionHeading).toBeVisible();
    await expect(diningSectionHeading).toBeVisible();
    await checkOverflow();
  });

});
