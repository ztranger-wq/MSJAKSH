import './Footer.css';

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="container footer-content">
        <h2>Contact Us</h2>
        <div className="contact-info">
          <div className="contact-item">
            <svg className="w-6 h-6 text-main-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{width: '1.5rem', height: '1.5rem', color: 'var(--main-red)'}}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            <a href="tel:+919467283036">+91 9467283036 (Meenu Singla)</a>
          </div>
          <div className="contact-item">
            <svg className="w-6 h-6 text-main-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{width: '1.5rem', height: '1.5rem', color: 'var(--main-red)'}}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            <a href="mailto:m.s.labels2009@gmail.com">m.s.labels2009@gmail.com</a>
          </div>
          <div className="contact-item">
            <svg className="w-6 h-6 text-main-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{width: '1.5rem', height: '1.5rem', color: 'var(--main-red)'}}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            <p>108/25, Mohan Nagar, Sonipat, Haryana, 131001</p>
          </div>
        </div>
        <p className="copyright">&copy; 2024 MS Enterprises. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
