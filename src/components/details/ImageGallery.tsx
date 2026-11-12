import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  destinationName: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, destinationName }) => {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const isOpen = activeLightboxIndex !== null;

  const handleNext = useCallback(() => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) => (prev! + 1) % images.length);
    }
  }, [activeLightboxIndex, images.length]);

  const handlePrev = useCallback(() => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) => (prev! - 1 + images.length) % images.length);
    }
  }, [activeLightboxIndex, images.length]);

  const handleClose = useCallback(() => {
    setActiveLightboxIndex(null);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose, handleNext, handlePrev]);

  return (
    <div className="relative">
      {/* 3-Image Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 rounded-3xl overflow-hidden shadow-sm">
        {/* Main Large Image (2 cols on md+) */}
        <div
          onClick={() => setActiveLightboxIndex(0)}
          className="relative md:col-span-2 aspect-4/3 md:aspect-16/10 overflow-hidden bg-slate-100 cursor-pointer group"
        >
          <img
            src={images[0]}
            alt={`${destinationName} - Featured View 1`}
            className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-slate-950/20 transition-colors" />
          <div className="absolute bottom-4 right-4 bg-slate-900/75 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition">
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Click to expand</span>
          </div>
        </div>

        {/* 2 Stacked Secondary Images */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-3 sm:gap-4">
          {images.slice(1, 3).map((img, idx) => (
            <div
              key={idx}
              onClick={() => setActiveLightboxIndex(idx + 1)}
              className="relative aspect-4/3 md:aspect-16/10 overflow-hidden bg-slate-100 cursor-pointer group rounded-2xl md:rounded-none"
            >
              <img
                src={img}
                alt={`${destinationName} - View ${idx + 2}`}
                className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-slate-950/20 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Maximize2 className="w-3 h-3" />
                  <span>View</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 sm:p-6 animate-fadeIn">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition focus:outline-none"
            aria-label="Close image gallery modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 sm:left-8 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 sm:right-8 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Active Image Container */}
          <div className="relative max-w-5xl max-h-[85vh] flex flex-col items-center">
            <img
              src={images[activeLightboxIndex!]}
              alt={`${destinationName} - Photo ${activeLightboxIndex! + 1}`}
              className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
            />
            {/* Caption & Counter */}
            <div className="mt-4 flex items-center justify-between w-full text-xs sm:text-sm text-slate-300 px-2">
              <span className="font-medium">
                {destinationName} — Photo {activeLightboxIndex! + 1} of {images.length}
              </span>
              <span className="text-slate-400">Use arrow keys or buttons to navigate</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

