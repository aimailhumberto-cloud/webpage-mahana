import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Check, X, ShieldCheck, ArrowRight, Coffee, GlassWater, Sun, Waves, ShieldAlert } from 'lucide-react';

export const LodgingPackages: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const packages = [
    {
      title: 'Mahana Experience',
      badge: language === 'es' ? 'Hospedaje Estándar' : 'Standard Lodging',
      price: '$49.50',
      priceSuffix: language === 'es' ? '/ pers / noche' : '/ guest / night',
      desc: language === 'es'
        ? 'Estadía inolvidable con pensión completa (desayuno, almuerzo y cena), WiFi de alta velocidad y habitación acogedora. No incluye open bar.'
        : 'Unforgettable stay with full board (breakfast, lunch & dinner), high-speed WiFi, and cozy room. Open bar not included.',
      img: '/images/room-doble.jpg?v=2',
      icon: <Coffee className="h-5 w-5 text-white" />,
      accentBg: 'bg-turquoise-600 text-white shadow-turquoise-200',
      features: [
        { text: language === 'es' ? 'Desayuno, almuerzo y cena (Pensión Completa)' : 'Breakfast, lunch & dinner (Full Board)', included: true },
        { text: language === 'es' ? 'Acceso libre a la Piscina Tropical' : 'Free access to our Tropical Pool', included: true },
        { text: language === 'es' ? 'WiFi de alta velocidad y Estacionamiento' : 'High-speed WiFi & Free Parking', included: true },
        { text: language === 'es' ? 'Habitación acogedora incluida' : 'Cozy room included', included: true },
        { text: language === 'es' ? 'Barra libre (Open bar) no incluido' : 'Open bar / drinks not included', included: false }
      ],
      link: '/estadias/mahana-experience',
      cta: language === 'es' ? 'Ver Detalles Standard' : 'View Standard Details',
      accent: 'border-sand-200/80 hover:border-turquoise-500/30'
    },
    {
      title: language === 'es' ? 'Todo Incluido' : 'All-Inclusive',
      badge: language === 'es' ? 'Plan Open Bar Premium VIP' : 'VIP Premium Open Bar Plan',
      price: '$66',
      priceSuffix: language === 'es' ? '/ pers / noche' : '/ guest / night',
      desc: language === 'es'
        ? 'Olvídate de todo. Estadía completa con desayuno, almuerzo, cena, barra libre nacional y snacks.'
        : 'Forget about everything. Complete stay with breakfast, lunch, dinner, local open bar & pool snacks.',
      img: '/images/room-familiar.jpg?v=2',
      icon: <GlassWater className="h-5 w-5 text-white" />,
      accentBg: 'bg-amber-500 text-white shadow-amber-200',
      features: [
        { text: language === 'es' ? '3 Comidas completas a la carta' : '3 Full board a la carte meals', included: true },
        { text: language === 'es' ? 'Barra Libre (Open Bar) nacional' : 'Local open bar included', included: true },
        { text: language === 'es' ? 'Snacks junto a la piscina (11 AM - 5 PM)' : 'Pool snacks included (11 AM - 5 PM)', included: true },
        { text: language === 'es' ? 'Acceso completo a áreas sociales' : 'Full access to amenities & pools', included: true },
        { text: language === 'es' ? 'Habitación acogedora incluida' : 'Cozy room included', included: true }
      ],
      link: '/estadias/todo-incluido',
      cta: language === 'es' ? 'Ver Todo Incluido' : 'View All-Inclusive',
      featured: true,
      accent: 'border-amber-400 bg-amber-50/20 shadow-premium'
    },
    {
      title: 'Pool Day',
      badge: language === 'es' ? 'Acceso Instalaciones' : 'Facilities Access',
      price: '$5.50',
      priceSuffix: language === 'es' ? '/ persona' : '/ person',
      desc: language === 'es'
        ? 'Disfruta del sol y desconéctate. Acceso completo a piscinas, jardines y áreas sociales del Lodge.'
        : 'Enjoy the sun and relax. Full access to pools, social areas, and tropical gardens of the Lodge.',
      img: '/images/pool-day-cocktails.jpg',
      icon: <Sun className="h-5 w-5 text-white" />,
      accentBg: 'bg-cyan-500 text-white shadow-cyan-200',
      features: [
        { text: language === 'es' ? 'Acceso completo de 9:00 AM a 5:00 PM' : 'Full Access from 9:00 AM to 5:00 PM', included: true },
        { text: language === 'es' ? 'Uso de 3 piscinas tropicales' : 'Use of 3 tropical pools', included: true },
        { text: language === 'es' ? 'Acceso a camastros y hamacas' : 'Hammocks & lounge chairs access', included: true },
        { text: language === 'es' ? 'Boya de fondeo asignada incluida' : 'Assigned mooring buoy included', included: true },
        { text: language === 'es' ? 'Promociones exclusivas en restaurante' : 'Exclusive restaurant promotions', included: true }
      ],
      link: '/pasadias/pool-day',
      cta: language === 'es' ? 'Ver Detalles' : 'View Details',
      accent: 'border-sand-200/80 hover:border-cyan-500/30'
    },
    {
      title: language === 'es' ? 'Pasadía Todo Incluido' : 'All-Inclusive Day Pass',
      badge: language === 'es' ? 'Día de Sol VIP' : 'VIP Day Pass',
      price: '$35',
      priceSuffix: language === 'es' ? '/ persona' : '/ person',
      desc: language === 'es'
        ? 'Un día espectacular de piscina con un delicioso almuerzo a la carta, open bar nacional y snacks ilimitados.'
        : 'An amazing pool day with a delicious a-la-carte lunch, local open bar, and unlimited snacks.',
      img: '/images/pool-day-pineapple.png',
      icon: <Waves className="h-5 w-5 text-white" />,
      accentBg: 'bg-orange-500 text-white shadow-orange-200',
      features: [
        { text: language === 'es' ? 'Acceso completo de 9:00 AM a 5:00 PM' : 'Full Access from 9:00 AM to 5:00 PM', included: true },
        { text: language === 'es' ? 'Almuerzo gourmet a la carta' : 'A-la-carte gourmet lunch', included: true },
        { text: language === 'es' ? 'Bebidas y Open Bar nacional (hasta 12 tragos)' : 'National drinks & Open Bar (up to 12 drinks)', included: true },
        { text: language === 'es' ? 'Snacks de piscina ilimitados incluidos' : 'Unlimited pool snacks included', included: true },
        { text: language === 'es' ? 'Uso de camastros, hamacas y toallas' : 'Lounge chairs, hammocks & towels', included: true }
      ],
      link: '/pasadias/todo-incluido',
      cta: language === 'es' ? 'Ver Detalles' : 'View Details',
      accent: 'border-sand-200/80 hover:border-orange-500/30'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-mahana-light to-sand-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-turquoise-100/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-amber-50/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-sm uppercase tracking-widest text-turquoise-700 font-extrabold">
            {language === 'es' ? 'Modalidades & Tarifas' : 'Rates & Packages'}
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-turquoise-950 tracking-tight">
            {language === 'es' ? 'Elige tu forma de vivir Casa Mahana' : 'Choose how you want to experience Casa Mahana'}
          </p>
          <div className="h-1.5 w-24 bg-turquoise-700 mx-auto rounded-full" />
          <p className="text-base text-turquoise-900/60 max-w-xl mx-auto">
            {language === 'es'
              ? 'Desde un pase rápido de piscina para refrescarte hasta estadías premium todo incluido. Compara nuestros planes y reserva al instante.'
              : 'From a quick pool refresh pass to a premium all-inclusive stay. Compare our plans and book instantly.'}
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {packages.map((pkg, idx) => (
            <div key={idx} className="relative flex flex-col h-full pt-4">
              {pkg.featured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-[9px] uppercase tracking-widest font-black px-4 py-1 rounded-full shadow-md border border-amber-500/30 z-20">
                  {language === 'es' ? '🔥 El Más Elegido' : '🔥 Most Popular'}
                </div>
              )}

              <div
                className={`group bg-white rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-premium flex flex-col justify-between h-full flex-grow ${
                  pkg.featured 
                    ? 'border-[3px] border-amber-500 shadow-xl z-10 bg-amber-50/15' 
                    : 'border border-sand-200 shadow-glass hover:-translate-y-1'
                }`}
              >
                {/* Top Image Window Header */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={pkg.img}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-[4000ms] ease-out group-hover:scale-115"
                  />
                  {/* Visual fade-out overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/35" />

                  {/* Floating Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`backdrop-blur-md px-3 py-1 text-[9px] font-extrabold tracking-widest uppercase rounded-xl shadow-xs border ${
                      pkg.featured
                        ? 'bg-amber-600/90 text-white border-amber-500/25'
                        : 'bg-white/95 text-turquoise-950 border-white/20'
                    }`}>
                      {pkg.badge}
                    </span>
                  </div>

                  {/* Floating Corner Price */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl shadow-md border border-sand-200/50 flex items-baseline space-x-1 z-10">
                    <span className="text-[9px] text-mahana-dark/50 font-extrabold uppercase shrink-0">
                      {language === 'es' ? 'desde' : 'from'}
                    </span>
                    <span className="text-lg font-black text-turquoise-950">{pkg.price}</span>
                    <span className="text-[10px] text-mahana-dark/60 font-semibold">{pkg.priceSuffix}</span>
                  </div>
                </div>

                {/* Bottom Contents Container */}
                <div className="p-6 pt-8 flex-grow flex flex-col justify-between bg-white relative">
                  {/* Overlapping Circle Floating Icon */}
                  <div className={`absolute -top-7 right-6 inline-flex p-3 rounded-2xl ${pkg.accentBg} shadow-md group-hover:scale-110 transition-transform duration-300 z-10`}>
                    {pkg.icon}
                  </div>

                  {/* Package description info */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-turquoise-950 group-hover:text-turquoise-750 transition-colors duration-300 leading-snug">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-mahana-dark/65 leading-relaxed min-h-[48px]">
                      {pkg.desc}
                    </p>
                  </div>

                  {/* Features Checklist */}
                  <div className="border-t border-sand-100 my-5 pt-5 space-y-3.5 flex-grow">
                    {pkg.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start space-x-2.5 text-xs">
                        {feat.included ? (
                          <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                        )}
                        <span className={`font-semibold ${feat.included ? 'text-mahana-dark/85' : 'text-mahana-dark/45'}`}>
                          {feat.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons footer */}
                  <div className="space-y-2">
                    <Link
                      to={pkg.link}
                      className={`w-full py-3 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all text-xs border ${
                        pkg.featured
                          ? 'bg-amber-600 hover:bg-amber-700 text-white border-amber-600 shadow-md hover:scale-[1.01] active:scale-[0.99]'
                          : 'bg-white hover:bg-sand-50 text-turquoise-900 border-sand-300 shadow-sm'
                      }`}
                    >
                      <span>{pkg.cta}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>

                    <button
                      onClick={() => navigate('/reservar')}
                      className="w-full text-center text-[10px] font-extrabold text-turquoise-700 hover:text-turquoise-950 uppercase tracking-widest transition-colors py-1.5"
                    >
                      {language === 'es' ? '⚡ Reservar en Línea' : '⚡ Book Online'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Note banner */}
        <div className="mt-12 bg-white rounded-[32px] border border-sand-200/80 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-start space-x-4">
            <ShieldCheck className="h-8 w-8 text-turquoise-700 shrink-0 mt-1" />
            <div className="space-y-1 text-left">
              <h4 className="font-extrabold text-turquoise-950 text-sm">
                {language === 'es' ? '¿Tienes dudas sobre qué plan elegir?' : 'Not sure which plan to choose?'}
              </h4>
              <p className="text-xs text-mahana-dark/70 leading-relaxed max-w-2xl">
                {language === 'es'
                  ? 'El plan Todo Incluido es ideal para una desconexión total con barra libre de coctelería y comidas en nuestro restaurante, mientras que la Mahana Experience te da la libertad de explorar y comer por tu cuenta, con el desayuno siempre cubierto. Los Pasadías te permiten disfrutar de nuestras 3 piscinas tropicales durante el día.'
                  : 'The All-Inclusive plan is perfect for complete relaxation with open bar and chef-prepared meals covered, while the Mahana Experience gives you the freedom to explore and dine on your own, with breakfast always included. Day Passes allow you to enjoy our 3 tropical pools for the daytime.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/reservar')}
            className="px-6 py-3 bg-turquoise-700 hover:bg-turquoise-950 text-white rounded-xl font-bold text-xs transition-all shrink-0 shadow-sm whitespace-nowrap hover:scale-[1.02] active:scale-[0.98]"
          >
            {language === 'es' ? 'Cotizar Estadía Ahora' : 'Get A Custom Quote'}
          </button>
        </div>
      </div>
    </section>
  );
};
