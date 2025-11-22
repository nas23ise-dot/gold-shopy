import CollectionClient from '@/components/CollectionClient';
import { productData } from '@/lib/productData';
import { generateStaticParams } from './generateStaticParams';

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

interface CollectionPageProps {
  params: {
    collectionName: string;
  };
}

const CollectionPage = ({ params }: CollectionPageProps) => {
  // Decode and format the collection name
  const collectionName = decodeURIComponent(params.collectionName);
  
  // Use shared product data
  return (
    <CollectionClient collectionName={collectionName} productData={productData} />
  );
};

export { generateStaticParams };
export default CollectionPage;
