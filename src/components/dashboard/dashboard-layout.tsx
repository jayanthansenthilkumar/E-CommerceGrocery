
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const DashboardLayout = ({ children, title, subtitle }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  // Redirect if no user is logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  if (!user) {
    return null; // Prevent rendering while redirecting
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-prisona-600 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-white text-prisona-600 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 9V5c0-1 .9-2 2-2h3.93a2 2 0 0 1 1.66.9L12 8"></path>
                  <path d="M2 13v6c0 1 .9 2 2 2h14.93a2 2 0 0 0 1.66-.9L22 12"></path>
                  <path d="M5 6v14"></path>
                  <path d="M22 6V4a2 2 0 0 0-2-2h-7"></path>
                  <path d="M16 12h-2.63a1 1 0 0 1-.79-.38l-1.74-2.13a1 1 0 0 0-.79-.38H6"></path>
                  <circle cx="14" cy="6" r="2"></circle>
                </svg>
              </div>
              <span className="text-xl font-playfair font-medium hidden md:inline">Prisona Store</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <span className="hidden md:inline text-sm font-medium">
                Welcome, {user.name}
              </span>
              
              <div className="relative group">
                <Button variant="outline" size="sm" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                  <span className="hidden md:inline mr-2">Account</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </Button>
                
                <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                  <div className="p-2">
                    <Link to="/" className="block px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-prisona-50">
                      Go to Store
                    </Link>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-prisona-50">
                      Profile Settings
                    </Link>
                    <button 
                      onClick={handleLogout} 
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 rounded-md hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-white border-r border-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800">
              {user.role === 'customer' ? 'Customer' : 
               user.role === 'shop_owner' ? 'Shop Owner' :
               user.role === 'farmer' ? 'Farmer' :
               user.role === 'delivery_agent' ? 'Delivery Agent' :
               user.role === 'delivery_admin' ? 'Delivery Admin' :
               'Admin'} Dashboard
            </h2>
          </div>
          
          <nav className="px-4 py-2">
            {user.role === 'customer' && (
              <ul className="space-y-1">
                <li>
                  <Link to="/customer/dashboard" className="block px-4 py-2 rounded-md text-prisona-800 hover:bg-prisona-50 hover:text-prisona-600">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/customer/orders" className="block px-4 py-2 rounded-md text-prisona-800 hover:bg-prisona-50 hover:text-prisona-600">
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link to="/customer/favorites" className="block px-4 py-2 rounded-md text-prisona-800 hover:bg-prisona-50 hover:text-prisona-600">
                    Favorites
                  </Link>
                </li>
                <li>
                  <Link to="/customer/addresses" className="block px-4 py-2 rounded-md text-prisona-800 hover:bg-prisona-50 hover:text-prisona-600">
                    Addresses
                  </Link>
                </li>
              </ul>
            )}
            
            {user.role === 'shop_owner' && (
              <ul className="space-y-1">
                <li>
                  <Link to="/shop-owner/dashboard" className="block px-4 py-2 rounded-md text-prisona-800 hover:bg-prisona-50 hover:text-prisona-600">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/shop-owner/products" className="block px-4 py-2 rounded-md text-prisona-800 hover:bg-prisona-50 hover:text-prisona-600">
                    My Products
                  </Link>
                </li>
                <li>
                  <Link to="/shop-owner/orders" className="block px-4 py-2 rounded-md text-prisona-800 hover:bg-prisona-50 hover:text-prisona-600">
                    Orders
                  </Link>
                </li>
                <li>
                  <Link to="/shop-owner/customers" className="block px-4 py-2 rounded-md text-prisona-800 hover:bg-prisona-50 hover:text-prisona-600">
                    Customers
                  </Link>
                </li>
                <li>
                  <Link to="/shop-owner/coupons" className="block px-4 py-2 rounded-md text-prisona-800 hover:bg-prisona-50 hover:text-prisona-600">
                    Coupon Codes
                  </Link>
                </li>
              </ul>
            )}
            
            {user.role === 'farmer' && (
              <ul className="space-y-1">
                <li>
                  <Link to="/farmer/dashboard" className="block px-4 py-2 rounded-md text-prisona-800 hover:bg-prisona-50 hover:text-prisona-600">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/farmer/products" className="block px-4 py-2 rounded-md text-prisona-800 hover:bg-prisona-50 hover:text-prisona-600">
                    My Products
                  </Link>
                </li>
                <li>
                  <Link to="/farmer/orders" className="block px-4 py-2 rounded-md text-prisona-800 hover:bg-prisona-50 hover:text-prisona-600">
                    Orders
                  </Link>
                </li>
                <li>
                  <Link to="/farmer/customers" className="block px-4 py-2 rounded-md text-prisona-800 hover:bg-prisona-50 hover:text-prisona-600">
                    Customers
                  </Link>
                </li>
                <li>
                  <Link to="/farmer/coupons" className="block px-4 py-2 rounded-md text-prisona-800 hover:bg-prisona-50 hover:text-prisona-600">
                    Coupon Codes
                  </Link>
                </li>
              </ul>
            )}
            
            {user.role === 'delivery_agent' && (
              <ul className="space-y-1">
                <li>
                  <Link to="/delivery-agent/dashboard" className="block px-4 py-2 rounded-md text-prisona-800 hover:bg-prisona-50 hover:text-prisona-600">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/delivery-agent/deliveries" className="block px-4 py-2 rounded-md text-prisona-800 hover:bg-prisona-50 hover:text-prisona-600">
                    My Deliveries
                  </Link>
                </li>
                <li>
                  <Link to="/delivery-agent/history" className="block px-4 py-2 rounded-md text-prisona-800 hover:bg-prisona-50 hover:text-prisona-600">
                    Delivery History
                  </Link>
                </li>
              </ul>
            )}
            
            {user.role === 'delivery_admin' && (
              <ul className="space-y-1">
                <li>
                  <Link to="/delivery-admin/dashboard" className="block px-4 py-2 rounded-md text-prisona-800 hover:bg-prisona-50 hover:text-prisona-600">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/delivery-admin/agents" className="block px-4 py-2 rounded-md text-prisona-800 hover:bg-prisona-50 hover:text-prisona-600">
                    Delivery Agents
                  </Link>
                </li>
                <li>
                  <Link to="/delivery-admin/deliveries" className="block px-4 py-2 rounded-md text-prisona-800 hover:bg-prisona-50 hover:text-prisona-600">
                    Deliveries
                  </Link>
                </li>
                <li>
                  <Link to="/delivery-admin/reports" className="block px-4 py-2 rounded-md text-prisona-800 hover:bg-prisona-50 hover:text-prisona-600">
                    Reports
                  </Link>
                </li>
              </ul>
            )}
            
            {user.role === 'overall_admin' && (
              <ul className="space-y-1">
                <li>
                  <Link to="/admin/dashboard" className="block px-4 py-2 rounded-md text-prisona-800 hover:bg-prisona-50 hover:text-prisona-600">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/admin/shop-owners" className="block px-4 py-2 rounded-md text-prisona-800 hover:bg-prisona-50 hover:text-prisona-600">
                    Shop Owners
                  </Link>
                </li>
                <li>
                  <Link to="/admin/farmers" className="block px-4 py-2 rounded-md text-prisona-800 hover:bg-prisona-50 hover:text-prisona-600">
                    Farmers
                  </Link>
                </li>
                <li>
                  <Link to="/admin/delivery-admins" className="block px-4 py-2 rounded-md text-prisona-800 hover:bg-prisona-50 hover:text-prisona-600">
                    Delivery Admins
                  </Link>
                </li>
                <li>
                  <Link to="/admin/customers" className="block px-4 py-2 rounded-md text-prisona-800 hover:bg-prisona-50 hover:text-prisona-600">
                    Customers
                  </Link>
                </li>
                <li>
                  <Link to="/admin/settings" className="block px-4 py-2 rounded-md text-prisona-800 hover:bg-prisona-50 hover:text-prisona-600">
                    Settings
                  </Link>
                </li>
              </ul>
            )}
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="flex-grow bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
            </div>
            
            {children}
          </div>
        </main>
      </div>
      
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Prisona Store. Developed by PrisolTech. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
