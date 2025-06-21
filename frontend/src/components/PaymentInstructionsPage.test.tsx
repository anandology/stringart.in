import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PaymentInstructionsPage from './PaymentInstructionsPage';

// Mock the environment variable
const originalEnv = import.meta.env;
beforeEach(() => {
    import.meta.env = { ...originalEnv, VITE_UPI_ID: 'test@upi' };
});

afterEach(() => {
    import.meta.env = originalEnv;
});

const renderWithRouter = (component: React.ReactElement) => {
    return render(
        <BrowserRouter>
            {component}
        </BrowserRouter>
    );
};

describe('PaymentInstructionsPage', () => {
    it('renders payment instructions page', () => {
        renderWithRouter(<PaymentInstructionsPage />);

        expect(screen.getByText('Payment Instructions')).toBeInTheDocument();
        expect(screen.getByText('Complete your payment using the options below')).toBeInTheDocument();
    });

    it('displays UPI ID from environment variable', () => {
        renderWithRouter(<PaymentInstructionsPage />);

        expect(screen.getByText('test@upi')).toBeInTheDocument();
    });
}); 