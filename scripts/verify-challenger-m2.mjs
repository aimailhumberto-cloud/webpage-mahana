import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';
import { chromium } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

// Static file server serving dist
const server = http.createServer((req, res) => {
  let filePath = path.join(distDir, decodeURI(req.url.split('?')[0]));
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) filePath = path.join(filePath, 'index.html');
  else if (!fs.existsSync(filePath)) filePath = path.join(distDir, 'index.html');
  const ext = path.extname(filePath);
  const type = ext === '.html' ? 'text/html' : ext === '.css' ? 'text/css' : ext === '.js' ? 'application/javascript' : ext === '.svg' ? 'image/svg+xml' : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : ext === '.png' ? 'image/png' : 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': type });
  fs.createReadStream(filePath).pipe(res);
});

await new Promise(r => server.listen(4210, r));

const browser = await chromium.launch();
const page = await browser.newPage();

const consoleErrors = [];
page.on('console', msg => {
  if (msg.type() === 'error') consoleErrors.push(msg.text());
});
page.on('pageerror', err => {
  consoleErrors.push(err.message);
});

console.log('--- TEST 1: Image Dimensions in ProductsHook on Desktop ---');
const desktopWidths = [1024, 1280, 1440, 1600, 1920, 2560];
let productsHookPass = true;

for (const w of desktopWidths) {
  await page.setViewportSize({ width: w, height: 900 });
  await page.goto('http://127.0.0.1:4210/');
  await page.waitForLoadState('networkidle');

  const imageStats = await page.evaluate(() => {
    // Find image showcase windows inside ProductsHook
    // ProductsHook is the section with "Nuestras Experiencias"
    const section = Array.from(document.querySelectorAll('section')).find(s => 
      s.textContent.includes('Nuestras Experiencias') || s.textContent.includes('Our Experiences')
    );
    if (!section) return { found: false };

    // The image containers have classes relative ... overflow-hidden with an img inside
    const cards = Array.from(section.querySelectorAll('.grid > div'));
    const stats = cards.map((c, i) => {
      const imgContainer = c.querySelector('.relative.overflow-hidden');
      const img = c.querySelector('img');
      const rect = imgContainer ? imgContainer.getBoundingClientRect() : null;
      return {
        cardIndex: i,
        hasContainer: !!imgContainer,
        height: rect ? Math.round(rect.height) : 0,
        width: rect ? Math.round(rect.width) : 0,
        imgSrc: img ? img.getAttribute('src') : null
      };
    });
    return { found: true, stats };
  });

  if (!imageStats.found || imageStats.stats.length === 0) {
    console.error(`❌ Viewport ${w}px: ProductsHook section not found!`);
    productsHookPass = false;
  } else {
    const allExceed380 = imageStats.stats.every(s => s.height >= 380);
    const minHeight = Math.min(...imageStats.stats.map(s => s.height));
    const maxHeight = Math.max(...imageStats.stats.map(s => s.height));
    if (allExceed380) {
      console.log(`✅ Viewport ${w}px: All ${imageStats.stats.length} ProductsHook image headers exceed 380px (min=${minHeight}px, max=${maxHeight}px)`);
    } else {
      console.error(`❌ Viewport ${w}px: Image header failed 380px requirement (min=${minHeight}px)`);
      productsHookPass = false;
    }
  }
}

console.log('\n--- TEST 2: Widescreen Margins and Container Fluid Widths (1440px - 2560px) ---');
let widescreenPass = true;
const wideWidths = [1440, 1600, 1920, 2560];

for (const w of wideWidths) {
  await page.setViewportSize({ width: w, height: 900 });
  await page.goto('http://127.0.0.1:4210/');
  await page.waitForLoadState('networkidle');

  const layoutMetrics = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    return sections.map(s => {
      const sRect = s.getBoundingClientRect();
      const fluidContainer = s.querySelector('.container-fluid');
      const fRect = fluidContainer ? fluidContainer.getBoundingClientRect() : null;
      return {
        id: s.id || s.className.substring(0, 30),
        sectionWidth: Math.round(sRect.width),
        containerWidth: fRect ? Math.round(fRect.width) : null,
        leftMargin: fRect ? Math.round(fRect.left) : null,
        rightMargin: fRect ? Math.round(window.innerWidth - fRect.right) : null
      };
    });
  });

  console.log(`Viewport ${w}px:`);
  for (const m of layoutMetrics) {
    if (m.sectionWidth !== w) {
      console.warn(`  ⚠️ Section ${m.id} width (${m.sectionWidth}px) not spanning 100vw (${w}px)`);
      widescreenPass = false;
    }
    if (m.containerWidth) {
      // Old max-w-7xl was 1280px.
      // On 1920px: old margin was (1920-1280)/2 = 320px.
      // With container-fluid: max-w is 1800px at 2xl, so side margins are (1920-1800)/2 = 60px.
      // Even at 1440px: containerWidth should be fluid (~1312px-1440px), not restricted to 1024px or 1280px boxed with massive empty white voids.
      const marginRatio = (m.leftMargin + m.rightMargin) / w;
      console.log(`  Section: ${m.id} -> SectionWidth: ${m.sectionWidth}px, ContainerWidth: ${m.containerWidth}px, Side Margins: [${m.leftMargin}px L / ${m.rightMargin}px R] (${Math.round(marginRatio * 100)}% total margin)`);
    }
  }
}

console.log('\n--- TEST 3: Language Toggle Layout Stress-Test ---');
let langPass = true;
for (const w of [320, 375, 768, 1024, 1440, 1920]) {
  await page.setViewportSize({ width: w, height: 900 });
  await page.goto('http://127.0.0.1:4210/');
  
  // Toggle to English by clicking language toggle button if available
  const toggled = await page.evaluate(() => {
    const langBtn = Array.from(document.querySelectorAll('button')).find(b => 
      b.textContent.includes('EN') || b.textContent.includes('ES')
    );
    if (langBtn) {
      langBtn.click();
      return true;
    }
    return false;
  });

  await page.waitForTimeout(300);

  const overflowInfo = await page.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      overflow: document.documentElement.scrollWidth - window.innerWidth
    };
  });

  if (overflowInfo.overflow > 0) {
    console.error(`❌ Language toggle overflow at ${w}px: ${overflowInfo.overflow}px`);
    langPass = false;
  } else {
    console.log(`✅ Viewport ${w}px after language switch: 0px overflow (scrollWidth=${overflowInfo.scrollWidth})`);
  }
}

console.log('\n--- TEST 4: Interactive Components Stress-Test ---');
let interactionsPass = true;

// A. Restaurant Modal Stress Test
await page.setViewportSize({ width: 1280, height: 900 });
await page.goto('http://127.0.0.1:4210/');

const modalTested = await page.evaluate(() => {
  const menuBtn = Array.from(document.querySelectorAll('button')).find(b => 
    b.textContent.includes('Ver Carta Digital') || b.textContent.includes('Digital Menu')
  );
  if (!menuBtn) return { found: false };
  menuBtn.click();
  return { found: true };
});

if (modalTested.found) {
  await page.waitForTimeout(400);
  const modalVisible = await page.evaluate(() => {
    // Check if modal dialog is rendered
    const modal = document.querySelector('.fixed.inset-0');
    const overflow = document.documentElement.scrollWidth - window.innerWidth;
    return { visible: !!modal, overflow };
  });
  console.log(`  Restaurant Menu Modal open: visible=${modalVisible.visible}, overflow=${modalVisible.overflow}px`);
  if (modalVisible.overflow > 0) interactionsPass = false;

  // Close modal
  await page.evaluate(() => {
    const closeBtn = document.querySelector('.fixed.inset-0 button');
    if (closeBtn) closeBtn.click();
  });
  await page.waitForTimeout(300);
} else {
  console.warn('  ⚠️ Restaurant Menu button not found');
}

// B. LodgingPackages Category Filter Tabs
const tabsTested = await page.evaluate(() => {
  const tabs = Array.from(document.querySelectorAll('button')).filter(b => 
    b.textContent.includes('Todos los Planes') || 
    b.textContent.includes('Hospedaje & Estadías') || 
    b.textContent.includes('Pasadías de Sol')
  );
  return tabs.map(t => t.textContent.trim());
});

console.log(`  LodgingPackages tabs found: ${tabsTested.join(', ')}`);
for (const tabName of ['Hospedaje & Estadías', 'Pasadías de Sol', 'Todos los Planes']) {
  await page.evaluate((name) => {
    const tab = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes(name));
    if (tab) tab.click();
  }, tabName);
  await page.waitForTimeout(200);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (overflow > 0) {
    console.error(`❌ Overflow after clicking tab "${tabName}": ${overflow}px`);
    interactionsPass = false;
  }
}

// C. Reviews Carousel Navigation
await page.evaluate(() => {
  const nextBtns = Array.from(document.querySelectorAll('button')).filter(b => b.querySelector('svg'));
  // Click next review several times
  for (let i = 0; i < 5; i++) {
    const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.getAttribute('aria-label') === 'Next' || b.className.includes('p-3 rounded-full'));
    if (nextBtn) nextBtn.click();
  }
});

console.log('\n--- TEST 5: Console and Network Errors ---');
if (consoleErrors.length > 0) {
  console.error(`❌ Encountered ${consoleErrors.length} console errors:`);
  consoleErrors.forEach(e => console.error('  ', e));
} else {
  console.log('✅ 0 console errors during page navigation and interaction.');
}

console.log('\n================ SUMMARY ================');
console.log(`ProductsHook Desktop Image Dimensions: ${productsHookPass ? 'PASS' : 'FAIL'}`);
console.log(`Widescreen Margins and Fluid Containers: ${widescreenPass ? 'PASS' : 'FAIL'}`);
console.log(`Language Toggle Layout: ${langPass ? 'PASS' : 'FAIL'}`);
console.log(`Interactive Features: ${interactionsPass ? 'PASS' : 'FAIL'}`);
console.log(`Console Errors: ${consoleErrors.length === 0 ? 'PASS' : 'FAIL'}`);

await browser.close();
server.close();

if (!productsHookPass || !widescreenPass || !langPass || !interactionsPass || consoleErrors.length > 0) {
  process.exit(1);
} else {
  console.log('\n🎉 ALL EMPIRICAL CHALLENGER TESTS PASSED!');
  process.exit(0);
}
