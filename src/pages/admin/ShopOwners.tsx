
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Store, MoreHorizontal, Search, Filter, CheckCircle, XCircle, AlertCircle, Eye, Edit, Trash2
} from "lucide-react";

// Mock shop owner data
const shopOwners = [
  {
    id: "1",
    name: "Urban Goods Market",
    ownerName: "John Smith",
    email: "john@urbangoodsmarket.com",
    location: "San Francisco, CA",
    registeredDate: "2024-02-15",
    status: "active",
    productsCount: 45,
    ordersCount: 120
  },
  {
    id: "2",
    name: "Sunrise General Store",
    ownerName: "Emma Johnson",
    email: "emma@sunrisestore.com",
    location: "Portland, OR",
    registeredDate: "2024-03-05",
    status: "active",
    productsCount: 78,
    ordersCount: 210
  },
  {
    id: "3",
    name: "Metro Essentials",
    ownerName: "Michael Brown",
    email: "michael@metroessentials.com",
    location: "Chicago, IL",
    registeredDate: "2024-01-20",
    status: "pending",
    productsCount: 0,
    ordersCount: 0
  },
  {
    id: "4",
    name: "Harbor Trading Co.",
    ownerName: "Sarah Davis",
    email: "sarah@harbortrading.com",
    location: "Seattle, WA",
    registeredDate: "2023-11-12",
    status: "active",
    productsCount: 114,
    ordersCount: 340
  },
  {
    id: "5",
    name: "Downtown Goods",
    ownerName: "Robert Wilson",
    email: "robert@downtowngoods.com",
    location: "Austin, TX",
    registeredDate: "2024-04-02",
    status: "suspended",
    productsCount: 32,
    ordersCount: 67
  }
];

const ShopOwners = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Filter shop owners based on search query and status filter
  const filteredShopOwners = shopOwners.filter(shop => {
    const matchesSearch = 
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || shop.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleStatusChange = (shopId: string, newStatus: string) => {
    toast({
      title: "Status updated",
      description: `Shop status has been changed to ${newStatus}.`
    });
  };
  
  const handleViewDetails = (shopId: string) => {
    toast({
      title: "View shop details",
      description: "This would navigate to shop details page."
    });
  };
  
  const handleDelete = (shopId: string) => {
    toast({
      title: "Shop deleted",
      description: "The shop owner has been removed from the platform.",
      variant: "destructive"
    });
  };
  
  return (
    <DashboardLayout
      title="Shop Owners Management"
      subtitle="View and manage all shop owners on the platform"
    >
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Shop Owners Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Shop Owners</p>
                <p className="text-2xl font-bold">{shopOwners.length}</p>
              </div>
              <Store className="h-10 w-10 text-blue-500" />
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Active Shops</p>
                <p className="text-2xl font-bold">
                  {shopOwners.filter(shop => shop.status === "active").length}
                </p>
              </div>
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-600">Pending Approval</p>
                <p className="text-2xl font-bold">
                  {shopOwners.filter(shop => shop.status === "pending").length}
                </p>
              </div>
              <AlertCircle className="h-10 w-10 text-amber-500" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <CardTitle className="text-xl">Shop Owners List</CardTitle>
            
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search shop owners..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-[200px]"
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    {statusFilter === "all" 
                      ? "All Status" 
                      : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                    All Status
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                    Active
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("suspended")}>
                    Suspended
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button>Add Shop Owner</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Shop Name</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredShopOwners.length > 0 ? (
                  filteredShopOwners.map((shop) => (
                    <TableRow key={shop.id}>
                      <TableCell>
                        <div className="font-medium">{shop.name}</div>
                        <div className="text-sm text-gray-500">{shop.email}</div>
                      </TableCell>
                      <TableCell>{shop.ownerName}</TableCell>
                      <TableCell>{shop.location}</TableCell>
                      <TableCell>{shop.productsCount}</TableCell>
                      <TableCell>
                        {new Date(shop.registeredDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          shop.status === "active" ? "bg-green-100 text-green-800" :
                          shop.status === "pending" ? "bg-amber-100 text-amber-800" :
                          "bg-red-100 text-red-800"
                        }>
                          {shop.status.charAt(0).toUpperCase() + shop.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleViewDetails(shop.id)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Shop
                            </DropdownMenuItem>
                            {shop.status !== "active" && (
                              <DropdownMenuItem onClick={() => handleStatusChange(shop.id, "active")}>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Activate
                              </DropdownMenuItem>
                            )}
                            {shop.status !== "suspended" && (
                              <DropdownMenuItem onClick={() => handleStatusChange(shop.id, "suspended")}>
                                <XCircle className="h-4 w-4 mr-2" />
                                Suspend
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDelete(shop.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <p className="text-gray-500">No shop owners found</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default ShopOwners;
