import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { DUMMY_MENU } from '../../constants';
import { Dish } from '../../types';
import { useCart } from '../../context/CartContext';

const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
);

const DishCard: React.FC<{ dish: Dish }> = ({ dish }) => {
    const { addToCart } = useCart();
    return (
        <div className="bg-base-100 rounded-xl overflow-hidden border border-base-300 shadow-sm hover:shadow-xl hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1 flex flex-col group">
            <Link to={`/dish/${dish.id}`} className="block overflow-hidden">
                <img className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" src={dish.imageUrl} alt={dish.name} />
            </Link>
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <Link to={`/dish/${dish.id}`} className="block">
                        <h3 className="font-serif font-bold text-xl text-neutral group-hover:text-primary transition-colors">{dish.name}</h3>
                    </Link>
                    <span className="font-extrabold text-xl text-primary">₹{dish.price.toFixed(0)}</span>
                </div>
                <div className="flex items-center mb-3">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} className={`w-4 h-4 ${i < Math.round(dish.rating) ? 'text-secondary' : 'text-gray-300'}`} />
                        ))}
                    </div>
                    <span className="text-neutral-800 text-sm ml-2">({dish.reviews} reviews)</span>
                </div>
                <p className="text-neutral-800 text-base flex-grow mb-4">{dish.description}</p>
                 <button 
                    onClick={() => addToCart(dish, 1)}
                    className="mt-auto w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105">
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

const MenuPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const categories = ['All', ...Array.from(new Set(DUMMY_MENU.map(d => d.category)))];

    const filteredMenu = useMemo(() => {
        if (selectedCategory === 'All') return DUMMY_MENU;
        return DUMMY_MENU.filter(dish => dish.category === selectedCategory);
    }, [selectedCategory]);

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <div className='text-center mb-12'>
                <h1 className="text-4xl sm:text-5xl font-serif font-bold text-neutral">Our Menu</h1>
                <p className="text-lg text-neutral-800 mt-2 max-w-2xl mx-auto">
                    Explore our curated selection of dishes, crafted from the freshest ingredients.
                </p>
            </div>

            <div className="flex justify-center flex-wrap gap-3 md:gap-4 mb-12">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-5 py-2 text-sm md:text-base font-semibold rounded-full transition-colors duration-300 ${
                            selectedCategory === category
                                ? 'bg-primary text-white shadow-lg'
                                : 'bg-base-100 border border-base-300 text-neutral-800 hover:bg-base-200'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                {filteredMenu.map(dish => (
                    <DishCard key={dish.id} dish={dish} />
                ))}
            </div>
        </div>
    );
};

export default MenuPage;