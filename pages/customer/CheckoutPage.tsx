import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const InputField: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
    <input 
        {...props}
        className="w-full bg-base-200 border border-base-300 rounded-lg p-3 text-neutral focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
    />
);

const CheckoutPage: React.FC = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        // Simulate API call
        setTimeout(() => {
            const orderId = Math.random().toString(36).substr(2, 9);
            console.log("Order placed:", { orderId, items: cartItems, total: cartTotal });
            clearCart();
            setIsProcessing(false);
            navigate(`/track-order/${orderId}`);
        }, 2000);
    };

    if (cartItems.length === 0 && !isProcessing) {
        navigate('/menu');
        return null;
    }
    
    const taxesAndFees = cartTotal * 0.1;
    const totalWithTax = cartTotal + taxesAndFees;

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-serif font-bold text-neutral">Checkout</h1>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit} className="bg-base-100 rounded-lg shadow-md border border-base-300 p-6 sm:p-8 space-y-8">
                        <div>
                            <h2 className="text-2xl font-serif font-bold text-neutral mb-6">Delivery Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField type="text" placeholder="First Name" required />
                                <InputField type="text" placeholder="Last Name" required />
                                <div className="md:col-span-2">
                                    <InputField type="text" placeholder="Address" required />
                                </div>
                                <InputField type="text" placeholder="City" required />
                                <InputField type="text" placeholder="Postal Code" required />
                                <div className="md:col-span-2">
                                    <InputField type="tel" placeholder="Phone Number" required />
                                </div>
                            </div>
                        </div>
                         <div>
                            <h2 className="text-2xl font-serif font-bold text-neutral mb-6">Payment Details</h2>
                            <div className="space-y-4">
                               <InputField type="text" placeholder="Card Number" required />
                               <div className="grid grid-cols-2 gap-4">
                                <InputField type="text" placeholder="MM/YY" required />
                                <InputField type="text" placeholder="CVC" required />
                               </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-base-200 rounded-lg shadow-md p-6 sticky top-32 border border-base-300">
                        <h2 className="text-xl font-serif font-bold text-neutral mb-4">Order Summary</h2>
                        <div className="space-y-2 mb-4 max-h-60 overflow-y-auto pr-2">
                             {cartItems.map(item => (
                                <div key={item.dish.id} className="flex justify-between text-sm">
                                    <span className="text-neutral-800 truncate pr-2">{item.quantity} x {item.dish.name}</span>
                                    <span className="text-neutral font-medium">₹{(item.quantity * item.dish.price).toFixed(0)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-base-300 pt-4 space-y-2">
                            <div className="flex justify-between"><span className="text-neutral-800">Subtotal</span><span className='font-medium text-neutral'>₹{cartTotal.toFixed(0)}</span></div>
                            <div className="flex justify-between"><span className="text-neutral-800">Taxes & Fees</span><span className='font-medium text-neutral'>₹{taxesAndFees.toFixed(0)}</span></div>
                            <div className="flex justify-between font-bold text-lg text-neutral mt-2"><span >Total</span><span className="text-primary">₹{totalWithTax.toFixed(0)}</span></div>
                        </div>
                        <button 
                            onClick={handleSubmit}
                            disabled={isProcessing}
                            className="mt-6 w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition disabled:bg-gray-400 disabled:cursor-wait"
                        >
                            {isProcessing ? 'Processing...' : `Place Order - ₹${totalWithTax.toFixed(0)}`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;