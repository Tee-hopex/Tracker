// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Welcome.css';

// const Welcome = ({ heroImage, mobileHeroImage }) => {
//   const isMobile = window.innerWidth <= 768;
//   console.log('Hero Image:', heroImage, 'Mobile Hero Image:', mobileHeroImage); // Debug log

//   const backgroundStyle = {
//     backgroundImage: `url(${isMobile ? mobileHeroImage : heroImage}), 
//                      linear-gradient(135deg, #005f69 0%, #007a85 50%, #00a8b8 100%),
//                      radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
//                      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`,
//     backgroundSize: 'cover, auto, auto, auto',
//     backgroundPosition: 'center, center, 20% 80%, 80% 20%',
//     backgroundRepeat: 'no-repeat, no-repeat, no-repeat, no-repeat',
//     transition: 'background-image 0.5s ease',
//   };

//   return (
//     <section id="welcome" className="hero" style={backgroundStyle}>
//       <div className="hero-background"></div>
//       <div className="hero-content">
//         {/* <div className="container">
//           <div className="hero-text">
//             <h1>
//               <span className="hero-title-main">Welcome to Lamlight Express</span>
//               <span className="hero-title-sub">Global Shipping Excellence</span>
//             </h1>
//             <p className="hero-description">
//               Your trusted partner for reliable, fast, and secure shipping solutions 
//               across the globe. Experience premium service with every delivery.
//             </p>
//           </div>
//         </div> */}
//       </div>
//       <div className="hero-wave">
//         <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
//           <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor"></path>
//         </svg>
//       </div>
//     </section>
//   );
// };

// export default Welcome;



// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Welcome.css';

// const Welcome = ({ heroImage, mobileHeroImage }) => {
//   const [trackingId, setTrackingId] = useState('');
//   const [showError, setShowError] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [shipmentData, setShipmentData] = useState(null);
//   const navigate = useNavigate();

//   const isMobile = window.innerWidth <= 768;
//   console.log('Hero Image:', heroImage, 'Mobile Hero Image:', mobileHeroImage); // Debug log

//   const backgroundStyle = {
//     backgroundImage: `url(${isMobile ? mobileHeroImage : heroImage}), 
//                      linear-gradient(135deg, #005f69 0%, #007a85 50%, #00a8b8 100%),
//                      radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
//                      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`,
//     backgroundSize: 'cover, auto, auto, auto',
//     backgroundPosition: 'center, center, 20% 80%, 80% 20%',
//     backgroundRepeat: 'no-repeat, no-repeat, no-repeat, no-repeat',
//     transition: 'background-image 0.5s ease',
//   };

//   // Dummy data for testing (uncomment for local testing when API is unavailable)
//   const dummyShipmentData = {
//     tracking_code: "CX20250827765861",
//     shipper_name: "Wang",
//     shipper_address: "Israel",
//     shipper_email: "wang3889wei@gmail.com",
//     receiver_name: "Chen Meixiu",
//     receiver_address: "Taipei Taiwan",
//     receiver_email: "wang3889wei@gmail.com",
//     status: "In Transit",
//     product_type: "Briefcase",
//     payment_mode: "Cash",
//     pickup_date: "2025-08-27",
//     weight: "15.00",
//     quantity: "1",
//     total_freight: "5000.00",
//     departure_time: "14:22:00",
//     destination: "China",
//     expected_delivery_date: "2025-08-31"
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
//       // Live API call with headers to mimic Postman
//       const response = await fetch(`https://lamlights.com/api/track.php?number=${encodeURIComponent(trackingId)}`, {
//         method: 'GET',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//           'User-Agent': navigator.userAgent,
//         }
//       });

//       console.log('Response Status:', response.status);
//       console.log('Response Headers:', [...response.headers.entries()]);

//       // if (!response.ok) {
//       //   const errorText = await response.text();
//       //   console.error('Response Error Text:', errorText);
//       //   throw new Error(`Network error: ${response.status} ${response.error}`);
//       // }

//       const data = await response.json();
//       console.log('API Response:', data);

//       if (!data.ok || !data.shipment) {
//         setErrorMessage(`${data.error}: 'No shipment found for this tracking code.'`);
//       } else {
//         setShipmentData(data.shipment);
//         setShowModal(true);
//       }

//       // Uncomment for dummy data testing
//       /*
//       if (trackingId === "CX20250827765861") {
//         setTimeout(() => {
//           setShipmentData(dummyShipmentData);
//           setShowModal(true);
//           setIsLoading(false);
//         }, 1000);
//       } else {
//         throw new Error('No shipment found for this tracking code.');
//       }
//       */
//     } catch (err) {
//       console.error('Fetch Error:', err.message);
//       setErrorMessage(err.message || 'An error occurred. Please try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const printShipment = () => {
//     const printableArea = document.getElementById('printable-area');
//     if (printableArea) {
//       // Create a new window for printing
//       const printWindow = window.open('', '_blank');
//       const printContents = printableArea.innerHTML;

//       // Write content to the new window with print-specific styles matching PHP
//       printWindow.document.write(`
//         <html>
//           <head>
//             <title>Shipment Details</title>
//             <style>
//               * {
//                 margin: 0;
//                 padding: 0;
//                 box-sizing: border-box;
//               }
//               body {
//                 font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
//                 background: white;
//                 margin: 0;
//                 padding: 0;
//               }
//               .shipment-wrapper {
//                 max-width: none;
//                 width: 100%;
//                 padding: 0;
//                 border-radius: 0;
//                 box-shadow: none;
//               }
//               .shipment-header {
//                 background: linear-gradient(135deg, #005f69 0%, #007a85 100%);
//                 color: white;
//                 padding: 30px;
//                 text-align: center;
//                 border-radius: 0;
//                 page-break-inside: avoid;
//               }
//               .shipment-header h1 {
//                 color: white;
//                 margin-bottom: 10px;
//                 font-size: 36px;
//                 font-weight: 700;
//               }
//               .shipment-header p {
//                 margin: 0;
//                 font-size: 16px;
//               }
//               .shipment-content {
//                 padding: 20px;
//               }
//               .shipment-row {
//                 display: grid;
//                 grid-template-columns: 1fr 1fr;
//                 gap: 30px;
//                 margin-bottom: 30px;
//                 page-break-inside: avoid;
//               }
//               .shipment-box {
//                 background: #f8fafc;
//                 padding: 25px;
//                 border-radius: 12px;
//                 border-left: 4px solid #007a85;
//               }
//               .shipment-box h3 {
//                 color: #005f69;
//                 margin-bottom: 15px;
//                 font-size: 18px;
//               }
//               .shipment-box p {
//                 margin-bottom: 8px;
//                 color: #555;
//               }
//               .shipment-status {
//                 text-align: center;
//                 margin-bottom: 30px;
//                 padding: 20px;
//                 background: #e6fffa;
//                 border-radius: 12px;
//                 border: 1px solid #38d9a9;
//                 page-break-inside: avoid;
//               }
//               .shipment-status p {
//                 font-size: 18px;
//                 color: #0f5132;
//                 margin: 0;
//               }
//               .shipment-info-grid {
//                 display: grid;
//                 grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//                 gap: 15px;
//                 margin-bottom: 30px;
//                 page-break-inside: avoid;
//               }
//               .shipment-info-grid div {
//                 background: white;
//                 padding: 15px;
//                 border-radius: 8px;
//                 border: 1px solid #e1e5e9;
//               }
//               .map-container, .button-group, .close-button {
//                 display: none;
//               }
//               @media print {
//                 * {
//                   visibility: hidden;
//                 }
//                 .shipment-wrapper {
//                   visibility: visible !important;
//                   position: static !important;
//                   max-width: none !important;
//                   max-height: none !important;
//                   overflow: visible !important;
//                   box-shadow: none !important;
//                   border-radius: 0 !important;
//                   margin: 0 !important;
//                   padding: 0 !important;
//                   width: 100% !important;
//                 }
//                 .shipment-wrapper * {
//                   visibility: visible !important;
//                 }
//                 .close-button, .button-group, .map-container {
//                   display: none !important;
//                 }
//                 .shipment-header {
//                   border-radius: 0 !important;
//                   page-break-inside: avoid;
//                 }
//                 .shipment-content {
//                   padding: 20px !important;
//                 }
//                 .shipment-row {
//                   page-break-inside: avoid;
//                 }
//                 .shipment-info-grid {
//                   page-break-inside: avoid;
//                 }
//                 body {
//                   background: white !important;
//                 }
//               }
//             </style>
//           </head>
//           <body>
//             <div class="shipment-wrapper">
//               ${printContents}
//             </div>
//           </body>
//         </html>
//       `);

//       printWindow.document.close();
      
//       // Ensure content is rendered before printing
//       printWindow.onload = () => {
//         printWindow.focus();
//         printWindow.print();
//         printWindow.close();
//       };
//     } else {
//       console.error('Printable area not found');
//     }
//   };

//   return (
//     <>
//       <section id="welcome" className="hero" style={backgroundStyle}>
//         <div className="hero-background"></div>
//         <div className="hero-content">
//           <div className="container">
//             <div className="hero-text">
//               <h1>
//                 <span className="hero-title-main">Welcome to Lamlight Express</span>
//                 <span className="hero-title-sub">Global Shipping Excellence</span>
//               </h1>
//               <p className="hero-description">
//                 {/* Your trusted partner for reliable, fast, and secure shipping solutions  */}
//                 {/* across the globe. Experience premium service with every delivery. */}
//               </p>
//             </div>
            
//             {/* Integrated Quick Tracking */}
//             <div className="hero-tracking">
//               <div className="hero-tracking-content">
//                 <h2 className="hero-tracking-title">Track Your Package</h2>
//                 <p className="hero-tracking-subtitle">Enter your tracking number to get real-time updates</p>
                
//                 <form onSubmit={handleTrackingSubmit} className="hero-tracking-form">
//                   <div className="hero-input-group">
//                     <input
//                       type="text"
//                       value={trackingId}
//                       onChange={(e) => {
//                         setTrackingId(e.target.value);
//                         setShowError(false);
//                         setErrorMessage('');
//                       }}
//                       placeholder="Enter tracking number (e.g., CX20250827765861)"
//                       className="hero-tracking-input"
//                       aria-label="Enter tracking number"
//                       disabled={isLoading}
//                     />
//                     <button
//                       type="submit"
//                       className="hero-track-btn"
//                       disabled={isLoading}
//                       aria-label="Track package"
//                     >
//                       {isLoading ? (
//                         <span className="loading-spinner"></span>
//                       ) : (
//                         <span>Track Package</span>
//                       )}
//                     </button>
//                   </div>
//                   {(showError || errorMessage) && <p className="hero-error">{errorMessage}</p>}
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="hero-wave">
//           <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
//             <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor"></path>
//           </svg>
//         </div>
//       </section>

//       {/* Shipment Details Modal */}
//       {showModal && shipmentData && (
//         <div className="shipment-modal">
//           <div className="shipment-wrapper" id="printable-area">
//             <button onClick={() => setShowModal(false)} className="close-button">&times;</button>

//             <div className="shipment-header">
//               <h1>Lamlight Express</h1>
//               <p><strong>Tracking No:</strong> {shipmentData.tracking_code || 'N/A'}</p>
//             </div>

//             <div className="shipment-content">
              

//               <div className="shipment-status">
//                 <p>Current Location: <strong>{shipmentData.destination || 'Unknown'}</strong></p>
//               </div>

//               <div className="shipment-info-grid">
//                 <div><strong>Product:</strong> {shipmentData.product_type || 'N/A'}</div>
//                 <div><strong>Payment Mode:</strong> {shipmentData.payment_mode || 'N/A'}</div>
//                 <div><strong>Pickup Date:</strong> {shipmentData.pickup_date || 'N/A'}</div>
//                 <div><strong>Weight:</strong> {shipmentData.weight || 'N/A'} kg</div>
//                 <div><strong>Quantity:</strong> {shipmentData.quantity || 'N/A'}</div>
//                 <div><strong>Total Freight:</strong> ${shipmentData.total_freight || 'N/A'}</div>
//                 <div><strong>Departure Time:</strong> {shipmentData.departure_time || 'N/A'}</div>
//                 <div><strong>Shipment Status:</strong> {shipmentData.status || 'N/A'}</div>
//                 <div><strong>Expected Delivery Date:</strong> {shipmentData.expected_delivery_date || 'N/A'}</div>
//               </div>

//               <div className="shipment-row">
//                 <div className="shipment-box">
//                   <h3>Shipper Address</h3>
//                   <p><strong>Name:</strong> {shipmentData.shipper_name || 'N/A'}</p>
//                   <p><strong>Address:</strong> {shipmentData.shipper_address || 'N/A'}</p>
//                   <p><strong>Email:</strong> {shipmentData.shipper_email || 'N/A'}</p>
//                 </div>
//                 <div className="shipment-box">
//                   <h3>Receiver Address</h3>
//                   <p><strong>Name:</strong> {shipmentData.receiver_name || 'N/A'}</p>
//                   <p><strong>Address:</strong> {shipmentData.receiver_address || 'N/A'}</p>
//                   <p><strong>Email:</strong> {shipmentData.receiver_email || 'N/A'}</p>
//                 </div>
//               </div>

//               <div className="map-container">
//                 <iframe
//                   src={`https://www.google.com/maps?q=${encodeURIComponent(shipmentData.destination || 'Unknown')}&output=embed`}
//                   width="100%" 
//                   height="300" 
//                   style={{ border: 0 }} 
//                   allowFullScreen 
//                   loading="lazy"
//                 ></iframe>
//               </div>

//               <div className="button-group">
//                 <button onClick={() => setShowModal(false)} className="form-close-btn">Close</button>
//                 <button onClick={printShipment} className="form-close-btn print">Print as PDF</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Welcome;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Welcome.css';

const Welcome = ({ heroImage, mobileHeroImage }) => {
  const [trackingId, setTrackingId] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [shipmentData, setShipmentData] = useState(null);
  const [showShipperDetails, setShowShipperDetails] = useState(false);
  const [showReceiverDetails, setShowReceiverDetails] = useState(false);
  const navigate = useNavigate();

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

  // Mock tracking timeline data
  const trackingUpdates = [
    {
      status: "Parcel shipped. ",
      timestamp: "August 16, 2024 05:02 pm",
      completed: true
    },
    {
      status: "Package delivered",
      timestamp: "August 16, 2024 04:02 pm",
      completed: true
    },
    {
      status: "Guangzhou warehouse, InternationalLogistics [InternationalLo] processing, order has been inbounded",
      timestamp: "August 01, 2024 09:27 am",
      completed: true
    }
  ];

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
              .tracking-timeline {
                background: white;
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 30px;
                border: 1px solid #e1e5e9;
              }
              .timeline-item {
                display: flex;
                align-items: flex-start;
                margin-bottom: 20px;
                position: relative;
              }
              .timeline-dot {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: #007a85;
                margin-right: 15px;
                margin-top: 4px;
                flex-shrink: 0;
              }
              .timeline-content h4 {
                color: #333;
                margin-bottom: 5px;
                font-size: 14px;
                line-height: 1.4;
              }
              .timeline-content p {
                color: #888;
                font-size: 12px;
                margin: 0;
              }
              .collapsible-section {
                margin-bottom: 20px;
              }
              .collapsible-header {
                background: #f8fafc;
                padding: 15px;
                border-radius: 8px;
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border: 1px solid #e1e5e9;
              }
              .map-container, .button-group, .close-button, .collapsible-toggle {
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
                .close-button, .button-group, .map-container, .collapsible-toggle {
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
                .tracking-timeline {
                  page-break-inside: avoid;
                }
                body {
                  background: white !important;
                }
                .collapsible-content {
                  display: block !important;
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
      <section id="welcome" className="hero" style={backgroundStyle}>
        <div className="hero-background"></div>
        <div className="hero-content">
          <div className="container">
            {/* <div className="hero-text">
              <h1>
                <span className="hero-title-main">Welcome to Lamlight Express</span>
                <span className="hero-title-sub">Global Shipping Excellence</span>
              </h1>
              <p className="hero-description">
                Your trusted partner for reliable, fast, and secure shipping solutions 
                across the globe. Experience premium service with every delivery.
              </p>
            </div> */}
            
            {/* Integrated Quick Tracking */}
            <div className="hero-tracking">
              <div className="hero-tracking-content">
                <h2 className="hero-tracking-title">Track Your Package</h2>
                <p className="hero-tracking-subtitle">Enter your tracking number to get real-time updates</p>
                
                <form onSubmit={handleTrackingSubmit} className="hero-tracking-form">
                  <div className="hero-input-group">
                    <input
                      type="text"
                      value={trackingId}
                      onChange={(e) => {
                        setTrackingId(e.target.value);
                        setShowError(false);
                        setErrorMessage('');
                      }}
                      placeholder="Enter tracking number (e.g., CX20250827765861)"
                      className="hero-tracking-input"
                      aria-label="Enter tracking number"
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      className="hero-track-btn"
                      disabled={isLoading}
                      aria-label="Track package"
                    >
                      {isLoading ? (
                        <span className="loading-spinner"></span>
                      ) : (
                        <span>Track Package</span>
                      )}
                    </button>
                  </div>
                  {(showError || errorMessage) && <p className="hero-error">{errorMessage}</p>}
                </form>
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

      {/* Shipment Details Modal */}
      {showModal && shipmentData && (
        <div className="shipment-modal">
          <div className="shipment-wrapper" id="printable-area">
            <button onClick={() => setShowModal(false)} className="close-button">&times;</button>

            <div className="shipment-header">
              <h1>Lamlight Express</h1>
              <p><strong>Tracking No:</strong> {shipmentData.tracking_code || 'N/A'}</p>
            </div>

            <div className="shipment-content">
              {/* Current Location - First */}
              <div className="shipment-status">
                <p>Current Location: <strong>{shipmentData.destination || 'Unknown'}</strong></p>
              </div>

              {/* Tracking Timeline - Second */}
              {trackingUpdates.length > 0 && (
                <div className="tracking-timeline">
                  <h3 style={{color: '#005f69', marginBottom: '20px', fontSize: '18px'}}>Tracking Updates</h3>
                  {trackingUpdates.map((update, index) => (
                    <div key={index} className="timeline-item">
                      <div 
                        className="timeline-dot" 
                        style={{
                          background: update.completed ? '#007a85' : '#e1e5e9',
                          width: update.isMain ? '16px' : '12px',
                          height: update.isMain ? '16px' : '12px',
                          border: update.isMain ? '3px solid #005f69' : 'none'
                        }}
                      ></div>
                      <div className="timeline-content">
                        <h4 style={{
                          color: update.isMain ? '#005f69' : '#333',
                          fontWeight: update.isMain ? 'bold' : 'normal',
                          fontSize: update.isMain ? '16px' : '14px'
                        }}>
                          {update.status}
                        </h4>
                        {update.timestamp && (
                          <p style={{color: '#888', fontSize: '12px', fontStyle: 'italic'}}>
                            {update.timestamp}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Shipment Info Grid - Third */}
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

              {/* Collapsible Shipper Address - Fourth */}
              <div className="collapsible-section">
                <div 
                  className="collapsible-header"
                  onClick={() => setShowShipperDetails(!showShipperDetails)}
                  style={{
                    background: '#f8fafc',
                    padding: '15px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: '1px solid #e1e5e9',
                    marginBottom: '10px'
                  }}
                >
                  <h3 style={{color: '#005f69', margin: '0', fontSize: '16px'}}>Shipper Address</h3>
                  <span className="collapsible-toggle" style={{color: '#007a85', fontSize: '18px'}}>
                    {showShipperDetails ? '−' : '+'}
                  </span>
                </div>
                {showShipperDetails && (
                  <div className="collapsible-content" style={{
                    background: 'white',
                    padding: '15px',
                    borderRadius: '0 0 8px 8px',
                    border: '1px solid #e1e5e9',
                    borderTop: 'none',
                    marginBottom: '10px'
                  }}>
                    <p style={{marginBottom: '8px', color: '#555'}}><strong>Name:</strong> {shipmentData.shipper_name || 'N/A'}</p>
                    <p style={{marginBottom: '8px', color: '#555'}}><strong>Address:</strong> {shipmentData.shipper_address || 'N/A'}</p>
                    <p style={{marginBottom: '0', color: '#555'}}><strong>Email:</strong> {shipmentData.shipper_email || 'N/A'}</p>
                  </div>
                )}
              </div>

              {/* Collapsible Receiver Address - Fifth */}
              <div className="collapsible-section">
                <div 
                  className="collapsible-header"
                  onClick={() => setShowReceiverDetails(!showReceiverDetails)}
                  style={{
                    background: '#f8fafc',
                    padding: '15px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: '1px solid #e1e5e9',
                    marginBottom: '20px'
                  }}
                >
                  <h3 style={{color: '#005f69', margin: '0', fontSize: '16px'}}>Receiver Address</h3>
                  <span className="collapsible-toggle" style={{color: '#007a85', fontSize: '18px'}}>
                    {showReceiverDetails ? '−' : '+'}
                  </span>
                </div>
                {showReceiverDetails && (
                  <div className="collapsible-content" style={{
                    background: 'white',
                    padding: '15px',
                    borderRadius: '0 0 8px 8px',
                    border: '1px solid #e1e5e9',
                    borderTop: 'none',
                    marginBottom: '20px'
                  }}>
                    <p style={{marginBottom: '8px', color: '#555'}}><strong>Name:</strong> {shipmentData.receiver_name || 'N/A'}</p>
                    <p style={{marginBottom: '8px', color: '#555'}}><strong>Address:</strong> {shipmentData.receiver_address || 'N/A'}</p>
                    <p style={{marginBottom: '0', color: '#555'}}><strong>Email:</strong> {shipmentData.receiver_email || 'N/A'}</p>
                  </div>
                )}
              </div>

              {/* Map - Last */}
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
    </>
  );
};

export default Welcome;