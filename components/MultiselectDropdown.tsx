
import React, { useState, useRef, useEffect } from 'react';
import ChevronDownIcon from './icons/ChevronDownIcon';

interface MultiselectDropdownProps {
    options: string[];
    selectedOptions: string[];
    onChange: (selected: string[]) => void;
    placeholder?: string;
}

const MultiselectDropdown: React.FC<MultiselectDropdownProps> = ({ options, selectedOptions, onChange, placeholder = "Select options" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleToggle = (option: string) => {
        const newSelected = selectedOptions.includes(option)
            ? selectedOptions.filter(o => o !== option)
            : [...selectedOptions, option];
        onChange(newSelected);
    };

    const displayValue = selectedOptions.length > 0 ? `${selectedOptions.length} of ${options.length} selected` : placeholder;

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-base-200 border border-base-300 rounded-lg p-2 text-left text-neutral flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-primary"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className="text-sm">{displayValue}</span>
                <ChevronDownIcon className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-base-100 border border-base-300 rounded-lg shadow-lg max-h-60 overflow-y-auto" role="listbox">
                    {options.map(option => (
                        <label key={option} className="flex items-center p-2 hover:bg-base-200 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedOptions.includes(option)}
                                onChange={() => handleToggle(option)}
                                className="h-4 w-4 rounded text-primary focus:ring-primary border-base-300"
                            />
                            <span className="ml-2 text-sm text-neutral-800">{option}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiselectDropdown;