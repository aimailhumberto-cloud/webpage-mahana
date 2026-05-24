import React from 'react';
import { Hero } from '../components/Hero';
import { ProductsHook } from '../components/ProductsHook';
import { LodgingPackages } from '../components/LodgingPackages';
import { Facilities } from '../components/Facilities';
import { Restaurant } from '../components/Restaurant';
import { LodgeLifeGallery } from '../components/LodgeLifeGallery';
import { Reviews } from '../components/Reviews';

export const LandingPage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <Hero />
      <ProductsHook />
      <LodgingPackages />
      <Facilities />
      <Restaurant />
      <LodgeLifeGallery />
      <Reviews />
    </div>
  );
};
