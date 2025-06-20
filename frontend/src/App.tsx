import React from 'react';
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
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-started" element={<LandingPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/gallery/:id" element={<GalleryDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;