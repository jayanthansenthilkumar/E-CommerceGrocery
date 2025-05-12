
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingCart, Tag, Truck, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';
import { mockProducts } from '@/data/mock-data';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredProducts = mockProducts.slice(0, 4);
  const organicProducts = mockProducts.filter(product => product.isOrganic).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-prisona-50 to-organic-light leaf-bg py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-prisona-800">
              Fresh Groceries <br />Delivered to Your Door
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Shop from local farms and stores for the freshest produce and groceries, all in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="bg-prisona-500 hover:bg-prisona-600 btn-hover">
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-prisona-500 text-prisona-500 hover:bg-prisona-50 btn-hover">
                <Link to="/farmers">Meet Our Farmers</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="/placeholder.svg" 
              alt="Fresh groceries basket" 
              className="rounded-lg shadow-lg max-w-md w-full"
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-organic-light p-3 rounded-full mb-4">
                <ShoppingCart className="h-6 w-6 text-prisona-700" />
              </div>
              <h3 className="font-medium text-xl mb-2">Multi-vendor Shopping</h3>
              <p className="text-gray-600">Shop from multiple stores and farms in a single order</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-organic-light p-3 rounded-full mb-4">
                <Truck className="h-6 w-6 text-prisona-700" />
              </div>
              <h3 className="font-medium text-xl mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your groceries delivered right to your doorstep</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-organic-light p-3 rounded-full mb-4">
                <CheckCircle className="h-6 w-6 text-prisona-700" />
              </div>
              <h3 className="font-medium text-xl mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">All products are quality checked before delivery</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-organic-light p-3 rounded-full mb-4">
                <Tag className="h-6 w-6 text-prisona-700" />
              </div>
              <h3 className="font-medium text-xl mb-2">Exclusive Offers</h3>
              <p className="text-gray-600">Get special discounts and coupon codes from vendors</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-playfair font-semibold text-prisona-800">Featured Products</h2>
            <Button variant="ghost" asChild className="text-prisona-600 hover:text-prisona-700 hover:bg-prisona-50">
              <Link to="/products" className="flex items-center">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Organic Section */}
      <section className="py-16 bg-organic-light">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-playfair font-semibold text-prisona-800">Pure Organic</h2>
            <Button variant="ghost" asChild className="text-prisona-600 hover:text-prisona-700 hover:bg-prisona-50">
              <Link to="/organic" className="flex items-center">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {organicProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-playfair font-semibold text-center mb-12 text-prisona-800">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="text-amber-400 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4">"The fresh produce from local farmers is amazing! I love being able to support local businesses while getting the best quality food for my family."</p>
              <p className="font-medium">- Sarah Johnson</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="text-amber-400 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4">"Delivery is always quick, and I love being able to track my order. The produce is always fresh and exactly what I ordered."</p>
              <p className="font-medium">- Michael Thompson</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="text-amber-400 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4">"The organic selection is incredible. As someone who cares about what goes into my food, I appreciate the transparency about where products come from."</p>
              <p className="font-medium">- Emily Chen</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-prisona-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-playfair font-semibold mb-4">Ready to Shop Fresh?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers who shop at Prisona Store for the freshest groceries delivered directly to their home.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild className="bg-white text-prisona-600 hover:bg-gray-100 btn-hover">
              <Link to="/register">Create an Account</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-prisona-700 btn-hover">
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
