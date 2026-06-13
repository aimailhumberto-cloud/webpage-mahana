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

export const LandingPage: React.FC = () => {
  return (
    <div className="animate-fade-in">
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

