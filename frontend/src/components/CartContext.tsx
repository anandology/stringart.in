import React, { createContext, useReducer, useEffect } from 'react';

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
    | { type: 'CLEAR_CART' };

const CartContext = createContext<{
    state: CartState;
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    updateQuantity: (id: string, quantity: number) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
} | null>(null);

export { CartContext };

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

        default:
            return state;
    }
};

const initialState: CartState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
};

// Function to get initial state from localStorage
const getInitialState = (): CartState => {
    try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            const parsedCart = JSON.parse(savedCart);
            console.log('Loading initial cart from localStorage:', parsedCart);
            return parsedCart;
        }
    } catch (error) {
        console.error('Error loading initial cart from localStorage:', error);
    }
    return initialState;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, getInitialState());

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        console.log('Saving cart to localStorage:', state);
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