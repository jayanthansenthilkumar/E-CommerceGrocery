
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
  Package,
  ShoppingBag
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  discountPrice: number | null;
  stock: number;
  image: string;
  createdAt: string;
}

const Products = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data for products
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Whole Grain Bread",
      category: "Bakery",
      price: 4.99,
      discountPrice: null,
      stock: 20,
      image: "https://images.unsplash.com/photo-1565181015865-41b4e0c5b6e7?auto=format&fit=crop&q=80&w=500",
      createdAt: "2023-07-15"
    },
    {
      id: "2",
      name: "Organic Milk",
      category: "Dairy",
      price: 3.99,
      discountPrice: 3.49,
      stock: 15,
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=500",
      createdAt: "2023-07-20"
    },
    {
      id: "3",
      name: "Mixed Vegetables",
      category: "Vegetables",
      price: 6.99,
      discountPrice: null,
      stock: 8,
      image: "https://images.unsplash.com/photo-1557844352-761f2565b576?auto=format&fit=crop&q=80&w=500",
      createdAt: "2023-07-25"
    },
    {
      id: "4",
      name: "Local Cheese",
      category: "Dairy",
      price: 7.49,
      discountPrice: null,
      stock: 10,
      image: "https://images.unsplash.com/photo-1589881133595-a3c085cb731d?auto=format&fit=crop&q=80&w=500",
      createdAt: "2023-08-01"
    },
    {
      id: "5",
      name: "Fresh Pasta",
      category: "Grains",
      price: 5.99,
      discountPrice: 4.99,
      stock: 12,
      image: "https://images.unsplash.com/photo-1605590955562-be1a5fda4161?auto=format&fit=crop&q=80&w=500",
      createdAt: "2023-08-05"
    }
  ]);

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
    
    toast({
      title: "Product deleted",
      description: "The product has been removed from your inventory.",
    });
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout title="My Products" subtitle="Manage your shop products and inventory">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-prisona-600" />
            <span>Product Inventory</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
            <div className="relative md:w-80">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name or category"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button>
                <Plus className="h-4 w-4 mr-1" />
                Add New Product
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="h-10 w-10 rounded-md object-cover"
                        />
                        <div className="font-medium">{product.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      {product.discountPrice ? (
                        <div>
                          <span className="text-red-600">${product.discountPrice.toFixed(2)}</span>
                          <span className="text-gray-400 line-through ml-2">${product.price.toFixed(2)}</span>
                        </div>
                      ) : (
                        <span>${product.price.toFixed(2)}</span>
                      )}
                    </TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      {product.stock > 10 ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          In Stock
                        </Badge>
                      ) : product.stock > 0 ? (
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                          Low Stock
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                          Out of Stock
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
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                          onClick={() => deleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredProducts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <p className="text-gray-500">No products found</p>
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
            <CardTitle>Product Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-prisona-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-prisona-700">{products.length}</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">On Discount</p>
                <p className="text-2xl font-bold text-blue-700">
                  {products.filter(product => product.discountPrice !== null).length}
                </p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-yellow-700">
                  {products.filter(product => product.stock > 0 && product.stock <= 10).length}
                </p>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-red-700">
                  {products.filter(product => product.stock === 0).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full justify-start">
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Package className="h-4 w-4 mr-2" />
                Update Inventory
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Edit className="h-4 w-4 mr-2" />
                Edit Shop Information
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Products;
