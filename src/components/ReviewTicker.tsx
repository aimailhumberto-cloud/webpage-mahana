import React from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ReviewTicker: React.FC = () => {
  const { language } = useLanguage();

  const reviews = [
    {
      author: 'Sofía R.',
      text: language === 'es' ? '¡La mejor pizza a la leña de Chame!' : 'Best wood-fired pizza in Chame!',
      rating: 5,
    },
    {
      author: 'Carlos M.',
      text: language === 'es' ? 'Las piscinas son espectaculares y muy limpias.' : 'The pools are spectacular and very clean.',
      rating: 5,
    },
    {
      author: 'John D.',
      text: language === 'es' ? 'Ambiente súper tranquilo, ideal para descansar.' : 'Super quiet environment, ideal for resting.',
      rating: 5,
    },
    {
      author: 'Mariela G.',
      text: language === 'es' ? 'Excelente atención y comida de primera.' : 'Excellent service and top-notch food.',
      rating: 5,
    },
    {
      author: 'David P.',
      text: language === 'es' ? 'El pasadía todo incluido vale totalmente la pena.' : 'The all-inclusive day pass is totally worth it.',
      rating: 5,
    },
    {
      author: 'Emma L.',
      text: language === 'es' ? 'Pet friendly y ambiente muy relajante.' : 'Pet friendly and very relaxing environment.',
      rating: 5,
    }
  ];

  // Repeat reviews twice to allow infinite loop scroll
  const repeatedReviews = [...reviews, ...reviews, ...reviews];

  return (
    <div className="bg-turquoise-50 py-4 overflow-hidden border-y border-turquoise-100 flex items-center relative select-none">
      {/* Cinematic side blurs */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-turquoise-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-turquoise-50 to-transparent z-10 pointer-events-none" />

      {/* Ticker Tape */}
      <div className="flex space-x-6 animate-marquee whitespace-nowrap min-w-full">
        {repeatedReviews.map((rev, idx) => (
          <div
            key={idx}
            className="inline-flex items-center space-x-3 bg-white px-5 py-3 rounded-2xl border border-turquoise-100/50 shadow-sm"
          >
            {/* Google G icon */}
            <span className="w-5 h-5 bg-red-100 text-red-500 rounded-full flex items-center justify-center font-bold text-[10px]">
              G
            </span>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xs text-turquoise-900">{rev.author}</span>
                <div className="flex">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-sand-500 fill-sand-500" />
                  ))}
                </div>
              </div>
              <span className="text-[11px] text-turquoise-700/80 font-medium">"{rev.text}"</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
