// Example of how to integrate the backend API with the frontend

// API utility functions
const API_BASE_URL = 'http://localhost:5000/api';

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${url}:`, error);
    throw error;
  }
};

// Auth API functions
export const authApi = {
  register: (userData) => apiRequest('/users/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  login: (credentials) => apiRequest('/users/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  getProfile: (token) => apiRequest('/users/profile', {
    headers: { Authorization: `Bearer ${token}` },
  }),
  
  updateProfile: (token, userData) => apiRequest('/users/profile', {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(userData),
  }),
};

// Product API functions
export const productApi = {
  getAllProducts: (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return apiRequest(`/products${queryParams ? `?${queryParams}` : ''}`);
  },
  
  getProductById: (id) => apiRequest(`/products/${id}`),
  
  searchProducts: (query) => apiRequest(`/products/search?q=${encodeURIComponent(query)}`),
};

// Cart API functions
export const cartApi = {
  getCart: (token) => apiRequest('/cart', {
    headers: { Authorization: `Bearer ${token}` },
  }),
  
  addToCart: (token, productId, quantity = 1) => apiRequest('/cart/add', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ productId, quantity }),
  }),
  
  updateCartItem: (token, productId, quantity) => apiRequest('/cart/update', {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ productId, quantity }),
  }),
  
  removeFromCart: (token, productId) => apiRequest('/cart/remove', {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ productId }),
  }),
  
  clearCart: (token) => apiRequest('/cart/clear', {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  }),
};

// Wishlist API functions
export const wishlistApi = {
  getWishlist: (token) => apiRequest('/wishlist', {
    headers: { Authorization: `Bearer ${token}` },
  }),
  
  addToWishlist: (token, productId) => apiRequest('/wishlist/add', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ productId }),
  }),
  
  removeFromWishlist: (token, productId) => apiRequest('/wishlist/remove', {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ productId }),
  }),
  
  moveFromWishlistToCart: (token, productId) => apiRequest('/wishlist/move-to-cart', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ productId }),
  }),
};

// Order API functions
export const orderApi = {
  createOrder: (token, orderData) => apiRequest('/orders', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(orderData),
  }),
  
  getUserOrders: (token) => apiRequest('/orders/myorders', {
    headers: { Authorization: `Bearer ${token}` },
  }),
};

// Example usage in a React component
/*
import { useState, useEffect } from 'react';
import { productApi, authApi, cartApi } from './api';

// Product listing component
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productApi.getAllProducts({ limit: 12 });
        setProducts(data.products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

// Add to cart function
const handleAddToCart = async (productId, token) => {
  try {
    await cartApi.addToCart(token, productId);
    // Update UI to reflect cart changes
    console.log('Product added to cart');
  } catch (error) {
    console.error('Failed to add to cart:', error);
  }
};

// User authentication hook
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  
  const login = async (email, password) => {
    try {
      const data = await authApi.login({ email, password });
      setUser(data);
      setToken(data.token);
      // Store token in localStorage for persistence
      localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };
  
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };
  
  return { user, token, login, logout };
};
*/

// Export all API functions
export { apiRequest };