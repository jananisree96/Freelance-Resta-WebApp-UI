import { User, Role, Dish, Order, OrderStatus, CartItem } from "./types";

export const DUMMY_USERS: User[] = [
  {
    id: 1,
    name: "Alice Customer",
    email: "customer@example.com",
    role: Role.CUSTOMER,
    phone: "123-456-7890",
    address: "123 Maple St, Springfield",
  },
  {
    id: 2,
    name: "Bob Staff",
    email: "staff@example.com",
    role: Role.STAFF,
    phone: "234-567-8901",
    address: "456 Oak Ave, Shelbyville",
  },
  {
    id: 3,
    name: "Janani Sree",
    email: "admin@example.com",
    role: Role.ADMIN,
    phone: "345-678-9012",
    address: "789 Pine Ln, Capital City",
  },
  {
    id: 4,
    name: "Hari",
    email: "superadmin@example.com",
    role: Role.SUPERADMIN,
    phone: "456-789-0123",
    address: "101 Main Blvd, Metropolis",
  },
];

export const DUMMY_MENU: Dish[] = [
  {
    id: 1,
    name: "Quinoa & Avocado Salad",
    description:
      "A vibrant mix of organic quinoa, avocado, cherry tomatoes, and a zesty lemon-tahini dressing. A healthy and refreshing starter.",
    price: 1160,
    category: "Appetizer",
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=870&auto=format&fit=crop",
    rating: 4.8,
    reviews: 125,
  },
  {
    id: 2,
    name: "Grilled Salmon Steak",
    description:
      "Perfectly grilled salmon fillet with a citrus glaze, served with asparagus and roasted potatoes.",
    price: 2240,
    category: "Main Course",
    imageUrl:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=870&auto=format&fit=crop",
    rating: 4.9,
    reviews: 210,
  },
  {
    id: 3,
    name: "Savory Ramen Noodles",
    description:
      "A delicious bowl of handmade noodles in a savory broth, topped with tender pork belly, a soft-boiled egg, and fresh scallions.",
    price: 1820,
    category: "Main Course",
    imageUrl:
      "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=764&auto=format&fit=crop",
    rating: 4.7,
    reviews: 180,
  },
  {
    id: 4,
    name: "Chocolate Lava Cake",
    description:
      "A decadent chocolate cake with a molten lava center, served with a scoop of vanilla bean ice cream and a raspberry coulis.",
    price: 960,
    category: "Dessert",
    imageUrl:
      "https://images.unsplash.com/photo-1586985289936-e04c07238918?q=80&w=774&auto=format&fit=crop",
    rating: 5.0,
    reviews: 350,
  },
  {
    id: 5,
    name: "Classic Tomato Bruschetta",
    description:
      "Toasted artisan bread topped with a mix of fresh tomatoes, garlic, basil, and a drizzle of balsamic glaze.",
    price: 900,
    category: "Appetizer",
    imageUrl:
      "https://images.unsplash.com/photo-1505253716362-afb54249332f?q=80&w=870&auto=format&fit=crop",
    rating: 4.6,
    reviews: 95,
  },
  {
    id: 6,
    name: "Chicken Caesar Salad",
    description:
      "Crisp romaine lettuce, parmesan cheese, and crunchy croutons tossed in our signature Caesar dressing. Topped with grilled chicken.",
    price: 1200,
    category: "Appetizer",
    imageUrl:
      "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=870&auto=format&fit=crop",
    rating: 4.5,
    reviews: 150,
  },
  {
    id: 7,
    name: "Prime Ribeye Steak",
    description:
      "A 12oz prime ribeye steak, cooked to perfection, served with a side of garlic mashed potatoes and seasonal vegetables.",
    price: 3640,
    category: "Main Course",
    imageUrl:
      "https://images.unsplash.com/photo-1551028150-64b9f398f67b?q=80&w=870&auto=format&fit=crop",
    rating: 4.9,
    reviews: 250,
  },
  {
    id: 8,
    name: "Fresh Mint Mojito",
    description:
      "A refreshing blend of white rum, fresh mint, lime juice, sugar, and a splash of soda water. The perfect cocktail.",
    price: 1040,
    category: "Beverage",
    imageUrl:
      "https://images.unsplash.com/photo-1604323223639-2a0914f6b0b2?q=80&w=774&auto=format&fit=crop",
    rating: 4.8,
    reviews: 88,
  },
  {
    id: 9,
    name: "Italian Tiramisu",
    description:
      "Classic Italian dessert with layers of coffee-soaked ladyfingers and creamy mascarpone, dusted with cocoa powder.",
    price: 920,
    category: "Dessert",
    imageUrl:
      "https://images.unsplash.com/photo-1571683407094-c14b5397a688?q=80&w=774&auto=format&fit=crop",
    rating: 4.9,
    reviews: 190,
  },
];

export const DUMMY_ORDERS: Order[] = [
  {
    id: "a1b2c3d4",
    items: [
      { dish: DUMMY_MENU[1], quantity: 2 }, // 2x Grilled Salmon Steak
      { dish: DUMMY_MENU[7], quantity: 1 }, // 1x Fresh Mint Mojito
    ],
    total: DUMMY_MENU[1].price * 2 + DUMMY_MENU[7].price,
    status: OrderStatus.DELIVERED,
    orderDate: new Date("2024-07-20T19:30:00"),
    estimatedDelivery: new Date("2024-07-20T20:15:00"),
  },
  {
    id: "e5f6g7h8",
    items: [
      { dish: DUMMY_MENU[2], quantity: 1 }, // 1x Savory Ramen Noodles
    ],
    total: DUMMY_MENU[2].price,
    status: OrderStatus.CANCELLED,
    orderDate: new Date("2024-07-20T12:10:00"),
    estimatedDelivery: new Date("2024-07-20T12:55:00"),
  },
  {
    id: "i9j0k1l2",
    items: [
      { dish: DUMMY_MENU[3], quantity: 1 }, // 1x Chocolate Lava Cake
      { dish: DUMMY_MENU[8], quantity: 1 }, // 1x Italian Tiramisu
    ],
    total: DUMMY_MENU[3].price + DUMMY_MENU[8].price,
    status: OrderStatus.DELIVERED,
    orderDate: new Date("2024-07-19T21:05:00"),
    estimatedDelivery: new Date("2024-07-19T21:45:00"),
  },
  {
    id: "m3n4o5p6",
    items: [{ dish: DUMMY_MENU[0], quantity: 1 }],
    total: DUMMY_MENU[0].price,
    status: OrderStatus.DELIVERED,
    orderDate: new Date("2024-07-18T13:00:00"),
    estimatedDelivery: new Date("2024-07-18T13:40:00"),
  },
  {
    id: "q7r8s9t0",
    items: [{ dish: DUMMY_MENU[4], quantity: 2 }],
    total: DUMMY_MENU[4].price * 2,
    status: OrderStatus.DELIVERED,
    orderDate: new Date("2024-07-17T18:45:00"),
    estimatedDelivery: new Date("2024-07-17T19:25:00"),
  },
  {
    id: "u1v2w3x4",
    items: [
      { dish: DUMMY_MENU[5], quantity: 1 },
      { dish: DUMMY_MENU[6], quantity: 1 },
    ],
    total: DUMMY_MENU[5].price + DUMMY_MENU[6].price,
    status: OrderStatus.DELIVERED,
    orderDate: new Date("2024-07-16T20:00:00"),
    estimatedDelivery: new Date("2024-07-16T20:45:00"),
  },
  {
    id: "y5z6a7b8",
    items: [{ dish: DUMMY_MENU[1], quantity: 1 }],
    total: DUMMY_MENU[1].price,
    status: OrderStatus.CANCELLED,
    orderDate: new Date("2024-07-15T11:20:00"),
    estimatedDelivery: new Date("2024-07-15T12:00:00"),
  },
];
