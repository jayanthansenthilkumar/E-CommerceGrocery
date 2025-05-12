
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { mockOrders } from "@/data/mock-data";
import { Link } from "react-router-dom";
import { MapPin, Package, CheckCircle, Clock } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const DeliveryAgentDashboard = () => {
  const { user } = useAuth();
  const [isAvailable, setIsAvailable] = useState(true);
  
  // In a real app, these would be orders assigned to this delivery agent
  const pendingDeliveries = mockOrders.filter(order => 
    order.status === 'processing' || order.status === 'shipped'
  );
  
  const handleToggleAvailability = () => {
    setIsAvailable(!isAvailable);
    // In a real app, this would update the agent's status in the backend
  };
  
  return (
    <DashboardLayout
      title={`Delivery Agent Dashboard`}
      subtitle="Manage your deliveries and availability"
    >
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-semibold mb-1">Current Status</h2>
              <p className={`text-sm ${isAvailable ? 'text-green-600' : 'text-gray-500'}`}>
                {isAvailable ? 'Available for deliveries' : 'Not available'}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="availability"
                  checked={isAvailable}
                  onCheckedChange={handleToggleAvailability}
                />
                <Label htmlFor="availability">Toggle Availability</Label>
              </div>
              
              <Button size="sm" variant="outline">
                <MapPin className="mr-1 h-4 w-4" /> Update Location
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending Deliveries</p>
              <p className="text-2xl font-bold">2</p>
            </div>
            <div className="bg-amber-100 p-2 rounded-full">
              <Package className="h-6 w-6 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Completed Today</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Average Time</p>
              <p className="text-2xl font-bold">28m</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Your Next Deliveries</CardTitle>
            </CardHeader>
            <CardContent>
              {pendingDeliveries.length > 0 ? (
                <div className="space-y-4">
                  {pendingDeliveries.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-medium">Order #{order.id}</p>
                          <p className="text-sm text-gray-500">
                            Customer #{order.customerId}
                          </p>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 mb-3">
                        <div className="bg-gray-100 p-2 rounded">
                          <MapPin className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Delivery Address</p>
                          <p className="text-xs text-gray-500">{order.shippingAddress}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-gray-100 p-2 rounded">
                          <Package className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Package Details</p>
                          <p className="text-xs text-gray-500">
                            {order.items.reduce((acc, item) => acc + item.quantity, 0)} items •{" "}
                            Code: {order.deliveryCode || 'N/A'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-100 pt-3 mt-3 flex justify-between items-center">
                        <span className="text-sm font-medium">{order.status === 'shipped' ? 'Out for delivery' : 'Ready for pickup'}</span>
                        <Link to={`/delivery-agent/deliveries/${order.id}`} className="text-sm text-prisona-600 hover:text-prisona-700 font-medium">
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                  <p className="text-gray-500">No pending deliveries</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <p>{user?.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">ID</label>
                  <p>DA-{user?.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Contact Phone</label>
                  <p>{user?.phoneNumber || '(555) 123-4567'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p>{user?.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Assigned Admin</label>
                  <p>Dave Delivery Admin</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <p className="text-green-600 font-medium">Approved</p>
                </div>
              </div>
              
              <div className="mt-6">
                <Link to="/delivery-agent/history" className="bg-prisona-500 text-white w-full py-2 px-4 rounded-md text-center text-sm font-medium hover:bg-prisona-600 inline-block">
                  View Delivery History
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-xl">Delivery Codes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Remember to always verify delivery codes with both customers and shop owners before completing deliveries.
              </p>
              
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <h4 className="font-medium text-amber-800 mb-2">Active Codes</h4>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-sm">Order #1:</span>
                    <span className="font-mono font-bold">7D9A2F</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-sm">Order #2:</span>
                    <span className="font-mono font-bold">3B8C5E</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DeliveryAgentDashboard;
