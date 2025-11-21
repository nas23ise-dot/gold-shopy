'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AddToCartButton from '@/components/AddToCartButton';
import AddToWishlistButton from '@/components/AddToWishlistButton';

const TestCartWishlistPage = () => {
  // Sample product for testing
  const sampleProduct = {
    id: 1,
    name: 'Gold Necklace',
    price: 150000,
    image: '/images/products/gold-necklace.jpg',
    category: 'Necklace',
    material: 'Gold',
    rating: 4.5,
    originalPrice: 180000
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <Link href="/" className="text-amber-600 hover:text-amber-700">
            ← Back to Home
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Test Cart & Wishlist</h1>
          <p className="text-lg text-gray-600">Test the cart and wishlist functionality</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64" />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{sampleProduct.name}</h2>
              <p className="text-gray-600 mb-4">{sampleProduct.material} • {sampleProduct.category}</p>
              
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(sampleProduct.rating) ? 'fill-current' : ''}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">({sampleProduct.rating})</span>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold text-amber-600">₹{sampleProduct.price.toLocaleString()}</span>
                {sampleProduct.originalPrice && (
                  <span className="text-lg text-gray-500 line-through ml-2">₹{sampleProduct.originalPrice.toLocaleString()}</span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <AddToCartButton product={sampleProduct} variant="primary" className="flex-1" />
                <AddToWishlistButton product={sampleProduct} variant="secondary" className="flex-1" />
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-2">Product Details</h3>
                <p className="text-gray-600">
                  Beautiful gold necklace with intricate design. Perfect for special occasions and daily wear.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">Test the functionality by adding items to cart and wishlist</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/profile/cart" 
              className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              View Cart
            </Link>
            <Link 
              href="/profile/wishlist" 
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              View Wishlist
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCartWishlistPage;