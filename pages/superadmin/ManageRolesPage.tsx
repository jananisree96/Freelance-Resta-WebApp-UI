import React, { useState, useMemo } from 'react';
import { AppRole } from '../../types';
import Modal from '../../components/Modal';
import EditIcon from '../../components/icons/EditIcon';
import DeleteIcon from '../../components/icons/DeleteIcon';
import Pagination from '../../components/Pagination';

// Dummy Data
const DUMMY_ROLES: AppRole[] = [
    { id: 1, name: 'customer' },
    { id: 2, name: 'staff' },
    { id: 3, name: 'admin' },
    { id: 4, name: 'superadmin' },
    { id: 5, name: 'guest' },
    { id: 6, name: 'moderator' },
    { id: 7, name: 'manager' },
    { id: 8, name: 'support' },
];

const ManageRolesPage: React.FC = () => {
    // State management
    const [roles, setRoles] = useState<AppRole[]>(DUMMY_ROLES);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRole, setEditingRole] = useState<AppRole | null>(null);
    const [roleName, setRoleName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // State for delete confirmation modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [roleToDelete, setRoleToDelete] = useState<AppRole | null>(null);
    
    // Derived state for filtering and pagination
    const filteredRoles = useMemo(() => 
        roles.filter(role => role.name.toLowerCase().includes(searchTerm.toLowerCase())),
        [roles, searchTerm]
    );

    const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);
    const paginatedRoles = useMemo(() => 
        filteredRoles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
        [filteredRoles, currentPage, itemsPerPage]
    );
    
    const handleItemsPerPageChange = (value: number) => {
        setItemsPerPage(value);
        setCurrentPage(1);
    };

    // Handlers for Add/Edit Modal
    const handleOpenModal = (role: AppRole | null) => {
        setEditingRole(role);
        setRoleName(role ? role.name : '');
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingRole(null);
        setRoleName('');
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!roleName.trim()) return;

        if (editingRole) {
            // Update existing role
            setRoles(roles.map(r => r.id === editingRole.id ? { ...r, name: roleName.trim() } : r));
        } else {
            // Add new role
            const newRole: AppRole = {
                id: Math.max(...roles.map(r => r.id), 0) + 1, // Simple ID generation
                name: roleName.trim(),
            };
            setRoles([newRole, ...roles]);
        }
        handleCloseModal();
    };

    // Handlers for Delete Confirmation Modal
    const handleOpenDeleteModal = (role: AppRole) => {
        setRoleToDelete(role);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setRoleToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const handleConfirmDelete = () => {
        if (roleToDelete) {
            setRoles(roles.filter(r => r.id !== roleToDelete.id));
            handleCloseDeleteModal();
        }
    };
    
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };
    
    // Render logic
    return (
        <div>
            {/* Page header and actions */}
            <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-base-300 pb-4 mb-8 gap-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral">Manage Roles</h1>
                </div>
                <button onClick={() => handleOpenModal(null)} className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors self-start md:self-center">
                    Add Role
                </button>
            </div>

            {/* Search and Table Container */}
            <div className="bg-base-100 p-4 sm:p-6 rounded-lg shadow-md border border-base-300">
                {/* Search Input */}
                <div className="flex justify-end mb-4">
                    <input
                        type="text"
                        placeholder="Search for a role..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full sm:w-auto sm:max-w-sm bg-base-200 border border-base-300 rounded-lg p-2 text-neutral focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                
                {/* Roles Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b-2 border-base-300 bg-base-200">
                            <tr>
                                <th className="p-2 sm:p-4 text-sm font-semibold text-neutral uppercase tracking-wider">Role Name</th>
                                <th className="p-2 sm:p-4 text-sm font-semibold text-neutral uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedRoles.length > 0 ? (
                                paginatedRoles.map(role => (
                                    <tr key={role.id} className="border-b border-base-300 hover:bg-base-200/50">
                                        <td className="p-2 sm:p-4 text-neutral font-medium">{role.name}</td>
                                        <td className="p-2 sm:p-4 text-right">
                                            <div className="flex justify-end items-center space-x-2">
                                                <button onClick={() => handleOpenModal(role)} className="text-info hover:text-info/80 p-1" aria-label={`Edit ${role.name}`}>
                                                    <EditIcon />
                                                </button>
                                                <button onClick={() => handleOpenDeleteModal(role)} className="text-error hover:text-error/80 p-1" aria-label={`Delete ${role.name}`}>
                                                    <DeleteIcon />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={2} className="p-4 text-center text-neutral-800">No roles found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {filteredRoles.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        itemsPerPage={itemsPerPage}
                        onItemsPerPageChange={handleItemsPerPageChange}
                        totalItems={filteredRoles.length}
                    />
                )}
            </div>
            
            {/* Add/Edit Modal */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingRole ? 'Edit Role' : 'Add New Role'}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="roleName" className="block text-sm font-medium text-neutral-800 mb-1">Role Name</label>
                        <input
                            id="roleName"
                            type="text"
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                            required
                            autoFocus
                            className="w-full bg-base-200 border border-base-300 rounded-lg p-3 text-neutral focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div className="flex justify-end space-x-3 pt-4 border-t border-base-300">
                         <button type="button" onClick={handleCloseModal} className="bg-base-200 text-neutral font-semibold py-2 px-4 rounded-lg hover:bg-base-300 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors">
                            {editingRole ? 'Update Role' : 'Add Role'}
                        </button>
                    </div>
                </form>
            </Modal>
            
            {/* Delete Confirmation Modal */}
            <Modal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal} title="Confirm Deletion">
                <div className="space-y-4">
                    <p>Are you sure you want to delete the role "<span className="font-bold">{roleToDelete?.name}</span>"?</p>
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

export default ManageRolesPage;