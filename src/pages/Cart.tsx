
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import {
  ShoppingCart, Trash2, Plus, Minus, ArrowRight, Tag, RefreshCw
} from "lucide-react";

// Mock cart item type
interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  vendor: string;
  vendorType: "farmer" | "shop";
}

// Mock cart data
const initialCartItems: CartItem[] = [
  {
    id: "1",
    name: "Organic Apples (1 lb)",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb",
    quantity: 2,
    vendor: "Green Hills Farm",
    vendorType: "farmer"
  },
  {
    id: "2",
    name: "Whole Grain Bread",
    price: 4.50,
    image: "https://images.unsplash.com/photo-1598373182133-52452f7691ef",
    quantity: 1,
    vendor: "Sunny Bake Shop",
    vendorType: "shop"
  },
  {
    id: "3",
    name: "Organic Carrots (Bundle)",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1598170845058-60f7a3c18eab",
    quantity: 3,
    vendor: "Green Hills Farm",
    vendorType: "farmer"
  }
];

const Cart = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [discount, setDiscount] = useState(0);
  
  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax - discount;
  
  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart."
    });
  };
  
  const handleApplyCoupon = () => {
    setIsApplyingCoupon(true);
    
    // Simulate coupon application
    setTimeout(() => {
      if (couponCode.toUpperCase() === "SAVE10") {
        const discountAmount = subtotal * 0.10; // 10% discount
        setDiscount(discountAmount);
        toast({
          title: "Coupon applied",
          description: `You saved $${discountAmount.toFixed(2)} with this coupon!`
        });
      } else {
        toast({
          title: "Invalid coupon",
          description: "The coupon code you entered is invalid or expired.",
          variant: "destructive"
        });
      }
      setIsApplyingCoupon(false);
    }, 1000);
  };
  
  const handleCheckout = () => {
    toast({
      title: "Proceeding to checkout",
      description: "This would normally take you to the checkout page."
    });
    // In a real app, we would navigate to the checkout page
    // navigate("/checkout");
  };
  
  // Group items by vendor for better organization
  const itemsByVendor = cartItems.reduce((acc, item) => {
    if (!acc[item.vendor]) {
      acc[item.vendor] = [];
    }
    acc[item.vendor].push(item);
    return acc;
  }, {} as Record<string, CartItem[]>);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 flex items-center">
            <ShoppingCart className="h-7 w-7 mr-3" />
            Your Cart
          </h1>
          
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {/* Cart items section */}
                <Card className="overflow-hidden mb-6">
                  <CardContent className="p-6">
                    {Object.entries(itemsByVendor).map(([vendor, items]) => (
                      <div key={vendor} className="mb-6 last:mb-0">
                        <div className="flex items-center mb-3">
                          <h3 className="font-semibold">{vendor}</h3>
                          <span className="ml-2 px-2 py-1 bg-gray-100 text-xs rounded-full">
                            {items[0].vendorType === "farmer" ? "Farm" : "Shop"}
                          </span>
                        </div>
                        
                        <div className="space-y-4">
                          {items.map((item) => (
                            <div key={item.id} className="flex flex-col sm:flex-row gap-4 pb-4 border-b last:border-b-0 last:pb-0">
                              <div className="sm:w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
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
                                <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                                  <h4 className="font-medium">{item.name}</h4>
                                  <span className="font-medium text-gray-900">
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </span>
                                </div>
                                
                                <p className="text-gray-500 text-sm mb-3">
                                  ${item.price.toFixed(2)} each
                                </p>
                                
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                    >
                                      <Minus className="h-3 w-3" />
                                    </Button>
                                    
                                    <span className="w-12 text-center">{item.quantity}</span>
                                    
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                    >
                                      <Plus className="h-3 w-3" />
                                    </Button>
                                  </div>
                                  
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => handleRemoveItem(item.id)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <Separator className="my-6 last:hidden" />
                      </div>
                    ))}
                    
                    <div className="mt-6 flex justify-between items-center">
                      <Button variant="outline" className="gap-2" asChild>
                        <Link to="/products">
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Continue Shopping
                        </Link>
                      </Button>
                      
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items in your cart
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                {/* Order summary section */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>
                          {shipping === 0 ? (
                            <span className="text-green-600">Free</span>
                          ) : (
                            `$${shipping.toFixed(2)}`
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Estimated Tax</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      
                      {discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount</span>
                          <span>-${discount.toFixed(2)}</span>
                        </div>
                      )}
                      
                      <Separator className="my-3" />
                      
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <Button 
                          variant="outline"
                          onClick={handleApplyCoupon}
                          disabled={!couponCode || isApplyingCoupon}
                        >
                          {isApplyingCoupon ? "Applying..." : "Apply"}
                        </Button>
                      </div>
                      
                      <div className="mt-2 text-xs text-gray-500 flex items-center">
                        <Tag className="h-3 w-3 mr-1" />
                        Try "SAVE10" for 10% off your order
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mb-4"
                      onClick={handleCheckout}
                    >
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    
                    <p className="text-xs text-gray-500 text-center">
                      By proceeding to checkout, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Button asChild>
                <Link to="/products">Browse Products</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;
