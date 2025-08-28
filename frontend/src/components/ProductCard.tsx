'use client';
import React, { useState } from 'react';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
  };

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl  overflow-hidden  border border-gray-100 animate-fade-in">
      <div className="h-48 bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-4 right-4 w-8 h-8 bg-blue-200 rounded-full animate-float-1"></div>
        <div className="absolute bottom-4 left-4 w-6 h-6 bg-purple-200 rounded-full animate-float-2"></div>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg" 
          alt={product.name}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {product.name}
        </h3>
        {product.description && (
          <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-md">
            ${product.price}
          </span>
          <button 
            onClick={handleAddToCart}
            className={`px-4 py-2 rounded-md font-medium transition-all duration-300 transform hover:scale-105 ${
              isAdded 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg'
            }`}
            disabled={isAdded}
          >
            {isAdded ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
