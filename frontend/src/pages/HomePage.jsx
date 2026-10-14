import React from 'react';
import Hero from '../components/Hero';
import TrustFeatures from '../components/TrustFeatures';
import FeaturedProperties from '../components/FeaturedProperties';

export default function HomePage({
  properties,
  favorites,
  onToggleFavorite,
  onSelectProperty,
  searchFilters,
  setSearchFilters,
  onSearch,
  onNavigate
}) {
  return (
    <main>
      {/* 1. Hero Banner with Headline, Subtitle, and Search Bar */}
      <Hero
        searchFilters={searchFilters}
        setSearchFilters={setSearchFilters}
        onSearch={onSearch}
        onNavigate={onNavigate}
      />

      {/* 2. Four Trust-Feature Items below Hero */}
      <TrustFeatures />

      {/* 3. Featured Properties Section (Same 4 cards in same order) */}
      <FeaturedProperties
        properties={properties}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
        onSelectProperty={onSelectProperty}
      />
    </main>
  );
}
