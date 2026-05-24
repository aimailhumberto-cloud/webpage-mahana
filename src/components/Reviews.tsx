import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Star, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';

export const Reviews: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const reviewsList = [
    {
      text: t('reviews.rev1'),
      author: "Sofía R.",
      date: language === 'es' ? "Hace 2 semanas" : "2 weeks ago"
    },
    {
      text: t('reviews.rev2'),
      author: "Carlos M.",
      date: language === 'es' ? "Hace 1 mes" : "1 month ago"
    },
    {
      text: t('reviews.rev3'),
      author: "John D.",
      date: language === 'es' ? "Hace 3 meses" : "3 months ago"
    }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviewsList.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviewsList.length) % reviewsList.length);
  };

  return (
    <section id="opiniones" className="py-20 bg-turquoise-900 text-white relative overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-turquoise-700/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-sand-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          
          {/* Aggregate Google badge */}
          <div className="lg:col-span-2 space-y-6 text-center lg:text-left bg-turquoise-950/40 p-8 md:p-10 rounded-3xl border border-turquoise-700/40 backdrop-blur-md shadow-glass">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-sand-500/10 border border-sand-500/20 text-sand-300 rounded-full text-xs font-semibold uppercase tracking-wider">
              Google Business
            </div>
            
            <div className="space-y-2">
              <div className="text-5xl font-extrabold text-white tracking-tight">4.1</div>
              
              {/* Star Rating */}
              <div className="flex items-center justify-center lg:justify-start space-x-1">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-sand-500 fill-sand-500" />
                ))}
                {/* 1 partial/hollow star */}
                <Star className="h-6 w-6 text-sand-500 fill-sand-500/20" />
              </div>
              
              <div className="text-sm text-sand-100 font-medium">
                {t('reviews.rating_label')}
              </div>
            </div>

            <p className="text-xs text-sand-200/60 leading-relaxed">
              {language === 'es' 
                ? 'Basado en más de 590 opiniones verificadas de huéspedes en nuestro perfil de Google.'
                : 'Based on over 590 verified guest reviews on our Google Business profile.'}
            </p>
          </div>

          {/* Testimonial slider */}
          <div className="lg:col-span-3 space-y-8 relative">
            <div className="inline-flex p-3 bg-turquoise-800 text-sand-300 rounded-2xl">
              <MessageSquare className="h-6 w-6" />
            </div>

            <div className="min-h-[140px] flex items-center">
              <blockquote className="text-xl sm:text-2xl font-medium font-serif italic text-sand-100 leading-relaxed transition-all duration-300">
                {reviewsList[activeIndex].text}
              </blockquote>
            </div>

            {/* Slider Controls */}
            <div className="flex justify-between items-center pt-6 border-t border-turquoise-800/80">
              <div>
                <div className="font-bold text-white text-base">
                  {reviewsList[activeIndex].author}
                </div>
                <div className="text-xs text-sand-200/50">
                  {reviewsList[activeIndex].date}
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-xl bg-turquoise-800 hover:bg-turquoise-700 text-white transition-all hover:scale-105 active:scale-95 shadow-sm"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-xl bg-turquoise-800 hover:bg-turquoise-700 text-white transition-all hover:scale-105 active:scale-95 shadow-sm"
                  aria-label="Next review"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
