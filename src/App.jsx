import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { WhatsAppButton } from './components/WhatsAppButton';
import { MusicPlayer } from './components/MusicPlayer';
import { BackgroundMap } from './components/BackgroundMap';
import { ScrollManager } from './components/ScrollManager';
import './App.css';

// Lazy loaded page components
const Warranty = lazy(() => import('./components/Warranty').then(module => ({ default: module.Warranty })));
const Privacy = lazy(() => import('./components/Privacy').then(module => ({ default: module.Privacy })));
const DiscoverCity = lazy(() => import('./components/DiscoverCity').then(module => ({ default: module.DiscoverCity })));
const HowItWorks = lazy(() => import('./components/HowItWorks').then(module => ({ default: module.HowItWorks })));
const Technology = lazy(() => import('./components/Technology').then(module => ({ default: module.Technology })));
const InsigniaForm = lazy(() => import('./components/InsigniaForm').then(module => ({ default: module.InsigniaForm })));
const LaserLock = lazy(() => import('./components/LaserLock').then(module => ({ default: module.LaserLock })));
const Tags4K = lazy(() => import('./pages/Tags4K').then(module => ({ default: module.Tags4K })));

function MainContent() {
  return (
    <>
      <Home />
    </>
  );
}

// Sleek high-fidelity top loading bar
function RouteLoader() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '3px',
      background: 'linear-gradient(90deg, transparent, var(--color-primary, #0EA5E9), transparent)',
      zIndex: 9999,
      overflow: 'hidden'
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        background: 'var(--color-primary, #0EA5E9)',
        animation: 'loadingProgress 1.2s infinite linear'
      }} />
      <style>{`
        @keyframes loadingProgress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <BackgroundMap />
      <Header />
      <main style={{ minHeight: '80vh' }}>
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/warranty" element={<Warranty />} />
            <Route path="/privacidad" element={<Privacy />} />
            <Route path="/aventuras" element={<DiscoverCity />} />
            <Route path="/como-funciona" element={<HowItWorks />} />
            <Route path="/tecnologia" element={<Technology />} />
            <Route path="/insignia/*" element={<InsigniaForm />} />
            <Route path="/lasersticker" element={<LaserLock />} />
            <Route path="/tags-4k" element={<Tags4K />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
      <MusicPlayer />
    </BrowserRouter>
  );
}

export default App;

