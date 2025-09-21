import React, { useEffect, useRef } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            // Check if the click is on the backdrop itself, not on the modal content
            if (modalRef.current && event.target === modalRef.current.parentElement) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300 animate-fade-in-up">
            <div ref={modalRef} className="bg-base-100 rounded-lg shadow-xl w-full max-w-md p-6 transform transition-all">
                <div className="flex justify-between items-center border-b border-base-300 pb-3 mb-4">
                    <h2 className="text-xl font-bold font-serif text-neutral">{title}</h2>
                    <button onClick={onClose} className="text-3xl font-light text-neutral-800 hover:text-primary">&times;</button>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
