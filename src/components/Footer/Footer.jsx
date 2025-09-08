import React from 'react';
import './Footer.css';
import x from '../../assets/images/x_icon.png';
import linkedin from '../../assets/images/linkedin_icon.png';
import facebook from '../../assets/images/facebook_icon.png';
import instagram from '../../assets/images/instagram_icon.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  // Prevent default navigation for placeholder links
  const handlePlaceholderClick = (e) => {
    e.preventDefault();
  };

  return (
    <footer className="footer">
      <div className="footer-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
        </svg>
      </div>
      
      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-section company-section">
              <div className="footer-logo">
                <span className="footer-logo-text">Lamlight Express</span>
                <span className="footer-logo-subtitle">Connecting the World</span>
              </div>
              <p className="company-description">
                Your trusted partner in global shipping solutions. We deliver excellence 
                across continents with reliability, speed, and care.
              </p>
              <div className="social-links">
                <a href="#" onClick={handlePlaceholderClick} aria-label="Facebook"><img src={facebook} alt="" height={40} width={'auto'} /></a>
                <a href="#" onClick={handlePlaceholderClick} aria-label="Twitter"><img src={x} alt="" height={40} width={'auto'} /></a>
                <a href="#" onClick={handlePlaceholderClick} aria-label="LinkedIn"><img src={linkedin} alt="" height={40} width={'auto'} /></a>
                <a href="#" onClick={handlePlaceholderClick} aria-label="Instagram"><img src={instagram} alt="" height={40} width={'auto'} /></a>
              </div>
            </div>
            
            <div className="footer-links">
              <h3>Our Company</h3>
              <ul>
                <li><a href="#" onClick={handlePlaceholderClick}>About Lamlight Express</a></li>
                <li><a href="#" onClick={handlePlaceholderClick}>Investor Relations</a></li>
                <li><a href="#" onClick={handlePlaceholderClick}>Careers</a></li>
                <li><a href="#" onClick={handlePlaceholderClick}>International Holiday Schedule</a></li>
                <li><a href="#" onClick={handlePlaceholderClick}>Sustainability</a></li>
              </ul>
            </div>
            
            <div className="footer-links">
              <h3>New Customer</h3>
              <ul>
                <li><a href="#" onClick={handlePlaceholderClick}>Open an Account</a></li>
                <li><a href="#" onClick={handlePlaceholderClick}>New Customer Center</a></li>
                <li><a href="#" onClick={handlePlaceholderClick}>Getting Started Guide</a></li>
                <li><a href="#" onClick={handlePlaceholderClick}>Customer Portal</a></li>
              </ul>
            </div>
            
            <div className="footer-links">
              <h3>More From Lamlight Express</h3>
              <ul>
                <li><a href="#" onClick={handlePlaceholderClick}>Fuel Surcharges</a></li>
                <li><a href="#" onClick={handlePlaceholderClick}>Resources</a></li>
                <li><a href="#" onClick={handlePlaceholderClick}>Lamlight Express Locations</a></li>
                <li><a href="#" onClick={handlePlaceholderClick}>Developer API</a></li>
                <li><a href="#" onClick={handlePlaceholderClick}>Mobile App</a></li>
              </ul>
            </div>
            
            <div className="footer-section newsletter-section">
              <h3>Stay Updated</h3>
              <p>Subscribe to our newsletter for shipping updates and special offers.</p>
              <div className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="newsletter-input"
                />
                <button className="newsletter-btn">Subscribe</button>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p>&copy; 2025 Lamlight Express. All rights reserved.</p>
              <ul className="legal-links">
                <li><Link to="/terms">Terms of Use</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><a href="#" onClick={handlePlaceholderClick}>Security</a></li>
                <li><a href="#" onClick={handlePlaceholderClick}>Cookies</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
