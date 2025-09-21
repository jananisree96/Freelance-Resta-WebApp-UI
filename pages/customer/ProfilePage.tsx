import React from 'react';
import { useAuth } from '../../context/AuthContext';

const ProfileField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div>
        <label className="text-sm font-medium text-neutral-800">{label}</label>
        <p className="text-lg text-neutral mt-1">{value}</p>
    </div>
);

const ProfilePage: React.FC = () => {
    const { user } = useAuth();
    
    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
             <div className="text-center mb-12">
                <h1 className="text-5xl font-serif font-bold text-neutral">My Profile</h1>
            </div>
            <div className="max-w-2xl mx-auto bg-base-100 p-8 rounded-lg shadow-lg border border-base-300">
                <div className="space-y-6">
                    <ProfileField label="Name" value={user?.name || 'N/A'} />
                    <ProfileField label="Email" value={user?.email || 'N/A'} />
                    <ProfileField label="Role" value={user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'N/A'} />
                </div>
                 <h2 className="text-2xl font-serif font-bold text-neutral mt-10 mb-4 border-t border-base-300 pt-6">Order History</h2>
                <div className="text-center text-neutral-800 p-8 bg-base-200 rounded-lg">
                    <p>You have no past orders.</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;