import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';

const Welcome = ({ heroImage, mobileHeroImage }) => {
  const isMobile = window.innerWidth <= 768;
  console.log('Hero Image:', heroImage, 'Mobile Hero Image:', mobileHeroImage); // Debug log

  const backgroundStyle = {
    backgroundImage: `url(${isMobile ? mobileHeroImage : heroImage}), 
                     linear-gradient(135deg, #005f69 0%, #007a85 50%, #00a8b8 100%),
                     radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
                     radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`,
    backgroundSize: 'cover, auto, auto, auto',
    backgroundPosition: 'center, center, 20% 80%, 80% 20%',
    backgroundRepeat: 'no-repeat, no-repeat, no-repeat, no-repeat',
    transition: 'background-image 0.5s ease',
  };

  return (
    <section id="welcome" className="hero" style={backgroundStyle}>
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
              <Link to="/quote" className="btn btn-primary">
                <span>📊</span> Rate & Transit Times
              </Link>
              <a href="https://backend.capitaltradex.tech/" className="btn btn-accent">
                <span>📦</span> Track Package
              </a>
              {/* <Link to="/login" className="btn btn-accent">
                <span>🚚</span> Ship Now
              </Link> */}
            </div>
          </div>
        </div>
      </div>
      <div className="hero-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  );
};

export default Welcome;