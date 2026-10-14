import React from 'react';
import { Home, Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand & About */}
          <div className="footer-col footer-about">
            <div className="logo" onClick={() => onNavigate('home')}>
              <div className="logo-icon">
                <Home size={22} strokeWidth={2.5} />
              </div>
              <span className="logo-text">
                ESTATE<span>PRO</span>
              </span>
            </div>
            <p>
              ESTATEPRO is your premier platform for residential properties, luxury apartments, and commercial estates across India. We connect discerning buyers, sellers, and tenants with exceptional spaces.
            </p>
            <div className="social-links">
              <a href="#facebook" className="social-btn" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#twitter" className="social-btn" aria-label="Twitter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#instagram" className="social-btn" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#linkedin" className="social-btn" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h5>Quick Navigation</h5>
            <ul className="footer-links-list">
              <li><button onClick={() => onNavigate('home')}>Home</button></li>
              <li><button onClick={() => onNavigate('buy')}>Buy Properties</button></li>
              <li><button onClick={() => onNavigate('rent')}>Rent Homes</button></li>
              <li><button onClick={() => onNavigate('list-property')}>List Your Property</button></li>
              <li><button onClick={() => onNavigate('projects')}>New Projects</button></li>
              <li><button onClick={() => onNavigate('about')}>About ESTATEPRO</button></li>
              <li><button onClick={() => onNavigate('contact')}>Contact Us</button></li>
            </ul>
          </div>

          {/* Col 3: Property Categories */}
          <div className="footer-col">
            <h5>Property Categories</h5>
            <ul className="footer-links-list">
              <li><button onClick={() => onNavigate('buy')}>Apartments & Flats</button></li>
              <li><button onClick={() => onNavigate('buy')}>Luxury Villas</button></li>
              <li><button onClick={() => onNavigate('buy')}>Independent Houses</button></li>
              <li><button onClick={() => onNavigate('rent')}>Rental Properties</button></li>
              <li><button onClick={() => onNavigate('buy')}>Plots & Land</button></li>
              <li><button onClick={() => onNavigate('buy')}>Commercial Properties</button></li>
            </ul>
          </div>

          {/* Col 4: Contact Info (India) */}
          <div className="footer-col">
            <h5>Headquarters (India)</h5>
            <div className="footer-contact-info">
              <div className="contact-info-row">
                <MapPin size={18} />
                <span>Mumbai, Maharashtra, India (demo address)</span>
              </div>
              <div className="contact-info-row">
                <Phone size={18} />
                <span>+91 98765 43210</span>
              </div>
              <div className="contact-info-row">
                <Mail size={18} />
                <span>contact@estatepro.in</span>
              </div>
              <div className="contact-info-row">
                <Clock size={18} />
                <span>Monday–Saturday, 9:00 AM–7:00 PM IST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ESTATEPRO Real Estate India. All rights reserved. Demo sample listings are not real verified offers.</p>
          <div>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#legal">RERA Disclosures</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
