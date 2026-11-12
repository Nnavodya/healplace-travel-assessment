import React from 'react';
import { ArrowUpDown, Filter } from 'lucide-react';
import { FilterState } from '../../types';

interface ExploreToolbarProps {
  totalCount: number;
  filteredCount: number;
  sortBy: FilterState['sortBy'];
  onSortChange: (value: FilterState['sortBy']) => void;
  onOpenMobileFilters: () => void;
  hasActiveFilters: boolean;
}

export const ExploreToolbar: React.FC<ExploreToolbarProps> = ({
  totalCount,
  filteredCount,
  sortBy,
  onSortChange,
  onOpenMobileFilters,
  hasActiveFilters,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-4 mb-6 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
      {/* Result Count and Context */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-slate-800">
          Showing <span className="text-teal-700">{filteredCount}</span> of {totalCount} destinations
        </span>
        {hasActiveFilters && (
          <span className="inline-flex items-center text-[11px] font-semibold bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full border border-teal-200">
            Filtered
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 justify-between sm:justify-end">
        {/* Mobile Filter Button */}
        <button
          type="button"
          onClick={onOpenMobileFilters}
          className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition border border-slate-200"
        >
          <Filter className="w-3.5 h-3.5 text-teal-600" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
          )}
        </button>

        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-500 whitespace-nowrap hidden sm:flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span>Sort by:</span>
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as FilterState['sortBy'])}
            aria-label="Sort destinations"
            className="py-2 pl-3 pr-8 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition cursor-pointer"
          >
            <option value="recommended">Recommended</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Rating: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
          </select>
        </div>
      </div>
    </div>
  );
};

