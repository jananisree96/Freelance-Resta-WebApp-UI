import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { DUMMY_MENU } from '../../constants';
import { useCart } from '../../context/CartContext';

const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
);


const DishDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const dish = DUMMY_MENU.find(d => d.id === parseInt(id || ''));

    if (!dish) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold font-serif text-neutral">Dish not found</h2>
                <Link to="/menu" className="text-primary hover:underline mt-4 inline-block">Back to Menu</Link>
            </div>
        );
    }
    
    const handleAddToCart = () => {
        addToCart(dish, quantity);
        navigate('/cart');
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="bg-base-100 text-neutral rounded-lg shadow-xl p-4 md:p-12 border border-base-200">
                 <div className="mb-4">
                    <Link to="/menu" className="text-gray-500 hover:text-primary transition-colors">&larr; Back to Menu</Link>
                </div>
                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    <div>
                        <img src={dish.imageUrl} alt={dish.name} className="w-full h-auto object-cover rounded-lg shadow-lg" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="text-sm font-semibold text-primary uppercase tracking-wider">{dish.category}</p>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-neutral my-2">{dish.name}</h1>
                         <div className="flex items-center my-3">
                            <div className="flex items-center">
                                 {[...Array(5)].map((_, i) => (
                                    <StarIcon key={i} className={`w-5 h-5 ${i < Math.round(dish.rating) ? 'text-secondary' : 'text-gray-300'}`} />
                                ))}
                            </div>
                            <span className="text-gray-500 text-sm ml-2">{dish.rating.toFixed(1)} stars ({dish.reviews} reviews)</span>
                        </div>
                        <p className="text-gray-600 text-lg leading-relaxed my-4">{dish.description}</p>
                        <div className="text-4xl font-bold text-primary my-4">₹{dish.price.toFixed(0)}</div>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                             <div className="flex items-center border border-base-300 rounded-lg">
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 text-xl font-bold text-gray-700 hover:bg-base-200 rounded-l-lg">-</button>
                                <span className="px-6 py-2 text-lg font-bold w-16 text-center">{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-2 text-xl font-bold text-gray-700 hover:bg-base-200 rounded-r-lg">+</button>
                            </div>
                            <button onClick={handleAddToCart} className="w-full sm:w-auto flex-grow bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-105">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DishDetailPage;