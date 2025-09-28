
import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';

type NotificationType = 'success' | 'error' | 'info';

interface NotificationState {
    message: string;
    type: NotificationType;
    id: number;
}

interface NotificationContextType {
    showNotification: (message: string, type?: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const Notification: React.FC<{ notification: NotificationState, onDismiss: (id: number) => void }> = ({ notification, onDismiss }) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => onDismiss(notification.id), 300); // Wait for animation
        }, 3000);

        return () => clearTimeout(timer);
    }, [notification.id, onDismiss]);

    const handleDismiss = () => {
        setIsExiting(true);
        setTimeout(() => onDismiss(notification.id), 300);
    };

    const baseClasses = "flex items-center w-full max-w-xs p-4 my-2 text-gray-500 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out";
    const animationClasses = isExiting ? 'opacity-0 transform -translate-y-2' : 'opacity-100 transform translate-y-0';

    const typeClasses = {
        success: 'text-success bg-success/20',
        error: 'text-error bg-error/20',
        info: 'text-info bg-info/20',
    };
    
    const Icon: React.FC<{type: NotificationType}> = ({ type }) => {
        const iconWrapperClasses = `inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ${typeClasses[type]}`;
        
        if (type === 'success') {
            return (
                <div className={iconWrapperClasses}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                </div>
            )
        }
        // Can add more icons here for other types
        return null;
    }

    return (
        <div className={`${baseClasses} ${animationClasses}`} role="alert">
            <Icon type={notification.type} />
            <div className="ml-3 text-sm font-normal text-neutral-800">{notification.message}</div>
            <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-neutral-800 hover:text-neutral rounded-lg focus:ring-2 focus:ring-base-300 p-1.5 hover:bg-base-200 inline-flex h-8 w-8" onClick={handleDismiss} aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
        </div>
    );
};


export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<NotificationState[]>([]);

    const showNotification = useCallback((message: string, type: NotificationType = 'success') => {
        const id = Date.now() + Math.random(); // More unique ID
        setNotifications(prev => [...prev, { id, message, type }]);
    }, []);

    const dismissNotification = useCallback((id: number) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, []);

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <div aria-live="assertive" className="fixed inset-0 flex items-start justify-end p-4 sm:p-6 pointer-events-none z-[100]">
                <div className="w-full max-w-sm">
                    {notifications.map(notification => (
                        <Notification key={notification.id} notification={notification} onDismiss={dismissNotification} />
                    ))}
                </div>
            </div>
        </NotificationContext.Provider>
    );
};

export const useNotification = (): NotificationContextType => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
