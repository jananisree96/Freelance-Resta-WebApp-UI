
import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import { User, Role } from '../types';
import { DUMMY_USERS } from '../constants';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, pass: string) => Promise<User | null>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate checking for a logged-in user in session storage
        try {
            const storedUser = sessionStorage.getItem('authUser');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Failed to parse user from session storage", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const login = useCallback(async (email: string, pass: string): Promise<User | null> => {
        setLoading(true);
        // This is a mock login. In a real app, you'd call an API.
        // We are ignoring the password for this dummy implementation.
        return new Promise(resolve => {
            setTimeout(() => {
                const foundUser = DUMMY_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
                if (foundUser) {
                    setUser(foundUser);
                    sessionStorage.setItem('authUser', JSON.stringify(foundUser));
                    resolve(foundUser);
                } else {
                    resolve(null);
                }
                setLoading(false);
            }, 1000);
        });
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        sessionStorage.removeItem('authUser');
    }, []);

    const value = { user, loading, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
