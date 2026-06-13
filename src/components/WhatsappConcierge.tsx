import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const WhatsappConcierge: React.FC = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleChatClick = () => {
    // Open whatsapp conversation with receptionist number
    const number = '50762906800'; // Real Casa Mahana phone number
    const text = language === 'es' 
      ? 'Hola Casa Mahana, me gustaría recibir más información sobre las tarifas y disponibilidad.'
      : 'Hello Casa Mahana, I would like to get more information about rates and availability.';
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const content = {
    es: {
      status: 'En línea',
      title: 'Concierge Casa Mahana',
      greeting: '¡Hola! 👋 ¿Tienes alguna consulta sobre hospedajes, pasadías o el restaurante? Escríbenos directamente y te ayudaremos de inmediato.',
      btnText: 'Iniciar Chat',
      placeholder: 'Escribe tu mensaje...'
    },
    en: {
      status: 'Online',
      title: 'Casa Mahana Concierge',
      greeting: 'Hello! 👋 Do you have any questions about stays, day passes, or the restaurant? Write to us directly and we will help you right away.',
      btnText: 'Start Chat',
      placeholder: 'Type your message...'
    }
  };

  const t = content[language === 'es' ? 'es' : 'en'];

  return (
    <div className="fixed bottom-6 left-6 z-50 font-sans">
      {/* Pulse Bubble */}
      {!isOpen && (
        <button
          onClick={toggleOpen}
          className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 relative group"
        >
          <MessageSquare className="w-6 h-6 animate-pulse" />
          <span className="absolute top-1.5 right-1.5 w-3 h-3 bg-emerald-300 rounded-full border-2 border-white animate-ping"></span>
          <span className="absolute top-1.5 right-1.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></span>
          
          {/* Tooltip on hover */}
          <span className="absolute left-16 scale-0 group-hover:scale-100 bg-mahana-dark text-white text-[11px] font-bold px-3 py-1.5 rounded-xl transition-all shadow-md whitespace-nowrap origin-left">
            {language === 'es' ? '¿Necesitas ayuda?' : 'Need help?'}
          </span>
        </button>
      )}

      {/* Concierge Window */}
      {isOpen && (
        <div className="w-[320px] bg-white rounded-3xl border border-turquoise-100 shadow-2xl overflow-hidden transition-all duration-300 transform scale-100 origin-bottom-left animate-fade-in-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-turquoise-700 to-turquoise-900 p-4 text-white relative">
            <div className="flex items-center space-x-3">
              <div className="relative">
                {/* Logo / Avatar placeholder */}
                <div className="w-10 h-10 rounded-full bg-sand-100/20 flex items-center justify-center font-bold text-sm text-sand-100 border border-white/20">
                  CM
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-turquoise-800"></span>
              </div>
              <div>
                <h4 className="font-extrabold text-sm tracking-tight">{t.title}</h4>
                <span className="text-[10px] text-turquoise-200/90 font-semibold uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  {t.status}
                </span>
              </div>
            </div>
            
            <button
              onClick={toggleOpen}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 bg-sand-50/50 space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-turquoise-50/70 shadow-sm relative">
              <p className="text-xs text-turquoise-950 leading-relaxed font-medium">
                {t.greeting}
              </p>
              {/* Little speech bubble tail */}
              <div className="absolute -left-2 top-4 w-4 h-4 bg-white border-l border-b border-turquoise-50/70 transform rotate-45"></div>
            </div>

            <button
              onClick={handleChatClick}
              className="flex items-center justify-center space-x-2 w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-2xl shadow-md hover:shadow-lg transition-all"
            >
              <Send className="w-4 h-4" />
              <span>{t.btnText}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
