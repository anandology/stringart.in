import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import GalleryGrid from './GalleryGrid';

interface ProductDetailPageProps {
  products: any[];
  gallery: any[];
}

// Slugify function for gallery titles
const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ products, gallery }) => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);

  const [imgIdx, setImgIdx] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
      </div>
    );
  }

  const kitGallery = gallery.filter((item) => item.kit === product.id);
  const images = product.images || [];
  const includes = product.includes || [];

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900">{product.title || product.name}</h1>
        <span className="text-2xl font-bold text-orange-600">₹{product.price}</span>
      </div>
      {/* Carousel */}
      {images.length > 0 && (
        <div className="mb-6 relative">
          <img
            src={images[imgIdx]}
            alt={product.title || product.name}
            className="rounded-xl w-full aspect-square object-cover bg-white border"
            style={{ maxHeight: 400, objectFit: 'contain' }}
          />
          {images.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between px-2">
              <button
                className="bg-white/80 rounded-full p-2 shadow hover:bg-orange-100"
                onClick={() => setImgIdx((imgIdx - 1 + images.length) % images.length)}
                aria-label="Previous image"
              >&lt;</button>
              <button
                className="bg-white/80 rounded-full p-2 shadow hover:bg-orange-100"
                onClick={() => setImgIdx((imgIdx + 1) % images.length)}
                aria-label="Next image"
              >&gt;</button>
            </div>
          )}
          {images.length > 1 && (
            <div className="flex justify-center mt-2 gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full ${idx === imgIdx ? 'bg-orange-600' : 'bg-orange-200'}`}
                  onClick={() => setImgIdx(idx)}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
      {/* Short description */}
      {product.short_description && (
        <p className="text-lg text-gray-700 mb-4">{product.short_description}</p>
      )}
      {/* Buy/Add to Cart */}
      <div className="flex gap-4 mb-6">
        <button className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors shadow">
          Buy Now
        </button>
        <button className="bg-orange-100 text-orange-700 px-6 py-2 rounded-lg font-semibold hover:bg-orange-200 transition-colors shadow">
          Add to Cart
        </button>
      </div>
      {/* What's Included */}
      {includes.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">What's Included</h2>
          <ul className="list-disc pl-6 text-gray-700">
            {includes.map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {/* Long Description */}
      {product.description_html && (
        <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: product.description_html }} />
      )}
      {/* Made with this kit */}
      {kitGallery.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Made with this kit</h2>
          <GalleryGrid items={kitGallery} maxItems={3} />
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage; 