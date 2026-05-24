import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Check, ArrowRight, ShieldCheck } from 'lucide-react';

export const MahanaExperienceLanding: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const inclusions = [
    { text: language === 'es' ? 'Pensión Completa: Desayuno, Almuerzo y Cena incluidos' : 'Full Board: Breakfast, Lunch, and Dinner included' },
    { text: language === 'es' ? 'Comidas a escoger en el Lodge o frente al mar en Surfshack' : 'Meals available at the Lodge or oceanfront at Surfshack' },
    { text: language === 'es' ? 'Acceso libre a la Piscina Tropical y áreas de relajación durante el día' : 'Daytime access to the Tropical Pool and lounge areas' },
    { text: language === 'es' ? 'Conexión WiFi de alta velocidad de cortesía en todo el Lodge' : 'Complimentary high-speed WiFi throughout the Lodge' },
    { text: language === 'es' ? 'Estacionamiento privado gratuito dentro de las instalaciones' : 'Complimentary secure private parking on site' }
  ];

  const experiencePhotos = [
    { src: '/images/food-fish-patacones.jpg', titleEs: 'Gastronomía Costera y Horno de Leña', titleEn: 'Coastal Dining & Wood-Fired Specialties' },
    { src: '/images/hero-pool-drone-aerial.jpg', titleEs: 'Piscina Tropical y Camastros de Descanso', titleEn: 'Tropical Pool & Relaxing Sun Loungers' },
    { src: '/images/surf-shack-swing.jpg', titleEs: 'Club de Playa Surfshack en Playa Caracol', titleEn: 'Surfshack Beach Club at Playa Caracol' }
  ];

  const handleBook = () => {
    navigate('/reservar', { state: { category: 'Estadía', planCode: 'mahana_exp' } });
  };

  return (
    <div className="bg-mahana-light min-h-[95vh] animate-fade-in-up">
      {/* Premium Hero Banner */}
      <div className="relative h-[420px] w-full overflow-hidden">
        <img 
          src="/images/hero-pool-drone.jpg?v=2" 
          alt="Mahana Experience" 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mahana-dark via-mahana-dark/30 to-transparent" />
        
        <div className="absolute bottom-6 sm:bottom-12 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2 sm:space-y-4">
          <span className="px-3.5 py-1.5 bg-turquoise-700/90 text-sand-100 text-xs font-bold uppercase tracking-widest rounded-lg border border-turquoise-500/20">
            {language === 'es' ? 'Hospedaje Preferido' : 'Preferred Lodging'}
          </span>
          <h1 className="text-3xl sm:text-6xl font-black text-white tracking-tight">Mahana Experience</h1>
          <p className="text-sand-100/95 text-xs sm:text-xl max-w-3xl font-medium leading-relaxed">
            {language === 'es'
              ? 'Disfruta una escapada completa en Casa Mahana con estadía premium, pensión completa y acceso libre a nuestras áreas sociales e instalaciones.'
              : 'Enjoy a complete getaway at Casa Mahana with premium lodging, full board meals, and unlimited access to our social areas and facilities.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left Side: Rich visual details */}
        <div className="lg:col-span-2 space-y-14">
          
          {/* Main Description */}
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-turquoise-950 tracking-tight">
              {language === 'es' ? 'La tranquilidad de tener todo cubierto' : 'The tranquility of having everything covered'}
            </h2>
            <p className="text-mahana-dark/85 leading-relaxed text-base">
              {language === 'es' 
                ? 'Con el paquete Mahana Experience, te ofrecemos una estancia relajada y completa en Chame. Este plan incluye alojamiento y todas tus comidas principales (desayuno, almuerzo y cena). Para tu comodidad, puedes disfrutar de la gastronomía directamente en el lodge o frente al mar en nuestro club de playa Surfshack.'
                : 'With the Mahana Experience package, we offer you a relaxed and completely covered stay in Chame. This plan includes premium lodging and all your main meals (breakfast, lunch, and dinner). For your convenience, meals can be enjoyed directly at the lodge or oceanfront at our Surfshack beach club.'}
            </p>
          </div>

          {/* Rates Presentation (Elegant Table, No Cluttered Cards) */}
          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-widest font-black text-turquoise-750">
              {language === 'es' ? 'Tarifas por Persona (Impuestos Incluidos)' : 'Rates per Person (Taxes Included)'}
            </h3>
            
            <div className="bg-white rounded-3xl border border-sand-200 shadow-glass overflow-hidden">
              <div className="overflow-x-auto w-full scrollbar-thin">
                <table className="w-full min-w-[480px] sm:min-w-0 text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-sand-50/70 border-b border-sand-200 text-[10px] sm:text-xs font-bold text-turquoise-950 uppercase tracking-wider">
                      <th className="py-3 px-3 sm:py-4 sm:px-6">{language === 'es' ? 'Categoría' : 'Category'}</th>
                      <th className="py-3 px-3 sm:py-4 sm:px-6">{language === 'es' ? 'Domingo a Jueves' : 'Sunday to Thursday'}</th>
                      <th className="py-3 px-3 sm:py-4 sm:px-6">{language === 'es' ? 'Viernes y Sábado' : 'Friday and Saturday'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sand-100 font-medium text-mahana-dark/95">
                    <tr className="hover:bg-sand-50/20 transition-colors text-xs sm:text-sm">
                      <td className="py-3 px-3 sm:py-4.5 sm:px-6 font-bold text-turquoise-950">{language === 'es' ? 'Adulto (13+ años)' : 'Adult (13+ years)'}</td>
                      <td className="py-3 px-3 sm:py-4.5 sm:px-6 font-extrabold text-turquoise-900">B/. 49.50</td>
                      <td className="py-3 px-3 sm:py-4.5 sm:px-6 font-extrabold text-turquoise-900">B/. 60.50</td>
                    </tr>
                    <tr className="hover:bg-sand-50/20 transition-colors text-xs sm:text-sm">
                      <td className="py-3 px-3 sm:py-4.5 sm:px-6 font-bold text-turquoise-950">{language === 'es' ? 'Niño (2 a 12 años)' : 'Child (2 to 12 years)'}</td>
                      <td className="py-3 px-3 sm:py-4.5 sm:px-6 font-extrabold text-turquoise-900">B/. 38.50</td>
                      <td className="py-3 px-3 sm:py-4.5 sm:px-6 font-extrabold text-turquoise-900">B/. 38.50</td>
                    </tr>
                    <tr className="hover:bg-sand-50/20 transition-colors text-xs sm:text-sm">
                      <td className="py-3 px-3 sm:py-4.5 sm:px-6 font-bold text-turquoise-950">{language === 'es' ? 'Bebé (0 a 1 año)' : 'Infant (0 to 1 year)'}</td>
                      <td className="py-3 px-3 sm:py-4.5 sm:px-6 text-emerald-600 font-bold">{language === 'es' ? 'Gratis' : 'Free'}</td>
                      <td className="py-3 px-3 sm:py-4.5 sm:px-6 text-emerald-600 font-bold">{language === 'es' ? 'Gratis' : 'Free'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Elegant Experience Photos */}
          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-widest font-black text-turquoise-750">
              {language === 'es' ? 'La Experiencia en Imágenes' : 'The Experience in Photos'}
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

          {/* Clean Inclusions List */}
          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-widest font-black text-turquoise-750">
              {language === 'es' ? 'Detalles de Inclusiones del Plan' : 'Plan Inclusions Details'}
            </h3>
            
            <div className="bg-white rounded-3xl border border-sand-200 shadow-glass p-5 sm:p-8 space-y-4">
              {inclusions.map((inc, i) => (
                <div key={i} className="flex items-start space-x-3.5">
                  <Check className="h-5 w-5 text-turquoise-700 shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-mahana-dark/80">{inc.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Extras and Logistics info */}
          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-widest font-black text-turquoise-750">
              {language === 'es' ? 'Opciones Adicionales & Logística' : 'Additional Options & Logistics'}
            </h3>
            
            <div className="bg-white rounded-3xl border border-sand-200 shadow-glass p-5 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-semibold text-mahana-dark/80">
                <div className="space-y-2">
                  <h4 className="font-bold text-turquoise-950">{language === 'es' ? 'Late Check-Out' : 'Late Check-Out'}</h4>
                  <p className="text-xs text-mahana-dark/70 font-medium leading-relaxed">
                    {language === 'es'
                      ? 'Opción de salida tardía hasta las 5:00 p.m. disponible por un costo de B/. 15.00 (sujeta a disponibilidad del Lodge).'
                      : 'Late check-out option until 5:00 PM available for an extra charge of $15.00 (subject to hotel availability).'}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-turquoise-950">{language === 'es' ? 'Transporte a Surfshack' : 'Shuttle to Surfshack'}</h4>
                  <p className="text-xs text-mahana-dark/70 font-medium leading-relaxed">
                    {language === 'es'
                      ? 'Traslado opcional a nuestro club de playa en Playa Caracol. Puede coordinar transporte directo con nuestro equipo o asistir por su cuenta.'
                      : 'Optional transfer to our beach club at Playa Caracol. You can book safe transportation directly with us or attend on your own.'}
                  </p>
                </div>
              </div>
              
              <div className="border-t border-sand-100 pt-6">
                <h4 className="font-bold text-turquoise-950 text-sm mb-3">
                  {language === 'es' ? 'Políticas de Cambios y Cancelaciones' : 'Changes and Cancellations Policies'}
                </h4>
                <p className="text-xs text-mahana-dark/70 font-medium leading-relaxed">
                  {language === 'es'
                    ? 'Los cambios de fecha se permiten sin penalidad hasta 48 horas antes de la llegada. Posterior a este límite, se aplicará un cargo correspondiente al 50% de la reserva. Si desea complementar su plan, también ofrecemos la opción de mejorar su experiencia con barra libre nacional (Open Bar).'
                    : 'Date modifications are allowed with no penalty up to 48 hours prior to arrival. Past this limit, a 50% charge of the reservation will apply. If you wish to enhance your stay, we also offer the option to upgrade with our national open bar plan.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Elegant Sidebar booking box */}
        <div className="bg-white rounded-[32px] border border-sand-200 p-5 sm:p-8 shadow-premium h-fit space-y-6 lg:sticky lg:top-24">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-mahana-dark/60 font-bold block">
              {language === 'es' ? 'Tarifa por adulto desde' : 'Adult rate per night from'}
            </span>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-4xl font-black text-turquoise-950">$49.50</span>
              <span className="text-sm text-mahana-dark/60 font-semibold">USD / {t('common.nights')}</span>
            </div>
            <p className="text-xs text-emerald-600 font-extrabold flex items-center space-x-1.5">
              <ShieldCheck className="h-4.5 w-4.5 text-emerald-600" />
              <span>{language === 'es' ? 'Pensión Completa / Impuestos Incluidos' : 'Full Board / Taxes Included'}</span>
            </p>
          </div>

          <div className="border-t border-sand-100 pt-6 space-y-4 text-xs font-bold text-mahana-dark/75">
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-0 justify-between items-start sm:items-center">
              <span>{language === 'es' ? 'Régimen Alimenticio' : 'Meal Plan'}</span>
              <span className="text-turquoise-800 text-right sm:text-left">{language === 'es' ? 'Pensión Completa' : 'Full Board'}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-0 justify-between items-start sm:items-center">
              <span>{language === 'es' ? 'Impuestos de Alojamiento' : 'Lodging Taxes'}</span>
              <span className="text-emerald-600 uppercase text-right sm:text-left">{language === 'es' ? 'Incluidos' : 'Included'}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-0 justify-between items-start sm:items-center">
              <span>{language === 'es' ? 'Mascotas Admitidas' : 'Pet-Friendly'}</span>
              <span className="text-right sm:text-left">{language === 'es' ? 'Sí (sujeto a cargo adicional)' : 'Yes (additional fee applies)'}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-0 justify-between items-start sm:items-center">
              <span>{language === 'es' ? 'Capacidad Máxima' : 'Max Capacity'}</span>
              <span className="text-right sm:text-left">{language === 'es' ? 'Hasta 6 personas (Hab. Familiar)' : 'Up to 6 guests (Family Room)'}</span>
            </div>
          </div>

          <button
            onClick={handleBook}
            className="w-full py-4 bg-turquoise-700 hover:bg-turquoise-900 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all shadow-md group hover:scale-[1.01] active:scale-[0.99]"
          >
            <span>{t('products.mahana.cta')}</span>
            <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="text-center">
            <span className="text-[10px] uppercase tracking-wider text-mahana-dark/40 font-bold block">
              {language === 'es' ? 'Conexión Segura con el PMS del Lodge' : 'Secure Connection with Lodge PMS'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MahanaExperienceLanding;
