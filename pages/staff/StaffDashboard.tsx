import React, { useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import PieChart from '../../components/charts/PieChart';
import CalendarIcon from '../../components/icons/CalendarIcon';
import ClipboardListIcon from '../../components/icons/ClipboardListIcon';

const StatCard: React.FC<{ title: string, value: string, icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-base-100 p-6 rounded-lg shadow-md border border-base-300 flex items-center space-x-4">
        <div className="bg-primary/10 text-primary p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-sm text-neutral-800 font-medium">{title}</p>
            <p className="text-2xl font-bold text-neutral">{value}</p>
        </div>
    </div>
);


const StaffDashboard: React.FC = () => {
    const { user } = useAuth();
    
    // Dummy data for charts
    const performanceData = useMemo(() => [
        { name: 'Main Course', value: 120, color: '#DB2777' },
        { name: 'Appetizers', value: 75, color: '#F472B6' },
        { name: 'Beverages', value: 95, color: '#FBCFE8' },
        { name: 'Desserts', value: 60, color: '#fecaca' },
    ], []);
    
    return (
        <div>
            {/* Page header */}
            <div className="border-b border-base-300 pb-4 mb-8">
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral">Dashboard</h1>
                <p className="text-neutral-800 mt-1">Welcome back, {user?.name}. Ready for another great day!</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard title="Today's Orders" value="14" icon={<CalendarIcon className="w-6 h-6" />} />
                <StatCard title="Monthly Orders" value="350" icon={<ClipboardListIcon className="w-6 h-6" />} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-base-100 p-6 rounded-lg shadow-md border border-base-300">
                    <h3 className="text-xl font-serif font-bold text-neutral mb-4">Your Monthly Performance (by items sold)</h3>
                    <PieChart data={performanceData.map(d => ({ ...d, value: d.value }))} />
                </div>
                <div className="lg:col-span-2 bg-base-100 p-6 rounded-lg shadow-md border border-base-300">
                     <h3 className="text-xl font-serif font-bold text-neutral mb-4">Pending Orders</h3>
                     <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-base-200 border border-base-300">
                            <p className="font-bold text-neutral">Order #8A2B4C - Table 5</p>
                            <ul className="list-disc list-inside text-sm text-neutral-800 mt-1">
                                <li>2x Grilled Salmon Steak</li>
                                <li>1x Fresh Mint Mojito</li>
                            </ul>
                        </div>
                         <div className="p-4 rounded-lg bg-base-200 border border-base-300">
                            <p className="font-bold text-neutral">Order #9F1E7D - Takeaway</p>
                            <ul className="list-disc list-inside text-sm text-neutral-800 mt-1">
                                <li>1x Savory Ramen Noodles</li>
                            </ul>
                        </div>
                        <p className="text-center text-sm text-neutral-800 pt-2">No more pending orders.</p>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default StaffDashboard;