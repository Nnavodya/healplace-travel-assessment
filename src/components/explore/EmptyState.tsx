import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  onReset: () => void;
  searchQuery?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onReset, searchQuery }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-10 sm:p-14 text-center my-6 shadow-xs max-w-xl mx-auto">
      <div className="w-16 h-16 mx-auto rounded-3xl bg-teal-50 border border-teal-100 text-teal-600 flex items-center justify-center mb-5">
        <SearchX className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">No Matching Destinations</h3>
      <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed mb-6">
        {searchQuery ? (
          <>
            No travel packages matched your query <span className="font-semibold text-slate-800">"{searchQuery}"</span> with the selected filter criteria.
          </>
        ) : (
          'No travel packages matched your current filter criteria. Try adjusting your price range, category, or rating filters.'
        )}
      </p>
      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 active:scale-98 text-white font-semibold text-sm transition shadow-sm"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Clear All Filters</span>
      </button>
    </div>
  );
};

