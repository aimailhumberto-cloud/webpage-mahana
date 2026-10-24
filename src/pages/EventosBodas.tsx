import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Check, Calendar, Users, Heart, Palmtree, ArrowRight, ShieldCheck, Mail, Phone, Cake, Eye, X, Sparkles, Building, Waves, UtensilsCrossed } from 'lucide-react';
import { SEO } from '../components/SEO';
import { trackEvent, trackWhatsAppClick } from '../utils/analytics';

export const EventosBodas: React.FC = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'wedding',
    guests: '50',
    date: '',
    buyout: 'no',
    catering: 'both',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert(language === 'es' ? 'Por favor complete los campos requeridos.' : 'Please fill in the required fields.');
      return;
    }
    trackEvent('generate_lead', {
      event_category: 'Events & Weddings',
      event_label: formData.eventType,
      guests: formData.guests,
      buyout: formData.buyout
    });
    setSubmitted(true);
  };

  const handleWhatsAppInquiry = () => {
    trackWhatsAppClick('Eventos & Bodas', 'Asesoría de Eventos');
    const msg = language === 'es'
      ? '¡Hola! Me gustaría cotizar un evento privado o boda en Casa Mahana.'
      : 'Hello! I would like to inquire about a private event or wedding at Casa Mahana.';
    window.open(`https://wa.me/50762906800?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const eventShowcases = [
    {
      id: 'wedding',
      icon: <Heart className="h-8 w-8 text-rose-500" />,
      title: language === 'es' ? 'Bodas de Ensueño' : 'Dream Tropical Weddings',
      desc: language === 'es'
        ? 'Da el «sí, acepto» frente al atardecer dorado de Chame. Coordinamos ceremonias en jardines tropicales, banquetes con pizzas a la leña y mariscos frescos, open bar premium y recepciones al aire libre junto a la piscina para hasta 150 invitados.'
        : 'Say «I do» with Chame’s golden sunset and lush gardens as your backdrop. We coordinate tropical garden ceremonies, wood-fired pizza and fresh seafood caterings, premium open bar, and poolside open-air receptions for up to 150 guests.',
      capacity: '👥 Up to 150 Guests',
      img: '/images/wedding-setup.jpg?v=2',
      badge: 'Romantic'
    },
    {
      id: 'corporate',
      icon: <Palmtree className="h-8 w-8 text-turquoise-700" />,
      title: language === 'es' ? 'Retiros & Team Building' : 'Retreats & Team Building',
      desc: language === 'es'
        ? 'Conecta a tu equipo fuera de la oficina. Ofrecemos la exclusividad del Lodge completo, almuerzos de negocios en la piscina, espacios de trabajo inspiradores y clases de surf integradas en nuestro beach club.'
        : 'Engage your team outside the office. We offer complete Lodge buyout options, poolside business lunches, inspiring outdoor workspaces, and custom integration surf lessons at our beach club.',
      capacity: '👥 10 to 40 Guests (Lodge Buyout)',
      img: '/images/lodge-grounds.jpg?v=2',
      badge: 'Team Building'
    },
    {
      id: 'birthday',
      icon: <Cake className="h-8 w-8 text-amber-500" />,
      title: language === 'es' ? 'Pool Parties & Cumpleaños' : 'Pool Parties & Birthdays',
      desc: language === 'es'
        ? 'Reserva nuestra espectacular piscina tropical para una fiesta privada insuperable. Ofrecemos barra de cócteles, menú de pizzas a la leña hechas al instante y ambiente con DJ local.'
        : 'Reserve our beautiful tropical pool deck for an unforgettable private celebration. We provide cocktail bars, fresh wood-fired pizza banquets, and a lively atmosphere with local DJs.',
      capacity: '👥 Up to 80 Guests',
      img: '/images/hero-pool-deck.jpg?v=2',
      badge: 'Pool Party'
    }
  ];

  const weddingGallery = [
    { 
      src: '/images/wedding-setup.jpg?v=2', 
      alt: 'Wedding reception setup', 
      title: language === 'es' ? 'Decoración & Montaje' : 'Reception & Styling',
      subtitle: language === 'es' ? 'Montajes elegantes junto a la piscina' : 'Elegant poolside banquets'
    },
    { 
      src: '/images/wedding-couple.jpg?v=2', 
      alt: 'Wedding couple in the garden', 
      title: language === 'es' ? 'Jardines Mágicos' : 'Romantic Gardens',
      subtitle: language === 'es' ? 'Fotografías inolvidables al atardecer' : 'Unforgettable golden hour photo-ops'
    },
    { 
      src: '/images/wedding-party.jpg?v=2', 
      alt: 'Wedding celebration by the pool', 
      title: language === 'es' ? 'Celebración Tropical' : 'Poolside Celebrations',
      subtitle: language === 'es' ? 'Fiesta bajo las estrellas con barra y música' : 'Night party under the stars with open bar'
    }
  ];

  const buyoutSpecs = [
    {
      icon: <Building className="h-6 w-6 text-amber-400" />,
      title: language === 'es' ? '100% Exclusividad Privada' : '100% Private Resort Exclusivity',
      desc: language === 'es' ? 'El resort completo cerrado para tu grupo sin huéspedes externos.' : 'The entire boutique resort closed exclusively for your party with zero outside guests.'
    },
    {
      icon: <Waves className="h-6 w-6 text-amber-400" />,
      title: language === 'es' ? '3 Piscinas Tropicales' : '3 Tropical Pools',
      desc: language === 'es' ? 'Piscinas, camastros y áreas de bohío a disposición de tus invitados.' : 'Pools, daybeds, and tropical gazebos at the complete disposal of your guests.'
    },
    {
      icon: <UtensilsCrossed className="h-6 w-6 text-amber-400" />,
      title: language === 'es' ? 'Restaurante & Horno a la Leña' : 'Restaurant & Wood-Fired Catering',
      desc: language === 'es' ? 'Cocina y equipo de cocina dedicado a los menús de tu celebración.' : 'Full kitchen and culinary staff dedicated to custom menus for your event.'
    },
    {
      icon: <Users className="h-6 w-6 text-amber-400" />,
      title: language === 'es' ? 'Alojamiento para 40+ Huéspedes' : 'Lodging for 40+ Guests',
      desc: language === 'es' ? 'Habitaciones boutique con desayuno incluido para la comitiva.' : 'Boutique suites and rooms with complimentary breakfast for the group.'
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-sand-50/60 pb-24 font-sans">
        <SEO 
          titleEs="Bodas y Eventos Exclusivos — Casa Mahana"
          titleEn="Weddings & Exclusive Events — Casa Mahana"
          descriptionEs="Celebra tu boda, evento corporativo o fiesta privada en un entorno tropical único en Chame. Ofrecemos paquetes completos, catering gourmet y reserva exclusiva de todo el lodge."
          descriptionEn="Celebrate your wedding, corporate event, or private party in a unique tropical setting in Chame. We offer full packages, gourmet catering, and exclusive lodge buyout options."
          image="/images/wedding-setup.jpg"
          path="/eventos"
          schemaType="LodgingBusiness"
        />

        {/* 1. Full-Bleed Panoramic Hero Banner */}
        <section className="band-full-bleed bg-mahana-dark text-white relative min-h-[500px] sm:min-h-[580px] flex items-end">
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/wedding-setup.jpg?v=2" 
              alt="Casa Mahana Weddings & Events" 
              className="w-full h-full object-cover filter brightness-90"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-mahana-dark via-mahana-dark/70 to-mahana-dark/40" />
          </div>

          <div className="container-fluid relative z-10 py-16 sm:py-24 space-y-4">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-turquoise-700/90 backdrop-blur-xs text-sand-100 text-xs font-bold uppercase tracking-wider rounded-xl border border-turquoise-500/30">
              <Sparkles className="h-4 w-4 text-amber-300" />
              <span>{language === 'es' ? 'Eventos Exclusivos & Retiros' : 'Exclusive Events & Retreats'}</span>
            </div>

            <h1 className="text-3xl sm:text-6xl lg:text-7xl font-black font-serif text-white tracking-tight">
              Eventos & Bodas
            </h1>

            <p className="text-sand-100/90 text-sm sm:text-lg max-w-3xl font-medium leading-relaxed">
              {t('events.subtitle')}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#cotizar-evento"
                className="px-7 py-3.5 bg-turquoise-600 hover:bg-turquoise-700 text-white rounded-xl font-bold flex items-center justify-center space-x-2 transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] text-sm"
              >
                <span>{language === 'es' ? 'Cotizar mi Evento' : 'Request Event Proposal'}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <button
                onClick={handleWhatsAppInquiry}
                className="px-6 py-3.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold flex items-center justify-center space-x-2 transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] text-sm"
              >
                <Phone className="h-4 w-4" />
                <span>{language === 'es' ? 'Consultar por WhatsApp' : 'Inquire via WhatsApp'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* 2. Visual Event Showcases (Grid of 3) */}
        <section className="band-full-bleed py-16 sm:py-24">
          <div className="container-fluid space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs uppercase tracking-widest text-turquoise-700 font-extrabold block">
                {language === 'es' ? 'Formatos de Celebración' : 'Celebration Formats'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-serif text-turquoise-950">
                {language === 'es' ? 'Espacios Diseñados para Momentos Inolvidables' : 'Venues Designed for Unforgettable Moments'}
              </h2>
              <div className="h-1.5 w-20 bg-turquoise-700 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
              {eventShowcases.map((showcase) => (
                <div 
                  key={showcase.id}
                  className="bg-white rounded-[32px] overflow-hidden border border-sand-200 shadow-glass flex flex-col justify-between hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div>
                    <div className="relative h-64 w-full overflow-hidden">
                      <img src={showcase.img} alt={showcase.title} className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                      <span className="absolute top-4 left-4 px-3.5 py-1.5 bg-turquoise-900/90 text-sand-100 text-xs font-bold uppercase tracking-wider rounded-xl shadow-md border border-turquoise-700/20">
                        {showcase.badge}
                      </span>
                    </div>

                    <div className="p-6 sm:p-8 space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-sand-100/70 rounded-2xl shrink-0">
                          {showcase.icon}
                        </div>
                        <h3 className="text-xl font-black font-serif text-turquoise-950 tracking-tight leading-snug">
                          {showcase.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-mahana-dark/80 leading-relaxed min-h-[96px]">
                        {showcase.desc}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-4 sm:px-8 sm:pb-8 border-t border-sand-100 bg-sand-50/30 font-bold text-turquoise-900 text-xs sm:text-sm flex items-center space-x-2">
                    <span>{showcase.capacity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Full Lodge Buyout Specs Band */}
        <section className="band-full-bleed py-16 sm:py-24 bg-gradient-to-r from-turquoise-900 via-turquoise-950 to-mahana-dark text-white border-y border-turquoise-800/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-turquoise-700/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="container-fluid relative z-10 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="px-3.5 py-1.5 bg-white/10 border border-white/20 rounded-lg text-turquoise-300 text-xs uppercase tracking-widest font-black inline-block">
                {language === 'es' ? 'Exclusividad Total' : 'Total Exclusivity'}
              </span>
              <h2 className="text-3xl sm:text-5xl font-black font-serif tracking-tight">
                Full Lodge Buyout
              </h2>
              <p className="text-turquoise-100/90 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
                {language === 'es'
                  ? 'Reserva Casa Mahana de forma 100% privada para tu boda de destino, retiro empresarial o fiesta de aniversario con total libertad y sin huéspedes externos.'
                  : 'Reserve Casa Mahana 100% privately for your destination wedding, company retreat, or landmark anniversary with total freedom and zero outside guests.'}
              </p>
              <div className="h-1.5 w-20 bg-amber-500 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {buyoutSpecs.map((spec, sIdx) => (
                <div key={sIdx} className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/15 space-y-3 shadow-glass">
                  <div className="p-3 bg-white/10 rounded-2xl w-fit">
                    {spec.icon}
                  </div>
                  <h4 className="font-bold text-white text-base">{spec.title}</h4>
                  <p className="text-xs text-sand-100/80 leading-relaxed">{spec.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Celebrations Gallery (with Lightbox Trigger) */}
        <section className="band-full-bleed py-16 sm:py-20">
          <div className="container-fluid space-y-12">
            <div className="text-center max-w-lg mx-auto space-y-3">
              <h2 className="text-2xl sm:text-4xl font-black font-serif text-turquoise-950">
                {language === 'es' ? 'Galería de Celebraciones' : 'Celebrations Gallery'}
              </h2>
              <p className="text-xs sm:text-sm text-mahana-dark/60 font-bold uppercase tracking-wider">
                {language === 'es' ? 'Momentos y montajes reales en Casa Mahana' : 'Real moments and setups at Casa Mahana'}
              </p>
              <div className="h-1.5 w-16 bg-turquoise-700 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {weddingGallery.map((img, idx) => (
                <div 
                  key={idx}
                  onClick={() => setSelectedImg(img.src)}
                  className="bg-white rounded-3xl overflow-hidden border border-sand-200 shadow-glass hover:shadow-premium hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={img.src} 
                      alt={img.alt} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30 transform scale-90 group-hover:scale-100 transition-all duration-300">
                        <Eye className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="font-extrabold text-turquoise-950 text-base">{img.title}</h3>
                    <p className="text-xs text-mahana-dark/65 font-medium mt-1">{img.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Interactive Inquiry Form */}
        <section id="cotizar-evento" className="band-full-bleed py-10 sm:py-16">
          <div className="container-fluid">
            <div className="bg-white rounded-[40px] border border-sand-200 max-w-5xl mx-auto shadow-premium overflow-hidden grid grid-cols-1 md:grid-cols-5">
              
              {/* Info Panel */}
              <div className="bg-turquoise-900 p-6 sm:p-12 text-sand-100 md:col-span-2 flex flex-col justify-between space-y-8">
                <div className="space-y-4">
                  <span className="text-xxs uppercase tracking-widest text-amber-400 font-extrabold">
                    {language === 'es' ? 'Ubicación Oasis' : 'Oasis Location'}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black font-serif leading-tight text-white">
                    {language === 'es' ? 'Tu Evento Soñado Comienza Aquí' : 'Your Dream Event Starts Here'}
                  </h3>
                  <p className="text-xs text-sand-200/90 leading-relaxed">
                    {language === 'es'
                      ? 'Contamos con hermosos jardines tropicales para tu ceremonia, banquetes junto a las 3 piscinas, catering premium con horno a la leña y alojamiento para tus invitados.'
                      : 'We offer beautiful tropical gardens for your ceremony, poolside banquets by our 3 pools, premium wood-fired catering, and accommodation for your guests.'}
                  </p>
                </div>

                <div className="space-y-4 text-xs font-semibold text-sand-200/95">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4.5 w-4.5 text-amber-400" />
                    <span>+507 345-3222</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4.5 w-4.5 text-amber-400" />
                    <span>+507 6290-6800 (WhatsApp)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4.5 w-4.5 text-amber-400" />
                    <span>recepcion@casamahana.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4.5 w-4.5 text-amber-400" />
                    <span>Chame, Panamá</span>
                  </div>
                </div>

                <div className="border-t border-turquoise-700/50 pt-6">
                  <span className="text-xxs text-sand-300 block">
                    © Casa Mahana Lodge & Restaurante
                  </span>
                </div>
              </div>

              {/* Form Area */}
              <div className="p-6 sm:p-12 md:col-span-3">
                {submitted ? (
                  <div className="h-full flex flex-col justify-center items-center text-center space-y-4 py-8 animate-fade-in">
                    <div className="p-4 bg-emerald-50 text-emerald-600 rounded-full shadow-md border border-emerald-100">
                      <ShieldCheck className="h-12 w-12" />
                    </div>
                    <h3 className="text-2xl font-black font-serif text-turquoise-950">
                      {t('events.form_success_title')}
                    </h3>
                    <p className="text-sm text-mahana-dark/75 max-w-sm leading-relaxed">
                      {t('events.form_success_desc')}
                    </p>
                    <button
                      onClick={() => {
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          eventType: 'wedding',
                          guests: '50',
                          date: '',
                          buyout: 'no',
                          catering: 'both',
                          notes: ''
                        });
                        setSubmitted(false);
                      }}
                      className="mt-6 px-6 py-2.5 bg-turquoise-700 hover:bg-turquoise-900 text-white rounded-xl font-bold transition-all text-xs shadow-sm"
                    >
                      {language === 'es' ? 'Volver a Cotizar' : 'Submit Another Inquiry'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-black font-serif text-turquoise-950">{t('events.form_title')}</h3>
                      <p className="text-xs text-mahana-dark/65">{t('events.form_subtitle')}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xxs uppercase tracking-wider font-extrabold text-turquoise-950 block">
                          {t('events.form_name')} <span className="text-rose-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-sm focus:outline-none focus:border-turquoise-700 bg-sand-50/50"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xxs uppercase tracking-wider font-extrabold text-turquoise-950 block">
                          {t('common.phone')} <span className="text-rose-500">*</span>
                        </label>
                        <input 
                          type="tel" 
                          required
                          placeholder="e.g. +507 6612-3456"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-sm focus:outline-none focus:border-turquoise-700 bg-sand-50/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xxs uppercase tracking-wider font-extrabold text-turquoise-950 block">
                          {t('common.email')} <span className="text-rose-500">*</span>
                        </label>
                        <input 
                          type="email" 
                          required
                          placeholder="e.g. email@domain.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-sm focus:outline-none focus:border-turquoise-700 bg-sand-50/50"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xxs uppercase tracking-wider font-extrabold text-turquoise-950 block">
                          {t('events.form_type')}
                        </label>
                        <select
                          value={formData.eventType}
                          onChange={(e) => setFormData({...formData, eventType: e.target.value})}
                          className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-sm focus:outline-none focus:border-turquoise-700 bg-sand-50/50"
                        >
                          <option value="wedding">{t('events.form_type_wedding')}</option>
                          <option value="corporate">{t('events.form_type_corporate')}</option>
                          <option value="birthday">{t('events.form_type_birthday')}</option>
                          <option value="private">{t('events.form_type_private')}</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xxs uppercase tracking-wider font-extrabold text-turquoise-950 block">
                          {t('events.form_guests')}
                        </label>
                        <input 
                          type="number" 
                          min="10"
                          max="200"
                          value={formData.guests}
                          onChange={(e) => setFormData({...formData, guests: e.target.value})}
                          className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-sm focus:outline-none focus:border-turquoise-700 bg-sand-50/50"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xxs uppercase tracking-wider font-extrabold text-turquoise-950 block">
                          {t('events.form_date')}
                        </label>
                        <input 
                          type="date" 
                          value={formData.date}
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                          className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-sm focus:outline-none focus:border-turquoise-700 bg-sand-50/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xxs uppercase tracking-wider font-extrabold text-turquoise-950 block">
                          {t('events.form_buyout')}
                        </label>
                        <select
                          value={formData.buyout}
                          onChange={(e) => setFormData({...formData, buyout: e.target.value})}
                          className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-sm focus:outline-none focus:border-turquoise-700 bg-sand-50/50"
                        >
                          <option value="yes">{t('events.form_buyout_yes')}</option>
                          <option value="no">{t('events.form_buyout_no')}</option>
                        </select>
                        <label className="flex items-center space-x-2 text-xs font-semibold text-turquoise-950 cursor-pointer pt-1">
                          <input 
                            type="checkbox" 
                            checked={formData.buyout === 'yes'} 
                            onChange={(e) => setFormData({...formData, buyout: e.target.checked ? 'yes' : 'no'})} 
                            className="rounded border-sand-300 text-turquoise-700 h-4 w-4" 
                          />
                          <span>{language === 'es' ? 'Quiero exclusividad total de Lodge Buyout' : 'I want exclusive Full Lodge Buyout'}</span>
                        </label>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xxs uppercase tracking-wider font-extrabold text-turquoise-950 block">
                          {t('events.form_catering')}
                        </label>
                        <select
                          value={formData.catering}
                          onChange={(e) => setFormData({...formData, catering: e.target.value})}
                          className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-sm focus:outline-none focus:border-turquoise-700 bg-sand-50/50"
                        >
                          <option value="pizza">{t('events.form_catering_pizza')}</option>
                          <option value="seafood">{t('events.form_catering_seafood')}</option>
                          <option value="both">{t('events.form_catering_both')}</option>
                          <option value="none">{t('events.form_catering_none')}</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xxs uppercase tracking-wider font-extrabold text-turquoise-950 block">
                        {t('events.form_notes')}
                      </label>
                      <textarea 
                        rows={3}
                        placeholder="..."
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-sm focus:outline-none focus:border-turquoise-700 bg-sand-50/50 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-turquoise-700 hover:bg-turquoise-900 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all shadow-md group hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <span>{t('events.form_submit')}</span>
                      <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>
        </section>
      </div>

      {/* 6. Photo Lightbox Modal Overlay (Root level, strictly outside transforms) */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[60] z-[70] bg-black/85 backdrop-blur-md flex flex-col justify-center items-center p-4 animate-fade-in"
          onClick={() => setSelectedImg(null)}
        >
          <div 
            className="relative max-w-4xl max-h-[85vh] w-full overflow-hidden rounded-2xl border border-white/20 shadow-2xl bg-white p-3 sm:p-4 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-sand-200">
              <span className="font-bold text-turquoise-950 text-xs sm:text-sm">
                {language === 'es' ? 'Casa Mahana · Eventos & Celebraciones' : 'Casa Mahana · Events & Celebrations'}
              </span>
              <button
                onClick={() => setSelectedImg(null)}
                className="p-2 bg-sand-100 hover:bg-rose-100 text-mahana-dark hover:text-rose-700 rounded-full transition-colors cursor-pointer"
                aria-label="Close image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="overflow-auto flex-1 py-2 flex items-center justify-center">
              <img 
                src={selectedImg} 
                alt="Casa Mahana Event" 
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

export default EventosBodas;
