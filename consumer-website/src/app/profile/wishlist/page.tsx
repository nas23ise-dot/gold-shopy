'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, X, ShoppingCart, ArrowLeft } from 'lucide-react';
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
  const { wishlistItems, refreshWishlist, refreshCart } = useCart();
  
  // Initialize with sample items if wishlist is empty
  const sampleItems: any[] = [
    {
      id: 1,
      name: 'Classic Gold Necklace',
      price: 125000,
      originalPrice: 145000,
      image: 'https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=Gold+Necklace',
      category: 'Necklaces',
      material: '22K Gold',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Diamond Stud Earrings',
      price: 89000,
      image: 'https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Diamond+Earrings',
      category: 'Earrings',
      material: 'White Gold',
      rating: 4.9
    }
  ];

  // Use sample items if wishlist is empty
  const displayItems = wishlistItems.length > 0 ? wishlistItems : sampleItems;

  const handleRemoveFromWishlist = (id: number) => {
    removeFromWishlist(id);
    refreshWishlist(); // Refresh wishlist context after removing item
  };

  const handleMoveToCart = (id: number) => {
    moveFromWishlistToCart(id);
    refreshWishlist(); // Refresh wishlist context after moving item
    refreshCart(); // Refresh cart context after adding item
    alert('Item moved to cart!');
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center mb-8">
            <Link href="/profile" className="flex items-center text-gray-600 hover:text-amber-600 mr-4">
              <ArrowLeft size={20} className="mr-1" />
              <span>Back to Profile</span>
            </Link>
          </div>

          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                <Heart className="text-amber-600" size={32} />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">My Wishlist</h1>
            <p className="text-lg text-gray-600">Items you've saved for later</p>
          </div>

          {displayItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-64 object-cover"
                    />
                    <button
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
                    >
                      <X size={16} className="text-gray-600" />
                    </button>
                    {item.originalPrice && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.material} • {item.category}</p>
                      </div>
                    </div>

                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'fill-current' : ''}`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-1">({item.rating})</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-bold text-amber-600">₹{item.price.toLocaleString()}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through ml-2">₹{item.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                      <button
                        onClick={() => handleMoveToCart(item.id)}
                        className="flex items-center bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                      >
                        <ShoppingCart size={16} className="mr-1" />
                        <span>Move to Cart</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Heart size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-500 mb-6">Start adding items to your wishlist</p>
              <Link 
                href="/collections" 
                className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
              >
                Browse Collections
              </Link>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default WishlistPage;