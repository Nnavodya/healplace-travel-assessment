import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Star, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Destination } from '../../types';
import { formatLKR } from '../../utils/format';

interface DestinationCardProps {
  destination: Destination;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = () => {
    navigate(`/destination/${destination.id}`, {
      state: { from: location.pathname + location.search },
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Nature':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Cultural':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Beach':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Heritage':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-teal-50 text-teal-700 border-teal-200';
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`View details for ${destination.name}`}
      onClick={handleNavigate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNavigate();
        }
      }}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
    >
      {/* Image container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
        <img
          src={destination.coverImage}
          alt={destination.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-block text-xs font-bold px-3 py-1 rounded-full border shadow-xs backdrop-blur-md ${getCategoryColor(
              destination.category
            )}`}
          >
            {destination.category}
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 shadow-xs">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>{destination.rating.toFixed(2)}</span>
          <span className="text-slate-400 text-[10px]">({destination.reviewsCount})</span>
        </div>
      </div>

      {/* Details container */}
      <div className="p-5 flex flex-col flex-1">
        {/* Location & Duration */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-teal-600" />
            {destination.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {destination.duration}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-1 mb-1.5">
          {destination.name}
        </h3>

        {/* Tagline */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4 flex-1">
          {destination.tagline}
        </p>

        {/* Divider */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider block">
              Starting from
            </span>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-xl font-extrabold text-teal-700">
                {formatLKR(destination.price)}
              </span>
              {destination.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  {formatLKR(destination.originalPrice)}
                </span>
              )}
              <span className="text-xs text-slate-500">/ person</span>
            </div>
          </div>

          <div className="w-9 h-9 rounded-xl bg-teal-50 group-hover:bg-teal-600 group-hover:text-white text-teal-700 flex items-center justify-center transition-all duration-300">
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

