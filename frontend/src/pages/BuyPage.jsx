import React, { useState, useMemo } from 'react';
import PropertyCard from '../components/PropertyCard';
import FilterSidebar from '../components/FilterSidebar';
import SearchBar from '../components/SearchBar';
import { Home, ChevronRight, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export default function BuyPage({
  properties,
  favorites,
  onToggleFavorite,
  onSelectProperty,
  onNavigateHome,
  onShowToast
}) {
  // Skyline banner image
  const skylineBannerUrl = 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1920&q=80';

  // Search Bar Filter state
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    propertyType: 'All',
    priceRange: 'All'
  });

  // Left Sidebar Filter state
  const [sidebarFilters, setSidebarFilters] = useState({
    propertyTypes: [],
    minPrice: 2000000,
    maxPrice: 150000000,
    bedrooms: [],
    minArea: '',
    maxArea: ''
  });

  // Sort State
  const [sortBy, setSortBy] = useState('featured');

  // Mobile Filter Drawer State
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Compute counts by property type and bedrooms for the sidebar
  const { typeCounts, bhkCounts } = useMemo(() => {
    const tCounts = {};
    const bCounts = {};
    properties.forEach((p) => {
      if (p.purpose === 'Buy') {
        tCounts[p.property_type] = (tCounts[p.property_type] || 0) + 1;
        if (p.bedrooms >= 5) {
          bCounts[5] = (bCounts[5] || 0) + 1;
        } else if (p.bedrooms > 0) {
          bCounts[p.bedrooms] = (bCounts[p.bedrooms] || 0) + 1;
        }
      }
    });
    return { typeCounts: tCounts, bhkCounts: bCounts };
  }, [properties]);

  // Combined filtering logic
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // Must be Buy property
      if (p.purpose !== 'Buy') return false;

      // 1. Search Bar: Location
      if (searchFilters.location) {
        const query = searchFilters.location.toLowerCase();
        const matchesLoc =
          p.location.toLowerCase().includes(query) ||
          p.title.toLowerCase().includes(query) ||
          (p.city && p.city.toLowerCase().includes(query));
        if (!matchesLoc) return false;
      }

      // 2. Search Bar: Property Type
      if (searchFilters.propertyType && searchFilters.propertyType !== 'All') {
        if (p.property_type.toLowerCase() !== searchFilters.propertyType.toLowerCase()) {
          return false;
        }
      }

      // 3. Search Bar: Price Range Preset
      if (searchFilters.priceRange && searchFilters.priceRange !== 'All') {
        if (searchFilters.priceRange === 'under-1cr' && p.price >= 10000000) return false;
        if (searchFilters.priceRange === '1cr-3cr' && (p.price < 10000000 || p.price > 30000000)) return false;
        if (searchFilters.priceRange === '3cr-7cr' && (p.price < 30000000 || p.price > 70000000)) return false;
        if (searchFilters.priceRange === '7cr-plus' && p.price < 70000000) return false;
      }

      // 4. Sidebar: Property Type checkboxes
      if (sidebarFilters.propertyTypes.length > 0) {
        if (!sidebarFilters.propertyTypes.includes(p.property_type)) {
          return false;
        }
      }

      // 5. Sidebar: Price Min & Max
      if (sidebarFilters.minPrice && p.price < sidebarFilters.minPrice) {
        return false;
      }
      if (sidebarFilters.maxPrice && p.price > sidebarFilters.maxPrice) {
        return false;
      }

      // 6. Sidebar: Bedrooms checkboxes (1, 2, 3, 4, 5+)
      if (sidebarFilters.bedrooms.length > 0) {
        const matchesBed = sidebarFilters.bedrooms.some((b) => {
          if (b === 5) return p.bedrooms >= 5;
          return p.bedrooms === b;
        });
        if (!matchesBed) return false;
      }

      // 7. Sidebar: Area min & max
      if (sidebarFilters.minArea && p.area_sqft < Number(sidebarFilters.minArea)) {
        return false;
      }
      if (sidebarFilters.maxArea && p.area_sqft > Number(sidebarFilters.maxArea)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'area_desc') return b.area_sqft - a.area_sqft;
      if (sortBy === 'newest') return b.id - a.id;
      return b.is_featured - a.is_featured;
    });
  }, [properties, searchFilters, sidebarFilters, sortBy]);

  const handleApplySidebarFilters = () => {
    setMobileFilterOpen(false);
    if (onShowToast) {
      onShowToast(`Filters applied! Showing ${filteredProperties.length} matching properties.`);
    }
  };

  const handleResetFilters = () => {
    setSearchFilters({
      location: '',
      propertyType: 'All',
      priceRange: 'All'
    });
    setSidebarFilters({
      propertyTypes: [],
      minPrice: 2000000,
      maxPrice: 150000000,
      bedrooms: [],
      minArea: '',
      maxArea: ''
    });
    setSortBy('featured');
    if (onShowToast) {
      onShowToast('All filters have been reset.');
    }
  };

  const handleSearchSubmit = () => {
    if (onShowToast) {
      onShowToast(`Search updated for "${searchFilters.location || 'All Locations'}"`);
    }
  };

  return (
    <div className="properties-listing-page">
      {/* 1. Breadcrumb navigation below navbar */}
      <nav className="breadcrumb-section" aria-label="Breadcrumb">
        <div className="container">
          <ol className="breadcrumb-list">
            <li className="breadcrumb-item">
              <button
                type="button"
                onClick={onNavigateHome}
                style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Home size={14} />
                <span>Home</span>
              </button>
            </li>
            <li className="breadcrumb-separator">
              <ChevronRight size={14} />
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Properties for Sale
            </li>
          </ol>
        </div>
      </nav>

      {/* 2. City Skyline Banner & Heading */}
      <section
        className="listing-hero-banner"
        style={{ backgroundImage: `url('${skylineBannerUrl}')` }}
      >
        <div className="listing-hero-overlay"></div>
        <div className="container listing-hero-content">
          <h1 className="listing-hero-title">
            Properties for Sale
          </h1>
          <p className="listing-hero-subtitle">
            Explore verified luxury apartments, independent houses, and villas in prime Mumbai locations with transparent pricing and verified documents.
          </p>

          {/* 3. Horizontal Search Bar embedded on banner */}
          <div className="listing-search-wrap">
            <SearchBar
              searchFilters={searchFilters}
              setSearchFilters={setSearchFilters}
              onSearch={handleSearchSubmit}
            />
          </div>
        </div>
      </section>

      {/* 4. Two-Column Content Layout: Left Sidebar + Right Grid */}
      <section className="listing-content-section">
        <div className="container">
          {/* Mobile Filter Toggle */}
          <button
            type="button"
            className="mobile-filter-toggle"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          >
            <SlidersHorizontal size={18} />
            <span>{mobileFilterOpen ? 'Hide Filters' : 'Show Filters Sidebar'}</span>
          </button>

          <div className="listing-layout">
            {/* Left Filter Sidebar */}
            <FilterSidebar
              filters={sidebarFilters}
              setFilters={setSidebarFilters}
              onApplyFilters={handleApplySidebarFilters}
              onResetFilters={handleResetFilters}
              isMobileOpen={mobileFilterOpen}
              propertyCountsByType={typeCounts}
              propertyCountsByBhk={bhkCounts}
            />

            {/* Right Side: Property Listing Area */}
            <main className="listing-results-container">
              {/* Toolbar: Result count + Sort dropdown */}
              <div className="listing-toolbar">
                <div className="results-summary">
                  Showing <strong>{filteredProperties.length}</strong> of <strong>{properties.filter(p => p.purpose === 'Buy').length}</strong> Properties in Mumbai
                </div>

                <div className="listing-sort-box">
                  <ArrowUpDown size={15} />
                  <span>Sort By:</span>
                  <select
                    className="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="featured">Featured First</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="area_desc">Area: Largest First</option>
                    <option value="newest">Newest Listed</option>
                  </select>
                </div>
              </div>

              {/* TWO-COLUMN PROPERTY CARD GRID */}
              {filteredProperties.length === 0 ? (
                <div className="empty-results-box">
                  <h3 style={{ fontSize: '20px', color: 'var(--navy-900)', marginBottom: '8px', fontWeight: 800 }}>
                    No Properties Found
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '400px', margin: '0 auto 20px' }}>
                    We could not find any properties matching your current filter settings. Try relaxing your filters or resetting them.
                  </p>
                  <button
                    type="button"
                    className="btn-apply-filters"
                    style={{ maxWidth: '200px', margin: '0 auto' }}
                    onClick={handleResetFilters}
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="listing-two-col-grid">
                  {filteredProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      isFavorite={favorites.includes(property.id)}
                      onToggleFavorite={onToggleFavorite}
                      onSelectProperty={onSelectProperty}
                    />
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}
