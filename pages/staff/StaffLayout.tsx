import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import DashboardIcon from '../../components/icons/DashboardIcon';
import MenuIcon from '../../components/icons/MenuIcon';
import CreditCardIcon from '../../components/icons/CreditCardIcon';
import LogoutIcon from '../../components/icons/LogoutIcon';
import UserIcon from '../../components/icons/UserIcon';
import ClipboardListIcon from '../../components/icons/ClipboardListIcon';


interface NavItemProps {
    to: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, children, onClick }) => {
    const commonClasses = "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors";
    const activeClasses = "bg-primary text-white shadow-md";
    const inactiveClasses = "text-neutral-800 hover:bg-base-200 hover:text-neutral";

    return (
        <NavLink
            to={to}
            end={to === '/'} // Match route exactly only for dashboard
            onClick={onClick}
            className={({ isActive }) => `${commonClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
            <span className="mr-3">{icon}</span>
            <span>{children}</span>
        </NavLink>
    );
};

const Sidebar: React.FC<{ onLinkClick: () => void }> = ({ onLinkClick }) => (
    <div className="flex flex-col h-full bg-base-100 border-r border-base-300">
        <div className="flex items-center justify-center h-24 border-b border-base-300">
             <NavLink to="/" className="text-center">
                <span className="block text-4xl font-serif font-bold tracking-wider text-primary">Resta</span>
                <span className="block text-xs uppercase tracking-widest text-neutral-800">Staff Portal</span>
            </NavLink>
        </div>
        <nav className="flex-1 p-4 space-y-2">
            <NavItem to="/" icon={<DashboardIcon className="w-5 h-5" />} onClick={onLinkClick}>Dashboard</NavItem>
            <NavItem to="/new-order" icon={<MenuIcon className="w-5 h-5" />} onClick={onLinkClick}>New Order</NavItem>
            <NavItem to="/checkout" icon={<CreditCardIcon className="w-5 h-5" />} onClick={onLinkClick}>Checkout & Payment</NavItem>
            <NavItem to="/order-history" icon={<ClipboardListIcon className="w-5 h-5" />} onClick={onLinkClick}>Order History</NavItem>
        </nav>
    </div>
);


const Header: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef<HTMLDivElement>(null);
    
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setIsProfileMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="bg-base-100 h-24 flex items-center justify-between px-4 sm:px-8 border-b border-base-300">
            {/* Hamburger menu for mobile */}
            <button onClick={onMenuClick} className="lg:hidden text-neutral-800 hover:text-primary">
                 <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            <div className="flex-1"></div> {/* Spacer */}
            
            {/* User Dropdown */}
            <div className="relative" ref={profileMenuRef}>
                <button onClick={() => setIsProfileMenuOpen(prev => !prev)} className="flex items-center space-x-2 text-neutral-800">
                    <UserIcon className="w-8 h-8 p-1 bg-base-200 rounded-full" />
                    <span className="hidden sm:inline font-medium">{user?.name}</span>
                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className={`absolute right-0 mt-2 w-48 bg-base-100 rounded-md shadow-lg py-1 z-20 ${isProfileMenuOpen ? 'block' : 'hidden'} border border-base-300`}>
                    <button onClick={() => { handleLogout(); setIsProfileMenuOpen(false); }} className="w-full text-left flex items-center px-4 py-2 text-sm text-neutral-800 hover:bg-base-200">
                        <LogoutIcon className="w-5 h-5 mr-2" />
                        Sign Out
                    </button>
                </div>
            </div>
        </header>
    );
};

const StaffLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    
    return (
        <div className="flex h-screen bg-base-200 text-neutral">
            {/* Mobile Sidebar */}
            <div className={`fixed inset-0 z-50 transition-transform duration-300 ease-in-out lg:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="w-72">
                    <Sidebar onLinkClick={() => setSidebarOpen(false)} />
                </div>
                 <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)}></div>
            </div>

            {/* Desktop Sidebar */}
            <aside className="w-72 hidden lg:block flex-shrink-0">
                <Sidebar onLinkClick={() => {}}/>
            </aside>
            
            <div className="flex flex-col flex-1 w-full overflow-hidden">
                <Header onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
                    {children}
                </main>
                 <footer className="p-4 border-t border-base-300 bg-base-100 text-center text-sm text-neutral-800">
                    &copy; {new Date().getFullYear()} Resta Staff Portal. All rights reserved.
                </footer>
            </div>
        </div>
    );
};

export default StaffLayout;
