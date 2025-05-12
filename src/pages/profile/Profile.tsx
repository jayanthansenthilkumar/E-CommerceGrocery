
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, Shield, Key, Bell, Lock, CreditCard } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [personalInfo, setPersonalInfo] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Apt 4B',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94107',
    country: 'United States'
  });
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePersonalInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate saving
    setTimeout(() => {
      setIsEditingPersonal(false);
      toast({
        title: "Profile updated",
        description: "Your personal information has been updated successfully."
      });
    }, 1000);
  };
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate password change
    setTimeout(() => {
      setIsChangingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully."
      });
    }, 1000);
  };
  
  const handleCancelPersonalInfo = () => {
    setIsEditingPersonal(false);
    // Reset form to original values
    setPersonalInfo({
      firstName: user?.name?.split(' ')[0] || '',
      lastName: user?.name?.split(' ')[1] || '',
      email: user?.email || '',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, Apt 4B',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94107',
      country: 'United States'
    });
  };
  
  const handleCancelPassword = () => {
    setIsChangingPassword(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  
  return (
    <DashboardLayout
      title="Profile Settings"
      subtitle="Manage your account information and preferences"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>
                    {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                  </AvatarFallback>
                </Avatar>
                
                <h2 className="text-xl font-semibold">{user?.name}</h2>
                <p className="text-gray-500 mb-2">{user?.email}</p>
                
                <Badge variant="outline" className="mb-4">
                  {user?.role || 'Customer'}
                </Badge>
                
                <Button variant="outline" size="sm" className="w-full mb-4">
                  Change Profile Picture
                </Button>
                
                <p className="text-xs text-gray-500">
                  Account created on {new Date().toLocaleDateString()}
                </p>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Account Status</p>
                    <p className="text-sm text-gray-500">Active</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Subscription</p>
                    <p className="text-sm text-gray-500">Premium Plan</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-amber-500" />
                  <div>
                    <p className="font-medium">Last Login</p>
                    <p className="text-sm text-gray-500">Today at 10:45 AM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal" className="flex items-center gap-2">
                <User className="h-4 w-4" /> Personal
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Lock className="h-4 w-4" /> Security
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" /> Notifications
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Personal Information</CardTitle>
                    {!isEditingPersonal && (
                      <Button variant="outline" onClick={() => setIsEditingPersonal(true)}>
                        Edit
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePersonalInfoSubmit}>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          {isEditingPersonal ? (
                            <Input
                              id="firstName"
                              name="firstName"
                              value={personalInfo.firstName}
                              onChange={handlePersonalInfoChange}
                              required
                            />
                          ) : (
                            <div className="flex items-center gap-2 h-10 px-3 border rounded-md">
                              <User className="h-4 w-4 text-gray-400" />
                              <span>{personalInfo.firstName}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          {isEditingPersonal ? (
                            <Input
                              id="lastName"
                              name="lastName"
                              value={personalInfo.lastName}
                              onChange={handlePersonalInfoChange}
                              required
                            />
                          ) : (
                            <div className="flex items-center gap-2 h-10 px-3 border rounded-md">
                              <User className="h-4 w-4 text-gray-400" />
                              <span>{personalInfo.lastName}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        {isEditingPersonal ? (
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={personalInfo.email}
                            onChange={handlePersonalInfoChange}
                            required
                          />
                        ) : (
                          <div className="flex items-center gap-2 h-10 px-3 border rounded-md">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span>{personalInfo.email}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        {isEditingPersonal ? (
                          <Input
                            id="phone"
                            name="phone"
                            value={personalInfo.phone}
                            onChange={handlePersonalInfoChange}
                          />
                        ) : (
                          <div className="flex items-center gap-2 h-10 px-3 border rounded-md">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span>{personalInfo.phone}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        {isEditingPersonal ? (
                          <Input
                            id="address"
                            name="address"
                            value={personalInfo.address}
                            onChange={handlePersonalInfoChange}
                          />
                        ) : (
                          <div className="flex items-center gap-2 h-10 px-3 border rounded-md">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span>{personalInfo.address}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          {isEditingPersonal ? (
                            <Input
                              id="city"
                              name="city"
                              value={personalInfo.city}
                              onChange={handlePersonalInfoChange}
                            />
                          ) : (
                            <div className="flex items-center gap-2 h-10 px-3 border rounded-md">
                              <span>{personalInfo.city}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          {isEditingPersonal ? (
                            <Input
                              id="state"
                              name="state"
                              value={personalInfo.state}
                              onChange={handlePersonalInfoChange}
                            />
                          ) : (
                            <div className="flex items-center gap-2 h-10 px-3 border rounded-md">
                              <span>{personalInfo.state}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">Zip Code</Label>
                          {isEditingPersonal ? (
                            <Input
                              id="zipCode"
                              name="zipCode"
                              value={personalInfo.zipCode}
                              onChange={handlePersonalInfoChange}
                            />
                          ) : (
                            <div className="flex items-center gap-2 h-10 px-3 border rounded-md">
                              <span>{personalInfo.zipCode}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          {isEditingPersonal ? (
                            <Input
                              id="country"
                              name="country"
                              value={personalInfo.country}
                              onChange={handlePersonalInfoChange}
                            />
                          ) : (
                            <div className="flex items-center gap-2 h-10 px-3 border rounded-md">
                              <span>{personalInfo.country}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {isEditingPersonal && (
                        <div className="flex justify-end gap-3">
                          <Button type="button" variant="outline" onClick={handleCancelPersonalInfo}>
                            Cancel
                          </Button>
                          <Button type="submit">Save Changes</Button>
                        </div>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Password & Security</CardTitle>
                    {!isChangingPassword && (
                      <Button variant="outline" onClick={() => setIsChangingPassword(true)}>
                        Change Password
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {isChangingPassword ? (
                    <form onSubmit={handlePasswordSubmit}>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="flex justify-end gap-3">
                          <Button type="button" variant="outline" onClick={handleCancelPassword}>
                            Cancel
                          </Button>
                          <Button type="submit">Update Password</Button>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <p className="font-medium mb-1">Password</p>
                        <p className="text-sm text-gray-500">
                          Last updated 30 days ago
                        </p>
                      </div>
                      
                      <div>
                        <p className="font-medium mb-1">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500 mb-2">
                          Add an extra layer of security to your account
                        </p>
                        <Button variant="outline" size="sm">
                          Enable 2FA
                        </Button>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <p className="font-medium mb-1">Active Sessions</p>
                        <div className="space-y-3 mt-3">
                          <div className="flex justify-between items-center p-3 border rounded-md">
                            <div>
                              <p className="font-medium">This Device</p>
                              <p className="text-xs text-gray-500">
                                San Francisco, CA • Last active now
                              </p>
                            </div>
                            <Badge>Current</Badge>
                          </div>
                          
                          <div className="flex justify-between items-center p-3 border rounded-md">
                            <div>
                              <p className="font-medium">iPhone 13</p>
                              <p className="text-xs text-gray-500">
                                New York, NY • Last active 2 hours ago
                              </p>
                            </div>
                            <Button size="sm" variant="outline">
                              Sign Out
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Order Updates</p>
                          <p className="text-sm text-gray-500">
                            Receive notifications about your order status
                          </p>
                        </div>
                        <div className="flex gap-4">
                          <Label className="flex items-center gap-2">
                            <input type="checkbox" className="rounded" defaultChecked />
                            <span>Email</span>
                          </Label>
                          <Label className="flex items-center gap-2">
                            <input type="checkbox" className="rounded" defaultChecked />
                            <span>SMS</span>
                          </Label>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Promotions</p>
                          <p className="text-sm text-gray-500">
                            Receive information about deals and discounts
                          </p>
                        </div>
                        <div className="flex gap-4">
                          <Label className="flex items-center gap-2">
                            <input type="checkbox" className="rounded" defaultChecked />
                            <span>Email</span>
                          </Label>
                          <Label className="flex items-center gap-2">
                            <input type="checkbox" className="rounded" />
                            <span>SMS</span>
                          </Label>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">System Notifications</p>
                          <p className="text-sm text-gray-500">
                            Important updates about your account or the platform
                          </p>
                        </div>
                        <div className="flex gap-4">
                          <Label className="flex items-center gap-2">
                            <input type="checkbox" className="rounded" defaultChecked />
                            <span>Email</span>
                          </Label>
                          <Label className="flex items-center gap-2">
                            <input type="checkbox" className="rounded" defaultChecked />
                            <span>SMS</span>
                          </Label>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Newsletter</p>
                          <p className="text-sm text-gray-500">
                            Occasional news about products and features
                          </p>
                        </div>
                        <div className="flex gap-4">
                          <Label className="flex items-center gap-2">
                            <input type="checkbox" className="rounded" />
                            <span>Email</span>
                          </Label>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full">Save Preferences</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
