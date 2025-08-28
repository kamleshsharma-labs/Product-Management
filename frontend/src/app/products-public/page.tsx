'use client';
import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';

const ProductsPublicPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data.data); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
          <p className="text-gray-600 mt-2">Explore our range of products</p>
        </div>

        {
        products && 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        }
      </div>
    </div>
  );
};

export default ProductsPublicPage;
