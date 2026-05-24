import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Check, Clock, MapPin, ArrowRight, UtensilsCrossed, Pizza, Waves, Flame, Eye, Download, X } from 'lucide-react';

export const RestaurantePublico: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {
      category: language === 'es' ? '🍕 Pizzas Artesanales a la Leña' : '🍕 Artisanal Wood-Fired Pizzas',
      items: [
        {
          name: t('restaurant_menu.pizza_pesto'),
          desc: t('restaurant_menu.pizza_pesto_desc'),
          price: '$14.50'
        },
        {
          name: t('restaurant_menu.pizza_seafood'),
          desc: t('restaurant_menu.pizza_seafood_desc'),
          price: '$17.00'
        }
      ]
    },
    {
      category: language === 'es' ? '🐟 Especialidades del Océano' : '🐟 Ocean Specialties',
      items: [
        {
          name: t('restaurant_menu.ceviche_chame'),
          desc: t('restaurant_menu.ceviche_chame_desc'),
          price: '$9.50'
        },
        {
          name: t('restaurant_menu.corvina_al_ajillo'),
          desc: t('restaurant_menu.corvina_al_ajillo_desc'),
          price: '$15.50'
        }
      ]
    },
    {
      category: language === 'es' ? '🍔 Hamburguesas Gourmet & Snacks' : '🍔 Gourmet Burgers & Finger Food',
      items: [
        {
          name: t('restaurant_menu.burger_mahana'),
          desc: t('restaurant_menu.burger_mahana_desc'),
          price: '$13.00'
        }
      ]
    }
  ];

  const galleryImages = [
    { src: '/images/food-pizza.jpg?v=2', alt: 'Ceviche de la Casa', title: language === 'es' ? 'Ceviche de la Casa' : 'House Ceviche' },
    { src: '/images/food-picada.jpg?v=2', alt: 'Picada Mixta', title: language === 'es' ? 'Picada Mixta' : 'Mixed Platter' },
    { src: '/images/food-cocktail.jpg?v=2', alt: 'Alitas de Pollo', title: language === 'es' ? 'Alitas de Pollo' : 'Crispy Chicken Wings' }
  ];

  return (
    <div className="py-16 bg-mahana-light min-h-[90vh] animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <span className="px-3.5 py-1.5 bg-turquoise-900 text-sand-100 text-xs font-bold uppercase tracking-wider rounded-xl border border-turquoise-700/30">
              {language === 'es' ? 'Abierto al Público General' : 'Open to the General Public'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-turquoise-950 tracking-tight leading-tight">
              {t('restaurant_menu.title')}
            </h1>
            <p className="text-lg font-bold text-turquoise-700 -mt-2">
              {t('restaurant_menu.subtitle')}
            </p>
            <p className="text-mahana-dark/80 leading-relaxed font-medium">
              {t('restaurant_menu.desc')}
            </p>

            <div className="bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-[24px] border border-sand-200 shadow-glass space-y-4">
              <div className="flex items-center space-x-3 text-sm text-turquoise-950 font-bold">
                <Clock className="h-5 w-5 text-turquoise-700 shrink-0" />
                <span>
                  {language === 'es' 
                    ? 'Todos los días — Dom a Jue: 8:00 AM - 10:00 PM | Vie y Sáb: 8:00 AM - 11:00 PM' 
                    : 'Every day — Sun to Thu: 8:00 AM - 10:00 PM | Fri & Sat: 8:00 AM - 11:00 PM'}
                </span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-turquoise-950 font-bold">
                <MapPin className="h-5 w-5 text-turquoise-700 shrink-0" />
                <span>{language === 'es' ? 'Ubicación: Vía Punta Chame, El Mangote, Chame, Panamá' : 'Location: Vía Punta Chame, El Mangote, Chame, Panama'}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="px-6 py-3.5 bg-turquoise-700 hover:bg-turquoise-900 text-white rounded-xl font-bold flex items-center justify-center space-x-2 transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
              >
                <Eye className="h-5 w-5" />
                <span>{language === 'es' ? 'Ver el Menú' : 'View the Menu'}</span>
              </button>
              <a
                href="/CASA MAHANA MENU.pdf"
                download="Menu-Casa-Mahana.pdf"
                className="px-6 py-3.5 border border-sand-300 hover:border-sand-500 hover:bg-sand-50 text-turquoise-900 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all shadow-sm"
              >
                <Download className="h-5 w-5" />
                <span>{language === 'es' ? 'Descargar Menú PDF' : 'Download PDF Menu'}</span>
              </a>
            </div>
          </div>

          <div className="relative h-[280px] sm:h-[480px] rounded-[24px] sm:rounded-[40px] overflow-hidden shadow-premium border border-sand-200 group">
            <img 
              src="/images/food-pizza-oven-v2.jpg" 
              alt="Casa Mahana Restaurant" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-xs px-5 py-3 rounded-2xl flex items-center space-x-3 shadow-lg border border-sand-200">
              <Flame className="h-6 w-6 text-amber-600 animate-bounce" />
              <div>
                <span className="text-xs uppercase font-extrabold text-turquoise-950 block">
                  {language === 'es' ? 'Horno a la Leña' : 'Wood-Fired Oven'}
                </span>
                <span className="text-xxs text-mahana-dark/60 font-semibold">
                  {language === 'es' ? 'Artesanal y al momento' : 'Artisanal & fresh'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Real Food Highlights Gallery */}
        <div className="mb-16">
          <div className="text-center max-w-lg mx-auto space-y-3 mb-10">
            <h2 className="text-2xl font-black text-turquoise-950">{language === 'es' ? 'Galería del Sabor' : 'Flavor Gallery'}</h2>
            <p className="text-xs text-mahana-dark/60 font-bold uppercase tracking-wider">{language === 'es' ? 'Platos e ingredientes reales de nuestra cocina' : 'Real dishes and ingredients from our kitchen'}</p>
            <div className="h-1 w-16 bg-turquoise-700 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((img, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-sand-200 shadow-glass hover:shadow-premium hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white font-bold text-lg">{img.title}</span>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <span className="font-extrabold text-turquoise-950 text-base">{img.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Digital Menu Text Display */}
        <div className="bg-white rounded-[40px] border border-sand-200 p-5 sm:p-12 shadow-premium space-y-12 mb-16">
          <div className="text-center max-w-lg mx-auto space-y-3">
            <UtensilsCrossed className="h-8 w-8 text-turquoise-700 mx-auto" />
            <h2 className="text-3xl font-black text-turquoise-950">{t('restaurant_menu.menu_title')}</h2>
            <div className="h-1 w-16 bg-turquoise-700 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {menuItems.map((cat, i) => (
              <div key={i} className="space-y-6">
                <h3 className="text-lg font-extrabold text-turquoise-950 border-b border-sand-200 pb-3 flex items-center space-x-2">
                  <span>{cat.category}</span>
                </h3>

                <div className="space-y-6">
                  {cat.items.map((item, j) => (
                    <div key={j} className="group space-y-2 p-4 hover:bg-sand-50/50 rounded-2xl transition-colors border border-transparent hover:border-sand-200/40">
                      <div className="flex justify-between items-baseline gap-2">
                        <h4 className="font-extrabold text-turquoise-950 group-hover:text-turquoise-700 transition-colors">
                          {item.name && typeof item.name === 'string'
                            ? (item.name.includes(' - ') ? item.name.split(' - ')[0] : item.name)
                            : (item.name || '')}
                        </h4>
                        <span className="text-lg font-black text-turquoise-900 shrink-0">{item.price}</span>
                      </div>
                      <p className="text-xs text-mahana-dark/70 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Book Daypass helper */}
          <div className="bg-sand-100/70 p-5 sm:p-8 rounded-[32px] border border-sand-200/80 text-center max-w-2xl mx-auto space-y-4">
            <Pizza className="h-8 w-8 text-turquoise-700 mx-auto" />
            <h3 className="font-extrabold text-turquoise-950 text-lg">
              {language === 'es' ? '¿Quieres disfrutar de la piscina mientras comes?' : 'Want to enjoy the pool while dining?'}
            </h3>
            <p className="text-sm text-mahana-dark/70 max-w-lg mx-auto">
              {language === 'es'
                ? 'Con nuestro Pasadía con Todo Incluido obtienes un almuerzo gourmet a la carta, open bar nacional y snacks ilimitados junto a la piscina de 9:00 AM a 5:00 PM.'
                : 'With our All-Inclusive Day Pass, you get an a-la-carte gourmet lunch, national open bar, and unlimited poolside snacks from 9:00 AM to 5:00 PM.'}
            </p>
            <button 
              onClick={() => navigate('/pasadias/todo-incluido')}
              className="px-6 py-3 bg-turquoise-700 hover:bg-turquoise-900 text-white rounded-xl font-bold inline-flex items-center space-x-2 transition-all shadow-md hover:scale-[1.02] active:scale-[0.99]"
            >
              <span>{language === 'es' ? 'Ver Detalles del Pasadía' : 'View Day Pass Details'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Menu Image Lightbox Modal Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-55 bg-black/85 backdrop-blur-md flex flex-col justify-center items-center p-4 animate-fade-in text-center">
          <div className="absolute top-4 right-4 flex space-x-3 z-50">
            <a 
              href="/CASA MAHANA MENU.pdf" 
              download="Menu-Casa-Mahana.pdf"
              className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md p-3 rounded-full border border-white/20 transition-all flex items-center space-x-2"
              title="Descargar PDF"
            >
              <Download className="h-5 w-5" />
            </a>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md p-3 rounded-full border border-white/20 transition-all cursor-pointer"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="max-w-4xl max-h-[85vh] overflow-auto rounded-2xl border border-white/10 shadow-premium bg-white p-2">
            <img 
              src="/images/restaurant-menu-sheet.jpg?v=2" 
              alt="Casa Mahana printed menu" 
              className="max-h-[80vh] w-auto object-contain mx-auto" 
              loading="lazy"
            />
          </div>

          <div className="mt-4 text-center text-white/80 font-bold text-sm">
            <span>{language === 'es' ? 'Menú Casa Mahana · Restaurante & Bar' : 'Casa Mahana Menu · Restaurant & Bar'}</span>
          </div>
        </div>
      )}

    </div>
  );
};

export default RestaurantePublico;
