import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductShowcase from './components/ProductShowcase';
import TestimonialSection from './components/TestimonialSection';
import GalleryTeaser from './components/GalleryTeaser';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <ProductShowcase />
      <TestimonialSection />
      <GalleryTeaser />
      <Footer />
    </div>
  );
};

export default App;