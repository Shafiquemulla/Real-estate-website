import React, { useState, useMemo } from 'react';
import PropertyCard from '../components/PropertyCard';
import { 
  Home, 
  Search, 
  SlidersHorizontal, 
  ArrowUpDown, 
  ShieldCheck, 
  Clock, 
  FileText, 
  Sparkles,
  CheckCircle2,
  X
} from 'lucide-react';

export default function RentPage({
  properties,
  favorites,
  onToggleFavorite,
  onSelectProperty,
  onNavigateHome
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [rentPricePreset, setRentPricePreset] = useState('All');
  const [selectedBhk, setSelectedBhk] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  // Filter & sort logic for rental properties
  const filteredRentals = useMemo(() => {
    return properties.filter((p) => {
      // Must be Rent
      if (p.purpose !== 'Rent') return false;

      // Search keyword (title, location, locality)
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesQuery = 
          p.title.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query) ||
          (p.locality && p.locality.toLowerCase().includes(query)) ||
          (p.city && p.city.toLowerCase().includes(query));
        if (!matchesQuery) return false;
      }

      // Property Type
      if (filterType !== 'All') {
        if (p.property_type.toLowerCase() !== filterType.toLowerCase()) {
          return false;
        }
      }

      // Rent Price Presets (Monthly)
      if (rentPricePreset !== 'All') {
        if (rentPricePreset === 'under-50k' && p.price >= 50000) return false;
        if (rentPricePreset === '50k-1lakh' && (p.price < 50000 || p.price > 100000)) return false;
        if (rentPricePreset === '1lakh-2lakh' && (p.price < 100000 || p.price > 200000)) return false;
        if (rentPricePreset === '2lakh-plus' && p.price < 200000) return false;
      }

      // Bedrooms (BHK)
      if (selectedBhk !== 'All') {
        const bhkNum = parseInt(selectedBhk, 10);
        if (bhkNum === 4) {
          if (p.bedrooms < 4) return false;
        } else {
          if (p.bedrooms !== bhkNum) return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'area_desc') return b.area_sqft - a.area_sqft;
      if (sortBy === 'newest') return b.id - a.id;
      return b.is_featured - a.is_featured;
    });
  }, [properties, searchTerm, filterType, rentPricePreset, selectedBhk, sortBy]);

  const activeFilterCount = 
    (searchTerm ? 1 : 0) + 
    (filterType !== 'All' ? 1 : 0) + 
    (rentPricePreset !== 'All' ? 1 : 0) + 
    (selectedBhk !== 'All' ? 1 : 0);

  const handleResetFilters = () => {
    setSearchTerm('');
    setFilterType('All');
    setRentPricePreset('All');
    setSelectedBhk('All');
    setSortBy('featured');
  };

  return (
    <div className="rent-page" style={{ paddingBottom: '90px' }}>
      {/* 1. Page Hero Banner */}
      <div 
        style={{
          position: 'relative',
          background: 'linear-gradient(rgba(11, 21, 40, 0.88), rgba(7, 13, 24, 0.94)), url("https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80") center/cover no-repeat',
          padding: '60px 0 50px',
          color: '#ffffff',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: '16px' }}>
            <span 
              onClick={onNavigateHome} 
              style={{ cursor: 'pointer', color: 'var(--yellow-400)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <Home size={14} /> Home
            </span>
            <span className="breadcrumb-separator" style={{ margin: '0 8px', color: 'rgba(255, 255, 255, 0.4)' }}>/</span>
            <span className="breadcrumb-current" style={{ color: '#e2e8f0' }}>Properties For Rent</span>
          </nav>

          <div style={{ maxWidth: '780px' }}>
            <span style={{ 
              background: 'rgba(245, 158, 11, 0.15)', 
              color: 'var(--yellow-400)', 
              border: '1px solid rgba(245, 158, 11, 0.3)', 
              padding: '4px 12px', 
              borderRadius: 'var(--radius-full)', 
              fontSize: '12px', 
              fontWeight: 700, 
              display: 'inline-flex', 
              alignItems: 'center',
              gap: '6px',
              marginBottom: '12px', 
              textTransform: 'uppercase', 
              letterSpacing: '0.8px' 
            }}>
              <Sparkles size={13} />
              Mumbai Verified Rentals
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '38px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2, marginBottom: '12px' }}>
              Properties For Rent in Mumbai
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '16px', lineHeight: 1.6 }}>
              Explore luxury sea-facing flats, corporate executive suites in BKC, and serviced family apartments across Mumbai with verified landlords and zero stress.
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '36px' }}>
        {/* 2. Interactive Filter Control Center */}
        <div 
          style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            padding: '24px 28px',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-md)',
            marginBottom: '32px'
          }}
        >
          {/* Row 1: Search and Sort */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              background: '#f8fafc', 
              border: '1px solid var(--border-light)', 
              borderRadius: 'var(--radius-md)', 
              padding: '10px 16px', 
              flex: 1, 
              minWidth: '260px' 
            }}>
              <Search size={18} color="var(--text-muted)" />
              <input 
                type="text" 
                placeholder="Search rentals by locality (Bandra, BKC, Powai, Worli)..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ border: 'none', background: 'transparent', width: '100%', fontSize: '14px', outline: 'none' }}
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} style={{ color: 'var(--text-muted)' }}>
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Sort Select */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <ArrowUpDown size={14} /> Sort By:
              </span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select"
                style={{ minWidth: '170px', padding: '9px 14px', fontSize: '13px' }}
              >
                <option value="featured">Featured / Recommended</option>
                <option value="price_asc">Rent: Low to High</option>
                <option value="price_desc">Rent: High to Low</option>
                <option value="area_desc">Carpet Area: Largest</option>
                <option value="newest">Recently Listed</option>
              </select>
            </div>
          </div>

          {/* Row 2: Property Type & Monthly Budget Presets */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
            {/* Property Types */}
            <div>
              <span style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--navy-900)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                Property Type
              </span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['All', 'Apartment', 'Villa', 'Commercial'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    style={{
                      padding: '7px 14px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '13px',
                      fontWeight: 600,
                      background: filterType === type ? 'var(--navy-900)' : '#f1f5f9',
                      color: filterType === type ? '#ffffff' : 'var(--text-secondary)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Monthly Budget Presets */}
            <div>
              <span style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--navy-900)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                Monthly Budget
              </span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {[
                  { id: 'All', label: 'All Budgets' },
                  { id: 'under-50k', label: '< ₹50k' },
                  { id: '50k-1lakh', label: '₹50k - ₹1L' },
                  { id: '1lakh-2lakh', label: '₹1L - ₹2L' },
                  { id: '2lakh-plus', label: '₹2L+' }
                ].map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setRentPricePreset(preset.id)}
                    style={{
                      padding: '7px 12px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '12px',
                      fontWeight: 600,
                      background: rentPricePreset === preset.id ? 'var(--yellow-500)' : '#f1f5f9',
                      color: rentPricePreset === preset.id ? '#ffffff' : 'var(--text-secondary)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bedrooms (BHK) */}
            <div>
              <span style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--navy-900)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                Bedrooms (BHK)
              </span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {[
                  { id: 'All', label: 'All' },
                  { id: '1', label: '1 BHK' },
                  { id: '2', label: '2 BHK' },
                  { id: '3', label: '3 BHK' },
                  { id: '4', label: '4+ BHK' }
                ].map((bhk) => (
                  <button
                    key={bhk.id}
                    onClick={() => setSelectedBhk(bhk.id)}
                    style={{
                      padding: '7px 12px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '12px',
                      fontWeight: 600,
                      background: selectedBhk === bhk.id ? 'var(--navy-900)' : '#f1f5f9',
                      color: selectedBhk === bhk.id ? '#ffffff' : 'var(--text-secondary)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {bhk.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Filters Bar */}
          {activeFilterCount > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', flexWrap: 'wrap', gap: '10px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Active filters applied ({activeFilterCount})
              </span>
              <button 
                onClick={handleResetFilters}
                style={{ fontSize: '13px', color: 'var(--yellow-600)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <X size={14} /> Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* 3. Results Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--navy-900)', fontFamily: 'var(--font-display)' }}>
              Available Rental Homes in Mumbai MMR
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '2px' }}>
              Showing {filteredRentals.length} verified {filteredRentals.length === 1 ? 'property' : 'properties'} for rent
            </p>
          </div>
        </div>

        {/* 4. Properties Grid or Empty State */}
        {filteredRentals.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '70px 24px', 
            background: '#ffffff', 
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-light)'
          }}>
            <SlidersHorizontal size={40} color="var(--yellow-600)" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '8px' }}>
              No Rental Properties Match Your Criteria
            </h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 20px', fontSize: '14px', lineHeight: 1.6 }}>
              We could not find any active listings matching your current budget or locality filters. Try resetting the filters or check back as new rentals are added daily.
            </p>
            <button 
              onClick={handleResetFilters}
              className="btn-primary"
              style={{ display: 'inline-flex', padding: '10px 22px', fontSize: '14px' }}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="properties-grid">
            {filteredRentals.map((property) => (
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

        {/* 5. Trust / Why Rent with ESTATEPRO */}
        <div style={{ 
          marginTop: '70px', 
          background: '#ffffff', 
          borderRadius: 'var(--radius-xl)', 
          padding: '40px 32px', 
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 36px' }}>
            <span style={{ color: 'var(--yellow-600)', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              The ESTATEPRO Standard
            </span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 800, color: 'var(--navy-900)', marginTop: '4px' }}>
              Why Rent Your Next Mumbai Home with Us
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ShieldCheck size={22} color="var(--yellow-600)" />
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '4px' }}>
                  100% Owner Verified
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.5 }}>
                  Every apartment is visited, photographed, and verified with ownership papers. Zero duplicate or ghost listings.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FileText size={22} color="var(--yellow-600)" />
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '4px' }}>
                  Doorstep Digital Agreement
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.5 }}>
                  Hassle-free registered rent agreement and police verification handled at your doorstep or via biometric e-sign.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Clock size={22} color="var(--yellow-600)" />
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '4px' }}>
                  Instant Site Visits
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.5 }}>
                  Schedule accompanied visits at your convenience with our local Mumbai area specialists.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <CheckCircle2 size={22} color="var(--yellow-600)" />
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '4px' }}>
                  Move-In Guarantee
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.5 }}>
                  Pre-inspected plumbing, electrical fittings, and deep-cleaned homes before keys are handed over.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
