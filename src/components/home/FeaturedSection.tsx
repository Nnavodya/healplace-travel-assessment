import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import { Destination } from '../../types';
import { DestinationCard } from './DestinationCard';

interface FeaturedSectionProps {
  destinations: Destination[];
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({ destinations }) => {
  return (
    <section className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-teal-600 mb-2">
              <Compass className="w-4 h-4" />
              <span>Handcrafted Expeditions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured Sri Lankan Destinations
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl">
              Immerse yourself in our curated collection of Sri Lanka’s most revered destinations,
              complete with authentic local guidance and premium accommodations.
            </p>
          </div>

          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-800 transition group self-start md:self-end"
          >
            <span>View All Destinations</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {destinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </div>
    </section>
  );
};

