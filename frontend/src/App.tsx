import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import GettingStartedVideo from './components/GettingStartedVideo';
// import TestimonialSection from './components/TestimonialSection';
import GalleryShowcase from './components/GalleryShowcase';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import GalleryPage from './components/GalleryPage';
import GalleryDetailPage from './components/GalleryDetailPage';
import ProductsPage from './components/ProductsPage';
import ProductDetailPage from './components/ProductDetailPage';
import CartPage from './components/CartPage';
import CheckoutForm from './components/CheckoutForm';
import PaymentConfirmationPage from './components/PaymentConfirmationPage';
import PaymentInstructionsPage from './components/PaymentInstructionsPage';
import { CartProvider } from './components/CartContext';
import { AppDataProvider, useAppData } from './components/AppDataContext';
import AboutPage from './components/AboutPage';
import ShippingPage from './components/ShippingPage';
import FAQPage from './components/FAQPage';
import ContactPage from './components/ContactPage';

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

const PaymentConfirmationRoute = () => (
  <>
    <Header />
    <PaymentConfirmationPage />
    <Footer />
  </>
);

const AppRoutes = () => {
  const { appData, loading } = useAppData();

  if (loading || !appData || !appData.gallery) {
    return <div>Loading...</div>;
  }

  const Home = () => (
    <>
      <Header />
      <HeroSection heroImages={appData.home?.hero_images} />
      <GettingStartedVideo
        videoUrl={appData.home?.video_url}
        videoTitle={appData.home?.video_title}
        videoDuration={appData.home?.video_duration}
      />
      {/* <TestimonialSection /> */}
      <GalleryShowcase gallery={appData.gallery} />
      <Footer />
    </>
  );

  const ProductsRoute = () => (
    <>
      <Header />
      <ProductsPage products={appData.products} />
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
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-started" element={<LandingPageRoute />} />
        <Route path="/get-started/:productId" element={<ProductLandingRoute />} />
        <Route path="/s/:productId" element={<ProductLandingRoute />} />
        <Route path="/go" element={<Navigate to="/get-started/starter-kit" replace />} />
        <Route path="/go/1" element={<Navigate to="/get-started/starter-kit" replace />} />
        <Route path="/go/2" element={<Navigate to="/get-started/advanced-kit" replace />} />
        <Route path="/go/3" element={<Navigate to="/get-started/rings-kit" replace />} />
        <Route path="/gallery" element={<GalleryPage gallery={appData.gallery} />} />
        <Route path="/gallery/:id" element={<GalleryDetailPage gallery={appData.gallery} />} />
        <Route path="/products" element={<ProductsRoute />} />
        <Route path="/products/:id" element={<ProductDetailRoute />} />
        <Route path="/cart" element={<CartRoute />} />
        <Route path="/checkout" element={<CheckoutRoute />} />
        <Route path="/payment-confirmation" element={<PaymentConfirmationRoute />} />
        <Route path="/payment-instructions" element={<PaymentInstructionsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
};

const App = () => {
  return (
    <AppDataProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </AppDataProvider>
  );
};

export default App;