import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Clock, Users, MapPin, ArrowRight, DollarSign, Calendar, Flame, Compass, Eye, Check } from 'lucide-react';

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
    { id: 'all', nameES: 'Todos', nameEN: 'All' },
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
      descES: 'Explora dos de las islas más vírgenes y exuberantes del Pacífico. Incluye snorkel en aguas cristalinas, playas privadas vacías y avistamiento de aves marinas en Isla Boná.',
      descEN: 'Explore two of the most pristine and lush islands in the Pacific. Includes snorkeling in crystal clear waters, empty private beaches, and bird watching at Boná Island.',
      img: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032346231/UGpVxqvFa4a6FTLL6XQrah/isla-otoque_5b19650f.jpeg',
      highlightsES: ['Visita a 2 islas vírgenes', 'Snorkel incluido', 'Playa privada sin gente'],
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
      descES: 'Una experiencia inolvidable. Navega por las cálidas aguas de la Bahía de Chame para contemplar los espectaculares saltos de las ballenas jorobadas y sus crías de cerca.',
      descEN: 'An unforgettable experience. Sail through the warm waters of Chame Bay to watch the spectacular jumps of humpback whales and their calves up close.',
      img: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032346231/UGpVxqvFa4a6FTLL6XQrah/whale-breach_03d179c9.jpg',
      highlightsES: ['Temporada: Julio a Octubre', 'Guía local experto', '95% de avistamientos'],
      highlightsEN: ['Season: July to October', 'Expert local captain', '95% sighting rate']
    },
    {
      id: 'jet-ski',
      nameES: 'Tour de Jet Ski — Playa Caracol',
      nameEN: 'Playa Caracol Jet Ski Rental',
      category: 'aventura',
      price: '$140',
      durationES: '1 hora',
      durationEN: '1 hour',
      maxPax: 2,
      descES: 'Sierte la adrenalina y la libertad sobre las olas del Pacífico. Jet skis Yamaha de última generación equipados con sistemas de seguridad para recorrer la costa.',
      descEN: 'Feel the adrenaline and freedom over the Pacific waves. Latest generation Yamaha jet skis equipped with safety systems to tour the beautiful coastline.',
      img: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032346231/UGpVxqvFa4a6FTLL6XQrah/jet-ski_3f990f74.jpg',
      highlightsES: ['Motos Yamaha último modelo', 'Chalecos de seguridad', '1 o 2 personas por moto'],
      highlightsEN: ['Latest Yamaha jet skis', 'Safety vests included', '1 or 2 riders per ski']
    },
    {
      id: 'beach-buggy',
      nameES: 'Beach Buggy (Mulitas todo terreno)',
      nameEN: 'Beach Buggy Off-Road Rental',
      category: 'aventura',
      price: '$80',
      durationES: '30 min - 3 horas',
      durationEN: '30 min - 3 hours',
      maxPax: 4,
      descES: 'La aventura ideal para familias. Sube a nuestros buggies todo terreno y recorre las inmensas costas de arena volcánica y senderos de Chame con el viento en la cara.',
      descEN: 'The ideal family adventure. Ride our off-road buggies and travel through the immense volcanic sand coasts and trails of Chame with the wind in your face.',
      img: '/images/tours-mulitas-beach-v2.jpg',
      highlightsES: ['Vehículos todo terreno 4x4', 'Paseo panorámico costero', 'Capacidad de 4 personas'],
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
      descES: 'Punta Chame es un spot de kitesurf de clase mundial. Aprende a controlar el kite en tierra firme y da tus primeras planeadas sobre el agua con instructores IKO certificados.',
      descEN: 'Punta Chame is a world-class kitesurfing spot. Learn to control the kite on dry land and make your first glides on the water with certified IKO instructors.',
      img: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032346231/UGpVxqvFa4a6FTLL6XQrah/kitesurf-punta-chame_ef641b9c.jpg',
      highlightsES: ['Vientos perfectos (Nov-Mar)', 'Instructores IKO certificados', 'Equipo completo incluido'],
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
      descES: 'Descubre "Los Cajones de Chame", un laberinto esculpido de paredes de roca verticales de más de 8 metros de altura. Ideal para senderismo, saltos de agua y natación en aguas dulces.',
      descEN: 'Discover "Los Cajones de Chame", a sculpted labyrinth of vertical rock walls over 8 meters high. Ideal for hiking, cliff jumps, and freshwater swimming.',
      img: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032346231/UGpVxqvFa4a6FTLL6XQrah/cascada-canyon_e70f0074.jpg',
      highlightsES: ['Caminata y natación en cañón', 'Paisajes fotográficos únicos', 'Patacones en pueblo local'],
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
      descES: 'Una caminata inmersiva a través de la selva tropical húmeda de Chame que te llevará a descubrir 4 cascadas escondidas con pozas de agua dulce cristalina perfectas para nadar.',
      descEN: 'An immersive hike through Chames humid tropical rainforest that will lead you to discover 4 hidden waterfalls with crystal-clear natural pools perfect for swimming.',
      img: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032346231/UGpVxqvFa4a6FTLL6XQrah/cascada-filipinas_1974539a.jpg',
      highlightsES: ['Visita a 4 cascadas de selva', 'Flora y fauna exótica', 'Almuerzo típico panameño'],
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
      descES: 'Disfruta de la comodidad definitiva en un yate de 39 pies con aire acondicionado, cama de camarote, cocina, asador de BBQ, internet WiFi y tripulación experta. Ideal para familias VIP.',
      descEN: 'Enjoy ultimate comfort on a 39-foot yacht with air conditioning, double cabin bedroom, kitchen, BBQ grill, WiFi internet, and expert crew. Ideal for VIP families.',
      img: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032346231/UGpVxqvFa4a6FTLL6XQrah/sunset-cruise_bcebe5ff.jpg',
      highlightsES: ['Yate de lujo de 39 pies con A/C', 'Tripulación y capitán privados', 'BBQ a bordo e internet'],
      highlightsEN: ['Luxury 39ft motor yacht with A/C', 'Private captain & crew', 'On-board BBQ & high-speed WiFi']
    }
  ];

  const filteredTours = useMemo(() => {
    if (activeCat === 'all') return tours;
    return tours.filter(t => t.category === activeCat);
  }, [activeCat, tours]);

  const handleWhatsAppClick = (tourName: string) => {
    const message = language === 'es' 
      ? `¡Hola! Estoy hospedado/interesado en Casa Mahana y me gustaría cotizar/reservar el tour: "${tourName}".`
      : `Hello! I am staying/interested in Casa Mahana and would love to book the tour: "${tourName}".`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/50769884566?text=${encoded}`, '_blank');
  };

  return (
    <div className="bg-mahana-light min-h-screen pb-24 font-sans animate-fade-in-up">
      {/* Hero Banner */}
      <section className="relative h-[480px] w-full overflow-hidden">
        <img 
          src="/images/tours-hero-ocean-v2.jpg" 
          alt="Mahana Tours Ocean Drone View" 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mahana-dark/95 via-mahana-dark/50 to-transparent" />
        
        <div className="absolute bottom-6 sm:bottom-12 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2 sm:space-y-4">
          <span className="px-3.5 py-1.5 bg-amber-600 text-sand-100 text-xs font-black uppercase tracking-widest rounded-xl border border-amber-500/25">
            {language === 'es' ? '✨ Aventura & Naturaleza' : '✨ Adventure & Nature'}
          </span>
          <h1 className="text-2xl sm:text-6xl font-black text-white tracking-tight" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
            Mahana Tours
          </h1>
          <p className="text-sand-100/90 text-xs sm:text-lg max-w-3xl font-medium leading-relaxed">
            {language === 'es'
              ? 'Nuestra agencia oficial de aventuras. Explora el majestuoso Cerro Chame, las cascadas ocultas en la jungla, báñate en cañones esculpidos por la corriente, explora las islas vírgenes de Otoque y Boná o navega en un yate de lujo con todas las comodidades.'
              : 'Our official adventure agency. Hike majestic Cerro Chame, discover tropical jungle waterfalls, swim in smooth rock canyons, visit the pristine sands of Otoque and Boná islands, or charter a luxury yacht with full board amenities.'}
          </p>
          <div className="flex items-center space-x-2 text-xs font-extrabold text-amber-400">
            <Compass className="h-5 w-5 animate-spin" style={{ animationDuration: '40s' }} />
            <span>{language === 'es' ? 'Sede oficial de tours de Casa Mahana' : 'Official tours center at Casa Mahana'}</span>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="bg-white border-b border-sand-200 sticky top-20 z-40 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-none items-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  activeCat === cat.id
                    ? 'bg-turquoise-750 text-white shadow-sm'
                    : 'bg-sand-100/80 text-mahana-dark/80 hover:bg-sand-200/50 hover:text-turquoise-950'
                }`}
              >
                {language === 'es' ? cat.nameES : cat.nameEN}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tour Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-[32px] overflow-hidden border border-sand-200 shadow-glass flex flex-col justify-between hover:shadow-premium hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                {/* Image & Price */}
                <div className="relative h-60 w-full overflow-hidden">
                  <img src={tour.img} alt={language === 'es' ? tour.nameES : tour.nameEN} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  <span className="absolute top-4 left-4 px-3.5 py-1 bg-turquoise-900/90 text-sand-100 text-[10px] font-black uppercase tracking-widest rounded-full border border-turquoise-700/20 shadow-md">
                    {tour.category === 'islas' && (language === 'es' ? 'Islas' : 'Islands')}
                    {tour.category === 'aventura' && (language === 'es' ? 'Adrenalina' : 'Adrenaline')}
                    {tour.category === 'eco' && (language === 'es' ? 'Ecoturismo' : 'Ecotourism')}
                    {tour.category === 'botes' && (language === 'es' ? 'Yate Privado' : 'Private Charter')}
                  </span>

                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-xs px-4 py-1.5 rounded-2xl flex items-baseline space-x-0.5 shadow-md">
                    <span className="text-xxs font-extrabold text-mahana-dark/60 uppercase">{language === 'es' ? 'Desde' : 'From'}</span>
                    <span className="text-base font-black text-turquoise-950">{tour.price}</span>
                  </div>
                </div>

                {/* Info Text */}
                <div className="p-5 sm:p-8 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-turquoise-950 leading-tight">
                      {language === 'es' ? tour.nameES : tour.nameEN}
                    </h3>
                    <div className="flex items-center space-x-4 text-[10px] font-bold text-mahana-dark/65">
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3.5 w-3.5 text-turquoise-700" />
                        <span>{language === 'es' ? tour.durationES : tour.durationEN}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Users className="h-3.5 w-3.5 text-turquoise-700" />
                        <span>{language === 'es' ? `Máx ${tour.maxPax} pers` : `Max ${tour.maxPax} guests`}</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-mahana-dark/70 leading-relaxed">
                    {language === 'es' ? tour.descES : tour.descEN}
                  </p>

                  {/* Highlights Checklist */}
                  <div className="space-y-2 pt-2">
                    {(language === 'es' ? tour.highlightsES : tour.highlightsEN).map((hl, hlIdx) => (
                      <div key={hlIdx} className="flex items-start space-x-2 text-[10px] font-bold text-turquoise-950">
                        <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Booking Card Footer */}
              <div className="px-5 pb-5 pt-2 sm:px-8 sm:pb-6 border-t border-sand-100 bg-sand-50/20">
                <button
                  onClick={() => handleWhatsAppClick(language === 'es' ? tour.nameES : tour.nameEN)}
                  className="w-full py-3 bg-turquoise-700 hover:bg-turquoise-900 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center space-x-1.5 hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span>{language === 'es' ? 'Cotizar por WhatsApp' : 'Book via WhatsApp'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Tours banner */}
        <div className="bg-gradient-to-r from-turquoise-900 to-turquoise-950 rounded-[40px] p-5 sm:p-12 shadow-premium text-white border border-turquoise-800/40 relative overflow-hidden text-center max-w-4xl mx-auto space-y-6">
          <div className="absolute top-0 right-0 w-80 h-80 bg-turquoise-700/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-50/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-turquoise-300 text-[10px] uppercase tracking-widest font-black inline-block">
              {language === 'es' ? 'Experiencias a la Medida' : 'Custom Experiences'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              {language === 'es' ? '¿Deseas armar un paquete personalizado?' : 'Looking for a fully custom package?'}
            </h3>
            <p className="text-turquoise-100/90 text-xs sm:text-sm leading-relaxed">
              {language === 'es'
                ? 'Coordinamos tours privados de ecoturismo en Chame, pesca deportiva en altamar, tours de snorkel, bodas en altamar y paquetes combinados con hospedaje VIP Todo Incluido en Casa Mahana. Háblanos de tu grupo y nos encargamos de todo.'
                : 'We coordinate fully private adventure ecotours, offshore sport fishing, snorkeling island hops, ocean weddings, and custom packages combined with a VIP All-Inclusive stay at Casa Mahana. Tell us what you need!'}
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/50769884566?text=Hola!%20Me%20interesa%20un%20paquete%20de%20tours%20y%20aventuras%20personalizado%20con%20Casa%20Mahana."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex py-3.5 px-8 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl text-xs font-bold transition-all shadow-md items-center space-x-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{language === 'es' ? 'Conversar con un Guía Experto' : 'Talk with an Expert Guide'}</span>
                <ArrowRight className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MahanaTours;
