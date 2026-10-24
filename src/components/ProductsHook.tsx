import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useMedia } from '../context/MediaContext';
import { Bed, Sun, Utensils, Waves, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const ProductsHook: React.FC = () => {
  const { language } = useLanguage();
  const { media } = useMedia();
  const navigate = useNavigate();

  const products = [
    {
      icon: <Bed className="w-6 h-6 text-turquoise-700" />,
      title: language === 'es' ? 'Estadías & Hospedaje' : 'Stays & Lodging',
      subtitle: language === 'es' ? 'Mahana Experience, Escape & Todo Incluido' : 'Mahana Experience, Escape & All-Inclusive',
      desc: language === 'es'
        ? 'Suites Dobles, Estándar, Familiares y Glamping rodeadas de vegetación tropical viva. Despierta con el canto de las aves, 3 piscinas y opciones de pensión completa o barra libre.'
        : 'Double, Standard, Family and Glamping suites nestled in lush tropical nature. Wake up to ocean breezes, 3 swimming pools, and flexible full-board or all-inclusive packages.',
      bgImage: media.exp_stays || '/images/hero-pool-deck.jpg',
      badge: language === 'es' ? 'Hospedaje Boutique' : 'Boutique Lodging',
      priceBadgeSub: language === 'es' ? 'Tarifa Desde' : 'Starting From',
      priceBadge: language === 'es' ? 'Desde $49.50/noche' : 'From $49.50/night',
      priceNote: language === 'es' ? 'Promo Escape $33/pareja' : 'Escape Promo $33/couple',
      highlights: language === 'es'
        ? ['3 Piscinas', 'Desayuno Incluido', 'WiFi Starlink', 'Pet Friendly']
        : ['3 Pools', 'Breakfast Included', 'Starlink WiFi', 'Pet Friendly'],
      link: '/estadias',
      cta: language === 'es' ? 'Explorar Hospedaje' : 'Explore Lodging',
      accentColor: 'border-turquoise-600'
    },
    {
      icon: <Sun className="w-6 h-6 text-amber-600" />,
      title: language === 'es' ? 'Pasadías de Sol' : 'Sun Day Passes',
      subtitle: language === 'es' ? 'Pool Day & Pasadía Todo Incluido' : 'Pool Day & All-Inclusive Day Pass',
      desc: language === 'es'
        ? 'Un día entero de desconexión sin necesidad de hospedarte. Disfruta de nuestras 3 piscinas, camastros con sombra de palmeras, delicioso almuerzo a la carta y barra libre nacional.'
        : 'A full day of sun and pure relaxation without an overnight stay. Enjoy our 3 tropical pools, palm-shaded daybeds, gourmet a-la-carte lunch, and open bar cocktails.',
      bgImage: media.exp_daypass || '/images/exp-daypass.jpg',
      badge: language === 'es' ? 'Día de Sol' : 'Day Use',
      priceBadgeSub: language === 'es' ? 'Pasadías Desde' : 'Day Passes From',
      priceBadge: language === 'es' ? 'Desde $38.50/persona' : 'From $38.50/person',
      priceNote: language === 'es' ? 'Pool Day solo $5.50' : 'Basic Pool Day only $5.50',
      highlights: language === 'es'
        ? ['Acceso 9 AM a 5 PM', '3 Piscinas Tropicales', 'Almuerzo a la Carta', 'Open Bar Opcional']
        : ['9 AM to 5 PM Access', '3 Tropical Pools', 'A-la-carte Lunch', 'Open Bar Optional'],
      link: '/pasadias',
      cta: language === 'es' ? 'Ver Pasadías' : 'View Day Passes',
      accentColor: 'border-amber-500'
    },
    {
      icon: <Utensils className="w-6 h-6 text-rose-600" />,
      title: language === 'es' ? 'Restaurante Gourmet' : 'Gourmet Restaurant',
      subtitle: language === 'es' ? 'Horno de Leña · Abierto al Público' : 'Wood-Fired · Open to Public',
      desc: language === 'es'
        ? 'Pizzas artesanales con masa madre crocante al horno de leña, pesca fresca del Pacífico con patacones, hamburguesas gourmet angus y coctelería tropical de autor frente a la piscina.'
        : 'Authentic wood-fired sourdough pizzas, fresh Pacific catch of the day with patacones, gourmet angus burgers, and signature poolside tropical mixology.',
      bgImage: media.exp_restaurant || '/images/food-pizza-oven.jpg',
      badge: language === 'es' ? 'Gastronomía de Autor' : 'Signature Dining',
      priceBadgeSub: language === 'es' ? 'Restaurante & Bar' : 'Restaurant & Bar',
      priceBadge: language === 'es' ? 'Pizzas desde $12' : 'Pizzas from $12',
      priceNote: language === 'es' ? 'No requiere hospedaje' : 'No stay required',
      highlights: language === 'es'
        ? ['Horno de Leña', 'Mariscos Frescos', 'Coctelería de Autor', 'Estacionamiento Gratis']
        : ['Wood-Fired Oven', 'Fresh Seafood', 'Signature Cocktails', 'Free Parking'],
      link: '/restaurante',
      cta: language === 'es' ? 'Ver Menú & Horarios' : 'View Menu & Hours',
      accentColor: 'border-rose-500'
    },
    {
      icon: <Waves className="w-6 h-6 text-cyan-600" />,
      title: 'Surf Shack Beach Club',
      subtitle: language === 'es' ? 'Playa Caracol · Pacific Coast' : 'Caracol Beach · Pacific Coast',
      desc: language === 'es'
        ? 'El club de playa de Casa Mahana en Playa Caracol. Clases de surf personalizadas avaladas por la Academia Nacional de Surf, alquiler de tablas, carpas balinesas y chillout playero.'
        : 'Casa Mahana’s oceanfront beach club at Playa Caracol. Certified surf coaching with the National Surf Academy, quiver rentals, beach daybeds, and coastal vibes.',
      bgImage: media.exp_surf || '/images/surf-shack-beach-club-drone.jpg',
      badge: language === 'es' ? 'Surf & Beach Club' : 'Surf & Beach Club',
      priceBadgeSub: language === 'es' ? 'Experiencias de Mar' : 'Ocean Experiences',
      priceBadge: language === 'es' ? 'Clases desde $35' : 'Lessons from $35',
      priceNote: language === 'es' ? 'A 5 min del Lodge' : '5 min from Lodge',
      highlights: language === 'es'
        ? ['Academia Nacional de Surf', 'Alquiler de Tablas', 'Vibe Costero', 'Daybeds frente al mar']
        : ['National Surf Academy', 'Board Rentals', 'Coastal Vibe', 'Oceanfront Daybeds'],
      link: '/surf-shack',
      cta: language === 'es' ? 'Descubrir Surf Shack' : 'Discover Surf Shack',
      accentColor: 'border-cyan-500'
    }
  ];

  return (
    <section className="band-full-bleed py-20 lg:py-28 bg-mahana-light relative">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-turquoise-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sand-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="container-fluid relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-turquoise-50 border border-turquoise-200/60 rounded-full text-turquoise-800 text-xs uppercase tracking-widest font-extrabold">
            <Sparkles className="w-3.5 h-3.5 text-turquoise-600" />
            <span>{language === 'es' ? 'Nuestras Experiencias' : 'Our Experiences'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-turquoise-950 tracking-tight leading-[1.12]">
            {language === 'es' ? '¿Qué quieres disfrutar hoy?' : 'What would you like to experience today?'}
          </h2>

          <div className="h-1.5 w-24 bg-turquoise-700 mx-auto rounded-full" />

          <p className="text-base sm:text-lg text-mahana-dark/70 max-w-2xl mx-auto leading-relaxed">
            {language === 'es'
              ? 'Desde una escapada de fin de semana con todo incluido hasta un pasadía en nuestras 3 piscinas, una pizza artesanal al horno de leña o una sesión de surf en Playa Caracol.'
              : 'From an all-inclusive weekend getaway to a refreshing day pass by our 3 pools, artisanal wood-fired pizza, or a surf lesson at Caracol Beach.'}
          </p>
        </div>

        {/* Expansive Full-Width Visual Showcase Bands (2x2 Grid with 380px+ Photography) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {products.map((product, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[32px] overflow-hidden border border-sand-200/80 shadow-premium hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col group cursor-pointer"
              onClick={() => navigate(product.link)}
            >
              {/* Large Format Photography Showcase Window (380px+ height) */}
              <div className="relative h-[380px] sm:h-[420px] w-full overflow-hidden">
                <img
                  src={product.bgImage}
                  alt={product.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[4000ms] ease-out group-hover:scale-108"
                />
                {/* Visual Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                {/* Floating Category Pill Tag */}
                <div className="absolute top-5 left-5 z-10">
                  <span className="backdrop-blur-md bg-white/95 text-turquoise-950 border border-white/40 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest shadow-md">
                    {product.badge}
                  </span>
                </div>

                {/* Prominent High-Impact Price Badge */}
                <div className="absolute top-5 right-5 z-10">
                  <div className="backdrop-blur-md bg-turquoise-950/90 text-sand-50 border border-turquoise-700/60 rounded-2xl px-4 py-2 shadow-xl text-right">
                    <span className="text-[10px] uppercase font-extrabold text-sand-300 block tracking-wider">
                      {product.priceBadgeSub}
                    </span>
                    <span className="text-lg sm:text-xl font-black text-white block">
                      {product.priceBadge}
                    </span>
                    <span className="text-[10px] text-sand-200/80 font-medium">
                      {product.priceNote}
                    </span>
                  </div>
                </div>

                {/* Floating Title Inside Photo Bottom for immediate punch */}
                <div className="absolute bottom-5 left-5 right-5 z-10 text-white">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white">
                      {product.icon}
                    </div>
                    <span className="text-xs uppercase font-extrabold tracking-wider text-sand-200">
                      {product.subtitle}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-sand-50 drop-shadow-md">
                    {product.title}
                  </h3>
                </div>
              </div>

              {/* Editorial Description & Highlights */}
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between bg-white space-y-6">
                <p className="text-sm sm:text-base text-mahana-dark/75 leading-relaxed">
                  {product.desc}
                </p>

                {/* Highlights Pills Row */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {product.highlights.map((highlight, hIdx) => (
                    <span
                      key={hIdx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-sand-100/70 border border-sand-200/80 text-turquoise-950 rounded-full text-xs font-semibold"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-turquoise-600 shrink-0" />
                      <span>{highlight}</span>
                    </span>
                  ))}
                </div>

                {/* Direct Action Link */}
                <div className="flex items-center justify-between pt-6 border-t border-sand-100 mt-4">
                  <Link
                    to={product.link}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center space-x-2.5 px-6 py-3 rounded-full bg-turquoise-750 hover:bg-turquoise-800 text-white font-extrabold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>{product.cta}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </Link>

                  <span className="text-xs font-bold text-turquoise-700 uppercase tracking-widest hidden sm:inline-block">
                    {language === 'es' ? 'Ver Información Completa' : 'See Full Details'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsHook;

