
import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { mockProducts } from "@/data/mock-data";
import ProductCard from "@/components/product-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, X } from "lucide-react";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [category, setCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  
  // Categories derived from product data
  const categories = ["all", ...new Set(mockProducts.map(p => p.category))];
  
  // Filter products based on search, price, and category
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCategory = category === "all" || product.category === category;
    
    return matchesSearch && matchesPrice && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold">All Products</h1>
            
            <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
              <div className="relative w-full md:w-64">
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              
              <Button 
                variant="outline"
                className="md:hidden flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters sidebar - always visible on desktop, toggleable on mobile */}
            <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
              <div className="bg-white p-6 rounded-lg border">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {/* Category filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Category
                    </label>
                    <Select 
                      value={category} 
                      onValueChange={setCategory}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Price range filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <Slider
                      defaultValue={[0, 100]}
                      max={100}
                      step={1}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="my-4"
                    />
                    <div className="flex justify-between text-sm">
                      <span>$0</span>
                      <span>$100</span>
                    </div>
                  </div>
                  
                  {/* Reset filters */}
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setSearchQuery("");
                      setPriceRange([0, 100]);
                      setCategory("all");
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Products grid */}
            <div className="lg:col-span-3">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No products found matching your criteria.</p>
                  <Button 
                    variant="link"
                    onClick={() => {
                      setSearchQuery("");
                      setPriceRange([0, 100]);
                      setCategory("all");
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Products;
