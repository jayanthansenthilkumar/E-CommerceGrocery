
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Tag, PackageOpen, ShoppingBag, BarChart3, Edit, Trash2, Loader2, AlertTriangle, Archive } from "lucide-react";

// Mock product data
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
  isOrganic: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  salesCount: number;
  reviews: number;
  rating: number;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Organic Apples",
    description: "Fresh, locally grown organic apples. Sold per pound.",
    price: 3.99,
    stock: 100,
    category: "Fruits",
    images: ["https://images.unsplash.com/photo-1568702846914-96b305d2aaeb"],
    isOrganic: true,
    isActive: true,
    createdAt: "2025-01-15",
    updatedAt: "2025-05-01",
    salesCount: 54,
    reviews: 12,
    rating: 4.8
  },
  {
    id: "2",
    name: "Organic Carrots",
    description: "Hand-picked organic carrots, perfect for any recipe.",
    price: 2.99,
    stock: 75,
    category: "Vegetables",
    images: ["https://images.unsplash.com/photo-1598170845058-60f7a3c18eab"],
    isOrganic: true,
    isActive: true,
    createdAt: "2025-01-20",
    updatedAt: "2025-04-25",
    salesCount: 67,
    reviews: 8,
    rating: 4.5
  },
  {
    id: "3",
    name: "Fresh Eggs",
    description: "Farm-fresh eggs from free-range chickens. Sold by the dozen.",
    price: 5.99,
    stock: 40,
    category: "Dairy & Eggs",
    images: ["https://images.unsplash.com/photo-1489726933853-010eb1484d1a"],
    isOrganic: false,
    isActive: true,
    createdAt: "2025-02-10",
    updatedAt: "2025-04-30",
    salesCount: 36,
    reviews: 6,
    rating: 5.0
  },
  {
    id: "4",
    name: "Honey",
    description: "Pure, raw honey from our local bee farm. 16oz jar.",
    price: 8.50,
    stock: 25,
    category: "Honey & Preserves",
    images: ["https://images.unsplash.com/photo-1587049352851-8d4e89133924"],
    isOrganic: true,
    isActive: true,
    createdAt: "2025-03-05",
    updatedAt: "2025-04-15",
    salesCount: 28,
    reviews: 10,
    rating: 4.9
  },
  {
    id: "5",
    name: "Seasonal Berries Mix",
    description: "A mix of seasonal berries: strawberries, blueberries and raspberries.",
    price: 6.99,
    stock: 0,
    category: "Fruits",
    images: ["https://images.unsplash.com/photo-1549301014-95d119f5c960"],
    isOrganic: true,
    isActive: false,
    createdAt: "2025-02-20",
    updatedAt: "2025-03-30",
    salesCount: 45,
    reviews: 7,
    rating: 4.6
  }
];

const FarmerProducts = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  
  // New product form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    isOrganic: true,
    images: []
  });
  
  // Filter products based on search and filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesActive = 
      activeFilter === null || 
      (activeFilter === "active" && product.isActive) ||
      (activeFilter === "inactive" && !product.isActive);
    
    const matchesCategory = 
      categoryFilter === null || 
      product.category === categoryFilter;
    
    return matchesSearch && matchesActive && matchesCategory;
  });
  
  // Get unique categories from products
  const categories = Array.from(new Set(products.map(product => product.category)));
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleEditProduct = (product: Product) => {
    setProductToEdit(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category,
      isOrganic: product.isOrganic,
      images: product.images
    });
    setIsAddDialogOpen(true);
  };
  
  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(product => product.id !== productId));
    toast({
      title: "Product deleted",
      description: "The product has been removed from your inventory."
    });
  };
  
  const handleToggleProductStatus = (productId: string) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, isActive: !product.isActive }
        : product
    ));
    
    const product = products.find(p => p.id === productId);
    if (product) {
      toast({
        title: product.isActive ? "Product deactivated" : "Product activated",
        description: `${product.name} is now ${product.isActive ? "hidden from" : "visible to"} customers.`
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form data
    if (!formData.name || !formData.price || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    setTimeout(() => {
      if (productToEdit) {
        // Update existing product
        setProducts(products.map(product => 
          product.id === productToEdit.id
            ? {
                ...product,
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                category: formData.category,
                isOrganic: formData.isOrganic,
                updatedAt: new Date().toISOString().split('T')[0]
              }
            : product
        ));
        
        toast({
          title: "Product updated",
          description: `${formData.name} has been successfully updated.`
        });
      } else {
        // Create new product
        const newProduct: Product = {
          id: Math.random().toString(36).substring(2, 11),
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          category: formData.category,
          isOrganic: formData.isOrganic,
          images: formData.images.length > 0 ? formData.images : ["https://via.placeholder.com/300"],
          isActive: true,
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0],
          salesCount: 0,
          reviews: 0,
          rating: 0
        };
        
        setProducts([...products, newProduct]);
        toast({
          title: "Product added",
          description: `${formData.name} has been successfully added to your inventory.`
        });
      }
      
      // Reset form and close dialog
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        isOrganic: true,
        images: []
      });
      setProductToEdit(null);
      setIsSubmitting(false);
      setIsAddDialogOpen(false);
    }, 1000);
  };
  
  const resetDialog = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      isOrganic: true,
      images: []
    });
    setProductToEdit(null);
    setIsAddDialogOpen(false);
  };
  
  return (
    <DashboardLayout
      title="Farm Products"
      subtitle="Manage your farm's product inventory"
    >
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-[250px]"
            />
          </div>
          
          <Select
            value={categoryFilter || ""}
            onValueChange={(value) => setCategoryFilter(value === "" ? null : value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select
            value={activeFilter || ""}
            onValueChange={(value) => setActiveFilter(value === "" ? null : value)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
          if (!open) resetDialog();
          setIsAddDialogOpen(open);
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>{productToEdit ? "Edit Product" : "Add New Product"}</DialogTitle>
              <DialogDescription>
                {productToEdit
                  ? "Update your product information below."
                  : "Fill in the details to add a new product to your inventory."
                }
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., Organic Apples"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your product..."
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price ($) *</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="stock">Stock Quantity *</Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      min="0"
                      step="1"
                      placeholder="0"
                      value={formData.stock}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleSelectChange("category", value)}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="isOrganic">Product Type</Label>
                    <Select
                      value={formData.isOrganic ? "organic" : "conventional"}
                      onValueChange={(value) => handleSelectChange("isOrganic", value === "organic" ? "true" : "false")}
                    >
                      <SelectTrigger id="isOrganic">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="organic">Organic</SelectItem>
                        <SelectItem value="conventional">Conventional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label>Product Images</Label>
                  <div className="border rounded-md p-4 bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-4">
                      Upload product images (not implemented in this demo)
                    </p>
                    <Button type="button" variant="outline" className="w-full">
                      Select Images
                    </Button>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetDialog}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {productToEdit ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    <>{productToEdit ? "Update Product" : "Add Product"}</>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Product Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Products</p>
                  <p className="text-2xl font-bold">{products.length}</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-full">
                  <PackageOpen className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-green-600">In Stock</p>
                  <p className="text-2xl font-bold">
                    {products.filter(p => p.stock > 0 && p.isActive).length}
                  </p>
                </div>
                <div className="bg-green-100 p-2 rounded-full">
                  <Tag className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-amber-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-amber-600">Low Stock</p>
                  <p className="text-2xl font-bold">
                    {products.filter(p => p.stock > 0 && p.stock < 10).length}
                  </p>
                </div>
                <div className="bg-amber-100 p-2 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-red-600">Out of Stock</p>
                  <p className="text-2xl font-bold">
                    {products.filter(p => p.stock === 0).length}
                  </p>
                </div>
                <div className="bg-red-100 p-2 rounded-full">
                  <PackageOpen className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="grid" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="grid">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className={product.stock === 0 || !product.isActive ? "opacity-70" : ""}>
                  <div className="h-48 bg-gray-100 relative">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/300";
                      }}
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      {product.isOrganic && (
                        <Badge className="bg-green-500">Organic</Badge>
                      )}
                      {!product.isActive && (
                        <Badge variant="outline" className="bg-gray-100">Inactive</Badge>
                      )}
                      {product.stock === 0 && (
                        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                          Out of Stock
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold text-lg">${product.price.toFixed(2)}</span>
                      <span className="text-sm text-gray-500">
                        Stock: {product.stock}
                      </span>
                    </div>
                    
                    <div className="flex justify-between gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      
                      <Button 
                        variant={product.isActive ? "destructive" : "default"}
                        size="sm"
                        className="w-full"
                        onClick={() => handleToggleProductStatus(product.id)}
                      >
                        {product.isActive ? (
                          <><Archive className="h-4 w-4 mr-1" /> Hide</>
                        ) : (
                          <><Eye className="h-4 w-4 mr-1" /> Show</>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <PackageOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">
                {searchQuery || activeFilter || categoryFilter 
                  ? "Try adjusting your filters to find what you're looking for."
                  : "Your inventory is empty. Add your first product to get started."}
              </p>
              {(searchQuery || activeFilter || categoryFilter) && (
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveFilter(null);
                    setCategoryFilter(null);
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="table">
          <div className="rounded-md border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="py-3 px-4 text-left font-semibold">Product</th>
                  <th className="py-3 px-4 text-left font-semibold">Category</th>
                  <th className="py-3 px-4 text-left font-semibold">Price</th>
                  <th className="py-3 px-4 text-left font-semibold">Stock</th>
                  <th className="py-3 px-4 text-left font-semibold">Status</th>
                  <th className="py-3 px-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className={!product.isActive ? "bg-gray-50" : ""}>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={product.images[0]} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://via.placeholder.com/100";
                              }}
                            />
                          </div>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-xs text-gray-500 line-clamp-1">
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          {product.category}
                          {product.isOrganic && (
                            <Badge className="ml-1 bg-green-100 text-green-800 text-xs">Organic</Badge>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        <span className={
                          product.stock === 0 ? "text-red-600 font-medium" :
                          product.stock < 10 ? "text-amber-600 font-medium" :
                          ""
                        }>
                          {product.stock}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={
                          !product.isActive ? "bg-gray-100 text-gray-800" :
                          product.stock === 0 ? "bg-red-100 text-red-800" :
                          "bg-green-100 text-green-800"
                        }>
                          {!product.isActive ? "Inactive" :
                           product.stock === 0 ? "Out of Stock" :
                           "Active"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleToggleProductStatus(product.id)}
                          >
                            {product.isActive ? <Archive className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-red-500"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-gray-500">
                      No products found. {searchQuery || activeFilter || categoryFilter 
                        ? "Try adjusting your search filters."
                        : "Add your first product to get started."
                      }
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Top Selling Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products
                    .sort((a, b) => b.salesCount - a.salesCount)
                    .slice(0, 5)
                    .map((product) => (
                      <div key={product.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={product.images[0]} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://via.placeholder.com/100";
                              }}
                            />
                          </div>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-xs text-gray-500">${product.price.toFixed(2)}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <ShoppingBag className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{product.salesCount}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Inventory Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.filter(p => p.stock < 10).length > 0 ? (
                    products
                      .filter(p => p.stock < 10)
                      .map((product) => (
                        <div key={product.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded overflow-hidden flex items-center justify-center
                              ${product.stock === 0 ? 'bg-red-100' : 'bg-amber-100'}`}>
                              <AlertTriangle className={`h-5 w-5 
                                ${product.stock === 0 ? 'text-red-500' : 'text-amber-500'}`} />
                            </div>
                            <div>
                              <div className="font-medium">{product.name}</div>
                              <div className={`text-xs ${product.stock === 0 ? 'text-red-500' : 'text-amber-500'}`}>
                                {product.stock === 0 ? 'Out of stock' : `Low stock: ${product.stock} left`}
                              </div>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditProduct(product)}
                          >
                            Update
                          </Button>
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <BarChart3 className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                      <p>All products are well-stocked.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default FarmerProducts;
