import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useMedia } from '../context/MediaContext';
import { Waves, Palmtree, Sunset } from 'lucide-react';

export const Facilities: React.FC = () => {
  const { t, language } = useLanguage();
  const { media } = useMedia();

  const items = [
    {
      bgImage: media.fac_pool,
      icon: <Waves className="h-6 w-6" />,
      tag: language === 'es' ? 'Oasis Natural' : 'Natural Oasis',
      title: t('facilities.pool_title'),
      desc: t('facilities.pool_desc'),
      accentColor: 'text-turquoise-400'
    },
    {
      bgImage: media.fac_beach,
      icon: <Palmtree className="h-6 w-6" />,
      tag: language === 'es' ? 'Playa Caracol' : 'Caracol Beach',
      title: t('facilities.beach_title'),
      desc: t('facilities.beach_desc'),
      accentColor: 'text-amber-400'
    },
    {
      bgImage: media.fac_relax,
      icon: <Sunset className="h-6 w-6" />,
      tag: language === 'es' ? 'Zona Lounge' : 'Lounge & Rest',
      title: t('facilities.relax_title'),
      desc: t('facilities.relax_desc'),
      accentColor: 'text-teal-400'
    }
  ];

  return (
    <section id="instalaciones" className="py-24 bg-mahana-light relative overflow-hidden">
      {/* Decorative blurred spots */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-turquoise-100/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-sand-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-sm uppercase tracking-widest text-turquoise-700 font-extrabold">
            {t('facilities.title')}
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-turquoise-950 tracking-tight leading-tight">
            {t('facilities.subtitle')}
          </p>
          <div className="h-1.5 w-24 bg-turquoise-700 mx-auto rounded-full" />
        </div>

        {/* Facilities Immersive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="group relative h-[480px] rounded-3xl overflow-hidden shadow-premium hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-end cursor-pointer"
            >
              {/* Background Photo (with Ken Burns effect) */}
              <div className="absolute inset-0">
                <img
                  src={item.bgImage}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-[6000ms] ease-out group-hover:scale-110"
                />
                {/* Immersive overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-mahana-dark/95 via-mahana-dark/45 to-transparent transition-opacity duration-300 group-hover:via-mahana-dark/50" />
              </div>

              {/* Floating Glassmorphic Tag (Top Left) */}
              <div className="absolute top-6 left-6 z-10">
                <span className="backdrop-blur-md bg-white/10 border border-white/20 text-white rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase shadow-glass">
                  {item.tag}
                </span>
              </div>

              {/* Card Contents (Bottom Area) */}
              <div className="p-8 relative z-10 space-y-4">
                {/* Floating Circle Glassmorphic Icon Container */}
                <div className={`inline-flex p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 ${item.accentColor} group-hover:bg-turquoise-700 group-hover:text-white transition-all duration-300 group-hover:scale-110 shadow-glass`}>
                  {item.icon}
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white tracking-wide group-hover:text-turquoise-200 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-turquoise-50/80 leading-relaxed max-w-sm transition-colors duration-300 group-hover:text-white">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

