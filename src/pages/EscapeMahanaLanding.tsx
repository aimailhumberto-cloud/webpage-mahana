import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { SEO } from '../components/SEO';

export const EscapeMahanaLanding: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const inclusions = [
    { text: language === 'es' ? 'Hospedaje para 2 personas (Habitación Standard)' : 'Lodging for 2 guests (Standard Room)' },
    { text: language === 'es' ? 'Desayuno continental completo incluido para la pareja' : 'Continental breakfast included for both guests' },
    { text: language === 'es' ? 'Acceso libre a nuestras 3 piscinas tropicales durante la estancia' : 'Unlimited access to our 3 tropical swimming pools' },
    { text: language === 'es' ? 'Acceso a nuestro club de playa Surf Shack en Playa Caracol' : 'Access to our Surf Shack beach club in Playa Caracol' },
    { text: language === 'es' ? 'WiFi de alta velocidad de cortesía en todas las áreas' : 'Complimentary high-speed WiFi throughout the property' }
  ];

  const experiencePhotos = [
    { src: '/images/hero-pool-deck.jpg', titleEs: 'Piscinas Tropicales', titleEn: 'Tropical Swimming Pools' },
    { src: '/images/pet-friendly.jpg', titleEs: 'Ambiente Pet-Friendly y Familiar', titleEn: 'Pet-Friendly & Family Environment' },
    { src: '/images/restaurant-menu-sheet.jpg', titleEs: 'Desayunos y Platos en el Horno de Leña', titleEn: 'Breakfast & Wood-Fired Specials' }
  ];

  const handleBook = () => {
    // Redirects to PMS checkout engine for this specific plan
    navigate('/reservar', { state: { category: 'Estadía', planCode: 'escape_mahana' } });
  };

  return (
    <div className="bg-mahana-light min-h-[95vh] animate-fade-in-up font-sans">
      <SEO 
        titleEs="Escape Mahana (Promo Parejas) — Casa Mahana Lodge"
        titleEn="Escape Mahana (Couples Promo) — Casa Mahana Lodge"
        descriptionEs="Escapada especial para parejas por $33/noche de domingo a jueves. Incluye hospedaje, desayuno continental y acceso libre a nuestras piscinas y club de playa."
        descriptionEn="Special couples getaway for $33/night Sunday to Thursday. Includes lodging, continental breakfast, and access to pools and beach club."
        image="/images/escape-mahana-hero.jpg"
        path="/estadias/escape-mahana"
      />
      {/* Hero Banner */}
      <div className="relative h-[420px] w-full overflow-hidden">
        <img 
          src="/images/escape-mahana-hero.jpg" 
          alt="Escape Mahana Promo" 
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mahana-dark via-mahana-dark/40 to-transparent" />
        
        <div className="absolute bottom-6 sm:bottom-12 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2 sm:space-y-4">
          <span className="px-3.5 py-1.5 bg-mahana-accent text-white text-xs font-bold uppercase tracking-widest rounded-lg border border-white/20">
            {language === 'es' ? 'PROMO EXCLUSIVA EN PAREJA' : 'EXCLUSIVE COUPLES PROMO'}
          </span>
          <h1 className="text-3xl sm:text-6xl font-black text-white tracking-tight">Escape Mahana</h1>
          <p className="text-sand-100/95 text-xs sm:text-xl max-w-3xl font-medium leading-relaxed">
            {language === 'es'
              ? 'La escapada perfecta para dos. Disfruta de una noche en nuestro lodge con desayuno continental incluido a un precio promocional inigualable.'
              : 'The perfect getaway for two. Enjoy a night at our lodge with continental breakfast included at an unbeatable promotional price.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-14">
          
          {/* Main Description */}
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-turquoise-950 tracking-tight">
              {language === 'es' ? 'Desconéctate con esa persona especial' : 'Disconnect with that special someone'}
            </h2>
            <p className="text-mahana-dark/85 leading-relaxed text-base">
              {language === 'es' 
                ? 'Con el paquete Escape Mahana, te ofrecemos una estancia relajante de domingo a jueves por solo $33 por pareja (con fines de semana a $49.50). Este plan incluye alojamiento para dos y desayuno continental completo para comenzar el día de la mejor manera. Una excelente opción económica para disfrutar de Chame y descansar en nuestras instalaciones.'
                : 'With the Escape Mahana package, we offer you a relaxing stay from Sunday to Thursday for only $33 per couple (weekends at $49.50). This plan includes lodging for two and a full continental breakfast to start your day. A great budget-friendly option to enjoy Chame and relax in our facilities.'}
            </p>
          </div>

          {/* Rates Table */}
          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-widest font-black text-turquoise-750">
              {language === 'es' ? 'Tarifas del Paquete (Impuestos Incluidos)' : 'Package Rates (Taxes Included)'}
            </h3>
            
            <div className="bg-white rounded-3xl border border-sand-200 shadow-glass overflow-hidden">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-sand-50/70 border-b border-sand-200 text-xs font-bold text-turquoise-950 uppercase tracking-wider">
                    <th className="py-4 px-4 sm:px-6">{language === 'es' ? 'Período de Estadía' : 'Stay Period'}</th>
                    <th className="py-4 px-4 sm:px-6">{language === 'es' ? 'Tarifa por Pareja' : 'Rate per Couple'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-100 font-medium text-mahana-dark/95">
                  <tr className="hover:bg-sand-50/20 transition-colors">
                    <td className="py-4.5 px-4 sm:px-6 font-bold text-turquoise-950">{language === 'es' ? 'Domingo a Jueves' : 'Sunday to Thursday'}</td>
                    <td className="py-4.5 px-4 sm:px-6 font-extrabold text-turquoise-900">B/. 33.00</td>
                  </tr>
                  <tr className="hover:bg-sand-50/20 transition-colors">
                    <td className="py-4.5 px-4 sm:px-6 font-bold text-turquoise-950">{language === 'es' ? 'Viernes y Sábado' : 'Friday and Saturday'}</td>
                    <td className="py-4.5 px-4 sm:px-6 font-extrabold text-turquoise-900">B/. 49.50</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-mahana-amber font-semibold">
              ⚠️ {language === 'es' ? 'Cupos limitados. No aplica para días feriados ni festivos.' : 'Limited spaces. Does not apply on holidays.'}
            </p>
          </div>

          {/* Breakfast Details */}
          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-widest font-black text-turquoise-750">
              {language === 'es' ? '🍳 Desayuno Continental Incluido' : '🍳 Continental Breakfast Included'}
            </h3>
            <div className="bg-white rounded-3xl border border-sand-200 shadow-glass p-6 sm:p-8 space-y-4">
              <p className="text-sm font-semibold text-mahana-dark/80 leading-relaxed">
                {language === 'es'
                  ? 'Cada mañana podrás disfrutar de un rico desayuno en nuestro restaurante:'
                  : 'Every morning you can enjoy a delicious breakfast at our restaurant:'}
              </p>
              <div className="p-4 bg-sand-50 rounded-2xl border border-sand-200 text-xs font-bold text-turquoise-950 leading-relaxed">
                {language === 'es'
                  ? 'Jamón, tortilla u hojaldra, huevos al gusto (fritos, hervidos, revueltos u omelette de jamón con queso), acompañado de café, té o jugo natural.'
                  : 'Ham, tortilla or hojaldra, eggs cooked to order (fried, boiled, scrambled or ham & cheese omelette), served with coffee, tea, or juice.'}
              </div>
            </div>
          </div>

          {/* Extra Persons */}
          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-widest font-black text-turquoise-750">
              {language === 'es' ? '👥 Personas Adicionales' : '👥 Additional Guests'}
            </h3>
            <div className="bg-white rounded-3xl border border-sand-200 shadow-glass p-6 sm:p-8 space-y-4">
              <p className="text-sm font-semibold text-mahana-dark/80 leading-relaxed">
                {language === 'es'
                  ? '¿Deseas traer a alguien más? Puedes añadir huéspedes extra en la misma habitación (incluye su desayuno correspondiente):'
                  : 'Want to bring someone else? You can add extra guests in the same room (includes their respective breakfast):'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-turquoise-950">
                <div className="p-4 bg-sand-50 rounded-2xl border border-sand-200 flex justify-between items-center">
                  <span>{language === 'es' ? 'Adulto Extra' : 'Extra Adult'}</span>
                  <span className="text-turquoise-750 text-sm font-extrabold">B/. 22.00</span>
                </div>
                <div className="p-4 bg-sand-50 rounded-2xl border border-sand-200 flex justify-between items-center">
                  <span>{language === 'es' ? 'Niño Extra (2-12 años)' : 'Extra Child (2-12 years)'}</span>
                  <span className="text-turquoise-750 text-sm font-extrabold">B/. 17.50</span>
                </div>
              </div>
            </div>
          </div>

          {/* Inclusions Images */}
          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-widest font-black text-turquoise-750">
              {language === 'es' ? 'El Lodge en Imágenes' : 'Photos of the Lodge'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {experiencePhotos.map((photo, index) => (
                <div key={index} className="group relative h-60 rounded-2xl overflow-hidden border border-sand-200 shadow-glass">
                  <img 
                    src={photo.src} 
                    alt={language === 'es' ? photo.titleEs : photo.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-turquoise-950/80 via-transparent to-transparent flex flex-col justify-end p-4 pointer-events-none" />
                  <span className="absolute bottom-4 left-4 right-4 text-white text-xs font-bold leading-snug drop-shadow-md pointer-events-none">
                    {language === 'es' ? photo.titleEs : photo.titleEn}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions List */}
          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-widest font-black text-turquoise-750">
              {language === 'es' ? 'Detalles del Paquete' : 'Package Details'}
            </h3>
            
            <div className="bg-white rounded-3xl border border-sand-200 shadow-glass p-6 sm:p-8 space-y-4">
              {inclusions.map((inc, i) => (
                <div key={i} className="flex items-start space-x-3.5">
                  <Check className="h-5 w-5 text-turquoise-700 shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-mahana-dark/80">{inc.text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar Booking Box */}
        <div className="bg-white rounded-[32px] border border-sand-200 p-6 sm:p-8 shadow-premium h-fit space-y-6 lg:sticky lg:top-24">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-mahana-dark/60 font-bold block">
              {language === 'es' ? 'Tarifa por pareja desde' : 'Couple rate per night from'}
            </span>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-4xl font-black text-turquoise-950">$33.00</span>
              <span className="text-sm text-mahana-dark/60 font-semibold">USD / {language === 'es' ? 'noche' : 'night'}</span>
            </div>
            <p className="text-xs text-emerald-600 font-extrabold flex items-center space-x-1.5">
              <ShieldCheck className="h-4.5 w-4.5 text-emerald-600" />
              <span>{language === 'es' ? 'Desayuno Continental / Impuestos Incluidos' : 'Continental Breakfast / Taxes Included'}</span>
            </p>
          </div>

          <div className="border-t border-sand-100 pt-6 space-y-4 text-xs font-bold text-mahana-dark/75">
            <div className="flex justify-between items-center">
              <span>{language === 'es' ? 'Régimen Alimenticio' : 'Meal Plan'}</span>
              <span className="text-turquoise-800 text-right">{language === 'es' ? 'Desayuno continental' : 'Continental breakfast'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>{language === 'es' ? 'Impuestos de Alojamiento' : 'Lodging Taxes'}</span>
              <span className="text-emerald-600 uppercase">{language === 'es' ? 'Incluidos' : 'Included'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>{language === 'es' ? 'Mascotas Admitidas' : 'Pet-Friendly'}</span>
              <span>{language === 'es' ? 'Sí' : 'Yes'}</span>
            </div>
          </div>

          <button
            onClick={handleBook}
            className="w-full py-4 bg-turquoise-700 hover:bg-turquoise-900 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all shadow-md group hover:scale-[1.01] active:scale-[0.99]"
          >
            <span>{language === 'es' ? 'Reservar Promoción' : 'Book Promotion'}</span>
            <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <p className="text-[10px] text-center text-mahana-dark/60 font-semibold leading-relaxed">
            {language === 'es'
              ? 'También contamos con opciones de estadía con comidas incluidas y paquetes con Open Bar, por si desean una experiencia más completa en Casa Mahana.'
              : 'We also have lodging options with meals included and packages with Open Bar, if you wish a more complete experience at Casa Mahana.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EscapeMahanaLanding;
