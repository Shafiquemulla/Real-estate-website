import React from 'react';
import { Home, Compass, Key, PlusCircle } from 'lucide-react';

export default function BottomNav({ activePage, setActivePage }) {
  const bottomNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'buy', label: 'Buy', icon: Compass },
    { id: 'rent', label: 'Rent', icon: Key },
    { id: 'list-property', label: 'List Property', icon: PlusCircle },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
      <div className="bottom-nav-inner">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`bottom-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="bottom-nav-icon-wrap">
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="bottom-nav-label">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
