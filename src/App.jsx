import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { WhatsAppButton } from './components/WhatsAppButton';
import { MusicPlayer } from './components/MusicPlayer';
import { BackgroundMap } from './components/BackgroundMap';
import { ParticleBackground } from './components/ParticleBackground';
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
const IdMascotas = lazy(() => import('./pages/IdMascotas').then(module => ({ default: module.default })));
const IdSalud = lazy(() => import('./pages/IdSalud').then(module => ({ default: module.default })));
const CuadrosMetal = lazy(() => import('./pages/CuadrosMetal').then(module => ({ default: module.default })));
const RegalosCorporativos = lazy(() => import('./pages/RegalosCorporativos').then(module => ({ default: module.default })));
const GaleriaArtistas = lazy(() => import('./pages/GaleriaArtistas').then(module => ({ default: module.default })));
const Blog = lazy(() => import('./pages/Blog').then(module => ({ default: module.default })));
const Llaveros = lazy(() => import('./pages/Llaveros').then(module => ({ default: module.default })));
const Rompecabezas = lazy(() => import('./pages/Rompecabezas').then(module => ({ default: module.default })));
const Tazones = lazy(() => import('./pages/Tazones').then(module => ({ default: module.default })));
const Tumblers = lazy(() => import('./pages/Tumblers').then(module => ({ default: module.default })));
const Impresion3D = lazy(() => import('./pages/Impresion3D').then(module => ({ default: module.default })));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard').then(module => ({ default: module.default })));
const Exito = lazy(() => import('./pages/Exito').then(module => ({ default: module.default })));
const PagoFallido = lazy(() => import('./pages/PagoFallido').then(module => ({ default: module.default })));
const MisPedidos = lazy(() => import('./components/MisPedidos').then(module => ({ default: module.default })));
const CotizadorB2B = lazy(() => import('./pages/CotizadorB2B').then(module => ({ default: module.default })));

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

import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { CartDrawer } from './components/CartDrawer';
import { GDPRConsent } from './components/GDPRConsent';

const CLIENT_ID = "309943165939-is4u5ga8gaehh7cp0ge9kt5pj8dbkqv2.apps.googleusercontent.com";

function App() {
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <ScrollManager />
            <BackgroundMap />
            <ParticleBackground />
            <Header />
            <CartDrawer />
            <GDPRConsent />
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
                  
                  {/* New Silo Architecture Routes */}
                  <Route path="/id-mascotas" element={<IdMascotas />} />
                  <Route path="/id-salud" element={<IdSalud />} />
                  <Route path="/cuadros-metal-hd" element={<CuadrosMetal />} />
                  <Route path="/regalos-corporativos" element={<RegalosCorporativos />} />
                  <Route path="/galeria-artistas" element={<GaleriaArtistas />} />
                  <Route path="/blog/*" element={<Blog />} />
                  
                  <Route path="/llaveros" element={<Llaveros />} />
                  <Route path="/rompecabezas" element={<Rompecabezas />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/tags-4k" element={<Tags4K />} />
                  <Route path="/mis-pedidos" element={<MisPedidos />} />
                  <Route path="/cotizador-b2b" element={<CotizadorB2B />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                  
                  <Route path="/tazones" element={<Tazones />} />
                  <Route path="/tumblers" element={<Tumblers />} />
                  <Route path="/impresion-3d" element={<Impresion3D />} />
                  <Route path="/exito" element={<Exito />} />
                  <Route path="/pago-fallido" element={<PagoFallido />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
            <WhatsAppButton />
            <MusicPlayer />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;

