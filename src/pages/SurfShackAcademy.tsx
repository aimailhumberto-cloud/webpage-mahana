import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Check, ArrowRight, Compass, ShieldCheck, Heart, Waves, Sunset, Sparkles, MapPin } from 'lucide-react';

export const SurfShackAcademy: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const shopItems = [
    {
      title: language === 'es' ? 'Alquiler de Tablas' : 'Surfboard Rentals',
      desc: language === 'es'
        ? 'Alquila por día o por horas de nuestro rack completo. Tenemos Shortboards, Funboards, Longboards y Bodyboards. ¡Cambia de tabla cuando quieras según las condiciones!'
        : 'Rent by the day or hour from our full quiver. We have Shortboards, Funboards, Longboards, and Bodyboards. Swap your board anytime tide conditions change!',
      price: language === 'es' ? '$20 / Día completo' : '$20 / Full Day',
      img: 'https://images.unsplash.com/photo-1531722569936-825d3dd91b15?auto=format&fit=crop&w=800&q=80',
      tag: language === 'es' ? 'Quiver Completo' : 'Full Quiver'
    },
    {
      title: language === 'es' ? 'Accesorios de Tienda' : 'Shop Accessories',
      desc: language === 'es'
        ? 'Encuentra rashguards oficiales, parafina ecológica, leashes, quillas, gorras y bloqueador solar amigable con los arrecifes justo en la playa.'
        : 'Find official rashguards, eco-friendly wax, leashes, fins, surf caps, and reef-safe sunscreen directly on the beach.',
      price: language === 'es' ? 'Desde $5' : 'From $5',
      img: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80',
      tag: language === 'es' ? 'Accesorios' : 'Accessories'
    }
  ];

  const academyLessons = [
    {
      title: language === 'es' ? 'Clase de Surf (Principiantes)' : 'Surf Lessons (Beginners)',
      desc: language === 'es'
        ? 'Clase introductoria de 90 minutos. Teoría básica en la arena, prácticas de pop-up, remada y seguridad, e instructor personalizado en el agua.'
        : 'Introductory 90-minute class. Basic sand theory, pop-up and paddling practice, water safety, and dedicated instructor in the water.',
      price: language === 'es' ? '$35 / Clase' : '$35 / Lesson',
      img: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80',
      tag: language === 'es' ? '¡Reserva ya!' : 'Book Now!'
    },
    {
      title: language === 'es' ? 'Surf Camp Kids' : 'Surf Camp Kids',
      desc: language === 'es'
        ? 'Un día completo de diversión playera, dinámicas y clases de surf adaptadas para niños y jóvenes de 6 años en adelante con instructores especializados.'
        : 'A full day of beach fun, games, and surf lessons tailored for kids and youth aged 6 and up with specialized instructors.',
      price: language === 'es' ? '$300 / 5 Clases' : '$300 / 5 Lessons',
      img: '/images/surf-camp-kids-v2.jpg',
      tag: language === 'es' ? '6 años en adelante' : '6 Years & Up'
    }
  ];

  return (
    <div className="bg-mahana-light min-h-[90vh] font-sans pb-24 animate-fade-in-up">
      {/* 1. Beach Club Section - Hero & Main Pivot */}
      <section className="relative h-[500px] w-full overflow-hidden">
        <img 
          src="/images/surf-shack-hero-v2.jpg" 
          alt="Surf Shack Beach Club Playa Caracol" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mahana-dark/95 via-mahana-dark/50 to-transparent" />
        
        <div className="absolute bottom-12 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="px-3.5 py-1.5 bg-turquoise-700/80 backdrop-blur-xs text-sand-100 text-xs font-bold uppercase tracking-wider rounded-xl border border-turquoise-500/20">
            {language === 'es' ? 'Club de Playa Exclusivo' : 'Exclusive Beach Club'}
          </span>
          <h1 className="text-3xl sm:text-6xl font-black text-white tracking-tight">
            Surf Shack Beach Club
          </h1>
          <p className="text-sand-100/90 text-sm sm:text-lg max-w-3xl font-medium leading-relaxed">
            {language === 'es'
              ? 'Nuestro exclusivo club de playa en Playa Caracol, Chame. Disfruta de la arena fina, cómodos camastros, cócteles tropicales frente al mar y la mejor vibra costera del Pacífico panameño. ¡Acceso incluido para todos los huéspedes de Casa Mahana!'
              : 'Our exclusive beach club in Playa Caracol, Chame. Enjoy soft sand, cozy sun loungers, oceanfront tropical cocktails, and the best coastal vibe on the Panamanian Pacific. Access included for all Casa Mahana guests!'}
          </p>
          <div className="flex items-center space-x-2 text-xs font-extrabold text-amber-400">
            <MapPin className="h-4.5 w-4.5 animate-bounce" />
            <span>Playa Caracol, Punta Chame, Panamá</span>
          </div>
        </div>
      </section>

      {/* Beach Club Amenities Checklist */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-[32px] border border-sand-200/80 p-8 shadow-premium grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-turquoise-50 text-turquoise-700 rounded-2xl">
              <Sunset className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-extrabold text-turquoise-950 text-sm">{language === 'es' ? 'Acceso Exclusivo' : 'Exclusive Day-Access'}</h4>
              <p className="text-xs text-mahana-dark/70 leading-relaxed">
                {language === 'es' ? 'Camastros, sombrillas y áreas lounge reservadas sin coste adicional para ti.' : 'Loungers, umbrellas, and cozy lounge spaces reserved at no extra cost for you.'}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-amber-50 text-amber-700 rounded-2xl">
              <Sparkles className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-extrabold text-turquoise-950 text-sm">{language === 'es' ? 'Coctelería & Playa' : 'Beach Bar Drinks'}</h4>
              <p className="text-xs text-mahana-dark/70 leading-relaxed">
                {language === 'es' ? 'Bebidas heladas y el mejor ambiente musical junto a las olas del Pacífico.' : 'Cold beers, customized cocktails, and the best musical vibe right by the waves.'}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-orange-50 text-orange-700 rounded-2xl">
              <Waves className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-extrabold text-turquoise-950 text-sm">{language === 'es' ? 'Surf a la Puerta' : 'Surfside Location'}</h4>
              <p className="text-xs text-mahana-dark/70 leading-relaxed">
                {language === 'es' ? 'La sede oficial de nuestra escuela de surf y tienda se encuentra justo aquí.' : 'The official headquarters of our surf shop and surf school is located right on site.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 space-y-24">
        
        {/* 2. Surf Shop & Rentals Section */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-turquoise-700 font-extrabold block">
              {language === 'es' ? 'Equipamiento & Racks' : 'Gear & Racks'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-turquoise-950">
              Surf Shack
            </h2>
            <div className="h-1.5 w-20 bg-turquoise-700 mx-auto rounded-full" />
            <p className="text-sm text-mahana-dark/70 leading-relaxed">
              {language === 'es'
                ? '¿Vienes a surfear de forma independiente o te falta equipo? Nuestra tienda cuenta con el rack de alquiler más completo y los mejores accesorios de Chame.'
                : 'Coming to surf on your own or missing some gear? Our physical shop features the most comprehensive board rental quiver and surf essentials in Chame.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {shopItems.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-[32px] overflow-hidden border border-sand-200 shadow-glass hover:shadow-premium transition-all duration-300 grid grid-cols-1 sm:grid-cols-5"
              >
                <div className="relative h-48 sm:h-full sm:col-span-2 overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-turquoise-900/90 text-sand-100 text-[10px] font-bold uppercase tracking-wider rounded-md">
                    {item.tag}
                  </span>
                </div>
                <div className="p-8 sm:col-span-3 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline gap-2">
                      <h3 className="font-extrabold text-turquoise-950 text-lg leading-tight">{item.title}</h3>
                      <span className="text-xs font-black text-turquoise-900 shrink-0">{item.price}</span>
                    </div>
                    <p className="text-xs text-mahana-dark/70 leading-relaxed">{item.desc}</p>
                  </div>
                  <button 
                    onClick={() => navigate('/reservar')}
                    className="w-full py-2.5 bg-turquoise-750 hover:bg-turquoise-900 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center space-x-1.5"
                  >
                    <span>{language === 'es' ? 'Alquilar / Consultar' : 'Rent / Inquire'}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Academia Nacional de Surf Section */}
        <section className="space-y-12">
          <div className="bg-gradient-to-r from-turquoise-900 to-turquoise-950 rounded-[40px] p-8 md:p-12 shadow-premium text-white border border-turquoise-800/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-turquoise-700/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-turquoise-300 text-[10px] uppercase tracking-widest font-black">
                  {language === 'es' ? 'Aprende de los Expertos' : 'Learn from the Pro\'s'}
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <img 
                    src="/images/logo-ans.png" 
                    alt="ANS Logo" 
                    className="h-16 w-16 object-contain bg-white/95 p-2 rounded-2xl shadow-md border border-white/10 shrink-0 self-start sm:self-center" 
                  />
                  <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                    {language === 'es' ? 'Academia Nacional de Surf' : 'National Surf Academy'}
                  </h2>
                </div>
                <p className="text-turquoise-100/90 text-sm sm:text-base leading-relaxed">
                  {language === 'es'
                    ? '¿Quieres aprender a pararte en tu primera ola o perfeccionar tu técnica de remada? En nuestra escuela, certificada oficialmente, enseñamos a surfear en un entorno 100% seguro. Playa Caracol ofrece las condiciones idóneas del Pacífico panameño: olas consistentes y suaves sobre fondo plano de pura arena, sin piedras.'
                    : 'Do you want to learn to stand up on your first wave or perfect your paddling technique? In our officially certified school, we teach surfing in a 100% safe environment. Playa Caracol offers the ideal conditions of the Panamanian Pacific: consistent and gentle waves breaking over a flat sandy bottom, with absolutely no rocks.'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-white/95">
                  <div className="flex items-center space-x-2.5">
                    <Check className="h-4.5 w-4.5 text-amber-400 shrink-0" />
                    <span>{language === 'es' ? 'Instructores locales expertos' : 'Expert local coaches'}</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <Check className="h-4.5 w-4.5 text-amber-400 shrink-0" />
                    <span>{language === 'es' ? 'Tablas blandas seguras' : 'Softboards & safe gear'}</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <Check className="h-4.5 w-4.5 text-amber-400 shrink-0" />
                    <span>{language === 'es' ? 'Para todas las edades (6+)' : 'For all ages (6+)'}</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <Check className="h-4.5 w-4.5 text-amber-400 shrink-0" />
                    <span>{language === 'es' ? 'Fotografías incluidas' : 'Photos and video included'}</span>
                  </div>
                </div>
              </div>
              <div className="relative h-80 rounded-3xl overflow-hidden shadow-xl border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80" 
                  alt="Surf Coaching" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Lessons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {academyLessons.map((lesson, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-[32px] overflow-hidden border border-sand-200 shadow-glass hover:shadow-premium transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <img src={lesson.img} alt={lesson.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute top-4 left-4 px-3.5 py-1 bg-amber-600/90 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-md border border-amber-500/20">
                      {lesson.tag}
                    </span>
                    <span className="absolute bottom-4 right-4 bg-white/95 px-4 py-1.5 rounded-2xl text-xs font-black text-turquoise-950 shadow-md">
                      {lesson.price}
                    </span>
                  </div>
                  <div className="p-8 space-y-3">
                    <h3 className="font-extrabold text-turquoise-950 text-xl leading-tight">{lesson.title}</h3>
                    <p className="text-xs text-mahana-dark/70 leading-relaxed">{lesson.desc}</p>
                  </div>
                </div>
                <div className="px-8 pb-8 pt-2">
                  <button 
                    onClick={() => navigate('/reservar')}
                    className="w-full py-3.5 bg-turquoise-700 hover:bg-turquoise-900 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center space-x-1.5"
                  >
                    <span>{language === 'es' ? 'Reservar Clase de Surf' : 'Book Surf Lesson'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default SurfShackAcademy;
