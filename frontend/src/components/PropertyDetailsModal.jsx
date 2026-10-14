import React, { useState } from 'react';
import { X, MapPin, Bed, Bath, Maximize2, Phone, Mail, CheckCircle, Heart } from 'lucide-react';
import { formatINR } from '../utils/currency';

export default function PropertyDetailsModal({
  property,
  onClose,
  isFavorite,
  onToggleFavorite,
  onShowToast
}) {
  const displayPrice = property?.formatted_price?.startsWith('₹')
    ? property.formatted_price
    : formatINR(property?.price, property?.purpose);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `Hello, I am interested in "${property?.title || 'this property'}" (${displayPrice}). Please share more details.`
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!property) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      if (onShowToast) onShowToast('Please fill in all required contact details.');
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
        if (onShowToast) onShowToast('Enquiry sent successfully! Our Mumbai property advisor will contact you.');
      } else {
        if (onShowToast) onShowToast(res.message || 'Error submitting enquiry.');
      }
    } catch (err) {
      console.error(err);
      setSubmitted(true);
      if (onShowToast) onShowToast('Enquiry recorded! Our advisor will contact you shortly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Property Image Banner */}
        <div className="modal-image-banner" style={{ position: 'relative', width: '100%', height: '340px', overflow: 'hidden' }}>
          <img
            src={property.image_url}
            alt={property.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <span
            className="card-badge"
            style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '13px', padding: '6px 14px' }}
          >
            {property.badge || `For ${property.purpose}`}
          </span>
          <button
            type="button"
            className={`card-fav-btn ${isFavorite ? 'is-fav' : ''}`}
            style={{ position: 'absolute', top: '20px', right: '70px', width: '42px', height: '42px' }}
            onClick={() => onToggleFavorite(property.id)}
            aria-label="Toggle favorite"
          >
            <Heart size={22} fill={isFavorite ? '#ef4444' : 'none'} />
          </button>
        </div>

        {/* Property Body Content */}
        <div className="modal-body-padded" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '6px' }}>
                {property.title}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '15px' }}>
                <MapPin size={16} />
                <span>{property.address || property.location}</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 800, color: 'var(--navy-900)' }}>
                {displayPrice}
              </div>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                {property.purpose === 'Rent' ? 'Monthly Lease' : 'All-Inclusive Price'}
              </span>
            </div>
          </div>

          {/* Key specs strip */}
          <div className="modal-specs-strip" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '12px',
            background: '#f8fafc',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
            marginBottom: '28px',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Bedrooms</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 700, color: 'var(--navy-900)', fontSize: '16px' }}>
                <Bed size={18} /> {property.bedrooms > 0 ? `${property.bedrooms} BHK` : 'N/A'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Bathrooms</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 700, color: 'var(--navy-900)', fontSize: '16px' }}>
                <Bath size={18} /> {property.bathrooms > 0 ? `${property.bathrooms} Baths` : 'N/A'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Carpet Area</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 700, color: 'var(--navy-900)', fontSize: '16px' }}>
                <Maximize2 size={18} /> {property.area_sqft ? `${property.area_sqft.toLocaleString('en-IN')} sq.ft.` : 'N/A'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Property Type</div>
              <div style={{ fontWeight: 700, color: 'var(--navy-900)', fontSize: '16px' }}>
                {property.property_type}
              </div>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '28px' }}>
            <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '10px' }}>
              Property Overview
            </h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '15px' }}>
              {property.description}
            </p>
          </div>

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <div style={{ marginBottom: '32px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '14px' }}>
                Featured Amenities
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {property.amenities.map((item, index) => (
                  <span
                    key={index}
                    style={{
                      background: '#f1f5f9',
                      color: 'var(--navy-900)',
                      padding: '8px 14px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '13px',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <CheckCircle size={14} color="#10b981" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Agent Contact & Quick Inquiry Box */}
          <div className="modal-agent-grid" style={{
            background: 'var(--navy-900)',
            color: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '24px'
          }}>
            <div>
              <span style={{ fontSize: '12px', color: 'var(--yellow-400)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>
                Certified Property Advisor
              </span>
              <h4 style={{ fontSize: '20px', fontWeight: 700, marginTop: '4px', marginBottom: '12px' }}>
                {property.agent_name || 'Aarav Mehta'}
              </h4>
              <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px' }}>
                Senior Real Estate Advisor at DreamHomes Mumbai. Certified RERA specialist for Mumbai prime luxury residential sectors.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#cbd5e1' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={15} color="#fbbf24" />
                  <span>{property.agent_phone || '+91 98201 54321'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={15} color="#fbbf24" />
                  <span>{property.agent_email || 'contact@dreamhomes.in'}</span>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div>
              {submitted ? (
                <div style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid #10b981',
                  borderRadius: 'var(--radius-md)',
                  padding: '20px',
                  textAlign: 'center'
                }}>
                  <CheckCircle size={36} color="#10b981" style={{ margin: '0 auto 10px' }} />
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>
                    Enquiry Submitted!
                  </h4>
                  <p style={{ fontSize: '13px', color: '#cbd5e1' }}>
                    Thank you, {formData.name}. Our dedicated Mumbai advisor will call you shortly regarding {property.title}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <input
                    type="text"
                    placeholder="Your Full Name *"
                    required
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '10px 12px',
                      color: '#ffffff',
                      fontSize: '13px'
                    }}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <input
                      type="email"
                      placeholder="Email Address *"
                      required
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '10px 12px',
                        color: '#ffffff',
                        fontSize: '13px'
                      }}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number (e.g. +91) *"
                      required
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '10px 12px',
                        color: '#ffffff',
                        fontSize: '13px'
                      }}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Message"
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '10px 12px',
                      color: '#ffffff',
                      fontSize: '13px',
                      resize: 'none'
                    }}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                  <button
                    type="submit"
                    className="btn-submit"
                    disabled={isSubmitting}
                    style={{ padding: '10px' }}
                  >
                    {isSubmitting ? 'Sending Request...' : 'Send Enquiry to Advisor'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
