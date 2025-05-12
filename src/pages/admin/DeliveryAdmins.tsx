
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, TruckDelivery, Mail, Phone, Calendar, CheckCircle, XCircle, MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock delivery admins data
const mockDeliveryAdmins = [
  {
    id: "1",
    name: "Dave Delivery Admin",
    email: "delivery-admin@example.com",
    phone: "555-123-4567",
    region: "East Zone",
    joinDate: "2025-01-10",
    status: "active",
    agentsManaging: 8,
    deliveriesProcessed: 356,
  },
  {
    id: "2",
    name: "Elena Rodriguez",
    email: "elena@example.com",
    phone: "555-987-6543",
    region: "West Zone",
    joinDate: "2025-02-15",
    status: "active",
    agentsManaging: 5,
    deliveriesProcessed: 245,
  },
  {
    id: "3",
    name: "Frank Johnson",
    email: "frank@example.com",
    phone: "555-456-7890",
    region: "North Zone",
    joinDate: "2025-04-05",
    status: "pending",
    agentsManaging: 0,
    deliveriesProcessed: 0,
  },
  {
    id: "4",
    name: "Grace Williams",
    email: "grace@example.com",
    phone: "555-789-0123",
    region: "South Zone",
    joinDate: "2025-03-20",
    status: "active",
    agentsManaging: 6,
    deliveriesProcessed: 198,
  }
];

const AdminDeliveryAdmins = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deliveryAdmins, setDeliveryAdmins] = useState(mockDeliveryAdmins);
  const { toast } = useToast();
  
  // Filter delivery admins based on search
  const filteredDeliveryAdmins = deliveryAdmins.filter(admin => {
    return searchTerm === "" || 
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.phone.includes(searchTerm);
  });
  
  const handleApproveAdmin = (adminId: string) => {
    setDeliveryAdmins(admins => admins.map(admin => 
      admin.id === adminId ? { ...admin, status: "active" } : admin
    ));
    
    toast({
      title: "Admin approved",
      description: "The delivery admin has been approved and activated.",
    });
  };
  
  const handleBlockAdmin = (adminId: string) => {
    setDeliveryAdmins(admins => admins.map(admin => 
      admin.id === adminId ? { ...admin, status: "blocked" } : admin
    ));
    
    toast({
      title: "Admin blocked",
      description: "The delivery admin has been blocked from the platform.",
      variant: "destructive"
    });
  };
  
  const handleUnblockAdmin = (adminId: string) => {
    setDeliveryAdmins(admins => admins.map(admin => 
      admin.id === adminId ? { ...admin, status: "active" } : admin
    ));
    
    toast({
      title: "Admin unblocked",
      description: "The delivery admin has been unblocked and can now access the platform.",
    });
  };
  
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-amber-500';
      case 'blocked': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <DashboardLayout
      title="Delivery Admins"
      subtitle="Manage regional delivery administrators"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search admins..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="w-full sm:w-auto flex space-x-2">
          <Button className="flex items-center gap-2">
            <TruckDelivery className="h-4 w-4" />
            Add Delivery Admin
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <TruckDelivery className="h-5 w-5" />
            Delivery Administrators
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredDeliveryAdmins.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="p-3 text-xs uppercase tracking-wider font-medium text-gray-500">Admin</th>
                    <th className="p-3 text-xs uppercase tracking-wider font-medium text-gray-500">Contact</th>
                    <th className="p-3 text-xs uppercase tracking-wider font-medium text-gray-500">Region</th>
                    <th className="p-3 text-xs uppercase tracking-wider font-medium text-gray-500">Performance</th>
                    <th className="p-3 text-xs uppercase tracking-wider font-medium text-gray-500">Status</th>
                    <th className="p-3 text-xs uppercase tracking-wider font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredDeliveryAdmins.map((admin) => (
                    <tr key={admin.id} className="hover:bg-gray-50">
                      <td className="p-3 whitespace-nowrap">
                        <div>
                          <div className="font-medium text-gray-900">{admin.name}</div>
                          <div className="text-sm text-gray-500">ID: DA-{admin.id}</div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="text-sm">
                          <div className="flex items-center text-gray-600">
                            <Mail className="h-4 w-4 mr-2" />
                            {admin.email}
                          </div>
                          <div className="flex items-center text-gray-600 mt-1">
                            <Phone className="h-4 w-4 mr-2" />
                            {admin.phone}
                          </div>
                        </div>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <div className="text-gray-600">{admin.region}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          Since {new Date(admin.joinDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <span className="text-sm text-gray-500 mr-2">Agents:</span>
                            <span className="font-medium">{admin.agentsManaging}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm text-gray-500 mr-2">Deliveries:</span>
                            <span className="font-medium">{admin.deliveriesProcessed}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <Badge 
                          className={getStatusBadgeColor(admin.status)}
                        >
                          {admin.status.charAt(0).toUpperCase() + admin.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="cursor-pointer">
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              View Performance
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {admin.status === 'pending' && (
                              <DropdownMenuItem 
                                className="cursor-pointer text-green-600"
                                onClick={() => handleApproveAdmin(admin.id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve Admin
                              </DropdownMenuItem>
                            )}
                            {admin.status === 'active' && (
                              <DropdownMenuItem 
                                className="cursor-pointer text-red-600"
                                onClick={() => handleBlockAdmin(admin.id)}
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Block Admin
                              </DropdownMenuItem>
                            )}
                            {admin.status === 'blocked' && (
                              <DropdownMenuItem 
                                className="cursor-pointer text-green-600"
                                onClick={() => handleUnblockAdmin(admin.id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Unblock Admin
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10">
              <TruckDelivery className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">No delivery admins found</p>
              <p className="text-gray-500 mb-4">
                {searchTerm ? "Try a different search term" : "Add your first delivery admin to get started"}
              </p>
              {!searchTerm && (
                <Button>
                  <TruckDelivery className="h-4 w-4 mr-2" />
                  Add Delivery Admin
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default AdminDeliveryAdmins;
