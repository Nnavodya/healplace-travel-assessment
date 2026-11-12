# LankaScape – Sri Lanka Travel & Tourism Booking Website

> A modern, creative, and fully responsive travel and tourism booking web application showcasing the enchanting beauty of Sri Lanka. Built with **React 18**, **TypeScript**, **Tailwind CSS**, and **Vite**.

---

## 1. Project Overview

**LankaScape** is a client-side single-page application (SPA) created for the Full-Stack Developer Intern Technical Assessment. The website provides prospective travelers with an immersive journey through Sri Lanka's most celebrated destinations—spanning mist-kissed central highlands, millennia-old UNESCO rock fortresses, pristine southern surf beaches, and historic colonial fort ramparts.

The application incorporates a modern aesthetic, real-time search, multi-criteria filtering, a full-screen image lightbox gallery, and an interactive booking workflow with live pricing calculations and browser persistence.

---

## 2. Key Features

- **Dynamic Hero & Search Experience**: High-impact hero section with localized Sri Lankan imagery, curated tag suggestions, and direct search navigation to the catalog.
- **Interactive Explore Catalog**: Live keyword search across destination names, locations, categories, and activities with zero page reloads.
- **Combined Multi-Criteria Filtering**: Filter simultaneously by:
  - **Category**: *Nature*, *Cultural*, *Beach*, *Heritage*.
  - **Region / Location**: Dynamic dropdown populated from available package data.
  - **Maximum Price**: Interactive range slider (Rs. 20,000 to Rs. 40,000).
  - **Minimum Rating**: Quick selection buttons (All, 4.8★+, 4.9★+).
- **Flexible Sorting**: Sort destinations by Recommended order, Price (Low to High), Price (High to Low), Rating (High to Low), and Alphabetical (A to Z).
- **Multiple Feedback States**:
  - **Loading State**: Elegant animated skeleton cards during simulated async fetch.
  - **Empty State**: Informative fallback with a 1-click "Clear All Filters" button.
  - **Error State**: Resilient error message with a working "Try Again" retry action.
  - **404 State**: Dedicated Not Found page for nonexistent routes or invalid destination IDs.
- **3-Image Lightbox Gallery**: Fully responsive asymmetric gallery with an interactive full-screen modal featuring keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`).
- **Validated Booking Modal**:
  - Live price calculation based on guest count (`Price per person × Guests`).
  - Validation rules for full name, email format, phone format, future travel dates, and guest capacity (1–10).
  - Inline error feedback that clears dynamically upon editing.
- **Persistent LocalStorage Layer**: Confirmed demo bookings are stored locally in the browser under `lankascape_bookings` with error handling safeguards.
- **Fully Responsive**: Optimized for Mobile (< 768px), Tablet (768px – 1024px), and Desktop (> 1024px) viewports with accessible touch targets and mobile filter drawers.

---

## 3. Four Included Sri Lankan Destinations

| Destination | Category | Location | Highlights | Starting Price |
| :--- | :--- | :--- | :--- | :--- |
| **Ella Misty Highlands** | **Nature** | Ella, Badulla District | Nine Arch Bridge, Little Adam’s Peak, Ravana Falls, Ceylon tea tasting | **Rs. 25,000** / person |
| **Sigiriya Ancient Fortress** | **Cultural** | Sigiriya, Matale District | 5th-century Lion Rock palace, ancient water gardens, Minneriya elephant safari | **Rs. 30,000** / person |
| **Mirissa Coastal Haven** | **Beach** | Mirissa, Matara District | Coconut Tree Hill, Secret Beach snorkeling, ethical blue whale safaris | **Rs. 35,000** / person |
| **Galle Dutch Heritage Fort** | **Heritage** | Galle, Southern Province | 17th-century ramparts, iconic white lighthouse, cobblestone colonial streets | **Rs. 28,000** / person |

---

## 4. Technologies Used

- **Framework**: [React 18](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode enabled)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) + PostCSS + Autoprefixer
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Google Fonts (*Plus Jakarta Sans*)

---

## 5. Screens & Pages Architecture

1. **Home Page (`/`)**:
   - Hero banner with animated search bar and popular shortcut tags.
   - Featured Destinations grid displaying the 4 core Sri Lankan travel packages.
   - Creative travel inspiration section (*"Why Explore Sri Lanka with LankaScape?"*).
2. **Explore Catalog (`/explore`)**:
   - Synchronized URL search parameters (e.g. `/explore?search=Ella&category=Nature`).
   - Sticky sidebar filter panel on desktop and slide-over drawer on mobile.
   - Live result counts, sorting controls, and feedback states.
3. **Destination Details (`/destination/:id`)**:
   - Breadcrumb navigation and tour perks bar.
   - 3-image responsive gallery with full-screen lightbox modal.
   - Numbered itinerary activities checklist and What's Included / Not Included cards.
   - Sticky booking widget with mobile bottom bar.
4. **Booking Modal & Confirmation Receipt**:
   - Form inputs with real-time price estimation and validation.
   - Confirmation modal with unique booking reference code (e.g. `LS-LK-84920`).
5. **404 Not Found Page (`*`)**:
   - Catches unknown paths with clear navigation back to safety.

---

## 6. Project Folder Structure

```text
healplace-travel-assessment/
├── index.html                     # HTML5 entry with Google Fonts
├── package.json                   # Project dependencies and build scripts
├── postcss.config.js              # PostCSS plugins (Tailwind, Autoprefixer)
├── tailwind.config.js             # Tailwind design theme and color tokens
├── tsconfig.json                  # TypeScript strict compiler options
├── vite.config.ts                 # Vite bundler configuration
└── src/
    ├── assets/
    │   └── images/
    │       └── destinations/      # Local image assets categorized by destination
    │           ├── ella/          # ella-1.jpg, ella-2.jpg, ella-3.jpg
    │           ├── galle/         # galle-1.jpg, galle-2.jpg, galle-3.jpg
    │           ├── mirissa/       # mirissa-1.jpg, mirissa-2.jpg, mirissa-3.jpg
    │           └── sigiriya/      # sigiriya-1.jpg, sigiriya-2.jpg, sigiriya-3.jpg
    ├── components/
    │   ├── common/
    │   │   ├── Navbar.tsx         # Sticky navigation with mobile hamburger
    │   │   └── Footer.tsx         # Site footer with regional highlights
    │   ├── home/
    │   │   ├── HeroSection.tsx    # Hero section with interactive search
    │   │   ├── DestinationCard.tsx# Reusable card with rating, price, and tags
    │   │   ├── FeaturedSection.tsx# 4 Sri Lankan packages showcase
    │   │   └── WhySriLankaSection.tsx # Creative travel inspiration section
    │   ├── explore/
    │   │   ├── FilterSidebar.tsx  # Multi-criteria filter controls
    │   │   ├── ExploreToolbar.tsx # Result counters and sort selectors
    │   │   ├── LoadingState.tsx   # Skeleton loading cards
    │   │   ├── EmptyState.tsx     # Zero results fallback
    │   │   └── ErrorState.tsx     # Simulated fetch error fallback
    │   ├── details/
    │   │   ├── ImageGallery.tsx   # 3-image gallery & keyboard-enabled lightbox
    │   │   └── ActivitiesList.tsx # Itinerary activities & inclusion cards
    │   └── booking/
    │       ├── BookingModal.tsx   # Form validation & live price calculator
    │       └── BookingConfirmationModal.tsx # Demo booking receipt
    ├── data/
    │   └── destinations.ts        # Mock destination dataset & async helpers
    ├── pages/
    │   ├── HomePage.tsx           # Landing page
    │   ├── ExplorePage.tsx        # Search & filtering catalog
    │   ├── DestinationDetailPage.tsx # Tour details & booking integration
    │   └── NotFoundPage.tsx       # 404 error page
    ├── types/
    │   └── index.ts               # TypeScript data interfaces & filter types
    ├── utils/
    │   └── storage.ts             # Safe localStorage persistence helpers
    ├── App.tsx                    # React Router configuration & scroll reset
    ├── index.css                  # Tailwind directives & base styling
    ├── main.tsx                   # React root hydration
    └── vite-env.d.ts              # Vite asset type declarations
```

---

## 7. Installation & Local Development

### Prerequisites
- **Node.js**: v18.0.0 or v20+ recommended
- **npm**: v9.0.0 or higher

### Steps to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Nnavodya/healplace-travel-assessment.git
   cd healplace-travel-assessment
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   Open your browser and navigate to:
   ```text
   http://localhost:5173
   ```

5. **Create a production build:**
   ```bash
   npm run build
   ```
   *The compiled production bundle will be output to the `dist/` folder.*

---

## 8. How to Replace Destination Photos

All images are stored locally to comply with assessment guidelines. To replace any photo with your own photography, simply overwrite the respective file inside `src/assets/images/destinations/` while preserving the exact file names:

- **Ella**:
  - `src/assets/images/destinations/ella/ella-1.jpg` (Hero / Nine Arch Bridge)
  - `src/assets/images/destinations/ella/ella-2.jpg` (Mountain / Little Adam's Peak)
  - `src/assets/images/destinations/ella/ella-3.jpg` (Waterfalls / Tea Plantation)
- **Sigiriya**:
  - `src/assets/images/destinations/sigiriya/sigiriya-1.jpg` (Lion Rock Monolith)
  - `src/assets/images/destinations/sigiriya/sigiriya-2.jpg` (Pidurangala Panorama)
  - `src/assets/images/destinations/sigiriya/sigiriya-3.jpg` (Water Gardens)
- **Mirissa**:
  - `src/assets/images/destinations/mirissa/mirissa-1.jpg` (Coconut Tree Hill)
  - `src/assets/images/destinations/mirissa/mirissa-2.jpg` (Golden Sand Bay)
  - `src/assets/images/destinations/mirissa/mirissa-3.jpg` (Whale & Marine Coast)
- **Galle**:
  - `src/assets/images/destinations/galle/galle-1.jpg` (White Lighthouse)
  - `src/assets/images/destinations/galle/galle-2.jpg` (Dutch Fort Ramparts)
  - `src/assets/images/destinations/galle/galle-3.jpg` (Colonial Cobblestone Streets)

*No TypeScript or component edits are required when replacing files with the same names.*

---

## 9. Booking Flow & LocalStorage Demonstration

1. Navigate to any destination page (e.g. `/destination/ella-nature-highlands`).
2. Click **"Book This Tour Now"**.
3. Adjust the **Number of Guests** to observe the live price calculation:
   $$\text{Total Price} = \text{Price per Person} \times \text{Guest Count}$$
4. Enter traveler details (Full Name, valid Email, valid Phone, and future Travel Date).
5. Upon submission, a unique booking reference (e.g. `LS-LK-52914`) is generated and the record is saved to browser `localStorage` under the key `'lankascape_bookings'`.
6. Even after refreshing the page or navigating away, past bookings remain safely in the browser's storage.

---

## 10. Important Limitations

- **No Real Payment Processing**: This application is a frontend technical demonstration. No real financial transactions, credit cards, or payment gateways are connected.
- **No Remote Database / Backend**: Data is managed via a typed client-side mock data layer and browser `localStorage`.
- **Demo Bookings**: All bookings generated are simulated reservations for assessment evaluation.

---

## 11. AI Assistance Disclosure

As per Section 6 of the Technical Assessment specification:
- **AI Tool Used**: **Google Antigravity AI Assistant** (powered by Gemini models).
- **Scope of Usage**:
  - Scaffolding the React + Vite + TypeScript application configuration.
  - Designing TypeScript data contracts and mock destination models for Sri Lankan travel locations.
  - Implementing responsive Tailwind CSS components, interactive filter logic, image lightbox controls, and form validation routines.
  - Reviewing code quality, accessibility attributes, and generating structured technical documentation.

