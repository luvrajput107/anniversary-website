import React, { useState } from 'react';
import '../styles/GalleryAlbums.css';
import { logEvent } from '../utils/api';

const GalleryAlbums = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const albums = [
    {
      id: 'birthdays',
      title: 'Birthdays & Celebrations',
      photos: [
        'https://via.placeholder.com/600x400?text=Birthday+1',
        'https://via.placeholder.com/600x400?text=Birthday+2',
        'https://via.placeholder.com/600x400?text=Birthday+3'
      ]
    },
    {
      id: 'dates',
      title: 'Our Dates',
      photos: [
        'https://via.placeholder.com/600x400?text=Date+1',
        'https://via.placeholder.com/600x400?text=Date+2'
      ]
    },
    {
      id: 'just-us',
      title: 'Just Us',
      photos: [
        'https://via.placeholder.com/600x400?text=Us+1',
        'https://via.placeholder.com/600x400?text=Us+2',
        'https://via.placeholder.com/600x400?text=Us+3'
      ]
    },
    {
      id: 'pets',
      title: 'You & Your Babies',
      photos: [
        'https://via.placeholder.com/600x400?text=Pet+1',
        'https://via.placeholder.com/600x400?text=Pet+2'
      ]
    },
    {
      id: 'screenshots',
      title: 'Screenshots & Inside Jokes',
      photos: [
        'https://via.placeholder.com/600x400?text=SS+1'
      ]
    }
  ];

  // Flatten albums into gallery items
  const galleryItems = albums.flatMap((album, albumIndex) =>
    album.photos.map((photo, photoIndex) => ({
      id: `${album.id}-${photoIndex}`,
      src: photo,
      alt: `${album.title} ${photoIndex + 1}`,
      albumId: album.id,
      albumTitle: album.title
    }))
  );

  const handleAlbumClick = (album) => {
    setSelectedAlbum(album);
    logEvent('album_open', { albumId: album.id });
  };

  const closeAlbum = () => {
    setSelectedAlbum(null);
  };

  return (
    <>
      <section className="gallery" id="gallery">
        <div className="container">
          <p className="section-subtitle">Our Gallery</p>

          <h2 className="h2 section-title">Albums Of Our Memories</h2>

          <p className="section-text">
            I kept our photos in albums — our dates, birthdays, adventures, your dogs, your world, us. 
            Click any album to relive those memories.
          </p>

          <ul className="gallery-list">
            {albums.map((album, index) => (
              <li 
                key={album.id} 
                className={`gallery-item ${index === 2 ? 'gallery-item-large' : ''}`}
                onClick={() => handleAlbumClick(album)}
                style={{ cursor: 'pointer' }}
              >
                <figure className="gallery-image">
                  <img src={album.photos[0]} alt={album.title} loading="lazy" />
                  <div className="gallery-overlay">
                    <p className="gallery-title">{album.title}</p>
                    <p className="gallery-count">{album.photos.length} photos</p>
                  </div>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {selectedAlbum && (
        <div className="album-modal" onClick={closeAlbum}>
          <div className="album-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeAlbum}>×</button>
            <h3 className="modal-album-title">{selectedAlbum.title}</h3>
            <div className="album-photos">
              {selectedAlbum.photos.map((photo, index) => (
                <div key={index} className="album-photo">
                  <img src={photo} alt={`${selectedAlbum.title} ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryAlbums;
