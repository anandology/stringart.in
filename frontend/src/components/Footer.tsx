import React from 'react';

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

export default Footer;
