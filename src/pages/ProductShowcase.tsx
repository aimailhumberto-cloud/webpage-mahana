import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Check, Clock, Calendar, ArrowRight, Tag } from 'lucide-react';
import { SEO } from '../components/SEO';

export const ProductShowcase: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const productsList = [
    {
      key: 'mahana' as const,
      img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      price: '$70',
      priceUnit: t('common.nights'),
      category: 'Estadía' as const,
      planCode: 'mahana_exp',
      badge: 'Popular'
    },
    {
      key: 'pool_day' as const,
      img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      price: '$38.50',
      priceUnit: t('common.adults').toLowerCase(),
      category: 'Pasadía' as const,
      planCode: 'pasadia_comidas',
      badge: 'Day Pass'
    },
    {
      key: 'all_inclusive' as const,
      img: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80',
      price: '$120',
      priceUnit: t('common.nights'),
      category: 'Estadía' as const,
      planCode: 'todo_incluido',
      badge: 'Premium'
    }
  ];

  const getInclusions = (productKey: 'mahana' | 'pool_day' | 'all_inclusive') => {
    return [0, 1, 2, 3]
      .map(idx => t(`products.${productKey}.inclusions.${idx}`))
      .filter(item => !item.startsWith('products.'));
  };

  const handleBooking = (category: 'Estadía' | 'Pasadía', planCode: string) => {
    navigate('/reservar', { state: { category, planCode } });
  };

  return (
    <div className="py-16 bg-mahana-light min-h-[90vh]">
      <SEO 
        titleEs="Planes y Experiencias de Hospedaje — Casa Mahana"
        titleEn="Plans & Lodging Experiences — Casa Mahana"
        descriptionEs="Explora todos los planes de estadía y pasadías en Casa Mahana. Compara tarifas de hospedaje estándar, todo incluido, escape para parejas y pases de piscina en Chame."
        descriptionEn="Explore all lodging plans and day passes at Casa Mahana. Compare rates for standard stays, all-inclusive packages, couples escape, and pool day passes in Chame."
        image="/images/logo-casa-mahana.png"
        path="/experiencias"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-sm uppercase tracking-widest text-turquoise-700 font-bold">
            {t('products.title')}
          </h1>
          <p className="text-3xl sm:text-4xl font-extrabold text-turquoise-950">
            {t('products.subtitle')}
          </p>
          <div className="h-1.5 w-24 bg-turquoise-700 mx-auto rounded-full" />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {productsList.map((product) => {
            const inclusions = getInclusions(product.key);
            return (
              <div 
                key={product.key}
                className="bg-white rounded-[32px] overflow-hidden shadow-glass border border-sand-200 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image & Price Area */}
                  <div className="relative h-72 w-full overflow-hidden">
                    <img 
                      src={product.img} 
                      alt={t(`products.${product.key}.title`)} 
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Badge */}
                    <span className="absolute top-4 left-4 px-3.5 py-1.5 bg-turquoise-900/90 backdrop-blur-md text-sand-100 text-xs font-bold uppercase tracking-wider rounded-xl border border-turquoise-700/30 shadow-md">
                      {product.badge}
                    </span>

                    {/* Price circle tag */}
                    <div className="absolute bottom-4 right-4 flex items-baseline space-x-1 bg-white/95 backdrop-blur-xs px-4 py-2 rounded-2xl shadow-lg border border-sand-200">
                      <Tag className="h-4 w-4 text-turquoise-700 mr-1 shrink-0" />
                      <span className="text-2xl font-black text-turquoise-900">{product.price}</span>
                      <span className="text-xs text-turquoise-950/60 font-medium">/{product.priceUnit}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-8 space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-extrabold text-turquoise-950 tracking-tight">
                        {t(`products.${product.key}.title`)}
                      </h2>
                      <p className="text-sm text-mahana-dark/75 leading-relaxed min-h-[60px]">
                        {t(`products.${product.key}.desc`)}
                      </p>
                    </div>

                    {/* Inclusions Checklist */}
                    <div className="space-y-3">
                      <h3 className="text-xs uppercase font-extrabold text-turquoise-950 tracking-wider">
                        {t('common.confirm') === 'Confirmar' ? '¿Qué incluye?' : 'Inclusions:'}
                      </h3>
                      <ul className="space-y-2.5">
                        {inclusions.map((inc, i) => (
                          <li key={i} className="flex items-start space-x-3 text-sm text-mahana-dark/80">
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

                {/* Footer / CTA Block */}
                <div className="px-8 pb-8 pt-4 border-t border-sand-100 space-y-4 bg-sand-50/50 rounded-b-[32px]">
                  {/* Schedule */}
                  <div className="flex items-center space-x-2 text-xs text-mahana-dark/60 font-medium">
                    <Clock className="h-4 w-4 text-turquoise-700 shrink-0" />
                    <span>{t(`products.${product.key}.schedule`)}</span>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleBooking(product.category, product.planCode)}
                    className="w-full py-3.5 bg-turquoise-700 hover:bg-turquoise-900 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all shadow-md group hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <span>{t(`products.${product.key}.cta`)}</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Extra info/contact helper */}
        <div className="mt-16 bg-sand-100/70 p-8 rounded-[32px] border border-sand-200/80 text-center max-w-2xl mx-auto space-y-3">
          <Calendar className="h-8 w-8 text-turquoise-700 mx-auto" />
          <h3 className="font-bold text-turquoise-950 text-lg">
            {t('common.confirm') === 'Confirmar' ? '¿Planeas un evento grupal?' : 'Planning a group event?'}
          </h3>
          <p className="text-sm text-mahana-dark/70 max-w-lg mx-auto">
            {t('common.confirm') === 'Confirmar'
              ? 'Ofrecemos tarifas corporativas, cumpleaños y reservas de múltiples habitaciones con distribución de huéspedes optimizada.'
              : 'We offer corporate rates, birthdays, and multi-room bookings with optimized guest distributions.'}
          </p>
          <button 
            onClick={() => navigate('/reservar')}
            className="text-sm font-bold text-turquoise-700 hover:text-turquoise-900 inline-flex items-center space-x-1"
          >
            <span>{t('common.confirm') === 'Confirmar' ? 'Ir al cotizador' : 'Go to Booking Wizard'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
