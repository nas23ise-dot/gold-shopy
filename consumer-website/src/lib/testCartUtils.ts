// Manual test file for cart and wishlist functionality
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
} from './cartUtils';

// Mock localStorage for testing
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

// Mock window.localStorage
Object.defineProperty(globalThis, 'localStorage', {
  value: mockLocalStorage,
});

// Test data
const testProduct = {
  id: 1,
  name: 'Test Gold Necklace',
  price: 150000,
  image: 'https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=Gold+Necklace',
  category: 'Necklaces',
  material: 'Gold'
};

const testWishlistProduct = {
  id: 2,
  name: 'Test Diamond Ring',
  price: 250000,
  originalPrice: 300000,
  image: 'https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Diamond+Ring',
  category: 'Rings',
  material: 'Diamond',
  rating: 4.8
};

// Manual test function
const runTests = () => {
  console.log('Running Cart and Wishlist Tests...\n');
  
  // Clear localStorage
  localStorage.clear();
  
  // Test 1: Add to cart
  console.log('Test 1: Add to cart');
  addToCart(testProduct);
  const cartItems = getCartItems();
  console.log('Cart items:', cartItems);
  console.log('Cart count:', getCartCount());
  console.log('Test 1 passed:', cartItems.length === 1 && cartItems[0].quantity === 1);
  
  // Test 2: Add same item to cart (should increase quantity)
  console.log('\nTest 2: Add same item to cart');
  addToCart(testProduct);
  const updatedCartItems = getCartItems();
  console.log('Cart items:', updatedCartItems);
  console.log('Cart count:', getCartCount());
  console.log('Test 2 passed:', updatedCartItems[0].quantity === 2);
  
  // Test 3: Update cart quantity
  console.log('\nTest 3: Update cart quantity');
  updateCartQuantity(1, 5);
  const quantityUpdatedCart = getCartItems();
  console.log('Cart items:', quantityUpdatedCart);
  console.log('Test 3 passed:', quantityUpdatedCart[0].quantity === 5);
  
  // Test 4: Remove from cart
  console.log('\nTest 4: Remove from cart');
  removeFromCart(1);
  const emptyCart = getCartItems();
  console.log('Cart items:', emptyCart);
  console.log('Cart count:', getCartCount());
  console.log('Test 4 passed:', emptyCart.length === 0);
  
  // Test 5: Add to wishlist
  console.log('\nTest 5: Add to wishlist');
  addToWishlist(testWishlistProduct);
  const wishlistItems = getWishlistItems();
  console.log('Wishlist items:', wishlistItems);
  console.log('Wishlist count:', getWishlistCount());
  console.log('Test 5 passed:', wishlistItems.length === 1);
  
  // Test 6: Add duplicate to wishlist (should not add)
  console.log('\nTest 6: Add duplicate to wishlist');
  addToWishlist(testWishlistProduct);
  const noDuplicateWishlist = getWishlistItems();
  console.log('Wishlist items:', noDuplicateWishlist);
  console.log('Wishlist count:', getWishlistCount());
  console.log('Test 6 passed:', noDuplicateWishlist.length === 1);
  
  // Test 7: Remove from wishlist
  console.log('\nTest 7: Remove from wishlist');
  removeFromWishlist(2);
  const emptyWishlist = getWishlistItems();
  console.log('Wishlist items:', emptyWishlist);
  console.log('Wishlist count:', getWishlistCount());
  console.log('Test 7 passed:', emptyWishlist.length === 0);
  
  // Test 8: Move from wishlist to cart
  console.log('\nTest 8: Move from wishlist to cart');
  addToWishlist(testWishlistProduct);
  moveFromWishlistToCart(2);
  const movedWishlist = getWishlistItems();
  const movedCart = getCartItems();
  console.log('Wishlist items:', movedWishlist);
  console.log('Cart items:', movedCart);
  console.log('Wishlist count:', getWishlistCount());
  console.log('Cart count:', getCartCount());
  console.log('Test 8 passed:', movedWishlist.length === 0 && movedCart.length === 1);
  
  console.log('\nAll tests completed!');
};

// Run tests if this file is executed directly
if (typeof window === 'undefined') {
  runTests();
}

export default runTests;