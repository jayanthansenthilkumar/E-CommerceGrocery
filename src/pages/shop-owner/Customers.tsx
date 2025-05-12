
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { 
  Search, 
  ArrowUpDown,
  User,
  Calendar,
  Mail
} from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
  lastOrderDate: string;
  status: 'active' | 'inactive';
}

const Customers = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data for customers
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      orders: 5,
      totalSpent: 87.35,
      lastOrder: "ORD-001",
      lastOrderDate: "2023-08-15",
      status: 'active'
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      orders: 3,
      totalSpent: 35.91,
      lastOrder: "ORD-002",
      lastOrderDate: "2023-08-15",
      status: 'active'
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert@example.com",
      orders: 2,
      totalSpent: 23.96,
      lastOrder: "ORD-003",
      lastOrderDate: "2023-08-16",
      status: 'active'
    },
    {
      id: "4",
      name: "Sarah Williams",
      email: "sarah@example.com",
      orders: 1,
      totalSpent: 14.98,
      lastOrder: "ORD-004",
      lastOrderDate: "2023-08-16",
      status: 'active'
    },
    {
      id: "5",
      name: "Michael Brown",
      email: "michael@example.com",
      orders: 1,
      totalSpent: 13.47,
      lastOrder: "ORD-005",
      lastOrderDate: "2023-08-17",
      status: 'active'
    },
    {
      id: "6",
      name: "Emily Davis",
      email: "emily@example.com",
      orders: 0,
      totalSpent: 0,
      lastOrder: "",
      lastOrderDate: "",
      status: 'inactive'
    }
  ]);

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (customer.lastOrder && customer.lastOrder.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sendEmail = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    
    if (customer) {
      toast({
        title: "Email sent",
        description: `Marketing email has been sent to ${customer.name}.`,
      });
    }
  };

  return (
    <DashboardLayout title="Customers" subtitle="View and manage customers who have purchased from your shop">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-prisona-600" />
            <span>Customer List</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
            <div className="relative md:w-80">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, or order ID"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                Export List
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>
                    <Button variant="ghost" className="flex items-center p-0 h-auto">
                      Orders
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" className="flex items-center p-0 h-auto">
                      Total Spent
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{customer.orders}</TableCell>
                    <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                    <TableCell>
                      {customer.lastOrder ? (
                        <div>
                          <div>{customer.lastOrder}</div>
                          <div className="text-xs text-gray-500 flex items-center mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            {customer.lastOrderDate}
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">No orders</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {customer.status === 'active' ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          Active
                        </Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                          Inactive
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex items-center gap-1"
                          onClick={() => sendEmail(customer.id)}
                        >
                          <Mail className="h-4 w-4" />
                          Contact
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredCustomers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <p className="text-gray-500">No customers found</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-prisona-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-prisona-700">{customers.length}</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Active Customers</p>
                <p className="text-2xl font-bold text-green-700">
                  {customers.filter(customer => customer.status === 'active').length}
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Avg. Order Value</p>
                <p className="text-2xl font-bold text-blue-700">
                  ${(customers.reduce((sum, customer) => sum + customer.totalSpent, 0) / 
                    customers.reduce((sum, customer) => sum + customer.orders, 0)).toFixed(2)}
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-purple-700">
                  ${customers.reduce((sum, customer) => sum + customer.totalSpent, 0).toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Marketing Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Target Customers</h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">All Customers</Button>
                  <Button size="sm" variant="outline" className="flex-1">Active Only</Button>
                  <Button size="sm" variant="outline" className="flex-1">Inactive Only</Button>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Campaigns</h3>
                <div className="space-y-2">
                  <Button className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Promotional Email
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <User className="h-4 w-4 mr-2" />
                    Customer Loyalty Program
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Customers;
