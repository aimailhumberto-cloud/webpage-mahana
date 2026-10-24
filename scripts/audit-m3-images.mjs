import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const files = [
  path.join(rootDir, 'src/pages/ProductShowcase.tsx'),
  path.join(rootDir, 'src/pages/PasadiasHub.tsx'),
  path.join(rootDir, 'src/pages/EstadiasHub.tsx')
];

const imgRegex = /['"](\/images\/[^'"]+)['"]/g;
const missing = [];
const found = [];

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    const rawRef = match[1];
    const cleanPath = rawRef.split('?')[0]; // strip ?v=2
    const fullDiskPath = path.join(rootDir, 'public', cleanPath.replace(/^\//, ''));
    if (!fs.existsSync(fullDiskPath)) {
      missing.push({ file: path.basename(f), ref: rawRef, disk: fullDiskPath });
    } else {
      found.push({ file: path.basename(f), ref: rawRef, disk: fullDiskPath });
    }
  }
}

console.log('Total image references found:', found.length + missing.length);
console.log('Unique verified images:', [...new Set(found.map(x => x.ref))].length);
console.log('Found images list:');
[...new Set(found.map(x => x.ref))].forEach(r => console.log('  ✓ ' + r));

if (missing.length > 0) {
  console.error('MISSING IMAGES:', JSON.stringify(missing, null, 2));
  process.exit(1);
} else {
  console.log('ALL REFERENCED IMAGES EXIST ON DISK!');
}
