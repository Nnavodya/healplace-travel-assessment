import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Sparkles } from 'lucide-react';
import heroBg from '../../assets/images/destinations/sigiriya/sigiriya-1.jpg';

export const HeroSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchTerm.trim();
    if (query) {
      navigate(`/explore?search=${encodeURIComponent(query)}`);
    } else {
      navigate('/explore');
    }
  };

  const handleQuickTagClick = (tag: string) => {
    navigate(`/explore?search=${encodeURIComponent(tag)}`);
  };

  return (
    <div className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Sigiriya Rock Fortress Sri Lanka"
          className="w-full h-full object-cover object-center filter brightness-[0.45] scale-105 transform animate-fade"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-950/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-200 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-teal-400" />
          <span>The Pearl of the Indian Ocean Awaits</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight sm:leading-tight lg:leading-[1.15] mb-6">
          Discover the Enchanting Wonder of <span className="text-teal-400">Sri Lanka</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-200 font-normal leading-relaxed mb-10">
          From the mist-shrouded peaks of Ella and ancient UNESCO rock fortresses in Sigiriya
          to the golden shores of Mirissa and the cobblestone ramparts of Galle.
        </p>

        {/* Search Bar Form */}
        <div className="max-w-2xl mx-auto bg-white/95 backdrop-blur-md p-2 sm:p-2.5 rounded-2xl shadow-2xl border border-white/20">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-2">
            <div className="relative flex-1 w-full flex items-center pl-3">
              <MapPin className="w-5 h-5 text-teal-600 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Where in Sri Lanka do you want to explore?"
                aria-label="Where in Sri Lanka do you want to explore?"
                className="w-full px-3 py-3 text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 active:scale-98 text-white text-sm font-semibold transition-all shadow-md shadow-teal-600/30"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </form>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-300">
          <span className="text-slate-400 font-medium">Popular Highlights:</span>
          {['Ella', 'Sigiriya', 'Mirissa', 'Galle'].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleQuickTagClick(item)}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 backdrop-blur-xs transition"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

