'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { addToCart } from '@/lib/cartUtils';
import { useCart } from '@/context/CartContext';

interface AddToCartButtonProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    material: string;
  };
  className?: string;
  variant?: 'primary' | 'secondary' | 'icon';
}

const AddToCartButton = ({ 
  product, 
  className = '',
  variant = 'primary'
}: AddToCartButtonProps) => {
  const { refreshCart } = useCart();

  const handleClick = () => {
    addToCart(product);
    // refreshCart is now handled by the custom event in cartUtils
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleClick}
        className={`p-2 rounded-full bg-amber-600 text-white hover:bg-amber-700 transition-colors ${className}`}
        aria-label="Add to cart"
      >
        <ShoppingCart size={20} />
      </button>
    );
  }

  if (variant === 'secondary') {
    return (
      <button
        onClick={handleClick}
        className={`flex items-center gap-2 px-4 py-2 border border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors ${className}`}
      >
        <ShoppingCart size={16} />
        Add to Cart
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors ${className}`}
    >
      <ShoppingCart size={20} />
      Add to Cart
    </button>
  );
};

export default AddToCartButton;