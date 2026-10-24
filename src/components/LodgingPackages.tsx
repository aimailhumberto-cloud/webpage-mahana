import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Check, X, ShieldCheck, ArrowRight, Coffee, GlassWater, Sun, Waves, Sparkles, Bed, CalendarCheck } from 'lucide-react';

export const LodgingPackages: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'estadias' | 'pasadias'>('all');

  const lodgingStays = [
    {
      title: language === 'es' ? 'Todo Incluido VIP' : 'VIP All-Inclusive',
      badge: language === 'es' ? 'Plan Premium Open Bar' : 'Premium Open Bar Plan',
      price: '$66',
      priceSuffix: language === 'es' ? '/ pers / noche' : '/ guest / night',
      desc: language === 'es'
        ? 'La máxima experiencia de relajación total. Hospedaje completo con desayuno buffet, almuerzo a la carta, cena gourmet, barra libre nacional ilimitada y snacks de piscina.'
        : 'The ultimate carefree resort getaway. Complete lodging with breakfast, a-la-carte lunch, gourmet dinner, unlimited national open bar, and poolside snacks.',
      img: '/images/all-inclusive-pool-hero-v2.jpg',
      icon: <GlassWater className="h-5 w-5 text-white" />,
      accentBg: 'bg-amber-500 text-white shadow-amber-200',
      features: [
        { text: language === 'es' ? 'Habitación boutique con A/C y baño privado' : 'Boutique room with A/C & private bath', included: true },
        { text: language === 'es' ? '3 Comidas completas a la carta al día' : '3 Full a-la-carte gourmet meals daily', included: true },
        { text: language === 'es' ? 'Barra Libre (Open Bar) nacional ilimitada' : 'Unlimited local open bar cocktails & beers', included: true },
        { text: language === 'es' ? 'Snacks junto a la piscina (11 AM - 5 PM)' : 'Poolside appetizers & snacks (11 AM - 5 PM)', included: true },
        { text: language === 'es' ? 'Acceso libre a 3 piscinas tropicales y camastros' : 'Free access to 3 tropical pools & daybeds', included: true },
        { text: language === 'es' ? 'WiFi Starlink de alta velocidad y estacionamiento' : 'High-speed Starlink WiFi & secure parking', included: true }
      ],
      link: '/estadias/todo-incluido',
      planCode: 'todo_incluido',
      category: 'Estadía',
      cta: language === 'es' ? 'Ver Todo Incluido' : 'View All-Inclusive',
      featured: true
    },
    {
      title: 'Mahana Experience',
      badge: language === 'es' ? 'Hospedaje Estándar' : 'Standard Lodging',
      price: '$49.50',
      priceSuffix: language === 'es' ? '/ pers / noche' : '/ guest / night',
      desc: language === 'es'
        ? 'Estadía perfecta con pensión completa incluida (desayuno, almuerzo y cena) para disfrutar la gastronomía del Lodge con libertad. Las bebidas alcohólicas se pagan al consumo.'
        : 'Unforgettable stay with full board included (breakfast, lunch & dinner) to savor resort dining freely. Alcoholic beverages paid per consumption.',
      img: '/images/room-doble.jpg?v=2',
      icon: <Coffee className="h-5 w-5 text-white" />,
      accentBg: 'bg-turquoise-600 text-white shadow-turquoise-200',
      features: [
        { text: language === 'es' ? 'Habitación boutique con A/C y baño privado' : 'Boutique room with A/C & private bath', included: true },
        { text: language === 'es' ? 'Desayuno, almuerzo y cena incluidos (Pensión Completa)' : 'Breakfast, lunch & dinner included (Full Board)', included: true },
        { text: language === 'es' ? 'Acceso libre a nuestras 3 piscinas tropicales' : 'Unlimited access to our 3 tropical pools', included: true },
        { text: language === 'es' ? 'WiFi Starlink de alta velocidad y estacionamiento' : 'High-speed Starlink WiFi & secure parking', included: true },
        { text: language === 'es' ? 'Barra libre (Open Bar) de bebidas alcohólicas' : 'Open bar / alcoholic drinks included', included: false }
      ],
      link: '/estadias/mahana-experience',
      planCode: 'mahana_exp',
      category: 'Estadía',
      cta: language === 'es' ? 'Ver Mahana Experience' : 'View Mahana Experience',
      featured: false
    },
    {
      title: 'Escape Mahana',
      badge: language === 'es' ? 'Promo Aniversario Parejas' : 'Couples Anniversary Promo',
      price: '$33',
      priceSuffix: language === 'es' ? '/ pareja / noche' : '/ couple / night',
      desc: language === 'es'
        ? 'Escapada íntima para dos personas de domingo a jueves por solo $33 la noche (fines de semana $49.50). Incluye habitación acogedora, piscinas y desayuno continental.'
        : 'Intimate getaway for two from Sunday to Thursday for just $33/night (weekends $49.50). Includes cozy room, 3 pools, and continental breakfast.',
      img: '/images/escape-mahana-hero.jpg',
      icon: <Coffee className="h-5 w-5 text-white" />,
      accentBg: 'bg-mahana-accent text-white shadow-orange-200',
      features: [
        { text: language === 'es' ? 'Hospedaje para 2 personas en habitación privada' : 'Private lodging for 2 guests', included: true },
        { text: language === 'es' ? 'Desayuno continental matutino incluido' : 'Morning continental breakfast included', included: true },
        { text: language === 'es' ? 'Acceso a nuestras 3 piscinas y jardines' : 'Access to our 3 swimming pools & gardens', included: true },
        { text: language === 'es' ? 'Tarifa promo válida de domingo a jueves' : 'Promo rate valid Sunday to Thursday', included: true },
        { text: language === 'es' ? 'Almuerzos, cenas y bebidas no incluidas' : 'Lunches, dinners & drinks not included', included: false }
      ],
      link: '/estadias/escape-mahana',
      planCode: 'escape_mahana',
      category: 'Estadía',
      cta: language === 'es' ? 'Ver Promo Escape' : 'View Escape Promo',
      limitedTime: true
    }
  ];

  const dayPasses = [
    {
      title: language === 'es' ? 'Pasadía Todo Incluido' : 'All-Inclusive Day Pass',
      badge: language === 'es' ? 'Día de Sol VIP' : 'VIP Day Pass',
      price: '$38.50',
      priceSuffix: language === 'es' ? '/ persona' : '/ person',
      desc: language === 'es'
        ? 'Un día inolvidable de desconexión total. Acceso de 9:00 AM a 5:00 PM con almuerzo gourmet a la carta, hasta 12 tragos de barra libre nacional, snacks ilimitados y camastros.'
        : 'An unforgettable day of pure relaxation. 9:00 AM to 5:00 PM access with gourmet a-la-carte lunch, up to 12 open bar cocktails/beers, unlimited snacks, and pool loungers.',
      img: '/images/all-inclusive-pool-hero-v2.jpg',
      icon: <Waves className="h-5 w-5 text-white" />,
      accentBg: 'bg-orange-500 text-white shadow-orange-200',
      features: [
        { text: language === 'es' ? 'Horario completo de 9:00 AM a 5:00 PM' : 'Full access from 9:00 AM to 5:00 PM', included: true },
        { text: language === 'es' ? 'Almuerzo gourmet completo a la carta' : 'Full a-la-carte gourmet lunch included', included: true },
        { text: language === 'es' ? 'Barra Libre (Open Bar) nacional (hasta 12 tragos)' : 'National Open Bar included (up to 12 drinks)', included: true },
        { text: language === 'es' ? 'Snacks de piscina ilimitados durante el día' : 'Unlimited poolside snacks throughout the day', included: true },
        { text: language === 'es' ? 'Uso de 3 piscinas tropicales, camastros y toallas' : '3 tropical pools, sun loungers & towel service', included: true },
        { text: language === 'es' ? 'Duchas exteriores, vestidores y estacionamiento privado' : 'Outdoor showers, changing rooms & parking', included: true }
      ],
      link: '/pasadias/todo-incluido',
      planCode: 'pasadia_comidas',
      category: 'Pasadía',
      cta: language === 'es' ? 'Ver Pasadía VIP' : 'View VIP Day Pass',
      featured: true
    },
    {
      title: 'Pool Day Pass',
      badge: language === 'es' ? 'Acceso Instalaciones' : 'Facilities Access',
      price: '$5.50',
      priceSuffix: language === 'es' ? '/ persona' : '/ person',
      desc: language === 'es'
        ? 'Refréscate y relájate bajo el sol. Acceso completo de 9:00 AM a 5:00 PM a nuestras 3 piscinas tropicales, áreas verdes, camastros y hamacas. Comidas y bebidas a la carta.'
        : 'Cool off and bask under the sun. Full 9:00 AM to 5:00 PM access to our 3 tropical pools, lush green grounds, hammocks, and sun loungers. Food and drinks a la carte.',
      img: '/images/pool-day-cocktails.jpg',
      icon: <Sun className="h-5 w-5 text-white" />,
      accentBg: 'bg-cyan-500 text-white shadow-cyan-200',
      features: [
        { text: language === 'es' ? 'Horario completo de 9:00 AM a 5:00 PM' : 'Full access from 9:00 AM to 5:00 PM', included: true },
        { text: language === 'es' ? 'Uso ilimitado de nuestras 3 piscinas tropicales' : 'Unlimited use of our 3 tropical pools', included: true },
        { text: language === 'es' ? 'Acceso a camastros, hamacas y jardines' : 'Access to sun loungers, hammocks & gardens', included: true },
        { text: language === 'es' ? 'Estacionamiento privado y duchas al aire libre' : 'Secure private parking & outdoor showers', included: true },
        { text: language === 'es' ? 'Almuerzo a la carta o barra libre incluida' : 'A-la-carte lunch or open bar included', included: false }
      ],
      link: '/pasadias/pool-day',
      planCode: 'pasadia_entrada',
      category: 'Pasadía',
      cta: language === 'es' ? 'Ver Pool Day' : 'View Pool Day',
      featured: false
    }
  ];

  const handleBookRedirect = (planCode: string, category: string) => {
    navigate(`/reservar?plan=${planCode}&category=${encodeURIComponent(category)}`, {
      state: { planCode, category }
    });
  };

  return (
    <section className="band-full-bleed py-20 lg:py-28 bg-gradient-to-b from-mahana-light via-sand-50 to-sand-100/60 relative">
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-turquoise-100/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[550px] h-[550px] bg-amber-100/25 rounded-full blur-3xl pointer-events-none" />

      <div className="container-fluid relative z-10 font-sans">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-sand-200/60 border border-sand-300/80 rounded-full text-turquoise-950 text-xs uppercase tracking-widest font-extrabold">
            <Sparkles className="w-3.5 h-3.5 text-turquoise-700" />
            <span>{language === 'es' ? 'Modalidades & Tarifas' : 'Rates & Packages'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-turquoise-950 tracking-tight leading-[1.12]">
            {language === 'es' ? 'Elige tu forma de vivir Casa Mahana' : 'Choose how you want to experience Casa Mahana'}
          </h2>

          <div className="h-1.5 w-24 bg-turquoise-700 mx-auto rounded-full" />

          <p className="text-base sm:text-lg text-mahana-dark/70 max-w-2xl mx-auto leading-relaxed">
            {language === 'es'
              ? 'Desde un pasadía refrescante junto a nuestras 3 piscinas tropicales hasta estadías boutique con todo incluido. Compara los planes y reserva con confirmación inmediata.'
              : 'From a sun-drenched day pass beside our 3 tropical pools to luxury all-inclusive boutique stays. Compare our plans and book with instant confirmation.'}
          </p>

          {/* Category Filter Pills for convenience */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                activeTab === 'all'
                  ? 'bg-turquoise-950 text-sand-50 shadow-md scale-105'
                  : 'bg-white/80 text-turquoise-900 border border-sand-200 hover:bg-sand-100'
              }`}
            >
              {language === 'es' ? 'Todos los Planes' : 'All Packages'}
            </button>
            <button
              onClick={() => setActiveTab('estadias')}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                activeTab === 'estadias'
                  ? 'bg-turquoise-950 text-sand-50 shadow-md scale-105'
                  : 'bg-white/80 text-turquoise-900 border border-sand-200 hover:bg-sand-100'
              }`}
            >
              {language === 'es' ? 'Hospedaje & Estadías' : 'Overnight Stays'}
            </button>
            <button
              onClick={() => setActiveTab('pasadias')}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                activeTab === 'pasadias'
                  ? 'bg-turquoise-950 text-sand-50 shadow-md scale-105'
                  : 'bg-white/80 text-turquoise-900 border border-sand-200 hover:bg-sand-100'
              }`}
            >
              {language === 'es' ? 'Pasadías de Sol' : 'Day Passes'}
            </button>
          </div>
        </div>

        {/* SECTION 1: HOSPEDAJE & ESTADÍAS (3 expansive cards) */}
        {(activeTab === 'all' || activeTab === 'estadias') && (
          <div className="mb-20">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-2.5 rounded-xl bg-turquoise-950 text-white shadow-sm">
                <Bed className="w-5 h-5 text-turquoise-400" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-turquoise-950">
                  {language === 'es' ? 'Hospedaje & Estadías Exclusivas' : 'Boutique Overnight Stays'}
                </h3>
                <p className="text-xs sm:text-sm text-mahana-dark/65">
                  {language === 'es'
                    ? 'Descanso tropical con desayuno continental, pensión completa o barra libre premium'
                    : 'Tropical retreat with continental breakfast, full board dining, or premium open bar'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {lodgingStays.map((pkg, idx) => (
                <div key={idx} className="relative flex flex-col h-full pt-4">
                  {pkg.featured && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-amber-500 text-turquoise-950 text-[10px] uppercase tracking-widest font-black px-4 py-1.5 rounded-full shadow-lg border border-amber-400 z-20">
                      {language === 'es' ? '👑 Más Popular VIP' : '👑 Most Popular VIP'}
                    </div>
                  )}
                  {pkg.limitedTime && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-rose-600 text-white text-[10px] uppercase tracking-widest font-black px-4 py-1.5 rounded-full shadow-lg border border-rose-500/30 z-20 animate-pulse">
                      {language === 'es' ? '⏳ Oferta Aniversario' : '⏳ Anniversary Deal'}
                    </div>
                  )}

                  <div
                    className={`bg-white rounded-[32px] overflow-hidden transition-all duration-500 hover:shadow-2xl flex flex-col justify-between h-full flex-grow group ${
                      pkg.featured
                        ? 'border-[3px] border-amber-500 shadow-xl bg-amber-50/10'
                        : 'border border-sand-200/90 shadow-premium hover:-translate-y-1.5'
                    }`}
                  >
                    {/* Large Image Header Window (280px-320px) */}
                    <div className="relative h-[280px] sm:h-[310px] w-full overflow-hidden">
                      <img
                        src={pkg.img}
                        alt={pkg.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-[4000ms] ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                      {/* Top Category Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className={`backdrop-blur-md px-3.5 py-1 text-[10px] font-extrabold tracking-widest uppercase rounded-full shadow-sm border ${
                          pkg.featured
                            ? 'bg-amber-500 text-turquoise-950 border-amber-400'
                            : 'bg-white/95 text-turquoise-950 border-white/20'
                        }`}>
                          {pkg.badge}
                        </span>
                      </div>

                      {/* Floating Prominent Price Badge inside image */}
                      <div className="absolute bottom-4 left-4 z-10 backdrop-blur-md bg-white/95 px-4 py-2 rounded-2xl shadow-lg border border-sand-200/60">
                        <span className="text-[10px] text-mahana-dark/60 font-extrabold uppercase block tracking-wider">
                          {language === 'es' ? 'tarifa' : 'rate'}
                        </span>
                        <div className="flex items-baseline space-x-1">
                          <span className="text-2xl font-black text-turquoise-950">{pkg.price}</span>
                          <span className="text-xs text-mahana-dark/70 font-semibold">{pkg.priceSuffix}</span>
                        </div>
                      </div>

                      {/* Floating Icon top-right */}
                      <div className={`absolute top-4 right-4 p-3 rounded-2xl ${pkg.accentBg} shadow-md z-10`}>
                        {pkg.icon}
                      </div>
                    </div>

                    {/* Bottom Content Area */}
                    <div className="p-6 sm:p-7 flex-grow flex flex-col justify-between bg-white space-y-6">
                      <div className="space-y-2">
                        <h4 className="text-2xl font-serif font-bold text-turquoise-950 group-hover:text-turquoise-750 transition-colors">
                          {pkg.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-mahana-dark/75 leading-relaxed min-h-[44px]">
                          {pkg.desc}
                        </p>
                      </div>

                      {/* Feature Checklist */}
                      <div className="border-t border-sand-100 pt-5 space-y-3 flex-grow">
                        {pkg.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start space-x-2.5 text-xs sm:text-sm">
                            {feat.included ? (
                              <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                            ) : (
                              <X className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                            )}
                            <span className={`leading-snug ${feat.included ? 'text-mahana-dark/90 font-medium' : 'text-mahana-dark/45'}`}>
                              {feat.text}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Dual Action Buttons */}
                      <div className="space-y-2.5 pt-2">
                        <button
                          onClick={() => handleBookRedirect(pkg.planCode, pkg.category)}
                          className={`w-full py-3.5 px-4 rounded-2xl font-extrabold flex items-center justify-center space-x-2 transition-all text-xs sm:text-sm shadow-md hover:shadow-lg ${
                            pkg.featured
                              ? 'bg-amber-500 hover:bg-amber-600 text-turquoise-950 scale-[1.01]'
                              : 'bg-turquoise-750 hover:bg-turquoise-800 text-white'
                          }`}
                        >
                          <CalendarCheck className="w-4 h-4" />
                          <span>{language === 'es' ? 'Reservar Esta Estadía' : 'Book This Stay'}</span>
                        </button>

                        <Link
                          to={pkg.link}
                          className="w-full py-2.5 rounded-2xl font-bold flex items-center justify-center space-x-2 text-xs text-turquoise-800 hover:text-turquoise-950 hover:bg-sand-50 transition-colors"
                        >
                          <span>{pkg.cta}</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: PASADÍAS DE SOL (2 expansive horizontal cards) */}
        {(activeTab === 'all' || activeTab === 'pasadias') && (
          <div className="mb-16">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-2.5 rounded-xl bg-orange-600 text-white shadow-sm">
                <Sun className="w-5 h-5 text-amber-200" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-turquoise-950">
                  {language === 'es' ? 'Pasadías & Días de Sol' : 'Sun Day Passes (No Overnight Stay)'}
                </h3>
                <p className="text-xs sm:text-sm text-mahana-dark/65">
                  {language === 'es'
                    ? 'Disfruta de nuestras 3 piscinas tropicales y el resort de 9:00 AM a 5:00 PM'
                    : 'Experience our 3 tropical pools and resort grounds from 9:00 AM to 5:00 PM'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
              {dayPasses.map((pkg, idx) => (
                <div
                  key={idx}
                  className={`bg-white rounded-[32px] overflow-hidden transition-all duration-500 hover:shadow-2xl flex flex-col justify-between group border border-sand-200/90 shadow-premium ${
                    pkg.featured ? 'border-orange-300 bg-orange-50/10' : ''
                  }`}
                >
                  {/* Large Format Photography Showcase Window */}
                  <div className="relative h-[320px] sm:h-[360px] w-full overflow-hidden">
                    <img
                      src={pkg.img}
                      alt={pkg.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[4000ms] ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                    {/* Top Floating Badge */}
                    <div className="absolute top-5 left-5 z-10">
                      <span className="backdrop-blur-md px-4 py-1.5 text-xs font-extrabold tracking-widest uppercase rounded-full shadow-md bg-white/95 text-turquoise-950 border border-white/20">
                        {pkg.badge}
                      </span>
                    </div>

                    {/* Prominent Price Badge inside image */}
                    <div className="absolute top-5 right-5 z-10 backdrop-blur-md bg-turquoise-950/95 text-sand-50 border border-turquoise-700/60 px-4 py-2.5 rounded-2xl shadow-xl text-right">
                      <span className="text-[10px] uppercase font-extrabold text-amber-300 block tracking-wider">
                        {language === 'es' ? 'Tarifa por persona' : 'Price per person'}
                      </span>
                      <div className="flex items-baseline space-x-1 justify-end">
                        <span className="text-2xl sm:text-3xl font-black text-white">{pkg.price}</span>
                        <span className="text-xs text-sand-200 font-semibold">{pkg.priceSuffix}</span>
                      </div>
                    </div>

                    {/* Overlaid Title */}
                    <div className="absolute bottom-5 left-5 right-5 z-10 text-white">
                      <h4 className="text-2xl sm:text-3xl font-serif font-bold text-sand-50 drop-shadow-md">
                        {pkg.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-sand-200 mt-1 line-clamp-2">
                        {pkg.desc}
                      </p>
                    </div>
                  </div>

                  {/* Feature Checklist & Actions */}
                  <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between bg-white space-y-6">
                    <div className="space-y-3">
                      <h5 className="text-xs font-extrabold uppercase tracking-widest text-turquoise-800">
                        {language === 'es' ? 'Lo que incluye este pasadía:' : 'What is included in this pass:'}
                      </h5>
                      <div className="space-y-3 pt-1">
                        {pkg.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start space-x-2.5 text-xs sm:text-sm">
                            {feat.included ? (
                              <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                            ) : (
                              <X className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                            )}
                            <span className={`leading-snug ${feat.included ? 'text-mahana-dark/90 font-medium' : 'text-mahana-dark/45'}`}>
                              {feat.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="pt-4 border-t border-sand-100 flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => handleBookRedirect(pkg.planCode, pkg.category)}
                        className="flex-1 py-3.5 px-6 rounded-2xl font-extrabold flex items-center justify-center space-x-2 bg-turquoise-750 hover:bg-turquoise-800 text-white text-xs sm:text-sm transition-all shadow-md hover:shadow-lg hover:scale-[1.01]"
                      >
                        <CalendarCheck className="w-4 h-4" />
                        <span>{language === 'es' ? 'Reservar Pasadía Ahora' : 'Book Day Pass Now'}</span>
                      </button>

                      <Link
                        to={pkg.link}
                        className="py-3.5 px-6 rounded-2xl font-bold flex items-center justify-center space-x-2 text-xs sm:text-sm bg-sand-100 hover:bg-sand-200/80 text-turquoise-950 transition-colors"
                      >
                        <span>{pkg.cta}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comparison Guidance Banner */}
        <div className="mt-12 bg-white rounded-[32px] border border-sand-200/80 p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-premium">
          <div className="flex items-start space-x-5">
            <div className="p-3 rounded-2xl bg-turquoise-50 text-turquoise-700 shrink-0 mt-1">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <div className="space-y-1.5 text-left">
              <h4 className="font-serif font-bold text-turquoise-950 text-lg sm:text-xl">
                {language === 'es' ? '¿Tienes dudas sobre qué modalidad elegir?' : 'Not sure which package is right for you?'}
              </h4>
              <p className="text-xs sm:text-sm text-mahana-dark/75 leading-relaxed max-w-3xl">
                {language === 'es'
                  ? 'El plan Todo Incluido es la mejor elección para desconexión total con 3 comidas a la carta y barra libre premium. La Mahana Experience te da libertad gastronómica con pensión completa. Para pasar solo el día, el Pasadía Todo Incluido te ofrece almuerzo gourmet y bebidas frente a las 3 piscinas.'
                  : 'The VIP All-Inclusive plan offers effortless indulgence with 3 a-la-carte meals and open bar. The Mahana Experience provides full-board lodging comfort. For a daytime trip, the All-Inclusive Day Pass includes gourmet dining and drinks by the 3 pools.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/reservar')}
            className="px-8 py-3.5 bg-turquoise-750 hover:bg-turquoise-800 text-white rounded-full font-extrabold text-xs sm:text-sm transition-all shrink-0 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
          >
            {language === 'es' ? 'Cotizar en el Motor PMS' : 'Quote in PMS Engine'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default LodgingPackages;

