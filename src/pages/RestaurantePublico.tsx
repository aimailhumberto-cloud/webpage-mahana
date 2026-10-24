import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Clock, MapPin, ArrowRight, UtensilsCrossed, Pizza, Flame, Eye, Download, X, Phone, Sparkles } from 'lucide-react';
import { SEO } from '../components/SEO';
import { trackWhatsAppClick } from '../utils/analytics';

export const RestaurantePublico: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleReserveTable = () => {
    trackWhatsAppClick('Restaurante', 'Reserva de Mesa');
    const msg = language === 'es'
      ? '¡Hola! Me gustaría consultar disponibilidad o reservar una mesa en el Restaurante de Casa Mahana.'
      : 'Hello! I would like to check availability or reserve a table at Casa Mahana Restaurant.';
    window.open(`https://wa.me/50769884566?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const menuCategories = [
    {
      category: language === 'es' ? '🥗 Entradas & Piqueos' : '🥗 Starters & Appetizers',
      items: [
        {
          name: language === 'es' ? 'Ceviche de la Casa' : 'House Ceviche',
          desc: t('restaurant_menu.ceviche_chame_desc'),
          price: '$9.50',
          badge: language === 'es' ? 'Fresco del Día' : 'Catch of the Day'
        },
        {
          name: language === 'es' ? 'Picada Mixta Casa Mahana' : 'Casa Mahana Mixed Platter',
          desc: language === 'es'
            ? 'Piqueo abundante para compartir: patacones crocantes de plátano verde, alitas doradas, chorizo artesanal y salsa tártara de la casa.'
            : 'Generous sharing platter: crispy green plantain chips, golden wings, artisanal sausage, and homemade tartar dipping sauce.',
          price: '$14.00'
        },
        {
          name: language === 'es' ? 'Alitas Crujientes de la Casa' : 'Crispy Chicken Wings',
          desc: language === 'es'
            ? 'Alitas marinadas en cítricos y especias tropicales, bañadas en salsa barbacoa a la leña o picante criollo chameño.'
            : 'Marinated wings in tropical citrus & spices, tossed in wood-fired barbecue glaze or Chame creole hot sauce.',
          price: '$11.00'
        }
      ]
    },
    {
      category: language === 'es' ? '🍕 Pizzas Artesanales a la Leña' : '🍕 Artisanal Wood-Fired Pizzas',
      items: [
        {
          name: 'Pizza Pepperoni',
          desc: t('restaurant_menu.pizza_pesto_desc'),
          price: '$14.50',
          badge: language === 'es' ? 'La Favorita' : 'Most Popular'
        },
        {
          name: language === 'es' ? 'Pizza Combinación' : 'Combination Pizza',
          desc: t('restaurant_menu.pizza_seafood_desc'),
          price: '$17.00',
          badge: language === 'es' ? 'Especialidad' : 'Specialty'
        },
        {
          name: language === 'es' ? 'Pizza Margherita Artesanal' : 'Artisanal Margherita Pizza',
          desc: language === 'es'
            ? 'Salsa pomodoro casera al horno de leña, mozzarella fior di latte fundida, albahaca fresca de nuestra huerta y aceite de oliva virgen extra.'
            : 'Slow-simmered pomodoro sauce, melted fior di latte mozzarella, garden-fresh basil, and extra virgin olive oil.',
          price: '$13.50'
        }
      ]
    },
    {
      category: language === 'es' ? '🐟 Platos Fuertes & Especialidades del Océano' : '🐟 Mains & Ocean Specialties',
      items: [
        {
          name: language === 'es' ? 'Corvina al Ajillo' : 'Garlic Corvina Fillet',
          desc: t('restaurant_menu.corvina_al_ajillo_desc'),
          price: '$15.50'
        },
        {
          name: language === 'es' ? 'Hamburguesa Gourmet Mahana' : 'Mahana Gourmet Burger',
          desc: t('restaurant_menu.burger_mahana_desc'),
          price: '$13.00',
          badge: language === 'es' ? '100% Angus' : '100% Angus'
        },
        {
          name: language === 'es' ? 'Pescado Frito Entero con Patacones' : 'Whole Fried Catch with Patacones',
          desc: language === 'es'
            ? 'Pesca fresca del día frita a la perfección con piel dorada crujiente, servida con patacones de plátano verde y ensalada caribeña.'
            : 'Fresh whole catch fried to golden crispy perfection, served with pressed green plantains and fresh coastal slaw.',
          price: '$16.50'
        }
      ]
    },
    {
      category: language === 'es' ? '🍹 Cócteles de Autor & Bebidas' : '🍹 Signature Cocktails & Drinks',
      items: [
        {
          name: language === 'es' ? 'Cócteles de Autor Tropicales' : 'Tropical Signature Cocktails',
          desc: language === 'es'
            ? 'Mojito de maracuyá, Piña Colada fresca servida en coco natural, Margarita artesanal con sal volcánica y Gin Tonic botánico.'
            : 'Passion fruit mojito, fresh pineapple colada served in natural coconut, artisanal margarita, and botanical gin & tonic.',
          price: '$8.50',
          badge: language === 'es' ? 'Mixología' : 'Mixology'
        },
        {
          name: language === 'es' ? 'Cervezas Frías Nacionales & Artesanales' : 'Cold National & Craft Beers',
          desc: language === 'es'
            ? 'Cervezas nacionales heladas (Balboa, Atlas Golden Light) y cervezas artesanales panameñas de microcervecería local.'
            : 'Ice-cold Panamanian beers (Balboa, Atlas Golden Light) and select local craft beers.',
          price: '$4.00'
        },
        {
          name: language === 'es' ? 'Smoothies & Jugos 100% Naturales' : '100% Natural Fresh Smoothies',
          desc: language === 'es'
            ? 'Batidos preparados al momento con fruta fresca de temporada: piña, mango, sandía, maracuyá y limonada con hierbabuena.'
            : 'Freshly blended seasonal fruit smoothies: pineapple, mango, watermelon, passion fruit, and mint lemonade.',
          price: '$5.00'
        }
      ]
    }
  ];

  const galleryImages = [
    {
      src: '/images/food-pizza-oven-v2.jpg',
      alt: 'Horno de Leña Artesanal Casa Mahana',
      title: language === 'es' ? 'Horno a la Leña Artesanal' : 'Artisanal Wood-Fired Oven',
      subtitle: language === 'es' ? 'Horneado tradicional a fuego vivo' : 'Traditional high-heat baking'
    },
    {
      src: '/images/food-pizza.jpg?v=2',
      alt: 'Pizza Artesanal Casa Mahana',
      title: language === 'es' ? 'Pizzas al Momento' : 'Fresh Wood-Fired Pizzas',
      subtitle: language === 'es' ? 'Masa madre y quesos fundidos' : 'Sourdough crust & melted cheese'
    },
    {
      src: '/images/food-picada.jpg?v=2',
      alt: 'Picadas y Mariscos',
      title: language === 'es' ? 'Picadas & Especialidades' : 'Platters & Coastal Bites',
      subtitle: language === 'es' ? 'Sabores para compartir junto a la piscina' : 'Sharing bites by the tropical pool'
    },
    {
      src: '/images/food-cocktail.jpg?v=2',
      alt: 'Coctelería Tropical Casa Mahana',
      title: language === 'es' ? 'Mixología de Autor' : 'Signature Mixology',
      subtitle: language === 'es' ? 'Tragos frescos frente al atardecer' : 'Fresh cocktails at golden hour'
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-sand-50/60 pb-20 font-sans">
        <SEO 
          titleEs="Restaurante Gourmet al Horno de Leña — Casa Mahana"
          titleEn="Wood-Fired Gourmet Restaurant — Casa Mahana"
          descriptionEs="Abierto al público en Chame. Saborea nuestras pizzas artesanales a la leña, ceviches frescos, mariscos locales y cócteles de autor frente a la piscina tropical."
          descriptionEn="Open to the public in Chame. Savor our wood-fired artisanal pizzas, fresh ceviche, local seafood, and signature cocktails by the tropical pool."
          image="/images/food-pizza.jpg"
          path="/restaurante"
          schemaType="Restaurant"
        />

        {/* 1. Full-Bleed Culinary Hero Section */}
        <section className="band-full-bleed bg-mahana-dark text-white relative py-20 sm:py-28 lg:py-32">
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/food-pizza-oven-v2.jpg" 
              alt="Casa Mahana Wood Fired Oven" 
              className="w-full h-full object-cover opacity-35 filter brightness-90"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-mahana-dark via-mahana-dark/85 to-mahana-dark/65" />
          </div>

          <div className="container-fluid relative z-10">
            <div className="max-w-4xl space-y-6">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-turquoise-900/90 text-sand-100 text-xs font-bold uppercase tracking-wider rounded-xl border border-turquoise-700/50 shadow-sm backdrop-blur-xs">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>{language === 'es' ? 'Abierto al Público General' : 'Open to the General Public'}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif text-white tracking-tight leading-tight">
                {t('restaurant_menu.title')}
              </h1>

              <p className="text-lg sm:text-xl font-bold text-turquoise-300">
                {t('restaurant_menu.subtitle')}
              </p>

              <p className="text-sand-100/85 text-sm sm:text-base leading-relaxed max-w-3xl">
                {t('restaurant_menu.desc')}
              </p>

              {/* Operating hours & Location Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 flex items-start space-x-3.5 shadow-glass">
                  <Clock className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-sand-50 space-y-1">
                    <span className="font-bold block text-white">
                      {language === 'es' ? 'Horario de Atención' : 'Opening Hours'}
                    </span>
                    <p className="text-sand-200/90 leading-snug">
                      {language === 'es' 
                        ? 'Dom a Jue: 8:00 AM - 10:00 PM | Vie y Sáb: 8:00 AM - 11:00 PM' 
                        : 'Sun to Thu: 8:00 AM - 10:00 PM | Fri & Sat: 8:00 AM - 11:00 PM'}
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 flex items-start space-x-3.5 shadow-glass">
                  <MapPin className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-sand-50 space-y-1">
                    <span className="font-bold block text-white">
                      {language === 'es' ? 'Ubicación' : 'Location'}
                    </span>
                    <p className="text-sand-200/90 leading-snug">
                      {language === 'es' 
                        ? 'Vía Punta Chame, El Mangote, Chame, Panamá' 
                        : 'Vía Punta Chame, El Mangote, Chame, Panama'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="px-7 py-3.5 bg-turquoise-600 hover:bg-turquoise-700 text-white rounded-xl font-bold flex items-center justify-center space-x-2 transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] text-sm"
                >
                  <Eye className="h-5 w-5" />
                  <span>{language === 'es' ? 'Ver el Menú' : 'View the Menu'}</span>
                </button>

                <button
                  onClick={handleReserveTable}
                  className="px-7 py-3.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold flex items-center justify-center space-x-2 transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] text-sm"
                >
                  <Phone className="h-5 w-5" />
                  <span>{language === 'es' ? 'Reservar Mesa por WhatsApp' : 'Reserve Table via WhatsApp'}</span>
                </button>

                <a
                  href="/CASA MAHANA MENU.pdf"
                  download="Menu-Casa-Mahana.pdf"
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-sand-100 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all border border-white/20 text-sm"
                >
                  <Download className="h-5 w-5" />
                  <span>{language === 'es' ? 'Descargar Menú PDF' : 'Download PDF Menu'}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Flavors Gallery (Expansive Editorial Showcase) */}
        <section className="band-full-bleed bg-sand-100/70 py-16 sm:py-24 border-b border-sand-200/80">
          <div className="container-fluid">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
              <span className="text-xs uppercase tracking-widest text-turquoise-700 font-extrabold block">
                {language === 'es' ? 'Experiencia Gastronómica' : 'Culinary Experience'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-serif text-turquoise-950">
                {language === 'es' ? 'Galería del Sabor' : 'Flavor Gallery'}
              </h2>
              <p className="text-xs sm:text-sm text-mahana-dark/70 font-semibold uppercase tracking-wider">
                {language === 'es' ? 'Platos e ingredientes reales de nuestra cocina artesanal' : 'Real dishes and ingredients from our artisanal kitchen'}
              </p>
              <div className="h-1.5 w-20 bg-turquoise-700 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {galleryImages.map((img, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-3xl overflow-hidden border border-sand-200 shadow-glass hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={img.src} 
                      alt={img.alt} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                      <span className="text-white font-bold text-sm">{img.subtitle}</span>
                    </div>
                  </div>
                  <div className="p-5 text-center bg-white">
                    <span className="font-extrabold text-turquoise-950 text-base block">{img.title}</span>
                    <span className="text-xs text-mahana-dark/65 font-medium mt-1 block">{img.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Luxury Interactive Digital Menu */}
        <section className="band-full-bleed py-16 sm:py-24">
          <div className="container-fluid">
            <div className="bg-white rounded-[40px] border border-sand-200 p-6 sm:p-12 lg:p-16 shadow-premium space-y-14">
              <div className="text-center max-w-xl mx-auto space-y-3">
                <div className="inline-flex p-3 bg-sand-100 rounded-2xl text-turquoise-700">
                  <UtensilsCrossed className="h-8 w-8" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-black font-serif text-turquoise-950">
                  {t('restaurant_menu.menu_title')}
                </h2>
                <div className="h-1.5 w-16 bg-turquoise-700 mx-auto rounded-full" />
              </div>

              {/* Menu Categories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
                {menuCategories.map((cat, i) => (
                  <div key={i} className="space-y-6 bg-sand-50/40 p-6 sm:p-8 rounded-3xl border border-sand-200/70">
                    <h3 className="text-xl font-black font-serif text-turquoise-950 border-b border-sand-300/60 pb-3 flex items-center justify-between">
                      <span>{cat.category}</span>
                    </h3>

                    <div className="space-y-5">
                      {cat.items.map((item, j) => (
                        <div key={j} className="group space-y-1.5 p-3.5 hover:bg-white rounded-2xl transition-all border border-transparent hover:border-sand-200 shadow-none hover:shadow-sm">
                          <div className="flex justify-between items-baseline gap-3">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-extrabold text-turquoise-950 text-base group-hover:text-turquoise-700 transition-colors">
                                {item.name}
                              </h4>
                              {item.badge && (
                                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-md">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <span className="text-base font-black text-turquoise-900 shrink-0">{item.price}</span>
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

              {/* Pool & Day Pass Cross-Sell Banner */}
              <div className="bg-gradient-to-r from-turquoise-900 via-turquoise-950 to-mahana-dark p-6 sm:p-10 rounded-[32px] border border-turquoise-800/40 text-center max-w-3xl mx-auto space-y-5 text-white shadow-lg">
                <div className="inline-flex p-3 bg-white/10 rounded-2xl text-amber-400">
                  <Pizza className="h-7 w-7" />
                </div>
                <h3 className="font-extrabold text-white text-xl sm:text-2xl font-serif">
                  {language === 'es' ? '¿Quieres disfrutar de la piscina mientras comes?' : 'Want to enjoy the pool while dining?'}
                </h3>
                <p className="text-xs sm:text-sm text-sand-100/85 max-w-xl mx-auto leading-relaxed">
                  {language === 'es'
                    ? 'Con nuestro Pasadía con Todo Incluido ($38.50) obtienes un almuerzo gourmet a la carta, open bar nacional y snacks ilimitados junto a nuestras 3 piscinas tropicales de 9:00 AM a 5:00 PM.'
                    : 'With our All-Inclusive Day Pass ($38.50), enjoy an a-la-carte gourmet lunch, national open bar, and unlimited poolside snacks by our 3 tropical pools from 9:00 AM to 5:00 PM.'}
                </p>
                <div className="pt-2">
                  <button 
                    onClick={() => navigate('/pasadias/todo-incluido')}
                    className="px-7 py-3.5 bg-turquoise-600 hover:bg-turquoise-500 text-white rounded-xl font-bold inline-flex items-center space-x-2 transition-all shadow-md hover:scale-[1.02] active:scale-[0.99] text-sm"
                  >
                    <span>{language === 'es' ? 'Ver Detalles del Pasadía' : 'View Day Pass Details'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 4. Menu Image Lightbox Modal Overlay (Root level, strictly outside transforms) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-md flex flex-col justify-center items-center p-4">
          <div className="relative max-w-4xl max-h-[85vh] w-full overflow-hidden rounded-2xl border border-white/20 shadow-2xl bg-white p-3 sm:p-4 flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-sand-200">
              <span className="font-bold text-turquoise-950 text-sm sm:text-base">
                {language === 'es' ? 'Menú Casa Mahana · Restaurante & Bar' : 'Casa Mahana Menu · Restaurant & Bar'}
              </span>
              <div className="flex items-center space-x-2">
                <a 
                  href="/CASA MAHANA MENU.pdf" 
                  download="Menu-Casa-Mahana.pdf"
                  className="p-2 bg-sand-100 hover:bg-sand-200 text-turquoise-900 rounded-full transition-colors flex items-center space-x-1"
                  title="Descargar PDF"
                >
                  <Download className="h-4 w-4" />
                </a>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 bg-sand-100 hover:bg-rose-100 text-mahana-dark hover:text-rose-700 rounded-full transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="overflow-auto flex-1 py-2 flex items-center justify-center">
              <img 
                src="/images/restaurant-menu-sheet.jpg?v=2" 
                alt="Casa Mahana printed menu" 
                className="max-h-[75vh] w-auto object-contain mx-auto rounded" 
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantePublico;
