import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './TrackingPage.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const TrackingPage = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [trackingResult, setTrackingResult] = useState(null);
  const [error, setError] = useState('');
  const [lastTrackedNumber, setLastTrackedNumber] = useState('');
  const location = useLocation();

  // Sample tracking data (in a real app, this would come from your API)
  const sampleTrackingData = {
    'LG123456789': {
      trackingNumber: 'LG123456789',
      status: 'In Transit',
      estimatedDelivery: '2025-08-18',
      currentLocation: 'Lagos Distribution Center',
      destination: 'Abuja, FCT',
      origin: 'Lagos, Nigeria',
      service: 'Express International',
      weight: '2.5 kg',
      timeline: [
        { date: '2025-08-15 09:30', status: 'Package picked up', location: 'Lagos, Nigeria', completed: true },
        { date: '2025-08-15 14:20', status: 'Arrived at sorting facility', location: 'Lagos Distribution Center', completed: true },
        { date: '2025-08-16 08:15', status: 'In transit to destination', location: 'Lagos Distribution Center', completed: true },
        { date: '2025-08-17 10:00', status: 'Out for delivery', location: 'Abuja Distribution Center', completed: false },
        { date: '2025-08-18 16:00', status: 'Delivered', location: 'Abuja, FCT', completed: false }
      ]
    },
    'LG987654321': {
      trackingNumber: 'LG987654321',
      status: 'Delivered',
      estimatedDelivery: '2025-08-14',
      currentLocation: 'Port Harcourt, Rivers',
      destination: 'Port Harcourt, Rivers',
      origin: 'London, UK',
      service: 'Standard International',
      weight: '1.2 kg',
      timeline: [
        { date: '2025-08-10 11:00', status: 'Package picked up', location: 'London, UK', completed: true },
        { date: '2025-08-11 15:30', status: 'International transit', location: 'London Gateway', completed: true },
        { date: '2025-08-13 09:45', status: 'Cleared customs', location: 'Lagos Port', completed: true },
        { date: '2025-08-14 14:20', status: 'Out for delivery', location: 'Port Harcourt Distribution Center', completed: true },
        { date: '2025-08-14 16:30', status: 'Delivered', location: 'Port Harcourt, Rivers', completed: true }
      ]
    }
  };

  const handleTrack = async (e, trackingNum = trackingNumber) => {
    if (e) e.preventDefault();
    if (!trackingNum.trim()) {
      setError('Please enter a tracking number');
      setTrackingResult(null);
      setIsTracking(false);
      return;
    }

    if (trackingNum === lastTrackedNumber) {
      return;
    }

    setIsTracking(true);
    setError('');
    setLastTrackedNumber(trackingNum);

    setTimeout(() => {
      const result = sampleTrackingData[trackingNum.toUpperCase()];
      if (result) {
        setTrackingResult(result);
        setError('');
      } else {
        setTrackingResult(null);
        setError('Tracking number not found. Please check and try again.');
      }
      setIsTracking(false);
    }, 1500);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryTrackingNumber = queryParams.get('number');
    if (queryTrackingNumber) {
      setTrackingNumber(queryTrackingNumber);
      setLastTrackedNumber(''); // Reset to allow tracking
      handleTrack(null, queryTrackingNumber);
    }
  }, [location.search]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return '#10b981';
      case 'out for delivery': return '#f59e0b';
      case 'in transit': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Header />
      <div className="tracking-page">
        <div className="tracking-container">
          <div className="tracking-header">
            <h1>Track Your Shipment</h1>
            <p>Enter your tracking number below to get real-time updates on your package location and delivery status</p>
          </div>

          <div className="tracking-form">
            <form onSubmit={handleTrack}>
              <div className="form-group">
                <input
                  type="text"
                  className="tracking-input"
                  placeholder="Enter tracking number (e.g., LG123456789)"
                  value={trackingNumber}
                  onChange={(e) => {
                    setTrackingNumber(e.target.value);
                    setError('');
                    setTrackingResult(null);
                    setLastTrackedNumber('');
                  }}
                  aria-label="Enter tracking number"
                  disabled={isTracking}
                />
                <button
                  type="submit"
                  className="track-btn"
                  disabled={isTracking}
                  aria-label="Track package"
                >
                  {isTracking ? <span className="loading-spinner"></span> : 'Track Package'}
                </button>
              </div>
            </form>

            {error && <div className="error-message">{error}</div>}

            <div className="tracking-examples">
              <div className="examples-text">Try these sample tracking numbers:</div>
              <div className="example-numbers">
                <span
                  className="example-number"
                  onClick={() => {
                    setTrackingNumber('LG123456789');
                    setError('');
                    setTrackingResult(null);
                    setLastTrackedNumber('');
                  }}
                >
                  LG123456789
                </span>
                <span
                  className="example-number"
                  onClick={() => {
                    setTrackingNumber('LG987654321');
                    setError('');
                    setTrackingResult(null);
                    setLastTrackedNumber('');
                  }}
                >
                  LG987654321
                </span>
              </div>
            </div>
          </div>

          {trackingResult && (
            <div className="tracking-result">
              <div className="result-header">
                <h2>Tracking Information</h2>
                <div className="tracking-number-display">
                  Tracking Number: {trackingResult.trackingNumber}
                </div>
              </div>

              <div className="result-content">
                <div className="status-overview">
                  <div className="status-grid">
                    <div className="status-item">
                      <div className="status-label">Current Status</div>
                      <div className="status-value">
                        <span
                          className="status-badge"
                          style={{ backgroundColor: getStatusColor(trackingResult.status) }}
                        >
                          {trackingResult.status}
                        </span>
                      </div>
                    </div>
                    <div className="status-item">
                      <div className="status-label">Estimated Delivery</div>
                      <div className="status-value">
                        {formatDate(trackingResult.estimatedDelivery)}
                      </div>
                    </div>
                    <div className="status-item">
                      <div className="status-label">Current Location</div>
                      <div className="status-value">{trackingResult.currentLocation}</div>
                    </div>
                    <div className="status-item">
                      <div className="status-label">Service Type</div>
                      <div className="status-value">{trackingResult.service}</div>
                    </div>
                  </div>
                </div>

                <div className="tracking-timeline">
                  <h3 className="timeline-title">Shipment Progress</h3>
                  <div className="timeline-list">
                    {trackingResult.timeline.map((item, index) => (
                      <div key={index} className={`timeline-item ${item.completed ? 'completed' : ''}`}>
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                          <div className="timeline-date">{item.date}</div>
                          <div className="timeline-status">{item.status}</div>
                          <div className="timeline-location">{item.location}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="quick-actions">
                  <div className="actions-grid">
                    <a href="/support" className="action-btn">
                      📞 Contact Support
                    </a>
                    <a href="#" className="action-btn">
                      📄 Print Receipt
                    </a>
                    <a href="#" className="action-btn">
                      📧 Email Updates
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TrackingPage;