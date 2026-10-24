import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Clock, Users, MapPin, ArrowRight, Compass, Check, Phone, Sparkles } from 'lucide-react';
import { SEO } from '../components/SEO';
import { trackWhatsAppClick } from '../utils/analytics';

interface TourItem {
  id: string;
  nameES: string;
  nameEN: string;
  category: 'islas' | 'aventura' | 'eco' | 'botes';
  price: string;
  durationES: string;
  durationEN: string;
  maxPax: number;
  descES: string;
  descEN: string;
  img: string;
  highlightsES: string[];
  highlightsEN: string[];
}

export const MahanaTours: React.FC = () => {
  const { language } = useLanguage();
  const [activeCat, setActiveCat] = useState<string>('all');

  const categories = [
    { id: 'all', nameES: 'Todos los Tours', nameEN: 'All Tours' },
    { id: 'islas', nameES: '🚢 Islas & Ballenas', nameEN: '🚢 Islands & Whales' },
    { id: 'aventura', nameES: '⚡ Aventura Extrema', nameEN: '⚡ Extreme Adventure' },
    { id: 'eco', nameES: '🌿 Ecoturismo & Cascadas', nameEN: '🌿 Ecotourism & Cascades' },
    { id: 'botes', nameES: '⛵ Charters de Yates', nameEN: '⛵ Yacht Charters' }
  ];

  const tours: TourItem[] = [
    {
      id: 'otoque-bona',
      nameES: 'Isla Otoque y Isla Boná',
      nameEN: 'Otoque Island & Boná Island',
      category: 'islas',
      price: '$300',
      durationES: '4 horas',
      durationEN: '4 hours',
      maxPax: 5,
      descES: 'Explora dos de las islas más vírgenes y exuberantes del Pacífico panameño. Incluye snorkel en aguas cristalinas, playas privadas vacías de arena blanca y avistamiento de colonias de aves marinas en Isla Boná.',
      descEN: 'Explore two of the most pristine and lush islands in the Panamanian Pacific. Includes snorkeling in crystal-clear waters, empty private beaches, and bird watching at Boná Island.',
      img: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032346231/UGpVxqvFa4a6FTLL6XQrah/isla-otoque_5b19650f.jpeg',
      highlightsES: ['Visita a 2 islas vírgenes', 'Equipo de snorkel incluido', 'Acceso a playa privada sin multitudes'],
      highlightsEN: ['Visit 2 virgin islands', 'Snorkeling gear included', 'Empty private beach access']
    },
    {
      id: 'whale-watching',
      nameES: 'Avistamiento de Ballenas Jorobadas',
      nameEN: 'Humpback Whale Watching Tour',
      category: 'islas',
      price: '$300',
      durationES: '2 horas',
      durationEN: '2 hours',
      maxPax: 5,
      descES: 'Una experiencia inolvidable frente a la costa. Navega por las cálidas aguas de la Bahía de Chame para contemplar los espectaculares saltos de las ballenas jorobadas y sus crías de cerca.',
      descEN: 'An unforgettable experience. Sail through the warm waters of Chame Bay to watch the spectacular jumps of humpback whales and their calves up close.',
      img: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032346231/UGpVxqvFa4a6FTLL6XQrah/whale-breach_03d179c9.jpg',
      highlightsES: ['Temporada: Julio a Octubre', 'Capitán local certificado', '95% de tasa de avistamientos'],
      highlightsEN: ['Season: July to October', 'Certified local captain', '95% sighting rate']
    },
    {
      id: 'jet-ski',
      nameES: 'Tour de Jet Ski',
      nameEN: 'Playa Caracol Jet Ski Rental',
      category: 'aventura',
      price: '$140',
      durationES: '1 hora',
      durationEN: '1 hour',
      maxPax: 2,
      descES: 'Siente la adrenalina y la libertad sobre las olas del Pacífico. Jet skis Yamaha de última generación equipados con sistemas de seguridad para recorrer la espectacular costa de Chame.',
      descEN: 'Feel the adrenaline and freedom over the Pacific waves. Latest generation Yamaha jet skis equipped with safety systems to tour the beautiful coastline.',
      img: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032346231/UGpVxqvFa4a6FTLL6XQrah/jet-ski_3f990f74.jpg',
      highlightsES: ['Motos Yamaha último modelo', 'Chalecos de flotación certificados', '1 o 2 personas por moto'],
      highlightsEN: ['Latest Yamaha jet skis', 'Safety vests included', '1 or 2 riders per ski']
    },
    {
      id: 'beach-buggy',
      nameES: 'Beach Buggy Mulitas todo terreno',
      nameEN: 'Beach Buggy Off-Road Rental',
      category: 'aventura',
      price: '$80',
      durationES: '30 min - 3 horas',
      durationEN: '30 min - 3 hours',
      maxPax: 4,
      descES: 'La aventura ideal para familias y amigos. Sube a nuestros buggies todo terreno y recorre las inmensas costas de arena volcánica y senderos de Chame sintiendo la brisa marina.',
      descEN: 'The ideal family adventure. Ride our off-road buggies and travel through the immense volcanic sand coasts and trails of Chame with the wind in your face.',
      img: '/images/tours-mulitas-beach-v2.jpg',
      highlightsES: ['Vehículos todo terreno 4x4', 'Paseo panorámico por la playa', 'Capacidad para 4 personas'],
      highlightsEN: ['Rugged 4x4 off-road buggies', 'Panoramic coastal drive', 'Seats up to 4 guests']
    },
    {
      id: 'kitesurf-lesson',
      nameES: 'Clase de Kitesurf en Punta Chame',
      nameEN: 'Punta Chame Kitesurfing Class',
      category: 'aventura',
      price: '$90',
      durationES: '1 hora',
      durationEN: '1 hour',
      maxPax: 4,
      descES: 'Punta Chame es un spot de kitesurf de clase mundial reconocido internacionalmente. Aprende el control del kite en tierra firme y da tus primeras planeadas con instructores IKO certificados.',
      descEN: 'Punta Chame is a world-class kitesurfing spot. Learn to control the kite on dry land and make your first glides on the water with certified IKO instructors.',
      img: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032346231/UGpVxqvFa4a6FTLL6XQrah/kitesurf-punta-chame_ef641b9c.jpg',
      highlightsES: ['Temporada de vientos constantes (Nov-Mar)', 'Instructores certificados IKO', 'Equipo completo de última generación'],
      highlightsEN: ['Ideal wind season (Nov-Mar)', 'IKO certified coaches', 'All kite gear provided']
    },
    {
      id: 'canyon-chame',
      nameES: 'Hiking & Snorkel al Cañón de Chame',
      nameEN: 'Los Cajones de Chame Hike & Swim',
      category: 'eco',
      price: '$45',
      durationES: '4 horas',
      durationEN: '4 hours',
      maxPax: 10,
      descES: 'Descubre "Los Cajones de Chame", un laberinto esculpido en roca con paredes verticales de más de 8 metros. Ideal para senderismo tropical, saltos de agua refrescantes y natación en pozas naturales cristalinas.',
      descEN: 'Discover "Los Cajones de Chame", a sculpted labyrinth of vertical rock walls over 8 meters high. Ideal for hiking, cliff jumps, and freshwater swimming.',
      img: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032346231/UGpVxqvFa4a6FTLL6XQrah/cascada-canyon_e70f0074.jpg',
      highlightsES: ['Caminata y natación en cañón fluvial', 'Paisajes fotográficos de ensueño', 'Parada para almuerzo criollo local'],
      highlightsEN: ['Canyon hiking and swimming', 'Stunning unique photo-ops', 'Local lunch stop included']
    },
    {
      id: 'filipinas-waterfalls',
      nameES: 'Eco-Tour Cascadas de Filipinas',
      nameEN: 'Filipinas Jungle Waterfalls Tour',
      category: 'eco',
      price: '$60',
      durationES: '5 horas',
      durationEN: '5 hours',
      maxPax: 8,
      descES: 'Una caminata inmersiva a través de la selva tropical húmeda de Chame que te llevará a descubrir 4 cascadas escondidas con pozas de agua dulce cristalina perfectas para nadar en plena naturaleza.',
      descEN: 'An immersive hike through Chames humid tropical rainforest that will lead you to discover 4 hidden waterfalls with crystal-clear natural pools perfect for swimming.',
      img: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032346231/UGpVxqvFa4a6FTLL6XQrah/cascada-filipinas_1974539a.jpg',
      highlightsES: ['Visita a 4 cascadas ocultas', 'Avistamiento de fauna y flora tropical', 'Almuerzo típico panameño incluido'],
      highlightsEN: ['Visit 4 jungle waterfalls', 'Exotic wildlife spotting', 'Traditional Panamanian lunch']
    },
    {
      id: 'yacht-sthamas',
      nameES: 'Chárter Privado: Yate Sthamas 39\'',
      nameEN: 'Private Yacht: Sthamas 39\' Charter',
      category: 'botes',
      price: '$950',
      durationES: '6 horas',
      durationEN: '6 hours',
      maxPax: 12,
      descES: 'Disfruta de la comodidad definitiva en un yate de lujo de 39 pies con aire acondicionado, camarote privado, cocina completa, asador BBQ a bordo, internet satelital y tripulación experimentada.',
      descEN: 'Enjoy ultimate comfort on a 39-foot yacht with air conditioning, double cabin bedroom, kitchen, BBQ grill, WiFi internet, and expert crew. Ideal for VIP families.',
      img: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032346231/UGpVxqvFa4a6FTLL6XQrah/sunset-cruise_bcebe5ff.jpg',
      highlightsES: ['Yate motorizado de 39 pies con A/C', 'Capitán y tripulación privados dedicados', 'BBQ a bordo, sistema de sonido y WiFi'],
      highlightsEN: ['Luxury 39ft motor yacht with A/C', 'Private captain & crew', 'On-board BBQ & high-speed WiFi']
    }
  ];

  const filteredTours = useMemo(() => {
    if (activeCat === 'all') return tours;
    return tours.filter(t => t.category === activeCat);
  }, [activeCat, tours]);

  const handleWhatsAppClick = (tourName: string) => {
    trackWhatsAppClick('Mahana Tours', tourName);
    const message = language === 'es' 
      ? `¡Hola! Estoy hospedado/interesado en Casa Mahana y me gustaría cotizar/reservar el tour: "${tourName}".`
      : `Hello! I am staying/interested in Casa Mahana and would love to book the tour: "${tourName}".`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/50769884566?text=${encoded}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-sand-50/60 font-sans pb-24">
      <SEO 
        titleEs="Tours y Excursiones de Aventura — Casa Mahana"
        titleEn="Adventure Tours & Excursions — Casa Mahana"
        descriptionEs="Explora Chame y sus alrededores con Mahana Tours. Excursiones en buggy por la playa, caminatas por cañones y cascadas, paseos en bote y cruceros en yate."
        descriptionEn="Explore Chame and beyond with Mahana Tours. Beach buggy excursions, canyon hikes, waterfalls, boat rides, and private yacht cruises."
        image="/images/tours-hero-ocean-v2.jpg"
        path="/mahana-tours"
        schemaType="TouristAttraction"
      />

      {/* 1. Full-Bleed Adventure Hero Banner */}
      <section className="band-full-bleed bg-mahana-dark text-white relative min-h-[480px] sm:min-h-[540px] flex items-end">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/tours-hero-ocean-v2.jpg" 
            alt="Mahana Tours Ocean Drone View" 
            className="w-full h-full object-cover filter brightness-90"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-mahana-dark via-mahana-dark/65 to-transparent" />
        </div>

        <div className="container-fluid relative z-10 py-16 sm:py-24 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-amber-600/90 text-sand-100 text-xs font-bold uppercase tracking-wider rounded-xl border border-amber-500/30">
            <Sparkles className="h-4 w-4" />
            <span>{language === 'es' ? 'Aventura & Naturaleza en Chame' : 'Adventure & Nature in Chame'}</span>
          </div>

          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-black font-serif text-white tracking-tight">
            Mahana Tours
          </h1>

          <p className="text-sand-100/90 text-sm sm:text-lg max-w-3xl font-medium leading-relaxed">
            {language === 'es'
              ? 'Nuestra agencia oficial de aventuras. Explora el majestuoso Cerro Chame, las cascadas ocultas en la jungla, báñate en cañones esculpidos por la corriente, explora las islas vírgenes de Otoque y Boná o navega en un yate de lujo con todas las comodidades.'
              : 'Our official adventure agency. Hike majestic Cerro Chame, discover tropical jungle waterfalls, swim in smooth rock canyons, visit the pristine sands of Otoque and Boná islands, or charter a luxury yacht with full board amenities.'}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-extrabold text-amber-400">
            <div className="flex items-center space-x-2">
              <Compass className="h-4.5 w-4.5" />
              <span>{language === 'es' ? 'Sede oficial de expediciones Casa Mahana' : 'Official tours center at Casa Mahana'}</span>
            </div>
            <div className="flex items-center space-x-2 text-turquoise-300">
              <MapPin className="h-4.5 w-4.5" />
              <span>Chame & Pacífico Panameño</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Category Filter Bar */}
      <section className="band-full-bleed bg-white/95 backdrop-blur-md border-b border-sand-200 sticky top-20 z-40 shadow-sm py-4">
        <div className="container-fluid">
          <div className="flex space-x-3 overflow-x-auto pb-1 scrollbar-none items-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  activeCat === cat.id
                    ? 'bg-turquoise-750 text-white shadow-sm ring-2 ring-turquoise-600/30'
                    : 'bg-sand-100/80 text-mahana-dark/80 hover:bg-sand-200/60 hover:text-turquoise-950'
                }`}
              >
                {language === 'es' ? cat.nameES : cat.nameEN}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. High-Impact Tour Showcases Grid */}
      <main className="band-full-bleed py-14 sm:py-20">
        <div className="container-fluid space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour) => (
              <div
                key={tour.id}
                className="bg-white rounded-[32px] overflow-hidden border border-sand-200 shadow-glass flex flex-col justify-between hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300"
              >
                <div>
                  {/* Image & Price Banner */}
                  <div className="relative h-64 w-full overflow-hidden">
                    <img 
                      src={tour.img} 
                      alt={language === 'es' ? tour.nameES : tour.nameEN} 
                      className="w-full h-full object-cover" 
                      loading="lazy" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    <span className="absolute top-4 left-4 px-3.5 py-1 bg-turquoise-900/90 text-sand-100 text-[10px] font-black uppercase tracking-widest rounded-full border border-turquoise-700/20 shadow-md">
                      {tour.category === 'islas' && (language === 'es' ? 'Islas' : 'Islands')}
                      {tour.category === 'aventura' && (language === 'es' ? 'Adrenalina' : 'Adrenaline')}
                      {tour.category === 'eco' && (language === 'es' ? 'Ecoturismo' : 'Ecotourism')}
                      {tour.category === 'botes' && (language === 'es' ? 'Yate Privado' : 'Private Charter')}
                    </span>

                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-xs px-4 py-1.5 rounded-2xl flex items-baseline space-x-1 shadow-md">
                      <span className="text-xxs font-extrabold text-mahana-dark/60 uppercase">{language === 'es' ? 'Desde' : 'From'}</span>
                      <span className="text-base font-black text-turquoise-950">{tour.price}</span>
                    </div>
                  </div>

                  {/* Tour Information */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-black font-serif text-turquoise-950 leading-tight">
                        {language === 'es' ? tour.nameES : tour.nameEN}
                      </h3>
                      <div className="flex items-center space-x-4 text-xs font-bold text-mahana-dark/65">
                        <span className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-turquoise-700" />
                          <span>{language === 'es' ? tour.durationES : tour.durationEN}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-turquoise-700" />
                          <span>{language === 'es' ? `Máx ${tour.maxPax} pers` : `Max ${tour.maxPax} guests`}</span>
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-mahana-dark/75 leading-relaxed">
                      {language === 'es' ? tour.descES : tour.descEN}
                    </p>

                    {/* Highlights Checklist */}
                    <div className="space-y-2 pt-2 border-t border-sand-100">
                      {(language === 'es' ? tour.highlightsES : tour.highlightsEN).map((hl, hlIdx) => (
                        <div key={hlIdx} className="flex items-start space-x-2 text-xs font-semibold text-turquoise-950">
                          <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-6 pt-2 sm:p-8 sm:pt-2 border-t border-sand-100 bg-sand-50/30">
                  <button
                    onClick={() => handleWhatsAppClick(language === 'es' ? tour.nameES : tour.nameEN)}
                    className="w-full py-3.5 bg-turquoise-700 hover:bg-turquoise-900 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center space-x-2 hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <span>{language === 'es' ? 'Cotizar por WhatsApp' : 'Book via WhatsApp'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Tours & Private Charters Banner */}
          <div className="bg-gradient-to-r from-turquoise-900 via-turquoise-950 to-mahana-dark rounded-[40px] p-8 sm:p-14 shadow-premium text-white border border-turquoise-800/40 relative overflow-hidden text-center max-w-4xl mx-auto space-y-6">
            <div className="absolute top-0 right-0 w-80 h-80 bg-turquoise-700/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
              <span className="px-3.5 py-1.5 bg-white/10 border border-white/20 rounded-lg text-turquoise-300 text-xs uppercase tracking-widest font-black inline-block">
                {language === 'es' ? 'Experiencias a la Medida' : 'Custom Experiences'}
              </span>
              <h3 className="text-2xl sm:text-4xl font-black font-serif tracking-tight leading-tight">
                {language === 'es' ? '¿Deseas armar un paquete personalizado?' : 'Looking for a fully custom package?'}
              </h3>
              <p className="text-turquoise-100/90 text-xs sm:text-sm leading-relaxed">
                {language === 'es'
                  ? 'Coordinamos tours privados de ecoturismo en Chame, pesca deportiva en altamar, tours de snorkel, celebraciones en altamar y paquetes combinados con hospedaje VIP Todo Incluido en Casa Mahana. Háblanos de tu grupo y nos encargamos de toda la logística.'
                  : 'We coordinate fully private adventure ecotours, offshore sport fishing, snorkeling island hops, ocean celebrations, and custom packages combined with a VIP All-Inclusive stay at Casa Mahana. Tell us what you need!'}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => handleWhatsAppClick('Paquete Personalizado de Tours y Aventuras')}
                  className="inline-flex py-3.5 px-8 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl text-xs font-bold transition-all shadow-md items-center space-x-2 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Phone className="h-4 w-4" />
                  <span>{language === 'es' ? 'Conversar con un Guía Experto' : 'Talk with an Expert Guide'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MahanaTours;
