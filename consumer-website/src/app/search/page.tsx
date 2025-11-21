'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, Star, Heart, Eye } from 'lucide-react';
import Link from 'next/link';
import { addToCart, addToWishlist } from '@/lib/cartUtils';

// Add static generation export
export const dynamic = 'force-static';

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

// Remove searchParams from props since we can't use it in static generation
const SearchPage = () => {
  // Initialize with empty string instead of searchParams.q
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: [] as string[],
    material: [] as string[],
    priceRange: [0, 1000000] as [number, number],
    rating: 0,
    sortBy: 'featured'
  });

  const products: Product[] = [
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
      id: 3,
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
      id: 4,
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
      id: 5,
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
    
    // Diamond Category
    {
      id: 6,
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
      id: 7,
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
      id: 8,
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
      id: 9,
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
      id: 10,
      name: "Diamond Pendant Necklace",
      price: 425000,
      image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Diamond+Pendant",
      category: "Pendants",
      material: "Diamond",
      rating: 4.5,
      reviews: 91,
      tags: ["versatile", "special occasion"]
    },
    
    // Platinum Category
    {
      id: 11,
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
      id: 12,
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
      id: 13,
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
      id: 14,
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
    
    // Silver Category
    {
      id: 15,
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
      id: 16,
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
      id: 17,
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
      id: 18,
      name: "Silver Bangles Combo",
      price: 22000,
      image: "https://via.placeholder.com/400x400/C0C0C0/1F2937?text=Silver+Bangles",
      category: "Bangles",
      material: "Silver",
      rating: 4.6,
      reviews: 98,
      tags: ["combo", "festive"]
    },
    
    // Coins & Bars Category
    {
      id: 19,
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
      id: 20,
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
      id: 21,
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
      id: 22,
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
    }
  ];

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Apply search term filtering
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !product.category.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !product.material.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) {
        return false;
      }
      
      // Apply other filters
      if (filters.category.length > 0 && !filters.category.includes(product.category)) {
        return false;
      }
      if (filters.material.length > 0 && !filters.material.includes(product.material)) {
        return false;
      }
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }
      if (filters.rating > 0 && product.rating < filters.rating) {
        return false;
      }
      return true;
    });

    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        filtered.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    }
    return filtered;
  }, [searchTerm, filters, products]);

  const categories = ['Necklaces', 'Rings', 'Earrings', 'Bangles', 'Pendants', 'Coins', 'Bars'];
  const materials = ['Gold', 'Diamond', 'Platinum', 'Silver', 'Rose Gold', 'Pearl'];
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      material: product.material
    });
  };

  const handleAddToWishlist = (product: Product) => {
    addToWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
      material: product.material,
      rating: product.rating
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Search Results</h1>
            <p className="text-xl text-amber-100 max-w-2xl mx-auto">
              {searchTerm ? `Results for "${searchTerm}"` : 'Search our collection of exquisite jewelry'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search jewelry..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3 border rounded-lg transition-colors ${
                showFilters ? 'bg-amber-600 text-white' : 'bg-white text-gray-700'
              }`}
            >
              <SlidersHorizontal size={20} />
            </button>

            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
              className="px-4 py-3 border border-gray-300 rounded-lg"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                className="w-80 bg-white rounded-lg shadow-lg p-6 h-fit sticky top-4"
              >
                <h3 className="text-lg font-semibold mb-6">Filters</h3>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Categories</h4>
                  {categories.map((category) => (
                    <label key={category} className="flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        checked={filters.category.includes(category)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters({...filters, category: [...filters.category, category]});
                          } else {
                            setFilters({...filters, category: filters.category.filter(c => c !== category)});
                          }
                        }}
                        className="text-amber-600"
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Materials</h4>
                  {materials.map((material) => (
                    <label key={material} className="flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        checked={filters.material.includes(material)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters({...filters, material: [...filters.material, material]});
                          } else {
                            setFilters({...filters, material: filters.material.filter(m => m !== material)});
                          }
                        }}
                        className="text-amber-600"
                      />
                      <span className="text-sm">{material}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex-1">
            <p className="text-gray-600 mb-6">
              Showing {filteredProducts.length} of {products.length} products
            </p>

            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="relative">
                      <Link href={`/products/${product.id}`}>
                        <div className="aspect-square">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 space-y-2">
                        {product.isNew && (
                          <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                            NEW
                          </span>
                        )}
                        {product.isBestseller && (
                          <span className="bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                            BEST
                          </span>
                        )}
                        {product.discount && (
                          <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                            {product.discount}% OFF
                          </span>
                        )}
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleAddToWishlist(product)}
                          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                        >
                          <Heart size={16} className="text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                        >
                          <Eye size={16} className="text-gray-600" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
                      </Link>
                      <p className="text-sm text-gray-600 mb-2">{product.material} • {product.category}</p>
                      
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < Math.floor(product.rating) ? 'fill-current' : ''}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600 ml-1">({product.reviews})</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-amber-600">₹{product.price.toLocaleString()}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through ml-2">₹{product.originalPrice.toLocaleString()}</span>
                          )}
                        </div>
                        
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="bg-amber-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-amber-700 transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <Search size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your search terms or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;