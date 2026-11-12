import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trees, Landmark, Waves, ShieldCheck, ArrowRight, HeartHandshake } from 'lucide-react';

export const WhySriLankaSection: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Trees,
      title: 'Misty Central Highlands',
      category: 'Nature & Adventure',
      description:
        'Climb through cloud-kissed emerald tea valleys, witness the historic Nine Arch Bridge, and trek scenic peaks in Ella and Nuwara Eliya.',
      accent: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
    {
      icon: Landmark,
      title: 'Ancient UNESCO Kingdoms',
      category: 'Culture & Antiquity',
      description:
        'Ascend the 5th-century palace in the sky at Sigiriya Lion Rock and walk amongst millennium-old stupas and royal irrigation lakes.',
      accent: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    {
      icon: Waves,
      title: 'Golden Indian Ocean Coastline',
      category: 'Beaches & Ocean Life',
      description:
        'Relax on palm-lined sands at Mirissa, encounter the world’s largest mammals on ethical whale safaris, and catch tropical surf breaks.',
      accent: 'text-sky-600 bg-sky-50 border-sky-100',
    },
    {
      icon: ShieldCheck,
      title: 'Living Colonial Heritage',
      category: 'History & Architecture',
      description:
        'Stroll inside the centuries-old ocean ramparts of Galle Fort, discovering 17th-century Dutch colonial architecture and chic cafes.',
      accent: 'text-purple-600 bg-purple-50 border-purple-100',
    },
  ];

  return (
    <section id="why-sri-lanka" className="py-16 sm:py-24 bg-white border-y border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold uppercase tracking-wider mb-4">
            <HeartHandshake className="w-3.5 h-3.5 text-teal-600" />
            <span>Island of Endless Wonders</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Explore Sri Lanka with LankaScape?
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Ranked among the world’s greatest travel destinations, Sri Lanka packs incredible geographic
            diversity into an intimate, warm-hearted tropical island.
          </p>
        </div>

        {/* 4 Feature Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-teal-300 hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-5 ${item.accent}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Travel Banner CTA */}
        <div className="rounded-3xl bg-gradient-to-r from-teal-800 to-slate-900 p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-300 block mb-2">
              Ready for Your Island Adventure?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4 text-white">
              Plan Your Dream Sri Lankan Journey Today
            </h3>
            <p className="text-sm sm:text-base text-slate-300 mb-8 leading-relaxed">
              Find the perfect combination of mountain heights, ancient mysteries, and sunny beach escapes.
              Custom itineraries crafted with care and verified local expertise.
            </p>
            <button
              onClick={() => navigate('/explore')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-teal-500 hover:bg-teal-400 active:scale-98 text-slate-950 font-bold text-sm transition shadow-lg shadow-teal-500/25"
            >
              <span>Explore All 4 Destinations</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

