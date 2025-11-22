import React, { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import MemoryCalendar from '../components/MemoryCalendar';
import OurDates from '../components/OurDates';
import ShayariEnvelopes from '../components/ShayariEnvelopes';
import SpotifyPlaylist from '../components/SpotifyPlaylist';
import OurSong from '../components/OurSong';
import BirthdayVideo from '../components/BirthdayVideo';
import VideoGallery from '../components/VideoGallery';
import GalleryAlbums from '../components/GalleryAlbums';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';
import GoTop from '../components/GoTop';
import ShakeDetector from '../components/ShakeDetector';
import { trackVisit } from '../utils/api';

const MainPage = () => {
  useEffect(() => {
    // Track visit on mount
    trackVisit();
    // Load ionicons script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js';
    document.head.appendChild(script);
    
    const script2 = document.createElement('script');
    script2.nomodule = true;
    script2.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js';
    document.head.appendChild(script2);
  }, []);

  return (
    <>
      <ShakeDetector />
      <Header />
      <main>
        <article>
          <Hero />
          <MemoryCalendar />
          <OurDates />
          <ShayariEnvelopes />
          <SpotifyPlaylist />
          <OurSong />
          <BirthdayVideo />
          <VideoGallery />
          <GalleryAlbums />
          <FinalCTA />
        </article>
      </main>
      <Footer />
      <GoTop />
    </>
  );
};

export default MainPage;

