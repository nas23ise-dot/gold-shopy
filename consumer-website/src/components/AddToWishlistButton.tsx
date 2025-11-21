'use client';

import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { addToWishlist } from '@/lib/cartUtils';
import { useCart } from '@/context/CartContext';

interface AddToWishlistButtonProps {
  product: {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    material: string;
    rating: number;
  };
  className?: string;
  variant?: 'primary' | 'secondary' | 'icon';
}

const AddToWishlistButton = ({ 
  product, 
  className = '',
  variant = 'icon'
}: AddToWishlistButtonProps) => {
  const { refreshWishlist } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleClick = () => {
    if (!isWishlisted) {
      addToWishlist(product);
      setIsWishlisted(true);
      // refreshWishlist is now handled by the custom event in cartUtils
    } else {
      // In a real implementation, we would remove from wishlist
      setIsWishlisted(false);
    }
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleClick}
        className={`p-2 rounded-full ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-600 border border-gray-300'} hover:bg-red-500 hover:text-white transition-colors ${className}`}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
      </button>
    );
  }

  if (variant === 'secondary') {
    return (
      <button
        onClick={handleClick}
        className={`flex items-center gap-2 px-4 py-2 border ${isWishlisted ? 'border-red-500 text-red-500' : 'border-gray-300 text-gray-600'} rounded-lg hover:bg-red-50 hover:border-red-500 hover:text-red-500 transition-colors ${className}`}
      >
        <Heart size={16} className={isWishlisted ? 'fill-current' : ''} />
        {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center gap-2 ${isWishlisted ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'} px-6 py-3 rounded-lg hover:bg-red-600 hover:text-white transition-colors ${className}`}
    >
      <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
      {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
    </button>
  );
};

export default AddToWishlistButton;