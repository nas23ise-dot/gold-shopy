import React from 'react';
import ProductDetailsClient from './ProductDetailsClient';

// Generate static params for static export
export async function generateStaticParams() {
  // In a real application, this would fetch from a database or API
  // For now, we'll generate a larger range of product IDs
  return Array.from({ length: 20 }, (_, i) => ({
    id: (i + 1).toString(),
  }));
}

interface ProductDetailsProps {
  params: {
    id: string;
  };
}

const ProductDetailsPage = ({ params }: ProductDetailsProps) => {
  return <ProductDetailsClient params={params} />;
};

export default ProductDetailsPage;