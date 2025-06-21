interface CheckoutRequest {
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
    totalPrice: number;
}

interface CheckoutResponse {
    success: boolean;
    orderNumber: string;
    qrCodeUrl?: string;
    paymentLink?: string;
    error?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const checkoutApi = async (data: CheckoutRequest): Promise<CheckoutResponse> => {
    try {
        // Dummy implementation - simulate API call
        console.log('Checkout API called with:', data);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simulate successful response
        const orderNumber = `ORD${Date.now()}`;
        const upiId = 'stringart@upi'; // Replace with actual UPI ID
        const paymentLink = `upi://pay?pa=${upiId}&pn=StringArt&am=${data.totalPrice}&tn=${orderNumber}`;

        return {
            success: true,
            orderNumber,
            paymentLink,
            qrCodeUrl: paymentLink // QR code will be generated from this URL
        };

        // Uncomment below for actual API call
        /*
        const response = await fetch(`${API_BASE_URL}/checkout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
        */

    } catch (error) {
        console.error('Checkout API error:', error);
        return {
            success: false,
            orderNumber: '',
            error: 'Unable to complete. Please try again after sometime.'
        };
    }
}; 