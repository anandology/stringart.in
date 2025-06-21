import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';
import { useCart } from './CartContext';
import productsData from '../data/app.json';

const ProductsPage = () => {
    const { products } = productsData;
    const { addItem, updateQuantity, state } = useCart();

    const handleAddToCart = (product: any) => {
        addItem({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.images[0],
        });
    };

    const handleUpdateQuantity = (productId: string, newQuantity: number) => {
        if (newQuantity === 0) {
            updateQuantity(productId, 0);
        } else {
            updateQuantity(productId, newQuantity);
        }
    };

    return (
        <section className="py-16 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Our String Art Kits</h2>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => {
                        const cartItem = state.items.find(item => item.id === product.id);
                        const currentQuantity = cartItem?.quantity || 0;

                        return (
                            <div
                                key={product.id}
                                className="bg-orange-50 rounded-2xl shadow-md hover:shadow-lg hover:bg-orange-100 transition-all duration-200 p-6 flex flex-col group"
                            >
                                <Link to={`/products/${product.id}`} className="flex-1">
                                    <img
                                        src={product.images[0]}
                                        alt={product.title}
                                        className="rounded-xl mb-4 w-full aspect-square object-cover bg-white"
                                        loading="lazy"
                                    />
                                    <h3 className="text-xl font-semibold text-orange-600 mb-2">{product.title}</h3>
                                    <p className="text-gray-600 mb-4 flex-1">{product.short_description}</p>
                                </Link>
                                <div className="mb-4">
                                    <Link
                                        to={`/get-started/${product.id}`}
                                        className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        📹 Watch tutorial
                                    </Link>
                                </div>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-lg font-bold text-orange-600">₹{product.price}</span>
                                    {currentQuantity === 0 ? (
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleAddToCart(product);
                                            }}
                                            className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                                        >
                                            Add to Cart
                                        </button>
                                    ) : (
                                        <div className="flex items-center bg-white rounded-lg border border-orange-200 shadow-sm">
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleUpdateQuantity(product.id, currentQuantity - 1);
                                                }}
                                                className="p-1 hover:bg-orange-50 transition-colors rounded-l-lg"
                                            >
                                                <Minus className="h-4 w-4" />
                                            </button>
                                            <span className="px-3 py-1 font-medium text-gray-900 min-w-[2rem] text-center">
                                                {currentQuantity}
                                            </span>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleUpdateQuantity(product.id, currentQuantity + 1);
                                                }}
                                                className="p-1 hover:bg-orange-50 transition-colors rounded-r-lg"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProductsPage; 