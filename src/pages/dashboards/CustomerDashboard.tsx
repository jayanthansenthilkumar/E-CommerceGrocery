
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { mockOrders } from "@/data/mock-data";
import { Link } from "react-router-dom";
import { ShoppingBag, Package, Heart, MapPin } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

const CustomerDashboard = () => {
  const { user } = useAuth();
  
  // Get recent orders (in a real app, this would filter by the customer's ID)
  const recentOrders = mockOrders.slice(0, 3);
  
  return (
    <DashboardLayout
      title={`Welcome back, ${user?.name.split(' ')[0] || 'Customer'}`}
      subtitle="Manage your orders and account details"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
              <p className="text-2xl font-bold">{recentOrders.length}</p>
            </div>
            <div className="bg-prisona-100 p-2 rounded-full">
              <ShoppingBag className="h-6 w-6 text-prisona-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Deliveries</p>
              <p className="text-2xl font-bold">1</p>
            </div>
            <div className="bg-amber-100 p-2 rounded-full">
              <Package className="h-6 w-6 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Favorites</p>
              <p className="text-2xl font-bold">5</p>
            </div>
            <div className="bg-red-100 p-2 rounded-full">
              <Heart className="h-6 w-6 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Saved Addresses</p>
              <p className="text-2xl font-bold">2</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Recent Orders</CardTitle>
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
                            {new Date(order.createdAt).toLocaleDateString()}
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
                        <p className="text-sm">
                          {order.items.reduce((acc, item) => acc + item.quantity, 0)} item(s) •{" "}
                          ${order.totalAmount.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                          {order.items.map(item => item.productName).join(', ')}
                        </p>
                      </div>
                      
                      <div className="mt-3 text-right">
                        <Link to={`/customer/orders/${order.id}`} className="text-sm text-prisona-600 hover:text-prisona-700 font-medium">
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">No orders yet.</p>
              )}
              
              {recentOrders.length > 0 && (
                <div className="mt-4 text-center">
                  <Link to="/customer/orders" className="text-sm text-prisona-600 hover:text-prisona-700 font-medium">
                    View All Orders
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <p>{user?.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p>{user?.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone Number</label>
                  <p>{user?.phoneNumber || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Default Address</label>
                  <p>{user?.address || 'No address saved'}</p>
                </div>
                
                <div className="pt-2">
                  <Link to="/profile" className="text-sm text-prisona-600 hover:text-prisona-700 font-medium">
                    Edit Profile
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;
