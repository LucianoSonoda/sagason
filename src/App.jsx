import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <BackgroundMap />
      <Header />
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/custom" element={<CustomForm />} />
          <Route path="/warranty" element={<Warranty />} />
          <Route path="/privacidad" element={<Privacy />} />
          <Route path="/aventuras" element={<DiscoverCity />} />
          <Route path="/insignia/*" element={<InsigniaForm />} />
          <Route path="/lasersticker" element={<LaserLock />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      <MusicPlayer />
    </BrowserRouter>
  );
}

export default App;

