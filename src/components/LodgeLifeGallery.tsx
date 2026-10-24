import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useMedia } from '../context/MediaContext';
import { Eye, X, Camera, Sparkles } from 'lucide-react';

interface GalleryItem {
  src: string;
  alt: string;
  titleEs: string;
  titleEn: string;
  categoryEs: string;
  categoryEn: string;
}

export const LodgeLifeGallery: React.FC = () => {
  const { language } = useLanguage();
  const { media } = useMedia();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      src: media.gal_1 || '/images/hero-pool-drone-aerial.jpg',
      alt: 'Casa Mahana exterior grounds and 3 pools',
      titleEs: 'Oasis Tropical & 3 Piscinas',
      titleEn: 'Tropical Oasis & 3 Pools',
      categoryEs: 'Instalaciones',
      categoryEn: 'Facilities'
    },
    {
      src: media.gal_2 || '/images/hero-pool-deck.jpg',
      alt: 'Lounge chairs next to the pool',
      titleEs: 'Deck de Piscina & Solarium',
      titleEn: 'Pool Deck & Solarium',
      categoryEs: 'Descanso',
      categoryEn: 'Relax'
    },
    {
      src: media.gal_3 || '/images/lodge-grounds.jpg',
      alt: 'Pet enjoying the tropical garden',
      titleEs: 'Jardines 100% Pet Friendly',
      titleEn: '100% Pet Friendly Grounds',
      categoryEs: 'Mascotas',
      categoryEn: 'Pets'
    },
    {
      src: media.gal_4 || '/images/food-pizza-oven.jpg',
      alt: 'Gourmet wood-fired pizza',
      titleEs: 'Pizzas al Horno de Leña',
      titleEn: 'Wood-Fired Artisanal Pizza',
      categoryEs: 'Gastronomía',
      categoryEn: 'Dining'
    },
    {
      src: media.gal_5 || '/images/room-doble.jpg',
      alt: 'Premium Lodge Room',
      titleEs: 'Suites Boutique & A/C',
      titleEn: 'Boutique Suites & A/C',
      categoryEs: 'Hospedaje',
      categoryEn: 'Lodging'
    },
    {
      src: media.gal_6 || '/images/food-cocktail.jpg',
      alt: 'Tropical cocktails poolside',
      titleEs: 'Mixología & Cócteles del Sol',
      titleEn: 'Sunlit Tropical Mixology',
      categoryEs: 'Gastronomía',
      categoryEn: 'Dining'
    }
  ];

  return (
    <section id="galeria" className="band-full-bleed py-20 lg:py-28 bg-sand-50 relative overflow-hidden font-sans">
      {/* Ambient background blur */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-sand-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-turquoise-100/25 rounded-full blur-3xl pointer-events-none" />

      <div className="container-fluid relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-sand-200/60 border border-sand-300/80 rounded-full text-turquoise-950 text-xs uppercase tracking-widest font-extrabold">
            <Camera className="w-3.5 h-3.5 text-turquoise-700" />
            <span>{language === 'es' ? 'Galería Casa Mahana' : 'Casa Mahana Gallery'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-turquoise-950 tracking-tight leading-[1.12]">
            {language === 'es' 
              ? 'Un vistazo real a tu próxima escapada' 
              : 'A real glimpse into your next getaway'}
          </h2>

          <div className="h-1.5 w-24 bg-turquoise-700 mx-auto rounded-full" />

          <p className="text-base sm:text-lg text-mahana-dark/70 max-w-2xl mx-auto leading-relaxed">
            {language === 'es'
              ? 'Imágenes sin filtros que reflejan la calidez, la vegetación viva, las 3 piscinas tropicales y la tranquilidad de nuestro Lodge en Chame.'
              : 'Unfiltered photography capturing the warmth, vibrant flora, 3 tropical pools, and pure serenity of our boutique Lodge in Chame.'}
          </p>
        </div>

        {/* Gallery Grid (Fluid container, large tiles) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
          {galleryItems.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => setSelectedImg(item.src)}
              className="bg-white rounded-[32px] overflow-hidden border border-sand-200 shadow-glass hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer flex flex-col"
            >
              <div className="relative h-80 sm:h-96 w-full overflow-hidden">
                <img 
                  src={item.src} 
                  alt={item.alt} 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-[800ms] ease-out"
                />
                
                {/* Ambient Category Tag */}
                <span className="absolute top-5 left-5 px-3.5 py-1.5 bg-turquoise-950/85 backdrop-blur-md text-sand-50 text-[10px] font-extrabold uppercase tracking-widest rounded-xl border border-white/15 z-10 shadow-sm">
                  {language === 'es' ? item.categoryEs : item.categoryEn}
                </span>

                {/* Hover overlay with glassmorphism preview button */}
                <div className="absolute inset-0 bg-gradient-to-t from-turquoise-950/80 via-turquoise-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-4 bg-white/25 backdrop-blur-md rounded-full text-white border border-white/40 transform scale-90 group-hover:scale-100 transition-all duration-300 shadow-xl">
                    <Eye className="h-6 w-6" />
                  </div>
                </div>
              </div>

              {/* Title & Caption */}
              <div className="p-5 sm:p-6 text-center bg-white flex-grow flex items-center justify-center">
                <h3 className="font-serif font-bold text-turquoise-950 text-lg sm:text-xl group-hover:text-turquoise-750 transition-colors">
                  {language === 'es' ? item.titleEs : item.titleEn}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal Overlay */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex flex-col justify-center items-center p-4 animate-fade-in"
          onClick={() => setSelectedImg(null)}
        >
          <div className="absolute top-24 right-6 sm:right-10 z-[70]">
            <button
              onClick={() => setSelectedImg(null)}
              className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md p-3.5 rounded-full border border-white/20 transition-all shadow-lg hover:scale-105 active:scale-95"
              aria-label="Close image"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div 
            className="max-w-5xl max-h-[85vh] overflow-hidden rounded-3xl border border-white/15 shadow-2xl bg-black p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImg} 
              alt="Casa Mahana Lodge" 
              className="max-h-[80vh] w-auto object-contain mx-auto rounded-2xl" 
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default LodgeLifeGallery;

