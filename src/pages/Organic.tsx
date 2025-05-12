
import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { mockProducts } from "@/data/mock-data";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, Check, Award, Info } from "lucide-react";

const Organic = () => {
  // Filter only organic products
  const organicProducts = mockProducts.filter(product => product.isOrganic === true);
  
  // Group products by category for better organization
  const productsByCategory = organicProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, typeof mockProducts>);
  
  // Get unique categories
  const categories = Object.keys(productsByCategory);
  
  // For featured category display
  const [activeTab, setActiveTab] = useState(categories[0] || "");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-green-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
              <Leaf className="h-4 w-4 mr-1" /> 
              100% Organic
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-green-900">
              Organic Products
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Our organic products are grown without synthetic pesticides or fertilizers, GMOs, 
              antibiotics or growth hormones. We're committed to sustainable farming practices 
              that are better for you and the planet.
            </p>
            <Button className="bg-green-700 hover:bg-green-800">
              Learn About Our Certification
            </Button>
          </div>
        </div>
      </div>
      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center p-6">
                <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Certified Organic</h3>
                <p className="text-gray-600">
                  All products meet strict organic certification requirements verified by independent authorities.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Sustainable Farming</h3>
                <p className="text-gray-600">
                  Our farmers use regenerative practices that protect soil health and biodiversity.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
                <p className="text-gray-600">
                  Higher nutritional value and better taste from naturally grown products.
                </p>
              </div>
            </div>
            
            <div className="mb-12">
              <div className="flex flex-col items-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Browse Organic Products</h2>
                <p className="text-gray-600 text-center max-w-3xl">
                  Discover our selection of organic products, carefully sourced from trusted farms.
                </p>
              </div>
              
              {/* Category tabs */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={activeTab === category ? "default" : "outline"}
                    onClick={() => setActiveTab(category)}
                    className={activeTab === category ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Button>
                ))}
              </div>
              
              {/* Products display */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeTab && productsByCategory[activeTab]?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-full text-green-700">
                  <Info className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Why Choose Organic?</h3>
                  <p className="text-gray-600 mb-4">
                    Organic farming practices help reduce pollution, conserve water, reduce soil erosion,
                    increase soil fertility, and use less energy. They also prohibit the use of synthetic
                    pesticides and fertilizers, which can have harmful effects on our health and environment.
                  </p>
                  <Button variant="link" className="text-green-700 p-0">
                    Read our comprehensive guide to organic farming
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Organic;
