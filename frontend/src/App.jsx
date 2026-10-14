import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BuyPage from './pages/BuyPage';
import RentPage from './pages/RentPage';
import SellPage from './pages/SellPage';
import ListPropertyPage from './pages/ListPropertyPage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';

import PostPropertyModal from './components/PostPropertyModal';
import FavoritesModal from './components/FavoritesModal';
import UserModal from './components/UserModal';

// High-fidelity fallback Mumbai properties in Indian Rupees (INR)
const INITIAL_PROPERTIES = [
  {
    id: 1,
    title: "Luxury Sea-Facing 4 BHK Apartment",
    location: "Carter Road, Bandra West, Mumbai",
    locality: "Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    price: 45000000,
    formatted_price: "₹4.50 Cr",
    property_type: "Apartment",
    purpose: "Buy",
    bedrooms: 4,
    bathrooms: 4,
    area_sqft: 2800,
    image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    ],
    is_featured: 1,
    badge: "For Sale",
    description: "Spectacular sea-facing 4 BHK luxury residence situated on prestigious Carter Road promenade in Bandra West. Boasting unhindered panoramic Arabian Sea sunset views, expansive private sundeck, Italian Bottochino marble flooring, custom modular Poggenpohl kitchen, VRV central air-conditioning, high-speed private elevators, and multi-tier biometric security.",
    amenities: [
      "Arabian Sea View", "Private Sundeck", "Italian Marble", "Infinity Swimming Pool",
      "Gymnasium & Yoga Studio", "Clubhouse", "2 Reserved Covered Car Parks",
      "24/7 Security & CCTV", "100% Power Backup", "High-Speed Elevators",
      "Piped Gas Connection", "Rainwater Harvesting"
    ],
    specifications: {
      "Project Name": "Carter Crest Residences",
      "RERA Registration": "P51800028912",
      "Possession Status": "Ready to Move",
      "Floor Number": "14th of 22 Floors",
      "Facing Direction": "West (Direct Sea Facing)",
      "Furnishing": "Semi-Furnished (Modular Kitchen & Wardrobes)",
      "Parking": "2 Covered Reserved Bays",
      "Water Supply": "24/7 Municipal & Borewell Supply",
      "Age of Property": "Under 2 Years",
      "Maintenance Charges": "₹12,500 / month"
    },
    nearby: [
      { title: "Bandra Railway Station", distance: "1.8 km", type: "Transit" },
      { title: "Bandra-Worli Sea Link", distance: "2.5 km", type: "Highway" },
      { title: "Lilavati Hospital & Research Centre", distance: "2.1 km", type: "Hospital" },
      { title: "St. Stanislaus High School", distance: "1.2 km", type: "School" },
      { title: "Pali Hill & Linking Road Shopping", distance: "900 m", type: "Shopping" },
      { title: "Bandra Kurla Complex (BKC)", distance: "6.2 km", type: "Business Hub" },
      { title: "Mumbai International Airport (BOM)", distance: "8.5 km", type: "Airport" }
    ],
    address: "Carter Road Promenade, Bandra West, Mumbai, Maharashtra 400050",
    agent_name: "Aarav Mehta",
    agent_phone: "+91 98201 54321",
    agent_email: "aarav.mehta@dreamhomes.in"
  },
  {
    id: 2,
    title: "Contemporary Skyline Penthouse",
    location: "Worli Sea Face, Mumbai",
    locality: "Worli",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    price: 52500000,
    formatted_price: "₹5.25 Cr",
    property_type: "Apartment",
    purpose: "Buy",
    bedrooms: 3,
    bathrooms: 3,
    area_sqft: 2400,
    image_url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80"
    ],
    is_featured: 1,
    badge: "For Sale",
    description: "Ultra-luxury 3 BHK penthouse perched above Worli Sea Face with soaring ceilings, wrap-around viewing terrace, private plunge pool, and panoramic view of the Bandra-Worli Sea Link.",
    amenities: ["Sea Link Views", "Private Plunge Pool", "Wrap-around Deck", "Concierge Service", "Valet Parking", "Spa & Sauna", "Home Automation"],
    specifications: {
      "Project Name": "Worli Bayview Towers",
      "RERA Registration": "P51900031024",
      "Possession Status": "Ready to Move",
      "Floor Number": "38th of 44 Floors",
      "Facing Direction": "North-West (Sea Link & Ocean)",
      "Furnishing": "Fully Furnished Designer Decor",
      "Parking": "3 Covered Stilt Bays",
      "Water Supply": "24/7 Treated Corporation Water",
      "Age of Property": "1 Year",
      "Maintenance Charges": "₹16,000 / month"
    },
    nearby: [
      { title: "Bandra-Worli Sea Link Entrance", distance: "800 m", type: "Highway" },
      { title: "Lower Parel Commercial Hub", distance: "3.1 km", type: "Business Hub" },
      { title: "Podar International School", distance: "2.4 km", type: "School" }
    ],
    address: "Worli Sea Face Promenade, Worli, Mumbai 400018",
    agent_name: "Pooja Singhania",
    agent_phone: "+91 98190 87654",
    agent_email: "pooja.s@dreamhomes.in"
  },
  {
    id: 3,
    title: "Royal Palms Private Estate Villa",
    location: "Gulmohar Road, Juhu Beach, Mumbai",
    locality: "Juhu",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    price: 78000000,
    formatted_price: "₹7.80 Cr",
    property_type: "Villa",
    purpose: "Buy",
    bedrooms: 5,
    bathrooms: 5,
    area_sqft: 4200,
    image_url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
    ],
    is_featured: 1,
    badge: "For Sale",
    description: "Exquisite standalone luxury villa situated in an exclusive gated compound in Juhu Scheme, moments away from Juhu Beach. Features landscaped private gardens, open-air cabana, private pool, and staff quarters.",
    amenities: ["Private Swimming Pool", "Landscaped Lawn", "Staff Quarters", "Gated Security", "Solar Powered", "Modern Modular Kitchen", "Terrace Lounge"],
    specifications: {
      "Project Name": "Juhu Royale Enclave",
      "RERA Registration": "P51800019283",
      "Possession Status": "Ready to Move",
      "Floor Number": "Ground + 2 Floors",
      "Facing Direction": "East (Vastu Compliant)",
      "Furnishing": "Designer Semi-Furnished",
      "Parking": "4 Private Car Parks",
      "Water Supply": "24/7 Dedicated Connection"
    },
    nearby: [
      { title: "Juhu Beach Promenade", distance: "600 m", type: "Beach" },
      { title: "Nanavati Super Speciality Hospital", distance: "2.2 km", type: "Hospital" }
    ],
    address: "Gulmohar Road, Juhu Scheme, Mumbai 400049",
    agent_name: "Vikramaditya Roy",
    agent_phone: "+91 98210 11223",
    agent_email: "vikram.roy@dreamhomes.in"
  },
  {
    id: 4,
    title: "Modern Garden Family Residence",
    location: "Central Avenue, Hiranandani Gardens, Powai",
    locality: "Powai",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    price: 19500000,
    formatted_price: "₹1.95 Cr",
    property_type: "Apartment",
    purpose: "Buy",
    bedrooms: 2,
    bathrooms: 2,
    area_sqft: 1150,
    image_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
    ],
    is_featured: 1,
    badge: "For Sale",
    description: "Elegantly designed 2 BHK in the prestigious Hiranandani township overlooking Powai Lake. Neo-classical European architecture, walk-in closets, international schools and dining just steps away.",
    amenities: ["Lake View", "Clubhouse Access", "Olympic Pool", "Badminton Court", "Piped Gas", "Children's Play Area", "Shopping Arcade"],
    specifications: {
      "Project Name": "Hiranandani Heritage Powai",
      "RERA Registration": "P51800024410",
      "Possession Status": "Ready to Move",
      "Floor Number": "18th of 28 Floors",
      "Facing Direction": "North-East (Lake Facing)",
      "Furnishing": "Semi-Furnished",
      "Parking": "1 Reserved Covered Park"
    },
    nearby: [
      { title: "Powai Lake Promenade", distance: "400 m", type: "Lake" },
      { title: "IIT Bombay Campus", distance: "1.4 km", type: "Education" }
    ],
    address: "Central Avenue, Hiranandani Gardens, Powai, Mumbai 400076",
    agent_name: "Neha Sharma",
    agent_phone: "+91 98330 44556",
    agent_email: "neha.s@dreamhomes.in"
  },
  {
    id: 5,
    title: "Bandra Promenade Luxury Sea-View Flat",
    location: "Perry Cross Road, Bandra West, Mumbai",
    locality: "Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    price: 175000,
    formatted_price: "₹1.75 Lakh/month",
    property_type: "Apartment",
    purpose: "Rent",
    bedrooms: 3,
    bathrooms: 3,
    area_sqft: 1850,
    image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
    ],
    is_featured: 1,
    badge: "For Rent",
    description: "Spacious 3 BHK premium sea-facing apartment on Perry Cross Road in Bandra West. Fully furnished with Italian marble flooring, modular kitchen, balcony with panoramic sea breeze, 2 reserved parking slots.",
    amenities: ["Sea Facing", "Fully Furnished", "Italian Marble", "2 Reserved Parkings", "Clubhouse", "24/7 Security", "Power Backup"],
    specifications: {
      "Project Name": "Perry Crest Haven",
      "RERA Registration": "P51800021401",
      "Possession Status": "Ready to Move",
      "Floor Number": "12th of 18 Floors",
      "Facing Direction": "West (Sea Facing)",
      "Furnishing": "Fully Furnished Designer Decor",
      "Parking": "2 Covered Reserved Bays",
      "Water Supply": "24/7 Dedicated Connection"
    },
    nearby: [
      { title: "Carter Road Promenade", distance: "500 m", type: "Promenade" },
      { title: "Pali Hill Cafes & Dining", distance: "700 m", type: "Dining" }
    ],
    address: "Perry Cross Road, Bandra West, Mumbai 400050",
    agent_name: "Aarav Mehta",
    agent_phone: "+91 98201 54321",
    agent_email: "aarav.mehta@dreamhomes.in"
  },
  {
    id: 6,
    title: "BKC Executive Serviced Residence",
    location: "G Block, Bandra Kurla Complex (BKC), Mumbai",
    locality: "BKC",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    price: 120000,
    formatted_price: "₹1.20 Lakh/month",
    property_type: "Apartment",
    purpose: "Rent",
    bedrooms: 2,
    bathrooms: 2,
    area_sqft: 1200,
    image_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
    ],
    is_featured: 0,
    badge: "For Rent",
    description: "Corporate executive 2 BHK apartment in prime Bandra Kurla Complex. Ideal for CXOs and financial district professionals. Includes smart home automation, rooftop infinity pool, gym, and 24/7 concierge.",
    amenities: ["Near Corporate Hub", "Smart Home Automation", "Rooftop Pool", "Gym", "Concierge Service", "100% Power Backup"],
    specifications: {
      "Project Name": "BKC Apex Suites",
      "RERA Registration": "P51800029810",
      "Possession Status": "Ready to Move",
      "Floor Number": "15th of 26 Floors",
      "Facing Direction": "North-East",
      "Furnishing": "Fully Furnished",
      "Parking": "1 Reserved Covered Park",
      "Water Supply": "24/7 Municipal"
    },
    nearby: [
      { title: "Jio World Drive", distance: "600 m", type: "Mall" },
      { title: "BKC Metro Station", distance: "500 m", type: "Metro" }
    ],
    address: "G Block, Bandra Kurla Complex, Mumbai 400051",
    agent_name: "Pooja Singhania",
    agent_phone: "+91 98190 87654",
    agent_email: "pooja.s@dreamhomes.in"
  }
];

// Helper to determine initial page from current window pathname
const getPageFromPath = () => {
  const p = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase();
  const validPages = ['home', 'buy', 'rent', 'list-property', 'sell', 'projects', 'about', 'contact', 'details'];
  if (p === '' || p === 'home') return 'home';
  if (validPages.includes(p)) return p;
  return 'home';
};

export default function App() {
  const [properties, setProperties] = useState(INITIAL_PROPERTIES);
  const [activePage, setActivePage] = useState(getPageFromPath);
  const [selectedProperty, setSelectedProperty] = useState(INITIAL_PROPERTIES[0]);

  const [searchFilters, setSearchFilters] = useState({
    location: '',
    propertyType: 'All',
    priceRange: 'All'
  });

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('dreamhomes_favorites');
      return saved ? JSON.parse(saved) : [1];
    } catch {
      return [1];
    }
  });

  // Modals state
  const [isPostPropertyOpen, setIsPostPropertyOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Handle URL change (back/forward browser buttons)
  useEffect(() => {
    const handlePopState = () => {
      setActivePage(getPageFromPath());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Central page navigation with URL sync
  const navigateTo = (page, prop = null) => {
    setActivePage(page);
    if (prop) setSelectedProperty(prop);
    const path = page === 'home' ? '/' : `/${page}`;
    if (window.location.pathname !== path) {
      window.history.pushState({ page }, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fetch properties from Flask backend
  const fetchProperties = async (filters = searchFilters) => {
    try {
      const params = new URLSearchParams();
      if (filters.location) params.append('location', filters.location);
      if (filters.propertyType && filters.propertyType !== 'All') params.append('type', filters.propertyType);

      if (filters.priceRange && filters.priceRange !== 'All') {
        if (filters.priceRange === 'under-1cr') params.append('max_price', '10000000');
        else if (filters.priceRange === '1cr-3cr') {
          params.append('min_price', '10000000');
          params.append('max_price', '30000000');
        } else if (filters.priceRange === '3cr-7cr') {
          params.append('min_price', '30000000');
          params.append('max_price', '70000000');
        } else if (filters.priceRange === '7cr-plus') {
          params.append('min_price', '70000000');
        }
      }

      const url = `http://127.0.0.1:5000/api/properties${params.toString() ? '?' + params.toString() : ''}`;
      const response = await fetch(url);
      if (response.ok) {
        const json = await response.json();
        if (json.data && json.data.length > 0) {
          setProperties(json.data);
          return;
        }
      }
    } catch (err) {
      console.warn('Backend server connecting...', err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  const handleToggleFavorite = (id) => {
    setFavorites((prev) => {
      let updated;
      if (prev.includes(id)) {
        updated = prev.filter((item) => item !== id);
        showToast('Removed property from wishlist.');
      } else {
        updated = [...prev, id];
        showToast('Saved property to your wishlist!');
      }
      try {
        localStorage.setItem('dreamhomes_favorites', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Select property handler navigates cleanly to the Property Details Page
  const handleSelectProperty = (prop) => {
    navigateTo('details', prop);
  };

  const handleSearch = () => {
    fetchProperties(searchFilters);
    const target = document.getElementById('featured-properties');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(`Filtering Mumbai properties for "${searchFilters.location || 'All Locations'}"`);
  };

  const handlePropertyAdded = () => {
    fetchProperties();
  };

  return (
    <div className="app-layout">
      {/* Top Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={navigateTo}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenPostProperty={() => setIsPostPropertyOpen(true)}
        onOpenUser={() => setIsUserModalOpen(true)}
      />

      {/* PAGE 1: Home Page */}
      {activePage === 'home' && (
        <HomePage
          properties={properties}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onSelectProperty={handleSelectProperty}
          searchFilters={searchFilters}
          setSearchFilters={setSearchFilters}
          onSearch={handleSearch}
          onNavigate={navigateTo}
        />
      )}

      {/* PAGE 2: Properties for Sale / Properties Listing Page */}
      {activePage === 'buy' && (
        <BuyPage
          properties={properties}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onSelectProperty={handleSelectProperty}
          onNavigateHome={() => navigateTo('home')}
          onShowToast={showToast}
        />
      )}

      {/* PAGE 3: Property Details Page (03_property_details) */}
      {activePage === 'details' && selectedProperty && (
        <PropertyDetailsPage
          property={selectedProperty}
          allProperties={properties}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onSelectProperty={handleSelectProperty}
          onNavigateHome={() => navigateTo('home')}
          onNavigateListing={() => navigateTo('buy')}
          onShowToast={showToast}
        />
      )}

      {/* PAGE 4: Rental Properties */}
      {activePage === 'rent' && (
        <RentPage
          properties={properties}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onSelectProperty={handleSelectProperty}
          onNavigateHome={() => navigateTo('home')}
        />
      )}

      {/* PAGE 5: Sell Property Valuation & Guide */}
      {activePage === 'sell' && (
        <SellPage
          onOpenPostProperty={() => setIsPostPropertyOpen(true)}
          onNavigate={(page) => navigateTo(page)}
        />
      )}

      {/* PAGE 6: List / Post Property Comprehensive Page */}
      {activePage === 'list-property' && (
        <ListPropertyPage
          onNavigate={(page) => navigateTo(page)}
          onShowToast={showToast}
          onPropertyAdded={handlePropertyAdded}
        />
      )}

      {/* PAGE 7: New Development Projects */}
      {activePage === 'projects' && (
        <ProjectsPage
          onNavigateHome={() => navigateTo('home')}
          onShowToast={showToast}
        />
      )}

      {/* PAGE 8: About Page */}
      {activePage === 'about' && (
        <AboutPage
          onNavigate={(page) => navigateTo(page)}
        />
      )}

      {/* PAGE 9: Contact Page */}
      {activePage === 'contact' && (
        <ContactPage 
          onShowToast={showToast} 
          onNavigateHome={() => navigateTo('home')}
        />
      )}

      {/* Dark Navy Footer */}
      <Footer onNavigate={(page) => navigateTo(page)} />

      {/* Post Property Modal Form */}
      {isPostPropertyOpen && (
        <PostPropertyModal
          onClose={() => setIsPostPropertyOpen(false)}
          onPropertyAdded={handlePropertyAdded}
          onShowToast={showToast}
        />
      )}

      {/* Favorites Modal List */}
      {isFavoritesOpen && (
        <FavoritesModal
          favorites={favorites}
          allProperties={properties}
          onClose={() => setIsFavoritesOpen(false)}
          onToggleFavorite={handleToggleFavorite}
          onSelectProperty={handleSelectProperty}
        />
      )}

      {/* User Login / Profile Modal */}
      {isUserModalOpen && (
        <UserModal
          onClose={() => setIsUserModalOpen(false)}
          onShowToast={showToast}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notice">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
