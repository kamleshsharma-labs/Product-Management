'use client';

import React, { useEffect } from 'react';
import AddProductForm from '@/components/AddProductForm';
import { useSearchParams, useRouter } from 'next/navigation';
import { requireAuth } from '@/utils/auth';

const ProductsPage =()=>{
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');
  const router = useRouter();
  useEffect(() => {
    requireAuth(router);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-10">
      <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
        Product Management
      </h1>
      <p className="text-lg text-gray-600 mt-3">
        Easily manage and organize your product catalog
      </p>
    </div>
    <div className="grid gap-10">
      <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6">
        <AddProductForm productId={productId || undefined} />
      </div>
    </div>
  </div>
</div>
  );
}
export default ProductsPage