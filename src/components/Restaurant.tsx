import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useMedia } from '../context/MediaContext';
import { Utensils, Clock, MapPin, Sparkles, X, BookOpen, ArrowRight, Flame, Wine, Compass } from 'lucide-react';

export const Restaurant: React.FC = () => {
  const { t, language } = useLanguage();
  const { media } = useMedia();
  const [menuModalOpen, setMenuModalOpen] = useState(false);

  const dishes = [
    {
      title: t('restaurant.pizzas_title'),
      desc: t('restaurant.pizzas_desc'),
      img: media.rest_pizza || '/images/food-pizza-oven.jpg',
      price: '$12 - $18',
      tag: language === 'es' ? 'Horno de Piedra' : 'Stone Oven'
    },
    {
      title: t('restaurant.seafood_title'),
      desc: t('restaurant.seafood_desc'),
      img: media.rest_seafood || '/images/food-fish-patacones.jpg',
      price: '$14 - $22',
      tag: language === 'es' ? 'Pesca del Día' : 'Daily Catch'
    },
    {
      title: t('restaurant.burgers_title'),
      desc: t('restaurant.burgers_desc'),
      img: media.rest_burger || '/images/food-bacon-burger.jpg',
      price: '$10 - $15',
      tag: language === 'es' ? 'Carne Angus' : 'Angus Beef'
    },
    {
      title: language === 'es' ? 'Coctelería Tropical & Bar' : 'Tropical Mixology & Bar',
      desc: language === 'es'
        ? 'Piñas coladas en fruta natural, mojitos de maracuyá, margaritas refrescantes y cervezas heladas para disfrutar junto al deck de la piscina.'
        : 'Fresh pineapple coladas, passionfruit mojitos, artisanal margaritas, and ice-cold beers to enjoy poolside on the sun deck.',
      img: '/images/food-cocktail.jpg',
      price: '$7 - $12',
      tag: language === 'es' ? 'Bar de Piscina' : 'Poolside Bar'
    }
  ];

  return (
    <section id="restaurante" className="band-full-bleed py-20 lg:py-28 bg-sand-50 relative overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-sand-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-turquoise-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="container-fluid relative z-10 font-sans">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-mahana-accent/10 border border-mahana-accent/20 rounded-full text-mahana-accent text-xs uppercase tracking-widest font-extrabold">
            <Flame className="w-3.5 h-3.5" />
            <span>{language === 'es' ? 'Restaurante a la Leña & Bar Tropical' : 'Wood-Fired Restaurant & Tropical Bar'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-turquoise-950 tracking-tight leading-[1.12]">
            <span>{t('restaurant.title')}</span>
          </h2>

          <div className="h-1.5 w-24 bg-mahana-accent mx-auto rounded-full" />

          <p className="text-lg sm:text-xl font-medium text-turquoise-800">
            {t('restaurant.subtitle')}
          </p>

          <p className="text-base sm:text-lg text-mahana-dark/75 max-w-2xl mx-auto leading-relaxed">
            {language === 'es'
              ? 'Gastronomía artesanal abierta al público. No necesitas hospedarte para deleitarte con nuestro horno de leña. Disfruta de un almuerzo o cena inolvidable frente a la piscina con la mejor cocina de autor de Chame.'
              : 'Artisanal dining open to the public. You do not need to be an overnight guest to enjoy our wood-fired oven. Savor an unforgettable lunch or dinner beside the pool with the finest artisanal cuisine in Chame.'}
          </p>
        </div>

        {/* Public Dining Hours & Highlights Feature Bar */}
        <div className="bg-white rounded-[32px] border border-sand-200 shadow-premium p-6 sm:p-8 mb-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-700 shrink-0 mt-0.5">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-mahana-dark/50 block">
                {language === 'es' ? 'Horario de Atención' : 'Service Hours'}
              </span>
              <p className="text-sm font-bold text-turquoise-950 mt-0.5">
                {language === 'es' ? 'Lun - Dom: 8:00 AM - 9:30 PM' : 'Mon - Sun: 8:00 AM - 9:30 PM'}
              </p>
              <p className="text-xs text-mahana-dark/60">
                {language === 'es' ? 'Desayuno, Almuerzo y Cena' : 'Breakfast, Lunch & Dinner'}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-2xl bg-rose-500/10 text-rose-700 shrink-0 mt-0.5">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-mahana-dark/50 block">
                {language === 'es' ? 'Especialidad de la Casa' : 'House Specialty'}
              </span>
              <p className="text-sm font-bold text-turquoise-950 mt-0.5">
                {language === 'es' ? 'Horno de Leña & Pescado' : 'Wood-Fired Pizza & Fish'}
              </p>
              <p className="text-xs text-mahana-dark/60">
                {language === 'es' ? 'Masas madre y pesca fresca' : 'Sourdough & fresh catch'}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-2xl bg-turquoise-500/10 text-turquoise-700 shrink-0 mt-0.5">
              <Wine className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-mahana-dark/50 block">
                {language === 'es' ? 'Bar & Bebidas' : 'Bar & Cocktails'}
              </span>
              <p className="text-sm font-bold text-turquoise-950 mt-0.5">
                {language === 'es' ? 'Mixología Tropical de Autor' : 'Tropical Mixology & Beers'}
              </p>
              <p className="text-xs text-mahana-dark/60">
                {language === 'es' ? 'Servicio directo a camastros' : 'Poolside lounger service'}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 justify-center">
            <button
              onClick={() => setMenuModalOpen(true)}
              className="w-full inline-flex items-center justify-center space-x-2 py-3 px-5 rounded-2xl bg-mahana-accent hover:bg-amber-700 text-white font-extrabold text-xs transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              <BookOpen className="w-4 h-4" />
              <span>{language === 'es' ? 'Ver Carta Digital' : 'View Digital Menu'}</span>
            </button>
            <Link
              to="/restaurante"
              className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-5 rounded-2xl bg-sand-100 hover:bg-sand-200/80 text-turquoise-950 font-bold text-xs transition-colors"
            >
              <span>{language === 'es' ? 'Página del Restaurante' : 'Restaurant Page'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Panoramic Culinary Story Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {dishes.map((dish, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[32px] overflow-hidden shadow-premium border border-sand-200/80 hover:shadow-2xl transition-all duration-500 group hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Image Window */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={dish.img}
                  alt={dish.title}
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[3000ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Floating Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="backdrop-blur-md bg-white/95 text-turquoise-950 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-sm">
                    {dish.tag}
                  </span>
                </div>

                {/* Floating Price */}
                <div className="absolute top-4 right-4 z-10 bg-mahana-dark/90 backdrop-blur-md text-sand-100 font-extrabold px-3.5 py-1.5 rounded-full text-xs shadow-md border border-white/10">
                  {dish.price}
                </div>

                {/* Bottom title inside photo */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <h3 className="text-xl font-serif font-bold text-sand-50 drop-shadow-md">
                    {dish.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-mahana-dark/75 leading-relaxed">
                  {dish.desc}
                </p>

                <Link
                  to="/restaurante"
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-turquoise-800 hover:text-turquoise-950 transition-colors pt-3 border-t border-sand-100"
                >
                  <span>{language === 'es' ? 'Ver en el Menú' : 'Explore on Menu'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Digital Menu Modal */}
      {menuModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setMenuModalOpen(false)}
        >
          <div
            className="bg-white rounded-[32px] max-w-3xl w-full max-h-[88vh] overflow-y-auto shadow-2xl border border-sand-200 p-6 sm:p-8 space-y-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-sand-200">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-mahana-accent text-xs font-extrabold uppercase tracking-wider">
                  <Flame className="w-4 h-4" />
                  <span>{language === 'es' ? 'Casa Mahana Gourmet' : 'Casa Mahana Gourmet'}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-turquoise-950">
                  {language === 'es' ? 'Carta Digital del Restaurante' : 'Restaurant Digital Menu'}
                </h3>
              </div>
              <button
                onClick={() => setMenuModalOpen(false)}
                className="p-2.5 rounded-full bg-sand-100 hover:bg-sand-200 text-turquoise-950 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Sections */}
            <div className="space-y-6">
              {/* Category 1: Pizzas */}
              <div className="space-y-3">
                <h4 className="text-sm font-extrabold uppercase tracking-widest text-turquoise-800 flex items-center gap-2">
                  <span>🍕 {language === 'es' ? 'Pizzas al Horno de Leña' : 'Wood-Fired Pizzas'}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 bg-sand-50/80 rounded-2xl border border-sand-200/60">
                    <div className="flex justify-between font-bold text-turquoise-950 text-sm">
                      <span>Margherita Tradizionale</span>
                      <span className="text-mahana-accent">$12</span>
                    </div>
                    <p className="text-xs text-mahana-dark/70 mt-1">Salsa de tomate casera, mozzarella fundida y albahaca fresca del huerto.</p>
                  </div>
                  <div className="p-3.5 bg-sand-50/80 rounded-2xl border border-sand-200/60">
                    <div className="flex justify-between font-bold text-turquoise-950 text-sm">
                      <span>Pepperoni & Miel Picante</span>
                      <span className="text-mahana-accent">$14</span>
                    </div>
                    <p className="text-xs text-mahana-dark/70 mt-1">Pepperoni crocante, mozzarella artesanal y toque de miel con chile.</p>
                  </div>
                  <div className="p-3.5 bg-sand-50/80 rounded-2xl border border-sand-200/60">
                    <div className="flex justify-between font-bold text-turquoise-950 text-sm">
                      <span>Mahana Especial de la Casa</span>
                      <span className="text-mahana-accent">$18</span>
                    </div>
                    <p className="text-xs text-mahana-dark/70 mt-1">Jamón serrano, rúcula fresca, parmesano reggiano y aceite de trufa blanca.</p>
                  </div>
                  <div className="p-3.5 bg-sand-50/80 rounded-2xl border border-sand-200/60">
                    <div className="flex justify-between font-bold text-turquoise-950 text-sm">
                      <span>Cuatro Quesos Gourmet</span>
                      <span className="text-mahana-accent">$15</span>
                    </div>
                    <p className="text-xs text-mahana-dark/70 mt-1">Mozzarella, gorgonzola cremoso, provolone ahumado y parmesano madurado.</p>
                  </div>
                </div>
              </div>

              {/* Category 2: Seafood */}
              <div className="space-y-3">
                <h4 className="text-sm font-extrabold uppercase tracking-widest text-turquoise-800 flex items-center gap-2">
                  <span>🐟 {language === 'es' ? 'Pesca del Pacífico & Platos Fuertes' : 'Pacific Catch & Main Entrees'}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 bg-sand-50/80 rounded-2xl border border-sand-200/60">
                    <div className="flex justify-between font-bold text-turquoise-950 text-sm">
                      <span>Pargo Rojo Frito Entero</span>
                      <span className="text-mahana-accent">$18</span>
                    </div>
                    <p className="text-xs text-mahana-dark/70 mt-1">Pargo entero crujiente con patacones dorados, ensalada de la casa y limón criollo.</p>
                  </div>
                  <div className="p-3.5 bg-sand-50/80 rounded-2xl border border-sand-200/60">
                    <div className="flex justify-between font-bold text-turquoise-950 text-sm">
                      <span>Corvina a la Plancha o Ajillo</span>
                      <span className="text-mahana-accent">$16</span>
                    </div>
                    <p className="text-xs text-mahana-dark/70 mt-1">Filete fresco a la plancha bañado en salsa de mantequilla de ajo y arroz con coco.</p>
                  </div>
                  <div className="p-3.5 bg-sand-50/80 rounded-2xl border border-sand-200/60">
                    <div className="flex justify-between font-bold text-turquoise-950 text-sm">
                      <span>Ceviche Tropical de Corvina</span>
                      <span className="text-mahana-accent">$12</span>
                    </div>
                    <p className="text-xs text-mahana-dark/70 mt-1">Marinado en cítricos frescos con maracuyá, cebolla morada y chips de plátano.</p>
                  </div>
                  <div className="p-3.5 bg-sand-50/80 rounded-2xl border border-sand-200/60">
                    <div className="flex justify-between font-bold text-turquoise-950 text-sm">
                      <span>Monster Angus Burger</span>
                      <span className="text-mahana-accent">$14</span>
                    </div>
                    <p className="text-xs text-mahana-dark/70 mt-1">Carne Angus 200g, cheddar madurado, tocineta crocante y papas rústicas con paprika.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-sand-200">
              <Link
                to="/restaurante"
                onClick={() => setMenuModalOpen(false)}
                className="flex-1 py-3.5 px-6 rounded-2xl font-extrabold flex items-center justify-center space-x-2 bg-turquoise-750 hover:bg-turquoise-800 text-white text-xs sm:text-sm transition-all shadow-md"
              >
                <span>{language === 'es' ? 'Ver Menú Completo & Horarios' : 'View Full Menu & Hours'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setMenuModalOpen(false)}
                className="py-3.5 px-6 rounded-2xl font-bold bg-sand-100 hover:bg-sand-200 text-turquoise-950 text-xs sm:text-sm transition-colors"
              >
                {language === 'es' ? 'Cerrar Carta' : 'Close Menu'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Restaurant;

