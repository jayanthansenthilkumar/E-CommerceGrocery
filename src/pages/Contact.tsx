
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, Phone, Mail, Clock, MessageSquare, Users, Send, Truck, Store 
} from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general"
  });
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleInquiryChange = (value: string) => {
    setFormData(prev => ({ ...prev, inquiryType: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        inquiryType: "general"
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-gradient-to-r from-prisona-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Contact Us
            </h1>
            <p className="text-xl text-gray-700">
              Have questions or need help? We're here for you. Get in touch with our team.
            </p>
          </div>
        </div>
      </div>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="bg-prisona-100 p-3 rounded-full text-prisona-600">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Our Office</h3>
                      <p className="text-gray-600">
                        123 Prisona Way<br />
                        San Francisco, CA 94107
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email Us</h3>
                      <p className="text-gray-600">
                        General Inquiries:<br />
                        <a href="mailto:info@prisonastore.com" className="text-blue-600 hover:underline">
                          info@prisonastore.com
                        </a>
                      </p>
                      <p className="text-gray-600 mt-2">
                        Support:<br />
                        <a href="mailto:support@prisonastore.com" className="text-blue-600 hover:underline">
                          support@prisonastore.com
                        </a>
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-full text-green-600">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Call Us</h3>
                      <p className="text-gray-600">
                        Customer Service: <br />
                        <a href="tel:+1-800-123-4567" className="text-blue-600 hover:underline">
                          +1 (800) 123-4567
                        </a>
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="bg-amber-100 p-3 rounded-full text-amber-600">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg p-6 border">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="inquiryType">I am contacting about:</Label>
                      <RadioGroup 
                        value={formData.inquiryType} 
                        onValueChange={handleInquiryChange}
                        className="flex flex-wrap gap-4 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="general" id="general" />
                          <Label htmlFor="general" className="font-normal flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" /> General Inquiry
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="customer" id="customer" />
                          <Label htmlFor="customer" className="font-normal flex items-center">
                            <Users className="h-4 w-4 mr-1" /> Customer Support
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="delivery" id="delivery" />
                          <Label htmlFor="delivery" className="font-normal flex items-center">
                            <Truck className="h-4 w-4 mr-1" /> Delivery Issue
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="vendor" id="vendor" />
                          <Label htmlFor="vendor" className="font-normal flex items-center">
                            <Store className="h-4 w-4 mr-1" /> Vendor Inquiry
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john.doe@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number (Optional)</Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="+1 (555) 123-4567"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="How can we help you?"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Please describe your inquiry in detail..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Sending..." : (
                        <>
                          <Send className="h-4 w-4 mr-2" /> Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-gray-600 mb-8">
              Find quick answers to common questions about our platform.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm text-left">
                <h3 className="font-semibold mb-2">How do I track my order?</h3>
                <p className="text-gray-600">
                  You can track your order by logging into your account and viewing the 
                  order details. We provide real-time updates on your delivery status.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-left">
                <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600">
                  We accept all major credit cards, PayPal, and bank transfers. We also 
                  offer cash on delivery for specific locations.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-left">
                <h3 className="font-semibold mb-2">How do I become a vendor?</h3>
                <p className="text-gray-600">
                  You can apply to become a vendor by filling out our application form 
                  available in the "Sell with Us" section of our website.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-left">
                <h3 className="font-semibold mb-2">What is your return policy?</h3>
                <p className="text-gray-600">
                  We have a 7-day return policy for most products. Please check the specific 
                  product page for any exceptions to this policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
