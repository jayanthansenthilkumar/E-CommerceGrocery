
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";
import { Product } from "@/types/user";

const Products = () => {
  // Mock products data - in a real app, this would come from an API
  const products: Product[] = [
    {
      id: "1",
      name: "Fresh Apples",
      description: "Freshly picked apples from local orchards",
      price: 3.99,
      discountPrice: undefined,
      images: ["https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=500"],
      category: "fruits",
      vendorId: "v1",
      vendorType: "farmer",
      vendorName: "Green Farm",
      stock: 50,
      isOrganic: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      name: "Organic Carrots",
      description: "Organic carrots grown without pesticides",
      price: 2.49,
      discountPrice: undefined,
      images: ["https://images.unsplash.com/photo-1598170845023-7d5aa3c13now?auto=format&fit=crop&q=80&w=500"],
      category: "vegetables",
      vendorId: "v2",
      vendorType: "shop_owner",
      vendorName: "Organic Harvest",
      stock: 100,
      isOrganic: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      name: "Brown Rice",
      description: "Healthy whole grain brown rice",
      price: 4.99,
      discountPrice: undefined,
      images: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=500"],
      category: "grains",
      vendorId: "v3",
      vendorType: "shop_owner",
      vendorName: "Grocery World",
      stock: 200,
      isOrganic: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "4",
      name: "Organic Honey",
      description: "Raw organic honey from local beekeepers",
      price: 7.99,
      discountPrice: undefined,
      images: ["https://images.unsplash.com/photo-1498936178812-4b2e558d2937?auto=format&fit=crop&q=80&w=500"],
      category: "sweeteners",
      vendorId: "v4",
      vendorType: "farmer",
      vendorName: "Nature's Best",
      stock: 30,
      isOrganic: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "5",
      name: "Fresh Tomatoes",
      description: "Vine-ripened tomatoes picked at peak freshness",
      price: 2.99,
      discountPrice: undefined,
      images: ["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=500"],
      category: "vegetables",
      vendorId: "v1",
      vendorType: "farmer",
      vendorName: "Green Farm",
      stock: 80,
      isOrganic: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "6",
      name: "Organic Eggs",
      description: "Free-range organic eggs from pasture-raised hens",
      price: 5.49,
      discountPrice: undefined,
      images: ["https://images.unsplash.com/photo-1509479100390-67f4c1e4f4cc?auto=format&fit=crop&q=80&w=500"],
      category: "dairy",
      vendorId: "v5",
      vendorType: "farmer",
      vendorName: "Happy Hens",
      stock: 60,
      isOrganic: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-prisona-50 py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-prisona-800 mb-6">All Products</h1>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
              Browse our wide selection of fresh groceries from local shops and farmers. Quality products delivered to your doorstep.
            </p>
            
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div className="mb-4 md:mb-0">
                <select className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-prisona-500">
                  <option>All Categories</option>
                  <option>Fruits & Vegetables</option>
                  <option>Dairy & Eggs</option>
                  <option>Bakery</option>
                  <option>Meat & Poultry</option>
                  <option>Pantry Items</option>
                </select>
              </div>
              
              <div>
                <select className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-prisona-500">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Name: A-Z</option>
                  <option>Name: Z-A</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
            
            <div className="mt-10 flex justify-center">
              <nav aria-label="Pagination" className="flex justify-center">
                <ul className="flex items-center space-x-2">
                  <li>
                    <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-prisona-50">
                      Previous
                    </button>
                  </li>
                  <li>
                    <button className="px-3 py-1 border border-prisona-500 bg-prisona-500 text-white rounded-md">
                      1
                    </button>
                  </li>
                  <li>
                    <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-prisona-50">
                      2
                    </button>
                  </li>
                  <li>
                    <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-prisona-50">
                      3
                    </button>
                  </li>
                  <li>
                    <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-prisona-50">
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
