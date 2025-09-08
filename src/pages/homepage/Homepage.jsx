// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Header from '../../components/Header/Header';
// import Footer from '../../components/Footer/Footer';
// import './Hompage.css';
// import heroImage from '../../assets/images/lamlight.png';
// import heroImagemobile from '../../assets/images/mobile.png';
// import Welcome from '../../components/welcome/Welcome';

// const Homepage = () => {
//   const [trackingId, setTrackingId] = useState('');
//   const [showError, setShowError] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [shipmentData, setShipmentData] = useState(null);
//   const navigate = useNavigate();

//   const navigatetrack = () => {
//     window.location.href = 'http://localhost:5173/track';
//   };

//   const navigateSupport = () => {
//     navigate('/support');
//   };

//   const handleTrackingSubmit = async (e) => {
//     e.preventDefault();
//     if (trackingId.trim() === '') {
//       setShowError(true);
//       setErrorMessage('Please enter a valid tracking number.');
//       return;
//     }
    
//     setShowError(false);
//     setErrorMessage('');
//     setIsLoading(true);
    
//     try {
//       // Assuming your PHP API endpoint returns JSON. Adjust the URL if needed (e.g., for local dev).
//       // For production, use 'https://backend.capitaltradex.tech/track?track_code=' + trackingId
//       const response = await fetch(`https://lamlights.com/api/track.php?number=${encodeURIComponent(trackingId)}`);
      
//       if (!response.ok) {
//         throw new Error('Network error');
//       }
      
//       const data = await response.json();
      
//       if (data.error || !data) {
//         setErrorMessage(data.error || 'No shipment found for this tracking code.');
//       } else {
//         setShipmentData(data);
//         setShowModal(true);
//       }
//     } catch (err) {
//       setErrorMessage('An error occurred. Please try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const printShipment = () => {
//     const printableArea = document.getElementById('printable-area');
//     if (printableArea) {
//       const printContents = printableArea.innerHTML;
//       const originalContents = document.body.innerHTML;
      
//       document.body.innerHTML = printContents;
//       window.print();
//       document.body.innerHTML = originalContents;
//       window.location.reload(); // Reload to restore React state
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="app">
//         <Welcome heroImage={heroImage} mobileHeroImage={heroImagemobile} />

//         {/* Quick Tracking Section */}
//         <section id="quick-track" className="quick-track-section">
//           <div className="container">
//             <div className="quick-track-content">
//               <div className="quick-track-text">
//                 <h2>Track Your Package</h2>
//                 <p>Enter your tracking number to get real-time updates</p>
//               </div>
//               <form onSubmit={handleTrackingSubmit} className="quick-tracking-form">
//                 <div className="input-group">
//                   <input
//                     type="text"
//                     value={trackingId}
//                     onChange={(e) => {
//                       setTrackingId(e.target.value);
//                       setShowError(false);
//                       setErrorMessage('');
//                     }}
//                     placeholder="Enter tracking number (e.g., LG123456789)"
//                     className="quick-tracking-input"
//                     aria-label="Enter tracking number"
//                     disabled={isLoading}
//                   />
//                   <button
//                     type="submit"
//                     className="quick-track-btn"
//                     disabled={isLoading}
//                     aria-label="Track package"
//                   >
//                     {isLoading ? (
//                       <span className="loading-spinner"></span>
//                     ) : (
//                       <span>Track</span>
//                     )}
//                   </button>
//                 </div>
//                 {(showError || errorMessage) && <p className="error">{errorMessage}</p>}
//               </form>
//             </div>
//           </div>
//         </section> 

//         {/* Tracking Section */}
//         <section id="tracking" className="section tracking-section">
//           <div className="section-background"></div>
//           <div className="container">
//             <div className="section-header">
//               <h2>Advanced Tracking</h2>
//               <p>Comprehensive tracking solutions for all your shipments</p>
//             </div>
//             <div className="services-grid">
//               <div onClick={navigatetrack} className="service-card featured">
//                 <div className="service-icon">GPS</div>
//                 <h3>Real-time Location</h3>
//                 <p>Monitor your package location with live GPS tracking and instant status updates</p>
//                 <span onClick={navigatetrack} className="service-link">Track Package</span>
//               </div>
//               <div className="service-card">
//                 <div className="service-icon">WEB</div>
//                 <h3>Web Tracking Portal</h3>
//                 <p>Access detailed tracking information through our secure online platform</p>
//                 <span onClick={navigatetrack} className="service-link">Access Portal</span>
//               </div>
//               <div className="service-card">
//                 <div className="service-icon">SMS</div>
//                 <h3>SMS Updates</h3>
//                 <p>Receive important delivery notifications directly to your mobile device</p>
//                 <span onClick={navigatetrack} className="service-link">Enable SMS</span>
//               </div>
//               <div className="service-card">
//                 <div className="service-icon">RPT</div>
//                 <h3>Delivery Reports</h3>
//                 <p>Generate comprehensive reports and analyze your shipping patterns</p>
//                 <span onClick={navigatetrack} className="service-link">View Reports</span>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Shipping Section */}
//         <section id="shipping" className="section shipping-section" style={{ height: '100vh', scrollMarginTop: '70px' }}>
//           <div className="container">
//             <div className="section-header">
//               <h2>🚚 Shipping Services</h2>
//               <p>Complete shipping solutions tailored to your needs</p>
//             </div>
//             <div className="shipping-grid">
//               <div className="shipping-card express">
//                 <div className="shipping-badge">Popular</div>
//                 <div className="shipping-icon">⚡</div>
//                 <h3>Express Shipping</h3>
//                 <p>Fast delivery for urgent packages</p>
//                 <div className="shipping-features">
//                   <span>✓ Next-day delivery</span>
//                   <span>✓ Real-time tracking</span>
//                   <span>✓ Insurance included</span>
//                 </div>
//                 <Link to="/quote?type=express" className="shipping-btn">Get Quote</Link>
//               </div>
              
//               <div className="shipping-card standard">
//                 <div className="shipping-icon">📦</div>
//                 <h3>Standard Shipping</h3>
//                 <p>Reliable delivery at great value</p>
//                 <div className="shipping-features">
//                   <span>✓ 3-5 business days</span>
//                   <span>✓ Package tracking</span>
//                   <span>✓ Affordable rates</span>
//                 </div>
//                 <Link to="/quote?type=standard" className="shipping-btn">Get Quote</Link>
//               </div>
              
//               <div className="shipping-card freight">
//                 <div className="shipping-icon">🚛</div>
//                 <h3>Freight Services</h3>
//                 <p>Heavy and bulk shipments</p>
//                 <div className="shipping-features">
//                   <span>✓ Custom solutions</span>
//                   <span>✓ Dedicated support</span>
//                   <span>✓ Global network</span>
//                 </div>
//                 <Link to="/quote?type=freight" className="shipping-btn">Get Quote</Link>
//               </div>
//             </div>
            
//             <div className="shipping-tools">
//               <h3>Shipping Tools & Resources</h3>
//               <div className="tools-grid">
//                 <Link to="/calculator" className="tool-item">
//                   <span className="tool-icon">📋</span>
//                   <span>Shipping Calculator</span>
//                 </Link>
//                 <Link to="/labels" className="tool-item">
//                   <span className="tool-icon">📄</span>
//                   <span>Print Labels</span>
//                 </Link>
//                 <Link to="/pickup" className="tool-item">
//                   <span className="tool-icon">📅</span>
//                   <span>Schedule Pickup</span>
//                 </Link>
//                 <Link to="/packaging-guide" className="tool-item">
//                   <span className="tool-icon">📦</span>
//                   <span>Packaging Guide</span>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Support Section */}
//         <section id="support" className="section support-section">
//           <div className="container">
//             <div className="section-header">
//               <h2>🛟 Customer Support</h2>
//               <p>We're here to help 24/7 with expert support</p>
//             </div>
            
//             <div className="support-grid">
//               <div className="support-main">
//                 <div className="support-card primary" style={{ backgroundColor: 'black' } }>
//                   <div className="support-icon">💬</div>
//                   <h3>Live Chat Support</h3>
//                   <p>Get instant help from our support team</p>
//                   <button className="support-btn">Start Chat</button>
//                 </div>
                
//                 <div className="support-stats">
//                   <div className="stat-item">
//                     <span className="stat-number">24/7</span>
//                     <span className="stat-label">Available</span>
//                   </div>
//                   <div className="stat-item">
//                     <span className="stat-number"> 2min</span>
//                     <span className="stat-label">Response Time</span>
//                   </div>
//                   <div className="stat-item">
//                     <span className="stat-number">98%</span>
//                     <span className="stat-label">Satisfaction</span>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="support-options">
//                 <div className="support-option">
//                   <span className="option-icon">📞</span>
//                   <h4>Phone Support</h4>
//                   <p>+1 (800) LAMLIGHT</p>
//                 </div>
//                 <div className="support-option">
//                   <span className="option-icon">📧</span>
//                   <h4>Email Support</h4>
//                   <p>support@Lamlight Express.com</p>
//                 </div>
//                 <div onClick={navigateSupport} className="support-option">
//                   <span className="option-icon">❓</span>
//                   <h4>Help Center</h4>
//                   <p>Find answers to common questions</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Account Section */}
//         <section id="account" className="section account-section">
//           <div className="container">
//             <div className="section-header">
//               <h2>👤 Account Management</h2>
//               <p>Manage your shipping account and preferences</p>
//             </div>
            
//             <div className="account-grid">
//               <div className="account-card login-card">
//                 <div className="account-icon">🔐</div>
//                 <h3>Customer Portal</h3>
//                 <p>Access your account dashboard</p>
//                 <div className="account-features">
//                   <span>• View shipment history</span>
//                   <span>• Manage addresses</span>
//                   <span>• Track expenses</span>
//                   <span>• Download invoices</span>
//                 </div>
//                 <Link className="account-btn primary">Sign In</Link>
//               </div>
              
//               <div className="account-card signup-card">
//                 <div className="account-icon">🆕</div>
//                 <h3>New Customer?</h3>
//                 <p>Join thousands of satisfied customers</p>
//                 <div className="signup-benefits">
//                   <span>✓ Special rates</span>
//                   <span>✓ Priority support</span>
//                   <span>✓ Exclusive offers</span>
//                   <span>✓ Advanced tools</span>
//                 </div>
//                 <Link  className="account-btn secondary">Open Account</Link>
//               </div>
              
//               <div className="account-services">
//                 <h3>Account Services</h3>
//                 <div className="services-list">
//                   <Link  className="service-item">
//                     <span>📊</span>
//                     <span>Billing & Invoicing</span>
//                   </Link>
//                   <Link  className="service-item">
//                     <span>📋</span>
//                     <span>Shipping Reports</span>
//                   </Link>
//                   <Link  className="service-item">
//                     <span>⚙️</span>
//                     <span>Account Settings</span>
//                   </Link>
//                   <Link  className="service-item">
//                     <span>👥</span>
//                     <span>User Management</span>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* News Section */}
//         <section id="news" className="section news-section">
//           <div className="container">
//             <div className="section-header">
//               <h2>Industry News & Updates</h2>
//               <p>Stay informed with the latest developments in global shipping and maritime trade</p>
//             </div>
            
//             <div className="news-grid">
//               <article className="news-card featured">
//                 <div className="news-badge">Breaking</div>
//                 <h3>South China Sea Maritime Security Alert</h3>
//                 <p>Recent collision incidents highlight increased commercial shipping risks in disputed waters. Maritime security experts recommend enhanced route monitoring and risk assessments.</p>
//                 <div className="news-meta">
//                   <span className="news-date">August 11, 2025</span>
//                   <span className="news-category">Security</span>
//                 </div>
//                 <div className="news-source">
//                   <a href="https://www.hellenicshippingnews.com/maritime-intelligence-brief-11-august-2025/" target="_blank" rel="noopener noreferrer">
//                     Source: Hellenic Shipping News
//                   </a>
//                 </div>
//               </article>
              
//               <div className="news-card">
//                 <div className="news-badge">Policy</div>
//                 <h3>US Ends De Minimis Duty Exemption</h3>
//                 <p>Executive order eliminates $800 duty-free threshold for international shipments starting August 29, 2025, significantly impacting e-commerce and supply chains globally.</p>
//                 <div className="news-meta">
//                   <span className="news-date">August 29, 2025</span>
//                   <span className="news-category">Trade Policy</span>
//                 </div>
//                 <div className="news-source">
//                   <a href="https://www.avalara.com/blog/en/north-america/2024/11/de-minimis-exemption-changes-coming.html" target="_blank" rel="noopener noreferrer">
//                     Source: Avalara
//                   </a>
//                 </div>
//               </div>
              
//               <article className="news-card">
//                 <h3>Ocean Freight Markets Face Tariff Uncertainty</h3>
//                 <p>Maritime shipping markets remain sensitive to tariff policy shifts as the reciprocal tariff pause expires, potentially affecting global trade patterns through 2025.</p>
//                 <div className="news-meta">
//                   <span className="news-date">August 12, 2025</span>
//                   <span className="news-category">Trade Policy</span>
//                 </div>
//                 <div className="news-source">
//                   <a href="https://www.freightos.com/freight-blog/shipping-delays-and-cost-increases" target="_blank" rel="noopener noreferrer">
//                     Source: Freightos
//                   </a>
//                 </div>
//               </article>
              
//               <article className="news-card">
//                 <h3>IMO Carbon Emissions Regulations Shape 2025</h3>
//                 <p>Global shipping industry prepares for new environmental regulations as clarity on carbon emissions becomes a defining factor for maritime operations.</p>
//                 <div className="news-meta">
//                   <span className="news-date">August 10, 2025</span>
//                   <span className="news-category">Environment</span>
//                 </div>
//                 <div className="news-source">
//                   <a href="https://www.lloydslist.com/LL1151828/Ten-trends-that-will-shape-the-shipping-industry-in-2025-and-beyond" target="_blank" rel="noopener noreferrer">
//                     Source: Lloyd's List
//                   </a>
//                 </div>
//               </article>
              
//               <article className="news-card">
//                 <h3>Port Infrastructure Investments Rise</h3>
//                 <p>Significant investments in global port infrastructure continue as the industry adapts to growing cruise markets and enhanced environmental protection measures.</p>
//                 <div className="news-meta">
//                   <span className="news-date">August 8, 2025</span>
//                   <span className="news-category">Infrastructure</span>
//                 </div>
//                 <div className="news-source">
//                   <a href="https://www.shipuniverse.com/2025-shipping-routes-forecast-opportunities-risks-and-trends/" target="_blank" rel="noopener noreferrer">
//                     Source: Ship Universe
//                   </a>
//                 </div>
//               </article>
              
//               <article className="news-card">
//                 <h3>Supply Chain Disruption Alert</h3>
//                 <p>Major policy shifts create unexpected challenges for international e-commerce logistics, with over 30% of consumer-bound shipments now subject to new customs procedures.</p>
//                 <div className="news-meta">
//                   <span className="news-date">August 6, 2025</span>
//                   <span className="news-category">Supply Chain</span>
//                 </div>
//                 <div className="news-source">
//                   <a href="https://www.ups.com/cn/en/supplychain/resources/news-and-market-updates/market-update-august-6-2025" target="_blank" rel="noopener noreferrer">
//                     Source: UPS Supply Chain
//                   </a>
//                 </div>
//               </article>
//             </div>
            
//             <div className="news-cta">
//               <a href="https://maritime-executive.com/shipping-news" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
//                 View More Industry News
//               </a>
//             </div>
//           </div>
//         </section>

//         {/* Shipment Details Modal */}
//         {showModal && shipmentData && (
//           <div className="shipment-modal">
//             <div className="shipment-wrapper" id="printable-area">
//               <button onClick={() => setShowModal(false)} className="close-button">&times;</button>

//               <div className="shipment-header">
//                 <h1>Lamlight Express</h1>
//                 <p><strong>Tracking No:</strong> {shipmentData.tracking_code || 'N/A'}</p>
//               </div>

//               <div className="shipment-content">
//                 <div className="shipment-row">
//                   <div className="shipment-box">
//                     <h3>Shipper Address</h3>
//                     <p><strong>Name:</strong> {shipmentData.shipper_name || 'N/A'}</p>
//                     <p><strong>Address:</strong> {shipmentData.shipper_address || 'N/A'}</p>
//                     <p><strong>Email:</strong> {shipmentData.shipper_email || 'N/A'}</p>
//                   </div>
//                   <div className="shipment-box">
//                     <h3>Receiver Address</h3>
//                     <p><strong>Name:</strong> {shipmentData.receiver_name || 'N/A'}</p>
//                     <p><strong>Address:</strong> {shipmentData.receiver_address || 'N/A'}</p>
//                     <p><strong>Email:</strong> {shipmentData.receiver_email || 'N/A'}</p>
//                   </div>
//                 </div>

//                 <div className="shipment-status">
//                   <p>SHIPMENT STATUS: <strong>{shipmentData.status || 'Unknown'}</strong></p>
//                 </div>

//                 <div className="shipment-info-grid">
//                   <div><strong>Product:</strong> {shipmentData.product_type || 'N/A'}</div>
//                   <div><strong>Payment Mode:</strong> {shipmentData.payment_mode || 'N/A'}</div>
//                   <div><strong>Pickup Date:</strong> {shipmentData.pickup_date || 'N/A'}</div>
//                   <div><strong>Weight:</strong> {shipmentData.weight || 'N/A'} kg</div>
//                   <div><strong>Quantity:</strong> {shipmentData.quantity || 'N/A'}</div>
//                   <div><strong>Total Freight:</strong> ${shipmentData.total_freight || 'N/A'}</div>
//                   <div><strong>Departure Time:</strong> {shipmentData.departure_time || 'N/A'}</div>
//                   <div><strong>Destination:</strong> {shipmentData.destination || 'N/A'}</div>
//                   <div><strong>Expected Delivery Date:</strong> {shipmentData.expected_delivery_date || 'N/A'}</div>
//                 </div>

//                 <div className="map-container">
//                   <iframe
//                     src={`https://www.google.com/maps?q=${encodeURIComponent(shipmentData.destination || 'Unknown')}&output=embed`}
//                     width="100%" height="300" style={{border:0}} allowFullScreen loading="lazy"
//                   ></iframe>
//                 </div>

//                 <div className="button-group">
//                   <button onClick={() => setShowModal(false)} className="form-close-btn">Close</button>
//                   <button onClick={printShipment} className="form-close-btn print">Print as PDF</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Homepage;



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
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [shipmentData, setShipmentData] = useState(null);
  const navigate = useNavigate();

  const navigatetrack = () => {
    window.location.href = 'http://localhost:5173/track';
  };

  const navigateSupport = () => {
    navigate('/support');
  };

  useEffect(() => {
    // Avoid re-injecting the widget if it's already present
    if (window._smartsupp) return;

    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key = "db35a7ec3a4bfa2cef08cc9d0c9f6dde4f19a955";

    // Set your desired widget color here—this must come before the script loads
    window._smartsupp.color = "#006a74";  //  Your custom color :contentReference[oaicite:0]{index=0}

    // Inject the Smartsupp widget script
    (function(d) {
      var s, c, o;
      o = function () {
        o._.push(arguments);
      };
      o._ = [];
      window.smartsupp = o;

      s = d.getElementsByTagName("script")[0];
      c = d.createElement("script");
      c.type = "text/javascript";
      c.charset = "utf-8";
      c.async = true;
      c.src = "https://www.smartsuppchat.com/loader.js?";
      s.parentNode.insertBefore(c, s);
    })(document);

  }, []);


  // Dummy data for testing (uncomment for local testing when API is unavailable)
  const dummyShipmentData = {
    tracking_code: "CX20250827765861",
    shipper_name: "Wang",
    shipper_address: "Israel",
    shipper_email: "wang3889wei@gmail.com",
    receiver_name: "Chen Meixiu",
    receiver_address: "Taipei Taiwan",
    receiver_email: "wang3889wei@gmail.com",
    status: "In Transit",
    product_type: "Briefcase",
    payment_mode: "Cash",
    pickup_date: "2025-08-27",
    weight: "15.00",
    quantity: "1",
    total_freight: "5000.00",
    departure_time: "14:22:00",
    destination: "China",
    expected_delivery_date: "2025-08-31"
  };

  const handleTrackingSubmit = async (e) => {
    e.preventDefault();
    if (trackingId.trim() === '') {
      setShowError(true);
      setErrorMessage('Please enter a valid tracking number.');
      return;
    }

    setShowError(false);
    setErrorMessage('');
    setIsLoading(true);

    try {
      // Live API call with headers to mimic Postman
      const response = await fetch(`https://lamlights.com/api/track.php?number=${encodeURIComponent(trackingId)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': navigator.userAgent,
        }
      });

      console.log('Response Status:', response.status);
      console.log('Response Headers:', [...response.headers.entries()]);

      // if (!response.ok) {
      //   const errorText = await response.text();
      //   console.error('Response Error Text:', errorText);
      //   throw new Error(`Network error: ${response.status} ${response.error}`);
      // }

      const data = await response.json();
      console.log('API Response:', data);

      if (!data.ok || !data.shipment) {
        setErrorMessage(`${data.error}: 'No shipment found for this tracking code.'`);
      } else {
        setShipmentData(data.shipment);
        setShowModal(true);
      }

      // Uncomment for dummy data testing
      /*
      if (trackingId === "CX20250827765861") {
        setTimeout(() => {
          setShipmentData(dummyShipmentData);
          setShowModal(true);
          setIsLoading(false);
        }, 1000);
      } else {
        throw new Error('No shipment found for this tracking code.');
      }
      */
    } catch (err) {
      console.error('Fetch Error:', err.message);
      setErrorMessage(err.message || 'An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const printShipment = () => {
    const printableArea = document.getElementById('printable-area');
    if (printableArea) {
      // Create a new window for printing
      const printWindow = window.open('', '_blank');
      const printContents = printableArea.innerHTML;

      // Write content to the new window with print-specific styles matching PHP
      printWindow.document.write(`
        <html>
          <head>
            <title>Shipment Details</title>
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                background: white;
                margin: 0;
                padding: 0;
              }
              .shipment-wrapper {
                max-width: none;
                width: 100%;
                padding: 0;
                border-radius: 0;
                box-shadow: none;
              }
              .shipment-header {
                background: linear-gradient(135deg, #005f69 0%, #007a85 100%);
                color: white;
                padding: 30px;
                text-align: center;
                border-radius: 0;
                page-break-inside: avoid;
              }
              .shipment-header h1 {
                color: white;
                margin-bottom: 10px;
                font-size: 36px;
                font-weight: 700;
              }
              .shipment-header p {
                margin: 0;
                font-size: 16px;
              }
              .shipment-content {
                padding: 20px;
              }
              .shipment-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 30px;
                margin-bottom: 30px;
                page-break-inside: avoid;
              }
              .shipment-box {
                background: #f8fafc;
                padding: 25px;
                border-radius: 12px;
                border-left: 4px solid #007a85;
              }
              .shipment-box h3 {
                color: #005f69;
                margin-bottom: 15px;
                font-size: 18px;
              }
              .shipment-box p {
                margin-bottom: 8px;
                color: #555;
              }
              .shipment-status {
                text-align: center;
                margin-bottom: 30px;
                padding: 20px;
                background: #e6fffa;
                border-radius: 12px;
                border: 1px solid #38d9a9;
                page-break-inside: avoid;
              }
              .shipment-status p {
                font-size: 18px;
                color: #0f5132;
                margin: 0;
              }
              .shipment-info-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 15px;
                margin-bottom: 30px;
                page-break-inside: avoid;
              }
              .shipment-info-grid div {
                background: white;
                padding: 15px;
                border-radius: 8px;
                border: 1px solid #e1e5e9;
              }
              .map-container, .button-group, .close-button {
                display: none;
              }
              @media print {
                * {
                  visibility: hidden;
                }
                .shipment-wrapper {
                  visibility: visible !important;
                  position: static !important;
                  max-width: none !important;
                  max-height: none !important;
                  overflow: visible !important;
                  box-shadow: none !important;
                  border-radius: 0 !important;
                  margin: 0 !important;
                  padding: 0 !important;
                  width: 100% !important;
                }
                .shipment-wrapper * {
                  visibility: visible !important;
                }
                .close-button, .button-group, .map-container {
                  display: none !important;
                }
                .shipment-header {
                  border-radius: 0 !important;
                  page-break-inside: avoid;
                }
                .shipment-content {
                  padding: 20px !important;
                }
                .shipment-row {
                  page-break-inside: avoid;
                }
                .shipment-info-grid {
                  page-break-inside: avoid;
                }
                body {
                  background: white !important;
                }
              }
            </style>
          </head>
          <body>
            <div class="shipment-wrapper">
              ${printContents}
            </div>
          </body>
        </html>
      `);

      printWindow.document.close();
      
      // Ensure content is rendered before printing
      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      };
    } else {
      console.error('Printable area not found');
    }
  };

  return (
    <>
      <Header />
      <div className="app">
        <Welcome heroImage={heroImage} mobileHeroImage={heroImagemobile} />

        {/* Quick Tracking Section */}
        {/* <section id="quick-track" className="quick-track-section">
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
                      setErrorMessage('');
                    }}
                    placeholder="Enter tracking number (e.g., CX20250827765861)"
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
                {(showError || errorMessage) && <p className="error">{errorMessage}</p>}
              </form>
            </div>
          </div>
        </section> */}

        {/* Tracking Section */}
        <section id="tracking" className="section tracking-section">
          <div className="section-background"></div>
          <div className="container">
            <div className="section-header">
              <h2>Advanced Tracking</h2>
              <p>Comprehensive tracking solutions for all your shipments</p>
            </div>
            <div className="services-grid">
              <div className="service-card featured">
                <div className="service-icon">GPS</div>
                <h3>Real-time Location</h3>
                <p>Monitor your package location with live GPS tracking and instant status updates</p>
                <span className="service-link">Track Package</span>
              </div>
              <div className="service-card">
                <div className="service-icon">WEB</div>
                <h3>Web Tracking Portal</h3>
                <p>Access detailed tracking information through our secure online platform</p>
                <span className="service-link">Access Portal</span>
              </div>
              <div className="service-card">
                <div className="service-icon">SMS</div>
                <h3>SMS Updates</h3>
                <p>Receive important delivery notifications directly to your mobile device</p>
                <span className="service-link">Enable SMS</span>
              </div>
              <div className="service-card">
                <div className="service-icon">RPT</div>
                <h3>Delivery Reports</h3>
                <p>Generate comprehensive reports and analyze your shipping patterns</p>
                <span className="service-link">View Reports</span>
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
                <div className="support-card primary" style={{ backgroundColor: 'black' }}>
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
                    <span className="stat-number">2min</span>
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
                  <p>support@Lamlight Express.com</p>
                </div>
                <div onClick={navigateSupport} className="support-option">
                  <span className="option-icon">❓</span>
                  <h4>Help Center</h4>
                  <p>Find answers to common questions</p>
                </div>
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
                <Link className="account-btn primary">Sign In</Link>
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
                <Link className="account-btn secondary">Open Account</Link>
              </div>
              
              <div className="account-services">
                <h3>Account Services</h3>
                <div className="services-list">
                  <Link className="service-item">
                    <span>📊</span>
                    <span>Billing & Invoicing</span>
                  </Link>
                  <Link className="service-item">
                    <span>📋</span>
                    <span>Shipping Reports</span>
                  </Link>
                  <Link className="service-item">
                    <span>⚙️</span>
                    <span>Account Settings</span>
                  </Link>
                  <Link className="service-item">
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
              
              <div className="news-card">
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
              </div>
              
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

        {/* Shipment Details Modal */}
        {showModal && shipmentData && (
          <div className="shipment-modal">
            <div className="shipment-wrapper" id="printable-area">
              <button onClick={() => setShowModal(false)} className="close-button">&times;</button>

              <div className="shipment-header">
                <h1>Lamlight Express</h1>
                <p><strong>Tracking No:</strong> {shipmentData.tracking_code || 'N/A'}</p>
              </div>

              <div className="shipment-content">
                <div className="shipment-row">
                  <div className="shipment-box">
                    <h3>Shipper Address</h3>
                    <p><strong>Name:</strong> {shipmentData.shipper_name || 'N/A'}</p>
                    <p><strong>Address:</strong> {shipmentData.shipper_address || 'N/A'}</p>
                    <p><strong>Email:</strong> {shipmentData.shipper_email || 'N/A'}</p>
                  </div>
                  <div className="shipment-box">
                    <h3>Receiver Address</h3>
                    <p><strong>Name:</strong> {shipmentData.receiver_name || 'N/A'}</p>
                    <p><strong>Address:</strong> {shipmentData.receiver_address || 'N/A'}</p>
                    <p><strong>Email:</strong> {shipmentData.receiver_email || 'N/A'}</p>
                  </div>
                </div>

                <div className="shipment-status">
                  <p>Current Location: <strong>{shipmentData.destination || 'Unknown'}</strong></p>
                </div>

                <div className="shipment-info-grid">
                  <div><strong>Product:</strong> {shipmentData.product_type || 'N/A'}</div>
                  <div><strong>Payment Mode:</strong> {shipmentData.payment_mode || 'N/A'}</div>
                  <div><strong>Pickup Date:</strong> {shipmentData.pickup_date || 'N/A'}</div>
                  <div><strong>Weight:</strong> {shipmentData.weight || 'N/A'} kg</div>
                  <div><strong>Quantity:</strong> {shipmentData.quantity || 'N/A'}</div>
                  <div><strong>Total Freight:</strong> ${shipmentData.total_freight || 'N/A'}</div>
                  <div><strong>Departure Time:</strong> {shipmentData.departure_time || 'N/A'}</div>
                  <div><strong>Shipment Status:</strong> {shipmentData.status || 'N/A'}</div>
                  <div><strong>Expected Delivery Date:</strong> {shipmentData.expected_delivery_date || 'N/A'}</div>
                </div>

                <div className="map-container">
                  <iframe
                    src={`https://www.google.com/maps?q=${encodeURIComponent(shipmentData.destination || 'Unknown')}&output=embed`}
                    width="100%" 
                    height="300" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy"
                  ></iframe>
                </div>

                <div className="button-group">
                  <button onClick={() => setShowModal(false)} className="form-close-btn">Close</button>
                  <button onClick={printShipment} className="form-close-btn print">Print as PDF</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
  
        


      <Footer />
      
    </>
  );
};

export default Homepage;
