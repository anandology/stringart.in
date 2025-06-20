import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductShowcase from './components/ProductShowcase';
import TestimonialSection from './components/TestimonialSection';
import GalleryTeaser from './components/GalleryTeaser';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import GalleryPage from './components/GalleryPage';
import GalleryDetailPage from './components/GalleryDetailPage';

const Home = () => (
  <>
    <Header />
    <HeroSection />
    <ProductShowcase />
    <TestimonialSection />
    <GalleryTeaser />
    <Footer />
  </>
);

const App = () => {
  const [appData, setAppData] = useState<any | null>(null);

  useEffect(() => {
    fetch('/src/data/app.json')
      .then(res => res.json())
      .then(setAppData);
  }, []);

  if (!appData || !appData.gallery) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-started" element={<LandingPage />} />
        <Route path="/gallery" element={<GalleryPage gallery={appData.gallery} />} />
        <Route path="/gallery/:id" element={<GalleryDetailPage gallery={appData.gallery} />} />
      </Routes>
    </Router>
  );
};

export default App;