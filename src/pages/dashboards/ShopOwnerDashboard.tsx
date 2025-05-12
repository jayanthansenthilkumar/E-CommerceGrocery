
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { mockProducts, mockOrders } from "@/data/mock-data";
import { Link } from "react-router-dom";
import { Package, Users, ShoppingBag, Tag } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

const ShopOwnerDashboard = () => {
  const { user } = useAuth();
  
  // In a real app, we would filter these by vendor ID
  const shopProducts = mockProducts.filter(p => p.vendorType === 'shop_owner');
  
  // For demonstration, we're just using the mock orders
  const recentOrders = mockOrders.slice(0, 3);
  
  return (
    <DashboardLayout
      title={`Shop Dashboard`}
      subtitle="Manage your products, orders, and customers"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Products</p>
              <p className="text-2xl font-bold">{shopProducts.length}</p>
            </div>
            <div className="bg-prisona-100 p-2 rounded-full">
              <Package className="h-6 w-6 text-prisona-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Customers</p>
              <p className="text-2xl font-bold">24</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
              <p className="text-2xl font-bold">{recentOrders.length}</p>
            </div>
            <div className="bg-amber-100 p-2 rounded-full">
              <ShoppingBag className="h-6 w-6 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Coupons</p>
              <p className="text-2xl font-bold">1</p>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <Tag className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Recent Orders</CardTitle>
              <Link to="/shop-owner/orders" className="text-sm text-prisona-600 hover:text-prisona-700 font-medium">
                View All
              </Link>
            </CardHeader>
            <CardContent>
              {recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">Order #{order.id}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()} • Customer #{order.customerId}
                          </p>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'processing' ? 'bg-amber-100 text-amber-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-100 pt-2">
                        <p className="text-sm font-medium">
                          ${order.totalAmount.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {order.items.filter(item => item.vendorType === 'shop_owner').length} products from your shop
                        </p>
                      </div>
                      
                      <div className="mt-3 text-right">
                        <Link to={`/shop-owner/orders/${order.id}`} className="text-sm text-prisona-600 hover:text-prisona-700 font-medium">
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">No orders yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Shop Information</CardTitle>
              <Link to="/shop-owner/profile" className="text-sm text-prisona-600 hover:text-prisona-700 font-medium">
                Edit
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Shop Name</label>
                  <p>Natural Foods Market</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Owner</label>
                  <p>{user?.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p>{user?.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <p>{user?.phoneNumber || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <p className="text-green-600 font-medium">Approved</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Join Date</label>
                  <p>{new Date().toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <Link to="/shop-owner/products/add" className="bg-prisona-500 text-white w-full py-2 px-4 rounded-md text-center text-sm font-medium hover:bg-prisona-600 inline-block">
                  + Add New Product
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ShopOwnerDashboard;
