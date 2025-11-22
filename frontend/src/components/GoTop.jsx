import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import '../styles/GoTop.css';

const GoTop = () => {
  const [isActive, setIsActive] = useState(false);

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

  return (
    <ScrollLink
      to="hero"
      smooth={true}
      duration={500}
      className={`go-top ${isActive ? 'active' : ''}`}
      data-go-top
    >
      <ion-icon name="chevron-up-outline"></ion-icon>
    </ScrollLink>
  );
};

export default GoTop;

