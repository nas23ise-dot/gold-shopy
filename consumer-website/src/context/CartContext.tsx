'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCartItems, getCartCount, getWishlistItems, getWishlistCount } from '@/lib/cartUtils';
import { useAuth } from './AuthContext';
import { cartApi, wishlistApi } from '@/lib/api';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  material: string;
  quantity: number;
}

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

interface CartContextType {
  cartItems: CartItem[];
  wishlistItems: WishlistItem[];
  cartCount: number;
  wishlistCount: number;
  refreshCart: () => void;
  refreshWishlist: () => void;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const refreshCart = async () => {
    setLoading(true);
    try {
      // If user is authenticated, fetch cart from API
      if (isAuthenticated && user?.token) {
        try {
          const cartData = await cartApi.getCart(user.token);
          // Transform API response to match frontend format
          const items = cartData.items?.map((item: any) => ({
            id: item.productId._id || item.productId,
            name: item.productId.name,
            price: item.productId.price,
            image: item.productId.image,
            category: item.productId.category,
            material: item.productId.material,
            quantity: item.quantity
          })) || [];
          
          setCartItems(items);
          setCartCount(items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0));
          return;
        } catch (error) {
          console.error('Failed to fetch cart from API, falling back to localStorage:', error);
        }
      }
      
      // Fallback to localStorage
      const items = getCartItems();
      const count = getCartCount();
      setCartItems(items);
      setCartCount(count);
    } finally {
      setLoading(false);
    }
  };

  const refreshWishlist = async () => {
    setLoading(true);
    try {
      // If user is authenticated, fetch wishlist from API
      if (isAuthenticated && user?.token) {
        try {
          const wishlistData = await wishlistApi.getWishlist(user.token);
          // Transform API response to match frontend format
          const items = wishlistData.productIds?.map((product: any) => ({
            id: product._id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            category: product.category,
            material: product.material,
            rating: product.rating
          })) || [];
          
          setWishlistItems(items);
          setWishlistCount(items.length);
          return;
        } catch (error) {
          console.error('Failed to fetch wishlist from API, falling back to localStorage:', error);
        }
      }
      
      // Fallback to localStorage
      const items = getWishlistItems();
      const count = getWishlistCount();
      setWishlistItems(items);
      setWishlistCount(count);
    } finally {
      setLoading(false);
    }
  };

  // Custom event for cart updates within the same tab
  useEffect(() => {
    const handleCartUpdate = () => {
      refreshCart();
    };

    const handleWishlistUpdate = () => {
      refreshWishlist();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
    };
  }, []);

  useEffect(() => {
    refreshCart();
    refreshWishlist();

    // Listen for localStorage changes from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cart') {
        refreshCart();
      } else if (e.key === 'wishlist') {
        refreshWishlist();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isAuthenticated, user]);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      wishlistItems, 
      cartCount, 
      wishlistCount,
      refreshCart,
      refreshWishlist,
      loading
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};