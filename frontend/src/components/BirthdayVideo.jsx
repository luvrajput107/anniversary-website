import React, { useState } from 'react';
import '../styles/BirthdayVideo.css';
import { logEvent } from '../utils/api';

const BirthdayVideo = () => {
  const [hasPlayed, setHasPlayed] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  
  // Replace with actual YouTube video ID
  const videoId = 'dQw4w9WgXcQ'; // Placeholder
  const embedUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=1&rel=0&modestbranding=1`;

  const handleVideoPlay = () => {
    if (!hasPlayed) {
      setHasPlayed(true);
      logEvent('birthday_video_play');
      
      // Show overlay after 30 seconds (simplified approach)
      setTimeout(() => {
        setShowOverlay(true);
      }, 30000);
    }
  };

  const handleWatchFull = () => {
    logEvent('birthday_video_full_watch_click');
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  return (
    <section className="birthday-video-section">
      <div className="container">
        <p className="section-subtitle">A Birthday Surprise For You</p>

        <h2 className="h2 section-title">A Collection Of Our Moments</h2>

        <p className="section-text">
          I made this video for your birthday — a collection of moments, memories, and feelings 
          that I wanted you to keep forever.
        </p>

        <div className="video-container">
          <div className="video-wrapper">
            <iframe
              id="birthday-video-player"
              src={embedUrl}
              title="Birthday Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={handleVideoPlay}
              className="youtube-iframe"
            ></iframe>
            {showOverlay && (
              <div className="video-overlay">
                <div className="overlay-content">
                  <p className="overlay-message">
                    Want to see the full video? Click below, babyji.
                  </p>
                  <button className="btn btn-secondary" onClick={handleWatchFull}>
                    Watch Full Video On YouTube
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BirthdayVideo;
