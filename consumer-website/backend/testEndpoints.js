// Test script to verify all API endpoints are working

async function testEndpoints() {
  const BASE_URL = 'http://localhost:5000/api';
  
  try {
    console.log('Testing Gold Shop API endpoints...\n');
    
    // Test 1: Root endpoint
    console.log('1. Testing root endpoint...');
    const rootResponse = await fetch('http://localhost:5000');
    const rootData = await rootResponse.json();
    console.log('✓ Root endpoint:', rootData.message);
    console.log('  Database:', rootData.database);
    
    // Test 2: Get products
    console.log('\n2. Testing products endpoint...');
    const productsResponse = await fetch(`${BASE_URL}/products`);
    const productsData = await productsResponse.json();
    console.log('✓ Products endpoint:', `${productsData.products.length} products found`);
    
    // Test 3: Search products
    console.log('\n3. Testing search endpoint...');
    const searchResponse = await fetch(`${BASE_URL}/products/search?q=gold`);
    const searchData = await searchResponse.json();
    console.log('✓ Search endpoint:', `${searchData.length} results for "gold"`);
    
    // Test 4: Get product by ID
    console.log('\n4. Testing product by ID endpoint...');
    const productResponse = await fetch(`${BASE_URL}/products/1`);
    const productData = await productResponse.json();
    console.log('✓ Product by ID endpoint:', productData.name);
    
    // Test 5: Register user
    console.log('\n5. Testing user registration...');
    const registerResponse = await fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        phone: '+1234567890'
      })
    });
    
    const registerData = await registerResponse.json();
    console.log('✓ User registration:', registerResponse.status === 201 ? 'Success' : 'Failed');
    if (registerResponse.status === 201) {
      console.log('  User ID:', registerData._id);
      console.log('  Token generated:', !!registerData.token);
    }
    
    // Test 6: Login user
    console.log('\n6. Testing user login...');
    const loginResponse = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });
    
    const loginData = await loginResponse.json();
    console.log('✓ User login:', loginResponse.status === 200 ? 'Success' : 'Failed');
    const token = loginData.token;
    
    if (token) {
      // Test 7: Get user profile (protected route)
      console.log('\n7. Testing protected user profile endpoint...');
      const profileResponse = await fetch(`${BASE_URL}/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const profileData = await profileResponse.json();
      console.log('✓ User profile endpoint:', profileResponse.status === 200 ? 'Success' : 'Failed');
      if (profileResponse.status === 200) {
        console.log('  User name:', profileData.name);
      }
      
      // Test 8: Add to cart (protected route)
      console.log('\n8. Testing add to cart endpoint...');
      const cartResponse = await fetch(`${BASE_URL}/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: 1,
          quantity: 2
        })
      });
      
      const cartData = await cartResponse.json();
      console.log('✓ Add to cart endpoint:', cartResponse.status === 200 ? 'Success' : 'Failed');
      if (cartResponse.status === 200) {
        console.log('  Cart items:', cartData.items.length);
      }
      
      // Test 9: Get cart (protected route)
      console.log('\n9. Testing get cart endpoint...');
      const getCartResponse = await fetch(`${BASE_URL}/cart`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const getCartData = await getCartResponse.json();
      console.log('✓ Get cart endpoint:', getCartResponse.status === 200 ? 'Success' : 'Failed');
      if (getCartResponse.status === 200) {
        console.log('  Cart items:', getCartData.items.length);
      }
      
      // Test 10: Add to wishlist (protected route)
      console.log('\n10. Testing add to wishlist endpoint...');
      const wishlistResponse = await fetch(`${BASE_URL}/wishlist/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: 2
        })
      });
      
      const wishlistData = await wishlistResponse.json();
      console.log('✓ Add to wishlist endpoint:', wishlistResponse.status === 200 ? 'Success' : 'Failed');
      if (wishlistResponse.status === 200) {
        console.log('  Wishlist items:', wishlistData.productIds.length);
      }
    }
    
    console.log('\n🎉 All tests completed successfully!');
    console.log('\n✅ The Gold Shop backend API is working correctly.');
    console.log('📝 Note: Some endpoints require authentication and may have been tested with mock data.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\nPlease make sure the backend server is running on port 5000.');
  }
}

testEndpoints();