import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Check, ArrowRight, ShieldCheck, Waves, Sunset, Sparkles, MapPin, Compass, Phone } from 'lucide-react';
import { SEO } from '../components/SEO';
import { trackBookingIntent, trackWhatsAppClick } from '../utils/analytics';

export const SurfShackAcademy: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const handleBooking = (plan: string = 'surf_lesson', category: string = 'Surf') => {
    trackBookingIntent({ planCode: plan, category, source: '/surf-shack' });
    navigate(`/reservar?plan=${plan}&category=${encodeURIComponent(category)}`);
  };

  const handleWhatsApp = (detail: string = 'Información General') => {
    trackWhatsAppClick('Surf Shack', detail);
    const msg = language === 'es'
      ? `¡Hola! Me gustaría información sobre las clases de surf y el club de playa en Surf Shack (Playa Caracol). Consulta: ${detail}.`
      : `Hello! I would like information about surf lessons and the beach club at Surf Shack (Playa Caracol). Inquiry: ${detail}.`;
    window.open(`https://wa.me/50769884566?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const shopItems = [
    {
      title: language === 'es' ? 'Alquiler de Tablas' : 'Surfboard Rentals',
      desc: language === 'es'
        ? 'Alquila por día o por horas de nuestro rack completo. Tenemos Shortboards, Funboards, Longboards y Bodyboards. ¡Cambia de tabla cuando quieras según las condiciones!'
        : 'Rent by the day or hour from our full quiver. We have Shortboards, Funboards, Longboards, and Bodyboards. Swap your board anytime tide conditions change!',
      price: language === 'es' ? '$20 / Día completo' : '$20 / Full Day',
      img: '/images/surf-shack-swing.jpg',
      tag: language === 'es' ? 'Quiver Completo' : 'Full Quiver'
    },
    {
      title: language === 'es' ? 'Accesorios de Tienda' : 'Shop Accessories',
      desc: language === 'es'
        ? 'Encuentra rashguards oficiales, parafina ecológica, leashes, quillas, gorras y bloqueador solar amigable con los arrecifes justo en la playa.'
        : 'Find official rashguards, eco-friendly wax, leashes, fins, surf caps, and reef-safe sunscreen directly on the beach.',
      price: language === 'es' ? 'Desde $5' : 'From $5',
      img: '/images/ans-surf-underwater.png',
      tag: language === 'es' ? 'Accesorios' : 'Accessories'
    }
  ];

  const academyLessons = [
    {
      id: 'surf-beginners',
      title: language === 'es' ? 'Clase de Surf (Principiantes)' : 'Surf Lessons (Beginners)',
      desc: language === 'es'
        ? 'Clase introductoria de 90 minutos. Teoría básica en la arena, prácticas de pop-up, remada y seguridad, e instructor personalizado en el agua.'
        : 'Introductory 90-minute class. Basic sand theory, pop-up and paddling practice, water safety, and dedicated instructor in the water.',
      price: language === 'es' ? '$35 / Clase' : '$35 / Lesson',
      img: '/images/ans-surf-underwater.png',
      tag: language === 'es' ? '¡Reserva ya!' : 'Book Now!'
    },
    {
      id: 'surf-kids',
      title: language === 'es' ? 'Surf Camp Kids' : 'Surf Camp Kids',
      desc: language === 'es'
        ? 'Un día completo de diversión playera, dinámicas y clases de surf adaptadas para niños y jóvenes de 6 años en adelante con instructores especializados.'
        : 'A full day of beach fun, games, and surf lessons tailored for kids and youth aged 6 and up with specialized instructors.',
      price: language === 'es' ? '$300 / 5 Clases' : '$300 / 5 Lessons',
      img: '/images/surf-camp-kids-v2.jpg',
      tag: language === 'es' ? '6 años en adelante' : '6 Years & Up'
    },
    {
      id: 'surf-coaching',
      title: language === 'es' ? 'Coaching Intermedio & Avanzado' : 'Intermediate & Advanced Coaching',
      desc: language === 'es'
        ? 'Perfecciona tu lectura de olas, velocidad en la pared, posicionamiento en el pico y maniobras con análisis técnico en video.'
        : 'Sharpen your wave reading, rail-to-rail transitions, peak positioning, and maneuvers with technical video analysis.',
      price: language === 'es' ? '$50 / Sesión' : '$50 / Session',
      img: '/images/surf-shack-beach-club-drone.jpg',
      tag: language === 'es' ? 'Nivel 2 & 3' : 'Level 2 & 3'
    }
  ];

  return (
    <div className="min-h-screen bg-sand-50/60 font-sans pb-24">
      <SEO 
        titleEs="Surf Shack Beach Club & Academy — Casa Mahana"
        titleEn="Surf Shack Beach Club & Academy — Casa Mahana"
        descriptionEs="Visita nuestro club de playa en Playa Caracol, Chame. Ofrecemos clases de surf para todos los niveles, alquiler de tablas, cócteles y camastros frente al mar."
        descriptionEn="Visit our beach club in Playa Caracol, Chame. We offer surf lessons for all levels, surfboard rentals, cocktails, and oceanfront sun loungers."
        image="/images/surf-shack-hero-v2.jpg"
        path="/surf-shack"
        schemaType="TouristAttraction"
      />

      {/* 1. Full-Bleed Oceanfront Hero Banner */}
      <section className="band-full-bleed bg-mahana-dark text-white relative min-h-[520px] sm:min-h-[580px] flex items-end">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/surf-shack-hero-v2.jpg" 
            alt="Surf Shack Beach Club Playa Caracol" 
            className="w-full h-full object-cover filter brightness-90"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-mahana-dark via-mahana-dark/60 to-transparent" />
        </div>

        <div className="container-fluid relative z-10 py-16 sm:py-24 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-turquoise-700/90 backdrop-blur-xs text-sand-100 text-xs font-bold uppercase tracking-wider rounded-xl border border-turquoise-500/30">
            <Sparkles className="h-4 w-4 text-amber-300" />
            <span>{language === 'es' ? 'Club de Playa Exclusivo' : 'Exclusive Beach Club'}</span>
          </div>

          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-black font-serif text-white tracking-tight">
            Surf Shack Beach Club
          </h1>

          <p className="text-sand-100/90 text-sm sm:text-lg max-w-3xl font-medium leading-relaxed">
            {language === 'es'
              ? 'Nuestro exclusivo club de playa en Playa Caracol, Chame. Disfruta de la arena fina, cómodos camastros, cócteles tropicales frente al mar y la mejor vibra costera del Pacífico panameño. ¡Acceso incluido para todos los huéspedes de Casa Mahana!'
              : 'Our exclusive beach club in Playa Caracol, Chame. Enjoy soft sand, cozy sun loungers, oceanfront tropical cocktails, and the best coastal vibe on the Panamanian Pacific. Access included for all Casa Mahana guests!'}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-extrabold text-amber-400">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4.5 w-4.5" />
              <span>Playa Caracol, Punta Chame, Panamá</span>
            </div>
            <div className="flex items-center space-x-2 text-turquoise-300">
              <Waves className="h-4.5 w-4.5" />
              <span>{language === 'es' ? 'Fondo de Arena sin piedras · Olas consistentes' : 'Sandy bottom, no rocks · Consistent waves'}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => handleBooking('surf_lesson', 'Surf')}
              className="px-7 py-3.5 bg-turquoise-600 hover:bg-turquoise-700 text-white rounded-xl font-bold flex items-center justify-center space-x-2 transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] text-sm"
            >
              <span>{language === 'es' ? 'Reservar Clase de Surf' : 'Book Surf Lesson'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleWhatsApp('Reserva de Camastro y Playa')}
              className="px-6 py-3.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold flex items-center justify-center space-x-2 transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] text-sm"
            >
              <Phone className="h-4 w-4" />
              <span>{language === 'es' ? 'Consultar por WhatsApp' : 'Inquire via WhatsApp'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Beach Club Amenities Trio */}
      <section className="band-full-bleed -mt-8 sm:-mt-12 relative z-20">
        <div className="container-fluid">
          <div className="bg-white rounded-[32px] border border-sand-200/90 p-6 sm:p-10 shadow-premium grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <div className="p-3.5 bg-turquoise-50 text-turquoise-700 rounded-2xl shrink-0">
                <Sunset className="h-7 w-7" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-extrabold text-turquoise-950 text-base">
                  {language === 'es' ? 'Acceso Exclusivo' : 'Exclusive Day-Access'}
                </h4>
                <p className="text-xs text-mahana-dark/70 leading-relaxed">
                  {language === 'es' 
                    ? 'Camastros, sombrillas y áreas lounge reservadas sin coste adicional para todos los huéspedes de Casa Mahana.' 
                    : 'Loungers, umbrellas, and cozy lounge spaces reserved at no extra cost for all Casa Mahana guests.'}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3.5 bg-amber-50 text-amber-700 rounded-2xl shrink-0">
                <Sparkles className="h-7 w-7" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-extrabold text-turquoise-950 text-base">
                  {language === 'es' ? 'Coctelería & Playa' : 'Beach Bar Drinks'}
                </h4>
                <p className="text-xs text-mahana-dark/70 leading-relaxed">
                  {language === 'es' 
                    ? 'Bebidas heladas, cócteles artesanales y la mejor música chill-out junto a las olas del Pacífico.' 
                    : 'Ice-cold beers, crafted tropical cocktails, and the best chill-out music right by Pacific waves.'}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3.5 bg-teal-50 text-teal-700 rounded-2xl shrink-0">
                <Waves className="h-7 w-7" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-extrabold text-turquoise-950 text-base">
                  {language === 'es' ? 'Surf a la Puerta' : 'Surfside Location'}
                </h4>
                <p className="text-xs text-mahana-dark/70 leading-relaxed">
                  {language === 'es' 
                    ? 'La sede oficial de nuestra escuela de surf y rack de alquiler se encuentra ubicada en plena arena.' 
                    : 'The official headquarters of our surf academy and rental rack is situated directly on the sand.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Drone Panoramic Atmosphere Strip */}
      <section className="band-full-bleed py-16 sm:py-20">
        <div className="container-fluid">
          <div className="relative rounded-[40px] overflow-hidden border border-sand-200 shadow-premium min-h-[380px] sm:min-h-[440px] flex items-center">
            <img 
              src="/images/surf-shack-beach-club-drone.jpg" 
              alt="Playa Caracol Drone Aerial View" 
              className="absolute inset-0 w-full h-full object-cover filter brightness-95"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-mahana-dark/90 via-mahana-dark/65 to-transparent" />
            
            <div className="relative z-10 p-8 sm:p-14 max-w-2xl text-white space-y-4">
              <span className="px-3 py-1 bg-amber-500/90 text-mahana-dark text-xs font-black uppercase tracking-wider rounded-lg">
                {language === 'es' ? 'Spot Mundial de Olas' : 'World-Class Wave Spot'}
              </span>
              <h3 className="text-2xl sm:text-4xl font-black font-serif text-white tracking-tight leading-snug">
                {language === 'es' 
                  ? 'Playa Caracol: Tu Paraíso de Arena en el Pacífico' 
                  : 'Playa Caracol: Your Sandy Pacific Wave Sanctuary'}
              </h3>
              <p className="text-sand-100/90 text-xs sm:text-sm leading-relaxed">
                {language === 'es'
                  ? 'A solo 10 minutos de Casa Mahana, Playa Caracol cuenta con una bahía protegida de fondo de arena plana sin piedras ni arrecifes traicioneros, convirtiéndola en el lugar más seguro y divertido para aprender a surfear o perfeccionar maniobras.'
                  : 'Just 10 minutes from Casa Mahana, Playa Caracol features a sheltered bay with a flat sandy bottom and no hazardous rocks or reefs, making it the safest and most fun spot in Panama to learn or progress.'}
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <span className="px-3.5 py-1.5 bg-white/15 backdrop-blur-md text-sand-50 text-xs font-bold rounded-xl border border-white/20">
                  🏄‍♂️ Softboards & Fibra
                </span>
                <span className="px-3.5 py-1.5 bg-white/15 backdrop-blur-md text-sand-50 text-xs font-bold rounded-xl border border-white/20">
                  🏖️ Camastros Privados
                </span>
                <span className="px-3.5 py-1.5 bg-white/15 backdrop-blur-md text-sand-50 text-xs font-bold rounded-xl border border-white/20">
                  🥥 Cocos Fríos & Cervezas
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Surf Shack Rentals & Shop */}
      <section className="band-full-bleed py-10 sm:py-16">
        <div className="container-fluid space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-turquoise-700 font-extrabold block">
              {language === 'es' ? 'Equipamiento & Racks' : 'Gear & Racks'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-serif text-turquoise-950">
              Surf Shack
            </h2>
            <div className="h-1.5 w-20 bg-turquoise-700 mx-auto rounded-full" />
            <p className="text-xs sm:text-sm text-mahana-dark/70 leading-relaxed">
              {language === 'es'
                ? '¿Vienes a surfear de forma independiente o te falta equipo? Nuestra tienda cuenta con el rack de alquiler más completo y los mejores accesorios de Chame.'
                : 'Coming to surf on your own or missing some gear? Our physical shop features the most comprehensive board rental quiver and surf essentials in Chame.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {shopItems.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-[32px] overflow-hidden border border-sand-200 shadow-glass hover:shadow-premium transition-all duration-300 grid grid-cols-1 sm:grid-cols-5"
              >
                <div className="relative h-56 sm:h-full sm:col-span-2 overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-turquoise-900/90 text-sand-100 text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm">
                    {item.tag}
                  </span>
                </div>
                <div className="p-6 sm:p-8 sm:col-span-3 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline gap-2">
                      <h3 className="font-extrabold text-turquoise-950 text-lg leading-tight">{item.title}</h3>
                      <span className="text-xs font-black text-turquoise-900 shrink-0">{item.price}</span>
                    </div>
                    <p className="text-xs text-mahana-dark/70 leading-relaxed">{item.desc}</p>
                  </div>
                  <button 
                    onClick={() => handleBooking('surf_lesson', 'Surf')}
                    className="w-full py-3 bg-turquoise-750 hover:bg-turquoise-900 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center space-x-1.5"
                  >
                    <span>{language === 'es' ? 'Alquilar / Consultar' : 'Rent / Inquire'}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Academia Nacional de Surf Banner (Accreditation & Quality) */}
      <section className="band-full-bleed py-10 sm:py-16">
        <div className="container-fluid">
          <div className="bg-gradient-to-r from-turquoise-900 via-turquoise-950 to-mahana-dark rounded-[40px] p-6 sm:p-12 lg:p-16 shadow-premium text-white border border-turquoise-800/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-turquoise-700/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="px-3.5 py-1.5 bg-white/10 border border-white/20 rounded-lg text-turquoise-300 text-xs uppercase tracking-widest font-black inline-block">
                  {language === 'es' ? 'Aprende de los Expertos' : 'Learn from the Pro\'s'}
                </span>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <img 
                    src="/images/logo-ans.png" 
                    alt="ANS Logo" 
                    className="h-16 w-16 object-contain bg-white/95 p-2 rounded-2xl shadow-md border border-white/10 shrink-0 self-start sm:self-center" 
                    loading="lazy"
                  />
                  <h2 className="text-3xl sm:text-5xl font-black font-serif tracking-tight leading-tight">
                    {language === 'es' ? 'Academia Nacional de Surf' : 'National Surf Academy'}
                  </h2>
                </div>

                <p className="text-turquoise-100/90 text-sm sm:text-base leading-relaxed">
                  {language === 'es'
                    ? '¿Quieres aprender a pararte en tu primera ola o perfeccionar tu técnica de remada? En nuestra escuela, certificada oficialmente, enseñamos a surfear en un entorno 100% seguro. Playa Caracol ofrece las condiciones idóneas del Pacífico panameño: olas consistentes y suaves sobre fondo plano de pura arena, sin piedras.'
                    : 'Do you want to learn to stand up on your first wave or perfect your paddling technique? In our officially certified school, we teach surfing in a 100% safe environment. Playa Caracol offers the ideal conditions of the Panamanian Pacific: consistent and gentle waves breaking over a flat sandy bottom, with absolutely no rocks.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-white/95 pt-2">
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

              <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                <img 
                  src="/images/ans-surf-team.png" 
                  alt="Equipo de Instructores ANS Surf Team" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-xs px-4 py-2.5 rounded-2xl flex items-center justify-between text-turquoise-950">
                  <span className="text-xs font-black">Equipo Oficial ANS Panamá</span>
                  <span className="text-xxs font-extrabold uppercase text-amber-700">Certificación ISA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Surf Lesson Packages Grid */}
      <section className="band-full-bleed py-10 sm:py-16">
        <div className="container-fluid space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-turquoise-700 font-extrabold block">
              {language === 'es' ? 'Programas & Clases' : 'Programs & Lessons'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-serif text-turquoise-950">
              {language === 'es' ? 'Paquetes de Clases de Surf' : 'Surf Lesson Packages'}
            </h2>
            <div className="h-1.5 w-20 bg-turquoise-700 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {academyLessons.map((lesson) => (
              <div 
                key={lesson.id}
                className="bg-white rounded-[32px] overflow-hidden border border-sand-200 shadow-glass hover:shadow-premium transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 overflow-hidden">
                    <img src={lesson.img} alt={lesson.title} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                    <span className="absolute top-4 left-4 px-3.5 py-1 bg-amber-600/90 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-md border border-amber-500/20">
                      {lesson.tag}
                    </span>
                    <span className="absolute bottom-4 right-4 bg-white/95 px-4 py-1.5 rounded-2xl text-xs font-black text-turquoise-950 shadow-md">
                      {lesson.price}
                    </span>
                  </div>
                  <div className="p-6 sm:p-8 space-y-3">
                    <h3 className="font-extrabold text-turquoise-950 text-xl leading-tight">{lesson.title}</h3>
                    <p className="text-xs text-mahana-dark/70 leading-relaxed">{lesson.desc}</p>
                  </div>
                </div>
                <div className="p-6 pt-2 sm:p-8 sm:pt-2">
                  <button 
                    onClick={() => handleBooking('surf_lesson', 'Surf')}
                    className="w-full py-3.5 bg-turquoise-700 hover:bg-turquoise-900 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center space-x-1.5 hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <span>{language === 'es' ? 'Reservar Clase de Surf' : 'Book Surf Lesson'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WhatsApp Contact & Concierge Strip */}
      <section className="band-full-bleed py-10">
        <div className="container-fluid">
          <div className="bg-sand-100/80 rounded-[32px] border border-sand-200/90 p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-4">
            <h3 className="text-xl sm:text-2xl font-black font-serif text-turquoise-950">
              {language === 'es' ? '¿Preguntas sobre las condiciones o mareas?' : 'Questions about surf tides or conditions?'}
            </h3>
            <p className="text-xs sm:text-sm text-mahana-dark/70 max-w-lg mx-auto leading-relaxed">
              {language === 'es'
                ? 'Escríbenos directamente para conocer el reporte de olas del día, horarios de marea recomendados y disponibilidad de instructores.'
                : 'Message us directly for daily wave reports, optimal tide hours, and instructor availability.'}
            </p>
            <div className="pt-2">
              <button
                onClick={() => handleWhatsApp('Reporte de Olas y Mareas')}
                className="inline-flex items-center space-x-2 px-8 py-3.5 bg-turquoise-700 hover:bg-turquoise-900 text-white font-bold rounded-xl shadow-md text-xs transition-all hover:scale-[1.02]"
              >
                <Phone className="h-4 w-4" />
                <span>{language === 'es' ? 'Consultar con Instructor por WhatsApp' : 'Chat with Coach on WhatsApp'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default SurfShackAcademy;
