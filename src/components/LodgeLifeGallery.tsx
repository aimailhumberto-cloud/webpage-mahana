import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useMedia } from '../context/MediaContext';
import { Eye, X, Camera } from 'lucide-react';

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
      src: media.gal_1,
      alt: 'Casa Mahana exterior grounds',
      titleEs: 'Oasis Tropical',
      titleEn: 'Tropical Oasis',
      categoryEs: 'Instalaciones',
      categoryEn: 'Facilities'
    },
    {
      src: media.gal_2,
      alt: 'Lounge chairs next to the pool',
      titleEs: 'Área de Piscinas',
      titleEn: 'Pool Deck Lounge',
      categoryEs: 'Descanso',
      categoryEn: 'Relax'
    },
    {
      src: media.gal_3,
      alt: 'Pet enjoying the tropical garden',
      titleEs: 'Pet Friendly',
      titleEn: 'Pet Friendly',
      categoryEs: 'Mascotas',
      categoryEn: 'Pets'
    },
    {
      src: media.gal_4,
      alt: 'Gourmet wood-fired pizza',
      titleEs: 'Pizzas Artesanales',
      titleEn: 'Wood-Fired Pizza',
      categoryEs: 'Gastronomía',
      categoryEn: 'Dining'
    },
    {
      src: media.gal_5,
      alt: 'Premium Lodge Room',
      titleEs: 'Habitación de Lujo',
      titleEn: 'Premium Stay',
      categoryEs: 'Hospedaje',
      categoryEn: 'Lodging'
    },
    {
      src: media.gal_6,
      alt: 'Tropical cocktails poolside',
      titleEs: 'Coctelería del Sol',
      titleEn: 'Sunlit Cocktails',
      categoryEs: 'Gastronomía',
      categoryEn: 'Dining'
    }
  ];

  return (
    <section className="py-20 bg-sand-50 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-sm uppercase tracking-widest text-turquoise-700 font-extrabold flex items-center justify-center gap-2">
            <Camera className="h-4 w-4" />
            <span>{language === 'es' ? 'Galería Casa Mahana' : 'Casa Mahana Gallery'}</span>
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-turquoise-950">
            {language === 'es' 
              ? 'Un vistazo real a tu próxima escapada' 
              : 'A real glimpse into your next getaway'}
          </p>
          <div className="h-1.5 w-24 bg-turquoise-700 mx-auto rounded-full" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => setSelectedImg(item.src)}
              className="bg-white rounded-[32px] overflow-hidden border border-sand-200 shadow-glass hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer"
            >
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={item.src} 
                  alt={item.alt} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[600ms]"
                />
                
                {/* Ambient Category Tag */}
                <span className="absolute top-4 left-4 px-3 py-1.5 bg-turquoise-950/80 backdrop-blur-xs text-sand-100 text-[10px] font-bold uppercase tracking-wider rounded-xl border border-white/10 z-10">
                  {language === 'es' ? item.categoryEs : item.categoryEn}
                </span>

                {/* Hover overlay with glassmorphism preview button */}
                <div className="absolute inset-0 bg-gradient-to-t from-turquoise-950/70 via-turquoise-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-4 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30 transform scale-90 group-hover:scale-100 transition-all duration-300">
                    <Eye className="h-6 w-6" />
                  </div>
                </div>
              </div>

              {/* Title & Caption */}
              <div className="p-6 text-center">
                <h3 className="font-extrabold text-turquoise-950 text-lg group-hover:text-turquoise-750 transition-colors">
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
          className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-md flex flex-col justify-center items-center p-4 animate-fade-in"
          onClick={() => setSelectedImg(null)}
        >
          <div className="absolute top-4 right-4 z-[70]">
            <button
              onClick={() => setSelectedImg(null)}
              className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md p-3 rounded-full border border-white/20 transition-all"
              aria-label="Close image"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div 
            className="max-w-4xl max-h-[85vh] overflow-auto rounded-2xl border border-white/10 shadow-premium bg-white p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImg} 
              alt="Casa Mahana Lodge" 
              className="max-h-[80vh] w-auto object-contain mx-auto rounded-lg" 
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default LodgeLifeGallery;
