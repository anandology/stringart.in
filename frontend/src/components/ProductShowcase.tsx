import React from 'react';
import { Star, Package } from 'lucide-react';

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

export default ProductShowcase;
