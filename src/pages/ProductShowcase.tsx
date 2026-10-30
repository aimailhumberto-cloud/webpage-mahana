import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Check, Clock, Calendar, ArrowRight, Tag, Sparkles, Utensils, Waves, Compass, Bed, GlassWater, Sun } from 'lucide-react';
import { SEO } from '../components/SEO';

export const ProductShowcase: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<'all' | 'estadias' | 'pasadias' | 'dining'>('all');

  const lodgingPackages = [
    {
      key: 'mahana' as const,
      title: t('products.mahana.title'),
      desc: t('products.mahana.desc'),
      img: '/images/room-doble.jpg?v=2',
      price: '$49.50',
      priceUnit: t('common.nights'),
      category: 'Estadía',
      planCode: 'mahana_exp',
      badge: language === 'es' ? 'Más Popular' : 'Most Popular',
      accentSubtitle: language === 'es' ? 'Hospedaje & Pensión Completa' : 'Lodging & Full Board',
      inclusions: [
        t('products.mahana.inclusions.0'),
        t('products.mahana.inclusions.1'),
        t('products.mahana.inclusions.2'),
        t('products.mahana.inclusions.3')
      ],
      schedule: t('products.mahana.schedule'),
      cta: t('products.mahana.cta'),
      highlights: language === 'es'
        ? ['Desayuno completo', 'Piscina & Jardines', 'WiFi Starlink', 'Estacionamiento']
        : ['Full Breakfast', 'Pool & Gardens', 'Starlink WiFi', 'Private Parking']
    },
    {
      key: 'all_inclusive' as const,
      title: t('products.all_inclusive.title'),
      desc: t('products.all_inclusive.desc'),
      img: '/images/all-inclusive-pool-hero-v2.jpg',
      price: '$66',
      priceUnit: t('common.nights'),
      category: 'Estadía',
      planCode: 'todo_incluido',
      badge: 'VIP Premium',
      accentSubtitle: language === 'es' ? 'Pensión Completa + Open Bar Nacional' : 'Full Board + National Open Bar',
      inclusions: [
        t('products.all_inclusive.inclusions.0'),
        t('products.all_inclusive.inclusions.1'),
        t('products.all_inclusive.inclusions.2'),
        t('products.all_inclusive.inclusions.3')
      ],
      schedule: t('products.all_inclusive.schedule'),
      cta: t('products.all_inclusive.cta'),
      highlights: language === 'es'
        ? ['3 Comidas Gourmet', 'Open Bar 12 Tragos', 'Snacks de Piscina', 'Pensión Completa']
        : ['3 Gourmet Meals', '12-Drink Open Bar', 'Pool Snacks', 'Full Board Stay']
    },
    {
      key: 'escape_mahana' as const,
      title: language === 'es' ? 'Escape Mahana (Parejas)' : 'Escape Mahana (Couples)',
      desc: language === 'es'
        ? 'Escapada exprés romántica diseñada para parejas que buscan relajarse en el clima tropical de Chame sin complicaciones.'
        : 'Express romantic getaway designed for couples seeking to relax and reconnect under the tropical sun of Chame.',
      img: '/images/escape-mahana-hero.jpg',
      price: '$33',
      priceUnit: t('common.nights'),
      category: 'Estadía',
      planCode: 'escape_mahana',
      badge: language === 'es' ? 'Promo Escapada' : 'Promo Getaway',
      accentSubtitle: language === 'es' ? 'Plan Romántico para 2 Adultos' : 'Romantic Plan for 2 Adults',
      inclusions: language === 'es'
        ? [
            'Alojamiento confortable para 2 personas',
            '2 Cócteles tropicales de bienvenida',
            'Acceso ilimitado a las 3 piscinas tropicales',
            'WiFi Starlink de alta velocidad y estacionamiento'
          ]
        : [
            'Comfortable lodging for 2 guests',
            '2 Complimentary tropical welcome cocktails',
            'Unlimited access to 3 tropical pools',
            'High-speed Starlink WiFi & secure parking'
          ],
      schedule: language === 'es' ? 'Check-in flexible desde 3:00 PM' : 'Flexible Check-in from 3:00 PM',
      cta: language === 'es' ? 'Reservar Escape Mahana' : 'Book Escape Mahana',
      highlights: language === 'es'
        ? ['Especial Parejas', 'Cócteles de Bienvenida', 'Acceso a Piscinas', 'Tarifa Reducida']
        : ['Couples Special', 'Welcome Cocktails', 'Pool Access', 'Special Rate']
    }
  ];

  const dayPassPackages = [
    {
      key: 'pool_day' as const,
      title: t('products.pool_day.title'),
      desc: t('products.pool_day.desc'),
      img: '/images/pool-day-cocktails.jpg',
      price: '$38.50',
      priceUnit: language === 'es' ? 'adulto' : 'adult',
      category: 'Pasadía',
      planCode: 'pasadia_comidas',
      badge: 'VIP Day Pass',
      accentSubtitle: language === 'es' ? 'Almuerzo a la Carta + Open Bar' : 'A-la-Carte Lunch + Open Bar',
      inclusions: [
        t('products.pool_day.inclusions.0'),
        t('products.pool_day.inclusions.1'),
        t('products.pool_day.inclusions.2'),
        t('products.pool_day.inclusions.3')
      ],
      schedule: t('products.pool_day.schedule'),
      cta: t('products.pool_day.cta'),
      highlights: language === 'es'
        ? ['Almuerzo a la Carta', 'Open Bar 12 Tragos', 'Snacks Ilimitados', 'Toallas Incluidas']
        : ['A-la-carte Lunch', '12-Drink Open Bar', 'Unlimited Snacks', 'Towels Provided']
    },
    {
      key: 'pool_day_basic' as const,
      title: language === 'es' ? 'Pool Day Básico' : 'Basic Pool Day',
      desc: language === 'es'
        ? 'Disfruta de nuestras 3 piscinas tropicales, áreas comunes y jardines durante todo el día. Alimentos y bebidas a la carta.'
        : 'Full day access to our 3 crystal-clear pools, gardens, and lounge areas. Food and beverage paid per order.',
      img: '/images/hero-pool-drone-aerial.jpg',
      price: '$5.50',
      priceUnit: language === 'es' ? 'adulto' : 'adult',
      category: 'Pasadía',
      planCode: 'pasadia_entrada',
      badge: language === 'es' ? 'Pase Económico' : 'Budget Pass',
      accentSubtitle: language === 'es' ? 'Acceso a Piscinas & Bohíos' : 'Pools & Shaded Bohíos Access',
      inclusions: language === 'es'
        ? [
            'Acceso completo de 9:00 AM a 5:00 PM',
            'Uso libre de las 3 piscinas tropicales',
            'Acceso a camastros, hamacas y duchas externas',
            'WiFi Starlink en áreas sociales'
          ]
        : [
            'Full access from 9:00 AM to 5:00 PM',
            'Unlimited use of 3 tropical pools',
            'Access to loungers, hammocks & showers',
            'High-speed Starlink WiFi in common areas'
          ],
      schedule: language === 'es' ? 'Pase de un día: 9:00 AM a 5:00 PM' : 'Single day pass: 9:00 AM to 5:00 PM',
      cta: language === 'es' ? 'Reservar Pool Day' : 'Book Pool Day',
      highlights: language === 'es'
        ? ['3 Piscinas', 'Horario Completo 9-5', 'Hamacas & Bohíos', 'Duchas Externas']
        : ['3 Pools', 'Full 9-5 Access', 'Hammocks & Bohíos', 'Outdoor Showers']
    }
  ];

  const diningExperiences = [
    {
      title: language === 'es' ? 'Restaurante a la Leña Casa Mahana' : 'Casa Mahana Wood-Fired Restaurant',
      subtitle: language === 'es' ? 'Abierto al Público General Todos los Días' : 'Open to General Public Daily',
      desc: language === 'es'
        ? 'Prueba nuestras reconocidas pizzas artesanales horneadas a la leña, corvina fresca con patacones, ceviche caribeño y coctelería de autor sin necesidad de hospedarte.'
        : 'Savor our famous artisanal wood-fired pizzas, fresh whole catch with patacones, Caribbean ceviche, and signature tropical cocktails without an overnight stay.',
      img: '/images/food-pizza-oven.jpg',
      badge: language === 'es' ? 'Gastronomía Local' : 'Local Gastronomy',
      link: '/restaurante',
      actionLabel: language === 'es' ? 'Ver Restaurante & Menú' : 'Explore Restaurant & Menu',
      highlights: language === 'es'
        ? ['Horno de Leña', 'Pizzas desde $8.00', 'Mariscos Frescos', 'Cócteles Tropicales']
        : ['Wood-Fired Oven', 'Pizzas from $8.00', 'Fresh Catch', 'Tropical Cocktails']
    },
    {
      title: language === 'es' ? 'Mahana Tours & Aventura' : 'Mahana Tours & Adventure',
      subtitle: language === 'es' ? 'Manglares de Chame, Cascadas & Aventura' : 'Chame Mangroves, Waterfalls & Adventure',
      desc: language === 'es'
        ? 'Descubre los rincones naturales más impresionantes de Chame: paseos en bote por los manglares vírgenes, expediciones a cascadas escondidas y aventuras guiadas.'
        : 'Discover the most breathtaking natural spots in Chame: mangrove boat tours, hidden waterfalls, and guided outdoor eco-adventures.',
      img: '/images/tours-mangrove-boat.jpg',
      badge: language === 'es' ? 'Tours & Naturaleza' : 'Tours & Nature',
      link: '/mahana-tours',
      actionLabel: language === 'es' ? 'Ver Tours Disponibles' : 'View Available Tours',
      highlights: language === 'es'
        ? ['Paseos en Lancha', 'Cascadas de Chame', 'Guías Locales', 'Salidas Diarias']
        : ['Boat Tours', 'Chame Waterfalls', 'Local Guides', 'Daily Departures']
    }
  ];

  const handleBooking = (category: string, planCode: string) => {
    navigate(`/reservar?plan=${planCode}&category=${encodeURIComponent(category)}`, {
      state: { category, planCode }
    });
  };

  return (
    <div className="band-full-bleed bg-mahana-light min-h-[90vh] pb-24 animate-fade-in-up font-sans">
      <SEO 
        titleEs="Planes y Experiencias de Hospedaje — Casa Mahana"
        titleEn="Plans & Lodging Experiences — Casa Mahana"
        descriptionEs="Explora todos los planes de estadía y pasadías en Casa Mahana. Compara tarifas de hospedaje estándar, todo incluido, escape para parejas y pases de piscina en Chame."
        descriptionEn="Explore all lodging plans and day passes at Casa Mahana. Compare rates for standard stays, all-inclusive packages, couples escape, and pool day passes in Chame."
        image="/images/room-doble.jpg"
        path="/experiencias"
      />

      {/* Hero Header Section */}
      <section className="band-full-bleed pt-12 pb-14 lg:pt-16 lg:pb-20 bg-gradient-to-b from-sand-100/70 via-mahana-light to-transparent">
        <div className="container-fluid">
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <h1 className="text-xs sm:text-sm uppercase tracking-widest text-turquoise-700 font-extrabold flex items-center justify-center space-x-2">
              <Compass className="h-4 w-4 text-turquoise-700" />
              <span>{t('products.title')}</span>
            </h1>
            <p className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-turquoise-950 tracking-tight leading-[1.12]">
              {t('products.subtitle')}
            </p>
            <div className="h-1.5 w-28 bg-turquoise-700 mx-auto rounded-full" />
            <p className="text-base sm:text-lg text-mahana-dark/75 max-w-2xl mx-auto leading-relaxed pt-2">
              {language === 'es'
                ? 'Diseña tu visita ideal a Casa Mahana: hospedaje con pensión completa, pasadías con todo incluido o experiencias gastronómicas junto al mar.'
                : 'Design your perfect visit to Casa Mahana: full-board lodging, all-inclusive day passes, or oceanfront dining experiences.'}
            </p>

            {/* Filter Navigation Chips */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-2.5">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-turquoise-900 text-white shadow-md'
                    : 'bg-white text-turquoise-900 border border-sand-200 hover:bg-sand-50'
                }`}
              >
                {language === 'es' ? 'Todas las Experiencias' : 'All Experiences'}
              </button>
              <button
                onClick={() => setActiveCategory('estadias')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeCategory === 'estadias'
                    ? 'bg-turquoise-900 text-white shadow-md'
                    : 'bg-white text-turquoise-900 border border-sand-200 hover:bg-sand-50'
                }`}
              >
                {language === 'es' ? 'Hospedaje & Estadías' : 'Stays & Lodging'}
              </button>
              <button
                onClick={() => setActiveCategory('pasadias')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeCategory === 'pasadias'
                    ? 'bg-turquoise-900 text-white shadow-md'
                    : 'bg-white text-turquoise-900 border border-sand-200 hover:bg-sand-50'
                }`}
              >
                {language === 'es' ? 'Pasadías & Sol' : 'Day Passes & Sun'}
              </button>
              <button
                onClick={() => setActiveCategory('dining')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeCategory === 'dining'
                    ? 'bg-turquoise-900 text-white shadow-md'
                    : 'bg-white text-turquoise-900 border border-sand-200 hover:bg-sand-50'
                }`}
              >
                {language === 'es' ? 'Gastronomía & Experiencias' : 'Dining & Experiences'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: HOSPEDAJE & ESTADÍAS */}
      {(activeCategory === 'all' || activeCategory === 'estadias') && (
        <section className="band-full-bleed py-10">
          <div className="container-fluid space-y-8">
            <div className="flex items-center space-x-3 border-b border-sand-200/80 pb-4">
              <span className="p-2 bg-turquoise-100 text-turquoise-800 rounded-xl">
                <Bed className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-turquoise-950">
                  {language === 'es' ? 'Hospedaje & Estadías en el Lodge' : 'Lodging & Overnight Stays'}
                </h2>
                <p className="text-xs sm:text-sm text-mahana-dark/70">
                  {language === 'es' ? 'Habitaciones boutique rodeadas de naturaleza con desayuno y opciones todo incluido' : 'Boutique rooms surrounded by nature with breakfast and all-inclusive options'}
                </p>
              </div>
            </div>

            <div className="space-y-12">
              {lodgingPackages.map((pkg, idx) => {
                const isReversed = idx % 2 === 1;
                return (
                  <div
                    key={pkg.key}
                    className="bg-white rounded-[32px] overflow-hidden border border-sand-200/90 shadow-glass hover:shadow-premium transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 items-stretch"
                  >
                    {/* 58% Large Format Image */}
                    <div className={`relative min-h-[360px] sm:min-h-[420px] lg:min-h-[480px] w-full overflow-hidden lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                      <img
                        src={pkg.img}
                        alt={pkg.title}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-turquoise-950/70 via-transparent to-black/20" />

                      {/* Top Badge */}
                      <span className="absolute top-5 left-5 px-3.5 py-1.5 bg-turquoise-900/90 backdrop-blur-md text-sand-100 text-xs font-bold uppercase tracking-wider rounded-xl border border-turquoise-700/30 shadow-md">
                        {pkg.badge}
                      </span>

                      {/* Price Pill */}
                      <div className="absolute bottom-5 right-5 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-xl border border-sand-200 flex items-baseline space-x-1.5 z-10">
                        <Tag className="h-4 w-4 text-turquoise-700 mr-0.5 shrink-0" />
                        <span className="text-3xl font-black text-turquoise-900 tracking-tight">{pkg.price}</span>
                        <span className="text-xs text-turquoise-950/70 font-semibold">/{pkg.priceUnit}</span>
                      </div>

                      {/* Highlights */}
                      <div className="absolute bottom-5 left-5 hidden sm:flex flex-wrap gap-2 max-w-md z-10">
                        {pkg.highlights.map((h, i) => (
                          <span key={i} className="px-2.5 py-1 bg-black/45 backdrop-blur-md text-white/90 text-xs rounded-lg font-medium border border-white/10">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 42% Editorial Content */}
                    <div className={`p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 lg:col-span-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <p className="text-xs font-extrabold uppercase tracking-widest text-turquoise-700">
                            {pkg.accentSubtitle}
                          </p>
                          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-turquoise-950 tracking-tight leading-snug">
                            {pkg.title}
                          </h2>
                        </div>

                        <p className="text-sm text-mahana-dark/75 leading-relaxed">
                          {pkg.desc}
                        </p>

                        {/* Schedule */}
                        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-sand-100/70 rounded-xl text-xs text-turquoise-950 font-semibold border border-sand-200/80">
                          <Clock className="h-4 w-4 text-turquoise-700 shrink-0" />
                          <span>{pkg.schedule}</span>
                        </div>

                        {/* Inclusions */}
                        <div className="space-y-2.5 pt-1">
                          <h3 className="text-xs uppercase font-extrabold text-turquoise-950 tracking-wider">
                            {language === 'es' ? 'Inclusiones destacadas:' : 'Package inclusions:'}
                          </h3>
                          <ul className="space-y-2">
                            {pkg.inclusions.map((inc, i) => (
                              <li key={i} className="flex items-start space-x-2.5 text-sm text-mahana-dark/85">
                                <span className="p-0.5 bg-turquoise-100 text-turquoise-700 rounded-md shrink-0 mt-0.5">
                                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                                </span>
                                <span>{inc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Action CTA */}
                      <div className="pt-4 border-t border-sand-200/80">
                        <button
                          onClick={() => handleBooking(pkg.category, pkg.planCode)}
                          className="w-full py-3.5 px-6 bg-turquoise-700 hover:bg-turquoise-900 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all shadow-md group hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                        >
                          <span>{pkg.cta}</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: PASADÍAS & SOL */}
      {(activeCategory === 'all' || activeCategory === 'pasadias') && (
        <section className="band-full-bleed py-10">
          <div className="container-fluid space-y-8">
            <div className="flex items-center space-x-3 border-b border-sand-200/80 pb-4">
              <span className="p-2 bg-amber-100 text-amber-800 rounded-xl">
                <Sun className="h-5 w-5 text-amber-600" />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-turquoise-950">
                  {language === 'es' ? 'Pasadías & Días de Sol' : 'Day Passes & Sun Retreats'}
                </h2>
                <p className="text-xs sm:text-sm text-mahana-dark/70">
                  {language === 'es' ? 'Escapadas de 9 AM a 5 PM para refrescarte en nuestras piscinas con opciones gourmet' : '9 AM to 5 PM day retreats to unwind in our 3 pools with gourmet options'}
                </p>
              </div>
            </div>

            <div className="space-y-12">
              {dayPassPackages.map((pkg, idx) => {
                const isReversed = idx % 2 === 1;
                return (
                  <div
                    key={pkg.key}
                    className="bg-white rounded-[32px] overflow-hidden border border-sand-200/90 shadow-glass hover:shadow-premium transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 items-stretch"
                  >
                    {/* 58% Large Format Image */}
                    <div className={`relative min-h-[360px] sm:min-h-[420px] lg:min-h-[480px] w-full overflow-hidden lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                      <img
                        src={pkg.img}
                        alt={pkg.title}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-turquoise-950/70 via-transparent to-black/20" />

                      {/* Top Badge */}
                      <span className="absolute top-5 left-5 px-3.5 py-1.5 bg-turquoise-900/90 backdrop-blur-md text-sand-100 text-xs font-bold uppercase tracking-wider rounded-xl border border-turquoise-700/30 shadow-md">
                        {pkg.badge}
                      </span>

                      {/* Price Pill */}
                      <div className="absolute bottom-5 right-5 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-xl border border-sand-200 flex items-baseline space-x-1.5 z-10">
                        <Tag className="h-4 w-4 text-turquoise-700 mr-0.5 shrink-0" />
                        <span className="text-3xl font-black text-turquoise-900 tracking-tight">{pkg.price}</span>
                        <span className="text-xs text-turquoise-950/70 font-semibold">/{pkg.priceUnit}</span>
                      </div>

                      {/* Highlights */}
                      <div className="absolute bottom-5 left-5 hidden sm:flex flex-wrap gap-2 max-w-md z-10">
                        {pkg.highlights.map((h, i) => (
                          <span key={i} className="px-2.5 py-1 bg-black/45 backdrop-blur-md text-white/90 text-xs rounded-lg font-medium border border-white/10">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 42% Editorial Content */}
                    <div className={`p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 lg:col-span-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <p className="text-xs font-extrabold uppercase tracking-widest text-turquoise-700">
                            {pkg.accentSubtitle}
                          </p>
                          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-turquoise-950 tracking-tight leading-snug">
                            {pkg.title}
                          </h2>
                        </div>

                        <p className="text-sm text-mahana-dark/75 leading-relaxed">
                          {pkg.desc}
                        </p>

                        {/* Schedule */}
                        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-sand-100/70 rounded-xl text-xs text-turquoise-950 font-semibold border border-sand-200/80">
                          <Clock className="h-4 w-4 text-turquoise-700 shrink-0" />
                          <span>{pkg.schedule}</span>
                        </div>

                        {/* Inclusions */}
                        <div className="space-y-2.5 pt-1">
                          <h3 className="text-xs uppercase font-extrabold text-turquoise-950 tracking-wider">
                            {language === 'es' ? 'Inclusiones del pase:' : 'Pass inclusions:'}
                          </h3>
                          <ul className="space-y-2">
                            {pkg.inclusions.map((inc, i) => (
                              <li key={i} className="flex items-start space-x-2.5 text-sm text-mahana-dark/85">
                                <span className="p-0.5 bg-turquoise-100 text-turquoise-700 rounded-md shrink-0 mt-0.5">
                                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                                </span>
                                <span>{inc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Action CTA */}
                      <div className="pt-4 border-t border-sand-200/80">
                        <button
                          onClick={() => handleBooking(pkg.category, pkg.planCode)}
                          className="w-full py-3.5 px-6 bg-turquoise-700 hover:bg-turquoise-900 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all shadow-md group hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                        >
                          <span>{pkg.cta}</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: GASTRONOMÍA & BEACH CLUB */}
      {(activeCategory === 'all' || activeCategory === 'dining') && (
        <section className="band-full-bleed py-10">
          <div className="container-fluid space-y-8">
            <div className="flex items-center space-x-3 border-b border-sand-200/80 pb-4">
              <span className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                <Utensils className="h-5 w-5 text-emerald-700" />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-turquoise-950">
                  {language === 'es' ? 'Gastronomía & Experiencias' : 'Dining & Local Experiences'}
                </h2>
                <p className="text-xs sm:text-sm text-mahana-dark/70">
                  {language === 'es' ? 'Sabores artesanales al horno de leña, mariscos frescos y aventuras guiadas por Chame' : 'Artisanal wood-fired cuisine, fresh seafood, and guided outdoor adventures in Chame'}
                </p>
              </div>
            </div>

            <div className="space-y-12">
              {diningExperiences.map((exp, idx) => {
                const isReversed = idx % 2 === 1;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-[32px] overflow-hidden border border-sand-200/90 shadow-glass hover:shadow-premium transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 items-stretch"
                  >
                    {/* 58% Large Format Image */}
                    <div className={`relative min-h-[360px] sm:min-h-[420px] lg:min-h-[480px] w-full overflow-hidden lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                      <img
                        src={exp.img}
                        alt={exp.title}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-turquoise-950/70 via-transparent to-black/20" />

                      {/* Top Badge */}
                      <span className="absolute top-5 left-5 px-3.5 py-1.5 bg-turquoise-900/90 backdrop-blur-md text-sand-100 text-xs font-bold uppercase tracking-wider rounded-xl border border-turquoise-700/30 shadow-md">
                        {exp.badge}
                      </span>

                      {/* Highlights */}
                      <div className="absolute bottom-5 left-5 hidden sm:flex flex-wrap gap-2 max-w-md z-10">
                        {exp.highlights.map((h, i) => (
                          <span key={i} className="px-2.5 py-1 bg-black/45 backdrop-blur-md text-white/90 text-xs rounded-lg font-medium border border-white/10">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 42% Editorial Content */}
                    <div className={`p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 lg:col-span-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <p className="text-xs font-extrabold uppercase tracking-widest text-turquoise-700">
                            {exp.subtitle}
                          </p>
                          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-turquoise-950 tracking-tight leading-snug">
                            {exp.title}
                          </h2>
                        </div>

                        <p className="text-sm text-mahana-dark/75 leading-relaxed">
                          {exp.desc}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {exp.highlights.map((h, i) => (
                            <div key={i} className="flex items-center space-x-1.5 px-3 py-1.5 bg-sand-50 rounded-xl border border-sand-200/60 text-xs font-semibold text-turquoise-950">
                              <Check className="h-3.5 w-3.5 text-turquoise-700" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="pt-4 border-t border-sand-200/80">
                        <button
                          onClick={() => navigate(exp.link)}
                          className="w-full py-3.5 px-6 bg-turquoise-700 hover:bg-turquoise-900 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all shadow-md group hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                        >
                          <span>{exp.actionLabel}</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Extra helper capsule */}
      <section className="band-full-bleed py-12">
        <div className="container-fluid">
          <div className="bg-sand-100/70 p-8 sm:p-10 rounded-[32px] border border-sand-200/80 text-center max-w-3xl mx-auto space-y-3 shadow-glass">
            <Calendar className="h-8 w-8 text-turquoise-700 mx-auto" />
            <h3 className="font-bold text-turquoise-950 text-xl font-serif">
              {t('common.confirm') === 'Confirmar' ? '¿Planeas un evento grupal o cotización especial?' : 'Planning a group event or custom buyout?'}
            </h3>
            <p className="text-sm text-mahana-dark/70 max-w-lg mx-auto">
              {t('common.confirm') === 'Confirmar'
                ? 'Ofrecemos tarifas corporativas, cumpleaños, bodas y reservas de múltiples habitaciones con distribución de huéspedes optimizada.'
                : 'We offer corporate rates, birthdays, weddings, and multi-room bookings with optimized guest distributions.'}
            </p>
            <div className="pt-2">
              <button 
                onClick={() => navigate('/reservar')}
                className="text-sm font-bold text-turquoise-800 hover:text-turquoise-950 inline-flex items-center space-x-1.5 cursor-pointer"
              >
                <span>{t('common.confirm') === 'Confirmar' ? 'Ir al cotizador en línea' : 'Go to Booking Wizard'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ProductShowcase;
