import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  const toggleRef = useRef(null);
  const translateRef = useRef(null); // Ref for translate element
  const navigate = useNavigate();
  const location = useLocation();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      if (!mobile && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Navigate to home when logo is clicked
  const navigateHome = () => {
    navigate('/');
    setIsMenuOpen(false);
  };

  // Close menu with delay to allow navigation
  const closeMenu = useCallback(() => {
    setTimeout(() => setIsMenuOpen(false), 100);
  }, []);

  // Close menu when clicking outside
  const handleOverlayClick = () => {
    setIsMenuOpen(false);
  };

  // Close menu on escape key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isMenuOpen]);

  // Close menu when clicking outside nav or toggle
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && navRef.current && toggleRef.current) {
        if (
          !navRef.current.contains(event.target) &&
          !toggleRef.current.contains(event.target)
        ) {
          setIsMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Scroll to section when hash changes
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location]);

  // Reinitialize Google Translate when mobile menu opens
  useEffect(() => {
    if (isMenuOpen && window.google && window.google.translate) {
      if (translateRef.current) {
        window.google.translate.TranslateElement(
          { pageLanguage: 'en', includedLanguages: 'en,fr,es', layout: google.translate.TranslateElement.InlineLayout.SIMPLE },
          translateRef.current
        );
      }
    }
  }, [isMenuOpen]);

  // Desktop Header Component
  const DesktopHeader = () => (
    <div className="desktop-header">
      <div className="container">
        <div onClick={navigateHome} className="logo">
          <span className="logo-text">Lamlight-Grp</span>
          <span className="logo-subtitle">Global Shipping Solutions</span>
        </div>
        
        <nav className="desktop-nav">
          <ul className="nav-list">
            <li><Link to="/#shipping" onClick={closeMenu}>Shipping</Link></li>
            <li><Link to="/track" onClick={closeMenu}>Tracking</Link></li>
            <li><Link to="/support" onClick={closeMenu}>Support</Link></li>
            <li><Link to="/#account" onClick={closeMenu}>Account</Link></li>
            <li><Link to="/login" className="login-btn" onClick={closeMenu}>Sign Up/Log In</Link></li>
          </ul>
          <div className="translate-wrapper">
            <div id="google_translate_element" ref={translateRef}></div>
          </div>
        </nav>
      </div>
    </div>
  );

  // Mobile Header Component
  const MobileHeader = () => (
    <div className="mobile-header">
      <div className="container">
        <div onClick={navigateHome} className="logo">
          <span className="logo-text">Lamlight-Grp</span>
          <span className="logo-subtitle">Global Shipping Solutions</span>
        </div>
        
        <button 
          ref={toggleRef}
          className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      
      <nav ref={navRef} className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
        <ul className="nav-list">
          <li><Link to="/#shipping" onClick={closeMenu}>Shipping</Link></li>
          <li><Link to="/track" onClick={closeMenu}>Tracking</Link></li>
          <li><Link to="/support" onClick={closeMenu}>Support</Link></li>
          <li><Link to="/#account" onClick={closeMenu}>Account</Link></li>
          <li><Link to="/login" className="login-btn" onClick={closeMenu}>Sign Up/Log In</Link></li>
        </ul>
        <div className="translate-wrapper">
          <div id="google_translate_element" ref={translateRef}></div>
        </div>
      </nav>
      
      <div 
        className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={handleOverlayClick}
        aria-hidden="true"
      />
    </div>
  );

  return (
    <header className={`header ${isScrolled ? 'header-transparent' : ''}`}>
      {isMobile ? <MobileHeader /> : <DesktopHeader />}
    </header>
  );
};

export default Header;