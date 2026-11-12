import { Booking } from '../types';

const STORAGE_KEY = 'lankascape_bookings';

/**
 * Safely retrieve saved bookings from browser localStorage.
 */
export function getStoredBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('Unable to read bookings from localStorage:', error);
    return [];
  }
}

/**
 * Safely persist a new booking to localStorage.
 */
export function saveStoredBooking(booking: Booking): boolean {
  try {
    const existing = getStoredBookings();
    const updated = [booking, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.warn('Unable to save booking to localStorage:', error);
    return false;
  }
}

/**
 * Generate a clean, human-friendly booking reference code.
 */
export function generateBookingReference(): string {
  const randomDigits = Math.floor(10000 + Math.random() * 90000);
  return `LS-LK-${randomDigits}`;
}

