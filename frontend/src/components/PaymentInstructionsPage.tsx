import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { ArrowLeft, ExternalLink, CreditCard, Copy, Check } from 'lucide-react';

interface PaymentData {
    amount: number;
    comment: string;
    upiId: string;
    payeeName: string;
}

const PaymentInstructionsPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const amount = parseFloat(searchParams.get('amount') || '0');
        const comment = searchParams.get('comment') || 'Payment';
        const upiId = import.meta.env.VITE_UPI_ID || 'stringart@upi';
        const payeeName = import.meta.env.VITE_PAYEE_NAME || 'StringArt';

        setPaymentData({
            amount,
            comment,
            upiId,
            payeeName
        });
    }, [searchParams]);

    const createUpiLink = (upiId: string, amount: number, comment: string, payeeName: string) => {
        return `upi://pay?pa=${upiId}&pn=${payeeName}&am=${amount}&tn=${comment}`;
    };

    const handleCopyUpiId = async () => {
        if (paymentData) {
            try {
                await navigator.clipboard.writeText(paymentData.upiId);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy UPI ID:', err);
            }
        }
    };

    const handlePaymentClick = () => {
        if (paymentData) {
            const upiLink = createUpiLink(paymentData.upiId, paymentData.amount, paymentData.comment, paymentData.payeeName);
            window.open(upiLink, '_blank');
        }
    };

    if (!paymentData) {
        return (
            <div className="min-h-screen bg-white py-16">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Instructions</h1>
                    <p className="text-gray-600">Loading payment details...</p>
                </div>
            </div>
        );
    }

    const upiLink = createUpiLink(paymentData.upiId, paymentData.amount, paymentData.comment, paymentData.payeeName);

    return (
        <div className="min-h-screen bg-white py-16">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <CreditCard className="h-16 w-16 text-orange-500 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Instructions</h1>
                    <p className="text-gray-600">Complete your payment using the options below</p>
                </div>

                {/* Payment Details */}
                <div className="bg-orange-50 rounded-xl p-6 mb-8">
                    <div className="text-center">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Summary</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Amount:</span>
                                <span className="font-bold text-lg">₹{paymentData.amount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Reference:</span>
                                <span className="font-medium">{paymentData.comment}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* QR Code Section */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Scan QR Code</h3>
                        <div className="flex justify-center mb-4">
                            <div className="bg-white p-4 rounded-lg border">
                                <QRCodeSVG
                                    value={upiLink}
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

                    {/* UPI ID Section */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">UPI ID</h3>
                        <div className="mb-4">
                            <p className="font-mono text-lg font-bold text-gray-900 break-all py-8">
                                {paymentData.upiId}
                            </p>
                        </div>
                        <div className="space-y-3">
                            <button
                                onClick={handleCopyUpiId}
                                className="w-full inline-flex items-center justify-center bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                {copied ? (
                                    <>
                                        <Check className="h-4 w-4 mr-2" />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="h-4 w-4 mr-2" />
                                        Copy UPI ID
                                    </>
                                )}
                            </button>
                            <button
                                onClick={handlePaymentClick}
                                className="w-full inline-flex items-center justify-center bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                            >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Pay via UPI
                            </button>
                        </div>
                    </div>
                </div>

                {/* Instructions */}
                <div className="bg-blue-50 rounded-xl p-6 mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">How to Pay</h3>
                    <ol className="list-decimal list-inside space-y-2 text-gray-700">
                        <li>Open any UPI app (Google Pay, PhonePe, Paytm, etc.)</li>
                        <li>Scan the QR code or use the UPI ID: <strong>{paymentData.upiId}</strong></li>
                        <li>Enter the amount: <strong>₹{paymentData.amount.toFixed(2)}</strong></li>
                        <li>Add a note: <strong>{paymentData.comment}</strong></li>
                        <li>Complete the payment</li>
                        <li>Reply to the order confirmation email to confirm your payment</li>
                    </ol>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-8">
                    <a
                        href="/"
                        className="inline-flex items-center text-orange-600 hover:text-orange-700"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PaymentInstructionsPage;

