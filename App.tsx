import React from "react";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { Role } from "./types";

// Pages
import LoginPage from "./pages/LoginPage";
// Customer Pages
import CustomerLayout from "./pages/customer/CustomerLayout";
import LandingPage from "./pages/customer/LandingPage";
import MenuPage from "./pages/customer/MenuPage";
import DishDetailPage from "./pages/customer/DishDetailPage";
import CartPage from "./pages/customer/CartPage";
import CheckoutPage from "./pages/customer/CheckoutPage";
import OrderTrackingPage from "./pages/customer/OrderTrackingPage";
import ProfilePage from "./pages/customer/ProfilePage";

// Portal Dashboards
import StaffLayout from "./pages/staff/StaffLayout";
import StaffDashboard from "./pages/staff/StaffDashboard";
import NewOrderPage from "./pages/staff/NewOrderPage";
import StaffCheckoutPage from "./pages/staff/CheckoutPage";
import OrderHistoryPage from "./pages/staff/OrderHistoryPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageStaffPage from "./pages/admin/ManageStaffPage";
import SuperAdminLayout from "./pages/superadmin/SuperAdminLayout";
import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";
import ManageRolesPage from "./pages/superadmin/ManageRolesPage";
import ManageUsersPage from "./pages/superadmin/ManageUsersPage";
import ManageItemsPage from "./pages/superadmin/ManageItemsPage";
import { NotificationProvider } from "./context/NotificationContext";

const AppRoutes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-base-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  switch (user.role) {
    case Role.CUSTOMER:
      return (
        <CustomerLayout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/dish/:id" element={<DishDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/track-order/:id" element={<OrderTrackingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </CustomerLayout>
      );
    case Role.STAFF:
      return (
        <StaffLayout>
          <Routes>
            <Route path="/" element={<StaffDashboard />} />
            <Route path="/new-order" element={<NewOrderPage />} />
            <Route path="/checkout" element={<StaffCheckoutPage />} />
            <Route path="/order-history" element={<OrderHistoryPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </StaffLayout>
      );
    case Role.ADMIN:
      return (
        <AdminLayout>
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/staff" element={<ManageStaffPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AdminLayout>
      );
    case Role.SUPERADMIN:
      return (
        <SuperAdminLayout>
          <Routes>
            <Route path="/" element={<SuperAdminDashboard />} />
            <Route path="/roles" element={<ManageRolesPage />} />
            <Route path="/users" element={<ManageUsersPage />} />
            <Route path="/items" element={<ManageItemsPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </SuperAdminLayout>
      );
    default:
      return <Navigate to="/login" />;
  }
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <CartProvider>
          <HashRouter>
            <AppRoutes />
          </HashRouter>
        </CartProvider>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
