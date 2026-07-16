import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { SEO } from '../components/SEO';

export const EstadiaAllInclusiveLanding: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const inclusions = [
    { text: language === 'es' ? 'Pensión Completa: Desayuno, Almuerzo y Cena' : 'Full Board: Breakfast, Lunch, and Dinner included' },
    { text: language === 'es' ? 'Snack de bienvenida al llegar a Casa Mahana' : 'Complimentary welcome snack upon arrival at Casa Mahana' },
    { text: language === 'es' ? 'Comidas en el Lodge o frente al mar en Surfshack Beach Club' : 'Meals available at the Lodge or oceanfront at Surfshack Beach Club' },
    { text: language === 'es' ? 'Open Bar Premium Ilimitado (cócteles, vinos, cervezas, tragos nacionales)' : 'Unlimited Premium Open Bar (cocktails, wine, beers, local spirits)' },
    { text: language === 'es' ? 'Hasta 6 cervezas por adulto en cooler para llevar a la playa' : 'Up to 6 beers per adult in a cooler to take to the beach' },
    { text: language === 'es' ? 'Bebidas sin alcohol ilimitadas (refrescos, jugos, café, té)' : 'Unlimited non-alcoholic beverages (soft drinks, juices, coffee, tea)' },
    { text: language === 'es' ? 'Mocktails (cócteles sin alcohol) ilimitados para niños' : 'Unlimited mocktails (non-alcoholic cocktails) for children' },
    { text: language === 'es' ? 'Acceso libre a la piscina tropical y hamacas durante el día' : 'Daytime access to the tropical pool and hammock areas' }
  ];

  const experiencePhotos = [
    { src: '/images/food-pizza-stretch.jpg', titleEs: 'Pizzas Artesanales Hechas en Horno de Leña', titleEn: 'Artisanal Pizzas Fresh from Wood-Fired Oven' },
    { src: '/images/food-cocktail.jpg', titleEs: 'Cócteles de Autor y Open Bar Premium', titleEn: 'Signature Cocktails & Premium Open Bar' },
    { src: '/images/hero-pool-drone-aerial.jpg', titleEs: 'Piscina de Lujo y Socialización del Lodge', titleEn: 'Luxury Swimming Pool & Lodge Social Grounds' }
  ];

  const handleBook = () => {
    navigate('/reservar', { state: { category: 'Estadía', planCode: 'todo_incluido' } });
  };

  return (
    <div className="bg-mahana-light min-h-[95vh] animate-fade-in-up">
      <SEO 
        titleEs="Estadía Todo Incluido + Open Bar — Casa Mahana Lodge"
        titleEn="All-Inclusive Stay + Open Bar — Casa Mahana Lodge"
        descriptionEs="Disfruta de la desconexión definitiva con hospedaje, pensión completa, barra libre de cócteles premium ilimitados y traslado al club de playa Surf Shack."
        descriptionEn="Enjoy the ultimate escape with premium lodging, full board meals, unlimited premium open bar cocktails, and beach club shuttle."
        image="/images/all-inclusive-pool-hero-v2.jpg"
        path="/estadias/todo-incluido"
      />
      {/* Premium Hero Banner */}
      <div className="relative h-[420px] w-full overflow-hidden">
        <img 
          src="/images/all-inclusive-pool-hero-v2.jpg" 
          alt="All Inclusive Stays" 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mahana-dark via-mahana-dark/30 to-transparent" />
        
        <div className="absolute bottom-6 sm:bottom-12 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2 sm:space-y-4">
          <span className="px-3.5 py-1.5 bg-turquoise-750/90 text-sand-100 text-xs font-bold uppercase tracking-widest rounded-lg border border-turquoise-500/20">
            {language === 'es' ? 'Plan VIP Premium' : 'VIP Premium Plan'}
          </span>
          <h1 className="text-3xl sm:text-6xl font-black text-white tracking-tight">Todo Incluido + Open Bar</h1>
          <p className="text-sand-100/95 text-xs sm:text-xl max-w-3xl font-medium leading-relaxed">
            {language === 'es'
              ? 'Disfruta la desconexión definitiva con hospedaje, pensión completa, barra libre de cócteles premium ilimitados y traslado al club de playa.'
              : 'Enjoy the ultimate escape with premium lodging, full board meals, unlimited premium open bar cocktails, and beach club shuttle.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left Side: Details */}
        <div className="lg:col-span-2 space-y-14">
          
          {/* Intro Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-turquoise-950 tracking-tight">
              {language === 'es' ? 'La experiencia de desconexión definitiva' : 'The ultimate disconnection experience'}
            </h2>
            <p className="text-mahana-dark/85 leading-relaxed text-base">
              {language === 'es' 
                ? 'Nuestro plan Todo Incluido + Open Bar está diseñado para quienes buscan una escapada sin límites ni preocupaciones en Chame. Disfruta de un snack de bienvenida al llegar al lodge, accede a cenas a la carta con más de 8 platos para escoger y deléitate con desayunos y almuerzos en el lodge o directamente frente al mar en nuestro club de playa Surfshack.'
                : 'Our All-Inclusive + Open Bar plan is designed for those seeking a limitless, carefree getaway in Chame. Savor a welcome snack upon arrival, choose from over 8 premium a-la-carte dishes for dinner, and enjoy breakfasts and lunches at the lodge or right in front of the ocean at Surfshack Beach Club.'}
            </p>
          </div>

          {/* Rates Table (Elegant, No Clutter) */}
          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-widest font-black text-turquoise-755">
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
                      <td className="py-3 px-3 sm:py-4.5 sm:px-6 font-extrabold text-turquoise-900">B/. 66.00</td>
                      <td className="py-3 px-3 sm:py-4.5 sm:px-6 font-extrabold text-turquoise-900">B/. 77.00</td>
                    </tr>
                    <tr className="hover:bg-sand-50/20 transition-colors text-xs sm:text-sm">
                      <td className="py-3 px-3 sm:py-4.5 sm:px-6 font-bold text-turquoise-950">{language === 'es' ? 'Niño (2 a 12 años)' : 'Child (2 to 12 years)'}</td>
                      <td className="py-3 px-3 sm:py-4.5 sm:px-6 font-extrabold text-turquoise-900">B/. 49.50</td>
                      <td className="py-3 px-3 sm:py-4.5 sm:px-6 font-extrabold text-turquoise-900">B/. 49.50</td>
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
              {language === 'es' ? 'La Experiencia Todo Incluido en Imágenes' : 'The All-Inclusive Experience in Photos'}
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
              {language === 'es' ? 'Inclusiones Detalladas del Plan VIP' : 'VIP Plan Detailed Inclusions'}
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

          {/* Transportation and Late checkout detail card */}
          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-widest font-black text-turquoise-750">
              {language === 'es' ? 'Transporte Opcional & Opciones Extras' : 'Optional Transportation & Extra Add-ons'}
            </h3>
            
            <div className="bg-white rounded-3xl border border-sand-200 shadow-glass p-5 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-semibold text-mahana-dark/80">
                <div className="space-y-2">
                  <h4 className="font-bold text-turquoise-950">{language === 'es' ? 'Transporte a Surfshack' : 'Shuttle to Surfshack'}</h4>
                  <p className="text-xs text-mahana-dark/70 font-medium leading-relaxed">
                    {language === 'es'
                      ? 'Traslado opcional de ida y vuelta al Club de Playa. Tarifa de B/. 10.00 por habitación (Estándar o Doble) o B/. 15.00 por habitación Familiar. Salida única a las 9:00 a.m. y regresos a las 12:30 p.m. o 5:00 p.m. Se requiere confirmación de espacio al reservar.'
                      : 'Optional round-trip beach club shuttle. Rate of $10.00 per Standard or Double room, or $15.00 per Family room. Departure at 9:00 AM, returns at 12:30 PM or 5:00 PM. Seating confirmation is required when booking.'}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-turquoise-950">{language === 'es' ? 'Late Check-Out' : 'Late Check-Out'}</h4>
                  <p className="text-xs text-mahana-dark/70 font-medium leading-relaxed">
                    {language === 'es'
                      ? 'Extiende tu estadía hasta las 5:00 p.m. y disfruta de todas nuestras instalaciones por un costo de B/. 15.00 extra (sujeto a disponibilidad).'
                      : 'Extend your stay until 5:00 PM and enjoy all social areas and pool for an extra $15.00 (subject to hotel availability).'}
                  </p>
                </div>
              </div>
              
              <div className="border-t border-sand-100 pt-6">
                <h4 className="font-bold text-turquoise-950 text-sm mb-3">
                  {language === 'es' ? 'Políticas Importantes del Plan' : 'Important Plan Policies'}
                </h4>
                <ul className="text-xs text-mahana-dark/70 font-medium leading-relaxed space-y-2 list-disc pl-4">
                  <li>
                    {language === 'es'
                      ? 'Cupos de bus limitados: Confirma tu asiento al reservar. Si prefieres quedarte disfrutando de las instalaciones de Casa Mahana, indica "Bus NO".'
                      : 'Shuttle seats are limited: Confirm your seat when booking. If you prefer to stay and enjoy Casa Mahana facilities, indicate "Bus NO".'}
                  </li>
                  <li>
                    {language === 'es'
                      ? 'Cancelaciones y cambios: Los cambios de fecha se permiten sin penalidad hasta 48 horas antes de la llegada. Posterior a este límite, se aplicará un cargo del 50%.'
                      : 'Cancellations and changes: Modifications allowed with no penalty up to 48 hours prior to arrival. Past this limit, a 50% charge applies.'}
                  </li>
                  <li>
                    {language === 'es'
                      ? 'Licores Premium: El plan incluye licores, cócteles, vinos y cervezas nacionales de forma ilimitada. Consumos de marcas importadas premium conllevan cargo adicional.'
                      : 'Premium Spirits: The plan includes unlimited national liquors, cocktails, wines, and beers. Imported premium spirit brands are subject to surcharge.'}
                  </li>
                </ul>
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
              <span className="text-4xl font-black text-turquoise-950">$66</span>
              <span className="text-sm text-mahana-dark/60 font-semibold">USD / {t('common.nights')}</span>
            </div>
            <p className="text-xs text-emerald-600 font-extrabold flex items-center space-x-1.5">
              <ShieldCheck className="h-4.5 w-4.5 text-emerald-600" />
              <span>{language === 'es' ? 'Pensión Completa + Open Bar Ilimitado' : 'Full Board + Unlimited Open Bar'}</span>
            </p>
          </div>

          <div className="border-t border-sand-100 pt-6 space-y-4 text-xs font-bold text-mahana-dark/75">
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-0 justify-between items-start sm:items-center">
              <span>{language === 'es' ? 'Régimen Alimenticio' : 'Meal Plan'}</span>
              <span className="text-turquoise-800 text-right sm:text-left">{language === 'es' ? 'Pensión Completa' : 'Full Board'}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-0 justify-between items-start sm:items-center">
              <span>{language === 'es' ? 'Barra de Bebidas' : 'Beverage Package'}</span>
              <span className="text-turquoise-800 text-right sm:text-left">{language === 'es' ? 'Open Bar Premium' : 'Premium Open Bar'}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-0 justify-between items-start sm:items-center">
              <span>{language === 'es' ? 'Impuestos de Alojamiento' : 'Lodging Taxes'}</span>
              <span className="text-emerald-600 uppercase text-right sm:text-left">{language === 'es' ? 'Incluidos' : 'Included'}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-0 justify-between items-start sm:items-center">
              <span>{language === 'es' ? 'Mascotas Admitidas' : 'Pet-Friendly'}</span>
              <span className="text-right sm:text-left">{language === 'es' ? 'Sí (sujeto a cargo adicional)' : 'Yes (additional fee applies)'}</span>
            </div>
          </div>

          <button
            onClick={handleBook}
            className="w-full py-4 bg-turquoise-700 hover:bg-turquoise-900 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all shadow-md group hover:scale-[1.01] active:scale-[0.99]"
          >
            <span>{t('products.all_inclusive.cta')}</span>
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

export default EstadiaAllInclusiveLanding;
