import React, { useState, useEffect } from 'react';
import '../styles/OurSong.css';
import { logEvent, submitSongRating } from '../utils/api';

const OurSong = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [rating, setRating] = useState(0);

  const songs = [
    {
      id: 1,
      title: 'For My babyji',
      description: 'A song dedicated to you, Ananya. Every word, every note is for you.',
      image: 'https://via.placeholder.com/400x250?text=Song+1',
      audioUrl: '#',
      lyrics: [
        'When I look into your eyes',
        'I see my whole world there',
        'You are my everything',
        'My love, my care',
        'Ananya, you are my heart',
        'Forever and always',
        'I choose you every day',
        'In all possible ways'
      ],
      reviews: 5
    },
    {
      id: 2,
      title: 'Always Yours',
      description: 'Another melody that reminds me of us.',
      image: 'https://via.placeholder.com/400x250?text=Song+2',
      audioUrl: '#',
      lyrics: [
        'Every morning when I wake',
        'Your name is on my lips',
        'Every night before I sleep',
        'You are in my dreams',
        'Babyji, you are my peace',
        'You are my home',
        'With you, I am complete',
        'Never alone'
      ],
      reviews: 3
    }
  ];

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentLineIndex((prev) => {
          if (prev >= currentSong.lyrics.length - 1) {
            return 0;
          }
          return prev + 1;
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSong]);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      logEvent('song_play', { songId: currentSong.id });
    }
  };

  const handleRatingClick = (value) => {
    setRating(value);
    submitSongRating(currentSong.id, value);
    logEvent('song_rating_set', { songId: currentSong.id, rating: value });
  };

  const displayedLines = [
    currentLineIndex > 0 ? currentSong.lyrics[currentLineIndex - 1] : '',
    currentSong.lyrics[currentLineIndex],
    currentLineIndex < currentSong.lyrics.length - 1 ? currentSong.lyrics[currentLineIndex + 1] : ''
  ];

  return (
    <section className="package" id="our-songs">
      <div className="container">
        <p className="section-subtitle">Our Songs</p>

        <h2 className="h2 section-title">Songs That Remind Me Of You</h2>

        <p className="section-text">
          These songs hold special meaning. Each one reminds me of a moment, a feeling, 
          or a memory that made me fall deeper for you.
        </p>

        <ul className="package-list">
          {songs.map((song, index) => (
            <li key={song.id}>
              <div className="package-card">
                <figure className="card-banner">
                  <img src={song.image} alt={song.title} loading="lazy" />
                </figure>

                <div className="card-content">
                  <h3 className="h3 card-title">{song.title}</h3>

                  <p className="card-text">
                    {song.description}
                  </p>

                  {index === currentSongIndex && (
                    <div className="lyrics-container">
                      <div className="lyrics-line prev">{displayedLines[0]}</div>
                      <div className="lyrics-line current">{displayedLines[1]}</div>
                      <div className="lyrics-line next">{displayedLines[2]}</div>
                    </div>
                  )}

                  <ul className="card-meta-list">
                    <li className="card-meta-item">
                      <div className="meta-box">
                        <ion-icon name="musical-notes"></ion-icon>
                        <p className="text">Song</p>
                      </div>
                    </li>
                    <li className="card-meta-item">
                      <div className="meta-box">
                        <ion-icon name="heart"></ion-icon>
                        <p className="text">Love</p>
                      </div>
                    </li>
                    <li className="card-meta-item">
                      <div className="meta-box">
                        <ion-icon name="time"></ion-icon>
                        <p className="text">Forever</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="card-price">
                  <div className="wrapper">
                    <p className="reviews">({song.reviews} reviews)</p>
                    <div className="card-rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <ion-icon 
                          key={star}
                          name={star <= rating ? "star" : "star-outline"}
                          style={{ 
                            color: star <= rating ? '#ffd700' : 'hsl(0, 0%, 80%)',
                            cursor: 'pointer'
                          }}
                          onClick={() => index === currentSongIndex && handleRatingClick(star)}
                        ></ion-icon>
                      ))}
                    </div>
                  </div>

                  <button 
                    className="btn btn-secondary" 
                    onClick={() => {
                      setCurrentSongIndex(index);
                      setCurrentLineIndex(0);
                      handlePlay();
                    }}
                  >
                    {index === currentSongIndex && isPlaying ? 'Pause' : 'Play'}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default OurSong;
