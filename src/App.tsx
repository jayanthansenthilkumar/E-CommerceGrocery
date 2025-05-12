
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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/registration-pending" element={<RegistrationPending />} />
            
            {/* Customer routes */}
            <Route path="/customer/dashboard" element={<CustomerDashboard />} />
            <Route path="/customer/orders" element={<CustomerDashboard />} />
            <Route path="/customer/favorites" element={<CustomerDashboard />} />
            <Route path="/customer/addresses" element={<CustomerDashboard />} />
            
            {/* Shop owner routes */}
            <Route path="/shop-owner/dashboard" element={<ShopOwnerDashboard />} />
            <Route path="/shop-owner/products" element={<ShopOwnerDashboard />} />
            <Route path="/shop-owner/orders" element={<ShopOwnerDashboard />} />
            <Route path="/shop-owner/customers" element={<ShopOwnerDashboard />} />
            <Route path="/shop-owner/coupons" element={<ShopOwnerDashboard />} />
            
            {/* Farmer routes */}
            <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
            <Route path="/farmer/products" element={<FarmerDashboard />} />
            <Route path="/farmer/orders" element={<FarmerDashboard />} />
            <Route path="/farmer/customers" element={<FarmerDashboard />} />
            <Route path="/farmer/coupons" element={<FarmerDashboard />} />
            
            {/* Delivery agent routes */}
            <Route path="/delivery-agent/dashboard" element={<DeliveryAgentDashboard />} />
            <Route path="/delivery-agent/deliveries" element={<DeliveryAgentDashboard />} />
            <Route path="/delivery-agent/history" element={<DeliveryAgentDashboard />} />
            
            {/* Delivery admin routes */}
            <Route path="/delivery-admin/dashboard" element={<DeliveryAdminDashboard />} />
            <Route path="/delivery-admin/agents" element={<DeliveryAdminDashboard />} />
            <Route path="/delivery-admin/deliveries" element={<DeliveryAdminDashboard />} />
            <Route path="/delivery-admin/reports" element={<DeliveryAdminDashboard />} />
            
            {/* Overall admin routes */}
            <Route path="/admin/dashboard" element={<OverallAdminDashboard />} />
            <Route path="/admin/shop-owners" element={<OverallAdminDashboard />} />
            <Route path="/admin/farmers" element={<OverallAdminDashboard />} />
            <Route path="/admin/delivery-admins" element={<OverallAdminDashboard />} />
            <Route path="/admin/customers" element={<OverallAdminDashboard />} />
            <Route path="/admin/settings" element={<OverallAdminDashboard />} />
            
            {/* 404 catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
