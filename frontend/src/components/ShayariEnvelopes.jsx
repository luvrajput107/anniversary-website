import React, { useState } from 'react';
import '../styles/ShayariEnvelopes.css';
import { logEvent } from '../utils/api';

const ShayariEnvelopes = () => {
  const [openedEnvelopes, setOpenedEnvelopes] = useState(new Set());

  const envelopes = [
    {
      id: 1,
      shayari: 'Tum ho mere liye sab kuch,\nHar pal tumhare saath beetana chahta hoon.\nAnanya, tum meri khushi ho,\nTumhari har muskaan meri dua hai.',
      title: 'Letter 1'
    },
    {
      id: 2,
      shayari: 'Jab bhi tum door hoti ho,\nMere paas tumhari yaadein rehti hain.\nTumhari awaaz, tumhari hansi,\nHar pal mujhe tumhare paas le jaati hai.',
      title: 'Letter 2'
    },
    {
      id: 3,
      shayari: 'Ek saal beet gaya tumhare saath,\nHar din naya sukoon mila.\nTumhara pyaar, tumhara saath,\nYeh sabse khoobsurat tohfa hai mere liye.',
      title: 'Letter 3'
    },
    {
      id: 4,
      shayari: 'Tumhare bina kya hoti zindagi,\nYe soch kar bhi dil dhadakta hai.\nTumhara saath hi meri manzil hai,\nTumhari khushi hi meri khushi hai.',
      title: 'Letter 4'
    },
    {
      id: 5,
      shayari: 'Tumhare liye likhna,\nHar shabd main tumhara naam hai.\nAnanya, tum mere sapno ki raani ho,\nTumhare bina kuch bhi adhura hai.',
      title: 'Letter 5'
    }
  ];

  const handleEnvelopeClick = (envelopeId) => {
    const isFirstOpen = !openedEnvelopes.has(envelopeId);
    setOpenedEnvelopes(prev => new Set([...prev, envelopeId]));
    
    if (isFirstOpen) {
      logEvent('shayari_open', { envelopeId });
    }
  };

  return (
    <section className="shayari-section">
      <div className="container">
        <p className="section-subtitle">Letters I Wrote For You</p>

        <h2 className="h2 section-title">Tap an envelope, babyji…</h2>

        <p className="section-text">
          Let my words open up for you. Each envelope holds a piece of my heart, 
          written just for you, Ananya.
        </p>

        <div className="envelopes-container">
          {envelopes.map((envelope) => {
            const isOpened = openedEnvelopes.has(envelope.id);
            return (
              <div
                key={envelope.id}
                className={`envelope-wrapper ${isOpened ? 'opened' : ''}`}
                onClick={() => handleEnvelopeClick(envelope.id)}
              >
                <div className="envelope">
                  <div className="envelope-front">
                    <div className="envelope-flap"></div>
                  </div>
                  {isOpened && (
                    <div className="envelope-content">
                      <div className="letter">
                        <pre className="shayari-text">{envelope.shayari}</pre>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShayariEnvelopes;
