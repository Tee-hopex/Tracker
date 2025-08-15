import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Hompage.css';
import heroImage from '../../assets/images/lamlight.png';
import heroImagemobile from '../../assets/images/mobile.png';
import Welcome from '../../components/welcome/Welcome';


const Homepage = () => {
  const [trackingId, setTrackingId] = useState('');
  const [showError, setShowError] = useState(false);
  // const [showPopup, setShowPopup] = useState(false);
  // const [dontShowAgain, setDontShowAgain] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Using state instead of localStorage
  //   const hasSeenPopup = sessionStorage.getItem('dontShowPopup');
  //   if (!hasSeenPopup) {
  //     setShowPopup(true);
  //   }
  // }, []);

  const navigatetrack = () => {
    navigate('/track');
  }

  const navigateSupport = () => {
    navigate('/support');
  }

  const handleTrackingSubmit = (e) => {
    e.preventDefault();
    if (trackingId.trim() === '') {
      setShowError(true);
      return;
    }
    
    setShowError(false);
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate(`/track?number=${encodeURIComponent(trackingId)}`);
    }, 1500);
  };

  // const handlePopupClose = () => {
  //   if (dontShowAgain) {
  //     sessionStorage.setItem('dontShowPopup', 'true');
  //   }
  //   setShowPopup(false);
  // };

  return (
    <>
      <Header />
    <div className="app">
      
      {/* Hero Section */}
      {/* <section id="welcome" className="hero" style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <div className="hero-background"></div>
        <div className="hero-content">
          <div className="container">
            <div className="hero-text">
              <h1>
                <span className="hero-title-main">Welcome to Lamlight-Grp</span>
                <span className="hero-title-sub">Global Shipping Excellence</span>
              </h1>
              <p className="hero-description">
                Your trusted partner for reliable, fast, and secure shipping solutions 
                across the globe. Experience premium service with every delivery.
              </p>
              <div className="cta-buttons">
                <a href="#rates" className="btn btn-primary">
                  <span>📊</span> Rate & Transit Times
                </a>
                <Link to="/track" className="btn btn-secondary">
                  <span>📦</span> Track Package
                </Link>
                <a href="#ship" className="btn btn-accent">
                  <span>🚚</span> Ship Now
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor"></path>
          </svg>
        </div>
      </section> */}
      <Welcome heroImage={heroImage} mobileHeroImage={heroImagemobile} />

      {/* Quick Tracking Section */}
      <section id="quick-track" className="quick-track-section">
        <div className="container">
          <div className="quick-track-content">
            <div className="quick-track-text">
              <h2>Track Your Package</h2>
              <p>Enter your tracking number to get real-time updates</p>
            </div>
            <form onSubmit={handleTrackingSubmit} className="quick-tracking-form">
              <div className="input-group">
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => {
                    setTrackingId(e.target.value);
                    setShowError(false);
                  }}
                  placeholder="Enter tracking number (e.g., LG123456789)"
                  className="quick-tracking-input"
                  aria-label="Enter tracking number"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="quick-track-btn"
                  disabled={isLoading}
                  aria-label="Track package"
                >
                  {isLoading ? (
                    <span className="loading-spinner"></span>
                  ) : (
                    <span>Track</span>
                  )}
                </button>
              </div>
              {showError && <p className="error">Please enter a valid tracking number.</p>}
            </form>
          </div>
        </div>
      </section>

      {/* Tracking Section */}
      <section id="tracking" className="section tracking-section">
        <div className="section-background"></div>
        <div className="container">
          <div className="section-header">
            <h2>Advanced Tracking</h2>
            <p>Comprehensive tracking solutions for all your shipments</p>
          </div>
          <div className="services-grid">
            <div onClick={navigatetrack} className="service-card featured">
              <div className="service-icon">GPS</div>
              <h3>Real-time Location</h3>
              <p>Monitor your package location with live GPS tracking and instant status updates</p>
              <a href="#" className="service-link">Track Package</a>
            </div>
            <div className="service-card">
              <div className="service-icon">WEB</div>
              <h3>Web Tracking Portal</h3>
              <p>Access detailed tracking information through our secure online platform</p>
              <a href="#" className="service-link">Access Portal</a>
            </div>
            <div className="service-card">
              <div className="service-icon">SMS</div>
              <h3>SMS Updates</h3>
              <p>Receive important delivery notifications directly to your mobile device</p>
              <a href="#" className="service-link">Enable SMS</a>
            </div>
            <div className="service-card">
              <div className="service-icon">RPT</div>
              <h3>Delivery Reports</h3>
              <p>Generate comprehensive reports and analyze your shipping patterns</p>
              <a href="#" className="service-link">View Reports</a>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Section */}
      <section id="shipping" className="section shipping-section" style={{ height: '100vh', scrollMarginTop: '70px' }}>
        <div className="container">
          <div className="section-header">
            <h2>🚚 Shipping Services</h2>
            <p>Complete shipping solutions tailored to your needs</p>
          </div>
          <div className="shipping-grid">
            <div className="shipping-card express">
              <div className="shipping-badge">Popular</div>
              <div className="shipping-icon">⚡</div>
              <h3>Express Shipping</h3>
              <p>Fast delivery for urgent packages</p>
              <div className="shipping-features">
                <span>✓ Next-day delivery</span>
                <span>✓ Real-time tracking</span>
                <span>✓ Insurance included</span>
              </div>
              <Link to="/quote?type=express" className="shipping-btn">Get Quote</Link>
            </div>
            
            <div className="shipping-card standard">
              <div className="shipping-icon">📦</div>
              <h3>Standard Shipping</h3>
              <p>Reliable delivery at great value</p>
              <div className="shipping-features">
                <span>✓ 3-5 business days</span>
                <span>✓ Package tracking</span>
                <span>✓ Affordable rates</span>
              </div>
              <Link to="/quote?type=standard" className="shipping-btn">Get Quote</Link>
            </div>
            
            <div className="shipping-card freight">
              <div className="shipping-icon">🚛</div>
              <h3>Freight Services</h3>
              <p>Heavy and bulk shipments</p>
              <div className="shipping-features">
                <span>✓ Custom solutions</span>
                <span>✓ Dedicated support</span>
                <span>✓ Global network</span>
              </div>
              <Link to="/quote?type=freight" className="shipping-btn">Get Quote</Link>
            </div>
          </div>
          
          <div className="shipping-tools">
            <h3>Shipping Tools & Resources</h3>
            <div className="tools-grid">
              <Link to="/calculator" className="tool-item">
                <span className="tool-icon">📋</span>
                <span>Shipping Calculator</span>
              </Link>
              <Link to="/labels" className="tool-item">
                <span className="tool-icon">📄</span>
                <span>Print Labels</span>
              </Link>
              <Link to="/pickup" className="tool-item">
                <span className="tool-icon">📅</span>
                <span>Schedule Pickup</span>
              </Link>
              <Link to="/packaging-guide" className="tool-item">
                <span className="tool-icon">📦</span>
                <span>Packaging Guide</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="section support-section">
        <div className="container">
          <div className="section-header">
            <h2>🛟 Customer Support</h2>
            <p>We're here to help 24/7 with expert support</p>
          </div>
          
          <div className="support-grid">
            <div className="support-main">
              <div className="support-card primary" style={{ backgroundColor: 'black' } }>
                <div className="support-icon">💬</div>
                <h3>Live Chat Support</h3>
                <p>Get instant help from our support team</p>
                <button className="support-btn">Start Chat</button>
              </div>
              
              <div className="support-stats">
                <div className="stat-item">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Available</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number"> 2min</span>
                  <span className="stat-label">Response Time</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">98%</span>
                  <span className="stat-label">Satisfaction</span>
                </div>
              </div>
            </div>
            
            <div className="support-options">
              <div className="support-option">
                <span className="option-icon">📞</span>
                <h4>Phone Support</h4>
                <p>+1 (800) LAMLIGHT</p>
              </div>
              <div className="support-option">
                <span className="option-icon">📧</span>
                <h4>Email Support</h4>
                <p>support@lamlight-grp.com</p>
              </div>
              <div onClick={navigateSupport} className="support-option">
                <span className="option-icon">❓</span>
                <h4>Help Center</h4>
                <p>Find answers to common questions</p>
              </div>
              {/* <div className="support-option">
                <span className="option-icon">📍</span>
                <h4>Find Locations</h4>
                <p>Locate service centers near you</p>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Account Section */}
      <section id="account" className="section account-section">
        <div className="container">
          <div className="section-header">
            <h2>👤 Account Management</h2>
            <p>Manage your shipping account and preferences</p>
          </div>
          
          <div className="account-grid">
            <div className="account-card login-card">
              <div className="account-icon">🔐</div>
              <h3>Customer Portal</h3>
              <p>Access your account dashboard</p>
              <div className="account-features">
                <span>• View shipment history</span>
                <span>• Manage addresses</span>
                <span>• Track expenses</span>
                <span>• Download invoices</span>
              </div>
              <Link to="/login" className="account-btn primary">Sign In</Link>
            </div>
            
            <div className="account-card signup-card">
              <div className="account-icon">🆕</div>
              <h3>New Customer?</h3>
              <p>Join thousands of satisfied customers</p>
              <div className="signup-benefits">
                <span>✓ Special rates</span>
                <span>✓ Priority support</span>
                <span>✓ Exclusive offers</span>
                <span>✓ Advanced tools</span>
              </div>
              <a href="#" className="account-btn secondary">Open Account</a>
            </div>
            
            <div className="account-services">
              <h3>Account Services</h3>
              <div className="services-list">
                <Link to="/login" className="service-item">
                  <span>📊</span>
                  <span>Billing & Invoicing</span>
                </Link>
                <Link to="/login" className="service-item">
                  <span>📋</span>
                  <span>Shipping Reports</span>
                </Link>
                <Link to="/login" className="service-item">
                  <span>⚙️</span>
                  <span>Account Settings</span>
                </Link>
                <Link to="/login" className="service-item">
                  <span>👥</span>
                  <span>User Management</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="section news-section">
        <div className="container">
          <div className="section-header">
            <h2>Industry News & Updates</h2>
            <p>Stay informed with the latest developments in global shipping and maritime trade</p>
          </div>
          
          <div className="news-grid">
            <article className="news-card featured">
              <div className="news-badge">Breaking</div>
              <h3>South China Sea Maritime Security Alert</h3>
              <p>Recent collision incidents highlight increased commercial shipping risks in disputed waters. Maritime security experts recommend enhanced route monitoring and risk assessments.</p>
              <div className="news-meta">
                <span className="news-date">August 11, 2025</span>
                <span className="news-category">Security</span>
              </div>
              <div className="news-source">
                <a href="https://www.hellenicshippingnews.com/maritime-intelligence-brief-11-august-2025/" target="_blank" rel="noopener noreferrer">
                  Source: Hellenic Shipping News
                </a>
              </div>
            </article>
            
            <article className="news-card">
              <div className="news-badge">Policy</div>
              <h3>US Ends De Minimis Duty Exemption</h3>
              <p>Executive order eliminates $800 duty-free threshold for international shipments starting August 29, 2025, significantly impacting e-commerce and supply chains globally.</p>
              <div className="news-meta">
                <span className="news-date">August 29, 2025</span>
                <span className="news-category">Trade Policy</span>
              </div>
              <div className="news-source">
                <a href="https://www.avalara.com/blog/en/north-america/2024/11/de-minimis-exemption-changes-coming.html" target="_blank" rel="noopener noreferrer">
                  Source: Avalara
                </a>
              </div>
            </article>
            
            <article className="news-card">
              <h3>Ocean Freight Markets Face Tariff Uncertainty</h3>
              <p>Maritime shipping markets remain sensitive to tariff policy shifts as the reciprocal tariff pause expires, potentially affecting global trade patterns through 2025.</p>
              <div className="news-meta">
                <span className="news-date">August 12, 2025</span>
                <span className="news-category">Trade Policy</span>
              </div>
              <div className="news-source">
                <a href="https://www.freightos.com/freight-blog/shipping-delays-and-cost-increases" target="_blank" rel="noopener noreferrer">
                  Source: Freightos
                </a>
              </div>
            </article>
            
            <article className="news-card">
              <h3>IMO Carbon Emissions Regulations Shape 2025</h3>
              <p>Global shipping industry prepares for new environmental regulations as clarity on carbon emissions becomes a defining factor for maritime operations.</p>
              <div className="news-meta">
                <span className="news-date">August 10, 2025</span>
                <span className="news-category">Environment</span>
              </div>
              <div className="news-source">
                <a href="https://www.lloydslist.com/LL1151828/Ten-trends-that-will-shape-the-shipping-industry-in-2025-and-beyond" target="_blank" rel="noopener noreferrer">
                  Source: Lloyd's List
                </a>
              </div>
            </article>
            
            <article className="news-card">
              <h3>Port Infrastructure Investments Rise</h3>
              <p>Significant investments in global port infrastructure continue as the industry adapts to growing cruise markets and enhanced environmental protection measures.</p>
              <div className="news-meta">
                <span className="news-date">August 8, 2025</span>
                <span className="news-category">Infrastructure</span>
              </div>
              <div className="news-source">
                <a href="https://www.shipuniverse.com/2025-shipping-routes-forecast-opportunities-risks-and-trends/" target="_blank" rel="noopener noreferrer">
                  Source: Ship Universe
                </a>
              </div>
            </article>
            
            <article className="news-card">
              <h3>Supply Chain Disruption Alert</h3>
              <p>Major policy shifts create unexpected challenges for international e-commerce logistics, with over 30% of consumer-bound shipments now subject to new customs procedures.</p>
              <div className="news-meta">
                <span className="news-date">August 6, 2025</span>
                <span className="news-category">Supply Chain</span>
              </div>
              <div className="news-source">
                <a href="https://www.ups.com/cn/en/supplychain/resources/news-and-market-updates/market-update-august-6-2025" target="_blank" rel="noopener noreferrer">
                  Source: UPS Supply Chain
                </a>
              </div>
            </article>
          </div>
          
          <div className="news-cta">
            <a href="https://maritime-executive.com/shipping-news" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              View More Industry News
            </a>
          </div>
        </div>
      </section>

  

      {/* Browser Support Popup */}
      {/* {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-content">
              <div className="popup-header">
                <div className="popup-icon">⚠️</div>
                <h2>Browser Compatibility Notice</h2>
              </div>
              <p>For the best experience, we recommend using one of the following browsers:</p>
              <div className="browser-grid">
                <div className="browser-item">
                  <span className="browser-icon">🌐</span>
                  <span>Edge 41+</span>
                </div>
                <div className="browser-item">
                  <span className="browser-icon">🌐</span>
                  <span>Chrome 41+</span>
                </div>
                <div className="browser-item">
                  <span className="browser-icon">🦊</span>
                  <span>Firefox 38+</span>
                </div>
                <div className="browser-item">
                  <span className="browser-icon">🧭</span>
                  <span>Safari 7+</span>
                </div>
              </div>
              <div className="popup-actions">
                <button onClick={handlePopupClose} className="popup-btn">Continue</button>
                <label className="popup-checkbox">
                  <input
                    type="checkbox"
                    checked={dontShowAgain}
                    onChange={(e) => setDontShowAgain(e.target.checked)}
                  />
                  Don't show this again
                </label>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
        <Footer />
    </>
  );
};

export default Homepage;