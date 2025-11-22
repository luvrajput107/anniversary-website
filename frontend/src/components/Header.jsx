import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import '../styles/Header.css';

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 200) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'home', to: 'hero' },
    { name: 'Our Story', to: 'our-story' },
    { name: 'Favourite Moments', to: 'memory-calendar' },
    { name: 'Our Songs', to: 'our-songs' },
    { name: 'Our Gallery', to: 'gallery' },
    { name: 'A Letter For You', to: 'final-cta' }
  ];

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <header className={`header ${isActive ? 'active' : ''}`} data-header>
      <div className="overlay" data-overlay onClick={closeNav} className={isNavOpen ? 'active' : ''}></div>

      <div className="header-top">
        <div className="container">
          <a href="tel:+917296922098" className="helpline-box">
            <div className="icon-box">
              <ion-icon name="call-outline"></ion-icon>
            </div>
            <div className="wrapper">
              <p className="helpline-title">When You Miss Me:</p>
              <p className="helpline-number">I'm always one call away, babyji ❤️</p>
            </div>
          </a>

          <a href="#" className="logo">
            <span className="logo-text">A ♥ L</span>
          </a>

          <div className="header-btn-group">
            <button className="search-btn" aria-label="Search">
              <ion-icon name="search"></ion-icon>
            </button>
            <button 
              className="nav-open-btn" 
              aria-label="Open Menu" 
              data-nav-open-btn
              onClick={toggleNav}
            >
              <ion-icon name="menu-outline"></ion-icon>
            </button>
          </div>
        </div>
      </div>

      <div className="header-bottom">
        <div className="container">
          <ul className="social-list">
            <li>
              <a href="#" className="social-link">
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
            </li>
            <li>
              <a href="#" className="social-link">
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
            </li>
            <li>
              <a href="#" className="social-link">
                <ion-icon name="logo-youtube"></ion-icon>
              </a>
            </li>
          </ul>

          <nav className={`navbar ${isNavOpen ? 'active' : ''}`} data-navbar>
            <div className="navbar-top">
              <a href="#" className="logo">
                <span className="logo-text">For Ananya</span>
              </a>
              <button 
                className="nav-close-btn" 
                aria-label="Close Menu" 
                data-nav-close-btn
                onClick={closeNav}
              >
                <ion-icon name="close-outline"></ion-icon>
              </button>
            </div>

            <ul className="navbar-list">
              {navItems.map((item) => (
                <li key={item.to}>
                  <ScrollLink
                    to={item.to}
                    spy={true}
                    smooth={true}
                    offset={-80}
                    duration={500}
                    onClick={closeNav}
                    className="navbar-link"
                    data-nav-link
                  >
                    {item.name}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </nav>

          <ScrollLink to="final-cta" smooth={true} className="btn btn-primary">
            Read Letter
          </ScrollLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
