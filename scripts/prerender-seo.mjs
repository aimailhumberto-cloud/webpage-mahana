import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

const routes = [
  {
    path: '/',
    title: 'Casa Mahana — Lodge & Restaurante Gourmet en Chame, Panamá',
    description: 'Disfruta de una escapada tropical inolvidable en Casa Mahana. Hospedaje acogedor, piscina tropical, restaurante gourmet al horno de leña, 3 piscinas tropicales y tours de aventura en Chame.',
    image: 'https://www.casamahana.com/images/hero-pool-drone-aerial.jpg',
    schemaType: 'LodgingBusiness'
  },
  {
    path: '/experiencias',
    title: 'Planes y Experiencias de Hospedaje — Casa Mahana',
    description: 'Explora todos los planes de estadía y pasadías en Casa Mahana. Compara tarifas de hospedaje estándar, todo incluido, escape para parejas y pases de piscina en Chame.',
    image: 'https://www.casamahana.com/images/hero-pool-drone.jpg',
    schemaType: 'LodgingBusiness'
  },
  {
    path: '/estadias',
    title: 'Habitaciones y Estadías — Casa Mahana Lodge',
    description: 'Descubre nuestras acogedoras habitaciones en Chame. Contamos con habitaciones Estándar, Dobles, Familiares y opciones de Glamping con pensión completa y acceso a piscinas.',
    image: 'https://www.casamahana.com/images/room-doble.jpg',
    schemaType: 'LodgingBusiness'
  },
  {
    path: '/estadias/escape-mahana',
    title: 'Escape Mahana (Promo Parejas) — Casa Mahana Lodge',
    description: 'Escapada especial para parejas por $33/noche de domingo a jueves. Incluye hospedaje, desayuno continental y acceso libre a nuestras piscinas y club de playa.',
    image: 'https://www.casamahana.com/images/escape-mahana-hero.jpg',
    schemaType: 'LodgingBusiness'
  },
  {
    path: '/estadias/mahana-experience',
    title: 'Mahana Experience (Pensión Completa) — Casa Mahana Lodge',
    description: 'Estadía inolvidable con pensión completa: desayuno, almuerzo y cena incluidos por $49.50/persona. Acceso a 3 piscinas, WiFi y amplias habitaciones en Chame.',
    image: 'https://www.casamahana.com/images/room-doble.jpg',
    schemaType: 'LodgingBusiness'
  },
  {
    path: '/estadias/todo-incluido',
    title: 'Estadía Todo Incluido + Open Bar — Casa Mahana Lodge',
    description: 'Disfruta de la desconexión definitiva con hospedaje, pensión completa, barra libre de cócteles premium ilimitados y acceso a 3 piscinas tropicales.',
    image: 'https://www.casamahana.com/images/all-inclusive-pool-hero-v2.jpg',
    schemaType: 'LodgingBusiness'
  },
  {
    path: '/pasadias',
    title: 'Pasadías y Días de Piscina en Chame — Casa Mahana',
    description: 'Pasa un día espectacular de sol en Casa Mahana. Disfruta de nuestras 3 piscinas tropicales, hamacas, restaurante gourmet y opciones con almuerzo y barra libre.',
    image: 'https://www.casamahana.com/images/exp-daypass.jpg',
    schemaType: 'TouristAttraction'
  },
  {
    path: '/pasadias/pool-day',
    title: 'Pase de Piscina Pool Day — Casa Mahana Lodge',
    description: 'Disfruta de un día de sol y piscina por solo B/. 5.50 en Chame. Acceso completo a nuestras 3 piscinas tropicales y áreas comunes. Promociones especiales en bar y restaurante.',
    image: 'https://www.casamahana.com/images/pool-day-cocktails.jpg',
    schemaType: 'TouristAttraction'
  },
  {
    path: '/pasadias/todo-incluido',
    title: 'Pasadía Todo Incluido (Piscina + Comida + Open Bar) — Casa Mahana',
    description: 'El plan de día más completo en Chame por $38.50. Acceso a 3 piscinas de 9am a 5pm, almuerzo gourmet a la carta, barra libre nacional (hasta 12 tragos) y snacks.',
    image: 'https://www.casamahana.com/images/pool-day-pineapple.png',
    schemaType: 'TouristAttraction'
  },
  {
    path: '/restaurante',
    title: 'Restaurante Gourmet al Horno de Leña — Casa Mahana',
    description: 'Abierto al público en Chame. Saborea nuestras pizzas artesanales a la leña, ceviches frescos, mariscos locales y cócteles de autor frente a la piscina tropical.',
    image: 'https://www.casamahana.com/images/food-pizza-oven.jpg',
    schemaType: 'Restaurant'
  },
  {
    path: '/eventos',
    title: 'Bodas y Eventos Exclusivos — Casa Mahana',
    description: 'Celebra tu boda, evento corporativo o fiesta privada en un entorno tropical único en Chame. Ofrecemos paquetes completos, catering gourmet y reserva exclusiva de todo el lodge.',
    image: 'https://www.casamahana.com/images/wedding-setup.jpg',
    schemaType: 'LodgingBusiness'
  },
  {
    path: '/mahana-tours',
    title: 'Tours y Excursiones de Aventura — Casa Mahana',
    description: 'Explora Chame y sus alrededores con Mahana Tours. Excursiones en buggy por la playa, caminatas por cañones y cascadas, paseos en bote y cruceros en yate.',
    image: 'https://www.casamahana.com/images/hero-pool-drone.jpg',
    schemaType: 'TouristAttraction'
  },
  {
    path: '/promo-habitacion-gratis',
    title: 'Habitación Gratis (Promo Limitada) — Casa Mahana Lodge',
    description: '¡Hospedaje de habitación gratis al depositar tu presupuesto de consumo de alimentos y bebidas! Disfruta de una escapada en pareja en Chame con acceso a 3 piscinas y club de playa.',
    image: 'https://www.casamahana.com/images/escape-mahana-hero.jpg',
    schemaType: 'LodgingBusiness'
  }
];

function buildStructuredData(route) {
  return {
    '@context': 'https://schema.org',
    '@type': route.schemaType === 'Restaurant' ? 'Restaurant' : 'LodgingBusiness',
    name: 'Casa Mahana Lodge & Restaurant',
    alternateName: 'Casa Mahana',
    url: `https://www.casamahana.com${route.path === '/' ? '' : route.path}`,
    logo: 'https://www.casamahana.com/images/logo-casa-mahana.png',
    image: route.image,
    description: route.description,
    telephone: '+5073453222',
    priceRange: '$5.50 - $66.00',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Vía Punta Chame, El Mangote',
      addressLocality: 'Chame',
      addressRegion: 'Panamá Oeste',
      addressCountry: 'PA'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 8.5833,
      longitude: -79.8833
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: '3 Swimming Pools', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Wood-Fired Restaurant', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Free High-Speed WiFi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Pet Friendly', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Free Parking', value: true }
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.2',
      reviewCount: '85'
    }
  };
}

function prerender() {
  const indexHtmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('❌ dist/index.html not found. Run "vite build" first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

  console.log(`🚀 Starting SEO prerendering for ${routes.length} routes...`);

  for (const route of routes) {
    const canonical = `https://www.casamahana.com${route.path === '/' ? '/' : route.path}`;
    const structuredDataJson = JSON.stringify(buildStructuredData(route));

    let html = baseHtml;

    // Replace Title
    html = html.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);

    // Replace Description
    html = html.replace(
      /<meta\s+name=["']description["'][^>]*>/i,
      `<meta name="description" content="${route.description}" />`
    );

    // Replace Canonical Link
    html = html.replace(
      /<link\s+rel=["']canonical["'][^>]*>/i,
      `<link rel="canonical" href="${canonical}" />`
    );

    // Replace Open Graph Tags
    html = html.replace(
      /<meta\s+property=["']og:title["'][^>]*>/i,
      `<meta property="og:title" content="${route.title}" />`
    );
    html = html.replace(
      /<meta\s+property=["']og:description["'][^>]*>/i,
      `<meta property="og:description" content="${route.description}" />`
    );
    html = html.replace(
      /<meta\s+property=["']og:url["'][^>]*>/i,
      `<meta property="og:url" content="${canonical}" />`
    );
    html = html.replace(
      /<meta\s+property=["']og:image["'][^>]*>/i,
      `<meta property="og:image" content="${route.image}" />`
    );

    // Replace Twitter Tags
    html = html.replace(
      /<meta\s+name=["']twitter:title["'][^>]*>/i,
      `<meta name="twitter:title" content="${route.title}" />`
    );
    html = html.replace(
      /<meta\s+name=["']twitter:description["'][^>]*>/i,
      `<meta name="twitter:description" content="${route.description}" />`
    );
    html = html.replace(
      /<meta\s+name=["']twitter:image["'][^>]*>/i,
      `<meta name="twitter:image" content="${route.image}" />`
    );

    // Inject Schema.org JSON-LD before </head>
    const schemaTag = `\n    <!-- Schema.org Structured Data -->\n    <script type="application/ld+json" id="schema-structured-data">${structuredDataJson}</script>\n  `;
    html = html.replace('</head>', `${schemaTag}</head>`);

    // Write file
    if (route.path === '/') {
      fs.writeFileSync(indexHtmlPath, html, 'utf-8');
      console.log(`  ✓ Prerendered [Home]: dist/index.html`);
    } else {
      const targetDir = path.join(distDir, route.path.replace(/^\//, ''));
      fs.mkdirSync(targetDir, { recursive: true });
      const targetFile = path.join(targetDir, 'index.html');
      fs.writeFileSync(targetFile, html, 'utf-8');
      console.log(`  ✓ Prerendered [Route]: ${targetFile.replace(distDir, 'dist')}`);
    }
  }

  // Ensure 404.html fallback
  fs.copyFileSync(indexHtmlPath, path.join(distDir, '404.html'));
  console.log('  ✓ Generated fallback: dist/404.html');

  console.log('✅ Static SEO Prerendering successfully generated!');
}

prerender();
