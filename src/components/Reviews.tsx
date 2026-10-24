import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Star, MessageSquare, ChevronLeft, ChevronRight, CheckCircle2, Award } from 'lucide-react';

export const Reviews: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const reviewsList = [
    {
      text: language === 'es'
        ? "El lugar es hermoso, la comida deliciosa especialmente las pizzas al horno de leña y la pesca del día. La atención del personal te hace sentir como en casa. ¡Volveremos sin duda!"
        : "The place is gorgeous, the food delicious especially the wood-fired pizzas and fresh catch of the day. The staff makes you feel right at home. We'll definitely return!",
      author: "Sofía R.",
      role: language === 'es' ? "Huésped en Suite Doble" : "Double Suite Guest",
      date: language === 'es' ? "Hace 2 semanas" : "2 weeks ago"
    },
    {
      text: language === 'es'
        ? "Una escapada perfecta desde la ciudad de Panamá. Las 3 piscinas tropicales son espectaculares y la tranquilidad del lodge no tiene comparación. Muy recomendado el plan Todo Incluido."
        : "A perfect getaway from Panama City. The 3 tropical pools are spectacular and the tranquility of the lodge is unmatched. Highly recommend the VIP All-Inclusive plan.",
      author: "Carlos M.",
      role: language === 'es' ? "Estadía Todo Incluido" : "All-Inclusive Stay",
      date: language === 'es' ? "Hace 1 mes" : "1 month ago"
    },
    {
      text: language === 'es'
        ? "Increíble experiencia boutique en Chame. Habitaciones súper limpias y frescas con A/C, gastronomía a la leña de primer nivel y que sea 100% pet friendly lo hace inmejorable."
        : "Incredible boutique eco-resort in Chame! Crisp clean A/C rooms, top-tier wood-fired dining, and being genuinely pet friendly made our family weekend unforgettable.",
      author: "John D.",
      role: language === 'es' ? "Viajero Internacional" : "International Guest",
      date: language === 'es' ? "Hace 3 meses" : "3 months ago"
    },
    {
      text: language === 'es'
        ? "El pasadía con almuerzo a la carta superó todas las expectativas. El ceviche de maracuyá, los cócteles tropicales y el solarium junto a la piscina crearon el mejor domingo."
        : "The all-inclusive day pass exceeded every expectation. The passionfruit ceviche, tropical cocktails, and sun loungers made it the ultimate Sunday retreat.",
      author: "Valentina P.",
      role: language === 'es' ? "Pasadía VIP" : "VIP Day Pass Guest",
      date: language === 'es' ? "Hace 3 semanas" : "3 weeks ago"
    },
    {
      text: language === 'es'
        ? "Las clases de surf en Playa Caracol con los instructores de Mahana Surf Shack fueron de nivel mundial. Llegar al Lodge a relajarse en la piscina después de surfear fue un sueño."
        : "The surf coaching at Caracol Beach with the Mahana Surf Shack team was world-class. Returning to the Lodge to unwind in the pool after surfing was absolute bliss.",
      author: "Andrés G.",
      role: language === 'es' ? "Surf Camp & Hospedaje" : "Surf Camp & Stay",
      date: language === 'es' ? "Hace 2 meses" : "2 months ago"
    }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviewsList.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviewsList.length) % reviewsList.length);
  };

  return (
    <section id="opiniones" className="band-full-bleed py-20 lg:py-28 bg-turquoise-950 text-white relative overflow-hidden font-sans">
      {/* Decorative Blur Spheres */}
      <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-turquoise-700/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-sand-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-fluid relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Aggregate Google badge (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left bg-turquoise-900/40 p-8 sm:p-10 rounded-[32px] border border-turquoise-700/50 backdrop-blur-md shadow-2xl">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-sand-500/15 border border-sand-500/30 text-sand-300 rounded-full text-xs font-extrabold uppercase tracking-widest">
              <Award className="w-3.5 h-3.5 text-sand-400" />
              <span>Google Business Verified</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-baseline justify-center lg:justify-start space-x-3">
                <span className="text-6xl font-serif font-black text-white tracking-tight">4.2</span>
                <span className="text-sm uppercase tracking-widest text-sand-300 font-extrabold">/ 5.0</span>
              </div>
              
              {/* Star Rating */}
              <div className="flex items-center justify-center lg:justify-start space-x-1.5">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-amber-400 fill-amber-400" />
                ))}
                {/* 1 partial/hollow star */}
                <Star className="h-6 w-6 text-amber-400 fill-amber-400/25" />
              </div>
              
              <div className="text-base font-bold text-sand-50">
                {t('reviews.rating_label')}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-sand-200/70 leading-relaxed">
              {language === 'es' 
                ? 'Basado en más de 590 opiniones verificadas de huéspedes en nuestro perfil de Google.'
                : 'Based on over 590 verified guest reviews on our Google Business profile.'}
            </p>

            {/* Trust check chips */}
            <div className="pt-2 flex flex-wrap gap-2 justify-center lg:justify-start">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-[11px] text-sand-100 font-medium border border-white/10">
                <CheckCircle2 className="w-3 h-3 text-turquoise-400" />
                <span>{language === 'es' ? 'Opiniones Verificadas' : 'Verified Reviews'}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-[11px] text-sand-100 font-medium border border-white/10">
                <CheckCircle2 className="w-3 h-3 text-turquoise-400" />
                <span>{language === 'es' ? '100% Pet Friendly' : '100% Pet Friendly'}</span>
              </span>
            </div>
          </div>

          {/* Testimonial slider (7 cols) */}
          <div className="lg:col-span-7 space-y-8 relative pl-0 lg:pl-4">
            <div className="inline-flex p-3.5 bg-turquoise-800/80 text-sand-300 rounded-2xl border border-turquoise-700/50 shadow-md">
              <MessageSquare className="h-6 w-6" />
            </div>

            <div className="min-h-[160px] flex items-center">
              <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium font-serif italic text-sand-50 leading-relaxed transition-all duration-300">
                "{reviewsList[activeIndex].text}"
              </blockquote>
            </div>

            {/* Slider Controls & Author Info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 border-t border-turquoise-800/80">
              <div>
                <div className="font-bold text-white text-base sm:text-lg">
                  {reviewsList[activeIndex].author}
                </div>
                <div className="text-xs text-sand-200/70 font-medium mt-0.5">
                  {reviewsList[activeIndex].role} · {reviewsList[activeIndex].date}
                </div>
              </div>

              {/* Slider Dots + Arrows */}
              <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex space-x-1.5">
                  {reviewsList.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => setActiveIndex(dotIdx)}
                      className={`h-2 rounded-full transition-all ${
                        dotIdx === activeIndex ? 'w-6 bg-sand-400' : 'w-2 bg-turquoise-800'
                      }`}
                      aria-label={`Go to review ${dotIdx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={handlePrev}
                    className="p-3 rounded-2xl bg-turquoise-800 hover:bg-turquoise-700 text-white transition-all hover:scale-105 active:scale-95 shadow-md border border-turquoise-700/40"
                    aria-label="Previous review"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-3 rounded-2xl bg-turquoise-800 hover:bg-turquoise-700 text-white transition-all hover:scale-105 active:scale-95 shadow-md border border-turquoise-700/40"
                    aria-label="Next review"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Reviews;

