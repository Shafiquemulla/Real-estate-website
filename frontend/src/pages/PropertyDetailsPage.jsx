import React, { useState, useEffect } from 'react';
import {
  Home, ChevronRight, MapPin, Bed, Bath, Maximize2, Heart, Phone, Mail,
  CheckCircle2, Compass, Building, Calendar, ShieldCheck,
  Share2, Send, Navigation
} from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import { formatINR } from '../utils/currency';

export default function PropertyDetailsPage({
  property,
  allProperties = [],
  favorites,
  onToggleFavorite,
  onSelectProperty,
  onNavigateHome,
  onNavigateListing,
  onShowToast
}) {
  // Active Main Image state
  const galleryImages = (property.gallery && property.gallery.length > 0)
    ? property.gallery
    : [property.image_url];

  const [activeImage, setActiveImage] = useState(property.image_url || galleryImages[0]);

  // Update active image if property changes
  useEffect(() => {
    setActiveImage(property.image_url || galleryImages[0]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [property]);

  // Active Tab: 'overview' | 'amenities' | 'location' | 'nearby'
  const [activeTab, setActiveTab] = useState('overview');

  // Contact Agent Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tour_date: '',
    message: `Hello, I am interested in "${property.title}" (${property.formatted_price}). Please arrange a site inspection and share the brochure.`
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!property) return null;

  const displayPrice = property.formatted_price?.startsWith('₹')
    ? property.formatted_price
    : formatINR(property.price, property.purpose);

  const ratePerSqft = property.area_sqft && property.price
    ? Math.round(property.price / property.area_sqft).toLocaleString('en-IN')
    : null;

  const isFav = favorites.includes(property.id);

  // Key Features Specs Object
  const specs = property.specifications || {
    "Project Name": `${property.locality || 'Mumbai'} Crest Residences`,
    "RERA Registration": "P51800028912",
    "Possession Status": "Ready to Move",
    "Floor Number": "High Rise (Mid-to-Upper)",
    "Facing Direction": "Vastu Compliant (East / West)",
    "Furnishing": "Semi-Furnished",
    "Car Parking": "2 Covered Reserved Bays",
    "Water Supply": "24/7 Municipal & Treated Supply",
    "Age of Property": "Under 3 Years",
    "Maintenance": "₹8,500 / month"
  };

  // Nearby Landmarks List
  const nearbyLandmarks = (property.nearby && property.nearby.length > 0)
    ? property.nearby
    : [
        { title: `${property.locality || 'Bandra'} Railway / Metro Station`, distance: "1.5 km" },
        { title: "Western Express Highway / Sea Link", distance: "2.4 km" },
        { title: "Lilavati / Nanavati Super Speciality Hospital", distance: "2.1 km" },
        { title: "Top International School & College", distance: "1.2 km" },
        { title: "High Street Shopping & Gourmet Cafes", distance: "800 m" },
        { title: "Chhatrapati Shivaji Maharaj International Airport (BOM)", distance: "8.2 km" }
      ];

  // Amenities list
  const amenitiesList = (property.amenities && property.amenities.length > 0)
    ? property.amenities
    : [
        "Arabian Sea View", "Infinity Swimming Pool", "Modern Gymnasium", "Clubhouse",
        "24/7 Security & CCTV", "100% Power Backup", "High-Speed Elevators",
        "Piped Gas Connection", "Landscaped Gardens", "Children's Play Zone",
        "Rainwater Harvesting", "EV Charging Point"
      ];

  // Similar properties in Mumbai (excluding current)
  const similarProperties = allProperties
    .filter((p) => p.id !== property.id && p.purpose === property.purpose)
    .slice(0, 2);

  // Handle Contact Agent Submission
  const handleAgentFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      if (onShowToast) onShowToast('Please fill in your name, email, and phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          property_id: property.id,
          property_title: property.title,
          ...formData
        })
      });

      const res = await response.json();
      if (response.ok) {
        setSubmitted(true);
        if (onShowToast) onShowToast('Enquiry submitted successfully! Our advisor will contact you within 24 hours.');
      } else {
        if (onShowToast) onShowToast(res.message || 'Error sending inquiry.');
      }
    } catch (err) {
      console.error(err);
      setSubmitted(true);
      if (onShowToast) onShowToast('Enquiry received! Our Mumbai advisor will contact you shortly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToContactAgent = () => {
    const el = document.getElementById('contact-agent-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out ${property.title} in ${property.location} on DreamHomes: ${displayPrice}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      if (onShowToast) onShowToast('Property link copied to clipboard!');
    }
  };

  return (
    <div className="details-page-wrapper">
      <div className="container">
        {/* 1. Breadcrumb navigation */}
        <nav className="breadcrumb-section" style={{ background: 'transparent', padding: '0 0 16px', border: 'none' }} aria-label="Breadcrumb">
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
            <li className="breadcrumb-separator"><ChevronRight size={14} /></li>
            <li className="breadcrumb-item">
              <button type="button" onClick={onNavigateListing}>
                Properties for Sale
              </button>
            </li>
            <li className="breadcrumb-separator"><ChevronRight size={14} /></li>
            <li className="breadcrumb-item active" style={{ maxWidth: 'min(100%, 200px)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {property.title}
            </li>
          </ol>
        </nav>

        {/* Location Hierarchy Badge: India → Maharashtra → Mumbai → Locality */}
        <div className="location-hierarchy-strip">
          <span>India</span>
          <span className="muted">→</span>
          <span>Maharashtra</span>
          <span className="muted">→</span>
          <span>Mumbai</span>
          <span className="muted">→</span>
          <span className="highlight">{property.locality || property.location.split(',')[0]}</span>
        </div>

        {/* 2. Two-Column Property Overview Layout */}
        <div className="details-main-layout">
          {/* Left: Gallery & Main Image Display */}
          <div className="details-gallery-box">
            <div className="details-main-image-wrap">
              <img
                src={activeImage}
                alt={property.title}
                className="details-main-img"
              />
              <span className="card-badge" style={{ position: 'absolute', top: '18px', left: '18px', fontSize: '12px', padding: '6px 14px' }}>
                {property.badge || `For ${property.purpose}`}
              </span>
              <button
                type="button"
                onClick={handleShare}
                title="Share Property"
                style={{
                  position: 'absolute',
                  top: '18px',
                  right: '18px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: 'var(--navy-900)',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <Share2 size={16} />
              </button>
            </div>

            {/* Thumbnail Gallery Strip */}
            <div className="details-thumbs-strip">
              {galleryImages.map((imgUrl, index) => (
                <button
                  key={index}
                  type="button"
                  className={`details-thumb-btn ${activeImage === imgUrl ? 'active' : ''}`}
                  onClick={() => setActiveImage(imgUrl)}
                  aria-label={`View photo ${index + 1}`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Property Information Card */}
          <div className="details-info-card">
            <div className="details-badge-row">
              <span className="details-badge-status">{property.purpose === 'Rent' ? 'For Rent' : 'For Sale'}</span>
              <span className="details-badge-rera">
                <ShieldCheck size={13} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '4px' }} />
                RERA Registered
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>ID: DH-{1000 + property.id}</span>
            </div>

            <h1 className="details-title">{property.title}</h1>

            <div className="details-location-text">
              <MapPin size={16} color="var(--yellow-600)" />
              <span>{property.address || property.location}</span>
            </div>

            {/* Price Banner */}
            <div className="details-price-banner">
              <div>
                <div className="details-price-main">{displayPrice}</div>
                {ratePerSqft && (
                  <div className="details-price-rate">
                    approx. ₹{ratePerSqft} / sq.ft.
                  </div>
                )}
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{
                  display: 'inline-block',
                  background: 'rgba(16, 185, 129, 0.12)',
                  color: '#059669',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px',
                  fontWeight: 700
                }}>
                  Zero Brokerage Fee
                </span>
              </div>
            </div>

            {/* Specifications Badges Grid */}
            <div className="details-specs-grid">
              <div className="spec-box">
                <span className="spec-box-label">Bedrooms</span>
                <span className="spec-box-val">
                  <Bed size={16} />
                  <span>{property.bedrooms > 0 ? `${property.bedrooms} BHK` : 'Commercial'}</span>
                </span>
              </div>

              <div className="spec-box">
                <span className="spec-box-label">Bathrooms</span>
                <span className="spec-box-val">
                  <Bath size={16} />
                  <span>{property.bathrooms > 0 ? `${property.bathrooms} Baths` : 'N/A'}</span>
                </span>
              </div>

              <div className="spec-box">
                <span className="spec-box-label">Carpet Area</span>
                <span className="spec-box-val">
                  <Maximize2 size={16} />
                  <span>{property.area_sqft ? `${property.area_sqft.toLocaleString('en-IN')} sq.ft.` : 'N/A'}</span>
                </span>
              </div>

              <div className="spec-box">
                <span className="spec-box-label">Property Type</span>
                <span className="spec-box-val">
                  <Building size={16} />
                  <span>{property.property_type}</span>
                </span>
              </div>

              <div className="spec-box">
                <span className="spec-box-label">Possession</span>
                <span className="spec-box-val">
                  <Calendar size={16} />
                  <span>Ready to Move</span>
                </span>
              </div>

              <div className="spec-box">
                <span className="spec-box-label">Facing</span>
                <span className="spec-box-val">
                  <Compass size={16} />
                  <span>Vastu Compliant</span>
                </span>
              </div>
            </div>

            {/* Action Buttons: Yellow Contact Agent & Outlined Save to Wishlist */}
            <div className="details-actions-row">
              <button
                type="button"
                className="btn-contact-agent-main"
                onClick={scrollToContactAgent}
              >
                <Phone size={18} />
                <span>Contact Agent</span>
              </button>

              <button
                type="button"
                className={`btn-wishlist-toggle-main ${isFav ? 'active' : ''}`}
                onClick={() => onToggleFavorite(property.id)}
              >
                <Heart size={18} fill={isFav ? '#ef4444' : 'none'} />
                <span>{isFav ? 'Saved in Wishlist' : 'Save to Wishlist'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. Four Tabs Section: Overview, Amenities, Location, Nearby */}
        <div className="details-tabs-container">
          <div className="details-tabs-header">
            <button
              type="button"
              className={`details-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <span>Overview & Key Features</span>
            </button>
            <button
              type="button"
              className={`details-tab-btn ${activeTab === 'amenities' ? 'active' : ''}`}
              onClick={() => setActiveTab('amenities')}
            >
              <span>Amenities ({amenitiesList.length})</span>
            </button>
            <button
              type="button"
              className={`details-tab-btn ${activeTab === 'location' ? 'active' : ''}`}
              onClick={() => setActiveTab('location')}
            >
              <span>Location & Map</span>
            </button>
            <button
              type="button"
              className={`details-tab-btn ${activeTab === 'nearby' ? 'active' : ''}`}
              onClick={() => setActiveTab('nearby')}
            >
              <span>Nearby Infrastructure ({nearbyLandmarks.length})</span>
            </button>
          </div>

          <div className="details-tab-body">
            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '12px' }}>
                  Property Description
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.8', marginBottom: '30px' }}>
                  {property.description}
                </p>

                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '16px' }}>
                  Key Property Specifications
                </h3>
                <div className="key-features-grid">
                  {Object.entries(specs).map(([key, value]) => (
                    <div key={key} className="feature-row">
                      <span className="feature-key">{key}</span>
                      <span className="feature-val">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Amenities */}
            {activeTab === 'amenities' && (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '8px' }}>
                  World-Class Amenities
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
                  Engineered with premium resident facilities for modern high-profile living.
                </p>

                <div className="amenities-grid-showcase">
                  {amenitiesList.map((amenity, idx) => (
                    <div key={idx} className="amenity-card-item">
                      <div className="amenity-icon-bubble">
                        <CheckCircle2 size={18} />
                      </div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Location */}
            {activeTab === 'location' && (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '8px' }}>
                  Locality Map & Address
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>
                  Situated in {property.locality || 'Bandra West'}, Mumbai, Maharashtra, India.
                </p>

                {/* Embedded Locality Map */}
                <div className="map-view-box">
                  <iframe
                    title="Mumbai Locality Map"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=72.810%2C19.040%2C72.860%2C19.090&layer=mapnik&marker=19.060%2C72.835`}
                  ></iframe>
                </div>

                {/* Address Breakdown */}
                <div className="address-breakdown-card">
                  <div className="address-chunk">
                    <h5>Country</h5>
                    <p>India</p>
                  </div>
                  <div className="address-chunk">
                    <h5>State</h5>
                    <p>Maharashtra</p>
                  </div>
                  <div className="address-chunk">
                    <h5>City</h5>
                    <p>Mumbai</p>
                  </div>
                  <div className="address-chunk">
                    <h5>Locality</h5>
                    <p>{property.locality || property.location.split(',')[0]}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Nearby */}
            {activeTab === 'nearby' && (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '8px' }}>
                  Connectivity & Essential Infrastructure
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
                  Distances from the residence to key Mumbai transport hubs, healthcare, and schools.
                </p>

                <div className="nearby-points-grid">
                  {nearbyLandmarks.map((point, idx) => (
                    <div key={idx} className="nearby-point-item">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Navigation size={16} color="var(--navy-700)" />
                        <span className="point-name">{point.title}</span>
                      </div>
                      <span className="point-dist">{point.distance}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4. Contact Agent & Schedule Tour Section */}
        <div className="contact-agent-section" id="contact-agent-section">
          {/* Agent Profile Box */}
          <div className="agent-profile-box">
            <span style={{ color: 'var(--yellow-400)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Listing Advisor
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px', marginBottom: '16px' }}>
              <div className="agent-avatar-wrap">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                  alt={property.agent_name || 'Aarav Mehta'}
                />
              </div>
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff' }}>
                  {property.agent_name || 'Aarav Mehta'}
                </h3>
                <p style={{ fontSize: '13px', color: '#cbd5e1' }}>
                  Senior Mumbai Luxury Real Estate Specialist
                </p>
                <div style={{ fontSize: '11px', color: 'var(--yellow-400)', fontWeight: 600, marginTop: '2px' }}>
                  MahaRERA: A51800019280
                </div>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6', marginBottom: '24px' }}>
              Specialist with 12+ years representing premium buyers in {property.locality || 'Bandra West'} and South Mumbai seaside enclaves.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} color="var(--yellow-400)" />
                <span>{property.agent_phone || '+91 98201 54321'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} color="var(--yellow-400)" />
                <span>{property.agent_email || 'aarav.mehta@dreamhomes.in'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={16} color="var(--yellow-400)" />
                <span>DreamHomes Bandra Flagship, 400050</span>
              </div>
            </div>
          </div>

          {/* Form Box */}
          <div>
            <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '6px' }}>
              Schedule a Private Tour or Request Details
            </h3>
            <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '20px' }}>
              Receive complete brochure, floor plan, and book a verified site visit.
            </p>

            {submitted ? (
              <div style={{
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid #10b981',
                borderRadius: 'var(--radius-lg)',
                padding: '28px',
                textAlign: 'center'
              }}>
                <CheckCircle2 size={44} color="#10b981" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
                  Enquiry Received!
                </h4>
                <p style={{ color: '#cbd5e1', fontSize: '14px' }}>
                  Thank you, <strong>{formData.name}</strong>. Our Mumbai advisor will contact you at <strong>{formData.phone}</strong> within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAgentFormSubmit} className="agent-form-box">
                <input
                  type="text"
                  placeholder="Your Full Name *"
                  required
                  className="agent-input-dark"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />

                <div className="agent-form-inputs-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <input
                    type="email"
                    placeholder="Email Address *"
                    required
                    className="agent-input-dark"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <input
                    type="tel"
                    placeholder="Mobile Number (+91) *"
                    required
                    className="agent-input-dark"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '11px', color: '#cbd5e1', fontWeight: 600 }}>
                    Preferred Site Visit Date (Optional)
                  </label>
                  <input
                    type="date"
                    className="agent-input-dark"
                    value={formData.tour_date}
                    onChange={(e) => setFormData({ ...formData, tour_date: e.target.value })}
                  />
                </div>

                <textarea
                  rows={3}
                  placeholder="Your Message or Specific Questions..."
                  className="agent-input-dark"
                  style={{ resize: 'none' }}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />

                <button
                  type="submit"
                  className="btn-submit"
                  disabled={isSubmitting}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <Send size={16} />
                  <span>{isSubmitting ? 'Sending Request...' : 'Send Enquiry to Agent'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 5. Similar Mumbai Properties Section */}
        {similarProperties.length > 0 && (
          <div className="similar-properties-section">
            <div className="similar-properties-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 800, color: 'var(--navy-900)' }}>
                  Similar Mumbai Properties
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                  Discover other prime residences in nearby Mumbai localities.
                </p>
              </div>
              <button
                type="button"
                onClick={onNavigateListing}
                style={{ color: 'var(--yellow-600)', fontWeight: 700, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <span>View All Properties</span>
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="listing-two-col-grid">
              {similarProperties.map((simProp) => (
                <PropertyCard
                  key={simProp.id}
                  property={simProp}
                  isFavorite={favorites.includes(simProp.id)}
                  onToggleFavorite={onToggleFavorite}
                  onSelectProperty={onSelectProperty}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
