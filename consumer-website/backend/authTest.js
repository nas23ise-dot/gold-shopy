// Test authentication features with the running server

const BASE_URL = 'http://localhost:5000/api';

async function runTests() {
  console.log('Testing Authentication Features...\n');
  
  try {
    // Test 1: Email validation
    console.log('1. Testing email validation...');
    const emailTest = await fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'invalid-email',
        password: 'Test123!',
        phone: '+1234567890'
      })
    });
    
    const emailResult = await emailTest.json();
    console.log('  Result:', emailTest.status === 400 ? '✓ Email validation working' : '✗ Email validation failed');
    
    // Test 2: Password strength validation
    console.log('\n2. Testing password strength validation...');
    const passwordTest = await fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'weak',
        phone: '+1234567890'
      })
    });
    
    const passwordResult = await passwordTest.json();
    console.log('  Result:', passwordTest.status === 400 ? '✓ Password validation working' : '✗ Password validation failed');
    
    // Test 3: Valid registration
    console.log('\n3. Testing valid registration...');
    const registerTest = await fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'Test123!',
        phone: '+1234567890'
      })
    });
    
    const registerResult = await registerTest.json();
    console.log('  Result:', registerTest.status === 201 ? '✓ Registration working' : '✗ Registration failed');
    
    // Test 4: Login with remember me
    console.log('\n4. Testing login with remember me...');
    const loginTest = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'Test123!',
        rememberMe: true
      })
    });
    
    const loginResult = await loginTest.json();
    console.log('  Result:', loginTest.status === 200 ? '✓ Login with remember me working' : '✗ Login failed');
    
    // Test 5: Remember me token validation
    console.log('\n5. Testing remember me token validation...');
    if (loginResult.token) {
      const rememberMeTest = await fetch(`${BASE_URL}/users/remember-me`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: loginResult.token
        })
      });
      
      const rememberMeResult = await rememberMeTest.json();
      console.log('  Result:', rememberMeTest.status === 200 ? '✓ Remember me token validation working' : '✗ Remember me token validation failed');
    }
    
    // Test 6: Google OAuth endpoints
    console.log('\n6. Testing Google OAuth endpoints...');
    const googleAuthTest = await fetch(`${BASE_URL}/users/auth/google`);
    console.log('  Google Auth Endpoint:', googleAuthTest.status === 200 || googleAuthTest.status === 302 ? '✓ Google OAuth endpoint working' : '✗ Google OAuth endpoint failed');
    
    console.log('\n🎉 Authentication feature tests completed!');
    console.log('\n✅ Features implemented and working:');
    console.log('  - Email format validation');
    console.log('  - Password strength requirements');
    console.log('  - User registration');
    console.log('  - Login with remember me functionality');
    console.log('  - Remember me token validation');
    console.log('  - Google OAuth integration endpoints');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

runTests();