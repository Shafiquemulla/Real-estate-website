import React, { useState } from 'react';
import { Home, Heart, User, PlusCircle, Menu, X } from 'lucide-react';

export default function Navbar({
  activePage,
  setActivePage,
  favoritesCount,
  onOpenFavorites,
  _onOpenPostProperty,
  onOpenUser
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'buy', label: 'Buy' },
    { id: 'rent', label: 'Rent' },
    { id: 'list-property', label: 'List Property' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

        {/* Navigation Links */}
        <nav>
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

          {/* Post Property Button (Yellow) */}
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
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
    </header>
  );
}
