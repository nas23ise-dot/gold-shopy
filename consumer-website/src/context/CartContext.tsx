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
  syncLocalStorageToDatabase: () => Promise<void>;
  loading: boolean;
  forceRefresh: () => Promise<void>;
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
      console.log('Refreshing cart...'); // Add logging
      // If user is authenticated, fetch cart from API
      if (isAuthenticated && user?.token) {
        console.log('User is authenticated, fetching cart from API'); // Add logging
        try {
          const cartData = await cartApi.getCart(user.token);
          console.log('Cart data from API:', cartData); // Add logging
          // Transform API response to match frontend format
          let items: CartItem[] = [];
          
          // Handle both mock database and MongoDB responses
          if (Array.isArray(cartData)) {
            // Mock database response format
            console.log('Processing mock database response'); // Add logging
            items = cartData.map((item: any) => {
              // For mock database, productId is a number that references the product ID
              const productId = item.productId;
              console.log('Product ID from mock DB:', productId); // Add logging
              return {
                id: productId,
                name: `Product ${productId}`, // Placeholder, will be updated below
                price: 0, // Placeholder, will be updated below
                image: '', // Placeholder, will be updated below
                category: '', // Placeholder, will be updated below
                material: '', // Placeholder, will be updated below
                quantity: item.quantity
              };
            });
          } else if (cartData.items) {
            // MongoDB response format
            console.log('Processing MongoDB response'); // Add logging
            items = cartData.items.map((item: any) => ({
              id: item.productId._id || item.productId,
              name: item.productId.name,
              price: item.productId.price,
              image: item.productId.image,
              category: item.productId.category,
              material: item.productId.material,
              quantity: item.quantity
            }));
          } else if (cartData.cart && cartData.cart.items) {
            // Alternative format with cart wrapper
            console.log('Processing cart wrapper response'); // Add logging
            items = cartData.cart.items.map((item: any) => ({
              id: item.productId._id || item.productId,
              name: item.productId.name,
              price: item.productId.price,
              image: item.productId.image,
              category: item.productId.category,
              material: item.productId.material,
              quantity: item.quantity
            }));
          } else {
            console.log('Unknown response format, using empty array'); // Add logging
            items = [];
          }
          
          // For mock database items, we need to fetch the actual product data
          // This is a temporary solution - in a real app, the backend would populate this data
          if (Array.isArray(cartData)) {
            // Import product data to get actual product information
            const { productData } = await import('@/lib/productData');
            items = items.map((item: CartItem) => {
              const product = productData.find(p => p.id === item.id);
              if (product) {
                return {
                  ...item,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  category: product.category,
                  material: product.material
                };
              }
              return item;
            });
          }
          
          console.log('Transformed cart items:', items); // Add logging
          setCartItems(items);
          const count = items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
          setCartCount(count);
          console.log('Cart count:', count); // Add logging
          return;
        } catch (error) {
          console.error('Failed to fetch cart from API, falling back to localStorage:', error);
        }
      }
      
      console.log('User not authenticated or no token, using localStorage'); // Add logging
      // Fallback to localStorage
      const items = getCartItems();
      const count = getCartCount();
      console.log('Cart items from localStorage:', items); // Add logging
      console.log('Cart count from localStorage:', count); // Add logging
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
          let items: WishlistItem[] = [];
          
          // Handle both mock database and MongoDB responses
          if (Array.isArray(wishlistData)) {
            // Mock database response format - this is actually the product data directly
            items = wishlistData.map((product: any) => ({
              id: product._id || product.id,
              name: product.name,
              price: product.price,
              originalPrice: product.originalPrice,
              image: product.image,
              category: product.category,
              material: product.material,
              rating: product.rating
            }));
          } else if (wishlistData.productIds) {
            // MongoDB response format
            items = wishlistData.productIds.map((product: any) => ({
              id: product._id,
              name: product.name,
              price: product.price,
              originalPrice: product.originalPrice,
              image: product.image,
              category: product.category,
              material: product.material,
              rating: product.rating
            }));
          } else if (wishlistData.items) {
            // Alternative format
            items = wishlistData.items.map((item: any) => {
              const product = item.productId || item.product;
              return {
                id: product._id,
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice,
                image: product.image,
                category: product.category,
                material: product.material,
                rating: product.rating
              };
            });
          }
          
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

  // Function to sync localStorage data to database upon login
  const syncLocalStorageToDatabase = async () => {
    if (!isAuthenticated || !user?.token) return;

    try {
      // Get localStorage data
      const localCartItems = getCartItems();
      const localWishlistItems = getWishlistItems();

      // Sync cart items
      for (const item of localCartItems) {
        try {
          await cartApi.addToCart(user.token, item.id.toString(), item.quantity);
        } catch (error) {
          console.error(`Failed to sync cart item ${item.id} to database:`, error);
        }
      }

      // Sync wishlist items
      for (const item of localWishlistItems) {
        try {
          await wishlistApi.addToWishlist(user.token, item.id.toString());
        } catch (error) {
          console.error(`Failed to sync wishlist item ${item.id} to database:`, error);
        }
      }

      // Clear localStorage after successful sync
      localStorage.removeItem('cart');
      localStorage.removeItem('wishlist');

      // Refresh cart and wishlist from database
      await refreshCart();
      await refreshWishlist();
    } catch (error) {
      console.error('Failed to sync localStorage to database:', error);
    }
  };

  // Listen for user login event
  useEffect(() => {
    const handleUserLogin = () => {
      syncLocalStorageToDatabase();
    };

    window.addEventListener('userLoggedIn', handleUserLogin);

    return () => {
      window.removeEventListener('userLoggedIn', handleUserLogin);
    };
  }, [isAuthenticated, user]);

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

  // Add a force refresh function
  const forceRefresh = async () => {
    await refreshCart();
    await refreshWishlist();
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      wishlistItems, 
      cartCount, 
      wishlistCount,
      refreshCart,
      refreshWishlist,
      syncLocalStorageToDatabase,
      loading,
      forceRefresh
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