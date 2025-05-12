
import { Link } from "react-router-dom";
import { Product } from "@/types/user";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-all hover:shadow-lg">
      <Link to={`/product/${product.id}`}>
        <div className="relative h-48 bg-gray-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-contain"
          />
          {product.isOrganic && (
            <div className="absolute top-2 left-2 bg-organic-dark text-white text-xs font-bold px-2 py-1 rounded-full">
              Organic
            </div>
          )}
          {product.discountPrice && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              Sale
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <p className="text-xs text-gray-500 mb-1">
            {product.vendorType === 'farmer' ? 'Farm Fresh' : 'Shop Product'} • {product.category}
          </p>
          <Link to={`/product/${product.id}`} className="hover:text-prisona-500">
            <h3 className="font-medium text-lg mb-1">{product.name}</h3>
          </Link>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
          <p className="text-xs text-gray-500 mb-3">by {product.vendorName}</p>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div>
            {product.discountPrice ? (
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-prisona-700">${product.discountPrice.toFixed(2)}</span>
                <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
              </div>
            ) : (
              <span className="text-lg font-semibold text-prisona-700">${product.price.toFixed(2)}</span>
            )}
          </div>
          <Button size="sm" className="bg-prisona-500 hover:bg-prisona-600">
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
