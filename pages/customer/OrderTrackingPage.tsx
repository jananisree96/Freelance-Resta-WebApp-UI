import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { OrderStatus } from '../../types';

const statusSteps = [
    OrderStatus.PLACED,
    OrderStatus.PREPARING,
    OrderStatus.OUTFORDELIVERY,
    OrderStatus.DELIVERED,
];

const OrderTrackingPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [currentStatus, setCurrentStatus] = useState<OrderStatus>(OrderStatus.PLACED);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStatus(prevStatus => {
                const currentIndex = statusSteps.indexOf(prevStatus);
                if (currentIndex < statusSteps.length - 1) {
                    return statusSteps[currentIndex + 1];
                }
                clearInterval(interval);
                return prevStatus;
            });
        }, 5000); // Advance status every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const getStatusInfo = (status: OrderStatus) => {
        switch (status) {
            case OrderStatus.PLACED: return { message: 'We have received your order.', icon: '📝' };
            case OrderStatus.PREPARING: return { message: 'Your meal is being prepared by our chefs.', icon: '🍳' };
            case OrderStatus.OUTFORDELIVERY: return { message: 'Your order is on its way!', icon: '🛵' };
            case OrderStatus.DELIVERED: return { message: 'Enjoy your meal!', icon: '🎉' };
            default: return { message: '', icon: '' };
        }
    };
    
    const currentStepIndex = statusSteps.indexOf(currentStatus);

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-3xl mx-auto bg-base-100 rounded-lg shadow-lg border border-base-300 p-8">
                <div className="text-center">
                    <h1 className="text-4xl font-serif font-bold text-neutral">Track Your Order</h1>
                    <p className="text-neutral-800 mt-2">Order ID: <span className="font-mono text-primary">{id}</span></p>
                    <div className="text-5xl mt-8">{getStatusInfo(currentStatus).icon}</div>
                    <p className="text-xl font-semibold text-neutral mt-4">{getStatusInfo(currentStatus).message}</p>
                     <p className="text-neutral-800 mt-1">Estimated delivery around 8:30 PM</p>
                </div>
                
                <div className="mt-12">
                    <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                            {statusSteps.map((step, index) => (
                                <div key={step} className="text-center w-1/4">
                                    <div className={`text-xs font-semibold uppercase ${index <= currentStepIndex ? 'text-primary' : 'text-gray-400'}`}>
                                        {step}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-base-200">
                            <div 
                                style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-500"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderTrackingPage;