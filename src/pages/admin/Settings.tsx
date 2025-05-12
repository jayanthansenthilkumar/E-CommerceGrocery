
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Settings as SettingsIcon, Globe, Bell, Shield, CreditCard, Save } from "lucide-react";

const AdminSettings = () => {
  const { toast } = useToast();
  const [generalSettings] = useState({
    siteName: "Prisona Store",
    siteUrl: "https://prisonastore.com",
    adminEmail: "admin@prisonastore.com",
    customerSupportEmail: "support@prisonastore.com",
    defaultCurrency: "USD",
    defaultLanguage: "en",
    timezone: "America/Los_Angeles"
  });
  
  const [notificationSettings] = useState({
    enableEmailNotifications: true,
    enablePushNotifications: false,
    notifyOnNewOrders: true,
    notifyOnCancellations: true,
    notifyOnCustomerSignups: true,
    notifyOnLowInventory: true,
    dailySummary: true,
    weeklySummary: true
  });
  
  const [securitySettings] = useState({
    requireStrongPasswords: true,
    twoFactorAuth: false,
    sessionTimeout: "30",
    maxLoginAttempts: "5",
    passwordExpirationDays: "90"
  });
  
  const [paymentSettings] = useState({
    allowCreditCards: true,
    allowPaypal: true,
    allowBankTransfer: false,
    testMode: true,
    autoCapturePayments: true,
    defaultPaymentMethod: "credit_card"
  });
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully."
    });
  };

  return (
    <DashboardLayout
      title="Platform Settings"
      subtitle="Configure and manage system-wide settings"
    >
      <div className="mb-6">
        <Tabs defaultValue="general">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <SettingsIcon className="h-5 w-5" />
                  <CardTitle>General Settings</CardTitle>
                </div>
                <CardDescription>Configure basic platform settings and information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input id="siteName" defaultValue={generalSettings.siteName} />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="siteUrl">Site URL</Label>
                    <Input id="siteUrl" defaultValue={generalSettings.siteUrl} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="adminEmail">Admin Email</Label>
                      <Input id="adminEmail" defaultValue={generalSettings.adminEmail} />
                    </div>
                    
                    <div className="grid gap-3">
                      <Label htmlFor="supportEmail">Customer Support Email</Label>
                      <Input id="supportEmail" defaultValue={generalSettings.customerSupportEmail} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="defaultCurrency">Default Currency</Label>
                      <Select defaultValue={generalSettings.defaultCurrency}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD - US Dollar</SelectItem>
                          <SelectItem value="EUR">EUR - Euro</SelectItem>
                          <SelectItem value="GBP">GBP - British Pound</SelectItem>
                          <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                          <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-3">
                      <Label htmlFor="defaultLanguage">Default Language</Label>
                      <Select defaultValue={generalSettings.defaultLanguage}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="ja">Japanese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue={generalSettings.timezone}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Los_Angeles">Pacific Time (US & Canada)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (US & Canada)</SelectItem>
                        <SelectItem value="America/New_York">Eastern Time (US & Canada)</SelectItem>
                        <SelectItem value="Europe/London">London</SelectItem>
                        <SelectItem value="Europe/Paris">Paris</SelectItem>
                        <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                        <SelectItem value="Australia/Sydney">Sydney</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button onClick={handleSaveSettings}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  <CardTitle>Notification Settings</CardTitle>
                </div>
                <CardDescription>Configure how and when notifications are sent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <h3 className="text-lg font-medium">Notification Channels</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailNotifications" className="text-base">Email Notifications</Label>
                        <p className="text-sm text-gray-500">Receive notifications via email</p>
                      </div>
                      <Switch id="emailNotifications" defaultChecked={notificationSettings.enableEmailNotifications} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="pushNotifications" className="text-base">Push Notifications</Label>
                        <p className="text-sm text-gray-500">Receive notifications on your browser or mobile app</p>
                      </div>
                      <Switch id="pushNotifications" defaultChecked={notificationSettings.enablePushNotifications} />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid gap-3">
                    <h3 className="text-lg font-medium">Event Notifications</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="newOrders" className="text-base">New Orders</Label>
                        <p className="text-sm text-gray-500">Notify when a new order is placed</p>
                      </div>
                      <Switch id="newOrders" defaultChecked={notificationSettings.notifyOnNewOrders} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="cancellations" className="text-base">Cancellations</Label>
                        <p className="text-sm text-gray-500">Notify when an order is cancelled</p>
                      </div>
                      <Switch id="cancellations" defaultChecked={notificationSettings.notifyOnCancellations} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="customerSignups" className="text-base">Customer Signups</Label>
                        <p className="text-sm text-gray-500">Notify when a new customer registers</p>
                      </div>
                      <Switch id="customerSignups" defaultChecked={notificationSettings.notifyOnCustomerSignups} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="lowInventory" className="text-base">Low Inventory</Label>
                        <p className="text-sm text-gray-500">Notify when product inventory is low</p>
                      </div>
                      <Switch id="lowInventory" defaultChecked={notificationSettings.notifyOnLowInventory} />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid gap-3">
                    <h3 className="text-lg font-medium">Summaries</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="dailySummary" className="text-base">Daily Summary</Label>
                        <p className="text-sm text-gray-500">Receive a summary of activities each day</p>
                      </div>
                      <Switch id="dailySummary" defaultChecked={notificationSettings.dailySummary} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="weeklySummary" className="text-base">Weekly Summary</Label>
                        <p className="text-sm text-gray-500">Receive a summary of activities each week</p>
                      </div>
                      <Switch id="weeklySummary" defaultChecked={notificationSettings.weeklySummary} />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button onClick={handleSaveSettings}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  <CardTitle>Security Settings</CardTitle>
                </div>
                <CardDescription>Configure platform security and access controls</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="strongPasswords" className="text-base">Require Strong Passwords</Label>
                      <p className="text-sm text-gray-500">Enforce complex passwords for all users</p>
                    </div>
                    <Switch id="strongPasswords" defaultChecked={securitySettings.requireStrongPasswords} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="twoFactorAuth" className="text-base">Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-500">Require 2FA for administrative access</p>
                    </div>
                    <Switch id="twoFactorAuth" defaultChecked={securitySettings.twoFactorAuth} />
                  </div>
                  
                  <Separator />
                  
                  <div className="grid gap-3">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input id="sessionTimeout" type="number" min="5" defaultValue={securitySettings.sessionTimeout} />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="loginAttempts">Max Failed Login Attempts</Label>
                    <Input id="loginAttempts" type="number" min="1" defaultValue={securitySettings.maxLoginAttempts} />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="passwordExpiry">Password Expiration (days)</Label>
                    <Input id="passwordExpiry" type="number" min="0" defaultValue={securitySettings.passwordExpirationDays} />
                    <p className="text-xs text-gray-500">Set to 0 to disable password expiration</p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button onClick={handleSaveSettings}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  <CardTitle>Payment Settings</CardTitle>
                </div>
                <CardDescription>Configure payment methods and processing options</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <h3 className="text-lg font-medium">Payment Methods</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="creditCards" className="text-base">Credit Cards</Label>
                        <p className="text-sm text-gray-500">Accept credit card payments</p>
                      </div>
                      <Switch id="creditCards" defaultChecked={paymentSettings.allowCreditCards} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="paypal" className="text-base">PayPal</Label>
                        <p className="text-sm text-gray-500">Accept PayPal payments</p>
                      </div>
                      <Switch id="paypal" defaultChecked={paymentSettings.allowPaypal} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="bankTransfer" className="text-base">Bank Transfer</Label>
                        <p className="text-sm text-gray-500">Accept bank transfer payments</p>
                      </div>
                      <Switch id="bankTransfer" defaultChecked={paymentSettings.allowBankTransfer} />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid gap-3">
                    <h3 className="text-lg font-medium">Processing Options</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="testMode" className="text-base">Test Mode</Label>
                        <p className="text-sm text-gray-500">Process payments in sandbox mode</p>
                      </div>
                      <Switch id="testMode" defaultChecked={paymentSettings.testMode} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="autoCapture" className="text-base">Auto-Capture Payments</Label>
                        <p className="text-sm text-gray-500">Automatically capture authorized payments</p>
                      </div>
                      <Switch id="autoCapture" defaultChecked={paymentSettings.autoCapturePayments} />
                    </div>
                    
                    <div className="grid gap-3">
                      <Label htmlFor="defaultPaymentMethod">Default Payment Method</Label>
                      <Select defaultValue={paymentSettings.defaultPaymentMethod}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select default method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="credit_card">Credit Card</SelectItem>
                          <SelectItem value="paypal">PayPal</SelectItem>
                          <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button onClick={handleSaveSettings}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;
