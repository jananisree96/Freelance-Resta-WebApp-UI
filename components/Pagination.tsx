import React from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    itemsPerPage: number;
    onItemsPerPageChange: (value: number) => void;
    totalItems: number;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    itemsPerPage,
    onItemsPerPageChange,
    totalItems,
}) => {
    const startItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 pt-4 border-t border-base-300">
            {/* Rows per page dropdown */}
            <div className="flex items-center space-x-2 text-sm text-neutral-800 mb-4 sm:mb-0">
                <span>Rows per page:</span>
                <select
                    value={itemsPerPage}
                    onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                    className="bg-base-200 border border-base-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Rows per page"
                >
                    {[5, 10, 15, 20].map(size => (
                        <option key={size} value={size}>{size}</option>
                    ))}
                </select>
            </div>

            {/* Page info and navigation */}
            <div className="flex items-center space-x-4">
                <span className="text-sm text-neutral-800">
                    {startItem}-{endItem} of {totalItems}
                </span>
                <div className="flex items-center space-x-1">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-md hover:bg-base-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Go to previous page"
                    >
                        <ChevronLeftIcon />
                    </button>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="p-2 rounded-md hover:bg-base-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Go to next page"
                    >
                        <ChevronRightIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
