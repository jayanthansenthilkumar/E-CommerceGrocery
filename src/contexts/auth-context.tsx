
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types/user';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  register: (userData: Partial<User>, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Customer',
    email: 'customer@example.com',
    role: 'customer',
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Alice Shop Owner',
    email: 'shop@example.com',
    role: 'shop_owner',
    isApproved: true,
    createdAt: new Date(),
  } as User,
  {
    id: '3',
    name: 'Bob Farmer',
    email: 'farmer@example.com',
    role: 'farmer',
    isApproved: true,
    createdAt: new Date(),
  } as User,
  {
    id: '4',
    name: 'Carol Delivery Agent',
    email: 'agent@example.com',
    role: 'delivery_agent',
    isApproved: true,
    createdAt: new Date(),
  } as User,
  {
    id: '5',
    name: 'Dave Delivery Admin',
    email: 'delivery-admin@example.com',
    role: 'delivery_admin',
    isApproved: true,
    createdAt: new Date(),
  } as User,
  {
    id: '6',
    name: 'Eve Overall Admin',
    email: 'admin@example.com',
    role: 'overall_admin',
    createdAt: new Date(),
  } as User,
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('prisonaUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find user by email and role
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.role === role
    );

    if (foundUser) {
      // In a real app, you'd verify the password here
      setUser(foundUser);
      localStorage.setItem('prisonaUser', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('prisonaUser');
  };

  const register = async (userData: Partial<User>, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if email already exists
    const emailExists = mockUsers.some(u => u.email === userData.email);
    
    if (emailExists) {
      setIsLoading(false);
      return false;
    }
    
    // In a real app, you'd save this user to your database
    const newUser: User = {
      id: String(mockUsers.length + 1),
      name: userData.name || '',
      email: userData.email || '',
      role: userData.role || 'customer',
      isApproved: userData.role === 'customer',
      createdAt: new Date(),
      lastLogin: new Date(),
      ...userData
    };
    
    // For demo purposes, we'll add it to our mock array
    mockUsers.push(newUser);
    
    // Only auto-login for customers
    if (userData.role === 'customer') {
      setUser(newUser);
      localStorage.setItem('prisonaUser', JSON.stringify(newUser));
    }
    
    setIsLoading(false);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
