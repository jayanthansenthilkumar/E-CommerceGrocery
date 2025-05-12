
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Truck, Mail, Phone, Calendar, CheckCircle, XCircle, MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock shop owners data
const mockDeliveryAdmins = [
  {
    id: "1",
    name: "City Express Logistics",
    adminName: "John Admin",
    email: "admin@cityexpress.com",
    phone: "555-123-4567",
    address: "123 Logistics Ave, San Francisco, CA",
    joinDate: "2025-01-05",
    status: "approved",
    agentsCount: 12,
    deliveriesCompleted: 358,
    averageRating: 4.7
  },
  {
    id: "2",
    name: "Swift Delivery Co.",
    adminName: "Sarah Swift",
    email: "sarah@swiftdelivery.com",
    phone: "555-987-6543",
    address: "456 Quick Road, Oakland, CA",
    joinDate: "2025-02-12",
    status: "approved",
    agentsCount: 8,
    deliveriesCompleted: 217,
    averageRating: 4.5
  },
  {
    id: "3",
    name: "City Runners Logistics",
    adminName: "Mike Runner",
    email: "mike@cityrunners.com",
    phone: "555-456-7890",
    address: "789 Sprint Street, Berkeley, CA",
    joinDate: "2025-03-30",
    status: "pending",
    agentsCount: 0,
    deliveriesCompleted: 0,
    averageRating: 0
  }
];

const AdminDeliveryAdmins = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deliveryAdmins, setDeliveryAdmins] = useState(mockDeliveryAdmins);
  const { toast } = useToast();
  
  // Filter delivery admins based on search
  const filteredAdmins = deliveryAdmins.filter(admin => {
    return searchTerm === "" || 
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.adminName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.address.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  const handleApproveAdmin = (adminId: string) => {
    setDeliveryAdmins(admins => admins.map(admin => 
      admin.id === adminId ? { ...admin, status: "approved" } : admin
    ));
    
    toast({
      title: "Delivery admin approved",
      description: "The delivery admin has been approved and can now operate on the platform.",
    });
  };
  
  const handleRejectAdmin = (adminId: string) => {
    setDeliveryAdmins(admins => admins.map(admin => 
      admin.id === adminId ? { ...admin, status: "rejected" } : admin
    ));
    
    toast({
      title: "Delivery admin rejected",
      description: "The delivery admin has been rejected and will not be able to operate on the platform.",
      variant: "destructive"
    });
  };
  
  const handleSuspendAdmin = (adminId: string) => {
    setDeliveryAdmins(admins => admins.map(admin => 
      admin.id === adminId ? { ...admin, status: "suspended" } : admin
    ));
    
    toast({
      title: "Delivery admin suspended",
      description: "The delivery admin has been suspended from the platform.",
      variant: "destructive"
    });
  };

  return (
    <DashboardLayout
      title="Delivery Admins"
      subtitle="Manage delivery admin companies on your platform"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search delivery admins..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Delivery Admin Companies
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredAdmins.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="p-3 text-xs uppercase tracking-wider font-medium text-gray-500">Company</th>
                    <th className="p-3 text-xs uppercase tracking-wider font-medium text-gray-500">Contact</th>
                    <th className="p-3 text-xs uppercase tracking-wider font-medium text-gray-500">Since</th>
                    <th className="p-3 text-xs uppercase tracking-wider font-medium text-gray-500">Performance</th>
                    <th className="p-3 text-xs uppercase tracking-wider font-medium text-gray-500">Status</th>
                    <th className="p-3 text-xs uppercase tracking-wider font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredAdmins.map((admin) => (
                    <tr key={admin.id} className="hover:bg-gray-50">
                      <td className="p-3 whitespace-nowrap">
                        <div>
                          <div className="font-medium text-gray-900">{admin.name}</div>
                          <div className="text-sm text-gray-500">{admin.adminName}</div>
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
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(admin.joinDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Agents:</span>
                            <span className="font-medium">{admin.agentsCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Deliveries:</span>
                            <span className="font-medium">{admin.deliveriesCompleted}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Rating:</span>
                            <span className="font-medium">{admin.averageRating > 0 ? admin.averageRating.toFixed(1) : "N/A"}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <Badge 
                          className={
                            admin.status === 'approved' ? 'bg-green-500' : 
                            admin.status === 'pending' ? 'bg-amber-500' : 
                            admin.status === 'rejected' ? 'bg-red-500' :
                            'bg-gray-500'
                          }
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
                              View Agents
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {admin.status === 'pending' && (
                              <>
                                <DropdownMenuItem 
                                  className="cursor-pointer text-green-600"
                                  onClick={() => handleApproveAdmin(admin.id)}
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="cursor-pointer text-red-600"
                                  onClick={() => handleRejectAdmin(admin.id)}
                                >
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Reject
                                </DropdownMenuItem>
                              </>
                            )}
                            {admin.status === 'approved' && (
                              <DropdownMenuItem 
                                className="cursor-pointer text-amber-600"
                                onClick={() => handleSuspendAdmin(admin.id)}
                              >
                                Suspend
                              </DropdownMenuItem>
                            )}
                            {(admin.status === 'rejected' || admin.status === 'suspended') && (
                              <DropdownMenuItem 
                                className="cursor-pointer text-green-600"
                                onClick={() => handleApproveAdmin(admin.id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Restore
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
              <Truck className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">No delivery admins found</p>
              <p className="text-gray-500">
                {searchTerm ? "Try a different search term" : "No delivery admin companies have registered yet"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default AdminDeliveryAdmins;
