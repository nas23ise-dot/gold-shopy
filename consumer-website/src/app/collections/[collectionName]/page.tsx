import CollectionClient from '@/components/CollectionClient';

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

// Product data - in a real application, this would be fetched from an API
const productData: Product[] = [
  // Gold Category
  {
    id: 1,
    name: "Classic Gold Chain Necklace",
    price: 185000,
    originalPrice: 220000,
    image: "https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=Gold+Chain",
    category: "Necklaces",
    material: "Gold",
    rating: 4.8,
    reviews: 124,
    discount: 16,
    isBestseller: true,
    tags: ["classic", "everyday", "gifting"]
  },
  {
    id: 2,
    name: "Elegant Gold Pendant Necklace",
    price: 155000,
    image: "https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=Gold+Pendant+Necklace",
    category: "Necklaces",
    material: "Gold",
    rating: 4.7,
    reviews: 96,
    isNew: true,
    tags: ["elegant", "statement"]
  },
  {
    id: 3,
    name: "Elegant Gold Earrings",
    price: 65000,
    image: "https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=Gold+Earrings",
    category: "Earrings",
    material: "Gold",
    rating: 4.6,
    reviews: 89,
    tags: ["elegant", "daily wear"]
  },
  {
    id: 4,
    name: "Gold Drop Earrings",
    price: 75000,
    image: "https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=Gold+Drop+Earrings",
    category: "Earrings",
    material: "Gold",
    rating: 4.5,
    reviews: 72,
    tags: ["drop", "lightweight"]
  },
  {
    id: 5,
    name: "Traditional Gold Bangles",
    price: 125000,
    image: "https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=Gold+Bangles",
    category: "Bangles",
    material: "Gold",
    rating: 4.7,
    reviews: 156,
    isNew: true,
    tags: ["traditional", "festive"]
  },
  {
    id: 6,
    name: "Gold Cuff Bangles",
    price: 145000,
    image: "https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=Gold+Cuff+Bangles",
    category: "Bangles",
    material: "Gold",
    rating: 4.6,
    reviews: 87,
    tags: ["cuff", "modern"]
  },
  {
    id: 7,
    name: "Rose Gold Wedding Band",
    price: 315000,
    image: "https://via.placeholder.com/400x400/E11D48/FFFFFF?text=Rose+Gold+Ring",
    category: "Rings",
    material: "Rose Gold",
    rating: 4.8,
    reviews: 203,
    isNew: true,
    tags: ["wedding", "romantic", "trending"]
  },
  {
    id: 8,
    name: "Gold Promise Ring",
    price: 85000,
    image: "https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=Gold+Promise+Ring",
    category: "Rings",
    material: "Gold",
    rating: 4.4,
    reviews: 64,
    tags: ["promise", "delicate"]
  },
  {
    id: 9,
    name: "Gold Pendant with Diamond",
    price: 95000,
    originalPrice: 110000,
    image: "https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=Gold+Pendant",
    category: "Pendants",
    material: "Gold",
    rating: 4.5,
    reviews: 76,
    discount: 14,
    tags: ["delicate", "versatile"]
  },
  {
    id: 10,
    name: "Heart Shaped Gold Pendant",
    price: 115000,
    image: "https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=Heart+Gold+Pendant",
    category: "Pendants",
    material: "Gold",
    rating: 4.7,
    reviews: 103,
    tags: ["heart", "romantic"]
  },
  
  // Diamond Category
  {
    id: 11,
    name: "Diamond Solitaire Ring",
    price: 675000,
    image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Diamond+Ring",
    category: "Rings",
    material: "Diamond",
    rating: 4.9,
    reviews: 87,
    isBestseller: true,
    tags: ["engagement", "luxury", "certified"]
  },
  {
    id: 12,
    name: "Diamond Halo Ring",
    price: 725000,
    image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Diamond+Halo+Ring",
    category: "Rings",
    material: "Diamond",
    rating: 4.8,
    reviews: 64,
    tags: ["halo", "luxury"]
  },
  {
    id: 13,
    name: "Diamond Tennis Necklace",
    price: 550000,
    image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Diamond+Necklace",
    category: "Necklaces",
    material: "Diamond",
    rating: 4.7,
    reviews: 64,
    tags: ["elegant", "evening wear"]
  },
  {
    id: 14,
    name: "Diamond Pendant Necklace",
    price: 485000,
    image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Diamond+Pendant+Necklace",
    category: "Necklaces",
    material: "Diamond",
    rating: 4.6,
    reviews: 78,
    tags: ["pendant", "versatile"]
  },
  {
    id: 15,
    name: "Diamond Stud Earrings",
    price: 295000,
    originalPrice: 350000,
    image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Diamond+Earrings",
    category: "Earrings",
    material: "Diamond",
    rating: 4.6,
    reviews: 112,
    discount: 16,
    tags: ["classic", "timeless"]
  },
  {
    id: 16,
    name: "Diamond Hoop Earrings",
    price: 325000,
    image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Diamond+Hoop+Earrings",
    category: "Earrings",
    material: "Diamond",
    rating: 4.7,
    reviews: 89,
    tags: ["hoop", "trendy"]
  },
  {
    id: 17,
    name: "Diamond Tennis Bracelet",
    price: 425000,
    image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Diamond+Bracelet",
    category: "Bangles",
    material: "Diamond",
    rating: 4.7,
    reviews: 56,
    tags: ["tennis", "elegant"]
  },
  {
    id: 18,
    name: "Diamond Cuff Bracelet",
    price: 395000,
    image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Diamond+Cuff+Bracelet",
    category: "Bangles",
    material: "Diamond",
    rating: 4.5,
    reviews: 42,
    tags: ["cuff", "luxury"]
  },
  {
    id: 19,
    name: "Diamond Pendant Necklace",
    price: 425000,
    image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Diamond+Pendant",
    category: "Pendants",
    material: "Diamond",
    rating: 4.5,
    reviews: 91,
    tags: ["versatile", "special occasion"]
  },
  {
    id: 20,
    name: "Diamond Heart Pendant",
    price: 395000,
    image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Diamond+Heart+Pendant",
    category: "Pendants",
    material: "Diamond",
    rating: 4.6,
    reviews: 74,
    tags: ["heart", "romantic"]
  },
  
  // Platinum Category
  {
    id: 21,
    name: "Platinum Engagement Ring",
    price: 380000,
    image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Platinum+Ring",
    category: "Rings",
    material: "Platinum",
    rating: 4.7,
    reviews: 67,
    tags: ["modern", "durable"]
  },
  {
    id: 22,
    name: "Platinum Wedding Band",
    price: 295000,
    image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Platinum+Wedding+Band",
    category: "Rings",
    material: "Platinum",
    rating: 4.6,
    reviews: 89,
    tags: ["wedding", "classic"]
  },
  {
    id: 23,
    name: "Platinum Hoop Earrings",
    price: 195000,
    image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Platinum+Earrings",
    category: "Earrings",
    material: "Platinum",
    rating: 4.6,
    reviews: 54,
    tags: ["contemporary", "everyday"]
  },
  {
    id: 24,
    name: "Platinum Stud Earrings",
    price: 175000,
    image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Platinum+Stud+Earrings",
    category: "Earrings",
    material: "Platinum",
    rating: 4.5,
    reviews: 67,
    tags: ["stud", "minimalist"]
  },
  {
    id: 25,
    name: "Platinum Chain Necklace",
    price: 295000,
    image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Platinum+Necklace",
    category: "Necklaces",
    material: "Platinum",
    rating: 4.5,
    reviews: 78,
    tags: ["minimalist", "versatile"]
  },
  {
    id: 26,
    name: "Platinum Pendant Necklace",
    price: 325000,
    image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Platinum+Pendant+Necklace",
    category: "Necklaces",
    material: "Platinum",
    rating: 4.6,
    reviews: 45,
    tags: ["pendant", "elegant"]
  },
  {
    id: 27,
    name: "Platinum Cuff Bracelet",
    price: 420000,
    image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Platinum+Bangle",
    category: "Bangles",
    material: "Platinum",
    rating: 4.8,
    reviews: 39,
    isNew: true,
    tags: ["statement", "modern"]
  },
  {
    id: 28,
    name: "Platinum Tennis Bracelet",
    price: 395000,
    image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Platinum+Tennis+Bracelet",
    category: "Bangles",
    material: "Platinum",
    rating: 4.7,
    reviews: 52,
    tags: ["tennis", "classic"]
  },
  
  // Silver Category
  {
    id: 29,
    name: "Silver Statement Necklace",
    price: 25000,
    image: "https://via.placeholder.com/400x400/C0C0C0/1F2937?text=Silver+Necklace",
    category: "Necklaces",
    material: "Silver",
    rating: 4.4,
    reviews: 123,
    tags: ["trendy", "affordable"]
  },
  {
    id: 30,
    name: "Silver Pendant Necklace",
    price: 22000,
    image: "https://via.placeholder.com/400x400/C0C0C0/1F2937?text=Silver+Pendant+Necklace",
    category: "Necklaces",
    material: "Silver",
    rating: 4.5,
    reviews: 87,
    tags: ["pendant", "versatile"]
  },
  {
    id: 31,
    name: "Silver Drop Earrings",
    price: 12000,
    originalPrice: 15000,
    image: "https://via.placeholder.com/400x400/C0C0C0/1F2937?text=Silver+Earrings",
    category: "Earrings",
    material: "Silver",
    rating: 4.3,
    reviews: 87,
    discount: 20,
    tags: ["casual", "lightweight"]
  },
  {
    id: 32,
    name: "Silver Hoop Earrings",
    price: 15000,
    image: "https://via.placeholder.com/400x400/C0C0C0/1F2937?text=Silver+Hoop+Earrings",
    category: "Earrings",
    material: "Silver",
    rating: 4.4,
    reviews: 64,
    tags: ["hoop", "trendy"]
  },
  {
    id: 33,
    name: "Silver Ring Set",
    price: 18000,
    image: "https://via.placeholder.com/400x400/C0C0C0/1F2937?text=Silver+Rings",
    category: "Rings",
    material: "Silver",
    rating: 4.5,
    reviews: 145,
    isBestseller: true,
    tags: ["set", "variety"]
  },
  {
    id: 34,
    name: "Silver Promise Ring",
    price: 12000,
    image: "https://via.placeholder.com/400x400/C0C0C0/1F2937?text=Silver+Promise+Ring",
    category: "Rings",
    material: "Silver",
    rating: 4.3,
    reviews: 78,
    tags: ["promise", "delicate"]
  },
  {
    id: 35,
    name: "Silver Bangles Combo",
    price: 22000,
    image: "https://via.placeholder.com/400x400/C0C0C0/1F2937?text=Silver+Bangles",
    category: "Bangles",
    material: "Silver",
    rating: 4.6,
    reviews: 98,
    tags: ["combo", "festive"]
  },
  {
    id: 36,
    name: "Silver Cuff Bracelet",
    price: 18000,
    image: "https://via.placeholder.com/400x400/C0C0C0/1F2937?text=Silver+Cuff+Bracelet",
    category: "Bangles",
    material: "Silver",
    rating: 4.4,
    reviews: 67,
    tags: ["cuff", "casual"]
  },
  
  // Coins & Bars
  {
    id: 37,
    name: "10g Gold Coin",
    price: 75000,
    image: "https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=10g+Gold+Coin",
    category: "Coins",
    material: "Gold",
    rating: 4.9,
    reviews: 156,
    isBestseller: true,
    tags: ["investment", "pure gold"]
  },
  {
    id: 38,
    name: "1 Oz Silver Coin",
    price: 3500,
    image: "https://via.placeholder.com/400x400/C0C0C0/1F2937?text=1+Oz+Silver+Coin",
    category: "Coins",
    material: "Silver",
    rating: 4.7,
    reviews: 89,
    tags: ["investment", "pure silver"]
  },
  {
    id: 39,
    name: "100g Gold Bar",
    price: 720000,
    image: "https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=100g+Gold+Bar",
    category: "Bars",
    material: "Gold",
    rating: 4.8,
    reviews: 76,
    tags: ["investment", "pure gold"]
  },
  {
    id: 40,
    name: "1kg Silver Bar",
    price: 85000,
    image: "https://via.placeholder.com/400x400/C0C0C0/1F2937?text=1kg+Silver+Bar",
    category: "Bars",
    material: "Silver",
    rating: 4.6,
    reviews: 64,
    tags: ["investment", "pure silver"]
  },
  {
    id: 41,
    name: "50g Gold Coin Set",
    price: 360000,
    image: "https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=50g+Gold+Coin+Set",
    category: "Coins",
    material: "Gold",
    rating: 4.7,
    reviews: 42,
    isNew: true,
    tags: ["gift", "collection"]
  },
  {
    id: 42,
    name: "10 Oz Silver Coin Set",
    price: 32000,
    image: "https://via.placeholder.com/400x400/C0C0C0/1F2937?text=10+Oz+Silver+Coin+Set",
    category: "Coins",
    material: "Silver",
    rating: 4.5,
    reviews: 58,
    tags: ["gift", "collection"]
  },
  {
    id: 43,
    name: "500g Gold Bar",
    price: 3600000,
    image: "https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=500g+Gold+Bar",
    category: "Bars",
    material: "Gold",
    rating: 4.9,
    reviews: 31,
    tags: ["investment", "premium"]
  },
  {
    id: 44,
    name: "500g Silver Bar",
    price: 42000,
    image: "https://via.placeholder.com/400x400/C0C0C0/1F2937?text=500g+Silver+Bar",
    category: "Bars",
    material: "Silver",
    rating: 4.7,
    reviews: 47,
    tags: ["investment", "bulk"]
  }
];

const CollectionPage = ({ params }: CollectionPageProps) => {
  // Decode and format the collection name
  const collectionName = decodeURIComponent(params.collectionName);
  
  return (
    <CollectionClient collectionName={collectionName} productData={productData} />
  );
};

import { generateStaticParams } from './generateStaticParams';

export { generateStaticParams };

export default CollectionPage;
