import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

interface CheckoutFormData {
    name: string;
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pinCode: string;
}

const CheckoutForm: React.FC = () => {
    const { state } = useCart();
    const [formData, setFormData] = useState<CheckoutFormData>({
        name: '',
        email: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pinCode: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const isFormValid = () => {
        return formData.name.trim() !== '' &&
            formData.email.trim() !== '' &&
            formData.phone.trim() !== '' &&
            formData.addressLine1.trim() !== '' &&
            formData.city.trim() !== '' &&
            formData.state.trim() !== '' &&
            formData.pinCode.trim() !== '';
    };

    const handleCheckout = async () => {
        if (!isFormValid()) return;

        setIsSubmitting(true);

        try {
            // TODO: Integrate with checkout API
            console.log('Checkout data:', {
                customer: formData,
                items: state.items,
                total: state.totalPrice
            });

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // TODO: Handle successful checkout (redirect to payment, show confirmation, etc.)
            alert('Checkout functionality will be integrated with payment gateway');

        } catch (error) {
            console.error('Checkout error:', error);
            alert('Checkout failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        to="/cart"
                        className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Cart
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-orange-50 rounded-xl p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Information</h2>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                            placeholder="Enter your full name"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        placeholder="Enter your phone number"
                                        required
                                    />
                                </div>

                                {/* Address Section */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Shipping Address</h3>

                                    <div>
                                        <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-2">
                                            Address Line 1 *
                                        </label>
                                        <input
                                            type="text"
                                            id="addressLine1"
                                            name="addressLine1"
                                            value={formData.addressLine1}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                            placeholder="Street address, apartment, suite, etc."
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700 mb-2">
                                            Address Line 2
                                        </label>
                                        <input
                                            type="text"
                                            id="addressLine2"
                                            name="addressLine2"
                                            value={formData.addressLine2}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                            placeholder="Additional address information (optional)"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                                                City *
                                            </label>
                                            <input
                                                type="text"
                                                id="city"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                                placeholder="City"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                                                State *
                                            </label>
                                            <input
                                                type="text"
                                                id="state"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                                placeholder="State"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700 mb-2">
                                                Pin Code *
                                            </label>
                                            <input
                                                type="text"
                                                id="pinCode"
                                                name="pinCode"
                                                value={formData.pinCode}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                                placeholder="Pin Code"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
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

                            {/* Checkout Button */}
                            <button
                                onClick={handleCheckout}
                                disabled={!isFormValid() || isSubmitting}
                                className={`w-full py-3 rounded-lg font-semibold transition-colors mb-4 ${isFormValid() && !isSubmitting
                                    ? 'bg-orange-600 text-white hover:bg-orange-700'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
                            </button>

                            <Link
                                to="/cart"
                                className="block w-full text-center text-orange-600 hover:text-orange-700 font-medium"
                            >
                                Back to Cart
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutForm; 