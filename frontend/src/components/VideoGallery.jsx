import React, { useState } from 'react';
import '../styles/VideoGallery.css';
import { logEvent } from '../utils/api';

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const videos = [
    { id: 1, title: 'Memory 1', thumbnail: 'https://via.placeholder.com/800x450?text=Video+1', url: '#' },
    { id: 2, title: 'Memory 2', thumbnail: 'https://via.placeholder.com/800x450?text=Video+2', url: '#' },
    { id: 3, title: 'Memory 3', thumbnail: 'https://via.placeholder.com/800x450?text=Video+3', url: '#' },
    { id: 4, title: 'Memory 4', thumbnail: 'https://via.placeholder.com/800x450?text=Video+4', url: '#' },
    { id: 5, title: 'Memory 5', thumbnail: 'https://via.placeholder.com/800x450?text=Video+5', url: '#' },
    { id: 6, title: 'Memory 6', thumbnail: 'https://via.placeholder.com/800x450?text=Video+6', url: '#' },
    { id: 7, title: 'Memory 7', thumbnail: 'https://via.placeholder.com/800x450?text=Video+7', url: '#' },
    { id: 8, title: 'Memory 8', thumbnail: 'https://via.placeholder.com/800x450?text=Video+8', url: '#' },
    { id: 9, title: 'Memory 9', thumbnail: 'https://via.placeholder.com/800x450?text=Video+9', url: '#' },
    { id: 10, title: 'Memory 10', thumbnail: 'https://via.placeholder.com/800x450?text=Video+10', url: '#' }
  ];

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    logEvent('video_play', { videoId: video.id });
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  return (
    <section className="video-gallery-section">
      <div className="container">
        <p className="section-subtitle">Our Videos</p>

        <h2 className="h2 section-title">A Collection Of Our Moments</h2>

        <p className="section-text">
          Videos that capture our memories together. Each one tells a story of us.
        </p>

        <div className="videos-grid">
          {videos.map((video) => (
            <div
              key={video.id}
              className="video-card"
              onClick={() => handleVideoClick(video)}
            >
              <div className="video-thumbnail">
                <img src={video.thumbnail} alt={video.title} />
                <div className="play-overlay">
                  <div className="play-icon">▶</div>
                </div>
              </div>
              <h3 className="video-title">{video.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div className="video-modal" onClick={closeModal}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>×</button>
            <div className="modal-video">
              <video controls autoPlay>
                <source src={selectedVideo.url} type="video/mp4" />
                Video unavailable right now
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoGallery;
