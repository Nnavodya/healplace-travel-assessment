import React from 'react';
import { CheckCircle2, XCircle, Sparkles, Compass } from 'lucide-react';

interface ActivitiesListProps {
  activities: string[];
  highlights: string[];
  included: string[];
  notIncluded: string[];
}

export const ActivitiesList: React.FC<ActivitiesListProps> = ({
  activities,
  highlights,
  included,
  notIncluded,
}) => {
  return (
    <div className="space-y-8">
      {/* 1. Highlights */}
      <div className="bg-teal-50/60 border border-teal-100 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2 text-teal-800 font-bold text-base sm:text-lg mb-4">
          <Sparkles className="w-5 h-5 text-teal-600" />
          <span>Tour Highlights & Perks</span>
        </div>
        <ul className="space-y-2.5">
          {highlights.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 2. Available Activities */}
      <div>
        <div className="flex items-center gap-2 text-slate-900 font-bold text-lg mb-4">
          <Compass className="w-5 h-5 text-teal-600" />
          <span>Curated Itinerary Activities</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {activities.map((activity, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs"
            >
              <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center shrink-0">
                {idx + 1}
              </div>
              <span className="text-sm font-medium text-slate-800">{activity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Included & Not Included */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
        {/* Included */}
        <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-5">
          <h4 className="text-sm font-bold text-emerald-900 uppercase tracking-wider mb-3">
            What is Included
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            {included.map((inc, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{inc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Not Included */}
        <div className="bg-rose-50/40 border border-rose-100 rounded-2xl p-5">
          <h4 className="text-sm font-bold text-rose-900 uppercase tracking-wider mb-3">
            Not Included
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            {notIncluded.map((notInc, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{notInc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

