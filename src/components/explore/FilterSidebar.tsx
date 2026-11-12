import React from 'react';
import { Search, X, RotateCcw, Filter, MapPin, Tag, Banknote, Star } from 'lucide-react';
import { DestinationCategory, FilterState } from '../../types';
import { formatLKR } from '../../utils/format';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onReset: () => void;
  availableLocations: string[];
  totalResults: number;
  onCloseMobile?: () => void;
}

const CATEGORIES: DestinationCategory[] = ['All', 'Nature', 'Cultural', 'Beach', 'Heritage'];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onReset,
  availableLocations,
  totalResults,
  onCloseMobile,
}) => {
  return (
    <aside className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
          <Filter className="w-4 h-4 text-teal-600" />
          <span>Filters</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
            {totalResults} {totalResults === 1 ? 'package' : 'packages'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="text-xs font-semibold text-slate-500 hover:text-teal-600 flex items-center gap-1 transition"
            title="Reset all filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              aria-label="Close filters"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* 1. Live Keyword Search */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Search Keywords
        </label>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange('searchQuery', e.target.value)}
            placeholder="Name, location, activity..."
            className="w-full pl-9 pr-8 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onFilterChange('searchQuery', '')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Category Filter */}
      <div>
        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
          <Tag className="w-3.5 h-3.5 text-teal-600" />
          <span>Category</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => {
            const isSelected = filters.category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onFilterChange('category', cat)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Location Filter */}
      <div>
        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          <MapPin className="w-3.5 h-3.5 text-teal-600" />
          <span>Region / Location</span>
        </label>
        <select
          value={filters.location}
          onChange={(e) => onFilterChange('location', e.target.value)}
          aria-label="Filter destinations by region"
          className="w-full py-2.5 px-3 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition cursor-pointer"
        >
          <option value="All">All Sri Lankan Regions</option>
          {availableLocations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* 4. Price Range Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <Banknote className="w-3.5 h-3.5 text-teal-600" />
            <span>Max Budget</span>
          </label>
          <span className="text-xs font-extrabold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
            {formatLKR(filters.maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min={20000}
          max={40000}
          step={1000}
          value={filters.maxPrice}
          onChange={(e) => onFilterChange('maxPrice', Number(e.target.value))}
          aria-label="Filter destinations by maximum price"
          className="w-full accent-teal-600 cursor-pointer h-2 bg-slate-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
        />
        <div className="flex justify-between text-[11px] text-slate-400 font-semibold mt-1.5">
          <span>Rs. 20,000</span>
          <span>Rs. 30,000</span>
          <span>Rs. 40,000</span>
        </div>
      </div>

      {/* 5. Rating Filter */}
      <div>
        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
          <Star className="w-3.5 h-3.5 text-amber-500" />
          <span>Minimum Rating</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'All', value: 0 },
            { label: '4.8 ★+', value: 4.8 },
            { label: '4.9 ★+', value: 4.9 },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => onFilterChange('minRating', item.value)}
              className={`text-xs font-semibold py-2 px-2 rounded-xl border text-center transition ${
                filters.minRating === item.value
                  ? 'bg-amber-50 border-amber-400 text-amber-800 font-bold shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clear All CTA button */}
      <div className="pt-2">
        <button
          onClick={onReset}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-98 transition flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      </div>
    </aside>
  );
};

