import React, { useState } from 'react';
import '../styles/FinalCTA.css';
import { logEvent } from '../utils/api';

const FinalCTA = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  const handleButtonClick = () => {
    setShowAnimation(true);
    logEvent('final_cta_click');
    
    setTimeout(() => {
      setShowAnimation(false);
    }, 3000);
  };

  return (
    <section className="cta" id="final-cta">
      <div className="container">
        <div className="cta-content">
          <p className="section-subtitle">My Heart's Question</p>

          <h2 className="h2 section-title">Will You Keep Choosing Me, babyji?</h2>

          <p className="section-text">
            Thank you for this year. For your patience, your warmth, your love, your softness. 
            For choosing me even when I'm difficult. For staying even on the hard days. So here I am, 
            on our first anniversary, asking you something simple — stay with me for many more years.
          </p>
        </div>

        <button className="btn btn-secondary" onClick={handleButtonClick}>
          Yes, I Choose You
        </button>

        {showAnimation && (
          <div className="hearts-animation">
            {[...Array(20)].map((_, i) => (
              <span key={i} className="heart">💖</span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FinalCTA;
