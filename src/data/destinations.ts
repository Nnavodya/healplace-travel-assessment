import { Destination } from '../types';

import ella1 from '../assets/images/destinations/ella/ella-1.jpg';
import ella2 from '../assets/images/destinations/ella/ella-2.jpg';
import ella3 from '../assets/images/destinations/ella/ella-3.jpg';

import sigiriya1 from '../assets/images/destinations/sigiriya/sigiriya-1.jpg';
import sigiriya2 from '../assets/images/destinations/sigiriya/sigiriya-2.jpg';
import sigiriya3 from '../assets/images/destinations/sigiriya/sigiriya-3.jpg';

import mirissa1 from '../assets/images/destinations/mirissa/mirissa-1.jpg';
import mirissa2 from '../assets/images/destinations/mirissa/mirissa-2.jpg';
import mirissa3 from '../assets/images/destinations/mirissa/mirissa-3.jpg';

import galle1 from '../assets/images/destinations/galle/galle-1.jpg';
import galle2 from '../assets/images/destinations/galle/galle-2.jpg';
import galle3 from '../assets/images/destinations/galle/galle-3.jpg';

export const DESTINATIONS: Destination[] = [
  {
    id: 'ella-nature-highlands',
    name: 'Ella Misty Highlands',
    tagline: 'Iconic Nine Arch Bridge, misty tea estates & exhilarating mountain treks',
    description:
      'Nestled in the lush central highlands of Sri Lanka, Ella is a paradise of emerald valleys, cascading waterfalls, and crisp mountain air. Witness the world-famous blue train cross the colonial Nine Arch Bridge, ascend Little Adam’s Peak at sunrise, and immerse yourself in aromatic Ceylon tea gardens.',
    location: 'Ella, Badulla District',
    country: 'Sri Lanka',
    category: 'Nature',
    price: 340,
    originalPrice: 420,
    duration: '4 Days / 3 Nights',
    rating: 4.93,
    reviewsCount: 198,
    featured: true,
    popular: true,
    coverImage: ella1,
    images: [ella1, ella2, ella3],
    activities: [
      'Nine Arch Bridge Scenic Photography Walk',
      'Little Adam’s Peak Sunrise Hike',
      'Ravana Falls & Cave Exploration',
      'Organic Ceylon Tea Factory Tour & Tasting',
      'Scenic Ella to Demodara Train Journey',
    ],
    highlights: [
      'Mountain-view boutique lodge with private panoramic balcony',
      'Reserved 1st class scenic highland train observation seats',
      'Guided private hiking with seasoned local naturalist',
    ],
    included: [
      'Boutique mountain lodge stay',
      'Daily organic highland breakfast',
      'All internal transfers by private vehicle',
      'Tea factory admission and tasting',
    ],
    notIncluded: ['International airfare', 'Personal souvenirs', 'Gratuities for guide/driver'],
  },
  {
    id: 'sigiriya-cultural-fortress',
    name: 'Sigiriya Ancient Rock Fortress',
    tagline: '5th-century royal palace in the sky, water gardens & world-famous frescoes',
    description:
      'Towering 200 meters above surrounding tropical plains, Sigiriya (Lion Rock) is a UNESCO World Heritage marvel built by King Kashyapa in the 5th century. Marvel at ancient wall frescoes, walk through ingenious hydraulic water gardens, and take in 360-degree jungle vistas from the summit ruins.',
    location: 'Sigiriya, Matale District',
    country: 'Sri Lanka',
    category: 'Cultural',
    price: 380,
    originalPrice: 450,
    duration: '3 Days / 2 Nights',
    rating: 4.96,
    reviewsCount: 264,
    featured: true,
    popular: true,
    coverImage: sigiriya1,
    images: [sigiriya1, sigiriya2, sigiriya3],
    activities: [
      'Sigiriya Lion Rock Summit Exploration',
      'Pidurangala Rock Sunrise Panoramic Trek',
      'Minneriya National Park Elephant Gathering Safari',
      'Ancient Royal Water Gardens Architecture Tour',
      'Traditional Village Bullock Cart & Lake Boat Ride',
    ],
    highlights: [
      'Luxury eco-resort overlooking Sigiriya Rock',
      'Early morning VIP entry to beat crowds and heat',
      'Private 4x4 open-top safari for wild elephant viewing',
    ],
    included: [
      '5-star eco-resort accommodation',
      'Sigiriya & Pidurangala entrance passes',
      '4x4 Minneriya wildlife safari jeep and park permit',
      'Daily breakfast & authentic Sri Lankan lunch buffet',
    ],
    notIncluded: ['Flights', 'Alcoholic beverages', 'Personal travel insurance'],
  },
  {
    id: 'mirissa-beach-paradise',
    name: 'Mirissa Coastal Haven',
    tagline: 'Golden crescent bays, iconic Coconut Tree Hill & blue whale marine safaris',
    description:
      'Mirissa is Sri Lanka’s premier tropical beach sanctuary on the southern coastline. Soak in vibrant sunsets from the picturesque Coconut Tree Hill, surf gentle turquoise waves at Secret Beach, and cruise into the deep Indian Ocean to observe majestic blue whales and playful spinner dolphins.',
    location: 'Mirissa, Matara District',
    country: 'Sri Lanka',
    category: 'Beach',
    price: 310,
    originalPrice: 390,
    duration: '4 Days / 3 Nights',
    rating: 4.88,
    reviewsCount: 172,
    featured: false,
    popular: true,
    coverImage: mirissa1,
    images: [mirissa1, mirissa2, mirissa3],
    activities: [
      'Ethical Blue Whale & Dolphin Watching Cruise',
      'Coconut Tree Hill Sunset Photography Session',
      'Secret Beach Snorkeling & Sea Turtle Spotting',
      'Beginner & Intermediate Surfing Lessons',
      'Beachfront Candlelight Seafood BBQ Dinner',
    ],
    highlights: [
      'Beachfront resort with direct access to golden sands',
      'High-speed catamaran whale safari with marine biologist',
      'Complimentary snorkeling gear and surfboard hire',
    ],
    included: [
      'Beachfront villa/hotel stay',
      'Marine conservation whale watching boat tour',
      'Daily tropical breakfast buffet',
      '1 Welcome beachfront seafood dinner',
    ],
    notIncluded: ['Flights', 'Airport taxi extensions', 'Personal shopping'],
  },
  {
    id: 'galle-heritage-fort',
    name: 'Galle Dutch Heritage Fort',
    tagline: 'Cobblestone streets, 17th-century Dutch ramparts & oceanfront lighthouse',
    description:
      'Step back in time within the living UNESCO World Heritage fortress of Galle. Stroll along centuries-old fortified ramparts, admire Dutch colonial architecture and chic art boutiques, explore the iconic white lighthouse, and savor artisanal gelato as waves crash against historic coral stone walls.',
    location: 'Galle, Southern Province',
    country: 'Sri Lanka',
    category: 'Heritage',
    price: 360,
    originalPrice: 440,
    duration: '3 Days / 2 Nights',
    rating: 4.92,
    reviewsCount: 215,
    featured: true,
    popular: false,
    coverImage: galle1,
    images: [galle1, galle2, galle3],
    activities: [
      'Galle Fort Historical Ramparts Sunset Walk',
      'Dutch Hospital Precinct Dining & Boutique Shopping',
      'Historic White Lighthouse & Bastion Tour',
      'Galle Maritime & National Heritage Museum Visit',
      'Handcrafted Lace Making & Gemology Demonstration',
    ],
    highlights: [
      'Heritage colonial manor hotel inside the Fort walls',
      'Walking tour led by a certified architectural historian',
      'Sunset cocktail on the historic ramparts overlooking the ocean',
    ],
    included: [
      'Colonial boutique heritage hotel',
      'Guided historical walking tour',
      'All museum entrance admissions',
      'Daily artisanal breakfast and evening tea service',
    ],
    notIncluded: ['International airfare', 'Personal expenses', 'Unscheduled meals'],
  },
];

// Helper with setTimeout to simulate realistic loading states
export function fetchDestinations(delayMs = 400): Promise<Destination[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...DESTINATIONS]);
    }, delayMs);
  });
}

export function fetchDestinationById(id: string, delayMs = 300): Promise<Destination | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const found = DESTINATIONS.find((item) => item.id.toLowerCase() === id.toLowerCase());
      resolve(found ? { ...found } : null);
    }, delayMs);
  });
}
