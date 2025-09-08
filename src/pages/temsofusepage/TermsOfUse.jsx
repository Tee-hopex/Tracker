import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './TermsOfUse.css';

const TermsOfUse = () => {
  return (
    <>
      <Header />
      <div className="terms-document">
        <div className="document-header">
          <h1>Terms of Use</h1>
          <div className="header-info">
            <p>Lamlight Express Global Shipping Solutions</p>
            <p>Effective Date: August 15, 2025</p>
            <p>Last Updated: August 15, 2025</p>
          </div>
        </div>

        <div className="document-content">
          <section className="document-section">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using the Lamlight Express website, mobile applications, or shipping services, you agree to be bound by these Terms of Use. If you do not agree, please do not use our services.</p>
          </section>

          <section className="document-section">
            <h2>2. Service Usage</h2>
            <p>You may use our services only for lawful purposes and in accordance with these terms. You agree to:</p>
            <ul>
              <li>Provide accurate shipping and payment information.</li>
              <li>Not use the service for prohibited items (e.g., hazardous materials).</li>
              <li>Comply with all applicable laws and regulations.</li>
            </ul>
            <p>We reserve the right to suspend or terminate access for misuse.</p>
          </section>

          <section className="document-section">
            <h2>3. Payment Terms</h2>
            <p>All charges for shipping services must be paid in full at the time of booking or delivery, unless otherwise agreed. You are responsible for:</p>
            <ul>
              <li>Providing valid payment details.</li>
              <li>Covering additional fees (e.g., customs duties, late payments).</li>
              <li>Disputes must be raised within 30 days of the transaction.</li>
            </ul>
          </section>

          <section className="document-section">
            <h2>4. Liability</h2>
            <p>Lamlight Express is not liable for delays, loss, or damage beyond our control (e.g., natural disasters). Our liability is limited to the value of the shipment or the amount specified in our insurance policy, whichever is lower.</p>
          </section>

          <section className="document-section">
            <h2>5. Intellectual Property</h2>
            <p>All content, trademarks, and logos on our platform are owned by Lamlight Express or its licensors. You may not reproduce or distribute them without permission.</p>
          </section>

          <section className="document-section">
            <h2>6. Termination</h2>
            <p>We may terminate or suspend your account at our discretion for breach of these terms. Upon termination, you lose access to services, but obligations (e.g., payments) remain.</p>
          </section>

          <section className="document-section">
            <h2>7. Governing Law</h2>
            <p>These terms are governed by the laws of [Your Jurisdiction]. Disputes will be resolved in [Your Jurisdiction] courts.</p>
          </section>

          <section className="document-section">
            <h2>8. Changes to Terms</h2>
            <p>We may update these terms; continued use after changes constitutes acceptance. Check this page regularly.</p>
          </section>

          <section className="document-section">
            <h2>9. Contact Us</h2>
            <p>Email: support@Lamlight Express.com</p>
          </section>
        </div>

        <div className="document-footer">
          <p>&copy; 2025 Lamlight Express. All rights reserved.</p>
          <p>Last Updated: August 15, 2025</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsOfUse;