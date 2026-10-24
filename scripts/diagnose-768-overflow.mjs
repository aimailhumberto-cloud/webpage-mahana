import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';
import { chromium } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  let filePath = path.join(distDir, reqPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  } else if (!fs.existsSync(filePath)) {
    filePath = path.join(distDir, 'index.html');
  }
  const ext = path.extname(filePath);
  const type = ext === '.html' ? 'text/html' : ext === '.css' ? 'text/css' : ext === '.js' ? 'application/javascript' : 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': type });
  fs.createReadStream(filePath).pipe(res);
});

await new Promise(r => server.listen(4201, r));

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 768, height: 1024 });
await page.goto('http://127.0.0.1:4201/pasadias');

const diagnostic = await page.evaluate(() => {
  const scrollInitial = document.documentElement.scrollWidth;
  const footer = document.querySelector('footer');
  
  // Test hiding footer
  footer.style.display = 'none';
  const scrollNoFooter = document.documentElement.scrollWidth;
  footer.style.display = '';

  // Test modifying footer grid
  const footerGrid = footer.querySelector('.grid');
  const initialGridClasses = footerGrid.className;
  
  // Measure child elements of footer
  const footerChildren = Array.from(footer.querySelectorAll('*')).map(el => {
    const rect = el.getBoundingClientRect();
    return {
      tag: el.tagName,
      className: el.className,
      right: rect.right,
      width: rect.width
    };
  }).filter(item => item.right > 768);

  return {
    scrollInitial,
    scrollNoFooter,
    footerOverflowChildren: footerChildren.slice(0, 5)
  };
});

console.log('Diagnostic result on /pasadias:', diagnostic);

// Also test Homepage
await page.goto('http://127.0.0.1:4201/');
const homeDiag = await page.evaluate(() => {
  const scrollInitial = document.documentElement.scrollWidth;
  const footer = document.querySelector('footer');
  footer.style.display = 'none';
  const scrollNoFooter = document.documentElement.scrollWidth;
  footer.style.display = '';

  return {
    scrollInitial,
    scrollNoFooter
  };
});

console.log('Diagnostic result on /:', homeDiag);

await browser.close();
server.close();
