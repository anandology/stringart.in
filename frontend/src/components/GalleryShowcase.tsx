import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import GalleryGrid from './GalleryGrid';

interface GalleryShowcaseProps {
  gallery: any[];
}

const GalleryShowcase: React.FC<GalleryShowcaseProps> = ({ gallery }) => {
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

        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
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
        </div> */}

        <GalleryGrid items={gallery} maxItems={3} />

        <div className="text-center pt-10">
          <Link
            to="/gallery"
            //className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors text-center"
            className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-700 transition-colors shadow-lg inline-flex items-center"
          >
            View Full Gallery
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>

        </div>
      </div>
    </section >
  );
};

export default GalleryShowcase;
