import React, { useState, useEffect } from 'react';
import './app.css';

const App = () => {
  const [trackingId, setTrackingId] = useState('');
  const [showError, setShowError] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('dontShowPopup')) {
      setShowPopup(true);
    }
  }, []);

  const handleTrackingSubmit = (e) => {
    e.preventDefault();
    if (trackingId.trim() === '') {
      setShowError(true);
    } else {
      setShowError(false);
      alert(`Tracking ID: ${trackingId}`);
    }
  };

  const handlePopupClose = () => {
    if (dontShowAgain) {
      localStorage.setItem('dontShowPopup', 'true');
    }
    setShowPopup(false);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo">Lamlight-Grp</div>
          <nav>
            <ul className="nav-list">
              <li><a href="#shipping">Shipping</a></li>
              <li><a href="#tracking">Tracking</a></li>
              <li><a href="#support">Support</a></li>
              <li><a href="#account">Account</a></li>
              <li><a href="#login">Sign Up/Log In</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="welcome" className="hero">
        <div className="container">
          <h1>Welcome to Lamlight-Grp</h1>
          <div className="cta-buttons">
            <a href="#rates" className="btn">Rate & Transit Times</a>
            <a href="#track" className="btn">Track</a>
            <a href="#ship" className="btn">Ship</a>
          </div>
        </div>
      </section>

      {/* Tracking Section */}
      <section id="tracking" className="section tracking-section">
        <div className="container">
          <h2>Tracking</h2>
          <form onSubmit={handleTrackingSubmit} className="tracking-form">
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter tracking number"
              className="tracking-input"
              required
            />
            <button type="submit" className="btn">Track</button>
          </form>
          {showError && <p className="error">Please enter at least one tracking number.</p>}
          <ul className="services">
            <li><a href="#">Advanced Shipment Tracking</a></li>
            <li><a href="#">Manage Your Delivery</a></li>
            <li><a href="#">Track by Mobile</a></li>
            <li><a href="#">All Tracking Services</a></li>
          </ul>
        </div>
      </section>

      {/* Shipping Section */}
      <section id="shipping" className="section shipping-section">
        <div className="container">
          <h2>Shipping</h2>
          <ul className="services">
            <li><a href="#">Ship All Features</a></li>
            <li><a href="#">Shipping Tools</a></li>
            <li><a href="#">Rates & Transit Times</a></li>
            <li><a href="#">Schedule & Manage Pickups</a></li>
            <li><a href="#">Packaging & Shipping Supplies</a></li>
            <li><a href="#">Get Quote for Heavy Shipment</a></li>
            <li><a href="#">All Shipping Services</a></li>
          </ul>
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="section support-section">
        <div className="container">
          <h2>Support</h2>
          <ul className="services">
            <li><a href="#">New Customer Center</a></li>
            <li><a href="#">Customs Tools</a></li>
            <li><a href="#">Locations</a></li>
            <li><a href="#">Claims</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Customer Support</a></li>
          </ul>
        </div>
      </section>

      {/* Account Section */}
      <section id="account" className="section account-section">
        <div className="container">
          <h2>Account</h2>
          <ul className="services">
            <li><a href="#">Lamlight-Grp Administration</a></li>
            <li><a href="#">My Profile</a></li>
            <li><a href="#">Address Book</a></li>
            <li><a href="#">Billing, Invoicing & Payment</a></li>
            <li><a href="#">Manage Reporting</a></li>
            <li><a href="#">Open an Account</a></li>
          </ul>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="section news-section">
        <div className="container">
          <h2>Lamlight-Grp News</h2>
          <ul className="services">
            <li>Online Fraud Alert</li>
            <li>Implementation of 12-digit HS Code for Import/Export Shipments | Posted on July 30, 2025</li>
            <li>Lamlight-Grp service resumes to select regions | Posted on July 18, 2025</li>
            <li><a href="#">View All News</a></li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-links">
            <h3>Our Company</h3>
            <ul>
              <li><a href="#">About Lamlight-Grp</a></li>
              <li><a href="#">Investor Relations</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">International Holiday Schedule</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h3>New Customer</h3>
            <ul>
              <li><a href="#">Open an Account</a></li>
              <li><a href="#">New Customer Center</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h3>More From Lamlight-Grp</h3>
            <ul>
              <li><a href="#">Fuel Surcharges</a></li>
              <li><a href="#">Resources</a></li>
              <li><a href="#">Lamlight-Grp Locations</a></li>
            </ul>
          </div>
          <div className="footer-bottom">
            <p>© Lamlight-Grp 2025</p>
            <ul>
              <li><a href="#">Terms of Use</a></li>
              <li><a href="#">Security and Privacy</a></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Browser Support Popup */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Your Browser is Not Currently Supported</h2>
            <p>We recommend using one of the following browsers to access this site:</p>
            <ul className="browser-list">
              <li>Edge 41+</li>
              <li>Google Chrome 41+</li>
              <li>Mozilla Firefox 38+</li>
              <li>Safari 7++</li>
            </ul>
            <button onClick={handlePopupClose} className="btn">Close</button>
            <label className="popup-checkbox">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
              />
              Do not show this message again
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;