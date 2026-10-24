import fs from 'fs';
import path from 'path';

const files = [
  'src/pages/RestaurantePublico.tsx',
  'src/pages/SurfShackAcademy.tsx',
  'src/pages/MahanaTours.tsx',
  'src/pages/EventosBodas.tsx'
];

const imgRegex = /['"](\/images\/[^'"]+)['"]/g;
const missing = [];
const found = new Set();

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    const rawMatch = match[1];
    const cleanPath = rawMatch.split('?')[0];
    const fullPath = path.join('public', cleanPath.replace(/^\//, ''));
    if (!fs.existsSync(fullPath)) {
      missing.push({ file, ref: rawMatch, expectedPath: fullPath });
    } else {
      found.add(cleanPath);
    }
  }
}

console.log('Unique verified images (' + found.size + '):');
for (const img of found) {
  const stat = fs.statSync(path.join('public', img.replace(/^\//, '')));
  console.log('  ' + img + ' (' + stat.size + ' bytes)');
}

if (missing.length > 0) {
  console.error('MISSING IMAGES FOUND:');
  console.error(missing);
  process.exit(1);
} else {
  console.log('ALL REFERENCED IMAGES EXIST LOCALLY!');
}
