import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Check, 
  Gift, 
  Building,
  Heart,
  ChevronRight,
  ShieldCheck,
  Clock,
  Flame,
  Utensils,
  Waves,
  Navigation,
  Compass
} from 'lucide-react';

export const PromoHabitacionGratis: React.FC = () => {
  const { language } = useLanguage();
  
  // Simulated urgency states
  const [timeLeft, setTimeLeft] = useState<number>(299); // 5 minutes in seconds

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) return 299; // Loop back
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Translations
  const tPromo = {
    es: {
      heroBadge: "🔥 ¡OFERTA RELÁMPAGO POR TIEMPO LIMITADO!",
      heroTitle: "¡Habitación Gratis!",
      heroSubtitle: "Hospedaje B/. 0.00 • ¡Con Desayuno Incluido! 🍳",
      heroTagline: "Sin trucos ni condiciones. Tu consumo se acredita completo para usar en el restaurante.",
      heroCta: "¡Asegurar Mi Habitación Gratis Ahora!",
      timerText: "Reserva en:",
      
      howItWorksTitle: "¿Cómo funciona esta mega oferta?",
      step1: "1. Elige tu fecha y reserva",
      step1Desc: "Haz clic en reservar. El costo de tu hospedaje es de B/. 0.00.",
      step2: "2. Realiza tu abono",
      step2Desc: "Abonas B/. 30.00 (de Dom a Jue) o B/. 40.00 (Vie y Sáb). Todo es saldo a tu favor.",
      step3: "3. Consume el 100% en el hotel",
      step3Desc: "Al llegar tienes el 100% disponible para pizzas, mariscos, tragos y más.",
      
      inclusionsTitle: "Beneficios Exclusivos Incluidos",
      incRoom: "Hospedaje de cortesía en Habitación Doble (cama queen) o Estándar (dos camas twin).",
      incBreakfast: "Desayuno continental de cortesía diario para la pareja (¡totalmente gratis y adicional a tu abono de consumo!).",
      incConsumable: "Depósito de garantía 100% consumible en todo el menú de restaurante y bar.",
      incPools: "Acceso libre a nuestras 3 piscinas tropicales y áreas de hamacas.",
      incBeach: "Pase al club de playa Surf Shack en la hermosa Playa Caracol.",
      incWifi: "WiFi de alta velocidad y estacionamiento gratuito en el lodge.",
      
      ratesTitle: "Tarifas & Condiciones de la Promoción",
      rateConsumableHeader: "Abonos Reembolsables (100% Crédito en Comida/Bebida)",
      rateAddonsHeader: "Costos Extra por Huéspedes Adicionales (No Consumibles)",
      rateWeekday: "Domingo a Jueves (Entre Semana)",
      rateWeekdayVal: "B/. 30.00 total por pareja / noche",
      rateWeekend: "Viernes y Sábado (Fin de Semana)",
      rateWeekendVal: "B/. 40.00 total por pareja / noche",
      rateExtraAdult: "Persona adulta adicional",
      rateExtraAdultVal: "B/. 15.00 por noche",
      rateChild: "Niño adicional (2 a 12 años)",
      rateChildVal: "B/. 10.00 por noche",
      rateTax: "Impuestos",
      rateTaxVal: "¡0% Exento!",
      ratePolicyNote: "Una vez realizada la reserva, el abono depositado NO es reembolsable y las fechas de estancia son finales (NO se permiten cambios de fecha ni cancelaciones). El monto se aplicará única y exclusivamente como crédito de comida y bebidas durante la estadía en las fechas seleccionadas.",
      
      whyTitle: "¿Por qué aprovechar esta súper promoción hoy?",
      why1: "Es verdaderamente gratis",
      why1Desc: "A diferencia de otros hoteles donde pagas hospedaje y luego la comida aparte, aquí el hospedaje no te cuesta nada. Solo abonas lo que vas a comer.",
      why2: "Pizzas y mariscos deliciosos",
      why2Desc: "Disfruta de nuestras famosas pizzas artesanales al horno de leña, hamburguesas gourmet, ceviches y cócteles tropicales frente a la piscina.",
      why3: "Desconexión total en Chame",
      why3Desc: "Un rincón tranquilo con piscina, palmeras y hamacas a pocos minutos de la playa. Pet-friendly y perfecto para parejas.",
      
      urgencyTitle: "¡Cupos limitados por día!",
      urgencyText: "Solo asignamos 5 habitaciones diarias para esta promoción. No dejes pasar la oportunidad de escaparte sin pagar hospedaje.",
      footerCtaTitle: "¡No dejes que se agoten los cupos de hoy!",
      footerCtaBtn: "Ir al Sistema de Reservas Directo",

      // New Sections: What to Do
      todoTitle: "Todo lo que puedes hacer en Casa Mahana & Chame 🌴",
      todoSubtitle: "Disfruta de una estadía llena de actividades, relax y mucho sabor",
      todo1Title: "3 Piscinas Tropicales",
      todo1Desc: "Refréscate y relájate bajo las palmeras en nuestras tres espectaculares piscinas, rodeadas de decks de hamacas y jardines.",
      todo2Title: "Cocina al Horno de Leña",
      todo2Desc: "Utiliza tu saldo al 100% en pizzas artesanales, ceviches frescos, hamburguesas premium y cócteles helados frente a la piscina.",
      todo3Title: "Surf Shack Beach Club",
      todo3Desc: "Accede de cortesía a nuestro club de playa en Playa Caracol (a 12 min). Disfruta de la brisa, arena y olas del Pacífico.",
      todo4Title: "Beach Buggies & Mulitas",
      todo4Desc: "Alquila vehículos todo terreno directamente en el lodge y vive la aventura recorriendo los extensos senderos costeros de Chame.",
      todo5Title: "Surf & Kitesurf",
      todo5Desc: "Aprende o practica deportes acuáticos en Punta Chame, uno de los destinos más cotizados a nivel mundial por sus vientos y oleaje.",
      todo6Title: "Estadía Pet-Friendly",
      todo6Desc: "No dejes a tu mejor amigo atrás. Somos un hotel amante de los animales, tus mascotas son siempre bienvenidas aquí.",

      // New Sections: Why it's a mega offer
      megaOfferTitle: "¿Por qué es una MEGA OFERTOTA que debes aprovechar hoy? 🚀",
      megaOfferSubtitle: "Las razones por las que no existe una oferta igual en todo Panamá",
      megaOffer1Title: "Ahorro Real de más del 65%",
      megaOffer1Desc: "Una habitación estándar con acceso a piscinas y club de playa suele costar más de B/. 90.00 por noche. Aquí pagas B/. 0.00 por ella.",
      megaOffer2Title: "Tu Dinero es 100% Tuyo",
      megaOffer2Desc: "El abono solicitado no es un cargo fantasma ni de servicio. Se acredita en su totalidad a tu cuenta de comida para consumir libremente.",
      megaOffer3Title: "Cero Letras Chiquitas",
      megaOffer3Desc: "Sin charlas de tiempo compartido ni trucos de venta. Eliges tus fechas, abonas tu consumo y disfrutas de tu habitación de cortesía.",
      megaOffer4Title: "Cupos Diarios Exclusivos",
      megaOffer4Desc: "Habilitamos solo 5 habitaciones promocionales por día. En el momento que se reservan, las tarifas vuelven al precio regular."
    },
    en: {
      heroBadge: "🔥 LIMITED TIME FLASH PROMOTION!",
      heroTitle: "Free Room Stay!",
      heroSubtitle: "Lodging B/. 0.00 • Complimentary Breakfast Included! 🍳",
      heroTagline: "No strings attached. Your credit is fully usable at the restaurant.",
      heroCta: "Claim My Free Room Now!",
      timerText: "Book within:",
      
      howItWorksTitle: "How does this mega offer work?",
      step1: "1. Choose your date & book",
      step1Desc: "Click book now. Your lodging rate is B/. 0.00.",
      step2: "2. Make your deposit",
      step2Desc: "Deposit B/. 30.00 (Sun to Thu) or B/. 40.00 (Fri & Sat). All is credited to your tab.",
      step3: "3. Spend 100% during your stay",
      step3Desc: "Upon check-in, you have 100% of your deposit ready for pizzas, seafood, drinks & more.",
      
      inclusionsTitle: "Exclusive Benefits Included",
      incRoom: "Complimentary lodging in a Double Room (queen bed) or Standard Room (twin beds).",
      incBreakfast: "Complimentary continental breakfast daily for two (fully free and in addition to your consumable credit!).",
      incConsumable: "100% consumable security deposit on the entire restaurant and bar menu.",
      incPools: "Unlimited access to our 3 tropical pools and hammock deck.",
      incBeach: "Access pass to our Surf Shack beach club in Playa Caracol.",
      incWifi: "High-speed WiFi and secure parking on the house.",
      
      ratesTitle: "Promotion Rates & Terms",
      rateConsumableHeader: "Refundable Deposits (100% Food/Beverage Credit)",
      rateAddonsHeader: "Extra Guest Costs (Non-Consumable)",
      rateWeekday: "Sunday to Thursday (Weekdays)",
      rateWeekdayVal: "B/. 30.00 total per couple / night",
      rateWeekend: "Friday and Saturday (Weekends)",
      rateWeekendVal: "B/. 40.00 total per couple / night",
      rateExtraAdult: "Additional adult guest",
      rateExtraAdultVal: "B/. 15.00 per night",
      rateChild: "Additional child (2 to 12 years)",
      rateChildVal: "B/. 10.00 per night",
      rateTax: "Taxes",
      rateTaxVal: "0% Exempt!",
      ratePolicyNote: "Once the reservation is confirmed, the deposited amount is strictly NON-refundable and stay dates are final (NO date changes or cancellations allowed). The deposit is credited solely for food and beverage consumption during the stay on the selected dates.",
      
      whyTitle: "Why take advantage of this super promo today?",
      why1: "It is truly free",
      why1Desc: "Unlike other hotels where you pay for lodging and then food separately, here lodging costs nothing. You only deposit what you are going to eat.",
      why2: "Delicious pizzas & seafood",
      why2Desc: "Enjoy our famous wood-fired artisanal pizzas, gourmet burgers, ceviches, and tropical cocktails next to the swimming pool.",
      why3: "Total relaxation in Chame",
      why3Desc: "A peaceful corner with pools, palm trees, and hammocks just minutes from the beach. Pet-friendly and perfect for couples.",
      
      urgencyTitle: "Highly limited daily slots!",
      urgencyText: "We only allocate 5 daily rooms for this promotion. Do not miss the opportunity to escape without paying for lodging.",
      footerCtaTitle: "Do not let today's slots slip away!",
      footerCtaBtn: "Go to Direct Booking Engine",

      // New Sections: What to Do
      todoTitle: "Everything You Can Do at Casa Mahana & Chame 🌴",
      todoSubtitle: "Enjoy a stay packed with activities, relaxation, and delicious flavors",
      todo1Title: "3 Tropical Pools",
      todo1Desc: "Cool off and unwind under palm trees in our three spectacular swimming pools, surrounded by hammock decks and lush gardens.",
      todo2Title: "Wood-Fired Kitchen",
      todo2Desc: "Use 100% of your tab credit on artisanal pizzas, fresh ceviches, premium burgers, and ice-cold poolside cocktails.",
      todo3Title: "Surf Shack Beach Club",
      todo3Desc: "Enjoy free access to our beach club at Playa Caracol (12 mins away). Dive into the breeze, volcanic sand, and Pacific waves.",
      todo4Title: "Beach Buggies & Mulitas",
      todo4Desc: "Rent off-road buggies directly at the lodge and adventure along Chame's massive coastlines and sandy trails.",
      todo5Title: "Surf & Kitesurf",
      todo5Desc: "Learn or practice water sports in Punta Chame, a world-famous destination renowned for its constant winds and active tides.",
      todo6Title: "Pet-Friendly Stay",
      todo6Desc: "Don't leave your furry best friend behind! We are a pet-loving lodge, and pets are always welcomed here.",

      // New Sections: Why it's a mega offer
      megaOfferTitle: "Why is this a MEGA OFFER you must book today? 🚀",
      megaOfferSubtitle: "The reasons why there is no other deal like this in all of Panama",
      megaOffer1Title: "Real Savings of over 65%",
      megaOffer1Desc: "A standard room with pool and beach club access normally costs over B/. 90.00 per night. Here you pay B/. 0.00 for it.",
      megaOffer2Title: "Your Money is 100% Yours",
      megaOffer2Desc: "The requested deposit is not a service charge or admin fee. It is entirely credited as food and beverage balance for you to consume freely.",
      megaOffer3Title: "Zero Fine Print",
      megaOffer3Desc: "No timeshare presentations or sales tricks. Just pick your dates, deposit your meal budget, and enjoy your complimentary stay.",
      megaOffer4Title: "Exclusive Daily Slots",
      megaOffer4Desc: "We only release 5 promo rooms per day. As soon as they are booked, rates return to their standard lodging price."
    }
  };

  const currentT = language === 'es' ? tPromo.es : tPromo.en;

  return (
    <div className="bg-mahana-light min-h-screen font-sans selection:bg-orange-100 pb-16">
      
      {/* ── SECTION 1: HIGH-ENERGY PROMOTIONAL HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center text-white py-24 px-4 overflow-hidden text-center">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/promo-hero-couple.jpg" 
            alt="Casa Mahana Pool Promo" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-turquoise-950/80 to-turquoise-950 z-10" />
        </div>
        
        {/* Top-Right Flashy Promo Code & Timer Widget */}
        <div className="md:absolute md:top-28 md:right-12 bg-gradient-to-br from-yellow-400 to-orange-500 text-mahana-dark p-5 rounded-[2rem] border-4 border-yellow-300 shadow-2xl space-y-2.5 max-w-xs mx-auto z-30 transform hover:scale-105 transition-all duration-300 mb-8 md:mb-0 relative">
          <div className="flex items-center gap-1.5 justify-center font-black text-[10px] uppercase tracking-widest bg-white/25 px-3 py-1 rounded-full text-mahana-dark">
            <Clock className="h-4 w-4 animate-pulse" /> {currentT.timerText}
          </div>
          <div className="text-3xl font-mono font-black text-center tracking-wider text-mahana-dark drop-shadow-sm">
            {formatTime(timeLeft)}
          </div>
          <div className="border-t border-black/10 my-2" />
          <div className="text-center space-y-1">
            <span className="text-[10px] uppercase tracking-widest font-black block text-mahana-dark/80">{language === 'es' ? 'CÓDIGO PROMO:' : 'PROMO CODE:'}</span>
            <span className="text-xl font-black bg-white px-3 py-1 rounded-xl text-orange-600 border-2 border-orange-200 inline-block font-mono tracking-widest shadow-inner">
              GRATIS5
            </span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8 relative z-20">
          {/* Urgent Flash Promo Badge */}
          <span className="inline-flex items-center gap-1.5 px-4.5 py-1.5 bg-yellow-400 text-mahana-dark text-xs font-black uppercase tracking-widest rounded-full shadow-lg border border-yellow-250 animate-bounce" style={{ backgroundColor: '#fbbf24' }}>
            <Flame className="h-4 w-4 fill-current text-mahana-dark" /> {currentT.heroBadge}
          </span>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-6xl sm:text-9xl font-black tracking-tight text-white uppercase drop-shadow-lg leading-none">
              {currentT.heroTitle}
            </h1>
            <p className="text-3xl sm:text-5xl font-black text-yellow-350 drop-shadow-sm uppercase">
              {currentT.heroSubtitle}
            </p>
          </div>

          {/* Tagline */}
          <p className="text-white/85 text-xs sm:text-sm max-w-md mx-auto font-bold bg-black/30 backdrop-blur-xs py-2 px-4 rounded-xl border border-white/10">
            {currentT.heroTagline}
          </p>

          {/* CTA & WhatsApp Buttons Container */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            {/* Booking Link */}
            <a 
              href="/reservar?plan=promo_hab_gratis"
              className="w-full sm:w-auto px-8 py-5 bg-orange-500 hover:bg-orange-400 text-white font-black rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center justify-center gap-2 text-lg border-b-4 border-orange-700 uppercase tracking-wide"
            >
              <span>{currentT.heroCta}</span>
              <ChevronRight className="h-6 w-6 stroke-[3px]" />
            </a>

            {/* WhatsApp Link */}
            <a 
              href="https://wa.me/50762906800"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center justify-center gap-2.5 text-lg border-b-4 border-emerald-800 uppercase tracking-wide"
            >
              <svg className="h-6 w-6 fill-current text-white shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.114-2.905-6.99C16.257 1.875 13.777.844 11.14.844 5.704.844 1.28 5.263 1.277 10.699c-.001 1.637.452 3.231 1.312 4.631l-.993 3.626 3.714-.974.747.443zM17.18 14.39c-.3-.15-1.782-.88-2.057-.98-.275-.1-.475-.15-.675.15-.2.3-.775.98-.95 1.18-.175.2-.35.225-.65.075-.3-.15-1.264-.467-2.408-1.488-.888-.793-1.488-1.77-1.663-2.07-.175-.3-.019-.462.13-.61.135-.133.3-.35.45-.525.15-.175.2-.3.3-.5s.05-.375-.025-.525C9.53 9.4 8.93 7.93 8.68 7.33c-.244-.586-.492-.576-.675-.585-.175-.009-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.115 3.23 5.125 4.53.715.31 1.273.495 1.708.635.714.227 1.365.195 1.88.118.571-.085 1.782-.73 2.032-1.435.25-.7.25-1.3.175-1.43-.075-.13-.275-.2-.575-.35z"/>
              </svg>
              <span>{language === 'es' ? 'Contáctanos por WhatsApp' : 'Contact us on WhatsApp'}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: HOW DOES IT WORK (3 SIMPLE STEPS WITH BACKGROUND PHOTOS) ── */}
      <section className="py-20 px-4 max-w-6xl mx-auto text-center space-y-12">
        <div>
          <h2 className="text-2xl sm:text-4xl font-black text-turquoise-900 tracking-tight mb-3 uppercase">
            {currentT.howItWorksTitle}
          </h2>
          <div className="h-1 bg-orange-500 w-20 mx-auto rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div 
            className="relative rounded-3xl overflow-hidden h-72 shadow-lg group hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-6 border border-sand-200"
            style={{ backgroundImage: 'url("/images/room-doble.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 bg-black/65 group-hover:bg-black/60 transition-colors z-0" />
            <div className="relative z-10 text-white space-y-2 text-left">
              <div className="w-10 h-10 bg-turquoise-400 text-turquoise-950 rounded-full flex items-center justify-center text-sm font-black mb-2">
                1
              </div>
              <h3 className="text-lg font-black">{currentT.step1}</h3>
              <p className="text-xs text-sand-100/90 font-medium leading-relaxed">{currentT.step1Desc}</p>
            </div>
          </div>

          {/* Step 2 (Swapped to food-pizza.jpg showing consumable credit) */}
          <div 
            className="relative rounded-3xl overflow-hidden h-72 shadow-lg group hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-6 border border-sand-200"
            style={{ backgroundImage: 'url("/images/food-pizza.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 bg-black/65 group-hover:bg-black/60 transition-colors z-0" />
            <div className="relative z-10 text-white space-y-2 text-left">
              <div className="w-10 h-10 bg-orange-400 text-orange-950 rounded-full flex items-center justify-center text-sm font-black mb-2">
                2
              </div>
              <h3 className="text-lg font-black">{currentT.step2}</h3>
              <p className="text-xs text-sand-100/90 font-medium leading-relaxed">{currentT.step2Desc}</p>
            </div>
          </div>

          {/* Step 3 */}
          <div 
            className="relative rounded-3xl overflow-hidden h-72 shadow-lg group hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-6 border border-sand-200"
            style={{ backgroundImage: 'url("/images/food-cocktail.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 bg-black/65 group-hover:bg-black/60 transition-colors z-0" />
            <div className="relative z-10 text-white space-y-2 text-left">
              <div className="w-10 h-10 bg-emerald-400 text-emerald-950 rounded-full flex items-center justify-center text-sm font-black mb-2">
                3
              </div>
              <h3 className="text-lg font-black">{currentT.step3}</h3>
              <p className="text-xs text-sand-100/90 font-medium leading-relaxed">{currentT.step3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: TODO LO QUE PUEDES HACER (GRID WITH PHOTOS AND OVERLAYS) ── */}
      <section className="py-20 px-4 bg-white border-t border-sand-200/60">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest bg-orange-100 px-3 py-1 rounded-full">
              {language === 'es' ? 'EXPERIENCIAS INOLVIDABLES' : 'UNFORGETTABLE EXPERIENCES'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-turquoise-950 uppercase tracking-tight">
              {currentT.todoTitle}
            </h2>
            <p className="text-sm sm:text-base text-gray-500 font-semibold max-w-2xl mx-auto">
              {currentT.todoSubtitle}
            </p>
            <div className="h-1.5 bg-orange-500 w-24 mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Piscinas (Swapped from deck to clear pool view) */}
            <div 
              className="relative rounded-3xl overflow-hidden h-80 shadow-md group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-end p-6 border border-sand-200/50"
              style={{ backgroundImage: 'url("/images/hero-pool-aerial.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition-colors z-0" />
              <div className="relative z-10 text-white space-y-2">
                <div className="w-10 h-10 bg-turquoise-100/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-turquoise-300">
                  <Waves className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-black">{currentT.todo1Title}</h3>
                <p className="text-xs text-sand-100/90 font-semibold leading-relaxed">{currentT.todo1Desc}</p>
              </div>
            </div>

            {/* Cocina al Horno (Swapped to food-pizza-oven.jpg) */}
            <div 
              className="relative rounded-3xl overflow-hidden h-80 shadow-md group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-end p-6 border border-sand-200/50"
              style={{ backgroundImage: 'url("/images/food-pizza-oven.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition-colors z-0" />
              <div className="relative z-10 text-white space-y-2">
                <div className="w-10 h-10 bg-orange-100/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-orange-300">
                  <Utensils className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-black">{currentT.todo2Title}</h3>
                <p className="text-xs text-sand-100/90 font-semibold leading-relaxed">{currentT.todo2Desc}</p>
              </div>
            </div>

            {/* Surf Shack */}
            <div 
              className="relative rounded-3xl overflow-hidden h-80 shadow-md group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-end p-6 border border-sand-200/50"
              style={{ backgroundImage: 'url("/images/surf-shack-hero-v2.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition-colors z-0" />
              <div className="relative z-10 text-white space-y-2">
                <div className="w-10 h-10 bg-emerald-100/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-emerald-300">
                  <Navigation className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-black">{currentT.todo3Title}</h3>
                <p className="text-xs text-sand-100/90 font-semibold leading-relaxed">{currentT.todo3Desc}</p>
              </div>
            </div>

            {/* Buggies */}
            <div 
              className="relative rounded-3xl overflow-hidden h-80 shadow-md group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-end p-6 border border-sand-200/50"
              style={{ backgroundImage: 'url("/images/tours-mulitas-beach-v2.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition-colors z-0" />
              <div className="relative z-10 text-white space-y-2">
                <div className="w-10 h-10 bg-amber-100/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-amber-300">
                  <Compass className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-black">{currentT.todo4Title}</h3>
                <p className="text-xs text-sand-100/90 font-semibold leading-relaxed">{currentT.todo4Desc}</p>
              </div>
            </div>

            {/* Surf & Kitesurf */}
            <div 
              className="relative rounded-3xl overflow-hidden h-80 shadow-md group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-end p-6 border border-sand-200/50"
              style={{ backgroundImage: 'url("/images/surf-camp-kids-v2.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition-colors z-0" />
              <div className="relative z-10 text-white space-y-2">
                <div className="w-10 h-10 bg-sky-100/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-sky-300">
                  <Flame className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-black">{currentT.todo5Title}</h3>
                <p className="text-xs text-sand-100/90 font-semibold leading-relaxed">{currentT.todo5Desc}</p>
              </div>
            </div>

            {/* Pet-Friendly */}
            <div 
              className="relative rounded-3xl overflow-hidden h-80 shadow-md group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-end p-6 border border-sand-200/50"
              style={{ backgroundImage: 'url("/images/pet-friendly.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition-colors z-0" />
              <div className="relative z-10 text-white space-y-2">
                <div className="w-10 h-10 bg-rose-100/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-rose-350">
                  <Heart className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-black">{currentT.todo6Title}</h3>
                <p className="text-xs text-sand-100/90 font-semibold leading-relaxed">{currentT.todo6Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: WHY IT'S A MEGA OFFER (GRAND PHOTO BACKGROUND & PLAIN CARDS) ── */}
      <section className="py-24 px-4 overflow-hidden relative text-white">
        {/* Background Image of the Resort */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/lodge-grounds.jpg" 
            alt="Casa Mahana Resort Grounds" 
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-turquoise-950/90 via-turquoise-950/85 to-mahana-dark/95 z-10" />
        </div>

        <div className="max-w-6xl mx-auto space-y-12 relative z-20">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-black text-yellow-300 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/10">
              {language === 'es' ? '¡COMPARA Y COMPRUEBA!' : 'COMPARE & CHECK!'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              {currentT.megaOfferTitle}
            </h2>
            <p className="text-sm sm:text-base text-sand-100/70 font-semibold max-w-2xl mx-auto">
              {currentT.megaOfferSubtitle}
            </p>
            <div className="h-1.5 bg-orange-500 w-24 mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Box 1 (Plain dark backdrop) */}
            <div className="bg-black/50 backdrop-blur-md rounded-3xl p-8 border border-white/10 space-y-4 hover:bg-black/60 transition-all duration-300">
              <span className="text-3xl">💰</span>
              <h3 className="text-xl font-black text-yellow-300">{currentT.megaOffer1Title}</h3>
              <p className="text-xs text-sand-100/85 leading-relaxed font-semibold">{currentT.megaOffer1Desc}</p>
            </div>

            {/* Box 2 (Plain dark backdrop) */}
            <div className="bg-black/50 backdrop-blur-md rounded-3xl p-8 border border-white/10 space-y-4 hover:bg-black/60 transition-all duration-300">
              <span className="text-3xl">🍽️</span>
              <h3 className="text-xl font-black text-yellow-300">{currentT.megaOffer2Title}</h3>
              <p className="text-xs text-sand-100/85 leading-relaxed font-semibold">{currentT.megaOffer2Desc}</p>
            </div>

            {/* Box 3 (Plain dark backdrop) */}
            <div className="bg-black/50 backdrop-blur-md rounded-3xl p-8 border border-white/10 space-y-4 hover:bg-black/60 transition-all duration-300">
              <span className="text-3xl">📜</span>
              <h3 className="text-xl font-black text-yellow-300">{currentT.megaOffer3Title}</h3>
              <p className="text-xs text-sand-100/85 leading-relaxed font-semibold">{currentT.megaOffer3Desc}</p>
            </div>

            {/* Box 4 (Plain dark backdrop) */}
            <div className="bg-black/50 backdrop-blur-md rounded-3xl p-8 border border-white/10 space-y-4 hover:bg-black/60 transition-all duration-300">
              <span className="text-3xl">🔑</span>
              <h3 className="text-xl font-black text-yellow-300">{currentT.megaOffer4Title}</h3>
              <p className="text-xs text-sand-100/85 leading-relaxed font-semibold">{currentT.megaOffer4Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: INCLUSIONS & RATES TERMS ── */}
      <section className="py-20 px-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-sand-200/50">
        
        {/* Inclusions Card */}
        <div className="bg-white rounded-3xl border border-sand-200 shadow-glass p-8 space-y-6">
          <h3 className="text-lg font-black text-turquoise-900 border-b border-sand-100 pb-3 flex items-center gap-2">
            <Gift className="h-5 w-5 text-orange-500" />
            {currentT.inclusionsTitle}
          </h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 text-sm font-semibold text-mahana-dark/85">
              <Check className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{currentT.incRoom}</span>
            </div>
            <div className="flex items-start space-x-3 text-sm font-semibold text-mahana-dark/85">
              <Check className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{currentT.incBreakfast}</span>
            </div>
            <div className="flex items-start space-x-3 text-sm font-semibold text-mahana-dark/85">
              <Check className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{currentT.incConsumable}</span>
            </div>
            <div className="flex items-start space-x-3 text-sm font-semibold text-mahana-dark/85">
              <Check className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{currentT.incPools}</span>
            </div>
            <div className="flex items-start space-x-3 text-sm font-semibold text-mahana-dark/85">
              <Check className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{currentT.incBeach}</span>
            </div>
            <div className="flex items-start space-x-3 text-sm font-semibold text-mahana-dark/85">
              <Check className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{currentT.incWifi}</span>
            </div>
          </div>
        </div>

        {/* Rates Table */}
        <div className="bg-white rounded-3xl border border-sand-200 shadow-glass p-8 space-y-6">
          <h3 className="text-lg font-black text-turquoise-900 border-b border-sand-100 pb-3 flex items-center gap-2">
            <Building className="h-5 w-5 text-orange-500" />
            {currentT.ratesTitle}
          </h3>
          <div className="overflow-hidden border border-sand-100 rounded-2xl">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <tbody className="divide-y divide-sand-100 font-medium text-mahana-dark/95">
                {/* Consumable Section */}
                <tr className="bg-turquoise-50/50 font-black text-turquoise-900">
                  <td colSpan={2} className="py-2 px-4 text-left uppercase tracking-wider text-[10px] bg-turquoise-50/50">
                    {currentT.rateConsumableHeader}
                  </td>
                </tr>
                <tr className="hover:bg-sand-50/20">
                  <td className="py-3.5 px-4 font-bold text-turquoise-900">{currentT.rateWeekday}</td>
                  <td className="py-3.5 px-4 font-black text-turquoise-900 text-right">{currentT.rateWeekdayVal}</td>
                </tr>
                <tr className="hover:bg-sand-50/20">
                  <td className="py-3.5 px-4 font-bold text-turquoise-900">{currentT.rateWeekend}</td>
                  <td className="py-3.5 px-4 font-black text-turquoise-900 text-right">{currentT.rateWeekendVal}</td>
                </tr>

                {/* Additional Section */}
                <tr className="bg-orange-50/50 font-black text-orange-950">
                  <td colSpan={2} className="py-2 px-4 text-left uppercase tracking-wider text-[10px] bg-orange-50/50">
                    {currentT.rateAddonsHeader}
                  </td>
                </tr>
                <tr className="hover:bg-sand-50/20">
                  <td className="py-3.5 px-4 font-bold text-turquoise-900">{currentT.rateExtraAdult}</td>
                  <td className="py-3.5 px-4 font-black text-turquoise-900 text-right">{currentT.rateExtraAdultVal}</td>
                </tr>
                <tr className="hover:bg-sand-50/20">
                  <td className="py-3.5 px-4 font-bold text-turquoise-900">{currentT.rateChild}</td>
                  <td className="py-3.5 px-4 font-black text-turquoise-900 text-right">{currentT.rateChildVal}</td>
                </tr>

                {/* Taxes */}
                <tr className="bg-emerald-50/30 font-black">
                  <td className="py-4 px-4 text-emerald-800">{currentT.rateTax}</td>
                  <td className="py-4 px-4 text-emerald-700 text-right">{currentT.rateTaxVal}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Policy Note Callout (Fine Print) */}
          <div className="bg-amber-50/60 border border-amber-250/50 rounded-2xl p-4 text-xs text-amber-800 space-y-1.5 text-left font-medium">
            <span className="font-extrabold uppercase tracking-wide block text-[10px] text-amber-900">
              ⚠️ {language === 'es' ? 'CONDICIONES DE LA RESERVA (LETRA CHIQUITA):' : 'BOOKING POLICIES (FINE PRINT):'}
            </span>
            <p className="leading-relaxed">
              {currentT.ratePolicyNote}
            </p>
          </div>
        </div>

      </section>

      {/* ── SECTION 6: FINAL PERSUASIVE CALL TO ACTION (WITH ALL-INCLUSIVE RESORT BG) ── */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div 
          className="relative rounded-[36px] p-8 sm:p-20 text-center text-white overflow-hidden shadow-2xl border border-white/10"
          style={{ backgroundImage: 'url("/images/all-inclusive-pool-hero.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          {/* Radial dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-turquoise-950/80 to-turquoise-950/90 z-0" />
          
          <div className="space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-md border border-orange-500/20">
              <Flame className="h-3.5 w-3.5 fill-current text-white animate-pulse" /> {currentT.urgencyTitle}
            </span>
            <h3 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight">
              {currentT.footerCtaTitle}
            </h3>
            <p className="text-sand-100/80 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              {currentT.urgencyText}
            </p>
          </div>

          {/* Large Booking & WhatsApp Buttons Container */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 relative z-10">
            {/* Booking Button */}
            <a 
              href="/reservar?plan=promo_hab_gratis"
              className="w-full sm:w-auto px-10 py-5.5 bg-orange-500 hover:bg-orange-400 text-white font-black rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center justify-center gap-2 text-xl border-b-4 border-orange-700 uppercase tracking-wide"
            >
              <span>{currentT.footerCtaBtn}</span>
              <ChevronRight className="h-6 w-6 stroke-[3px]" />
            </a>

            {/* WhatsApp Button */}
            <a 
              href="https://wa.me/50762906800"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-5.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center justify-center gap-2.5 text-xl border-b-4 border-emerald-800 uppercase tracking-wide"
            >
              <svg className="h-6 w-6 fill-current text-white shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.114-2.905-6.99C16.257 1.875 13.777.844 11.14.844 5.704.844 1.28 5.263 1.277 10.699c-.001 1.637.452 3.231 1.312 4.631l-.993 3.626 3.714-.974.747.443zM17.18 14.39c-.3-.15-1.782-.88-2.057-.98-.275-.1-.475-.15-.675.15-.2.3-.775.98-.95 1.18-.175.2-.35.225-.65.075-.3-.15-1.264-.467-2.408-1.488-.888-.793-1.488-1.77-1.663-2.07-.175-.3-.019-.462.13-.61.135-.133.3-.35.45-.525.15-.175.2-.3.3-.5s.05-.375-.025-.525C9.53 9.4 8.93 7.93 8.68 7.33c-.244-.586-.492-.576-.675-.585-.175-.009-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.115 3.23 5.125 4.53.715.31 1.273.495 1.708.635.714.227 1.365.195 1.88.118.571-.085 1.782-.73 2.032-1.435.25-.7.25-1.3.175-1.43-.075-.13-.275-.2-.575-.35z"/>
              </svg>
              <span>{language === 'es' ? 'Contáctanos por WhatsApp' : 'Contact us on WhatsApp'}</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-sand-200/70 font-semibold uppercase tracking-wider mt-4 relative z-10">
            <ShieldCheck className="h-5 w-5 text-emerald-450" />
            <span>Garantía de reembolso de consumible en el hotel</span>
          </div>
        </div>
      </section>

    </div>
  );
};

export default PromoHabitacionGratis;
