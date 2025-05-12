
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
  Store,
  Clock
} from "lucide-react";

interface Order {
  id: string;
  orderId: string;
  date: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  vendors: string[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  deliveryDate: string | null;
  trackingNumber: string | null;
}

const Orders = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data for orders
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      orderId: "ORD-001",
      date: "2023-08-15",
      items: [
        { name: "Organic Apples", quantity: 2, price: 3.99 },
        { name: "Farm Eggs", quantity: 1, price: 5.49 }
      ],
      vendors: ["Green Farm", "Happy Hens"],
      total: 13.47,
      status: 'delivered',
      deliveryDate: "2023-08-16",
      trackingNumber: "TRK12345"
    },
    {
      id: "2",
      orderId: "ORD-002",
      date: "2023-08-15",
      items: [
        { name: "Whole Grain Bread", quantity: 1, price: 4.99 },
        { name: "Local Cheese", quantity: 1, price: 7.49 }
      ],
      vendors: ["Fresh Market"],
      total: 12.48,
      status: 'shipped',
      deliveryDate: "2023-08-18",
      trackingNumber: "TRK23456"
    },
    {
      id: "3",
      orderId: "ORD-003",
      date: "2023-08-16",
      items: [
        { name: "Fresh Carrots", quantity: 1, price: 2.49 },
        { name: "Organic Spinach", quantity: 1, price: 3.99 }
      ],
      vendors: ["Green Farm"],
      total: 6.48,
      status: 'processing',
      deliveryDate: null,
      trackingNumber: null
    },
    {
      id: "4",
      orderId: "ORD-004",
      date: "2023-08-17",
      items: [
        { name: "Mixed Vegetables", quantity: 1, price: 6.99 }
      ],
      vendors: ["Fresh Market"],
      total: 6.99,
      status: 'pending',
      deliveryDate: null,
      trackingNumber: null
    }
  ]);

  // Filter orders based on search term
  const filteredOrders = orders.filter(order => 
    order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.vendors.some(vendor => vendor.toLowerCase().includes(searchTerm.toLowerCase())) ||
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
    <DashboardLayout title="My Orders" subtitle="Track and manage your purchases">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-prisona-600" />
            <span>Order History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
            <div className="relative md:w-80">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by order ID, vendor, or product"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <label className="mr-2 text-sm whitespace-nowrap">Date:</label>
                <Input type="date" className="w-auto" />
              </div>
              <Button variant="outline">
                Filter
              </Button>
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
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Vendors</TableHead>
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
                        <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                        {order.date}
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
                      <div>
                        {order.vendors.map((vendor, index) => (
                          <div key={index} className="flex items-center">
                            <Store className="h-4 w-4 text-gray-500 mr-1" />
                            {vendor}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      {getStatusBadge(order.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            toast({
                              title: "Order details",
                              description: `Order details for ${order.orderId} are displayed.`,
                            });
                          }}
                        >
                          View
                        </Button>
                        
                        {(order.status === 'delivered' || order.status === 'shipped') && (
                          <Button 
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              toast({
                                title: "Track order",
                                description: `Tracking information for ${order.orderId}: ${order.trackingNumber}`,
                              });
                            }}
                          >
                            Track
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
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders
                .filter(order => order.status !== 'delivered' && order.status !== 'cancelled')
                .sort((a, b) => {
                  const statusPriority = {
                    shipped: 1,
                    processing: 2,
                    pending: 3
                  };
                  return statusPriority[a.status as keyof typeof statusPriority] - 
                         statusPriority[b.status as keyof typeof statusPriority];
                })
                .map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">{order.orderId}</div>
                        <div className="text-sm text-gray-500">{order.date}</div>
                      </div>
                      <div className="text-right">
                        <div>{getStatusBadge(order.status)}</div>
                        <div className="text-sm font-medium mt-1">${order.total.toFixed(2)}</div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      {order.status === 'shipped' && order.deliveryDate && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Expected delivery: {order.deliveryDate}</span>
                        </div>
                      )}
                      
                      <div className="mt-2 flex justify-end">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            toast({
                              title: "Order details",
                              description: `Order details for ${order.orderId} are displayed.`,
                            });
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              
              {orders.filter(order => 
                order.status !== 'delivered' && order.status !== 'cancelled'
              ).length === 0 && (
                <div className="text-center py-6">
                  <p className="text-gray-500">No active orders</p>
                  <Button className="mt-4">Start Shopping</Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-prisona-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-prisona-700">{orders.length}</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Delivered</p>
                <p className="text-2xl font-bold text-green-700">
                  {orders.filter(order => order.status === 'delivered').length}
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-blue-700">
                  {orders.filter(order => 
                    order.status === 'processing' || order.status === 'shipped'
                  ).length}
                </p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-700">
                  {orders.filter(order => order.status === 'pending').length}
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium text-gray-900 mb-3">Shopping History</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                </p>
                <div className="text-sm text-gray-500 mt-1">
                  Across {orders.length} orders
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Orders;
