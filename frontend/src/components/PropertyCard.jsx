import React from 'react';
import { MapPin, Bed, Bath, Maximize2, Heart } from 'lucide-react';
import { formatINR } from '../utils/currency';

export default function PropertyCard({
  property,
  isFavorite,
  onToggleFavorite,
  onSelectProperty
}) {
  const displayPrice = property.formatted_price?.startsWith('₹')
    ? property.formatted_price
    : formatINR(property.price, property.purpose);

  return (
    <article className="property-card" onClick={() => onSelectProperty(property)}>
      <div className="card-image-wrap">
        <img
          src={property.image_url}
          alt={property.title}
          className="card-image"
          loading="lazy"
        />
        {property.badge && (
          <span className={`card-badge ${property.purpose === 'Rent' ? 'rent' : ''}`}>
            {property.badge}
          </span>
        )}
        <button
          type="button"
          className={`card-fav-btn ${isFavorite ? 'is-fav' : ''}`}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
          aria-label="Toggle favorite"
        >
          <Heart size={18} fill={isFavorite ? '#ef4444' : 'none'} strokeWidth={2} />
        </button>
      </div>

      <div className="card-body">
        <div className="card-price">{displayPrice}</div>
        <h3 className="card-title" title={property.title}>
          {property.title}
        </h3>
        <div className="card-location">
          <MapPin size={14} />
          <span>{property.location}</span>
        </div>

        <div className="card-features">
          <span className="feature-item" title="Bedrooms">
            <Bed size={15} />
            <span>
              {property.bedrooms > 0
                ? `${property.bedrooms} BHK`
                : property.property_type === 'Commercial'
                ? 'Office'
                : 'Plot'}
            </span>
          </span>
          <span className="feature-item" title="Bathrooms">
            <Bath size={15} />
            <span>{property.bathrooms > 0 ? `${property.bathrooms} Baths` : 'N/A'}</span>
          </span>
          <span className="feature-item" title="Living Area">
            <Maximize2 size={15} />
            <span>{property.area_sqft ? `${property.area_sqft.toLocaleString('en-IN')} sq.ft.` : 'N/A'}</span>
          </span>
        </div>

        <button
          type="button"
          className="card-footer-btn"
          onClick={(e) => {
            e.stopPropagation();
            onSelectProperty(property);
          }}
        >
          View Details
        </button>
      </div>
    </article>
  );
}
