import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Compass, Menu, X, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setIsMobileMenuOpen(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-md px-1 ${
      isActive ? 'text-teal-600 font-semibold' : 'text-slate-700'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/20 group-hover:bg-teal-700 transition-colors">
              <Compass className="w-6 h-6 animate-spin-slow group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors">
                Lanka<span className="text-teal-600">Scape</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                Travel & Tourism
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/explore" className={navLinkClass}>
              Explore Destinations
            </NavLink>
            <a
              href="/#why-sri-lanka"
              className="text-sm font-medium text-slate-700 hover:text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-md px-1 transition-colors"
            >
              Why Sri Lanka
            </a>
          </nav>

          {/* Desktop Action */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => navigate('/explore')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 active:scale-98 transition shadow-sm shadow-teal-600/30"
            >
              Plan Your Trip
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-teal-600 hover:bg-slate-100 transition focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-lg animate-fadeIn">
          <div className="flex flex-col gap-3">
            <NavLink
              to="/"
              end
              onClick={closeMenu}
              className={({ isActive }) =>
                `px-3 py-2.5 rounded-lg text-base font-medium transition ${
                  isActive ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/explore"
              onClick={closeMenu}
              className={({ isActive }) =>
                `px-3 py-2.5 rounded-lg text-base font-medium transition ${
                  isActive ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`
              }
            >
              Explore Destinations
            </NavLink>
            <a
              href="/#why-sri-lanka"
              onClick={closeMenu}
              className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              Why Sri Lanka
            </a>
            <div className="pt-2">
              <button
                onClick={() => {
                  closeMenu();
                  navigate('/explore');
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 active:scale-98 transition shadow-sm shadow-teal-600/30"
              >
                Plan Your Trip
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

