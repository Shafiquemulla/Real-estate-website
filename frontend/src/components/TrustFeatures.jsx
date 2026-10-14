import React from 'react';
import { Building2, ShieldCheck, Award, Headphones } from 'lucide-react';

export default function TrustFeatures() {
  const features = [
    {
      icon: <Building2 size={24} />,
      title: 'Extensive Properties',
      description: 'Over 15,000+ verified homes & premium villas in prime locations.',
    },
    {
      icon: <ShieldCheck size={24} />,
      title: 'Trusted Agents',
      description: 'Work with top-rated licensed specialists and local market experts.',
    },
    {
      icon: <Award size={24} />,
      title: 'Transparent Pricing',
      description: 'Zero hidden fees with straightforward valuation and financing advice.',
    },
    {
      icon: <Headphones size={24} />,
      title: '24/7 Fast Support',
      description: 'Dedicated client concierge available round-the-clock for every step.',
    },
  ];

  return (
    <section className="trust-features-section">
      <div className="container">
        <div className="trust-features-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="trust-feature-card">
              <div className="trust-icon-box">
                {feature.icon}
              </div>
              <div className="trust-feature-text">
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
