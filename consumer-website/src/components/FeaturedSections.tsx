'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Star, Heart, Eye } from 'lucide-react';
import { addToCart, addToWishlist } from '@/lib/cartUtils';
import { useRouter } from 'next/navigation';
import { productApi } from '@/lib/api';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  material?: string;
  rating: number;
  isNew?: boolean;
  isBestseller?: boolean;
  discount?: number;
}

interface FeaturedSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
  className?: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        material: product.material || 'Gold'
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleAddToWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        material: product.material || 'Gold',
        rating: product.rating
      });
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const handleViewProduct = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/products/${product.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
    >
      <Link href={`/products/${product.id}`}>
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                NEW
              </span>
            )}
            {product.isBestseller && (
              <span className="bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                BESTSELLER
              </span>
            )}
            {product.discount && (
              <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                {product.discount}% OFF
              </span>
            )}
          </div>

          {/* Quick Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <button 
              onClick={handleAddToWishlist}
              className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
              aria-label="Add to wishlist"
            >
              <Heart size={16} className="text-gray-600 hover:text-red-500" />
            </button>
            <button 
              onClick={handleViewProduct}
              className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
              aria-label="View product"
            >
              <Eye size={16} className="text-gray-600" />
            </button>
          </div>

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Quick Add to Cart */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-10">
            <button 
              onClick={handleAddToCart}
              className="w-full bg-amber-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-amber-700 transition-colors duration-200"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-6">
        <Link href={`/products/${product.id}`}>
          <div className="mb-2">
            <span className="text-sm text-gray-500 uppercase tracking-wide">{product.category}</span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-800 mb-3 group-hover:text-amber-600 transition-colors duration-200">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={`${
                i < Math.floor(product.rating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-amber-600">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedSection = ({ 
  title, 
  subtitle, 
  products, 
  viewAllLink, 
  className = '' 
}: FeaturedSectionProps) => {
  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        {viewAllLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              href={viewAllLink}
              className="inline-flex items-center gap-2 bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View All Products
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

// Main Featured Sections Component
const FeaturedSections = () => {
  const [bestSellers, setBestSellers] = useState<any[]>([]);
  const [newArrivals, setNewArrivals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Fetch products from API
        const response = await productApi.getAllProducts();
        const products = response.products || [];
        
        // Filter best sellers and new arrivals
        const bestSellersData = products
          .filter((product: any) => product.isBestseller)
          .slice(0, 4);
          
        const newArrivalsData = products
          .filter((product: any) => product.isNew)
          .slice(0, 4);
        
        setBestSellers(bestSellersData);
        setNewArrivals(newArrivalsData);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to hardcoded data if API fails
        setBestSellers([
          {
            id: 1,
            name: "Classic Gold Chain Necklace",
            price: 185000,
            originalPrice: 220000,
            image: "https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=Gold+Chain",
            category: "Gold Necklaces",
            material: "Gold",
            rating: 4.8,
            isBestseller: true,
            discount: 16
          },
          {
            id: 2,
            name: "Diamond Solitaire Ring",
            price: 675000,
            image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Diamond+Ring",
            category: "Diamond Rings",
            material: "Diamond",
            rating: 4.9,
            isBestseller: true
          },
          {
            id: 3,
            name: "Traditional Gold Bangles",
            price: 125000,
            image: "https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=Gold+Bangles",
            category: "Gold Bangles",
            material: "Gold",
            rating: 4.7,
            isBestseller: true
          },
          {
            id: 4,
            name: "Gold Bangle Set",
            price: 265000,
            image: "https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=Gold+Bangle+Set",
            category: "Gold Bangles",
            material: "Gold",
            rating: 4.6,
            isBestseller: true
          }
        ]);
        
        setNewArrivals([
          {
            id: 5,
            name: "Elegant Gold Pendant Necklace",
            price: 155000,
            image: "https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=Gold+Pendant+Necklace",
            category: "Gold Necklaces",
            material: "Gold",
            rating: 4.7,
            isNew: true
          },
          {
            id: 6,
            name: "Rose Gold Wedding Band",
            price: 315000,
            image: "https://via.placeholder.com/400x400/E11D48/FFFFFF?text=Rose+Gold+Ring",
            category: "Gold Rings",
            material: "Rose Gold",
            rating: 4.8,
            isNew: true
          },
          {
            id: 7,
            name: "Diamond Bangle Set",
            price: 780000,
            image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Diamond+Bangles",
            category: "Diamond Bangles",
            material: "Diamond",
            rating: 4.8,
            isNew: true
          },
          {
            id: 8,
            name: "Platinum Cuff Bracelet",
            price: 420000,
            image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Platinum+Bangle",
            category: "Platinum Bangles",
            material: "Platinum",
            rating: 4.8,
            isNew: true
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center">
        <div className="text-lg text-gray-600">Loading products...</div>
      </div>
    );
  }

  return (
    <>
      {/* Best Sellers Section */}
      <FeaturedSection
        title="Best Sellers"
        subtitle="Discover our most loved pieces, chosen by customers worldwide"
        products={bestSellers}
        viewAllLink="/collections/best-sellers"
        className="bg-gradient-to-br from-amber-50 to-yellow-50"
      />

      {/* New Arrivals Section */}
      <FeaturedSection
        title="New Arrivals"
        subtitle="Fresh designs and timeless elegance in our latest collection"
        products={newArrivals}
        viewAllLink="/collections/new-arrivals"
        className="bg-white"
      />
    </>
  );
};

export default FeaturedSections;