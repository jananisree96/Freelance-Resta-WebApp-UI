import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { CartItem } from '../../types';

const CartItemRow: React.FC<{ item: CartItem }> = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();
    
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center py-6 border-b border-base-300 gap-4">
            {/* Image & Details */}
            <div className="flex items-center gap-4 w-full sm:w-auto flex-grow">
                <img src={item.dish.imageUrl} alt={item.dish.name} className="w-24 h-24 object-cover rounded-md"/>
                <div>
                    <h3 className="font-bold font-serif text-lg text-neutral">{item.dish.name}</h3>
                    <p className="text-sm text-neutral-800">₹{item.dish.price.toFixed(0)}</p>
                    <button onClick={() => removeFromCart(item.dish.id)} className="text-xs text-primary hover:underline mt-1">Remove</button>
                </div>
            </div>
            {/* Controls & Price */}
            <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                 <div className="flex items-center border border-base-300 rounded">
                    <button onClick={() => updateQuantity(item.dish.id, item.quantity - 1)} className="px-3 py-1 text-sm font-bold text-neutral-800 hover:bg-base-200 rounded-l">-</button>
                    <span className="px-4 py-1 text-sm font-bold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.dish.id, item.quantity + 1)} className="px-3 py-1 text-sm font-bold text-neutral-800 hover:bg-base-200 rounded-r">+</button>
                </div>
                <p className="font-bold text-neutral w-20 text-right">₹{(item.dish.price * item.quantity).toFixed(0)}</p>
            </div>
        </div>
    );
}

const CartPage: React.FC = () => {
    const { cartItems, cartTotal, itemCount } = useCart();
    const navigate = useNavigate();

    if (itemCount === 0) {
        return (
            <div className="text-center py-20 container mx-auto px-4">
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral mb-4">Your Cart is Empty</h1>
                <p className="text-neutral-800 mb-6">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/menu" className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-transform hover:scale-105">
                    Start Ordering
                </Link>
            </div>
        );
    }
    
    const taxesAndFees = cartTotal * 0.1;
    const orderTotal = cartTotal + taxesAndFees;

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-serif font-bold text-neutral">Your Cart</h1>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-base-100 p-4 sm:p-6 rounded-lg shadow-md border border-base-300">
                    <h2 className="text-2xl font-serif font-bold mb-4 text-neutral">Order Items ({itemCount})</h2>
                    {cartItems.map(item => <CartItemRow key={item.dish.id} item={item} />)}
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-base-200 p-6 rounded-lg shadow-md sticky top-32 border border-base-300">
                        <h2 className="text-2xl font-serif font-bold mb-6 text-center text-neutral">Order Summary</h2>
                        <div className="space-y-4">
                             <div className="flex justify-between items-center text-lg">
                                <span className="text-neutral-800">Subtotal</span>
                                <span className="font-bold text-neutral">₹{cartTotal.toFixed(0)}</span>
                            </div>
                            <div className="flex justify-between items-center text-lg">
                                <span className="text-neutral-800">Taxes & Fees</span>
                                <span className="font-bold text-neutral">₹{taxesAndFees.toFixed(0)}</span>
                            </div>
                            <div className="border-t border-base-300 my-4"></div>
                            <div className="flex justify-between items-center text-2xl font-bold">
                                <span className="text-neutral">Total</span>
                                <span className="text-primary">₹{orderTotal.toFixed(0)}</span>
                            </div>
                        </div>
                        <button 
                            onClick={() => navigate('/checkout')}
                            className="mt-8 w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-105"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;