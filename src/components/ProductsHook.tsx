import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useMedia } from '../context/MediaContext';
import { Bed, Sun, Utensils, Waves, ArrowRight } from 'lucide-react';

export const ProductsHook: React.FC = () => {
  const { language } = useLanguage();
  const { media } = useMedia();
  const navigate = useNavigate();

  const products = [
    {
      icon: <Bed className="w-6 h-6" />,
      title: language === 'es' ? 'Estadías' : 'Stays',
      subtitle: language === 'es' ? 'Mahana Experience & Todo Incluido' : 'Mahana Experience & All-Inclusive',
      desc: language === 'es'
        ? 'Habitaciones Doble, Estándar, Familiar y Camping rodeadas de naturaleza. Desayuno, piscina, WiFi y más desde $70/noche.'
        : 'Double, Standard, Family & Camping rooms surrounded by nature. Breakfast, pool, WiFi and more from $70/night.',
      gradient: 'from-turquoise-600 to-turquoise-800',
      bgImage: media.exp_stays,
      badge: language === 'es' ? 'Hospedaje' : 'Lodging',
      link: '/estadias',
      cta: language === 'es' ? 'Ver Hospedaje' : 'View Lodging',
      accent: 'bg-gradient-to-br from-turquoise-600 to-turquoise-800 text-white shadow-turquoise-200'
    },
    {
      icon: <Sun className="w-6 h-6" />,
      title: language === 'es' ? 'Pasadías' : 'Day Passes',
      subtitle: language === 'es' ? 'Pool Day & Pasadía Todo Incluido' : 'Pool Day & All-Inclusive Day Pass',
      desc: language === 'es'
        ? 'Un día completo de relajación en piscina con almuerzo, bebidas y buena vibra. Desde $35 por persona.'
        : 'A full day of pool relaxation with lunch, drinks, and great vibes. From $35 per person.',
      gradient: 'from-amber-500 to-orange-600',
      bgImage: media.exp_daypass,
      badge: language === 'es' ? 'Día de Sol' : 'Day Use',
      link: '/pasadias',
      cta: language === 'es' ? 'Ver Pasadías' : 'View Day Passes',
      accent: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-orange-200'
    },
    {
      icon: <Utensils className="w-6 h-6" />,
      title: language === 'es' ? 'Restaurante' : 'Restaurant',
      subtitle: language === 'es' ? 'Abierto al público' : 'Open to the public',
      desc: language === 'es'
        ? 'Pizza a la leña, mariscos frescos, hamburguesas gourmet y cócteles tropicales. No necesitas estar hospedado.'
        : 'Wood-fired pizza, fresh seafood, gourmet burgers & tropical cocktails. No reservation needed.',
      gradient: 'from-rose-500 to-red-600',
      bgImage: media.exp_restaurant,
      badge: language === 'es' ? 'Horno de Leña' : 'Wood-Fired',
      link: '/restaurante',
      cta: language === 'es' ? 'Ver Menú' : 'View Menu',
      accent: 'bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-rose-200'
    },
    {
      icon: <Waves className="w-6 h-6" />,
      title: 'Surf Shack',
      subtitle: language === 'es' ? 'Club de Playa · Playa Caracol' : 'Beach Club · Playa Caracol',
      desc: language === 'es'
        ? 'Nuestro club de playa con clases de surf, alquiler de tablas y el mejor vibe costero. Conectado con la Academia Nacional de Surf.'
        : 'Our beach club with surf lessons, board rentals, and the best coastal vibe. Connected with the National Surf Academy.',
      gradient: 'from-cyan-500 to-blue-600',
      bgImage: media.exp_surf,
      badge: language === 'es' ? 'Surf & Vibe' : 'Surf & Vibe',
      link: '/surf-shack',
      cta: language === 'es' ? 'Ver Surf Shack' : 'View Surf Shack',
      accent: 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-cyan-200'
    }
  ];

  return (
    <section className="py-24 bg-mahana-light relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-turquoise-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-sand-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-sm uppercase tracking-widest text-turquoise-700 font-extrabold">
            {language === 'es' ? 'Nuestras Experiencias' : 'Our Experiences'}
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-turquoise-950 tracking-tight leading-tight">
            {language === 'es' ? '¿Qué quieres disfrutar hoy?' : 'What do you want to enjoy today?'}
          </p>
          <div className="h-1.5 w-24 bg-turquoise-700 mx-auto rounded-full" />
          <p className="text-base text-turquoise-900/60 max-w-xl mx-auto">
            {language === 'es'
              ? 'Desde una estadía con todo incluido hasta un pasadía de piscina. Descubre todo lo que Casa Mahana tiene para ti.'
              : 'From an all-inclusive stay to a pool day pass. Discover everything Casa Mahana has for you.'}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, idx) => (
            <div
              key={idx}
              onClick={() => navigate(product.link)}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-premium hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col h-[480px] border border-sand-100"
            >
              {/* Premium image header */}
              <div className="relative h-[200px] w-full overflow-hidden">
                <img
                  src={product.bgImage}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-[4000ms] ease-out group-hover:scale-110"
                />
                {/* Visual fade-out at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/25" />
                
                {/* Top Corner Floating Badge */}
                <div className="absolute top-4 left-4">
                  <span className="backdrop-blur-md bg-white/95 border border-white/20 text-turquoise-950 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase shadow-sm">
                    {product.badge}
                  </span>
                </div>
              </div>

              {/* Bottom Contents Container */}
              <div className="p-6 flex-grow flex flex-col justify-between bg-white relative">
                {/* Circle Floating Icon overlaps the image partition */}
                <div className={`absolute -top-7 right-6 inline-flex p-3 rounded-2xl ${product.accent} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  {product.icon}
                </div>

                {/* Text Layout */}
                <div className="space-y-2 pt-2">
                  <h3 className="text-xl font-bold text-turquoise-950 group-hover:text-turquoise-700 transition-colors duration-300">
                    {product.title}
                  </h3>
                  <p className="text-[10px] text-turquoise-600 font-bold uppercase tracking-widest">
                    {product.subtitle}
                  </p>
                  <p className="text-sm text-mahana-dark/70 leading-relaxed line-clamp-3">
                    {product.desc}
                  </p>
                </div>

                {/* CTA Line Action */}
                <div className="flex items-center gap-2 text-sm font-bold text-turquoise-700 group-hover:text-turquoise-950 transition-colors pt-4 border-t border-sand-100 mt-4">
                  <span>{product.cta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
