import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { Gallery } from './components/Gallery';
import { CustomForm } from './components/CustomForm';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main style={{ minHeight: '80vh' }}>
        <Home />
        <Gallery />
        <CustomForm />
      </main>
      <Footer />
    </>
  );
}

export default App;
