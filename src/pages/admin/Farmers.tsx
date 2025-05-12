
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
  Tractor, Leaf, MoreHorizontal, Search, Filter, CheckCircle, XCircle, AlertCircle, Eye, Edit, Trash2
} from "lucide-react";

// Mock farmers data
const farmers = [
  {
    id: "1",
    farmName: "Green Hills Farm",
    ownerName: "James Wilson",
    email: "james@greenhillsfarm.com",
    location: "Sonoma County, CA",
    registeredDate: "2024-01-10",
    status: "active",
    productsCount: 32,
    isOrganic: true
  },
  {
    id: "2",
    farmName: "Sunset Valley Ranch",
    ownerName: "Maria Rodriguez",
    email: "maria@sunsetvalleyranch.com",
    location: "Napa Valley, CA",
    registeredDate: "2024-02-18",
    status: "active",
    productsCount: 24,
    isOrganic: true
  },
  {
    id: "3",
    farmName: "Blue River Acres",
    ownerName: "Robert Johnson",
    email: "robert@blueriveracres.com",
    location: "Eugene, OR",
    registeredDate: "2024-03-05",
    status: "pending",
    productsCount: 0,
    isOrganic: false
  },
  {
    id: "4",
    farmName: "Golden Harvest Fields",
    ownerName: "Sarah Thompson",
    email: "sarah@goldenharvestfields.com",
    location: "Sacramento, CA",
    registeredDate: "2023-12-12",
    status: "active",
    productsCount: 41,
    isOrganic: false
  },
  {
    id: "5",
    farmName: "Organic Meadows",
    ownerName: "David Chen",
    email: "david@organicmeadows.com",
    location: "Humboldt County, CA",
    registeredDate: "2023-11-30",
    status: "suspended",
    productsCount: 18,
    isOrganic: true
  }
];

const Farmers = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [organicFilter, setOrganicFilter] = useState<boolean | null>(null);
  
  // Filter farmers based on search query, status and organic filters
  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = 
      farmer.farmName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || farmer.status === statusFilter;
    
    const matchesOrganic = organicFilter === null || farmer.isOrganic === organicFilter;
    
    return matchesSearch && matchesStatus && matchesOrganic;
  });
  
  const handleStatusChange = (farmerId: string, newStatus: string) => {
    toast({
      title: "Status updated",
      description: `Farmer status has been changed to ${newStatus}.`
    });
  };
  
  const handleViewDetails = (farmerId: string) => {
    toast({
      title: "View farmer details",
      description: "This would navigate to farmer details page."
    });
  };
  
  const handleDelete = (farmerId: string) => {
    toast({
      title: "Farmer deleted",
      description: "The farmer has been removed from the platform.",
      variant: "destructive"
    });
  };
  
  return (
    <DashboardLayout
      title="Farmers Management"
      subtitle="View and manage all farmers on the platform"
    >
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Farmers Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            <div className="bg-green-50 p-4 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Total Farmers</p>
                <p className="text-2xl font-bold">{farmers.length}</p>
              </div>
              <Tractor className="h-10 w-10 text-green-500" />
            </div>
            
            <div className="bg-emerald-50 p-4 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-600">Organic Farms</p>
                <p className="text-2xl font-bold">
                  {farmers.filter(farmer => farmer.isOrganic).length}
                </p>
              </div>
              <Leaf className="h-10 w-10 text-emerald-500" />
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Active Farmers</p>
                <p className="text-2xl font-bold">
                  {farmers.filter(farmer => farmer.status === "active").length}
                </p>
              </div>
              <CheckCircle className="h-10 w-10 text-blue-500" />
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-600">Pending Approval</p>
                <p className="text-2xl font-bold">
                  {farmers.filter(farmer => farmer.status === "pending").length}
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
            <CardTitle className="text-xl">Farmers List</CardTitle>
            
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search farmers..."
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
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Leaf className="h-4 w-4 mr-2" />
                    {organicFilter === null 
                      ? "All Farms" 
                      : organicFilter ? "Organic Only" : "Non-Organic Only"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setOrganicFilter(null)}>
                    All Farms
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setOrganicFilter(true)}>
                    Organic Only
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setOrganicFilter(false)}>
                    Non-Organic Only
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button>Add Farmer</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Farm Name</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFarmers.length > 0 ? (
                  filteredFarmers.map((farmer) => (
                    <TableRow key={farmer.id}>
                      <TableCell>
                        <div className="font-medium">{farmer.farmName}</div>
                        <div className="text-sm text-gray-500">{farmer.email}</div>
                      </TableCell>
                      <TableCell>{farmer.ownerName}</TableCell>
                      <TableCell>{farmer.location}</TableCell>
                      <TableCell>{farmer.productsCount}</TableCell>
                      <TableCell>
                        {farmer.isOrganic ? (
                          <Badge className="bg-emerald-100 text-emerald-800 flex items-center w-fit gap-1">
                            <Leaf className="h-3 w-3" /> Organic
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-800 w-fit">
                            Conventional
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          farmer.status === "active" ? "bg-green-100 text-green-800" :
                          farmer.status === "pending" ? "bg-amber-100 text-amber-800" :
                          "bg-red-100 text-red-800"
                        }>
                          {farmer.status.charAt(0).toUpperCase() + farmer.status.slice(1)}
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
                            <DropdownMenuItem onClick={() => handleViewDetails(farmer.id)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Farm
                            </DropdownMenuItem>
                            {farmer.status !== "active" && (
                              <DropdownMenuItem onClick={() => handleStatusChange(farmer.id, "active")}>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Activate
                              </DropdownMenuItem>
                            )}
                            {farmer.status !== "suspended" && (
                              <DropdownMenuItem onClick={() => handleStatusChange(farmer.id, "suspended")}>
                                <XCircle className="h-4 w-4 mr-2" />
                                Suspend
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDelete(farmer.id)}
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
                      <p className="text-gray-500">No farmers found</p>
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

export default Farmers;
