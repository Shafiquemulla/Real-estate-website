import React from 'react';
import { X, Heart, Trash2, MapPin, ArrowRight } from 'lucide-react';
import { formatINR } from '../utils/currency';

export default function FavoritesModal({
  favorites,
  allProperties,
  onClose,
  onToggleFavorite,
  onSelectProperty
}) {
  const favoriteProperties = allProperties.filter((p) => favorites.includes(p.id));

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-header-padded" style={{ padding: '24px 24px 18px', borderBottom: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', marginBottom: '6px' }}>
            <Heart size={22} fill="#ef4444" />
            <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Your Saved Collection
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, color: 'var(--navy-900)' }}>
            Favorite Properties ({favoriteProperties.length})
          </h2>
        </div>

        <div className="modal-body-scrollable" style={{ padding: '20px 24px', maxHeight: '60vh', overflowY: 'auto' }}>
          {favoriteProperties.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <Heart size={48} color="#cbd5e1" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '18px', color: 'var(--navy-900)', marginBottom: '8px' }}>
                No favorites saved yet
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '340px', margin: '0 auto' }}>
                Click the heart icon on any property card to save homes you love and review them anytime.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {favoriteProperties.map((prop) => {
                const displayPrice = prop.formatted_price?.startsWith('₹')
                  ? prop.formatted_price
                  : formatINR(prop.price, prop.purpose);

                return (
                  <div
                    key={prop.id}
                    className="favorite-item-row"
                    style={{
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'center',
                      padding: '12px',
                      background: '#f8fafc',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border-light)'
                    }}
                  >
                    <img
                      src={prop.image_url}
                      alt={prop.title}
                      style={{ width: '90px', height: '70px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--navy-900)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {prop.title}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '12px', margin: '2px 0 4px' }}>
                        <MapPin size={12} />
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prop.location}</span>
                      </div>
                      <div style={{ fontWeight: 800, fontSize: '15px', color: 'var(--navy-900)' }}>
                        {displayPrice}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onSelectProperty(prop);
                        }}
                        style={{
                          padding: '8px 12px',
                          background: 'var(--navy-900)',
                          color: '#fff',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '12px',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <span>View</span>
                        <ArrowRight size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleFavorite(prop.id)}
                        title="Remove"
                        style={{
                          padding: '8px',
                          color: '#94a3b8',
                          background: '#ffffff',
                          border: '1px solid var(--border-light)',
                          borderRadius: 'var(--radius-sm)'
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
