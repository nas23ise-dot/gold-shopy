'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, X, ArrowLeft, ShoppingCart, Package } from 'lucide-react';
import { removeFromWishlist, moveFromWishlistToCart } from '@/lib/cartUtils';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useCart } from '@/context/CartContext';

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  material: string;
  rating: number;
}

const WishlistPage = () => {
  const { wishlistItems, refreshWishlist, forceRefresh } = useCart();
  const [loading, setLoading] = useState(false);

  // Filter out invalid items
  const validWishlistItems = wishlistItems.filter(item => 
    item && 
    item.id && 
    typeof item.price === 'number' && 
    item.price > 0 &&
    item.name && 
    item.name !== 'undefined' &&
    item.name.trim() !== ''
  );

  const handleRemoveFromWishlist = async (id: number) => {
    setLoading(true);
    try {
      await removeFromWishlist(id);
      await forceRefresh(); // Use force refresh to ensure UI updates
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMoveToCart = async (item: WishlistItem) => {
    setLoading(true);
    try {
      await moveFromWishlistToCart(item.id);
      await forceRefresh(); // Use force refresh to ensure UI updates
    } catch (error) {
      console.error('Error moving item to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center mb-8">
            <Link href="/collections" className="flex items-center text-gray-600 hover:text-amber-600">
              <ArrowLeft size={20} className="mr-1" />
              <span>Continue Shopping</span>
            </Link>
          </div>

          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                <Heart className="text-amber-600" size={32} />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">My Wishlist</h1>
            <p className="text-lg text-gray-600">Your favorite items saved for later</p>
          </div>

          {validWishlistItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-12 text-center"
            >
              <Heart size={64} className="mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your Wishlist is Empty</h2>
              <p className="text-gray-600 mb-6">Looks like you haven't added any items to your wishlist yet.</p>
              <Link
                href="/collections"
                className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
              >
                Start Shopping
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {validWishlistItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden group"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/300x300?text=Product+Image';
                      }}
                    />
                    <button
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-500 hover:text-white transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <X size={16} />
                    </button>
                    {item.originalPrice && item.originalPrice > item.price && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900 line-clamp-2">{item.name}</h3>
                      <div className="flex items-center bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-1 rounded">
                        <span>{item.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{item.material} • {item.category}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-lg font-bold text-gray-900">₹{item.price.toLocaleString()}</span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-sm text-gray-500 line-through ml-2">₹{item.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleMoveToCart(item)}
                      disabled={loading}
                      className="w-full py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center disabled:opacity-50"
                    >
                      <ShoppingCart size={16} className="mr-2" />
                      Move to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default WishlistPage;