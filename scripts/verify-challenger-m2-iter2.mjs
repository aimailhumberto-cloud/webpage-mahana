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
  headerObstructionChecks: [],
  galleryMultiViewportClicks: [],
  homeViewportsSweep: [],
  overallVerdict: 'PENDING'
};

// Spin up a static file server with client-side SPA routing support
const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  let filePath = path.join(distDir, decodeURI(urlPath));
  
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  } else if (!fs.existsSync(filePath)) {
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

const PORT = 4212;
await new Promise(r => server.listen(PORT, r));
console.log(`Test server running at http://127.0.0.1:${PORT}`);

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

try {
  console.log('\n=== CHECK 1: Geometric Bounding Box & Header Clearance ===');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`http://127.0.0.1:${PORT}/`);
  await page.waitForLoadState('domcontentloaded');

  // Scroll to gallery
  const gallery = page.locator('section#galeria');
  await gallery.scrollIntoViewIfNeeded();

  // Open modal
  const tile1 = gallery.locator('div.group.cursor-pointer').first();
  await tile1.click();
  await page.waitForTimeout(200);

  const headerBox = await page.locator('header').boundingBox();
  const closeBtn = page.locator('button[aria-label="Close image"]');
  const closeBtnBox = await closeBtn.boundingBox();

  console.log(`Header bounding box: y=${headerBox.y}, height=${headerBox.height}, bottom=${headerBox.y + headerBox.height}`);
  console.log(`Close button bounding box: y=${closeBtnBox.y}, height=${closeBtnBox.height}, top=${closeBtnBox.y}`);

  const headerBottom = headerBox.y + headerBox.height;
  const isClearOfHeader = closeBtnBox.y >= headerBottom;
  const clearancePx = closeBtnBox.y - headerBottom;

  console.log(`Clearance between header bottom and close button top: ${clearancePx}px`);

  results.headerObstructionChecks.push({
    test: 'Header clearance geometry',
    headerBottom,
    closeBtnTop: closeBtnBox.y,
    clearancePx,
    passed: isClearOfHeader
  });

  // Test close via click
  await closeBtn.click({ timeout: 2000 });
  await page.waitForTimeout(150);
  const isClosedAfterClick = !(await closeBtn.isVisible());
  console.log(`Modal closed after close button click: ${isClosedAfterClick}`);

  results.headerObstructionChecks.push({
    test: 'Close button click event execution',
    passed: isClosedAfterClick
  });

  console.log('\n=== CHECK 2: Close Button Interactivity Across Multiple Viewports ===');
  const testViewports = [
    { name: 'Mobile XS', width: 375, height: 667 },
    { name: 'Mobile Large', width: 430, height: 932 },
    { name: 'Tablet Portrait', width: 768, height: 1024 },
    { name: 'Laptop', width: 1024, height: 768 },
    { name: 'Desktop Standard', width: 1440, height: 900 },
    { name: 'Widescreen Full HD', width: 1920, height: 1080 }
  ];

  for (const vp of testViewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(`http://127.0.0.1:${PORT}/`);
    await page.waitForLoadState('domcontentloaded');

    const gal = page.locator('section#galeria');
    await gal.scrollIntoViewIfNeeded();

    // Click 1st tile
    await gal.locator('div.group.cursor-pointer').first().click();
    await page.waitForTimeout(200);

    const btn = page.locator('button[aria-label="Close image"]');
    const isBtnVisible = await btn.isVisible();

    let clickSucceeded = false;
    let errorMsg = '';
    try {
      await btn.click({ timeout: 2000 });
      clickSucceeded = true;
    } catch (e) {
      errorMsg = e.message;
    }

    await page.waitForTimeout(150);
    const modalClosed = !(await btn.isVisible());

    const passed = isBtnVisible && clickSucceeded && modalClosed;
    console.log(`  Viewport ${vp.name} (${vp.width}x${vp.height}): ${passed ? '✓ PASS' : '✗ FAIL'} ${errorMsg}`);
    results.galleryMultiViewportClicks.push({
      viewport: vp.name,
      width: vp.width,
      height: vp.height,
      passed,
      error: errorMsg
    });
  }

  console.log('\n=== CHECK 3: Sweep 22 Viewports for Home Page (/) ===');
  const widths = [320, 360, 375, 414, 480, 600, 640, 700, 767, 768, 800, 850, 900, 950, 1000, 1023, 1024, 1280, 1440, 1600, 1920, 2560];

  for (const w of widths) {
    await page.setViewportSize({ width: w, height: 900 });
    await page.goto(`http://127.0.0.1:${PORT}/`);
    const metrics = await page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        overflow: document.documentElement.scrollWidth - window.innerWidth
      };
    });

    const isOk = metrics.overflow === 0;
    console.log(`  ${w}px: ${isOk ? '✅ OK (0px)' : `❌ OVERFLOW ${metrics.overflow}px`}`);
    results.homeViewportsSweep.push({
      width: w,
      ...metrics,
      passed: isOk
    });
  }

  console.log('\n=== CHECK 4: All 6 Gallery Images Lightbox & Backdrop Close ===');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`http://127.0.0.1:${PORT}/`);
  const gal = page.locator('section#galeria');
  await gal.scrollIntoViewIfNeeded();

  let all6Pass = true;
  for (let i = 0; i < 6; i++) {
    const tile = gal.locator('div.group.cursor-pointer').nth(i);
    await tile.click();
    await page.waitForTimeout(100);
    
    // Check close button works
    const closeB = page.locator('button[aria-label="Close image"]');
    if (!(await closeB.isVisible())) {
      all6Pass = false;
      break;
    }
    await closeB.click();
    await page.waitForTimeout(100);

    // Reopen and check backdrop click works
    await tile.click();
    await page.waitForTimeout(100);
    const backdrop = page.locator('div.fixed.bg-black\\/90');
    await backdrop.click({ position: { x: 30, y: 300 } });
    await page.waitForTimeout(100);
    if (await closeB.isVisible()) {
      all6Pass = false;
      break;
    }
  }
  console.log(`All 6 gallery tiles open and close cleanly via button and backdrop: ${all6Pass ? '✓ PASS' : '✗ FAIL'}`);
  results.all6GalleryTiles = all6Pass;

  const allHeaderChecksPass = results.headerObstructionChecks.every(r => r.passed);
  const allViewportClicksPass = results.galleryMultiViewportClicks.every(r => r.passed);
  const allHomeSweepsPass = results.homeViewportsSweep.every(r => r.passed);

  if (allHeaderChecksPass && allViewportClicksPass && allHomeSweepsPass && all6Pass) {
    results.overallVerdict = 'APPROVE';
  } else {
    results.overallVerdict = 'REQUEST_CHANGES';
  }

} catch (err) {
  console.error('Fatal execution error:', err);
  results.overallVerdict = 'REQUEST_CHANGES';
} finally {
  await browser.close();
  server.close();
}

console.log(`\nOverall Verification Verdict: ${results.overallVerdict}`);

fs.writeFileSync(
  path.join(projectRoot, '.agents', 'teamwork', 'challenger_m2_iter2', 'verification_results.json'),
  JSON.stringify(results, null, 2)
);
console.log('Results written to verification_results.json');
