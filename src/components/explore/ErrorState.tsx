import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'Failed to load destinations. Please check your connection and try again.',
  onRetry,
}) => {
  return (
    <div className="bg-red-50/70 border border-red-200 rounded-2xl p-8 sm:p-12 text-center max-w-lg mx-auto my-8">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">Unable to Load Destinations</h3>
      <p className="text-sm text-slate-600 leading-relaxed mb-6">{message}</p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 active:scale-98 text-white font-semibold text-sm transition shadow-sm"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Try Again</span>
      </button>
    </div>
  );
};

