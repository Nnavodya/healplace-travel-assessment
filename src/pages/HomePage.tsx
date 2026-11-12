import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedSection } from '../components/home/FeaturedSection';
import { WhySriLankaSection } from '../components/home/WhySriLankaSection';
import { DESTINATIONS } from '../data/destinations';

export const HomePage: React.FC = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Destinations (Ella, Sigiriya, Mirissa, Galle) */}
      <FeaturedSection destinations={DESTINATIONS} />

      {/* Creative Travel Inspiration Section */}
      <WhySriLankaSection />
    </main>
  );
};

