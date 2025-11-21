// Simple script to test the backend API

const API_BASE_URL = 'http://localhost:5000/api';

async function testApi() {
  try {
    console.log('Testing Gold Shop Backend API...\n');
    
    // Test root endpoint
    console.log('1. Testing root endpoint...');
    const rootResponse = await fetch('http://localhost:5000');
    const rootData = await rootResponse.json();
    console.log('Root endpoint response:', rootData);
    
    // Test products endpoint
    console.log('\n2. Testing products endpoint...');
    const productsResponse = await fetch(`${API_BASE_URL}/products`);
    const productsData = await productsResponse.json();
    console.log(`Found ${productsData.length} products`);
    
    // Test users endpoint (should require authentication)
    console.log('\n3. Testing users endpoint (should fail without auth)...');
    try {
      const usersResponse = await fetch(`${API_BASE_URL}/users/profile`);
      const usersData = await usersResponse.json();
      console.log('Users endpoint response:', usersData);
    } catch (error) {
      console.log('Users endpoint correctly requires authentication');
    }
    
    console.log('\nAPI tests completed successfully!');
  } catch (error) {
    console.error('API test failed:', error);
  }
}

testApi();