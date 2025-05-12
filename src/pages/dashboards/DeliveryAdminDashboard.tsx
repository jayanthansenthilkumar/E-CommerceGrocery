
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { mockOrders } from "@/data/mock-data";
import { Link } from "react-router-dom";
import { Users, Package, CheckCircle, Clock } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";

const DeliveryAdminDashboard = () => {
  const { user } = useAuth();
  
  // For demonstration, we're just using some mock data
  const totalDeliveries = 152;
  const pendingDeliveries = 12;
  const totalAgents = 8;
  const activeAgents = 5;
  
  // Mock agents data
  const agents = [
    { id: '4', name: 'Carol Delivery Agent', status: 'active', deliveries: 3, performance: 98 },
    { id: '7', name: 'Mike Delivery', status: 'active', deliveries: 2, performance: 95 },
    { id: '8', name: 'Emma Handler', status: 'active', deliveries: 1, performance: 92 },
    { id: '9', name: 'Tony Carrier', status: 'active', deliveries: 0, performance: 88 },
    { id: '10', name: 'Lisa Express', status: 'offline', deliveries: 0, performance: 90 },
  ];
  
  return (
    <DashboardLayout
      title={`Delivery Admin Dashboard`}
      subtitle="Manage delivery agents and monitor deliveries"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Deliveries</p>
              <p className="text-2xl font-bold">{totalDeliveries}</p>
            </div>
            <div className="bg-prisona-100 p-2 rounded-full">
              <Package className="h-6 w-6 text-prisona-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending Deliveries</p>
              <p className="text-2xl font-bold">{pendingDeliveries}</p>
            </div>
            <div className="bg-amber-100 p-2 rounded-full">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Agents</p>
              <p className="text-2xl font-bold">{totalAgents}</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Agents</p>
              <p className="text-2xl font-bold">{activeAgents}</p>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Delivery Agents</CardTitle>
              <Link to="/delivery-admin/agents" className="text-sm text-prisona-600 hover:text-prisona-700 font-medium">
                View All
              </Link>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-2 font-medium">Agent</th>
                      <th className="pb-2 font-medium">Status</th>
                      <th className="pb-2 font-medium">Current Deliveries</th>
                      <th className="pb-2 font-medium">Performance</th>
                      <th className="pb-2 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {agents.map((agent) => (
                      <tr key={agent.id} className="border-b last:border-0">
                        <td className="py-3 font-medium">{agent.name}</td>
                        <td className="py-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            agent.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {agent.status === 'active' ? 'Active' : 'Offline'}
                          </span>
                        </td>
                        <td className="py-3">{agent.deliveries}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-gray-200 rounded-full h-1.5">
                              <div 
                                className={`h-1.5 rounded-full ${
                                  agent.performance >= 95 ? 'bg-green-500' : 
                                  agent.performance >= 90 ? 'bg-green-400' : 
                                  agent.performance >= 85 ? 'bg-amber-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${agent.performance}%` }}
                              ></div>
                            </div>
                            <span className="text-xs">{agent.performance}%</span>
                          </div>
                        </td>
                        <td className="py-3 text-right">
                          <Link to={`/delivery-admin/agents/${agent.id}`} className="text-prisona-600 hover:text-prisona-700 font-medium">
                            Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 text-center">
                <Link to="/delivery-admin/agents/add" className="bg-prisona-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-prisona-600 inline-block">
                  + Add New Agent
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Current Deliveries</CardTitle>
              <Link to="/delivery-admin/deliveries" className="text-sm text-prisona-600 hover:text-prisona-700 font-medium">
                View All
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOrders.slice(0, 3).map((delivery) => (
                  <div key={delivery.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium">Delivery #{delivery.id}</p>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        delivery.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        delivery.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {delivery.status.charAt(0).toUpperCase() + delivery.status.slice(1)}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-2">
                      <div>
                        <p className="text-xs text-gray-500">Customer</p>
                        <p className="text-sm">#{delivery.customerId}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Agent</p>
                        <p className="text-sm">{delivery.deliveryAgentId || 'Unassigned'}</p>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-2 mt-2 flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {new Date(delivery.createdAt).toLocaleDateString()}
                      </span>
                      <Link to={`/delivery-admin/deliveries/${delivery.id}`} className="text-sm text-prisona-600 hover:text-prisona-700 font-medium">
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Admin Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <p>{user?.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Admin ID</label>
                  <p>DA-{user?.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p>{user?.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Region</label>
                  <p>East Zone</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <p className="text-green-600 font-medium">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-xl">Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="border border-amber-200 bg-amber-50 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium">New Agent Request</p>
                    <span className="text-xs text-gray-500">2 hours ago</span>
                  </div>
                  <p className="text-sm mb-3">Alex Johnson has applied to be a delivery agent.</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="default" className="w-full bg-prisona-500 hover:bg-prisona-600">
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="w-full">
                      Reject
                    </Button>
                  </div>
                </div>
                
                <div className="border border-amber-200 bg-amber-50 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium">New Agent Request</p>
                    <span className="text-xs text-gray-500">1 day ago</span>
                  </div>
                  <p className="text-sm mb-3">Sarah Miller has applied to be a delivery agent.</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="default" className="w-full bg-prisona-500 hover:bg-prisona-600">
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="w-full">
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <Link to="/delivery-admin/approvals" className="text-sm text-prisona-600 hover:text-prisona-700 font-medium">
                  View All Pending Approvals
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-xl">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Create New Agent ID
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Package className="mr-2 h-4 w-4" />
                  Assign Unassigned Deliveries
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Generate Delivery Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DeliveryAdminDashboard;
