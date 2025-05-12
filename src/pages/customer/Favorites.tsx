
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { 
  Search, 
  Heart, 
  ShoppingCart, 
  Store, 
  Leaf
} from "lucide-react";

interface Favorite {
  id: string;
  name: string;
  price: number;
  image: string;
  vendorName: string;
  vendorType: 'shop_owner' | 'farmer';
  isOrganic: boolean;
  isInStock: boolean;
}

const Favorites = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data for favorites
  const [favorites, setFavorites] = useState<Favorite[]>([
    {
      id: "1",
      name: "Organic Apples",
      price: 3.99,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=500",
      vendorName: "Green Farm",
      vendorType: "farmer",
      isOrganic: true,
      isInStock: true
    },
    {
      id: "2",
      name: "Whole Grain Bread",
      price: 4.99,
      image: "https://images.unsplash.com/photo-1565181015865-41b4e0c5b6e7?auto=format&fit=crop&q=80&w=500",
      vendorName: "Fresh Market",
      vendorType: "shop_owner",
      isOrganic: false,
      isInStock: true
    },
    {
      id: "3",
      name: "Organic Honey",
      price: 7.99,
      image: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937?auto=format&fit=crop&q=80&w=500",
      vendorName: "Nature's Best",
      vendorType: "farmer",
      isOrganic: true,
      isInStock: true
    },
    {
      id: "4",
      name: "Local Cheese",
      price: 7.49,
      image: "https://images.unsplash.com/photo-1589881133595-a3c085cb731d?auto=format&fit=crop&q=80&w=500",
      vendorName: "Fresh Market",
      vendorType: "shop_owner",
      isOrganic: false,
      isInStock: false
    },
    {
      id: "5",
      name: "Organic Spinach",
      price: 3.99,
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=500",
      vendorName: "Green Farm",
      vendorType: "farmer",
      isOrganic: true,
      isInStock: true
    }
  ]);

  const removeFavorite = (id: string) => {
    const product = favorites.find(fav => fav.id === id);
    setFavorites(prev => prev.filter(favorite => favorite.id !== id));
    
    if (product) {
      toast({
        title: "Removed from favorites",
        description: `${product.name} has been removed from your favorites.`
      });
    }
  };

  const addToCart = (id: string) => {
    const product = favorites.find(fav => fav.id === id);
    
    if (product) {
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`
      });
    }
  };

  // Filter favorites based on search term
  const filteredFavorites = favorites.filter(favorite => 
    favorite.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    favorite.vendorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout title="My Favorites" subtitle="Products you've saved for later">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-prisona-600" fill="currentColor" />
            <span>Favorited Products</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
            <div className="relative md:w-80">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search favorites"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Link to="/products">
                <Button variant="outline">
                  Browse More Products
                </Button>
              </Link>
            </div>
          </div>
          
          {filteredFavorites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredFavorites.map((favorite) => (
                <div key={favorite.id} className="border rounded-lg overflow-hidden">
                  <div className="relative h-40">
                    <img 
                      src={favorite.image} 
                      alt={favorite.name} 
                      className="w-full h-full object-cover"
                    />
                    <button 
                      className="absolute top-2 right-2 bg-white rounded-full p-1 hover:bg-gray-100"
                      onClick={() => removeFavorite(favorite.id)}
                    >
                      <Heart className="h-4 w-4 text-red-500" fill="currentColor" />
                    </button>
                    {favorite.isOrganic && (
                      <div className="absolute bottom-2 left-2 bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs flex items-center">
                        <Leaf className="h-3 w-3 mr-1" />
                        Organic
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-1">{favorite.name}</h3>
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <Store className="h-3 w-3 mr-1" />
                      {favorite.vendorName} · {favorite.vendorType === 'shop_owner' ? 'Shop' : 'Farm'}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-lg font-bold text-prisona-700">${favorite.price.toFixed(2)}</div>
                      <div>
                        {favorite.isInStock ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            In Stock
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                            Out of Stock
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-3"
                      disabled={!favorite.isInStock}
                      onClick={() => addToCart(favorite.id)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Heart className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
              <p className="text-gray-500 mb-4">
                Start adding products to your favorites while browsing the store.
              </p>
              <Link to="/products">
                <Button>
                  Start Shopping
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Favorites;
