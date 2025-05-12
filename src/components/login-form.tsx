
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { useAuth } from "@/contexts/auth-context";
import { UserRole } from "@/types/user";

const LoginForm = () => {
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("customer");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields.",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(email, password, role);
      
      if (success) {
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        
        // Redirect based on role
        switch (role) {
          case 'customer':
            navigate('/customer/dashboard');
            break;
          case 'shop_owner':
            navigate('/shop-owner/dashboard');
            break;
          case 'farmer':
            navigate('/farmer/dashboard');
            break;
          case 'delivery_agent':
            navigate('/delivery-agent/dashboard');
            break;
          case 'delivery_admin':
            navigate('/delivery-admin/dashboard');
            break;
          case 'overall_admin':
            navigate('/admin/dashboard');
            break;
          default:
            navigate('/');
        }
      } else {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Invalid email, password, or role combination.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "An error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
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
        <Label htmlFor="password">Password</Label>
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
        <Label htmlFor="role">Login As</Label>
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
            <SelectItem value="overall_admin">Overall Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button
        type="submit"
        className="w-full bg-prisona-500 hover:bg-prisona-600"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>
      
      <div className="text-sm text-center text-gray-500">
        <p>
          Demo accounts: <br />
          <span className="text-xs">
            customer@example.com, shop@example.com, farmer@example.com, <br />
            agent@example.com, delivery-admin@example.com, admin@example.com
          </span>
          <br />
          <span className="text-xs">
            (use any password)
          </span>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
