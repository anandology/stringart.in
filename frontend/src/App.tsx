import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import GettingStartedVideo from './components/GettingStartedVideo';
import TestimonialSection from './components/TestimonialSection';
import GalleryShowcase from './components/GalleryShowcase';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import GalleryPage from './components/GalleryPage';
import GalleryDetailPage from './components/GalleryDetailPage';
import ProductsPage from './components/ProductsPage';
import ProductDetailPage from './components/ProductDetailPage';
import CartPage from './components/CartPage';
import CheckoutForm from './components/CheckoutForm';
import { CartProvider } from './components/CartContext';

const ProductsRoute = () => (
  <>
    <Header />
    <ProductsPage />
    <Footer />
  </>
);

const CartRoute = () => (
  <>
    <Header />
    <CartPage />
    <Footer />
  </>
);

const CheckoutRoute = () => (
  <>
    <Header />
    <CheckoutForm />
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

  const Home = () => (
    <>
      <Header />
      <HeroSection heroImages={appData.home?.hero_images} />
      <GettingStartedVideo
        videoUrl={appData.home?.video_url}
        videoTitle={appData.home?.video_title}
        videoDuration={appData.home?.video_duration}
      />
      <TestimonialSection />
      <GalleryShowcase gallery={appData.gallery} />
      <Footer />
    </>
  );

  const ProductDetailRoute = () => (
    <>
      <Header />
      <ProductDetailPage products={appData.products} gallery={appData.gallery} />
      <Footer />
    </>
  );

  const LandingPageRoute = () => (
    <LandingPage products={appData.products} gallery={appData.gallery} />
  );

  const ProductLandingRoute = () => (
    <LandingPage products={appData.products} gallery={appData.gallery} />
  );

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/get-started" element={<LandingPageRoute />} />
          <Route path="/get-started/:productId" element={<ProductLandingRoute />} />
          <Route path="/gallery" element={<GalleryPage gallery={appData.gallery} />} />
          <Route path="/gallery/:id" element={<GalleryDetailPage gallery={appData.gallery} />} />
          <Route path="/products" element={<ProductsRoute />} />
          <Route path="/products/:id" element={<ProductDetailRoute />} />
          <Route path="/cart" element={<CartRoute />} />
          <Route path="/checkout" element={<CheckoutRoute />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;