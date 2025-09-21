import React, { useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import RolesIcon from '../../components/icons/RolesIcon';
import UsersIcon from '../../components/icons/UsersIcon';
import ItemsIcon from '../../components/icons/ItemsIcon';
import PieChart from '../../components/charts/PieChart';
import BarChart from '../../components/charts/BarChart';
import BuildingIcon from '../../components/icons/BuildingIcon';


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

const SuperAdminDashboard: React.FC = () => {
    const { user } = useAuth();

    // Full dummy data for profit
    const allProfitData = useMemo(() => [
        { name: 'Food Sales', value: 450000, color: '#DB2777' },      // primary
        { name: 'Beverage Sales', value: 180000, color: '#F472B6' },    // secondary
        { name: 'Merchandise', value: 75000, color: '#FBCFE8' },      // pink-100
        { name: 'Delivery Fees', value: 55000, color: '#fecaca' },     // red-200
        { name: 'Service Charges', value: 95000, color: '#a5b4fc' },    // indigo-300
    ], []);

    const userRoleData = [
        { label: 'Users', value: 1254, color: '#DB2777' }, // primary
        { label: 'Roles', value: 4, color: '#F472B6' }, // secondary
    ];
    
    return (
        <div>
            {/* Page header */}
            <div className="border-b border-base-300 pb-4 mb-8">
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral">Dashboard</h1>
                <p className="text-neutral-800 mt-1">Welcome back, {user?.name}. Here's an overview of your system.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Users" value="1,254" icon={<UsersIcon className="w-6 h-6" />} />
                <StatCard title="Total Roles" value="4" icon={<RolesIcon className="w-6 h-6" />} />
                <StatCard title="Menu Items" value="68" icon={<ItemsIcon className="w-6 h-6" />} />
                <StatCard title="Branches" value="12" icon={<BuildingIcon className="w-6 h-6" />} />
            </div>

            {/* Data Visualization Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-base-100 p-6 rounded-lg shadow-md border border-base-300">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-serif font-bold text-neutral">Monthly Profit Breakdown</h3>
                    </div>
                    <PieChart data={allProfitData} />
                </div>
                <div className="lg:col-span-2">
                    <BarChart title="User & Role Distribution" data={userRoleData} />
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;