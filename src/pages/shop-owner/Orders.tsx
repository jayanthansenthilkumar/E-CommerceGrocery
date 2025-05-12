
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
  Package, 
  Calendar, 
  ArrowUpDown,
  User
} from "lucide-react";

interface Order {
  id: string;
  orderId: string;
  customerName: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

const Orders = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data for orders
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      orderId: "ORD-001",
      customerName: "John Doe",
      items: [
        { name: "Whole Grain Bread", quantity: 2, price: 4.99 },
        { name: "Local Cheese", quantity: 1, price: 7.49 }
      ],
      date: "2023-08-15",
      total: 17.47,
      status: 'delivered'
    },
    {
      id: "2",
      orderId: "ORD-002",
      customerName: "Jane Smith",
      items: [
        { name: "Organic Milk", quantity: 2, price: 3.49 },
        { name: "Fresh Pasta", quantity: 1, price: 4.99 }
      ],
      date: "2023-08-15",
      total: 11.97,
      status: 'shipped'
    },
    {
      id: "3",
      orderId: "ORD-003",
      customerName: "Robert Johnson",
      items: [
        { name: "Mixed Vegetables", quantity: 1, price: 6.99 },
        { name: "Whole Grain Bread", quantity: 1, price: 4.99 }
      ],
      date: "2023-08-16",
      total: 11.98,
      status: 'processing'
    },
    {
      id: "4",
      orderId: "ORD-004",
      customerName: "Sarah Williams",
      items: [
        { name: "Local Cheese", quantity: 2, price: 7.49 }
      ],
      date: "2023-08-16",
      total: 14.98,
      status: 'pending'
    },
    {
      id: "5",
      orderId: "ORD-005",
      customerName: "Michael Brown",
      items: [
        { name: "Organic Milk", quantity: 1, price: 3.49 },
        { name: "Fresh Pasta", quantity: 2, price: 4.99 }
      ],
      date: "2023-08-17",
      total: 13.47,
      status: 'pending'
    }
  ]);

  const updateOrderStatus = (id: string, newStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled') => {
    setOrders(prev => 
      prev.map(order => 
        order.id === id 
          ? { ...order, status: newStatus } 
          : order
      )
    );
    
    const order = orders.find(o => o.id === id);
    
    if (order) {
      toast({
        title: "Order status updated",
        description: `Order ${order.orderId} has been marked as ${newStatus}.`,
      });
    }
  };

  // Filter orders based on search term
  const filteredOrders = orders.filter(order => 
    order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Delivered</Badge>;
      case 'shipped':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Shipped</Badge>;
      case 'processing':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Processing</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <DashboardLayout title="Orders" subtitle="Manage customer orders for your shop products">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-prisona-600" />
            <span>All Orders</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
            <div className="relative md:w-80">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by order ID, customer, or product"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <div className="flex items-center">
                <label className="mr-2 text-sm whitespace-nowrap">Date:</label>
                <Input type="date" className="w-auto" />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  Filter
                </Button>
                <Button variant="outline">
                  Export
                </Button>
              </div>
            </div>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">
                    <Button variant="ghost" className="flex items-center p-0 h-auto">
                      Order ID
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>
                    <Button variant="ghost" className="flex items-center p-0 h-auto">
                      Date
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.orderId}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-500 mr-1" />
                        {order.customerName}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        {order.items.map((item, index) => (
                          <div key={index} className={index > 0 ? "mt-1" : ""}>
                            {item.quantity} x {item.name}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                        {order.date}
                      </div>
                    </TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      {getStatusBadge(order.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                        
                        {order.status === 'pending' && (
                          <Button 
                            size="sm"
                            onClick={() => updateOrderStatus(order.id, 'processing')}
                          >
                            Process
                          </Button>
                        )}
                        
                        {order.status === 'processing' && (
                          <Button 
                            size="sm"
                            onClick={() => updateOrderStatus(order.id, 'shipped')}
                          >
                            Ship
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredOrders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <p className="text-gray-500">No orders found</p>
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
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders
                .filter(order => order.status === 'pending')
                .slice(0, 3)
                .map((order) => (
                  <div key={order.id} className="flex items-center justify-between border rounded-lg p-4">
                    <div>
                      <div className="font-medium">{order.orderId}</div>
                      <div className="text-sm text-gray-500">{order.customerName}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'} · ${order.total.toFixed(2)}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      {getStatusBadge(order.status)}
                      <Button 
                        size="sm" 
                        className="mt-2"
                        onClick={() => updateOrderStatus(order.id, 'processing')}
                      >
                        Process
                      </Button>
                    </div>
                  </div>
                ))}
              
              {orders.filter(order => order.status === 'pending').length === 0 && (
                <div className="text-center py-6">
                  <p className="text-gray-500">No pending orders</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Order Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-prisona-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-prisona-700">{orders.length}</p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-700">
                  {orders.filter(order => order.status === 'pending').length}
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Processing/Shipped</p>
                <p className="text-2xl font-bold text-blue-700">
                  {orders.filter(order => 
                    order.status === 'processing' || order.status === 'shipped'
                  ).length}
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Delivered</p>
                <p className="text-2xl font-bold text-green-700">
                  {orders.filter(order => order.status === 'delivered').length}
                </p>
              </div>
            </div>
            
            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Orders;
