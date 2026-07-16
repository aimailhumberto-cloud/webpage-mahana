import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Check, Clock, Calendar, ArrowRight, Sun, GlassWater, ShieldAlert, Sparkles } from 'lucide-react';
import { SEO } from '../components/SEO';

export const PasadiasHub: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const dayPasses = [
    {
      id: 'todo-incluido',
      title: language === 'es' ? 'Pasadía con Todo Incluido' : 'All-Inclusive Day Pass',
      desc: language === 'es' 
        ? 'Disfruta de un día espectacular con almuerzo premium a la carta, open bar nacional (hasta 12 tragos) y snacks ilimitados de piscina.' 
        : 'Enjoy a spectacular day with premium a-la-carte lunch, local open bar (up to 12 drinks), and unlimited pool snacks.',
      price: '$38.50',
      priceUnit: language === 'es' ? 'adulto' : 'adult',
      planCode: 'pasadia_comidas',
      img: '/images/hero-pool-deck.jpg?v=2',
      detailsLink: '/pasadias/todo-incluido',
      inclusions: language === 'es'
        ? ["Acceso completo de 9 AM a 5 PM", "Almuerzo premium a la carta", "Open bar nacional (hasta 12 tragos de cerveza, ron, vodka)", "Snacks de piscina ilimitados (alitas, patacones)", "Uso de toallas, camastros y 3 piscinas tropicales"]
        : ["Full Access from 9 AM to 5 PM", "Premium a-la-carte lunch included", "Local open bar (up to 12 drinks: beer, rum, vodka)", "Unlimited pool snacks (wings, plantain chips)", "Lodge towels, loungers & 3 tropical pools access"],
      badge: 'VIP'
    },
    {
      id: 'pool-day',
      title: language === 'es' ? 'Pool Day' : 'Pool Day',
      desc: language === 'es'
        ? 'Acceso completo a nuestras piscinas, áreas sociales y hermosos jardines tropicales. Consumos de comida y bebidas no están incluidos.'
        : 'Full access to our pool facilities, social areas, and beautiful tropical gardens. Food and beverage consumption is not included.',
      price: '$5.50',
      priceUnit: language === 'es' ? 'adulto' : 'adult',
      planCode: 'pasadia_entrada',
      img: '/images/hero-pool-drone.jpg?v=2',
      detailsLink: '/pasadias/pool-day',
      inclusions: language === 'es'
        ? ["Acceso completo de 9 AM a 5 PM", "Uso de piscina y duchas externas", "Acceso a camastros y hamacas (sujeto a disponibilidad)", "Consumos de restaurante y bar se pagan por separado"]
        : ["Full Access from 9 AM to 5 PM", "Use of pool and outdoor showers", "Hammocks & lounge chairs access (subject to availability)", "Restaurant and bar consumption paid separately"],
      badge: language === 'es' ? 'Básico' : 'Basic'
    }
  ];

  const handleBook = (planCode: string) => {
    navigate('/reservar', { state: { category: 'Pasadía', planCode } });
  };

  return (
    <div className="py-16 bg-mahana-light min-h-[90vh] animate-fade-in-up">
      <SEO 
        titleEs="Pasadías y Day Passes — Casa Mahana Lodge"
        titleEn="Day Passes & Pool Days — Casa Mahana Lodge"
        descriptionEs="Pasa el día en el paraíso de Chame. Elige entre nuestro Pool Day económico o el Pasadía Todo Incluido con almuerzo gourmet, snacks y open bar nacional."
        descriptionEn="Spend the day in paradise in Chame. Choose between our budget-friendly Pool Day or the All-Inclusive Day Pass with gourmet lunch, snacks, and local open bar."
        image="/images/hero-pool-deck.jpg"
        path="/pasadias"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-sm uppercase tracking-widest text-turquoise-700 font-extrabold flex items-center justify-center space-x-1.5">
            <Sun className="h-4.5 w-4.5 animate-spin" style={{ animationDuration: '20s' }} />
            <span>{language === 'es' ? 'DÍAS DE SOL' : 'DAYS OF SUN'}</span>
          </h1>
          <p className="text-3xl sm:text-4xl font-extrabold text-turquoise-950">
            {language === 'es' ? 'Nuestras Opciones de Pasadía en Chame' : 'Our Day Pass Packages in Chame'}
          </p>
          <p className="text-sm text-mahana-dark/75 max-w-xl mx-auto">
            {language === 'es'
              ? '¿Buscas una escapada rápida de la ciudad sin hospedarte? Disfruta de la mejor piscina tropical de Chame con nuestros pases de día.'
              : 'Looking for a quick getaway from the city without staying overnight? Enjoy the best tropical pool in Chame with our day passes.'}
          </p>
          <div className="h-1.5 w-24 bg-turquoise-700 mx-auto rounded-full" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {dayPasses.map((pass) => (
            <div 
              key={pass.id}
              className="bg-white rounded-[32px] overflow-hidden border border-sand-200 shadow-glass hover:shadow-premium hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden">
                  <img src={pass.img} alt={pass.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                  
                  {/* Badge */}
                  <span className="absolute top-4 left-4 px-3 py-1.5 bg-turquoise-900/90 backdrop-blur-md text-sand-100 text-xs font-bold uppercase tracking-wider rounded-xl border border-turquoise-700/30">
                    {pass.badge}
                  </span>

                  {/* Price */}
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-xs px-4 py-1.5 rounded-2xl shadow-lg border border-sand-200 flex items-baseline space-x-1">
                    <span className="text-[10px] text-turquoise-950/60 font-extrabold uppercase shrink-0">
                      {language === 'es' ? 'desde' : 'from'}
                    </span>
                    <span className="text-2xl font-black text-turquoise-900">{pass.price}</span>
                    <span className="text-xs text-turquoise-950/60 font-semibold">/{pass.priceUnit}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-8 space-y-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-turquoise-950 tracking-tight leading-snug">{pass.title}</h2>
                    <p className="text-sm text-mahana-dark/75 mt-2 leading-relaxed min-h-[48px]">{pass.desc}</p>
                  </div>

                  {/* Inclusions */}
                  <div className="space-y-3">
                    <h3 className="text-xs uppercase font-extrabold text-turquoise-950 tracking-wider">
                      {language === 'es' ? '¿Qué incluye?' : 'Inclusions:'}
                    </h3>
                    <ul className="space-y-2.5">
                      {pass.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-start space-x-3 text-sm text-mahana-dark/80 leading-relaxed">
                          <span className="p-0.5 bg-turquoise-100 text-turquoise-700 rounded-md shrink-0 mt-0.5">
                            <Check className="h-3.5 w-3.5 stroke-[3]" />
                          </span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action block */}
              <div className="px-5 pb-6 pt-4 sm:px-8 sm:pb-8 border-t border-sand-100 bg-sand-50/20 rounded-b-[32px] space-y-4">
                <div className="flex items-center space-x-2 text-xs text-mahana-dark/60 font-semibold">
                  <Clock className="h-4 w-4 text-turquoise-700" />
                  <span>{language === 'es' ? 'Horario: 9:00 AM - 5:00 PM' : 'Schedule: 9:00 AM - 5:00 PM'}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => navigate(pass.detailsLink)}
                    className="py-3 border-2 border-turquoise-700 hover:bg-turquoise-50 text-turquoise-800 rounded-2xl font-bold transition-all flex items-center justify-center space-x-1"
                  >
                    <span>{language === 'es' ? 'Ver Detalles' : 'View Details'}</span>
                  </button>
                  <button
                    onClick={() => handleBook(pass.planCode)}
                    className="py-3 bg-turquoise-700 hover:bg-turquoise-900 text-white rounded-2xl font-bold transition-all shadow-md flex items-center justify-center space-x-1 hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <span>{language === 'es' ? 'Reservar' : 'Book Now'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Guidelines */}
        <div className="mt-16 bg-amber-50/50 p-5 sm:p-8 rounded-[32px] border border-sand-200/80 text-center max-w-2xl mx-auto space-y-4">
          <ShieldAlert className="h-8 w-8 text-turquoise-700 mx-auto" />
          <h3 className="font-bold text-turquoise-950 text-lg">
            {language === 'es' ? 'Información importante de pasadías' : 'Important day pass guidelines'}
          </h3>
          <p className="text-sm text-mahana-dark/70 leading-relaxed max-w-lg mx-auto">
            {language === 'es'
              ? 'Se requiere reserva previa ya que contamos con aforo diario limitado para garantizar la tranquilidad de nuestros huéspedes y visitantes. No se permite el ingreso de alimentos ni bebidas externas al Lodge. Las mascotas son bienvenidas en las áreas al aire libre y senderos de piscina, manteniendo el uso de correa.'
              : 'Prior reservation is highly recommended since we operate with limited daily capacity to ensure a peaceful environment. External food or beverages are strictly prohibited. Pets are welcome in outdoor areas and pool pathways but must remain on leash.'}
          </p>
        </div>

      </div>
    </div>
  );
};

export default PasadiasHub;
