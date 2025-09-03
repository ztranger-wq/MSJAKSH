import { FiPhone, FiMail, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Brand Section */}
        <div className="footer-brand">
          <h2>MS Enterprise</h2>
          <p className="footer-description">
            Your trusted partner for premium corporate solutions, promotional merchandise, 
            and professional services. Quality craftsmanship meets innovative design.
          </p>
        </div>

        {/* Contact Information */}
        <div className="contact-info">
          <div className="contact-item">
            <FiPhone className="contact-item-icon" />
            <a href="tel:+1234567890">+91 12345 67890</a>
          </div>
          <div className="contact-item">
            <FiMail className="contact-item-icon" />
            <a href="mailto:info@msenterprise.com">info@msenterprise.com</a>
          </div>
          <div className="contact-item">
            <FiMapPin className="contact-item-icon" />
            <span>Bangalore, Karnataka, India</span>
          </div>
        </div>

        {/* Footer Links & Social */}
        <div className="footer-navigation">
          <nav className="footer-links">
            <a href="/about" className="footer-link">About Us</a>
            <a href="/privacy" className="footer-link">Privacy Policy</a>
            <a href="/terms" className="footer-link">Terms of Service</a>
            <a href="/contact" className="footer-link">Contact</a>
            <a href="/support" className="footer-link">Support</a>
          </nav>

          <div className="social-links">
            <a 
              href="https://facebook.com/msenterprise" 
              className="social-link" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Follow us on Facebook"
            >
              <FiFacebook />
            </a>
            <a 
              href="https://twitter.com/msenterprise" 
              className="social-link" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Follow us on Twitter"
            >
              <FiTwitter />
            </a>
            <a 
              href="https://instagram.com/msenterprise" 
              className="social-link" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
            >
              <FiInstagram />
            </a>
            <a 
              href="https://linkedin.com/company/msenterprise" 
              className="social-link" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Connect with us on LinkedIn"
            >
              <FiLinkedin />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} MS Enterprise. All rights reserved.</p>
          <p>Crafted with ❤️ for our valued customers</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
