import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Star,
  MapPin,
  Clock,
  Compass,
  ArrowLeft,
  Calendar,
  ShieldCheck,
  Award,
  AlertCircle,
  Share2,
  Check,
} from 'lucide-react';
import { Destination, Booking } from '../types';
import { fetchDestinationById } from '../data/destinations';
import { formatLKR } from '../utils/format';
import { ImageGallery } from '../components/details/ImageGallery';
import { ActivitiesList } from '../components/details/ActivitiesList';
import { BookingModal } from '../components/booking/BookingModal';
import { BookingConfirmationModal } from '../components/booking/BookingConfirmationModal';

export const DestinationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [destination, setDestination] = useState<Destination | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [isLinkCopied, setIsLinkCopied] = useState<boolean>(false);

  const handleBackToExplore = () => {
    // Return to previous explore state (with search/filters) if available, otherwise fallback to /explore
    if (location.state && typeof location.state === 'object' && 'from' in location.state) {
      navigate((location.state as { from: string }).from);
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/explore');
    }
  };

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    if (id) {
      fetchDestinationById(id, 250)
        .then((data) => {
          if (isMounted) {
            setDestination(data);
            setIsLoading(false);
          }
        })
        .catch(() => {
          if (isMounted) {
            setDestination(null);
            setIsLoading(false);
          }
        });
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsLinkCopied(true);
      setTimeout(() => setIsLinkCopied(false), 2000);
    }
  };

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 px-4">
        <div className="w-12 h-12 rounded-full border-4 border-teal-200 border-t-teal-600 animate-spin mb-4" />
        <p className="text-sm font-semibold text-slate-600">Loading destination details...</p>
      </div>
    );
  }

  // 2. Not Found / Invalid ID State
  if (!destination) {
    return (
      <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5">
            <AlertCircle className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-1">
            Destination Not Found
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-3">
            Unknown Travel Package
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            We couldn’t find any Sri Lankan destination matching id: <code className="bg-slate-100 px-2 py-0.5 rounded text-slate-800 font-mono text-xs">{id}</code>. It may have been renamed or relocated.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/explore"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 transition shadow-sm"
            >
              <Compass className="w-4 h-4" />
              <span>Explore All Destinations</span>
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 pb-24 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation & Back to Explore Action */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 flex-wrap">
            <Link to="/" className="hover:text-teal-600 transition">
              Home
            </Link>
            <span>/</span>
            <button
              onClick={handleBackToExplore}
              className="hover:text-teal-600 transition underline-offset-2 hover:underline"
            >
              Destinations
            </button>
            <span>/</span>
            <span className="font-semibold text-slate-800 truncate max-w-xs">{destination.name}</span>
          </nav>

          <button
            type="button"
            onClick={handleBackToExplore}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:text-teal-700 hover:border-teal-300 transition shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            aria-label="Back to Explore Destinations"
          >
            <ArrowLeft className="w-4 h-4 text-teal-600" />
            <span>Back to Explore</span>
          </button>
        </div>

        {/* Header Title & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                {destination.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                {destination.location}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              {destination.name}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              {destination.tagline}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition shadow-xs"
              title="Share destination"
            >
              {isLinkCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-slate-500" />}
              <span>{isLinkCopied ? 'Link Copied!' : 'Share'}</span>
            </button>
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3.5 py-2 rounded-xl text-xs font-bold text-amber-900 shadow-xs">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>{destination.rating.toFixed(2)}</span>
              <span className="text-amber-700 font-normal">({destination.reviewsCount} reviews)</span>
            </div>
          </div>
        </div>

        {/* 1. Image Gallery with Lightbox */}
        <div className="mb-10">
          <ImageGallery images={destination.images} destinationName={destination.name} />
        </div>

        {/* 2. Main Content & Sticky Booking Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left Column: Description, Highlights, Activities */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                About This Destination
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {destination.description}
              </p>

              {/* Quick Perks Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 mt-6 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                  <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Duration: {destination.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Verified English Guide</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                  <Award className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Top Rated Tour</span>
                </div>
              </div>
            </div>

            {/* Activities & Highlights Component */}
            <ActivitiesList
              activities={destination.activities}
              highlights={destination.highlights}
              included={destination.included}
              notIncluded={destination.notIncluded}
            />
          </div>

          {/* Right Column: Sticky Booking Widget Card */}
          <div className="lg:col-span-1 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg">
              {/* Pricing Display */}
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Package Price
                  </span>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-3xl font-extrabold text-teal-700">
                      {formatLKR(destination.price)}
                    </span>
                    {destination.originalPrice && (
                      <span className="text-sm text-slate-400 line-through">
                        {formatLKR(destination.originalPrice)}
                      </span>
                    )}
                    <span className="text-xs text-slate-500 font-medium">/ person</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Instant Confirmation
                </span>
              </div>

              {/* Quick Specs */}
              <div className="space-y-3 py-4 border-y border-slate-100 text-xs text-slate-600 mb-6">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-teal-600" /> Duration
                  </span>
                  <span className="font-bold text-slate-800">{destination.duration}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-teal-600" /> Best Time
                  </span>
                  <span className="font-bold text-slate-800">Year-round Tropical</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-teal-600" /> Group Type
                  </span>
                  <span className="font-bold text-slate-800">Private / Semi-Private</span>
                </div>
              </div>

              {/* Primary Booking Button */}
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full py-3.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 active:scale-98 text-white font-bold text-sm transition shadow-md shadow-teal-600/30 flex items-center justify-center gap-2 mb-3"
              >
                <span>Book This Tour Now</span>
              </button>

              <button
                onClick={() => navigate('/explore')}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition"
              >
                Browse Other Packages
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Sticky CTA Bar (< 1024px) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 flex items-center justify-between shadow-xl">
          <div>
            <span className="text-[11px] text-slate-400 font-bold block uppercase tracking-wider">
              From
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-teal-700">{formatLKR(destination.price)}</span>
              <span className="text-xs text-slate-500">/ person</span>
            </div>
          </div>
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="px-6 py-2.5 rounded-xl bg-teal-600 text-white font-bold text-sm shadow-md shadow-teal-600/30"
          >
            Book Now
          </button>
        </div>

        {/* Booking Form Modal */}
        <BookingModal
          destination={destination}
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          onSuccess={(booking) => {
            setIsBookingModalOpen(false);
            setConfirmedBooking(booking);
          }}
        />

        {/* Booking Confirmation Receipt Modal */}
        {confirmedBooking && (
          <BookingConfirmationModal
            booking={confirmedBooking}
            onClose={() => setConfirmedBooking(null)}
            onExploreMore={() => {
              setConfirmedBooking(null);
              navigate('/explore');
            }}
          />
        )}
      </div>
    </div>
  );
};
