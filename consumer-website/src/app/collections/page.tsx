'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, SlidersHorizontal, Grid3X3, List, Star, Heart, Eye } from 'lucide-react';
import Link from 'next/link';
import { addToCart, addToWishlist } from '@/lib/cartUtils';
import { productData } from '@/lib/productData';

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
const CollectionsPage = () => {
  // Initialize with empty string instead of searchParams.collection
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: [] as string[],
    material: [] as string[],
    priceRange: [0, 1000000] as [number, number],
    rating: 0,
    sortBy: 'featured'
  });

  // Use shared product data
  const products: Product[] = productData;
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Apply regular search term filtering
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Collections</h1>
            <p className="text-xl text-amber-100 max-w-2xl mx-auto">
              Discover our exquisite range of handcrafted jewelry, each piece telling a unique story.
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
              <Filter size={20} />
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
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage;