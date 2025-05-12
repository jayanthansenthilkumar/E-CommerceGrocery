
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { useAuth } from "@/contexts/auth-context";
import { UserRole } from "@/types/user";

const RegisterForm = () => {
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<UserRole>("customer");
  const [address, setAddress] = useState("");

  // Specific fields based on role
  const [shopName, setShopName] = useState("");
  const [shopDescription, setShopDescription] = useState("");
  const [farmName, setFarmName] = useState("");
  const [farmLocation, setFarmLocation] = useState("");
  const [farmDescription, setFarmDescription] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields.",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match.",
      });
      return;
    }
    
    // Additional validation for specific roles
    if (role === 'shop_owner' && !shopName) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Shop name is required for shop owners.",
      });
      return;
    }
    
    if (role === 'farmer' && (!farmName || !farmLocation)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Farm name and location are required for farmers.",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      let userData = {
        name,
        email,
        role,
        phoneNumber: phone,
        address,
      };
      
      // Add role-specific fields
      if (role === 'shop_owner') {
        userData = {
          ...userData,
          shopName,
          shopDescription,
          isApproved: false,
        };
      } else if (role === 'farmer') {
        userData = {
          ...userData,
          farmName,
          farmLocation,
          farmDescription,
          isApproved: false,
        };
      } else if (role === 'delivery_agent') {
        userData = {
          ...userData,
          isAvailable: true,
          isApproved: false,
        };
      } else if (role === 'delivery_admin') {
        userData = {
          ...userData,
          isApproved: false,
        };
      }
      
      const success = await register(userData, password);
      
      if (success) {
        toast({
          title: "Registration Successful",
          description: role === 'customer' ? 
            "Welcome to Prisona Store!" :
            "Your account has been created and is pending approval.",
        });
        
        if (role === 'customer') {
          navigate('/customer/dashboard');
        } else {
          navigate('/registration-pending');
        }
      } else {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: "An account with this email may already exist.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: "An error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="role">Register As</Label>
        <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="customer">Customer</SelectItem>
            <SelectItem value="shop_owner">Shop Owner</SelectItem>
            <SelectItem value="farmer">Farmer</SelectItem>
            <SelectItem value="delivery_agent">Delivery Agent</SelectItem>
            <SelectItem value="delivery_admin">Delivery Admin</SelectItem>
          </SelectContent>
        </Select>
        {role !== 'customer' && (
          <p className="text-xs text-amber-600">Note: Non-customer accounts require approval by admins before activation.</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      
      {/* Role-specific fields */}
      {role === 'shop_owner' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="shopName">Shop Name *</Label>
            <Input
              id="shopName"
              placeholder="Your Shop Name"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shopDescription">Shop Description</Label>
            <Textarea
              id="shopDescription"
              placeholder="Tell us about your shop..."
              value={shopDescription}
              onChange={(e) => setShopDescription(e.target.value)}
              rows={3}
            />
          </div>
        </>
      )}
      
      {role === 'farmer' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="farmName">Farm Name *</Label>
            <Input
              id="farmName"
              placeholder="Your Farm Name"
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="farmLocation">Farm Location *</Label>
            <Input
              id="farmLocation"
              placeholder="City, State"
              value={farmLocation}
              onChange={(e) => setFarmLocation(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="farmDescription">Farm Description</Label>
            <Textarea
              id="farmDescription"
              placeholder="Tell us about your farm products and practices..."
              value={farmDescription}
              onChange={(e) => setFarmDescription(e.target.value)}
              rows={3}
            />
          </div>
        </>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          placeholder="Your full address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows={2}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password *</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password *</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      
      <Button
        type="submit"
        className="w-full bg-prisona-500 hover:bg-prisona-600"
        disabled={isLoading}
      >
        {isLoading ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
};

export default RegisterForm;
