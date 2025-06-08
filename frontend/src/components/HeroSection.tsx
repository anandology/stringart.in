import React from 'react';

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
            <div className="aspect-square bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl flex items-center justify-center p-8">
  <img src="/stringart-logo.png" alt="String Art Logo" className="w-full h-full object-contain" />
</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
