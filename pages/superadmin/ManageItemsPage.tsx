

import React, { useState, useMemo } from 'react';
import { Dish } from '../../types';
import { DUMMY_MENU } from '../../constants';
import Modal from '../../components/Modal';
import EditIcon from '../../components/icons/EditIcon';
import DeleteIcon from '../../components/icons/DeleteIcon';
import Pagination from '../../components/Pagination';

// Define the structure for the form data
interface ItemFormData {
    name: string;
    description: string;
    price: number;
    category: 'Appetizer' | 'Main Course' | 'Dessert' | 'Beverage';
    imageUrl: string;
}

const ItemCard: React.FC<{ item: Dish; onEdit: () => void; onDelete: () => void; }> = ({ item, onEdit, onDelete }) => (
    <div className="bg-base-100 p-4 rounded-lg shadow-sm border border-transparent hover:border-base-300 hover:shadow-xl flex flex-col md:flex-row items-center md:items-start gap-5 transition-all duration-300 w-full">
        {/* Image */}
        <img
            className="w-32 h-32 object-cover rounded-full flex-shrink-0"
            src={item.imageUrl}
            alt={item.name}
        />
        
        {/* Details */}
        <div className="flex-grow w-full text-center md:text-left">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-2">
                {/* Grouping title and price for better mobile layout */}
                <div className="flex flex-col md:flex-row md:items-center flex-grow">
                    <h3 className="font-serif text-2xl font-semibold text-neutral">{item.name}</h3>
                    {/* Decorative line for desktop */}
                    <div className="flex-grow border-b border-base-300 hidden md:block mx-4"></div>
                    <span className="text-2xl font-bold text-primary whitespace-nowrap md:mr-4 mt-1 md:mt-0">₹{item.price.toFixed(0)}</span>
                </div>
                
                {/* Actions */}
                <div className="flex items-center justify-center md:justify-end space-x-1 flex-shrink-0 mt-2 md:mt-0">
                    <button onClick={onEdit} className="text-info hover:text-info/80 p-2 rounded-full hover:bg-base-200 transition-colors" aria-label={`Edit ${item.name}`}>
                        <EditIcon />
                    </button>
                    <button onClick={onDelete} className="text-error hover:text-error/80 p-2 rounded-full hover:bg-base-200 transition-colors" aria-label={`Delete ${item.name}`}>
                        <DeleteIcon />
                    </button>
                </div>
            </div>
            <p className="text-neutral-800 text-sm leading-relaxed">{item.description}</p>
        </div>
    </div>
);


const ManageItemsPage: React.FC = () => {
    // State management
    const [items, setItems] = useState<Dish[]>(DUMMY_MENU);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Dish | null>(null);
    const [formData, setFormData] = useState<ItemFormData>({ name: '', description: '', price: 0, category: 'Main Course', imageUrl: '' });
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    
    // State for delete confirmation modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<Dish | null>(null);

    // Derived state for filtering and pagination
    const filteredItems = useMemo(() =>
        items.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        [items, searchTerm]
    );

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const paginatedItems = useMemo(() =>
        filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
        [filteredItems, currentPage, itemsPerPage]
    );
    
    const handleItemsPerPageChange = (value: number) => {
        setItemsPerPage(value);
        setCurrentPage(1);
    };

    // Handlers for Add/Edit Modal
    const handleOpenModal = (item: Dish | null) => {
        setEditingItem(item);
        if (item) {
            setFormData({ name: item.name, description: item.description, price: item.price, category: item.category, imageUrl: item.imageUrl });
            setImagePreview(item.imageUrl);
        } else {
            setFormData({ name: '', description: '', price: 0, category: 'Main Course', imageUrl: '' });
            setImagePreview(null);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        setImagePreview(null);
    };
    
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) || 0 : value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setFormData(prev => ({ ...prev, imageUrl: result }));
                setImagePreview(result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (editingItem) {
            setItems(items.map(i => i.id === editingItem.id ? { ...editingItem, ...formData } : i));
        } else {
            const newItem: Dish = {
                id: Math.max(...items.map(i => i.id), 0) + 1,
                ...formData,
                rating: 0, // Default values for new items
                reviews: 0,
            };
            setItems([newItem, ...items]);
        }
        handleCloseModal();
    };

    // Handlers for Delete Confirmation Modal
    const handleOpenDeleteModal = (item: Dish) => {
        setItemToDelete(item);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setItemToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const handleConfirmDelete = () => {
        if (itemToDelete) {
            setItems(items.filter(i => i.id !== itemToDelete.id));
            handleCloseDeleteModal();
        }
    };
    
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-base-300 pb-4 mb-8 gap-4">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-neutral">Manage Food Items</h1>
                </div>
                <button onClick={() => handleOpenModal(null)} className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors self-start md:self-center">
                    Add Item
                </button>
            </div>

            <div className="bg-base-100 p-6 rounded-lg shadow-md border border-base-300">
                <div className="flex justify-end mb-4">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full max-w-sm bg-base-200 border border-base-300 rounded-lg p-2 text-neutral focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                
                {paginatedItems.length > 0 ? (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        {paginatedItems.map(item => (
                            <ItemCard key={item.id} item={item} onEdit={() => handleOpenModal(item)} onDelete={() => handleOpenDeleteModal(item)} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 text-neutral-800">
                        <p>No food items found. Try adjusting your search.</p>
                    </div>
                )}
                
                {filteredItems.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        itemsPerPage={itemsPerPage}
                        onItemsPerPageChange={handleItemsPerPageChange}
                        totalItems={filteredItems.length}
                    />
                )}
            </div>

            {/* Add/Edit Modal */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingItem ? 'Edit Food Item' : 'Add New Food Item'}>
                <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto p-1">
                    <InputField label="Item Name" id="name" name="name" type="text" value={formData.name} onChange={handleFormChange} required autoFocus />
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-neutral-800 mb-1">Description</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleFormChange} required rows={3} className="w-full bg-base-200 border border-base-300 rounded-lg p-3 text-neutral focus:outline-none focus:ring-2 focus:ring-primary"/>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <InputField label="Price" id="price" name="price" type="number" value={formData.price} onChange={handleFormChange} required />
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-neutral-800 mb-1">Category</label>
                            <select id="category" name="category" value={formData.category} onChange={handleFormChange} required className="w-full bg-base-200 border border-base-300 rounded-lg p-3 text-neutral focus:outline-none focus:ring-2 focus:ring-primary appearance-none">
                                {['Appetizer', 'Main Course', 'Dessert', 'Beverage'].map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-800 mb-1">Item Image</label>
                        <div className="mt-1 flex items-center space-x-4">
                            <div className="w-24 h-24 rounded-md bg-base-200 flex items-center justify-center overflow-hidden border border-base-300">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-xs text-center p-2 text-neutral-800">Image Preview</span>
                                )}
                            </div>
                            <label htmlFor="imageUpload" className="cursor-pointer bg-base-100 py-2 px-3 border border-base-300 rounded-md shadow-sm text-sm leading-4 font-medium text-neutral-800 hover:bg-base-200 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                                <span>Change</span>
                                <input id="imageUpload" name="imageUpload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                            </label>
                        </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-4 border-t border-base-300">
                        <button type="button" onClick={handleCloseModal} className="bg-base-200 text-neutral font-semibold py-2 px-4 rounded-lg hover:bg-base-300 transition-colors">Cancel</button>
                        <button type="submit" className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors">{editingItem ? 'Update Item' : 'Add Item'}</button>
                    </div>
                </form>
            </Modal>
            
            {/* Delete Confirmation Modal */}
            <Modal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal} title="Confirm Deletion">
                <div className="space-y-4">
                    <p>Are you sure you want to delete the item "<span className="font-bold">{itemToDelete?.name}</span>"?</p>
                    <p className="text-sm text-neutral-800">This action cannot be undone.</p>
                    <div className="flex justify-end space-x-3 pt-4 mt-4 border-t border-base-300">
                        <button type="button" onClick={handleCloseDeleteModal} className="bg-base-200 text-neutral font-semibold py-2 px-4 rounded-lg hover:bg-base-300 transition-colors">No, Cancel</button>
                        <button type="button" onClick={handleConfirmDelete} className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors">Yes, Delete</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};


// Reusable InputField component
const InputField: React.FC<{ label: string, id: string } & React.InputHTMLAttributes<HTMLInputElement>> = ({ label, id, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-neutral-800 mb-1">{label}</label>
        <input id={id} {...props} className="w-full bg-base-200 border border-base-300 rounded-lg p-3 text-neutral focus:outline-none focus:ring-2 focus:ring-primary"/>
    </div>
);


export default ManageItemsPage;