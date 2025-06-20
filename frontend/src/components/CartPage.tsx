import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useCart } from './CartContext';

const CartPage: React.FC = () => {
    const { state, updateQuantity, removeItem, clearCart } = useCart();

    if (state.items.length === 0) {
        return (
            <div className="min-h-screen bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="mx-auto h-24 w-24 text-gray-400 mb-6">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                        <p className="text-gray-600 mb-8">Looks like you haven't added any string art kits to your cart yet.</p>
                        <Link
                            to="/products"
                            className="inline-flex items-center bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5 mr-2" />
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
                    <button
                        onClick={clearCart}
                        className="text-red-600 hover:text-red-700 font-medium text-sm"
                    >
                        Clear Cart
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="space-y-4">
                            {state.items.map((item) => (
                                <div key={item.id} className="bg-orange-50 rounded-xl p-6">
                                    {/* Mobile: Two-row layout, Desktop: Single row */}
                                    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                                        {/* Row 1: Image and Product Info + Controls */}
                                        <div className="flex items-start space-x-4">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-20 h-20 rounded-lg object-cover bg-white flex-shrink-0"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                                                        <p className="text-orange-600 font-bold">₹{item.price}</p>
                                                    </div>

                                                    {/* Controls aligned with title */}
                                                    <div className="flex items-center justify-between md:justify-end md:space-x-4">
                                                        <div className="flex items-center space-x-2">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className="p-1 rounded-full hover:bg-orange-200 transition-colors"
                                                                disabled={item.quantity <= 1}
                                                            >
                                                                <Minus className="h-4 w-4" />
                                                            </button>
                                                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="p-1 rounded-full hover:bg-orange-200 transition-colors"
                                                            >
                                                                <Plus className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                        <div className="flex items-center space-x-3">
                                                            <p className="text-lg font-bold text-gray-900">₹{item.price * item.quantity}</p>
                                                            <button
                                                                onClick={() => removeItem(item.id)}
                                                                className="text-red-600 hover:text-red-700"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-orange-50 rounded-xl p-6 sticky top-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Items ({state.totalItems})</span>
                                    <span className="font-medium">₹{state.totalPrice}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-medium text-green-600">Free</span>
                                </div>
                                <div className="border-t pt-3">
                                    <div className="flex justify-between">
                                        <span className="text-lg font-bold text-gray-900">Total</span>
                                        <span className="text-lg font-bold text-gray-900">₹{state.totalPrice}</span>
                                    </div>
                                </div>
                            </div>
                            <Link
                                to="/checkout"
                                className="block w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors mb-4 text-center"
                            >
                                Proceed to Checkout
                            </Link>
                            <Link
                                to="/products"
                                className="block w-full text-center text-orange-600 hover:text-orange-700 font-medium"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage; 