import React from 'react';
import { MapPin, Home, IndianRupee, Search } from 'lucide-react';

export default function SearchBar({
  searchFilters,
  setSearchFilters,
  onSearch
}) {
  const handleInputChange = (field, value) => {
    setSearchFilters((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch();
  };

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      {/* Location Field */}
      <div className="search-field-group">
        <div className="search-field-icon">
          <MapPin size={22} />
        </div>
        <div className="search-field-content">
          <label className="search-field-label">Location</label>
          <input
            type="text"
            className="search-input"
            placeholder="Search Mumbai, Bandra, Juhu, Worli..."
            value={searchFilters.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
          />
        </div>
      </div>

      {/* Property Type Field */}
      <div className="search-field-group">
        <div className="search-field-icon">
          <Home size={22} />
        </div>
        <div className="search-field-content">
          <label className="search-field-label">Property Type</label>
          <select
            className="search-select"
            value={searchFilters.propertyType}
            onChange={(e) => handleInputChange('propertyType', e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Independent House">Independent House</option>
            <option value="Plot">Plot</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>
      </div>

      {/* Price Range Field (Indian Currency - INR) */}
      <div className="search-field-group">
        <div className="search-field-icon">
          <IndianRupee size={22} />
        </div>
        <div className="search-field-content">
          <label className="search-field-label">Price Range</label>
          <select
            className="search-select"
            value={searchFilters.priceRange}
            onChange={(e) => handleInputChange('priceRange', e.target.value)}
          >
            <option value="All">Any Price</option>
            <option value="under-1cr">Under ₹1 Cr</option>
            <option value="1cr-3cr">₹1 Cr - ₹3 Cr</option>
            <option value="3cr-7cr">₹3 Cr - ₹7 Cr</option>
            <option value="7cr-plus">₹7 Cr+ (Ultra Luxury)</option>
            <option value="under-50k">Under ₹50,000/mo (Rent)</option>
            <option value="50k-1lakh">₹50,000 - ₹1 Lakh/mo (Rent)</option>
            <option value="1lakh-plus">₹1 Lakh+/mo (Rent)</option>
          </select>
        </div>
      </div>

      {/* Search Button */}
      <button type="submit" className="search-btn">
        <Search size={18} strokeWidth={2.5} />
        <span>Search</span>
      </button>
    </form>
  );
}
