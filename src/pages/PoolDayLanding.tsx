import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Check, ArrowRight, ShieldAlert, Sun, Landmark, Utensils, GlassWater, Clock, Ban } from 'lucide-react';

export const PoolDayLanding: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const promos = [
    { 
      icon: <GlassWater className="h-5 w-5 text-turquoise-700" />, 
      titleEs: 'Tragos de Ron Selecto B/. 1.50', 
      titleEn: 'Select Rum Drinks $1.50',
      descEs: 'Disfruta de tragos de ron seleccionados a solo B/. 1.50 cada uno.',
      descEn: 'Enjoy select rum drinks for only $1.50 each.'
    },
    { 
      icon: <GlassWater className="h-5 w-5 text-turquoise-700" />, 
      titleEs: 'Cubetazos Nacionales B/. 9.00', 
      titleEn: 'National Beer Buckets $9.00',
      descEs: 'Cubetazos de Atlas Golden, Balboa Ice o Panamá a solo B/. 9.00 + impuestos (sujeto a disponibilidad).',
      descEn: 'Beer buckets of Atlas Golden, Balboa Ice, or Panamá for only $9.00 + taxes (subject to availability).'
    },
    { 
      icon: <Utensils className="h-5 w-5 text-turquoise-700" />, 
      titleEs: 'Ceviche del Día al 2x1', 
      titleEn: '2x1 Ceviche of the Day',
      descEs: 'Deléitate con nuestra promoción especial de ceviche fresco del día al doble por el precio de uno.',
      descEn: 'Indulge in our special promotion of fresh ceviche of the day - two for the price of one.'
    },
    { 
      icon: <Utensils className="h-5 w-5 text-turquoise-700" />, 
      titleEs: 'Alitas con Papas B/. 6.00', 
      titleEn: 'Wings & Fries $6.00',
      descEs: 'Crujientes alitas de pollo acompañadas de papas fritas por solo B/. 6.00.',
      descEn: 'Crispy chicken wings served with golden french fries for only $6.00.'
    },
    { 
      icon: <Utensils className="h-5 w-5 text-turquoise-700" />, 
      titleEs: '1/4 Pollo Rostizado B/. 6.00', 
      titleEn: '1/4 Roasted Chicken $6.00',
      descEs: 'Un cuarto de sabroso pollo rostizado acompañado de papas fritas o yuquitas fritas a tu elección por B/. 6.00.',
      descEn: 'A quarter of delicious roasted chicken served with french fries or fried yuca chips for only $6.00.'
    }
  ];

  const handleBook = () => {
    navigate('/reservar', { state: { category: 'Pasadía', planCode: 'pasadia_entrada' } });
  };

  return (
    <div className="bg-mahana-light min-h-[90vh] animate-fade-in-up">
      {/* Hero Banner (Using the newly uploaded pool photo) */}
      <div className="relative h-96 w-full overflow-hidden">
        <img 
          src="/images/pool-day-promo-hero-v3.jpg" 
          alt="Pool Day Pass" 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mahana-dark/90 via-mahana-dark/45 to-transparent" />
        
        <div className="absolute bottom-5 sm:bottom-10 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-1.5 sm:space-y-3">
          <span className="px-3 py-1 bg-turquoise-700 text-sand-100 text-xs font-bold uppercase tracking-wider rounded-md border border-turquoise-500/25 animate-pulse">
            🔥 {language === 'es' ? 'PROMO TODOS LOS DÍAS' : 'DAILY PROMO'}
          </span>
          <h1 className="text-2xl sm:text-5xl font-black text-white tracking-tight">Pool Day / Pasadía de Sol</h1>
          <p className="text-sand-100/90 text-xs sm:text-lg max-w-2xl font-medium">
            {language === 'es'
              ? 'Disfruta el mejor ambiente, piscinas tropicales y promociones inigualables de comidas y bebidas en Casa Mahana.'
              : 'Enjoy the best atmosphere, tropical swimming pools, and unbeatable food and drink promotions at Casa Mahana.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left/Middle Content */}
        <div className="lg:col-span-2 space-y-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-turquoise-950">
              {language === 'es' ? 'Tu día de sol perfecto en Casa Mahana' : 'Your perfect sunny day at Casa Mahana'}
            </h2>
            <p className="text-mahana-dark/85 leading-relaxed text-sm">
              {language === 'es'
                ? '¿Buscas relajarte bajo el sol con buena música y deliciosas opciones sin pagar de más? Nuestro plan Pool Day de acceso básico te brinda entrada a las 3 piscinas tropicales y áreas comunes del lodge de 9:00 AM a 5:00 PM. Además, habilitamos promociones especiales a la carta para comer y tomar a precios increíbles en nuestro bar de piscina. Para gustos más variados, nuestro restaurante principal cuenta con un menú a la carta todos los días.'
                : 'Looking to relax under the sun with good music and delicious options without overpaying? Our basic Pool Day pass gives you access to all 3 tropical pools and lodge common areas from 9:00 AM to 5:00 PM. In addition, we unlock exclusive a-la-carte food and drink promotions at amazing prices at our pool bar.'}
            </p>
          </div>

          {/* Pricing Table */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest font-black text-turquoise-750">
              {language === 'es' ? 'Tarifas de Entrada' : 'Admission Rates'}
            </h3>
            <div className="bg-white rounded-3xl border border-sand-200 shadow-glass overflow-hidden text-sm">
              <div className="overflow-x-auto w-full scrollbar-thin">
                <table className="w-full min-w-[500px] sm:min-w-0 text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-sand-50 border-b border-sand-200 text-[10px] sm:text-xs font-bold text-turquoise-950 uppercase tracking-wider">
                      <th className="py-3 px-3 sm:py-4 sm:px-6">{language === 'es' ? 'Categoría' : 'Category'}</th>
                      <th className="py-3 px-3 sm:py-4 sm:px-6">{language === 'es' ? 'Lunes a Domingo Normal' : 'Standard Monday to Sunday'}</th>
                      <th className="py-3 px-3 sm:py-4 sm:px-6">{language === 'es' ? 'Días Festivos / Feriados' : 'Festive Days / Holidays'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sand-100 font-medium text-mahana-dark/95">
                    <tr className="hover:bg-sand-50/20 transition-colors text-xs sm:text-sm">
                      <td className="py-3 px-3 sm:py-4.5 sm:px-6 font-bold text-turquoise-950">{language === 'es' ? 'Adulto (13+ años)' : 'Adult (13+ years)'}</td>
                      <td className="py-3 px-3 sm:py-4.5 sm:px-6 font-extrabold text-turquoise-900">B/. 5.50</td>
                      <td className="py-3 px-3 sm:py-4.5 sm:px-6 font-extrabold text-turquoise-900">B/. 10.00</td>
                    </tr>
                    <tr className="hover:bg-sand-50/20 transition-colors text-xs sm:text-sm">
                      <td className="py-3 px-3 sm:py-4.5 sm:px-6 font-bold text-turquoise-950">{language === 'es' ? 'Niños de 0 a 4 años' : 'Children 0 to 4 years'}</td>
                      <td className="py-3 px-3 sm:py-4.5 sm:px-6 text-emerald-600 font-bold">{language === 'es' ? '¡Gratis!' : 'Free!'}</td>
                      <td className="py-3 px-3 sm:py-4.5 sm:px-6 text-emerald-600 font-bold">{language === 'es' ? '¡Gratis!' : 'Free!'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Exclusives Day Promos */}
          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-widest font-black text-turquoise-750">
              {language === 'es' ? 'Promociones Exclusivas del Pool Bar' : 'Exclusive Pool Bar Promotions'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {promos.map((promo, i) => (
                <div key={i} className="flex items-start space-x-3.5 bg-white p-5 rounded-2xl border border-sand-200/60 shadow-glass">
                  <div className="p-2.5 bg-turquoise-50 text-turquoise-700 rounded-xl shrink-0 mt-0.5">
                    {promo.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-turquoise-950 text-sm">
                      {language === 'es' ? promo.titleEs : promo.titleEn}
                    </h4>
                    <p className="text-xs text-mahana-dark/75 leading-relaxed font-semibold">
                      {language === 'es' ? promo.descEs : promo.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strict Rules ban block */}
          <div className="bg-rose-50/30 rounded-3xl border border-rose-200/60 p-5 sm:p-8 space-y-4">
            <div className="flex items-center space-x-3 text-rose-800">
              <Ban className="h-5 w-5 shrink-0" />
              <h3 className="font-extrabold text-sm uppercase tracking-wide">
                {language === 'es' ? 'Políticas de Convivencia y Prohibiciones' : 'Coexistence Policies & Prohibitions'}
              </h3>
            </div>
            <p className="text-xs text-mahana-dark/75 leading-relaxed font-semibold">
              {language === 'es'
                ? 'Para garantizar la tranquilidad y orden de Casa Mahana, no se admite bajo ninguna circunstancia el ingreso de hieleras (coolers), bocinas/parlantes bluetooth ni alimentos/snacks externos al lodge.'
                : 'To ensure a peaceful and orderly atmosphere at Casa Mahana, the entry of coolers, Bluetooth speakers, and external snacks/food is strictly prohibited.'}
            </p>
          </div>
        </div>

        {/* Right Booking Sidebar */}
        <div className="bg-white rounded-[32px] border border-sand-200 p-5 sm:p-8 shadow-premium h-fit space-y-6 lg:sticky lg:top-24">
          <div className="space-y-1.5">
            <span className="text-xs uppercase tracking-wider text-mahana-dark/60 font-bold block">
              {language === 'es' ? 'Precio de entrada desde' : 'Admission price from'}
            </span>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-4xl font-black text-turquoise-950">$5.50</span>
              <span className="text-sm text-mahana-dark/60 font-semibold">USD / {language === 'es' ? 'adulto' : 'adult'}</span>
            </div>
            <p className="text-xs text-turquoise-700 font-extrabold flex items-center space-x-1">
              <Clock className="h-4 w-4 text-turquoise-700" />
              <span>{language === 'es' ? 'Entrada: 9 AM | Salida: 5 PM' : 'Arrival: 9 AM | Departure: 5 PM'}</span>
            </p>
          </div>

          <div className="border-t border-sand-100 pt-6 space-y-4 text-xs font-bold text-mahana-dark/75">
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-0 justify-between items-start sm:items-center">
              <span>{language === 'es' ? 'Piscinas Tropicales' : 'Tropical Pools'}</span>
              <span className="text-right sm:text-left">{language === 'es' ? '3 Piscinas Incluidas' : '3 Pools Included'}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-0 justify-between items-start sm:items-center">
              <span>{language === 'es' ? 'Servicios del Lodge' : 'Lodge Services'}</span>
              <span className="text-right sm:text-left">{language === 'es' ? 'Duchas y vestidores' : 'Showers and changing rooms'}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-0 justify-between items-start sm:items-center">
              <span>{language === 'es' ? 'Comidas & Bebidas' : 'Meals & Drinks'}</span>
              <span className="text-turquoise-800 text-right sm:text-left">{language === 'es' ? 'A la Carta / Promo Bar' : 'A la Carte / Promo Bar'}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-0 justify-between items-start sm:items-center">
              <span>{language === 'es' ? 'Mascotas' : 'Pets'}</span>
              <span className="text-right sm:text-left">{language === 'es' ? 'Sí (con correa bajo control)' : 'Yes (must remain on leash)'}</span>
            </div>
          </div>

          <button
            onClick={handleBook}
            className="w-full py-4 bg-turquoise-700 hover:bg-turquoise-900 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all shadow-md group hover:scale-[1.01] active:scale-[0.99]"
          >
            <span>{language === 'es' ? 'Reservar Pool Day' : 'Book Pool Day'}</span>
            <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="border-t border-sand-100 pt-6 space-y-3">
            <h4 className="font-bold text-turquoise-950 text-xs uppercase tracking-wider">
              {language === 'es' ? 'Políticas Importantes' : 'Important Policies'}
            </h4>
            <ul className="text-[11px] text-mahana-dark/70 font-semibold leading-relaxed space-y-2 list-disc pl-4">
              <li>
                {language === 'es'
                  ? 'Tarifa promocional válida hasta Julio del 2026. No aplica con descuento de jubilados.'
                  : 'Promotional rate valid until July 2026. Does not apply to retiree discounts.'}
              </li>
              <li>
                {language === 'es'
                  ? 'Cancelaciones o cambios de fecha con menos de 72 horas de anticipación conllevan un cargo del 50% de la reserva por No Show.'
                  : 'Cancellations or date changes made with less than 72 hours notice carry a 50% charge for No Show.'}
              </li>
              <li>
                {language === 'es'
                  ? 'La tarifa de B/. 5.50 no aplica en días feriados o festivos nacionales (aplica tarifa de B/. 10.00).'
                  : 'The $5.50 rate does not apply on national holidays or festive days (holiday rate of $10.00 applies).'}
              </li>
            </ul>
          </div>

          <div className="text-center">
            <span className="text-[10px] uppercase tracking-wider text-mahana-dark/40 font-bold block">
              {language === 'es' ? 'Conexión directa segura con el PMS del Hotel' : 'Secure direct connection to Hotel PMS'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolDayLanding;
