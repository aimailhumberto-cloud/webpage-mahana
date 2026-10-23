import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useMedia } from '../context/MediaContext';
import {
  Calendar,
  Compass,
  Sparkles,
  Sun,
  Utensils,
  Waves,
  BedDouble,
  Check,
  ArrowRight,
  Users,
  Moon,
  Flame,
  Play,
  Pause
} from 'lucide-react';
import { trackEvent, trackBookingIntent } from '../utils/analytics';

interface ExperiencePortal {
  id: 'stays' | 'daypass' | 'restaurant' | 'surf';
  icon: React.ReactNode;
  shortLabelEs: string;
  shortLabelEn: string;
  badgeEs: string;
  badgeEn: string;
  headlineHighlightEs: string;
  headlineHighlightEn: string;
  subtitleEs: string;
  subtitleEn: string;
  priceLabelEs: string;
  priceLabelEn: string;
  priceMain: string;
  priceSubEs: string;
  priceSubEn: string;
  bgImage: string;
  galleryThumbs: { src: string; labelEs: string; labelEn: string }[];
  bulletsEs: string[];
  bulletsEn: string[];
  primaryRoute: string;
  primaryCtaEs: string;
  primaryCtaEn: string;
  secondaryRoute: string;
  secondaryCtaEs: string;
  secondaryCtaEn: string;
  defaultPlanCode: string;
  accentGradient: string;
  accentBorder: string;
  accentBadge: string;
}

interface QuickPlanOption {
  code: string;
  category: 'Estadía' | 'Pasadía';
  nameEs: string;
  nameEn: string;
  tagEs: string;
  tagEn: string;
  isNightly: boolean;
  isPerCouple?: boolean;
  baseRate: number;
  summaryEs: string;
  summaryEn: string;
  detailRoute: string;
}

export const Hero: React.FC = () => {
  const { language } = useLanguage();
  const { media } = useMedia();
  const navigate = useNavigate();

  // Active portal index (0..3)
  const [activePortalIdx, setActivePortalIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedThumbIdx, setSelectedThumbIdx] = useState(0);

  // Rotating kinetic words in headline
  const [wordIdx, setWordIdx] = useState(0);

  // 3D Card tilt state
  const [cardTilt, setCardTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });

  // Quick-Book Interactive Calculator state
  const [selectedPlanCode, setSelectedPlanCode] = useState<string>('escape_mahana');
  const [guests, setGuests] = useState<number>(2);
  const [nights, setNights] = useState<number>(1);

  const rotatingWords = useMemo(
    () =>
      language === 'es'
        ? [
            '3 Piscinas Tropicales',
            'Estadías Todo Incluido VIP',
            'Pizza al Horno de Leña',
            'Playa, Surf & Aventura'
          ]
        : [
            '3 Tropical Swimming Pools',
            'VIP All-Inclusive Stays',
            'Wood-Fired Gourmet Pizza',
            'Beach Club, Surf & Tours'
          ],
    [language]
  );

  const portals: ExperiencePortal[] = useMemo(
    () => [
      {
        id: 'stays',
        icon: <BedDouble className="w-4 h-4" />,
        shortLabelEs: 'Hospedaje & VIP',
        shortLabelEn: 'Stays & All-Inclusive',
        badgeEs: '🔥 Promo desde $33 / pareja',
        badgeEn: '🔥 Promo from $33 / couple',
        headlineHighlightEs: 'Desconéctate en nuestro Lodge Boutique',
        headlineHighlightEn: 'Unwind at our Tropical Boutique Lodge',
        subtitleEs:
          'Habitaciones acogedoras rodeadas de jardines y 3 piscinas. Elige entre la promo Escape Mahana ($33/pareja), Pensión Completa ($49.50) o Todo Incluido con Open Bar ($66).',
        subtitleEn:
          'Cozy rooms surrounded by lush gardens and 3 pools. Choose between Escape Mahana ($33/couple), Full Board ($49.50), or VIP All-Inclusive with Open Bar ($66).',
        priceLabelEs: 'Tarifas por noche desde',
        priceLabelEn: 'Nightly rates starting at',
        priceMain: '$33',
        priceSubEs: '/ pareja (Dom-Jue) · $66 VIP Open Bar',
        priceSubEn: '/ couple (Sun-Thu) · $66 VIP Open Bar',
        bgImage: media.hero_1 || '/images/hero-pool-drone.jpg',
        galleryThumbs: [
          { src: media.hero_1 || '/images/hero-pool-drone.jpg', labelEs: 'Vista Dron', labelEn: 'Drone View' },
          { src: '/images/room-doble.jpg', labelEs: 'Hab. Doble', labelEn: 'Double Room' },
          { src: '/images/room-familiar.jpg', labelEs: 'Hab. Familiar', labelEn: 'Family Room' }
        ],
        bulletsEs: [
          'Acceso ilimitado a nuestras 3 piscinas tropicales',
          'Desayuno incluido o Pensión Completa + Open Bar',
          'Pet Friendly · WiFi de alta velocidad y parking privado'
        ],
        bulletsEn: [
          'Unlimited access to all 3 tropical swimming pools',
          'Breakfast included or Full Board + National Open Bar',
          'Pet Friendly · High-speed WiFi & free private parking'
        ],
        primaryRoute: '/estadias',
        primaryCtaEs: 'Ver Habitaciones y Planes',
        primaryCtaEn: 'Explore Rooms & Plans',
        secondaryRoute: '/estadias/escape-mahana',
        secondaryCtaEs: 'Ver Promo $33',
        secondaryCtaEn: 'View $33 Promo',
        defaultPlanCode: 'escape_mahana',
        accentGradient: 'from-turquoise-500 to-emerald-600',
        accentBorder: 'border-turquoise-400/50',
        accentBadge: 'bg-turquoise-500/20 text-turquoise-200 border-turquoise-400/40'
      },
      {
        id: 'daypass',
        icon: <Sun className="w-4 h-4" />,
        shortLabelEs: 'Pool Day & Pasadías',
        shortLabelEn: 'Pool Day & Passes',
        badgeEs: '☀️ Día de Sol · 9:00 AM a 5:00 PM',
        badgeEn: '☀️ Pool Day · 9:00 AM to 5:00 PM',
        headlineHighlightEs: 'Un Día de Piscina, Sol y Coctelería',
        headlineHighlightEn: 'A Full Day of Pools, Sun & Cocktails',
        subtitleEs:
          'Ven por el día sin hospedarte. Disfruta nuestras 3 piscinas, camastros y hamacas con el Pool Day básico ($5.50) o el Pasadía Todo Incluido con almuerzo, snacks y Open Bar ($38.50).',
        subtitleEn:
          'Visit for the day without an overnight stay. Enjoy our 3 pools, loungers, and hammocks with Basic Pool Day ($5.50) or All-Inclusive Day Pass with lunch, snacks & Open Bar ($38.50).',
        priceLabelEs: 'Pases por el día desde',
        priceLabelEn: 'Day passes starting at',
        priceMain: '$5.50',
        priceSubEs: 'Pool Day · $38.50 Todo Incluido VIP',
        priceSubEn: 'Pool Day · $38.50 VIP All-Inclusive',
        bgImage: media.hero_2 || '/images/hero-pool-deck.jpg',
        galleryThumbs: [
          { src: '/images/pool-day-cocktails.jpg', labelEs: 'Pool & Tragos', labelEn: 'Pool & Drinks' },
          { src: '/images/exp-daypass.jpg', labelEs: 'Pérgola & Sol', labelEn: 'Pergola & Sun' },
          { src: '/images/hero-pool-deck.jpg', labelEs: 'Camastros', labelEn: 'Loungers' }
        ],
        bulletsEs: [
          'Horario completo de 9:00 AM a 5:00 PM todos los días',
          'Opción VIP con almuerzo a la carta + 12 bebidas + snacks',
          'Ambiente relajado a solo 1 hora de la Ciudad de Panamá'
        ],
        bulletsEn: [
          'Full daytime access from 9:00 AM to 5:00 PM daily',
          'VIP option with a-la-carte lunch + 12 drinks + pool snacks',
          'Relaxing atmosphere just 1 hour from Panama City'
        ],
        primaryRoute: '/pasadias',
        primaryCtaEs: 'Comparar Pasadías',
        primaryCtaEn: 'Compare Day Passes',
        secondaryRoute: '/pasadias/todo-incluido',
        secondaryCtaEs: 'Pasadía VIP $38.50',
        secondaryCtaEn: 'VIP Day Pass $38.50',
        defaultPlanCode: 'pasadia_comidas',
        accentGradient: 'from-amber-500 to-orange-600',
        accentBorder: 'border-amber-400/50',
        accentBadge: 'bg-amber-500/20 text-amber-200 border-amber-400/40'
      },
      {
        id: 'restaurant',
        icon: <Utensils className="w-4 h-4" />,
        shortLabelEs: 'Restaurante a la Leña',
        shortLabelEn: 'Wood-Fired Restaurant',
        badgeEs: '🍕 Abierto al Público · Sin Reserva',
        badgeEn: '🍕 Open to the Public · Walk-Ins Welcome',
        headlineHighlightEs: 'Gastronomía Artesanal al Horno de Leña',
        headlineHighlightEn: 'Artisanal Wood-Fired Coastal Dining',
        subtitleEs:
          'No necesitas estar hospedado para comer delicioso. Pizzas artesanales a la leña, pescado entero con patacones, picadas mar y tierra, hamburguesas gourmet y cócteles de autor.',
        subtitleEn:
          'No overnight stay needed to dine with us. Artisanal wood-fired pizzas, whole fried fish with patacones, surf & turf platters, gourmet burgers, and craft cocktails.',
        priceLabelEs: 'Restaurante & Bar',
        priceLabelEn: 'Restaurant & Tropical Bar',
        priceMain: 'Abierto',
        priceSubEs: 'Desayuno, Almuerzo, Cena & Bar',
        priceSubEn: 'Breakfast, Lunch, Dinner & Bar',
        bgImage: '/images/food-pizza-oven.jpg',
        galleryThumbs: [
          { src: '/images/food-pizza-oven.jpg', labelEs: 'Horno de Leña', labelEn: 'Wood Oven' },
          { src: '/images/food-fish-patacones.jpg', labelEs: 'Mariscos', labelEn: 'Fresh Seafood' },
          { src: '/images/food-cocktail.jpg', labelEs: 'Coctelería', labelEn: 'Cocktails' }
        ],
        bulletsEs: [
          'Pizzas de masa artesanal horneadas a la leña al momento',
          'Mariscos frescos del Pacífico, ceviches y cortes a la parrilla',
          'Ideal para parar camino al interior o pasar la tarde en Chame'
        ],
        bulletsEn: [
          'Hand-stretched pizzas baked fresh in our wood-fired oven',
          'Fresh Pacific seafood, ceviches, and grilled specialties',
          'Perfect stop along the Pacific coast in Chame'
        ],
        primaryRoute: '/restaurante',
        primaryCtaEs: 'Ver Menú y Platos',
        primaryCtaEn: 'View Menu & Dishes',
        secondaryRoute: '/eventos',
        secondaryCtaEs: 'Eventos y Grupos',
        secondaryCtaEn: 'Events & Groups',
        defaultPlanCode: 'pasadia_entrada',
        accentGradient: 'from-rose-500 to-orange-600',
        accentBorder: 'border-rose-400/50',
        accentBadge: 'bg-rose-500/20 text-rose-200 border-rose-400/40'
      },
      {
        id: 'surf',
        icon: <Waves className="w-4 h-4" />,
        shortLabelEs: 'Surf Shack & Tours',
        shortLabelEn: 'Surf Shack & Tours',
        badgeEs: '🏄 Playa Caracol & Aventura en Chame',
        badgeEn: '🏄 Playa Caracol & Chame Adventures',
        headlineHighlightEs: 'Olas, Club de Playa y Excursiones',
        headlineHighlightEn: 'Waves, Beach Club & Guided Adventures',
        subtitleEs:
          'Combina el relax del Lodge con la adrenalina de nuestro Surf Shack en Playa Caracol, clases de surf, alquiler de tablas, tours en buggies, cascadas y paseos en yate.',
        subtitleEn:
          'Combine lodge relaxation with the thrill of our Surf Shack at Playa Caracol, surf lessons, board rentals, beach buggy tours, waterfalls, and yacht charters.',
        priceLabelEs: 'Club de Playa & Excursiones',
        priceLabelEn: 'Beach Club & Excursions',
        priceMain: 'Playa +',
        priceSubEs: 'Clases de Surf · Buggies · Cascadas',
        priceSubEn: 'Surf Lessons · Buggies · Waterfalls',
        bgImage: '/images/surf-shack-beach-club-drone.jpg',
        galleryThumbs: [
          { src: '/images/surf-shack-beach-club-drone.jpg', labelEs: 'Beach Club', labelEn: 'Beach Club' },
          { src: '/images/surf-shack-swing.jpg', labelEs: 'Playa Caracol', labelEn: 'Playa Caracol' },
          { src: '/images/lodge-grounds.jpg', labelEs: 'Naturaleza', labelEn: 'Nature' }
        ],
        bulletsEs: [
          'Acceso a Surf Shack frente a las olas de Playa Caracol',
          'Instructores certificados por la Academia Nacional de Surf',
          'Tours de buggies, cañones y pesca deportiva con Mahana Tours'
        ],
        bulletsEn: [
          'Beachfront Surf Shack right on the waves of Playa Caracol',
          'Certified instructors from the National Surf Academy',
          'Buggy tours, canyons & sport fishing with Mahana Tours'
        ],
        primaryRoute: '/surf-shack',
        primaryCtaEs: 'Descubrir Surf Shack',
        primaryCtaEn: 'Discover Surf Shack',
        secondaryRoute: '/mahana-tours',
        secondaryCtaEs: 'Ver Mahana Tours',
        secondaryCtaEn: 'View Mahana Tours',
        defaultPlanCode: 'todo_incluido',
        accentGradient: 'from-cyan-500 to-blue-600',
        accentBorder: 'border-cyan-400/50',
        accentBadge: 'bg-cyan-500/20 text-cyan-200 border-cyan-400/40'
      }
    ],
    [media.hero_1, media.hero_2]
  );

  const quickPlans: QuickPlanOption[] = useMemo(
    () => [
      {
        code: 'escape_mahana',
        category: 'Estadía',
        nameEs: '🔥 Escape Mahana ($33 / pareja)',
        nameEn: '🔥 Escape Mahana ($33 / couple)',
        tagEs: 'Promo Dom-Jue',
        tagEn: 'Sun-Thu Promo',
        isNightly: true,
        isPerCouple: true,
        baseRate: 33,
        summaryEs: 'Hospedaje + Desayuno continental + 3 Piscinas',
        summaryEn: 'Lodging + Continental breakfast + 3 Pools',
        detailRoute: '/estadias/escape-mahana'
      },
      {
        code: 'todo_incluido',
        category: 'Estadía',
        nameEs: '👑 Estadía Todo Incluido VIP ($66 / pers)',
        nameEn: '👑 VIP All-Inclusive Stay ($66 / guest)',
        tagEs: 'El Más Vendido',
        tagEn: 'Best Seller',
        isNightly: true,
        baseRate: 66,
        summaryEs: 'Habitación + 3 Comidas a la carta + Open Bar + Snacks',
        summaryEn: 'Room + 3 A-la-carte meals + Open Bar + Snacks',
        detailRoute: '/estadias/todo-incluido'
      },
      {
        code: 'mahana_exp',
        category: 'Estadía',
        nameEs: '✨ Mahana Experience ($49.50 / pers)',
        nameEn: '✨ Mahana Experience ($49.50 / guest)',
        tagEs: 'Pensión Completa',
        tagEn: 'Full Board',
        isNightly: true,
        baseRate: 49.5,
        summaryEs: 'Habitación + Desayuno, Almuerzo y Cena + 3 Piscinas',
        summaryEn: 'Room + Breakfast, Lunch & Dinner + 3 Pools',
        detailRoute: '/estadias/mahana-experience'
      },
      {
        code: 'pasadia_comidas',
        category: 'Pasadía',
        nameEs: '🍹 Pasadía Todo Incluido ($38.50 / pers)',
        nameEn: '🍹 All-Inclusive Day Pass ($38.50 / guest)',
        tagEs: 'Día VIP 9am-5pm',
        tagEn: 'VIP Day 9am-5pm',
        isNightly: false,
        baseRate: 38.5,
        summaryEs: '3 Piscinas + Almuerzo gourmet + 12 Bebidas + Snacks',
        summaryEn: '3 Pools + Gourmet Lunch + 12 Drinks + Snacks',
        detailRoute: '/pasadias/todo-incluido'
      },
      {
        code: 'pasadia_entrada',
        category: 'Pasadía',
        nameEs: '☀️ Pool Day Acceso ($5.50 / pers)',
        nameEn: '☀️ Basic Pool Day ($5.50 / guest)',
        tagEs: 'Solo Entrada',
        tagEn: 'Pool Access',
        isNightly: false,
        baseRate: 5.5,
        summaryEs: 'Uso de las 3 piscinas, camastros y jardines (9am-5pm)',
        summaryEn: 'Access to 3 pools, loungers & gardens (9am-5pm)',
        detailRoute: '/pasadias/pool-day'
      }
    ],
    []
  );

  // Rotate kinetic headline words every 2.8s
  useEffect(() => {
    const wordTimer = setInterval(() => {
      setWordIdx((prev) => (prev + 1) % rotatingWords.length);
    }, 2800);
    return () => clearInterval(wordTimer);
  }, [rotatingWords.length]);

  // Story auto-advance timer (7 seconds per portal)
  useEffect(() => {
    if (isPaused) return;
    const stepMs = 70;
    const increment = 1; // 100 steps * 70ms = 7000ms
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActivePortalIdx((curr) => (curr + 1) % portals.length);
          setSelectedThumbIdx(0);
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);
    return () => clearInterval(timer);
  }, [isPaused, portals.length]);

  const activePortal = portals[activePortalIdx];
  const activeBackground =
    activePortal.galleryThumbs[selectedThumbIdx]?.src || activePortal.bgImage;

  const selectedQuickPlan = useMemo(
    () => quickPlans.find((p) => p.code === selectedPlanCode) || quickPlans[0],
    [quickPlans, selectedPlanCode]
  );

  const estimatedTotal = useMemo(() => {
    if (selectedQuickPlan.isPerCouple) {
      const couplesOrRooms = Math.ceil(guests / 2);
      return couplesOrRooms * selectedQuickPlan.baseRate * nights;
    }
    if (selectedQuickPlan.isNightly) {
      return guests * selectedQuickPlan.baseRate * nights;
    }
    return guests * selectedQuickPlan.baseRate;
  }, [selectedQuickPlan, guests, nights]);

  const handleSelectPortal = (idx: number) => {
    setActivePortalIdx(idx);
    setSelectedThumbIdx(0);
    setProgress(0);
    const portal = portals[idx];
    setSelectedPlanCode(portal.defaultPlanCode);
    trackEvent('hero_select_portal', { portal_id: portal.id });
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4.5;
    const rotateY = ((x - centerX) / centerX) * 4.5;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setCardTilt({ rotateX, rotateY, glareX, glareY });
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  const handleQuickBookSubmit = () => {
    trackBookingIntent({
      planCode: selectedQuickPlan.code,
      category: selectedQuickPlan.category,
      guests,
      estimatedValue: estimatedTotal,
      source: 'hero_quick_book_dock'
    });
    navigate(`/reservar?plan=${selectedQuickPlan.code}&guests=${guests}`, {
      state: {
        planCode: selectedQuickPlan.code,
        category: selectedQuickPlan.category,
        guests
      }
    });
  };

  return (
    <section
      id="inicio"
      className="relative bg-mahana-dark min-h-[92vh] flex flex-col justify-between overflow-hidden pt-6 pb-14 lg:py-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Dynamic Multi-Layer Background with Ken Burns & Crossfade */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {portals.map((portal, idx) => {
          const isCurrent = idx === activePortalIdx;
          const imgSrc = isCurrent ? activeBackground : portal.bgImage;
          return (
            <div
              key={portal.id}
              className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out ${
                isCurrent ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
              style={{
                backgroundImage: `url('${imgSrc}')`
              }}
            />
          );
        })}
        {/* Multi-stop cinematic gradients for high contrast readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-mahana-dark/95 via-mahana-dark/80 to-mahana-dark/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-mahana-dark via-mahana-dark/30 to-mahana-dark/65" />
      </div>

      {/* Ambient Dynamic Glow Orbs */}
      <div className="absolute top-1/4 left-[8%] w-96 h-96 bg-turquoise-500/15 rounded-full blur-3xl pointer-events-none transition-all duration-1000" />
      <div className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none transition-all duration-1000" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 space-y-8 my-auto">
        {/* Top Interactive Story Portal Switcher Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          {/* Live Status Pill */}
          <div className="inline-flex items-center flex-wrap gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-md border border-white/15 rounded-full text-xs text-sand-100 w-fit">
            <span className="flex items-center gap-1.5 font-bold text-emerald-300">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
              {language === 'es' ? 'Abierto Hoy en Chame' : 'Open Today in Chame'}
            </span>
            <span className="text-white/30">•</span>
            <span className="text-sand-100/90 font-medium">☀️ 30°C Tropical</span>
            <span className="hidden md:inline text-white/30">•</span>
            <span className="hidden md:inline text-amber-300 font-semibold">⭐ 4.2 Google · 🐾 Pet Friendly</span>
          </div>

          {/* Story Progress Tabs */}
          <div className="grid grid-cols-2 sm:flex items-center gap-2">
            {portals.map((portal, idx) => {
              const isActive = idx === activePortalIdx;
              return (
                <button
                  key={portal.id}
                  onClick={() => handleSelectPortal(idx)}
                  className={`relative overflow-hidden group px-3.5 py-2 rounded-xl text-left transition-all duration-300 border flex items-center gap-2 ${
                    isActive
                      ? 'bg-white/15 text-white border-white/40 shadow-lg scale-[1.02]'
                      : 'bg-white/5 hover:bg-white/10 text-sand-100/70 border-white/10'
                  }`}
                >
                  <span className={`${isActive ? 'text-turquoise-300' : 'text-sand-200/60'}`}>
                    {portal.icon}
                  </span>
                  <span className="text-xs font-extrabold tracking-tight truncate">
                    {language === 'es' ? portal.shortLabelEs : portal.shortLabelEn}
                  </span>
                  {/* Story Progress Line at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
                    <div
                      className={`h-full bg-gradient-to-r ${portal.accentGradient} transition-all duration-75`}
                      style={{
                        width: isActive ? `${progress}%` : idx < activePortalIdx ? '100%' : '0%'
                      }}
                    />
                  </div>
                </button>
              );
            })}
            <button
              onClick={() => setIsPaused((p) => !p)}
              title={isPaused ? 'Reproducir' : 'Pausar'}
              className="hidden sm:flex items-center justify-center w-8 h-8 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white transition-colors"
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Main Split Interactive Stage: Left Kinetic Copy + Right 3D Bento Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column (7 cols): Kinetic Typography + Active Portal Story */}
          <div className="lg:col-span-7 text-left space-y-6">
            {/* Active Portal Floating Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider border backdrop-blur-md transition-all duration-300 bg-white/10 text-amber-300 border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'es' ? activePortal.badgeEs : activePortal.badgeEn}</span>
            </div>

            {/* Kinetic Headline with Rotating Highlight Pill */}
            <div className="space-y-3">
              <div className="text-xs sm:text-sm uppercase tracking-widest text-turquoise-300 font-extrabold flex flex-wrap items-center gap-2">
                <span>{language === 'es' ? 'VIVE CASA MAHANA:' : 'EXPERIENCE CASA MAHANA:'}</span>
                <span
                  key={wordIdx}
                  className="inline-block px-3 py-0.5 rounded-lg bg-gradient-to-r from-turquoise-500/30 to-amber-500/30 border border-turquoise-300/40 text-white animate-fade-in"
                >
                  {rotatingWords[wordIdx]}
                </span>
              </div>

              <h1
                key={activePortal.id}
                className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-white leading-[1.08] font-sans drop-shadow-lg animate-fade-in"
              >
                {language === 'es' ? activePortal.headlineHighlightEs : activePortal.headlineHighlightEn}
              </h1>

              <p className="text-base sm:text-lg text-sand-100/85 leading-relaxed font-sans max-w-2xl">
                {language === 'es' ? activePortal.subtitleEs : activePortal.subtitleEn}
              </p>
            </div>

            {/* Key Inclusions Checklist for Active Mode */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              {(language === 'es' ? activePortal.bulletsEs : activePortal.bulletsEn).map((bullet, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 bg-white/5 backdrop-blur-xs border border-white/10 rounded-xl p-3 text-xs text-sand-100/90 font-medium"
                >
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            {/* Action CTAs for Active Portal */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => {
                  trackEvent('hero_primary_cta', {
                    portal_id: activePortal.id,
                    target_route: activePortal.primaryRoute
                  });
                  navigate(activePortal.primaryRoute);
                }}
                className={`flex items-center justify-center gap-2 px-7 py-4 bg-gradient-to-r ${activePortal.accentGradient} text-white rounded-2xl font-extrabold text-sm transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98]`}
              >
                <Compass className="h-4.5 w-4.5" />
                <span>{language === 'es' ? activePortal.primaryCtaEs : activePortal.primaryCtaEn}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => {
                  trackEvent('hero_secondary_cta', {
                    portal_id: activePortal.id,
                    target_route: activePortal.secondaryRoute
                  });
                  navigate(activePortal.secondaryRoute);
                }}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-2xl font-bold text-sm backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Flame className="h-4 w-4 text-amber-400" />
                <span>{language === 'es' ? activePortal.secondaryCtaEs : activePortal.secondaryCtaEn}</span>
              </button>
            </div>
          </div>

          {/* Right Column (5 cols): 3D Interactive Bento Showcase Card */}
          <div className="lg:col-span-5" style={{ perspective: '1200px' }}>
            <div
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{
                transform: `rotateX(${cardTilt.rotateX}deg) rotateY(${cardTilt.rotateY}deg)`,
                transition: 'transform 0.18s ease-out'
              }}
              className="relative rounded-3xl bg-white/10 backdrop-blur-xl border border-white/25 shadow-2xl overflow-hidden p-4 sm:p-5 space-y-4"
            >
              {/* Dynamic Spotlight Glare */}
              <div
                className="pointer-events-none absolute inset-0 opacity-30 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at ${cardTilt.glareX}% ${cardTilt.glareY}%, rgba(255,255,255,0.35), transparent 60%)`
                }}
              />

              {/* Active Preview Image Window */}
              <div className="relative h-52 sm:h-60 rounded-2xl overflow-hidden border border-white/15">
                <img
                  src={activeBackground}
                  alt={language === 'es' ? activePortal.shortLabelEs : activePortal.shortLabelEn}
                  className="w-full h-full object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mahana-dark/90 via-transparent to-black/20" />

                {/* Top Right Live Price Tag */}
                <div className="absolute top-3 right-3 bg-mahana-dark/85 backdrop-blur-md border border-white/20 rounded-2xl px-3.5 py-2 text-right shadow-lg">
                  <span className="block text-[10px] uppercase tracking-wider text-turquoise-300 font-bold">
                    {language === 'es' ? activePortal.priceLabelEs : activePortal.priceLabelEn}
                  </span>
                  <span className="text-2xl font-black text-white leading-none">
                    {activePortal.priceMain}
                  </span>
                  <span className="block text-[10px] text-sand-200/80 font-semibold mt-0.5">
                    {language === 'es' ? activePortal.priceSubEs : activePortal.priceSubEn}
                  </span>
                </div>

                {/* Bottom Scene Switcher Pills inside Card */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 bg-black/55 backdrop-blur-md p-1 rounded-xl border border-white/15">
                    {activePortal.galleryThumbs.map((thumb, tIdx) => (
                      <button
                        key={tIdx}
                        onClick={() => setSelectedThumbIdx(tIdx)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition-all ${
                          selectedThumbIdx === tIdx
                            ? 'bg-white text-mahana-dark shadow-xs'
                            : 'text-white/75 hover:text-white'
                        }`}
                      >
                        {language === 'es' ? thumb.labelEs : thumb.labelEn}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Bottom Quick Info & Direct Action */}
              <div className="flex items-center justify-between gap-3 pt-1">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-turquoise-300">
                    {language === 'es' ? 'Acceso Directo' : 'Direct Access'}
                  </p>
                  <p className="text-sm font-bold text-white">
                    {language === 'es'
                      ? 'Confirmación inmediata en línea'
                      : 'Instant online confirmation'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    trackBookingIntent({
                      planCode: activePortal.defaultPlanCode,
                      source: `hero_3d_card_${activePortal.id}`
                    });
                    navigate(`/reservar?plan=${activePortal.defaultPlanCode}`, {
                      state: { planCode: activePortal.defaultPlanCode }
                    });
                  }}
                  className="px-4 py-2.5 bg-white hover:bg-sand-100 text-mahana-dark rounded-xl font-black text-xs transition-all shadow-md flex items-center gap-1.5 shrink-0 hover:scale-105"
                >
                  <Calendar className="w-3.5 h-3.5 text-turquoise-700" />
                  <span>{language === 'es' ? 'Reservar' : 'Book Now'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Quick-Book & Instant Price Calculator Dock */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 sm:p-5 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* 1. Plan Selector (5 cols) */}
            <div className="md:col-span-5 text-left">
              <label className="block text-[10px] font-extrabold uppercase tracking-widest text-turquoise-300 mb-1.5">
                {language === 'es' ? '1. Elige tu Plan o Experiencia' : '1. Choose Your Plan or Experience'}
              </label>
              <select
                value={selectedPlanCode}
                onChange={(e) => {
                  setSelectedPlanCode(e.target.value);
                  trackEvent('hero_calculator_change_plan', { plan_code: e.target.value });
                }}
                className="w-full bg-mahana-dark/80 hover:bg-mahana-dark text-white font-bold text-xs sm:text-sm rounded-xl px-3.5 py-3 border border-white/20 focus:outline-none focus:border-turquoise-400 transition-colors cursor-pointer"
              >
                {quickPlans.map((plan) => (
                  <option key={plan.code} value={plan.code} className="bg-mahana-dark text-white">
                    {language === 'es' ? plan.nameEs : plan.nameEn}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-sand-200/75 mt-1 truncate">
                {language === 'es' ? selectedQuickPlan.summaryEs : selectedQuickPlan.summaryEn}
              </p>
            </div>

            {/* 2. Guests & Nights Counter (3 cols) */}
            <div className="md:col-span-3 flex items-center gap-3">
              {/* Guests */}
              <div className="flex-1 bg-mahana-dark/70 border border-white/15 rounded-xl p-2 text-center">
                <span className="text-[10px] uppercase tracking-wider text-sand-200/70 font-bold flex items-center justify-center gap-1">
                  <Users className="w-3 h-3 text-turquoise-400" />
                  {language === 'es' ? 'Personas' : 'Guests'}
                </span>
                <div className="flex items-center justify-between mt-1 px-1">
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    className="w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
                  >
                    -
                  </button>
                  <span className="text-sm font-black text-white">{guests}</span>
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.min(16, g + 1))}
                    className="w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Nights (only if lodging plan) */}
              {selectedQuickPlan.isNightly && (
                <div className="flex-1 bg-mahana-dark/70 border border-white/15 rounded-xl p-2 text-center">
                  <span className="text-[10px] uppercase tracking-wider text-sand-200/70 font-bold flex items-center justify-center gap-1">
                    <Moon className="w-3 h-3 text-amber-400" />
                    {language === 'es' ? 'Noches' : 'Nights'}
                  </span>
                  <div className="flex items-center justify-between mt-1 px-1">
                    <button
                      type="button"
                      onClick={() => setNights((n) => Math.max(1, n - 1))}
                      className="w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
                    >
                      -
                    </button>
                    <span className="text-sm font-black text-white">{nights}</span>
                    <button
                      type="button"
                      onClick={() => setNights((n) => Math.min(14, n + 1))}
                      className="w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Live Estimated Price & Instant Book Button (4 cols) */}
            <div className="md:col-span-4 flex items-center justify-between sm:justify-end gap-4 border-t md:border-t-0 border-white/10 pt-3 md:pt-0">
              <div className="text-left md:text-right">
                <span className="block text-[10px] uppercase tracking-wider text-turquoise-300 font-extrabold">
                  {language === 'es' ? 'Total Estimado' : 'Estimated Total'}
                </span>
                <div className="flex items-baseline gap-1 md:justify-end">
                  <span className="text-2xl sm:text-3xl font-black text-white">
                    ${estimatedTotal.toFixed(estimatedTotal % 1 === 0 ? 0 : 2)}
                  </span>
                  <span className="text-[10px] text-sand-200/70 font-semibold">USD</span>
                </div>
              </div>

              <button
                onClick={handleQuickBookSubmit}
                className="px-5 py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-2xl font-black text-xs sm:text-sm shadow-xl transition-all flex items-center gap-2 shrink-0 hover:scale-[1.03] active:scale-[0.98]"
              >
                <span>{language === 'es' ? '⚡ Reservar Ahora' : '⚡ Book Now'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Elegant curve at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-mahana-light rounded-t-[32px] md:rounded-t-[48px]" />
    </section>
  );
};
