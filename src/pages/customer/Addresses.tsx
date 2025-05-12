
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge"; // Added missing Badge import
import { useToast } from "@/components/ui/use-toast";
import { 
  Plus,
  MapPin,
  Home,
  Briefcase,
  Edit,
  Trash2,
  Check
} from "lucide-react";

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  type: 'home' | 'work' | 'other';
  isDefault: boolean;
}

const Addresses = () => {
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editAddressId, setEditAddressId] = useState<string | null>(null);
  
  // Mock data for addresses
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      name: "Home",
      street: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      country: "United States",
      type: 'home',
      isDefault: true
    },
    {
      id: "2",
      name: "Work",
      street: "456 Market St",
      city: "San Francisco",
      state: "CA",
      zip: "94103",
      country: "United States",
      type: 'work',
      isDefault: false
    },
    {
      id: "3",
      name: "Mom's House",
      street: "789 Oak Ave",
      city: "Oakland",
      state: "CA",
      zip: "94610",
      country: "United States",
      type: 'other',
      isDefault: false
    }
  ]);

  const removeAddress = (id: string) => {
    // Prevent removing the default address
    const address = addresses.find(addr => addr.id === id);
    
    if (address?.isDefault) {
      toast({
        title: "Cannot remove default address",
        description: "Please set another address as default before removing this one.",
        variant: "destructive"
      });
      return;
    }
    
    setAddresses(prev => prev.filter(address => address.id !== id));
    
    toast({
      title: "Address removed",
      description: "The address has been removed from your account."
    });
  };

  const setDefaultAddress = (id: string) => {
    setAddresses(prev => 
      prev.map(address => ({
        ...address,
        isDefault: address.id === id
      }))
    );
    
    const address = addresses.find(addr => addr.id === id);
    
    if (address) {
      toast({
        title: "Default address updated",
        description: `${address.name} is now your default delivery address.`
      });
    }
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would send this data to an API
    toast({
      title: "Address added",
      description: "Your new address has been added successfully."
    });
    
    setShowAddForm(false);
  };

  const handleEditAddress = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would send this data to an API
    toast({
      title: "Address updated",
      description: "Your address has been updated successfully."
    });
    
    setEditAddressId(null);
  };

  const getAddressIcon = (type: string) => {
    switch (type) {
      case 'home':
        return <Home className="h-5 w-5 text-prisona-600" />;
      case 'work':
        return <Briefcase className="h-5 w-5 text-prisona-600" />;
      default:
        return <MapPin className="h-5 w-5 text-prisona-600" />;
    }
  };

  return (
    <DashboardLayout title="My Addresses" subtitle="Manage your delivery addresses">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-prisona-600" />
              <span>Saved Addresses</span>
            </div>
            <Button 
              size="sm" 
              onClick={() => setShowAddForm(!showAddForm)}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add New Address
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {showAddForm && (
            <div className="mb-6 border rounded-lg p-4 bg-gray-50">
              <h3 className="font-medium text-gray-900 mb-4">Add New Address</h3>
              <form onSubmit={handleAddAddress} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name / Label
                  </label>
                  <Input required placeholder="e.g. Home, Work, etc." />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Type
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="home">Home</option>
                    <option value="work">Work</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address
                  </label>
                  <Input required />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <Input required />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <Input required />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code
                    </label>
                    <Input required />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <Input defaultValue="United States" required />
                </div>
                
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="isDefault" className="rounded" />
                  <label htmlFor="isDefault" className="text-sm font-medium text-gray-700">
                    Set as default address
                  </label>
                </div>
                
                <div className="md:col-span-2 flex justify-end gap-2">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Add Address
                  </Button>
                </div>
              </form>
            </div>
          )}
          
          <div className="space-y-4">
            {addresses.map((address) => (
              <div key={address.id} className="border rounded-lg p-4">
                {editAddressId === address.id ? (
                  <form onSubmit={handleEditAddress} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name / Label
                      </label>
                      <Input defaultValue={address.name} required />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address Type
                      </label>
                      <select className="w-full p-2 border border-gray-300 rounded-md" defaultValue={address.type}>
                        <option value="home">Home</option>
                        <option value="work">Work</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <Input defaultValue={address.street} required />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <Input defaultValue={address.city} required />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <Input defaultValue={address.state} required />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code
                        </label>
                        <Input defaultValue={address.zip} required />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <Input defaultValue={address.country} required />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id={`isDefault-${address.id}`} 
                        className="rounded"
                        defaultChecked={address.isDefault}
                      />
                      <label htmlFor={`isDefault-${address.id}`} className="text-sm font-medium text-gray-700">
                        Set as default address
                      </label>
                    </div>
                    
                    <div className="md:col-span-2 flex justify-end gap-2">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setEditAddressId(null)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        Update Address
                      </Button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {getAddressIcon(address.type)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 flex items-center gap-2">
                            {address.name}
                            {address.isDefault && (
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                Default
                              </Badge>
                            )}
                          </div>
                          <div className="text-gray-500 mt-1">
                            {address.street}<br />
                            {address.city}, {address.state} {address.zip}<br />
                            {address.country}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 w-8 p-0"
                            onClick={() => setEditAddressId(address.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          {!address.isDefault && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                              onClick={() => removeAddress(address.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        
                        {!address.isDefault && (
                          <Button 
                            size="sm" 
                            variant="link" 
                            className="mt-2"
                            onClick={() => setDefaultAddress(address.id)}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Set as Default
                          </Button>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
            
            {addresses.length === 0 && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <MapPin className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses saved</h3>
                <p className="text-gray-500 mb-4">
                  Add your first delivery address to make checkout faster.
                </p>
                <Button onClick={() => setShowAddForm(true)}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Address
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Addresses;
