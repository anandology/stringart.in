import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

interface GalleryPageProps {
    gallery: {
        entries: { [id: string]: any };
        ids: string[];
    };
}

const GalleryPage: React.FC<GalleryPageProps> = ({ gallery }) => {
    const { entries, ids } = gallery;
    return (
        <>
            <Header />
            <main className="bg-gradient-to-br from-orange-50 to-yellow-50 min-h-screen py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold mb-6">Gallery</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {ids.map((id: string) => {
                            const item = entries[id];
                            return (
                                <Link key={id} to={`/gallery/${item.id}`} className="block group">
                                    <div className="aspect-square w-full bg-white rounded shadow flex items-center justify-center overflow-hidden">
                                        <img
                                            src={`${item.image}`}
                                            alt={item.title}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div className="mt-2 text-center font-medium">{item.title}</div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default GalleryPage; 