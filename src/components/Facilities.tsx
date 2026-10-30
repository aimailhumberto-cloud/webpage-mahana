import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useMedia } from '../context/MediaContext';
import { Waves, Utensils, Sunset, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export const Facilities: React.FC = () => {
  const { t, language } = useLanguage();
  const { media } = useMedia();

  const items = [
    {
      bgImage: media.fac_pool || '/images/hero-pool-drone-aerial.jpg',
      icon: <Waves className="h-6 w-6 text-turquoise-300" />,
      tag: language === 'es' ? 'Oasis de Aguas' : 'Water Sanctuary',
      title: t('facilities.pool_title'),
      subtitle: language === 'es' ? '3 Piscinas Tropicales & Solarium' : '3 Tropical Pools & Sun Deck',
      desc: t('facilities.pool_desc'),
      amenities: language === 'es'
        ? ['3 Piscinas', 'Camastros Acolchados', 'Servicio de Bar', 'Duchas al Aire Libre']
        : ['3 Pools', 'Plush Sunbeds', 'Pool Bar Service', 'Outdoor Showers'],
      link: '/pasadias',
      cta: language === 'es' ? 'Ver Piscinas & Pasadías' : 'View Pools & Passes'
    },
    {
      bgImage: media.fac_beach || '/images/food-pizza-oven.jpg',
      icon: <Utensils className="h-6 w-6 text-amber-300" />,
      tag: language === 'es' ? 'Gastronomía de Autor' : 'Signature Dining',
      title: t('facilities.beach_title'),
      subtitle: language === 'es' ? 'Horno de Leña & Bar Tropical' : 'Wood-Fired & Tropical Bar',
      desc: t('facilities.beach_desc'),
      amenities: language === 'es'
        ? ['Pizzas a la Leña', 'Mariscos Frescos', 'Coctelería de Autor', 'Abierto al Público']
        : ['Wood-Fired Pizzas', 'Fresh Seafood', 'Signature Cocktails', 'Open to Public'],
      link: '/restaurante',
      cta: language === 'es' ? 'Conocer Restaurante' : 'Discover Restaurant'
    },
    {
      bgImage: media.fac_relax || '/images/lodge-grounds.jpg',
      icon: <Sunset className="h-6 w-6 text-emerald-300" />,
      tag: language === 'es' ? 'Oasis Natural' : 'Natural Oasis',
      title: t('facilities.relax_title'),
      subtitle: language === 'es' ? 'Paz verde y 100% Pet Friendly' : 'Green sanctuary, 100% Pet Friendly',
      desc: t('facilities.relax_desc'),
      amenities: language === 'es'
        ? ['100% Pet Friendly', 'Hamacas de Jardín', 'WiFi Starlink', 'Estacionamiento Seguro']
        : ['100% Pet Friendly', 'Garden Hammocks', 'Starlink WiFi', 'Secure Parking'],
      link: '/estadias',
      cta: language === 'es' ? 'Ver Entorno & Hospedaje' : 'View Grounds & Stays'
    }
  ];

  return (
    <section id="instalaciones" className="band-full-bleed py-20 lg:py-28 bg-mahana-light relative overflow-hidden">
      {/* Decorative ambient spots */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-turquoise-100/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-sand-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="container-fluid relative z-10 font-sans">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-turquoise-50 border border-turquoise-200/60 rounded-full text-turquoise-800 text-xs uppercase tracking-widest font-extrabold">
            <Sparkles className="w-3.5 h-3.5 text-turquoise-600" />
            <span>{language === 'es' ? 'Instalaciones del Resort' : 'Resort Facilities'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-turquoise-950 tracking-tight leading-[1.12]">
            {t('facilities.title')}
          </h2>

          <div className="h-1.5 w-24 bg-turquoise-700 mx-auto rounded-full" />

          <p className="text-lg sm:text-xl font-medium text-turquoise-800">
            {t('facilities.subtitle')}
          </p>

          <p className="text-base sm:text-lg text-mahana-dark/75 max-w-2xl mx-auto leading-relaxed">
            {language === 'es'
              ? 'Espacios diseñados para la desconexión. Cada rincón de Casa Mahana está pensado para conectarte con la calma, el sol y la naturaleza: 3 piscinas tropicales, restaurante gourmet al horno de leña y amplios jardines para pasear.'
              : 'Spaces crafted for deep relaxation. Every corner of Casa Mahana is tailored for tranquility, sunshine, and nature: 3 tropical swimming pools, a wood-fired gourmet restaurant, and spacious grounds for leisurely strolls.'}
          </p>
        </div>

        {/* Facilities Immersive Visual Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="group relative h-[520px] sm:h-[560px] rounded-[32px] overflow-hidden shadow-premium hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-end"
            >
              {/* Full-bleed background photo */}
              <div className="absolute inset-0">
                <img
                  src={item.bgImage}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[6000ms] ease-out group-hover:scale-110"
                />
                {/* Vignette gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-mahana-dark/95 via-mahana-dark/50 to-black/20 transition-opacity duration-300 group-hover:via-mahana-dark/55" />
              </div>

              {/* Floating Top Tag & Icon */}
              <div className="absolute top-6 left-6 right-6 z-10 flex items-center justify-between">
                <span className="backdrop-blur-md bg-white/15 border border-white/25 text-sand-50 rounded-full px-4 py-1.5 text-xs font-extrabold tracking-widest uppercase shadow-glass">
                  {item.tag}
                </span>

                <div className="p-2.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 shadow-glass">
                  {item.icon}
                </div>
              </div>

              {/* Bottom Editorial Content */}
              <div className="p-7 sm:p-8 relative z-10 space-y-4 text-white">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-sand-300">
                    {item.subtitle}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-sand-50 leading-snug group-hover:text-turquoise-200 transition-colors">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-sand-100/85 leading-relaxed">
                  {item.desc}
                </p>

                {/* Amenity chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.amenities.map((amenity, aIdx) => (
                    <span
                      key={aIdx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/15 text-sand-100 rounded-full text-[11px] font-medium"
                    >
                      <CheckCircle2 className="w-3 h-3 text-turquoise-400 shrink-0" />
                      <span>{amenity}</span>
                    </span>
                  ))}
                </div>

                {/* Direct Action Link */}
                <div className="pt-3 border-t border-white/15">
                  <Link
                    to={item.link}
                    className="inline-flex items-center space-x-2 text-xs font-bold text-sand-200 hover:text-white transition-colors uppercase tracking-widest group-hover:translate-x-1 duration-300"
                  >
                    <span>{item.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;


