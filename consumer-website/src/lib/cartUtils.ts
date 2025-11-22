// Utility functions for cart and wishlist management

// Import API functions
import { cartApi, wishlistApi } from './api';

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

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  const user = localStorage.getItem('user');
  if (user) {
    try {
      const userData = JSON.parse(user);
      return userData.token || null;
    } catch (e) {
      return null;
    }
  }
  return null;
};

// Check if user is authenticated
const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

// Redirect to login page
const redirectToLogin = (): void => {
  if (typeof window !== 'undefined') {
    window.location.href = '/auth/signin';
  }
};

// Cart functions
export const getCartItems = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  
  const storedCart = localStorage.getItem('cart');
  console.log('Getting cart from localStorage:', storedCart); // Add logging
  if (storedCart) {
    try {
      return JSON.parse(storedCart);
    } catch (e) {
      return [];
    }
  }
  return [];
};

export const getCartCount = (): number => {
  const cartItems = getCartItems();
  const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  console.log('Calculating cart count:', count); // Add logging
  return count;
};

export const addToCart = async (item: Omit<CartItem, 'quantity'>): Promise<void> => {
  console.log('Adding item to cart:', item); // Add logging
  if (typeof window === 'undefined') {
    console.log('Window is undefined, returning'); // Add logging
    return;
  }
  
  // Check if user is authenticated, if not redirect to login
  if (!isAuthenticated()) {
    console.log('User not authenticated, redirecting to login'); // Add logging
    redirectToLogin();
    return;
  }
  
  const token = getAuthToken();
  console.log('User token:', token); // Add logging
  
  // If user is authenticated, use API
  if (token) {
    console.log('Using API to add item to cart'); // Add logging
    try {
      const response = await cartApi.addToCart(token, item.id.toString(), 1);
      console.log('API response:', response); // Add logging
      // Dispatch custom event to notify other components
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('cartUpdated'));
      }
      return;
    } catch (error) {
      console.error('Failed to add to cart via API, falling back to localStorage:', error);
    }
  }
  
  console.log('Falling back to localStorage'); // Add logging
  // Fallback to localStorage
  const cartItems = getCartItems();
  console.log('Current cart items from localStorage:', cartItems); // Add logging
  const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
  console.log('Existing item index:', existingItemIndex); // Add logging
  
  if (existingItemIndex >= 0) {
    cartItems[existingItemIndex].quantity += 1;
    console.log('Updated quantity of existing item'); // Add logging
  } else {
    cartItems.push({ ...item, quantity: 1 });
    console.log('Added new item to cart'); // Add logging
  }
  
  localStorage.setItem('cart', JSON.stringify(cartItems));
  console.log('Updated cart in localStorage:', cartItems); // Add logging
  
  // Dispatch custom event to notify other components
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('cartUpdated'));
  }
};

export const updateCartQuantity = async (id: number, quantity: number): Promise<void> => {
  if (typeof window === 'undefined') return;
  
  const token = getAuthToken();
  
  // If user is authenticated, use API
  if (token && quantity > 0) {
    try {
      await cartApi.updateCartItem(token, id.toString(), quantity);
      // Dispatch custom event to notify other components
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('cartUpdated'));
      }
      return;
    } catch (error) {
      console.error('Failed to update cart via API, falling back to localStorage:', error);
    }
  }
  
  // If quantity is 0 or API fails, remove item
  if (quantity <= 0) {
    await removeFromCart(id);
    return;
  }
  
  // Fallback to localStorage
  const cartItems = getCartItems();
  const itemIndex = cartItems.findIndex(item => item.id === id);
  
  if (itemIndex >= 0) {
    cartItems[itemIndex].quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Dispatch custom event to notify other components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('cartUpdated'));
    }
  }
};

export const removeFromCart = async (id: number): Promise<void> => {
  if (typeof window === 'undefined') return;
  
  const token = getAuthToken();
  
  // If user is authenticated, use API
  if (token) {
    try {
      await cartApi.removeFromCart(token, id.toString());
      // Dispatch custom event to notify other components
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('cartUpdated'));
      }
      return;
    } catch (error) {
      console.error('Failed to remove from cart via API, falling back to localStorage:', error);
    }
  }
  
  // Fallback to localStorage
  const cartItems = getCartItems();
  const updatedItems = cartItems.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(updatedItems));
  
  // Dispatch custom event to notify other components
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('cartUpdated'));
  }
};

// Wishlist functions
export const getWishlistItems = (): WishlistItem[] => {
  if (typeof window === 'undefined') return [];
  
  const storedWishlist = localStorage.getItem('wishlist');
  if (storedWishlist) {
    try {
      return JSON.parse(storedWishlist);
    } catch (e) {
      return [];
    }
  }
  return [];
};

export const getWishlistCount = (): number => {
  return getWishlistItems().length;
};

export const addToWishlist = async (item: WishlistItem): Promise<void> => {
  if (typeof window === 'undefined') return;
  
  // Check if user is authenticated, if not redirect to login
  if (!isAuthenticated()) {
    redirectToLogin();
    return;
  }
  
  const token = getAuthToken();
  
  // If user is authenticated, use API
  if (token) {
    try {
      await wishlistApi.addToWishlist(token, item.id.toString());
      // Dispatch custom event to notify other components
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('wishlistUpdated'));
      }
      return;
    } catch (error) {
      console.error('Failed to add to wishlist via API, falling back to localStorage:', error);
    }
  }
  
  // Fallback to localStorage
  const wishlistItems = getWishlistItems();
  const existingItemIndex = wishlistItems.findIndex(wishlistItem => wishlistItem.id === item.id);
  
  if (existingItemIndex < 0) {
    wishlistItems.push(item);
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    
    // Dispatch custom event to notify other components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('wishlistUpdated'));
    }
  }
};

export const removeFromWishlist = async (id: number): Promise<void> => {
  if (typeof window === 'undefined') return;
  
  const token = getAuthToken();
  
  // If user is authenticated, use API
  if (token) {
    try {
      await wishlistApi.removeFromWishlist(token, id.toString());
      // Dispatch custom event to notify other components
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('wishlistUpdated'));
      }
      return;
    } catch (error) {
      console.error('Failed to remove from wishlist via API, falling back to localStorage:', error);
    }
  }
  
  // Fallback to localStorage
  const wishlistItems = getWishlistItems();
  const updatedItems = wishlistItems.filter(item => item.id !== id);
  localStorage.setItem('wishlist', JSON.stringify(updatedItems));
  
  // Dispatch custom event to notify other components
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('wishlistUpdated'));
  }
};

export const moveFromWishlistToCart = async (id: number): Promise<void> => {
  if (typeof window === 'undefined') return;
  
  const token = getAuthToken();
  
  // If user is authenticated, use API
  if (token) {
    try {
      await wishlistApi.moveFromWishlistToCart(token, id.toString());
      // Dispatch custom event to notify other components
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('wishlistUpdated'));
        window.dispatchEvent(new Event('cartUpdated'));
      }
      return;
    } catch (error) {
      console.error('Failed to move from wishlist to cart via API, falling back to localStorage:', error);
    }
  }
  
  // Fallback to localStorage
  // Get wishlist item
  const wishlistItems = getWishlistItems();
  const wishlistItem = wishlistItems.find(item => item.id === id);
  
  if (wishlistItem) {
    // Add to cart
    await addToCart({
      id: wishlistItem.id,
      name: wishlistItem.name,
      price: wishlistItem.price,
      image: wishlistItem.image,
      category: wishlistItem.category,
      material: wishlistItem.material
    });
    
    // Remove from wishlist
    await removeFromWishlist(id);
  }
};

// Test function
export const runTests = () => {
  // Mock localStorage for testing
  const mockStorage: Record<string, string> = {};
  const mockLocalStorage = {
    getItem: (key: string) => mockStorage[key] || null,
    setItem: (key: string, value: string) => {
      mockStorage[key] = value;
    },
    removeItem: (key: string) => {
      delete mockStorage[key];
    }
  };
  
  // Temporarily replace localStorage
  const originalLocalStorage = typeof window !== 'undefined' ? window.localStorage : undefined;
  if (typeof window !== 'undefined') {
    (window as any).localStorage = mockLocalStorage;
  }
  
  console.log('Running tests...');
  
  // Clear storage
  mockStorage.cart = '[]';
  mockStorage.wishlist = '[]';
  
  // Test adding to cart
  addToCart({
    id: 1,
    name: 'Test Product',
    price: 100,
    image: 'test.jpg',
    category: 'Test',
    material: 'Gold'
  });
  
  const cartItems = getCartItems();
  console.log('Cart items:', cartItems);
  
  // Restore original localStorage
  if (typeof window !== 'undefined' && originalLocalStorage) {
    (window as any).localStorage = originalLocalStorage;
  }
  
  return cartItems.length === 1;
};