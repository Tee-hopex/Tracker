
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import GoogleTranslate from "../../components/GoogleTranslate";
import LangButtons from '../LangButton';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  const toggleRef = useRef(null);
  const translateRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const languages = 'fr,es,de,ar,pt,it,zh-CN,zh-TW,ms';

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigateHome = () => {
    navigate('/');
    setIsMenuOpen(false);
  };

  const closeMenu = useCallback(() => {
    setTimeout(() => setIsMenuOpen(false), 100);
  }, []);

  const handleOverlayClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isMenuOpen]);

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

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location]);

  useEffect(() => {
    if (isMenuOpen && window.google && window.google.translate && translateRef.current) {
      window.google.translate.TranslateElement(
        { 
          pageLanguage: 'en', 
          includedLanguages: languages, 
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE 
        },
        translateRef.current
      );
    }
  }, [isMenuOpen, languages]);

  const DesktopHeader = () => (
    <div className="desktop-header">
      <div className="container">
        <div onClick={navigateHome} className="logo">
          <span className="logo-text">Lamlight Express</span>
          <span className="logo-subtitle">Global Shipping Solutions</span>
        </div>
        
        <nav className="desktop-nav">
          <ul className="nav-list">
            <li><Link to="/#shipping" onClick={closeMenu}>Shipping</Link></li>
            {/* <li><a href="https://tracking.lamlights.com/" onClick={closeMenu}>Tracking</a></li> */}
            <li><Link to="/#quick-track" onClick={closeMenu}>Tracking</Link></li>
            <li><Link to="/support" onClick={closeMenu}>Support</Link></li>
            <li><Link to="/#account" onClick={closeMenu}>Account</Link></li>
          <div className="translate-wrap">
            <GoogleTranslate languages={languages} />
            <LangButtons />
          </div>
          </ul>
        </nav>
      </div>
    </div>
  );

  const MobileHeader = () => (
    <div className="mobile-header">
      <div className="container">
        <div onClick={navigateHome} className="logo">
          <span className="logo-text">Lamlight Express</span>
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
          {/* <li><a href="https://tracking.lamlights.com/" onClick={closeMenu}>Tracking</a></li> */}
          <li><a href="/#quick-track" onClick={closeMenu}>Tracking</a></li>
          <li><Link to="/support" onClick={closeMenu}>Support</Link></li>
          <li><Link to="/#account" onClick={closeMenu}>Account</Link></li>
        </ul>
        <div className="translate-wrap">
          <GoogleTranslate ref={translateRef} languages={languages} />
          <LangButtons />
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