import React, { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-orange-600"><Link to="/">String Art Studio</Link></h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-orange-600 font-medium">Home</Link>
            <a href="#" className="text-gray-700 hover:text-orange-600 font-medium">About</a>
            <Link to="/gallery" className="text-gray-700 hover:text-orange-600 font-medium">Gallery</Link>
            <Link to="/products" className="text-gray-700 hover:text-orange-600 font-medium">Products</Link>
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
              <Link to="/" className="text-gray-700 hover:text-orange-600 font-medium px-4 py-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium px-4 py-2">About</a>
              <Link to="/gallery" className="text-gray-700 hover:text-orange-600 font-medium px-4 py-2" onClick={() => setIsMenuOpen(false)}>Gallery</Link>
              <Link to="/products" className="text-gray-700 hover:text-orange-600 font-medium px-4 py-2" onClick={() => setIsMenuOpen(false)}>Products</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
