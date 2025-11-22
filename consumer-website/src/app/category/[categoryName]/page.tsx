import React from 'react';
import CategoryMaterialPageWrapper from '@/components/CategoryMaterialPageWrapper';

interface CategoryPageProps {
  params: {
    categoryName: string;
  };
}

// Generate static params
export async function generateStaticParams() {
  return [
    { categoryName: 'gold' },
    { categoryName: 'diamond' },
    { categoryName: 'platinum' },
    { categoryName: 'silver' },
    { categoryName: 'coins-and-bars' }
  ];
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return <CategoryMaterialPageWrapper params={params} fallbackProducts={[]} />;
}

