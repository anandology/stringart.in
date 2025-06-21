export interface Product {
    id: string;
    title: string;
    price: number;
    images: string[];
    includes?: string[];
    description?: string;
    short_description?: string;
    description_html?: string;
    similar_products?: string[];
}

export interface GalleryEntry {
    id: string;
    title: string;
    image: string;
    kit: string;
    description?: string;
    description_html?: string;
}

export interface Gallery {
    entries: { [id: string]: GalleryEntry };
    featured: string[];
    ids: string[];
}

export interface HomeData {
    hero_images?: string[];
    video_url?: string;
    video_title?: string;
    video_duration?: string;
}

export interface AppData {
    products: Product[];
    gallery: Gallery;
    home?: HomeData;
} 