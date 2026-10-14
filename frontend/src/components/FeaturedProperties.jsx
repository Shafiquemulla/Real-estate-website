import React from 'react';
import PropertyCard from './PropertyCard';

export default function FeaturedProperties({
  properties,
  favorites,
  onToggleFavorite,
  onSelectProperty,
  title = "Featured Properties",
  subtitle = "Explore our handpicked selection of top-rated luxury properties available right now."
}) {
  return (
    <section className="featured-section" id="featured-properties">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">{title}</h2>
            <p className="section-subtitle">{subtitle}</p>
          </div>
        </div>

        {properties.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '20px', color: 'var(--navy-900)', marginBottom: '8px' }}>
              No Properties Found
            </h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Try adjusting your search criteria or price filters to see more results.
            </p>
          </div>
        ) : (
          <div className="properties-grid">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorite={favorites.includes(property.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectProperty={onSelectProperty}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
