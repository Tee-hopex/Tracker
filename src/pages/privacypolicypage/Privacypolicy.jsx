import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <>
      <Header />
      <div className="privacy-document">
        <div className="document-header">
          <h1>Privacy Policy</h1>
          <div className="header-info">
            <p>Lamlight-Grp Global Shipping Solutions</p>
            <p>Effective Date: August 15, 2025</p>
            <p>Last Updated: August 15, 2025</p>
          </div>
        </div>

        <div className="document-content">
          <section className="document-section">
            <h2>1. Information We Collect</h2>
            <p>We collect personal information to provide efficient shipping services. This includes:</p>
            <ul>
              <li><strong>Contact Information</strong>: Name, email, phone number, and address when you create an account or ship a package.</li>
              <li><strong>Shipping Details</strong>: Origin, destination, tracking numbers, and package contents for delivery purposes.</li>
              <li><strong>Payment Information</strong>: Credit card details or billing information, processed securely by third-party providers.</li>
              <li><strong>Device and Usage Data</strong>: IP address, browser type, and interaction data (e.g., via cookies) to improve user experience.</li>
              <li><strong>Location Data</strong>: For real-time tracking, with your consent.</li>
            </ul>
            <p>We may also collect data from third parties, such as social media or partners, to enhance our services.</p>
          </section>

          <section className="document-section">
            <h2>2. How We Use Your Information</h2>
            <p>Your data helps us deliver reliable shipping:</p>
            <ul>
              <li>To process shipments, track packages, and manage deliveries.</li>
              <li>To communicate updates, promotions, or support responses.</li>
              <li>To analyze trends and improve our platform (e.g., using anonymized data).</li>
              <li>For legal compliance, fraud prevention, and security.</li>
            </ul>
            <p>We do not sell your data to third parties for marketing.</p>
          </section>

          <section className="document-section">
            <h2>3. Sharing Your Information</h2>
            <p>We share data only as necessary:</p>
            <ul>
              <li>With logistics partners (e.g., carriers) for delivery.</li>
              <li>With service providers (e.g., payment processors) under strict contracts.</li>
              <li>With authorities for legal reasons (e.g., customs).</li>
              <li>In case of mergers or acquisitions.</li>
            </ul>
            <p>All recipients are required to protect your data.</p>
          </section>

          <section className="document-section">
            <h2>4. Data Security</h2>
            <p>We use industry-standard measures:</p>
            <ul>
              <li>Encryption for data transmission.</li>
              <li>Secure servers and access controls.</li>
              <li>Regular audits to prevent breaches.</li>
            </ul>
            <p>While we take all reasonable steps, no system is 100% secure.</p>
          </section>

          <section className="document-section">
            <h2>5. Data Retention</h2>
            <p>We retain data as needed for services or legal obligations (e.g., 7 years for financial records). After that, it is deleted or anonymized.</p>
          </section>

          <section className="document-section">
            <h2>6. Cookies and Tracking</h2>
            <p>We use cookies for functionality and analytics:</p>
            <ul>
              <li>Essential cookies for site operation.</li>
              <li>Performance cookies to monitor usage.</li>
            </ul>
            <p>You can manage cookies via browser settings.</p>
          </section>

          <section className="document-section">
            <h2>7. Children's Privacy</h2>
            <p>Our services are not for children under 13. We do not knowingly collect their data.</p>
          </section>

          <section className="document-section">
            <h2>8. Your Rights</h2>
            <p>You can:</p>
            <ul>
              <li>Access, update, or delete your data.</li>
              <li>Opt out of marketing.</li>
              <li>Request data portability.</li>
            </ul>
            <p>Contact us to exercise rights.</p>
          </section>

          <section className="document-section">
            <h2>9. International Transfers</h2>
            <p>Data may be transferred globally, with safeguards like standard contractual clauses.</p>
          </section>

          <section className="document-section">
            <h2>10. Changes to This Policy</h2>
            <p>We may update this policy; check back for changes.</p>
          </section>

          <section className="document-section">
            <h2>11. Contact Us</h2>
            <p>Email: privacy@lamlight-grp.com</p>
          </section>
        </div>

        <div className="document-footer">
          <p>&copy; 2025 Lamlight-Grp. All rights reserved.</p>
          <p>Last Updated: August 15, 2025</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;