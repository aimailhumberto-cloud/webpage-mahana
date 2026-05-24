import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Check, Users, ShieldAlert, Waves, PawPrint, BedDouble, ArrowRight, Table, X, ZoomIn } from 'lucide-react';

export const EstadiasHub: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const roomsList = [
    {
      id: 'estandar',
      titleKey: 'rooms.estandar_title',
      descKey: 'rooms.estandar_desc',
      capacityKey: 'rooms.estandar_capacity',
      bedsKey: 'rooms.estandar_beds',
      amenitiesKey: 'rooms.estandar_amenities',
      img: '/images/room-estandar.jpg?v=2',
      pets: true,
      planCode: 'mahana_exp',
      badge: 'Cozy'
    },
    {
      id: 'doble',
      titleKey: 'rooms.doble_title',
      descKey: 'rooms.doble_desc',
      capacityKey: 'rooms.doble_capacity',
      bedsKey: 'rooms.doble_beds',
      amenitiesKey: 'rooms.doble_amenities',
      img: '/images/room-doble.jpg?v=2',
      pets: true,
      planCode: 'mahana_exp',
      badge: 'Popular'
    },
    {
      id: 'familiar',
      titleKey: 'rooms.familiar_title',
      descKey: 'rooms.familiar_desc',
      capacityKey: 'rooms.familiar_capacity',
      bedsKey: 'rooms.familiar_beds',
      amenitiesKey: 'rooms.familiar_amenities',
      img: '/images/room-familiar.jpg?v=2',
      pets: true,
      planCode: 'mahana_exp',
      badge: 'Spacious'
    },
    {
      id: 'camping',
      titleKey: 'rooms.camping_title',
      descKey: 'rooms.camping_desc',
      capacityKey: 'rooms.camping_capacity',
      bedsKey: 'rooms.camping_beds',
      amenitiesKey: 'rooms.camping_amenities',
      img: '/images/room-camping-green.png',
      pets: false,
      planCode: 'mahana_exp',
      badge: 'Glamping'
    }
  ];

  const galleryImages = [
    { src: '/images/room-gallery-woodendoor.jpg', titleEs: 'Distribución Familiar / Doble', titleEn: 'Family / Double Layout' },
    { src: '/images/room-gallery-bathroom.jpg', titleEs: 'Baño de Lujo Privado', titleEn: 'Luxury Private Bathroom' },
    { src: '/images/room-gallery-singlebeds.jpg', titleEs: 'Habitación Camas Sencillas', titleEn: 'Single Beds Room' },
    { src: '/images/room-gallery-redbeds.jpg', titleEs: 'Habitación Doble Clásica', titleEn: 'Classic Double Room' },
    { src: '/images/room-gallery-redwall.png', titleEs: 'Habitación Estándar Cozy', titleEn: 'Cozy Standard Room' }
  ];

  const handleBookRoom = (planCode: string) => {
    navigate('/reservar', { state: { category: 'Estadía', planCode } });
  };

  return (
    <div className="py-16 bg-mahana-light min-h-[90vh] animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-sm uppercase tracking-widest text-turquoise-700 font-extrabold">
            {t('rooms.title')}
          </h1>
          <p className="text-3xl sm:text-4xl font-extrabold text-turquoise-950">
            {t('rooms.subtitle')}
          </p>
          <div className="h-1.5 w-24 bg-turquoise-700 mx-auto rounded-full" />
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          {roomsList.map((room) => (
            <div 
              key={room.id}
              className="bg-white rounded-[32px] overflow-hidden border border-sand-200 shadow-glass hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden">
                  <img src={room.img} alt={t(room.titleKey)} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Badge */}
                  <span className="absolute top-4 left-4 px-3 py-1.5 bg-turquoise-900/90 backdrop-blur-md text-sand-100 text-xs font-bold uppercase tracking-wider rounded-xl border border-turquoise-700/30">
                    {room.badge}
                  </span>

                  {/* Pet Friendly Badge */}
                  <span className={`absolute top-4 right-4 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 border backdrop-blur-md shadow-md ${
                    room.pets 
                      ? 'bg-emerald-950/95 text-emerald-100 border-emerald-500/20' 
                      : 'bg-rose-950/95 text-rose-100 border-rose-500/20'
                  }`}>
                    <PawPrint className="h-3.5 w-3.5" />
                    <span>{room.pets ? (language === 'es' ? 'Pet Friendly' : 'Pet-Friendly') : (language === 'es' ? 'No Mascotas' : 'No Pets')}</span>
                  </span>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                  <div>
                    <h2 className="text-2xl font-black text-turquoise-950 tracking-tight">{t(room.titleKey)}</h2>
                    <p className="text-sm text-mahana-dark/75 mt-2 leading-relaxed">{t(room.descKey)}</p>
                  </div>

                  {/* Features */}
                  <div className="bg-sand-50 p-5 rounded-2xl border border-sand-100 space-y-3.5">
                    <div className="flex items-center space-x-3 text-sm text-turquoise-950 font-semibold">
                      <Users className="h-4.5 w-4.5 text-turquoise-700 shrink-0" />
                      <span>{t(room.capacityKey)}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-turquoise-950 font-semibold">
                      <BedDouble className="h-4.5 w-4.5 text-turquoise-700 shrink-0" />
                      <span>{t(room.bedsKey)}</span>
                    </div>
                    
                    <div className="border-t border-sand-200/60 pt-3">
                      <p className="text-xs uppercase tracking-wider font-extrabold text-turquoise-950 mb-1.5">
                        {language === 'es' ? 'Comodidades:' : 'Amenities:'}
                      </p>
                      <p className="text-xs text-mahana-dark/70 font-medium leading-relaxed">
                        {t(room.amenitiesKey)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="px-8 pb-8 pt-4 border-t border-sand-100 bg-sand-50/20 rounded-b-[32px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-mahana-dark/60 font-bold block">
                    {language === 'es' ? 'Tarifas sugeridas desde' : 'Suggested rates from'}
                  </span>
                  <span className="text-xl font-extrabold text-turquoise-950">
                    {room.id === 'camping' ? '$45' : '$49.50'}
                    <span className="text-xs font-normal text-mahana-dark/60"> / {t('common.nights')}</span>
                  </span>
                </div>

                <button 
                  onClick={() => handleBookRoom(room.planCode)}
                  className="px-5 py-3 bg-turquoise-700 hover:bg-turquoise-900 text-white rounded-xl font-bold flex items-center justify-center space-x-2 transition-all shadow-md group shrink-0 active:scale-[0.98]"
                >
                  <span>{language === 'es' ? 'Reservar Habitación' : 'Book Room'}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Room Gallery Section */}
        <div className="mb-20 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl font-black text-turquoise-950 tracking-tight">
              {language === 'es' ? 'Galería de Detalles & Interiores' : 'Interior Details & Rooms Gallery'}
            </h2>
            <p className="text-sm text-mahana-dark/70 leading-relaxed font-medium">
              {language === 'es' 
                ? 'Conoce la calidez, limpieza y distribución de nuestras habitaciones reales y baños del lodge.' 
                : 'Get a closer look at the warmth, cleanliness, and layout of our actual rooms and lodge bathrooms.'}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {galleryImages.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveImage(img.src)}
                className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden border border-sand-200 shadow-glass cursor-pointer hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300 bg-white"
              >
                <img 
                  src={img.src} 
                  alt={language === 'es' ? img.titleEs : img.titleEn} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-turquoise-950/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="p-3 bg-white/95 text-turquoise-950 rounded-full shadow-lg backdrop-blur-sm transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <ZoomIn className="h-5 w-5" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none drop-shadow-sm">
                  {language === 'es' ? img.titleEs : img.titleEn}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-[32px] border border-sand-200 shadow-glass overflow-hidden p-8 space-y-6">
          <div className="flex items-center space-x-3">
            <Table className="h-6 w-6 text-turquoise-700" />
            <h2 className="text-xl font-bold text-turquoise-950">{t('rooms.comparison_title')}</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-mahana-dark">
              <thead>
                <tr className="border-b border-sand-200 text-xs uppercase tracking-wider font-extrabold text-turquoise-900 bg-sand-50/50">
                  <th className="py-4 px-4">{t('rooms.headers.category')}</th>
                  <th className="py-4 px-4">{t('rooms.headers.capacity')}</th>
                  <th className="py-4 px-4">{t('rooms.headers.beds')}</th>
                  <th className="py-4 px-4">{t('rooms.headers.pets')}</th>
                  <th className="py-4 px-4">{t('rooms.headers.features')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-100 font-medium">
                <tr className="hover:bg-sand-50/30 transition-colors">
                  <td className="py-4 px-4 font-bold text-turquoise-950">{t('rooms.estandar_title')}</td>
                  <td className="py-4 px-4">{language === 'es' ? '2 a 3 Huéspedes' : '2 to 3 Guests'}</td>
                  <td className="py-4 px-4">{language === 'es' ? '1 Cama Doble + 1 Sencilla' : '1 Double + 1 Single'}</td>
                  <td className="py-4 px-4 text-emerald-600 font-bold">✔️ {language === 'es' ? 'Sí' : 'Yes'}</td>
                  <td className="py-4 px-4 text-xs">{language === 'es' ? 'Ventanas de brisa, Agua caliente, Smart TV con Netflix, WiFi' : 'Breezy Windows, Hot Water, Smart TV with Netflix, WiFi'}</td>
                </tr>
                <tr className="hover:bg-sand-50/30 transition-colors">
                  <td className="py-4 px-4 font-bold text-turquoise-950">{t('rooms.doble_title')}</td>
                  <td className="py-4 px-4">4 {language === 'es' ? 'Huéspedes' : 'Guests'}</td>
                  <td className="py-4 px-4">{language === 'es' ? '2 Camas Dobles' : '2 Double Beds'}</td>
                  <td className="py-4 px-4 text-emerald-600 font-bold">✔️ {language === 'es' ? 'Sí' : 'Yes'}</td>
                  <td className="py-4 px-4 text-xs">{language === 'es' ? 'Terracita con Hamaca, A/C, Smart TV, WiFi (Sin Nevera)' : 'Terrace with Hammock, A/C, Smart TV, WiFi (No Fridge)'}</td>
                </tr>
                <tr className="hover:bg-sand-50/30 transition-colors">
                  <td className="py-4 px-4 font-bold text-turquoise-950">{t('rooms.familiar_title')}</td>
                  <td className="py-4 px-4">6 {language === 'es' ? 'Huéspedes' : 'Guests'}</td>
                  <td className="py-4 px-4">{language === 'es' ? '1 Cama Doble + 4 Sencillas' : '1 Double + 4 Single Beds'}</td>
                  <td className="py-4 px-4 text-emerald-600 font-bold">✔️ {language === 'es' ? 'Sí' : 'Yes'}</td>
                  <td className="py-4 px-4 text-xs">{language === 'es' ? 'Área de Estar, Baño Doble, A/C, Máximo Espacio' : 'Sitting Lounge, Double Bath, A/C, Maximum Space'}</td>
                </tr>
                <tr className="hover:bg-sand-50/30 transition-colors">
                  <td className="py-4 px-4 font-bold text-turquoise-950">{t('rooms.camping_title')}</td>
                  <td className="py-4 px-4">{language === 'es' ? '1 a 2 Huéspedes' : '1 to 2 Guests'}</td>
                  <td className="py-4 px-4">{language === 'es' ? '1 Colchón Doble (Sábanas)' : '1 Double Mattress (Linens)'}</td>
                  <td className="py-4 px-4 text-rose-500 font-bold">❌ {language === 'es' ? 'No' : 'No'}</td>
                  <td className="py-4 px-4 text-xs">{language === 'es' ? 'Bajo Sombra, Baños compartidos, Áreas del Lodge (Sin ventilador)' : 'Pitched Under Shade, Shared Bathrooms, Lodge Areas (No fan)'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Lightbox Modal */}
        {activeImage && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-turquoise-950/80 backdrop-blur-md p-4 animate-fade-in cursor-pointer"
            onClick={() => setActiveImage(null)}
          >
            <button 
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors focus:outline-none cursor-pointer"
              onClick={() => setActiveImage(null)}
            >
              <X className="h-6 w-6" />
            </button>
            <div 
              className="relative max-w-4xl max-h-[85vh] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/40 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={activeImage} 
                alt="Room detail high-res view" 
                className="max-w-full max-h-[85vh] object-contain rounded-2xl"
              />
              <div className="absolute bottom-4 left-4 text-white/80 text-xs font-semibold bg-turquoise-950/70 px-3 py-1.5 rounded-lg backdrop-blur-sm pointer-events-none">
                {language === 'es' ? 'Presiona fuera de la imagen o la X para cerrar' : 'Click outside or X to close'}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default EstadiasHub;
