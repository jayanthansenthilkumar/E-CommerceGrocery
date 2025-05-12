
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import { Users, Search, User, ShoppingBag, Star, MessageSquare, MoreHorizontal, Mail, ExternalLink, Calendar } from "lucide-react";

// Mock customer data
interface Customer {
  id: string;
  name: string;
  email: string;
  ordersCount: number;
  totalSpent: number;
  lastOrder: string;
  registrationDate: string;
  isSubscribedToNewsletter: boolean;
}

const mockCustomers: Customer[] = [
  {
    id: "CUST-5678",
    name: "John Smith",
    email: "john@example.com",
    ordersCount: 5,
    totalSpent: 89.75,
    lastOrder: "2025-05-01T15:30:00Z",
    registrationDate: "2025-01-15T10:20:00Z",
    isSubscribedToNewsletter: true
  },
  {
    id: "CUST-6789",
    name: "Emma Johnson",
    email: "emma@example.com",
    ordersCount: 2,
    totalSpent: 35.25,
    lastOrder: "2025-05-05T09:15:00Z",
    registrationDate: "2025-02-20T14:45:00Z",
    isSubscribedToNewsletter: false
  },
  {
    id: "CUST-7890",
    name: "Michael Brown",
    email: "michael@example.com",
    ordersCount: 8,
    totalSpent: 152.95,
    lastOrder: "2025-05-10T14:20:00Z",
    registrationDate: "2024-11-05T11:30:00Z",
    isSubscribedToNewsletter: true
  },
  {
    id: "CUST-8901",
    name: "Sarah Davis",
    email: "sarah@example.com",
    ordersCount: 1,
    totalSpent: 13.98,
    lastOrder: "2025-05-11T11:05:00Z",
    registrationDate: "2025-05-10T09:15:00Z",
    isSubscribedToNewsletter: true
  },
  {
    id: "CUST-9012",
    name: "Robert Wilson",
    email: "robert@example.com",
    ordersCount: 3,
    totalSpent: 57.42,
    lastOrder: "2025-05-08T16:40:00Z",
    registrationDate: "2025-03-22T13:10:00Z",
    isSubscribedToNewsletter: false
  }
];

// Mock reviews data
const mockReviews = [
  {
    id: "REV-1234",
    customerId: "CUST-5678",
    customerName: "John Smith",
    productName: "Organic Apples",
    rating: 5,
    comment: "The apples were incredibly fresh and delicious. Will definitely order again!",
    date: "2025-05-02T10:15:00Z"
  },
  {
    id: "REV-2345",
    customerId: "CUST-7890",
    customerName: "Michael Brown",
    productName: "Fresh Eggs",
    rating: 4,
    comment: "Great quality eggs, very fresh. The packaging could be improved though.",
    date: "2025-05-11T09:30:00Z"
  },
  {
    id: "REV-3456",
    customerId: "CUST-7890",
    customerName: "Michael Brown",
    productName: "Organic Carrots",
    rating: 5,
    comment: "Best carrots I've ever had! So sweet and crunchy.",
    date: "2025-04-25T16:45:00Z"
  }
];

const FarmerCustomers = () => {
  const [customers] = useState<Customer[]>(mockCustomers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  
  // Filter customers based on search
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Get customer reviews
  const getCustomerReviews = (customerId: string) => {
    return mockReviews.filter(review => review.customerId === customerId);
  };
  
  // Handle view customer details
  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
  };
  
  // Get stars based on rating
  const getStars = (rating: number) => {
    return '⭐'.repeat(rating);
  };
  
  return (
    <DashboardLayout
      title="Customers"
      subtitle="View and manage your customers information"
    >
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Customer Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Customers</p>
                <p className="text-2xl font-bold">{customers.length}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-amber-50 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-600">Total Orders</p>
                <p className="text-2xl font-bold">
                  {customers.reduce((sum, customer) => sum + customer.ordersCount, 0)}
                </p>
              </div>
              <div className="bg-amber-100 p-2 rounded-full">
                <ShoppingBag className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Revenue</p>
                <p className="text-2xl font-bold">
                  ${customers.reduce((sum, customer) => sum + customer.totalSpent, 0).toFixed(2)}
                </p>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <Star className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`lg:col-span-${selectedCustomer ? '2' : '3'}`}>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <CardTitle>Customer List</CardTitle>
                
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search customers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 w-[200px]"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Spent</TableHead>
                      <TableHead>Last Order</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.length > 0 ? (
                      filteredCustomers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                                <User className="h-5 w-5" />
                              </div>
                              <div>
                                <div className="font-medium">{customer.name}</div>
                                <div className="text-xs text-gray-500">{customer.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{customer.ordersCount}</TableCell>
                          <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {formatDistance(new Date(customer.lastOrder), new Date(), { addSuffix: true })}
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewCustomer(customer)}>
                                  <User className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Mail className="h-4 w-4 mr-2" />
                                  Send Email
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  View Orders
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          No customers found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-500" />
                Recent Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mockReviews.length > 0 ? (
                <div className="space-y-4">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <div className="font-medium">{review.productName}</div>
                        <div className="text-amber-500">{getStars(review.rating)}</div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">"{review.comment}"</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                          <User className="h-3 w-3" />
                          <span>{review.customerName}</span>
                        </div>
                        <div>{formatDistance(new Date(review.date), new Date(), { addSuffix: true })}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No reviews yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {selectedCustomer && (
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Customer Details</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedCustomer(null)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6L6 18M6 6l12 12"></path>
                    </svg>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                    <User className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{selectedCustomer.name}</h3>
                    <div className="text-sm text-gray-500">{selectedCustomer.email}</div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm text-gray-500 mb-2">Customer Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge className="w-fit px-2 py-1 text-xs bg-gray-100 text-gray-800">ID</Badge>
                        <span>{selectedCustomer.id}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 text-gray-500 mt-0.5" />
                        <div>
                          <div className="text-sm">Joined</div>
                          <div className="text-xs text-gray-500">
                            {new Date(selectedCustomer.registrationDate).toLocaleDateString()}
                            {' '}
                            ({formatDistance(new Date(selectedCustomer.registrationDate), new Date(), { addSuffix: true })})
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <div>
                          <div className="text-sm">Newsletter</div>
                          <div className="text-xs text-gray-500">
                            {selectedCustomer.isSubscribedToNewsletter ? 'Subscribed' : 'Not subscribed'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-gray-500 mb-2">Order Information</h4>
                    <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
                      <div>
                        <div className="text-xs text-gray-500">Orders</div>
                        <div className="font-semibold">{selectedCustomer.ordersCount}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Total Spent</div>
                        <div className="font-semibold">${selectedCustomer.totalSpent.toFixed(2)}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-xs text-gray-500">Last Order</div>
                        <div className="font-semibold">
                          {formatDistance(new Date(selectedCustomer.lastOrder), new Date(), { addSuffix: true })}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-gray-500 mb-2">Reviews</h4>
                    {getCustomerReviews(selectedCustomer.id).length > 0 ? (
                      <div className="space-y-3">
                        {getCustomerReviews(selectedCustomer.id).map((review) => (
                          <div key={review.id} className="border rounded-md p-3">
                            <div className="flex justify-between items-center mb-1">
                              <div className="font-medium text-sm">{review.productName}</div>
                              <div className="text-amber-500 text-xs">{getStars(review.rating)}</div>
                            </div>
                            <p className="text-xs text-gray-600">"{review.comment}"</p>
                            <div className="text-xs text-gray-500 mt-1">
                              {formatDistance(new Date(review.date), new Date(), { addSuffix: true })}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-gray-50 p-3 rounded-md text-center">
                        <p className="text-sm text-gray-500">No reviews yet</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Button className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact Customer
                    </Button>
                    <Button variant="outline" className="w-full">
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      View Orders
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FarmerCustomers;
