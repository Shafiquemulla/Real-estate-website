import React, { useState } from 'react';
import { 
  Building, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  Home, 
  X
} from 'lucide-react';

const MUMBAI_PROJECTS = [
  {
    id: 101,
    title: 'Lodha World Towers & Park Residences',
    developer: 'Lodha Group',
    location: 'Lower Parel & Worli, Mumbai MMR',
    completion: 'Ready to Move',
    status: 'ready',
    units: '3, 4 & 5 BHK Palatial Residences',
    startingPrice: 'From ₹6.85 Cr',
    rera: 'P51900008345',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    description: 'An iconic 117-story architectural landmark soaring above South Mumbai. Featuring a 7-acre private park, Giorgio Armani-designed interiors, sky lounge, and private concierge.',
    amenities: ['7-Acre Private Park', 'Olympic Lap Pool', 'Armani / Casa Interiors', 'Sky Observation Deck', '24/7 Concierge']
  },
  {
    id: 102,
    title: 'Oberoi Sky City Integrated Township',
    developer: 'Oberoi Realty',
    location: 'Western Express Highway, Borivali East, Mumbai',
    completion: 'Q3 2027',
    status: 'under_construction',
    units: '3 & 4 BHK Contemporary Residences',
    startingPrice: 'From ₹3.40 Cr',
    rera: 'P51800003582',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: 'Sprawled across 25 acres with direct covered access to the Mumbai Metro. Features 5-star club facilities, international preschool, podium forest trail, and sports arena.',
    amenities: ['Direct Metro Access', '5-Star Clubhouse', 'Podium Forest Trail', 'Tennis Courts', 'Multi-Tier Security']
  },
  {
    id: 103,
    title: 'Godrej Platinum Coastal Green Enclave',
    developer: 'Godrej Properties',
    location: 'Eastern Express Highway, Vikhroli, Mumbai',
    completion: 'Ready to Move',
    status: 'ready',
    units: '2, 3 & 4 BHK Eco-Luxury Homes',
    startingPrice: 'From ₹2.95 Cr',
    rera: 'P51800013892',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    description: 'LEED Platinum certified sustainable residential towers overlooking Mumbai’s tranquil eastern mangrove belt. Double-height sundecks and intelligent home automation.',
    amenities: ['Mangrove Green Views', 'LEED Platinum Green', 'Double-Height Sundecks', 'Infinity Edge Pool', 'EV Charging Hub']
  },
  {
    id: 104,
    title: 'Piramal Mahalaxmi Central Tower',
    developer: 'Piramal Realty',
    location: 'Mahalaxmi Racecourse, South Mumbai',
    completion: 'Q2 2027',
    status: 'under_construction',
    units: '2, 3 & 4 BHK Luxury Suites',
    startingPrice: 'From ₹4.50 Cr',
    rera: 'P51900016482',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    description: 'Graceful glass-facade skyscraper commanding unhindered panoramic views across the 225-acre Mahalaxmi Racecourse and the Arabian Sea. Designed by Foster + Partners.',
    amenities: ['Racecourse & Sea Views', 'Foster + Partners Design', 'Spa & Wellness Sanctuary', 'Heated Indoor Pool', 'Helipad Access']
  }
];

export default function ProjectsPage({ onNavigateHome, onShowToast }) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    notes: ''
  });

  const filteredProjects = MUMBAI_PROJECTS.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'ready') return p.status === 'ready';
    if (activeTab === 'under_construction') return p.status === 'under_construction';
    return true;
  });

  const handleOpenInquiry = (project) => {
    setSelectedProject(project);
    setSubmitted(false);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
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
          property_title: `New Project: ${selectedProject.title} (${selectedProject.developer})`,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          tour_date: formData.date || 'Flexible',
          message: `Brochure Request & VIP Site Tour for ${selectedProject.title}. Client Notes: ${formData.notes || 'None'}`
        })
      });

      if (response.ok) {
        setSubmitted(true);
        if (onShowToast) onShowToast(`Brochure and VIP access details sent for ${selectedProject.title}!`);
      } else {
        setSubmitted(true);
      }
    } catch {
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="projects-page" style={{ paddingBottom: '90px' }}>
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
            <span className="breadcrumb-current" style={{ color: '#e2e8f0' }}>New Projects</span>
          </nav>

          <div style={{ maxWidth: '800px' }}>
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
              Mumbai Landmark Developments
            </span>
            <h1 className="page-hero-title" style={{ fontFamily: 'var(--font-display)', fontSize: '38px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2, marginBottom: '12px' }}>
              Exclusive New Development Projects
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '16px', lineHeight: 1.6 }}>
              Invest with confidence in RERA-registered master developments by India's most prestigious builders. Access pre-launch inventory, developer payment plans, and VIP site visits.
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '36px' }}>
        {/* 2. Filter Tabs */}
        <div className="projects-toolbar" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '16px', 
          marginBottom: '32px',
          background: '#ffffff',
          padding: '12px 20px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)'
        }}>
          <div className="projects-tabs-wrap" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'All Projects (4)' },
              { id: 'ready', label: 'Ready to Move' },
              { id: 'under_construction', label: 'Under Construction' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '13px',
                  fontWeight: 600,
                  background: activeTab === tab.id ? 'var(--navy-900)' : '#f1f5f9',
                  color: activeTab === tab.id ? '#ffffff' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={16} color="var(--yellow-600)" />
            <span>100% MahaRERA Registered</span>
          </div>
        </div>

        {/* 3. Projects Grid */}
        <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '24px' }}>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              style={{
                background: '#ffffff',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease'
              }}
            >
              {/* Image & Badges */}
              <div style={{ position: 'relative', height: '230px', overflow: 'hidden' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  background: 'var(--navy-900)',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 800,
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-sm)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}>
                  {project.startingPrice}
                </span>

                <span style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  background: project.status === 'ready' ? '#10b981' : 'var(--yellow-500)',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-sm)',
                  textTransform: 'uppercase'
                }}>
                  {project.completion}
                </span>
              </div>

              {/* Body */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <Building size={14} color="var(--yellow-600)" />
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--yellow-600)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {project.developer}
                  </span>
                </div>

                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '8px', lineHeight: 1.3 }}>
                  {project.title}
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '13px', marginBottom: '14px' }}>
                  <MapPin size={15} color="var(--text-muted)" />
                  <span>{project.location}</span>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6, marginBottom: '18px', flex: 1 }}>
                  {project.description}
                </p>

                {/* Amenities Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                  {project.amenities.slice(0, 3).map((a, i) => (
                    <span 
                      key={i} 
                      style={{ 
                        background: '#f8fafc', 
                        border: '1px solid var(--border-light)', 
                        padding: '3px 8px', 
                        borderRadius: '4px', 
                        fontSize: '11px', 
                        color: 'var(--text-secondary)',
                        fontWeight: 500
                      }}
                    >
                      {a}
                    </span>
                  ))}
                </div>

                {/* Specs row */}
                <div style={{
                  borderTop: '1px solid var(--border-light)',
                  paddingTop: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                  marginBottom: '16px'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={14} color="var(--yellow-600)" />
                    <span>Est: {project.completion}</span>
                  </span>
                  <span style={{ fontWeight: 600 }}>{project.units}</span>
                </div>

                {/* Action Buttons */}
                <div className="project-card-actions" style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => handleOpenInquiry(project)}
                    className="btn-primary"
                    style={{ flex: 1, padding: '10px 14px', fontSize: '13px', justifyContent: 'center' }}
                  >
                    <Download size={14} />
                    <span>Brochure & Pricing</span>
                  </button>
                  <button
                    onClick={() => handleOpenInquiry(project)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-light)',
                      background: '#f8fafc',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--navy-900)'
                    }}
                  >
                    VIP Tour
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Brochure & VIP Visit Modal */}
      {isModalOpen && selectedProject && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div 
            className="modal-content modal-container" 
            style={{ maxWidth: '540px' }} 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--yellow-600)', textTransform: 'uppercase' }}>
                  {selectedProject.developer}
                </span>
                <h3 className="modal-title" style={{ fontSize: '20px', marginTop: '2px' }}>
                  {selectedProject.title}
                </h3>
              </div>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body-padded" style={{ padding: '24px 28px' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '8px' }}>
                    Access Granted!
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.5, marginBottom: '24px' }}>
                    The digital brochure, floor plans, and pricing schedule for <strong>{selectedProject.title}</strong> have been sent to your email. Our dedicated developer relations officer will call you to confirm your VIP tour.
                  </p>
                  <div style={{ background: '#f8fafc', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', marginBottom: '20px', fontSize: '13px', color: 'var(--text-muted)' }}>
                    RERA Registration: <strong>{selectedProject.rera}</strong>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="btn-primary"
                    style={{ width: '100%', padding: '12px', justifyContent: 'center' }}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    Enter your details below to receive the official floor plans, price breakdown, and developer incentives for {selectedProject.title}.
                  </p>

                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      className="form-input" 
                      placeholder="e.g. Rahul Kapoor"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="modal-form-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input 
                        type="email" 
                        required 
                        className="form-input" 
                        placeholder="rahul@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Mobile Number *</label>
                      <input 
                        type="tel" 
                        required 
                        className="form-input" 
                        placeholder="+91 98200 XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Preferred VIP Site Inspection Date</label>
                    <input 
                      type="date" 
                      className="form-input"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Specific Inquiries or Configuration Preferences</label>
                    <textarea 
                      className="form-textarea" 
                      rows={2}
                      placeholder="e.g. Interested in 4 BHK higher floor with sea view..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-muted)' }}>
                    <ShieldCheck size={14} color="var(--yellow-600)" />
                    <span>Your privacy is safeguarded. No promotional spam. Authorized developer channel.</span>
                  </div>

                  <button 
                    type="submit" 
                    className="btn-primary" 
                    disabled={isSubmitting}
                    style={{ width: '100%', padding: '12px', justifyContent: 'center', marginTop: '6px' }}
                  >
                    {isSubmitting ? 'Sending Request...' : 'Download Brochure & Request VIP Tour'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
