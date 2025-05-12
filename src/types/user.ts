
export type UserRole = 
  | 'customer' 
  | 'shop_owner' 
  | 'farmer'
  | 'delivery_agent'
  | 'delivery_admin'
  | 'overall_admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phoneNumber?: string;
  address?: string;
  isApproved?: boolean;
  profileImage?: string;
  createdAt: Date;
  lastLogin?: Date;
}

export interface Customer extends User {
  role: 'customer';
  orders?: Order[];
}

export interface ShopOwner extends User {
  role: 'shop_owner';
  shopName: string;
  shopDescription?: string;
  shopLogo?: string;
  isApproved: boolean;
}

export interface Farmer extends User {
  role: 'farmer';
  farmName: string;
  farmDescription?: string;
  farmLocation?: string;
  isApproved: boolean;
}

export interface DeliveryAgent extends User {
  role: 'delivery_agent';
  isAvailable: boolean;
  currentLocation?: {
    latitude: number;
    longitude: number;
  };
  isApproved: boolean;
  assignedAdmin: string;
}

export interface DeliveryAdmin extends User {
  role: 'delivery_admin';
  region?: string;
  isApproved: boolean;
}

export interface OverallAdmin extends User {
  role: 'overall_admin';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: string;
  vendorId: string;
  vendorType: 'shop_owner' | 'farmer';
  vendorName: string;
  stock: number;
  isOrganic?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  deliveryAgentId?: string;
  deliveryCode?: string;
  shippingAddress: string;
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  vendorId: string;
  vendorType: 'shop_owner' | 'farmer';
}

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  isPercentage: boolean;
  minPurchase?: number;
  expiryDate: Date;
  vendorId: string;
  vendorType: 'shop_owner' | 'farmer';
  isActive: boolean;
}
