import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Compass, Sparkles } from 'lucide-react';
import { Destination, FilterState } from '../types';
import { fetchDestinations } from '../data/destinations';
import { DestinationCard } from '../components/home/DestinationCard';
import { FilterSidebar } from '../components/explore/FilterSidebar';
import { ExploreToolbar } from '../components/explore/ExploreToolbar';
import { LoadingState } from '../components/explore/LoadingState';
import { EmptyState } from '../components/explore/EmptyState';
import { ErrorState } from '../components/explore/ErrorState';

const INITIAL_FILTERS: FilterState = {
  searchQuery: '',
  category: 'All',
  location: 'All',
  maxPrice: 40000,
  minRating: 0,
  sortBy: 'recommended',
};

export const ExplorePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // State
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Filters State initialized with URL search param if present
  const [filters, setFilters] = useState<FilterState>(() => ({
    ...INITIAL_FILTERS,
    searchQuery: searchParams.get('search') || '',
    category: (searchParams.get('category') as FilterState['category']) || 'All',
  }));

  // Sync state if URL search param changes externally
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    const urlCategory = searchParams.get('category') as FilterState['category'];

    setFilters((prev) => ({
      ...prev,
      searchQuery: urlSearch !== null ? urlSearch : prev.searchQuery,
      category: urlCategory && ['Nature', 'Cultural', 'Beach', 'Heritage'].includes(urlCategory) ? urlCategory : prev.category,
    }));
  }, [searchParams]);

  // Load destinations with mock async helper
  const loadDestinations = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await fetchDestinations(350);
      setDestinations(data);
    } catch {
      setErrorMessage('Could not load destinations. Please check your network and try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDestinations();
  }, [loadDestinations]);

  // Handle single filter change
  const handleFilterChange = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => {
      const next = { ...prev, [key]: value };

      // Keep search and category in URL query params cleanly
      const params: Record<string, string> = {};
      if (next.searchQuery.trim()) params.search = next.searchQuery.trim();
      if (next.category !== 'All') params.category = next.category;
      setSearchParams(params, { replace: true });

      return next;
    });
  };

  // Reset all filters
  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setSearchParams({}, { replace: true });
  };

  // Extract unique locations from data for the dropdown
  const availableLocations = useMemo(() => {
    const locs = destinations.map((d) => d.location);
    return Array.from(new Set(locs));
  }, [destinations]);

  // Combined Filtering and Sorting
  const filteredDestinations = useMemo(() => {
    let result = [...destinations];

    // 1. Live Keyword Search
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.trim().toLowerCase();
      result = result.filter((item) => {
        return (
          item.name.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.tagline.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.activities.some((act) => act.toLowerCase().includes(q))
        );
      });
    }

    // 2. Category Filter
    if (filters.category !== 'All') {
      result = result.filter((item) => item.category === filters.category);
    }

    // 3. Location Filter
    if (filters.location !== 'All') {
      result = result.filter((item) => item.location === filters.location);
    }

    // 4. Max Price Range
    result = result.filter((item) => item.price <= filters.maxPrice);

    // 5. Min Rating Filter
    if (filters.minRating > 0) {
      result = result.filter((item) => item.rating >= filters.minRating);
    }

    // 6. Sorting
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'recommended':
      default:
        // Preserves default curated order
        break;
    }

    return result;
  }, [destinations, filters]);

  // Check if any non-default filter is currently active
  const hasActiveFilters = useMemo(() => {
    return (
      filters.searchQuery.trim() !== '' ||
      filters.category !== 'All' ||
      filters.location !== 'All' ||
      filters.maxPrice < 40000 ||
      filters.minRating > 0
    );
  }, [filters]);

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-600 mb-2">
            <Compass className="w-4 h-4" />
            <span>Sri Lanka Tour Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore Sri Lanka Destinations
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
            Filter by region, travel style, price range, and traveler ratings to discover your ideal island journey.
          </p>
        </div>

        {/* Main Grid: Sidebar Filters (Desktop) + Results Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1 sticky top-24">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
              availableLocations={availableLocations}
              totalResults={filteredDestinations.length}
            />
          </div>

          {/* Mobile Filter Modal/Drawer */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 flex lg:hidden">
              <div
                className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs"
                onClick={() => setIsMobileFilterOpen(false)}
              />
              <div className="relative ml-auto w-full max-w-xs h-full bg-white p-6 shadow-2xl overflow-y-auto z-10 flex flex-col justify-between">
                <FilterSidebar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onReset={handleResetFilters}
                  availableLocations={availableLocations}
                  totalResults={filteredDestinations.length}
                  onCloseMobile={() => setIsMobileFilterOpen(false)}
                />
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="mt-6 w-full py-3 rounded-xl bg-teal-600 text-white font-bold text-sm"
                >
                  Apply Filters ({filteredDestinations.length})
                </button>
              </div>
            </div>
          )}

          {/* Results Column */}
          <div className="lg:col-span-3">
            {/* Toolbar with Count & Sorting */}
            <ExploreToolbar
              totalCount={destinations.length}
              filteredCount={filteredDestinations.length}
              sortBy={filters.sortBy}
              onSortChange={(val) => handleFilterChange('sortBy', val)}
              onOpenMobileFilters={() => setIsMobileFilterOpen(true)}
              hasActiveFilters={hasActiveFilters}
            />

            {/* Content States */}
            {isLoading ? (
              <LoadingState />
            ) : errorMessage ? (
              <ErrorState message={errorMessage} onRetry={loadDestinations} />
            ) : filteredDestinations.length === 0 ? (
              <EmptyState onReset={handleResetFilters} searchQuery={filters.searchQuery} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDestinations.map((destination) => (
                  <DestinationCard key={destination.id} destination={destination} />
                ))}
              </div>
            )}

            {/* Helpful Bottom Footer Note */}
            {!isLoading && !errorMessage && filteredDestinations.length > 0 && (
              <div className="mt-12 text-center border-t border-slate-200/80 pt-8">
                <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  <span>Click any destination card to view detailed itineraries and booking options.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
