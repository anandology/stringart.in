import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  heroImages?: string[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ heroImages = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate carousel
  useEffect(() => {
    if (heroImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Fallback to logo if no hero images
  const currentImage = heroImages.length > 0
    ? heroImages[currentIndex]
    : "/stringart-logo.png";

  return (
    <section className="bg-gradient-to-br from-orange-50 to-yellow-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Create Beautiful Patterns with
              <span className="text-orange-600"> String Art</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Connect dots with colorful threads to create intricate geometric patterns. Watch in wonder as fascinating curves emerge from straight lines. Ready to discover what you can create?
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products" className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-700 transition-colors shadow-lg">
                Buy a Kit
              </Link>
              <Link to="/gallery" className="border-2 border-orange-600 text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-50 transition-colors">
                View Gallery
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="aspect-square bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl flex items-center justify-center p-8 relative overflow-hidden">
                {/* Carousel */}
                <div className="w-full h-full relative">
                  <img
                    src={currentImage}
                    alt="String Art Design"
                    className="w-full h-full object-contain transition-opacity duration-500"
                  />

                  {/* Navigation Arrows */}
                  {heroImages.length > 1 && (
                    <>
                      <button
                        onClick={goToPrevious}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-5 w-5 text-gray-700" />
                      </button>
                      <button
                        onClick={goToNext}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-5 w-5 text-gray-700" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Dots Indicator */}
              {heroImages.length > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex
                        ? 'bg-orange-600'
                        : 'bg-orange-200 hover:bg-orange-300'
                        }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
