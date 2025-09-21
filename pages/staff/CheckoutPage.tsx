import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { CartItem } from '../../types';

const CartItemRow: React.FC<{ item: CartItem }> = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();
    
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 border-b border-base-300 gap-4">
            <div className="flex items-center gap-4 flex-grow w-full">
                <img src={item.dish.imageUrl} alt={item.dish.name} className="w-16 h-16 object-cover rounded-md flex-shrink-0"/>
                <div>
                    <h3 className="font-bold font-serif text-md text-neutral">{item.dish.name}</h3>
                    <p className="text-sm text-neutral-800">₹{item.dish.price.toFixed(0)}</p>
                    <button onClick={() => removeFromCart(item.dish.id)} className="text-xs text-primary hover:underline mt-1">Remove</button>
                </div>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
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

const CheckoutPage: React.FC = () => {
    const { cartItems, cartTotal, itemCount, clearCart } = useCart();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('card');

    const handlePlaceOrder = () => {
        setIsProcessing(true);
        setTimeout(() => {
            // In a real app, this would submit the order to the backend
            console.log(`Order placed for ₹${orderTotal.toFixed(0)} via ${paymentMethod}`);
            clearCart();
            setIsProcessing(false);
            navigate('/'); // Navigate back to dashboard after order
        }, 1500);
    };

    if (itemCount === 0) {
        return (
            <div className="text-center py-20">
                <h1 className="text-3xl font-serif font-bold text-neutral mb-4">No Items in Order</h1>
                <p className="text-neutral-800 mb-6">The current order is empty. Add items from the menu.</p>
                <Link to="/new-order" className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-transform hover:scale-105">
                    Go to Menu
                </Link>
            </div>
        );
    }
    
    const taxesAndFees = cartTotal * 0.1;
    const orderTotal = cartTotal + taxesAndFees;

    return (
        <div>
            <div className="border-b border-base-300 pb-4 mb-8">
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral">Checkout & Payment</h1>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-base-100 p-6 rounded-lg shadow-md border border-base-300">
                    <h2 className="text-2xl font-serif font-bold mb-4 text-neutral">Order Details ({itemCount})</h2>
                    {cartItems.map(item => <CartItemRow key={item.dish.id} item={item} />)}
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-base-200 p-6 rounded-lg shadow-md sticky top-8 border border-base-300">
                        <h2 className="text-2xl font-serif font-bold mb-6 text-center text-neutral">Summary</h2>
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
                        
                        <div className="border-t border-base-300 mt-6 pt-6">
                            <h3 className="text-xl font-serif font-bold text-neutral mb-4">Payment Method</h3>
                            <div className="flex gap-4">
                                <button 
                                    onClick={() => setPaymentMethod('cash')}
                                    className={`flex-1 p-3 rounded-lg border-2 font-semibold transition ${paymentMethod === 'cash' ? 'border-primary bg-primary/10' : 'border-base-300 bg-base-100'}`}
                                >
                                    Cash
                                </button>
                                 <button 
                                    onClick={() => setPaymentMethod('card')}
                                    className={`flex-1 p-3 rounded-lg border-2 font-semibold transition ${paymentMethod === 'card' ? 'border-primary bg-primary/10' : 'border-base-300 bg-base-100'}`}
                                >
                                    Card
                                </button>
                            </div>
                        </div>

                        <button 
                            onClick={handlePlaceOrder}
                            disabled={isProcessing}
                            className="mt-8 w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-wait"
                        >
                            {isProcessing ? 'Processing...' : `Place Order (₹${orderTotal.toFixed(0)})`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;