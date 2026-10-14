import React, { useState } from 'react';
import { 
  Building, 
  IndianRupee, 
  CheckCircle2, 
  AlertCircle, 
  UploadCloud, 
  Trash2, 
  ShieldCheck, 
  Sparkles, 
  Home, 
  ArrowRight,
  Mail, 
  User, 
  Info
} from 'lucide-react';
import { formatINR } from '../utils/currency';

const AMENITY_OPTIONS = [
  '24/7 Security & CCTV',
  '100% Power Backup',
  'Lift / High-Speed Elevators',
  'Reserved Covered Parking',
  'Swimming Pool',
  'Equipped Gymnasium',
  'Clubhouse & Community Hall',
  "Children's Play Area",
  'Piped Gas Connection',
  'Rainwater Harvesting',
  'Private Balcony / Terrace',
  'Vastu Compliant',
  'Intercom Facility',
  'Lush Landscaped Garden'
];

const PRESET_DEMO_IMAGES = [
  {
    name: 'Bandra Sea-Facing Apartment',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Worli Skyline Penthouse',
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Juhu Luxury Beachside Villa',
    url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Powai Contemporary Flat',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
  }
];

export default function ListPropertyPage({ onNavigate, onShowToast, onPropertyAdded }) {
  const [formData, setFormData] = useState({
    contact_name: '',
    contact_phone: '',
    contact_email: '',
    title: '',
    description: '',
    property_type: 'Apartment',
    purpose: 'Sale',
    address: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '',
    price: '',
    bedrooms: 3,
    bathrooms: 2,
    area_sqft: 1450,
    parking: '1 Covered Car Park',
    amenities: ['24/7 Security & CCTV', 'Lift / High-Speed Elevators', '100% Power Backup'],
    image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    consent: false
  });

  const [imagePreview, setImagePreview] = useState('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80');
  const [imageFileName, setImageFileName] = useState('Demo Property Photo');
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);

  // Form field updater
  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
    // Clear field-specific error
    if (errors[field]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
    if (serverError) setServerError('');
  };

  // Toggle amenity selection
  const handleToggleAmenity = (amenity) => {
    setFormData(prev => {
      const exists = prev.amenities.includes(amenity);
      const updated = exists 
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity];
      return { ...prev, amenities: updated };
    });
  };

  // File upload handler with frontend validation (PNG, JPG, JPEG, WEBP <= 5MB)
  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    // Validate mime type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrors(prev => ({ 
        ...prev, 
        image: 'Please upload a valid image file (PNG, JPG, JPEG, or WEBP).' 
      }));
      return;
    }

    // Validate size (max 5 MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ 
        ...prev, 
        image: 'Image file size exceeds 5 MB. Please choose a smaller image.' 
      }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
      setImageFileName(file.name);
      setFormData(prev => ({ ...prev, image_url: reader.result }));
      setErrors(prev => {
        const updated = { ...prev };
        delete updated.image;
        return updated;
      });
    };
    reader.readAsDataURL(file);
  };

  // Preset image selection
  const handleSelectPreset = (preset) => {
    setImagePreview(preset.url);
    setImageFileName(preset.name);
    setFormData(prev => ({ ...prev, image_url: preset.url }));
    setErrors(prev => {
      const updated = { ...prev };
      delete updated.image;
      return updated;
    });
  };

  // Client-side validations
  const validateForm = () => {
    const newErrors = {};

    // 1. Owner / Agent Full Name
    if (!formData.contact_name || formData.contact_name.trim().length < 2) {
      newErrors.contact_name = 'Please enter your full name (minimum 2 characters).';
    }

    // 2. Indian Mobile Number (+91 format, 10 digits starting with 6,7,8,9)
    const cleanedPhone = formData.contact_phone.replace(/[\s\-()]/g, '');
    let digits = cleanedPhone;
    if (cleanedPhone.startsWith('+91')) {
      digits = cleanedPhone.substring(3);
    } else if (cleanedPhone.startsWith('91') && cleanedPhone.length === 12) {
      digits = cleanedPhone.substring(2);
    } else if (cleanedPhone.startsWith('0') && cleanedPhone.length === 11) {
      digits = cleanedPhone.substring(1);
    }

    if (!/^[6-9]\d{9}$/.test(digits)) {
      newErrors.contact_phone = 'Enter a valid 10-digit Indian mobile number (e.g. +91 98765 43210).';
    }

    // 3. Email Address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.contact_email || !emailRegex.test(formData.contact_email.trim())) {
      newErrors.contact_email = 'Enter a valid email address.';
    }

    // 4. Property Title & Description
    if (!formData.title || formData.title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters long.';
    }
    if (!formData.description || formData.description.trim().length < 15) {
      newErrors.description = 'Please provide a descriptive summary of your property (min 15 characters).';
    }

    // 5. Address, City, State, PIN Code
    if (!formData.address || formData.address.trim().length < 5) {
      newErrors.address = 'Please provide the complete street address or building name.';
    }
    if (!formData.city || formData.city.trim().length < 2) {
      newErrors.city = 'Please enter the city.';
    }
    if (!formData.state || formData.state.trim().length < 2) {
      newErrors.state = 'Please enter the state.';
    }

    // 6-digit Indian PIN Code
    const pinRegex = /^[1-9][0-9]{5}$/;
    if (!formData.pincode || !pinRegex.test(formData.pincode.trim())) {
      newErrors.pincode = 'PIN Code must be a valid 6-digit Indian postal code (e.g., 400050).';
    }

    // 6. Expected Price
    const numericPrice = parseFloat(formData.price);
    if (!numericPrice || isNaN(numericPrice) || numericPrice <= 0) {
      newErrors.price = 'Please enter a valid positive price in INR (₹).';
    }

    // 7. Area in sq. ft.
    const numericArea = parseFloat(formData.area_sqft);
    if (!numericArea || isNaN(numericArea) || numericArea <= 0) {
      newErrors.area_sqft = 'Please enter a valid carpet area in sq. ft.';
    }

    // 8. Consent Checkbox
    if (!formData.consent) {
      newErrors.consent = 'You must agree to the terms and authorize the listing to continue.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validateForm()) {
      if (onShowToast) onShowToast('Please correct highlighted fields before submitting.');
      // Scroll to the first error
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    try {
      // Standardize phone representation with +91
      let digits = formData.contact_phone.replace(/[\s\-()]/g, '');
      if (digits.startsWith('+91')) digits = digits.substring(3);
      else if (digits.startsWith('91') && digits.length === 12) digits = digits.substring(2);
      else if (digits.startsWith('0') && digits.length === 11) digits = digits.substring(1);
      const normalizedPhone = `+91 ${digits.substring(0, 5)} ${digits.substring(5)}`;

      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        property_type: formData.property_type,
        purpose: formData.purpose,
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
        price: parseFloat(formData.price),
        bedrooms: parseInt(formData.bedrooms) || 0,
        bathrooms: parseInt(formData.bathrooms) || 0,
        area_sqft: parseFloat(formData.area_sqft),
        parking: formData.parking,
        amenities: formData.amenities,
        image_url: formData.image_url,
        contact_name: formData.contact_name.trim(),
        contact_email: formData.contact_email.trim().toLowerCase(),
        contact_phone: normalizedPhone
      };

      const response = await fetch('http://127.0.0.1:5000/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setSubmissionSuccess({
          propertyId: data.property_id,
          title: formData.title,
          price: formatINR(formData.price, formData.purpose),
          purpose: formData.purpose,
          message: data.message
        });

        if (onShowToast) {
          onShowToast(`Property listed successfully! Ref ID: #${data.property_id}`);
        }
        if (onPropertyAdded) {
          onPropertyAdded();
        }
        window.scrollTo({ top: 100, behavior: 'smooth' });
      } else {
        setServerError(data.message || 'Server rejected the submission. Please check your data.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setServerError('Unable to connect to the backend server. Please verify the Python Flask server is active on port 5000.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      contact_name: '',
      contact_phone: '',
      contact_email: '',
      title: '',
      description: '',
      property_type: 'Apartment',
      purpose: 'Sale',
      address: '',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '',
      price: '',
      bedrooms: 3,
      bathrooms: 2,
      area_sqft: 1450,
      parking: '1 Covered Car Park',
      amenities: ['24/7 Security & CCTV', 'Lift / High-Speed Elevators', '100% Power Backup'],
      image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      consent: false
    });
    setSubmissionSuccess(null);
    setErrors({});
    setServerError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="list-property-page" style={{ paddingBottom: '90px' }}>
      {/* Top Banner / Hero Header */}
      <section className="list-property-hero">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: '16px' }}>
            <span 
              onClick={() => onNavigate && onNavigate('home')} 
              style={{ cursor: 'pointer', color: 'var(--yellow-400)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <Home size={14} /> Home
            </span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">List Your Property</span>
          </nav>

          <div className="list-hero-grid">
            <div className="list-hero-content">
              <span className="badge-tag" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--yellow-400)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '5px 14px', borderRadius: 'var(--radius-full)', fontSize: '13px', fontWeight: 700, display: 'inline-block', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                Direct Indian Owner & Agent Portal
              </span>
              <h1 className="page-hero-title" style={{ fontFamily: 'var(--font-display)', fontSize: '38px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2, marginBottom: '12px' }}>
                List Your Property in India
              </h1>
              <p style={{ color: '#cbd5e1', fontSize: '17px', lineHeight: 1.6, maxWidth: '640px', marginBottom: '24px' }}>
                Showcase your property and connect with potential buyers and tenants across Mumbai, Pune, Delhi NCR, Bengaluru, and pan-India.
              </p>

              {/* Trust highlights */}
              <div className="hero-trust-badges">
                <div className="trust-badge-item">
                  <ShieldCheck size={20} color="var(--yellow-400)" />
                  <span>100% Verified Inquiries</span>
                </div>
                <div className="trust-badge-item">
                  <IndianRupee size={20} color="var(--yellow-400)" />
                  <span>Zero Hidden Listing Fees</span>
                </div>
                <div className="trust-badge-item">
                  <Sparkles size={20} color="var(--yellow-400)" />
                  <span>Fast Track Closure</span>
                </div>
              </div>
            </div>

            <div className="list-hero-banner-card">
              <img 
                src="/list_property_banner.jpg" 
                alt="Luxury Indian Residential Property Listing" 
                className="list-banner-img"
              />
              <div className="banner-overlay-caption">
                <span className="live-stat-dot"></span>
                <span>Active nationwide across 25+ Indian Metro Regions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Form Area */}
      <div className="container" style={{ marginTop: '40px' }}>
        {submissionSuccess ? (
          /* SUCCESS CONFIRMATION STATE */
          <div className="submission-success-card">
            <div className="success-icon-wrapper">
              <CheckCircle2 size={64} color="#10b981" />
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '30px', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '8px' }}>
              Property Listed Successfully!
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '600px', margin: '0 auto 24px', lineHeight: 1.6 }}>
              {submissionSuccess.message} Your property has been recorded in the ESTATEPRO database and is immediately discoverable to potential buyers and tenants.
            </p>

            <div className="success-meta-summary">
              <div className="meta-box">
                <span className="meta-label">Listing Reference ID</span>
                <span className="meta-value">#{submissionSuccess.propertyId}</span>
              </div>
              <div className="meta-box">
                <span className="meta-label">Property Title</span>
                <span className="meta-value">{submissionSuccess.title}</span>
              </div>
              <div className="meta-box">
                <span className="meta-label">Expected Price</span>
                <span className="meta-value">{submissionSuccess.price}</span>
              </div>
              <div className="meta-box">
                <span className="meta-label">Purpose</span>
                <span className="meta-value">For {submissionSuccess.purpose}</span>
              </div>
            </div>

            <div className="success-action-btns">
              <button 
                onClick={() => onNavigate && onNavigate(submissionSuccess.purpose === 'Rent' ? 'rent' : 'buy')} 
                className="btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', fontSize: '15px', fontWeight: 700 }}
              >
                <span>Browse {submissionSuccess.purpose === 'Rent' ? 'Rentals' : 'Properties for Sale'}</span>
                <ArrowRight size={18} />
              </button>
              <button 
                onClick={resetForm} 
                className="btn-outline"
                style={{ padding: '14px 26px', fontSize: '15px', fontWeight: 600 }}
              >
                List Another Property
              </button>
            </div>
          </div>
        ) : (
          /* PROPERTY SUBMISSION FORM */
          <div className="form-layout-wrapper">
            {/* Server Error Alert */}
            {serverError && (
              <div className="alert-error-banner" role="alert">
                <AlertCircle size={22} />
                <div>
                  <strong>Submission Error:</strong>
                  <p>{serverError}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="property-submission-form">
              {/* SECTION 1: BASIC DETAILS & PURPOSE */}
              <div className="form-card-section">
                <div className="section-header">
                  <div className="step-num">1</div>
                  <div>
                    <h2 className="section-title">Property Type & Listing Purpose</h2>
                    <p className="section-subtitle">Specify what kind of property you are listing and whether it is for Sale or Rent.</p>
                  </div>
                </div>

                <div className="form-grid">
                  {/* Listing Purpose */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="purpose">
                      Listing Purpose <span className="req-star">*</span>
                    </label>
                    <div className="purpose-pill-selector">
                      <button
                        type="button"
                        id="purpose-sale"
                        className={`purpose-pill ${formData.purpose === 'Sale' ? 'active' : ''}`}
                        onClick={() => handleChange('purpose', 'Sale')}
                      >
                        For Sale
                      </button>
                      <button
                        type="button"
                        id="purpose-rent"
                        className={`purpose-pill ${formData.purpose === 'Rent' ? 'active' : ''}`}
                        onClick={() => handleChange('purpose', 'Rent')}
                      >
                        For Rent
                      </button>
                    </div>
                  </div>

                  {/* Property Type */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="property_type">
                      Property Type <span className="req-star">*</span>
                    </label>
                    <select
                      id="property_type"
                      className="form-select"
                      value={formData.property_type}
                      onChange={(e) => handleChange('property_type', e.target.value)}
                    >
                      <option value="Apartment">Apartment</option>
                      <option value="Flat">Flat</option>
                      <option value="Villa">Villa</option>
                      <option value="Independent House">Independent House</option>
                      <option value="Plot">Plot</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>

                  {/* Property Title */}
                  <div className="form-group form-full">
                    <label className="form-label" htmlFor="title">
                      Property Title <span className="req-star">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      className={`form-input ${errors.title ? 'input-error' : ''}`}
                      placeholder="e.g. Sea-Facing 3 BHK Luxury Apartment with Private Balcony"
                      value={formData.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      maxLength={120}
                    />
                    {errors.title && <span className="field-error-text">{errors.title}</span>}
                    <span className="field-hint">A clear, descriptive title attracts 3x more prospective buyers.</span>
                  </div>

                  {/* Description */}
                  <div className="form-group form-full">
                    <label className="form-label" htmlFor="description">
                      Property Description <span className="req-star">*</span>
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      className={`form-textarea ${errors.description ? 'input-error' : ''}`}
                      placeholder="Provide comprehensive details about interiors, floor level, facing direction, ventilation, neighborhood connectivity, and society highlights..."
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                    />
                    {errors.description && <span className="field-error-text">{errors.description}</span>}
                  </div>
                </div>
              </div>

              {/* SECTION 2: INDIAN LOCATION DETAILS */}
              <div className="form-card-section">
                <div className="section-header">
                  <div className="step-num">2</div>
                  <div>
                    <h2 className="section-title">Property Location (India)</h2>
                    <p className="section-subtitle">Provide complete address details for verified location matching.</p>
                  </div>
                </div>

                <div className="form-grid">
                  {/* Full Address */}
                  <div className="form-group form-full">
                    <label className="form-label" htmlFor="address">
                      Full Address / Building Name <span className="req-star">*</span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      className={`form-input ${errors.address ? 'input-error' : ''}`}
                      placeholder="e.g. Flat 1402, Carter Crest Residences, Carter Road Promenade"
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                    />
                    {errors.address && <span className="field-error-text">{errors.address}</span>}
                  </div>

                  {/* City */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="city">
                      City <span className="req-star">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      className={`form-input ${errors.city ? 'input-error' : ''}`}
                      placeholder="e.g. Mumbai"
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                    />
                    {errors.city && <span className="field-error-text">{errors.city}</span>}
                  </div>

                  {/* State */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="state">
                      State <span className="req-star">*</span>
                    </label>
                    <input
                      type="text"
                      id="state"
                      className={`form-input ${errors.state ? 'input-error' : ''}`}
                      placeholder="e.g. Maharashtra"
                      value={formData.state}
                      onChange={(e) => handleChange('state', e.target.value)}
                    />
                    {errors.state && <span className="field-error-text">{errors.state}</span>}
                  </div>

                  {/* PIN Code */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="pincode">
                      PIN Code (6 Digits) <span className="req-star">*</span>
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      className={`form-input ${errors.pincode ? 'input-error' : ''}`}
                      placeholder="e.g. 400050"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={(e) => handleChange('pincode', e.target.value.replace(/\D/g, ''))}
                    />
                    {errors.pincode && <span className="field-error-text">{errors.pincode}</span>}
                    <span className="field-hint">6-digit Indian Postal Code</span>
                  </div>
                </div>
              </div>

              {/* SECTION 3: PRICING & SPECIFICATIONS */}
              <div className="form-card-section">
                <div className="section-header">
                  <div className="step-num">3</div>
                  <div>
                    <h2 className="section-title">Pricing & Property Specifications</h2>
                    <p className="section-subtitle">Set your expected price and specify key dimensions and layout.</p>
                  </div>
                </div>

                <div className="form-grid">
                  {/* Expected Price in INR */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="price">
                      Expected {formData.purpose === 'Rent' ? 'Monthly Rent' : 'Sale Price'} in INR (₹) <span className="req-star">*</span>
                    </label>
                    <div className="input-with-addon">
                      <span className="input-addon">₹</span>
                      <input
                        type="number"
                        id="price"
                        className={`form-input ${errors.price ? 'input-error' : ''}`}
                        placeholder={formData.purpose === 'Rent' ? 'e.g. 75000' : 'e.g. 35000000'}
                        value={formData.price}
                        onChange={(e) => handleChange('price', e.target.value)}
                        min="1"
                      />
                    </div>
                    {/* Live INR conversion badge */}
                    {formData.price && !isNaN(formData.price) && (
                      <div className="price-conversion-pill">
                        <span>Formatted: </span>
                        <strong>{formatINR(formData.price, formData.purpose)}</strong>
                      </div>
                    )}
                    {errors.price && <span className="field-error-text">{errors.price}</span>}
                  </div>

                  {/* Carpet Area in Sq. Ft. */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="area_sqft">
                      Carpet Area (sq. ft.) <span className="req-star">*</span>
                    </label>
                    <div className="input-with-addon">
                      <input
                        type="number"
                        id="area_sqft"
                        className={`form-input ${errors.area_sqft ? 'input-error' : ''}`}
                        placeholder="e.g. 1450"
                        value={formData.area_sqft}
                        onChange={(e) => handleChange('area_sqft', e.target.value)}
                        min="50"
                      />
                      <span className="input-addon addon-right">sq. ft.</span>
                    </div>
                    {errors.area_sqft && <span className="field-error-text">{errors.area_sqft}</span>}
                  </div>

                  {/* Bedrooms */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="bedrooms">
                      Bedrooms (BHK)
                    </label>
                    <select
                      id="bedrooms"
                      className="form-select"
                      value={formData.bedrooms}
                      onChange={(e) => handleChange('bedrooms', Number(e.target.value))}
                    >
                      <option value={1}>1 BHK</option>
                      <option value={2}>2 BHK</option>
                      <option value={3}>3 BHK</option>
                      <option value={4}>4 BHK</option>
                      <option value={5}>5+ BHK</option>
                    </select>
                  </div>

                  {/* Bathrooms */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="bathrooms">
                      Bathrooms
                    </label>
                    <select
                      id="bathrooms"
                      className="form-select"
                      value={formData.bathrooms}
                      onChange={(e) => handleChange('bathrooms', Number(e.target.value))}
                    >
                      <option value={1}>1 Bathroom</option>
                      <option value={2}>2 Bathrooms</option>
                      <option value={3}>3 Bathrooms</option>
                      <option value={4}>4 Bathrooms</option>
                      <option value={5}>5+ Bathrooms</option>
                    </select>
                  </div>

                  {/* Parking */}
                  <div className="form-group form-full">
                    <label className="form-label" htmlFor="parking">
                      Car Parking Space
                    </label>
                    <select
                      id="parking"
                      className="form-select"
                      value={formData.parking}
                      onChange={(e) => handleChange('parking', e.target.value)}
                    >
                      <option value="1 Covered Car Park">1 Covered Car Park</option>
                      <option value="2 Covered Reserved Bays">2 Covered Reserved Bays</option>
                      <option value="3+ Stilt / Covered Bays">3+ Stilt / Covered Bays</option>
                      <option value="1 Open Dedicated Parking">1 Open Dedicated Parking</option>
                      <option value="Common Society Parking">Common Society Parking</option>
                      <option value="No Dedicated Parking">No Dedicated Parking</option>
                    </select>
                  </div>
                </div>

                {/* Amenities Selection */}
                <div style={{ marginTop: '28px' }}>
                  <label className="form-label" style={{ marginBottom: '10px', display: 'block' }}>
                    Amenities & Facilities
                  </label>
                  <div className="amenities-checkbox-grid">
                    {AMENITY_OPTIONS.map((item) => {
                      const isChecked = formData.amenities.includes(item);
                      return (
                        <label 
                          key={item} 
                          className={`amenity-checkbox-card ${isChecked ? 'selected' : ''}`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleAmenity(item)}
                          />
                          <span>{item}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* SECTION 4: PROPERTY IMAGE UPLOAD */}
              <div className="form-card-section">
                <div className="section-header">
                  <div className="step-num">4</div>
                  <div>
                    <h2 className="section-title">Property Image Upload</h2>
                    <p className="section-subtitle">Upload high quality photos (PNG, JPG, JPEG, WEBP max 5 MB) or pick a sample photo.</p>
                  </div>
                </div>

                <div className="image-upload-wrapper">
                  {/* Dropzone */}
                  <div className="file-dropzone-box">
                    <input
                      type="file"
                      id="property-image-file"
                      accept="image/png, image/jpeg, image/jpg, image/webp"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="property-image-file" className="dropzone-label">
                      <div className="dropzone-icon">
                        <UploadCloud size={32} />
                      </div>
                      <span className="dropzone-title">Click to upload property photo</span>
                      <span className="dropzone-hint">Supports PNG, JPG, JPEG, WEBP up to 5 MB</span>
                    </label>

                    {errors.image && (
                      <div className="field-error-text" style={{ marginTop: '10px' }}>
                        {errors.image}
                      </div>
                    )}
                  </div>

                  {/* Image Preview Card */}
                  {imagePreview && (
                    <div className="image-preview-card">
                      <div className="preview-image-container">
                        <img src={imagePreview} alt="Property Preview" className="preview-img" />
                        <span className="preview-badge">Preview</span>
                      </div>
                      <div className="preview-footer">
                        <span className="file-name-text" title={imageFileName}>{imageFileName}</span>
                        <button
                          type="button"
                          className="btn-remove-photo"
                          onClick={() => {
                            setImagePreview('');
                            setImageFileName('');
                            handleChange('image_url', '');
                          }}
                          title="Remove image"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Preset image quick selectors */}
                <div style={{ marginTop: '20px' }}>
                  <span className="field-hint" style={{ display: 'block', marginBottom: '8px' }}>
                    Or select from verified sample architecture photos:
                  </span>
                  <div className="preset-images-strip">
                    {PRESET_DEMO_IMAGES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`preset-thumb-btn ${imagePreview === preset.url ? 'active' : ''}`}
                        onClick={() => handleSelectPreset(preset)}
                      >
                        <img src={preset.url} alt={preset.name} />
                        <span>{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION 5: OWNER / AGENT CONTACT DETAILS */}
              <div className="form-card-section">
                <div className="section-header">
                  <div className="step-num">5</div>
                  <div>
                    <h2 className="section-title">Owner / Agent Information</h2>
                    <p className="section-subtitle">Interested buyers will reach out to these contact coordinates.</p>
                  </div>
                </div>

                <div className="form-grid">
                  {/* Full Name */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact_name">
                      Full Name <span className="req-star">*</span>
                    </label>
                    <div className="input-with-icon">
                      <User size={18} className="input-field-icon" />
                      <input
                        type="text"
                        id="contact_name"
                        className={`form-input icon-indent ${errors.contact_name ? 'input-error' : ''}`}
                        placeholder="e.g. Aarav Mehta / Sunita Rao"
                        value={formData.contact_name}
                        onChange={(e) => handleChange('contact_name', e.target.value)}
                      />
                    </div>
                    {errors.contact_name && <span className="field-error-text">{errors.contact_name}</span>}
                  </div>

                  {/* Indian Mobile Number with +91 */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact_phone">
                      Indian Mobile Number (+91) <span className="req-star">*</span>
                    </label>
                    <div className="input-with-addon">
                      <span className="input-addon">+91</span>
                      <input
                        type="tel"
                        id="contact_phone"
                        className={`form-input ${errors.contact_phone ? 'input-error' : ''}`}
                        placeholder="98765 43210"
                        value={formData.contact_phone}
                        onChange={(e) => handleChange('contact_phone', e.target.value)}
                        maxLength={15}
                      />
                    </div>
                    {errors.contact_phone && <span className="field-error-text">{errors.contact_phone}</span>}
                    <span className="field-hint">10 digits starting with 6, 7, 8, or 9</span>
                  </div>

                  {/* Email Address */}
                  <div className="form-group form-full">
                    <label className="form-label" htmlFor="contact_email">
                      Email Address <span className="req-star">*</span>
                    </label>
                    <div className="input-with-icon">
                      <Mail size={18} className="input-field-icon" />
                      <input
                        type="email"
                        id="contact_email"
                        className={`form-input icon-indent ${errors.contact_email ? 'input-error' : ''}`}
                        placeholder="e.g. contact@domain.in"
                        value={formData.contact_email}
                        onChange={(e) => handleChange('contact_email', e.target.value)}
                      />
                    </div>
                    {errors.contact_email && <span className="field-error-text">{errors.contact_email}</span>}
                  </div>
                </div>
              </div>

              {/* SECTION 6: CONSENT & SUBMISSION */}
              <div className="form-card-section consent-section">
                <div className="consent-checkbox-wrap">
                  <label className="checkbox-label" htmlFor="consent-check">
                    <input
                      type="checkbox"
                      id="consent-check"
                      checked={formData.consent}
                      onChange={(e) => handleChange('consent', e.target.checked)}
                    />
                    <span>
                      I declare and confirm that I am the rightful property owner or authorized marketing agent. I agree to ESTATEPRO India terms, verification guidelines, and authorize genuine buyer and tenant inquiries.
                    </span>
                  </label>
                  {errors.consent && (
                    <div className="field-error-text" style={{ marginTop: '8px' }}>
                      {errors.consent}
                    </div>
                  )}
                </div>

                <div className="submission-actions-row">
                  <button
                    type="submit"
                    id="submit-property-btn"
                    className="btn-submit-property"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-dot"></span>
                        <span>Verifying & Submitting Property...</span>
                      </>
                    ) : (
                      <>
                        <Building size={20} />
                        <span>Submit Property Listing</span>
                      </>
                    )}
                  </button>

                  <div className="submission-disclaimer">
                    <Info size={16} />
                    <span>Submitted listings undergo real-time validation and are synchronized with the Flask API backend.</span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
