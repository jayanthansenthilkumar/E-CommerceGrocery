
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Heart, Leaf, BadgeCheck, Building, Globe, Users, Send } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              About Prisona Store
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Connecting farmers, shop owners, and customers in a sustainable ecosystem for fresh, quality products.
            </p>
          </div>
        </div>
      </div>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-4">
                At Prisona Store, we're on a mission to transform how food moves from farm to table. 
                We believe in creating a marketplace that benefits everyone: farmers receive fair compensation 
                for their hard work, shop owners access quality products, and customers enjoy fresh, 
                sustainably-produced goods.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                We're committed to promoting sustainable agriculture, reducing food waste, and supporting 
                local economies through our innovative platform that brings together all parts of the food ecosystem.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <Heart className="h-4 w-4 mr-2" /> Our Values
                </Button>
                <Button variant="outline">
                  <Users className="h-4 w-4 mr-2" /> Meet Our Team
                </Button>
              </div>
            </div>
            <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 italic">Company image placeholder</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Leaf className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
                <p className="text-gray-600">
                  We promote environmentally friendly practices throughout our supply chain, 
                  from organic farming methods to eco-friendly packaging and delivery.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <BadgeCheck className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Quality</h3>
                <p className="text-gray-600">
                  We maintain high standards for all products on our platform, 
                  ensuring customers receive only the best quality goods every time.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Building className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community</h3>
                <p className="text-gray-600">
                  We build strong relationships between all participants in our ecosystem, 
                  fostering a sense of community and shared purpose.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Our Story</h2>
            <p className="text-xl text-gray-700 mb-12 text-center max-w-3xl mx-auto">
              How we grew from a small idea to a thriving marketplace connecting 
              farmers, shop owners, and consumers.
            </p>
            
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                <div className="md:col-span-2 bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 italic">Timeline image 2020</p>
                </div>
                <div className="md:col-span-3">
                  <h3 className="text-2xl font-semibold mb-3">2020: The Beginning</h3>
                  <p className="text-gray-700">
                    Prisona Store was founded with a simple vision: to create a direct 
                    connection between local farmers and consumers. What started as a 
                    small operation with just five farmers has grown into a comprehensive 
                    platform serving thousands across the country.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                <div className="md:col-span-3 md:order-1 order-2">
                  <h3 className="text-2xl font-semibold mb-3">2022: Expanding Our Reach</h3>
                  <p className="text-gray-700">
                    We introduced our innovative delivery network to ensure fresh products 
                    reach customers quickly while maintaining quality. This expansion allowed 
                    us to serve more communities and provide better support to our growing 
                    network of farmers and shop owners.
                  </p>
                </div>
                <div className="md:col-span-2 md:order-2 order-1 bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 italic">Timeline image 2022</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                <div className="md:col-span-2 bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 italic">Timeline image 2025</p>
                </div>
                <div className="md:col-span-3">
                  <h3 className="text-2xl font-semibold mb-3">2025: Where We Are Today</h3>
                  <p className="text-gray-700">
                    Today, Prisona Store has evolved into a complete ecosystem that supports 
                    sustainable agriculture, empowers local businesses, and provides consumers 
                    with access to high-quality, ethically-sourced products. We're proud of 
                    our journey and excited about the future ahead.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-teal-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Globe className="h-12 w-12 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-xl mb-8">
              Whether you're a farmer, shop owner, or conscious consumer, 
              you can be part of our movement for a better food system.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-white text-teal-700 hover:bg-gray-100">
                <Send className="h-4 w-4 mr-2" /> Get Started
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-teal-600">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
