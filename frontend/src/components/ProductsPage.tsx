import React from 'react';
import { Link } from 'react-router-dom';
import productsData from '../data/app.json';

const ProductsPage = () => {
    const { products } = productsData;

    return (
        <section className="py-16 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Our String Art Kits</h2>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-orange-50 rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col"
                        >
                            <img
                                src={product.images[0]}
                                alt={product.title}
                                className="rounded-xl mb-4 w-full aspect-square object-cover bg-white"
                                loading="lazy"
                            />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.title}</h3>
                            <p className="text-gray-600 mb-4 flex-1">{product.short_description}</p>
                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-lg font-bold text-orange-600">₹{product.price}</span>
                                <Link
                                    to={`/products/${product.id}`}
                                    className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors text-center"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductsPage; 