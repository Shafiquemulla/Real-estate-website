import React, { useState, useEffect } from 'react';
import { Home, Heart, User, PlusCircle, Menu, X, Building, Info, Phone } from 'lucide-react';

export default function Navbar({
  activePage,
  setActivePage,
  favoritesCount,
  onOpenFavorites,
  _onOpenPostProperty,
  onOpenUser
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Desktop links: ALL 7 PRESERVED
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'buy', label: 'Buy' },
    { id: 'rent', label: 'Rent' },
    { id: 'list-property', label: 'List Property' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  // Mobile hamburger menu links: Projects, About, and Contact moved here
  const mobileMenuItems = [
    { id: 'projects', label: 'Projects', icon: Building, desc: 'New luxury developments & townships' },
    { id: 'about', label: 'About Us', icon: Info, desc: 'Our standards, mission & verified process' },
    { id: 'contact', label: 'Contact Us', icon: Phone, desc: 'Talk to certified Mumbai advisors' },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Close mobile menu on Escape key and prevent body scrolling when open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className={`navbar ${mobileMenuOpen ? 'mobile-menu-active' : ''}`}>
      <div className="container navbar-inner">
        {/* Brand Logo */}
        <div className="logo" onClick={() => handleNavClick('home')}>
          <div className="logo-icon">
            <Home size={22} strokeWidth={2.5} />
          </div>
          <span className="logo-text">
            ESTATE<span>PRO</span>
          </span>
        </div>

        {/* Desktop Navigation Links (Unchanged for desktop) */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li
                key={link.id}
                className={`nav-link-item ${activePage === link.id ? 'active' : ''}`}
                onClick={() => handleNavClick(link.id)}
              >
                {link.label}
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className="nav-actions">
          {/* Heart / Favorites Button */}
          <button
            className="nav-icon-btn"
            title="Saved Properties"
            onClick={onOpenFavorites}
            aria-label="View Favorites"
          >
            <Heart size={20} />
            {favoritesCount > 0 && <span className="nav-badge">{favoritesCount}</span>}
          </button>

          {/* User Profile Button */}
          <button
            className="nav-icon-btn"
            title="User Profile"
            onClick={onOpenUser}
            aria-label="User Account"
          >
            <User size={20} />
          </button>

          {/* Post Property Button (Yellow) - desktop only, hidden on mobile */}
          <button
            className="btn-post-property"
            onClick={() => handleNavClick('list-property')}
          >
            <PlusCircle size={18} />
            <span>Post Property</span>
          </button>

          {/* Hamburger for Mobile */}
          <button
            className="hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Hamburger Drawer Menu */}
      <div className={`mobile-menu-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <div className="logo" onClick={() => handleNavClick('home')}>
            <div className="logo-icon">
              <Home size={18} strokeWidth={2.5} />
            </div>
            <span className="logo-text" style={{ fontSize: '18px' }}>
              ESTATE<span>PRO</span>
            </span>
          </div>
          <button
            className="mobile-drawer-close"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <div className="mobile-drawer-content">
          <span className="drawer-section-heading">More Pages</span>
          <div className="mobile-drawer-links">
            {mobileMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`mobile-drawer-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <div className="drawer-item-icon">
                    <Icon size={20} />
                  </div>
                  <div className="drawer-item-text">
                    <span className="drawer-item-title">{item.label}</span>
                    <span className="drawer-item-desc">{item.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="drawer-divider"></div>

          <span className="drawer-section-heading">Quick Shortcuts</span>
          <div className="mobile-drawer-links">
            <button
              type="button"
              className="mobile-drawer-item"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenFavorites) onOpenFavorites();
              }}
            >
              <div className="drawer-item-icon">
                <Heart size={20} />
              </div>
              <div className="drawer-item-text">
                <span className="drawer-item-title">Saved Wishlist</span>
                <span className="drawer-item-desc">{favoritesCount} properties saved</span>
              </div>
            </button>

            <button
              type="button"
              className="mobile-drawer-item"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenUser) onOpenUser();
              }}
            >
              <div className="drawer-item-icon">
                <User size={20} />
              </div>
              <div className="drawer-item-text">
                <span className="drawer-item-title">Account & Profile</span>
                <span className="drawer-item-desc">Sign in or view user profile</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
