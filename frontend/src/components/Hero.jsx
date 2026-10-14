import React from 'react';
import SearchBar from './SearchBar';
import { Sparkles, Compass, PlusCircle } from 'lucide-react';
import heroBgImage from '../assets/luxury-balcony-sunset.jpg';

export default function Hero({ searchFilters, setSearchFilters, onSearch, onNavigate }) {
  const handleExplore = () => {
    const target = document.getElementById('featured-properties');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else if (onNavigate) {
      onNavigate('buy');
    }
  };

  const handleListProperty = () => {
    if (onNavigate) {
      onNavigate('list-property');
    }
  };

  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url('${heroBgImage}')` }}
      aria-label="Luxury Real Estate Hero Banner"
    >
      <div className="hero-overlay"></div>
      
      <div className="container hero-content">
        <div className="hero-badge-tag">
          <Sparkles size={14} />
          <span>Bespoke Luxury Real Estate</span>
        </div>

        <h1 className="hero-title">
          Find Your Dream Property
        </h1>

        <p className="hero-subtitle">
          Discover exceptional homes, luxury apartments, and investment opportunities.
        </p>

        {/* Clear Action Buttons */}
        <div className="hero-buttons">
          <button
            className="btn-hero-primary"
            onClick={handleExplore}
            id="btn-explore-properties"
            aria-label="Explore Properties"
          >
            <Compass size={18} />
            <span>Explore Properties</span>
          </button>
          
          <button
            className="btn-hero-secondary"
            onClick={handleListProperty}
            id="btn-list-property"
            aria-label="List Your Property"
          >
            <PlusCircle size={18} />
            <span>List Your Property</span>
          </button>
        </div>

        {/* Search Bar Component */}
        <SearchBar
          searchFilters={searchFilters}
          setSearchFilters={setSearchFilters}
          onSearch={onSearch}
        />
      </div>
    </section>
  );
}
