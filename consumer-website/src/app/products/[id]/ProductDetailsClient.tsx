'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Shield, RotateCcw, Wrench, Award, Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import { addToCart, addToWishlist } from '@/lib/cartUtils';

interface ProductDetailsClientProps {
  params: {
    id: string;
  };
}

// Product data - in a real application, this would be fetched from an API
const productData: Record<string, any> = {
  '1': {
    id: 1,
    name: "Classic Gold Chain Necklace",
    price: 185000,
    originalPrice: 220000,
    discount: 16,
    rating: 4.8,
    reviews: 124,
    description: "A timeless gold chain necklace crafted with precision and attention to detail. Made from 22K pure gold with assurance of authenticity. Perfect for both everyday wear and special occasions.",
    images: [
      "https://via.placeholder.com/600x600/D4AF37/FFFFFF?text=Gold+Chain+A",
      "https://via.placeholder.com/600x600/D4AF37/FFFFFF?text=Gold+Chain+B",
      "https://via.placeholder.com/600x600/D4AF37/FFFFFF?text=Gold+Chain+C",
      "https://via.placeholder.com/600x600/D4AF37/FFFFFF?text=Gold+Chain+D"
    ],
    category: "Necklaces",
    material: "Gold",
    weight: "12.5g",
    purity: "22K"
  },
  '2': {
    id: 2,
    name: "Elegant Gold Earrings",
    price: 65000,
    rating: 4.6,
    reviews: 89,
    description: "Beautiful gold earrings designed for the modern woman. Crafted from 22K gold with intricate detailing. Lightweight and comfortable for all-day wear.",
    images: [
      "https://via.placeholder.com/600x600/D4AF37/FFFFFF?text=Gold+Earrings+A",
      "https://via.placeholder.com/600x600/D4AF37/FFFFFF?text=Gold+Earrings+B",
      "https://via.placeholder.com/600x600/D4AF37/FFFFFF?text=Gold+Earrings+C"
    ],
    category: "Earrings",
    material: "Gold",
    weight: "4.2g",
    purity: "22K"
  },
  '3': {
    id: 3,
    name: "Traditional Gold Bangles",
    price: 125000,
    rating: 4.7,
    reviews: 156,
    description: "Set of traditional gold bangles perfect for festive occasions. Crafted from 22K gold with traditional designs. A must-have for your jewelry collection.",
    images: [
      "https://via.placeholder.com/600x600/D4AF37/FFFFFF?text=Gold+Bangles+A",
      "https://via.placeholder.com/600x600/D4AF37/FFFFFF?text=Gold+Bangles+B",
      "https://via.placeholder.com/600x600/D4AF37/FFFFFF?text=Gold+Bangles+C"
    ],
    category: "Bangles",
    material: "Gold",
    weight: "25g",
    purity: "22K"
  },
  '4': {
    id: 4,
    name: "Rose Gold Wedding Band",
    price: 315000,
    rating: 4.8,
    reviews: 203,
    isNew: true,
    description: "A beautiful rose gold wedding band symbolizing eternal love. Crafted with precision and made from premium rose gold. Perfect for your special day.",
    images: [
      "https://via.placeholder.com/600x600/E11D48/FFFFFF?text=Rose+Gold+Ring+A",
      "https://via.placeholder.com/600x600/E11D48/FFFFFF?text=Rose+Gold+Ring+B",
      "https://via.placeholder.com/600x600/E11D48/FFFFFF?text=Rose+Gold+Ring+C"
    ],
    category: "Rings",
    material: "Rose Gold",
    weight: "5g",
    purity: "18K"
  },
  '5': {
    id: 5,
    name: "Gold Pendant with Diamond",
    price: 95000,
    originalPrice: 110000,
    discount: 14,
    rating: 4.5,
    reviews: 76,
    description: "Elegant gold pendant adorned with a sparkling diamond. Perfect for adding a touch of sophistication to any outfit. Made from 22K gold with a certified diamond.",
    images: [
      "https://via.placeholder.com/600x600/D4AF37/FFFFFF?text=Gold+Pendant+A",
      "https://via.placeholder.com/600x600/D4AF37/FFFFFF?text=Gold+Pendant+B",
      "https://via.placeholder.com/600x600/D4AF37/FFFFFF?text=Gold+Pendant+C"
    ],
    category: "Pendants",
    material: "Gold",
    weight: "3.8g",
    purity: "22K"
  },
  '6': {
    id: 6,
    name: "Diamond Solitaire Ring",
    price: 675000,
    rating: 4.9,
    reviews: 87,
    isBestseller: true,
    description: "A stunning diamond solitaire ring that captures light beautifully. Features a certified diamond in a classic setting. Perfect for engagements or special occasions.",
    images: [
      "https://via.placeholder.com/600x600/E5E7EB/1F2937?text=Diamond+Ring+A",
      "https://via.placeholder.com/600x600/E5E7EB/1F2937?text=Diamond+Ring+B",
      "https://via.placeholder.com/600x600/E5E7EB/1F2937?text=Diamond+Ring+C"
    ],
    category: "Rings",
    material: "Diamond",
    weight: "4.2g",
    purity: "Platinum",
    diamondWeight: "1.5ct"
  },
  '7': {
    id: 7,
    name: "Diamond Tennis Necklace",
    price: 550000,
    rating: 4.7,
    reviews: 64,
    description: "A luxurious diamond tennis necklace featuring a line of brilliant diamonds. Perfect for evening events and special occasions. Made with certified diamonds.",
    images: [
      "https://via.placeholder.com/600x600/E5E7EB/1F2937?text=Diamond+Necklace+A",
      "https://via.placeholder.com/600x600/E5E7EB/1F2937?text=Diamond+Necklace+B",
      "https://via.placeholder.com/600x600/E5E7EB/1F2937?text=Diamond+Necklace+C"
    ],
    category: "Necklaces",
    material: "Diamond",
    weight: "8g",
    purity: "Platinum",
    diamondWeight: "3.2ct"
  },
  '8': {
    id: 8,
    name: "Diamond Stud Earrings",
    price: 295000,
    originalPrice: 350000,
    discount: 16,
    rating: 4.6,
    reviews: 112,
    description: "Classic diamond stud earrings that never go out of style. Featuring perfectly matched diamonds in secure settings. Ideal for everyday elegance.",
    images: [
      "https://via.placeholder.com/600x600/E5E7EB/1F2937?text=Diamond+Earrings+A",
      "https://via.placeholder.com/600x600/E5E7EB/1F2937?text=Diamond+Earrings+B",
      "https://via.placeholder.com/600x600/E5E7EB/1F2937?text=Diamond+Earrings+C"
    ],
    category: "Earrings",
    material: "Diamond",
    weight: "2.5g",
    purity: "Platinum",
    diamondWeight: "1ct"
  },
  '9': {
    id: 9,
    name: "Diamond Bangle Set",
    price: 780000,
    rating: 4.8,
    reviews: 43,
    isNew: true,
    description: "Luxurious set of diamond bangles that make a statement. Each bangle features brilliant diamonds in a secure setting. Perfect for special occasions.",
    images: [
      "https://via.placeholder.com/600x600/E5E7EB/1F2937?text=Diamond+Bangles+A",
      "https://via.placeholder.com/600x600/E5E7EB/1F2937?text=Diamond+Bangles+B",
      "https://via.placeholder.com/600x600/E5E7EB/1F2937?text=Diamond+Bangles+C"
    ],
    category: "Bangles",
    material: "Diamond",
    weight: "15g",
    purity: "Platinum",
    diamondWeight: "5ct"
  },
  '10': {
    id: 10,
    name: "Diamond Pendant Necklace",
    price: 425000,
    rating: 4.5,
    reviews: 91,
    description: "Elegant diamond pendant necklace that adds sophistication to any outfit. Features a certified diamond in a delicate setting. Perfect for special occasions.",
    images: [
      "https://via.placeholder.com/600x600/E5E7EB/1F2937?text=Diamond+Pendant+A",
      "https://via.placeholder.com/600x600/E5E7EB/1F2937?text=Diamond+Pendant+B",
      "https://via.placeholder.com/600x600/E5E7EB/1F2937?text=Diamond+Pendant+C"
    ],
    category: "Pendants",
    material: "Diamond",
    weight: "6g",
    purity: "Platinum",
    diamondWeight: "2ct"
  },
  '11': {
    id: 11,
    name: "Platinum Engagement Ring",
    price: 380000,
    rating: 4.7,
    reviews: 67,
    description: "A modern platinum engagement ring designed for the contemporary couple. Features a sleek design with a secure setting for the center stone.",
    images: [
      "https://via.placeholder.com/600x600/E5E7EB/1F2937?text=Platinum+Ring+A",
      "https://via.placeholder.com/600x600/E5E7EB/1F2937?text=Platinum+Ring+B",
      "https://via.placeholder.com/600x600/E5E7EB/1F2937?text=Platinum+Ring+C"
    ],
    category: "Rings",
    material: "Platinum",
    weight: "5.5g",
    purity: "950"
  },
  '12': {
    id: 12,
    name: "Platinum Hoop Earrings",
    price: 195000,
    rating: 4.6,
    reviews: 54,
    description: "Stylish platinum hoop earrings that combine modern design with timeless appeal. Lightweight and comfortable for all-day wear.",
    images: [
      "https://via.placeholder.com/600x600/E5E7EB/1F2937?text=Platinum+Earrings+A",
      "https://via.placeholder.com/600x600/E5E7EB/1F2937?text=Platinum+Earrings+B",
      "https://via.placeholder.com/600x600/E5E7EB/1F2937?text=Platinum+Earrings+C"
    ],
    category: "Earrings",
    material: "Platinum",
    weight: "8g",
    purity: "950"
  },
  '13': {
    id: 13,
    name: "Platinum Chain Necklace",
    price: 295000,
    rating: 4.5,
    reviews: 78,
    description: "Minimalist platinum chain necklace perfect for layering or wearing alone. Crafted from high-quality platinum for durability and shine.",
    images: [
      "https://via.placeholder.com/600x600/E5E7EB/1F2937?text=Platinum+Necklace+A",
      "https://via.placeholder.com/600x600/E5E7EB/1F2937?text=Platinum+Necklace+B",
      "https://via.placeholder.com/600x600/E5E7EB/1F2937?text=Platinum+Necklace+C"
    ],
    category: "Necklaces",
    material: "Platinum",
    weight: "10g",
    purity: "950"
  },
  '14': {
    id: 14,
    name: "Platinum Cuff Bracelet",
    price: 420000,
    rating: 4.8,
    reviews: 39,
    isNew: true,
    description: "Bold platinum cuff bracelet that makes a statement. Features a modern design with smooth finishes. Perfect for the fashion-forward individual.",
    images: [
      "https://via.placeholder.com/600x600/E5E7EB/1F2937?text=Platinum+Bangle+A",
      "https://via.placeholder.com/600x600/E5E7EB/1F2937?text=Platinum+Bangle+B",
      "https://via.placeholder.com/600x600/E5E7EB/1F2937?text=Platinum+Bangle+C"
    ],
    category: "Bangles",
    material: "Platinum",
    weight: "20g",
    purity: "950"
  },
  '15': {
    id: 15,
    name: "Silver Statement Necklace",
    price: 25000,
    rating: 4.4,
    reviews: 123,
    description: "Trendy silver statement necklace that adds flair to any outfit. Features intricate detailing and a modern design. Perfect for casual and semi-formal wear.",
    images: [
      "https://via.placeholder.com/600x600/C0C0C0/1F2937?text=Silver+Necklace+A",
      "https://via.placeholder.com/600x600/C0C0C0/1F2937?text=Silver+Necklace+B",
      "https://via.placeholder.com/600x600/C0C0C0/1F2937?text=Silver+Necklace+C"
    ],
    category: "Necklaces",
    material: "Silver",
    weight: "45g",
    purity: "925"
  },
  '16': {
    id: 16,
    name: "Silver Drop Earrings",
    price: 12000,
    originalPrice: 15000,
    discount: 20,
    rating: 4.3,
    reviews: 87,
    description: "Lightweight silver drop earrings perfect for everyday wear. Features a simple yet elegant design that complements any style.",
    images: [
      "https://via.placeholder.com/600x600/C0C0C0/1F2937?text=Silver+Earrings+A",
      "https://via.placeholder.com/600x600/C0C0C0/1F2937?text=Silver+Earrings+B",
      "https://via.placeholder.com/600x600/C0C0C0/1F2937?text=Silver+Earrings+C"
    ],
    category: "Earrings",
    material: "Silver",
    weight: "8g",
    purity: "925"
  },
  '17': {
    id: 17,
    name: "Silver Ring Set",
    price: 18000,
    rating: 4.5,
    reviews: 145,
    isBestseller: true,
    description: "Versatile silver ring set with multiple designs. Perfect for stacking or wearing individually. Great value for money.",
    images: [
      "https://via.placeholder.com/600x600/C0C0C0/1F2937?text=Silver+Rings+A",
      "https://via.placeholder.com/600x600/C0C0C0/1F2937?text=Silver+Rings+B",
      "https://via.placeholder.com/600x600/C0C0C0/1F2937?text=Silver+Rings+C"
    ],
    category: "Rings",
    material: "Silver",
    weight: "15g",
    purity: "925"
  },
  '18': {
    id: 18,
    name: "Silver Bangles Combo",
    price: 22000,
    rating: 4.6,
    reviews: 98,
    description: "Festive silver bangles combo perfect for celebrations. Features a mix of designs and textures. Great for gifting.",
    images: [
      "https://via.placeholder.com/600x600/C0C0C0/1F2937?text=Silver+Bangles+A",
      "https://via.placeholder.com/600x600/C0C0C0/1F2937?text=Silver+Bangles+B",
      "https://via.placeholder.com/600x600/C0C0C0/1F2937?text=Silver+Bangles+C"
    ],
    category: "Bangles",
    material: "Silver",
    weight: "35g",
    purity: "925"
  },
  '19': {
    id: 19,
    name: "10g Gold Coin",
    price: 45000,
    rating: 4.9,
    reviews: 210,
    isBestseller: true,
    description: "Pure 24K gold coin weighing exactly 10 grams. Perfect for investment purposes. Comes with authenticity certificate.",
    images: [
      "https://via.placeholder.com/600x600/D4AF37/FFFFFF?text=Gold+Coin+A",
      "https://via.placeholder.com/600x600/D4AF37/FFFFFF?text=Gold+Coin+B"
    ],
    category: "Coins",
    material: "Gold",
    weight: "10g",
    purity: "24K"
  },
  '20': {
    id: 20,
    name: "100g Silver Bar",
    price: 8500,
    rating: 4.7,
    reviews: 156,
    description: "High-purity silver bar weighing 100 grams. Ideal for bulk investment. Comes with authenticity certificate and tamper-proof packaging.",
    images: [
      "https://via.placeholder.com/600x600/C0C0C0/1F2937?text=Silver+Bar+A",
      "https://via.placeholder.com/600x600/C0C0C0/1F2937?text=Silver+Bar+B"
    ],
    category: "Bars",
    material: "Silver",
    weight: "100g",
    purity: "999"
  },
  '21': {
    id: 21,
    name: "100g Gold Bar",
    price: 450000,
    rating: 4.8,
    reviews: 89,
    isNew: true,
    description: "Premium 24K gold bar weighing 100 grams. Perfect for high-value investment. Comes with authenticity certificate and secure packaging.",
    images: [
      "https://via.placeholder.com/600x600/D4AF37/FFFFFF?text=Gold+Bar+A",
      "https://via.placeholder.com/600x600/D4AF37/FFFFFF?text=Gold+Bar+B"
    ],
    category: "Bars",
    material: "Gold",
    weight: "100g",
    purity: "24K"
  },
  '22': {
    id: 22,
    name: "5g Silver Coin",
    price: 3500,
    originalPrice: 4000,
    discount: 13,
    rating: 4.5,
    reviews: 134,
    description: "Collectible silver coin weighing 5 grams. Features intricate designs and high purity. Perfect for collectors and small investments.",
    images: [
      "https://via.placeholder.com/600x600/C0C0C0/1F2937?text=Silver+Coin+A",
      "https://via.placeholder.com/600x600/C0C0C0/1F2937?text=Silver+Coin+B"
    ],
    category: "Coins",
    material: "Silver",
    weight: "5g",
    purity: "999"
  }
};

const trustFeatures = [
  { icon: <Shield className="w-6 h-6" />, title: "BIS Hallmarked" },
  { icon: <RotateCcw className="w-6 h-6" />, title: "Lifetime Buyback" },
  { icon: <Wrench className="w-6 h-6" />, title: "Free Maintenance" },
  { icon: <Award className="w-6 h-6" />, title: "Complimentary Insurance" }
];

const ProductDetailsClient = ({ params }: ProductDetailsClientProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Get product data based on ID
  const product = productData[params.id] || {
    id: params.id,
    name: `Premium Gold Product ${params.id}`,
    price: 100000 + parseInt(params.id) * 25000,
    originalPrice: 120000 + parseInt(params.id) * 30000,
    discount: Math.floor(Math.random() * 20) + 5,
    rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
    reviews: Math.floor(Math.random() * 200) + 50,
    description: `This premium gold product #${params.id} is crafted with precision and attention to detail. Made from high-quality materials with assurance of authenticity.`,
    images: [
      `https://via.placeholder.com/600x600/D4AF37/FFFFFF?text=Gold+Product+${params.id}+A`,
      `https://via.placeholder.com/600x600/D4AF37/FFFFFF?text=Gold+Product+${params.id}+B`,
      `https://via.placeholder.com/600x600/D4AF37/FFFFFF?text=Gold+Product+${params.id}+C`,
      `https://via.placeholder.com/600x600/D4AF37/FFFFFF?text=Gold+Product+${params.id}+D`
    ],
    category: "Jewelry",
    material: "Gold"
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category,
      material: product.material
    });
    alert('Product added to cart!');
  };

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      // Remove from wishlist logic would go here
      setIsWishlisted(false);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        category: product.category,
        material: product.material,
        rating: product.rating
      });
      setIsWishlisted(true);
      alert('Product added to wishlist!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-amber-600">Home</Link>
            <span>/</span>
            <Link href="/collections" className="hover:text-amber-600">Collections</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-amber-600' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-amber-600">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-gray-500 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      {product.discount}% OFF
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Product Details</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-600">Category:</div>
                <div className="font-medium">{product.category}</div>
                
                <div className="text-gray-600">Material:</div>
                <div className="font-medium">{product.material}</div>
                
                <div className="text-gray-600">Weight:</div>
                <div className="font-medium">{product.weight || 'N/A'}</div>
                
                <div className="text-gray-600">Purity:</div>
                <div className="font-medium">{product.purity || 'N/A'}</div>
                
                {product.diamondWeight && (
                  <>
                    <div className="text-gray-600">Diamond Weight:</div>
                    <div className="font-medium">{product.diamondWeight}</div>
                  </>
                )}
              </div>
            </div>

            <div>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-amber-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
              >
                Add to Cart
              </button>
              <button 
                onClick={handleToggleWishlist}
                className={`p-4 border rounded-lg transition-colors ${
                  isWishlisted 
                    ? 'border-red-500 bg-red-50 hover:bg-red-100' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Heart 
                  size={20} 
                  className={isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'} 
                />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t">
              {trustFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="text-amber-600">{feature.icon}</div>
                  <div className="font-semibold text-sm">{feature.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8 text-center">You Might Also Like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-square">
                  <img
                    src={`https://via.placeholder.com/300x300/D4AF37/FFFFFF?text=Related+${item}`}
                    alt={`Related Product ${item}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold mb-2">Related Product {item}</h4>
                  <div className="text-amber-600 font-bold">₹{(95000 + item * 50000).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsClient;