import React, { useState } from 'react';
import { ShoppingCart, Star, ArrowRight, Package, Users, Lightbulb, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-orange-600">StringArt.in</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-orange-600 font-medium">Home</a>
            <a href="#" className="text-gray-700 hover:text-orange-600 font-medium">About</a>
            <a href="#" className="text-gray-700 hover:text-orange-600 font-medium">Gallery</a>
            <a href="#" className="text-gray-700 hover:text-orange-600 font-medium">Products</a>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="flex items-center text-gray-700 hover:text-orange-600">
              <ShoppingCart className="h-6 w-6" />
              <span className="ml-1 font-medium hidden sm:block">Cart</span>
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-700 hover:text-orange-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-orange-100 py-4">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium px-4 py-2">Home</a>
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium px-4 py-2">About</a>
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium px-4 py-2">Gallery</a>
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium px-4 py-2">Products</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

const HeroSection = () => (
  <section className="bg-gradient-to-br from-orange-50 to-yellow-50 py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Discover the Mathematical Beauty of
            <span className="text-orange-600"> String Art</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Perfect for families to explore geometry, patterns, and creativity together.
            Transform simple threads into stunning mathematical masterpieces that teach
            and inspire.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-700 transition-colors shadow-lg">
              Buy a Kit
            </button>
            <button className="border-2 border-orange-600 text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-50 transition-colors">
              View Gallery
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="bg-white rounded-2xl shadow-xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-300">
            <div className="aspect-square bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl flex items-center justify-center">
              <div className="text-6xl text-orange-400">🧵</div>
            </div>
            <p className="text-center mt-4 text-gray-600 font-medium">Beautiful String Art Creation</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ProductShowcase = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h3 className="text-4xl font-bold text-gray-900 mb-4">String Art Starter Kit</h3>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Everything you need to begin your string art journey. Precision-cut templates
          designed to teach mathematical concepts while creating beautiful art.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="bg-orange-50 rounded-2xl p-8">
            <h4 className="text-2xl font-bold text-gray-900 mb-6">What's Included:</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                <span className="text-gray-700">9 holes × 3 templates</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                <span className="text-gray-700">12 holes × 3 templates</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                <span className="text-gray-700">18 holes × 3 templates</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                <span className="text-gray-700">24 holes × 3 templates</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                <span className="text-gray-700">30 holes × 3 templates</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                <span className="text-gray-700">40 holes × 2 templates</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                <span className="text-gray-700">50 holes × 1 template</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                <span className="text-gray-700">Square & Triangle shapes</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-3xl font-bold text-orange-600">₹599</span>
              <span className="text-lg text-gray-500 ml-2">Free Shipping</span>
            </div>
            <button className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors shadow-md">
              View Details
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl aspect-square flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="text-3xl text-orange-600 mb-2">📐</div>
                <p className="text-sm text-gray-600 font-medium">Template {i}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Mother of two",
      content: "My kids (8 and 12) absolutely love creating string art! It's amazing how they're learning about angles and symmetry while having so much fun. The templates are perfect for beginners.",
      rating: 5,
      image: "👩‍💼"
    },
    {
      name: "Rajesh Kumar",
      role: "Art teacher",
      content: "I use these kits in my classroom to teach geometry concepts. Students are engaged and excited to learn math through art. The quality of templates is excellent!",
      rating: 5,
      image: "👨‍🏫"
    },
    {
      name: "Meera Patel",
      role: "Craft enthusiast",
      content: "Started as a hobby but now I'm creating beautiful pieces for my home. The progression from simple to complex patterns is well thought out. Highly recommend!",
      rating: 5,
      image: "👩‍🎨"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h3>
          <p className="text-xl text-gray-600">Join thousands of families discovering the joy of string art</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div className="text-3xl mr-4">{testimonial.image}</div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GalleryTeaser = () => {
  const patterns = [
    { name: "Spiral Galaxy", difficulty: "Beginner" },
    { name: "Geometric Rose", difficulty: "Intermediate" },
    { name: "Mandala Circle", difficulty: "Advanced" },
    { name: "Star Burst", difficulty: "Beginner" },
    { name: "Celtic Knot", difficulty: "Advanced" },
    { name: "Flower Petals", difficulty: "Intermediate" },
    { name: "Triangle Mesh", difficulty: "Beginner" },
    { name: "Heart Shape", difficulty: "Intermediate" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">Get Inspired</h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore mathematical patterns and artistic possibilities. From simple geometric shapes
            to complex mathematical curves, discover the beauty of string art.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {patterns.map((pattern, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl aspect-square flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow mb-3">
                <div className="text-center">
                  <div className="text-4xl text-orange-600 mb-2">🔗</div>
                  <div className="text-xs text-gray-600 font-medium">{pattern.difficulty}</div>
                </div>
              </div>
              <h4 className="font-semibold text-gray-900 text-center">{pattern.name}</h4>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-700 transition-colors shadow-lg inline-flex items-center">
            View Full Gallery
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <h4 className="text-2xl font-bold text-orange-400 mb-4">StringArt.in</h4>
          <p className="text-gray-300 mb-6 max-w-md">
            Bringing families together through the mathematical beauty of string art.
            Learn, create, and inspire with our thoughtfully designed kits.
          </p>
          <div className="flex space-x-4">
            <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">f</span>
            </div>
            <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">@</span>
            </div>
          </div>
        </div>

        <div>
          <h5 className="font-semibold mb-4">Quick Links</h5>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-orange-400">About Us</a></li>
            <li><a href="#" className="hover:text-orange-400">Gallery</a></li>
            <li><a href="#" className="hover:text-orange-400">Products</a></li>
            <li><a href="#" className="hover:text-orange-400">Instructions</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold mb-4">Support</h5>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-orange-400">Contact</a></li>
            <li><a href="#" className="hover:text-orange-400">Shipping</a></li>
            <li><a href="#" className="hover:text-orange-400">Returns</a></li>
            <li><a href="#" className="hover:text-orange-400">FAQ</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
        <p>&copy; 2024 StringArt.in. All rights reserved. Made with ❤️ for creative families.</p>
      </div>
    </div>
  </footer>
);

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