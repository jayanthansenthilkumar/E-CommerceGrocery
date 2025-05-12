
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    
    switch (user.role) {
      case 'customer':
        return '/customer/dashboard';
      case 'shop_owner':
        return '/shop-owner/dashboard';
      case 'farmer':
        return '/farmer/dashboard';
      case 'delivery_agent':
        return '/delivery-agent/dashboard';
      case 'delivery_admin':
        return '/delivery-admin/dashboard';
      case 'overall_admin':
        return '/admin/dashboard';
      default:
        return '/login';
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-prisona-500 text-white p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
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
            <span className="text-xl font-playfair font-semibold text-prisona-700">Prisona Store</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link to="/" className="text-prisona-800 hover:text-prisona-500 font-medium">Home</Link>
            <Link to="/products" className="text-prisona-800 hover:text-prisona-500 font-medium">All Products</Link>
            <Link to="/organic" className="text-prisona-800 hover:text-prisona-500 font-medium">Organic</Link>
            <Link to="/about" className="text-prisona-800 hover:text-prisona-500 font-medium">About</Link>
            <Link to="/contact" className="text-prisona-800 hover:text-prisona-500 font-medium">Contact</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link to="/cart" className="text-prisona-800 hover:text-prisona-500">
                  <ShoppingCart className="w-6 h-6" />
                </Link>
                <div className="relative group">
                  <Button variant="outline" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {user.name.split(' ')[0]}
                  </Button>
                  <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                    <div className="p-2">
                      <Link to={getDashboardLink()} className="block px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-prisona-50">
                        Dashboard
                      </Link>
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-prisona-50">
                        Profile
                      </Link>
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 rounded-md hover:bg-red-50">
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            {user && (
              <Link to="/cart" className="text-prisona-800 hover:text-prisona-500 mr-2">
                <ShoppingCart className="w-6 h-6" />
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-3 py-3">
              <Link 
                to="/" 
                className="text-prisona-800 hover:text-prisona-500 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-prisona-800 hover:text-prisona-500 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                All Products
              </Link>
              <Link 
                to="/organic" 
                className="text-prisona-800 hover:text-prisona-500 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Organic
              </Link>
              <Link 
                to="/about" 
                className="text-prisona-800 hover:text-prisona-500 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-prisona-800 hover:text-prisona-500 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              {user ? (
                <>
                  <div className="border-t border-gray-200 my-2" />
                  <Link 
                    to={getDashboardLink()} 
                    className="text-prisona-800 hover:text-prisona-500 font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/profile" 
                    className="text-prisona-800 hover:text-prisona-500 font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }} 
                    className="text-red-600 hover:text-red-700 font-medium py-2 text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <div className="border-t border-gray-200 my-2" />
                  <Link 
                    to="/login" 
                    className="text-prisona-800 hover:text-prisona-500 font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="bg-prisona-500 text-white rounded-md font-medium py-2 px-4 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
