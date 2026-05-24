import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useMedia } from '../context/MediaContext';
import { Utensils } from 'lucide-react';

export const Restaurant: React.FC = () => {
  const { t } = useLanguage();
  const { media } = useMedia();

  const dishes = [
    {
      title: t('restaurant.pizzas_title'),
      desc: t('restaurant.pizzas_desc'),
      img: media.rest_pizza,
      price: '$12 - $18'
    },
    {
      title: t('restaurant.seafood_title'),
      desc: t('restaurant.seafood_desc'),
      img: media.rest_seafood,
      price: '$14 - $22'
    },
    {
      title: t('restaurant.burgers_title'),
      desc: t('restaurant.burgers_desc'),
      img: media.rest_burger,
      price: '$10 - $15'
    }
  ];

  return (
    <section id="restaurante" className="py-20 bg-sand-50 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-sand-200/30 rounded-full blur-2xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-sm uppercase tracking-widest text-mahana-accent font-bold flex items-center justify-center gap-2">
            <Utensils className="h-4 w-4" />
            <span>{t('restaurant.title')}</span>
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-turquoise-950">
            {t('restaurant.subtitle')}
          </p>
          <div className="h-1.5 w-24 bg-mahana-accent mx-auto rounded-full" />
        </div>

        {/* Restaurant Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dishes.map((dish, idx) => (
            <Link 
              to="/restaurante"
              key={idx} 
              className="bg-white rounded-3xl overflow-hidden shadow-glass border border-sand-200/80 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 block cursor-pointer"
            >
              {/* Image Container with Zoom effect */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={dish.img} 
                  alt={dish.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-mahana-dark/85 backdrop-blur-xs text-sand-100 font-bold px-4 py-1.5 rounded-full text-xs shadow-md border border-white/10">
                  {dish.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-3">
                <h3 className="text-xl font-bold text-turquoise-950 group-hover:text-turquoise-750 transition-colors">
                  {dish.title}
                </h3>
                <p className="text-sm text-mahana-dark/75 leading-relaxed">
                  {dish.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
