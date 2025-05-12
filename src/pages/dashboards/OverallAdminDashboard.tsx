
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { mockProducts, mockOrders } from "@/data/mock-data";
import { Link } from "react-router-dom";
import { Users, Store, ShoppingBag, Leaf, Truck } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";

const OverallAdminDashboard = () => {
  const { user } = useAuth();
  
  // For demonstration, we're just using some mock data
  const totalCustomers = 138;
  const totalShopOwners = 12;
  const totalFarmers = 8;
  const totalDeliveryAgents = 15;
  const totalDeliveryAdmins = 3;
  
  // Mock pending approvals
  const pendingApprovals = [
    { id: '1', type: 'shop_owner', name: 'Natural Grocery', requestedBy: 'John Smith', time: '2 hours ago' },
    { id: '2', type: 'farmer', name: 'Green Fields Farm', requestedBy: 'Anna Johnson', time: '5 hours ago' },
    { id: '3', type: 'delivery_admin', name: 'West Region Admin', requestedBy: 'Mark Wilson', time: '1 day ago' },
    { id: '4', type: 'shop_owner', name: 'Organic Basket', requestedBy: 'Lisa Brown', time: '2 days ago' },
  ];
  
  return (
    <DashboardLayout
      title={`Overall Admin Dashboard`}
      subtitle="System-wide administration and monitoring"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Customers</p>
              <p className="text-2xl font-bold">{totalCustomers}</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Shop Owners</p>
              <p className="text-2xl font-bold">{totalShopOwners}</p>
            </div>
            <div className="bg-prisona-100 p-2 rounded-full">
              <Store className="h-6 w-6 text-prisona-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Farmers</p>
              <p className="text-2xl font-bold">{totalFarmers}</p>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Delivery Agents</p>
              <p className="text-2xl font-bold">{totalDeliveryAgents}</p>
            </div>
            <div className="bg-amber-100 p-2 rounded-full">
              <Truck className="h-6 w-6 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Delivery Admins</p>
              <p className="text-2xl font-bold">{totalDeliveryAdmins}</p>
            </div>
            <div className="bg-purple-100 p-2 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Pending Approvals</CardTitle>
              <Link to="/admin/approvals" className="text-sm text-prisona-600 hover:text-prisona-700 font-medium">
                View All
              </Link>
            </CardHeader>
            <CardContent>
              {pendingApprovals.length > 0 ? (
                <div className="space-y-4">
                  {pendingApprovals.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            {item.type === 'shop_owner' ? 'Shop Owner' : 
                            item.type === 'farmer' ? 'Farmer' :
                            item.type === 'delivery_admin' ? 'Delivery Admin' : 'Account'} Application
                          </p>
                        </div>
                        <span className="text-xs text-gray-500">{item.time}</span>
                      </div>
                      <p className="text-sm mb-3">
                        Requested by: {item.requestedBy}
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="default" className="bg-prisona-500 hover:bg-prisona-600">
                          Approve
                        </Button>
                        <Button size="sm" variant="outline">
                          Reject
                        </Button>
                        <Button size="sm" variant="ghost" className="ml-auto">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-6">No pending approvals.</p>
              )}
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">System Overview</CardTitle>
              <Button variant="outline" size="sm">
                Generate Report
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Products</h3>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Total Products</span>
                        <span className="text-sm text-gray-500">{mockProducts.length}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-prisona-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Shop Products</span>
                        <span className="text-sm text-gray-500">
                          {mockProducts.filter(p => p.vendorType === 'shop_owner').length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Farm Products</span>
                        <span className="text-sm text-gray-500">
                          {mockProducts.filter(p => p.vendorType === 'farmer').length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Organic Products</span>
                        <span className="text-sm text-gray-500">
                          {mockProducts.filter(p => p.isOrganic).length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '55%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Orders</h3>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Total Orders</span>
                        <span className="text-sm text-gray-500">{mockOrders.length}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-prisona-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Pending</span>
                        <span className="text-sm text-gray-500">
                          {mockOrders.filter(o => o.status === 'pending').length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Processing</span>
                        <span className="text-sm text-gray-500">
                          {mockOrders.filter(o => o.status === 'processing').length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Delivered</span>
                        <span className="text-sm text-gray-500">
                          {mockOrders.filter(o => o.status === 'delivered').length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Admin Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <Link to="/admin/shop-owners/approve" className="bg-prisona-500 text-white w-full py-2 px-4 rounded-md text-sm font-medium hover:bg-prisona-600 flex items-center justify-center">
                    <Store className="h-4 w-4 mr-2" />
                    Approve Shop Owners
                  </Link>
                </div>
                <div>
                  <Link to="/admin/farmers/approve" className="bg-green-600 text-white w-full py-2 px-4 rounded-md text-sm font-medium hover:bg-green-700 flex items-center justify-center">
                    <Leaf className="h-4 w-4 mr-2" />
                    Approve Farmers
                  </Link>
                </div>
                <div>
                  <Link to="/admin/delivery-admins/approve" className="bg-amber-600 text-white w-full py-2 px-4 rounded-md text-sm font-medium hover:bg-amber-700 flex items-center justify-center">
                    <Users className="h-4 w-4 mr-2" />
                    Approve Delivery Admins
                  </Link>
                </div>
                <div className="py-2">
                  <div className="border-t border-gray-200"></div>
                </div>
                <div>
                  <Link to="/admin/reports" className="bg-gray-100 text-gray-800 w-full py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-200 flex items-center justify-center">
                    Generate System Report
                  </Link>
                </div>
                <div>
                  <Link to="/admin/settings" className="bg-gray-100 text-gray-800 w-full py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-200 flex items-center justify-center">
                    System Settings
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-xl">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="bg-blue-100 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">New customer</span> registered
                    </p>
                    <p className="text-xs text-gray-500">10 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="bg-green-100 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <Leaf className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Green Hills Farm</span> added 3 new products
                    </p>
                    <p className="text-xs text-gray-500">1 hour ago</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="bg-amber-100 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <Store className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Natural Foods Market</span> updated their profile
                    </p>
                    <p className="text-xs text-gray-500">3 hours ago</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="bg-prisona-100 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <ShoppingBag className="h-4 w-4 text-prisona-600" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">5 new orders</span> were placed
                    </p>
                    <p className="text-xs text-gray-500">Today</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <Link to="/admin/activity" className="text-sm text-prisona-600 hover:text-prisona-700 font-medium">
                  View All Activity
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OverallAdminDashboard;
