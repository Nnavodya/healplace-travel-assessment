import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, MapPin, Globe, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-500 text-slate-900 flex items-center justify-center font-bold">
                <Compass className="w-5 h-5 text-slate-950" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Lanka<span className="text-teal-400">Scape</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Your premier gateway to exploring the breathtaking beauty of Sri Lanka. From misty central
              highlands and ancient UNESCO fortresses to pristine southern beaches and vibrant heritage towns.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="inline-flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
                <MapPin className="w-3.5 h-3.5 text-teal-400" /> Sri Lanka (GMT +5:30)
              </span>
              <span className="inline-flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
                <Globe className="w-3.5 h-3.5 text-teal-400" /> Year-Round Tropical Climate
              </span>
              <span className="inline-flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" /> Verified Tour Guides
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-teal-400 transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-teal-400 transition-colors">
                  Explore Destinations
                </Link>
              </li>
              <li>
                <a href="/#why-sri-lanka" className="hover:text-teal-400 transition-colors">
                  Why Sri Lanka
                </a>
              </li>
              <li>
                <Link to="/explore?category=Beach" className="hover:text-teal-400 transition-colors">
                  Beach Escapes
                </Link>
              </li>
            </ul>
          </div>

          {/* Featured Destinations */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Key Regions
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/destination/ella-nature-highlands" className="hover:text-teal-400 transition-colors">
                  Ella – Nature & Highlands
                </Link>
              </li>
              <li>
                <Link to="/destination/sigiriya-cultural-fortress" className="hover:text-teal-400 transition-colors">
                  Sigiriya – Cultural Fortress
                </Link>
              </li>
              <li>
                <Link to="/destination/mirissa-beach-paradise" className="hover:text-teal-400 transition-colors">
                  Mirissa – Beach & Marine
                </Link>
              </li>
              <li>
                <Link to="/destination/galle-heritage-fort" className="hover:text-teal-400 transition-colors">
                  Galle – Colonial Heritage
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} LankaScape Travel & Tourism. Technical Assessment Project.</p>
          <p>Built with React, TypeScript, and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
};

