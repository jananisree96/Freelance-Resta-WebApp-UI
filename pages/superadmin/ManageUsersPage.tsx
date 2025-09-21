import React, { useState, useMemo } from 'react';
import { User, Role } from '../../types';
import { DUMMY_USERS } from '../../constants';
import Modal from '../../components/Modal';
import EditIcon from '../../components/icons/EditIcon';
import DeleteIcon from '../../components/icons/DeleteIcon';
import Pagination from '../../components/Pagination';

// Define the structure for the form data
interface UserFormData {
    name: string;
    email: string;
    role: Role;
    password?: string;
    phone?: string;
    address?: string;
}

const ManageUsersPage: React.FC = () => {
    // State management
    const [users, setUsers] = useState<User[]>(DUMMY_USERS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [formData, setFormData] = useState<UserFormData>({ name: '', email: '', role: Role.CUSTOMER, phone: '', address: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    
    // State for delete confirmation modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    // Derived state for filtering and pagination
    const filteredUsers = useMemo(() =>
        users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.phone && user.phone.includes(searchTerm))
        ),
        [users, searchTerm]
    );

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedUsers = useMemo(() =>
        filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
        [filteredUsers, currentPage, itemsPerPage]
    );
    
    const handleItemsPerPageChange = (value: number) => {
        setItemsPerPage(value);
        setCurrentPage(1);
    };

    // Handlers for Add/Edit Modal
    const handleOpenModal = (user: User | null) => {
        setEditingUser(user);
        setFormData(user ? { name: user.name, email: user.email, role: user.role, phone: user.phone || '', address: user.address || '' } : { name: '', email: '', role: Role.CUSTOMER, password: '', phone: '', address: '' });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
        setFormData({ name: '', email: '', role: Role.CUSTOMER, password: '', phone: '', address: '' });
    };
    
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.email.trim()) return;

        if (editingUser) {
            // Update existing user
            setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
        } else {
            // Add new user
            const newUser: User = {
                id: Math.max(...users.map(u => u.id), 0) + 1, // Simple ID generation
                ...formData,
            };
            setUsers([newUser, ...users]);
        }
        handleCloseModal();
    };

    // Handlers for Delete Confirmation Modal
    const handleOpenDeleteModal = (user: User) => {
        setUserToDelete(user);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setUserToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const handleConfirmDelete = () => {
        if (userToDelete) {
            setUsers(users.filter(u => u.id !== userToDelete.id));
            handleCloseDeleteModal();
        }
    };
    
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    return (
        <div>
            {/* Page header and actions */}
            <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-base-300 pb-4 mb-8 gap-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral">Manage Users</h1>
                </div>
                <button onClick={() => handleOpenModal(null)} className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors self-start md:self-center">
                    Add User
                </button>
            </div>

            {/* Search and Table Container */}
            <div className="bg-base-100 p-4 sm:p-6 rounded-lg shadow-md border border-base-300">
                {/* Search Input */}
                <div className="flex justify-end mb-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full sm:w-auto sm:max-w-sm bg-base-200 border border-base-300 rounded-lg p-2 text-neutral focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                
                {/* Users Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b-2 border-base-300 bg-base-200">
                            <tr>
                                <th className="p-2 sm:p-4 text-sm font-semibold text-neutral uppercase tracking-wider">Name</th>
                                <th className="p-2 sm:p-4 text-sm font-semibold text-neutral uppercase tracking-wider">Email</th>
                                <th className="p-2 sm:p-4 text-sm font-semibold text-neutral uppercase tracking-wider hidden md:table-cell">Phone</th>
                                <th className="p-2 sm:p-4 text-sm font-semibold text-neutral uppercase tracking-wider hidden lg:table-cell">Address</th>
                                <th className="p-2 sm:p-4 text-sm font-semibold text-neutral uppercase tracking-wider">Role</th>
                                <th className="p-2 sm:p-4 text-sm font-semibold text-neutral uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedUsers.length > 0 ? (
                                paginatedUsers.map(user => (
                                    <tr key={user.id} className="border-b border-base-300 hover:bg-base-200/50">
                                        <td className="p-2 sm:p-4 text-neutral font-medium whitespace-nowrap">{user.name}</td>
                                        <td className="p-2 sm:p-4 text-neutral-800">{user.email}</td>
                                        <td className="p-2 sm:p-4 text-neutral-800 hidden md:table-cell">{user.phone || 'N/A'}</td>
                                        <td className="p-2 sm:p-4 text-neutral-800 hidden lg:table-cell">{user.address || 'N/A'}</td>
                                        <td className="p-2 sm:p-4 text-neutral-800 capitalize">{user.role}</td>
                                        <td className="p-2 sm:p-4 text-right">
                                            <div className="flex justify-end items-center space-x-2">
                                                <button onClick={() => handleOpenModal(user)} className="text-info hover:text-info/80 p-1" aria-label={`Edit ${user.name}`}>
                                                    <EditIcon />
                                                </button>
                                                <button onClick={() => handleOpenDeleteModal(user)} className="text-error hover:text-error/80 p-1" aria-label={`Delete ${user.name}`}>
                                                    <DeleteIcon />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-4 text-center text-neutral-800">No users found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {filteredUsers.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        itemsPerPage={itemsPerPage}
                        onItemsPerPageChange={handleItemsPerPageChange}
                        totalItems={filteredUsers.length}
                    />
                )}
            </div>
            
            {/* Add/Edit Modal */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingUser ? 'Edit User' : 'Add New User'}>
                <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto p-1">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-800 mb-1">Full Name</label>
                        <input id="name" name="name" type="text" value={formData.name} onChange={handleFormChange} required autoFocus className="w-full bg-base-200 border border-base-300 rounded-lg p-3 text-neutral focus:outline-none focus:ring-2 focus:ring-primary"/>
                    </div>
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-800 mb-1">Email</label>
                        <input id="email" name="email" type="email" value={formData.email} onChange={handleFormChange} required className="w-full bg-base-200 border border-base-300 rounded-lg p-3 text-neutral focus:outline-none focus:ring-2 focus:ring-primary"/>
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-neutral-800 mb-1">Phone Number</label>
                        <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleFormChange} placeholder="e.g. 123-456-7890" className="w-full bg-base-200 border border-base-300 rounded-lg p-3 text-neutral focus:outline-none focus:ring-2 focus:ring-primary"/>
                    </div>
                     <div>
                        <label htmlFor="address" className="block text-sm font-medium text-neutral-800 mb-1">Address</label>
                        <input id="address" name="address" type="text" value={formData.address} onChange={handleFormChange} placeholder="e.g. 123 Main St, Anytown" className="w-full bg-base-200 border border-base-300 rounded-lg p-3 text-neutral focus:outline-none focus:ring-2 focus:ring-primary"/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-neutral-800 mb-1">Password</label>
                        <input id="password" name="password" type="password" placeholder={editingUser ? 'Leave blank to keep current password' : ''} onChange={handleFormChange} required={!editingUser} className="w-full bg-base-200 border border-base-300 rounded-lg p-3 text-neutral focus:outline-none focus:ring-2 focus:ring-primary"/>
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-neutral-800 mb-1">Role</label>
                        <select id="role" name="role" value={formData.role} onChange={handleFormChange} required className="w-full bg-base-200 border border-base-300 rounded-lg p-3 text-neutral focus:outline-none focus:ring-2 focus:ring-primary appearance-none">
                            {Object.values(Role).map(role => (
                                <option key={role} value={role} className="capitalize">{role}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end space-x-3 pt-4 border-t border-base-300">
                         <button type="button" onClick={handleCloseModal} className="bg-base-200 text-neutral font-semibold py-2 px-4 rounded-lg hover:bg-base-300 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors">
                            {editingUser ? 'Update User' : 'Add User'}
                        </button>
                    </div>
                </form>
            </Modal>
            
            {/* Delete Confirmation Modal */}
            <Modal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal} title="Confirm Deletion">
                <div className="space-y-4">
                    <p>Are you sure you want to delete the user "<span className="font-bold">{userToDelete?.name}</span>"?</p>
                    <p className="text-sm text-neutral-800">This action cannot be undone.</p>
                    <div className="flex justify-end space-x-3 pt-4 mt-4 border-t border-base-300">
                        <button type="button" onClick={handleCloseDeleteModal} className="bg-base-200 text-neutral font-semibold py-2 px-4 rounded-lg hover:bg-base-300 transition-colors">
                            No, Cancel
                        </button>
                        <button type="button" onClick={handleConfirmDelete} className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors">
                            Yes, Delete
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ManageUsersPage;