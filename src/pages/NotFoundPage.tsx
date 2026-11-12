import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-teal-50 border border-teal-200 text-teal-600 flex items-center justify-center mb-6 shadow-sm">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>

        <span className="text-sm font-extrabold text-teal-600 uppercase tracking-widest block mb-2">
          Error 404
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Destination Not Found
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
          The page or travel route you are looking for does not exist, has been relocated, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 active:scale-98 transition shadow-sm shadow-teal-600/30"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/explore"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Explore Destinations</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

