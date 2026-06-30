import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Check, ArrowRight, ShieldCheck, Clock, BookOpen, MapPin, Calendar, Award } from 'lucide-react';

export const SpanishImmersionLanding: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const inclusions = [
    { text: language === 'es' ? '14 Noches de Hospedaje en Habitación de Lujo en Casa Mahana' : '14 Nights of Premium Lodging at Casa Mahana' },
    { text: language === 'es' ? 'Pensión Completa: Desayuno, Almuerzo y Cenas Gourmet diarias' : 'Full Board: Daily Breakfast, Lunch, and Gourmet Dinners' },
    { text: language === 'es' ? '30 Horas de clases interactivas de español en grupos de máx. 4 personas' : '30 Hours of interactive Spanish classes in small groups (max 4 students)' },
    { text: language === 'es' ? '5 Salidas Temáticas de práctica real en supermercado, mercado y club de playa' : '5 Guided Field Trips for real-world practice at supermarkets, artisan markets, and beach clubs' },
    { text: language === 'es' ? 'Excursiones de aventura: Tour de buggies por Chame y tarde en Surf Shack' : 'Adventure tours: Chame off-road buggies tour & Surf Shack beach club day' },
    { text: language === 'es' ? 'Traslados ida y vuelta incluidos desde el Aeropuerto de Tocumen (PTY)' : 'Roundtrip airport transfers from Panama City Airport (PTY) included' },
    { text: language === 'es' ? 'Material de estudio, carpetas de vocabulario y diploma de inmersión' : 'All study materials, custom vocabulary folders, and immersion certificate' },
    { text: language === 'es' ? 'Cena de gala de despedida con bebidas de cortesía' : 'Special farewell graduation dinner with complimentary drinks' }
  ];

  const scheduleWeek1 = [
    { day: language === 'es' ? 'Día 1: Llegada' : 'Day 1: Arrival', activity: language === 'es' ? 'Traslado desde el aeropuerto de Tocumen a Chame, cóctel de bienvenida y cena de integración.' : 'Airport pickup, shuttle to Chame, welcome drink, and icebreaker dinner.' },
    { day: language === 'es' ? 'Día 2 - 6: Clases + Práctica' : 'Day 2 - 6: Lessons & Practice', activity: language === 'es' ? 'De 9:00 a.m. a 12:00 p.m. Clases interactivas. Tardes: Salida al mercado de abastos, cocina típica y tour de buggies.' : '9:00 AM - 12:00 PM: Core lessons. Afternoons: Local market visit, cooking workshop, and off-road buggy adventure.' },
    { day: language === 'es' ? 'Día 7: Día Libre' : 'Day 7: Free Day', activity: language === 'es' ? 'Día de descanso para relajarse en la piscina del hotel o tomar un tour opcional.' : 'Relax poolside at the lodge or take an optional island excursion.' }
  ];

  const scheduleWeek2 = [
    { day: language === 'es' ? 'Día 8 - 12: Inmersión Activa' : 'Day 8 - 12: Active Immersion', activity: language === 'es' ? 'Clases avanzadas de conversación en la mañana. Tardes: Práctica de compras, surf shack beach club y senderismo.' : 'Morning conversational lessons. Afternoons: Shopping task challenge, beach club surf shack visit, and canyon hike.' },
    { day: language === 'es' ? 'Día 13: Cena de Gala' : 'Day 13: Farewell Gala', activity: language === 'es' ? 'Cena de gala especial en el restaurante del lodge y entrega de diplomas.' : 'Farewell graduation dinner at the wood-fired restaurant and certificate awards.' },
    { day: language === 'es' ? 'Día 14: Retorno' : 'Day 14: Departure', activity: language === 'es' ? 'Desayuno de despedida y traslado de retorno al aeropuerto de Tocumen.' : 'Farewell breakfast and private shuttle back to Panama City airport.' }
  ];

  const experiencePhotos = [
    { src: '/images/lodge-grounds.jpg', titleEs: 'Instalaciones del Lodge Casa Mahana', titleEn: 'Casa Mahana Lodge Grounds' },
    { src: '/images/tours-mulitas-beach-v2.jpg', titleEs: 'Tours de Buggies en la Costa de Chame', titleEn: 'Coastline Buggy Adventures' },
    { src: '/images/surf-shack-hero-v2.jpg', titleEs: 'Surf Shack Club de Playa en Playa Caracol', titleEn: 'Surf Shack Beach Club Caracol' }
  ];

  const handleBook = () => {
    navigate('/reservar?plan=spanish_immersion', { state: { category: 'Estadía', planCode: 'spanish_immersion' } });
  };

  return (
    <div className="bg-mahana-light min-h-[95vh] animate-fade-in-up">
      {/* Premium Hero Banner */}
      <div className="relative h-[460px] w-full overflow-hidden">
        <img 
          src="/images/lodge-grounds-v3.jpg" 
          alt="Spanish Immersion Retreat" 
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mahana-dark via-mahana-dark/30 to-transparent" />
        
        <div className="absolute bottom-6 sm:bottom-12 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2 sm:space-y-4">
          <span className="px-3.5 py-1.5 bg-orange-600/90 text-white text-xs font-bold uppercase tracking-widest rounded-lg border border-orange-500/20">
            {language === 'es' ? 'Inmersión Cultural Única' : 'Unique Cultural Immersion'}
          </span>
          <h1 className="text-3xl sm:text-6xl font-black text-white tracking-tight">
            {language === 'es' ? 'Spanish Immersion Retreat' : 'Spanish Immersion Retreat'}
          </h1>
          <p className="text-sand-100/95 text-xs sm:text-xl max-w-3xl font-medium leading-relaxed">
            {language === 'es'
              ? 'Vive el idioma. 2 semanas todo incluido que combinan clases personalizadas con aventuras reales en el paraíso tropical de Chame.'
              : 'Live the language. A 2-week all-inclusive package blending boutique classes with real-world adventures in Chame.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left Side: Details */}
        <div className="lg:col-span-2 space-y-14">
          
          {/* Intro Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-turquoise-950 tracking-tight">
              {language === 'es' ? 'Aprender Español viviendo en Español' : 'Learn Spanish by Living in Spanish'}
            </h2>
            <p className="text-mahana-dark/85 leading-relaxed text-base">
              {language === 'es' 
                ? 'Nuestro programa boutique está diseñado para viajeros que desean adquirir fluidez conversacional en español en un ambiente de total inmersión. En lugar de limitarnos a un salón de clases, conectamos la gramática del día con la vida real: practicamos en mercados de abastos, organizamos talleres culinarios en nuestro restaurante de leña y surfeamos en las hermosas playas del Pacífico panameño.'
                : 'Our boutique retreat is designed for language travelers seeking conversational fluency in an immersive environment. Instead of staying boxed inside a classroom, we connect daily grammar lessons to real life: practice at local food markets, enjoy culinary workshops in our wood-fired kitchen, and surf Panama\'s Pacific coast.'}
            </p>
          </div>

          {/* Elegant Program Rates */}
          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-widest font-black text-turquoise-750">
              {language === 'es' ? 'Tarifas del Retiro Todo Incluido (Por Persona)' : 'All-Inclusive Retreat Rates (Per Person)'}
            </h3>
            
            <div className="bg-white rounded-3xl border border-sand-200 shadow-glass overflow-hidden">
              <div className="overflow-x-auto w-full scrollbar-thin">
                <table className="w-full min-w-[480px] sm:min-w-0 text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-sand-50/70 border-b border-sand-200 text-[10px] sm:text-xs font-bold text-turquoise-950 uppercase tracking-wider">
                      <th className="py-3 px-3 sm:py-4 sm:px-6">{language === 'es' ? 'Tipo de Habitación' : 'Room Type'}</th>
                      <th className="py-3 px-3 sm:py-4 sm:px-6">{language === 'es' ? 'Ocupación' : 'Occupancy'}</th>
                      <th className="py-3 px-3 sm:py-4 sm:px-6">{language === 'es' ? 'Tarifa Total Paquete' : 'Total Package Rate'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sand-100 font-medium text-mahana-dark/95">
                    <tr className="hover:bg-sand-50/20 transition-colors text-xs sm:text-sm">
                      <td className="py-3.5 px-3 sm:py-4.5 sm:px-6 font-bold text-turquoise-950">{language === 'es' ? 'Habitación Privada (Uso individual)' : 'Private Room (Single occupancy)'}</td>
                      <td className="py-3.5 px-3 sm:py-4.5 sm:px-6 text-mahana-dark/70 font-semibold">{language === 'es' ? '1 Huésped / Cama Queen' : '1 Guest / Queen Bed'}</td>
                      <td className="py-3.5 px-3 sm:py-4.5 sm:px-6 font-extrabold text-turquoise-900">B/. 2,450.00</td>
                    </tr>
                    <tr className="hover:bg-sand-50/20 transition-colors text-xs sm:text-sm">
                      <td className="py-3.5 px-3 sm:py-4.5 sm:px-6 font-bold text-turquoise-950">{language === 'es' ? 'Habitación Compartida (Tarifa por persona)' : 'Shared Room (Rate per person)'}</td>
                      <td className="py-3.5 px-3 sm:py-4.5 sm:px-6 text-mahana-dark/70 font-semibold">{language === 'es' ? '2 Huéspedes / Camas Twin' : '2 Guests / Twin Beds'}</td>
                      <td className="py-3.5 px-3 sm:py-4.5 sm:px-6 font-extrabold text-turquoise-900">B/. 1,850.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Schedule Week by Week */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Week 1 */}
            <div className="space-y-4">
              <h4 className="text-sm uppercase tracking-widest font-black text-orange-600 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {language === 'es' ? 'Primera Semana: Fundamentos' : 'Week 1: Foundations'}
              </h4>
              <div className="bg-white rounded-3xl border border-sand-200 p-6 space-y-4">
                {scheduleWeek1.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="text-xs font-black text-turquoise-900 block">{item.day}</span>
                    <p className="text-xs text-mahana-dark/75 leading-relaxed font-semibold">{item.activity}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Week 2 */}
            <div className="space-y-4">
              <h4 className="text-sm uppercase tracking-widest font-black text-orange-600 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {language === 'es' ? 'Segunda Semana: Fluidez' : 'Week 2: Fluency'}
              </h4>
              <div className="bg-white rounded-3xl border border-sand-200 p-6 space-y-4">
                {scheduleWeek2.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="text-xs font-black text-turquoise-900 block">{item.day}</span>
                    <p className="text-xs text-mahana-dark/75 leading-relaxed font-semibold">{item.activity}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Inclusions */}
          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-widest font-black text-turquoise-750">
              {language === 'es' ? 'Detalles de Inclusiones del Retiro' : 'Detailed Retreat Inclusions'}
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

          {/* Experience Photos */}
          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-widest font-black text-turquoise-750">
              {language === 'es' ? 'La Experiencia en Imágenes' : 'The Retreat Experience in Photos'}
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

          {/* Policies Alert Box */}
          <div className="bg-amber-50/60 border border-amber-250/50 rounded-3xl p-6 text-xs text-amber-800 space-y-2 text-left font-medium">
            <span className="font-extrabold uppercase tracking-wide block text-[10px] text-amber-900">
              ⚠️ {language === 'es' ? 'POLÍTICAS Y CONDICIONES DEL PROGRAMA:' : 'PROGRAM TERMS & CONDITIONS:'}
            </span>
            <ul className="list-disc pl-4 space-y-1.5 leading-relaxed font-semibold text-amber-800/90">
              <li>
                {language === 'es'
                  ? 'Cupos Limitados: Para mantener la calidad de la enseñanza, cada retiro está limitado a un máximo de 8 alumnos.'
                  : 'Limited Slots: To guarantee high educational quality, each retreat date is capped at 8 students.'}
              </li>
              <li>
                {language === 'es'
                  ? 'Política de Cancelación: Reembolso completo por cancelaciones hasta 30 días antes del inicio del retiro. Después de esta fecha, se aplicará una penalidad del 50%.'
                  : 'Cancellation Policy: Full refund for cancellations made up to 30 days prior to the retreat start date. A 50% charge applies thereafter.'}
              </li>
              <li>
                {language === 'es'
                  ? 'Niveles Académicos: Es mandatorio completar el formulario digital de nivelación enviado 15 días antes de tu llegada.'
                  : 'Academic Placement: It is mandatory to complete the online placement questionnaire sent 15 days before arrival.'}
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side: Sidebar booking box */}
        <div className="bg-white rounded-[32px] border border-sand-200 p-5 sm:p-8 shadow-premium h-fit space-y-6 lg:sticky lg:top-24">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-mahana-dark/60 font-bold block">
              {language === 'es' ? 'Tarifa del Paquete desde' : 'Package rate per person from'}
            </span>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-4xl font-black text-turquoise-950">$1,850</span>
              <span className="text-sm text-mahana-dark/60 font-semibold">USD / {language === 'es' ? '14 Noches' : '14 Nights'}</span>
            </div>
            <p className="text-xs text-emerald-600 font-extrabold flex items-center space-x-1.5">
              <ShieldCheck className="h-4.5 w-4.5 text-emerald-600" />
              <span>{language === 'es' ? 'Pensión Completa + Clases + Actividades' : 'Full Board + Lessons + Tours'}</span>
            </p>
          </div>

          <div className="border-t border-sand-100 pt-6 space-y-4 text-xs font-bold text-mahana-dark/75">
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-0 justify-between items-start sm:items-center">
              <span>{language === 'es' ? 'Duración del Retiro' : 'Retreat Duration'}</span>
              <span className="text-turquoise-800 text-right sm:text-left">{language === 'es' ? '2 Semanas (14 Noches)' : '2 Weeks (14 Nights)'}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-0 justify-between items-start sm:items-center">
              <span>{language === 'es' ? 'Carga Lectiva' : 'Study Load'}</span>
              <span className="text-turquoise-800 text-right sm:text-left">{language === 'es' ? '30 Horas de Clase' : '30 Lesson Hours'}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-0 justify-between items-start sm:items-center">
              <span>{language === 'es' ? 'Excursiones Guiadas' : 'Guided Field Trips'}</span>
              <span className="text-turquoise-800 text-right sm:text-left">{language === 'es' ? '5 Salidas de Campo' : '5 Field Trips'}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-0 justify-between items-start sm:items-center">
              <span>{language === 'es' ? 'Certificación Incluida' : 'Certificate Included'}</span>
              <span className="text-emerald-600 uppercase text-right sm:text-left">{language === 'es' ? 'Sí (30 Horas)' : 'Yes (30 Hours)'}</span>
            </div>
          </div>

          <button
            onClick={handleBook}
            className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all shadow-md group hover:scale-[1.01] active:scale-[0.99] uppercase tracking-wide text-sm font-black"
          >
            <span>{language === 'es' ? 'Solicitar Cupo en Retiro' : 'Apply for Retreat Slot'}</span>
            <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="text-center">
            <span className="text-[10px] uppercase tracking-wider text-mahana-dark/40 font-bold block">
              {language === 'es' ? 'Formulario de Aplicación Directa' : 'Direct Booking Application'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpanishImmersionLanding;
