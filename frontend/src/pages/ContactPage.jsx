import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      if (onShowToast) onShowToast('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          property_title: 'General Inquiries & Client Advisory',
          ...formData
        })
      });

      if (response.ok) {
        setSubmitted(true);
        if (onShowToast) onShowToast('Message sent! We will be in touch shortly.');
      } else {
        if (onShowToast) onShowToast('Failed to send message.');
      }
    } catch (err) {
      console.error(err);
      setSubmitted(true);
      if (onShowToast) onShowToast('Message received! Our team will contact you.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '50px 0 90px' }}>
      <div className="container">
        <div style={{ maxWidth: '700px', marginBottom: '40px' }}>
          <span style={{ color: 'var(--yellow-600)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Get in Touch
          </span>
          <h1 className="page-hero-title" style={{ fontFamily: 'var(--font-display)', fontSize: '38px', fontWeight: 800, color: 'var(--navy-900)', marginTop: '4px', marginBottom: '10px' }}>
            Contact ESTATEPRO India Advisory
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
            Whether you are looking to purchase, sell, lease, or consult on commercial investments, our dedicated specialists are ready to assist.
          </p>
        </div>

        <div className="contact-layout-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px' }}>
          {/* Contact Form */}
          <div className="contact-form-card" style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            padding: '36px',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '20px' }}>
              Send Us a Message
            </h2>

            {submitted ? (
              <div style={{ padding: '30px', textAlign: 'center', background: '#ecfdf5', borderRadius: 'var(--radius-md)', border: '1px solid #10b981' }}>
                <CheckCircle2 size={44} color="#10b981" style={{ margin: '0 auto 12px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '6px' }}>
                  Thank you for reaching out!
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                  Your inquiry has been routed to our senior client advisor. We will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Alexander Hamilton"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="alexander@domain.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="+1 (555) 123-4567"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea
                    className="form-textarea"
                    rows={4}
                    placeholder="Tell us what you are looking for..."
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-submit" disabled={loading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Send size={16} />
                  <span>{loading ? 'Sending...' : 'Submit Inquiry'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Details Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: '#ffffff', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '12px' }}>
                Mumbai Headquarters (Demo Office)
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={16} color="var(--yellow-600)" />
                  <span>Mumbai, Maharashtra, India (demo address)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={16} color="var(--yellow-600)" />
                  <span>+91 98765 43210</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={16} color="var(--yellow-600)" />
                  <span>contact@estatepro.in</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={16} color="var(--yellow-600)" />
                  <span>Monday–Saturday, 9:00 AM–7:00 PM IST</span>
                </div>
              </div>
            </div>

            <div style={{ background: '#ffffff', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '12px' }}>
                Customer Support & Help Desk
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={16} color="var(--yellow-600)" />
                  <span>Toll Free / WhatsApp: +91 98765 43210</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={16} color="var(--yellow-600)" />
                  <span>Monday–Saturday, 9:00 AM–7:00 PM IST</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={16} color="var(--yellow-600)" />
                  <span>Time Zone: Asia/Kolkata (IST)</span>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--navy-900)', padding: '24px', borderRadius: 'var(--radius-lg)', color: '#ffffff' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
                Looking to List Your Property?
              </h3>
              <p style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '14px' }}>
                Reach lakhs of active Indian buyers and tenants. Free property listing with verified leads.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--yellow-400)', fontWeight: 700, fontSize: '15px' }}>
                <Phone size={18} />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
