import React, { useState } from 'react';
import { PlusCircle, Calculator, TrendingUp, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { formatINR } from '../utils/currency';

export default function SellPage({ onOpenPostProperty, onNavigate }) {
  const [calcBedrooms, setCalcBedrooms] = useState(3);
  const [calcSqft, setCalcSqft] = useState(1600);
  const [calcLocation, setCalcLocation] = useState('Bandra West');

  const getEstimatedValue = () => {
    let ratePerSqft = 22000;
    if (calcLocation === 'Bandra West') ratePerSqft = 35000;
    if (calcLocation === 'Worli') ratePerSqft = 42000;
    if (calcLocation === 'Juhu') ratePerSqft = 38000;
    if (calcLocation === 'Powai') ratePerSqft = 18000;
    if (calcLocation === 'Thane West') ratePerSqft = 11000;

    const estimated = calcSqft * ratePerSqft + calcBedrooms * 1500000;
    return formatINR(estimated);
  };

  const handlePostClick = () => {
    if (onNavigate) {
      onNavigate('list-property');
    } else if (onOpenPostProperty) {
      onOpenPostProperty();
    }
  };

  return (
    <div style={{ padding: '50px 0 90px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 50px' }}>
          <span style={{ color: 'var(--yellow-600)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Sell Faster with Premium Mumbai Exposure
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '38px', fontWeight: 800, color: 'var(--navy-900)', marginTop: '6px', marginBottom: '14px' }}>
            List & Sell Your Mumbai Property for Maximum Value
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.6' }}>
            Join thousands of satisfied homeowners who trusted ESTATEPRO. Get maximum market exposure, verified serious buyers, and zero stress with our certified local advisors.
          </p>
          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={handlePostClick}
              className="btn-post-property"
              style={{ display: 'inline-flex', padding: '14px 28px', fontSize: '16px', alignItems: 'center', gap: '8px' }}
            >
              <PlusCircle size={20} />
              <span>Post Your Property Now (Free)</span>
            </button>
            {onOpenPostProperty && (
              <button
                onClick={onOpenPostProperty}
                className="btn-secondary"
                style={{ padding: '14px 24px', fontSize: '15px' }}
              >
                Quick Modal Form
              </button>
            )}
          </div>
        </div>

        {/* Valuation Calculator Box in INR */}
        <div style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-light)',
          padding: '36px',
          boxShadow: 'var(--shadow-lg)',
          marginBottom: '60px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Calculator size={24} color="var(--yellow-600)" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, color: 'var(--navy-900)' }}>
              Instant Mumbai Property Valuation Estimator
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', alignItems: 'center' }}>
            <div className="form-group">
              <label className="form-label">Mumbai Locality</label>
              <select
                className="form-select"
                value={calcLocation}
                onChange={(e) => setCalcLocation(e.target.value)}
              >
                <option value="Bandra West">Bandra West, Mumbai</option>
                <option value="Worli">Worli Sea Face, Mumbai</option>
                <option value="Juhu">Juhu, Mumbai</option>
                <option value="Powai">Powai, Mumbai</option>
                <option value="Thane West">Thane West, Mumbai MMR</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Carpet Area (sq.ft.)</label>
              <input
                type="number"
                className="form-input"
                value={calcSqft}
                step="50"
                onChange={(e) => setCalcSqft(Number(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Bedrooms (BHK)</label>
              <select
                className="form-select"
                value={calcBedrooms}
                onChange={(e) => setCalcBedrooms(Number(e.target.value))}
              >
                <option value={1}>1 BHK</option>
                <option value={2}>2 BHK</option>
                <option value={3}>3 BHK</option>
                <option value={4}>4 BHK</option>
                <option value={5}>5+ BHK</option>
              </select>
            </div>

            <div style={{
              background: 'var(--navy-900)',
              color: '#ffffff',
              padding: '20px',
              borderRadius: 'var(--radius-lg)',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--yellow-400)', fontWeight: 700 }}>
                Estimated Market Value (INR)
              </span>
              <div style={{ fontSize: '26px', fontWeight: 800, fontFamily: 'var(--font-display)', marginTop: '4px', color: '#ffffff' }}>
                {getEstimatedValue()}
              </div>
            </div>
          </div>
        </div>

        {/* 3 Step Process */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
          <div style={{ background: '#ffffff', padding: '28px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '28px', fontWeight: 800, color: 'var(--yellow-500)' }}>01</span>
              <CheckCircle2 size={24} color="var(--yellow-600)" />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '8px' }}>Submit Property</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
              Fill in your property specifications, photos, and contact info in under 2 minutes using our verified submission portal.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '28px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '28px', fontWeight: 800, color: 'var(--yellow-500)' }}>02</span>
              <TrendingUp size={24} color="var(--yellow-600)" />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '8px' }}>Targeted Marketing</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
              We syndicate your listing to thousands of verified home seekers and high-net-worth investors across Mumbai MMR.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '28px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '28px', fontWeight: 800, color: 'var(--yellow-500)' }}>03</span>
              <ShieldCheck size={24} color="var(--yellow-600)" />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '8px' }}>Close with Confidence</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
              Our RERA-registered Mumbai advisors assist with documentation, stamp duty, escrow advisory, and smooth handover.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
