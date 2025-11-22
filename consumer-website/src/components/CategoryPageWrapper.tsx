'use client';

import { useEffect, useState, useMemo } from 'react';
import CategoryPage from './CategoryPage';
import { productApi } from '@/lib/api';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  material: string;
  rating: number;
  reviews: number;
  discount?: number;
  isNew?: boolean;
  isBestseller?: boolean;
  tags: string[];
}

interface CategoryPageWrapperProps {
  params: {
    categoryName: string;
    itemName: string;
  };
  fallbackProducts: Product[];
}

export default function CategoryPageWrapper({ params, fallbackProducts }: CategoryPageWrapperProps) {
  // Pass all products to CategoryPage - it will handle the filtering
  // Ensure we always have products, use fallbackProducts or empty array
  const [products, setProducts] = useState<Product[]>(fallbackProducts || []);
  const [loading, setLoading] = useState(false); // Start with false since we have fallback data

  useEffect(() => {
    // Always ensure we have fallback products set
    if (fallbackProducts && fallbackProducts.length > 0) {
      setProducts(fallbackProducts);
    }
    
    // Try to fetch from API in the background (but don't replace if it fails or returns empty)
    const fetchProducts = async () => {
      try {
        const categoryName = params.categoryName;
        const itemName = params.itemName;
        const apiProducts = await productApi.getProductsByCategory(categoryName, itemName);
        // Only update if we got products from API
        if (Array.isArray(apiProducts) && apiProducts.length > 0) {
          setProducts(apiProducts);
        }
        // If API returns empty, keep using fallback products (already set above)
      } catch (error) {
        // Keep using fallback products - they're already set
        console.log('API fetch failed, using fallback products');
      }
    };

    fetchProducts();
  }, [params.categoryName, params.itemName, fallbackProducts]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Loading...</h1>
          <p className="text-gray-600">Please wait while we load the products.</p>
        </div>
      </div>
    );
  }

  return <CategoryPage params={params} products={products} />;
}

