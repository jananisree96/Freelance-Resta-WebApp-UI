export enum Role {
    CUSTOMER = 'customer',
    STAFF = 'staff',
    ADMIN = 'admin',
    SUPERADMIN = 'superadmin'
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: Role;
    phone?: string;
    address?: string;
}

export interface Dish {
    id: number;
    name: string;
    description: string;
    price: number;
    category: 'Appetizer' | 'Main Course' | 'Dessert' | 'Beverage';
    imageUrl: string;
    rating: number;
    reviews: number;
}

export interface CartItem {
    dish: Dish;
    quantity: number;
}

export enum OrderStatus {
    PLACED = 'Placed',
    PREPARING = 'Preparing',
    OUTFORDELIVERY = 'Out for Delivery',
    DELIVERED = 'Delivered',
    CANCELLED = 'Cancelled'
}

export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    status: OrderStatus;
    orderDate: Date;
    estimatedDelivery: Date;
}

export interface AppRole {
    id: number;
    name: string;
}