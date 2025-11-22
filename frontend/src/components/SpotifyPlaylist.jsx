import React from 'react';
import '../styles/SpotifyPlaylist.css';

const SpotifyPlaylist = () => {
  // Placeholder playlist ID - replace with actual playlist ID
  const playlistId = '37i9dQZF1DXcBWIGoYBM5M'; // Replace with your playlist ID
  const playlistUrl = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;

  return (
    <section className="spotify-section">
      <div className="container">
        <p className="section-subtitle">A Playlist For My babyji</p>

        <h2 className="h2 section-title">Songs That Remind Me Of You</h2>

        <p className="section-text">
          These songs remind me of you. Each one holds a memory, a feeling, or a moment 
          that made me fall deeper for you.
        </p>

        <div className="spotify-container">
          <iframe
            src={playlistUrl}
            width="100%"
            height="352"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
            title="Spotify Playlist"
            className="spotify-embed"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default SpotifyPlaylist;
