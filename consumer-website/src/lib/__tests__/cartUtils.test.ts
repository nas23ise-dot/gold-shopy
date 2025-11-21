import { 
  getCartItems, 
  getCartCount, 
  addToCart, 
  updateCartQuantity, 
  removeFromCart,
  getWishlistItems,
  getWishlistCount,
  addToWishlist,
  removeFromWishlist,
  moveFromWishlistToCart
} from '../cartUtils';

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

describe('Cart and Wishlist Utilities', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    mockLocalStorage.clear();
    
    // Mock window.localStorage
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    });
  });

  describe('Cart Functions', () => {
    test('should add item to cart', () => {
      const item = {
        id: 1,
        name: 'Test Product',
        price: 100,
        image: 'test.jpg',
        category: 'Test',
        material: 'Gold'
      };

      addToCart(item);
      
      const cartItems = getCartItems();
      expect(cartItems).toHaveLength(1);
      expect(cartItems[0]).toEqual({ ...item, quantity: 1 });
    });

    test('should increase quantity when adding same item', () => {
      const item = {
        id: 1,
        name: 'Test Product',
        price: 100,
        image: 'test.jpg',
        category: 'Test',
        material: 'Gold'
      };

      addToCart(item);
      addToCart(item);
      
      const cartItems = getCartItems();
      expect(cartItems[0].quantity).toBe(2);
    });

    test('should update cart quantity', () => {
      const item = {
        id: 1,
        name: 'Test Product',
        price: 100,
        image: 'test.jpg',
        category: 'Test',
        material: 'Gold'
      };

      addToCart(item);
      updateCartQuantity(1, 5);
      
      const cartItems = getCartItems();
      expect(cartItems[0].quantity).toBe(5);
    });

    test('should remove item from cart when quantity is 0 or less', () => {
      const item = {
        id: 1,
        name: 'Test Product',
        price: 100,
        image: 'test.jpg',
        category: 'Test',
        material: 'Gold'
      };

      addToCart(item);
      updateCartQuantity(1, 0);
      
      const cartItems = getCartItems();
      expect(cartItems).toHaveLength(0);
    });

    test('should remove item from cart', () => {
      const item = {
        id: 1,
        name: 'Test Product',
        price: 100,
        image: 'test.jpg',
        category: 'Test',
        material: 'Gold'
      };

      addToCart(item);
      removeFromCart(1);
      
      const cartItems = getCartItems();
      expect(cartItems).toHaveLength(0);
    });

    test('should get correct cart count', () => {
      const item1 = {
        id: 1,
        name: 'Test Product 1',
        price: 100,
        image: 'test1.jpg',
        category: 'Test',
        material: 'Gold'
      };

      const item2 = {
        id: 2,
        name: 'Test Product 2',
        price: 200,
        image: 'test2.jpg',
        category: 'Test',
        material: 'Silver'
      };

      addToCart(item1);
      addToCart(item2);
      updateCartQuantity(2, 3); // Set quantity to 3 for item2
      
      const count = getCartCount();
      expect(count).toBe(4); // 1 + 3 = 4
    });
  });

  describe('Wishlist Functions', () => {
    test('should add item to wishlist', () => {
      const item = {
        id: 1,
        name: 'Test Product',
        price: 100,
        originalPrice: 120,
        image: 'test.jpg',
        category: 'Test',
        material: 'Gold',
        rating: 4.5
      };

      addToWishlist(item);
      
      const wishlistItems = getWishlistItems();
      expect(wishlistItems).toHaveLength(1);
      expect(wishlistItems[0]).toEqual(item);
    });

    test('should not add duplicate items to wishlist', () => {
      const item = {
        id: 1,
        name: 'Test Product',
        price: 100,
        originalPrice: 120,
        image: 'test.jpg',
        category: 'Test',
        material: 'Gold',
        rating: 4.5
      };

      addToWishlist(item);
      addToWishlist(item);
      
      const wishlistItems = getWishlistItems();
      expect(wishlistItems).toHaveLength(1);
    });

    test('should remove item from wishlist', () => {
      const item = {
        id: 1,
        name: 'Test Product',
        price: 100,
        originalPrice: 120,
        image: 'test.jpg',
        category: 'Test',
        material: 'Gold',
        rating: 4.5
      };

      addToWishlist(item);
      removeFromWishlist(1);
      
      const wishlistItems = getWishlistItems();
      expect(wishlistItems).toHaveLength(0);
    });

    test('should get correct wishlist count', () => {
      const item1 = {
        id: 1,
        name: 'Test Product 1',
        price: 100,
        originalPrice: 120,
        image: 'test1.jpg',
        category: 'Test',
        material: 'Gold',
        rating: 4.5
      };

      const item2 = {
        id: 2,
        name: 'Test Product 2',
        price: 200,
        originalPrice: 240,
        image: 'test2.jpg',
        category: 'Test',
        material: 'Silver',
        rating: 4.0
      };

      addToWishlist(item1);
      addToWishlist(item2);
      
      const count = getWishlistCount();
      expect(count).toBe(2);
    });

    test('should move item from wishlist to cart', () => {
      const item = {
        id: 1,
        name: 'Test Product',
        price: 100,
        originalPrice: 120,
        image: 'test.jpg',
        category: 'Test',
        material: 'Gold',
        rating: 4.5
      };

      addToWishlist(item);
      moveFromWishlistToCart(1);
      
      const wishlistItems = getWishlistItems();
      const cartItems = getCartItems();
      
      expect(wishlistItems).toHaveLength(0);
      expect(cartItems).toHaveLength(1);
      expect(cartItems[0]).toEqual({
        id: 1,
        name: 'Test Product',
        price: 100,
        image: 'test.jpg',
        category: 'Test',
        material: 'Gold',
        quantity: 1
      });
    });
  });
});