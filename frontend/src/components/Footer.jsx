import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const [heartClickCount, setHeartClickCount] = useState(0);
  const navigate = useNavigate();

  const handleSecretHeartClick = () => {
    setHeartClickCount(prev => prev + 1);
    if (heartClickCount >= 4) { // Click heart 5 times
      navigate('/for-my-babyji');
      setHeartClickCount(0);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-brand">
            <a href="#" className="logo">
              <span className="logo-text">A ♥ L</span>
            </a>

            <p className="footer-text">
              I hope this website feels like a hug from me to you. Whenever you miss me or need me, 
              come back here. This whole space belongs to you, babyji.
            </p>
          </div>

          <div className="footer-contact">
            <h4 className="contact-title">Whenever You Need Me</h4>

            <p className="contact-text">
              If you miss me you know where to contact !!
            </p>

            <ul>
              <li className="contact-item">
                <ion-icon name="call-outline"></ion-icon>
                <a href="tel:+917296922098" className="contact-link">+91 72969 22098</a>
              </li>

              <li className="contact-item">
                <ion-icon name="mail-outline"></ion-icon>
                <a href="mailto:luvsinghr@gmail.com" className="contact-link">luvsinghr@gmail.com</a>
              </li>

              <li className="contact-item">
                <ion-icon name="location-outline"></ion-icon>
                <address>IN YOUR HEART 💕</address>
              </li>
            </ul>
          </div>

          <div className="footer-form">
            <p className="form-text">
              You already have all of me.
            </p>

            <div className="form-wrapper">
              <p className="footer-love-text">💖 Forever yours 💖</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">
            &copy; 2025 <a href="#">luvsingh rajput</a> . Made only for Ananya Singh
          </p>

          <ul className="footer-bottom-list">
            <li>
              <button 
                className="footer-bottom-link secret-heart-trigger"
                onClick={handleSecretHeartClick}
              >
                💖
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
