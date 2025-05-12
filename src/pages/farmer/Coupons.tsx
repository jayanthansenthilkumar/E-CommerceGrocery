
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
  Plus, 
  Edit, 
  Trash2, 
  Tag,
  Calendar,
  DollarSign,
  Percent
} from "lucide-react";

interface Coupon {
  id: string;
  code: string;
  discount: number;
  isPercentage: boolean;
  minPurchase: number | null;
  expiryDate: string;
  usageCount: number;
  maxUses: number | null;
  isActive: boolean;
}

const Coupons = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data for coupons
  const [coupons, setcoupons] = useState<Coupon[]>([
    {
      id: "1",
      code: "FARM10",
      discount: 10,
      isPercentage: true,
      minPurchase: 30,
      expiryDate: "2023-12-31",
      usageCount: 24,
      maxUses: 100,
      isActive: true
    },
    {
      id: "2",
      code: "FRESH5",
      discount: 5,
      isPercentage: false,
      minPurchase: 20,
      expiryDate: "2023-10-15",
      usageCount: 12,
      maxUses: 50,
      isActive: true
    },
    {
      id: "3",
      code: "SUMMER20",
      discount: 20,
      isPercentage: true,
      minPurchase: 40,
      expiryDate: "2023-09-01",
      usageCount: 45,
      maxUses: 100,
      isActive: false
    },
    {
      id: "4",
      code: "WELCOME",
      discount: 15,
      isPercentage: true,
      minPurchase: null,
      expiryDate: "2023-12-31",
      usageCount: 56,
      maxUses: null,
      isActive: true
    }
  ]);

  const toggleCouponStatus = (id: string) => {
    setcoupons(prev => 
      prev.map(coupon => 
        coupon.id === id 
          ? { ...coupon, isActive: !coupon.isActive } 
          : coupon
      )
    );
    
    const coupon = coupons.find(c => c.id === id);
    
    if (coupon) {
      toast({
        title: coupon.isActive ? "Coupon deactivated" : "Coupon activated",
        description: `Coupon ${coupon.code} has been ${coupon.isActive ? "deactivated" : "activated"}.`,
      });
    }
  };

  const deleteCoupon = (id: string) => {
    const coupon = coupons.find(c => c.id === id);
    
    setcoupons(prev => prev.filter(coupon => coupon.id !== id));
    
    if (coupon) {
      toast({
        title: "Coupon deleted",
        description: `Coupon ${coupon.code} has been deleted.`,
      });
    }
  };

  // Filter coupons based on search term
  const filteredCoupons = coupons.filter(coupon => 
    coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout title="Coupon Codes" subtitle="Create and manage discount coupons for your farm products">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-prisona-600" />
            <span>Coupon Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
            <div className="relative md:w-80">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by coupon code"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button>
                <Plus className="h-4 w-4 mr-1" />
                Create New Coupon
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Min Purchase</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Usage / Limit</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCoupons.map((coupon) => (
                  <TableRow key={coupon.id}>
                    <TableCell className="font-medium">{coupon.code}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {coupon.isPercentage ? (
                          <>
                            <Percent className="h-4 w-4 text-gray-500 mr-1" />
                            {coupon.discount}%
                          </>
                        ) : (
                          <>
                            <DollarSign className="h-4 w-4 text-gray-500 mr-1" />
                            ${coupon.discount.toFixed(2)}
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {coupon.minPurchase ? `$${coupon.minPurchase.toFixed(2)}` : 'None'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                        {coupon.expiryDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      {coupon.usageCount} / {coupon.maxUses || '∞'}
                    </TableCell>
                    <TableCell>
                      {coupon.isActive ? (
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
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className={`h-8 w-8 p-0 ${coupon.isActive ? 'text-red-500 hover:text-red-700' : 'text-green-500 hover:text-green-700'}`}
                          onClick={() => toggleCouponStatus(coupon.id)}
                        >
                          {coupon.isActive ? (
                            <Trash2 className="h-4 w-4" />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredCoupons.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <p className="text-gray-500">No coupons found</p>
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
            <CardTitle>Create New Coupon</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Coupon Code
                </label>
                <Input placeholder="e.g. SUMMER20" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount Amount
                  </label>
                  <Input type="number" placeholder="e.g. 10" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount Type
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed amount ($)</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Purchase
                  </label>
                  <Input type="number" placeholder="e.g. 30" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <Input type="date" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Uses (leave empty for unlimited)
                </label>
                <Input type="number" placeholder="e.g. 100" />
              </div>
              
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded" id="active" defaultChecked />
                <label htmlFor="active" className="text-sm font-medium text-gray-700">
                  Activate coupon immediately
                </label>
              </div>
              
              <Button type="button" className="w-full">
                Create Coupon
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Coupon Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-prisona-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Coupons</p>
                <p className="text-2xl font-bold text-prisona-700">{coupons.length}</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Active Coupons</p>
                <p className="text-2xl font-bold text-green-700">
                  {coupons.filter(coupon => coupon.isActive).length}
                </p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-yellow-700">
                  {coupons.filter(coupon => {
                    const expiry = new Date(coupon.expiryDate);
                    const now = new Date();
                    const oneMonth = 30 * 24 * 60 * 60 * 1000;
                    return expiry.getTime() - now.getTime() < oneMonth && coupon.isActive;
                  }).length}
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Redemptions</p>
                <p className="text-2xl font-bold text-blue-700">
                  {coupons.reduce((total, coupon) => total + coupon.usageCount, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Coupons;
