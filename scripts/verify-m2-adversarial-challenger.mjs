import path from 'path';
import http from 'http';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { chromium } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

const results = {
  hero: { passed: 0, failed: 0, tests: [] },
  packages: { passed: 0, failed: 0, tests: [] },
  restaurantModal: { passed: 0, failed: 0, tests: [] },
  reviewsCarousel: { passed: 0, failed: 0, tests: [] },
  galleryLightbox: { passed: 0, failed: 0, tests: [] },
  overallVerdict: 'PENDING'
};

function recordTest(suite, name, passed, details = '') {
  results[suite].tests.push({ name, passed, details });
  if (passed) {
    results[suite].passed++;
    console.log(`  ✓ [PASS] ${name}`);
  } else {
    results[suite].failed++;
    console.error(`  ✗ [FAIL] ${name} — ${details}`);
  }
}

// Spin up a static file server with client-side SPA routing support
const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  let filePath = path.join(distDir, decodeURI(urlPath));
  
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  } else if (!fs.existsSync(filePath)) {
    // SPA fallback
    filePath = path.join(distDir, 'index.html');
  }

  const ext = path.extname(filePath);
  const typeMap = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.json': 'application/json'
  };
  const type = typeMap[ext] || 'application/octet-stream';
  
  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': type });
    res.end(data);
  } catch (e) {
    res.writeHead(404);
    res.end('Not found');
  }
});

const PORT = 4210;
await new Promise(r => server.listen(PORT, r));
console.log(`Test server running at http://127.0.0.1:${PORT}`);

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });

try {
  // =========================================================================
  // SUITE 1: HERO FLOATING BOOKING CAPSULE
  // =========================================================================
  console.log('\n=== SUITE 1: Hero Floating Booking Capsule ===');

  const plansToTest = [
    { code: 'todo_incluido', guests: '2', date: '2026-11-15' },
    { code: 'escape_mahana', guests: '1', date: '2026-11-20' },
    { code: 'mahana_exp', guests: '3', date: '2026-12-01' },
    { code: 'pasadia_comidas', guests: '4', date: '2026-12-10' },
    { code: 'pasadia_entrada', guests: '5', date: '2026-12-25' }
  ];

  for (const item of plansToTest) {
    let interceptedPmsUrl = '';
    await page.route('https://casa-mahana-pms.onrender.com/**', route => {
      interceptedPmsUrl = route.request().url();
      return route.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>PMS OK</body></html>' });
    });

    await page.goto(`http://127.0.0.1:${PORT}/`);
    await page.waitForLoadState('domcontentloaded');

    // Select plan
    const planSelect = page.locator('section#inicio select').first();
    await planSelect.selectOption(item.code);

    // Select guests
    const guestsSelect = page.locator('section#inicio select').nth(1);
    await guestsSelect.selectOption(item.guests);

    // Set checkin date
    const dateInput = page.locator('section#inicio input[type="date"]');
    await dateInput.fill(item.date);

    // Click submit
    const submitBtn = page.locator('section#inicio button[type="submit"]');
    await submitBtn.click();

    // Verify PMS intercept
    await page.waitForTimeout(300);

    const hasPlan = interceptedPmsUrl.includes(`plan=${item.code}`);
    const hasGuests = interceptedPmsUrl.includes(`guests=${item.guests}`);
    const hasDate = interceptedPmsUrl.includes(`date=${item.date}`);

    recordTest(
      'hero',
      `Hero form routes to PMS with preserved params: plan=${item.code}, guests=${item.guests}, date=${item.date}`,
      hasPlan && hasGuests && hasDate,
      `Intercepted URL: ${interceptedPmsUrl}`
    );

    await page.unroute('https://casa-mahana-pms.onrender.com/**');
  }

  // Test special case: Plan "restaurante" in Hero
  {
    await page.goto(`http://127.0.0.1:${PORT}/`);
    await page.waitForLoadState('domcontentloaded');

    const planSelect = page.locator('section#inicio select').first();
    await planSelect.selectOption('restaurante');

    const submitBtn = page.locator('section#inicio button[type="submit"]');
    await submitBtn.click();

    await page.waitForURL(/.*\/restaurante.*/);
    const isAtRestaurant = page.url().includes('/restaurante');
    recordTest(
      'hero',
      'Hero form with "restaurante" option routes internally to /restaurante instead of PMS',
      isAtRestaurant,
      `Final URL: ${page.url()}`
    );
  }

  // =========================================================================
  // SUITE 2: LODGING PACKAGES BOOKING CTAs & TABS
  // =========================================================================
  console.log('\n=== SUITE 2: LodgingPackages Booking CTAs & Category Tabs ===');

  const lodgingPackagesExpected = [
    { name: 'Todo Incluido VIP', planCode: 'todo_incluido', category: 'Estadía' },
    { name: 'Mahana Experience', planCode: 'mahana_exp', category: 'Estadía' },
    { name: 'Escape Mahana', planCode: 'escape_mahana', category: 'Estadía' },
    { name: 'Pasadía Todo Incluido', planCode: 'pasadia_comidas', category: 'Pasadía' },
    { name: 'Pool Day Pass', planCode: 'pasadia_entrada', category: 'Pasadía' }
  ];

  // Test Category Tabs filtering
  await page.goto(`http://127.0.0.1:${PORT}/`);
  await page.waitForLoadState('domcontentloaded');

  // Click "Hospedaje & Estadías" tab
  const staysTab = page.locator('button:has-text("Hospedaje & Estadías")').first();
  await staysTab.scrollIntoViewIfNeeded();
  await staysTab.click();
  await page.waitForTimeout(150);

  const staysVisible = await page.locator('h4:has-text("Todo Incluido VIP")').isVisible();
  const dayPassVisibleWhenStaysOnly = await page.locator('h4:has-text("Pasadía Todo Incluido")').isVisible();
  recordTest(
    'packages',
    'Category Tab "Hospedaje & Estadías" displays stays and hides day passes',
    staysVisible && !dayPassVisibleWhenStaysOnly,
    `Stays: ${staysVisible}, DayPass: ${dayPassVisibleWhenStaysOnly}`
  );

  // Click "Pasadías de Sol" tab
  const dayPassTab = page.locator('button:has-text("Pasadías de Sol")').first();
  await dayPassTab.scrollIntoViewIfNeeded();
  await dayPassTab.click();
  await page.waitForTimeout(150);

  const staysVisibleWhenDayPassOnly = await page.locator('h4:has-text("Todo Incluido VIP")').isVisible();
  const dayPassVisible = await page.locator('h4:has-text("Pasadía Todo Incluido")').isVisible();
  recordTest(
    'packages',
    'Category Tab "Pasadías de Sol" displays day passes and hides stays',
    !staysVisibleWhenDayPassOnly && dayPassVisible,
    `Stays: ${staysVisibleWhenDayPassOnly}, DayPass: ${dayPassVisible}`
  );

  // Click "Todos los Planes" tab
  const allTab = page.locator('button:has-text("Todos los Planes")').first();
  await allTab.scrollIntoViewIfNeeded();
  await allTab.click();
  await page.waitForTimeout(150);

  const bothStaysVisible = await page.locator('h4:has-text("Todo Incluido VIP")').isVisible();
  const bothDayPassVisible = await page.locator('h4:has-text("Pasadía Todo Incluido")').isVisible();
  recordTest(
    'packages',
    'Category Tab "Todos los Planes" displays both stays and day passes',
    bothStaysVisible && bothDayPassVisible,
    `Stays: ${bothStaysVisible}, DayPass: ${bothDayPassVisible}`
  );

  // Test all 5 direct booking CTA buttons
  for (const pkg of lodgingPackagesExpected) {
    let interceptedPmsUrl = '';
    await page.route('https://casa-mahana-pms.onrender.com/**', route => {
      interceptedPmsUrl = route.request().url();
      return route.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>PMS OK</body></html>' });
    });

    await page.goto(`http://127.0.0.1:${PORT}/`);
    await page.waitForLoadState('domcontentloaded');

    // Find the card by its h4 title
    const cardTitle = page.locator(`h4:has-text("${pkg.name}")`).first();
    await cardTitle.scrollIntoViewIfNeeded();

    // Look for the booking button inside the card's container
    const cardContainer = cardTitle.locator('xpath=ancestor::div[contains(@class, "rounded-[32px]")]');
    const ctaBtn = cardContainer.locator('button:has-text("Reservar")').first();
    await ctaBtn.click();

    await page.waitForTimeout(400);

    const hasPlan = interceptedPmsUrl.includes(`plan=${pkg.planCode}`);
    const encodedCategory = encodeURIComponent(pkg.category);
    const hasCategory = interceptedPmsUrl.includes(`category=${encodedCategory}`) || interceptedPmsUrl.includes(`category=${pkg.category}`);

    recordTest(
      'packages',
      `Booking CTA for "${pkg.name}" forwards plan=${pkg.planCode} and category=${pkg.category} to PMS`,
      hasPlan && hasCategory,
      `Intercepted URL: ${interceptedPmsUrl}`
    );

    await page.unroute('https://casa-mahana-pms.onrender.com/**');
  }

  // Test bottom comparison banner CTA "Cotizar en el Motor PMS"
  {
    let interceptedPmsUrl = '';
    await page.route('https://casa-mahana-pms.onrender.com/**', route => {
      interceptedPmsUrl = route.request().url();
      return route.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>PMS OK</body></html>' });
    });

    await page.goto(`http://127.0.0.1:${PORT}/`);
    const quoteBtn = page.locator('button:has-text("Cotizar en el Motor PMS")');
    await quoteBtn.scrollIntoViewIfNeeded();
    await quoteBtn.click();

    await page.waitForTimeout(300);
    const reachedPms = interceptedPmsUrl.startsWith('https://casa-mahana-pms.onrender.com/reservar');
    recordTest(
      'packages',
      'Bottom banner button "Cotizar en el Motor PMS" routes to PMS engine',
      reachedPms,
      `Intercepted URL: ${interceptedPmsUrl}`
    );

    await page.unroute('https://casa-mahana-pms.onrender.com/**');
  }

  // =========================================================================
  // SUITE 3: RESTAURANT DIGITAL MENU MODAL
  // =========================================================================
  console.log('\n=== SUITE 3: Restaurant Digital Menu Modal ===');

  await page.goto(`http://127.0.0.1:${PORT}/`);
  await page.waitForLoadState('domcontentloaded');

  // Verify modal is not visible initially
  const initialModal = await page.locator('text=Carta Digital del Restaurante').isVisible();
  recordTest(
    'restaurantModal',
    'Menu modal is closed on initial page load',
    !initialModal
  );

  // Trigger 1: Open modal via "Ver Carta Digital" button
  const openMenuBtn = page.locator('button:has-text("Ver Carta Digital")');
  await openMenuBtn.scrollIntoViewIfNeeded();
  await openMenuBtn.click();
  await page.waitForTimeout(200);

  const modalOpened = await page.locator('text=Carta Digital del Restaurante').isVisible();
  recordTest(
    'restaurantModal',
    'Clicking "Ver Carta Digital" opens the menu modal',
    modalOpened
  );

  // Verify content in modal:
  const margherita = await page.locator('text=Margherita Tradizionale').isVisible();
  const pepperoni = await page.locator('text=Pepperoni & Miel Picante').isVisible();
  const pargo = await page.locator('text=Pargo Rojo Frito Entero').isVisible();
  const angus = await page.locator('text=Monster Angus Burger').isVisible();
  const pricesVisible = (await page.locator('span.text-mahana-accent:has-text("$12")').count()) > 0;

  recordTest(
    'restaurantModal',
    'Menu modal renders expected dish sections and prices',
    margherita && pepperoni && pargo && angus && pricesVisible,
    `Dishes visible: Margherita=${margherita}, Pepperoni=${pepperoni}, Pargo=${pargo}, Angus=${angus}, Prices=${pricesVisible}`
  );

  // Close Trigger 1: Close button with X icon
  const closeBtnX = page.locator('button[aria-label="Close menu"]');
  await closeBtnX.click();
  await page.waitForTimeout(200);
  const closedViaX = !(await page.locator('text=Carta Digital del Restaurante').isVisible());
  recordTest(
    'restaurantModal',
    'Close button (X aria-label="Close menu") closes the modal',
    closedViaX
  );

  // Close Trigger 2: Click on backdrop
  await openMenuBtn.click();
  await page.waitForTimeout(200);
  // Click on the backdrop element at coordinates below header
  const backdrop = page.locator('div.fixed.inset-0.bg-black\\/80');
  await backdrop.click({ position: { x: 30, y: 300 } });
  await page.waitForTimeout(200);
  const closedViaBackdrop = !(await page.locator('text=Carta Digital del Restaurante').isVisible());
  recordTest(
    'restaurantModal',
    'Clicking outside modal (on backdrop) closes the modal',
    closedViaBackdrop
  );

  // StopPropagation check: Click inside modal content does NOT close it
  await openMenuBtn.click();
  await page.waitForTimeout(200);
  const modalHeader = page.locator('h3:has-text("Carta Digital del Restaurante")');
  await modalHeader.click();
  await page.waitForTimeout(100);
  const remainedOpen = await page.locator('text=Carta Digital del Restaurante').isVisible();
  recordTest(
    'restaurantModal',
    'Clicking inside modal content preserves open state (stopPropagation works)',
    remainedOpen
  );

  // Close Trigger 3: "Cerrar Carta" button at bottom of modal
  const closeCartaBtn = page.locator('button:has-text("Cerrar Carta")');
  await closeCartaBtn.click();
  await page.waitForTimeout(200);
  const closedViaButton = !(await page.locator('text=Carta Digital del Restaurante').isVisible());
  recordTest(
    'restaurantModal',
    'Clicking "Cerrar Carta" button closes the modal',
    closedViaButton
  );

  // Modal navigation link: "Ver Menú Completo & Horarios"
  await openMenuBtn.click();
  await page.waitForTimeout(200);
  const fullMenuLink = page.locator('a:has-text("Ver Menú Completo & Horarios")');
  await fullMenuLink.click();
  await page.waitForURL(/.*\/restaurante.*/);
  recordTest(
    'restaurantModal',
    'Clicking "Ver Menú Completo & Horarios" in modal closes modal and navigates to /restaurante',
    page.url().includes('/restaurante')
  );

  // =========================================================================
  // SUITE 4: REVIEWS CAROUSEL
  // =========================================================================
  console.log('\n=== SUITE 4: Reviews Carousel ===');

  await page.goto(`http://127.0.0.1:${PORT}/`);
  await page.waitForLoadState('domcontentloaded');

  const reviewsSection = page.locator('section#opiniones');
  await reviewsSection.scrollIntoViewIfNeeded();

  // Initial review author: Sofía R.
  const initialAuthor = await reviewsSection.getByText('Sofía R.').isVisible();
  recordTest(
    'reviewsCarousel',
    'Initial review display shows author Sofía R.',
    initialAuthor
  );

  // Click Next arrow
  const nextBtn = page.locator('button[aria-label="Next review"]');
  await nextBtn.click();
  await page.waitForTimeout(150);

  const secondAuthor = await reviewsSection.getByText('Carlos M.').isVisible();
  recordTest(
    'reviewsCarousel',
    'Clicking Next review advances to Carlos M.',
    secondAuthor
  );

  // Click Next arrow 4 more times to test full wrap-around:
  // Carlos (1) -> John (2) -> Valentina (3) -> Andrés (4) -> Sofía (0)
  await nextBtn.click(); // John D.
  await page.waitForTimeout(50);
  await nextBtn.click(); // Valentina P.
  await page.waitForTimeout(50);
  await nextBtn.click(); // Andrés G.
  await page.waitForTimeout(50);
  const fourthAuthor = await reviewsSection.getByText('Andrés G.').isVisible();
  await nextBtn.click(); // Wraps back to Sofía R.
  await page.waitForTimeout(50);
  const wrappedAuthor = await reviewsSection.getByText('Sofía R.').isVisible();

  recordTest(
    'reviewsCarousel',
    'Carousel advances through all 5 reviews and wraps around cleanly (0 -> 1 -> 2 -> 3 -> 4 -> 0)',
    fourthAuthor && wrappedAuthor,
    `Andrés G. (idx 4): ${fourthAuthor}, Wrap to Sofía R. (idx 0): ${wrappedAuthor}`
  );

  // Click Prev arrow: should wrap backwards from Sofía (0) to Andrés (4)
  const prevBtn = page.locator('button[aria-label="Previous review"]');
  await prevBtn.click();
  await page.waitForTimeout(150);
  const prevWrappedAuthor = await reviewsSection.getByText('Andrés G.').isVisible();
  recordTest(
    'reviewsCarousel',
    'Clicking Prev review wraps backwards (0 -> 4: Andrés G.)',
    prevWrappedAuthor
  );

  // Click dot indicator 3 (index 2: John D.)
  const dot3 = page.locator('button[aria-label="Go to review 3"]');
  await dot3.click();
  await page.waitForTimeout(150);
  const dot3Author = await reviewsSection.getByText('John D.').isVisible();
  recordTest(
    'reviewsCarousel',
    'Clicking dot indicator 3 jumps directly to John D.',
    dot3Author
  );

  // =========================================================================
  // SUITE 5: LODGELIFEGALLERY LIGHTBOX MODAL
  // =========================================================================
  console.log('\n=== SUITE 5: LodgeLifeGallery Lightbox Modal ===');

  await page.goto(`http://127.0.0.1:${PORT}/`);
  await page.waitForLoadState('domcontentloaded');

  const gallerySection = page.locator('section#galeria');
  await gallerySection.scrollIntoViewIfNeeded();

  // Verify initial lightbox state is closed
  const initialLightbox = await page.locator('button[aria-label="Close image"]').isVisible();
  recordTest(
    'galleryLightbox',
    'Lightbox modal is closed on initial page load',
    !initialLightbox
  );

  // Click tile 1 (Oasis Tropical & 3 Piscinas)
  const tile1 = gallerySection.locator('div.group.cursor-pointer').nth(0);
  await tile1.click();
  await page.waitForTimeout(200);

  const lightboxOpen1 = await page.locator('button[aria-label="Close image"]').isVisible();
  const lightboxImgSrc1 = await page.locator('div.fixed img[alt="Casa Mahana Lodge"]').getAttribute('src');
  recordTest(
    'galleryLightbox',
    'Clicking gallery tile 1 opens lightbox modal with high-res photo',
    lightboxOpen1 && (lightboxImgSrc1.includes('lodge-grounds.jpg') || lightboxImgSrc1.includes('hero-pool-drone-aerial.jpg')),
    `Src: ${lightboxImgSrc1}`
  );

  // Close via X button — Test if header intercepts pointer events
  let xCloseSucceeded = false;
  let interceptionError = '';
  try {
    const closeGalleryBtn = page.locator('button[aria-label="Close image"]');
    await closeGalleryBtn.click({ timeout: 3000 });
    xCloseSucceeded = true;
  } catch (err) {
    interceptionError = err.message;
  }
  recordTest(
    'galleryLightbox',
    'Clicking close button (X aria-label="Close image") is unobstructed by header',
    xCloseSucceeded,
    xCloseSucceeded ? 'Unobstructed' : `Blocked by Header: ${interceptionError.split('\n')[0]}`
  );

  // Close via backdrop click (safe coordinate below sticky header)
  const galleryBackdrop = page.locator('div.fixed.bg-black\\/90');
  await galleryBackdrop.click({ position: { x: 30, y: 300 } });
  await page.waitForTimeout(200);
  const closedGalleryBackdrop = !(await page.locator('button[aria-label="Close image"]').isVisible());
  recordTest(
    'galleryLightbox',
    'Clicking gallery backdrop closes lightbox',
    closedGalleryBackdrop
  );

  // Click tile 2 (Deck de Piscina & Solarium)
  const tile2 = gallerySection.locator('div.group.cursor-pointer').nth(1);
  await tile2.click();
  await page.waitForTimeout(200);
  const lightboxImgSrc2 = await page.locator('div.fixed img[alt="Casa Mahana Lodge"]').getAttribute('src');

  // Close via backdrop click
  await galleryBackdrop.click({ position: { x: 30, y: 300 } });
  await page.waitForTimeout(200);
  const closedViaBackdropGallery = !(await page.locator('button[aria-label="Close image"]').isVisible());
  recordTest(
    'galleryLightbox',
    'Clicking backdrop closes gallery lightbox',
    closedViaBackdropGallery && lightboxImgSrc2.includes('hero-pool-deck.jpg'),
    `Src: ${lightboxImgSrc2}`
  );

  // Test all 6 gallery items open properly
  let all6Opened = true;
  for (let i = 0; i < 6; i++) {
    const tile = gallerySection.locator('div.group.cursor-pointer').nth(i);
    await tile.click();
    await page.waitForTimeout(100);
    const isOpen = await page.locator('button[aria-label="Close image"]').isVisible();
    if (!isOpen) {
      all6Opened = false;
      break;
    }
    const backdropEl = page.locator('div.fixed.bg-black\\/90');
    await backdropEl.click({ position: { x: 30, y: 300 } });
    await page.waitForTimeout(100);
  }

  recordTest(
    'galleryLightbox',
    'All 6 gallery items can be clicked and opened into high-res lightbox modals',
    all6Opened
  );

} catch (err) {
  console.error('Critical test error:', err);
} finally {
  await browser.close();
  server.close();
}

console.log('\n=== EMPIRICAL TEST SUMMARY ===');
let totalPassed = 0;
let totalFailed = 0;
for (const [k, v] of Object.entries(results)) {
  if (k === 'overallVerdict') continue;
  totalPassed += v.passed;
  totalFailed += v.failed;
  console.log(`${k}: ${v.passed} passed, ${v.failed} failed`);
}
console.log(`TOTAL: ${totalPassed} passed, ${totalFailed} failed`);

results.overallVerdict = totalFailed === 0 ? 'APPROVE' : 'REQUEST_CHANGES';
fs.writeFileSync(
  path.join(projectRoot, '.agents', 'teamwork', 'challenger_m2_2', 'test_results.json'),
  JSON.stringify(results, null, 2)
);
console.log(`Results saved to .agents/teamwork/challenger_m2_2/test_results.json`);
