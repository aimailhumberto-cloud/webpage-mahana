import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';
import { chromium } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');

const server = http.createServer((req, res) => {
  let filePath = path.join(distDir, decodeURI(req.url.split('?')[0]));
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) filePath = path.join(filePath, 'index.html');
  else if (!fs.existsSync(filePath)) filePath = path.join(distDir, 'index.html');
  const ext = path.extname(filePath);
  const type = ext === '.html' ? 'text/html' : ext === '.css' ? 'text/css' : ext === '.js' ? 'application/javascript' : 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': type });
  fs.createReadStream(filePath).pipe(res);
});

await new Promise(r => server.listen(4202, r));
const browser = await chromium.launch();
const page = await browser.newPage();

const widths = [320, 360, 375, 414, 480, 600, 640, 700, 767, 768, 800, 850, 900, 950, 1000, 1023, 1024, 1280, 1440, 1600, 1920, 2560];
const results = [];

for (const w of widths) {
  await page.setViewportSize({ width: w, height: 800 });
  await page.goto('http://127.0.0.1:4202/pasadias');
  const res = await page.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      overflow: document.documentElement.scrollWidth - window.innerWidth
    };
  });
  results.push({ width: w, ...res });
}

console.log('Viewport sweep results:');
for (const r of results) {
  if (r.overflow > 0) {
    console.log(`❌ ${r.width}px: overflow by ${r.overflow}px (scrollWidth=${r.scrollWidth})`);
  } else {
    console.log(`✅ ${r.width}px: OK`);
  }
}

await browser.close();
server.close();
