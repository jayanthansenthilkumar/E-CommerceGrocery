
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tag, Clock, Percent, Plus, TicketPercent, Trash2, Edit, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Define our Coupon type
interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minAmount: number;
  startDate: string;
  endDate: string;
  usageLimit: number | null;
  usedCount: number;
  status: "active" | "expired" | "draft";
  productCategories: string[];
}

// Mock coupon data
const initialCoupons: Coupon[] = [
  {
    id: "1",
    code: "FARM25",
    type: "percentage",
    value: 25,
    minAmount: 50,
    startDate: "2025-05-01",
    endDate: "2025-08-31",
    usageLimit: 100,
    usedCount: 12,
    status: "active",
    productCategories: ["Vegetables", "Fruits"]
  },
  {
    id: "2",
    code: "ORGANIC10",
    type: "percentage",
    value: 10,
    minAmount: 0,
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    usageLimit: null,
    usedCount: 57,
    status: "active",
    productCategories: ["Organic"]
  },
  {
    id: "3",
    code: "FRUIT5",
    type: "fixed",
    value: 5,
    minAmount: 25,
    startDate: "2025-04-15",
    endDate: "2025-06-15",
    usageLimit: 200,
    usedCount: 43,
    status: "active",
    productCategories: ["Fruits"]
  }
];

const FarmerCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<Omit<Coupon, "id" | "usedCount" | "status">>({
    code: "",
    type: "percentage",
    value: 10,
    minAmount: 0,
    startDate: new Date().toISOString().split('T')[0],
    endDate: "",
    usageLimit: null,
    productCategories: []
  });
  
  // Available product categories for the farm
  const availableCategories = ["Vegetables", "Fruits", "Dairy", "Eggs", "Meat", "Herbs", "Organic"];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === "value" || name === "minAmount" || name === "usageLimit" 
        ? value === "" ? "" : Number(value)
        : value 
    }));
  };
  
  const resetForm = () => {
    setFormData({
      code: "",
      type: "percentage",
      value: 10,
      minAmount: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: "",
      usageLimit: null,
      productCategories: []
    });
    setEditingCoupon(null);
  };
  
  const handleEditCoupon = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      minAmount: coupon.minAmount,
      startDate: coupon.startDate,
      endDate: coupon.endDate,
      usageLimit: coupon.usageLimit,
      productCategories: coupon.productCategories
    });
    setIsDialogOpen(true);
  };
  
  const handleToggleStatus = (id: string) => {
    setCoupons(coupons.map(coupon => 
      coupon.id === id
        ? { ...coupon, status: coupon.status === 'active' ? 'expired' : 'active' }
        : coupon
    ));
    
    const coupon = coupons.find(c => c.id === id);
    if (coupon) {
      toast({
        title: `Coupon ${coupon.status === 'active' ? 'deactivated' : 'activated'}`,
        description: `The coupon ${coupon.code} has been ${coupon.status === 'active' ? 'deactivated' : 'activated'}.`
      });
    }
  };
  
  const handleDeleteCoupon = (id: string) => {
    setCoupons(coupons.filter(coupon => coupon.id !== id));
    toast({
      title: "Coupon deleted",
      description: "The coupon has been deleted successfully."
    });
  };
  
  const handleToggleCategory = (category: string) => {
    if (formData.productCategories.includes(category)) {
      setFormData({
        ...formData,
        productCategories: formData.productCategories.filter(cat => cat !== category)
      });
    } else {
      setFormData({
        ...formData,
        productCategories: [...formData.productCategories, category]
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.code.trim() === "") {
      toast({
        title: "Error",
        description: "Coupon code is required.",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.endDate) {
      toast({
        title: "Error",
        description: "End date is required.",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.value <= 0) {
      toast({
        title: "Error",
        description: "Discount value must be greater than zero.",
        variant: "destructive",
      });
      return;
    }
    
    if (editingCoupon) {
      // Update existing coupon
      setCoupons(coupons.map(coupon => 
        coupon.id === editingCoupon.id 
          ? { 
              ...coupon, 
              ...formData,
              usageLimit: formData.usageLimit === "" ? null : formData.usageLimit
            }
          : coupon
      ));
      toast({
        title: "Coupon updated",
        description: `The coupon ${formData.code} has been updated successfully.`
      });
    } else {
      // Add new coupon
      const newCoupon: Coupon = {
        id: String(Math.floor(Math.random() * 10000)),
        ...formData,
        usageLimit: formData.usageLimit === "" ? null : formData.usageLimit,
        usedCount: 0,
        status: "active"
      };
      
      setCoupons([...coupons, newCoupon]);
      toast({
        title: "Coupon created",
        description: `The coupon ${formData.code} has been created successfully.`
      });
    }
    
    resetForm();
    setIsDialogOpen(false);
  };

  return (
    <DashboardLayout
      title="Farm Coupons & Discounts"
      subtitle="Create and manage promotional coupons for your farm products"
    >
      <div className="flex justify-end mb-6">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="flex items-center gap-2"
              onClick={resetForm}
            >
              <Plus className="h-4 w-4" />
              Create Coupon
            </Button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingCoupon ? "Edit Coupon" : "Create New Coupon"}
              </DialogTitle>
              <DialogDescription>
                {editingCoupon 
                  ? "Update the details of your existing coupon"
                  : "Create a new discount coupon for your farm products"
                }
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="code">
                    Coupon Code
                  </label>
                  <Input
                    id="code"
                    name="code"
                    placeholder="e.g., FARM25"
                    value={formData.code}
                    onChange={handleInputChange}
                    className="uppercase"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">
                      Discount Type
                    </label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as "percentage" | "fixed" }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage (%)</SelectItem>
                        <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <label className="text-sm font-medium" htmlFor="value">
                      {formData.type === "percentage" ? "Percentage (%)" : "Amount ($)"}
                    </label>
                    <Input
                      id="value"
                      name="value"
                      type="number"
                      min="0"
                      step={formData.type === "percentage" ? "1" : "0.01"}
                      max={formData.type === "percentage" ? "100" : undefined}
                      placeholder={formData.type === "percentage" ? "e.g., 25" : "e.g., 5.00"}
                      value={formData.value === 0 ? "" : formData.value}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="minAmount">
                    Minimum Purchase Amount ($)
                  </label>
                  <Input
                    id="minAmount"
                    name="minAmount"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="e.g., 50.00"
                    value={formData.minAmount === 0 ? "0" : formData.minAmount}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium" htmlFor="startDate">
                      Start Date
                    </label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label className="text-sm font-medium" htmlFor="endDate">
                      End Date
                    </label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="usageLimit">
                    Usage Limit (leave empty for unlimited)
                  </label>
                  <Input
                    id="usageLimit"
                    name="usageLimit"
                    type="number"
                    min="1"
                    step="1"
                    placeholder="e.g., 100"
                    value={formData.usageLimit === null ? "" : formData.usageLimit}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="grid gap-2">
                  <label className="text-sm font-medium">
                    Product Categories
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableCategories.map(category => (
                      <div key={category} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`category-${category}`}
                          checked={formData.productCategories.includes(category)}
                          onChange={() => handleToggleCategory(category)}
                          className="rounded text-prisona-500"
                        />
                        <label htmlFor={`category-${category}`} className="text-sm">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Leave all unchecked to apply to all products
                  </p>
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => {
                  resetForm();
                  setIsDialogOpen(false);
                }}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingCoupon ? "Update" : "Create"} Coupon
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid gap-6">
        {coupons.map((coupon) => (
          <Card key={coupon.id} className="overflow-hidden">
            <CardHeader className="pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <TicketPercent className="h-5 w-5 text-organic-dark" />
                <CardTitle className="text-lg">{coupon.code}</CardTitle>
                <Badge className={coupon.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}>
                  {coupon.status.charAt(0).toUpperCase() + coupon.status.slice(1)}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-2 text-gray-600"
                  onClick={() => handleEditCoupon(coupon)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-2 text-gray-600"
                  onClick={() => handleToggleStatus(coupon.id)}
                >
                  {coupon.status === 'active' ? 'Deactivate' : 'Activate'}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-2 text-red-600"
                  onClick={() => handleDeleteCoupon(coupon.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Percent className="h-4 w-4 mr-2" />
                  <span className="font-medium">
                    {coupon.type === 'percentage' 
                      ? `${coupon.value}% off` 
                      : `$${coupon.value.toFixed(2)} off`
                    }
                  </span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Tag className="h-4 w-4 mr-2" />
                  <span>
                    {coupon.minAmount > 0
                      ? `Min. spend: $${coupon.minAmount.toFixed(2)}`
                      : "No minimum spend"
                    }
                  </span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>
                    {new Date(coupon.startDate).toLocaleDateString()} - {new Date(coupon.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span>
                    {coupon.usageLimit 
                      ? `${coupon.usedCount}/${coupon.usageLimit} used`
                      : `${coupon.usedCount} used (unlimited)`
                    }
                  </span>
                </div>
                
                {coupon.usageLimit && (
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-organic-dark rounded-full"
                      style={{ width: `${Math.min(100, (coupon.usedCount / coupon.usageLimit) * 100)}%` }}
                    />
                  </div>
                )}
                
                <div className="flex items-center text-gray-600">
                  <Tag className="h-4 w-4 mr-2" />
                  <span className="text-sm">
                    {coupon.productCategories.length > 0 
                      ? `Categories: ${coupon.productCategories.join(', ')}`
                      : 'All categories'
                    }
                  </span>
                </div>
              </div>
              
              <div className="space-y-3 flex items-center sm:justify-end">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Status:</span>
                  <Switch
                    checked={coupon.status === 'active'}
                    onCheckedChange={() => handleToggleStatus(coupon.id)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {coupons.length === 0 && (
          <Card>
            <CardContent className="text-center py-10">
              <TicketPercent className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">No coupons yet</p>
              <p className="text-gray-500 mb-4">
                Create your first discount coupon to attract customers to your farm products
              </p>
              <Button 
                onClick={() => {
                  resetForm();
                  setIsDialogOpen(true);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Coupon
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FarmerCoupons;
