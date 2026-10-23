import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useMedia } from '../context/MediaContext';
import { Calendar, Users, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { trackBookingIntent, trackEvent } from '../utils/analytics';

export const Hero: React.FC = () => {
  const { language, t } = useLanguage();
  const { media } = useMedia();
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);

  // Booking Bar State
  const [selectedPlan, setSelectedPlan] = useState<string>('todo_incluido');
  const [guests, setGuests] = useState<string>('2');
  const [checkInDate, setCheckInDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });

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

  // Natural photo cross-fade every 6.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedPlan === 'restaurante') {
      trackEvent('hero_booking_bar_restaurant');
      navigate('/restaurante');
      return;
    }

    const guestsNum = parseInt(guests, 10) || 2;
    trackBookingIntent({
      planCode: selectedPlan,
      source: 'hero_floating_booking_bar',
      guests: guestsNum
    });

    navigate(`/reservar?plan=${selectedPlan}&guests=${guests}&date=${checkInDate}`, {
      state: {
        planCode: selectedPlan,
        guests: guestsNum,
        checkInDate
      }
    });
  };

  return (
    <section id="inicio" className="relative min-h-[92vh] sm:min-h-[95vh] flex flex-col justify-between overflow-hidden bg-black pt-16 pb-12 sm:pb-16">
      {/* Slideshow background — natural, bright sunlit resort photography */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-[1800ms] ease-in-out ${
              index === currentIdx ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
            style={{
              backgroundImage: `url('${slide.src}')`
            }}
          />
        ))}
        {/* Soft natural photographic vignette — NO dark purple/blue overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35" />
      </div>

      {/* Main Hero Header & Titles */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 my-auto pt-6 pb-8">
        <div className="max-w-3xl text-left space-y-6">
          {/* Natural Location Tag */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-black/40 backdrop-blur-md border border-white/25 rounded-full text-white text-xs uppercase tracking-widest font-semibold">
            <MapPin className="w-3.5 h-3.5 text-turquoise-400" />
            <span>Chame, Panamá</span>
          </div>

          {/* Editorial Boutique Title */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-black tracking-tight text-white leading-[1.08] font-sans drop-shadow-lg uppercase">
              {t('hero.headline')}
            </h1>
            <p className="text-base sm:text-lg text-sand-50/90 leading-relaxed font-sans max-w-2xl drop-shadow-md">
              {t('hero.subheadline')}
            </p>
          </div>

          {/* Authentic Trust Badges */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-sand-100/90 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-amber-300">⭐ 4.2 en Google</span>
            <span className="text-white/40">•</span>
            <span className="flex items-center gap-1.5">🐾 Pet Friendly</span>
            <span className="text-white/40">•</span>
            <span className="flex items-center gap-1.5">🏊 3 Piscinas Tropicales</span>
          </div>
        </div>
      </div>

      {/* Floating Booking Bar (Minimalist Luxury Hospitality Capsule) */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20">
        <form
          onSubmit={handleBookingSubmit}
          className="bg-white/95 backdrop-blur-md rounded-3xl md:rounded-full border border-white/60 shadow-2xl p-3 sm:p-3.5 transition-all"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-2.5 sm:gap-3 items-center">
            {/* Field 1: Experiencia / Plan (4 cols) */}
            <div className="md:col-span-4 px-3 py-1.5 text-left rounded-2xl hover:bg-sand-50/80 transition-colors">
              <label className="block text-[10px] font-extrabold uppercase tracking-widest text-turquoise-800 flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-turquoise-600" />
                <span>{language === 'es' ? 'Experiencia / Plan' : 'Experience / Plan'}</span>
              </label>
              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-full bg-transparent font-bold text-xs sm:text-sm text-mahana-dark focus:outline-none cursor-pointer truncate"
              >
                <option value="todo_incluido">
                  {language === 'es' ? '👑 Todo Incluido VIP ($66/pers)' : '👑 VIP All-Inclusive ($66/guest)'}
                </option>
                <option value="escape_mahana">
                  {language === 'es' ? '🔥 Escape Mahana ($33/pareja)' : '🔥 Escape Mahana ($33/couple)'}
                </option>
                <option value="mahana_exp">
                  {language === 'es' ? '✨ Mahana Experience ($49.50/pers)' : '✨ Mahana Experience ($49.50/guest)'}
                </option>
                <option value="pasadia_comidas">
                  {language === 'es' ? '🍹 Pasadía Todo Incluido ($38.50/pers)' : '🍹 All-Inclusive Day Pass ($38.50)'}
                </option>
                <option value="pasadia_entrada">
                  {language === 'es' ? '☀️ Pool Day Acceso ($5.50/pers)' : '☀️ Basic Pool Day ($5.50)'}
                </option>
                <option value="restaurante">
                  {language === 'es' ? '🍕 Restaurante a la Leña (Carta)' : '🍕 Wood-Fired Restaurant (Menu)'}
                </option>
              </select>
            </div>

            {/* Field 2: Huéspedes (3 cols) */}
            <div className="md:col-span-3 px-3 py-1.5 text-left rounded-2xl hover:bg-sand-50/80 transition-colors border-t sm:border-t-0 sm:border-l border-sand-200">
              <label className="block text-[10px] font-extrabold uppercase tracking-widest text-turquoise-800 flex items-center gap-1.5 mb-1">
                <Users className="w-3.5 h-3.5 text-turquoise-600" />
                <span>{language === 'es' ? 'Huéspedes' : 'Guests'}</span>
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-transparent font-bold text-xs sm:text-sm text-mahana-dark focus:outline-none cursor-pointer"
              >
                <option value="2">{language === 'es' ? '2 Personas (Pareja)' : '2 Guests (Couple)'}</option>
                <option value="1">{language === 'es' ? '1 Persona (Individual)' : '1 Guest (Solo)'}</option>
                <option value="3">{language === 'es' ? '3 Personas' : '3 Guests'}</option>
                <option value="4">{language === 'es' ? '4 Personas (Familiar)' : '4 Guests (Family)'}</option>
                <option value="5">{language === 'es' ? '5+ Personas (Grupo)' : '5+ Guests (Group)'}</option>
              </select>
            </div>

            {/* Field 3: Fecha de Llegada (2 cols) */}
            <div className="md:col-span-2 px-3 py-1.5 text-left rounded-2xl hover:bg-sand-50/80 transition-colors border-t sm:border-t-0 sm:border-l border-sand-200">
              <label className="block text-[10px] font-extrabold uppercase tracking-widest text-turquoise-800 flex items-center gap-1.5 mb-1">
                <Calendar className="w-3.5 h-3.5 text-turquoise-600" />
                <span>{language === 'es' ? 'Llegada' : 'Check-In'}</span>
              </label>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full bg-transparent font-bold text-xs sm:text-sm text-mahana-dark focus:outline-none cursor-pointer"
              />
            </div>

            {/* Field 4: Botón de Consulta / Reserva (3 cols) */}
            <div className="md:col-span-3 pt-2 md:pt-0">
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 bg-turquoise-700 hover:bg-turquoise-800 active:scale-[0.98] text-white rounded-2xl md:rounded-full font-extrabold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg hover:scale-[1.02]"
              >
                <span>{language === 'es' ? 'Consultar Disponibilidad' : 'Check Availability'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Discrete Photo Navigator Pills at bottom right */}
      <div className="absolute bottom-3 right-6 z-10 hidden lg:flex items-center space-x-1.5 bg-black/40 backdrop-blur-md border border-white/20 rounded-full px-2.5 py-1 text-[10px]">
        {slides.map((slide, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIdx(idx)}
            className={`px-2 py-0.5 rounded-full font-bold transition-all ${
              idx === currentIdx
                ? 'bg-white text-black shadow-xs'
                : 'text-white/70 hover:text-white'
            }`}
          >
            {language === 'es' ? slide.labelEs : slide.labelEn}
          </button>
        ))}
      </div>

      {/* Subtle organic bottom curve transition */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-mahana-light rounded-t-[24px]" />
    </section>
  );
};

export default Hero;
