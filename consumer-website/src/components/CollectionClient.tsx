'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, Star, Heart, ShoppingCart, Eye, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { addToCart, addToWishlist } from '@/lib/cartUtils';

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

interface CollectionClientProps {
  collectionName: string;
  productData: Product[];
}

const CollectionClient = ({ collectionName, productData }: CollectionClientProps) => {
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

  // Decode and format the collection name
  const formattedCollectionName = collectionName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Filter products based on collection type
  const filteredProducts = useMemo(() => {
    // Normalize collection name for case-insensitive matching
    const normalizedCollectionName = collectionName.toLowerCase().trim();
    
    let filtered = productData.filter(product => {
      // Apply collection-based filtering
      switch (normalizedCollectionName) {
        case 'best-sellers':
        case 'bestsellers':
          return product.isBestseller === true;
        case 'new-arrivals':
        case 'newarrivals':
          return product.isNew === true;
        case 'bridal-collection':
        case 'bridalcollection':
          return product.tags.includes('wedding') || product.tags.includes('bridal') || product.category === 'Rings';
        case 'traditional':
          return product.tags.includes('traditional') || product.tags.includes('classic');
        case 'contemporary':
          return product.tags.includes('modern') || product.tags.includes('contemporary') || product.tags.includes('trendy');
        case 'antique':
          return product.tags.includes('vintage') || product.tags.includes('antique') || product.material === 'Gold';
        default:
          return true;
      }
    });

    // Apply search term filtering
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply other filters
    if (filters.category.length > 0) {
      filtered = filtered.filter(product => filters.category.includes(product.category));
    }
    if (filters.material.length > 0) {
      filtered = filtered.filter(product => filters.material.includes(product.material));
    }
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );
    if (filters.rating > 0) {
      filtered = filtered.filter(product => product.rating >= filters.rating);
    }

    // Apply sorting
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
  }, [collectionName, searchTerm, filters, productData]);

  const categories = ['Necklaces', 'Rings', 'Earrings', 'Bangles', 'Pendants', 'Coins', 'Bars'];
  const materials = ['Gold', 'Diamond', 'Platinum', 'Silver', 'Rose Gold'];
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

  const ProductCard = ({ product }: { product: Product }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
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

        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => handleAddToWishlist(product)}
            className="bg-white/90 p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <Heart size={16} className="text-gray-600 hover:text-red-500" />
          </button>
          <button 
            onClick={() => handleAddToCart(product)}
            className="bg-white/90 p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <ShoppingCart size={16} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <span className="text-sm text-gray-500 uppercase tracking-wide">
          {product.category} • {product.material}
        </span>
        
        <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors">
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.reviews})</span>
        </div>

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
          
          <button
            onClick={() => handleAddToCart(product)}
            className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-amber-700 transition-colors flex items-center gap-1"
          >
            <ShoppingCart size={14} />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{formattedCollectionName}</h1>
            <p className="text-xl text-amber-100 max-w-2xl mx-auto">
              Discover our exquisite collection of {formattedCollectionName.toLowerCase()} jewelry.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-amber-600">Home</Link>
            <span>/</span>
            <Link href="/collections" className="hover:text-amber-600">Collections</Link>
            <span>/</span>
            <span className="text-gray-900">{formattedCollectionName}</span>
          </div>
        </nav>

        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
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

                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Price Range</h4>
                  <div className="px-1">
                    <input
                      type="range"
                      min="0"
                      max="1000000"
                      step="10000"
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters({...filters, priceRange: [0, parseInt(e.target.value)]})}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>₹0</span>
                      <span>₹{filters.priceRange[1].toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="rating"
                          checked={filters.rating === rating}
                          onChange={() => setFilters({...filters, rating})}
                          className="text-amber-600"
                        />
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                        <span className="text-sm">& Up</span>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex-1">
            <p className="text-gray-600 mb-6">
              Showing {filteredProducts.length} of {productData.length} products
            </p>

            {filteredProducts.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
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

export default CollectionClient;