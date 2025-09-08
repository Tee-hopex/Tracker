import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SupportPage.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const SupportPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const navigate = useNavigate();

  // Sample FAQ data structured by categories
  const faqs = {
    tracking: [
      {
        question: 'How do I track my package?',
        answer: 'Enter your tracking number on the tracking page or use our mobile app for real-time updates.',
      },
      {
        question: 'What does "In Transit" mean?',
        answer: 'Your package is moving through our network toward its destination.',
      },
      {
        question: 'My tracking status hasn’t updated. What should I do?',
        answer: 'Updates may take up to 24 hours. Contact support with your tracking number if the issue persists.',
      },
    ],
    shipping: [
      {
        question: 'How do I schedule a pickup?',
        answer: 'Log into your account and select "Schedule Pickup" or call our support line.',
      },
      {
        question: 'What are your shipping rates?',
        answer: 'Rates vary by weight, size, and destination. Use our rate calculator on the homepage.',
      },
      {
        question: 'Can I ship internationally?',
        answer: 'Yes, we offer express and standard shipping to over 200 countries.',
      },
    ],
    billing: [
      {
        question: 'How do I pay my invoice?',
        answer: 'Pay online via our billing portal or use bank transfer. Contact billing support for help.',
      },
      {
        question: 'What if I have a billing dispute?',
        answer: 'Submit a dispute form in your account or email billing@Lamlight Express.com.',
      },
      {
        question: 'How can I get a copy of my invoice?',
        answer: 'Download invoices from your account or request one via support.',
      },
    ],
    claims: [
      {
        question: 'How do I file a claim for a damaged package?',
        answer: 'Visit our claims portal and submit photos and details within 30 days of delivery.',
      },
      {
        question: 'What documents are needed for a claim?',
        answer: 'Provide the invoice, photos of damage, packaging, and shipping label.',
      },
      {
        question: 'How long does claim processing take?',
        answer: 'Typically 5-10 business days after all documents are received.',
      },
    ],
  };

  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'tracking', name: 'Tracking & Delivery' },
    { id: 'shipping', name: 'Shipping & Pickup' },
    { id: 'billing', name: 'Billing & Payments' },
    { id: 'claims', name: 'Claims & Issues' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError('Please enter a search term');
      return;
    }
    setError('');
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 1000); // Simulate API call
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const filteredFaqs = searchQuery.trim()
    ? Object.values(faqs)
        .flat()
        .filter(
          (faq) =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : selectedCategory === 'all'
    ? Object.values(faqs).flat()
    : faqs[selectedCategory] || [];

  const handleTrackRedirect = () => {
    navigate('/track');
  };

  return (
    <>
      <Header />
      <div className="support-page">
        <div className="support-container">
          <div className="support-header">
            <h1>Support Center</h1>
            <p>Find quick answers or connect with our team for personalized help.</p>
          </div>

          <div className="support-search">
            <form onSubmit={handleSearch}>
              <div className="search-group">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search help topics (e.g., track package)"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setError('');
                  }}
                  aria-label="Search support topics"
                />
                <button
                  type="submit"
                  className="search-btn"
                  disabled={isSearching}
                  aria-label="Search"
                >
                  {isSearching ? (
                    <span className="loading-spinner"></span>
                  ) : (
                    'Search'
                  )}
                </button>
              </div>
              {error && <div className="error-message">{error}</div>}
            </form>
          </div>

          <div className="support-categories">
            <h2>Explore Common Topics</h2>
            <div className="category-tabs">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`category-tab ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSearchQuery('');
                    setError('');
                  }}
                  aria-pressed={selectedCategory === cat.id}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="support-faqs">
            {filteredFaqs.length === 0 ? (
              <p className="no-results">No results found. Try a different search term or category.</p>
            ) : (
              filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className={`faq-item ${expandedFaq === index ? 'expanded' : ''}`}
                  onClick={() => toggleFaq(index)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={expandedFaq === index}
                >
                  <h3 className="faq-question">
                    {faq.question}
                    <span className="faq-toggle">{expandedFaq === index ? '−' : '+'}</span>
                  </h3>
                  <div className="faq-answer">{faq.answer}</div>
                </div>
              ))
            )}
          </div>

          <div className="support-contact">
            <h2>Contact Us</h2>
            <div className="contact-options">
              <div className="contact-card">
                <div className="contact-icon">📞</div>
                <h3>Phone Support</h3>
                <p>1-800-LAM-LIGHT (1-800-526-5444)</p>
                <p>Mon-Fri: 8 AM - 8 PM ET</p>
                <p>Sat: 9 AM - 5 PM ET</p>
              </div>
              {/* <div className="contact-card">
                <div className="contact-icon">💬</div>
                <h3>Live Chat</h3>
                <p>Get instant help from our support team.</p>
                <button
                  className="chat-btn"
                  onClick={() => alert('Live chat feature coming soon!')}
                >
                  Start Chat
                </button>
              </div> */}
              <div className="contact-card">
                <div className="contact-icon">✉️</div>
                <h3>Email Support</h3>
                <p>support@Lamlight Express.com</p>
                <p>Replies within 24-48 hours.</p>
              </div>
              {/* <div className="contact-card">
                <div className="contact-icon">📍</div>
                <h3>In-Person Support</h3>
                <p>Visit a Lamlight Express location near you.</p>
                <a href="#" className="location-link">
                  Find a Location
                </a>
              </div> */}
            </div>
          </div>

          {/* <div className="support-resources">
            <h2>Self-Service Tools</h2>
            <div className="resources-grid">
              <button
                className="resource-item"
                onClick={handleTrackRedirect}
                aria-label="Track Package"
              >
                Track Package
              </button>
              <a href="#" className="resource-item" aria-label="File a Claim">
                File a Claim
              </a>
              <a href="#" className="resource-item" aria-label="Manage Billing">
                Manage Billing
              </a>
              <a href="#" className="resource-item" aria-label="Download App">
                Download App
              </a>
              <a href="#" className="resource-item" aria-label="Shipping Guides">
                Shipping Guides
              </a>
              <a href="#" className="resource-item" aria-label="Full FAQ">
                Full FAQ
              </a>
            </div>
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SupportPage;