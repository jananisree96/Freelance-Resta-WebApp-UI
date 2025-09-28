import React, { useState, useMemo } from 'react';
import { DUMMY_ORDERS } from '../../constants';
import { Order, OrderStatus } from '../../types';
import Pagination from '../../components/Pagination';

const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
        case OrderStatus.DELIVERED:
            return 'bg-success/20 text-success';
        case OrderStatus.CANCELLED:
            return 'bg-error/20 text-error';
        case OrderStatus.PREPARING:
        case OrderStatus.OUTFORDELIVERY:
            return 'bg-warning/20 text-warning';
        case OrderStatus.PLACED:
            return 'bg-info/20 text-info';
        default:
            return 'bg-base-300 text-neutral-800';
    }
};

const OrderHistoryPage: React.FC = () => {
    const [orders] = useState<Order[]>(DUMMY_ORDERS);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const totalPages = Math.ceil(orders.length / itemsPerPage);
    const paginatedOrders = useMemo(() =>
        [...orders] // Create a mutable copy for sorting
        .sort((a, b) => b.orderDate.getTime() - a.orderDate.getTime()) // Sort by most recent
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
        [orders, currentPage, itemsPerPage]
    );
    
    const handleItemsPerPageChange = (value: number) => {
        setItemsPerPage(value);
        setCurrentPage(1);
    };

    return (
        <div>
            {/* Header */}
            <div className="border-b border-base-300 pb-4 mb-8">
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral">Order History</h1>
                <p className="text-neutral-800 mt-1">A log of all past orders handled by the staff.</p>
            </div>

            {/* Table Container */}
            <div className="bg-base-100 p-4 sm:p-6 rounded-lg shadow-md border border-base-300">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b-2 border-base-300 bg-base-200">
                            <tr>
                                <th className="p-4 text-sm font-semibold text-neutral uppercase tracking-wider">Order ID</th>
                                <th className="p-4 text-sm font-semibold text-neutral uppercase tracking-wider">Date</th>
                                <th className="p-4 text-sm font-semibold text-neutral uppercase tracking-wider">Total</th>
                                <th className="p-4 text-sm font-semibold text-neutral uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedOrders.length > 0 ? (
                                paginatedOrders.map(order => (
                                    <tr key={order.id} className="border-b border-base-300 hover:bg-base-200/50">
                                        <td className="p-4 text-neutral font-mono text-sm">{order.id}</td>
                                        <td className="p-4 text-neutral-800">{order.orderDate.toLocaleString()}</td>
                                        <td className="p-4 text-neutral font-semibold">₹{order.total.toFixed(0)}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 text-xs font-bold rounded-full ${getStatusBadge(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center text-neutral-800">No order history found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {orders.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        itemsPerPage={itemsPerPage}
                        onItemsPerPageChange={handleItemsPerPageChange}
                        totalItems={orders.length}
                    />
                )}
            </div>
        </div>
    );
};

export default OrderHistoryPage;
