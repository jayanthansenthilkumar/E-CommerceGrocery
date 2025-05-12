
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDistance } from "date-fns";
import { Search, Filter, CalendarIcon, Package, Clock, ShoppingBag, Check, X, Truck, MoreHorizontal, Eye, Calendar as CalendarIcon2, FileText } from "lucide-react";

// Mock orders data
interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
  image: string;
}

interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

const mockOrders: Order[] = [
  {
    id: "ORD-1234",
    customerId: "CUST-5678",
    customerName: "John Smith",
    customerEmail: "john@example.com",
    status: "delivered",
    items: [
      {
        id: "ITEM-1",
        name: "Organic Apples",
        quantity: 2,
        price: 3.99,
        total: 7.98,
        image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb"
      },
      {
        id: "ITEM-2",
        name: "Organic Carrots",
        quantity: 1,
        price: 2.99,
        total: 2.99,
        image: "https://images.unsplash.com/photo-1598170845058-60f7a3c18eab"
      }
    ],
    totalAmount: 10.97,
    shippingAddress: "123 Main St, San Francisco, CA 94105",
    paymentMethod: "Credit Card",
    createdAt: "2025-04-10T10:30:00Z",
    updatedAt: "2025-04-12T15:45:00Z"
  },
  {
    id: "ORD-2345",
    customerId: "CUST-6789",
    customerName: "Emma Johnson",
    customerEmail: "emma@example.com",
    status: "shipped",
    items: [
      {
        id: "ITEM-3",
        name: "Honey",
        quantity: 1,
        price: 8.50,
        total: 8.50,
        image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924"
      }
    ],
    totalAmount: 8.50,
    shippingAddress: "456 Oak St, San Francisco, CA 94108",
    paymentMethod: "PayPal",
    createdAt: "2025-05-05T09:15:00Z",
    updatedAt: "2025-05-06T11:20:00Z"
  },
  {
    id: "ORD-3456",
    customerId: "CUST-7890",
    customerName: "Michael Brown",
    customerEmail: "michael@example.com",
    status: "processing",
    items: [
      {
        id: "ITEM-4",
        name: "Fresh Eggs",
        quantity: 2,
        price: 5.99,
        total: 11.98,
        image: "https://images.unsplash.com/photo-1489726933853-010eb1484d1a"
      },
      {
        id: "ITEM-5",
        name: "Organic Carrots",
        quantity: 3,
        price: 2.99,
        total: 8.97,
        image: "https://images.unsplash.com/photo-1598170845058-60f7a3c18eab"
      }
    ],
    totalAmount: 20.95,
    shippingAddress: "789 Pine St, San Francisco, CA 94111",
    paymentMethod: "Credit Card",
    createdAt: "2025-05-10T14:20:00Z",
    updatedAt: "2025-05-10T16:30:00Z"
  },
  {
    id: "ORD-4567",
    customerId: "CUST-8901",
    customerName: "Sarah Davis",
    customerEmail: "sarah@example.com",
    status: "pending",
    items: [
      {
        id: "ITEM-6",
        name: "Seasonal Berries Mix",
        quantity: 2,
        price: 6.99,
        total: 13.98,
        image: "https://images.unsplash.com/photo-1549301014-95d119f5c960"
      }
    ],
    totalAmount: 13.98,
    shippingAddress: "101 Market St, San Francisco, CA 94103",
    paymentMethod: "PayPal",
    createdAt: "2025-05-11T11:05:00Z",
    updatedAt: "2025-05-11T11:05:00Z"
  },
  {
    id: "ORD-5678",
    customerId: "CUST-9012",
    customerName: "Robert Wilson",
    customerEmail: "robert@example.com",
    status: "cancelled",
    items: [
      {
        id: "ITEM-7",
        name: "Organic Apples",
        quantity: 3,
        price: 3.99,
        total: 11.97,
        image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb"
      }
    ],
    totalAmount: 11.97,
    shippingAddress: "222 Mission St, San Francisco, CA 94105",
    paymentMethod: "Credit Card",
    createdAt: "2025-05-08T16:40:00Z",
    updatedAt: "2025-05-09T10:15:00Z"
  }
];

const FarmerOrders = () => {
  const [orders] = useState<Order[]>(mockOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  // Filter orders based on search, status and date
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = !statusFilter || order.status === statusFilter;
    
    const matchesDate = !date || new Date(order.createdAt).toDateString() === date.toDateString();
    
    return matchesSearch && matchesStatus && matchesDate;
  });
  
  // Get count of orders by status
  const getOrderCountByStatus = (status: string) => {
    return orders.filter(order => order.status === status).length;
  };
  
  const handleViewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
  };
  
  const getStatusBadgeColors = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "processing":
        return <Package className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <Check className="h-4 w-4" />;
      case "cancelled":
        return <X className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  return (
    <DashboardLayout
      title="Orders"
      subtitle="Manage and track your orders from customers"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold">{orders.length}</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <ShoppingBag className="h-5 w-5 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Processing</p>
              <p className="text-2xl font-bold">{getOrderCountByStatus("processing")}</p>
            </div>
            <div className="bg-amber-100 p-2 rounded-full">
              <Package className="h-5 w-5 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Shipped</p>
              <p className="text-2xl font-bold">{getOrderCountByStatus("shipped")}</p>
            </div>
            <div className="bg-purple-100 p-2 rounded-full">
              <Truck className="h-5 w-5 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Delivered</p>
              <p className="text-2xl font-bold">{getOrderCountByStatus("delivered")}</p>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <Check className="h-5 w-5 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-3 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle>Order Management</CardTitle>
            
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-[200px]"
                />
              </div>
              
              <Select
                value={statusFilter || ""}
                onValueChange={(value) => setStatusFilter(value || null)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[180px] justify-start">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? date.toLocaleDateString() : "Filter by date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                  {date && (
                    <div className="p-2 border-t border-border">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => setDate(null)}
                      >
                        Clear Date
                      </Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="recent">Recent Orders</TabsTrigger>
              <TabsTrigger value="pending">Pending Actions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="rounded-md border overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50 text-sm">
                      <th className="py-3 px-4 text-left font-semibold">Order ID</th>
                      <th className="py-3 px-4 text-left font-semibold">Customer</th>
                      <th className="py-3 px-4 text-left font-semibold">Date</th>
                      <th className="py-3 px-4 text-left font-semibold">Total</th>
                      <th className="py-3 px-4 text-left font-semibold">Status</th>
                      <th className="py-3 px-4 text-left font-semibold">Actions</th>
                    </tr>
                  </thead>
                  
                  <tbody className="divide-y">
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-muted/20">
                          <td className="py-3 px-4 font-medium">{order.id}</td>
                          <td className="py-3 px-4">
                            <div>
                              <div>{order.customerName}</div>
                              <div className="text-xs text-gray-500">{order.customerEmail}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <div>{new Date(order.createdAt).toLocaleDateString()}</div>
                              <div className="text-xs text-gray-500">
                                {formatDistance(new Date(order.createdAt), new Date(), { addSuffix: true })}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-medium">
                            ${order.totalAmount.toFixed(2)}
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={`flex w-fit items-center gap-1 ${getStatusBadgeColors(order.status)}`}>
                              {getStatusIcon(order.status)}
                              <span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewOrderDetails(order)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileText className="h-4 w-4 mr-2" />
                                  Generate Invoice
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-10 text-center text-gray-500">
                          No orders found matching your criteria
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="recent">
              <div className="space-y-4">
                {orders
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .slice(0, 5)
                  .map((order) => (
                    <Card key={order.id}>
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{order.id}</h3>
                              <Badge className={getStatusBadgeColors(order.status)}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                            </div>
                            
                            <div className="flex items-start gap-3 mb-3">
                              <CalendarIcon2 className="h-4 w-4 text-gray-400 mt-0.5" />
                              <div>
                                <div className="text-sm">
                                  {new Date(order.createdAt).toLocaleDateString()}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {formatDistance(new Date(order.createdAt), new Date(), { addSuffix: true })}
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-sm">
                              <p className="text-gray-500">Customer: <span className="text-gray-900">{order.customerName}</span></p>
                              <p className="text-gray-500">Items: <span className="text-gray-900">{order.items.reduce((sum, item) => sum + item.quantity, 0)}</span></p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-start md:items-end justify-between">
                            <div className="text-lg font-semibold">
                              ${order.totalAmount.toFixed(2)}
                            </div>
                            
                            <Button variant="outline" size="sm" onClick={() => handleViewOrderDetails(order)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                }
              </div>
            </TabsContent>
            
            <TabsContent value="pending">
              <div className="space-y-4">
                {orders
                  .filter(order => ["pending", "processing"].includes(order.status))
                  .map((order) => (
                    <Card key={order.id}>
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{order.id}</h3>
                              <Badge className={getStatusBadgeColors(order.status)}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex items-center gap-2 bg-gray-50 rounded-md px-2 py-1">
                                  <div className="w-6 h-6 bg-gray-200 rounded-sm overflow-hidden">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                                      }}
                                    />
                                  </div>
                                  <span className="text-xs font-medium">{item.quantity}x</span>
                                  <span className="text-xs truncate max-w-[120px]">{item.name}</span>
                                </div>
                              ))}
                            </div>
                            
                            <div className="text-sm">
                              <p className="text-gray-500">Customer: <span className="text-gray-900">{order.customerName}</span></p>
                              <p className="text-gray-500">Created: <span className="text-gray-900">{formatDistance(new Date(order.createdAt), new Date(), { addSuffix: true })}</span></p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-start md:items-end justify-between">
                            <div className="text-lg font-semibold">
                              ${order.totalAmount.toFixed(2)}
                            </div>
                            
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => handleViewOrderDetails(order)}>
                                Process Order
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                }
                
                {orders.filter(order => ["pending", "processing"].includes(order.status)).length === 0 && (
                  <div className="text-center py-8">
                    <Check className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold mb-1">All caught up!</h3>
                    <p className="text-gray-500">
                      There are no pending orders that require your attention.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {selectedOrder && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500 mb-1">Order Details</div>
                <CardTitle className="flex items-center gap-2">
                  {selectedOrder.id}
                  <Badge className={getStatusBadgeColors(selectedOrder.status)}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </Badge>
                </CardTitle>
              </div>
              
              <Button variant="outline" size="sm" onClick={() => setSelectedOrder(null)}>
                Close
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-3">Items</h3>
                <div className="space-y-3 mb-6">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">${item.price.toFixed(2)} x {item.quantity}</div>
                      </div>
                      <div className="font-medium">
                        ${item.total.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium">
                      ${selectedOrder.totalAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Shipping</span>
                    <span className="font-medium">
                      $0.00
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${selectedOrder.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Customer Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Name</p>
                    <p>{selectedOrder.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p>{selectedOrder.customerEmail}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-sm text-gray-500 mb-1">Shipping Address</p>
                    <p>{selectedOrder.shippingAddress}</p>
                  </div>
                </div>
                
                <h3 className="font-semibold mb-3">Order Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Order Date</p>
                    <p>{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Last Updated</p>
                    <p>{new Date(selectedOrder.updatedAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                    <p>{selectedOrder.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Items</p>
                    <p>{selectedOrder.items.reduce((sum, item) => sum + item.quantity, 0)}</p>
                  </div>
                </div>
                
                <div className="mt-6 flex gap-2">
                  <Button>Update Status</Button>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Invoice
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
};

export default FarmerOrders;
