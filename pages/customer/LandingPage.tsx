import React from 'react';
import { Link } from 'react-router-dom';
import { DUMMY_MENU } from '../../constants';
import { Dish } from '../../types';

const DishCard: React.FC<{ dish: Dish }> = ({ dish }) => (
    <div className="bg-base-100 rounded-lg overflow-hidden border border-base-300 shadow-md hover:shadow-xl hover:border-base-300/80 transition-all duration-300 group">
        <div className="overflow-hidden">
            <img className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" src={dish.imageUrl} alt={dish.name} />
        </div>
        <div className="p-6 text-center">
            <h3 className="font-serif font-bold text-xl mb-2 text-neutral">{dish.name}</h3>
            <p className="text-neutral-800 text-sm mb-4">{dish.description.substring(0, 70)}...</p>
            <span className="font-bold text-primary text-lg">₹{dish.price.toFixed(0)}</span>
            <Link to={`/dish/${dish.id}`} className="mt-4 block w-full bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors">
                View Details
            </Link>
        </div>
    </div>
);

const LandingPage: React.FC = () => {
    const featuredDishes = DUMMY_MENU.slice(0, 3);

    return (
        <div>
            {/* Hero Section */}
            <section 
                 className="relative text-center min-h-[calc(100vh-96px)] flex items-center justify-center bg-cover bg-center"
                 style={{backgroundImage: "url('https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=1974&auto=format&fit=crop')"}}
            >
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative z-10 text-white animate-fade-in-up container mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="font-semibold text-secondary tracking-[0.2em] text-sm md:text-base">
                        123 MAIN STREET, UNI 21, NEW YORK CITY
                    </p>
                    <h1 className="my-4 text-5xl sm:text-6xl md:text-8xl font-serif font-bold tracking-tight">
                        Resta
                    </h1>
                    <p className="mt-4 max-w-3xl mx-auto text-base sm:text-lg text-gray-200">
                        Welcome to Resta! Discover a world of culinary delights and indulge in an unforgettable dining experience. Explore Our Menu and make a reservation today. Bon appétit!
                    </p>
                    <div className="mt-10">
                         <Link to="/menu" className="uppercase bg-primary text-white font-bold py-3 px-10 rounded-md hover:bg-opacity-90 transition-all tracking-widest text-sm">
                            Our Menu
                        </Link>
                    </div>
                </div>
            </section>
            
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                {/* Featured Dishes Section */}
                <section className="my-16 sm:my-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral">Featured Dishes</h2>
                        <p className="text-neutral-800 mt-2">Handpicked by our chef, loved by our guests.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredDishes.map(dish => <DishCard key={dish.id} dish={dish} />)}
                    </div>
                </section>
                
                {/* Our Story Section */}
                <section id="our-story" className="my-16 sm:my-24 py-12">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Left Column: Text Content */}
                        <div className="animate-fade-in-up">
                            <p className="font-semibold text-primary uppercase tracking-widest">How It Started</p>
                            <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-neutral leading-tight">
                                The Heart of Our Cuisine
                            </h2>
                            <p className="mt-6 text-neutral-800 leading-relaxed text-lg">
                                Founded in 2024, Resta began as a dream to merge timeless culinary traditions with a modern dining experience. We believe in creating unforgettable moments, where passion for quality ingredients and innovative recipes is at the heart of every dish we serve.
                            </p>
                        </div>
                        
                        {/* Right Column: Image & Stats */}
                        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                             <div className="relative p-4">
                                <img 
                                    src="https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1948&auto=format&fit=crop"
                                    alt="Chef preparing a meal in a professional kitchen" 
                                    className="rounded-xl shadow-2xl w-full h-auto object-cover relative z-10"
                                />
                                <div className="absolute top-0 right-0 w-full h-full rounded-xl bg-pink-100/50 transform -rotate-3 z-0"></div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 lg:gap-6 mt-8">
                                <div className="bg-base-100 p-4 rounded-xl shadow-lg border border-base-300 text-center">
                                    <p className="text-3xl lg:text-4xl font-bold text-primary">15+</p>
                                    <p className="text-sm text-neutral-800 mt-1">Years Experience</p>
                                </div>
                                <div className="bg-base-100 p-4 rounded-xl shadow-lg border border-base-300 text-center">
                                    <p className="text-3xl lg:text-4xl font-bold text-primary">50+</p>
                                    <p className="text-sm text-neutral-800 mt-1">Signature Dishes</p>
                                </div>
                                <div className="bg-base-100 p-4 rounded-xl shadow-lg border border-base-300 text-center">
                                    <p className="text-3xl lg:text-4xl font-bold text-primary">10K+</p>
                                    <p className="text-sm text-neutral-800 mt-1">Happy Guests</p>
                                </div>
                                <div className="bg-base-100 p-4 rounded-xl shadow-lg border border-base-300 text-center">
                                    <p className="text-3xl lg:text-4xl font-bold text-primary">25+</p>
                                    <p className="text-sm text-neutral-800 mt-1">Awards Won</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section id="testimonials" className="my-16 sm:my-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral">What Our Customers Say</h2>
                        <p className="text-neutral-800 mt-2">We are grateful for the kind words from our patrons.</p>
                    </div>
                    <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div className="bg-base-200 rounded-lg p-8 text-center">
                            <p className="text-neutral-800 italic mb-4">"An absolute gem! The food was exquisite, the atmosphere was enchanting, and the service was impeccable. A must-visit!"</p>
                            <div className="font-bold text-primary font-serif">- Amelia Johnson</div>
                        </div>
                        <div className="bg-base-200 rounded-lg p-8 text-center">
                             <p className="text-neutral-800 italic mb-4">"Resta exceeded all our expectations. Every dish was a masterpiece. We celebrated our anniversary here and it was perfect."</p>
                            <div className="font-bold text-primary font-serif">- Benjamin Carter</div>
                        </div>
                        <div className="bg-base-200 rounded-lg p-8 text-center">
                            <p className="text-neutral-800 italic mb-4">"From the appetizers to the desserts, everything was top-notch. The staff is friendly and attentive. Highly recommend the Grilled Salmon!"</p>
                            <div className="font-bold text-primary font-serif">- Sophia Rodriguez</div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default LandingPage;