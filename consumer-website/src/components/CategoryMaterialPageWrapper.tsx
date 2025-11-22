'use client';

import { useEffect, useState } from 'react';
import CategoryMaterialPage from './CategoryMaterialPage';
import { productApi } from '@/lib/api';
import { productData } from '@/lib/productData';

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

interface CategoryMaterialPageWrapperProps {
  params: {
    categoryName: string;
  };
  fallbackProducts: Product[];
}

export default function CategoryMaterialPageWrapper({ params, fallbackProducts }: CategoryMaterialPageWrapperProps) {
  // Filter products immediately based on categoryName
  const categoryName = params?.categoryName ?? '';
  const materialName = categoryName
    ? categoryName.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
    : '';
  
  // Use fallbackProducts if provided and not empty, otherwise filter from productData
  const sourceData = fallbackProducts.length > 0 ? fallbackProducts : productData;
  
  const initialFiltered = sourceData.filter(p => {
    if (categoryName === 'coins-and-bars') {
      return p.category === 'Coins' || p.category === 'Bars';
    }
    return materialName ? p.material.toLowerCase() === materialName.toLowerCase() : false;
  });
  
  const [products, setProducts] = useState<Product[]>(initialFiltered);
  const [loading, setLoading] = useState(false); // Start with false since we have fallback data

  useEffect(() => {
    // Update products when params change
    const categoryName = params?.categoryName ?? '';
    const materialName = categoryName
      ? categoryName.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
      : '';
    const sourceData = fallbackProducts.length > 0 ? fallbackProducts : productData;
    
    const filtered = sourceData.filter(p => {
      if (categoryName === 'coins-and-bars') {
        return p.category === 'Coins' || p.category === 'Bars';
      }
      return materialName ? p.material.toLowerCase() === materialName.toLowerCase() : false;
    });
    
    setProducts(filtered);
    
    // Try to fetch from API in the background
    const fetchFromAPI = async () => {
      try {
        const response = await productApi.getAllProducts({ material: categoryName });
        if (Array.isArray(response) && response.length > 0) {
          setProducts(response);
        } else if (response.products && Array.isArray(response.products) && response.products.length > 0) {
          setProducts(response.products);
        }
      } catch (apiError) {
        console.log('API fetch failed, using local data:', apiError);
        // Already using local data, no need to change
      }
    };

    fetchFromAPI();
  }, [params.categoryName, fallbackProducts]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return <CategoryMaterialPage params={params} fallbackProducts={products} />;
}

