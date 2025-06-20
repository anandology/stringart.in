import React, { createContext, useContext, useReducer, useEffect } from 'react';

interface CartItem {
    id: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
}

type CartAction =
    | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
    | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
    | { type: 'REMOVE_ITEM'; payload: { id: string } }
    | { type: 'CLEAR_CART' }
    | { type: 'LOAD_CART'; payload: CartState };

const CartContext = createContext<{
    state: CartState;
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    updateQuantity: (id: string, quantity: number) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            let newItems;

            if (existingItem) {
                newItems = state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                newItems = [...state.items, { ...action.payload, quantity: 1 }];
            }

            const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            return { items: newItems, totalItems, totalPrice };
        }

        case 'UPDATE_QUANTITY': {
            const newItems = state.items.map(item =>
                item.id === action.payload.id
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            ).filter(item => item.quantity > 0);

            const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            return { items: newItems, totalItems, totalPrice };
        }

        case 'REMOVE_ITEM': {
            const newItems = state.items.filter(item => item.id !== action.payload.id);
            const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            return { items: newItems, totalItems, totalPrice };
        }

        case 'CLEAR_CART':
            return { items: [], totalItems: 0, totalPrice: 0 };

        case 'LOAD_CART':
            return action.payload;

        default:
            return state;
    }
};

const initialState: CartState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                dispatch({ type: 'LOAD_CART', payload: parsedCart });
            } catch (error) {
                console.error('Error loading cart from localStorage:', error);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state));
    }, [state]);

    const addItem = (item: Omit<CartItem, 'quantity'>) => {
        dispatch({ type: 'ADD_ITEM', payload: item });
    };

    const updateQuantity = (id: string, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    };

    const removeItem = (id: string) => {
        dispatch({ type: 'REMOVE_ITEM', payload: { id } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    return (
        <CartContext.Provider value={{ state, addItem, updateQuantity, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}; 