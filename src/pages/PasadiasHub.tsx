import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Check, X, Clock, ArrowRight, Sun, GlassWater, ShieldAlert, Sparkles, Waves, Utensils, Wifi, Car, ZoomIn } from 'lucide-react';
import { SEO } from '../components/SEO';

export const PasadiasHub: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [activeGalleryImage, setActiveGalleryImage] = useState<string | null>(null);

  const dayPasses = [
    {
      id: 'todo-incluido',
      title: language === 'es' ? 'Pasadía con Todo Incluido' : 'All-Inclusive Day Pass',
      subtitle: language === 'es' ? 'Almuerzo Gourmet a la Carta & Open Bar Nacional' : 'A-la-Carte Gourmet Lunch & National Open Bar',
      desc: language === 'es' 
        ? 'Disfruta de un día espectacular con almuerzo premium a la carta, open bar nacional (hasta 12 tragos) y snacks ilimitados de piscina.' 
        : 'Enjoy a spectacular day with premium a-la-carte lunch, local open bar (up to 12 drinks), and unlimited pool snacks.',
      price: '$38.50',
      priceUnit: language === 'es' ? 'adulto' : 'adult',
      planCode: 'pasadia_comidas',
      img: '/images/all-inclusive-pool-hero-v2.jpg',
      detailsLink: '/pasadias/todo-incluido',
      badge: 'VIP',
      accentBadge: language === 'es' ? 'Experiencia Completa' : 'Full Experience',
      highlights: language === 'es'
        ? ['Almuerzo a la carta', 'Open bar (12 tragos)', 'Snacks de piscina ilimitados', 'Toallas & Camastros']
        : ['A-la-carte lunch', 'Open bar (12 drinks)', 'Unlimited pool snacks', 'Towels & Daybeds'],
      inclusions: language === 'es'
        ? [
            "Acceso completo de 9 AM a 5 PM",
            "Almuerzo premium a la carta",
            "Open bar nacional (hasta 12 tragos de cerveza, ron, vodka)",
            "Snacks de piscina ilimitados (alitas, patacones)",
            "Uso de toallas, camastros y 3 piscinas tropicales",
            "WiFi Starlink de alta velocidad y estacionamiento vigilado"
          ]
        : [
            "Full Access from 9 AM to 5 PM",
            "Premium a-la-carte lunch included",
            "Local open bar (up to 12 drinks: beer, rum, vodka)",
            "Unlimited pool snacks (wings, plantain chips)",
            "Lodge towels, loungers & 3 tropical pools access",
            "High-speed Starlink WiFi & secure private parking"
          ]
    },
    {
      id: 'pool-day',
      title: 'Pool Day',
      subtitle: language === 'es' ? 'Acceso a las 3 Piscinas Tropicales & Jardines' : 'Access to 3 Tropical Pools & Gardens',
      desc: language === 'es'
        ? 'Acceso completo a nuestras piscinas, áreas sociales y hermosos jardines tropicales. Consumos de comida y bebidas no están incluidos.'
        : 'Full access to our pool facilities, social areas, and beautiful tropical gardens. Food and beverage consumption is not included.',
      price: '$5.50',
      priceUnit: language === 'es' ? 'adulto' : 'adult',
      planCode: 'pasadia_entrada',
      img: '/images/hero-pool-drone-aerial.jpg',
      detailsLink: '/pasadias/pool-day',
      badge: language === 'es' ? 'Básico' : 'Basic',
      accentBadge: language === 'es' ? 'Económico & Flexible' : 'Budget & Flexible',
      highlights: language === 'es'
        ? ['3 Piscinas Tropicales', 'Horario 9 AM - 5 PM', 'Jardines & Bohíos', 'Duchas Externas']
        : ['3 Tropical Pools', '9 AM - 5 PM Access', 'Gardens & Bohíos', 'Outdoor Showers'],
      inclusions: language === 'es'
        ? [
            "Acceso completo de 9 AM a 5 PM",
            "Uso de piscina y duchas externas",
            "Acceso a camastros y hamacas (sujeto a disponibilidad)",
            "WiFi Starlink en áreas sociales",
            "Consumos de restaurante y bar se pagan por separado"
          ]
        : [
            "Full Access from 9 AM to 5 PM",
            "Use of pool and outdoor showers",
            "Hammocks & lounge chairs access (subject to availability)",
            "High-speed Starlink WiFi in social areas",
            "Restaurant and bar consumption paid separately"
          ]
    }
  ];

  const comparisonRows = [
    {
      feature: language === 'es' ? 'Acceso a las 3 Piscinas Tropicales' : 'Access to 3 Tropical Pools',
      icon: <Waves className="h-4 w-4 text-turquoise-700" />,
      poolDay: language === 'es' ? 'Sí (9:00 AM - 5:00 PM)' : 'Yes (9:00 AM - 5:00 PM)',
      poolDayIncluded: true,
      allInclusive: language === 'es' ? 'Sí (9:00 AM - 5:00 PM)' : 'Yes (9:00 AM - 5:00 PM)',
      allInclusiveIncluded: true,
    },
    {
      feature: language === 'es' ? 'Almuerzo Gourmet a la Carta' : 'A-la-Carte Gourmet Lunch',
      icon: <Utensils className="h-4 w-4 text-turquoise-700" />,
      poolDay: language === 'es' ? 'No (A la carta en restaurante)' : 'No (Paid per order)',
      poolDayIncluded: false,
      allInclusive: language === 'es' ? 'Sí (Plato fuerte + entrada a elegir)' : 'Yes (Entrée + side of choice)',
      allInclusiveIncluded: true,
    },
    {
      feature: language === 'es' ? 'Barra Libre Nacional (Open Bar)' : 'National Open Bar (12 Drinks)',
      icon: <GlassWater className="h-4 w-4 text-turquoise-700" />,
      poolDay: language === 'es' ? 'No (Se paga por consumo)' : 'No (Paid per drink)',
      poolDayIncluded: false,
      allInclusive: language === 'es' ? 'Sí (Hasta 12 cervezas/tragos nacionales)' : 'Yes (Up to 12 beers/cocktails)',
      allInclusiveIncluded: true,
    },
    {
      feature: language === 'es' ? 'Snacks de Piscina Ilimitados' : 'Unlimited Pool Snacks',
      icon: <Sparkles className="h-4 w-4 text-turquoise-700" />,
      poolDay: language === 'es' ? 'No (A la carta)' : 'No (A-la-carte)',
      poolDayIncluded: false,
      allInclusive: language === 'es' ? 'Sí (Alitas, patacones y piqueos)' : 'Yes (Wings, plantains & finger food)',
      allInclusiveIncluded: true,
    },
    {
      feature: language === 'es' ? 'Servicio de Toallas del Lodge' : 'Lodge Towel Service',
      icon: <Sun className="h-4 w-4 text-turquoise-700" />,
      poolDay: language === 'es' ? 'No (Traer toalla personal)' : 'No (Bring own towel)',
      poolDayIncluded: false,
      allInclusive: language === 'es' ? 'Sí (Toalla limpia incluida)' : 'Yes (Fresh towel provided)',
      allInclusiveIncluded: true,
    },
    {
      feature: language === 'es' ? 'Camastros & Área Lounge' : 'Sun Loungers & Daybed Lounge',
      icon: <Clock className="h-4 w-4 text-turquoise-700" />,
      poolDay: language === 'es' ? 'Sujeto a disponibilidad' : 'Subject to availability',
      poolDayIncluded: true,
      allInclusive: language === 'es' ? 'Acceso prioritario y reservado' : 'Priority reserved access',
      allInclusiveIncluded: true,
    },
    {
      feature: language === 'es' ? 'WiFi Starlink de Alta Velocidad' : 'High-Speed Starlink WiFi',
      icon: <Wifi className="h-4 w-4 text-turquoise-700" />,
      poolDay: language === 'es' ? 'Sí (Áreas sociales)' : 'Yes (Social areas)',
      poolDayIncluded: true,
      allInclusive: language === 'es' ? 'Sí (Todo el complejo)' : 'Yes (Full property)',
      allInclusiveIncluded: true,
    },
    {
      feature: language === 'es' ? 'Estacionamiento Privado Vigilado' : 'Secure Private Parking',
      icon: <Car className="h-4 w-4 text-turquoise-700" />,
      poolDay: language === 'es' ? 'Sí (Gratuito)' : 'Yes (Complimentary)',
      poolDayIncluded: true,
      allInclusive: language === 'es' ? 'Sí (Gratuito)' : 'Yes (Complimentary)',
      allInclusiveIncluded: true,
    }
  ];

  const poolAtmospherePhotos = [
    {
      src: '/images/hero-pool-drone-aerial.jpg',
      titleEs: 'Vista Aérea de las 3 Piscinas Tropicales',
      titleEn: 'Aerial View of 3 Tropical Pools',
      tagEs: 'Complejo Acuático',
      tagEn: 'Water Complex'
    },
    {
      src: '/images/hero-pool-deck.jpg',
      titleEs: 'Deck Lounge & Camastros Bajo Palmeras',
      titleEn: 'Deck Loungers Under Palm Canopy',
      tagEs: 'Relajación & Sol',
      tagEn: 'Sun & Relaxation'
    },
    {
      src: '/images/pool-day-cocktails.jpg',
      titleEs: 'Cócteles Tropicales & Barra Húmeda',
      titleEn: 'Signature Cocktails by the Pool',
      tagEs: 'Open Bar & Mixología',
      tagEn: 'Open Bar & Mixology'
    },
    {
      src: '/images/exp-daypass.jpg',
      titleEs: 'Pérgolas & Espacios de Sombras',
      titleEn: 'Pergola Lounges & Shaded Daybeds',
      tagEs: 'Daybed Lounge',
      tagEn: 'Daybed Lounge'
    },
    {
      src: '/images/pool-day-promo-hero-v3.jpg',
      titleEs: 'Aguas Cristalinas & Clima Cálido de Chame',
      titleEn: 'Crystal Clear Waters & Tropical Breeze',
      tagEs: 'Piscina Principal',
      tagEn: 'Main Pool'
    },
    {
      src: '/images/all-inclusive-pool-hero-v2.jpg',
      titleEs: 'Ambiente Exclusivo Todo Incluido',
      titleEn: 'VIP All-Inclusive Atmosphere',
      tagEs: 'Experiencia VIP',
      tagEn: 'VIP Experience'
    }
  ];

  const handleBook = (planCode: string) => {
    navigate('/reservar', { state: { category: 'Pasadía', planCode } });
  };

  return (
    <>
      <div className="band-full-bleed bg-mahana-light min-h-[90vh] pb-24 font-sans">
      <SEO 
        titleEs="Pasadías y Day Passes — Casa Mahana Lodge"
        titleEn="Day Passes & Pool Days — Casa Mahana Lodge"
        descriptionEs="Pasa el día en el paraíso de Chame. Elige entre nuestro Pool Day económico o el Pasadía Todo Incluido con almuerzo gourmet, snacks y open bar nacional."
        descriptionEn="Spend the day in paradise in Chame. Choose between our budget-friendly Pool Day or the All-Inclusive Day Pass with gourmet lunch, snacks, and local open bar."
        image="/images/all-inclusive-pool-hero-v2.jpg"
        path="/pasadias"
      />

      {/* Hero Header Section */}
      <section className="band-full-bleed pt-12 pb-14 lg:pt-16 lg:pb-20 bg-gradient-to-b from-sand-100/70 via-mahana-light to-transparent">
        <div className="container-fluid">
          <div className="text-center max-w-4xl mx-auto space-y-5">
            <h1 className="text-xs sm:text-sm uppercase tracking-widest text-turquoise-700 font-extrabold flex items-center justify-center space-x-2">
              <Sun className="h-4.5 w-4.5 animate-spin text-amber-500" style={{ animationDuration: '24s' }} />
              <span>{language === 'es' ? 'DÍAS DE SOL' : 'DAYS OF SUN'}</span>
            </h1>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-turquoise-950 tracking-tight leading-[1.12]">
              {language === 'es' ? 'Nuestras Opciones de Pasadía en Chame' : 'Our Day Pass Packages in Chame'}
            </h2>
            <div className="h-1.5 w-28 bg-turquoise-700 mx-auto rounded-full" />
            <p className="text-base sm:text-lg text-mahana-dark/75 max-w-2xl mx-auto leading-relaxed">
              {language === 'es'
                ? '¿Buscas una escapada rápida de la ciudad sin hospedarte? Disfruta de la mejor piscina tropical de Chame con nuestros pases de día diseñados para desconectar con total comodidad.'
                : 'Looking for a quick getaway from the city without staying overnight? Enjoy the premier tropical pool in Chame with day pass packages designed for seamless relaxation.'}
            </p>
          </div>
        </div>
      </section>

      {/* Horizontal Split Showcases Section */}
      <section className="band-full-bleed py-8">
        <div className="container-fluid space-y-12 lg:space-y-16">
          {dayPasses.map((pass, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div 
                key={pass.id}
                className="bg-white rounded-[32px] overflow-hidden border border-sand-200/90 shadow-glass hover:shadow-premium transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 items-stretch"
              >
                {/* 58% Large-Format Imagery Column */}
                <div className={`relative min-h-[380px] sm:min-h-[440px] lg:min-h-[520px] w-full overflow-hidden lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <img 
                    src={pass.img} 
                    alt={pass.title} 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" 
                    loading="lazy" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-turquoise-950/70 via-transparent to-black/20" />
                  
                  {/* Category & Accent Badges */}
                  <div className="absolute top-5 left-5 flex items-center space-x-2 z-10">
                    <span className="px-3.5 py-1.5 bg-turquoise-900/90 backdrop-blur-md text-sand-100 text-xs font-bold uppercase tracking-wider rounded-xl border border-turquoise-700/30 shadow-md">
                      {pass.badge}
                    </span>
                    <span className="px-3.5 py-1.5 bg-amber-500/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hidden sm:inline-block">
                      {pass.accentBadge}
                    </span>
                  </div>

                  {/* High-Impact Price Tag */}
                  <div className="absolute bottom-5 right-5 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-xl border border-sand-200 flex items-baseline space-x-1.5 z-10">
                    <span className="text-[11px] text-turquoise-950/60 font-extrabold uppercase shrink-0">
                      {language === 'es' ? 'desde' : 'from'}
                    </span>
                    <span className="text-3xl font-black text-turquoise-900 tracking-tight">{pass.price}</span>
                    <span className="text-xs text-turquoise-950/70 font-semibold">/{pass.priceUnit}</span>
                  </div>

                  {/* Highlights Bar on Bottom Left of Image */}
                  <div className="absolute bottom-5 left-5 hidden sm:flex flex-wrap gap-2 max-w-md z-10">
                    {pass.highlights.map((h, i) => (
                      <span key={i} className="px-2.5 py-1 bg-black/45 backdrop-blur-md text-white/90 text-xs rounded-lg font-medium border border-white/10">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 42% Editorial Package Breakdown Column */}
                <div className={`p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 lg:col-span-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <p className="text-xs font-extrabold uppercase tracking-widest text-turquoise-700">
                        {pass.subtitle}
                      </p>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-turquoise-950 tracking-tight leading-snug">
                        {pass.title}
                      </h2>
                    </div>

                    <p className="text-sm sm:text-base text-mahana-dark/75 leading-relaxed">
                      {pass.desc}
                    </p>

                    {/* Schedule Badge */}
                    <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-sand-100/70 rounded-xl text-xs text-turquoise-950 font-semibold border border-sand-200/80">
                      <Clock className="h-4 w-4 text-turquoise-700" />
                      <span>{language === 'es' ? 'Horario: 9:00 AM - 5:00 PM' : 'Schedule: 9:00 AM - 5:00 PM'}</span>
                    </div>

                    {/* Inclusions Checklist */}
                    <div className="space-y-3 pt-2">
                      <h3 className="text-xs uppercase font-extrabold text-turquoise-950 tracking-wider">
                        {language === 'es' ? '¿Qué incluye este plan?' : 'Package Inclusions:'}
                      </h3>
                      <ul className="space-y-2.5">
                        {pass.inclusions.map((inc, i) => (
                          <li key={i} className="flex items-start space-x-3 text-sm text-mahana-dark/85 leading-relaxed">
                            <span className="p-0.5 bg-turquoise-100 text-turquoise-700 rounded-md shrink-0 mt-0.5">
                              <Check className="h-3.5 w-3.5 stroke-[3]" />
                            </span>
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Dual Action CTAs */}
                  <div className="pt-4 border-t border-sand-200/80 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <button
                      onClick={() => navigate(pass.detailsLink)}
                      className="w-full py-3.5 px-4 border-2 border-turquoise-700 hover:bg-turquoise-50 text-turquoise-800 rounded-2xl font-bold transition-all text-sm flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <span>{language === 'es' ? 'Ver Detalles' : 'View Details'}</span>
                    </button>
                    <button
                      onClick={() => handleBook(pass.planCode)}
                      className="w-full py-3.5 px-4 bg-turquoise-700 hover:bg-turquoise-900 text-white rounded-2xl font-bold transition-all shadow-md text-sm flex items-center justify-center space-x-1.5 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                    >
                      <span>{language === 'es' ? 'Reservar' : 'Book Now'}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* Live Edge-to-Edge Inclusion Comparison Matrix Table */}
      <section className="band-full-bleed py-16 bg-gradient-to-b from-transparent via-sand-100/40 to-transparent">
        <div className="container-fluid space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-turquoise-100/70 border border-turquoise-200 text-turquoise-800 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-turquoise-700" />
              <span>{language === 'es' ? 'Comparativa de Planes' : 'Plan Comparison Matrix'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-turquoise-950 tracking-tight">
              {language === 'es' ? 'Compara lo que incluye cada pasadía' : 'Compare What Each Day Pass Includes'}
            </h2>
            <p className="text-sm sm:text-base text-mahana-dark/70">
              {language === 'es' 
                ? 'Elige la opción que mejor se ajuste a tu plan: acceso esencial para refrescarte o la comodidad de tener comidas y bebidas cubiertas.'
                : 'Choose the option that fits your day: essential pool access to cool off, or the carefree comfort of meals and drinks covered.'}
            </p>
          </div>

          {/* Matrix Card */}
          <div className="bg-white rounded-[32px] border border-sand-200 shadow-glass overflow-hidden">
            <div className="overflow-x-auto w-full scrollbar-thin">
              <table className="w-full border-collapse text-left text-sm text-mahana-dark min-w-[640px]">
                <thead>
                  <tr className="border-b border-sand-200 text-xs uppercase tracking-wider font-extrabold text-turquoise-900 bg-sand-50/70">
                    <th className="py-5 px-6 sm:px-8 w-2/5">
                      {language === 'es' ? 'Servicio / Inclusión' : 'Amenity / Inclusion'}
                    </th>
                    <th className="py-5 px-6 text-center w-3/10 bg-turquoise-50/30 border-l border-sand-200/60">
                      <div className="font-extrabold text-turquoise-950 text-base">Pool Day</div>
                      <div className="text-xs text-turquoise-800 font-semibold mt-0.5">
                        {language === 'es' ? 'Acceso Básico' : 'Basic Pass'}
                      </div>
                    </th>
                    <th className="py-5 px-6 text-center w-3/10 bg-amber-50/40 border-l border-sand-200/60">
                      <div className="font-extrabold text-turquoise-950 text-base">{language === 'es' ? 'Pasadía Todo Incluido' : 'All-Inclusive Day Pass'}</div>
                      <div className="text-xs text-amber-700 font-bold mt-0.5">
                        {language === 'es' ? 'Pensión Completa VIP' : 'Full Board VIP'}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-100 font-medium">
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-sand-50/40 transition-colors">
                      <td className="py-4 px-6 sm:px-8">
                        <div className="flex items-center space-x-3 text-turquoise-950 font-bold">
                          <span className="p-1.5 bg-turquoise-50 rounded-lg shrink-0">
                            {row.icon}
                          </span>
                          <span>{row.feature}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center bg-turquoise-50/10 border-l border-sand-200/40">
                        <div className="flex flex-col items-center justify-center space-y-1">
                          {row.poolDayIncluded ? (
                            <span className="p-1 bg-emerald-100 text-emerald-700 rounded-full">
                              <Check className="h-4 w-4 stroke-[3]" />
                            </span>
                          ) : (
                            <span className="p-1 bg-rose-100 text-rose-600 rounded-full">
                              <X className="h-4 w-4 stroke-[2.5]" />
                            </span>
                          )}
                          <span className="text-xs text-mahana-dark/75">{row.poolDay}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center bg-amber-50/20 border-l border-sand-200/40">
                        <div className="flex flex-col items-center justify-center space-y-1">
                          {row.allInclusiveIncluded ? (
                            <span className="p-1 bg-emerald-100 text-emerald-700 rounded-full">
                              <Check className="h-4 w-4 stroke-[3]" />
                            </span>
                          ) : (
                            <span className="p-1 bg-rose-100 text-rose-600 rounded-full">
                              <X className="h-4 w-4 stroke-[2.5]" />
                            </span>
                          )}
                          <span className="text-xs font-semibold text-turquoise-950">{row.allInclusive}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Direct Booking Action Strip underneath Table */}
            <div className="bg-sand-50/60 p-6 sm:p-8 border-t border-sand-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-mahana-dark/70 text-center sm:text-left">
                <span className="font-bold text-turquoise-950">
                  {language === 'es' ? '¿Listo para reservar tu pase de día?' : 'Ready to reserve your day pass?'}
                </span>
                <p className="mt-0.5">
                  {language === 'es' 
                    ? 'Garantiza tu cupo de aforo diario de forma inmediata en nuestro sistema.' 
                    : 'Secure your daily capacity spot immediately through our booking system.'}
                </p>
              </div>
              <div className="flex items-center space-x-3 shrink-0">
                <button
                  onClick={() => handleBook('pasadia_entrada')}
                  className="px-4 py-2.5 text-xs font-bold border border-turquoise-700 text-turquoise-800 rounded-xl hover:bg-turquoise-50 transition-colors cursor-pointer"
                >
                  {language === 'es' ? 'Reservar Pool Day' : 'Book Pool Day'}
                </button>
                <button
                  onClick={() => handleBook('pasadia_comidas')}
                  className="px-4 py-2.5 text-xs font-bold bg-turquoise-700 hover:bg-turquoise-900 text-white rounded-xl shadow-md transition-all hover:scale-[1.01] cursor-pointer"
                >
                  {language === 'es' ? 'Reservar Todo Incluido' : 'Book All-Inclusive'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authentic Poolside Atmosphere Gallery Band */}
      <section className="band-full-bleed py-16">
        <div className="container-fluid space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-turquoise-950 tracking-tight">
              {language === 'es' ? 'Ambiente Tropical de Piscina' : 'Authentic Poolside Atmosphere'}
            </h2>
            <p className="text-sm sm:text-base text-mahana-dark/70">
              {language === 'es'
                ? 'Conoce nuestras 3 piscinas rodeadas de jardines tropicales, decks de madera, camastros y barra refrescante.'
                : 'Explore our 3 tropical pools surrounded by lush gardens, timber decks, comfortable loungers, and refreshing bar.'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {poolAtmospherePhotos.map((photo, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveGalleryImage(photo.src)}
                className="group relative h-48 sm:h-64 rounded-2xl overflow-hidden border border-sand-200 shadow-glass cursor-pointer hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300 bg-white"
              >
                <img 
                  src={photo.src} 
                  alt={language === 'es' ? photo.titleEs : photo.titleEn}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-turquoise-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 pointer-events-none">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-300">
                    {language === 'es' ? photo.tagEs : photo.tagEn}
                  </span>
                  <p className="text-white text-xs font-bold leading-tight drop-shadow-sm mt-0.5">
                    {language === 'es' ? photo.titleEs : photo.titleEn}
                  </p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="p-2.5 bg-white/95 text-turquoise-950 rounded-full shadow-lg backdrop-blur-sm transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <ZoomIn className="h-4 w-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guidelines Section */}
      <section className="band-full-bleed py-8">
        <div className="container-fluid">
          <div className="bg-amber-50/70 p-6 sm:p-10 rounded-[32px] border border-sand-200/90 text-center max-w-3xl mx-auto space-y-4 shadow-glass">
            <ShieldAlert className="h-8 w-8 text-turquoise-700 mx-auto" />
            <h3 className="font-bold text-turquoise-950 text-xl font-serif">
              {language === 'es' ? 'Información Importante de Pasadías' : 'Important Day Pass Guidelines'}
            </h3>
            <p className="text-sm text-mahana-dark/80 leading-relaxed max-w-2xl mx-auto">
              {language === 'es'
                ? 'Se requiere reserva previa ya que contamos con aforo diario limitado para garantizar la tranquilidad de nuestros huéspedes y visitantes. No se permite el ingreso de alimentos ni bebidas externas al Lodge. Las mascotas son bienvenidas en las áreas al aire libre y senderos de piscina, manteniendo el uso de correa.'
                : 'Prior reservation is highly recommended since we operate with limited daily capacity to ensure a peaceful environment. External food or beverages are strictly prohibited. Pets are welcome in outdoor areas and pool pathways but must remain on leash.'}
            </p>
          </div>
        </div>
      </section>

      </div>

      {/* Lightbox Modal */}
      {activeGalleryImage && (
        <div 
          className="fixed inset-0 z-50 z-[70] flex items-center justify-center bg-turquoise-950/85 backdrop-blur-md p-4 animate-fade-in cursor-pointer"
          style={{ zIndex: 70 }}
          onClick={() => setActiveGalleryImage(null)}
        >
          <div 
            className="relative max-w-5xl max-h-[85vh] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/50 flex items-center justify-center cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 z-20 p-3 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors focus:outline-none cursor-pointer border border-white/20 backdrop-blur-md shadow-lg"
              onClick={() => setActiveGalleryImage(null)}
              aria-label="Close image"
            >
              <X className="h-6 w-6" />
            </button>
            <img 
              src={activeGalleryImage} 
              alt="Pool detail high-res view" 
              className="max-w-full max-h-[85vh] object-contain rounded-2xl"
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 text-white/80 text-xs font-semibold bg-turquoise-950/70 px-3 py-1.5 rounded-lg backdrop-blur-sm pointer-events-none">
              {language === 'es' ? 'Presiona fuera de la imagen o la X para cerrar' : 'Click outside or X to close'}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PasadiasHub;
