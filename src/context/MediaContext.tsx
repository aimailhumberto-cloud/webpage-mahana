import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AvailableImage {
  src: string;
  name: string;
  category: 'Comunes' | 'Habitaciones' | 'Comida' | 'Surf' | 'Bodas & Eventos';
}

export const AVAILABLE_IMAGES: AvailableImage[] = [
  { src: '/images/hero-pool-drone.jpg', name: 'Piscina Vista Aérea (Dron)', category: 'Comunes' },
  { src: '/images/hero-pool-deck.jpg', name: 'Deck de Piscina y Camastros', category: 'Comunes' },
  { src: '/images/hero-pool-aerial.jpg', name: 'Piscina Aérea (Zoom)', category: 'Comunes' },
  { src: '/images/hero-pool-drone-aerial.jpg', name: 'Piscina Dron Vista Completa', category: 'Comunes' },
  { src: '/images/lodge-grounds.jpg', name: 'Jardines y Senderos del Lodge', category: 'Comunes' },
  { src: '/images/pet-friendly.jpg', name: 'Mascota en el Jardín', category: 'Comunes' },
  { src: '/images/mapa-casa-mahana.jpg', name: 'Mapa del Lodge', category: 'Comunes' },
  { src: '/images/exp-daypass.jpg', name: 'Pasadía Pérgola y Piscina', category: 'Comunes' },
  
  { src: '/images/room-doble.jpg', name: 'Habitación Doble', category: 'Habitaciones' },
  { src: '/images/room-estandar.jpg', name: 'Habitación Estándar', category: 'Habitaciones' },
  { src: '/images/room-familiar.jpg', name: 'Habitación Familiar', category: 'Habitaciones' },
  { src: '/images/room-camping-green.png', name: 'Camping Comfort Bajo Sombra', category: 'Habitaciones' },
  { src: '/images/mahana-experience-promo.png', name: 'Promo Mahana Experience', category: 'Habitaciones' },
  { src: '/images/all-inclusive-pool-hero-v2.jpg', name: 'Piscina Cóctel Camastros Stays', category: 'Habitaciones' },
  { src: '/images/room-gallery-redwall.png', name: 'Galería - Habitación Pared Roja', category: 'Habitaciones' },
  { src: '/images/room-gallery-woodendoor.jpg', name: 'Galería - Distribución Doble/Familiar', category: 'Habitaciones' },
  { src: '/images/room-gallery-redbeds.jpg', name: 'Galería - Camas con Sábanas Rojas', category: 'Habitaciones' },
  { src: '/images/room-gallery-bathroom.jpg', name: 'Galería - Baño del Lodge', category: 'Habitaciones' },
  { src: '/images/room-gallery-singlebeds.jpg', name: 'Galería - Habitación de Camas Sencillas', category: 'Habitaciones' },
  
  { src: '/images/food-pizza.jpg', name: 'Pizza Antigua', category: 'Comida' },
  { src: '/images/food-picada.jpg', name: 'Picada Familiar Mar y Tierra', category: 'Comida' },
  { src: '/images/food-cocktail.jpg', name: 'Cócteles Tropicales', category: 'Comida' },
  { src: '/images/restaurant-menu-sheet.jpg', name: 'Carta del Restaurante', category: 'Comida' },
  { src: '/images/food-pizza-oven.jpg', name: 'Pizza en Horno de Leña', category: 'Comida' },
  { src: '/images/food-pizza-stretch.jpg', name: 'Pizza Queso Estirado', category: 'Comida' },
  { src: '/images/food-fish-patacones.jpg', name: 'Pescado Entero con Patacones', category: 'Comida' },
  { src: '/images/food-bacon-burger.jpg', name: 'Hamburguesa con Bacon y Papas', category: 'Comida' },
  
  { src: '/images/ans-surf-underwater.png', name: 'Surf Toma Subacuática', category: 'Surf' },
  { src: '/images/ans-surf-team.png', name: 'Equipo Surf Shack en Playa', category: 'Surf' },
  { src: '/images/surf-shack-swing.jpg', name: 'Columpio de Playa Caracol', category: 'Surf' },
  { src: '/images/surf-shack-beach-club-drone.jpg', name: 'Beach Club Dron (Telas de Sombra)', category: 'Surf' },
  
  { src: '/images/wedding-couple.jpg', name: 'Boda en el Jardín (Pareja)', category: 'Bodas & Eventos' },
  { src: '/images/wedding-setup.jpg', name: 'Boda Montaje y Altar', category: 'Bodas & Eventos' },
  { src: '/images/wedding-party.jpg', name: 'Evento Fiesta Junto a Piscina', category: 'Bodas & Eventos' }
];

export interface MediaRegistry {
  // Hero slider
  hero_1: string;
  hero_2: string;
  hero_3: string;
  
  // Experiencias (ProductsHook)
  exp_stays: string;
  exp_daypass: string;
  exp_restaurant: string;
  exp_surf: string;
  
  // Instalaciones (Facilities)
  fac_pool: string;
  fac_beach: string;
  fac_relax: string;
  
  // Restaurante
  rest_pizza: string;
  rest_seafood: string;
  rest_burger: string;
  
  // Galería
  gal_1: string;
  gal_2: string;
  gal_3: string;
  gal_4: string;
  gal_5: string;
  gal_6: string;
}

const DEFAULT_MEDIA: MediaRegistry = {
  hero_1: '/images/hero-pool-drone.jpg',
  hero_2: '/images/hero-pool-deck.jpg',
  hero_3: '/images/lodge-grounds.jpg',
  
  exp_stays: '/images/room-doble.jpg',
  exp_daypass: '/images/exp-daypass.jpg',
  exp_restaurant: '/images/food-pizza-oven.jpg',
  exp_surf: '/images/surf-shack-swing.jpg',
  
  fac_pool: '/images/hero-pool-deck.jpg',
  fac_beach: '/images/surf-shack-beach-club-drone.jpg',
  fac_relax: '/images/lodge-grounds.jpg',
  
  rest_pizza: '/images/food-pizza-stretch.jpg',
  rest_seafood: '/images/food-fish-patacones.jpg',
  rest_burger: '/images/food-bacon-burger.jpg',
  
  gal_1: '/images/lodge-grounds.jpg',
  gal_2: '/images/hero-pool-deck.jpg',
  gal_3: '/images/pet-friendly.jpg',
  gal_4: '/images/food-pizza.jpg',
  gal_5: '/images/room-doble.jpg',
  gal_6: '/images/food-cocktail.jpg'
};

interface MediaContextType {
  media: MediaRegistry;
  updateSlot: (slot: keyof MediaRegistry, src: string) => void;
  resetAll: () => void;
  getAvailableByCategory: (category: AvailableImage['category']) => AvailableImage[];
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [media, setMedia] = useState<MediaRegistry>(() => {
    try {
      const saved = localStorage.getItem('mahana_media_registry');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Upgrade legacy default paths if still present to match the latest design assets
        if (parsed.exp_daypass === '/images/food-cocktail.jpg') parsed.exp_daypass = '/images/exp-daypass.jpg';
        if (parsed.exp_restaurant === '/images/food-pizza.jpg') parsed.exp_restaurant = '/images/food-pizza-oven.jpg';
        if (parsed.exp_surf === '/images/ans-surf-team.png') parsed.exp_surf = '/images/surf-shack-swing.jpg';
        if (parsed.fac_beach === '/images/ans-surf-underwater.png') parsed.fac_beach = '/images/surf-shack-beach-club-drone.jpg';
        if (parsed.rest_pizza === '/images/food-pizza.jpg') parsed.rest_pizza = '/images/food-pizza-stretch.jpg';
        if (parsed.rest_seafood === '/images/food-picada.jpg') parsed.rest_seafood = '/images/food-fish-patacones.jpg';
        if (parsed.rest_burger === '/images/food-cocktail.jpg') parsed.rest_burger = '/images/food-bacon-burger.jpg';
        return { ...DEFAULT_MEDIA, ...parsed };
      }
    } catch (e) {
      console.error('Failed to parse saved media registry', e);
    }
    return DEFAULT_MEDIA;
  });

  const updateSlot = (slot: keyof MediaRegistry, src: string) => {
    setMedia(prev => {
      const updated = { ...prev, [slot]: src };
      localStorage.setItem('mahana_media_registry', JSON.stringify(updated));
      return updated;
    });
  };

  const resetAll = () => {
    setMedia(DEFAULT_MEDIA);
    localStorage.removeItem('mahana_media_registry');
  };

  const getAvailableByCategory = (category: AvailableImage['category']) => {
    return AVAILABLE_IMAGES.filter(img => img.category === category);
  };

  return (
    <MediaContext.Provider value={{ media, updateSlot, resetAll, getAvailableByCategory }}>
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
};
