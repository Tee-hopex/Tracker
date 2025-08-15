import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './QuotePage.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const QuotePage = () => {
  const [serviceType, setServiceType] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [quoteResult, setQuoteResult] = useState(null);
  const [error, setError] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type');
    if (type) {
      setServiceType(type);
    }
  }, [location.search]);

  const handleCalculateQuote = async (e) => {
    e.preventDefault();
    if (!origin.trim() || !destination.trim() || !weight.trim()) {
      setError('Please fill in origin, destination, and weight');
      return;
    }

    setIsCalculating(true);
    setError('');
    setQuoteResult(null);

    try {
      // Map service type to Freightos loadtype
      const loadTypeMap = {
        express: 'boxes', // Approximate for air freight
        standard: 'boxes', // Approximate for slower air/ocean
        freight: 'container40', // Default to 40' container for freight
      };
      const loadType = loadTypeMap[serviceType] || 'boxes';

      // Construct API URL with GET parameters
      const weightKg = parseFloat(weight);
      const [length = 50, width = 50, height = 50] = dimensions.split('x').map(Number) || [50, 50, 50];
      const apiUrl = `https://ship.freightos.com/api/shippingCalculator?loadtype=${loadType}&weight=${weightKg * 1000}&width=${width}&length=${length}&height=${height}&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&quantity=1`;

      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Failed to fetch quote');

      const data = await response.json();
      if (data.estimatedFreightRates && data.estimatedFreightRates.length > 0) {
        const { min, max } = data.estimatedFreightRates[0].price;
        const { min: minDays, max: maxDays } = data.estimatedFreightRates[0].transitTimes;
        setQuoteResult({
          serviceType: serviceType.charAt(0).toUpperCase() + serviceType.slice(1),
          estimatedCost: `$${min.moneyAmount.amount} - $${max.moneyAmount.amount} USD`,
          estimatedTime: `${minDays} - ${maxDays} days`,
        });
      } else {
        throw new Error('No rates available for the given parameters');
      }
    } catch (err) {
      setError(`Error calculating quote: ${err.message}. Please check your inputs or try again later.`);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <>
      <Header />
      <div className="quote-page">
        <div className="quote-container">
          <div className="quote-header">
            <h1>Get a Shipping Quote</h1>
            <p>Enter details to estimate costs for your shipment (Powered by Freightos)</p>
          </div>

          <div className="quote-form">
            <form onSubmit={handleCalculateQuote}>
              <div className="form-group">
                <label>Service Type</label>
                <select value={serviceType} onChange={(e) => setServiceType(e.target.value)} disabled>
                  <option value="express">Express</option>
                  <option value="standard">Standard</option>
                  <option value="freight">Freight</option>
                </select>
              </div>
              <div className="form-group">
                <label>Origin</label>
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="e.g., Lagos, Nigeria"
                />
              </div>
              <div className="form-group">
                <label>Destination</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g., New York, NY"
                />
              </div>
              <div className="form-group">
                <label>Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g., 2.5"
                />
              </div>
              <div className="form-group">
                <label>Dimensions (optional, e.g., LxWxH in cm)</label>
                <input
                  type="text"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  placeholder="e.g., 30x20x10"
                />
              </div>
              <button type="submit" className="calculate-btn" disabled={isCalculating}>
                {isCalculating ? <span className="loading-spinner"></span> : 'Calculate Quote'}
              </button>
            </form>
            {error && <div className="error-message">{error}</div>}
            {quoteResult && (
              <div className="quote-result">
                <h2>Estimated Quote</h2>
                <p>Service: {quoteResult.serviceType}</p>
                <p>Cost: {quoteResult.estimatedCost}</p>
                <p>Delivery Time: {quoteResult.estimatedTime}</p>
                <p className="api-credit">Powered by Freightos (Marketplace Estimates)</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default QuotePage;