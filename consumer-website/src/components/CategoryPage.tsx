'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, SlidersHorizontal, Grid3X3, List, Star, Heart, Eye, ShoppingCart } from 'lucide-react';
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

interface CategoryPageProps {
  params: {
    categoryName: string;
    itemName: string;
  };
  products: Product[];
}

const CategoryPage = ({ params, products }: CategoryPageProps) => {
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

  // Decode the URL parameters with better error handling
  const categoryName = params?.categoryName ? String(params.categoryName) : '';
  const itemName = params?.itemName ? String(params.itemName) : '';
  
  // Debug on mount
  useEffect(() => {
    console.log('🚀 CategoryPage:', {
      categoryName,
      itemName,
      productsCount: products?.length || 0,
      firstProduct: products?.[0] ? {
        name: products[0].name,
        category: products[0].category,
        material: products[0].material
      } : 'none'
    });
  }, [categoryName, itemName, products]);
  
  // Format the display names with better error handling
  const formatName = (name: string) => {
    if (!name) return '';
    return name
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  };
  
  // Special handling for "coins-and-bars" category
  const getCategoryDisplayName = (catName: string) => {
    if (catName === 'coins-and-bars') {
      return 'Coins & Bars';
    }
    return formatName(catName);
  };
  
  // Special handling for item names in coins-and-bars
  const getItemDisplayName = (catName: string, itmName: string) => {
    if (catName === 'coins-and-bars') {
      if (itmName.includes('gold-coin')) return 'Gold Coins';
      if (itmName.includes('silver-coin')) return 'Silver Coins';
      if (itmName.includes('gold-bar')) return 'Gold Bars';
      if (itmName.includes('silver-bar')) return 'Silver Bars';
    }
    return formatName(itmName);
  };
  
  const formattedCategory = getCategoryDisplayName(categoryName);
  const formattedItem = getItemDisplayName(categoryName, itemName);

  // Filter products based on category and item type
  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) {
      console.warn('⚠️ No products available to filter');
      return [];
    }
    
    console.log('🔍 START FILTERING ===========================================');
    console.log('Category Name:', categoryName);
    console.log('Item Name:', itemName);
    console.log('Total Products:', products.length);
    
    let filtered = products.filter(product => {
      // First, let's determine what we're looking for based on the URL parameters
      // categoryName is like "gold", "diamond", etc.
      // itemName is like "gold-necklaces", "diamond-rings", etc.
      
      let categoryMatch = false;
      let itemMatch = false;
      
      // Handle Coins & Bars category specially
      if (categoryName === 'coins-and-bars') {
        // For coins and bars, we match based on the item name and material
        let materialMatch = true;
        if (itemName.includes('gold')) {
          materialMatch = product.material.toLowerCase() === 'gold';
        } else if (itemName.includes('silver')) {
          materialMatch = product.material.toLowerCase() === 'silver';
        }
        
        if (itemName.includes('coin')) {
          categoryMatch = product.category === 'Coins' && materialMatch;
        } else if (itemName.includes('bar')) {
          categoryMatch = product.category === 'Bars' && materialMatch;
        }
      } else {
        // For regular categories, match the material
        // Match material (case-insensitive) - use categoryName directly, not formatName
        const productMaterial = product.material.toLowerCase().trim();
        const targetMaterial = categoryName.toLowerCase().trim();
        
        // Direct match or contains match for gold category (handles "Gold" and "Rose Gold")
        categoryMatch = productMaterial === targetMaterial || 
                       (categoryName === 'gold' && productMaterial.includes('gold'));
      }
      
      // Match the item type (category in product data)
      // Convert itemName like "gold-necklaces" to "Necklaces"
      let targetCategory = '';
      if (categoryName === 'coins-and-bars') {
        // For coins and bars, we already determined this above
        if (itemName.includes('coin')) {
          targetCategory = 'Coins';
        } else if (itemName.includes('bar')) {
          targetCategory = 'Bars';
        }
      } else {
        // For regular categories, extract from itemName
        // e.g., "gold-necklaces" -> "Necklaces"
        const lowerItemName = itemName.toLowerCase();
        
        // First try to match by keywords (more reliable)
        if (lowerItemName.includes('necklace')) {
          targetCategory = 'Necklaces';
        } else if (lowerItemName.includes('earring')) {
          targetCategory = 'Earrings';
        } else if (lowerItemName.includes('bangle')) {
          targetCategory = 'Bangles';
        } else if (lowerItemName.includes('ring')) {
          targetCategory = 'Rings';
        } else if (lowerItemName.includes('pendant')) {
          targetCategory = 'Pendants';
        } else {
          // Fallback: parse from dashes
          const parts = itemName.split('-');
          if (parts.length > 1) {
            // Remove the first part (material) and join the rest
            const categoryParts = parts.slice(1);
            targetCategory = categoryParts
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
            
            // Ensure categories are in plural form to match product data
            const categoryMap: { [key: string]: string } = {
              'Earring': 'Earrings',
              'Bangle': 'Bangles',
              'Pendant': 'Pendants',
              'Necklace': 'Necklaces',
              'Ring': 'Rings'
            };
            
            // Check if we need to convert to plural
            if (categoryMap[targetCategory]) {
              targetCategory = categoryMap[targetCategory];
            }
          }
        }
      }
      
      itemMatch = product.category === targetCategory;
      
      // Apply search term filtering
      const searchMatch = searchTerm ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
      
      // Apply other filters
      const categoryFilter = filters.category.length > 0 ? filters.category.includes(product.category) : true;
      const materialFilter = filters.material.length > 0 ? filters.material.includes(product.material) : true;
      const priceFilter = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      const ratingFilter = filters.rating > 0 ? product.rating >= filters.rating : true;
      
      return categoryMatch && itemMatch && searchMatch && categoryFilter && materialFilter && priceFilter && ratingFilter;
    });

    // If no products match the exact category+item, show all products of that material as fallback
    if (filtered.length === 0 && categoryName && itemName) {
      console.log('⚠️ No exact matches found, showing all products of material:', categoryName);
      filtered = products.filter(product => {
        const productMaterial = product.material.toLowerCase().trim();
        const targetMaterial = categoryName.toLowerCase().trim();
        const materialMatch = productMaterial === targetMaterial || 
                             (categoryName === 'gold' && productMaterial.includes('gold'));

        const searchMatch = searchTerm ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
        const categoryFilter = filters.category.length > 0 ? filters.category.includes(product.category) : true;
        const materialFilter = filters.material.length > 0 ? filters.material.includes(product.material) : true;
        const priceFilter = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
        const ratingFilter = filters.rating > 0 ? product.rating >= filters.rating : true;

        return materialMatch && searchMatch && categoryFilter && materialFilter && priceFilter && ratingFilter;
      });
    }
    
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
    
    console.log('✅ FILTERED RESULT:', {
      filteredCount: filtered.length,
      firstFew: filtered.slice(0, 3).map(p => p.name)
    });
    
    return filtered;
  }, [products, categoryName, itemName, searchTerm, filters]);

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
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice.toLocaleString()}
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {formattedItem || formattedCategory || 'Category'}
            </h1>
            <p className="text-xl text-amber-100 max-w-2xl mx-auto">
              Explore our exquisite collection of {formattedItem ? formattedItem.toLowerCase() : formattedCategory ? formattedCategory.toLowerCase() : 'items'} in {formattedCategory ? formattedCategory.toLowerCase() : 'various categories'}.
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
            <Link href={`/collections`} className="hover:text-amber-600">
              {formattedCategory || 'Category'}
            </Link>
            <span>/</span>
            <span className="text-gray-900">
              {formattedItem || 'Items'}
            </span>
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
                      <span>₹{filters.priceRange[1].toLocaleString()}</span>
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
              Showing {filteredProducts.length} of {products.length} products
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
            ) : products.length > 0 ? (
              <div className="text-center py-16">
                <Search size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
                <p className="text-sm text-gray-400">
                  Debug: Found {products.length} total products, but none matched the filter.
                  <br />
                  Category: {categoryName}, Item: {itemName}
                </p>
              </div>
            ) : (
              <div className="text-center py-16">
                <Search size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No products available</h3>
                <p className="text-gray-500">Products are loading...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;