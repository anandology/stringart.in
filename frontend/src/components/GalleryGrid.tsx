import React from 'react';
import GalleryTeaser from './GalleryTeaser';

interface GalleryItem {
    id: string;
    title: string;
    image: string;
}

interface GalleryGridProps {
    items: GalleryItem[];
    maxItems?: number;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ items, maxItems }) => {
    const displayItems = maxItems ? items.slice(0, maxItems) : items;
    return (
        <section className="py-10 bg-white rounded-xl shadow-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {displayItems.map((item) => (
                    <GalleryTeaser key={item.id} item={item} />
                ))}
            </div>
        </section>
    );
};

export default GalleryGrid; 