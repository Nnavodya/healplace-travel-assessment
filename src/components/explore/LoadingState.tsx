import React from 'react';

export const LoadingState: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs animate-pulse"
        >
          {/* Skeleton Image */}
          <div className="aspect-4/3 w-full bg-slate-200" />
          {/* Skeleton Body */}
          <div className="p-5 space-y-3">
            <div className="flex justify-between">
              <div className="h-3 bg-slate-200 rounded w-1/3" />
              <div className="h-3 bg-slate-200 rounded w-1/4" />
            </div>
            <div className="h-5 bg-slate-200 rounded w-3/4" />
            <div className="h-3 bg-slate-200 rounded w-full" />
            <div className="h-3 bg-slate-200 rounded w-5/6" />
            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
              <div className="h-6 bg-slate-200 rounded w-1/3" />
              <div className="w-9 h-9 bg-slate-200 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

