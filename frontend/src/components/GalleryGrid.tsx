// import GalleryTeaser from './GalleryTeaser';
import { Link } from 'react-router-dom';

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {displayItems.map((item) => (
                <Link key={item.id} to={`/gallery/${item.id}`} className="block group">
                    <div className="aspect-square w-full bg-white rounded shadow flex items-center justify-center overflow-hidden">
                        <img
                            src={`${item.image}`}
                            alt={item.title}
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="mt-2 text-center font-medium">{item.title}</div>
                </Link>
            ))}
        </div>
    );
};

export default GalleryGrid; 