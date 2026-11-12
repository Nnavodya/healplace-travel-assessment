import React, { useState } from 'react';
import { X, Calendar, Users, Mail, Phone, User, MessageSquare, AlertCircle, ShieldCheck } from 'lucide-react';
import { Destination, Booking, BookingFormData, FormErrors } from '../../types';
import { generateBookingReference, saveStoredBooking } from '../../utils/storage';
import { formatLKR } from '../../utils/format';

interface BookingModalProps {
  destination: Destination;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  destination,
  isOpen,
  onClose,
  onSuccess,
}) => {
  // Format today as YYYY-MM-DD for the min date attribute
  const todayString = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    phone: '',
    travelDate: '',
    guests: 2,
    specialRequests: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close on Escape key press
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Real-time or On-change input handler
  const handleInputChange = (
    field: keyof BookingFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear specific inline error when user types
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Client-side validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // 1. Full Name
    const trimmedName = formData.fullName.trim();
    if (!trimmedName) {
      newErrors.fullName = 'Full name is required.';
    } else if (trimmedName.length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters long.';
    } else if (trimmedName.length > 60) {
      newErrors.fullName = 'Name cannot exceed 60 characters.';
    }

    // 2. Email validation
    const trimmedEmail = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(trimmedEmail)) {
      newErrors.email = 'Please enter a valid email address (e.g. traveler@example.com).';
    }

    // 3. Phone validation
    const trimmedPhone = formData.phone.trim();
    const phoneRegex = /^[+0-9\s\-()]{8,20}$/;
    if (!trimmedPhone) {
      newErrors.phone = 'Phone number is required.';
    } else if (!phoneRegex.test(trimmedPhone)) {
      newErrors.phone = 'Please enter a valid phone number (minimum 8 digits).';
    }

    // 4. Travel Date validation
    if (!formData.travelDate) {
      newErrors.travelDate = 'Travel date is required.';
    } else {
      const selected = new Date(formData.travelDate);
      const today = new Date(todayString);
      if (selected < today) {
        newErrors.travelDate = 'Travel date cannot be in the past.';
      }
    }

    // 5. Guests validation
    if (!formData.guests || formData.guests < 1) {
      newErrors.guests = 'At least 1 guest is required.';
    } else if (formData.guests > 10) {
      newErrors.guests = 'Maximum 10 guests allowed per group booking.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const totalPrice = destination.price * formData.guests;
    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      bookingReference: generateBookingReference(),
      destinationId: destination.id,
      destinationName: destination.name,
      destinationImage: destination.coverImage,
      pricePerPerson: destination.price,
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      travelDate: formData.travelDate,
      guests: Number(formData.guests),
      specialRequests: formData.specialRequests?.trim() || undefined,
      totalPrice,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };

    // Save safely to localStorage
    saveStoredBooking(newBooking);

    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess(newBooking);
    }, 300);
  };

  const calculatedTotal = destination.price * (formData.guests || 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-slate-900 px-6 py-5 text-white flex items-center justify-between">
          <div>
            <span className="text-teal-400 text-xs font-bold uppercase tracking-wider block">
              Reservation Request
            </span>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              Book {destination.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition focus:outline-none"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* Price Calculation Pill */}
          <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-teal-800 font-semibold block">Price Per Person</span>
              <span className="text-lg sm:text-xl font-extrabold text-teal-900">{formatLKR(destination.price)}</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-teal-800 font-semibold block">Estimated Total</span>
              <span className="text-lg sm:text-xl font-extrabold text-teal-700">{formatLKR(calculatedTotal)}</span>
            </div>
          </div>

          {/* Full Name Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                maxLength={60}
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="e.g. Kasun Perera"
                className={`w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border bg-slate-50 focus:outline-none transition ${
                  errors.fullName
                    ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
                }`}
              />
            </div>
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.fullName}</span>
              </p>
            )}
          </div>

          {/* Contact Row: Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="name@example.com"
                  className={`w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border bg-slate-50 focus:outline-none transition ${
                    errors.email
                      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+94 77 123 4567"
                  className={`w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border bg-slate-50 focus:outline-none transition ${
                    errors.phone
                      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.phone}</span>
                </p>
              )}
            </div>
          </div>

          {/* Schedule Row: Date & Guests */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Travel Date */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Travel Date *
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  min={todayString}
                  value={formData.travelDate}
                  onChange={(e) => handleInputChange('travelDate', e.target.value)}
                  className={`w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border bg-slate-50 focus:outline-none transition ${
                    errors.travelDate
                      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
                  }`}
                />
              </div>
              {errors.travelDate && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.travelDate}</span>
                </p>
              )}
            </div>

            {/* Number of Guests */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Number of Guests *
              </label>
              <div className="relative">
                <Users className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={formData.guests}
                  onChange={(e) => handleInputChange('guests', Number(e.target.value))}
                  className={`w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border bg-slate-50 focus:outline-none transition ${
                    errors.guests
                      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
                  }`}
                />
              </div>
              {errors.guests && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.guests}</span>
                </p>
              )}
            </div>
          </div>

          {/* Optional Special Requests */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Special Requests (Optional)
            </label>
            <div className="relative">
              <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <textarea
                rows={2}
                maxLength={300}
                value={formData.specialRequests || ''}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                placeholder="Dietary requirements, pickup preferences, accessibility notes..."
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition resize-none"
              />
            </div>
          </div>

          {/* Secure / Safe Note */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
            <span>Instant confirmation. No credit card required for demo booking.</span>
          </div>

          {/* Actions: Cancel & Submit */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="sm:w-1/3 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-98 transition text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="sm:w-2/3 py-3.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 active:scale-98 text-white font-bold text-sm transition shadow-md shadow-teal-600/30 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Confirming Booking...</span>
              ) : (
                <span>Confirm Booking ({formatLKR(calculatedTotal)})</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

