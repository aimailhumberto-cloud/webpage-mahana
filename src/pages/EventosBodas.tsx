import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Check, Calendar, Users, Heart, Palmtree, ArrowRight, ShieldCheck, Mail, Phone, Cake, Eye, X } from 'lucide-react';

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
    setSubmitted(true);
  };

  const eventShowcases = [
    {
      id: 'wedding',
      icon: <Heart className="h-8 w-8 text-rose-500" />,
      titleKey: 'events.wedding_title',
      descKey: 'events.wedding_desc',
      capacity: '👥 Up to 150 Guests',
      img: '/images/wedding-setup.jpg?v=2',
      badge: 'Romantic'
    },
    {
      id: 'corporate',
      icon: <Palmtree className="h-8 w-8 text-turquoise-700" />,
      titleKey: 'events.corporate_title',
      descKey: 'events.corporate_desc',
      capacity: '👥 10 to 40 Guests (Lodge Buyout)',
      img: '/images/lodge-grounds.jpg?v=2',
      badge: 'Team Building'
    },
    {
      id: 'birthday',
      icon: <Cake className="h-8 w-8 text-amber-500" />,
      titleKey: 'events.parties_title',
      descKey: 'events.parties_desc',
      capacity: '👥 Up to 80 Guests',
      img: '/images/hero-pool-deck.jpg?v=2',
      badge: 'Pool Party'
    }
  ];

  const weddingGallery = [
    { src: '/images/wedding-setup.jpg?v=2', alt: 'Wedding reception setup', title: language === 'es' ? 'Decoración & Montaje' : 'Reception & Styling' },
    { src: '/images/wedding-couple.jpg?v=2', alt: 'Wedding couple in the garden', title: language === 'es' ? 'Jardines Mágicos' : 'Romantic Gardens' },
    { src: '/images/wedding-party.jpg?v=2', alt: 'Wedding celebration by the pool', title: language === 'es' ? 'Celebración Tropical' : 'Poolside Celebrations' }
  ];

  return (
    <div className="py-16 bg-mahana-light min-h-[90vh] animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-sm uppercase tracking-widest text-turquoise-700 font-extrabold">
            {t('events.title')}
          </h1>
          <p className="text-3xl sm:text-4xl font-extrabold text-turquoise-950">
            {t('events.subtitle')}
          </p>
          <div className="h-1.5 w-24 bg-turquoise-700 mx-auto rounded-full" />
        </div>

        {/* Dynamic Card Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
          {eventShowcases.map((showcase) => (
            <div 
              key={showcase.id}
              className="bg-white rounded-[32px] overflow-hidden border border-sand-200 shadow-glass flex flex-col justify-between hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300"
            >
              <div>
                <div className="relative h-60 w-full overflow-hidden">
                  <img src={showcase.img} alt={t(showcase.titleKey)} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1.5 bg-turquoise-900/90 text-sand-100 text-xs font-bold uppercase tracking-wider rounded-xl">
                    {showcase.badge}
                  </span>
                </div>

                <div className="p-8 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-sand-100/60 rounded-2xl shrink-0">
                      {showcase.icon}
                    </div>
                    <h2 className="text-xl font-extrabold text-turquoise-950 tracking-tight leading-snug">
                      {t(showcase.titleKey)}
                    </h2>
                  </div>
                  <p className="text-sm text-mahana-dark/80 leading-relaxed min-h-[96px]">
                    {t(showcase.descKey)}
                  </p>
                </div>
              </div>

              <div className="px-8 pb-8 pt-4 border-t border-sand-100 bg-sand-50/20 font-bold text-turquoise-900 text-sm flex items-center space-x-2">
                <span>{showcase.capacity}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery */}
        <div className="mb-20 animate-fade-in">
          <div className="text-center max-w-lg mx-auto space-y-3 mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-turquoise-950">
              {language === 'es' ? 'Galería de Celebraciones' : 'Celebrations Gallery'}
            </h2>
            <p className="text-xs text-mahana-dark/60 font-bold uppercase tracking-wider">
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
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30 transform scale-90 group-hover:scale-100 transition-all duration-300">
                      <Eye className="h-6 w-6" />
                    </div>
                  </div>
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-extrabold text-turquoise-950 text-base">{img.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inquiry Form Formulario de Cotización */}
        <div className="bg-white rounded-[40px] border border-sand-200 max-w-4xl mx-auto shadow-premium overflow-hidden grid grid-cols-1 md:grid-cols-5">
          
          {/* Info Panel */}
          <div className="bg-turquoise-900 p-8 sm:p-12 text-sand-100 md:col-span-2 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="text-xxs uppercase tracking-widest text-mahana-accent font-bold">
                {language === 'es' ? 'Ubicación Oasís' : 'Oasis Location'}
              </span>
              <h3 className="text-2xl font-black leading-tight text-white">{language === 'es' ? 'Tu Evento Soñado Comienza Aquí' : 'Your Dream Event Starts Here'}</h3>
              <p className="text-xs text-sand-200/90 leading-relaxed">
                {language === 'es'
                  ? 'Contamos con hermosos jardines tropicales para tu ceremonia, banquetes junto a las 3 piscinas, catering premium con horno a la leña y alojamiento para tus invitados.'
                  : 'We offer beautiful tropical gardens for your ceremony, poolside banquets by our 3 pools, premium wood-fired catering, and accommodation for your guests.'}
              </p>
            </div>

            <div className="space-y-4 text-xs font-semibold text-sand-200/95">
              <div className="flex items-center space-x-3">
                <Phone className="h-4.5 w-4.5 text-mahana-accent" />
                <span>+507 345-3222</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4.5 w-4.5 text-mahana-accent" />
                <span>+507 6290-6800 (WhatsApp)</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4.5 w-4.5 text-mahana-accent" />
                <span>recepcion@casamahana.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-4.5 w-4.5 text-mahana-accent" />
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
          <div className="p-8 sm:p-12 md:col-span-3">
            {submitted ? (
              <div className="h-full flex flex-col justify-center items-center text-center space-y-4 py-8 animate-fade-in">
                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-full shadow-md border border-emerald-100">
                  <ShieldCheck className="h-12 w-12" />
                </div>
                <h3 className="text-2xl font-black text-turquoise-950">
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
                  <h3 className="text-2xl font-black text-turquoise-950">{t('events.form_title')}</h3>
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
                  <div className="space-y-1">
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

      {/* Photo Lightbox Modal Overlay */}
      {selectedImg && (
        <div className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-md flex flex-col justify-center items-center p-4 animate-fade-in" onClick={() => setSelectedImg(null)}>
          <div className="absolute top-4 right-4 z-[70]">
            <button
              onClick={() => setSelectedImg(null)}
              className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md p-3 rounded-full border border-white/20 transition-all"
              aria-label="Close image"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="max-w-4xl max-h-[85vh] overflow-auto rounded-2xl border border-white/10 shadow-premium bg-white p-2" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedImg} 
              alt="Casa Mahana Event" 
              className="max-h-[80vh] w-auto object-contain mx-auto rounded-lg" 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventosBodas;
