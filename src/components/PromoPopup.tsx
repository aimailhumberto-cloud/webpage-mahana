import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { X, Gift, MessageSquare, ArrowRight } from 'lucide-react';

export const PromoPopup: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    // Show popup 2.5 seconds after load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    setIsMinimized(true);
  };

  const handleOpen = () => {
    setIsMinimized(false);
    setIsVisible(true);
  };

  const handleBannerClick = () => {
    // Navigate to the new landing page for the promo
    navigate('/estadias/escape-mahana');
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const number = '50762906800';
    const text = language === 'es'
      ? 'Hola Casa Mahana, me interesa la promoción Escape Mahana de $33 para 2 personas.'
      : 'Hello Casa Mahana, I am interested in the Escape Mahana promo for $33 for 2 people.';
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const content = {
    es: {
      minimizedTip: 'Ver promoción Escape Mahana $33',
      buttonTag: '🔥 Escape Mahana $33'
    },
    en: {
      minimizedTip: 'View Escape Mahana $33 promo',
      buttonTag: '🔥 Escape Mahana $33'
    }
  };

  const t = content[language === 'es' ? 'es' : 'en'];

  if (isMinimized) {
    return (
      <button
        onClick={handleOpen}
        title={t.minimizedTip}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-turquoise-500 to-turquoise-700 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-bounce font-bold text-xs"
        style={{ animationDuration: '3s' }}
      >
        <Gift className="w-4 h-4" />
        <span>{t.buttonTag}</span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-mahana-accent rounded-full border-2 border-white animate-pulse"></span>
      </button>
    );
  }

  return (
    <div
      onClick={handleBannerClick}
      className={`fixed bottom-6 right-6 z-50 max-w-[320px] w-[90vw] rounded-[24px] shadow-2xl border border-white/20 transition-all duration-500 cursor-pointer group overflow-hidden bg-mahana-dark ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95 pointer-events-none'
      }`}
    >
      {/* Absolute Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full bg-mahana-dark/80 backdrop-blur-md text-white/70 hover:text-white border border-white/10 hover:bg-mahana-dark transition-all shadow-md"
      >
        <X className="w-4 h-4" />
      </button>

      {/* The Promo Flyer Image */}
      <div className="relative w-full overflow-hidden">
        <img
          src="/images/escape-mahana-promo.jpg"
          alt="Escape Mahana Promo"
          className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            console.error('Failed to load promo image');
          }}
        />
      </div>

      {/* Action Buttons: Link to landing page */}
      <div className="p-3 bg-mahana-dark flex flex-col space-y-2 border-t border-white/5">
        <button
          onClick={handleBannerClick}
          className="flex items-center justify-center space-x-1.5 w-full py-2.5 px-3 bg-mahana-accent hover:bg-mahana-accent/90 text-white text-[11px] font-extrabold rounded-xl shadow-md transition-all duration-300"
        >
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          <span>{language === 'es' ? 'Reservar Ahora' : 'Book Now'}</span>
        </button>
      </div>
    </div>
  );
};
