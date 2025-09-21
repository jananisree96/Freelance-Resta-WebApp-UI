import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import UserIcon from '../../components/icons/UserIcon';
import ShoppingCartIcon from '../../components/icons/ShoppingCartIcon';

const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const { cartTotal, itemCount } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [activeHash, setActiveHash] = useState('');
    const profileMenuRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    useEffect(() => {
        if (location.pathname !== '/') {
            setActiveHash('');
            return;
        }

        const sections = document.querySelectorAll('section[id], footer[id]');
        
        const observerOptions = {
            root: null, 
            // Trigger when a section is in the middle 50% of the viewport for better accuracy
            rootMargin: '-25% 0px -25% 0px',
            threshold: 0.1, // Start observing when 10% is visible
        };

        const observer = new IntersectionObserver((entries) => {
            // Of all the entries that are intersecting, find the one that is most visible.
            let bestEntry: IntersectionObserverEntry | null = null;
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
                        bestEntry = entry;
                    }
                }
            }

            if (bestEntry) {
                setActiveHash(bestEntry.target.id);
            }
        }, observerOptions);

        sections.forEach(section => observer.observe(section));

        const handleScroll = () => {
            // A simple check to ensure "Home" is active when scrolled to the top
            if (window.scrollY < 200) {
                setActiveHash('');
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            sections.forEach(section => observer.unobserve(section));
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location.pathname]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setIsProfileMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleAnchorLink = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
        e.preventDefault();
        setIsMenuOpen(false);

        const scrollToElement = () => {
            const element = document.querySelector(hash);
            if (element) {
                const headerOffset = 96; // h-24 in pixels, for the sticky header
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
      
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        };

        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(scrollToElement, 100);
        } else {
            scrollToElement();
        }
    };

    const navLinkClasses = "text-neutral-800 hover:text-primary transition-colors duration-300 uppercase tracking-widest text-sm";
    const activeNavLinkClasses = "text-primary font-semibold border-b-2 border-primary";
    
    const mobileNavLinkClasses = "block py-2 px-3 rounded-md text-base font-medium text-neutral-800 hover:bg-base-200 hover:text-primary";
    const activeMobileNavLinkClasses = "block py-2 px-3 rounded-md text-base font-medium bg-primary text-white";

    return (
        <header className="bg-base-100/90 backdrop-blur-sm text-neutral sticky top-0 z-50 border-b border-base-300">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-24">
                    {/* --- DESKTOP NAVIGATION --- */}
                    <div className="hidden md:flex items-center justify-between w-full">
                         {/* Left Links */}
                        <div className="flex flex-1 justify-start items-baseline space-x-6">
                           <NavLink to="/" className={({isActive}) => (isActive && !activeHash) ? activeNavLinkClasses : navLinkClasses}>HOME</NavLink>
                            <a href="#our-story" onClick={(e) => handleAnchorLink(e, '#our-story')} className={(location.pathname === '/' && activeHash === 'our-story') ? activeNavLinkClasses : navLinkClasses}>ABOUT</a>
                            <a href="#testimonials" onClick={(e) => handleAnchorLink(e, '#testimonials')} className={(location.pathname === '/' && activeHash === 'testimonials') ? activeNavLinkClasses : navLinkClasses}>TESTIMONIALS</a>
                            <a href="#contact-us" onClick={(e) => handleAnchorLink(e, '#contact-us')} className={(location.pathname === '/' && activeHash === 'contact-us') ? activeNavLinkClasses : navLinkClasses}>CONTACT</a>
                        </div>
                        
                        {/* Center Logo */}
                        <div className="flex-shrink-0 mx-6">
                             <NavLink to="/" className="text-center">
                                <span className="block text-4xl font-serif font-bold tracking-wider text-primary">Resta</span>
                            </NavLink>
                        </div>
                        
                        {/* Right Icons */}
                        <div className="flex flex-1 justify-end items-center">
                            <div className="flex items-center space-x-4">
                                 <div className="relative" ref={profileMenuRef}>
                                    <button onClick={() => setIsProfileMenuOpen(prev => !prev)} className="text-neutral-800 hover:text-primary transition-colors flex items-center space-x-2">
                                        <UserIcon className="w-5 h-5"/>
                                        <span className="text-sm font-medium">{user ? user.name.split(' ')[0] : 'Log In'}</span>
                                    </button>
                                     <div className={`absolute right-0 mt-2 w-48 bg-base-100 rounded-md shadow-lg py-1 z-20 ${isProfileMenuOpen ? 'block' : 'hidden'} border border-base-300`}>
                                        {user ? (
                                        <>
                                        <div className='px-4 py-2 border-b border-base-300'>
                                            <p className="text-sm text-neutral-800">Signed in as</p>
                                            <p className="text-sm font-medium text-neutral truncate">{user.name}</p>
                                        </div>
                                        <NavLink to="/profile" onClick={() => setIsProfileMenuOpen(false)} className="block w-full text-left px-4 py-2 text-sm text-neutral-800 hover:bg-base-200">My Profile</NavLink>
                                        <button onClick={() => { handleLogout(); setIsProfileMenuOpen(false); }} className="w-full text-left block px-4 py-2 text-sm text-neutral-800 hover:bg-base-200">Sign out</button>
                                        </>
                                        ) : (
                                            <Link to="/login" onClick={() => setIsProfileMenuOpen(false)} className="block px-4 py-2 text-sm text-neutral-800 hover:bg-base-200">Customer Login</Link>
                                        )}
                                    </div>
                                </div>
                                 <NavLink to="/cart" className="relative text-neutral-800 hover:text-primary transition-colors flex items-center space-x-1">
                                    <ShoppingCartIcon className="w-5 h-5"/>
                                    <span className="text-sm">₹{cartTotal.toFixed(0)}</span>
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    {/* --- MOBILE NAVIGATION --- */}
                    <div className="md:hidden flex items-center justify-between w-full">
                        {/* Logo */}
                        <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
                            <span className="block text-3xl font-serif font-bold tracking-wider text-primary">Resta</span>
                        </NavLink>
                        {/* Hamburger Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-neutral-800 hover:text-primary hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                            aria-controls="mobile-menu"
                            aria-expanded={isMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Panel */}
            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} border-t border-base-300`} id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <NavLink to="/" className={({isActive}) => (isActive && !activeHash) ? activeMobileNavLinkClasses : mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                    <a href="#our-story" onClick={(e) => handleAnchorLink(e, '#our-story')} className={(location.pathname === '/' && activeHash === 'our-story') ? activeMobileNavLinkClasses : mobileNavLinkClasses}>About</a>
                    <a href="#testimonials" onClick={(e) => handleAnchorLink(e, '#testimonials')} className={(location.pathname === '/' && activeHash === 'testimonials') ? activeMobileNavLinkClasses : mobileNavLinkClasses}>Testimonials</a>
                    <a href="#contact-us" onClick={(e) => handleAnchorLink(e, '#contact-us')} className={(location.pathname === '/' && activeHash === 'contact-us') ? activeMobileNavLinkClasses : mobileNavLinkClasses}>Contact</a>
                </div>
                <div className="pt-4 pb-3 border-t border-base-300">
                    <div className="px-2 space-y-1">
                        {user ? (
                            <>
                                <div className='px-3 mb-2'>
                                    <p className="text-sm text-neutral-800">Signed in as</p>
                                    <p className="text-base font-medium text-neutral truncate">{user.name}</p>
                                </div>
                                <NavLink to="/profile" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>My Profile</NavLink>
                                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className={`w-full text-left ${mobileNavLinkClasses}`}>Sign out</button>
                            </>
                        ) : (
                            <Link to="/login" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>Log in</Link>
                        )}
                        <NavLink to="/cart" className={`${mobileNavLinkClasses} flex justify-between items-center`} onClick={() => setIsMenuOpen(false)}>
                           <span>Cart</span>
                           <span className="bg-primary text-white text-xs font-bold mr-1 px-2 py-1 rounded-full">{itemCount}</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </header>
    );
};

const Footer: React.FC = () => (
    <footer id="contact-us" className="bg-base-200 mt-auto border-t border-base-300">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center text-neutral-800">
            <h2 className="text-3xl font-serif font-bold text-neutral mb-6">Contact Us</h2>
             <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
                <div>
                    <h3 className="font-bold text-lg text-neutral mb-2">Address</h3>
                    <p>Via Monte Napoleone 10</p>
                    <p>20121 Milan, Italy</p>
                </div>
                <div>
                    <h3 className="font-bold text-lg text-neutral mb-2">Opening Hours</h3>
                    <p>Mon - Fri: 11:00 - 23:30</p>
                    <p>Sat - Sun: 10:00 - 00:00</p>
                </div>
                <div>
                    <h3 className="font-bold text-lg text-neutral mb-2">Reservations</h3>
                    <p>+39 02 98765432</p>
                    <p>reservations@resta.com</p>
                </div>
            </div>
            <p className="mt-10 border-t border-base-300 pt-6">&copy; {new Date().getFullYear()} Resta. All rights reserved.</p>
        </div>
    </footer>
);


const CustomerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-base-100">
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default CustomerLayout;