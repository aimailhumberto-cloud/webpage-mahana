import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Check, Users, ShieldAlert, Waves, PawPrint, BedDouble, ArrowRight, Table, X, ZoomIn, Sparkles, Wind, Bath, Tv, Wifi } from 'lucide-react';
import { SEO } from '../components/SEO';

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
      badge: 'Cozy Boutique',
      price: '$49.50',
      specs: language === 'es'
        ? [
            { icon: <Users className="h-4 w-4 text-turquoise-700" />, label: '2 a 3 Huéspedes' },
            { icon: <BedDouble className="h-4 w-4 text-turquoise-700" />, label: '1 Cama Doble + 1 Cama Sencilla' },
            { icon: <Waves className="h-4 w-4 text-turquoise-700" />, label: 'Vista a la Piscina' },
            { icon: <PawPrint className="h-4 w-4 text-emerald-600" />, label: 'Pet-Friendly' }
          ]
        : [
            { icon: <Users className="h-4 w-4 text-turquoise-700" />, label: '2 to 3 Guests' },
            { icon: <BedDouble className="h-4 w-4 text-turquoise-700" />, label: '1 Double Bed + 1 Single Bed' },
            { icon: <Waves className="h-4 w-4 text-turquoise-700" />, label: 'Pool View' },
            { icon: <PawPrint className="h-4 w-4 text-emerald-600" />, label: 'Pet-Friendly' }
          ]
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
      badge: 'Popular Choice',
      price: '$49.50',
      specs: language === 'es'
        ? [
            { icon: <Users className="h-4 w-4 text-turquoise-700" />, label: 'Hasta 4 Huéspedes' },
            { icon: <BedDouble className="h-4 w-4 text-turquoise-700" />, label: '2 Camas Dobles' },
            { icon: <Wind className="h-4 w-4 text-turquoise-700" />, label: 'Aire Acondicionado (A/C)' },
            { icon: <Sparkles className="h-4 w-4 text-turquoise-700" />, label: 'Terracita con Hamaca' },
            { icon: <PawPrint className="h-4 w-4 text-emerald-600" />, label: 'Pet-Friendly' }
          ]
        : [
            { icon: <Users className="h-4 w-4 text-turquoise-700" />, label: 'Up to 4 Guests' },
            { icon: <BedDouble className="h-4 w-4 text-turquoise-700" />, label: '2 Double Beds' },
            { icon: <Wind className="h-4 w-4 text-turquoise-700" />, label: 'Air Conditioning (A/C)' },
            { icon: <Sparkles className="h-4 w-4 text-turquoise-700" />, label: 'Terrace with Hammock' },
            { icon: <PawPrint className="h-4 w-4 text-emerald-600" />, label: 'Pet-Friendly' }
          ]
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
      badge: 'Spacious Suite',
      price: '$49.50',
      specs: language === 'es'
        ? [
            { icon: <Users className="h-4 w-4 text-turquoise-700" />, label: 'Hasta 6 Huéspedes' },
            { icon: <BedDouble className="h-4 w-4 text-turquoise-700" />, label: '1 Cama Doble + 4 Camas Sencillas' },
            { icon: <Wind className="h-4 w-4 text-turquoise-700" />, label: 'Aire Acondicionado (A/C)' },
            { icon: <Bath className="h-4 w-4 text-turquoise-700" />, label: 'Baño de Doble Servicio' },
            { icon: <PawPrint className="h-4 w-4 text-emerald-600" />, label: 'Pet-Friendly' }
          ]
        : [
            { icon: <Users className="h-4 w-4 text-turquoise-700" />, label: 'Up to 6 Guests' },
            { icon: <BedDouble className="h-4 w-4 text-turquoise-700" />, label: '1 Double Bed + 4 Single Beds' },
            { icon: <Wind className="h-4 w-4 text-turquoise-700" />, label: 'Air Conditioning (A/C)' },
            { icon: <Bath className="h-4 w-4 text-turquoise-700" />, label: 'Double Vanity Bathroom' },
            { icon: <PawPrint className="h-4 w-4 text-emerald-600" />, label: 'Pet-Friendly' }
          ]
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
      badge: 'Glamping Confort',
      price: '$45',
      specs: language === 'es'
        ? [
            { icon: <Users className="h-4 w-4 text-turquoise-700" />, label: '1 a 2 Huéspedes' },
            { icon: <BedDouble className="h-4 w-4 text-turquoise-700" />, label: '1 Colchón Doble Confort' },
            { icon: <Sparkles className="h-4 w-4 text-turquoise-700" />, label: 'Tienda Bajo Sombra' },
            { icon: <Bath className="h-4 w-4 text-turquoise-700" />, label: 'Baños Compartidos de Lujo' }
          ]
        : [
            { icon: <Users className="h-4 w-4 text-turquoise-700" />, label: '1 to 2 Guests' },
            { icon: <BedDouble className="h-4 w-4 text-turquoise-700" />, label: '1 Colchón Doble Confort' },
            { icon: <Sparkles className="h-4 w-4 text-turquoise-700" />, label: 'Pitched Under Shade' },
            { icon: <Bath className="h-4 w-4 text-turquoise-700" />, label: 'Luxury Shared Baths' }
          ]
    }
  ];

  const galleryImages = [
    { src: '/images/suite-deluxe-teak-terrace.jpg', titleEs: 'Suite Balcón y Terraza Teca', titleEn: 'Deluxe Suite with Teak Terrace' },
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
    <>
      <div className="band-full-bleed bg-mahana-light min-h-[90vh] pb-24 font-sans">
      <SEO 
        titleEs="Habitaciones y Estadías — Casa Mahana Lodge"
        titleEn="Rooms & Lodging — Casa Mahana Lodge"
        descriptionEs="Descubre nuestras acogedoras habitaciones en Chame. Contamos con habitaciones Estándar, Dobles, Familiares y opciones de Glamping con pensión completa y acceso a piscinas."
        descriptionEn="Discover our cozy rooms in Chame. We offer Standard, Double, Family rooms and Glamping options with full board and pool access."
        image="/images/room-doble.jpg"
        path="/estadias"
      />

      {/* Hero Header Section */}
      <section className="band-full-bleed pt-12 pb-14 lg:pt-16 lg:pb-20 bg-gradient-to-b from-sand-100/70 via-mahana-light to-transparent">
        <div className="container-fluid">
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <h1 className="text-xs sm:text-sm uppercase tracking-widest text-turquoise-700 font-extrabold flex items-center justify-center space-x-2">
              <Sparkles className="h-4 w-4 text-turquoise-700" />
              <span>{t('rooms.title')}</span>
            </h1>
            <p className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-turquoise-950 tracking-tight leading-[1.12]">
              {t('rooms.subtitle')}
            </p>
            <div className="h-1.5 w-28 bg-turquoise-700 mx-auto rounded-full" />
          </div>
        </div>
      </section>

      {/* 4 Alternating Horizontal Split Suite Showcases */}
      <section className="band-full-bleed py-8">
        <div className="container-fluid space-y-12 lg:space-y-16">
          {roomsList.map((room, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div 
                key={room.id}
                className="bg-white rounded-[32px] overflow-hidden border border-sand-200/90 shadow-glass hover:shadow-premium transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 items-stretch"
              >
                {/* 58% Panoramic Room Imagery Column */}
                <div className={`relative min-h-[380px] sm:min-h-[440px] lg:min-h-[520px] w-full overflow-hidden lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <img 
                    src={room.img} 
                    alt={t(room.titleKey)} 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" 
                    loading="lazy" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-turquoise-950/70 via-transparent to-black/20" />

                  {/* Top Badges */}
                  <div className="absolute top-5 left-5 flex items-center space-x-2 z-10">
                    <span className="px-3.5 py-1.5 bg-turquoise-900/90 backdrop-blur-md text-sand-100 text-xs font-bold uppercase tracking-wider rounded-xl border border-turquoise-700/30 shadow-md">
                      {room.badge}
                    </span>
                  </div>

                  {/* Pet Friendly Badge */}
                  <div className="absolute top-5 right-5 z-10">
                    <span className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 border backdrop-blur-md shadow-md ${
                      room.pets 
                        ? 'bg-emerald-950/90 text-emerald-100 border-emerald-500/30' 
                        : 'bg-rose-950/90 text-rose-100 border-rose-500/30'
                    }`}>
                      <PawPrint className="h-3.5 w-3.5" />
                      <span>{room.pets ? (language === 'es' ? 'Pet Friendly' : 'Pet-Friendly') : (language === 'es' ? 'No Mascotas' : 'No Pets')}</span>
                    </span>
                  </div>

                  {/* High-Impact Starting Rate Pill */}
                  <div className="absolute bottom-5 right-5 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-xl border border-sand-200 flex items-baseline space-x-1.5 z-10">
                    <span className="text-[11px] text-turquoise-950/60 font-extrabold uppercase shrink-0">
                      {language === 'es' ? 'desde' : 'from'}
                    </span>
                    <span className="text-3xl font-black text-turquoise-900 tracking-tight">{room.price}</span>
                    <span className="text-xs text-turquoise-950/70 font-semibold"> / {t('common.nights')}</span>
                  </div>

                  {/* Quick Zoom Trigger */}
                  <button
                    onClick={() => setActiveImage(room.img)}
                    className="absolute bottom-5 left-5 p-3 bg-white/90 hover:bg-white text-turquoise-950 rounded-2xl shadow-lg backdrop-blur-sm transition-all hover:scale-105 z-10 cursor-pointer"
                    aria-label="View room photo high-res"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                </div>

                {/* 42% Editorial Room Breakdown Column */}
                <div className={`p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 lg:col-span-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center space-x-2">
                        <span className="h-2 w-2 rounded-full bg-turquoise-600" />
                        <span className="text-xs font-extrabold uppercase tracking-widest text-turquoise-700">
                          {language === 'es' ? 'Alojamiento Boutique' : 'Boutique Accommodation'}
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-turquoise-950 tracking-tight leading-snug">
                        {t(room.titleKey)}
                      </h2>
                    </div>

                    <p className="text-sm sm:text-base text-mahana-dark/75 leading-relaxed">
                      {t(room.descKey)}
                    </p>

                    {/* Rich Specs Chips */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      {room.specs.map((spec, i) => (
                        <div key={i} className="flex items-center space-x-2.5 p-2.5 bg-sand-50/80 rounded-xl border border-sand-200/60 text-xs font-semibold text-turquoise-950">
                          <span className="p-1 bg-white rounded-lg shadow-2xs shrink-0">
                            {spec.icon}
                          </span>
                          <span className="truncate">{spec.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Detailed Amenities Block */}
                    <div className="bg-sand-50/50 p-4 rounded-2xl border border-sand-200/60 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="h-3.5 w-3.5 text-turquoise-700" />
                        <p className="text-xs uppercase tracking-wider font-extrabold text-turquoise-950">
                          {language === 'es' ? 'Comodidades & Servicios:' : 'Amenities & Services:'}
                        </p>
                      </div>
                      <p className="text-xs text-mahana-dark/75 font-medium leading-relaxed">
                        {t(room.amenitiesKey)}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Price Footer */}
                  <div className="pt-4 border-t border-sand-200/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-mahana-dark/60 font-bold block">
                        {language === 'es' ? 'Tarifas sugeridas desde' : 'Suggested rates from'}
                      </span>
                      <span className="text-2xl font-black text-turquoise-950 tracking-tight">
                        {room.price}
                        <span className="text-xs font-normal text-mahana-dark/60"> / {t('common.nights')}</span>
                      </span>
                    </div>

                    <button 
                      onClick={() => handleBookRoom(room.planCode)}
                      className="w-full sm:w-auto px-6 py-3.5 bg-turquoise-700 hover:bg-turquoise-900 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-md group shrink-0 cursor-pointer btn-press ease-spring"
                    >
                      <span>{language === 'es' ? 'Reservar Habitación' : 'Book Room'}</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* Room Details & Interior Gallery Section */}
      <section className="band-full-bleed py-16">
        <div className="container-fluid space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-turquoise-950 tracking-tight">
              {language === 'es' ? 'Galería de Detalles & Interiores' : 'Interior Details & Rooms Gallery'}
            </h2>
            <p className="text-sm sm:text-base text-mahana-dark/70 leading-relaxed font-medium">
              {language === 'es' 
                ? 'Conoce la calidez, limpieza y distribución de nuestras habitaciones reales y baños del lodge.' 
                : 'Get a closer look at the warmth, cleanliness, and layout of our actual rooms and lodge bathrooms.'}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {galleryImages.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveImage(img.src)}
                className="group relative h-48 sm:h-60 rounded-2xl overflow-hidden border border-sand-200 shadow-glass cursor-pointer hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300 bg-white"
              >
                <img 
                  src={img.src} 
                  alt={language === 'es' ? img.titleEs : img.titleEn} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
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
      </section>

      {/* Fluid Edge-to-Edge Room Specs Comparison Table */}
      <section className="band-full-bleed py-12">
        <div className="container-fluid space-y-6">
          <div className="bg-white rounded-[32px] border border-sand-200 shadow-glass overflow-hidden p-6 sm:p-10 space-y-6">
            <div className="flex items-center space-x-3">
              <Table className="h-6 w-6 text-turquoise-700" />
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-turquoise-950">{t('rooms.comparison_title')}</h2>
            </div>

            <div className="overflow-x-auto w-full scrollbar-thin">
              <table className="w-full border-collapse text-left text-sm text-mahana-dark min-w-[700px]">
                <thead>
                  <tr className="border-b border-sand-200 text-xs uppercase tracking-wider font-extrabold text-turquoise-900 bg-sand-50/70">
                    <th className="py-4 px-4 sm:px-6">{t('rooms.headers.category')}</th>
                    <th className="py-4 px-4 sm:px-6">{t('rooms.headers.capacity')}</th>
                    <th className="py-4 px-4 sm:px-6">{t('rooms.headers.beds')}</th>
                    <th className="py-4 px-4 sm:px-6">{t('rooms.headers.pets')}</th>
                    <th className="py-4 px-4 sm:px-6">{t('rooms.headers.features')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-100 font-medium">
                  <tr className="hover:bg-sand-50/40 transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-bold text-turquoise-950">{t('rooms.estandar_title')}</td>
                    <td className="py-4 px-4 sm:px-6">{language === 'es' ? '2 a 3 Huéspedes' : '2 to 3 Guests'}</td>
                    <td className="py-4 px-4 sm:px-6">{language === 'es' ? '1 Cama Doble + 1 Sencilla' : '1 Double + 1 Single'}</td>
                    <td className="py-4 px-4 sm:px-6 text-emerald-600 font-bold">✔️ {language === 'es' ? 'Sí' : 'Yes'}</td>
                    <td className="py-4 px-4 sm:px-6 text-xs text-mahana-dark/75 leading-relaxed">{language === 'es' ? 'Ventanas de brisa, Agua caliente, Smart TV con Netflix, WiFi' : 'Breezy Windows, Hot Water, Smart TV with Netflix, WiFi'}</td>
                  </tr>
                  <tr className="hover:bg-sand-50/40 transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-bold text-turquoise-950">{t('rooms.doble_title')}</td>
                    <td className="py-4 px-4 sm:px-6">4 {language === 'es' ? 'Huéspedes' : 'Guests'}</td>
                    <td className="py-4 px-4 sm:px-6">{language === 'es' ? '2 Camas Dobles' : '2 Double Beds'}</td>
                    <td className="py-4 px-4 sm:px-6 text-emerald-600 font-bold">✔️ {language === 'es' ? 'Sí' : 'Yes'}</td>
                    <td className="py-4 px-4 sm:px-6 text-xs text-mahana-dark/75 leading-relaxed">{language === 'es' ? 'Terracita con Hamaca, A/C, Smart TV, WiFi (Sin Nevera)' : 'Terrace with Hammock, A/C, Smart TV, WiFi (No Fridge)'}</td>
                  </tr>
                  <tr className="hover:bg-sand-50/40 transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-bold text-turquoise-950">{t('rooms.familiar_title')}</td>
                    <td className="py-4 px-4 sm:px-6">6 {language === 'es' ? 'Huéspedes' : 'Guests'}</td>
                    <td className="py-4 px-4 sm:px-6">{language === 'es' ? '1 Cama Doble + 4 Sencillas' : '1 Double + 4 Single Beds'}</td>
                    <td className="py-4 px-4 sm:px-6 text-emerald-600 font-bold">✔️ {language === 'es' ? 'Sí' : 'Yes'}</td>
                    <td className="py-4 px-4 sm:px-6 text-xs text-mahana-dark/75 leading-relaxed">{language === 'es' ? 'Área de Estar, Baño Doble, A/C, Máximo Espacio' : 'Sitting Lounge, Double Bath, A/C, Maximum Space'}</td>
                  </tr>
                  <tr className="hover:bg-sand-50/40 transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-bold text-turquoise-950">{t('rooms.camping_title')}</td>
                    <td className="py-4 px-4 sm:px-6">{language === 'es' ? '1 a 2 Huéspedes' : '1 to 2 Guests'}</td>
                    <td className="py-4 px-4 sm:px-6">{language === 'es' ? '1 Colchón Doble Confort' : '1 Double Mattress Comfort'}</td>
                    <td className="py-4 px-4 sm:px-6 text-rose-500 font-bold">❌ {language === 'es' ? 'No' : 'No'}</td>
                    <td className="py-4 px-4 sm:px-6 text-xs text-mahana-dark/75 leading-relaxed">{language === 'es' ? 'Bajo Sombra, Baños compartidos, Áreas del Lodge (Sin ventilador)' : 'Pitched Under Shade, Shared Bathrooms, Lodge Areas (No fan)'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-50 z-[70] flex items-center justify-center bg-turquoise-950/85 backdrop-blur-md p-4 animate-fade-in cursor-pointer"
          style={{ zIndex: 70 }}
          onClick={() => setActiveImage(null)}
        >
          <div 
            className="relative max-w-5xl max-h-[85vh] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/40 flex items-center justify-center cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 z-20 p-3 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors focus:outline-none cursor-pointer border border-white/20 backdrop-blur-md shadow-lg"
              onClick={() => setActiveImage(null)}
              aria-label="Close image"
            >
              <X className="h-6 w-6" />
            </button>
            <img 
              src={activeImage} 
              alt="Room detail high-res view" 
              className="max-w-full max-h-[85vh] object-contain rounded-2xl"
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 text-white/80 text-xs font-semibold bg-turquoise-950/70 px-3 py-1.5 rounded-lg backdrop-blur-sm pointer-events-none">
              {language === 'es' ? 'Presiona fuera de la imagen o la X para cerrar' : 'Click outside or X to close'}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EstadiasHub;
