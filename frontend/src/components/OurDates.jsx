import React, { useState } from 'react';
import '../styles/OurDates.css';
import { logEvent } from '../utils/api';

const OurDates = () => {
  const [showAll, setShowAll] = useState(false);

  const dates = [
    {
      id: 1,
      label: 'First Date',
      date: '12 Jan',
      title: 'Perfect — Ed Sheeran',
      description: 'The moment I knew you were special.',
      spotifyUrl: 'https://open.spotify.com/track/0tgVpDi06FyKpA1z0VMD4v',
      image: 'https://via.placeholder.com/600x430?text=First+Date'
    },
    {
      id: 2,
      label: 'First Call',
      date: '15 Jan',
      title: 'All of Me — John Legend',
      description: 'Your voice made everything better.',
      spotifyUrl: 'https://open.spotify.com/track/3U4isOIWM3VvDubwSI3y7a',
      image: 'https://via.placeholder.com/600x430?text=First+Call'
    },
    {
      id: 3,
      label: 'Anniversary',
      date: '7 Dec',
      title: 'Thinking Out Loud — Ed Sheeran',
      description: 'One year of choosing each other every day.',
      spotifyUrl: 'https://open.spotify.com/track/1Slwb6dOYkBlWal1PGtnNg',
      image: 'https://via.placeholder.com/600x430?text=Anniversary'
    }
  ];

  const visibleDates = showAll ? dates : dates.slice(0, 3);

  const handlePlayClick = (date) => {
    logEvent('date_song_click', { dateId: date.id, songTitle: date.title });
    window.open(date.spotifyUrl, '_blank');
  };

  return (
    <section className="popular" id="our-story">
      <div className="container">
        <p className="section-subtitle">Our Special Days</p>

        <h2 className="h2 section-title">Dates I'll Never Forget With You</h2>

        <p className="section-text">
          Each date holds a special song, a special memory, and a special place in my heart. 
          These moments with you are treasures I'll keep forever.
        </p>

        <ul className="popular-list">
          {visibleDates.map((date) => (
            <li key={date.id}>
              <div className="popular-card">
                <figure className="card-img">
                  <img src={date.image} alt={date.label} loading="lazy" />
                </figure>

                <div className="card-content">
                  <div className="card-rating">
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                  </div>

                  <p className="card-subtitle">
                    <span>{date.date}</span>
                  </p>

                  <h3 className="h3 card-title">
                    <span>{date.title}</span>
                  </h3>

                  <p className="card-text">
                    {date.description}
                  </p>

                  <button 
                    className="btn btn-primary spotify-btn"
                    onClick={() => handlePlayClick(date)}
                    style={{ marginTop: '15px', width: 'auto', padding: '8px 20px' }}
                  >
                    Play on Spotify
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {!showAll && dates.length > 3 && (
          <button className="btn btn-primary" onClick={() => setShowAll(true)}>
            More Dates
          </button>
        )}
      </div>
    </section>
  );
};

export default OurDates;
