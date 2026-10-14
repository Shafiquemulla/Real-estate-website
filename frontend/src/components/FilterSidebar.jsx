import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { formatINR } from '../utils/currency';

export default function FilterSidebar({
  filters,
  setFilters,
  onApplyFilters,
  onResetFilters,
  isMobileOpen,
  propertyCountsByType = {},
  propertyCountsByBhk = {}
}) {
  const propertyTypesList = [
    'Apartment',
    'Villa',
    'Independent House',
    'Plot',
    'Commercial'
  ];

  const bedroomsList = [
    { label: '1 BHK', value: 1 },
    { label: '2 BHK', value: 2 },
    { label: '3 BHK', value: 3 },
    { label: '4 BHK', value: 4 },
    { label: '5+ BHK', value: 5 }
  ];

  const handleTypeToggle = (type) => {
    setFilters((prev) => {
      const exists = prev.propertyTypes.includes(type);
      return {
        ...prev,
        propertyTypes: exists
          ? prev.propertyTypes.filter((t) => t !== type)
          : [...prev.propertyTypes, type]
      };
    });
  };

  const handleBhkToggle = (bhk) => {
    setFilters((prev) => {
      const exists = prev.bedrooms.includes(bhk);
      return {
        ...prev,
        bedrooms: exists
          ? prev.bedrooms.filter((b) => b !== bhk)
          : [...prev.bedrooms, bhk]
      };
    });
  };

  const handlePriceSliderChange = (e) => {
    const val = Number(e.target.value);
    setFilters((prev) => ({
      ...prev,
      maxPrice: val
    }));
  };

  return (
    <aside className={`filter-sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
      {/* Sidebar Header */}
      <div className="filter-header">
        <div className="filter-header-title">
          <SlidersHorizontal size={18} />
          <span>Filters</span>
        </div>
        <button
          type="button"
          className="btn-clear-filters"
          onClick={onResetFilters}
          title="Reset all filters"
        >
          Reset All
        </button>
      </div>

      {/* 1. Property Type */}
      <div className="filter-section">
        <h3 className="filter-section-title">Property Type</h3>
        <div className="filter-options-list">
          {propertyTypesList.map((type) => {
            const isChecked = filters.propertyTypes.includes(type);
            const count = propertyCountsByType[type];
            return (
              <label key={type} className="filter-checkbox-label">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleTypeToggle(type)}
                />
                <span>{type}</span>
                {count !== undefined && <span className="filter-count-badge">{count}</span>}
              </label>
            );
          })}
        </div>
      </div>

      {/* 2. Price Range (Indian Currency - INR) */}
      <div className="filter-section">
        <h3 className="filter-section-title">Price Range</h3>
        <div className="price-slider-wrap">
          <div className="price-values-row">
            <span>Min: {formatINR(filters.minPrice)}</span>
            <span>Max: {formatINR(filters.maxPrice)}</span>
          </div>
          <input
            type="range"
            min="2000000"
            max="150000000"
            step="1000000"
            value={filters.maxPrice}
            onChange={handlePriceSliderChange}
            className="price-range-slider"
          />
          <div className="filter-inputs-row">
            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Min (₹)</span>
              <input
                type="number"
                className="filter-mini-input"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
              />
            </div>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Max (₹)</span>
              <input
                type="number"
                className="filter-mini-input"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bedrooms (BHK) */}
      <div className="filter-section">
        <h3 className="filter-section-title">Bedrooms</h3>
        <div className="filter-options-list">
          {bedroomsList.map((bhk) => {
            const isChecked = filters.bedrooms.includes(bhk.value);
            const count = propertyCountsByBhk[bhk.value];
            return (
              <label key={bhk.value} className="filter-checkbox-label">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleBhkToggle(bhk.value)}
                />
                <span>{bhk.label}</span>
                {count !== undefined && <span className="filter-count-badge">{count}</span>}
              </label>
            );
          })}
        </div>
      </div>

      {/* 4. Area (Sq.Ft.) */}
      <div className="filter-section">
        <h3 className="filter-section-title">Area (Sq.Ft.)</h3>
        <div className="filter-inputs-row">
          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Min Sq.Ft.</span>
            <input
              type="number"
              className="filter-mini-input"
              placeholder="e.g. 500"
              value={filters.minArea || ''}
              onChange={(e) => setFilters({ ...filters, minArea: e.target.value })}
            />
          </div>
          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Max Sq.Ft.</span>
            <input
              type="number"
              className="filter-mini-input"
              placeholder="e.g. 5000"
              value={filters.maxArea || ''}
              onChange={(e) => setFilters({ ...filters, maxArea: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* 5. Apply Filters Button */}
      <button
        type="button"
        className="btn-apply-filters"
        onClick={onApplyFilters}
      >
        Apply Filters
      </button>
    </aside>
  );
}
