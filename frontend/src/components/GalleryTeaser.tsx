import React from 'react';
import { Link } from 'react-router-dom';

interface GalleryTeaserProps {
  item: {
    id: string;
    title: string;
    image: string;
  };
}

const GalleryTeaser: React.FC<GalleryTeaserProps> = ({ item }) => (
  <Link
    to={`/gallery/${item.id}`}
    className="block bg-orange-50 rounded-lg shadow hover:shadow-lg transition overflow-hidden"
  >
    <img
      src={item.image}
      alt={item.title}
      className="w-full aspect-square object-cover"
    />
    <div className="p-2">
      <div className="font-semibold text-gray-800 text-center">{item.title}</div>
    </div>
  </Link>
);

export default GalleryTeaser; 