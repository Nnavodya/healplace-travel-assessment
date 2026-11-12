import React from 'react';
import { CheckCircle2, Calendar, Users, MapPin, Banknote, X, ArrowRight, ShieldAlert } from 'lucide-react';
import { Booking } from '../../types';
import { formatLKR } from '../../utils/format';

interface BookingConfirmationModalProps {
  booking: Booking;
  onClose: () => void;
  onExploreMore: () => void;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  booking,
  onClose,
  onExploreMore,
}) => {
  // Close on Escape key press
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header Ribbon */}
        <div className="bg-teal-600 px-6 py-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition focus:outline-none"
            aria-label="Close confirmation"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 mx-auto rounded-2xl bg-white text-teal-600 flex items-center justify-center mb-3 shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">Booking Requested!</h3>
          <p className="text-teal-100 text-xs sm:text-sm mt-1">
            Reference Code: <span className="font-mono font-bold text-white bg-teal-700/60 px-2 py-0.5 rounded">{booking.bookingReference}</span>
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="p-6 space-y-4 text-slate-700 text-sm overflow-y-auto max-h-[60vh]">
          {/* Destination Header */}
          <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
            <img
              src={booking.destinationImage}
              alt={booking.destinationName}
              className="w-14 h-14 rounded-xl object-cover shrink-0"
            />
            <div>
              <h4 className="font-bold text-slate-900 text-base">{booking.destinationName}</h4>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-teal-600" /> Sri Lanka
              </p>
            </div>
          </div>

          {/* Traveler Info */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
            <div>
              <span className="text-slate-400 font-medium block">Lead Traveler</span>
              <span className="font-bold text-slate-800">{booking.fullName}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Email Address</span>
              <span className="font-bold text-slate-800 break-all">{booking.email}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Contact Phone</span>
              <span className="font-bold text-slate-800">{booking.phone}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Status</span>
              <span className="inline-block px-2 py-0.5 rounded font-bold text-[11px] bg-emerald-100 text-emerald-800">
                Confirmed (Saved Locally)
              </span>
            </div>
          </div>

          {/* Schedule & Price Breakdown */}
          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs sm:text-sm">
            <div className="flex justify-between items-center text-slate-600">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-teal-600" />
                Travel Date
              </span>
              <span className="font-semibold text-slate-900">{booking.travelDate}</span>
            </div>

            <div className="flex justify-between items-center text-slate-600">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-teal-600" />
                Number of Guests
              </span>
              <span className="font-semibold text-slate-900">
                {booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}
              </span>
            </div>

            <div className="flex justify-between items-center text-slate-600">
              <span className="flex items-center gap-1.5">
                <Banknote className="w-4 h-4 text-teal-600" />
                Price Calculation
              </span>
              <span className="text-slate-500">
                {formatLKR(booking.pricePerPerson)} × {booking.guests}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-base font-extrabold text-slate-900">
              <span>Total Estimated Price</span>
              <span className="text-teal-700 text-xl font-black">{formatLKR(booking.totalPrice)}</span>
            </div>
          </div>

          {/* Special Requests note if provided */}
          {booking.specialRequests && (
            <div className="p-3 bg-amber-50/60 border border-amber-100 rounded-xl text-xs text-amber-900">
              <span className="font-bold block mb-0.5">Special Requests Note:</span>
              <p className="italic">{booking.specialRequests}</p>
            </div>
          )}

          {/* Assessment Demo Notice */}
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-amber-900 text-xs leading-relaxed">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Assessment Demo Mode:</strong> This confirmation is saved to your browser’s localStorage.
              No payment has been processed and no live booking server has been contacted.
            </span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-6 pt-2 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
          >
            Close Details
          </button>
          <button
            onClick={onExploreMore}
            className="flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 active:scale-98 transition flex items-center justify-center gap-1.5 shadow-sm shadow-teal-600/20"
          >
            <span>Explore More Tours</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

