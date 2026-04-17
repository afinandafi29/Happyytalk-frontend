import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = 2026;

  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Brand Section */}
        <div className="footer-section brand-section">
          <div className='flex flex-row gap-4 items-center mb-2'>
            <img
              src="/happytalk.png"
              alt="Happy Talk Logo"
              className="w-16 h-16 object-contain hover:rotate-6 transition-transform duration-500"
            />
            <div className='flex flex-col'>
              <h3 className="brand-name">HAPPY TALK</h3>
              <p className="brand-tagline pt-1">Connect Beyond the World</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="footer-links-grid">
          <div className="footer-column">
            <h4>Product</h4>
            <Link to="/how-it-works">How it Works</Link>
            <Link to="/features">Core Features</Link>
            <Link to="/about">About Us</Link>
          </div>

          <div className="footer-column">
            <h4>Support</h4>
            <Link to="/report">Report Issue</Link>
            <Link to="/faq">Help & FAQ</Link>
            <Link to="/contact">Contact Support</Link>
          </div>

          <div className="footer-column">
            <h4>Safety</h4>
            <Link to="/community-standards">Guidelines</Link>
            <Link to="/safety-center">Safety Center</Link>
            <Link to="/verification">Verification</Link>
          </div>

          <div className="footer-column">
            <h4>Legal</h4>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright-text-center">&copy; {currentYear} Happy Talk. All rights reserved.</p>
        </div>
      </div>

      <style>{`
        .footer-container {
          background: #000000;
          color: #94a3b8;
          padding: 40px 20px 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          font-family: 'Inter', sans-serif;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.5fr 3fr;
          gap: 60px;
          margin-bottom: 30px;
        }

        .brand-name {
          font-weight: 850;
          letter-spacing: 1px;
          background: linear-gradient(135deg, #60a5fa, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 36px;
          line-height: 1;
        }

        .brand-tagline {
          font-size: 14px;
          line-height: 1.2;
          color: #64748b;
          white-space: nowrap;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .footer-links-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
        }

        .footer-column h4 {
          color: white;
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 15px;
        }

        .footer-column {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .footer-column a {
          font-size: 14px;
          color: #94a3b8;
          transition: color 0.2s;
          text-decoration: none;
        }

        .footer-column a:hover {
          color: #38bdf8;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 20px;
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .footer-bottom-content {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .copyright-text-center {
          font-size: 13px;
          color: #64748b;
          margin: 0;
        }

        @media (max-width: 1024px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .footer-links-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .footer-links-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;