import React from 'react';
import ProductDetailsClient from './ProductDetailsClient';
import { productData } from '@/lib/productData';

export async function generateStaticParams() {
  return productData.map((p) => ({ id: p.id.toString() }));
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