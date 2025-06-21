import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import type { Gallery } from '../types';

interface GalleryDetailPageProps {
    gallery: Gallery;
}

const GalleryDetailPage: React.FC<GalleryDetailPageProps> = ({ gallery }) => {
    const { id } = useParams<{ id: string }>();
    const item = id ? gallery.entries[id] : undefined;
    const navigate = useNavigate();

    if (!item) {
        return (
            <div className="p-8">
                <h2 className="text-xl font-bold mb-4">Image not found</h2>
                <button onClick={() => navigate(-1)} className="text-blue-600 underline">Go Back</button>
            </div>
        );
    }

    return (
        <>
            <Header />
            <main className="bg-gradient-to-br from-orange-50 to-yellow-50 py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link to="/gallery" className="text-blue-600 underline mb-4 inline-block">&larr; Back to Gallery</Link>
                    <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
                        <div className="aspect-square w-full max-w-md bg-white rounded flex items-center justify-center overflow-hidden mb-4">
                            <img
                                src={`${item.image}`}
                                alt={item.title}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
                        <div className="mb-2">{item.description_html || item.description}</div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default GalleryDetailPage; 