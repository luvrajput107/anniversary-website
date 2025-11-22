import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import '../styles/Hero.css';
import { logEvent } from '../utils/api';

const Hero = () => {
  const handleButtonClick = (buttonType) => {
    logEvent('hero_button_click', { buttonType });
  };

  return (
    <section className="hero" id="home">
      <div className="container">
        <h2 className="h1 hero-title">One Year Of Us, Ananya</h2>

        <p className="hero-text">
          On 7 December 2024, we complete one whole year of 'us'. In every call, every smile, 
          every memory, you've become my peace, my chaos, my comfort, and my favourite feeling. 
          This website is a small piece of me… for you, Ananya.
        </p>

        <div className="btn-group">
          <ScrollLink
            to="our-story"
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}
            className="btn btn-primary"
            onClick={() => handleButtonClick('read_story')}
          >
            Read Our Story
          </ScrollLink>

          <ScrollLink
            to="memory-calendar"
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}
            className="btn btn-secondary"
            onClick={() => handleButtonClick('relive_memories')}
          >
            Relive Our Memories
          </ScrollLink>
        </div>
      </div>
    </section>
  );
};

export default Hero;
