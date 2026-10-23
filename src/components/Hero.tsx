import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useMedia } from '../context/MediaContext';
import { Calendar, Compass, MapPin } from 'lucide-react';
import { trackBookingIntent, trackEvent } from '../utils/analytics';

export const Hero: React.FC = () => {
  const { language, t } = useLanguage();
  const { media } = useMedia();
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);

  const slides = [
    {
      src: media.hero_1 || '/images/hero-pool-drone.jpg',
      labelEs: 'Piscina Principal',
      labelEn: 'Main Pool'
    },
    {
      src: media.hero_2 || '/images/hero-pool-deck.jpg',
      labelEs: 'Deck & Camastros',
      labelEn: 'Pool Deck'
    },
    {
      src: media.hero_3 || '/images/lodge-grounds.jpg',
      labelEs: 'Jardines Tropicales',
      labelEn: 'Tropical Grounds'
    }
  ];

  // Natural photo cross-fade every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleBookClick = () => {
    trackBookingIntent({ source: 'hero_primary_cta' });
    navigate('/reservar');
  };

  const handleDayPassClick = () => {
    trackEvent('hero_click_pasadias');
    navigate('/pasadias');
  };

  return (
    <section id="inicio" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Slideshow background — natural, bright photos */}
      <div className="absolute inset-0 overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-[1600ms] ease-in-out ${
              index === currentIdx ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
            style={{
              backgroundImage: `url('${slide.src}')`
            }}
          />
        ))}
      </div>

      {/* Clean, natural photographic vignette — NO dark purple/blue cast, letting sunlight and pool shine */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 w-full z-10">
        <div className="max-w-2xl text-left space-y-6">
          {/* Natural Location Tag */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-white text-xs uppercase tracking-widest font-semibold">
            <MapPin className="w-3.5 h-3.5 text-turquoise-400" />
            <span>Chame, Panamá</span>
          </div>

          {/* Clean Main Titles from Brand Translations */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] font-sans drop-shadow-lg">
              {t('hero.headline')}
            </h1>
            <p className="text-base sm:text-lg text-sand-50/90 leading-relaxed font-sans max-w-xl drop-shadow-md">
              {t('hero.subheadline')}
            </p>
          </div>

          {/* Clear, Professional CTAs */}
          <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
            <button
              onClick={handleBookClick}
              className="flex items-center justify-center space-x-2 px-8 py-4 bg-turquoise-700 hover:bg-turquoise-800 text-white rounded-2xl font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              <Calendar className="h-4.5 w-4.5" />
              <span>{t('hero.cta_book')}</span>
            </button>

            <button
              onClick={handleDayPassClick}
              className="flex items-center justify-center space-x-2 px-7 py-4 bg-white/15 hover:bg-white/25 text-white border border-white/40 hover:border-white rounded-2xl font-bold text-sm backdrop-blur-md transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <Compass className="h-4.5 w-4.5" />
              <span>{t('hero.cta_daypass')}</span>
            </button>
          </div>

          {/* Authentic Trust Badges */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-3 text-sand-100/80 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-amber-300">⭐ 4.2 en Google</span>
            <span className="text-white/40">•</span>
            <span className="flex items-center gap-1.5">🐾 Pet Friendly</span>
            <span className="text-white/40">•</span>
            <span className="flex items-center gap-1.5">🏊 3 Piscinas Tropicales</span>
          </div>
        </div>
      </div>

      {/* Clean photo indicator pills at bottom-right */}
      <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center space-x-2 bg-black/45 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5">
        {slides.map((slide, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIdx(idx)}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
              idx === currentIdx
                ? 'bg-white text-black shadow-sm'
                : 'text-white/70 hover:text-white'
            }`}
          >
            {language === 'es' ? slide.labelEs : slide.labelEn}
          </button>
        ))}
      </div>

      {/* Natural curve transition at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-mahana-light rounded-t-[28px] md:rounded-t-[40px]" />
    </section>
  );
};

export default Hero;
