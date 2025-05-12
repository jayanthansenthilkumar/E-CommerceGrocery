
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

// Farmer pages
import FarmerCoupons from "./pages/farmer/Coupons";

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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/registration-pending" element={<RegistrationPending />} />
            
            {/* Customer routes */}
            <Route path="/customer/dashboard" element={<CustomerDashboard />} />
            
            {/* Shop owner routes */}
            <Route path="/shop-owner/dashboard" element={<ShopOwnerDashboard />} />
            
            {/* Farmer routes */}
            <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
            <Route path="/farmer/coupons" element={<FarmerCoupons />} />
            
            {/* Delivery agent routes */}
            <Route path="/delivery-agent/dashboard" element={<DeliveryAgentDashboard />} />
            
            {/* Delivery admin routes */}
            <Route path="/delivery-admin/dashboard" element={<DeliveryAdminDashboard />} />
            
            {/* Overall admin routes */}
            <Route path="/admin/dashboard" element={<OverallAdminDashboard />} />
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
