import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';
import GalleryGrid from './GalleryGrid';
import { useCart } from '../hooks/useCart';
import type { Product, Gallery } from '../types';

interface ProductDetailPageProps {
  products: Product[];
  gallery: Gallery;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ products, gallery }) => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addItem, updateQuantity, state } = useCart();

  const [imgIdx, setImgIdx] = useState(0);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
      </div>
    );
  }

  // Check if this product is already in the cart
  const cartItem = state.items.find(item => item.id === product.id);
  const currentQuantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
    });
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 2000);
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity === 0) {
      // Remove item if quantity becomes 0
      updateQuantity(product.id, 0);
    } else {
      updateQuantity(product.id, newQuantity);
    }
  };

  const kitGallery = Object.values(gallery.entries).filter((item) => item.kit === product.id);
  const images = product.images || [];
  const includes = product.includes || [];

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-start md:gap-10 bg-orange-50 md:rounded-2xl md:p-6 shadow-sm -mx-4  lg:-mx-8 -mt-10 md:mt-0">
        {/* Images Column */}
        <div className="w-full md:w-1/2 mb-6 md:mb-0 md:p-4 -mx-4 sm:-mx-6 lg:-mx-8 md:mx-0">
          {/* Carousel */}
          {images.length > 0 && (
            <div className="relative">
              <div className="bg-white p-8">
                <img
                  src={images[imgIdx]}
                  alt={product.title}
                  className="rounded-xl w-full aspect-square object-cover"
                  style={{ maxHeight: 400, objectFit: 'contain' }}
                />
              </div>
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
                  {images.map((_: string, idx: number) => (
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
        </div>
        {/* Details Column */}
        <div className="md:w-1/2 w-full flex flex-col p-4">
          <div className="mb-6">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{product.title}</h1>
            <span className="text-2xl font-bold text-orange-600 block mb-4">₹{product.price}</span>
            {/* Short description */}
            {product.short_description && (
              <p className="text-lg text-gray-700 mb-4">{product.short_description}</p>
            )}

            {/* Cart Controls */}
            <div className="mb-6">
              {currentQuantity === 0 ? (
                // Show "Add to Cart" button when item is not in cart
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <button className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors shadow">
                      Buy Now
                    </button>
                    <button
                      onClick={handleAddToCart}
                      className="bg-orange-100 text-orange-700 px-6 py-2 rounded-lg font-semibold hover:bg-orange-200 transition-colors shadow relative"
                    >
                      {showAddedMessage ? 'Added to Cart!' : 'Add to Cart'}
                    </button>
                  </div>
                  <Link
                    to={`/get-started/${product.id}`}
                    className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium text-sm"
                  >
                    📹 Watch tutorial video
                  </Link>
                </div>
              ) : (
                // Show quantity controls when item is in cart
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <button className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors shadow">
                      Buy Now
                    </button>
                    <div className="flex items-center bg-white rounded-lg border border-orange-200 shadow-sm">
                      <button
                        onClick={() => handleUpdateQuantity(currentQuantity - 1)}
                        className="p-2 hover:bg-orange-50 transition-colors rounded-l-lg"
                        disabled={currentQuantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-2 font-medium text-gray-900 min-w-[3rem] text-center">
                        {currentQuantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(currentQuantity + 1)}
                        className="p-2 hover:bg-orange-50 transition-colors rounded-r-lg"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <Link
                    to={`/get-started/${product.id}`}
                    className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium text-sm"
                  >
                    📹 Watch tutorial video
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* What's Included - full width */}
      {includes.length > 0 && (
        <div className="mb-6 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">What's Included</h2>
          <ul className="list-disc pl-6 text-gray-700">
            {includes.map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {/* About this Kit - full width */}
      {product.description_html && (
        <div className="mb-8 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">About this Kit</h2>
          <div className="prose max-w-none bg-white rounded-xl p-4" dangerouslySetInnerHTML={{ __html: product.description_html }} />
        </div>
      )}
      {/* Made with this kit - full width */}
      {kitGallery.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Made with this kit</h2>
          <GalleryGrid items={kitGallery} maxItems={3} />
        </div>
      )}
      {/* Similar Products - full width */}
      {product.similar_products && product.similar_products.length > 0 && (
        <div className="mb-6 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Similar Products</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {product.similar_products.map((similarProductId: string) => {
              const similarProduct = products.find((p) => p.id === similarProductId);
              if (!similarProduct) return null;

              return (
                <div
                  key={similarProduct.id}
                  className="bg-orange-50 rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col"
                >
                  <img
                    src={similarProduct.images[0]}
                    alt={similarProduct.title}
                    className="rounded-xl mb-4 w-full aspect-square object-cover bg-white"
                    loading="lazy"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{similarProduct.title}</h3>
                  <p className="text-gray-600 mb-4 flex-1">{similarProduct.short_description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-bold text-orange-600">₹{similarProduct.price}</span>
                    <Link
                      to={`/products/${similarProduct.id}`}
                      className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage; 