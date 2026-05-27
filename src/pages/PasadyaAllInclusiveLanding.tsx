import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Check, ArrowRight, ShieldCheck, Soup, GlassWater, Sparkles, Smile, Sun, Clock, Phone, MapPin } from 'lucide-react';

export const PasadyaAllInclusiveLanding: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const inclusions = [
    { 
      icon: <Soup className="h-5 w-5 text-turquoise-700" />, 
      titleEs: 'Almuerzo Completo Incluido', 
      titleEn: 'Complete Lunch Included',
      textEs: 'Proteínas a elegir: Pollo, Rib Eye o Chuleta de cerdo, acompañados de Arroz y ensalada fresca del día.',
      textEn: 'Proteins to choose: Chicken, Rib Eye, or Pork Chop, served with Rice and fresh salad of the day.'
    },
    { 
      icon: <GlassWater className="h-5 w-5 text-turquoise-700" />, 
      titleEs: 'Bebidas con Consumo Responsable', 
      titleEn: 'Drinks (Responsible Consumption)',
      textEs: 'Hasta 12 tragos de ron o seco, cervezas Coors, Miller Lite o sodas (según disponibilidad para consumo en el local).',
      textEn: 'Up to 12 drinks of rum, seco, Coors, Miller Lite, or sodas (subject to availability, on-site consumption).'
    },
    { 
      icon: <Sparkles className="h-5 w-5 text-turquoise-700" />, 
      titleEs: 'Bebidas sin Límite sin Alcohol', 
      titleEn: 'Unlimited Non-Alcoholic Drinks',
      textEs: 'Café, jugos, té caliente y té frío ilimitados servidos durante todo el día dentro del local.',
      textEn: 'Unlimited coffee, juices, hot tea, and iced tea served all day for on-site consumption.'
    },
    { 
      icon: <Smile className="h-5 w-5 text-turquoise-700" />, 
      titleEs: 'Ofertas Post Todo Incluido', 
      titleEn: 'Post All-Inclusive Special Rates',
      textEs: 'Una vez consumido tu paquete, obtén cervezas Coors/Miller Lite a $1.50 y tragos seleccionados a $2.00.',
      textEn: 'Once your package is consumed, get Coors/Miller Lite beers for $1.50 and select drinks for $2.00.'
    },
    { 
      icon: <Sun className="h-5 w-5 text-turquoise-700" />, 
      titleEs: 'Uso de Instalaciones del Lodge', 
      titleEn: 'Lodge Facilities Access',
      textEs: 'Acceso completo a nuestras 3 piscinas tropicales, duchas, vestidores, toallas, camastros y hamacas.',
      textEn: 'Full access to our 3 tropical pools, showers, changing rooms, towels, lounge chairs, and hammocks.'
    }
  ];

  const handleBook = () => {
    navigate('/reservar', { state: { category: 'Pasadía', planCode: 'pasadia_comidas' } });
  };

  return (
    <div className="bg-mahana-light min-h-[90vh] animate-fade-in-up">
      {/* Hero Banner (Beautiful Drone View Kept) */}
      <div className="relative h-96 w-full overflow-hidden">
        <img 
          src="/images/hero-pool-drone.jpg?v=2" 
          alt="Pasadía Todo Incluido" 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mahana-dark/90 via-mahana-dark/45 to-transparent" />
        
        <div className="absolute bottom-5 sm:bottom-10 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-1.5 sm:space-y-3">
          <span className="px-3 py-1 bg-amber-600 text-sand-100 text-xs font-bold uppercase tracking-wider rounded-md border border-amber-500/25">
            ✨ {language === 'es' ? 'Pasadía VIP Premium' : 'VIP Day Pass Premium'}
          </span>
          <h1 className="text-2xl sm:text-5xl font-black text-white tracking-tight">Pasadía Todo Incluido</h1>
          <p className="text-sand-100/90 text-xs sm:text-lg max-w-2xl font-medium">
            {language === 'es' 
              ? 'Disfruta un día espectacular en Chame con almuerzo a la carta, open bar nacional controlado de 12 tragos y bebidas sin alcohol ilimitadas.'
              : 'Enjoy a spectacular day in Chame with an a-la-carte lunch, a controlled 12-drink national open bar, and unlimited soft drinks.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left/Middle Content */}
        <div className="lg:col-span-2 space-y-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-turquoise-950">
              {language === 'es' ? 'La máxima desconexión diurna en Chame' : 'The ultimate daytime escape in Chame'}
            </h2>
            <p className="text-mahana-dark/85 leading-relaxed text-sm">
              {language === 'es'
                ? 'Con nuestro pasadía Todo Incluido, experimenta el servicio premium de Casa Mahana durante el día de 9:00 AM a 5:00 PM. Relájate frente a la piscina tropical con una cerveza fría en mano, disfruta de tu almuerzo seleccionando tu proteína favorita y refréscate con nuestra barra libre nacional controlada de hasta 12 tragos. Todo diseñado para un día inolvidable.'
                : 'With our All-Inclusive Day Pass, experience the premium service of Casa Mahana during the daytime from 9:00 AM to 5:00 PM. Relax in front of the tropical pool with a cold beer in hand, enjoy a delicious lunch choosing your favorite protein, and stay refreshed with our controlled 12-drink national open bar.'}
            </p>
          </div>

          {/* Pricing breakdown table */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest font-black text-turquoise-750">
              {language === 'es' ? 'Tarifas por Persona (Impuesto de Turismo 10% no incluido)' : 'Rates per Person (10% Tourism Tax not included)'}
            </h3>
            <div className="bg-white rounded-3xl border border-sand-200 shadow-glass overflow-hidden text-sm">
              <div className="overflow-x-auto w-full scrollbar-thin">
                <table className="w-full min-w-[480px] sm:min-w-0 text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-sand-50 border-b border-sand-200 text-[10px] sm:text-xs font-bold text-turquoise-950 uppercase tracking-wider">
                      <th className="py-3 px-3 sm:py-4 sm:px-6">{language === 'es' ? 'Categoría' : 'Category'}</th>
                      <th className="py-3 px-3 sm:py-4 sm:px-6">{language === 'es' ? 'Lunes a Jueves' : 'Monday to Thursday'}</th>
                      <th className="py-3 px-3 sm:py-4 sm:px-6">{language === 'es' ? 'Viernes a Domingo' : 'Friday to Sunday'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sand-100 font-medium text-mahana-dark/95">
                    <tr className="hover:bg-sand-50/20 transition-colors text-xs sm:text-sm">
                      <td className="py-3 px-3 sm:py-4.5 sm:px-6 font-bold text-turquoise-950">{language === 'es' ? 'Adulto (13+ años)' : 'Adult (13+ years)'}</td>
                      <td className="py-3 px-3 sm:py-4.5 sm:px-6 font-extrabold text-turquoise-900">B/. 38.50</td>
                      <td className="py-3 px-3 sm:py-4.5 sm:px-6 font-extrabold text-turquoise-900">B/. 44.00</td>
                    </tr>
                    <tr className="hover:bg-sand-50/20 transition-colors text-xs sm:text-sm">
                      <td className="py-3 px-3 sm:py-4.5 sm:px-6 font-bold text-turquoise-950">{language === 'es' ? 'Niño Grande (6 a 17 años)' : 'Older Child (6 to 17 years)'}</td>
                      <td className="py-3 px-3 sm:py-4.5 sm:px-6 font-extrabold text-turquoise-900">B/. 20.00</td>
                      <td className="py-3 px-3 sm:py-4.5 sm:px-6 font-extrabold text-turquoise-900">B/. 20.00</td>
                    </tr>
                    <tr className="hover:bg-sand-50/20 transition-colors text-xs sm:text-sm">
                      <td className="py-3 px-3 sm:py-4.5 sm:px-6 font-bold text-turquoise-950">{language === 'es' ? 'Niño Pequeño (2 a 5 años)' : 'Younger Child (2 to 5 years)'}</td>
                      <td className="py-3 px-3 sm:py-4.5 sm:px-6 font-extrabold text-turquoise-900">B/. 10.00</td>
                      <td className="py-3 px-3 sm:py-4.5 sm:px-6 font-extrabold text-turquoise-900">B/. 10.00</td>
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

          {/* Inclusions */}
          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-widest font-black text-turquoise-750">
              {language === 'es' ? 'Detalle de Inclusiones del Plan VIP' : 'VIP Plan Inclusions Details'}
            </h3>
            <div className="space-y-4">
              {inclusions.map((inc, i) => (
                <div key={i} className="flex items-start space-x-4 bg-white p-6 rounded-2xl border border-sand-200/60 shadow-glass">
                  <div className="p-2.5 bg-amber-50 text-amber-700 rounded-xl shrink-0 mt-0.5">
                    {inc.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-turquoise-950 text-sm">
                      {language === 'es' ? inc.titleEs : inc.titleEn}
                    </h4>
                    <p className="text-xs text-mahana-dark/75 leading-relaxed font-semibold">
                      {language === 'es' ? inc.textEs : inc.textEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="bg-white rounded-3xl border border-sand-200/80 p-5 sm:p-8 space-y-6 shadow-glass text-sm">
            <h3 className="font-extrabold text-turquoise-950 text-base">
              {language === 'es' ? 'Información y Ubicación del Lodge' : 'Information & Lodge Location'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-mahana-dark/80 font-semibold">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-turquoise-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-turquoise-950 text-xs uppercase tracking-wider">{language === 'es' ? 'Dirección' : 'Address'}</h4>
                  <p className="text-xs text-mahana-dark/70 font-medium">
                    {language === 'es'
                      ? 'Vía a Punta Chame, a 2 km de la carretera Interamericana, Chame, Panamá.'
                      : 'Vía to Punta Chame, 2 km from the Inter-American Highway, Chame, Panama.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-turquoise-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-turquoise-950 text-xs uppercase tracking-wider">{language === 'es' ? 'Contacto Directo' : 'Direct Contact'}</h4>
                  <p className="text-xs text-mahana-dark/70 font-medium">
                    Tel: 345-3222 <br />
                    WhatsApp: 6290-6800
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right booking box */}
        <div className="bg-white rounded-[32px] border border-sand-200 p-5 sm:p-8 shadow-premium h-fit space-y-6 lg:sticky lg:top-24">
          <div className="space-y-1.5">
            <span className="text-xs uppercase tracking-wider text-mahana-dark/60 font-bold block">
              {language === 'es' ? 'Tarifa VIP por persona desde' : 'VIP Rate per person from'}
            </span>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-4xl font-black text-turquoise-950">$38.50</span>
              <span className="text-sm text-mahana-dark/60 font-semibold">USD / {language === 'es' ? 'adulto' : 'adult'}</span>
            </div>
            <p className="text-xs text-amber-600 font-bold flex items-center space-x-1">
              <ShieldCheck className="h-4 w-4 shrink-0 text-amber-600" />
              <span>{language === 'es' ? 'Almuerzo + Open Bar (hasta 12 tragos)' : 'Lunch + Open Bar (up to 12 drinks)'}</span>
            </p>
          </div>

          <div className="border-t border-sand-100 pt-6 space-y-4 text-xs font-bold text-mahana-dark/75">
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-0 justify-between items-start sm:items-center">
              <span>{language === 'es' ? 'Horario' : 'Hours'}</span>
              <span className="text-right sm:text-left">9:00 AM - 5:00 PM</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-0 justify-between items-start sm:items-center">
              <span>{language === 'es' ? 'Impuesto de Turismo' : 'Tourism Tax'}</span>
              <span className="text-turquoise-800 text-right sm:text-left">10% ({language === 'es' ? 'no incluido' : 'not included'})</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-0 justify-between items-start sm:items-center">
              <span>{language === 'es' ? 'Servicios' : 'Services'}</span>
              <span className="text-right sm:text-left">{language === 'es' ? 'Toallas y camastros incluidos' : 'Towels and loungers included'}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-0 justify-between items-start sm:items-center">
              <span>{language === 'es' ? 'Mascotas' : 'Pets'}</span>
              <span className="text-right sm:text-left">{language === 'es' ? 'Permitido (áreas exteriores)' : 'Allowed (outdoor areas)'}</span>
            </div>
          </div>

          <button
            onClick={handleBook}
            className="w-full py-4 bg-turquoise-700 hover:bg-turquoise-900 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all shadow-md group hover:scale-[1.01] active:scale-[0.99]"
          >
            <span>{language === 'es' ? 'Reservar Pasadía VIP' : 'Book VIP Day Pass'}</span>
            <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="border-t border-sand-100 pt-6 space-y-3">
            <h4 className="font-bold text-turquoise-950 text-xs uppercase tracking-wider">
              {language === 'es' ? 'Políticas Importantes' : 'Important Policies'}
            </h4>
            <ul className="text-[11px] text-mahana-dark/70 font-semibold leading-relaxed space-y-2 list-disc pl-4">
              <li>
                {language === 'es'
                  ? 'Tarifa promocional válida hasta Octubre de 2025. No aplica en feriados o días festivos.'
                  : 'Promotional rate valid until October 2025. Does not apply on national holidays or festive days.'}
              </li>
              <li>
                {language === 'es'
                  ? 'Cancelaciones o cambios de fecha realizados con menos de 72 horas de anticipación conllevan un cargo del 50% por No Show.'
                  : 'Cancellations or date changes made with less than 72 hours notice carry a 50% charge for No Show.'}
              </li>
              <li>
                {language === 'es'
                  ? 'No aplica para otras promociones, descuentos, ni descuentos de jubilados.'
                  : 'Not applicable for other promotions, discounts, or retiree discounts.'}
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

export default PasadyaAllInclusiveLanding;
