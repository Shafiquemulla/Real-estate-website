import React from 'react';
import { 
  Target, 
  Eye, 
  Search, 
  MessageSquare, 
  FileText, 
  Smartphone, 
  Home, 
  Key, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  PlusCircle, 
  Globe
} from 'lucide-react';

export default function AboutPage({ onNavigate }) {
  const propertyCategories = [
    {
      title: 'Apartments & Flats',
      desc: 'Contemporary 1, 2, 3 & 4 BHK high-rise residences with state-of-the-art amenities across Mumbai MMR, Pune, and Bengaluru.',
      badge: 'High Rise & Gated',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      actionType: 'buy'
    },
    {
      title: 'Luxury Villas',
      desc: 'Exclusive standalone seaside residences, private penthouses, and gated luxury villas with private gardens and pools.',
      badge: 'Bespoke Luxury',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
      actionType: 'buy'
    },
    {
      title: 'Residential Properties',
      desc: 'Independent houses, builder floors, and residential plotted layouts in rapidly appreciating urban corridors.',
      badge: 'Family Homes',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      actionType: 'buy'
    },
    {
      title: 'Rental Properties',
      desc: 'Fully furnished, semi-furnished, and bachelor/family-friendly flats for rent with verified owner listings and instant visits.',
      badge: 'Verified Rentals',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      actionType: 'rent'
    },
    {
      title: 'Commercial Properties',
      desc: 'Grade-A corporate office suites, retail showrooms, co-working hubs, and business spaces in premier financial districts.',
      badge: 'High Yield Investments',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      actionType: 'buy'
    }
  ];

  return (
    <main className="about-page" style={{ paddingBottom: '90px' }}>
      {/* =========================================================
          SECTION 1: HERO SECTION
          ========================================================= */}
      <section className="about-hero-section">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: '16px' }}>
            <span 
              onClick={() => onNavigate && onNavigate('home')} 
              style={{ cursor: 'pointer', color: 'var(--yellow-400)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <Home size={14} /> Home
            </span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">About Us</span>
          </nav>

          <div className="about-hero-layout">
            <div className="about-hero-text">
              <span className="badge-tag" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--yellow-400)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '5px 14px', borderRadius: 'var(--radius-full)', fontSize: '13px', fontWeight: 700, display: 'inline-block', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                India's Trusted Real Estate Platform
              </span>
              <h1 className="page-hero-title" style={{ fontFamily: 'var(--font-display)', fontSize: '42px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2, marginBottom: '14px' }}>
                About ESTATEPRO
              </h1>
              <p style={{ color: '#cbd5e1', fontSize: '18px', lineHeight: 1.6, maxWidth: '580px', marginBottom: '28px' }}>
                Discover properties and explore real estate opportunities across India.
              </p>

              {/* Stats Bar */}
              <div className="about-stats-row">
                <div className="stat-card">
                  <div className="stat-number">25+</div>
                  <div className="stat-caption">Indian Metros</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">100%</div>
                  <div className="stat-caption">RERA Guidelines</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">₹ INR</div>
                  <div className="stat-caption">Transparent Pricing</div>
                </div>
              </div>
            </div>

            <div className="about-hero-media">
              <img 
                src="/about_hero_banner.jpg" 
                alt="ESTATEPRO India Real Estate Skyline and Coastal Towers" 
                className="about-hero-img"
              />
              <div className="hero-floating-card">
                <div className="floating-icon">
                  <ShieldCheck size={24} color="#f59e0b" />
                </div>
                <div>
                  <strong>Verified Indian Listings</strong>
                  <span>Accurate carpet area in sq. ft. & real prices</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 2: COMPANY INTRODUCTION
          ========================================================= */}
      <section className="about-section bg-white" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="section-head-center">
            <span className="section-subtitle-tag">Who We Are</span>
            <h2 className="section-main-heading">Empowering Seamless Property Discovery in India</h2>
            <div className="heading-divider"></div>
          </div>

          <div className="company-intro-grid">
            <div className="intro-text-column">
              <p className="intro-lead">
                <strong>ESTATEPRO</strong> is a forward-thinking real estate discovery and listing platform designed specifically for the vibrant Indian property market. We bridge the gap between discerning property buyers, tenants, independent property owners, and certified real estate developers.
              </p>
              <p className="intro-body">
                Navigating real estate in India often involves unclear square footage specifications, hidden brokerage fees, and outdated listings. ESTATEPRO eliminates these barriers by providing an intuitive, transparent digital environment where every home seeker can explore verified residences in Indian Rupees (₹) with standardized measurements in square feet (sq. ft.).
              </p>
              <div className="intro-feature-checks">
                <div className="check-item">
                  <CheckCircle2 size={18} color="#10b981" />
                  <span>Curated listings with authentic photos and floor specifications</span>
                </div>
                <div className="check-item">
                  <CheckCircle2 size={18} color="#10b981" />
                  <span>Direct connections between buyers, tenants, and property owners</span>
                </div>
                <div className="check-item">
                  <CheckCircle2 size={18} color="#10b981" />
                  <span>Comprehensive coverage of apartments, villas, plots, and commercial assets</span>
                </div>
              </div>
            </div>

            <div className="intro-media-column">
              <div className="intro-visual-card">
                <div className="visual-stat-badge">
                  <Globe size={28} color="var(--navy-900)" />
                  <div>
                    <span className="stat-big">Pan-India</span>
                    <span className="stat-sub">Coverage & Regional Insights</span>
                  </div>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80" 
                  alt="Contemporary Indian Apartment Interior" 
                  className="intro-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTIONS 3 & 4: OUR MISSION & OUR VISION
          ========================================================= */}
      <section className="about-section bg-subtle" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="mission-vision-grid">
            {/* Mission Card */}
            <div className="mission-card">
              <div className="icon-bubble mission-bubble">
                <Target size={32} />
              </div>
              <span className="card-badge-pill">Purpose & Core Purpose</span>
              <h3 className="card-title">Our Mission</h3>
              <p className="card-description">
                To simplify and modernize the Indian real estate journey by providing a trustworthy, technology-driven platform that delivers transparent pricing in INR, verified property specifications, and seamless communication between property seekers and sellers.
              </p>
              <ul className="bullet-highlights">
                <li>Eliminate misinformation with transparent property carpet areas and amenities.</li>
                <li>Empower Indian homeowners with free, instant property listing tools.</li>
                <li>Provide prompt advisory support for every prospective buyer and tenant.</li>
              </ul>
            </div>

            {/* Vision Card */}
            <div className="vision-card">
              <div className="icon-bubble vision-bubble">
                <Eye size={32} />
              </div>
              <span className="card-badge-pill">Future & Aspiration</span>
              <h3 className="card-title">Our Vision</h3>
              <p className="card-description">
                To become India’s most reliable, consumer-centric real estate discovery ecosystem, where finding a sanctuary, renting an urban apartment, or investing in prime commercial assets is as simple, dependable, and enjoyable as a single click.
              </p>
              <ul className="bullet-highlights">
                <li>Drive technology adoption in regional Indian property markets.</li>
                <li>Foster ethical, RERA-aligned practices across all property segments.</li>
                <li>Connect millions of Indian families to their dream home sanctuaries.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 5: WHY CHOOSE US (4 FEATURE CARDS)
          ========================================================= */}
      <section className="about-section bg-white" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="section-head-center">
            <span className="section-subtitle-tag">Value Proposition</span>
            <h2 className="section-main-heading">Why Choose ESTATEPRO</h2>
            <p className="section-lead-p">
              Engineered from the ground up to offer the most convenient, transparent property search experience in India.
            </p>
            <div className="heading-divider"></div>
          </div>

          <div className="why-choose-grid">
            {/* Feature 1: Convenient Property Search */}
            <div className="why-card">
              <div className="why-icon-wrap">
                <Search size={28} />
              </div>
              <h3 className="why-title">Convenient Property Search</h3>
              <p className="why-desc">
                Find properties effortlessly with smart filters tailored for Indian home buyers. Filter by city, locality, budget in Lakhs & Crores (₹), BHK configurations, and ready-to-move status.
              </p>
            </div>

            {/* Feature 2: Easy Enquiries */}
            <div className="why-card">
              <div className="why-icon-wrap">
                <MessageSquare size={28} />
              </div>
              <h3 className="why-title">Easy Enquiries</h3>
              <p className="why-desc">
                Connect directly with property owners, authorized brokers, and project developers in seconds. Schedule site visits and request callback consultations without spam or repetitive calls.
              </p>
            </div>

            {/* Feature 3: Transparent Property Information */}
            <div className="why-card">
              <div className="why-icon-wrap">
                <FileText size={28} />
              </div>
              <h3 className="why-title">Property Information</h3>
              <p className="why-desc">
                Every listing features authentic details: verified carpet area in sq. ft., car parking allocations, society amenities, nearby transit hubs, and RERA registration benchmarks.
              </p>
            </div>

            {/* Feature 4: Mobile-Friendly Browsing */}
            <div className="why-card">
              <div className="why-icon-wrap">
                <Smartphone size={28} />
              </div>
              <h3 className="why-title">Mobile-Friendly Browsing</h3>
              <p className="why-desc">
                Fully responsive layout engineered to look and perform flawlessly on mobile smartphones, tablets, and desktop displays. Browse photos, compare prices, and post properties on the go.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 6: PROPERTY CATEGORIES (5 CATEGORIES)
          ========================================================= */}
      <section className="about-section bg-subtle" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="section-head-center">
            <span className="section-subtitle-tag">Our Portfolio</span>
            <h2 className="section-main-heading">Property Categories</h2>
            <p className="section-lead-p">
              Explore a versatile range of property types catering to every lifestyle, budget, and business aspiration.
            </p>
            <div className="heading-divider"></div>
          </div>

          <div className="categories-card-grid">
            {propertyCategories.map((cat, idx) => (
              <div key={idx} className="category-item-card">
                <div className="category-thumb-wrap">
                  <img src={cat.image} alt={cat.title} className="category-thumb" />
                  <span className="category-tag-badge">{cat.badge}</span>
                </div>
                <div className="category-body">
                  <h3 className="category-title">{cat.title}</h3>
                  <p className="category-desc">{cat.desc}</p>
                  <button 
                    onClick={() => onNavigate && onNavigate(cat.actionType)}
                    className="category-link-btn"
                  >
                    <span>Browse {cat.title}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 7: HOW IT WORKS (BUYERS, TENANTS, OWNERS, AGENTS)
          ========================================================= */}
      <section className="about-section bg-white" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="section-head-center">
            <span className="section-subtitle-tag">Simple Process</span>
            <h2 className="section-main-heading">How It Works</h2>
            <p className="section-lead-p">
              Whether you are looking to purchase, rent, or list your property, ESTATEPRO makes the experience seamless.
            </p>
            <div className="heading-divider"></div>
          </div>

          <div className="how-it-works-grid">
            {/* 1. For Buyers */}
            <div className="how-role-card">
              <div className="how-role-header">
                <div className="role-icon-box">
                  <Home size={24} />
                </div>
                <h3 className="role-title">For Buyers</h3>
              </div>
              <ol className="role-steps-list">
                <li>
                  <strong>Search & Filter:</strong> Explore verified properties across Indian cities filtered by budget in INR and BHK.
                </li>
                <li>
                  <strong>Inspect Specifications:</strong> Check high-res photos, carpet area in sq. ft., and neighborhood amenities.
                </li>
                <li>
                  <strong>Connect & Schedule:</strong> Send a direct enquiry and book private on-site inspection tours.
                </li>
              </ol>
            </div>

            {/* 2. For Tenants */}
            <div className="how-role-card">
              <div className="how-role-header">
                <div className="role-icon-box">
                  <Key size={24} />
                </div>
                <h3 className="role-title">For Tenants</h3>
              </div>
              <ol className="role-steps-list">
                <li>
                  <strong>Browse Verified Rentals:</strong> View move-in ready flats and independent homes with transparent monthly rent.
                </li>
                <li>
                  <strong>Verify Furnishing & Parking:</strong> Review details on parking spaces, security, and maintenance fees.
                </li>
                <li>
                  <strong>Direct Landlord Contact:</strong> Express interest directly with owners and finalize agreement terms.
                </li>
              </ol>
            </div>

            {/* 3. For Property Owners */}
            <div className="how-role-card">
              <div className="how-role-header">
                <div className="role-icon-box">
                  <PlusCircle size={24} />
                </div>
                <h3 className="role-title">For Owners</h3>
              </div>
              <ol className="role-steps-list">
                <li>
                  <strong>List in Under 2 Minutes:</strong> Fill in property location, price in INR, dimensions, and amenities.
                </li>
                <li>
                  <strong>Upload Photos:</strong> Attach property pictures to showcase living spaces to thousands of seekers.
                </li>
                <li>
                  <strong>Receive Genuine Leads:</strong> Get direct calls and verified enquiries from interested buyers & tenants.
                </li>
              </ol>
            </div>

            {/* 4. For Certified Agents */}
            <div className="how-role-card">
              <div className="how-role-header">
                <div className="role-icon-box">
                  <Briefcase size={24} />
                </div>
                <h3 className="role-title">For Agents & Developers</h3>
              </div>
              <ol className="role-steps-list">
                <li>
                  <strong>Showcase Inventory:</strong> Publish new residential towers, villas, and commercial spaces.
                </li>
                <li>
                  <strong>Maximize Exposure:</strong> Reach high-net-worth individuals and corporate tenants across India.
                </li>
                <li>
                  <strong>Accelerate Closures:</strong> Manage enquiries efficiently and close deals with confidence.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 8: CALL-TO-ACTION (CTA) BUTTONS
          ========================================================= */}
      <section className="about-cta-section">
        <div className="container">
          <div className="cta-banner-card">
            <div className="cta-content">
              <span className="cta-badge">Join ESTATEPRO Today</span>
              <h2 className="cta-heading">Ready to Find or List Your Dream Property?</h2>
              <p className="cta-subtext">
                Explore thousands of verified properties across India or list your home today to connect with active buyers and tenants.
              </p>
              <div className="cta-buttons-wrap">
                <button 
                  onClick={() => onNavigate && onNavigate('buy')}
                  className="btn-cta-explore"
                >
                  <Search size={18} />
                  <span>Explore Properties</span>
                </button>
                <button 
                  onClick={() => onNavigate && onNavigate('list-property')}
                  className="btn-cta-list"
                >
                  <PlusCircle size={18} />
                  <span>List Your Property</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 9: CONTACT INFORMATION (INDIA)
          ========================================================= */}
      <section className="about-section bg-subtle" style={{ padding: '80px 0 20px' }}>
        <div className="container">
          <div className="section-head-center">
            <span className="section-subtitle-tag">Get In Touch</span>
            <h2 className="section-main-heading">India Headquarters & Advisory</h2>
            <p className="section-lead-p">
              Our support and property advisory desk is here to help you six days a week.
            </p>
            <div className="heading-divider"></div>
          </div>

          <div className="contact-details-grid">
            <div className="contact-detail-card">
              <div className="detail-icon-box">
                <MapPin size={24} color="#f59e0b" />
              </div>
              <h4 className="detail-label">Registered Office</h4>
              <p className="detail-val">Mumbai, Maharashtra, India</p>
              <span className="detail-note">(Demo address for preview)</span>
            </div>

            <div className="contact-detail-card">
              <div className="detail-icon-box">
                <Phone size={24} color="#f59e0b" />
              </div>
              <h4 className="detail-label">Phone & Helpline</h4>
              <p className="detail-val">+91 98765 43210</p>
              <span className="detail-note">(Toll-free / WhatsApp placeholder)</span>
            </div>

            <div className="contact-detail-card">
              <div className="detail-icon-box">
                <Clock size={24} color="#f59e0b" />
              </div>
              <h4 className="detail-label">Business Hours</h4>
              <p className="detail-val">Monday–Saturday, 9:00 AM–7:00 PM IST</p>
              <span className="detail-note">Time Zone: Asia/Kolkata</span>
            </div>

            <div className="contact-detail-card">
              <div className="detail-icon-box">
                <Mail size={24} color="#f59e0b" />
              </div>
              <h4 className="detail-label">Email Support</h4>
              <p className="detail-val">contact@estatepro.in</p>
              <span className="detail-note">Prompt response within 24 business hours</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
