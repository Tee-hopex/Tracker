// import './i18n.js'; // Import early to initialize
// // Rest of your code...
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import Homepage from './pages/homepage/Homepage.jsx';
import Login from './pages/loginpage/Login.jsx';
import TrackingPage from './pages/Trackingpage/Trackingpage.jsx';
import SupportPage from './pages/supportpage/Supportpage.jsx';
import QuotePage from './pages/quotepage/Quotepage.jsx';
import PrivacyPolicy from './pages/privacypolicypage/Privacypolicy.jsx';
import TermsOfUse from './pages/temsofusepage/TermsOfUse.jsx';
// import './index.css'



// Component to handle scroll-to-top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use smooth scrolling for better UX (optional)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/track" element={<TrackingPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/quote" element={<QuotePage />} />
        <Route path="/quote/:type" element={<QuotePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfUse />} />
        {/* Add more routes as needed */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);