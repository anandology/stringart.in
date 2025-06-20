import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from './CartContext';

const CartIcon: React.FC = () => {
    const { state } = useCart();

    return (
        <Link to="/cart" className="flex items-center text-gray-700 hover:text-orange-600 relative">
            <ShoppingCart className="h-6 w-6" />
            <span className="ml-1 font-medium hidden sm:block">Cart</span>
            {state.totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {state.totalItems > 99 ? '99+' : state.totalItems}
                </span>
            )}
        </Link>
    );
};

export default CartIcon; 