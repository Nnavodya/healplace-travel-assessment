export type DestinationCategory =
  | 'All'
  | 'Beach'
  | 'Mountain'
  | 'Cultural'
  | 'Adventure'
  | 'Wellness'
  | 'Urban';

export interface Destination {
  id: string;
  name: string;
  tagline: string;
  description: string;
  location: string;
  country: string;
  category: Exclude<DestinationCategory, 'All'>;
  price: number; // in USD per person
  originalPrice?: number;
  duration: string; // e.g. "6 Days / 5 Nights"
  rating: number; // e.g. 4.9
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
  destinationId: string;
  destinationName: string;
  destinationImage: string;
  pricePerPerson: number;
  fullName: string;
  email: string;
  phone: string;
  checkInDate: string;
  checkOutDate: string;
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
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  specialRequests?: string;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  checkInDate?: string;
  checkOutDate?: string;
  guests?: string;
  general?: string;
}

