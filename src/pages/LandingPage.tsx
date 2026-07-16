import React from 'react';
import { Hero } from '../components/Hero';
import { ReviewTicker } from '../components/ReviewTicker';
import { ProductsHook } from '../components/ProductsHook';
import { LodgingPackages } from '../components/LodgingPackages';
import { Facilities } from '../components/Facilities';
import { Restaurant } from '../components/Restaurant';
import { LodgeLifeGallery } from '../components/LodgeLifeGallery';
import { Reviews } from '../components/Reviews';
import { PromoPopup } from '../components/PromoPopup';
import { WhatsappConcierge } from '../components/WhatsappConcierge';
import { SEO } from '../components/SEO';

export const LandingPage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <SEO 
        titleEs="Casa Mahana — Lodge & Restaurante Gourmet en Chame, Panamá"
        titleEn="Casa Mahana — Boutique Lodge & Gourmet Restaurant in Chame, Panama"
        descriptionEs="Disfruta de una escapada tropical inolvidable en Casa Mahana. Hospedaje acogedor, piscina tropical, restaurante gourmet al horno de leña, surf y tours de aventura en Chame."
        descriptionEn="Enjoy an unforgettable tropical getaway at Casa Mahana. Cozy lodging, tropical pools, wood-fired gourmet restaurant, surfing, and adventure tours in Chame."
        image="/images/hero-pool-drone-aerial.jpg"
        path="/"
      />
      <Hero />
      <ReviewTicker />
      <ProductsHook />
      <LodgingPackages />
      <Facilities />
      <Restaurant />
      <LodgeLifeGallery />
      <Reviews />
      <PromoPopup />
      <WhatsappConcierge />
    </div>
  );
};

