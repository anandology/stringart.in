import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { ArrowLeft, ExternalLink, CheckCircle, User, MapPin, Package } from 'lucide-react';

interface PaymentConfirmationData {
    orderNumber: string;
    paymentLink: string;
    totalAmount: number;
    customer: {
        name: string;
        email: string;
        phone: string;
        addressLine1: string;
        addressLine2?: string;
        city: string;
        state: string;
        pinCode: string;
    };
    items: Array<{
        id: string;
        title: string;
        price: number;
        image: string;
        quantity: number;
    }>;
}

const PaymentConfirmationPage: React.FC = () => {
    const location = useLocation();
    const data = location.state as PaymentConfirmationData;

    if (!data) {
        return (
            <div className="min-h-screen bg-white py-16">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Payment Page</h1>
                    <p className="text-gray-600 mb-8">This page requires order information.</p>
                    <Link
                        to="/cart"
                        className="inline-flex items-center text-orange-600 hover:text-orange-700"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Cart
                    </Link>
                </div>
            </div>
        );
    }

    const handlePaymentClick = () => {
        window.open(data.paymentLink, '_blank');
    };

    const subtotal = data.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="min-h-screen bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
                    <p className="text-gray-600">Please complete your payment to proceed</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Order Details - Left side */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Order Summary */}
                        <div className="bg-orange-50 rounded-xl p-6">
                            <div className="flex items-center mb-4">
                                <Package className="h-5 w-5 text-orange-600 mr-2" />
                                <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Order Number:</span>
                                    <span className="font-medium">{data.orderNumber}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total Amount:</span>
                                    <span className="font-bold text-lg">₹{data.totalAmount}</span>
                                </div>
                            </div>
                        </div>

                        {/* Customer Information */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                            <div className="flex items-center mb-4">
                                <User className="h-5 w-5 text-gray-600 mr-2" />
                                <h3 className="text-lg font-semibold text-gray-900">Customer Information</h3>
                            </div>
                            <div className="space-y-2">
                                <p className="text-gray-900"><span className="font-medium">Name:</span> {data.customer.name}</p>
                                <p className="text-gray-900"><span className="font-medium">Email:</span> {data.customer.email}</p>
                                <p className="text-gray-900"><span className="font-medium">Phone:</span> {data.customer.phone}</p>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                            <div className="flex items-center mb-4">
                                <MapPin className="h-5 w-5 text-gray-600 mr-2" />
                                <h3 className="text-lg font-semibold text-gray-900">Shipping Address</h3>
                            </div>
                            <div className="space-y-1">
                                <p className="text-gray-900">{data.customer.addressLine1}</p>
                                {data.customer.addressLine2 && (
                                    <p className="text-gray-900">{data.customer.addressLine2}</p>
                                )}
                                <p className="text-gray-900">{data.customer.city}, {data.customer.state} {data.customer.pinCode}</p>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
                            <div className="space-y-4">
                                {data.items.map((item) => (
                                    <div key={item.id} className="flex items-center space-x-4">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900">{item.title}</h4>
                                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium text-gray-900">₹{item.price * item.quantity}</p>
                                            <p className="text-sm text-gray-600">₹{item.price} each</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Totals */}
                            <div className="border-t pt-4 mt-4 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal:</span>
                                    <span className="font-medium">₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping:</span>
                                    <span className="font-medium text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between border-t pt-2">
                                    <span className="text-lg font-bold text-gray-900">Total:</span>
                                    <span className="text-lg font-bold text-gray-900">₹{data.totalAmount}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Section - Right side */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* QR Code */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Scan QR Code to Pay</h3>
                            <div className="flex justify-center mb-4">
                                <div className="bg-white p-4 rounded-lg border">
                                    <QRCodeSVG
                                        value={data.paymentLink}
                                        size={200}
                                        level="M"
                                        includeMargin={true}
                                    />
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">
                                Use any UPI app to scan this QR code
                            </p>
                        </div>

                        {/* Payment Link */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Or Click to Pay</h3>
                            <button
                                onClick={handlePaymentClick}
                                className="inline-flex items-center bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
                            >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Pay via UPI
                            </button>
                            <p className="text-sm text-gray-600 mt-2">
                                Opens your default UPI app
                            </p>
                        </div>

                        {/* Instructions */}
                        <div className="bg-blue-50 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Next Steps</h3>
                            <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm">
                                <li>Complete the payment using the QR code or payment link above</li>
                                <li>You will receive an email confirmation with order details</li>
                                <li>Reply to the email to confirm your payment</li>
                                <li>We'll process your order once payment is confirmed</li>
                            </ol>
                        </div>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-8">
                    <Link
                        to="/"
                        className="inline-flex items-center text-orange-600 hover:text-orange-700"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentConfirmationPage; 