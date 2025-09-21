
import React, { createContext, useState, useContext, ReactNode, useMemo, useEffect } from 'react';
import { CartItem, Dish } from '../types';

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (dish: Dish, quantity: number) => void;
    removeFromCart: (dishId: number) => void;
    updateQuantity: (dishId: number, quantity: number) => void;
    clearCart: () => void;
    itemCount: number;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        try {
            const storedCart = localStorage.getItem('cartItems');
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            console.error("Failed to parse cart from local storage", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (dish: Dish, quantity: number) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.dish.id === dish.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.dish.id === dish.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevItems, { dish, quantity }];
        });
    };

    const removeFromCart = (dishId: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.dish.id !== dishId));
    };

    const updateQuantity = (dishId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(dishId);
        } else {
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.dish.id === dishId ? { ...item, quantity } : item
                )
            );
        }
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const itemCount = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }, [cartItems]);

    const cartTotal = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.dish.price * item.quantity, 0);
    }, [cartItems]);

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        cartTotal,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
