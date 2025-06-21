import { useParams, Link } from 'react-router-dom';
import type { Product, Gallery } from '../types';

interface LandingPageProps {
    products?: Product[];
    gallery?: Gallery;
}

const LandingPage: React.FC<LandingPageProps> = ({ products = [], gallery = { entries: {}, featured: [], ids: [] } }) => {
    const { productId } = useParams<{ productId: string }>();

    // Find the product based on the URL parameter
    const product = products.find(p => p.id === productId) || products[0];

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
                    <Link to="/products" className="text-orange-600 hover:underline">
                        Browse all products
                    </Link>
                </div>
            </div>
        );
    }

    // Filter gallery items that were made with this specific kit
    const kitGallery = Object.values(gallery.entries).filter((item) => item.kit === product.id);

    // Take up to 4 items for the grid
    const displayItems = kitGallery.slice(0, 4);

    return (
        <main className="bg-gradient-to-br from-orange-50 to-yellow-50 min-h-screen py-10">
            <div className="max-w-2xl mx-auto px-4 flex flex-col gap-8">
                <section className="relative rounded-2xl shadow-xl p-8 flex flex-col items-center mb-0 overflow-hidden" style={{ background: '#f5e1c5', backgroundImage: 'url(/brown-sheet.png)', backgroundRepeat: 'repeat', backgroundSize: 'cover' }}>
                    {/* White overlay to lighten the background */}
                    <div className="absolute inset-0 bg-white opacity-40 pointer-events-none" style={{ zIndex: 0 }}></div>
                    <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8" style={{ position: 'relative', zIndex: 1 }}>
                        <div className="flex-shrink-0 flex items-center justify-center">
                            <img src={product.images?.[0] || "/stringart-logo.png"} alt={product.title} className="w-40 h-40 object-contain" />
                        </div>
                        <div className="flex flex-col items-center md:items-start text-center md:text-left">
                            <h1 className="leading-tight">
                                <span className="block text-5xl sm:text-6xl font-extrabold text-orange-600">String Art</span>
                                <span className="block text-5xl sm:text-6xl font-normal text-gray-700">{product.title.replace('String Art ', '')}</span>
                            </h1>
                        </div>
                    </div>
                </section>

                <section className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center mt-0">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Get Started</h2>
                    <p className="text-lg text-gray-700 mb-4 text-center">
                        Watch the video below and follow the steps to create beautiful string art.
                    </p>
                    <div className="w-full aspect-video mb-0">
                        {/* Replace the src with your actual tutorial video URL */}
                        <iframe
                            className="w-full h-full rounded-lg shadow"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                            title="String Art Tutorial"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </section>

                <section className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center mt-0">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Get Inspired</h2>
                    {displayItems.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 w-full">
                                {displayItems.map((item) => (
                                    <Link
                                        key={item.id}
                                        to={`/gallery/${item.id}`}
                                        className="block hover:opacity-80 transition-opacity"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full aspect-square object-contain rounded-lg"
                                        />
                                    </Link>
                                ))}
                            </div>
                            <Link to="/gallery" className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-lg text-center hover:bg-orange-700 transition-colors">See More Designs</Link>
                        </>
                    ) : (
                        <div className="text-center">
                            <p className="text-gray-600 mb-4">No designs available yet for this kit.</p>
                            <Link to="/gallery" className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-lg text-center hover:bg-orange-700 transition-colors">Browse All Designs</Link>
                        </div>
                    )}
                </section>

                <section className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Share Your Creations!</h2>
                    <p className="text-gray-700 mb-2 text-center">Tag your art with <span className="font-bold text-orange-600">#StringArtStudio</span> on Instagram or join our community to inspire others.</p>
                    {/* Replace with actual community link if available */}
                    <a href="#" className="text-orange-600 hover:underline font-medium">Join our WhatsApp group</a>
                </section>

                <section className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Explore More</h2>
                    <p className="text-gray-700 mb-4 text-center">Ready to discover more string art kits and designs?</p>
                    <Link to="/" className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                        Visit Our Website
                    </Link>
                </section>
            </div>
        </main>
    );
};

export default LandingPage; 