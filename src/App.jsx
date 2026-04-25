import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { Gallery } from './components/Gallery';
import { CustomForm } from './components/CustomForm';
import { Warranty } from './components/Warranty';
import { Privacy } from './components/Privacy';
import { WhatsAppButton } from './components/WhatsAppButton';
import { MusicPlayer } from './components/MusicPlayer';
import { BackgroundMap } from './components/BackgroundMap';
import { DiscoverCity } from './components/DiscoverCity';
import { InsigniaForm } from './components/InsigniaForm';
import { LaserLock } from './components/LaserLock';
import './App.css';

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#home');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#home');
      
      // Handle scrolling if we return to the main page and want to scroll to a specific section
      if (window.location.hash !== '#warranty') {
        setTimeout(() => {
          const element = document.getElementById(window.location.hash.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 100);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Check initially
    if (window.location.hash && window.location.hash !== '#warranty') {
      setTimeout(() => {
        const element = document.getElementById(window.location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (!window.location.hash || window.location.hash === '#home') {
       window.scrollTo(0, 0);
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isWarrantyPage = currentHash === '#warranty';
  const isPrivacyPage = currentHash === '#privacidad' || new URLSearchParams(window.location.search).has('confirm');
  const isDiscoverPage = currentHash === '#aventuras';
  const isInsigniaPage = currentHash.startsWith('#insignia');
  const isLaserStickerPage = currentHash === '#lasersticker';

  return (
    <>
      <BackgroundMap />
      <Header />
      <main style={{ minHeight: '80vh' }}>
        {isWarrantyPage ? (
          <Warranty />
        ) : isPrivacyPage ? (
          <Privacy />
        ) : isDiscoverPage ? (
          <DiscoverCity />
        ) : isInsigniaPage ? (
          <InsigniaForm />
        ) : isLaserStickerPage ? (
          <LaserLock />
        ) : (
          <>
            <Home />
            <Gallery />
            <CustomForm />
          </>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
      <MusicPlayer />
    </>
  );
}

export default App;
