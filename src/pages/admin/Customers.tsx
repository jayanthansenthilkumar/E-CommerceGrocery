
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Users, Mail, Phone, Calendar, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock customers data
const mockCustomers = [
  {
    id: "1",
    name: "John Customer",
    email: "customer@example.com",
    phone: "555-123-4567",
    address: "123 Main St, San Francisco, CA 94105",
    joinDate: "2025-01-05",
    totalOrders: 12,
    totalSpent: 423.55,
    status: "active"
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah@example.com",
    phone: "555-987-6543",
    address: "456 Oak St, San Francisco, CA 94103",
    joinDate: "2025-02-10",
    totalOrders: 8,
    totalSpent: 285.20,
    status: "active"
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "555-456-7890",
    address: "789 Pine St, San Francisco, CA 94109",
    joinDate: "2025-03-15",
    totalOrders: 5,
    totalSpent: 176.80,
    status: "active"
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "555-789-0123",
    address: "101 Elm St, San Francisco, CA 94111",
    joinDate: "2025-04-20",
    totalOrders: 2,
    totalSpent: 89.95,
    status: "active"
  }
];

const AdminCustomers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers] = useState(mockCustomers);
  
  // Filter customers based on search
  const filteredCustomers = customers.filter(customer => {
    return searchTerm === "" || 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
  });

  return (
    <DashboardLayout
      title="Customers"
      subtitle="View and manage all customer accounts"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search customers..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="w-full sm:w-auto">
          <Button variant="outline">Export Data</Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Customer Database
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredCustomers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="p-3 text-xs uppercase tracking-wider font-medium text-gray-500">Customer</th>
                    <th className="p-3 text-xs uppercase tracking-wider font-medium text-gray-500">Contact</th>
                    <th className="p-3 text-xs uppercase tracking-wider font-medium text-gray-500">Joined</th>
                    <th className="p-3 text-xs uppercase tracking-wider font-medium text-gray-500">Activity</th>
                    <th className="p-3 text-xs uppercase tracking-wider font-medium text-gray-500">Status</th>
                    <th className="p-3 text-xs uppercase tracking-wider font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50">
                      <td className="p-3 whitespace-nowrap">
                        <div>
                          <div className="font-medium text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-500">ID: {customer.id}</div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="text-sm">
                          <div className="flex items-center text-gray-600">
                            <Mail className="h-4 w-4 mr-2" />
                            {customer.email}
                          </div>
                          <div className="flex items-center text-gray-600 mt-1">
                            <Phone className="h-4 w-4 mr-2" />
                            {customer.phone}
                          </div>
                        </div>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(customer.joinDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <span className="text-sm text-gray-500 mr-2">Orders:</span>
                            <span className="font-medium">{customer.totalOrders}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm text-gray-500 mr-2">Spent:</span>
                            <span className="font-medium">${customer.totalSpent.toFixed(2)}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <Badge className="bg-green-500">
                          Active
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
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              Order History
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer">
                              Send Message
                            </DropdownMenuItem>
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
              <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">No customers found</p>
              <p className="text-gray-500">
                {searchTerm ? "Try a different search term" : "No customers are registered yet"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default AdminCustomers;
