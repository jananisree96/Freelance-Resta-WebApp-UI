import React, { useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DUMMY_USERS, DUMMY_MENU } from '../../constants';
import { Role } from '../../types';
import UsersIcon from '../../components/icons/UsersIcon';
import CalendarIcon from '../../components/icons/CalendarIcon';
import CurrencyDollarIcon from '../../components/icons/CurrencyDollarIcon';
import LineChart from '../../components/charts/LineChart';
import PieChart from '../../components/charts/PieChart';

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


const AdminDashboard: React.FC = () => {
    const { user } = useAuth();
    const staffCount = useMemo(() => DUMMY_USERS.filter(u => u.role === Role.STAFF).length, []);

    // Dummy data for charts
    const dailyOrdersData = useMemo(() => [
        { label: 'Mon', value: 32 },
        { label: 'Tue', value: 45 },
        { label: 'Wed', value: 60 },
        { label: 'Thu', value: 54 },
        { label: 'Fri', value: 78 },
        { label: 'Sat', value: 92 },
        { label: 'Sun', value: 85 },
    ], []);

    const topSellingData = useMemo(() => [
        { name: DUMMY_MENU[1].name, value: 150, color: '#DB2777' }, // Salmon
        { name: DUMMY_MENU[3].name, value: 120, color: '#F472B6' }, // Lava Cake
        { name: DUMMY_MENU[2].name, value: 95, color: '#FBCFE8' }, // Ramen
        { name: DUMMY_MENU[6].name, value: 80, color: '#fecaca' }, // Ribeye
        { name: DUMMY_MENU[0].name, value: 65, color: '#a5b4fc' }, // Quinoa Salad
    ], []);

    return (
        <div>
            {/* Page header */}
            <div className="border-b border-base-300 pb-4 mb-8">
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral">Dashboard</h1>
                <p className="text-neutral-800 mt-1">Welcome back, {user?.name}. Here's an overview of restaurant performance.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard title="Total Staff" value={staffCount.toString()} icon={<UsersIcon className="w-6 h-6" />} />
                <StatCard title="Today's Orders" value="42" icon={<CalendarIcon className="w-6 h-6" />} />
                <StatCard title="Monthly Revenue" value="₹8,50,000" icon={<CurrencyDollarIcon className="w-6 h-6" />} />
            </div>

            {/* Data Visualization Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-base-100 p-6 rounded-lg shadow-md border border-base-300">
                    <h3 className="text-xl font-serif font-bold text-neutral mb-4">Daily Orders (Last 7 Days)</h3>
                    <LineChart data={dailyOrdersData} lineColor="#DB2777" />
                </div>
                 <div className="lg:col-span-2 bg-base-100 p-6 rounded-lg shadow-md border border-base-300">
                    <h3 className="text-xl font-serif font-bold text-neutral mb-4">Top Selling Items</h3>
                    <PieChart data={topSellingData} />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;