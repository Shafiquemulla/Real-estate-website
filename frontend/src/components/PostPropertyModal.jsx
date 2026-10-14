import React, { useState } from 'react';
import { X, Building, AlertCircle } from 'lucide-react';
import { formatINR } from '../utils/currency';

export default function PostPropertyModal({
  onClose,
  onPropertyAdded,
  onShowToast
}) {
  const [formData, setFormData] = useState({
    title: '',
    property_type: 'Apartment',
    purpose: 'Buy',
    location: '',
    price: '',
    bedrooms: 3,
    bathrooms: 2,
    area_sqft: 1400,
    image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: '',
    contact_name: '',
    contact_email: '',
    contact_phone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const presetImages = [
    { label: 'Sea-Facing Flat', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Worli Penthouse', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Juhu Luxury Villa', url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Powai Garden Home', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80' },
  ];

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.location || !formData.price || !formData.contact_name || !formData.contact_email || !formData.contact_phone) {
      setError('Please fill in all mandatory fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const res = await response.json();
      if (response.ok) {
        if (onShowToast) onShowToast(`Property posted successfully! Listed at ${formatINR(formData.price, formData.purpose)}.`);
        if (onPropertyAdded) onPropertyAdded();
        onClose();
      } else {
        setError(res.message || 'Failed to submit property.');
      }
    } catch (err) {
      console.error(err);
      setError('Could not connect to backend server. Make sure Python Flask is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div style={{ padding: '32px 32px 20px', borderBottom: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--yellow-600)', marginBottom: '6px' }}>
            <Building size={24} />
            <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              List with DreamHomes Mumbai
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 800, color: 'var(--navy-900)' }}>
            Post Your Property (Free Listing)
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
            Connect directly with verified buyers & tenants looking for homes across Mumbai MMR.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '28px 32px 32px' }}>
          {error && (
            <div style={{
              background: '#fee2e2',
              border: '1px solid #ef4444',
              color: '#b91c1c',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '13px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <div className="form-grid">
            <div className="form-group form-full">
              <label className="form-label">Property Title *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 3 BHK Sea-Facing High Floor Apartment"
                required
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Property Type</label>
              <select
                className="form-select"
                value={formData.property_type}
                onChange={(e) => handleChange('property_type', e.target.value)}
              >
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Independent House">Independent House</option>
                <option value="Plot">Plot</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Listing Purpose</label>
              <select
                className="form-select"
                value={formData.purpose}
                onChange={(e) => handleChange('purpose', e.target.value)}
              >
                <option value="Buy">For Sale</option>
                <option value="Rent">For Rent</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Location (Locality, Mumbai) *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Bandra West, Mumbai"
                required
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Price in Indian Rupees (₹) *
                {formData.price && (
                  <span style={{ color: 'var(--yellow-600)', fontWeight: 700, marginLeft: '6px' }}>
                    ({formatINR(formData.price, formData.purpose)})
                  </span>
                )}
              </label>
              <input
                type="number"
                className="form-input"
                placeholder="e.g. 25000000 for ₹2.50 Cr"
                required
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Bedrooms (BHK)</label>
              <input
                type="number"
                className="form-input"
                min="0"
                value={formData.bedrooms}
                onChange={(e) => handleChange('bedrooms', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Bathrooms</label>
              <input
                type="number"
                className="form-input"
                min="0"
                value={formData.bathrooms}
                onChange={(e) => handleChange('bathrooms', e.target.value)}
              />
            </div>

            <div className="form-group form-full">
              <label className="form-label">Carpet Area (Sq.Ft.)</label>
              <input
                type="number"
                className="form-input"
                value={formData.area_sqft}
                onChange={(e) => handleChange('area_sqft', e.target.value)}
              />
            </div>

            <div className="form-group form-full">
              <label className="form-label">Photo URL</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://..."
                value={formData.image_url}
                onChange={(e) => handleChange('image_url', e.target.value)}
              />
              <div style={{ display: 'flex', gap: '8px', marginTop: '6px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Quick Select Presets:</span>
                {presetImages.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleChange('image_url', preset.url)}
                    style={{
                      fontSize: '11px',
                      background: formData.image_url === preset.url ? 'var(--navy-900)' : '#f1f5f9',
                      color: formData.image_url === preset.url ? '#fff' : 'var(--text-secondary)',
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group form-full">
              <label className="form-label">Property Description</label>
              <textarea
                className="form-textarea"
                rows={3}
                placeholder="Highlight views, amenities, parking spaces, facing direction..."
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
              />
            </div>

            <div className="form-full" style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px', marginTop: '8px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '12px' }}>
                Seller / Agent Contact Info
              </h4>
            </div>

            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                className="form-input"
                placeholder="Rajesh Verma"
                required
                value={formData.contact_name}
                onChange={(e) => handleChange('contact_name', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                className="form-input"
                placeholder="rajesh@example.com"
                required
                value={formData.contact_email}
                onChange={(e) => handleChange('contact_email', e.target.value)}
              />
            </div>

            <div className="form-group form-full">
              <label className="form-label">Phone Number *</label>
              <input
                type="tel"
                className="form-input"
                placeholder="+91 98200 12345"
                required
                value={formData.contact_phone}
                onChange={(e) => handleChange('contact_phone', e.target.value)}
              />
            </div>
          </div>

          <div style={{ marginTop: '24px' }}>
            <button type="submit" className="btn-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Publishing Listing...' : 'Publish Property Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
