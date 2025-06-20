import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductShowcase from './components/ProductShowcase';
import TestimonialSection from './components/TestimonialSection';
import GalleryShowcase from './components/GalleryShowcase';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import GalleryPage from './components/GalleryPage';
import GalleryDetailPage from './components/GalleryDetailPage';
import ProductsPage from './components/ProductsPage';
import ProductDetailPage from './components/ProductDetailPage';

const Home = () => (
  <>
    <Header />
    <HeroSection />
    <ProductShowcase />
    <TestimonialSection />
    <GalleryShowcase />
    <Footer />
  </>
);

const ProductsRoute = () => (
  <>
    <Header />
    <ProductsPage />
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

  const ProductDetailRoute = () => (
    <>
      <Header />
      <ProductDetailPage products={appData.products} gallery={appData.gallery} />
      <Footer />
    </>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-started" element={<LandingPage />} />
        <Route path="/gallery" element={<GalleryPage gallery={appData.gallery} />} />
        <Route path="/gallery/:id" element={<GalleryDetailPage gallery={appData.gallery} />} />
        <Route path="/products" element={<ProductsRoute />} />
        <Route path="/products/:id" element={<ProductDetailRoute />} />
      </Routes>
    </Router>
  );
};

export default App;