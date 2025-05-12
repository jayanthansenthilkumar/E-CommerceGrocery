
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";

// Main pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Auth pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegistrationPending from "./pages/auth/RegistrationPending";

// Dashboard pages
import CustomerDashboard from "./pages/dashboards/CustomerDashboard";
import ShopOwnerDashboard from "./pages/dashboards/ShopOwnerDashboard";
import FarmerDashboard from "./pages/dashboards/FarmerDashboard";
import DeliveryAgentDashboard from "./pages/dashboards/DeliveryAgentDashboard";
import DeliveryAdminDashboard from "./pages/dashboards/DeliveryAdminDashboard";
import OverallAdminDashboard from "./pages/dashboards/OverallAdminDashboard";

// Admin pages
import AdminCustomers from "./pages/admin/Customers";
import AdminSettings from "./pages/admin/Settings";
import AdminDeliveryAdmins from "./pages/admin/DeliveryAdmins";
import AdminShopOwners from "./pages/admin/ShopOwners";
import AdminFarmers from "./pages/admin/Farmers";

// Farmer pages
import FarmerCoupons from "./pages/farmer/Coupons";
import FarmerProducts from "./pages/farmer/Products";
import FarmerOrders from "./pages/farmer/Orders";
import FarmerCustomers from "./pages/farmer/Customers";

// Shop Owner pages
import ShopOwnerProducts from "./pages/shop-owner/Products";
import ShopOwnerOrders from "./pages/shop-owner/Orders";
import ShopOwnerCustomers from "./pages/shop-owner/Customers";
import ShopOwnerCoupons from "./pages/shop-owner/Coupons";

// Customer pages
import CustomerOrders from "./pages/customer/Orders";
import CustomerFavorites from "./pages/customer/Favorites";
import CustomerAddresses from "./pages/customer/Addresses";

// Delivery Agent pages
import DeliveryAgentDeliveries from "./pages/delivery-agent/Deliveries";
import DeliveryAgentHistory from "./pages/delivery-agent/History";

// Delivery Admin pages
import DeliveryAdminAgents from "./pages/delivery-admin/Agents";
import DeliveryAdminDeliveries from "./pages/delivery-admin/Deliveries";
import DeliveryAdminReports from "./pages/delivery-admin/Reports";

// Profile pages
import Profile from "./pages/profile/Profile";

// Main site pages
import Products from "./pages/Products";
import Organic from "./pages/Organic";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";

// Create React Query client
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
            <Route path="/organic" element={<Organic />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/registration-pending" element={<RegistrationPending />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* Customer routes */}
            <Route path="/customer/dashboard" element={<CustomerDashboard />} />
            <Route path="/customer/orders" element={<CustomerOrders />} />
            <Route path="/customer/favorites" element={<CustomerFavorites />} />
            <Route path="/customer/addresses" element={<CustomerAddresses />} />
            
            {/* Shop owner routes */}
            <Route path="/shop-owner/dashboard" element={<ShopOwnerDashboard />} />
            <Route path="/shop-owner/products" element={<ShopOwnerProducts />} />
            <Route path="/shop-owner/orders" element={<ShopOwnerOrders />} />
            <Route path="/shop-owner/customers" element={<ShopOwnerCustomers />} />
            <Route path="/shop-owner/coupons" element={<ShopOwnerCoupons />} />
            
            {/* Farmer routes */}
            <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
            <Route path="/farmer/products" element={<FarmerProducts />} />
            <Route path="/farmer/orders" element={<FarmerOrders />} />
            <Route path="/farmer/customers" element={<FarmerCustomers />} />
            <Route path="/farmer/coupons" element={<FarmerCoupons />} />
            
            {/* Delivery agent routes */}
            <Route path="/delivery-agent/dashboard" element={<DeliveryAgentDashboard />} />
            <Route path="/delivery-agent/deliveries" element={<DeliveryAgentDeliveries />} />
            <Route path="/delivery-agent/history" element={<DeliveryAgentHistory />} />
            
            {/* Delivery admin routes */}
            <Route path="/delivery-admin/dashboard" element={<DeliveryAdminDashboard />} />
            <Route path="/delivery-admin/agents" element={<DeliveryAdminAgents />} />
            <Route path="/delivery-admin/deliveries" element={<DeliveryAdminDeliveries />} />
            <Route path="/delivery-admin/reports" element={<DeliveryAdminReports />} />
            
            {/* Overall admin routes */}
            <Route path="/admin/dashboard" element={<OverallAdminDashboard />} />
            <Route path="/admin/shop-owners" element={<AdminShopOwners />} />
            <Route path="/admin/farmers" element={<AdminFarmers />} />
            <Route path="/admin/delivery-admins" element={<AdminDeliveryAdmins />} />
            <Route path="/admin/customers" element={<AdminCustomers />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            
            {/* 404 catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
