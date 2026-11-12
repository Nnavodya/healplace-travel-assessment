export type DestinationCategory =
  | 'All'
  | 'Nature'
  | 'Cultural'
  | 'Beach'
  | 'Heritage';

export interface Destination {
  id: string;
  name: string;
  tagline: string;
  description: string;
  location: string;
  country: string;
  category: Exclude<DestinationCategory, 'All'>;
  price: number; // in LKR per person
  originalPrice?: number;
  duration: string; // e.g. "4 Days / 3 Nights"
  rating: number; // e.g. 4.92
  reviewsCount: number;
  featured: boolean;
  popular: boolean;
  coverImage: string;
  images: string[];
  activities: string[];
  highlights: string[];
  included: string[];
  notIncluded: string[];
}

export interface Booking {
  id: string;
  bookingReference: string;
  destinationId: string;
  destinationName: string;
  destinationImage: string;
  pricePerPerson: number;
  fullName: string;
  email: string;
  phone: string;
  travelDate: string;
  guests: number;
  specialRequests?: string;
  totalPrice: number;
  createdAt: string;
  status: 'confirmed' | 'cancelled';
}

export interface FilterState {
  searchQuery: string;
  category: DestinationCategory;
  location: string;
  maxPrice: number;
  minRating: number;
  sortBy: 'recommended' | 'price-asc' | 'price-desc' | 'rating-desc' | 'name-asc';
}

export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  travelDate: string;
  guests: number;
  specialRequests?: string;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  travelDate?: string;
  guests?: string;
  general?: string;
}
