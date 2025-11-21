# Frontend Integration Guide

This guide explains how to integrate the Gold Shop frontend with the backend API.

## API Endpoints

The backend API is available at `http://localhost:5000/api` when running locally.

### Authentication

#### Register a new user
```javascript
// POST /api/users/register
const registerUser = async (userData) => {
  const response = await fetch('http://localhost:5000/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  return await response.json();
};
```

#### Login
```javascript
// POST /api/users/login
const loginUser = async (credentials) => {
  const response = await fetch('http://localhost:5000/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  
  return await response.json();
};
```

#### Get user profile
```javascript
// GET /api/users/profile
const getUserProfile = async (token) => {
  const response = await fetch('http://localhost:5000/api/users/profile', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  return await response.json();
};
```

### Products

#### Get all products
```javascript
// GET /api/products
const getProducts = async (params = {}) => {
  const queryParams = new URLSearchParams(params).toString();
  const response = await fetch(`http://localhost:5000/api/products?${queryParams}`);
  return await response.json();
};
```

#### Search products
```javascript
// GET /api/products/search
const searchProducts = async (query) => {
  const response = await fetch(`http://localhost:5000/api/products/search?q=${query}`);
  return await response.json();
};
```

#### Get product by ID
```javascript
// GET /api/products/:id
const getProductById = async (id) => {
  const response = await fetch(`http://localhost:5000/api/products/${id}`);
  return await response.json();
};
```

### Cart

#### Get user cart
```javascript
// GET /api/cart
const getCart = async (token) => {
  const response = await fetch('http://localhost:5000/api/cart', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  return await response.json();
};
```

#### Add item to cart
```javascript
// POST /api/cart/add
const addToCart = async (token, productId, quantity = 1) => {
  const response = await fetch('http://localhost:5000/api/cart/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ productId, quantity }),
  });
  
  return await response.json();
};
```

#### Update cart item
```javascript
// PUT /api/cart/update
const updateCartItem = async (token, productId, quantity) => {
  const response = await fetch('http://localhost:5000/api/cart/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ productId, quantity }),
  });
  
  return await response.json();
};
```

#### Remove item from cart
```javascript
// DELETE /api/cart/remove
const removeFromCart = async (token, productId) => {
  const response = await fetch('http://localhost:5000/api/cart/remove', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ productId }),
  });
  
  return await response.json();
};
```

### Wishlist

#### Get user wishlist
```javascript
// GET /api/wishlist
const getWishlist = async (token) => {
  const response = await fetch('http://localhost:5000/api/wishlist', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  return await response.json();
};
```

#### Add item to wishlist
```javascript
// POST /api/wishlist/add
const addToWishlist = async (token, productId) => {
  const response = await fetch('http://localhost:5000/api/wishlist/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ productId }),
  });
  
  return await response.json();
};
```

#### Remove item from wishlist
```javascript
// DELETE /api/wishlist/remove
const removeFromWishlist = async (token, productId) => {
  const response = await fetch('http://localhost:5000/api/wishlist/remove', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ productId }),
  });
  
  return await response.json();
};
```

#### Move item from wishlist to cart
```javascript
// POST /api/wishlist/move-to-cart
const moveFromWishlistToCart = async (token, productId) => {
  const response = await fetch('http://localhost:5000/api/wishlist/move-to-cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ productId }),
  });
  
  return await response.json();
};
```

### Orders

#### Create order
```javascript
// POST /api/orders
const createOrder = async (token, orderData) => {
  const response = await fetch('http://localhost:5000/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });
  
  return await response.json();
};
```

#### Get user orders
```javascript
// GET /api/orders/myorders
const getUserOrders = async (token) => {
  const response = await fetch('http://localhost:5000/api/orders/myorders', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  return await response.json();
};
```

## Authentication Flow

1. User registers or logs in
2. API returns a JWT token
3. Store the token in localStorage or context
4. Include the token in the Authorization header for protected routes

```javascript
// Example of storing and using token
const login = async (email, password) => {
  const response = await loginUser({ email, password });
  if (response.token) {
    localStorage.setItem('token', response.token);
    // Update app state
  }
  return response;
};

const apiRequest = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  const response = await fetch(url, config);
  return await response.json();
};
```

## Error Handling

The API returns JSON error responses with a `message` field:

```javascript
try {
  const data = await apiRequest('/api/products');
  // Handle success
} catch (error) {
  console.error('API Error:', error.message);
  // Handle error
}
```

## Development vs Production

- **Development**: The API runs on `http://localhost:5000`
- **Production**: The API should be deployed to a proper domain

Update the API base URL in your frontend configuration when deploying to production.

## Mock Database Mode

When MongoDB is not available, the backend automatically switches to mock database mode. This is useful for:
- Development without MongoDB installation
- Testing
- Demo purposes

In mock database mode:
- All data is stored in memory
- Data is reset when the server restarts
- All features work the same as with MongoDB