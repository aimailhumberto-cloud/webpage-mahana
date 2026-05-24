import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useMedia } from '../context/MediaContext';
import { Calendar, Compass } from 'lucide-react';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const { media } = useMedia();
  const [currentIdx, setCurrentIdx] = useState(0);

  const heroImages = [
    media.hero_1,
    media.hero_2,
    media.hero_3
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const handleBookClick = () => {
    window.location.href = 'https://casa-mahana-pms.onrender.com/reservar';
  };

  return (
    <section id="inicio" className="relative bg-mahana-dark min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Slideshow background with smooth transition */}
      <div className="absolute inset-0 overflow-hidden">
        {heroImages.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] ease-in-out ${
              index === currentIdx ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
            style={{
              backgroundImage: `url('${src}')`,
            }}
          />
        ))}
      </div>
      {/* Cinematic gradient overlay — dark bottom-left for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-mahana-dark/95 via-mahana-dark/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-mahana-dark/80 via-transparent to-mahana-dark/40" />

      {/* Warm glow accents */}
      <div className="absolute top-1/4 left-[10%] w-96 h-96 bg-turquoise-700/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-sand-300/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 w-full z-10">
        <div className="max-w-2xl text-left space-y-8">
          {/* Location tag */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-turquoise-900/40 backdrop-blur-sm border border-turquoise-700/30 rounded-full text-turquoise-300 text-xs uppercase tracking-widest font-semibold">
            <span className="w-1.5 h-1.5 bg-turquoise-400 rounded-full animate-ping" />
            <span>Chame, Panamá</span>
          </div>

          {/* Main Titles */}
          <div className="space-y-5">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-sans drop-shadow-lg">
              {t('hero.headline')}
            </h1>
            <p className="text-lg sm:text-xl text-sand-100/85 leading-relaxed font-sans max-w-xl drop-shadow-md">
              {t('hero.subheadline')}
            </p>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={handleBookClick}
              className="flex items-center justify-center space-x-2 px-8 py-4 bg-turquoise-700 hover:bg-turquoise-900 text-white rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.97]"
            >
              <Calendar className="h-5 w-5" />
              <span>{t('hero.cta_book')}</span>
            </button>
            
            <button
              onClick={handleBookClick}
              className="flex items-center justify-center space-x-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/40 hover:border-white rounded-2xl font-bold backdrop-blur-md transition-all shadow-md hover:scale-[1.03] active:scale-[0.97]"
            >
              <Compass className="h-5 w-5" />
              <span>{t('hero.cta_daypass')}</span>
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-sand-200/60 text-[11px] sm:text-xs font-semibold">
            <span className="flex items-center gap-1.5">⭐ 4.1 Google</span>
            <span className="text-sand-200/40">•</span>
            <span className="flex items-center gap-1.5">🐾 Pet Friendly</span>
            <span className="text-sand-200/40">•</span>
            <span className="flex items-center gap-1.5">🏊 3 Piscinas</span>
          </div>
        </div>
      </div>

      {/* Elegant curve at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-mahana-light rounded-t-[32px] md:rounded-t-[48px]" />
    </section>
  );
};
