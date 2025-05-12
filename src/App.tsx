import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";

// Main pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
// The following pages currently don't exist in the codebase
// import Organic from "./pages/Organic";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Cart from "./pages/Cart";

// Auth pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegistrationPending from "./pages/auth/RegistrationPending";

// Profile page
// import Profile from "./pages/profile/Profile";

// Dashboard pages
import CustomerDashboard from "./pages/dashboards/CustomerDashboard";
import ShopOwnerDashboard from "./pages/dashboards/ShopOwnerDashboard";
import FarmerDashboard from "./pages/dashboards/FarmerDashboard";
import DeliveryAgentDashboard from "./pages/dashboards/DeliveryAgentDashboard";
import DeliveryAdminDashboard from "./pages/dashboards/DeliveryAdminDashboard";
import OverallAdminDashboard from "./pages/dashboards/OverallAdminDashboard";

// Customer pages
import CustomerOrders from "./pages/customer/Orders";
import CustomerFavorites from "./pages/customer/Favorites";
import CustomerAddresses from "./pages/customer/Addresses";

// Shop owner pages
import ShopProducts from "./pages/shop-owner/Products";
import ShopOrders from "./pages/shop-owner/Orders";
import ShopCustomers from "./pages/shop-owner/Customers";
import ShopCoupons from "./pages/shop-owner/Coupons";

// Farmer pages
// import FarmerProducts from "./pages/farmer/Products";
// import FarmerOrders from "./pages/farmer/Orders";
// import FarmerCustomers from "./pages/farmer/Customers";
// import FarmerCoupons from "./pages/farmer/Coupons";

// Delivery agent pages
// import DeliveryAgentDeliveries from "./pages/delivery-agent/Deliveries";
// import DeliveryAgentHistory from "./pages/delivery-agent/History";

// Delivery admin pages
// import DeliveryAdminAgents from "./pages/delivery-admin/Agents";
// import DeliveryAdminDeliveries from "./pages/delivery-admin/Deliveries";
// import DeliveryAdminReports from "./pages/delivery-admin/Reports";

// Admin pages
// import AdminShopOwners from "./pages/admin/ShopOwners";
// import AdminFarmers from "./pages/admin/Farmers";
// import AdminDeliveryAdmins from "./pages/admin/DeliveryAdmins";
// import AdminCustomers from "./pages/admin/Customers";
// import AdminSettings from "./pages/admin/Settings";

import "./App.css";

// Add global styles to fix webkit scrollbar
const scrollbarStyle = document.createElement('style');
scrollbarStyle.textContent = `
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 8px;
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;
document.head.appendChild(scrollbarStyle);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Main routes */}
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            {/* Temporarily disable routes for pages that don't exist yet */}
            {/* <Route path="/organic" element={<Organic />} /> */}
            {/* <Route path="/about" element={<About />} /> */}
            {/* <Route path="/contact" element={<Contact />} /> */}
            {/* <Route path="/cart" element={<Cart />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/registration-pending" element={<RegistrationPending />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
            
            {/* Customer routes */}
            <Route path="/customer/dashboard" element={<CustomerDashboard />} />
            <Route path="/customer/orders" element={<CustomerOrders />} />
            <Route path="/customer/favorites" element={<CustomerFavorites />} />
            <Route path="/customer/addresses" element={<CustomerAddresses />} />
            
            {/* Shop owner routes */}
            <Route path="/shop-owner/dashboard" element={<ShopOwnerDashboard />} />
            <Route path="/shop-owner/products" element={<ShopProducts />} />
            <Route path="/shop-owner/orders" element={<ShopOrders />} />
            <Route path="/shop-owner/customers" element={<ShopCustomers />} />
            <Route path="/shop-owner/coupons" element={<ShopCoupons />} />
            
            {/* Farmer routes - temporarily disabled until components are created */}
            {/* <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
            <Route path="/farmer/products" element={<FarmerProducts />} />
            <Route path="/farmer/orders" element={<FarmerOrders />} />
            <Route path="/farmer/customers" element={<FarmerCustomers />} />
            <Route path="/farmer/coupons" element={<FarmerCoupons />} /> */}
            <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
            
            {/* Delivery agent routes - temporarily disabled */}
            {/* <Route path="/delivery-agent/dashboard" element={<DeliveryAgentDashboard />} />
            <Route path="/delivery-agent/deliveries" element={<DeliveryAgentDeliveries />} />
            <Route path="/delivery-agent/history" element={<DeliveryAgentHistory />} /> */}
            <Route path="/delivery-agent/dashboard" element={<DeliveryAgentDashboard />} />
            
            {/* Delivery admin routes - temporarily disabled */}
            {/* <Route path="/delivery-admin/dashboard" element={<DeliveryAdminDashboard />} />
            <Route path="/delivery-admin/agents" element={<DeliveryAdminAgents />} />
            <Route path="/delivery-admin/deliveries" element={<DeliveryAdminDeliveries />} />
            <Route path="/delivery-admin/reports" element={<DeliveryAdminReports />} /> */}
            <Route path="/delivery-admin/dashboard" element={<DeliveryAdminDashboard />} />
            
            {/* Overall admin routes - temporarily disabled */}
            <Route path="/admin/dashboard" element={<OverallAdminDashboard />} />
            {/* <Route path="/admin/shop-owners" element={<AdminShopOwners />} />
            <Route path="/admin/farmers" element={<AdminFarmers />} />
            <Route path="/admin/delivery-admins" element={<AdminDeliveryAdmins />} />
            <Route path="/admin/customers" element={<AdminCustomers />} />
            <Route path="/admin/settings" element={<AdminSettings />} /> */}
            
            {/* 404 catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
