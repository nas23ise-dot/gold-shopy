import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import CategoryPage from '@/components/CategoryPage';

// Product data - in a real application, this would be fetched from an API
const productData = [
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
    name: "Diamond Bangle Set",
    price: 780000,
    image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Diamond+Bangles",
    category: "Bangles",
    material: "Diamond",
    rating: 4.8,
    reviews: 43,
    isNew: true,
    tags: ["luxury", "statement"]
  },
  {
    id: 18,
    name: "Diamond Tennis Bracelet",
    price: 695000,
    image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Diamond+Bracelet",
    category: "Bangles",
    material: "Diamond",
    rating: 4.7,
    reviews: 56,
    tags: ["tennis", "elegant"]
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
    price: 25000,
    image: "https://via.placeholder.com/400x400/C0C0C0/1F2937?text=Silver+Cuff+Bracelet",
    category: "Bangles",
    material: "Silver",
    rating: 4.5,
    reviews: 67,
    tags: ["cuff", "modern"]
  },
    
  // Coins & Bars Category
  {
    id: 37,
    name: "10g Gold Coin",
    price: 45000,
    image: "https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=Gold+Coin",
    category: "Coins",
    material: "Gold",
    rating: 4.9,
    reviews: 210,
    isBestseller: true,
    tags: ["investment", "pure"]
  },
  {
    id: 38,
    name: "5g Gold Coin",
    price: 22500,
    image: "https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=5g+Gold+Coin",
    category: "Coins",
    material: "Gold",
    rating: 4.8,
    reviews: 156,
    tags: ["investment", "small"]
  },
  {
    id: 39,
    name: "100g Silver Bar",
    price: 8500,
    image: "https://via.placeholder.com/400x400/C0C0C0/1F2937?text=Silver+Bar",
    category: "Bars",
    material: "Silver",
    rating: 4.7,
    reviews: 156,
    tags: ["investment", "bulk"]
  },
  {
    id: 40,
    name: "50g Silver Bar",
    price: 4250,
    image: "https://via.placeholder.com/400x400/C0C0C0/1F2937?text=50g+Silver+Bar",
    category: "Bars",
    material: "Silver",
    rating: 4.6,
    reviews: 89,
    tags: ["investment", "medium"]
  },
  {
    id: 41,
    name: "100g Gold Bar",
    price: 450000,
    image: "https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=Gold+Bar",
    category: "Bars",
    material: "Gold",
    rating: 4.8,
    reviews: 89,
    isNew: true,
    tags: ["investment", "high value"]
  },
  {
    id: 42,
    name: "50g Gold Bar",
    price: 225000,
    image: "https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=50g+Gold+Bar",
    category: "Bars",
    material: "Gold",
    rating: 4.7,
    reviews: 67,
    tags: ["investment", "medium"]
  },
  {
    id: 43,
    name: "5g Silver Coin",
    price: 3500,
    originalPrice: 4000,
    image: "https://via.placeholder.com/400x400/C0C0C0/1F2937?text=Silver+Coin",
    category: "Coins",
    material: "Silver",
    rating: 4.5,
    reviews: 134,
    discount: 13,
    tags: ["affordable", "collectible"]
  },
  {
    id: 44,
    name: "1g Silver Coin",
    price: 700,
    image: "https://via.placeholder.com/400x400/C0C0C0/1F2937?text=1g+Silver+Coin",
    category: "Coins",
    material: "Silver",
    rating: 4.4,
    reviews: 98,
    tags: ["affordable", "entry"]
  }
];

interface CategoryItemPageProps {
  params: {
    categoryName: string;
    itemName: string;
  };
}

// Generate static params for static export
export async function generateStaticParams() {
  const categories = [
    // Gold Category
    { categoryName: 'gold', itemName: 'gold-necklaces' },
    { categoryName: 'gold', itemName: 'gold-earrings' },
    { categoryName: 'gold', itemName: 'gold-bangles' },
    { categoryName: 'gold', itemName: 'gold-rings' },
    { categoryName: 'gold', itemName: 'gold-pendants' },
    
    // Diamond Category
    { categoryName: 'diamond', itemName: 'diamond-necklaces' },
    { categoryName: 'diamond', itemName: 'diamond-earrings' },
    { categoryName: 'diamond', itemName: 'diamond-rings' },
    { categoryName: 'diamond', itemName: 'diamond-bangles' },
    { categoryName: 'diamond', itemName: 'diamond-pendants' },
    
    // Platinum Category
    { categoryName: 'platinum', itemName: 'platinum-rings' },
    { categoryName: 'platinum', itemName: 'platinum-earrings' },
    { categoryName: 'platinum', itemName: 'platinum-necklaces' },
    { categoryName: 'platinum', itemName: 'platinum-bangles' },
    
    // Silver Category
    { categoryName: 'silver', itemName: 'silver-necklaces' },
    { categoryName: 'silver', itemName: 'silver-earrings' },
    { categoryName: 'silver', itemName: 'silver-rings' },
    { categoryName: 'silver', itemName: 'silver-bangles' },
    
    // Coins & Bars Category
    { categoryName: 'coins-and-bars', itemName: 'gold-coins' },
    { categoryName: 'coins-and-bars', itemName: 'silver-coins' },
    { categoryName: 'coins-and-bars', itemName: 'gold-bars' },
    { categoryName: 'coins-and-bars', itemName: 'silver-bars' }
  ];

  return categories.map(({ categoryName, itemName }) => ({
    categoryName,
    itemName
  }));
}

export default function CategoryItemPage({ params }: CategoryItemPageProps) {
  return <CategoryPage params={params} products={productData} />;
}